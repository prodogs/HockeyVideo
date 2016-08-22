

class AnnotationBlock {

    public annotationList : Array<Annotation>;

    constructor() {
        this.annotationList = new Array<Annotation>();
    }

    public add(theAnnotation : Annotation) {
        this.annotationList.push(theAnnotation);
    }

    public play(thetime : any) {

    }

    public reset() {

    }
    
} this.AnnotationBlock = AnnotationBlock;

class Annotation {

    public start : number;
    public end : number;

    public draw() {}
    public pushTime(number) : boolean { return false;}

} this.Annotation = Annotation;



class CircleAnnotation extends Annotation {


} this.CircleAnnotation = CircleAnnotation;
