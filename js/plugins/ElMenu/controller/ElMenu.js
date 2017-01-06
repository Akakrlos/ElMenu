// Created By Carlos Garcia @akakrlos 2016

(function ( $ ) {
    $.fn.ElMenu = function( options ) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        }, options );
        // Greenify the collection based on the settings variable.
    el=$(this);
    var history=[];
    esqueleto={};
    // AJAX //
    function getTemplateAjax() {
            return $.ajax({
                url: "/js/plugins/ElMenu/views/ElMenu.tpl.html",
                type: "get",
                 cache: "false",
                contentType: "text/html"
            });
        }

    function getTemplateListAjax() {
            return $.ajax({
                url: "/js/plugins/ElMenu/views/ElMenu-List.tpl.html",
                type: "get",
                 cache: "false",
                contentType: "text/html"
            });
        }

    function getMenuAjax() {
            return $.ajax({
                url: "menu.json",
                type: "get",
                cache: "false",
                contentType: "application/json"
            });
        }
    //------//

    function renderMenu() {
            el.empty();
            $.each( esqueleto, function( key, value ) {
                
                if(value.tpl=='icon'){
                    renderTplIcon(value);
                } else {
                    renderTplList(value);
                }
            });
            attEvents()
    }

    function renderTplList(obj){
        _.templateSettings.variable = "rc";
            var templatex = _.template(
                    $("script.elmenu-list").html()
            );
            el.append(templatex(obj));
    }

    function renderTplIcon(obj){
         _.templateSettings.variable = "rc";
            var template = _.template(
                    $("script.elmenu-icon").html()
         );
         el.append(template(obj));
    }

    function goHome(){
        var currentMenu = $('.currentMenu');
        $(currentMenu).removeClass('currentMenu');
        $(currentMenu).toggle();
        switchMenu(0)
    }

    function _bind() {
        $(el).append('<div id="elmenu"></div>')
        el=$('#elmenu');
        getTemplateListAjax().done(function(tplList){
            $("body").append(tplList)
        });
        getTemplateAjax().done(function(tpl){
            $("body").append(tpl)
            getMenuAjax().done(function(data){
                esqueleto=data
                renderMenu();
            })
        })

        $(el).swipe({
            swipeRight:function(event, direction, distance, duration, fingerCount) {
            goBack();
            }
        });

    }

    function goBack(){
        if(history.length > 0){
            var currentMenu = $('.currentMenu');
            $(currentMenu).removeClass('currentMenu');
            $(currentMenu).toggle();
            var start=history.length-1;
            console.log(history);
            console.log("index:"+start);
            console.log("Menu:"+(history[start]).id)
            switchMenu(history[start].id)
            history.splice(start);
        }
    }

    function attEvents(){
        $('.menuItemClick').click(function(){
            console.log($(this).data('link').indexOf("@"));
            if( $(this).data('link').indexOf("@") > 0){
            var currentMenu = $('.currentMenu');
            var objh = {id:$(currentMenu).data('id'),name:$(currentMenu).data('name'),idx:history.length}
            history.push(objh);
            $(currentMenu).removeClass('currentMenu');
            $(currentMenu).toggle();
            switchMenu($(this).data('link').split('@')[1])
            } else {
                document.location=$(this).data('link');
            }
        })
    }

    function switchMenu (dt) {
       var link = dt
            $("#Menu_"+link).addClass('currentMenu');
            $("#Menu_"+link).fadeToggle( "fast", "linear" );
    }
    return {
            bind: function () {
                _bind();
            },
            goTo: function (link) {
                _goTo();
            },
            history: function (link) {
                return history;
            }
    }
    };
}( jQuery ));

$(document).ready(function(){
   
   $elmenuobj = $("elmenu").ElMenu({
            color: "#556b2f",
            backgroundColor: "white"
        });
   $elmenuobj.bind();
})