/**
Created by Pinaki Sinha on 05/11/16
This websocket client listens to pedestrian data from predix server and updates currenttruck server.
*/
var ws = require('nodejs-websocket')
var request = require('request');
if (process.argv.length <= 4) {
    console.log("Usage: " + __filename + " id,  lat, lng, ws-url");
    process.exit(-1);
}

// var url = "wss://ie-websocket-server-prod.run.aws-usw02-pr.ice.predix.io/consume?routing-key=a5ec4461-dbe2-4716-a725-55aa930f1af1&service-name=ie-pedestrian";
var id = process.argv[2];
var lat = process.argv[3];
var lng = process.argv[4];
var url = process.argv[5];
console.log(url);
// insert a valid predix token here
var token = "Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJkMzRjMjhhYi1hNzRkLTQwMGQtOGI0Yi01NzI1YmIwMjRhNTIiLCJzdWIiOiJwaW5ha2ktYXBwLWNsaWVudC1pZC0zIiwic2NvcGUiOlsiaWUtcGFya2luZy56b25lcy40ODUxMzdmYS1mZWFhLTRmMGEtYmZhYy04ZTU3YTY5ZDlhOTQudXNlciIsImllLXBlZGVzdHJpYW4uem9uZXMuMjRjMmZkOWUtNzRmMS00OTk4LTlmOTgtOTY4YTM5NjQ1NzAyLnVzZXIiLCJ1YWEucmVzb3VyY2UiLCJvcGVuaWQiLCJ1YWEubm9uZSIsImllLXRyYWZmaWMuem9uZXMuMGZkMTEyMWYtOGY0OC00Y2I2LWI2MTYtMGU2MjNjYjljOTM4LnVzZXIiXSwiY2xpZW50X2lkIjoicGluYWtpLWFwcC1jbGllbnQtaWQtMyIsImNpZCI6InBpbmFraS1hcHAtY2xpZW50LWlkLTMiLCJhenAiOiJwaW5ha2ktYXBwLWNsaWVudC1pZC0zIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiI3N2JhYTkxZCIsImlhdCI6MTQ2MzA0ODk0OCwiZXhwIjoxNDYzMDkyMTQ4LCJpc3MiOiJodHRwczovLzA0MGRiN2JhLTBlMzMtNGM1Ny1hZmM1LTc4Yjg4ZTY2OThmYS5wcmVkaXgtdWFhLnJ1bi5hd3MtdXN3MDItcHIuaWNlLnByZWRpeC5pby9vYXV0aC90b2tlbiIsInppZCI6IjA0MGRiN2JhLTBlMzMtNGM1Ny1hZmM1LTc4Yjg4ZTY2OThmYSIsImF1ZCI6WyJwaW5ha2ktYXBwLWNsaWVudC1pZC0zIiwiaWUtcGFya2luZy56b25lcy40ODUxMzdmYS1mZWFhLTRmMGEtYmZhYy04ZTU3YTY5ZDlhOTQiLCJpZS1wZWRlc3RyaWFuLnpvbmVzLjI0YzJmZDllLTc0ZjEtNDk5OC05Zjk4LTk2OGEzOTY0NTcwMiIsInVhYSIsIm9wZW5pZCIsImllLXRyYWZmaWMuem9uZXMuMGZkMTEyMWYtOGY0OC00Y2I2LWI2MTYtMGU2MjNjYjljOTM4Il19.s0oTFYS1ipWUSKLXFIzIQuvgJaMWjmIBNZ4zq_PD223lpgqfxxBGyb6aoi1a0u1gZc2O2nPArwKOU9i2iCVVzzBL2J96tbrPrpnmQ--CP7fIiBKEEB41rhwHZ0yAhBb990VcNSJiP9kZVqZlu5VUEh2dshBmnC0RWSK56dqu6Gwe6Gd1x9RKcMiAue5c2EWTjSNIVYlQ0_WUg-Ji74YebVF9nAc_ZphmMuVYltU4Y0NyyZNE6Qw4mX3kvAVZl86kiHsNBToO51kLPjyveUl7Lzhi4HfOM-RjypYGY7VkgS_p3wkAILyeLtruXVskzjQbJv0c5DEQsyzoIdevNfAMBw";


var options = {
	extraHeaders: {
 		Authorization: token,
		'Predix-Zone-Id': "24c2fd9e-74f1-4998-9f98-968a39645702"
	}
}
var conn = ws.connect(url, options)

conn.on('connect', function open() {
  console.log('connected');
  // ws.send(Date.now().toString(), {mask: true});
});
 
conn.on('close', function close() {
  console.log('disconnected');
});





function sendData(data) {
	var o = {
	  uri: 'https://api.scriptrapps.io/update',
	  method: 'POST',
	  json: true,
	  headers: {
	          "content-type": "application/json",
		  "Authorization": "bearer RDU0OTQ3RDJDNTpzY3JpcHRyOkVDQzBDNURGNDVCMUZGNDFCMTMxNDAwMUFBRkNFMTcx"
	  }
	};
	o.body = data;
	request(o, function (error, response, body) {
		console.log(error);
		console.log(body);
	});	
}


 
conn.on('text', function message(data, flags) {
  // console.log('Roundtrip time: ' + (Date.now() - parseInt(data)) + 'ms', flags);
  	console.log(data);
	var obj = JSON.parse(data);
  // console.log(obj);
	if (obj.measures && obj.measures.length > 0) {
		// console.log(obj["device-uid"] + ", " + obj["event-type"] + ", " + obj.measures[0].value);
		// var val = {id: obj["device-uid"], lat: "32.713765", lng:"-117.156406"};
		var val = {"id": obj["device-uid"], "lat": lat, "lng": lng};
		val.spots_increment_count = 0;
		val.spots_decrement_count = 0;
		val.pedestrians_increment_count = 0;
		val.pedestrians_decrement_count = 0;
		if (obj["event-type"] == "SFIN") {
			val.pedestrians_increment_count = obj.measures[0].value;
		} else if (obj["event-type"] == "SFOUT") {
			val.pedestrians_decrement_count = obj.measures[0].value;
		}
		console.log(val);
		sendData(val);
	}
});

conn.on('error', function err(data) {
	console.log("Error: " + data);
});

conn.on('pong', function err(data) {
	console.log("Pong: " + data);
});
conn.on('binary', function err(data) {
	console.log("Pong: " + data);
});