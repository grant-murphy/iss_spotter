const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// const fetchMyIP = function(callback) {
//   // use request to fetch IP address from JSON API
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     if (error) {
//       return callback(error, null);
//     }
  
//     if (response.statusCode !== 200) {
//       const msg = `Status Code: ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(error(msg), null);
//       return;

//     } else {
//       const data = JSON.parse(body).ip; // dot notation to just access the key value pair
//       callback(null, data);
//     }
  
//   });
// };

const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
  
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    
    if (body) {
      const jason = JSON.parse(body);
      let cord = {};
      cord.latitude = jason.data.latitude;
      cord.longitude = jason.data.longitude;
      
      callback(null, cord);
      return;
    }
  });
};

//module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };














// const fetchMyIP = function(callback) {
//   // use request to fetch IP address from JSON API
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     if (error) {
//       callback('ERROR');
//     }
  
//     if (response.statusCode !== 200) {
//       const msg = `Status Code: ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(error(msg), null);
//       return;

//     } else {
//       const data = JSON.parse(body);
//       callback(null, data);
//     }
  
//   });
// };


// module.exports = { fetchMyIP };