var form_online_meeting = new Vue({
    el:'#form_online_meeting',
    data:{
        form_vars:{
            dayOfWeek				: '',
            hour_minute				: '',
            timeZone				: '',
            language				: '',
            description             : '',
            onlineMeetingType       : '',
            anotherPlatform         : '',
            platformAccount			: '',
            startHour              : '',
            startMinute            : '',
            hour_minute_string      : ''
        },
        timeZones: []
    },

    mounted: function(){
      this.load_timezone();
    },

    methods: {
        show_text_another_platform: function () {
            $('#div_platform_name').show("slow");
        },

        change_value_radio: function () {
            //console.log("plataforma da vez: "+this.option_platform);
            $('#div_platform_name').hide("fast");
            //this.software_selected = $(this).val();
            //this.software_selected = this.option_platform;
        },

        load_timezone: function () {
            this.$http.get('http://localhost:8080/onlinemeeting/private/combos')
            .then(function (res) {
                this.timeZones = res.body;
            }, function (res) {
                console.log("Error: "+res.body);
            });
            //console.log('Timezone Carregado!');
        },

        valid_fields_filled: function(){
            if( this.form_vars.dayOfWeek == '' ||
                this.form_vars.hour_minute == '' ||
                this.form_vars.timeZone == '' ||
                this.form_vars.language == '' ||
                this.form_vars.description == '' ||
                this.form_vars.onlineMeetingType == '' ||
                this.form_vars.platformAccount == '' ){
                alert('To continue you must fill in all fields!');
            }else{
                if( this.form_vars.onlineMeetingType == 3 && this.form_vars.anotherPlatform == '' ){
                    alert('To continue you must fill in all fields!');
                }else{
                    this.form_vars.hour_minute_string = this.form_vars.hour_minute.split(':');
                    this.form_vars.startHour = this.form_vars.hour_minute_string[0];
                    this.form_vars.startMinute = this.form_vars.hour_minute_string[1];
                    //console.log("Hora: "+this.form_vars.start_hour+" || Minuto: "+this.form_vars.start_minute);
                    //console.log("valores do obj: "+String.valueOf(this.form_vars));
                    this.end_persistence();
                }
            }
        },

        end_persistence: function(){
            this.$http.post("http://localhost:8080/onlinemeeting/private/save",this.form_vars,{body:""})
            .then(function (res) {
                window.alert('New Meeting Saved Successful');
                page_data_controller.open_module(menu_principal);
            }, function (res) {
                console.log("Erro ao salvar! = "+res);
            });
        }
    },
    created: function () {
        this.load_timezone();
    }
});