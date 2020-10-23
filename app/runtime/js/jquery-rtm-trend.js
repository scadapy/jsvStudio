
/*----------------------------------------------------------trends block-----------------------------------------------------------------------*/
function showTrendMenu(){
    $('#listTrend').css("visibility", "hidden");
    $('#listTrend').empty();     
    var data='';
    $.each(jsonTemp.svgobj, function(x, item){
         var d=Math.floor(Math.random() * 1000000);
         var divid = 't_'+d.toString();
         if( (jsonTemp.svgobj[x].type === 'analog') & (jsonTemp.svgobj[x].name !== undefined) ){
            data+=`<span class="file"  onclick="showTrend('`+divid+`','`+jsonTemp.svgobj[x].id+`')" ><a class="rMenu"  href="#">`+jsonTemp.svgobj[x].name+`&nbsp;&nbsp;</a></span><br>`;
         }
    });
    data+=`<span class="file"  onclick="hideTrendMenu('#listTrend')" id='trendMenu'><a class="rMenu"  href="#">Close Menu&nbsp;&nbsp;</a></span><br>`;
    $('#listTrend').append(data); 
    $('#listTrend').css("visibility", "visible"); 
    data=null;    
 }
 
 function showTrend(boxId,id){
    $.each(jsonTemp.svgobj, function(x, item){
        if(id === jsonTemp.svgobj[x].id){
           window.sendData.name      = jsonTemp.svgobj[x].name;
           window.sendData.maxvalue  = jsonTemp.svgobj[x].maxvalue;
           window.sendData.minvalue  = jsonTemp.svgobj[x].minvalue;
           window.sendData.upalarm   = jsonTemp.svgobj[x].upalarm;
           window.sendData.downalarm = jsonTemp.svgobj[x].downalarm;
           window.sendData.link      = jsonTemp.svgobj[x].link;
         }
    });
    $('#'+boxId).remove();
    $( function() {
      $.datepicker.regional['ru'] = {
        dateFormat: 'dd-mm-yy'
      };
      $.datepicker.setDefaults($.datepicker.regional['ru']);   
      $( "#datefrom" ).datepicker();
      $( "#dateto" ).datepicker();
    });
    window.sendData.boxId=boxId;
    $("<div style='display:inline-block;'/>").attr('id',boxId).appendTo('body').addClass("trendBlock").css("position","absolute")
            .append(`<div id="`+boxId+`b" style="width: 100%; height: 100%;"></div>`)
            .append(`<span onClick="hideTrendBox('#`+boxId+`')" style="top:0px;right:0px;position: absolute;cursor: pointer;background-color:white;color:dimgrey;font: 300 25px tahoma;">&nbsp;&nbsp;X&nbsp;&nbsp;</span>`)
            .draggable()
            .resizable(); 
    $("<div style='width:300px;'/>").attr('id','dtpick').appendTo('#'+boxId)
            .append(`<p style="top:100px;left:200px;position: absolute;background-color:dimgrey;color:white;font: 300 15px tahoma;">Date from:<input type="text" id="datefrom"></p>`)
            .append(`<p style="top:130px;left:200px;position: absolute;background-color:dimgrey;color:white;font: 300 15px tahoma;">Date to&nbsp;&nbsp;&nbsp;: <input type="text" id="dateto"></p>`)
            .append(`<button id='setDt' 
            onclick="sendChart()" class='svgEdit'   
            style="top:180px;left:290px;position: absolute; width:80px;margin-top:5px;margin-bottom:5px;" >OK</button>`);     
    boxId=null;
    id=null;             
 }
 
 function showTrendOnline(boxId,id){
    window.sendData.boxId=boxId;
    getNowDate();
 
    $("<div style='display:inline-block;'/>").attr('id',boxId).appendTo('body').addClass("trendBlock")
            .css("position","absolute")
            .css("background","black")
            .css("width","550px")
            .css("height","210px")
            .css("border-radius","4px")
            .css("top", event.pageY)
            .css("left", event.pageX)  
            .css("margin-top", "-230px")  
            .css("margin-left", "-560px")  
            .append(`<div id="`+boxId+`b" style="width: 100%; height: 100%;"><div style='position: absolute;margin-left:230px;margin-top:50px;'><img id='imgcode' src='./images/preload.gif'></div></div>`)    
            .append(`<span onClick="hideTrendBox('#`+boxId+`')" style="top:0px;right:0px;position: absolute;cursor: pointer;background-color:white;color:dimgrey;font: 300 10px tahoma;">&nbsp;&nbsp;X&nbsp;&nbsp;</span>`)
            .draggable()
            .resizable(); 
     sendChartOnline();
     boxId=null;
     id=null; 
 }
 
 
 function sendChartOnline(){
     try{
          $.ajax({
            url: window.sendData.srvlink,
            data: { 
                "id"  : window.sendData.link, 
                "from": window.sendData.dtfrom, 
                "to"  : window.sendData.dt
            },
            type: "GET",
            username: window.sendData.lg,
            password: window.sendData.psw, 
            success: function(data){
               showChart({data     :JSON.parse(data),
                         boxId    :window.sendData.boxId,
                         name     :window.sendData.name,
                         maxvalue :window.sendData.maxvalue,
                         minvalue :window.sendData.minvalue,
                         upalarm  :window.sendData.upalarm,
                         downalarm:window.sendData.downalarm,
                         datefrom :window.sendData.dtfrom,
                         dateto   :window.sendData.dt});
                data=null;
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
              if(txtLogAllow === true){
                $(txtLog).val(e+$(txtLog).val());
              } 
              console.log(e);
    }
 }

 
 
function sendChart(){
    try{
           $.ajax({
             url: window.sendData.srvlink,
             data: { 
                 "id": window.sendData.link, 
                 "from": $('#datefrom').val(), 
                 "to": $('#dateto').val()
             },
             type: "GET",
             username: window.sendData.lg,
             password: window.sendData.psw,   
             success: function(data){
               showChart({data     :JSON.parse(data),
                          boxId    :window.sendData.boxId,
                          name     :window.sendData.name,
                          maxvalue :window.sendData.maxvalue,
                          minvalue :window.sendData.minvalue,
                          upalarm  :window.sendData.upalarm,
                          downalarm:window.sendData.downalarm,
                          datefrom :$('#datefrom').val(),
                          dateto   :$('#dateto').val()});
               $('#dtpick').empty();
               $('#dtpick').remove();
               data=null;   
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
               if(txtLogAllow === true){
                 $(txtLog).val(e+$(txtLog).val());
               } 
               console.log(e);
     }
  }
  
  
  function showChart(nData){
     chart = anychart.line();
     var series = chart.line(nData.data);
  
  
     var title = chart.title();
     title.enabled(true);
     title.text(nData.name);
     title.fontSize(12);
     title.fontColor('white');
     title.fontFamily("Tahoma");
     
     chart.xAxis().title('График за период с '+nData.datefrom+' по '+nData.dateto);
     chart.xAxis().title().fontSize(12);
     chart.xAxis().title().fontColor('white');
  
  
  
     chart.background().fill("#000000"); 
     chart.xGrid().stroke({
       color: " #222323 ",
       dash: "3 5"
     });
     chart.yGrid().stroke({
       color: " #353635 ",
       dash: "3 3"
     });
     //chart.xScroller(true);
     var labelsX = chart.xAxis().labels();
     labelsX.fontFamily("Courier");
     labelsX.fontSize(12);
     labelsX.fontColor("white");
     labelsX.useHtml(false);
  
     var labelsY = chart.yAxis().labels();
     labelsY.fontFamily("Courier");
     labelsY.fontSize(12);
     labelsY.fontColor("white");
  
     labelsY.useHtml(false);
     chart.yScale().stackMode("value");
     chart.yScale().minimum(parseInt(nData.minvalue));
     chart.yScale().maximum(parseInt(nData.maxvalue));
  
     var markerUp = chart.lineMarker(0);
     markerUp.value(parseFloat(nData.upalarm));
     markerUp.stroke({ thickness: 1, color: "red", });
  
     var markerDown = chart.lineMarker(1);
     markerDown.value(parseInt(nData.downalarm));
     markerDown.stroke({ thickness: 1, color: "yellow", });
  
  /*
     chart.xAxis().title().enabled(true);
     chart.xAxis().title(nData.name+' from '+nData.datefrom+' to '+nData.dateto);
     chart.xAxis().title().fontSize(12);
     chart.xAxis().title().fontColor('white');
     chart.xAxis().title().orientation("top");
    */ 
  
  
  
  
  
     chart.yAxis().title("Значения");
     chart.container(nData.boxId+`b`);
     chart.draw();
     series     =null;
     labelsX    =null;
     labelsY    =null;
     markerUp   =null;
     markerDown =null;
     nData      =null;
     
  }

  