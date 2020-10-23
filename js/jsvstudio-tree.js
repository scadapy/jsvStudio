
function loadTree(){
    $("#nodeTree").css("visibility", "hidden");
    var data=`<ul id="browser" class="filetree">
 <li class="closed"><span class="folder">Проект</span><ul style="color: white;">
 <li style="color: white;"><span class="file" onclick="sysTreeClick()" id='sysTree'><a href="#">`+jsonSysTree.name+`</a></span></li></li></ul>
 <li class="closed"><span class="folder" id="nodeSchemes" >Схемы</span><ul id="nodeUlTree">`;
    let i = 0;
    while (i < jsonNodeTree.length) { 
      data+= `<li><span class="file" onclick="nodeTreeClick('`+jsonNodeTree[i].id+`')" id='`+jsonNodeTree[i].id+`'><a href="#">`+jsonNodeTree[i].name+`</a></span></li>`;
      i++;
    }   
    data+=`</ul></li>`;
    $("#treeBlock").html(data); 
    $("#browser").treeview();   
    $("#treeBlock").css("visibility", "visible");
 }
 
 function sysTreeClick() {
    $("#editTree").css("visibility", "visible");
    $('#prPath').val(projectPath);
    $('#prName').val(jsonSysTree.name);
    $('#prVersion').val(jsonSysTree.version);
    $('#prServer').val(jsonSysTree.server);
    $('#prConfig').val(jsonSysTree.config); 
    $('#prLogin').val(jsonSysTree.login); 
    $('#prPassword').val(jsonSysTree.password); 
    
 }
 
 function nodeTreeClick(id,name) {
    $("#nodeTree").css("visibility", "visible");
    $("#svg-image").html('');
    var newNode=0;
    let i=0;
    while (i < jsonNodeTree.length) { 
      if ( jsonNodeTree[i].id === id) { 
        newNode=1;   
        $('#nodeId').val(id);
        $('#nodeName').val(jsonNodeTree[i].name);
        $('#nodeFile').val(jsonNodeTree[i].svgfile);
        $('#nodeServer').val(jsonNodeTree[i].server);  
        $('#nodeTimer').val(jsonNodeTree[i].timer);
        $('#nodeLogin').val(jsonNodeTree[i].login);
        $('#nodePassword').val(jsonNodeTree[i].password);
        
        try {
          getSvgFromFile(jsonNodeTree[i].svgfile);
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
      if( newNode === 0 ) {
        $('#nodeId').val(id);
        $('#nodeName').val('Scheme name');
        $('#nodeFile').val('');
        $('#nodeServer').val('');  
        $('#nodeTimer').val('1000');  
        $('#nodeLogin').val('x');  
        $('#nodePassword').val('xx');  
        
    }
 }
 
 function hideTreeTable() {
    $("#editTree").css("visibility", "hidden");
    jsonSysTree.name =$('#prName').val();
    jsonSysTree.version=$('#prVersion').val();
    jsonSysTree.server=$('#prServer').val();  
    jsonSysTree.path=$('#prPath').val(); 
    jsonSysTree.config=$('#prConfig').val(); 
    jsonSysTree.login=$('#prLogin').val(); 
    jsonSysTree.password=$('#prPassword').val(); 
    
    loadTree(); 
 }
 
 function hideNodeTreeTable() {
      var nodeNew=0;
      let i = 0;
      while (i < jsonNodeTree.length) { 
        if ( jsonNodeTree[i].id === $('#nodeId').val()) {
                  jsonNodeTree[i].id = $('#nodeId').val();
                  if($('#nodeName').val().length === 0) {
                      jsonNodeTree[i].name = "Node_"+$('#nodeId').val();
                  }
                  else {
                      jsonNodeTree[i].name = $('#nodeName').val();
                  }
                  jsonNodeTree[i].version = $('#nodeVersion').val();
                  jsonNodeTree[i].svgfile = $('#nodeFile').val();
                  jsonNodeTree[i].server = $('#nodeServer').val();
                  jsonNodeTree[i].timer = $('#nodeTimer').val();
                  jsonNodeTree[i].login = $('#nodeLogin').val();
                  jsonNodeTree[i].password = $('#nodePassword').val();
                  nodeNew=1;
        }
        i++;
      }
   
      if(nodeNew === 0) {
      var d;
      if($('#nodeName').val().length === 0) {
        d = "Node_"+$('#nodeId').val();
      }
      else {
        d = $('#nodeName').val();
      }       
      var tmp = {
                 id:""+$('#nodeId').val()+"",
                 name:""+d+"",
                 version:""+$('#nodeVersion').val()+"",
                 svgfile:""+$('#nodeFile').val().replace(/\\/g,"\\\\")+"",
                 server:""+$('#nodeServer').val()+"",
                 timer:""+$('#nodeTimer').val()+"",
                 login:""+$('#nodeLogin').val()+"",
                 password:""+$('#nodePassword').val()+""
                };      
      jsonNodeTree.push(tmp);
      svgArr.push({id:""+$('#nodeId').val()+"",data:[{id:""}]});
      }
      $("#nodeTree").css("visibility", "hidden"); 
      loadTree();  
 }
 