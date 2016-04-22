angular.module('myApp.home')
.controller('homeCtrl', function($scope, uiGmapGoogleMapApi, $http, MapFactory, localStorageService) {
		uiGmapGoogleMapApi.then(function(maps) {
  		maps.visualRefresh = true;
      // $scope.defaultBounds = new google.maps.LatLngBounds(
      //   new google.maps.LatLng(40.9, -74.3),
      //   new google.maps.LatLng(40.5, -73.7));
      //
      //   $scope.map.bounds = {
      //         northeast: {
      //           latitude:$scope.defaultBounds.getNorthEast().lat(),
      //           longitude:$scope.defaultBounds.getNorthEast().lng()
      //         },
      //         southwest: {
      //           latitude:$scope.defaultBounds.getSouthWest().lat(),
      //           longitude:-$scope.defaultBounds.getSouthWest().lng()
      //         }
      //       }
      //       $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
      $scope.polygons=[];
      let lastZipArr=localStorageService.get('lastSubmit');
      if (lastZipArr)
        lastZipArr.forEach(el => $scope.polygons.push(localStorageService.get(el)))


    });

    angular.extend($scope, {
      map: {
        center: {latitude: 40.7, longitude: -74 },
        zoom: 12
      },
      searchbox: {
        template:'searchbox.tpl.html',
        events: {
          places_changed: function (autocomplete) {
            $scope.$apply(console.log("in the apply!"))
          }
        },
        position: 'TOP_CENTER',
        options: {
          autocomplete: true,
          types: ['(regions)'],
          componentRestrictions: {country: 'us'}
        }
    }
  })
      $scope.clearPolygons = function() {
        $scope.polygons = [];
        localStorageService.set('lastSubmit',[])
      }

      $scope.generatePolygons = function() {
        $scope.polygons=[];
        zipArr=$scope.zipEntry.split(',');
        localStorageService.set('lastSubmit',zipArr)
        var nonLocalArr=[];
        zipArr.forEach((el,idx) => {
          if (localStorageService.get(el)) {
  					$scope.polygons.push(localStorageService.get(el));
          } else {
            nonLocalArr.push(el)
          }
        })
        console.log("nonlocal",nonLocalArr)
        if (nonLocalArr.length) {
          MapFactory.getZipData(nonLocalArr)
          .then(function(res) {
            console.log(res)
            res.forEach((el,idx) => {
              $scope.polygons.push({
                    id: nonLocalArr[idx],
                    path: el,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: false,
                    draggable: false,
                    geodesic: false,
                    visible: true,
                    fill: {
                        color: '#ff0000',
                        opacity: 0.8
                    }
              })
              localStorageService.set(nonLocalArr[idx],$scope.polygons[$scope.polygons.length-1]);
            })
        // $scope.map.center = res[0];
        });
    }
  }

});
