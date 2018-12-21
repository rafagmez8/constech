import thereisnet
import serial
import datetime
import time
import threading
import pymongo
from pymongo import MongoClient

stnucleo_port = ""
reception_of_data_th_active = False
send_data_to_db_th_active = False
complete_data = False
str_reception_of_data = ""
allData_collection = ""
daysData_collection = ""
monthData_collection = ""
yearData_collection = ""
month_data = []
year_data = []
dates_week = []
dates_month = []
dates_year = []


""" Function that checks the internet connection, if there is connection returns 1 """
def there_is_connection ():
    return thereisnet.there_is_net()



""" Function that gets the date and time"""
def get_datetime ():
    x = datetime.datetime.now()
    date = x.strftime("%d") + "-" + x.strftime("%b") + "-" + x.strftime("%y")
    day = x.strftime("%A")
    hour = x.strftime("%H") + ":" + x.strftime("%M") + ":" + x.strftime("%S")
    return date + "." + day + "." + hour



""" Function that open the nucleo's port """
def open_nucleo_port ():
    try:
        nucleo_port = serial.Serial('/dev/ttyACM0', baudrate=9600, timeout=3.0)
        flushinput()
        print("Open port")
    except:
        print("ERROR: Closed or already opened serial port.");

    return nucleo_port



""" Function that receipt data to the serial port """
def reception_of_data ():
    global stnucleo_port
    global str_reception_of_data
    global complete_data
    
    while reception_of_data_th_active:
        
        while stnucleo_port.inWaiting() > 0:
            str_reception_of_data = stnucleo_port.readline().decode()

            if str_reception_of_data[0] == "[" and str_reception_of_data[len(str_reception_of_data)-1] == "]":
                print("===========================================================")
                print("all data has arrived:{} A".format(str_reception_of_data))
                complete_data = True
            else:
                str_reception_of_data = ""



""" Function that send data to database, furthermore it actualize data from the database """
def send_to_database ():
    global dates_week
    global dates_month
    global dates_year
    global month_data
    global year_data
    global complete_data
    global allData_collection
    global daysData_collection
    global monthData_collection
    global yearData_collection
    
    database_connection()
    
    while send_data_to_db_th_active:
        
        if there_is_connection() == 1:
            if complete_data:
                data_kw_money = calculate_KW_money (str_reception_of_data)
                print("KW:{}  Money:{}".format(data_kw_money[0], data_kw_money[1]))
                
                #dates_month.append( "03-Oct-18" )
                #dates_month.append( "07-Oct-18" )
                #dates_month.append( "15-Oct-18" )
                #dates_month.append( "08-Nov-18" )
                #dates_month.append( "10-Nov-18" )
                #dates_month.append( "15-Nov-18" )
                #dates_week.append( "15-Nov-18" )
                #dates_month.append( "01-Dec-18" )
                #dates_month.append( "05-Dec-18" )
                #dates_month.append( "22-Dec-18" )
                #dates_year.append( "Oct-18" )
                #dates_year.append( "Dec-18" )
                
                date_time = get_datetime()
                print("Thread sent {} and {} to the database. Date: {} Hour: {}".format(data_kw_money[0], data_kw_money[1],
                                                                                        date_time.split(".")[0], date_time.split(".")[2]))
                print("Insert data into the allData_collection collection.")
                allData_collection.insert(
                    {'date': date_time.split(".")[0], 'hour': date_time.split(".")[2], 'total': data_kw_money[0][0],
                    'fivev_sensor': data_kw_money[0][1], 'twentyv_sensor': data_kw_money[0][2], 'total_money': data_kw_money[1][0],
                     'fivev_money': data_kw_money[1][1], 'twentyv_money': data_kw_money[1][2]}
                )
                
                #Miro si en la coleccion daysData hay datos con la misma fecha que aparece en el diccionario:
                    #- Hay datos con la misma fecha -> Obtengo esos datos y los sumo a la variable total actual.
                    #- No hay datos con la misma fecha -> Inserto la fecha y la variable total.
                daysData_element = daysData_collection.find_one( {'date':date_time.split(".")[0]} )
                if daysData_element == None: #Insert new element
                    print("There is not elements with these date in daysData:{}. Insert another one".format(daysData_element))
                    if len(dates_week) == 0 and len(dates_month) == 0:
                        calculate_dates_week_month(allData_collection, daysData_collection)
                        
                    daysData_collection.insert(
                        {'date': date_time.split(".")[0], 'total': data_kw_money[0][0], 'total_money': data_kw_money[1][0]})
                    if date_time.split(".")[0] not in dates_week:
                        dates_week.append( date_time.split(".")[0] )
                    if date_time.split(".")[0] not in dates_month:
                        dates_month.append( date_time.split(".")[0] )
                    print("dates_week:{}".format(dates_week))
                    print("dates_month:{}".format(dates_month))
                else:
                    print("Actualize an existent element")
                    if len(dates_week) == 0 and len(dates_month) == 0:
                        calculate_dates_week_month(allData_collection, daysData_collection)
                    
                    print("dates_week:{}".format(dates_week))
                    print("dates_month:{}".format(dates_month))
                    value_kw = str( round(float( daysData_element['total'] ) + float( data_kw_money[0][0] ), 4) )
                    value_money = str( round(float( daysData_element['total_money'] ) + float( data_kw_money[1][0] ), 4) )
                    daysData_collection.update({'date':date_time.split(".")[0]}, { "$set": {'total': value_kw} })
                    daysData_collection.update({'date':date_time.split(".")[0]}, { "$set": {'total_money': value_money} })
                
                res = delete_old_data_from_collections (date_time.split(".")[1], allData_collection,
                                                        daysData_collection, monthData_collection)
                
                if res[1]:
                    print("True. month_data: {}".format(month_data))
                    monthData_element = monthData_collection.find_one( {'date':month_data[0]} )
                    if monthData_element == None: #Insert a new month
                        print("A new month has been inserted: {}".format(month_data[0]))
                        monthData_collection.insert({'date': month_data[0],
                                                     'total': month_data[1], 'middle_value': month_data[2],
                                                     'total_money': month_data[3], 'middle_value_money': month_data[4]})
                        #Insertar el mes a la lista year para recorrerla y eliminarlo cuando el anio cambie
                        dates_year.append( month_data[0] )
                        print("dates_year:{}".format(dates_year))
                        
                
                if res[2]:
                    print("True. year_data: {}".format(year_data))
                    yearData_element = yearData_collection.find_one( {'anio':year_data[0]} )
                    if yearData_element == None: #Insert a new year
                        print("A new year has been inserted: {}".format(year_data[0]))
                        yearData_collection.insert({'year': year_data[0], 'total': year_data[1], 'middle_value': year_data[2],
                                                    'total_money': year_data[3], 'middle_value_money': year_data[4]})
                
                complete_data = False
        else:
            print("There is not internet connection so it has not been possible insert the data into the database")



"""Function to connect to database"""
def database_connection ():
    global allData_collection
    global daysData_collection
    global monthData_collection
    global yearData_collection
    
    client = MongoClient('mongodb://rafaadmin:rafaadmin1@ds213472.mlab.com:13472/project-ammeters') #connect to the server
    db = client["project-ammeters"] #connect to the database
    allData_collection = db.allData #allData collection
    daysData_collection = db.daysData #daysData collection
    monthData_collection = db.monthData #monthData collection
    yearData_collection = db.yearData #yearData collection



def calculate_KW_money (str_reception_of_data): #KW = (V x I)/ 1000
    kwh = 0.164
    values = []
    values_e = []
    res = []
    valueT = (220 * float( str_reception_of_data.split(":")[0][1:] )) / 1000
    values.append( round(valueT, 4) )
    value5 = (220 * float( str_reception_of_data.split(":")[1] )) / 1000
    values.append( round(value5, 4) )
    value20 = (220 * float(str_reception_of_data.split(":")[2][:-1])) / 1000
    values.append( round(value20, 4) )
    res.append(values)
    values_e.append( round(valueT*kwh, 4) ) #price of total value
    values_e.append( round(value5*kwh, 4) ) #price of total value
    values_e.append( round(value20*kwh, 4) ) #price of total value
    res.append(values_e)
    #print("str:{}".format(str_reception_of_data))
    #print("str0:{} A valueT:{} KW valueT:{} e".format(str_reception_of_data.split(":")[0][1:], valueT, round(valueT*kwh, 4)))
    #print("str1:{} A value5:{} KW value5:{} e".format(str_reception_of_data.split(":")[1], value5, round(value5*kwh, 4)))
    #print("str2:{} A value20:{} KW value20:{} e".format(str_reception_of_data.split(":")[2][:-1], value20, round(value20*kwh, 4)))
    
    return res



"""Function that take all dates from the database"""
def calculate_dates_week_month(allData_collection, daysData_collection):
    global dates_week
    global dates_month
    
    dates_w = []
    dates_m = []
    
    days_data_week = allData_collection.find()
    days_data_month = daysData_collection.find()
    [ [dates_w.append(f['date'])] for f in days_data_week ]
    [ [dates_m.append(f['date'])] for f in days_data_month ]
    [ [ (dates_week.append(e)) if e not in dates_week else "" ] for e in dates_w]
    [ [ (dates_month.append(e)) if e not in dates_month else "" ] for e in dates_m]
    



"""Delete old data from the allData collection, which is located in the database"""
def delete_old_data_from_collections (day, allData_collection, daysData_collection, monthData_collection):
    global dates_week
    global dates_month
    global dates_year
    global month_data
    global year_data
    
    res = []
    
    if day == "Monday" and len(dates_week) > 1: # Elimino todos los datos de una semana atras
        [ [allData_collection.remove( {'date': d} )] for d in dates_week[:-1] ]
        print("allData: Delete last week. Today is {} - {}".format(day, dates_week[-1]))
        
        d_week = dates_week[-1]
        dates_week = []
        dates_week.append( d_week )
        
        res.append(True)
    else:
        res.append(False)
    
    """Si es ultimo de mes, sumo todos los datos de los dias del mes de daysData (guardando el numero de objetos), los borro
        e inserto la media de los valores (suma/numObjetos) y la fecha con el mes y el anio"""
    if dates_month[-1].split('-')[0] == '01' and len(dates_month) >= 2:
        if dates_month[-1].split('-')[1] != dates_month[-2].split('-')[1]: # Elimino todos los dias del mes anterior de daysData
            month_data = []
            valuesT = 0.0
            valuesT_money = 0.0
            
            month_year = dates_month[0].split("-")[1] + "-" + dates_month[0].split("-")[2]
            month_data.append( month_year )
            
            for f in dates_month[:-1]:
                document = daysData_collection.find_one( {'date':f} )
                valuesT += float(document['total'])
                valuesT_money += float(document['total_money'])
                print("-- f:{}  daysData_document:{}  valuesT:{}  valuesT_money:{} --".format(f, document, valuesT, valuesT_money))
            
            valuesM = valuesT/float( len(dates_month[:-1]) )
            valuesM_money = valuesT_money/float( len(dates_month[:-1]) )
            print("num elements:{}  valuesM:{}  valuesM_money:{}".format(len(dates_month[:-1]), valuesM, valuesM_money))
            month_data.append( valuesT )
            month_data.append( valuesM )
            month_data.append( valuesT_money )
            month_data.append( valuesM_money )
            
            [ [daysData_collection.remove( {'date': d} )] for d in dates_month[:-1] ]
            print("daysData: Delete all documents of the year {}".format(dates_month[0].split("-")[1]))
            
            d_month = dates_month[-1]
            dates_month = []
            dates_month.append( d_month )
            
            res.append(True)
    else:
        res.append(False)
    
    """Si es Diciembre, sumo todos los datos de los meses de monthData (guardando el numero de objetos), los borro
        e inserto la media de los valores (suma/numObjetos) y la fecha con el anio"""
    if len(dates_year) != 0:
        if dates_year[-1].split('-')[0] == 'Dec': # Elimino todos los meses del anio anterior de monthData
            year_data = []
            valuesT = 0.0
            valuesT_money = 0.0
            
            year = dates_month[0].split("-")[2]
            year_data.append( year )
            
            for f in dates_year:
                monthData_document = monthData_collection.find_one( {'date':f} )
                valuesT += float(monthData_document['total'])
                valuesT_money += float(document['total_money'])
                print("-- f:{}  monthData_document:{}  valuesT:{}  valuesT_money:{} --".format(f, monthData_document, valuesT, valuesT_money))
            
            valuesM = valuesT/float( len(dates_year) )
            valuesM_money = valuesT_money/float( len(dates_year) )
            print("num elements year:{} valuesM:{}  valuesM_money:{}".format(len(dates_year), valuesM, valuesM_money))
            year_data.append( valuesT )
            year_data.append( valuesM )
            year_data.append( valuesT_money )
            year_data.append( valuesM_money )
        
            [ [monthData_collection.remove( {'date': d} )] for d in dates_year ]
            print("monthData: Delete all documents from {}".format(dates_year[0].split("-")[1]))
            dates_year = []
            
            res.append(True)
    else:
        res.append(False)
    
    return res



def init():
    global stnucleo_port
    global reception_of_data_th_active
    global send_data_to_db_th_active
    
    stnucleo_port = open_nucleo_port ()
    initializeMeditions = "i"
    stnucleo_port.write(initializeMeditions.encode())
    
    reception_of_data_th_active = True
    send_data_to_db_th_active = True
    
    thread1 = threading.Thread(target = reception_of_data)
    thread2 = threading.Thread(target = send_to_database)
    print("Starting threads...")
    thread1.start()
    thread2.start()
 


if __name__ == "__main__":
    init()
