/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class UIPlayerControls extends UIComplexComponent {

    public playButton   : UIButton;
    public stopButton   : UIButton;
    public pauseButton  : UIButton;
    public thePlayer    : UIPlayer;
    public back10Button  : UIButton;

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
        this.addComponent("pauseButton",this.pauseButton);

        this.back10Button = new UIButton({ label : "Back 10" });
        this.addComponent("back10Button",this.back10Button);


        this.componentView = this.createView({
            id      : this.componentID,
            view    : "form",
            rows    : [  this.getComponent("playButton").getView(), this.getComponent("stopButton").getView(), this.getComponent("pauseButton").getView(),this.getComponent("back10Button").getView() ]
        });
        return this.componentView;
    }

    public listen(event, data, caller) {

        switch (event) {
            case "playVideo" : {
                this.thePlayer.play();
            }
            break;
            case "stopButton" : {
                this.thePlayer.stop();
            }
            break;
            case "pauseButton": {
                this.thePlayer.pause();
            }
            break;
            case "back10Button": {
                this.thePlayer.setTime( this.thePlayer.getTime()-10);
            }
                break;
        }
    }

    public defineEvents() {
        this.getComponent("playButton").subscribe("click",this,"playVideo");
        this.getComponent("stopButton").subscribe("click",this,"stopButton");
        this.getComponent("pauseButton").subscribe("click",this,"pauseButton");
        this.getComponent("back10Button").subscribe("click",this,"back10Button");

    }

}
this.UIPlayerControls = UIPlayerControls;
