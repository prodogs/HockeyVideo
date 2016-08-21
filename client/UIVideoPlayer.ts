/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>


class UIVideoPlayer {

    public playerID : string;
    public videoJS : any = null;
    public videoID : string;
    public videoElement : any;
    public videoFabric : any;
    public theFabric : any;

    constructor(videoID : string) {


        this.videoID = videoID;
        this.videoElement = document.getElementById(videoID);
        //this.videoFabric = new fabric.Image(this.videoElement);

    }
    public play() {
        this.videoElement.play();

    }

    public pause() {
        this.videoElement.pause();
    }
    public stop() {
        this.videoFabric.getElement().stop();
    }

}
this.UIVideoPlayer = UIVideoPlayer;


/*
 constructor ( playerID : string){
 this.playerID = playerID;

 this.videoJS =
 videojs(
 this.playerID ,
 {"controls": true , "autoplay": false,"preload":"auto"},
 function(){           // Player (this) is initialized and ready.        }
 })
 }

 */