/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {

    var player = new UIVideoPlayer("example_video_1");

    UI.Info("Play Video");

    var a = new UIComplexComponent();

    var controls = new UIVideoControls();

    var thePortal = new Portal();

    thePortal.initializeOneView();

    thePortal.getPortlet("main").setComponent(controls);
    thePortal.setContainer("videoControls-container");
    thePortal.show();
    // player.play();
    return;

})

Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

