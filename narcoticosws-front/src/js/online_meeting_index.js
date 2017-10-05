var index_online_meeting = new Vue({
    el:'#index_online_meeting',
    data:{
        vars:{
            data_table:     '',
            search_visible: false,
            input_search:   ''
        },
        meetings: []
    },
    methods: {
        converteDOW: function (dow) {
            switch (dow){
                case 0:
                    return 'Sunday';
                case 1:
                    return 'Monday';
                case 2:
                    return 'Tuesday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
            }
        },

        converteOMT: function (omt){
            switch (omt) {
                case 0:
                    return 'Hangouts';
                case 1:
                    return 'Skype';
                case 2:
                    return 'Zello';
                default:
                    return 'Outro';
            }
        },

        load_online_meetings: function () {
            this.$http.get("http://localhost:8080/onlinemeeting/private/")
            .then(function (res) {
                this.meetings = res.body;
                for (index = 0; index < this.meetings.length; index++) {
                    this.meetings[index].dayOfWeek = this.converteDOW(this.meetings[index].dayOfWeek);
                    this.meetings[index].onlineMeetingType = this.converteOMT(this.meetings[index].onlineMeetingType);
                    if(this.meetings[index].onlineMeetingType == 'Outro')
                        this.meetings[index].onlineMeetingType = this.meetings[index].anotherPlatform;
                }
            }, function (res) {
                console.log(res);
            });
        },

        remove_online_meeting: function(id){
            this.$http.delete("http://localhost:8080/onlinemeeting/private/"+id)
            .then(function (res) {
                let i = this.meetings.map(item => item.id).indexOf(id) // find index of your object
                this.meetings.splice(i-1, 1)
                //$('#'+id).hide("slow");
                //setTimeout(function(){ $('#'+id).remove(); }, 1500);
                console.log("Sucessoo");
            }, function (res) {
                console.log(res);
            });
        }
    },
    created : function () { this.load_online_meetings(); }
});