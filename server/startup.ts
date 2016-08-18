/// <reference path="../typescript-defs/all-definitions.d.ts"/>
declare var UploadServer:any;
console.log("Server startup is loading");
Meteor.startup(function () {
	console.log("Server startup is startup is running");
	console.log("Initializing Factory");
	Factory.Initialize();
	console.log("Completed Initializing Factory");
});