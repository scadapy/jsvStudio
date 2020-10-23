

function createMenu() {
    var menu = new nw.Menu({ type: 'menubar' });
    var submenu = new nw.Menu();
 
    submenu.append(new nw.MenuItem({
        label: 'Открыть проект',
        click: function(){
           openProjectFile();
        }
    }));
    submenu.append(new nw.MenuItem({
     label: 'Выход (Alt+F4)',
     click: function(){
         nw.App.quit();
     }
    }));
 
    menu.append(new nw.MenuItem({
     label: 'Проект',
     submenu: submenu
    }));
    nw.Window.get().menu = menu;
 }
 