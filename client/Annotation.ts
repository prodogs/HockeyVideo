/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>


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

class Annotation {

    public start            : number;
    public end              : number;
    public _x                : number=0;
    public _y                : number=0;
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
    public createObject() {
        this.object["annotationData"] = this;
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



class CircleAnnotation extends Annotation {

    constructor() {
        super();
    }

    public createObject() {
        this.x = 10;
        this.y = 10;
        this.object=new fabric.Circle({
            left: 10,
            top:10,
            radius:25,
            stroke:'red',
            strokeWidth:3,
            fill:'red'
        });
        super.createObject();
    }

} this.CircleAnnotation = CircleAnnotation;
