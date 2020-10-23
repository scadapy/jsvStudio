//require('nw.gui').Window.get().showDevTools();
window.os     = require('os');
var pjson     = require('./package.json');
var fs        = require("fs");
var svgTables = require("./js/s.svgtable");
var dialog = require('nw-dialog');
dialog.setContext(document); 
var prPath=process.cwd();
var jsonSysTree;
var jsonNodeTree;
var  tempNode;
var svgArr;
var mainJFile;
var pathType='';
var projectPath;
var jsonTemp ;
document.title = pjson.window.title+" v."+pjson.version ;




/*project block*/
if(window.os.platform() === 'win32') {
     pathType='\\json\\';
}
else {
     pathType='/json/';
}

createMenu();

$( function() {
   $( "#svgTableEdit" ).draggable();
} );

$( function() {
   $( "#nodeTree" ).draggable();
} );
$( function() {
   $( "#editTree" ).draggable();
} );      

/*json block*/
function jsonGetObj() {
   var data ='';
   if($('#ObjectId').val() !== null) {
     data ={
            id:""+$('#ObjectId').val()+"",
            name:""+$('#ObjectName').val()+"",
            link:""+$('#ObjectLink').val()+"",
            type:""+$('#ObjectSignalType').val()+"",
            coloron:""+$('#ObjectColorOn').val()+"",
            coloroff:""+$('#ObjectColorOff').val()+"",
            alarmtype:""+$('#ObjectAlarmType').val()+"",
            invert:""+$('#ObjectInvert').val()+"",
            maxvalue:""+$('#ObjectMaxValue').val()+"",
            minvalue:""+$('#ObjectMinValue').val()+"",
            upalarm:""+$('#ObjectUpAlarm').val()+"",
            downalarm:""+$('#ObjectDownAlarm').val()+"",
            colornormal:""+$('#ObjectColorNormal').val()+"",
            colorup:""+$('#ObjectColorUp').val()+"",
            colordown:""+$('#ObjectColorDown').val()+"",
            login:""+$('#ObjectLogin').val()+"",
            password:""+$('#ObjectPassword').val()+"",
            on:""+$('#ObjectOn').val()+"",
            off:""+$('#ObjectOff').val()+""
         };
   }
   else {
   data=null;
   }
   return data;
}  

function jsonSaveObj(ObjectId) {
   var tempJ=jsonGetObj(); 
   var objNew=0;
   if (ObjectId !== null) {    
     let i = 0;
     while (i < jsonTemp.svgobj.length) { 
       if ( jsonTemp.svgobj[i].id === ObjectId) {
                 jsonTemp.svgobj[i].name=$('#ObjectName').val();
                 jsonTemp.svgobj[i].link=$('#ObjectLink').val();  
                 jsonTemp.svgobj[i].coloron=$('#ObjectColorOn').val();  
                 jsonTemp.svgobj[i].coloroff=$('#ObjectColorOff').val();  
                 jsonTemp.svgobj[i].alarmtype=$('#ObjectAlarmType').val();  
                 jsonTemp.svgobj[i].invert=$('#ObjectInvert').val();  
                 jsonTemp.svgobj[i].maxvalue=$('#ObjectMaxValue').val();  
                 jsonTemp.svgobj[i].minvalue=$('#ObjectMinValue').val();  
                 jsonTemp.svgobj[i].upalarm=$('#ObjectUpAlarm').val();  
                 jsonTemp.svgobj[i].downalarm=$('#ObjectDownAlarm').val();  
                 jsonTemp.svgobj[i].colornormal=$('#ObjectColorNormal').val();  
                 jsonTemp.svgobj[i].colorup=$('#ObjectColorUp').val();  
                 jsonTemp.svgobj[i].colordown =$('#ObjectColorDown').val() ; 
                 jsonTemp.svgobj[i].login =$('#ObjectLogin').val() ; 
                 jsonTemp.svgobj[i].password =$('#ObjectPassword').val() ; 
                 jsonTemp.svgobj[i].on =$('#ObjectOn').val() ; 
                 jsonTemp.svgobj[i].off =$('#ObjectOff').val() ; 
                 
                 objNew=1;
       }
       i++;
     }
   }
   if( objNew === 0 ) {
     jsonTemp.svgobj.push(tempJ);
   }
  
}

function hideSvgTable() {
   $("#svgTableEdit").css("visibility", "hidden");
   jsonSaveObj($('#ObjectId').val());

}
 

document.oncontextmenu = function () {
     getButton(event);
     return false;
};


function getButton(event){
    if(event.button === 2)
    {
       $("#rightMenu").css("visibility", "visible");
       $("#rightMenu").css("top", event.pageY);
       $("#rightMenu").css("left", event.pageX);
       
    }
}

function addNewNode(){ 
   var digit=Math.floor(Math.random() * 10000000);
   var nNode =`<li class='last'><span class='file' onclick="nodeTreeClick('n_`+digit.toString()+`')" id='n_`+digit.toString()+`' ><a href='#'>Node_`+digit.toString()+`</a></span></li>`;
   $('#nodeUlTree').after(nNode);
   $("#rightMenu").css("visibility", "hidden");
}



function removeNode(){
   let i = 0;
   while (i < jsonNodeTree.length) { 
     if ( jsonNodeTree[i].id === $('#nodeId').val()) {
            jsonNodeTree.splice(i,1); 
            svgArr.splice(i,1);
       }
       i++;
     }
  loadTree();
}

/* hide package.json runtime*/
function hideLog(id){
  $(id).empty();
  $(id).remove();
}

function objdescr(objattr) {
   objattr=null;
  
}

function objdescrout(objattr) {
   objattr=null;
}

