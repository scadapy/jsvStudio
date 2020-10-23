
function createProjectFile(){
     $("#rightMenu").css("visibility", "hidden");
     var tmpdata = {
         systree:[{id:"prSystem",name:"New project",version:"0.0.1",server:"http://127.0.0.1/srv",path:"",config:"1",login:"",password:""}], 
         nodetree:[{id:"n_0001",name:"newScheme",svgfile:"",server:"http://127.0.0.1/data",login:"x",password:"",timer:"1000"}] ,
         svg:[ {id:"n_0001", data:[{id:"0"}]} ] };
    
     dialog.saveFileDialog('projectFile','.json',prPath+pathType, function(filePath) {
         var fileSave = JSON.stringify(tmpdata);
         fs.writeFile(filePath,fileSave, function (err) {
             if (err) {
                 return;
             } else if (callback) {
                 callback();
             }
         });
    
         $("#svg-image").html('');
         projectPath=filePath;
         fs.readFile(filePath,  'utf8',(err, data) => {
             if (err) {
                 console.error(err);
                 return;
             }
             jsonSysTree = JSON.parse(data).systree[0];
             jsonNodeTree = JSON.parse(data).nodetree;
             svgArr = JSON.parse(data).svg;
             loadTree();
         });
         document.title = pjson.title+" v."+pjson.version +' '+projectPath;   
     });
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

function saveProjectFile(){
     try{
         $("#rightMenu").css("visibility", "hidden");
         dialog.saveFileDialog('projectFile','.json',prPath+pathType, function(filePath) {
             var fileSave ='{"systree":['+ JSON.stringify(jsonSysTree)+
                           '],"nodetree":'+JSON.stringify(jsonNodeTree)+
                           ',"svg":'+      JSON.stringify(svgArr)+'}';
             projectPath=filePath;
             fs.writeFile(filePath,fileSave , function (err) {
                 if (err) {
                     colnsole.log(err);
                     return;
                 } else if (callback) {
                     callback();
                 }
             });
             document.title = pjson.window.title+" v."+pjson.version +' '+projectPath;  
         });
     } catch(e){
   
     }
}


function saveToDisk(){
     try{
         $("#rightMenu").css("visibility", "hidden");
         var fileSave ='{"systree":['+ JSON.stringify(jsonSysTree)+
                       '],"nodetree":'+JSON.stringify(jsonNodeTree)+
                       ',"svg":'+      JSON.stringify(svgArr)+'}';
         fs.writeFile(projectPath,fileSave , function (err) {
             if (err) {
                 colnsole.log(err);
                 return;
             } else if (callback) {
                 callback();
             }
         });
     }
     catch(e){
   
     }
}


function getSvgFromFile(svgFile) {
     $("#svg-image").html(fs.readFileSync(svgFile, "utf8"));
}



function savePackageJson(divid){
    rtmPathFile = prPath + '\\app\\runtime\\package.json';
    try{
      fs.writeFile(rtmPathFile,editor.getValue(), function (err) {
          if (err) {
              colnsole.log(err);
              return;
          } else if (callback) {
              callback();
          }
      });
      hideLog(divid);
    }
    catch(e){
  
   }
 }
 
 function saveGojsPackageJson(divid){
   var rtmPathFile2 = prPath + '\\app\\goedit\\package.json';
   try{
     fs.writeFile(rtmPathFile2,editorGojs.getValue(), function (err) {
         if (err) {
             colnsole.log(err);
             return;
         } else if (callback) {
             callback();
         }
     });
     hideLog(divid);
   }
   catch(e){
 
  }
 }
 
 function savePackage(divid){
   var fileToSave = prPath + '\\app\\nodejs\\modbusRTU\\package.json';
  //console.log(fileToSave);
   try{
     fs.writeFile(fileToSave,editorMonitor.getValue(), function (err) {
         if (err) {
             colnsole.log(err);
             return;
         } else if (callback) {
             callback();
         }
     });
     hideLog(divid);
   }
   catch(e){
 
  }
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
  