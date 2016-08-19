/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class UIVideoControls extends UIComplexComponent {

    public playButton : UIButton;

    public initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }

    public getView() {
        this.playButton = new  UIButton();
        this.playButton.setComponent("Play");
        this.componentView = this.createView({
            id      : this.componentID,
            view    : "form",
            rows    : this.playButton.getView()
        });
        return this.componentView;
    }

    public listen(event, data, caller) {

        switch (event) {
            case "playVideo" : {
                UI.Info("Play Video Button");
            }
        }
    }

    public defineEvents() {
        this.playButton.subscribe("click",this,"playVideo");
    }

}
this.UIVideoControls = UIVideoControls;
