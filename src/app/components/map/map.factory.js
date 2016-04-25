(function () {

'use strict';

module.exports = function($http) {

  return {
    getZipData,
    getZipOptions
  }

////////////

    function getZipData(allZips) {
      return $http.get("/assets/state.json")
      .then((zips) => {
        let polyArr=[];
        allZips.forEach((oneZip) => {
          zips.data.features.forEach((el) => {
            if (el.properties.ZCTA5CE10 === oneZip)
              polyArr.push(el.geometry.coordinates)
          })
        })
        return polyArr;
      })
      .then((matchedZips) => {
        return matchedZips.map((mapPath) => { //convert data format
          mapPath=mapPath.reduce((prev,curr) => prev.concat(curr));
          if (mapPath[0].length!==2) mapPath=mapPath.reduce((prev,curr) => prev.concat(curr));
          return mapPath.map((el) => ({latitude: el[1],longitude: el[0]}))
        })
      })
      .catch((err) => console.log(err))
    }


    function getZipOptions() {
      return $http.get("/assets/nygeo.json")
      .then((zips) => {
        let zipOptions=[];
        let counties=["New York County", "Kings County", "Richmond County", "Bronx County","Queens County"];
        zips.data.features.forEach((el) => {
           if (counties.indexOf(el.properties.county) > -1)
            zipOptions.push({zip: el.id, county: el.properties.county})
        })
        return zipOptions;
      })
      .catch((err) => console.log(err))
    }


  }
}());
