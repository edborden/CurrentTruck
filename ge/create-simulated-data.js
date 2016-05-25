/**
Created by Pinaki Sinha on 05/11/16
This client creates simulated pedestrian and parking data and sends to current truck server
*/
var request = require('request');
var fs = require('fs');
// var sleep = require('sleep');
var flag = process.argv[2];

// var data = {
// 	id:"z",
// 	pedestrians_increment_count:"18",
// 	pedestrians_decrement_count:"9",
// 	spots_increment_count:"7",
// 	spots_decrement_count:"3",
// 	lat:"32.711653",
// 	lng:"-117.157314"
// };

var options = {
  uri: 'https://api.scriptrapps.io/update',
  method: 'POST',
  json: true,
  headers: {
          "content-type": "application/json",
	  "Authorization": "bearer RDU0OTQ3RDJDNTpzY3JpcHRyOkVDQzBDNURGNDVCMUZGNDFCMTMxNDAwMUFBRkNFMTcx"
  }
};

function sendData(data) {
	options.body = data;
	request(options, function (error, response, body) {
		console.log(error);
		console.log(body);
	});	
}

function createAndUploadSimPedData(runIndex) {
	// define the ids
	// define the locations of those
	// 
	var simPedestrianData = [
		{id: "x64176", lat: "32.707003", lng:"-117.155778"}, // Petco park: 32.707003, -117.155778
		{id: "afbc", lat: "32.721967", lng:"-117.172689"}, // Waterfront Park: 32.721967, -117.172689
		{id: "yqbq-62d", lat: "32.723637", lng:"-117.138494"}, // Balboar Park Parking Lot 32.723637, -117.138494
		{id: "iyquy71", lat: "32.726282", lng:"-117.154104"} // SD Space Museum 32.726282, -117.154104
	];
	var count = 1;
	for(var i = 0; i < count; i++) {
		simPedestrianData.forEach(function(val) {
			if (runIndex % 2 == 0) {
				// console.log("even");
				val.pedestrians_increment_count = randomInt(0, 5);
				val.pedestrians_decrement_count = 0;
			} else {
				// console.log("odd");
				val.pedestrians_increment_count = 0;
				val.pedestrians_decrement_count = randomInt(0, 5);
			}
			
			val.spots_increment_count = 0;
			val.spots_decrement_count = 0;
			sendData(val);
			// sleep.sleep(1);
			// var v = setTimeout(function() {
			    // console.log('Interval between sensors peds');
				// sendData(val);
				// clearTimeout(v);
			// }, 1000);
			
		});
		// sleep.sleep(2);
		// x = setTimeout(function() {
// 		    // console.log('Interval between Multiple iter peds');
// 			clearTimeout(x);
// 		}, 2000);	  
	}
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function createAndUploadSimParkingData(runIndex) {
	var simParkingData = [
		{id: "x64176", lat: "32.707003", lng:"-117.155778"}, // Petco park: 32.707003, -117.155778
		{id: "afbc", lat: "32.721967", lng:"-117.172689"}, // Waterfront Park: 32.721967, -117.172689
		{id: "yqbq-62d", lat: "32.723637", lng:"-117.138494"}, // Balboar Park Parking Lot 32.723637, -117.138494
		{id: "iyquy71", lat: "32.726282", lng:"-117.154104"}, // SD Space Museum 32.726282, -117.154104
		{id: "1349-1217", lat: "32.713744", lng:"-117.157333"}, // 32.713744,-117.157333
		{id: "1347-1215", lat: "32.713765", lng:"-117.156406"}, // 32.713765,-117.156406
		{id: "1345-1212", lat: "32.713758", lng:"-117.155512"} // 32.713758,-117.155512
	];
	var count = 1;
	for(var i = 0; i < count; i++) {
		simParkingData.forEach(function(val) {
			if (runIndex % 2 == 0) {
				// console.log("even");
				val.spots_increment_count = randomInt(0, 3);
				val.spots_decrement_count = 0;
			} else {
				// console.log("odd");
				val.spots_increment_count = 0;
				val.spots_decrement_count = randomInt(0, 3);	
			}
			
			val.pedestrians_increment_count = 0;
			val.pedestrians_decrement_count = 0;
			sendData(val);
			// var v = setTimeout(function() {
// 			    console.log('Interval between parking sensors');
// 				// sendData(val);
// 				// clearTimeout(v);
// 			}, 2000);
			// sleep.sleep(2);
		});
		// x = setTimeout(function() {
// 		    // console.log('Interval between Multiple parking iter');
// 			clearTimeout(x);
// 		}, 3000);
		// sleep.sleep(3);	  
	}
}

// function createPedestrianDataFromCurrent() {
// 	var realPedestrainData = [
// 		// {id: "HYP1040-75", lat: "32.707003", lng:"-117.155778"}, // 32.711653,-117.157314
// // 		{id: "HYP1039-72", lat: "32.721967", lng:"-117.172689"}, // 32.712668,-117.157546
// 		{id: "1349-1217", lat: "32.713744", lng:"-117.157333"}, // 32.713744,-117.157333
// 		{id: "1347-1215", lat: "32.713765", lng:"-117.156406"}, // 32.713765,-117.156406
// 		{id: "1345-1212", lat: "32.713758", lng:"-117.155512"} // 32.713758,-117.155512
// 	];
// 	// {"event-uid":"7c8a82e2-7979-458e-bf0b-29cd9ad52071","timestamp":1463016790644,"event-type":"SFOUT","device-uid":"1347-1215","location-uid":"1347-crosswalk","measures":[{"tag":"SFCNT","value":14}]}
// 	// translateCurrentGEPedsData
// 	// read data from file
// 	var fileName = "/Users/pinaki/Documents/pedestrain-data";
// 	// var obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
// 	// var par// sedJSON = require(fileName);
// // 	console.log(parsedJSON);
// 	var array = fs.readFileSync(fileName).toString().split("\n");
// 	for(i in array) {
// 		var obj = JSON.parse(array[i]);
// 	    // console.log(obj);
// 		if (obj.measures && obj.measures.length > 0) {
// 				// console.log(obj["device-uid"] + ", " + obj["event-type"] + ", " + obj.measures[0].value);
// 				var val = {id: obj["device-uid"], lat: "32.713765", lng:"-117.156406"};
// 				val.spots_increment_count = 0;
// 				val.spots_decrement_count = 0;
// 				val.pedestrians_increment_count = 0;
// 				val.pedestrians_decrement_count = 0;
// 				if (obj["event-type"] == "SFIN") {
// 					val.pedestrians_increment_count = obj.measures[0].value;
// 				} else if (obj["event-type"] == "SFOUT") {
// 					val.pedestrians_decrement_count = obj.measures[0].value;
// 				}
// 				console.log(val);
// 				sendData(val);
// 		}
// 		// obj.device-uid;
// // 		obj.event-type;
// // 		obj.measures[0].value
// 	}
// 	// create the data
// }

function publishSimData(runIndex) {
	if (flag == "park") {
		console.log("parking");
		createAndUploadSimParkingData(runIndex);
		
	} else if (flag == "ped") {
		console.log("ped");
		createAndUploadSimPedData(runIndex);
	}
	
	// 
}
var runIndex = parseInt(process.argv[3]);
console.log(runIndex);
publishSimData(runIndex);

/* Read Pedestrian Data from File, Translate it to our data model and Send it to Server */

// createPedestrianDataFromCurrent();