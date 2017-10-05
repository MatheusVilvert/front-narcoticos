var app = new Vue({
    el: '#app',
    data: {
        indexUpdate: -1,
        newEvent: {
            remoteId: "",
            name: "",
            description: "",
            note: "",
            registerDate: "",
            image: "",
            startTime: "",
            endTime: "",
            latitude: "",
            longitude: "",
            address: "",
            ownerId: "1",
            confirmedUsers: "1",
            city: "",
            state: "",
            country: "",
            addressNumber: "",
            street: "",
            moderatedUserId: "1",
        },
        events: []
    },
    mounted:function(){
        this.findAll();
    },
    methods: {
        findAll: function () {
            this.$http.get("http://localhost:8080/event/private/")
                .then(function (res) {
                    this.events = res.body;
                }, function (res) {
                    console.log(res);
                });
        },

        updateEvent: function () {
            this.$http.put("http://localhost:8080/event/private/edit", this.newEvent)
                .then(function(res) {
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },

        save:function(){
            if(this.newEvent.remoteId==""){
                this.add();
            }else {
                this.updateEvent();
            }
            this.clear();
        },

        getLatitudeLongitude: function (callback, address) {
            // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
            address = address;
            // Initialize the Geocoder
            geocoder = new google.maps.Geocoder();
            if (geocoder) {
                geocoder.geocode({
                    'address': address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        callback(results[0]);
                    }
                });
            }
        },

        loadMap: function (latLong) {

            var self = $("#mostrarMapa .mapa");
            var latlong = latLong.split(',');
            var myLatlng = new google.maps.LatLng(latlong[0], latlong[1]);
            var mapOptions = {
                zoom: 16,
                center: myLatlng
            };
            var map = new google.maps.Map(self.get(0), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: self.attr('data-title')
            });

            // To add the marker to the map, call setMap();
            marker.setMap(map);
        },

        showResult: function (result) {
            var lat = null, lon = null;
            lat = result.geometry.location.lat();
            lon = result.geometry.location.lng();

            console.log(lat + ' ' + lon);

            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = lon;

            this.newEvent.latitude = lat;
            this.newEvent.longitude = lon;

            this.loadMap(lat + ',' + lon);
        },

        buscar: function () {
            var address = document.getElementById('address').value;
            this.getLatitudeLongitude(this.showResult, address);
        },

        add: function () {
            this.$http.post("http://localhost:8080/event/private/savenofile", this.newEvent)
                .then(function(res) {
                    window.alert("Event successfully added");
                    this.findAll();
                }, function (res){
                    window.alert(res.body.mensagem);
                });
        },

        deleteEvent: function (i) {
            this.$http.delete("http://localhost:8080/event/private/" + (i))
                .then(function (res) {
                    window.alert("Event successfully deleted");
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },

        preperUpdate :function(i){
            this.newEvent=  Vue.util.extend({},this.events[i]);
        },

        clear: function () {
            this.newEvent = {
                remoteId: "",
                name: "",
                description: "",
                note: "",
                registerDate: "",
                image: "",
                startTime: "",
                endTime: "",
                latitude: "",
                longitude: "",
                address: "",
                ownerId: "1",
                isModerated: "",
                confirmedUsers: "1",
                city: "",
                state: "",
                country: "",
                addressNumber: "",
                street: "",
                moderatedUsedId: "1",
            }
        }
    }
})