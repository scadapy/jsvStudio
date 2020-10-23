
/**------------------------tree click------------------------------------------------------------------- */
function loadTree(){
    $("#nodeTree").css("visibility", "hidden");
    var data=`<ul id="browser" class="filetree">
     <li class="closed"><span class="folder">Проекты</span><ul style="color: white;">
     <li style="color: white;"><span class="file" onclick="sysTreeClick()" id='sysTree'><a href="#">`+jsonSysTree.name+`</a></span></li></li></ul>
     <li class="closed"><span class="folder" id="nodeSchemes" >Схемы</span><ul id="nodeUlTree">`;
    let i = 0;
    while (i < jsonNodeTree.length) { 
      data+= `<li><span class="file" onclick="nodeTreeClick('`+jsonNodeTree[i].id+`','`+jsonNodeTree[i].name+`')" id='`+jsonNodeTree[i].id+`'><a href="#">`+jsonNodeTree[i].name+`</a></span></li>`;
      i++;
    }   
    data+=`</ul></li>`;
    $("#treeBlock").html(data); 
    $("#browser").treeview();   
    $("#treeBlock").css("visibility", "visible");
    data=null;    
 }
 function sysTreeClick(id,name){
 }
 
 
 /**----------------------------------------------------start timer requests------------------------------------------- */
 function nodeTreeClick(id,name) {
    realNode=name; 
  //  console.log(realNode);
    $("#svg-image").html('');
    let i=0;
    while (i < jsonNodeTree.length) { 
      if ( jsonNodeTree[i].id === id) { 
        var srv = jsonNodeTree[i].server;
        var login = jsonNodeTree[i].login;
        var password = jsonNodeTree[i].password;
        try{
          clearInterval(sysTimer);
          sysTimer = setInterval(function() { 
            try{
              $.ajax({
                url: srv,
                contentType: "application/x-www-form-urlencoded;charset=utf8",                 
                type: "GET",     
                headers: {
                "Authorization": "Basic " + btoa(login + ":" + password)
                },              
                success: function(data){
                  serverJson=null;
                  serverJson=data;
                  parseReq(data);
                  $('#srverror').empty();
                  $('#srverror').remove();
                  //timeControlProc();
                  data=null;  
                },
                error: function (request, status, error) {
                    console.log(request, status, error);
                    $("<div style=''/>").attr('id','srverror').appendTo('body').addClass("errorBlock").css("position","absolute")
                    .append(`<span style="top:10px;left:400px;background-color:white;color:red;font: 300 16px tahoma;">Error connection to server </span>`);
                  if(txtLogAllow === true){
                    $(txtLog).val('Error:'+request.statusText+'\n'+$(txtLog).val());
                    $(txtLog).val('Status:'+request.status+'\n'+$(txtLog).val());
                    $(txtLog).val('Message:'+error+'\n'+$(txtLog).val());
                  }              
                }
                
              });
            }
            catch(e){
              if(txtLogAllow === true){
                $(txtLog).val(e+$(txtLog).val());
              }              
            }
          },jsonNodeTree[i].timer);    
        }
        catch(e){
            if(txtLogAllow === true){
              $(txtLog).val(e+$(txtLog).val());
            }  
        }
       
        try {
          if(pjson.config.target === 'server'){
            try{
              $.ajax({
                url: jsonNodeTree[i].svgfile,
                username: login,
                password: password, 
                cache: false ,
                success: function(data){
                  var img = new XMLSerializer().serializeToString(data.documentElement);
                  $("#svg-image").html(img);
                  data=null;
                  img=null;
                },
                error: function (request, status, error) {
                  if(txtLogAllow === true){
                    $(txtLog).val('Error:'+request.statusText+'\n'+$(txtLog).val());
                    $(txtLog).val('Status:'+request.status+'\n'+$(txtLog).val());
                    $(txtLog).val('Message:'+error+'\n'+$(txtLog).val());
                  }              
                }
              });
            }
            catch(e){
            }
          }
          if(pjson.config.target === 'disk'){
            getSvgFromFile(jsonNodeTree[i].svgfile);
          }
        }
        catch(err) {
        }
       
        try {
           if(svgArr[i].id === id) { 
              jsonTemp = {svgobj:svgArr[i].data } ;
           }
        }    
        catch (err){
          console.log(err);
        }      
      }
      i++;
    }
 }
 
 