/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class FabricPlayer extends Player {

    public static canvas : any;
    public videoElement : any;
    public static videoPlayer : VideoPlayer;
    public videoObject : any;
    public request : any;7

    constructor( ) {
        super();
    }

    public setCanvas(element : string) {

        FabricPlayer.canvas = new fabric.Canvas(element);
    }

    public setVideo(videoPlayer : VideoPlayer) {

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

        AnnotationBlock.theBlock.play(current_time);

        //console.log(current_time);
    }

    public play() {
        this.videoObject.getElement().play();
        FabricPlayer.videoPlayer.play();
        fabric.util.requestAnimFrame(FabricPlayer.render);
    }



    public pause() {

        this.videoObject.getElement().pause();
        FabricPlayer.videoPlayer.pause();

        FabricPlayer.cancelRequestAnimFrame(this.request);

    }
    public drawCircle() {

        FabricPlayer.canvas.item(0).hasBorders = false;
        FabricPlayer.canvas.setActiveObject(FabricPlayer.canvas.item(0));
    }

    public currentTime() : number {
        var current_time = this.videoElement.currentTime;
        return current_time;
    }

    public getTime() : number {
        return this.currentTime();
    }
    public setTime(time : number) {
        if (time < 0) time = 0;
        this.videoObject.getElement().currentTime = time;
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