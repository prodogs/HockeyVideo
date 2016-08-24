/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>



class Perspective {

} this.Perspective = Perspective;


class VideoPerspective extends Perspective {

} this.VideoPespective = VideoPerspective;

class ClipboardPerspective extends Perspective {

} this.ClipboardPerspective = ClipboardPerspective;



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



class VEvent { }
this.VEvent = VEvent;


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
