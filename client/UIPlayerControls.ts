/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class UIPlayerControls extends UIComplexComponent {

    public playButton : UIButton;
    public stopButton : UIButton;
    public pauseButton : UIButton;
    public thePlayer : UIVideoPlayer;


    constructor(player : UIPlayer) {
        super(null);
        this.setID("UIPlayerController");
        this.thePlayer = player;
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
                this.thePlayer.play();
            }
            break;
            case "stopButton" : {
                UI.Info("Stop Button");
                this.thePlayer.stop();
            }
            break;
            case "pauseButton": {
                UI.Info("Pause Button");
                this.thePlayer.pause();
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
