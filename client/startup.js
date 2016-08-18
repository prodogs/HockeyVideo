/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="C4Events.ts"/>
/// <reference path="LogWindow.ts"/>
console.log("client/startup.ts loading ...");
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
    setTimeout(function () {
        MyApp.ObjectRouter = new ObjectUpdateRouter();
        console.log("Running Object Observation Initalization");
        MyApp.ObjectRouter.startObservations();
        console.log("Complete Object Observation Initialization");
    }, 15000);
    /*
        <video id="example_video_1" class="video-js vjs-default-skin"
        controls preload="auto" width="640" height="264"
        data-setup='{"example_option":true}'>
        <source src="http://localhost:8888/1.mp4" type='video/mp4' />
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
        </video>
        */
    webix.ready(function () {
        console.log("webix ready event"); // never run
        webix.CustomScroll.init();
        webix.protoUI({
            name: "videoControl",
            $init: function (config) {
                this.$view.className = "video_control";
                this.$view.innerHTML = '' +
                    '<video id="video_ID" class="video-js vjs-default-skin" ' +
                    'controls preload="auto" width="640" height="264"' +
                    'data-setup=""{"example_option":true}"> ' +
                    '<source src="http://localhost:8888/1.mp4" type="video/mp4" />' +
                    '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p> ' +
                    '</video>	';
            }, item1_setter: function (value) {
                if (value)
                    this.$view.childNodes[0].innerHTML = value;
            }
        }, webix.MouseEvents, webix.EventSystem, webix.ui.view);
        webix.protoUI({
            name: "builderPalette",
            $init: function (config) {
                this.$view.className = "builderPalette_control";
                this.$view.innerHTML = "<div id='builderPalette' style='width:200px; height:400px; background-color: white;' class='palletcss'></div>";
            }, item1_setter: function (value) {
                if (value)
                    this.$view.childNodes[0].innerHTML = value;
            }
        }, webix.MouseEvents, webix.EventSystem, webix.ui.view);
        webix.protoUI({
            name: "diagram",
            $init: function (config) {
                this.$view.className = "diagram_control";
                this.$view.innerHTML = "<div id='diagramid' style='width:1000px; height:1000px; background-color: white;' class='diagramcss'></div>";
            }, item1_setter: function (value) {
                if (value)
                    this.$view.childNodes[0].innerHTML = value;
            }
        }, webix.MouseEvents, webix.EventSystem, webix.ui.view);
        webix.protoUI({
            name: "diagrampallet",
            $init: function (config) {
                this.$view.className = "pallet_control";
                this.$view.innerHTML = "<div id='palletid' style='width:200px; height:300px; background-color: white;' class='palletcss'></div>";
            }, item1_setter: function (value) {
                if (value)
                    this.$view.childNodes[0].innerHTML = value;
            }
        }, webix.MouseEvents, webix.EventSystem, webix.ui.view);
        webix.protoUI({
            name: "builderDiagram",
            $init: function (config) {
                this.$view.className = "builderDiagram_control";
                this.$view.innerHTML = "<div id='" + config.id + "' style='width:1800px; height:1800px; background-color:white;' class='builderDiagramcss'></div>";
            }, item1_setter: function (value) {
                if (value)
                    this.$view.childNodes[0].innerHTML = value;
            }
        }, webix.MouseEvents, webix.EventSystem, webix.ui.view);
        webix.protoUI({
            name: "builderOverview",
            $init: function (config) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0VBQXdFO0FBRXhFLG1DQUFtQztBQUVuQyxvQ0FBb0M7QUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0FBRzVDLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBRXZCLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFHZCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBR3BDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFFOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DOzs7Ozs7TUFNRTtJQUNELFVBQVUsQ0FBQztRQUNWLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0lBQzFELENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUdYOzs7Ozs7O1VBT0c7SUFHRixLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsWUFBWTtRQUM5QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDYixJQUFJLEVBQWEsY0FBYztZQUMvQixLQUFLLEVBQVksVUFBVSxNQUFNO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7b0JBQ3hCLHlEQUF5RDtvQkFDekQsa0RBQWtEO29CQUNsRCx5Q0FBeUM7b0JBQ3pDLCtEQUErRDtvQkFDL0QsZ05BQWdOO29CQUNoTixXQUFXLENBQUE7WUFDYixDQUFDLEVBQUUsWUFBWSxFQUFFLFVBQVUsS0FBSztnQkFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNULElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDN0MsQ0FBQztTQUNELEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNiLElBQUksRUFBYSxnQkFBZ0I7WUFDakMsS0FBSyxFQUFZLFVBQVUsTUFBTTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLCtHQUErRyxDQUFDO1lBQ3hJLENBQUMsRUFBRSxZQUFZLEVBQUUsVUFBVSxLQUFLO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUM3QyxDQUFDO1NBQ0QsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ2IsSUFBSSxFQUFhLFNBQVM7WUFDMUIsS0FBSyxFQUFZLFVBQVUsTUFBTTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLDZHQUE2RyxDQUFDO1lBQ3RJLENBQUMsRUFBRSxZQUFZLEVBQUUsVUFBVSxLQUFLO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUM3QyxDQUFDO1NBQ0QsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ2IsSUFBSSxFQUFhLGVBQWU7WUFDaEMsS0FBSyxFQUFZLFVBQVUsTUFBTTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHlHQUF5RyxDQUFDO1lBQ2xJLENBQUMsRUFBRSxZQUFZLEVBQUUsVUFBVSxLQUFLO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUM3QyxDQUFDO1NBQ0QsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ2IsSUFBSSxFQUFhLGdCQUFnQjtZQUNqQyxLQUFLLEVBQVksVUFBVSxNQUFNO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEdBQUcsaUdBQWlHLENBQUM7WUFDcEosQ0FBQyxFQUFFLFlBQVksRUFBRSxVQUFVLEtBQUs7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQzdDLENBQUM7U0FDRCxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDYixJQUFJLEVBQWEsaUJBQWlCO1lBQ2xDLEtBQUssRUFBWSxVQUFVLE1BQU07Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHlCQUF5QixDQUFDO2dCQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyx1SEFBdUgsQ0FBQztZQUNoSixDQUFDLEVBQUUsWUFBWSxFQUFFLFVBQVUsS0FBSztnQkFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNULElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDN0MsQ0FBQztTQUNELEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNuQyx3Q0FBd0M7WUFDeEMsaUJBQWlCO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3BDLCtCQUErQjtZQUM5Qiw2QkFBNkI7WUFDNUIsY0FBYztZQUNmLHVDQUF1QztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDM0MseUNBQXlDO1lBQ3pDLHlCQUF5QjtZQUN6QixjQUFjO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsbURBQW1EO1lBQ25ELHNDQUFzQztZQUN0QyxjQUFjO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsZ0RBQWdEO1lBQ2hELGtDQUFrQztZQUVsQyxvQ0FBb0M7WUFDcEMsZ0JBQWdCO1FBRWhCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDNEV2ZW50cy50c1wiLz5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkxvZ1dpbmRvdy50c1wiLz5cblxuY29uc29sZS5sb2coXCJjbGllbnQvc3RhcnR1cC50cyBsb2FkaW5nIC4uLlwiKVxuZGVjbGFyZSB2YXIgUmV2ZWFsOmFueTtcbmRlY2xhcmUgdmFyIE15QXBwOmFueTtcbk15QXBwID0gbmV3IEM0T2JqZWN0KCk7XG5cbk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uICgpIHtcblxuXG5cdGNvbnNvbGUubG9nKFwiQ2xpZW50IExpYiBTdGFydHVwIFJ1bm5pbmdcIik7XG5cdGNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIEZhY3RvcnlcIik7XG5cblxuXHRGYWN0b3J5LkluaXRpYWxpemUoKTtcblxuXHRjb25zb2xlLmxvZyhcIkNvbXBsZXRlZCBJbml0aWFsaXppbmcgRmFjdG9yeVwiKTtcblx0XG5cdHRoaXMuQzRFdmVudCA9IG5ldyBDNEV2ZW50Q2xhc3MoKTtcblxuLypcdFRlbXBsYXRlW1wibmF2SXRlbXNcIl0uaGVscGVycyh7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVJZlRlbXBsYXRlSXM6IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFJvdXRlID0gUm91dGVyLmN1cnJlbnQoKTtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3V0ZSAmJiB0ZW1wbGF0ZSA9PT0gY3VycmVudFJvdXRlLmxvb2t1cFRlbXBsYXRlKCkgPyAnYWN0aXZlJyA6ICcnO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuKi9cblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdE15QXBwLk9iamVjdFJvdXRlciA9IG5ldyBPYmplY3RVcGRhdGVSb3V0ZXIoKTtcblx0XHRjb25zb2xlLmxvZyhcIlJ1bm5pbmcgT2JqZWN0IE9ic2VydmF0aW9uIEluaXRhbGl6YXRpb25cIik7XG5cdFx0TXlBcHAuT2JqZWN0Um91dGVyLnN0YXJ0T2JzZXJ2YXRpb25zKCk7XG5cdFx0Y29uc29sZS5sb2coXCJDb21wbGV0ZSBPYmplY3QgT2JzZXJ2YXRpb24gSW5pdGlhbGl6YXRpb25cIilcblx0fSwgMTUwMDApO1xuXG5cbi8qXG5cdDx2aWRlbyBpZD1cImV4YW1wbGVfdmlkZW9fMVwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiXG5cdGNvbnRyb2xzIHByZWxvYWQ9XCJhdXRvXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjRcIlxuXHRkYXRhLXNldHVwPSd7XCJleGFtcGxlX29wdGlvblwiOnRydWV9Jz5cblx0PHNvdXJjZSBzcmM9XCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvMS5tcDRcIiB0eXBlPSd2aWRlby9tcDQnIC8+XG5cdDxwIGNsYXNzPVwidmpzLW5vLWpzXCI+VG8gdmlldyB0aGlzIHZpZGVvIHBsZWFzZSBlbmFibGUgSmF2YVNjcmlwdCwgYW5kIGNvbnNpZGVyIHVwZ3JhZGluZyB0byBhIHdlYiBicm93c2VyIHRoYXQgPGEgaHJlZj1cImh0dHA6Ly92aWRlb2pzLmNvbS9odG1sNS12aWRlby1zdXBwb3J0L1wiIHRhcmdldD1cIl9ibGFua1wiPnN1cHBvcnRzIEhUTUw1IHZpZGVvPC9hPjwvcD5cblx0PC92aWRlbz5cblx0Ki9cblxuXG5cdHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZyhcIndlYml4IHJlYWR5IGV2ZW50XCIpOyAvLyBuZXZlciBydW5cblx0XHR3ZWJpeC5DdXN0b21TY3JvbGwuaW5pdCgpO1xuXG5cdFx0d2ViaXgucHJvdG9VSSh7XG5cdFx0XHRuYW1lICAgICAgICAgICA6IFwidmlkZW9Db250cm9sXCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0XHRcdHRoaXMuJHZpZXcuY2xhc3NOYW1lID0gXCJ2aWRlb19jb250cm9sXCI7XG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gJycgK1xuXHRcdFx0XHRcdCc8dmlkZW8gaWQ9XCJ2aWRlb19JRFwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiICcgK1xuXHRcdFx0XHRcdCdjb250cm9scyBwcmVsb2FkPVwiYXV0b1wiIHdpZHRoPVwiNjQwXCIgaGVpZ2h0PVwiMjY0XCInICtcblx0XHRcdFx0XHQnZGF0YS1zZXR1cD1cIlwie1wiZXhhbXBsZV9vcHRpb25cIjp0cnVlfVwiPiAnICtcblx0XHRcdFx0XHQnPHNvdXJjZSBzcmM9XCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvMS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCIgLz4nICtcblx0XHRcdFx0XHQnPHAgY2xhc3M9XCJ2anMtbm8tanNcIj5UbyB2aWV3IHRoaXMgdmlkZW8gcGxlYXNlIGVuYWJsZSBKYXZhU2NyaXB0LCBhbmQgY29uc2lkZXIgdXBncmFkaW5nIHRvIGEgd2ViIGJyb3dzZXIgdGhhdCA8YSBocmVmPVwiaHR0cDovL3ZpZGVvanMuY29tL2h0bWw1LXZpZGVvLXN1cHBvcnQvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+c3VwcG9ydHMgSFRNTDUgdmlkZW88L2E+PC9wPiAnICtcblx0XHRcdFx0XHQnPC92aWRlbz5cdCdcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSlcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcblxuXG5cblx0XHR3ZWJpeC5wcm90b1VJKHtcblx0XHRcdG5hbWUgICAgICAgICAgIDogXCJidWlsZGVyUGFsZXR0ZVwiLCAvLyB0aGUgbmFtZSBvZiBhIG5ldyBjb21wb25lbnRcblx0XHRcdCRpbml0ICAgICAgICAgIDogZnVuY3Rpb24gKGNvbmZpZykge1xuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwiYnVpbGRlclBhbGV0dGVfY29udHJvbFwiO1xuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9IFwiPGRpdiBpZD0nYnVpbGRlclBhbGV0dGUnIHN0eWxlPSd3aWR0aDoyMDBweDsgaGVpZ2h0OjQwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsnIGNsYXNzPSdwYWxsZXRjc3MnPjwvZGl2PlwiO1xuXHRcdFx0fSwgaXRlbTFfc2V0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlKVxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9LCB3ZWJpeC5Nb3VzZUV2ZW50cywgd2ViaXguRXZlbnRTeXN0ZW0sIHdlYml4LnVpLnZpZXcpO1xuXHRcdHdlYml4LnByb3RvVUkoe1xuXHRcdFx0bmFtZSAgICAgICAgICAgOiBcImRpYWdyYW1cIiwgLy8gdGhlIG5hbWUgb2YgYSBuZXcgY29tcG9uZW50XG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcImRpYWdyYW1fY29udHJvbFwiO1xuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9IFwiPGRpdiBpZD0nZGlhZ3JhbWlkJyBzdHlsZT0nd2lkdGg6MTAwMHB4OyBoZWlnaHQ6MTAwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsnIGNsYXNzPSdkaWFncmFtY3NzJz48L2Rpdj5cIjtcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSlcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcblx0XHR3ZWJpeC5wcm90b1VJKHtcblx0XHRcdG5hbWUgICAgICAgICAgIDogXCJkaWFncmFtcGFsbGV0XCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0XHRcdHRoaXMuJHZpZXcuY2xhc3NOYW1lID0gXCJwYWxsZXRfY29udHJvbFwiO1xuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9IFwiPGRpdiBpZD0ncGFsbGV0aWQnIHN0eWxlPSd3aWR0aDoyMDBweDsgaGVpZ2h0OjMwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsnIGNsYXNzPSdwYWxsZXRjc3MnPjwvZGl2PlwiO1xuXHRcdFx0fSwgaXRlbTFfc2V0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlKVxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9LCB3ZWJpeC5Nb3VzZUV2ZW50cywgd2ViaXguRXZlbnRTeXN0ZW0sIHdlYml4LnVpLnZpZXcpO1xuXHRcdHdlYml4LnByb3RvVUkoe1xuXHRcdFx0bmFtZSAgICAgICAgICAgOiBcImJ1aWxkZXJEaWFncmFtXCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0XHRcdHRoaXMuJHZpZXcuY2xhc3NOYW1lID0gXCJidWlsZGVyRGlhZ3JhbV9jb250cm9sXCI7XG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gXCI8ZGl2IGlkPSdcIiArIGNvbmZpZy5pZCArIFwiJyBzdHlsZT0nd2lkdGg6MTgwMHB4OyBoZWlnaHQ6MTgwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOycgY2xhc3M9J2J1aWxkZXJEaWFncmFtY3NzJz48L2Rpdj5cIjtcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSlcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcblx0XHR3ZWJpeC5wcm90b1VJKHtcblx0XHRcdG5hbWUgICAgICAgICAgIDogXCJidWlsZGVyT3ZlcnZpZXdcIiwgLy8gdGhlIG5hbWUgb2YgYSBuZXcgY29tcG9uZW50XG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcImJ1aWxkZXJPdmVydmlld19jb250cm9sXCI7XG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gXCI8ZGl2IGlkPSdidWlsZGVyT3ZlcnZpZXcnIHN0eWxlPSd3aWR0aDozMDBweDsgaGVpZ2h0OjMwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOycgY2xhc3M9J2J1aWxkZXJEaWFncmFtY3NzJz48L2Rpdj5cIjtcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSlcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcblx0XHR3ZWJpeC5VSU1hbmFnZXIuYWRkSG90S2V5KFwiQWx0K0tcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNoZWNrZXIgPSBuZXcgVUlDb25zaXN0ZW5jeUNoZWNrZXIoKTtcblx0XHRcdGNoZWNrZXIuc2hvdygpO1xuXHRcdH0pO1xuXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtFXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBsb2cgPSBuZXcgTG9nV2luZG93KCk7XG5cdFx0XHRsb2cuc2hvdygpO1xuXHRcdH0pO1xuXHRcdHdlYml4LlVJTWFuYWdlci5hZGRIb3RLZXkoXCJBbHQrSVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly9cdHZhciBoZWFsdGggPSBuZXcgVUlIZWFsdGhEYXNoYm9hcmQoKTtcblx0XHQvL1x0aGVhbHRoLnNob3coKTtcblx0XHR9KTtcblxuXHRcdHdlYml4LlVJTWFuYWdlci5hZGRIb3RLZXkoXCJBbHQrQ1wiLCBmdW5jdGlvbiAoKSB7XG5cdC8vXHRcdHdlYml4LmFsZXJ0KFwiQ2FsY3VsYXRpbmdcIik7XG5cdFx0Ly9cdHZhciBvYmogPSBuZXcgRXZhbHVhdG9yKCk7XG5cdFx0XHQvL29iai5zdGFydCgpO1xuXHRcdC8vXHRDNEV2ZW50LmVtaXQoYzRlLk1ldHJpY1JlY2FsYyxudWxsKTtcblx0XHR9KTtcblxuXHRcdHdlYml4LlVJTWFuYWdlci5hZGRIb3RLZXkoXCJBbHQrUFwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRVSS5JbmZvKFwiTGF1bmNoaW5nIFBlcnNwZWN0aXZlIFNlbGVjdG9yXCIpO1xuXHRcdC8vXHR2YXIgb2JqID0gbmV3IFVJUGVyc3BlY3RpdmVTZWxlY3RvcigpO1xuXHRcdC8vXHRvYmouc2V0RGVmYXVsdCA9IHRydWU7XG5cdFx0Ly9cdG9iai5zaG93KCk7XG5cdFx0fSk7XG5cblx0XHR3ZWJpeC5VSU1hbmFnZXIuYWRkSG90S2V5KFwiQWx0K09cIiwgZnVuY3Rpb24gKCkge1xuXHRcdC8vXHRVSS5JbmZvKFwiTGF1bmNoaW5nIE9ic2VydmF0aW9uIEVudHJ5IFNlbGVjdG9yXCIpO1xuXHRcdC8vXHR2YXIgb2JqID0gbmV3IFVJT2JzZXJ2YXRpb25UYWJsZSgpO1xuXHRcdC8vXHRvYmouc2hvdygpO1xuXHRcdH0pO1xuXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtTXCIsIGZ1bmN0aW9uICgpIHtcblx0XHQvL1x0VUkuSW5mbyhcIkxhdW5jaGluZyBTdXBlciBTdHJ1Y3R1cmUgQ3JlYXRvclwiKTtcblx0XHQvL1x0dmFyIG9iaiA9IG5ldyBTdXBlclN0cnVjdHVyZSgpO1xuXG5cdFx0Ly9cdHZhciBwaXZvdCA9IG5ldyBVSU1lYXN1cmVQaXZvdCgpO1xuXHRcdC8vXHRwaXZvdC5zaG93KCk7XG5cblx0XHR9KTtcblx0fSk7XG5cbn0pXG4iXX0=