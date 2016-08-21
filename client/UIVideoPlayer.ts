/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>


class UIVideoPlayer {

    public videoJS : any = null;
    public videoID : string;
    public videoElement : any;

    constructor ( videoID : string){

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

    public currentTime() : any {
        var current_time = this.videoElement.currentTime;
        return current_time;

    }

}
this.UIVideoPlayer = UIVideoPlayer;
