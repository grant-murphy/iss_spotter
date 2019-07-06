// iss_promised.js
const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function(body) {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  const jason = JSON.parse(body);
  let cord = {};
  cord.latitude = jason.data.latitude;
  cord.longitude = jason.data.longitude;
  let url = `http://api.open-notify.org/iss-pass.json?lat=${cord.latitude}&lon=${cord.longitude}`
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
  .then(result => {

      // console.log(result)
      fetchCoordsByIP(result)
      .then(result2 => {

        // console.log(result2)
        fetchISSFlyOverTimes(result2)
        .then(result3 => {
          console.log(JSON.parse(result3).response)
        })
      })
    }).catch((error) => {
      console.log("It didn't work: ", error.message);
    });
  }
       


nextISSTimesForMyLocation()





module.exports = { nextISSTimesForMyLocation };
//module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };