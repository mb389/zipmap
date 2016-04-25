(function () {

'use strict';

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
const mapCtrl = require('./components/map/map.controller.js');
const mapFactory = require('./components/map/map.factory.js');
const headerNav = require('./shared/header/header.directive.js');

angular.module('myApp', ['ui.router','isteven-multi-select','ngSanitize','uiGmapgoogle-maps','ngMaterial','LocalStorageModule'])

.config(function($stateProvider, $urlRouterProvider,uiGmapGoogleMapApiProvider) {

	uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyB6e7CrrfD4O0AfRSOK0nkHWdpZmQj-98k',
			v: '3.30',
			libraries: 'weather,geometry,visualization,places'
	});

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('home', {
		url: "/",
		templateUrl: "./app/components/map/map.html",
		controller: 'MapCtrl',
		resolve: {
			allZips: (MapFactory) => MapFactory.getZipOptions().then(res => res)
		}
	})
})

.controller('MapCtrl', mapCtrl)
.factory('MapFactory', mapFactory)
.directive('headerNav', headerNav)


}());
