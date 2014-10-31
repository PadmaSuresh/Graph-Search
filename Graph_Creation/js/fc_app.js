/* 
 * Applications should include this file at teh top. Once the application instance is created in angularJS
 * they should call, setFcApp() method by passing the instance name. This method will set common fcApp variable
 * this variable will be used in all applications.
 */
 
var popupDiv = null;

var fcApp = null;

function setFcApp(app) {
	fcApp = app;
}


var logEnabled = true;

var fcApp = angular.module("fc-charts",['fc-crick']);

function fcLog(message) {
	if(logEnabled) {
		console.log(message);
	}
}

