var app = new Vue({
    el:'#app',
    data:{
        indexUpdate: -1,
        isActive: false,
        newMeeting:{
            remoteId:'',
            startHour:'',
            day_of_week:'',
            startMinute:'',
            groupOwnerId:''
        },
        meetings:[],
        groups:[]
    },
    mounted:function(){
        this.findAll();
        this.findAllGroups();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/meeting/private/")
                .then(function (res) {
                    this.meetings = res.body;
                }, function (res) {
                    console.log(res);
                });
        },
        findAllGroups:function(){
            this.$http.get("http://localhost:8080/group/private/")
                .then(function(res){
                    this.groups = res.body;
                }, function (res){
                    console.log(res);
                });
        },
        updateMeeting: function () {
            this.$http.put("http://localhost:8080/meeting/private/edit", this.newMeeting)
                .then(function(res) {
                    window.alert("Meeting Successfully Edited");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        save:function(){
            if(this.newMeeting.remoteId==""){
                this.add();
            }else {
                this.updateMeeting();
            }
            this.clear();
        },
        add: function () {
            this.$http.post("http://localhost:8080/meeting/private/savesingle", this.newMeeting)
                .then(function(res) {
                    window.alert("Meeting Successfully Added");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },
        deleteMeeting: function (i) {
            this.$http.delete("http://localhost:8080/meeting/private/" + (i))
                .then(function (res) {
                    window.alert("Meeting Deleted Successfully");
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });

        },
        prepareUpdate :function(i){
            this.newMeeting=  Vue.util.extend({},this.meetings[i]);
            this.newMeeting.day_of_week+=1;
        },
        clear: function () {
            this.newMeeting = {
                remoteId:'',
                startHour:'',
                startMinute:'',
                groupOwnerId:''
            }
        }
    }

})