/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>


class Player {

    constructor() {}
    public play() {}
    public stop() {}
    public pause() {}
    public getTime() : number {return 0;}
    public setTime(time : number) {}

} this.Player = Player;

class VideoPlayer extends Player {

    public videoJS : any = null;
    public videoID : string;
    public videoElement : any;

    constructor ( videoID : string){

        super();

        this.videoID = videoID;
        this.videoElement = document.getElementById(videoID);

      /*  this.videoElement =
            videojs(
                this.videoID ,
                {},
             {"controls": true , "autoplay": false,"preload":"auto"},
                function(){           // Player (this) is initialized and ready.        }
                }) */
    }

    public play() {
        this.videoElement.play();
    }

    public pause() {
        this.videoElement.pause();
    }
    public stop() {
        this.videoElement.getElement().stop();
    }

    public currentTime() : number {
        var current_time = this.videoElement.currentTime;
        return current_time;
    }

    public getTime() : number {
        return this.currentTime();
    }
    public setTime(time : number) {
        this.videoElement.currentTime(time);
    }

} this.VideoPlayer = VideoPlayer;
