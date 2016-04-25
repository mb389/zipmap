(function () {

'use strict';

module.exports = function($scope, uiGmapGoogleMapApi, MapFactory, localStorageService, allZips) {

  $scope.zipOptions=allZips;
  $scope.persistRefresh=persistRefresh;
  $scope.clearPolygons=clearPolygons;
  $scope.generatePolygons=generatePolygons;

  ////////////

	angular.extend($scope, {
		map: {
			center: {latitude: 40.7, longitude: -74 },
			zoom: 11,
			scrollwheel: false
		}
	})

	uiGmapGoogleMapApi.then((maps) => {
		maps.visualRefresh = true;
    $scope.persistRefresh();
	});

  function persistRefresh() {
    $scope.polygons=[];
    let lastSubmit=localStorageService.get('lastSubmit');
    if (lastSubmit)
      lastSubmit.forEach(el => $scope.polygons.push(localStorageService.get(el.zip)))
  }

  function clearPolygons() {
    $scope.polygons = [];
    $scope.zipSelections=[];
    localStorageService.set('lastSubmit',[])
  }

  function generatePolygons() {
    $scope.polygons=[];
    let nonLocalArr=[];
    $scope.zipSelections = $scope.zipSelections ? $scope.zipSelections : [];
		localStorageService.set('lastSubmit',$scope.zipSelections)
    //retrieve all available zips from local storage, ajax for remaining
    $scope.zipSelections.forEach((el) => {
      let localZip=localStorageService.get(el.zip);
      if (localZip) $scope.polygons.push(localZip);
      else nonLocalArr.push(el.zip);
    })

    if (nonLocalArr.length) {
      MapFactory.getZipData(nonLocalArr)
      .then((res) => {
        res.forEach((el,idx) => {
          let poly = {
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
          $scope.polygons.push(poly);
          localStorageService.set(nonLocalArr[idx],poly);
        })
      });
    }
  }

  $scope.selectionLabels = {
    selectAll       : "Select all",
    selectNone      : "Select none",
    reset           : "Reset",
    search          : "Type here to search...",
    nothingSelected : "Choose Zip Code(s)"
  }

  }
}());
