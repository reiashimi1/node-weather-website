const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=27939dc2e2db29e9588b33454ca51a8c&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to find the location", undefined);
    } else if (body.error) {
      callback("Unable to find the location 2");
    } else {
      const { temperature, precip } = body.current;
      callback(
        undefined,
        "The temperature is: " +
          temperature +
          " degrees. There is " +
          precip +
          "% chance to be raining"
      );
    }
  });
};

module.exports = forecast;
