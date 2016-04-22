angular.module('myApp.home', ['uiGmapgoogle-maps'])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyB6e7CrrfD4O0AfRSOK0nkHWdpZmQj-98k',
        v: '3.30',
        libraries: 'weather,geometry,visualization,places'
    });
})
