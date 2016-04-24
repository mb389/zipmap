
angular.module('myApp').controller('homeCtrl', function($scope, uiGmapGoogleMapApi, $http, MapFactory, localStorageService) {
	console.log($stateParams)
  MapFactory.getZipOptions().then(res => $scope.zipOptions=res)

  // $scope.zipOptions=$stateParams.zipOptions;

	angular.extend($scope, {
		map: {
			center: {latitude: 40.7, longitude: -74 },
			zoom: 11,
			scrollwheel: false
		}
	})

		uiGmapGoogleMapApi.then(function(maps) {
  		maps.visualRefresh = true;
      $scope.polygons=[];
      let lastZipArr=localStorageService.get('lastSubmit');
      if (lastZipArr) //persist refresh
        lastZipArr.forEach(el => $scope.polygons.push(localStorageService.get(el.zip)))
		});

      $scope.clearPolygons = function() {
        $scope.polygons = [];
        $scope.zipSelections=[];
        localStorageService.set('lastSubmit',[])
      }

      $scope.generatePolygons = function() {
        //TODO: Error on not found
        $scope.polygons=[];
        var nonLocalArr=[];
        $scope.zipSelections = $scope.zipSelections ? $scope.zipSelections : [];
				localStorageService.set('lastSubmit',$scope.zipSelections)
        $scope.zipSelections.forEach((el,idx) => {
          if (localStorageService.get(el.zip)) {
  					$scope.polygons.push(localStorageService.get(el.zip));
          } else {
            nonLocalArr.push(el.zip)
          }
        })
        console.log("nonlocal",nonLocalArr)
        if (nonLocalArr.length) {
          MapFactory.getZipData(nonLocalArr)
          .then(function(res) {
            console.log("getdatafactorycall",res)
            res.forEach((el,idx) => {
              let poly={
                    id: nonLocalArr[idx],
                    path: el,
                    stroke: {
                        color: '#6060FB',
                        weight: 2
                    },
                    editable: false,
                    draggable: false,
                    geodesic: false,
                    visible: true,
                    fill: {
                        color: '#ff0000',
                        opacity: 0.7
                    }
              }
              $scope.polygons.push(poly)
              localStorageService.set(nonLocalArr[idx],poly);
            })
        });
    }
  }

});
