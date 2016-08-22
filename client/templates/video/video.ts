/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {


    var fabricPlayer = new FabricPlayer();
    fabricPlayer.setCanvas("fabricCanvas");
    var videoPlayer = new UIVideoPlayer("videoDiv");
    fabricPlayer.setVideo(videoPlayer);

    var thePortal = new Portal();

    thePortal.initializeOneView();

    var controls = new UIVideoControls(player);

    thePortal.getPortlet("main").setComponent(controls);
    thePortal.setContainer("videoControls-container");
    thePortal.show();

    fabricPlayer.play();



    return;

})


Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

