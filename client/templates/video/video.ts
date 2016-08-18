/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>

/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;
declare var UIVideo : any;

Template["videoPane"].onRendered(function () {

    UI.Info("Test");

    var player = new UIVideoPlayer("example_video_1");

   // player.play();

    return;


/*   videojs(
        "example_video_1",
        {"controls": true , "autoplay": true,"preload":"auto"},
    function(){           // Player (this) is initialized and ready.        }

 */
})

Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

