
import time
import modbus_tk
import modbus_tk.defines as cst
import modbus_tk.modbus_tcp as modbus_tcp
from modbus_tk import modbus_rtu
import serial
import gc
import socket
import threading
import json
import datetime
import struct
controlAllow = False
controlJson = ''

def device_0(f=1):
     
         devHost = '127.0.0.1' 
         devPort = int('502')
         master=modbus_tcp.TcpMaster(host=devHost, port=devPort)
         master.set_timeout(1)
         while True:
             try:
                time.sleep(1)
                gc.collect()
      
                READ_COILS(master,1,0,'CI0')
                time.sleep(0.1)
                READ_DISCRETE_INPUTS(master,1,0,'DI0')
                time.sleep(0.1)
                WRITE_SINGLE_COIL(master,1,0,'TU0')
                time.sleep(0.1)
                READ_HOLDING_REGISTERS(master,1,0,1,0.1,'HR0','uInt')
                time.sleep(0.1)
             except Exception as e:
                 print('TCP Error ', devHost,e)
                 try:
                     print('Try tcp connect ')  
                     master=modbus_tcp.TcpMaster(host=devHost, port=devPort)
                     master.set_timeout(1)
                 except Exception as e:
                     print('Try tcp connect error',e) 
                     pass
                 pass      
           
def getDate():
     return datetime.datetime.today().strftime("%d.%m.%Y")

def getTime():
     return datetime.datetime.today().strftime("%H:%M:%S")

def convertData(var1,var2):
     t = (var1,var2)
     packed_string = struct.pack("HH", *t)
     unpacked_float = struct.unpack("f", packed_string)[0]
     return unpacked_float

def READ_HOLDING_REGISTERS(master,rtu,adr,c,k,varname,vtype): 
         data=''
         d=master.execute(rtu,cst.READ_HOLDING_REGISTERS,adr,c)
         if(vtype == 'sInt'):
             data =  (int(d[0]) + 2**15) % 2**16 - 2**15
         if(vtype == 'uInt'):
             data =  d[0] * k
         if(vtype=='Float'):
             if(c == 2):
               data = convertData(d[1],d[0]) * k
             if(c ==1 ):
              data = d[0] * k 
         sock_udp.sendto(json.dumps( {'val':round(data,1),'id':varname,'d': getDate(),'t': getTime()} ).encode('utf-8'), server_address_udp)    

def WRITE_SINGLE_COIL(master,rtu,adr,varname):
            global controlAllow
            global controlJson
            if(controlAllow == True): 
             # print('Command ',controlJson['dev'],controlJson['com'])
              if(varname == controlJson['dev']):  
                print('Command ',controlJson['dev'],controlJson['com'])
                if(controlJson['com'] == 'off'):
                   master.execute(rtu, cst.WRITE_SINGLE_COIL,adr, output_value=0)
                if(controlJson['com'] == 'on'):
                   master.execute(rtu, cst.WRITE_SINGLE_COIL,adr, output_value=1)
                controlAllow = False
def READ_DISCRETE_INPUTS(master,rtu,adr,varname): 
           data=''
           d=master.execute(rtu,cst.READ_DISCRETE_INPUTS,adr,1)
           data = d[0] 
           sock_udp.sendto(json.dumps( {'val':data,'id':varname,'d': getDate(),'t': getTime()} ).encode('utf-8'), server_address_udp)  


def READ_COILS(master,rtu,adr,varname): 
         data=''
         d=master.execute(rtu,cst.READ_COILS,adr,1)
         data = d[0] 
         sock_udp.sendto(json.dumps( {'val':data,'id':varname,'d': getDate(),'t': getTime()} ).encode('utf-8'), server_address_udp)
         
def udpServer(f=1):
         sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
         server_address = ('localhost', 64001)
         print('UDP server {} port {}'.format(*server_address))
         sock.bind(server_address)
         global controlAllow
         global controlJson
         while True:
             data, address = sock.recvfrom(4096)
             try:
                 controlJson = json.loads(data)
                 controlAllow = True
             except Exception as e:
                 print('command',e) 
                 pass              
 
if __name__ == "__main__":
     try:
         try:
             print( 'UDP sender start')
             sock_udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
             server_address_udp = ('127.0.0.1', 64000)
         except Exception as e:
             print('UDP fail ',e)
         time.sleep(1.0)
         print( 'Starting modbus client')
         time.sleep(1.0)
         udpserv = threading.Thread(target=udpServer,args=(1,))
         udpserv.daemon = True
         udpserv.start()            
         
            
         modb_0 = threading.Thread(target=device_0,args=(1,))
         modb_0.daemon = True
         modb_0.start()
         modb_0.join()
            
     except Exception as e:
        print(e)