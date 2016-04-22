angular.module('myApp.home').factory('MapFactory', function($http) {

  var obj={};

  obj.getZipData = function(allZips) {
    return $http.get("/assets/state.json")
    .then(function(zips) {
      let polyArr=[];
      allZips.forEach(function(oneZip) {
        zips.data.features.forEach(function(el) {
          if (el.properties.ZCTA5CE10 === oneZip)
            polyArr.push(el.geometry.coordinates)
        })
      })
      return polyArr;
    })
    .then(function(matchedZips) {
      console.log(matchedZips)
      //TODO: refactor
      function coordCleaner(mapPath) {
        mapPath=mapPath.reduce((prev,curr) => prev.concat(curr));
        if (mapPath[0].length!=2) mapPath=mapPath.reduce((prev,curr) => prev.concat(curr));
        console.log(mapPath)
        return mapPath.map(function(el) {
           return {latitude: el[1],longitude: el[0]};
        })
    }

    return matchedZips.map(function(each) {

      return coordCleaner(each);
    })

    })
  }


  return obj;

})
