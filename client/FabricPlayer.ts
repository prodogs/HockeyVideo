/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class FabricPlayer extends UIPlayer {

    public static canvas : any;
    public videoElement : any;
    public static videoPlayer : UIVideoPlayer;
    public videoObject : any;
    public request : any;7

    constructor( ) {
        super();
    }

    public setCanvas(element : string) {

        FabricPlayer.canvas = new fabric.Canvas(element);
    }

    public setVideo(videoPlayer : UIVideoPlayer) {

        FabricPlayer.videoPlayer = videoPlayer;

        var videoEL = document.getElementById("videoDiv");

      //  this.videoObject = new fabric.Image(FabricPlayer.videoPlayer.videoElement);
        this.videoObject = new fabric.Image(videoEL);

        this.videoElement = FabricPlayer.videoPlayer.videoElement;
        FabricPlayer.canvas.add(this.videoObject);
    }


    public static render() {
        FabricPlayer.canvas.renderAll();
        var request = fabric.util.requestAnimFrame(FabricPlayer.render);
        var current_time = FabricPlayer.videoPlayer.currentTime();
        if(current_time >= 100) {
            FabricPlayer.videoPlayer.pause();
            FabricPlayer.cancelRequestAnimFrame(request);
        }
        //console.log(current_time);
    }

    public play() {
        this.videoObject.getElement().play();
        FabricPlayer.videoPlayer.play();
        fabric.util.requestAnimFrame(FabricPlayer.render);
    }

    public drawCircle() {

        FabricPlayer.canvas.item(0).hasBorders = false;
        FabricPlayer.canvas.setActiveObject(FabricPlayer.canvas.item(0));
    }

    public static cancelRequestAnimFrame(request : any) {
        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    }

}
this.FabricPlayer = FabricPlayer;