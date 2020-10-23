
function createMenu() {
     var menu = new nw.Menu({ type: 'menubar' });
     var submenu = new nw.Menu();
/* 1 block */ 
     submenu.append(new nw.MenuItem({
         label: 'Открыть',
         click: function(){
             openProjectFile();
            }
     }));
 
     submenu.append(new nw.MenuItem({
         label: 'Сохранить как',
         click: function(){
               saveProjectFile();
         }
     }));

     submenu.append(new nw.MenuItem({
         label: 'Сохранить',
         click: function(){
                 saveToDisk();
         }
     }));
 
     submenu.append(new nw.MenuItem({
         label: 'Создать',
         click: function(){
                 createProjectFile();
         }
    }));
 
     submenu.append(new nw.MenuItem({
         label: 'Выход',
         click: function(){
              nw.App.quit();
         }
     }));
 
     menu.append(new nw.MenuItem({
         label: 'Проект',
         submenu: submenu
     }));

/* 2 block */ 
     
     var submenuRtm = new nw.Menu();

     submenuRtm.append(new nw.MenuItem({
         label: 'Inkscape',
         click: function(){
             require('child_process').exec(pjson.config.inkscapepath);   
         }
     })); 
     submenuRtm.append(new nw.MenuItem({
         label: 'Собрать',
         click: function(){
             var date = new Date();
             var dt = date.getTime();
             var jsvFolder = "%TEMP%\\jsvstudio";
             var rtmFolder =  prPath + '\\app\\runtime';
             var nwFolder =  prPath + '\\nwjs';
             var zipFolder =  prPath + '\\package';
             /*cmd*/
             var delZip = "del /Q "+zipFolder+"\\package.zip";
             var delNw = "del /Q "+zipFolder+"\\package.nw";
             var delFolder = "rmdir /Q /S "+jsvFolder;
             var createFolder = "mkdir "+jsvFolder;
             var cpyFilesNwjs  = "copy /Y "+nwFolder+"\\*.* "+jsvFolder+"\\*.*";
             var cpyFoldersNwjs        = "Xcopy /Y /E /I "+nwFolder+"  "+jsvFolder;
             var cpyFilesToFolder  = "copy /Y "+rtmFolder+"\\*.* "+jsvFolder+"\\*.*";
             var cpyFolders        = "Xcopy /Y /E /I "+rtmFolder+"  "+jsvFolder;
             var zipFiles = "powershell -command \"Compress-Archive -Path '"+jsvFolder+"\\*' -DestinationPath '"+zipFolder+"\\package.zip'\"";
             var renPackage = "copy /Y "+zipFolder+"\\package.zip "+zipFolder+"\\package.nw";
             var verPackage = "copy /Y "+zipFolder+"\\package.zip "+zipFolder+"\\package_"+dt+".zip";
             var cmd =delNw +" & "+delZip +" & "+ delFolder+" & "+createFolder+" & "+cpyFilesNwjs+" & "+cpyFoldersNwjs+" & "+cpyFilesToFolder+" & "+cpyFolders+" & echo 'Start zipping' & "+zipFiles+" & echo 'End zipping' & "+renPackage+" & "+verPackage+" & TIMEOUT /T -1" ;
             require('child_process').exec("start cmd  /c \""+cmd+"\"");   
         }
     })); 
 
     menu.append(new nw.MenuItem({ 
         label: 'Команды',
         submenu: submenuRtm
        
     }));
 /* 3 block */ 
     var submenuEdit = new nw.Menu();  
     submenuEdit.append(new nw.MenuItem({
         label: 'Запустить',
         click: function(){
             if(window.os.platform() === 'win32') {
                 var rtmPath = prPath+"\\nwjs\\nw.exe " +prPath + "\\app\\runtime\\.";
                 require('child_process').exec(rtmPath);   
             } 
         }
     }));
 
  
     submenuEdit.append(new nw.MenuItem({
         label: 'package.json',
         click: function(){
             if(window.os.platform() === 'win32') {
                 var divid = 'packageEditor';
                 if($("div").is('#'+divid)) {
                 } else {
                     rtmPathFile = prPath + '\\app\\runtime\\package.json';
                     fs.readFile(rtmPathFile,  'utf8',(err, data) => {
                          if (err) {
                             console.error(err);
                             return;
                         }
                         $("<div style=''/>").attr('id',divid).appendTo('body').addClass("packageJson").css("position","absolute")
                         .append(`<div style="float: right;display: block;background-color:white; z-index: 1000; "><span onClick="hideLog(`+divid+`)" style="cursor: pointer;background-color:white;color:dimgrey;font: 300 20px tahoma;">&nbsp;&nbsp;X&nbsp;&nbsp;</span></div><br>`)
                         .append(svgTables.textAreaEditor(data))  
                         .append(`<button class='svgEdit'  onclick="savePackageJson(`+divid+`)" style="height:30px;width:80px;margin-top:5px;margin-bottom:5px;">Сохранить</button>`).draggable().resizable();
                     });      
                 }   
             } 
         }
     }));
 
     menu.append(new nw.MenuItem({ 
         label: 'Монитор',
         submenu: submenuEdit
     
     }));
 
 /* 4 block */ 

     var submenuModbus = new nw.Menu();
     submenuModbus.append(new nw.MenuItem({
         label: 'Go.js Редактор',
         click: function(){
             if(window.os.platform() === 'win32') {
                 var rtmPath = prPath+"\\nwjs\\nw.exe " +prPath + "\\app\\goedit\\.";
                 require('child_process').exec(rtmPath);   
             } 
         }
     }));
  
 
     submenuModbus.append(new nw.MenuItem({
         label: 'Go.js package.json',
         click: function(){
             if(window.os.platform() === 'win32') {
                 var divid = 'packageGojsEditor';
                 if($("div").is('#'+divid)) {
                 } else {
                     rtmPathFile = prPath + '\\app\\goedit\\package.json';
                     fs.readFile(rtmPathFile,  'utf8',(err, data) => {
                         if (err) {
                             console.error(err);
                             return;
                         }  
                         $("<div style=''/>").attr('id',divid).appendTo('body').addClass("packageJson").css("position","absolute")
                         .append(`<div style="float: right;display: block;background-color:white; z-index: 1000; "><span onClick="hideLog(`+divid+`)" style="cursor: pointer;background-color:white;color:dimgrey;font: 300 20px tahoma;">&nbsp;&nbsp;X&nbsp;&nbsp;</span></div><br>`)
                         .append(svgTables.textAreaEditorGojs(data))  
                         .append(`<button class='svgEdit'  onclick="saveGojsPackageJson(`+divid+`)" style="height:30px;width:80px;margin-top:5px;margin-bottom:5px;">Сохранить</button>`).draggable().resizable();
                     });      
                 }   
             } 
         }
     }));
 
     submenuModbus.append(new nw.MenuItem({
         label: 'Modbus package.json',
         click: function(){
             if(window.os.platform() === 'win32') {
                 var divid = 'packageMonitor';
                 if($("div").is('#'+divid)) {
                 }  else {
                     var fileToSave = prPath + '\\app\\nodejs\\modbusRTU\\package.json';
                     fs.readFile(fileToSave,  'utf8',(err, data) => {
                         if (err) {
                             console.error(err);
                             return;
                         }  
                         $("<div style=''/>").attr('id',divid).appendTo('body').addClass("packageJson").css("position","absolute")
                         .append(`<div style="float: right;display: block;background-color:white; z-index: 1000; "><span onClick="hideLog(`+divid+`)" style="cursor: pointer;background-color:white;color:dimgrey;font: 300 20px tahoma;">&nbsp;&nbsp;X&nbsp;&nbsp;</span></div><br>`)
                         .append(svgTables.textAreaEditorMonitor(data))  
                         .append(`<button class='svgEdit'  onclick="savePackage(`+divid+`)" style="height:30px;width:80px;margin-top:5px;margin-bottom:5px;">Сохранить</button>`).draggable().resizable();
                     });      
                 }   
             } 
         }
     }));
     menu.append(new nw.MenuItem({ 
         label: 'ModBus',
         submenu: submenuModbus
     }));
     nw.Window.get().menu = menu;
  }

function closeRMenu(){ 
     $("#rightMenu").css("visibility", "hidden");
 }
 