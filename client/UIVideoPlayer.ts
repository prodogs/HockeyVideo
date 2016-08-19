/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>


class UIVideoPlayer {

    public playerID : string;
    public videoJS : any = null;

    constructor ( playerID : string){
        this.playerID = playerID;

        UI.Info("Inside Video Constructor");

        this.videoJS =
            videojs(
                this.playerID ,
                {"controls": true , "autoplay": false,"preload":"auto"},
                function(){           // Player (this) is initialized and ready.        }
                })
    }

    public play() {
        this.videoJS.play();

    }
    public pause() {}

}
this.UIVideoPlayer = UIVideoPlayer;
