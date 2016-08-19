/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="C4Events.ts"/>
/// <reference path="LogWindow.ts"/>

console.log("client/startup.ts loading ...")
declare var Reveal:any;
declare var MyApp:any;
MyApp = new C4Object();

Meteor.startup(function () {


	console.log("Client Lib Startup Running");
	console.log("Initializing Factory");

	Factory.Initialize();

	console.log("Completed Initializing Factory");
	
	this.C4Event = new C4EventClass();

/*	Template["navItems"].helpers({
		                             activeIfTemplateIs: function (template) {
			                             var currentRoute = Router.current();
			                             return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
		                             }
	                             });
*/
/*
	setTimeout(function(){
		MyApp.ObjectRouter = new ObjectUpdateRouter();
		console.log("Running Object Observation Initalization");
		MyApp.ObjectRouter.startObservations();
		console.log("Complete Object Observation Initialization")
	}, 15000);
*/
	webix.ready(function () {
		console.log("webix ready event"); // never run
		webix.CustomScroll.init();

		webix.protoUI({
			name           : "videoControl", // the name of a new component
			$init          : function (config) {
				this.$view.className = "video_control";
				this.$view.innerHTML = '' +
					'<video id="video_ID" class="video-js vjs-default-skin" ' +
					'controls preload="auto" width="640" height="264"' +
					'data-setup=""{"example_option":true}"> ' +
					'<source src="http://localhost:8888/1.mp4" type="video/mp4" />' +
					'<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p> ' +
					'</video>	'
			}, item1_setter: function (value) {
				if (value)
					this.$view.childNodes[0].innerHTML = value;
			}
		}, webix.MouseEvents, webix.EventSystem, webix.ui.view);



		webix.protoUI({
			name           : "builderPalette", // the name of a new component
			$init          : function (config) {
				this.$view.className = "builderPalette_control";
				this.$view.innerHTML = "<div id='builderPalette' style='width:200px; height:400px; background-color: white;' class='palletcss'></div>";
			}, item1_setter: function (value) {
				if (value)
					this.$view.childNodes[0].innerHTML = value;
			}
		}, webix.MouseEvents, webix.EventSystem, webix.ui.view);
		webix.protoUI({
			name           : "diagram", // the name of a new component
			$init          : function (config) {
				this.$view.className = "diagram_control";
				this.$view.innerHTML = "<div id='diagramid' style='width:1000px; height:1000px; background-color: white;' class='diagramcss'></div>";
			}, item1_setter: function (value) {
				if (value)
					this.$view.childNodes[0].innerHTML = value;
			}
		}, webix.MouseEvents, webix.EventSystem, webix.ui.view);
		webix.protoUI({
			name           : "diagrampallet", // the name of a new component
			$init          : function (config) {
				this.$view.className = "pallet_control";
				this.$view.innerHTML = "<div id='palletid' style='width:200px; height:300px; background-color: white;' class='palletcss'></div>";
			}, item1_setter: function (value) {
				if (value)
					this.$view.childNodes[0].innerHTML = value;
			}
		}, webix.MouseEvents, webix.EventSystem, webix.ui.view);
		webix.protoUI({
			name           : "builderDiagram", // the name of a new component
			$init          : function (config) {
				this.$view.className = "builderDiagram_control";
				this.$view.innerHTML = "<div id='" + config.id + "' style='width:1800px; height:1800px; background-color:white;' class='builderDiagramcss'></div>";
			}, item1_setter: function (value) {
				if (value)
					this.$view.childNodes[0].innerHTML = value;
			}
		}, webix.MouseEvents, webix.EventSystem, webix.ui.view);
		webix.protoUI({
			name           : "builderOverview", // the name of a new component
			$init          : function (config) {
				this.$view.className = "builderOverview_control";
				this.$view.innerHTML = "<div id='builderOverview' style='width:300px; height:300px; background-color:white;' class='builderDiagramcss'></div>";
			}, item1_setter: function (value) {
				if (value)
					this.$view.childNodes[0].innerHTML = value;
			}
		}, webix.MouseEvents, webix.EventSystem, webix.ui.view);
		webix.UIManager.addHotKey("Alt+K", function () {
			var checker = new UIConsistencyChecker();
			checker.show();
		});

		webix.UIManager.addHotKey("Alt+E", function () {
			var log = new LogWindow();
			log.show();
		});
		webix.UIManager.addHotKey("Alt+I", function () {
		//	var health = new UIHealthDashboard();
		//	health.show();
		});

		webix.UIManager.addHotKey("Alt+C", function () {
	//		webix.alert("Calculating");
		//	var obj = new Evaluator();
			//obj.start();
		//	C4Event.emit(c4e.MetricRecalc,null);
		});

		webix.UIManager.addHotKey("Alt+P", function () {
			UI.Info("Launching Perspective Selector");
		//	var obj = new UIPerspectiveSelector();
		//	obj.setDefault = true;
		//	obj.show();
		});

		webix.UIManager.addHotKey("Alt+O", function () {
		//	UI.Info("Launching Observation Entry Selector");
		//	var obj = new UIObservationTable();
		//	obj.show();
		});

		webix.UIManager.addHotKey("Alt+S", function () {
		//	UI.Info("Launching Super Structure Creator");
		//	var obj = new SuperStructure();

		//	var pivot = new UIMeasurePivot();
		//	pivot.show();

		});
	});

})
