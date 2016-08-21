/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {

    var fabricPlayer = new FabricPlayer("fabricCanvas");
    var videoPlayer = new UIVideoPlayer("videoDiv");


    fabricPlayer.setVideo(videoPlayer);
    fabricPlayer.play();
});


/*
    var canvas = new fabric.Canvas('fabricCanvas');
    var videoEl = document.getElementById('videoDiv');
   // var video = new fabric.Image(videoEl);

    //canvas.add(video);

   // video.getElement().play();

   // var request;
   // var render = function() {
  //      canvas.renderAll();
  //      request = fabric.util.requestAnimFrame(render);
   //     var current_time = videoEl.currentTime;
  //      if(current_time >= 5) {
            //videoEl.pause();
            //cancelRequestAnimFrame(request);
   //     }
  //      console.log(current_time);
  //  }

   videoEl.play();
    var rect = new fabric.Rect();

    canvas.add(rect); // add object
    //fabric.util.requestAnimFrame(render);
    var player = new UIVideoPlayer("videoDiv");

    player.play();

    var controls = new UIVideoControls(player);

    var thePortal = new Portal();

    thePortal.initializeOneView();

    thePortal.getPortlet("main").setComponent(controls);
    thePortal.setContainer("videoControls-container");
    thePortal.show();
    // player.play();
    return;

})
*/

Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

