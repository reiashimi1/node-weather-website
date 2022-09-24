const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1`;

  request({ url, json: true }, (error, { body = {} }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body?.features?.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        // latitude: body?.features[0]?.center,
        // longitude: body?.features[1]?.center,
        // location: body?.features[0]?.place_name,
        latitude: 37.8267,
        longitude: -122.4233,
        location: "Boston",
        hello: "hello",
      });
    }
  });
};

module.exports = geocode;
