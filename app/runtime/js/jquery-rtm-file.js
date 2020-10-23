


function openFromServer(jfile){
    if(jfile.length > 2) {
      $("#svg-image").html('');
      try{
          //  console.log(pjson.config.login,pjson.config.password);
            $.ajax({
              url: jfile,
              dataType: "json",
              username: pjson.config.login,
              password: pjson.config.password, 
              contentType: "application/x-www-form-urlencoded;charset=utf8",  
              cache: false ,
              success: function(data){
                mainJFile=data;   
                jsonSysTree = data.systree[0];
                jsonNodeTree = data.nodetree;
                svgArr = data.svg;
                loadTree();
                document.title = pjson.window.title+" v."+pjson.version;// +' '+jfile;                 
              },
                error: function (request, status, error) {
                  if(txtLogAllow === true){
                    $(txtLog).val('Error:'+request.statusText+'\n'+$(txtLog).val());
                    $(txtLog).val('Status:'+request.status+'\n'+$(txtLog).val());
                    $(txtLog).val('Message:'+error+'\n'+$(txtLog).val());
                  } 
                  
                  $("<div style=''/>").attr('id','srverror').appendTo('body').addClass("errorBlock").css("position","absolute").append(`<span style="top:10px;left:200px;background-color:white;color:red;font: 300 20px tahoma;">Error connection to server for loading json from `+jfile+`</span>`);
                 }
                
              });
      }
      catch(e){
      }
    }
 }

 
function openFileLoading(jfile){
    if(jfile.length > 2) {
      $("#svg-image").html('');
      projectPath=jfile;
      fs.readFile(jfile,  'utf8',(err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      mainJFile=data;   
      jsonSysTree = JSON.parse(data).systree[0];
      jsonNodeTree = JSON.parse(data).nodetree;
      svgArr = JSON.parse(data).svg;
      loadTree();
      });
      document.title = pjson.window.title+" v."+pjson.version +' '+projectPath;  
    }  
 }
 
 
 function openProjectFile(){
    $("#rightMenu").css("visibility", "hidden");
    $("#svg-image").html('');
    dialog.openFileDialog('.json',true,prPath+pathType,function(filePath) {
      projectPath=filePath;
      fs.readFile(filePath,  'utf8',(err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      mainJFile=data;   
      jsonSysTree = JSON.parse(data).systree[0];
      jsonNodeTree = JSON.parse(data).nodetree;
      svgArr = JSON.parse(data).svg;
      loadTree();
      });
      document.title = pjson.window.title+" v."+pjson.version +' '+projectPath;   
    });
 }

 
function openSvg(){
  var pathType='';
  if(window.os.platform() === 'win32') {
    pathType='\\svg\\';
  }
  else {
    pathType='/svg/';
  }
  dialog.openFileDialog('.svg',prPath+pathType,function(result) {
    $('#nodeFile').val(result);
  });
}

function getSvgFromFile(svgFile) {
  $("#svg-image").html(fs.readFileSync(svgFile, "utf8"));
  svgFile=null;
}
