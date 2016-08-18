/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="C4Events.ts"/>
/// <reference path="LogWindow.ts"/>
console.log("client/startup.ts loading ...");
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
    this.MyApp = new C4Object();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0VBQXdFO0FBRXhFLG1DQUFtQztBQUVuQyxvQ0FBb0M7QUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0FBSTVDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFHZCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBR3BDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFFOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DOzs7Ozs7TUFNRTtJQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUU1QixVQUFVLENBQUM7UUFDVixLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDeEQsS0FBSyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQTtJQUMxRCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFHWDs7Ozs7OztVQU9HO0lBR0YsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFlBQVk7UUFDOUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUxQixLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ2IsSUFBSSxFQUFhLGNBQWM7WUFDL0IsS0FBSyxFQUFZLFVBQVUsTUFBTTtn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MUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsd0NBQXdDO1lBQ3hDLGlCQUFpQjtRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNwQywrQkFBK0I7WUFDOUIsNkJBQTZCO1lBQzVCLGNBQWM7WUFDZix1Q0FBdUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQzNDLHlDQUF5QztZQUN6Qyx5QkFBeUI7WUFDekIsY0FBYztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ25DLG1EQUFtRDtZQUNuRCxzQ0FBc0M7WUFDdEMsY0FBYztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ25DLGdEQUFnRDtZQUNoRCxrQ0FBa0M7WUFFbEMsb0NBQW9DO1lBQ3BDLGdCQUFnQjtRQUVoQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkM0RXZlbnRzLnRzXCIvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkxvZ1dpbmRvdy50c1wiLz5cclxuXHJcbmNvbnNvbGUubG9nKFwiY2xpZW50L3N0YXJ0dXAudHMgbG9hZGluZyAuLi5cIilcclxuZGVjbGFyZSB2YXIgUmV2ZWFsOmFueTtcclxuZGVjbGFyZSB2YXIgTXlBcHA6YW55O1xyXG5cclxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcblx0Y29uc29sZS5sb2coXCJDbGllbnQgTGliIFN0YXJ0dXAgUnVubmluZ1wiKTtcclxuXHRjb25zb2xlLmxvZyhcIkluaXRpYWxpemluZyBGYWN0b3J5XCIpO1xyXG5cclxuXHJcblx0RmFjdG9yeS5Jbml0aWFsaXplKCk7XHJcblxyXG5cdGNvbnNvbGUubG9nKFwiQ29tcGxldGVkIEluaXRpYWxpemluZyBGYWN0b3J5XCIpO1xyXG5cdFxyXG5cdHRoaXMuQzRFdmVudCA9IG5ldyBDNEV2ZW50Q2xhc3MoKTtcclxuXHJcbi8qXHRUZW1wbGF0ZVtcIm5hdkl0ZW1zXCJdLmhlbHBlcnMoe1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVJZlRlbXBsYXRlSXM6IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Um91dGUgPSBSb3V0ZXIuY3VycmVudCgpO1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgdGVtcGxhdGUgPT09IGN1cnJlbnRSb3V0ZS5sb29rdXBUZW1wbGF0ZSgpID8gJ2FjdGl2ZScgOiAnJztcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiovXHJcblx0dGhpcy5NeUFwcCA9IG5ldyBDNE9iamVjdCgpO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRNeUFwcC5PYmplY3RSb3V0ZXIgPSBuZXcgT2JqZWN0VXBkYXRlUm91dGVyKCk7XHJcblx0XHRjb25zb2xlLmxvZyhcIlJ1bm5pbmcgT2JqZWN0IE9ic2VydmF0aW9uIEluaXRhbGl6YXRpb25cIik7XHJcblx0XHRNeUFwcC5PYmplY3RSb3V0ZXIuc3RhcnRPYnNlcnZhdGlvbnMoKTtcclxuXHRcdGNvbnNvbGUubG9nKFwiQ29tcGxldGUgT2JqZWN0IE9ic2VydmF0aW9uIEluaXRpYWxpemF0aW9uXCIpXHJcblx0fSwgMTUwMDApO1xyXG5cclxuXHJcbi8qXHJcblx0PHZpZGVvIGlkPVwiZXhhbXBsZV92aWRlb18xXCIgY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCJcclxuXHRjb250cm9scyBwcmVsb2FkPVwiYXV0b1wiIHdpZHRoPVwiNjQwXCIgaGVpZ2h0PVwiMjY0XCJcclxuXHRkYXRhLXNldHVwPSd7XCJleGFtcGxlX29wdGlvblwiOnRydWV9Jz5cclxuXHQ8c291cmNlIHNyYz1cImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC8xLm1wNFwiIHR5cGU9J3ZpZGVvL21wNCcgLz5cclxuXHQ8cCBjbGFzcz1cInZqcy1uby1qc1wiPlRvIHZpZXcgdGhpcyB2aWRlbyBwbGVhc2UgZW5hYmxlIEphdmFTY3JpcHQsIGFuZCBjb25zaWRlciB1cGdyYWRpbmcgdG8gYSB3ZWIgYnJvd3NlciB0aGF0IDxhIGhyZWY9XCJodHRwOi8vdmlkZW9qcy5jb20vaHRtbDUtdmlkZW8tc3VwcG9ydC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5zdXBwb3J0cyBIVE1MNSB2aWRlbzwvYT48L3A+XHJcblx0PC92aWRlbz5cclxuXHQqL1xyXG5cclxuXHJcblx0d2ViaXgucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJ3ZWJpeCByZWFkeSBldmVudFwiKTsgLy8gbmV2ZXIgcnVuXHJcblx0XHR3ZWJpeC5DdXN0b21TY3JvbGwuaW5pdCgpO1xyXG5cclxuXHRcdHdlYml4LnByb3RvVUkoe1xyXG5cdFx0XHRuYW1lICAgICAgICAgICA6IFwidmlkZW9Db250cm9sXCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxyXG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwidmlkZW9fY29udHJvbFwiO1xyXG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gJycgK1xyXG5cdFx0XHRcdFx0Jzx2aWRlbyBpZD1cInZpZGVvX0lEXCIgY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCIgJyArXHJcblx0XHRcdFx0XHQnY29udHJvbHMgcHJlbG9hZD1cImF1dG9cIiB3aWR0aD1cIjY0MFwiIGhlaWdodD1cIjI2NFwiJyArXHJcblx0XHRcdFx0XHQnZGF0YS1zZXR1cD1cIlwie1wiZXhhbXBsZV9vcHRpb25cIjp0cnVlfVwiPiAnICtcclxuXHRcdFx0XHRcdCc8c291cmNlIHNyYz1cImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC8xLm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIiAvPicgK1xyXG5cdFx0XHRcdFx0JzxwIGNsYXNzPVwidmpzLW5vLWpzXCI+VG8gdmlldyB0aGlzIHZpZGVvIHBsZWFzZSBlbmFibGUgSmF2YVNjcmlwdCwgYW5kIGNvbnNpZGVyIHVwZ3JhZGluZyB0byBhIHdlYiBicm93c2VyIHRoYXQgPGEgaHJlZj1cImh0dHA6Ly92aWRlb2pzLmNvbS9odG1sNS12aWRlby1zdXBwb3J0L1wiIHRhcmdldD1cIl9ibGFua1wiPnN1cHBvcnRzIEhUTUw1IHZpZGVvPC9hPjwvcD4gJyArXHJcblx0XHRcdFx0XHQnPC92aWRlbz5cdCdcclxuXHRcdFx0fSwgaXRlbTFfc2V0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUpXHJcblx0XHRcdFx0XHR0aGlzLiR2aWV3LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH0sIHdlYml4Lk1vdXNlRXZlbnRzLCB3ZWJpeC5FdmVudFN5c3RlbSwgd2ViaXgudWkudmlldyk7XHJcblxyXG5cclxuXHJcblx0XHR3ZWJpeC5wcm90b1VJKHtcclxuXHRcdFx0bmFtZSAgICAgICAgICAgOiBcImJ1aWxkZXJQYWxldHRlXCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxyXG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwiYnVpbGRlclBhbGV0dGVfY29udHJvbFwiO1xyXG5cdFx0XHRcdHRoaXMuJHZpZXcuaW5uZXJIVE1MID0gXCI8ZGl2IGlkPSdidWlsZGVyUGFsZXR0ZScgc3R5bGU9J3dpZHRoOjIwMHB4OyBoZWlnaHQ6NDAwcHg7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlOycgY2xhc3M9J3BhbGxldGNzcyc+PC9kaXY+XCI7XHJcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHRcdFx0dGhpcy4kdmlldy5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB3ZWJpeC5Nb3VzZUV2ZW50cywgd2ViaXguRXZlbnRTeXN0ZW0sIHdlYml4LnVpLnZpZXcpO1xyXG5cdFx0d2ViaXgucHJvdG9VSSh7XHJcblx0XHRcdG5hbWUgICAgICAgICAgIDogXCJkaWFncmFtXCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxyXG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwiZGlhZ3JhbV9jb250cm9sXCI7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5pbm5lckhUTUwgPSBcIjxkaXYgaWQ9J2RpYWdyYW1pZCcgc3R5bGU9J3dpZHRoOjEwMDBweDsgaGVpZ2h0OjEwMDBweDsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7JyBjbGFzcz0nZGlhZ3JhbWNzcyc+PC9kaXY+XCI7XHJcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHRcdFx0dGhpcy4kdmlldy5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB3ZWJpeC5Nb3VzZUV2ZW50cywgd2ViaXguRXZlbnRTeXN0ZW0sIHdlYml4LnVpLnZpZXcpO1xyXG5cdFx0d2ViaXgucHJvdG9VSSh7XHJcblx0XHRcdG5hbWUgICAgICAgICAgIDogXCJkaWFncmFtcGFsbGV0XCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxyXG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwicGFsbGV0X2NvbnRyb2xcIjtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9IFwiPGRpdiBpZD0ncGFsbGV0aWQnIHN0eWxlPSd3aWR0aDoyMDBweDsgaGVpZ2h0OjMwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsnIGNsYXNzPSdwYWxsZXRjc3MnPjwvZGl2PlwiO1xyXG5cdFx0XHR9LCBpdGVtMV9zZXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcclxuXHRcdHdlYml4LnByb3RvVUkoe1xyXG5cdFx0XHRuYW1lICAgICAgICAgICA6IFwiYnVpbGRlckRpYWdyYW1cIiwgLy8gdGhlIG5hbWUgb2YgYSBuZXcgY29tcG9uZW50XHJcblx0XHRcdCRpbml0ICAgICAgICAgIDogZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0XHRcdHRoaXMuJHZpZXcuY2xhc3NOYW1lID0gXCJidWlsZGVyRGlhZ3JhbV9jb250cm9sXCI7XHJcblx0XHRcdFx0dGhpcy4kdmlldy5pbm5lckhUTUwgPSBcIjxkaXYgaWQ9J1wiICsgY29uZmlnLmlkICsgXCInIHN0eWxlPSd3aWR0aDoxODAwcHg7IGhlaWdodDoxODAwcHg7IGJhY2tncm91bmQtY29sb3I6d2hpdGU7JyBjbGFzcz0nYnVpbGRlckRpYWdyYW1jc3MnPjwvZGl2PlwiO1xyXG5cdFx0XHR9LCBpdGVtMV9zZXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0XHRcdHRoaXMuJHZpZXcuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgd2ViaXguTW91c2VFdmVudHMsIHdlYml4LkV2ZW50U3lzdGVtLCB3ZWJpeC51aS52aWV3KTtcclxuXHRcdHdlYml4LnByb3RvVUkoe1xyXG5cdFx0XHRuYW1lICAgICAgICAgICA6IFwiYnVpbGRlck92ZXJ2aWV3XCIsIC8vIHRoZSBuYW1lIG9mIGEgbmV3IGNvbXBvbmVudFxyXG5cdFx0XHQkaW5pdCAgICAgICAgICA6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmNsYXNzTmFtZSA9IFwiYnVpbGRlck92ZXJ2aWV3X2NvbnRyb2xcIjtcclxuXHRcdFx0XHR0aGlzLiR2aWV3LmlubmVySFRNTCA9IFwiPGRpdiBpZD0nYnVpbGRlck92ZXJ2aWV3JyBzdHlsZT0nd2lkdGg6MzAwcHg7IGhlaWdodDozMDBweDsgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTsnIGNsYXNzPSdidWlsZGVyRGlhZ3JhbWNzcyc+PC9kaXY+XCI7XHJcblx0XHRcdH0sIGl0ZW0xX3NldHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHRcdFx0dGhpcy4kdmlldy5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB3ZWJpeC5Nb3VzZUV2ZW50cywgd2ViaXguRXZlbnRTeXN0ZW0sIHdlYml4LnVpLnZpZXcpO1xyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtLXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGNoZWNrZXIgPSBuZXcgVUlDb25zaXN0ZW5jeUNoZWNrZXIoKTtcclxuXHRcdFx0Y2hlY2tlci5zaG93KCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3ZWJpeC5VSU1hbmFnZXIuYWRkSG90S2V5KFwiQWx0K0VcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgbG9nID0gbmV3IExvZ1dpbmRvdygpO1xyXG5cdFx0XHRsb2cuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0XHR3ZWJpeC5VSU1hbmFnZXIuYWRkSG90S2V5KFwiQWx0K0lcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly9cdHZhciBoZWFsdGggPSBuZXcgVUlIZWFsdGhEYXNoYm9hcmQoKTtcclxuXHRcdC8vXHRoZWFsdGguc2hvdygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtDXCIsIGZ1bmN0aW9uICgpIHtcclxuXHQvL1x0XHR3ZWJpeC5hbGVydChcIkNhbGN1bGF0aW5nXCIpO1xyXG5cdFx0Ly9cdHZhciBvYmogPSBuZXcgRXZhbHVhdG9yKCk7XHJcblx0XHRcdC8vb2JqLnN0YXJ0KCk7XHJcblx0XHQvL1x0QzRFdmVudC5lbWl0KGM0ZS5NZXRyaWNSZWNhbGMsbnVsbCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3ZWJpeC5VSU1hbmFnZXIuYWRkSG90S2V5KFwiQWx0K1BcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRVSS5JbmZvKFwiTGF1bmNoaW5nIFBlcnNwZWN0aXZlIFNlbGVjdG9yXCIpO1xyXG5cdFx0Ly9cdHZhciBvYmogPSBuZXcgVUlQZXJzcGVjdGl2ZVNlbGVjdG9yKCk7XHJcblx0XHQvL1x0b2JqLnNldERlZmF1bHQgPSB0cnVlO1xyXG5cdFx0Ly9cdG9iai5zaG93KCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3ZWJpeC5VSU1hbmFnZXIuYWRkSG90S2V5KFwiQWx0K09cIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly9cdFVJLkluZm8oXCJMYXVuY2hpbmcgT2JzZXJ2YXRpb24gRW50cnkgU2VsZWN0b3JcIik7XHJcblx0XHQvL1x0dmFyIG9iaiA9IG5ldyBVSU9ic2VydmF0aW9uVGFibGUoKTtcclxuXHRcdC8vXHRvYmouc2hvdygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2ViaXguVUlNYW5hZ2VyLmFkZEhvdEtleShcIkFsdCtTXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vXHRVSS5JbmZvKFwiTGF1bmNoaW5nIFN1cGVyIFN0cnVjdHVyZSBDcmVhdG9yXCIpO1xyXG5cdFx0Ly9cdHZhciBvYmogPSBuZXcgU3VwZXJTdHJ1Y3R1cmUoKTtcclxuXHJcblx0XHQvL1x0dmFyIHBpdm90ID0gbmV3IFVJTWVhc3VyZVBpdm90KCk7XHJcblx0XHQvL1x0cGl2b3Quc2hvdygpO1xyXG5cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufSlcclxuIl19