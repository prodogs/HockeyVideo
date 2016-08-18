/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>

console.log("Loading EventMessage.ts ...");


class EventMessage {
}
this.EventMessage = EventMessage;

class ObjectChangeMessage extends EventMessage {

    public origin : string;
    public object : any;
    public nodeID : any;
    public removeID : any;
    public newText : string;
    public type : string;
    public changeType:ObjectChangeType;
    public newObject : any;
    public oldObject : any;
    public fromObject : any;
    public toObject : any;
    public fromNode : any;
    public toNode : any;
    public classType:ClassType;

}
this.ObjectChangeMessage = ObjectChangeMessage;


class ItemSelectedEvent {

    public idArray:Array<any>;
    public theComponent:UIComponent;
    public itemsSelected:number;
    public objectArray:Array<any>;
    public rowArray:Array<any>;
    public rowID : any;

}
this.ItemSelectedEvent = ItemSelectedEvent;
