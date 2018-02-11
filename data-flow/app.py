import load, os, re
BUILD_NAME = "123 abc Dr Somecity, SomeState 12345"
for root, dirs, files in os.walk(os.path.join(os.getcwd(), 'data')):
    if len(files) == 0:
        continue
    else:
        for file in files:
            data, headers = load.read_in_file(os.path.join(os.getcwd(), os.path.join(root, file)))
            data, headers = load.clean_inputs(data, headers)
            
            equip_name= ''.join(list(file)[:-4]).replace('-', '_') 
            table_name = equip_name + BUILD_NAME
            equip_type = re.sub(r'[^A-Za-z].+$', '', equip_name)
            equip_type = re.sub(r'\d', '', equip_type)
            
            print(equip_name)
            load.load_equipment(BUILD_NAME, equip_name, equip_type )
            load.create_equip_table(table_name, headers, data)
            load.load_equip_data(table_name, data, headers)
            