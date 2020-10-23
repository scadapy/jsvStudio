//require('nw.gui').Window.get().showDevTools();


var dialog = require('nw-dialog');
var fs = require("fs");
var pjson = require('./package.json');
window.os = require('os');
dialog.setContext(document); 

var svgArr;
var mainJFile;
var pathType='';
var txtLog;
var txtLogAllow;
var jsonTemp ;
var jsonSysTree;
var jsonNodeTree;
var  tempNode;

var prPath=process.cwd();
var sysTimer;
var serverJson;
var projectPath;
var realNode; 

if(window.os.platform() === 'win32') {
     pathType='\\json\\';
}
else {
     pathType='/json/';
}


document.title = pjson.window.title+" v."+pjson.version ;


createMenu();

/*-----------------------------------------------parsing data from server----------------------------------------------------------------*/
function parseReq(data){
   var dataGet = JSON.parse(data);
   $.each(dataGet, function(i, item) {
      $.each(jsonTemp.svgobj, function(x, item){
       if(dataGet[i].id === jsonTemp.svgobj[x].link){
         if(jsonTemp.svgobj[x].type === 'analog'){
           setAnalog('#'+jsonTemp.svgobj[x].id,
                     jsonTemp.svgobj[x].maxvalue,
                     jsonTemp.svgobj[x].minvalue,
                     jsonTemp.svgobj[x].colornormal,
                     jsonTemp.svgobj[x].colorup,
                     jsonTemp.svgobj[x].colordown,
                     jsonTemp.svgobj[x].upalarm,
                     jsonTemp.svgobj[x].downalarm,
                     dataGet[i].val);
         }
         if(jsonTemp.svgobj[x].type === 'discrete'){
             setDiscrete('#'+jsonTemp.svgobj[x].id, 
                       jsonTemp.svgobj[x].coloron,
                       jsonTemp.svgobj[x].coloroff,
                       jsonTemp.svgobj[x].invert,
                       dataGet[i].val);           
         }
       }
       else {
    

       }
   
  
     });
   });


         if(pjson.config.alarmTime == true) {
            $.each(jsonTemp.svgobj, function(x, item){
                 $.each(dataGet, function(i, item) {
                    if(dataGet[i].id === jsonTemp.svgobj[x].link){
                         try {
                            var tm = new Date(Date.now());
                            var objtm= parseInt(dataGet[i].t.split(':')[0]) * 60 + parseInt(dataGet[i].t.split(':')[1]) ;
                            var nowtm = parseInt(tm.getHours()) * 60 + parseInt(tm.getMinutes()) ;
                            if((nowtm - objtm) > pjson.config.alarmTimeDifference) {
                                if(jsonTemp.svgobj[x].type === 'discrete'){
                                 setDiscrete('#'+jsonTemp.svgobj[x].id, 
                                 'black',
                                 'black',
                                 jsonTemp.svgobj[x].invert,
                                 dataGet[i].val);           
                                }
                                if(jsonTemp.svgobj[x].type === 'analog'){
                                   setAnalog('#'+jsonTemp.svgobj[x].id,
                                         jsonTemp.svgobj[x].maxvalue,
                                         jsonTemp.svgobj[x].minvalue,
                                         'red','red','red',
                                         jsonTemp.svgobj[x].upalarm,
                                         jsonTemp.svgobj[x].downalarm,
                                        'Error');
                                 }
                             }
                             tm = null;
                             objtm= null;
                             nowtm = null ; 
                          }  catch(e){
                          }
                     }
                }); 
             });
         }
   data=null;
}






function setAnalog(id,maxvalue,minvalue,cnormal,cup,cdown,upalarm,downalarm,value) {
    try{
       if(id.indexOf('clgauge') === 1){
         var sCircle = $(id).find('circle')[1];
         var sTxt = $(id).find('text')[0];
         if(value < 999) {
            $(sTxt).text(value.toFixed(2));
         } else if (value < 9999)  {
            $(sTxt).text(value.toFixed(1));
         } else  {
          $(sTxt).text(value.toFixed(0));
         }   
         var nval=parseFloat(value)*100/parseFloat(maxvalue);
              
         $(sCircle).css('stroke-dasharray',nval+',100');
         $(sCircle).css('stroke', cnormal);  
         $(sTxt).css('stroke', cnormal).css('fill', cnormal);  
         
         if( parseFloat(value) >  parseFloat(upalarm)) {
           $(sCircle).css('stroke', cup);
           $(sTxt).css('stroke', cup).css('fill', cup);  
         }
         if( parseFloat(value) <  parseFloat(downalarm)) {
           $(sCircle).css('stroke', cdown);
           $(sTxt).css('stroke', cdown).css('fill', cdown);  
         }         
        }         
      /*
     if(id.indexOf('cgauge') === 1){
       var gauge = $(id);
       var val=value*180/maxvalue;
       $(gauge).attr('transform','rotate('+val+',18.620306,-12.560863) ');
       
        $(gauge).css('stroke', cnormal);
         if( parseFloat(value) >  parseFloat(upalarm)) {
           $(gauge).css('stroke', cup);
         }
         if( parseFloat(value) <  parseFloat(downalarm)) {
           $(gauge).css('stroke', cdown);
         } 
     }     
     
     if(id.indexOf('gauge') === 1){
       var gauge = $(id);
       var xx=parseFloat($(gauge).attr('x'))+31;
       var val=value*180/maxvalue;
       $(gauge).attr('transform','rotate('+val+','+$(gauge).attr('x2')+','+$(gauge).attr('y2')+') ');
     } 
   */
     if(id.indexOf('txt') === 1){
        $(id).find('rect').css('fill', cnormal);
        if( parseFloat(value) >  parseFloat(upalarm)) {
            $(id).find('rect').css('fill', cup);
         }
         if( parseFloat(value) <  parseFloat(downalarm)) {
           $(id).find('rect').css('fill', cdown);
         } 
         if(value < 9999) {
            $(id).find('text').text(value.toFixed(2));
         } else if (value < 99999) {
            $(id).find('text').text(value.toFixed(1));
         } else {
          $(id).find('text').text(value.toFixed(0));

         }
            



      } 
     /*
     if(id.indexOf('vert') === 1){
         //console.log($(id).find('rect')[1]) ;

         var objFront = $(id).find('rect')[1];
         var objBack =  $(id).find('rect')[0];
         var w = objBack.getAttribute('width');
         
         var h = objBack.getAttribute('height');
         var y = objBack.getAttribute('y');
         var  nwidth ;
         var  nheight ;
         nheight = (parseFloat(value) * h) / 100;
         objFront.setAttribute('height',nheight); 
       
         
         $(objBack).css('fill', cnormal).css('stroke', '#696969ff');
         if( parseFloat(value) >  parseFloat(upalarm)) {
           $(objBack).css('fill', cup).css('stroke', '#696969ff');
         }
         if( parseFloat(value) <  parseFloat(downalarm)) {
           $(objBack).css('fill', cdown).css('stroke', 'black');
         }
         $(objFront).css('fill', 'black').css('stroke', 'black');
     } 
          
     if(id.indexOf('horiz') === 1){
         var objFront = $(id).find('rect')[1];
         var objBack =  $(id).find('rect')[0];
         var w = objBack.getAttribute('width');
         var h = objBack.getAttribute('height');
         var y = objBack.getAttribute('y');
         var  nwidth ;
         var  nheight ;
         if(parseFloat(w) > parseFloat(h) ){
             nwidth = (value * w) / maxvalue;
             objFront.setAttribute('width',nwidth); 
             $(objFront).css('fill', cnormal).css('stroke', '#696969ff');
             if( parseFloat(value) >  parseFloat(upalarm)) {
               $(objFront).css('fill', cup).css('stroke', '#696969ff');
             }
             if( parseFloat(value) <  parseFloat(downalarm)) {
                $(objFront).css('fill', cdown).css('stroke', '#696969ff');
             }
         }
     } */
   }
   catch(e){
     
   }
   id=null;
   maxvalue=null;
   minvalue=null;
   cnormal=null;
   cup=null;
   cdown=null;
   upalarm=null;
   downalarm=null;
   value=null;

}

function setDiscrete(id,coloron,coloroff,invers,state) {
   try{
     if(state === 1) {
       if(invers === '0'){
         $(id).css('fill', coloron).css('stroke', coloron);
       }
       if(invers === '1'){
         $(id).css('fill', coloroff).css('stroke', coloroff);
       }
     }
     if(state === 0) {
       if(invers === '0'){
         $(id).css('fill', coloroff).css('stroke', coloroff);
       }
       if(invers === '1'){
         $(id).css('fill', coloron).css('stroke', coloron);
       }
     }
   }
   catch(e){
     console.log(e);
   }

   id=null;
   coloron=null;
   coloroff=null;
   invers=null;
   state=null;
}
   

function getNowDate(){
   var now = new Date();
   var nowfrom = new Date();
    
   var dt = now.toLocaleDateString("ru-RU", {
       year: "numeric",
       month: "2-digit",
       day: "2-digit", 
   });
   nowfrom.setDate(now.getDate() - pjson.config.trenddtfrom);
   var dtfrom = nowfrom.toLocaleDateString("ru-RU", {
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
    });
    dt=dt.replace(".","-").replace(".","-");
    dtfrom=dtfrom.replace(".","-").replace(".","-");
    window.sendData.dtfrom=dtfrom;
    window.sendData.dt=dt;
    now     =null;
    nowfrom =null;
    dt      =null;
    dtfrom  =null;
}
