/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>

class VEvent { } this.VEvent = VEvent;

class Story {

    public perspectives : Array<Perspective>;
    public events : Array<VEvent>;
    public player : Player;


    constructor() {

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

class Perspective { } this.Perspective = Perspective;

class VideoPerspective extends Perspective { } this.VideoPespective = VideoPerspective;

class ClipboardPerspective extends Perspective { } this.ClipboardPerspective = ClipboardPerspective;

class AnnotationBlock {

    public annotationList : Array<Annotation>;
    public static theBlock : AnnotationBlock;

    constructor() {
        this.annotationList = new Array<Annotation>();
        AnnotationBlock.theBlock = this;
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

} this.AnnotationBlock = AnnotationBlock;

class VideoEvent extends VEvent { } this.VideoEvent = VideoEvent;

class Annotation extends VEvent {

    public start            : number;
    public end              : number;
    public _x                : number=10;
    public _y                : number=10;
    public duration         : number;
    public durationBased    : boolean = false;
    public object           : any;
    public label            : string;
    public active           : boolean = false;
    public lastTime         : number;

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

    public draw()  {
       FabricPlayer.canvas.add(this.object);
        this.active = true;
    }

    public erase()  {
        FabricPlayer.canvas.remove(this.object);
        this.active = false;
    }

    public reset() {
        if (this.active)
            this.erase();
    }

    public setTime(time : number) : boolean {

        this.lastTime = time;
        if (time > this.start && time < this.end) {
            if (this.active)
                return true;
            this.draw();
        }
        else
            if (this.active) {
                this.erase();
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

    public static canvas : any;
    public videoElement : any;
    public static videoPlayer : VideoPlayer;
    public videoObject : any;
    public request : any;7

    constructor( ) {
        super();
    }

    public setCanvas(element : string) {

        FabricPlayer.canvas = new fabric.Canvas(element);
    }

    public setVideo(videoPlayer : VideoPlayer) {

        FabricPlayer.videoPlayer = videoPlayer;

        var videoEL = document.getElementById("videoDiv");

        //  this.videoObject = new fabric.Image(FabricPlayer.videoPlayer.videoElement);
        this.videoObject = new fabric.Image(videoEL);

        this.videoElement = FabricPlayer.videoPlayer.videoElement;
        FabricPlayer.canvas.add(this.videoObject);
    }


    public static render() {
        FabricPlayer.canvas.renderAll();
        var request = fabric.util.requestAnimFrame(FabricPlayer.render);
        var current_time = FabricPlayer.videoPlayer.currentTime();
        if(current_time >= 100) {
            FabricPlayer.videoPlayer.pause();
            FabricPlayer.cancelRequestAnimFrame(request);
        }

        AnnotationBlock.theBlock.play(current_time);

        //console.log(current_time);
    }

    public play() {
        this.videoObject.getElement().play();
        FabricPlayer.videoPlayer.play();
        fabric.util.requestAnimFrame(FabricPlayer.render);
    }



    public pause() {

        this.videoObject.getElement().pause();
        FabricPlayer.videoPlayer.pause();

        FabricPlayer.cancelRequestAnimFrame(this.request);

    }
    public drawCircle() {

        FabricPlayer.canvas.item(0).hasBorders = false;
        FabricPlayer.canvas.setActiveObject(FabricPlayer.canvas.item(0));
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


    public static cancelRequestAnimFrame(request : any) {
        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    }

}  this.FabricPlayer = FabricPlayer;