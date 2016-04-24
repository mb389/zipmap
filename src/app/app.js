require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-sanitize')
require('angular-material');
require('../../node_modules/isteven-angular-multiselect/isteven-multi-select.js')
require('angular-google-maps');
require('angular-simple-logger');
require('angular-local-storage');
require('lodash');
require('./components/about/about.js');
require('./components/map/map.controller.js');
require('./components/map/map.factory.js');


var app = angular.module('myApp', ['ui.router','isteven-multi-select','ngSanitize','uiGmapgoogle-maps','ngMaterial','LocalStorageModule','myApp.about']);

app.config(function($stateProvider, $urlRouterProvider,uiGmapGoogleMapApiProvider) {

	uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyB6e7CrrfD4O0AfRSOK0nkHWdpZmQj-98k',
			v: '3.30',
			libraries: 'weather,geometry,visualization,places'
	});

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('map', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/map/map.html"
			},
			"header@map":{
				templateUrl:"app/shared/header/header.html"
			}
		},
		controller: 'homeCtrl',
		resolve: {
			zipOptions: (MapFactory) => {
				console.log("resolving")
				return MapFactory.getZipOptions().then(res => res)
			}
		}
	})
	.state('about', {
		url: "/about",
		views : {
			"" : {
				templateUrl:"app/components/about/about.html"
			},
			"header@about":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
});
