//------------ libs ----------
var fs = require("fs");
var project = require('./package.json');
const http = require('http');
var dgram = require('dgram');
//const url = require('url');
///var filePath = project.config.configfile;
var exportJson=[];
var fileToSave;
var tcpCon=false;
var configfile='';


let nodePath = process.argv[0];
let appPath = process.argv[1];
console.log("Cmd file",appPath);

try {
     var configfile = process.argv[2];
     filePath = configfile;
     pyfile = configfile.replace(/\b.json\b/g, "") + '.py';
} catch {

     filePath = project.config.configfile;
     configfile = project.config.configfile;
     pyfile = project.config.configfile.replace(/\b.json\b/g, "") + '.py';
}
console.log("Conf file: ",configfile,"\nPython file: ",pyfile);


//------------ open json -------------------------------------------------------------------------------------------
try {
   fs.readFile(filePath,  'utf8',(err, data) => {
   if (err) {
       console.error(err);
       return;
   }
   fileToSave = firstString();
   var parsJson = parsingModelJson(data);
   readData(parsJson);
   fileToSave = fileToSave + endString();
   fileToSave = fileToSave + lastString(parsJson) ;

   fs.writeFile(pyfile, fileToSave, (err) => {
      if (err) {
         console.error(err)
         return
       }
   });
   if(project.config.pythonStart == true) {
      require('child_process').exec("start cmd  /c \""+project.config.python+" "+pyfile+"\"");  
   }
   startUDPServer();
   startHttpServer();

   /**------------------------------------------------------------------------ archive ---------------------------------------------------------------- */
   if(project.config.archive == true) {
       setInterval(function() {   
           var archFile =  project.config.archivePath+'\\'+ getNowDate()+'.csv'  ;
           var dataSave = '';
           var dataGet = exportJson;
           try {
                 var  i=0;   
                 while (i < dataGet.length) {
                     dataSave = dataSave + dataGet[i].d+';'+dataGet[i].t+';'+dataGet[i].val+';'+dataGet[i].id+'\n';
                     i++;
                 }
 
                 fs.appendFile(archFile, dataSave, (err) => {
                     if (err) {
                       console.error(err)
                       return
                     }
                 });
            } catch(e)
            {}
           archFile = null;
           dataSave = null;
           dataGet  = null; 
           i        = null;   
        }, project.config.archiveTime * 60000);
    }

});
}  catch(e) {
  console.log(e);
}
//////////////////////////////////////////////////////////////////////// 

function startHttpServer() {


  const requestListener = function (req, res) {
    res.writeHead(200);
    res.end(JSON.stringify(exportJson));
    //console.log(req);
    if(req.url !== '/') {

    /**----------------------------------control block ------------------------------------- */
        try {    
               var getData = JSON.parse(decodeURI(req.url.slice(2)));
            //   console.log(getData);
               var message = '{"dev":"'+getData.dev+'","com":"'+getData.com+'"}';
               var client = dgram.createSocket('udp4');
               client.send(message, 0, message.length, parseInt(project.config.controlUDPport),project.config.controlUDPserver , function(err, bytes) {
                       client.close();     
               });
              
         } catch {

         }
         var getData = null;
         var message = null;
         //var client = null; 
    /**----------------------------------control block ------------------------------------- */      
    } else {

     // res.end(JSON.stringify(exportJson));

    }
  }
  
  const server = http.createServer(requestListener);
  server.listen(project.config.portHttp);
}






function startUDPServer() {
/*  server start */
     var PORT = project.config.portUDP;
     var HOST = project.config.hostUDP;


     var server = dgram.createSocket('udp4');

     server.on('listening', function() {
       var address = server.address();
       console.log('UDP Server listening on ' + address.address + ':' + address.port);
     });
     server.on('message', function(message, remote) {
       /**      work place     */
       addToArray({ "d": JSON.parse(message).d,"t": JSON.parse(message).t,"val":JSON.parse(message).val,"id":JSON.parse(message).id },JSON.parse(message).id);
       if(project.config.debug == true) {
          console.log(remote.address + ':' + remote.port +' - ' + message);
          
        }  
     });

server.bind(PORT, HOST);
}


function readData(parsData) {

  var x;
  for (x = 0; x < parsData.devs.length; ++x) {

    if(parsData.devs[x].port.split(':').length == 1) {
       fileToSave = fileToSave +`\ndef device_`+x+`(f=1):
         comPort = '`+parsData.devs[x].port+`'
         comBaudrate = `+parsData.devs[x].baudrate+`
         SerialPort = serial.Serial(comPort,comBaudrate, bytesize=8, parity='N', stopbits=1, xonxoff=0)
         master=modbus_rtu.RtuMaster(SerialPort)
         master.set_timeout(`+project.config.timeout+`)
         while True:
             try:
                time.sleep(`+project.config.timeout+`)
                gc.collect()
     `;
     tcpCon=false;
    } else {
      fileToSave = fileToSave +`\ndef device_`+x+`(f=1):
     
         devHost = '`+parsData.devs[x].port.split(':')[0]+`' 
         devPort = int('`+parsData.devs[x].port.split(':')[1]+`')
         master=modbus_tcp.TcpMaster(host=devHost, port=devPort)
         master.set_timeout(`+project.config.timeout+`)
         while True:
             try:
                time.sleep(`+project.config.timeout+`)
                gc.collect()
      `;

      tcpCon=true;

    }
   

    
        var i;
        for (i = 0; i < parsData.devs[x].rtu.length; ++i) {
             var ii;  
           
             for (ii = 0; ii < parsData.devs[x].rtu[i].register.length; ++ii) {
                  var iii;
                  for (iii = 0; iii < parsData.devs[x].rtu[i].register[ii].net.length; ++iii) {
                 
                       readRTU(parsData.devs[x].rtu[i].rtuadr,
                          parsData.devs[x].rtu[i].register[ii].regtype,
                          parsData.devs[x].rtu[i].register[ii].net[iii].regadr,
                          parsData.devs[x].rtu[i].register[ii].net[iii].vartype,
                          parsData.devs[x].rtu[i].register[ii].net[iii].koef,
                          parsData.devs[x].rtu[i].register[ii].net[iii].varname
                          );
                   }
              }
         }

         if(tcpCon == false) {
          fileToSave = fileToSave +`
             except Exception as e:
                 print('Comport Error ',comPort,e)
                 try:
                     SerialPort = serial.Serial(comPort,comBaudrate, bytesize=8, parity='N', stopbits=1, xonxoff=0)
                     master=modbus_rtu.RtuMaster(SerialPort)
                     master.set_timeout(1)
                     time.sleep(1)
                     print('Port opened',comPort)
                 except Exception as e:
                     pass
                 pass      
           `;
         } 
 
         if(tcpCon == true) {
          fileToSave = fileToSave +`
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
           `;

         }        


   } 
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function readRTU(rtuadr,regtype,regadr,vartype,koef,varname) {
  /*-- 0x3  readHoldingRegisters --*/
  //console.log(regtype);
   if(regtype === 'readHR')  {
       
           try { 
                   if(vartype === 'Float') { 
                      if(regadr.split(':').length == 1) {
                         fileToSave = fileToSave + '\n                READ_HOLDING_REGISTERS(master,'+rtuadr+','+regadr+',1,'+koef+',\''+varname+'\',\''+vartype+'\')';
                        // if(tcpCon == true) {
                         fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';
                       //  } else {
                          //  fileToSave = fileToSave + '\n          time.sleep(0.1)';
                        // }
                      }

                      if(regadr.split(':').length == 2) {
                           if(regadr.split(':')[1] == 2) {
                              fileToSave = fileToSave + '\n                READ_HOLDING_REGISTERS(master,'+rtuadr+','+regadr.split(':')[0]+',2,'+koef+',\''+varname+'\',\''+vartype+'\')';
                              fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';
                               }
                     }
                 }
                 if(vartype === 'uInt') { 
                     fileToSave = fileToSave + '\n                READ_HOLDING_REGISTERS(master,'+rtuadr+','+regadr+',1,'+koef+',\''+varname+'\',\''+vartype+'\')';
                     fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';
       }
                 if(vartype === 'sInt') { 
                     fileToSave = fileToSave + '\n                READ_HOLDING_REGISTERS(master,'+rtuadr+','+regadr+',1,'+koef+',\''+varname+'\',\''+vartype+'\')';
                     fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';
       }
     
            } catch(e) {

            }
       
   } else if( regtype === 'readDI' ) {
        /*-- 0x2 readDiscreteInputs readDiscreteInputs(addr, arg) --*/
       

       fileToSave = fileToSave + '\n                READ_DISCRETE_INPUTS(master,'+rtuadr+','+regadr+',\''+varname+'\')';
       fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';


   } else if(regtype === 'readCoils' ){
       /* -- 0x1  readCoils readCoils(coil, len) --*/
       fileToSave = fileToSave + '\n                READ_COILS(master,'+rtuadr+','+regadr+',\''+varname+'\')';
       fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';
   } else if(regtype === 'writeSCoil' ){
  /* -- 0x5  writeCoils readCoils(coil, len) --*/
       fileToSave = fileToSave + '\n                WRITE_SINGLE_COIL(master,'+rtuadr+','+regadr+',\''+varname+'\')';
       fileToSave = fileToSave + '\n                time.sleep('+project.config.timeoutRTU+')';
    }



}

function addToArray(arrData,varname){
     var mark;
     if(exportJson.length > 0) {
     } else {
        exportJson.push(arrData);
     }
    mark = exportJson.findIndex(x => x.id === varname);
    if(mark > -1) {
      exportJson[mark].val = arrData.val;
      exportJson[mark].d = arrData.d;
      exportJson[mark].t = arrData.t;

    } else {

      exportJson.push(arrData);
    }
}



function getNowDate(){
  var now = new Date();
  var dt = ('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth()+1)).slice(-2) + '.'
             + now.getFullYear();
   return dt;
}

function getNowTime(){
    var now = new Date();
    var dt = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':'
    + ('0' + now.getSeconds()).slice(-2);
   return dt;
}

function parsingModelJson(data) {
    var retVal='';
    var pdata = JSON.parse(data);
 
    var mainJson={};
    var devs = [];
    var devid=0;
    let i=0;
    while (i < pdata.nodeDataArray.length) {
         
         if ( pdata.nodeDataArray[i].category === "Port") { 

              var portKey  = pdata.nodeDataArray[i].key;
              var portName = pdata.nodeDataArray[i].text;
              var baudrate = getValueText(pdata,getKeyTo(pdata,portKey));
              var baudrateKey = getKeyTo(pdata,portKey);
              devs.push({ "port": portName,"baudrate":baudrate,"rtu": []  }) ;
              mainJson['devs']=devs ;
              let x =0;
              while (x < pdata.linkDataArray.length) {
                if ( pdata.linkDataArray[x].from === baudrateKey) {   
                     var devAddr = getValueText(pdata,pdata.linkDataArray[x].to);
                     var devAddrKey = pdata.linkDataArray[x].to;
                     let xx=0;
                     while (xx < pdata.linkDataArray.length) {
                         if (  pdata.linkDataArray[xx].from === devAddrKey) {   
                               var register = getValueCategory(pdata,pdata.linkDataArray[xx].to);
                               var registerKey = pdata.linkDataArray[xx].to;
                               var reg = [];
                               var adr = []; 
                               let xxx=0;
                               while (xxx < pdata.linkDataArray.length) {
                                     if (pdata.linkDataArray[xxx].from === registerKey) { 
                                         let xxxx=0;
                                         var vartype='';
                                         var koef ='';
                                         var varname='';
                                         while (xxxx < pdata.linkDataArray.length) {
                                             if ( pdata.linkDataArray[xxxx].from === pdata.linkDataArray[xxx].to) { 
                                                  let xxxxx=0;
                                                   while (xxxxx < pdata.linkDataArray.length) {
                                                      if ( pdata.linkDataArray[xxxxx].from === pdata.linkDataArray[xxxx].to) { 
                                                           let xxxxxx=0;
                                                           while (xxxxxx < pdata.linkDataArray.length) {
                                                               if ( pdata.linkDataArray[xxxxxx].from === pdata.linkDataArray[xxxxx].to) {
                                                                    varname =getValueText(pdata,pdata.linkDataArray[xxxxxx].to); 
                                                               }
                                                               xxxxxx++;
                                                           } 
                                                           koef = getValueText(pdata,pdata.linkDataArray[xxxxx].to); 
                                                       }
                                                   xxxxx++;
                                                  }
                                                  vartype = getValueText(pdata,pdata.linkDataArray[xxxx].to);   
                                             }
                                             xxxx++; 
                                         }   
                                     adr.push({ "regadr": getValueText(pdata,pdata.linkDataArray[xxx].to),"vartype": vartype,"koef":koef,"varname":varname }) ;
                                   }
                                   xxx++;
                               }    
                               reg.push({ "regtype": register,"net":adr }) ;
                               mainJson.devs[devid].rtu.push({ "rtuadr": devAddr,"register":reg }) ;
                              //console.log(mainJson.devs);
                             // console.log(devid,JSON.stringify(mainJson.devs[devid]));
                         }
                      xx++;
                     }
                }
               x++; 
              }
           devid++;    
           retVal= mainJson;
           //console.log(JSON.stringify(mainJson));  
         }
     i++;
    }
    //console.log(JSON.stringify(mainJson));
   return  retVal; 
}
  
function getKeyTo(pdata,keyfrom) {
 let x =0;
 var keyto='';
 while (x < pdata.linkDataArray.length) {
        if ( pdata.linkDataArray[x].from === keyfrom) {   
             keyto =  pdata.linkDataArray[x].to ;   
         }
      x++;
 }
 return keyto;
}
function getValueText(pdata,key) {
 let x =0;
 var keyto='';
 while (x < pdata.nodeDataArray.length) {
        if ( pdata.nodeDataArray[x].key === key) {   
             keyto =  pdata.nodeDataArray[x].text ;   
         }
      x++;
 }
 return keyto;
}

function getValueCategory(pdata,key) {
 let x =0;
 var keyto='';
 while (x < pdata.nodeDataArray.length) {
        if ( pdata.nodeDataArray[x].key === key) {   
             keyto =  pdata.nodeDataArray[x].category ;   
         }
      x++;
 }
 return keyto;
}
function firstString() {
  data = `
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
`;
return data;
}

function endString() {
 //console.log('------------------------------------------------------------------');
data = `
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
             server_address_udp = ('`+project.config.sendUDPadr+`', `+project.config.sendUDPport+`)
         except Exception as e:
             print('UDP fail ',e)
         time.sleep(1.0)
         print( 'Starting modbus client')
         time.sleep(1.0)
         udpserv = threading.Thread(target=udpServer,args=(1,))
         udpserv.daemon = True
         udpserv.start()            
         
         `;
 return data;

}






function lastString(parsJson) {
  var data2=``;
  var ld;
  var xx;
  for (xx = 0; xx < parsJson.devs.length; ++xx) {
      data2 =data2 + `   
         modb_`+xx+` = threading.Thread(target=device_`+xx+`,args=(1,))
         modb_`+xx+`.daemon = True
         modb_`+xx+`.start()`;
      ld=  `\n         modb_`+xx+`.join()`;  
} 

data2 = data2 + ld+`
            
     except Exception as e:
        print(e)`;
     return data2;     
}