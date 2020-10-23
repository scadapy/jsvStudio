function discretTable() {
 var data=`<table class='editTable' id='Discret'> 
<tr><td colspan="2" style="background-color:#C8C8C8;color:dimgrey;text-align:center;height:25px;">Discrete settings</td></tr> 
<tr><td>Object ID</td><td><input type='text' class='svgEdit' id='ObjectId'  value=''  readonly></td></tr>                                                                              
<tr><td>Object name</td><td><input type='text'  class='svgEdit'  id='ObjectName' value=''></td></tr>  
<tr><td>Object link</td><td><input type='text'  class='svgEdit'  id='ObjectLink' value=''></td></tr> 
<tr><td>Signal type</td><td><input type='text'  class='svgEdit'  id='ObjectSignalType'  value=''   readonly></td></tr>                                                                                       
<tr><td>Color on</td><td><input type='color'    class='svgEdit'  id='ObjectColorOn' value='#ff0000'> </td></tr> 
<tr><td>Color off</td><td><input type='color'   class='svgEdit'  id='ObjectColorOff' value='#00ff00'></td></tr>  
<tr><td>Alarm type</td><td>
<select  class='svgEdit'  id='ObjectAlarmType'>                                              
	<option value='1'>AC</option>                                          
	<option value='2'>Level-1</option>            
	<option value='3'>Level-2</option>             
	<option value='0'>None</option>               
</select></td></tr>
<tr><td>Invert</td><td>
<select  class='svgEdit'  id='ObjectInvert'>
	<option value='1'>Yes</option>                              
	<option value='0'>No</option>
</select></td></tr>
<tr><td colspan="2"><button class='svgEdit'  onclick="hideSvgTable()" style="width:80px;margin-top:5px;margin-bottom:5px;">Save</button></td></tr></table>`;
   return data;
}

function analogTable() {
   var data =`<table class='editTable' id="Analog">
<tr><td colspan="2" style="background-color:#C8C8C8;color:dimgrey;text-align:center;height:25px;">Analog settings</td></tr> 
<tr><td>Object ID</td><td><input type='text' class='svgEdit' id='ObjectId' value='' readonly></td></tr>                                                                              
<tr><td>Object name</td><td><input type='text'  class='svgEdit'  id='ObjectName' value=''></td></tr>                                                                                     
<tr><td>Object link</td><td><input type='text'  class='svgEdit'  id='ObjectLink' value=''></td></tr>                                                                                     
<tr><td>Signal type</td><td><input type='text'  class='svgEdit'  id='ObjectSignalType'  value=''  readonly></td></tr> 
<tr><td>Max value</td><td><input type='text'  class='svgEdit'   id='ObjectMaxValue'  value=''></td></tr>                                                                                     
<tr><td>Min value</td><td><input type='text'  class='svgEdit'   id='ObjectMinValue'  value=''></td></tr>                                                                                     
<tr><td>Up alarm setting</td><td><input type='text'  class='svgEdit'   id='ObjectUpAlarm'  value=''></td></tr>                                                                                     
<tr><td>Down alarm setting</td><td><input type='text'  class='svgEdit'   id='ObjectDownAlarm'  value=''></td></tr>                                                                                     
<tr><td>Color normal</td><td><input type="color"  class='svgEdit' id='ObjectColorNormal' value='#ffffff'></td></tr> 
<tr><td>Color Up</td><td><input type="color"  class='svgEdit' id='ObjectColorUp' value='#000000'></td></tr> 
<tr><td>Color Down</td><td><input type="color"  class='svgEdit' id='ObjectColorDown' value='#000000'></td></tr> 
<tr><td>Alarm type</td><td>                                                               
<select  class='svgEdit' id='ObjectAlarmType' >
	<option value='1'>AC</option>                                          
	<option value='2'>Level-1</option>            
	<option value='3'>Level-2</option>             
	<option value='0'>None</option>              
</select></td></tr>
<tr><td colspan="2"><button class='svgEdit'  onclick="hideSvgTable()" style="width:80px;margin-top:5px;margin-bottom:5px;">Save</button></td></tr></table> `;  
   return data; 
} 

function logTable() {
   var data =`<table class='editTable' id="Analog">
<tr><td colspan="2" style="background-color:#C8C8C8;color:dimgrey;text-align:center;height:25px;">Log settings</td></tr> 
<tr><td>Object ID</td><td><input type='text' class='svgEdit' id='ObjectId' value='' readonly></td></tr>                                                                              
<tr><td>Object name</td><td><input type='text'  class='svgEdit'  id='ObjectName' value=''></td></tr>                                                                                     
<tr><td>Object link</td><td><input type='text'  class='svgEdit'  id='ObjectLink' value=''></td></tr>                                                                                     
<tr><td>Signal type</td><td><input type='text'  class='svgEdit'  id='ObjectSignalType'  value=''  readonly></td></tr> 
<tr><td>Login</td><td><input type='text'  class='svgEdit'   id='ObjectLogin'  value=''></td></tr>                                                                                     
<tr><td>Password</td><td><input type='password'  class='svgEdit'   id='ObjectPassword'  value=''></td></tr>
<tr><td colspan="2"><button class='svgEdit'  onclick="hideSvgTable()" style="width:80px;margin-top:5px;margin-bottom:5px;">Save</button></td></tr></table> `;  
   return data; 
} 

function trendTable() {
   var data =`<table class='editTable' id="Analog">
<tr><td colspan="2" style="background-color:#C8C8C8;color:dimgrey;text-align:center;height:25px;">Trend settings</td></tr> 
<tr><td>Object ID</td><td><input type='text' class='svgEdit' id='ObjectId' value='' readonly></td></tr>                                                                              
<tr><td>Object name</td><td><input type='text'  class='svgEdit'  id='ObjectName' value=''></td></tr>                                                                                     
<tr><td>Object link</td><td><input type='text'  class='svgEdit'  id='ObjectLink' value=''></td></tr>                                                                                     
<tr><td>Signal type</td><td><input type='text'  class='svgEdit'  id='ObjectSignalType'  value=''  readonly></td></tr> 
<tr><td>Login</td><td><input type='text'  class='svgEdit'   id='ObjectLogin'  value=''></td></tr>                                                                                     
<tr><td>Password</td><td><input type='password'  class='svgEdit'   id='ObjectPassword'  value=''></td></tr>
<tr><td colspan="2"><button class='svgEdit'  onclick="hideSvgTable()" style="width:80px;margin-top:5px;margin-bottom:5px;">Save</button></td></tr></table> `;  
   return data; 
} 

function controlTable() {
   var data =`<table class='editTable' id="Analog">
<tr><td colspan="2" style="background-color:#C8C8C8;color:dimgrey;text-align:center;height:25px;">Control settings</td></tr> 
<tr><td>Object ID</td><td><input type='text' class='svgEdit' id='ObjectId' value='' readonly></td></tr>                                                                              
<tr><td>Object name</td><td><input type='text'  class='svgEdit'  id='ObjectName' value=''></td></tr>                                                                                     
<tr><td>Object link</td><td><input type='text'  class='svgEdit'  id='ObjectLink' value=''></td></tr>                                                                                     
<tr><td>Signal type</td><td><input type='text'  class='svgEdit'  id='ObjectSignalType'  value=''  readonly></td></tr> 
<tr><td>Login</td><td><input type='text'  class='svgEdit'   id='ObjectLogin'  value=''></td></tr>                                                                                     
<tr><td>Password</td><td><input type='password'  class='svgEdit'   id='ObjectPassword'  value=''></td></tr>
<tr><td>Command On</td><td><input type='text'  class='svgEdit'   id='ObjectOn'  value=''></td></tr>
<tr><td>Command Off</td><td><input type='text'  class='svgEdit'   id='ObjectOff'  value=''></td></tr>

<tr><td colspan="2"><button class='svgEdit'  onclick="hideSvgTable()" style="width:80px;margin-top:5px;margin-bottom:5px;">Save</button></td></tr></table> `;  
   return data; 
} 

function mediaTable() {
   var data =`<table class='editTable' id="Analog">
<tr><td colspan="2" style="background-color:#C8C8C8;color:dimgrey;text-align:center;height:25px;">Log settings</td></tr> 
<tr><td>Object ID</td><td><input type='text' class='svgEdit' id='ObjectId' value='' readonly></td></tr>                                                                              
<tr><td>Object name</td><td><input type='text'  class='svgEdit'  id='ObjectName' value=''></td></tr>                                                                                     
<tr><td>Object link</td><td><input type='text'  class='svgEdit'  id='ObjectLink' value=''></td></tr>                                                                                     
<tr><td>Signal type</td><td><input type='text'  class='svgEdit'  id='ObjectSignalType'  value=''  readonly></td></tr> 
<tr><td>Login</td><td><input type='text'  class='svgEdit'   id='ObjectLogin'  value=''></td></tr>                                                                                     
<tr><td>Password</td><td><input type='password'  class='svgEdit'   id='ObjectPassword'  value=''></td></tr>
<tr><td colspan="2"><button class='svgEdit'  onclick="hideSvgTable()" style="width:80px;margin-top:5px;margin-bottom:5px;">Save</button></td></tr></table> `;  
   return data; 
} 

function textAreaEditor(data) {
   var data =` <style> .CodeMirror { font-size: 16px; } </style>
   <textarea id="code" name="code">`+data+`</textarea>
   <script>
   var editorTextArea = document.getElementById('code');
   var editor = CodeMirror.fromTextArea(editorTextArea, {
    lineNumbers: true,
    styleActiveLine: true,
    theme: "dracula",
    matchBrackets: true,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
   });
    editor.setSize(800, 630);
    </script>`;  
   return data; 
} 
function textAreaEditorGojs(data) {
   var data =` <style> .CodeMirror { font-size: 16px; } </style>
   <textarea id="gojseditor" name="gojseditor">`+data+`</textarea>
   <script>
   var editorTextArea = document.getElementById('gojseditor');
   var editorGojs = CodeMirror.fromTextArea(editorTextArea, {
    lineNumbers: true,
    styleActiveLine: true,
    theme: "dracula",
    matchBrackets: true,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
   });
    editorGojs.setSize(800, 630);
    </script>`;  
   return data; 
} 
function textAreaEditorMonitor(data) {
   var data =` <style> .CodeMirror { font-size: 16px; } </style>
   <textarea id="monitor" name="monitor">`+data+`</textarea>
   <script>
   var editorTextArea = document.getElementById('monitor');
   var editorMonitor = CodeMirror.fromTextArea(editorTextArea, {
    lineNumbers: true,
    styleActiveLine: true,
    theme: "dracula",
    matchBrackets: true,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
   });
    editorMonitor.setSize(800, 630);
    </script>`;  
   return data; 
} 


module.exports.discretTable = discretTable;
module.exports.analogTable = analogTable;
module.exports.logTable = logTable;
module.exports.trendTable = trendTable;
module.exports.controlTable = controlTable;
module.exports.mediaTable = mediaTable;
module.exports.textAreaEditor = textAreaEditor;
module.exports.textAreaEditorGojs = textAreaEditorGojs;
module.exports.textAreaEditorMonitor = textAreaEditorMonitor;

