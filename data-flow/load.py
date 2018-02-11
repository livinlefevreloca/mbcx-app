#!Python3
#load.py - module for loading data into db in different configuartions  

import psycopg2 as pg
from psycopg2 import sql
from datetime import datetime
import os, re

def db_connect():
    #connect to DB and return connection instance
    conn = pg.connect(database=os.environ['DB'], user=os.environ['USER'], password=os.environ['PW'], host=os.environ['ENDPNT'] ) 
    return conn
def db_end_session(connection, cursor):
    #commit changes to DB and end session gracefully. TO BE USED AT THE END OF EVERY SESSION
    connection.commit()
    cursor.close()
    connection.close()
    
    
def check_for_existing(building_name, equipment_name):
    #check if the piece of equipment being loaded exists already and if the building it belongs to exisits
    b_exists = True
    e_exists = True
    conn_inst = db_connect()
    cur = conn_inst.cursor()
    cur.execute("SELECT * FROM buildings WHERE address =(%s);", (building_name,))
    if(cur.fetchone() == None):
        b_exists = False
        e_exists = False
        db_end_session(conn_inst, cur)
        return [b_exists, e_exists]
    cur.execute("SELECT * FROM equipment WHERE equipment_id = (%s) AND building_address=(%s);", (equipment_name, building_name))
    if(cur.fetchone() == None):
        e_exists = False
    db_end_session(conn_inst, cur)
    return [b_exists, e_exists]
    
def load_building(building_name, engineer_name):
    #Add new building to buildings DB
    conn_inst = db_connect()
    cur = conn_inst.cursor()
    cur.execute("INSERT INTO buildings (address, engineer) VALUES (%s, %s);",(building_name, engineer_name))
    db_end_session(conn_inst, cur)
    return(True)
    
def load_equipment(building_name, equip_name, equip_type):
    conn_inst = db_connect()
    cur = conn_inst.cursor();
    cur.execute("INSERT INTO equipment(equipment_id, building_address, equip_type) VALUES(%s, %s, %s);", (equip_name,building_name, equip_type))
    db_end_session(conn_inst, cur)

def read_in_file(filepath):
    #read data in from csv file (used for creating new equipment tables) so data can be cleaned and re-typed
    with open(filepath, 'r') as equip_file:
        headers = equip_file.readline().split(',')
        data = []
        for line in equip_file:
            row = line.split(',')
            data.append(row)
    return (data, headers)


def clean_inputs(data, headers):
    # remove extraneous charcters and replace '.' with '-' for JSON notation on web app side
    for row in data:
        for j, val in enumerate(row):
            row[j] = val.rstrip()
    for i, head in enumerate(headers):
       
        headers[i] = head.rstrip().replace('.', '_')
        headers[i] = headers[i].replace('-', '_')
        headers[i] = re.sub(r'^[^A-Za-z]+', '_', headers[i])
    return (data, headers)   
        
def load_equip_data(equip_name, table_data, headers):
    #loads extracted file_data into an existing equipment table using the equip_name
    conn_inst = db_connect()
    cur = conn_inst.cursor()
    query = "INSERT INTO {} VALUES(" + " %s, "*(len(headers) -1) + " %s);"
    for i,data in enumerate(table_data):
        try:
            data[0] = datetime.strptime(data[0], '%m/%d/%Y %I:%M:%S %p')
            for j, point in enumerate(data):
                if point == '':
                    data[j] = 0
        except ValueError as e:
            print("date could not be formatted, skipping")
            continue
        table_data[i] = data
    for i, data in enumerate(table_data):
        print(i)
        try:
            cur.execute(sql.SQL(query).format(sql.Identifier(equip_name)), tuple(data))
        except IndexError as e:
            print("depricated row " + str(i) + " not adding")
            continue
    db_end_session(conn_inst, cur)       


def create_equip_table(equip_name, headers, data):
    conn_inst = db_connect()
    cur = conn_inst.cursor()
    headers = tuple(headers)
    query = "CREATE TABLE {} ({} timestamp PRIMARY KEY);"
    cur.execute(sql.SQL(query).format(sql.Identifier(equip_name), sql.Identifier(headers[0])))
    col_query = "ALTER TABLE {} ADD COLUMN {} real;"
    for x in headers[1:]:
        cur.execute(sql.SQL(col_query).format(sql.Identifier(equip_name), sql.Identifier(x)))
    db_end_session(conn_inst, cur)
    
# def main():
#     for root, dirs, files in os.walk(os.path.join(os.getcwd(), 'data')):
#         if len(files) == 0:
#             continue
#         else:
#             for file in files:
#                 data, headers = read_in_file(os.path.join(os.getcwd(), os.path.join(root, file)))
#                 data, headers = clean_inputs(data, headers)
#                 table_name = ''.join(list(file)[:-4]).replace('-', '_')
                
#                 create_equip_table(table_name, headers, data)
#                 load_equip(table_name, data, headers)
    
#main() 

    
    



