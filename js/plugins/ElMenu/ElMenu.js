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

    // AJAX //
    function getTemplateAjax() {
        console.log(1);
            return $.ajax({
                url: "/js/plugins/ElMenu/ElMenu.tpl.html",
                type: "get",
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

    function renderTemplate(data) {
            _.templateSettings.variable = "rc";
            var template = _.template(
                    $("script.ElMenu").html()
            );
            el.html(template(data));
            attEvents()
    }

    function goHome(){
        var currentMenu = $('.currentMenu');
        $(currentMenu).removeClass('currentMenu');
        $(currentMenu).toggle( "fast", "linear",switchMenu(0) );
    }

    function _bind() {
        getTemplateAjax().done(function(tpl){
            $("body").append(tpl)
            getMenuAjax().done(function(data){
                console.log(data)
                renderTemplate(data);
                
            })
        })

        $(el).swipe({
        swipeRight:function(event, direction, distance, duration, fingerCount) {
           goHome();
        }
        });

    }

    function attEvents(){
        $('.menuItem').click(function(){
            console.log($(this).data('link').indexOf("@"));
            if( $(this).data('link').indexOf("@") > 0){
            var currentMenu = $('.currentMenu');
            $(currentMenu).removeClass('currentMenu');
            $(currentMenu).toggle( "fast", "linear",switchMenu($(this).data('link').split('@')[1]) );
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
            }
    }
    };
}( jQuery ));

$(document).ready(function(){
   
   $ElMenuObj = $("elmenu").ElMenu({
            color: "#556b2f",
            backgroundColor: "white"
        });
   $ElMenuObj.bind();
})