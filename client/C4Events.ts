/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>

declare var C4Event:any;
declare var EventEmitter:any;

console.log("Loading C4Events.ts ...");

enum ObjectChangeType { Name = 0, Parent = 1, Map = 2, New = 3, Remove = 4, NewMap = 5, Change = 6}
this.ObjectChangeType = ObjectChangeType;

class c4e {
    public static ObjectChanged:string = "ObjectChanged";
    public static RequestObjectChange:string = "RequestObjectChange";
}
this.c4e = c4e;

class EventHandlers {
    public event:string;
    public callback:any;
    constructor(event, callback) {
        this.event = event;
        this.callback = callback;
    }
}this.EventHandlers = EventHandlers;

class C4EventClass {

    public eventHandlers:Array<any>;
    public  eventEmitter = new EventEmitter();
    constructor() {
        this.eventEmitter.setMaxListeners(20);
        this.eventHandlers = new Array<any>();
    }
    public handlerExists(event, callback):boolean {
        for (var item in this.eventHandlers) {
            if ((this.eventHandlers[item].event == event) && (this.eventHandlers[item].callback == callback))
                return true;
        }
        return false;
    }
    public deleteHandler(event, callback) {
        var index = 0;
        for (var item in this.eventHandlers) {
            if ((this.eventHandlers[item].event == event) && (this.eventHandlers[item].callback == callback)) {

                this.eventHandlers.splice(index, 1);
            }
            index++;
        }
    }
    public emit(event, object:EventMessage) {
        C4Event.eventEmitter.emit(event, object);
    }
    public on(event, callback) {
        if (this.handlerExists(event, callback))
            return;
        var eventItem = new EventHandlers(event, callback);
        this.eventHandlers.push(eventItem);
        C4Event.eventEmitter.on(event, callback);
    }
    public removeListener(event, callback) {
        this.deleteHandler(event, callback);
        C4Event.eventEmitter.removeListener(event, callback);
    }
} this.C4EventClass = C4EventClass;