var app = new Vue({
    el: '#app',
    data: {
        indexUpdate: -1,
        dataAtual: new Date(),
        newGroup: {
            remoteId: "",
            name: "",
            date: new Date(),
            ownerId: "1",
            latitude: "",
            longitude: "",
            phone: "",
            address: "",
            virtual: ""
        },
        groups: []
    },
    mounted: function () {
        this.findAll();
    },
    methods: {
        validate: function () {
            if (this.newGroup.name == '' ||
                this.newGroup.address == ''||
                this.newGroup.phone == ''||
                this.newGroup.virtual == ''){
                alert('To continue you must fill in all fields!');
            }else {
                //fazer metodo para validar se endereco ja existe
                this.save();
            }
        },
        findAll: function () {
            this.$http.get("http://localhost:8080/group/private/")
                .then(function (res) {
                    this.groups = res.body;
                }, function (res) {
                    console.log(res);
                });
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
            console.log(latlong);
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

            $('latitude').val(lat);
            $('longitude').val(lon);

            this.newGroup.latitude = lat;
            this.newGroup.longitude = lon;

            this.loadMap(lat + ',' + lon);
        },
        buscar: function () {
            var address = document.getElementById('address').value;
            this.getLatitudeLongitude(this.showResult, address);
        },
        updateGroup: function () {
            this.$http.put("http://localhost:8080/group/private/edit", this.newGroup)
                .then(function (res) {
                    window.alert("Group Successfully Edited");
                    this.findAll();
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
        },
        save: function () {
            if (this.newGroup.remoteId == "") {
                this.add();
            } else {
                this.updateGroup();
            }
            this.clear();

        },
        add: function () {
            this.$http.post("http://localhost:8080/group/private/savenofile", this.newGroup)
                .then(function (res) {
                    window.alert("Group Successfully Added");
                    this.findAll();
                }, function (res) {
                    window.alert(res.body.mensagem);
                });
        },
        deleteGroup: function (i) {
            this.$http.delete("http://localhost:8080/group/private/" + (i))
                .then(function (res) {
                    window.alert("Group Successfully Deleted");
                    this.findAll();
                }, function (res) {
                    console.log(res);
                });
        },
        prepareUpdate: function (i) {
            this.newGroup = Vue.util.extend({}, this.groups[i]);
        },
        clear: function () {
            this.newGroup = {
                remoteId: "",
                name: "",
                date: "",
                ownerId: "1",
                latitude: "",
                longitude: "",
                phone: "",
                address: "",
                virtual: ""
            },
                document.getElementById("mostrarMapa").innerHTML = "";


        },
    }
})