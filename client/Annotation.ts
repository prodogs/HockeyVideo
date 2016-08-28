console.log("Loading Annotation.TS.....");

interface fabric {
    Image(any);
}

interface Window {
    webkitCancelRequestAnimationFrame : any;
    mozCancelRequestAnimationFrame : any;
    oCancelRequestAnimationFrame : any;
    msCancelRequestAnimationFrame : any;
}

enum TimerType {
    StartEnd,
    Duration,
    AtStart,
    AtEnd,
    OnEvent ,
    StartNoEnd  }

class VEvent {

    public startTime            : number;
    public endTime              : number;
    public duration             : number;
    public timerType            : TimerType = TimerType.StartEnd;
    protected x                 : number=10;
    protected y                 : number=10;
    public durationBased        : boolean = false;
    public object               : fabric.IObject = null;
    public label                : string;
    public isActive             : boolean = false;
    public lastCheckTime        : number =0;
    public perspective          : Perspective;
    public currentCheckTime     : number=0;

    public get left() : number {
        if (this.object) {
            return this.object.get("left");
        }
    }
    public set left(value : number) {
        if (this.object) {
            this.object.set("left",value);
        }
    }
    public get top() : number {
        if (this.object)
            return this.object.get("top");
    }
    public set top(value : number)   {
        if (this.object)
            this.object.set("top",value);
    }
    public get active() {
        if (this.object)
            return this.object.get("active");
    }

    public get fill() : string {
        if (this.object)
            return this.object.get("fill");
    }
    public set fill(value : string) {
        if (this.object)
            this.object.set("fill",value);
    }
    public get height() : number {
        if (this.object)
            return this.object.get("height");
    }
    public get width() : number {
        if (this.object)
            return this.object.get("width");
    }
    public set width(value : number) {
        if (this.object)
            this.object.set("width",value);
    }
    public set height(value : number) {
        if (this.object)
            this.object.set("height",value);
    }
    public get isMoving() : boolean  {
        if (this.object)
            return this.object.get("isMoving");
    }
    public get opacity() : number {
        if (this.object)
            return this.object.get("opacity");
    }
    public set opacity(value : number) {
        if (this.object)
            this.object.set("opacity",value);
    }
    public get scaleX() : number {
        if (this.object)
            return this.object.get("scaleX");
    }
    public set scaleX(value : number) {
        if (this.object)
            this.object.set("scaleX",value);
    }
    public get scaleY() : number{
        if (this.object)
            return this.object.get("scaleY");
    }
    public set scaleY(value : number) {
        if (this.object)
            this.object.set("scaleY",value);
    }
    public get stroke() : string {
        if (this.object) return this.object.get("stroke");
    }
    public set stroke(value : string) {
        if (this.object) this.object.set("stroke", value);
    }
    public get strokeWidth() {
        if (this.object) return this.object.get("strokeWidth");
    }
    public set strokeWidth(value : number)  {
        if (this.object) this.object.set("strokeWidth",value);
    }
    public get originalState() : any {
        if (this.object) return this.object.get("originalState");
    }


    public action(time : number ) {

        this.lastCheckTime = this.currentCheckTime;
        this.currentCheckTime = time;

        if ( this.inActiveTime(time) )
            this.activate();
        else
            this.inactivate();

    }
    public activate() {}
    public inactivate() {}
    public inActiveTime(time : number) : boolean {

        switch (this.timerType) {

            case TimerType.StartEnd : {
                if ( (time > this.startTime) && (time < this.endTime) )
                    return true;
                else
                {
                    return false;
                    }
            }
            case TimerType.Duration : {
                if ((time > this.startTime) && time < (this.startTime + this.duration))
                    return true;
                else
                    return false;
            }
            case TimerType.AtStart : {
                if ( time > this.startTime)
                    return true;
                return false;
            }
            case TimerType.AtEnd : {
                if (time > this.endTime)
                        return true;
                return false;
            }
            case TimerType.StartNoEnd : {
                if ( time > this.startTime)
                    return true;
                return false;
            }

        }

        return false;
    }
    public setPerspective(perspective : Perspective) {
        this.perspective = perspective;
    }
    public getPerspective() : Perspective {
        return this.perspective;
    }
    public reset() {
        if (this.isActive)
            this.inactivate();
    }
    public getCurrentCheckTime() : number {
        return this.currentCheckTime;
    }

} this.VEvent = VEvent;

class Clock {

  public clockPlayer : Player;

  constructor() {

  }

  public setSyncPlayer(thePlayer : Player) {
        this.clockPlayer = thePlayer;
    }
  public getTime() : number {
      return this.clockPlayer.getTime();
  }
  public setTime(time : number) {
      this.clockPlayer.setTime(time);

  }

} this.Clock = Clock;

interface Player {

    play;
    stop;
    pause;
    getTime() : number;
    setTime(time : number);
    duration() : number;

}

class Story implements Player {

    public perspectives : Array<Perspective>;
    public events   : Array<VEvent>;
    public player   : Player;
    public request  : any;
    public clock    : Clock;
    public static story : Story;

    constructor() {
        this.events = new Array<VEvent>();
        this.perspectives = new Array<Perspective>();
        this.clock = new Clock();

        Story.story = this;
    }

    public static render() {

        Story.story.renderPerspectives();

        Story.story.request = fabric.util.requestAnimFrame(Story.render);
        var current_time = Story.story.clock.getTime();
        if(current_time >= 100) {
            Story.story.pause();
            return;
        }
        Story.story.action(current_time);
    }
    public static cancelRequestAnimFrame(request : any) {
        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    }
    public getEvents() : Array<VEvent> {
        return this.events;
    }
    public addPerspective(perspective : Perspective) {
        this.perspectives.push(perspective);
    }
    public addEvent(vEvent : VEvent) {
        this.events.push(vEvent);
    }
    public setTime(time : number) {
        this.clock.setTime(time);
    }
    public getTime() : number {
        return this.clock.getTime();
    }
    public play() {
        for (var i = 0 ;i< this.perspectives.length;i++)
            this.perspectives[i].play();
        fabric.util.requestAnimFrame(Story.render);
    }
    public pause() {
        for (var i=0;i<this.perspectives.length;i++) {
            this.perspectives[i].pause();
        }
        Story.cancelRequestAnimFrame(this.request);
    }
    public restart() {
        for (var i=0;i<this.events.length;i++) {
            this.events[i].reset();
        }
    }
    public stop() { }
    public duration() : number { return 0;}
    public renderPerspectives() {
        for (var i=0;i<this.perspectives.length;i++) {
            this.perspectives[i].renderAll();
        }
    }
    public action(time : number) {

        var clockEvent = new Array<any>();
        clockEvent["clockTime"] = time;

        MyApp.C4Event.emit("StoryClockUpdate",clockEvent);
        for (var i=0;i<this.events.length;i++) {
            this.events[i].action(time);
        }
    }

} this.Story = Story;

class VideoPlayer implements Player {

    public videoJS      : any = null;
    public videoID      : string;
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
    public duration() : number {
        return 0;
    }
    public currentTime() : number {
        var current_time = this.videoElement.currentTime;
        return current_time;
    }
    public getDuration() : number {
        return this.videoElement.duration;
    }
    public getTime() : number {
        return this.currentTime();
    }
    public setTime(time : number) {
        this.videoElement.currentTime(time);
    }

} this.VideoPlayer = VideoPlayer;

class Perspective {

    public fabricCanvas : any;
    public overlayPerspective : Perspective = null;
    public story : Story;

    public setOverlay(perspective : Perspective) {
        this.overlayPerspective = perspective;
    }
    public getCanvas() : any {
        if (this.overlayPerspective != null) {
            return this.overlayPerspective.getCanvas();
        }
        return this.fabricCanvas;
    }
    public setStory(theStory : Story) {
        this.story = theStory;
    }
    public play() {}
    public pause() {}
    public renderAll() {
    }

} this.Perspective = Perspective;

class VideoPerspective extends Perspective {

    public canvasDiv = "fabricCanvas";
    public videoDiv = "videoDiv";
    public fabricPlayer : FabricPlayer;
    public videoPlayer : VideoPlayer;

    constructor() {
        super();
        this.fabricPlayer = new FabricPlayer();
        this.fabricPlayer.setCanvas(this.canvasDiv);
        this.videoPlayer = new VideoPlayer(this.videoDiv);
        this.fabricPlayer.setVideo(this.videoPlayer);
    }

    public play() {
        this.fabricPlayer.play();
    }
    public getCanvas() : any {
        return this.fabricPlayer.getCanvas();
    }
    public pause() {
        this.fabricPlayer.pause();
    }
    public renderAll() {
        this.fabricPlayer.getCanvas().renderAll();
    }

} this.VideoPerspective = VideoPerspective;

class AnnotationPerspective extends Perspective {

} this.AnnotationPerspective = AnnotationPerspective;

class ClipboardPerspective extends Perspective { } this.ClipboardPerspective = ClipboardPerspective;

class VideoEvent extends VEvent {

    public perspective : Perspective;

    public setPerspective (perspective : Perspective) {
        this.perspective = perspective;
    }

} this.VideoEvent = VideoEvent;

class Annotation extends VEvent {

    public modified() {
        UI.Info("Annotation Modified");
        MyApp.C4Event.emit("AnnotationChanged",null);

    }
    public changed() {
        UI.Info("Annotation Changed ");
    }
    public createObject() {
       this.object["annotationData"] = this;
       this.object.on("modified", function (e : any) {
           var annotationObject = <Annotation> this.annotationData;
           var anObject = this;
           if (!annotationObject) {
               UI.Info("No Annotation Object on Fabric Object");
               return;
           }
           annotationObject.object = anObject;
           annotationObject.modified()
        });
    }

} this.Annotation = Annotation;

class DrawAnnotation extends Annotation {

    public defaultFill         : string = "blue";
    public defaultStroke       : string = "black";
    public defaultOpacity      : number = .5;
    public defaultStrokeWidth  : number = 2;

    constructor() {
        super();
    }
    public activate()  {
        if (!this.isActive)
            this.perspective.getCanvas().add(this.object);
        this.isActive = true;
    }
    public inactivate()  {
        if (this.isActive)
            this.perspective.getCanvas().remove(this.object);
        this.isActive = false;
    }
    public modified() {
        UI.Info("DrawAnnotation Modified");
        super.modified();
        this.fill = this.object.fill;
        this.stroke = this.object.stroke;
        this.opacity = this.object.opacity;
        this.strokeWidth = this.object.strokeWidth;
    }



} this.DrawAnnotation = DrawAnnotation;

class CircleAnnotation extends DrawAnnotation {
    public defaultRadius : number=30;

    constructor() {
        super();
        this.label = "Circle";
        this.createObject();
    }

    public createObject() {
        this.x = 10;
        this.y = 10;
        this.object = new fabric.Circle({
            left        : 10,
            top         : 10,
            radius      : this.defaultRadius,
            stroke      : this.defaultStroke,
            strokeWidth : this.defaultStrokeWidth,
            fill        : this.defaultFill,
            opacity     : this.defaultOpacity
        });

        super.createObject();
    }
    public modified() {
        UI.Info("CircleAnnotation Modified "+this.object.get("radius"));
        super.modified();
    }

} this.CircleAnnotation = CircleAnnotation;

class RectAnnotation extends DrawAnnotation {

    public defaultHeight   : number=50;
    public defaultWidth    : number=50;

    constructor() {
        super();
        this.label = "Rectangle";
        this.createObject();
    }

    public createObject() {

        this.x = 50;
        this.y = 50;

        this.object=new fabric.Rect ({
            left        : this.x,
            top         : this.y,
            height      : this.defaultHeight,
            width       : this.defaultWidth,
            stroke      : this.defaultStroke,
            strokeWidth : this.defaultStrokeWidth,
            fill        : this.defaultFill,
            opacity     : this.defaultOpacity
        });
        super.createObject();
    }
    public modified() {
        UI.Info("RectangleAnnotation Modified "+this.object.getLeft());
        super.modified();

    }

} this.RectAnnotation = RectAnnotation;

class TextAnnotation extends DrawAnnotation {

    constructor() {
        super();
        this.label = "Text";
        this.createObject();
    }

    public createObject() {

        this.x = 80;
        this.y = 50;

        this.object=new fabric.IText ("Sample Text", {
            left        : this.x,
            fontSize: 30,
            fill : "white"

        });

        this.object.on("changed", function (e : any) {
            var anObject =this.perspective.canvas.getActiveObject();
            var annotationObject = <Annotation> (anObject["annotationData"]);
            annotationObject.changed()

        });

        super.createObject();
    }
    public changed() {
        UI.Info("TextAnnotation Text Changed "+this.object.getLeft());
        super.changed();

    }
    public modified() {
        UI.Info("TextAnnotation Modified "+this.object.getLeft());
        super.modified();

    }

} this.TextAnnotation = TextAnnotation;

class UIStoryClock extends UIComplexComponent {

    public clockDisplay : UITextField;

    public static Clocks : Array<UIStoryClock> = new Array<UIStoryClock>();

    constructor() {
        super(null);
        this.setID("UIStoryClock");
        UIStoryClock.Clocks[0] = this;
        MyApp.C4Event.on("StoryClockUpdate",UIStoryClock.Update)

    }

    public static Update(eventMessage : any) {

        UIStoryClock.Clocks[0].update(eventMessage["clockTime"])
    }

    public update(time : number) {
        this.clockDisplay.setValue(time);
    }

    public getView() : any {

        this.clockDisplay = new UITextField({label : "Clock"});
        this.addComponent("clockDisplay" , this.clockDisplay);

        this.clockDisplay.setFieldFormat(FieldFormat.NUMBER);

        this.componentView = this.createView({
            id      : this.componentID,
            view    : "form",
            rows    : [  this.getComponent("clockDisplay").getView() ]
        });
        return this.componentView;
    }

} this.UIStoryClock = UIStoryClock;

class UIVideoSlider extends UISliderField {

    public videoPlayer : VideoPlayer;

    constructor(properties = null) {
        super(properties);
        this.setID("UIVideoSlider");
    }

    public setVideoPlayer(videoPlayer : VideoPlayer) {
        this.videoPlayer = videoPlayer;
        this.setProperty("min", 0);
        this.setProperty("max", this.videoPlayer.getDuration());
    }

} this.UIVideoSlider = UIVideoSlider;

class UIPlayerControls extends UIComplexComponent {


    public playButton   : UIButton;
    public stopButton   : UIButton;
    public pauseButton  : UIButton;
    public thePlayer    : Player;
    public back10Button : UIButton;
    public stepForward  : UIButton;
    public stepBackward : UIButton;
    public time         : number;
    public slider       : UISliderField;

    constructor(player : Player) {
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

        this.stepForward = new UIButton({ label : "Step FW" });
        this.addComponent("stepForward",this.stepForward);

        this.stepBackward = new UIButton({ label : "Step BW" });
        this.addComponent("stepBackward",this.stepBackward);

        this.componentView = this.createView({
            id      : this.componentID,
            view    : "form",
            rows    : [
                this.getComponent("playButton").getView(),
                this.getComponent("stopButton").getView(),
                this.getComponent("pauseButton").getView(),
                this.getComponent("back10Button").getView() ,
                this.getComponent("stepForward").getView(),
                this.getComponent("stepBackward").getView(),
            ]
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
            case "back10Button":
            { this.thePlayer.setTime( this.thePlayer.getTime()-10); }
                break;
            case "stepBackward":
            { this.thePlayer.setTime( this.thePlayer.getTime()-.2); }
                break;
            case "stepForward":
            {  this.thePlayer.setTime( this.thePlayer.getTime()+.2); }
                break;
        }
    }


    public defineEvents() {
        this.getComponent("playButton").subscribe("click",this,"playVideo");
        this.getComponent("stopButton").subscribe("click",this,"stopButton");
        this.getComponent("pauseButton").subscribe("click",this,"pauseButton");
        this.getComponent("back10Button").subscribe("click",this,"back10Button");
        this.getComponent("stepBackward").subscribe("click",this,"stepBackward");
        this.getComponent("stepForward").subscribe("click",this,"stepForward");

    }

} this.UIPlayerControls = UIPlayerControls;

class FabricPlayer implements Player {

    public playerCanvas : any;
    public videoElement : any;
    public static videoPlayer : VideoPlayer;
    public videoObject  : any;
    public request      : any;

    constructor( ) {
    }

    public setCanvas(element : string) {

        this.playerCanvas = new fabric.Canvas(element);
    }

    public setVideo(videoPlayer : VideoPlayer) {

        FabricPlayer.videoPlayer = videoPlayer;

        var videoEL = document.getElementById("videoDiv");

        //  this.videoObject = new fabric.Image(FabricPlayer.videoPlayer.videoElement);
        this.videoObject = new fabric.Image(videoEL);

        this.videoElement = FabricPlayer.videoPlayer.videoElement;
        this.playerCanvas.add(this.videoObject);
    }
    public play() {
        this.videoObject.getElement().play();
        FabricPlayer.videoPlayer.play();
    }
    public stop() {}
    public getCanvas() : any {
        return this.playerCanvas;
    }
    public pause() {
        this.videoObject.getElement().pause();
        FabricPlayer.videoPlayer.pause();
    }
    public duration() : number { return 0;}
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

}  this.FabricPlayer = FabricPlayer;

class UIAnnotationTable extends UIDataTable {

    public static TheTable = null;
    constructor (parameters = null) {
        super(parameters);
        UIAnnotationTable.TheTable = this;
    }

    public static Modified() {
        UI.Info("Event Caught");
        UIAnnotationTable.TheTable.refresh();

    }
    public getView() : any {

        this.uiClassType = null;

        this.setEditable(true);
        var index=0;
        this.addColumn(index++, {id: "label", header: "Name", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "startTime", header: "Start", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "endTime", header: "End", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "left", header: "Left", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "top", header: "Top", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "height", header: "Height", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "width", header: "Width", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "scaleX", header: "ScaleX", width: 100, sort: "string", editor: "text"});
        this.addColumn(index++, {id: "scaleY", header: "ScaleY", width: 100, sort: "string", editor: "text"});


        this.defineEvents();
        return super.getView();
    }

    public defineEvents() {
        super.defineEvents();

        MyApp.C4Event.on("AnnotationChanged",UIAnnotationTable.Modified);
    }

} this.UIAnnotationTable = UIAnnotationTable;