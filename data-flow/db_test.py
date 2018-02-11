import load as l
import psycopg2
from psycopg2 import sql
import re




x = l.db_connect()
cur = x.cursor()

lis = ['AHU1', 
'Boilers',
'CHWPlant1', 
'CHWPlant2', 
'FCU-1FCUNOAD2',
'FCU-2FCUOAD1',
'FCU-3FCUOAD3',
'FCU-4FCUOAD3',
'FCU-5FCUOAD2',
'FCU-6FCUOAD2',
'FCU-7FCUNOAD1',
'FCU-8FCUOAD3',
'FCU-9FCUNOAD3',
'FCU-10FCUOAD3',
'FCU-11FCUOAD3',
'FCU-12FCUNOAD3',
'FCU-13-FCUNOAD3',
'VAV-1Rht',
'VAV-2Rht',
'VAV-3Rht',
'VAV-4Rht',
'VAV-5Rht',
'VAV-6Rht',
'VAV-7Rht']

# for name in lis:
#     try:
#         cur.execute(sql.SQL("DROP TABLE {}").format(sql.Identifier(name[0])))
#     except psycopg2.ProgrammingError as e:
#         print('table ' + name[0] + ' does not exist')
#         l.db_end_session(x, cur)
        
        
# #create buildings tables
# #create table to hold equipment ids and referenc the building  they are in.
cur.execute("DROP TABLE equipment")
# cur.execute("DROP TABLE buildings;")
# cur.execute("CREATE TABLE buildings (email varchar(60) PRIMARY KEY, address varchar(60) UNIQUE, name varchar(40), pw char(60));")
cur.execute("CREATE TABLE equipment (id serial PRIMARY KEY, equipment_id varchar, building_address varchar(75) REFERENCES buildings(address), equip_type varchar);")
address = '123 abc Dr Somecity, SomeState 12345'
for name in lis:
    typ = re.sub(r'[^A-Za-z].+$', '', name)
    typ = re.sub(r'\d', '', typ)
    print(typ)
    new_name = name.replace('-', '_')
    cur.execute(sql.SQL("INSERT INTO equipment(equipment_id, building_address, equip_type) VALUES(%s, %s, %s);"), (new_name, address , typ ))
# cur.execute("select relname from pg_class where relkind='r' and relname !~ '^(pg_|sql_)';")
# print(cur.fetchall())

l.db_end_session(x, cur) 