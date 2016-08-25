/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>

class VEvent {

    public startTime            : number;
    public endTime              : number;
    public _x                   : number=10;
    public _y                   : number=10;
    public duration             : number;
    public durationBased        : boolean = false;
    public object               : any;
    public label                : string;
    public active               : boolean = false;
    public lastCheckTime        : number;
    public perspective          : Perspective;

    public get x() : number {
        return this._x;
    }
    public set x(value : number) {
        this._x = value;
    }
    public get y() : number {
        return this._y;
    }
    public set y(value : number)   {
        this._y = value;
    }

    public action(time : number ){
    }

    public activate() {}
    public inactivate() {}

    public setPerspective(perspective : Perspective) {
        this.perspective = perspective;
    }

    public reset() {
        if (this.active)
            this.inactivate();
    }

} this.VEvent = VEvent;

class Clock {

    public clockPlayer : Player;

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

class Story extends Player {

    public perspectives : Array<Perspective>;
    public events   : Array<VEvent>;
    public player   : Player;
    public request  : any;
    public clock    : Clock;
    public static story : Story;

    constructor() {
        super();
        this.events = new Array<VEvent>();
        this.perspectives = new Array<Perspective>();
        this.clock = new Clock();
        Story.story = this;
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
    public play() {
        this.player.play();
        fabric.util.requestAnimFrame(Story.render);

    }
    public pause() {
        for (var i=0;i<this.perspectives.length;i++) {
            this.perspectives[i].pause();
        }
        Story.cancelRequestAnimFrame(this.request);
    }
    public restart() {}
    public renderPerspectives() {
        for (var i=0;i<this.perspectives.length;i++) {
            this.perspectives[i].renderAll();
        }
    }

    public action(time : number) {
        for (var i=0;i<this.events.length;i++) {
            this.events[i].action(time);
        }
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

        //console.log(current_time);
    }

    public static cancelRequestAnimFrame(request : any) {
        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    }

} this.Story = Story;

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

class Perspective {

    public overlayPerspective : Perspective;
    public targetCanvas : any;

    public setOverlay(perspective : Perspective) {
        this.overlayPerspective = perspective;
    }
    public getCanvas() : any {
        return null;
    }

    public play() {}
    public pause() {}
    public renderAll() {
    }

} this.Perspective = Perspective;

class VideoPerspective extends Perspective {

    public fabricCanvas : any;
    public canvasDiv = "fabricCanvas";
    public videoDiv = "videoDiv";
    public fabricPlayer : FabricPlayer;
    public videoPlayer : VideoPlayer;

    constructor() {
        super();
        this.fabricPlayer = new FabricPlayer();
        this.fabricPlayer.setCanvas(this.canvasDiv);
        var videoPlayer = new VideoPlayer(this.videoDiv);
        this.fabricPlayer.setVideo(videoPlayer);
    }

    public play() {}
    public pause() {}

    public renderAll() {
        this.fabricPlayer.getCanvas().renderAll();
    }

} this.VideoPespective = VideoPerspective;

class AnnotationPerspective extends Perspective {


} this.AnnotationPerspective = AnnotationPerspective;

class ClipboardPerspective extends Perspective { } this.ClipboardPerspective = ClipboardPerspective;

class VEventManager {

    public annotationList : Array<Annotation>;
    public static theBlock : VEventManager;

    constructor() {
        this.annotationList = new Array<Annotation>();
        VEventManager.theBlock = this;
    }

    public add(theAnnotation : Annotation) {
        this.annotationList.push(theAnnotation);
    }

    public remove(theAnnotation : Annotation) {    }

    public play(theTime : any) {
        for (var i=0;i<this.annotationList.length;i++) {
            this.annotationList[i].setTime(theTime);
        }
    }

    public reset() {
        for (var i=0;i<this.annotationList.length;i++) {
            this.annotationList[i].reset();
        }

    }

} this.VEventManager = VEventManager;

class VideoEvent extends VEvent { } this.VideoEvent = VideoEvent;

class Annotation extends VEvent {

    public modified() {
        UI.Info("Annotation Modified");
        this.x = this.object.x;
        this.y = this.object.y;
    }

    public changed() {
        UI.Info("Annotation Changed ");
    }

    public createObject() {
        this.object["annotationData"] = this;
       this.object.on("modified", function (e : any) {
           var anObject =FabricPlayer.canvas.getActiveObject();
           var annotationObject = <Annotation> (anObject["annotationData"]);
           if (!annotationObject) {
               UI.Info("No Annotation Object on Fabric Object");
               return;
           }
           annotationObject.modified()

        });
    }

    public activiate()  {
       FabricPlayer.canvas.add(this.object);
        this.active = true;
    }

    public inactivate()  {
        FabricPlayer.canvas.remove(this.object);
        this.active = false;
    }

    public setTime(time : number) : boolean {

        this.lastCheckTime = time;
        if (time > this.startTime && time < this.endTime) {
            if (this.active)
                return true;
            this.activiate();
        }
        else
            if (this.active) {
                this.inactivate();
        }
        return this.active;
    }

} this.Annotation = Annotation;

class DrawAnnotation extends Annotation {

    public fill : string = "blue";
    public stroke : string = "black";
    public opacity : number = .5;
    public strokeWidth : number = 2;

    constructor() {
        super();
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
    public radius : number=30;

    constructor() {
        super();
        this.label = "Circle";
    }

    public createObject() {
        this.x = 10;
        this.y = 10;
        this.object=new fabric.Circle({
            left: 10,
            top:10,
            radius:this.radius,
            stroke: this.stroke,
            strokeWidth:this.strokeWidth,
            fill: this.fill,
            opacity : this.opacity
        });
        super.createObject();
    }

    public modified() {
        UI.Info("CircleAnnotation Modified "+this.object.radius);
        super.modified();
        this.radius = this.object.get("radius");

    }

} this.CircleAnnotation = CircleAnnotation;

class RectAnnotation extends DrawAnnotation {

    public height   : number=50;
    public width    : number=50;

    constructor() {
        super();
        this.label = "Rectangle";
    }
    public createObject() {

        this.x = 50;
        this.y = 50;

        this.object=new fabric.Rect ({
            left        : this.x,
            top         : this.y,
            height      : this.height,
            width       : this.width,
            stroke      : this.stroke,
            strokeWidth : this.strokeWidth,
            fill        : this.fill,
            opacity     : this.opacity
        });
        super.createObject();
    }

    public modified() {
        UI.Info("RectangleAnnotation Modified "+this.object.x);
        super.modified();

    }

} this.RectAnnotation = RectAnnotation;

class TextAnnotation extends DrawAnnotation {

    constructor() {
        super();
        this.label = "Text";
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
            var anObject =FabricPlayer.canvas.getActiveObject();
            var annotationObject = <Annotation> (anObject["annotationData"]);
            annotationObject.changed()

        });

        super.createObject();
    }

    public changed() {
        UI.Info("TextAnnotation Text Changed "+this.object.x);
        super.changed();

    }
    public modified() {
        UI.Info("TextAnnotation Modified "+this.object.x);
        super.modified();

    }

} this.TextAnnotation = TextAnnotation;

class UIPlayerControls extends UIComplexComponent {

    public playButton   : UIButton;
    public stopButton   : UIButton;
    public pauseButton  : UIButton;
    public thePlayer    : Player;
    public back10Button  : UIButton;

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

} this.UIPlayerControls = UIPlayerControls;

class FabricPlayer extends Player {

    public canvas : any;
    public playerCanvas : any;
    public videoElement : any;
    public static videoPlayer : VideoPlayer;
    public videoObject : any;
    public request : any;7

    constructor( ) {
        super();
    }

    public setCanvas(element : string) {

        FabricPlayer.canvas = new fabric.Canvas(element);
        this.playerCanvas = FabricPlayer.canvas;
    }

    public setVideo(videoPlayer : VideoPlayer) {

        FabricPlayer.videoPlayer = videoPlayer;

        var videoEL = document.getElementById("videoDiv");

        //  this.videoObject = new fabric.Image(FabricPlayer.videoPlayer.videoElement);
        this.videoObject = new fabric.Image(videoEL);

        this.videoElement = FabricPlayer.videoPlayer.videoElement;
        FabricPlayer.canvas.add(this.videoObject);
    }

    public play() {
        this.videoObject.getElement().play();
        FabricPlayer.videoPlayer.play();
    }

    public getCanvas() : any {
        return this.canvas;
    }
    public pause() {
        this.videoObject.getElement().pause();
        FabricPlayer.videoPlayer.pause();
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


}  this.FabricPlayer = FabricPlayer;