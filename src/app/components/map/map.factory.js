module.exports = function($http) {

  var obj={};

  obj.getZipData = (allZips) => {
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

      //TODO: refactor
      function coordCleaner(mapPath) {
        mapPath=mapPath.reduce((prev,curr) => prev.concat(curr));
        if (mapPath[0].length!==2) mapPath=mapPath.reduce((prev,curr) => prev.concat(curr));
        return mapPath.map((el) => ({latitude: el[1],longitude: el[0]})
      )}
      return matchedZips.map((each) => coordCleaner(each))
    })
    .catch((err) => console.log(err))
  }

  obj.getZipOptions = () => {
    return $http.get("/assets/nygeo.json")
    .then((zips) => {
      let zipOptions=[];
      let counties=["New York County", "Kings County", "Richmond County", "Bronx County","Queens County"];
      zips.data.features.forEach(el => {
         if (counties.indexOf(el.properties.county) > -1)
          zipOptions.push({zip: el.id, county: el.properties.county})
      })
      console.log("getting zip options!")
      return zipOptions;
    })
  }


  return obj;

}
