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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0VBQXdFO0FBQ3hFLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0FBRzVDLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBRXZCLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFHZCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRXBDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFFOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DOzs7Ozs7TUFNRTtJQUNGOzs7Ozs7O01BT0U7SUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsWUFBWTtRQUM5QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDYixJQUFJLEVBQWEsY0FBYztZQUMvQixLQUFLLEVBQVksVUFBVSxNQUFNO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7b0JBQ3hCLHlEQUF5RDtvQkFDekQsa0RBQWtEO29CQUNsRCx5Q0FBeUM7b0JBQ3pDLCtEQUErRDtvQkFDL0QsZ05BQWdOO29CQUNoTixXQUFXLENBQUE7WUFDYixDQUFDLEVBQUUsWUFBWSxFQUFFLFVBQVUsS0FBSztnQkFDL0IsRUFBRSxDQUFDLENBQUMs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QztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDM0MseUNBQXlDO1lBQ3pDLHlCQUF5QjtZQUN6QixjQUFjO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsbURBQW1EO1lBQ25ELHNDQUFzQztZQUN0QyxjQUFjO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsZ0RBQWdEO1lBQ2hELGtDQUFrQztZQUVsQyxvQ0FBb0M7WUFDcEMsZ0JBQWdCO1FBRWhCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDNEV2ZW50cy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkxvZ1dpbmRvdy50c1wiLz5cclxuXHJcbmNvbnNvbGUubG9nKFwiY2xpZW50L3N0YXJ0dXAudHMgbG9hZGluZyAuLi5cIilcclxuZGVjbGFyZSB2YXIgUmV2ZWFsOmFueTtcclxuZGVjbGFyZSB2YXIgTXlBcHA6YW55O1xyXG5NeUFwcCA9IG5ldyBDNE9iamVjdCgpO1xyXG5cclxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcblx0Y29uc29sZS5sb2coXCJDbGllbnQgTGliIFN0YXJ0dXAgUnVubmluZ1wiKTtcclxuXHRjb25zb2xlLmxvZyhcIkluaXRpYWxpemluZyBGYWN0b3J5XCIpO1xyXG5cclxuXHRGYWN0b3J5LkluaXRpYWxpemUoKTtcclxuXHJcblx0Y29uc29sZS5sb2coXCJDb21wbGV0ZWQgSW5pdGlhbGl6aW5nIEZhY3RvcnlcIik7XHJcblx0XHJcblx0dGhpcy5DNEV2ZW50ID0gbmV3IEM0RXZlbnRDbGFzcygpO1xyXG5cclxuLypcdFRlbXBsYXRlW1wibmF2SXRlbXNcIl0uaGVscGVycyh7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUlmVGVtcGxhdGVJczogZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3V0ZSA9IFJvdXRlci5jdXJyZW50KCk7XHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3V0ZSAmJiB0ZW1wbGF0ZSA9PT0gY3VycmVudFJvdXRlLmxvb2t1cFRlbXBsYXRlKCkgPyAnYWN0aXZlJyA6ICcnO1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuKi9cclxuLypcclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRNeUFwcC5PYmplY3RSb3V0ZXIgPSBuZXcgT2JqZWN0VXBkYXRlUm91dGVyKCk7XHJcblx0XHRjb25zb2xlLmxvZyhcIlJ1bm5pbmcgT2JqZWN0IE9ic2VydmF0aW9uIEluaXRhbGl6YXRpb25cIik7XHJcblx0XHRNeUFwcC5PYmplY3RSb3V0ZXIuc3RhcnRPYnNlcnZhdGlvbnMoKTtcclxuXHRcdGNvbnNvbGUubG9nKFwiQ29tcGxldGUgT2JqZWN0IE9ic2VydmF0aW9uIEluaXRpYWxpemF0aW9uXCIpXHJcblx0fSwgMTUwMDApO1xyXG4qL1xyXG5cdHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwid2ViaXggcmVhZHkgZXZlbnRcIik7IC8vIG5ldmVyIHJ1blxyXG5cdFx0d2ViaXguQ3VzdG9tU2Nyb2xsLmluaXQoKTtcclxuXHJcblx0XHR3ZWJpeC5wcm90b1VJKHtcclxuXHRcdFx0bmFtZSAgICAgICAgICAgOiBcInZpZGVvQ29udHJvbFwiLCAvLyB0aGUgbmFtZSBvZiBhIG5ldyBjb21wb25lbnRcclxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcInZpZGVvX2NvbnRyb2xcIjtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9ICcnICtcclxuXHRcdFx0XHRcdCc8dmlkZW8gaWQ9XCJ2aWRlb19JRFwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiICcgK1xyXG5cdFx0XHRcdFx0J2NvbnRyb2xzIHByZWxvYWQ9XCJhdXRvXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjRcIicgK1xyXG5cdFx0XHRcdFx0J2RhdGEtc2V0dXA9XCJcIntcImV4YW1wbGVfb3B0aW9uXCI6dHJ1ZX1cIj4gJyArXHJcblx0XHRcdFx0XHQnPHNvdXJjZSBzcmM9XCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvMS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCIgLz4nICtcclxuXHRcdFx0XHRcdCc8cCBjbGFzcz1cInZqcy1uby1qc1wiPlRvIHZpZXcgdGhpcyB2aWRlbyBwbGVhc2UgZW5hYmxlIEphdmFTY3JpcHQsIGFuZCBjb25zaWRlciB1cGdyYWRpbmcgdG8gYSB3ZWIgYnJvd3NlciB0aGF0IDxhIGhyZWY9XCJodHRwOi8vdmlkZW9qcy5jb20vaHRtbDUtdmlkZW8tc3VwcG9ydC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5zdXBwb3J0cyBIVE1MNSB2aWRlbzwvYT48L3A+ICcgK1xyXG5cdFx0XHRcdFx0JzwvdmlkZW8+XHQnXHJcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHRcdFx0dGhpcy4kdmlldy5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB3ZWJpeC5Nb3VzZUV2ZW50cywgd2ViaXguRXZlbnRTeXN0ZW0sIHdlYml4LnVpLnZpZXcpO1xyXG5cclxuXHJcblxyXG5cdFx0d2ViaXgucHJvdG9VSSh7XHJcblx0XHRcdG5hbWUgICAgICAgICAgIDogXCJidWlsZGVyUGFsZXR0ZVwiLCAvLyB0aGUgbmFtZSBvZiBhIG5ldyBjb21wb25lbnRcclxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcImJ1aWxkZXJQYWxldHRlX2NvbnRyb2xcIjtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9IFwiPGRpdiBpZD0nYnVpbGRlclBhbGV0dGUnIHN0eWxlPSd3aWR0aDoyMDBweDsgaGVpZ2h0OjQwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsnIGNsYXNzPSdwYWxsZXRjc3MnPjwvZGl2PlwiO1xyXG5cdFx0XHR9LCBpdGVtMV9zZXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcclxuXHRcdHdlYml4LnByb3RvVUkoe1xyXG5cdFx0XHRuYW1lICAgICAgICAgICA6IFwiZGlhZ3JhbVwiLCAvLyB0aGUgbmFtZSBvZiBhIG5ldyBjb21wb25lbnRcclxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcImRpYWdyYW1fY29udHJvbFwiO1xyXG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gXCI8ZGl2IGlkPSdkaWFncmFtaWQnIHN0eWxlPSd3aWR0aDoxMDAwcHg7IGhlaWdodDoxMDAwcHg7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlOycgY2xhc3M9J2RpYWdyYW1jc3MnPjwvZGl2PlwiO1xyXG5cdFx0XHR9LCBpdGVtMV9zZXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcclxuXHRcdHdlYml4LnByb3RvVUkoe1xyXG5cdFx0XHRuYW1lICAgICAgICAgICA6IFwiZGlhZ3JhbXBhbGxldFwiLCAvLyB0aGUgbmFtZSBvZiBhIG5ldyBjb21wb25lbnRcclxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcInBhbGxldF9jb250cm9sXCI7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5pbm5lckhUTUwgPSBcIjxkaXYgaWQ9J3BhbGxldGlkJyBzdHlsZT0nd2lkdGg6MjAwcHg7IGhlaWdodDozMDBweDsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7JyBjbGFzcz0ncGFsbGV0Y3NzJz48L2Rpdj5cIjtcclxuXHRcdFx0fSwgaXRlbTFfc2V0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUpXHJcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH0sIHdlYml4Lk1vdXNlRXZlbnRzLCB3ZWJpeC5FdmVudFN5c3RlbSwgd2ViaXgudWkudmlldyk7XHJcblx0XHR3ZWJpeC5wcm90b1VJKHtcclxuXHRcdFx0bmFtZSAgICAgICAgICAgOiBcImJ1aWxkZXJEaWFncmFtXCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxyXG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwiYnVpbGRlckRpYWdyYW1fY29udHJvbFwiO1xyXG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gXCI8ZGl2IGlkPSdcIiArIGNvbmZpZy5pZCArIFwiJyBzdHlsZT0nd2lkdGg6MTgwMHB4OyBoZWlnaHQ6MTgwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOycgY2xhc3M9J2J1aWxkZXJEaWFncmFtY3NzJz48L2Rpdj5cIjtcclxuXHRcdFx0fSwgaXRlbTFfc2V0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUpXHJcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH0sIHdlYml4Lk1vdXNlRXZlbnRzLCB3ZWJpeC5FdmVudFN5c3RlbSwgd2ViaXgudWkudmlldyk7XHJcblx0XHR3ZWJpeC5wcm90b1VJKHtcclxuXHRcdFx0bmFtZSAgICAgICAgICAgOiBcImJ1aWxkZXJPdmVydmlld1wiLCAvLyB0aGUgbmFtZSBvZiBhIG5ldyBjb21wb25lbnRcclxuXHRcdFx0JGluaXQgICAgICAgICAgOiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5jbGFzc05hbWUgPSBcImJ1aWxkZXJPdmVydmlld19jb250cm9sXCI7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5pbm5lckhUTUwgPSBcIjxkaXYgaWQ9J2J1aWxkZXJPdmVydmlldycgc3R5bGU9J3dpZHRoOjMwMHB4OyBoZWlnaHQ6MzAwcHg7IGJhY2tncm91bmQtY29sb3I6d2hpdGU7JyBjbGFzcz0nYnVpbGRlckRpYWdyYW1jc3MnPjwvZGl2PlwiO1xyXG5cdFx0XHR9LCBpdGVtMV9zZXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcclxuXHRcdHdlYml4LlVJTWFuYWdlci5hZGRIb3RLZXkoXCJBbHQrS1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBjaGVja2VyID0gbmV3IFVJQ29uc2lzdGVuY3lDaGVja2VyKCk7XHJcblx0XHRcdGNoZWNrZXIuc2hvdygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtFXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGxvZyA9IG5ldyBMb2dXaW5kb3coKTtcclxuXHRcdFx0bG9nLnNob3coKTtcclxuXHRcdH0pO1xyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtJXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vXHR2YXIgaGVhbHRoID0gbmV3IFVJSGVhbHRoRGFzaGJvYXJkKCk7XHJcblx0XHQvL1x0aGVhbHRoLnNob3coKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHdlYml4LlVJTWFuYWdlci5hZGRIb3RLZXkoXCJBbHQrQ1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0Ly9cdFx0d2ViaXguYWxlcnQoXCJDYWxjdWxhdGluZ1wiKTtcclxuXHRcdC8vXHR2YXIgb2JqID0gbmV3IEV2YWx1YXRvcigpO1xyXG5cdFx0XHQvL29iai5zdGFydCgpO1xyXG5cdFx0Ly9cdEM0RXZlbnQuZW1pdChjNGUuTWV0cmljUmVjYWxjLG51bGwpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtQXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0VUkuSW5mbyhcIkxhdW5jaGluZyBQZXJzcGVjdGl2ZSBTZWxlY3RvclwiKTtcclxuXHRcdC8vXHR2YXIgb2JqID0gbmV3IFVJUGVyc3BlY3RpdmVTZWxlY3RvcigpO1xyXG5cdFx0Ly9cdG9iai5zZXREZWZhdWx0ID0gdHJ1ZTtcclxuXHRcdC8vXHRvYmouc2hvdygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtPXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vXHRVSS5JbmZvKFwiTGF1bmNoaW5nIE9ic2VydmF0aW9uIEVudHJ5IFNlbGVjdG9yXCIpO1xyXG5cdFx0Ly9cdHZhciBvYmogPSBuZXcgVUlPYnNlcnZhdGlvblRhYmxlKCk7XHJcblx0XHQvL1x0b2JqLnNob3coKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHdlYml4LlVJTWFuYWdlci5hZGRIb3RLZXkoXCJBbHQrU1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQvL1x0VUkuSW5mbyhcIkxhdW5jaGluZyBTdXBlciBTdHJ1Y3R1cmUgQ3JlYXRvclwiKTtcclxuXHRcdC8vXHR2YXIgb2JqID0gbmV3IFN1cGVyU3RydWN0dXJlKCk7XHJcblxyXG5cdFx0Ly9cdHZhciBwaXZvdCA9IG5ldyBVSU1lYXN1cmVQaXZvdCgpO1xyXG5cdFx0Ly9cdHBpdm90LnNob3coKTtcclxuXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn0pXHJcbiJdfQ==