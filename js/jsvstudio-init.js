/*svg block*/

function initsvg(id,objtype){	
    $("#svgTableEdit").css("visibility", "visible");
    var objNew=0; 
    let i = 0;
    var j;
    while (i < jsonTemp.svgobj.length) { 
       if (jsonTemp.svgobj[i].id === id) {
            objNew=1;
            j=jsonTemp.svgobj[i];
            if(objtype === 'analog') {
                $("#svgTableEdit").html(svgTables.analogTable());
                $('#ObjectAlarmType').val(j.alarmtype);
                $('#ObjectMaxValue').val(j.maxvalue); 
                $('#ObjectMinValue').val(j.minvalue);                
                $('#ObjectUpAlarm').val(j.upalarm);
                $('#ObjectDownAlarm').val(j.downalarm);                 
                $('#ObjectColorNormal').val(j.colornormal);                
                $('#ObjectColorUp').val(j.colorup);
                $('#ObjectColorDown').val(j.colordown);                 
                $('#ObjectId').val(id);
                $('#ObjectName').val(j.name);
                $('#ObjectLink').val(j.link);
                $('#ObjectSignalType').val(objtype);

            }             
            if(objtype === 'discrete') { 
                $("#svgTableEdit").html(svgTables.discretTable());               
                $('#ObjectColorOn').val(j.coloron);
                $('#ObjectColorOff').val(j.coloroff);
                $('#ObjectAlarmType').val(j.alarmtype);    
                $('#ObjectInvert').val(j.invert);    
                $('#ObjectId').val(id);
                $('#ObjectName').val(j.name);
                $('#ObjectLink').val(j.link);
                $('#ObjectSignalType').val(objtype);

            }
            if(objtype === 'log')   {   
                $("#svgTableEdit").html(svgTables.logTable());
                $('#ObjectLogin').val(j.login);
                $('#ObjectPassword').val(j.password); 
                $('#ObjectId').val(id);
                $('#ObjectName').val(j.name);
                $('#ObjectLink').val(j.link);
                $('#ObjectSignalType').val(objtype);

            }           
            if(objtype === 'trend')   {   
                $("#svgTableEdit").html(svgTables.trendTable());
                $('#ObjectLogin').val(j.login);
                $('#ObjectPassword').val(j.password); 
                $('#ObjectId').val(id);
                $('#ObjectName').val(j.name);
                $('#ObjectLink').val(j.link);
                $('#ObjectSignalType').val(objtype);

           }       
          if(objtype === 'control')   {   
                $("#svgTableEdit").html(svgTables.controlTable());
                $('#ObjectLogin').val(j.login);
                $('#ObjectPassword').val(j.password); 
                $('#ObjectOn').val(j.on);
                $('#ObjectOff').val(j.off);                  
                $('#ObjectId').val(id);
                $('#ObjectName').val(j.name);
                $('#ObjectLink').val(j.link);
                $('#ObjectSignalType').val(objtype);

          }       
          if(objtype === 'media')   {   
                $("#svgTableEdit").html(svgTables.mediaTable());
                $('#ObjectLogin').val(j.login);
                $('#ObjectPassword').val(j.password); 
                $('#ObjectId').val(id);
                $('#ObjectName').val(j.name);
                $('#ObjectLink').val(j.link);
                $('#ObjectSignalType').val(objtype);

          }    
        }
        i++;
    }
  if ( objNew === 0) { 
      if(objtype === 'discrete') {   
                $("#svgTableEdit").html(svgTables.discretTable());    
                $('#ObjectColorOn').val('#ff0000');
                $('#ObjectColorOff').val('#00ff00');
                $('#ObjectAlarmType').val('0');    
                $('#ObjectInvert').val('0');  
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);
      } 
      if(objtype === 'analog')   {   
                $("#svgTableEdit").html(svgTables.analogTable());
                $('#ObjectAlarmType').val('0');
                $('#ObjectMaxValue').val('1000'); 
                $('#ObjectMinValue').val('0');                
                $('#ObjectUpAlarm').val('800');
                $('#ObjectDownAlarm').val('100');                 
                $('#ObjectColorNormal').val('#ffffff');                
                $('#ObjectColorUp').val('#ff0000');
                $('#ObjectColorDown').val('#0000ff'); 
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);
      } 
      if(objtype === 'log')   {   
                $("#svgTableEdit").html(svgTables.logTable());
                $('#ObjectLogin').val('xxx');
                $('#ObjectPassword').val('xxx'); 
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);

      }           
      if(objtype === 'trend')   {   
                $("#svgTableEdit").html(svgTables.trendTable());
                $('#ObjectLogin').val('xxx');
                $('#ObjectPassword').val('xxx'); 
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);

      }       
      if(objtype === 'control')   {   
                $("#svgTableEdit").html(svgTables.controlTable());
                $('#ObjectLogin').val('xxx');
                $('#ObjectPassword').val('xxx'); 
                $('#ObjectOn').val('');
                $('#ObjectOff').val('');                  
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);

      }       
      if(objtype === 'media')   {   
                $("#svgTableEdit").html(svgTables.mediaTable());
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);
                $('#ObjectLogin').val('xxx');
                $('#ObjectPassword').val('xxx'); 
                $('#ObjectId').val(id);
                $('#ObjectName').val('objName');
                $('#ObjectLink').val('');
                $('#ObjectSignalType').val(objtype);


      }  

  }    
}
