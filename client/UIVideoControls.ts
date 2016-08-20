/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class UIVideoControls extends UIComplexComponent {

    public playButton : UIButton;
    public stopButton : UIButton;
    public pauseButton : UIButton;
    public videoPlayer : UIVideoPlayer;


    constructor(player : UIVideoPlayer) {
        super(null);
        this.setID("UIVideoController");
        this.videoPlayer = player;
    }

    public initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }

    public getView() : any {
        this.playButton = new  UIButton({ label : "Play" });
        this.addComponent("playButton",this.playButton)
        this.stopButton = new UIButton({ label : "Stop"} );
        this.addComponent("stopButton",this.stopButton)
        this.pauseButton = new UIButton({ label : "Pause" })
        this.addComponent("pauseButton",this.pauseButton)
        this.componentView = this.createView({
            id      : this.componentID,
            view    : "form",
            rows    : [  this.getComponent("playButton").getView(), this.getComponent("stopButton").getView(), this.getComponent("pauseButton").getView() ]
        });
        return this.componentView;
    }

    public listen(event, data, caller) {

        switch (event) {
            case "playVideo" : {
                UI.Info("Play Video Button");
                this.videoPlayer.play();
            }
            break;
            case "stopButton" : {
                UI.Info("Stop Button");
                this.videoPlayer.stop();
            }
            break;
            case "pauseButton": {
                UI.Info("Pause Button");
                this.videoPlayer.pause();
            }
        }
    }

    public defineEvents() {
        this.getComponent("playButton").subscribe("click",this,"playVideo");
        this.getComponent("stopButton").subscribe("click",this,"stopButton");
        this.getComponent("pauseButton").subscribe("click",this,"pauseButton");

    }

}
this.UIVideoControls = UIVideoControls;
