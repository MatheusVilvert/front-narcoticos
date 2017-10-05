var menu_principal = '';

var page_data_controller = new Vue({
    el:'#page_data_controller',
    data:{
        form_vars:{
            menu_ativo	    : '',
            submenu_ativo	: ''
        }
    },

    methods: {
        open_module: function (path_menu) {
            this.menu_ativo = path_menu;
            menu_principal = path_menu;
            $.ajax({url: "/html/"+path_menu+".html", success: function(result){
                $('.page_data_content').html(result);
            }});
        },

        open_sub_module: function (path_submenu) {
            this.submenu_ativo = path_submenu;
            $.ajax({url: "/html/"+this.menu_ativo+"_"+path_submenu+".html", success: function(result){
                $('.page_data_content').html(result);
            }});
        }
    },
    created: function () {
        //this.search_menu('index');
    }
});