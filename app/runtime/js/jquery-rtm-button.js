

function initsvg(id,objtype){	
    if(objtype === 'control') {
     // console.log(id);
      $.each(jsonTemp.svgobj, function(x, item){
      //  console.log(jsonTemp.svgobj[x].id);
        
        if(id === jsonTemp.svgobj[x].id){
        //  console.log(id,jsonTemp.svgobj[x].id,jsonTemp.svgobj[x].name);
          var d=Math.floor(Math.random() * 1000000);
          var divid = 'c_'+d.toString();
          $("<div style=''/>").attr('id',divid).appendTo('body').addClass("controlBlock").css("position","absolute")
          .append(`<span onClick="hideVideo(`+divid+`)" style="cursor: pointer;background-color:white;color:dimgrey;font: 300 20px tahoma;">&nbsp;X&nbsp;</span>`)
          .append(`<div style="text-align:center;"><span style="background-color:black;color:white;font: 300 20px tahoma;">`+jsonTemp.svgobj[x].name+`</span></div>`)           
          .append(`<button class='svgEdit'  onclick="sendControl( 'on','`+jsonTemp.svgobj[x].id+`')" style="width:80px;margin-top:5px;margin-bottom:5px;" >ON</button>`)
          .append(`<button class='svgEdit'  onclick="sendControl('off','`+jsonTemp.svgobj[x].id+`')" style="width:80px;margin-top:5px;margin-bottom:5px;" >OFF</button>`)
          .draggable();  
           
        }
      });
    }
    if(objtype === 'media') {
      $.each(jsonTemp.svgobj, function(x, item){
        if(id === jsonTemp.svgobj[x].id){
          var d=Math.floor(Math.random() * 1000000);
          var divid = 'v_'+d.toString();
          $("<div style=''/>").attr('id',divid).appendTo('body').addClass("videoBlock").css("position","absolute")
          .append(`<iframe id="streamWeb" name="video" src="`+jsonTemp.svgobj[x].link+`" style='width:100%;height:100%;margin-left: -2px;' ></iframe>`)
          .append(`<div  style="text-align:center;width: 100%;top:0px;left:0px;position: absolute;cursor: pointer;background-color:white;color:dimgrey;font: 300 25px tahoma;">Link</div>`)  
          .append(`<span onClick="hideVideo(`+divid+`)" style="top:0px;right:0px;position: absolute;
          cursor: pointer;background-color:white;color:dimgrey;font: 300 25px tahoma;">&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;</span><br>`)
          .draggable().resizable(); 
        }
      });
    }
   
    if(objtype === 'log') {
     $.each(jsonTemp.svgobj, function(x, item){
       if(id === jsonTemp.svgobj[x].id){
         var d=Math.floor(Math.random() * 1000000);
         var divid = 'v_'+d.toString();
         txtLog=`#`+divid+`a`;
          // console.log(jsonTemp.svgobj[x].link);
           
         try{
          $.ajax({
                url: jsonTemp.svgobj[x].link,
                contentType: "application/x-www-form-urlencoded;charset=utf8",                 
                type: "GET",     
                headers: {
                  "Authorization": "Basic " + btoa(jsonTemp.svgobj[x].login + ":" + jsonTemp.svgobj[x].password)
                },              
                success: function(data){
               //.css("overflow","auto")
                $("<div style=''/>").attr('id',divid).appendTo('body').addClass("videoBlock").css("position","absolute")
                 .append(`<span onClick="hideLog(`+divid+`)" style="cursor: pointer;background-color:white;color:dimgrey;font: 300 15px tahoma;">&nbsp;&nbsp;X&nbsp;&nbsp;</span><br>`)
                 .append(data).draggable().resizable();    
                         data=null;  
                },
                error: function (request, status, error) {
                       console.log(request, status, error);                          
                }
             
           });
         }
         catch(e){
           console.log(e);                          
         }             
       }
     });
   }







   
    if(objtype === 'trend') {
      $.each(jsonTemp.svgobj, function(x, item){
        if(id === jsonTemp.svgobj[x].id){
          window.sendData={srvlink:jsonTemp.svgobj[x].link,lg:jsonTemp.svgobj[x].login,psw:jsonTemp.svgobj[x].password};
          showTrendMenu();
        }
      });       
    }

    if(objtype === 'analog') {
     if(pjson.config.trendallow === true) {    
      $.each(jsonTemp.svgobj, function(x, item){
        if(id === jsonTemp.svgobj[x].id){
            window.sendData={srvlink:pjson.config.trendserver,lg:pjson.config.trendlogin,psw:pjson.config.trendpassword,
                             name:jsonTemp.svgobj[x].name,maxvalue:jsonTemp.svgobj[x].maxvalue,minvalue:jsonTemp.svgobj[x].minvalue,
                             upalarm:jsonTemp.svgobj[x].upalarm,downalarm:jsonTemp.svgobj[x].downalarm,link:jsonTemp.svgobj[x].link};
            showTrendOnline('trnd_'+Math.floor(Math.random() * 1000000).toString(),id);
        }
      });       
    }
   }
}


/**----------------------------pop up mark --------------------------------------------------------- */
function objdescr(objattr) {
    if(pjson.config.objmark === true) {
      try {
          $.each(jsonTemp.svgobj, function(x, item){
              if(objattr === jsonTemp.svgobj[x].id){
                  $.each(JSON.parse(serverJson), function(i, item) {
                      if(JSON.parse(serverJson)[i].id === jsonTemp.svgobj[x].link){
                          $('#objmark').html("<b>"+JSON.parse(serverJson)[i].t+" "+JSON.parse(serverJson)[i].d+"</b><br>"+jsonTemp.svgobj[x].name +"("+jsonTemp.svgobj[x].upalarm+")");          
                          $("#objmark").css("top", event.pageY);
                          $("#objmark").css("left", event.pageX);
                          $('#objmark').css("visibility", "visible");              
                          return false;  
                      }
                  });
                  return false;   
              }
          });
      } 
      catch(e){
       //console.log(e);
      }
    }
    objattr=null;
}


function objdescrout(objattr) {
   if(pjson.config.objmark === true) {
     $('#objmark').css("visibility", "hidden");
     $('#objmark').empty();    

   }
   objattr=null;
}


/** -------------right buttom click ------------------------------------------------------ */
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

function hideTrendMenu(id){
    $(id).css("visibility", "hidden"); 
    $(id).empty();
 
}
function hideTrendBox(id){
    try{
   // console.log(id);
    $(id).css("visibility", "hidden"); 
    $(id).empty();
    $(id).remove();
    
    }
    catch(e){
      console.log(e);
    }
}



function hideVideo(id){
    $(id).css("visibility", "hidden"); 
    $(id).empty();

}

function hideLog(id){
    $(id).css("visibility", "hidden"); 
    $(id).empty();
    txtLogAllow=false;
    try {
         clearInterval(logTimer);
    } 
    catch(e){
     //console.log(e);                          
   }   
}


/**--------------------------------------------- control command---------------------------- */
function sendControl(cmd,id){
    var name;
    var links;
    var login;
    var password;
    var on;
    var off;
    var slink;
    var command;
 
    $.each(jsonTemp.svgobj, function(x, item){
          if(id === jsonTemp.svgobj[x].id){
            name=jsonTemp.svgobj[x].name;
            links=jsonTemp.svgobj[x].link;
            login=jsonTemp.svgobj[x].login;
            password=jsonTemp.svgobj[x].password;
            on=jsonTemp.svgobj[x].on;
            off=jsonTemp.svgobj[x].off;
          }
    });
    if(cmd === 'on') {
      slink=on;
      command='on';
    }
    if(cmd === 'off') {
      slink=off;
      command='off';
    }
      if(confirm("Послать команду -"+cmd+"- для "+name+" ?")) {
         var tosend = JSON.stringify({
         dev: links,
         com: command, });
          $.ajax({
              url: slink,
              username: login,
              password: password, 
              contentType: 'application/json',
              data:  tosend ,
            //  type: "GET",   
              dataType: 'json',          
              success: function(data){
                
              },
                error: function (request, status, error) {
                         
                }
                
              });       
      }
 
 }

 
function closeRMenu(){ 
    $("#rightMenu").css("visibility", "hidden");
 }
 