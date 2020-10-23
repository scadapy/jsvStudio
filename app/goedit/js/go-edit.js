//require('nw.gui').Window.get().showDevTools();


var dialog = require('nw-dialog');
var fs = require("fs");

window.os = require('os');
var pjson = require('./package.json');
var pathType='';
dialog.setContext(document); 
var prPath=process.cwd();
var projectPath;
if(window.os.platform() === 'win32') {
  pathType='\\project\\';
}
else {
  pathType='/project/';
}
var projectPath;
document.title = pjson.window.title+" v."+pjson.version ;



function openModbusFile() {

  dialog.openFileDialog('.json',true,prPath+pathType,function(filePath) {
    projectPath=filePath;

    fs.readFile(filePath,  'utf8',(err, data) => {
      if (err) {
        console.error(err);
        return;
      }

       dataDiagram.model = go.Model.fromJson(data);
  
    });
    document.title = pjson.window.title+" v."+pjson.version +' '+projectPath;   

  });
}

function saveProjectFile(){
  try{
   
   dialog.saveFileDialog('modbusFile','.json',prPath+pathType, function(filePath) {
       projectPath=filePath;
       var fileSave = dataDiagram.model.toJson();
       dataDiagram.isModified = false;

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
  }
  catch(e){
    
  }
}

function loadPallet() {
  var $ = go.GraphObject.make;  // for conciseness in defining templates
  var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
  var greengrad = $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" });
  var bluegrad = $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" });
  var redgrad = $(go.Brush, "Linear", { 0: "#C45245", 1: "#871E1B" });
  var whitegrad = $(go.Brush, "Linear", { 0: "#F0F8FF", 1: "#E6E6FA" });
  var dimgrad = $(go.Brush, "Linear", { 0: "dimgrey", 1: "white" });
  var oragrad = $(go.Brush, "Linear", { 0: "#1BD55C", 1: "#1BD5BC" });
  var mmmgrad = $(go.Brush, "Linear", { 0: "#EFD814", 1: "#EF3914" });
  var kkkgrad = $(go.Brush, "Linear", { 0: "#145AEF", 1: "#145AEF" });
  var bigfont = "bold 13pt Helvetica, Arial, sans-serif";
  var smallfont = "bold 11pt Helvetica, Arial, sans-serif";

     // Common text styling
      function textStyle() {
        return {
         margin: 6,
         wrap: go.TextBlock.WrapFit,
         textAlign: "center",
         editable: true,
         font: bigfont
       }
     }

     dataDiagram =
       $(go.Diagram, "myDiagramDiv",
         {
           // have mouse wheel events zoom in and out instead of scroll up and down
           "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
           initialAutoScale: go.Diagram.Uniform,
           "linkingTool.direction": go.LinkingTool.ForwardsOnly,
           layout: $(go.LayeredDigraphLayout, { isInitial: false, isOngoing: false, layerSpacing: 50 }),
           "undoManager.isEnabled": true
         });

     // when the document is modified, add a "*" to the title and enable the "Save" button
     dataDiagram.addDiagramListener("Modified", function(e) {
       var button = document.getElementById("SaveButton");
       if (button) button.disabled = !dataDiagram.isModified;
       var idx = document.title.indexOf("*");
       if (dataDiagram.isModified) {
         if (idx < 0) document.title += "*";
       } else {
         if (idx >= 0) document.title = document.title.substr(0, idx);
       }
     });

  ///////////////////////////////// Port main block ////////////////////////////////////////////////////////////////////////////
     dataDiagram.nodeTemplateMap.add("Port",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: bluegrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Port", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));
/////////////////////////////////////// baud
 
   dataDiagram.nodeTemplateMap.add("Baud",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: greengrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Baud", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));

//////////////////////////////////// dev

   dataDiagram.nodeTemplateMap.add("Device",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: yellowgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Device", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));

/////////////////////////////////// registers 
   dataDiagram.nodeTemplateMap.add("readCoils",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: redgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "readCoils", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));

   dataDiagram.nodeTemplateMap.add("readDI",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: redgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "readDI", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));

   dataDiagram.nodeTemplateMap.add("readHR",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: redgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "readHR", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));

   dataDiagram.nodeTemplateMap.add("writeSCoil",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: redgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "writeSCoil", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));


/////////////////////////////////// adress 
   dataDiagram.nodeTemplateMap.add("Address",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: dimgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Address", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));


/////////////////////////////////// vartipe 
   dataDiagram.nodeTemplateMap.add("Vartype",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: mmmgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Vartype", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));

/////////////////////////////////// devider 
   dataDiagram.nodeTemplateMap.add("Koef",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: kkkgrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Koef", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));


/////////////////////////////////// var 
   dataDiagram.nodeTemplateMap.add("Varname",
       $(go.Node, "Auto",  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
       
          $(go.Shape, "RoundedRectangle",
           {
             fill: oragrad,
             portId: "", fromLinkable: true, cursor: "pointer", fromEndSegmentLength: 40, toLinkable: true
           }),
         $(go.TextBlock, "Varname", textStyle(),
           new go.Binding("text", "text").makeTwoWay())
       ));



////////////////////////////////////////////////////////////////////////////////////////////////////////
       dataDiagram.nodeTemplateMap.add("Comment",
       $(go.Node, "Auto",
         new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
         $(go.Shape, "Rectangle",
           { portId: "", fill: whitegrad, fromLinkable: true }),
         $(go.TextBlock, "A comment",
           {
             margin: 9,
             maxSize: new go.Size(200, NaN),
             wrap: go.TextBlock.WrapFit,
             editable: true,
             font: smallfont
           },
           new go.Binding("text", "text").makeTwoWay())
         // no ports, because no links are allowed to connect with a comment
       ));
  
     var palette =
       $(go.Palette, "myPaletteDiv",  // create a new Palette in the HTML DIV element
         {
           // share the template map with the Palette
           nodeTemplateMap: dataDiagram.nodeTemplateMap,
           autoScale: go.Diagram.Uniform  // everything always fits in viewport
         });

     palette.model.nodeDataArray = [
       { category: "Port" },
       { category: "Baud" },
       { category: "Device" },
       { category: "readCoils" },       
       { category: "readDI" },
       { category: "readHR" },
       { category: "writeSCoil" },

       { category: "Address" },
       { category: "Vartype" },
       { category: "Koef" },
       { category: "Varname" },
       { category: "Comment" }

     ];
}

function layout() {
     dataDiagram.layoutDiagram(true);
}

function runnode(){
   require('child_process').exec("start cmd  /c \""+pjson.config.nodejs+" "+pjson.config.rtucmd+" "+projectPath+"\"");  
}