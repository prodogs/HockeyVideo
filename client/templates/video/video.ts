/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {

    var fabricPlayer = new FabricPlayer();
    fabricPlayer.setCanvas("fabricCanvas");
    var videoPlayer = new UIVideoPlayer("videoDiv");
    fabricPlayer.setVideo(videoPlayer);
    
    var annotationBlock = new AnnotationBlock();

    var circle = new CircleAnnotation();
    circle.createObject();
    circle.start = 1;
    circle.end = 15;

    annotationBlock.add(circle);

    var thePortal = new Portal();

    thePortal.initializeOneView();

    var controls = new UIPlayerControls(fabricPlayer);

    thePortal.getPortlet("main").setComponent(controls);
    thePortal.setContainer("videoControls-container");
    thePortal.show();

    fabricPlayer.play();

    var annotatonTable = new UIDataTable();

    annotatonTable.setColumns(["start","end","label"])
    annotatonTable.setList(annotationBlock.annotationList);


})


Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

