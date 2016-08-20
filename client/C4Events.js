/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
console.log("Loading C4Events.ts ...");
var ObjectChangeType;
(function (ObjectChangeType) {
    ObjectChangeType[ObjectChangeType["Name"] = 0] = "Name";
    ObjectChangeType[ObjectChangeType["Parent"] = 1] = "Parent";
    ObjectChangeType[ObjectChangeType["Map"] = 2] = "Map";
    ObjectChangeType[ObjectChangeType["New"] = 3] = "New";
    ObjectChangeType[ObjectChangeType["Remove"] = 4] = "Remove";
    ObjectChangeType[ObjectChangeType["NewMap"] = 5] = "NewMap";
    ObjectChangeType[ObjectChangeType["Change"] = 6] = "Change";
})(ObjectChangeType || (ObjectChangeType = {}));
this.ObjectChangeType = ObjectChangeType;
var c4e = (function () {
    function c4e() {
    }
    c4e.ObjectChanged = "ObjectChanged";
    c4e.RequestObjectChange = "RequestObjectChange";
    return c4e;
}());
this.c4e = c4e;
var EventHandlers = (function () {
    function EventHandlers(event, callback) {
        this.event = event;
        this.callback = callback;
    }
    return EventHandlers;
}());
this.EventHandlers = EventHandlers;
var C4EventClass = (function () {
    function C4EventClass() {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.setMaxListeners(20);
        this.eventHandlers = new Array();
    }
    C4EventClass.prototype.handlerExists = function (event, callback) {
        for (var item in this.eventHandlers) {
            if ((this.eventHandlers[item].event == event) && (this.eventHandlers[item].callback == callback))
                return true;
        }
        return false;
    };
    C4EventClass.prototype.deleteHandler = function (event, callback) {
        var index = 0;
        for (var item in this.eventHandlers) {
            if ((this.eventHandlers[item].event == event) && (this.eventHandlers[item].callback == callback)) {
                this.eventHandlers.splice(index, 1);
            }
            index++;
        }
    };
    C4EventClass.prototype.emit = function (event, object) {
        C4Event.eventEmitter.emit(event, object);
    };
    C4EventClass.prototype.on = function (event, callback) {
        if (this.handlerExists(event, callback))
            return;
        var eventItem = new EventHandlers(event, callback);
        this.eventHandlers.push(eventItem);
        C4Event.eventEmitter.on(event, callback);
    };
    C4EventClass.prototype.removeListener = function (event, callback) {
        this.deleteHandler(event, callback);
        C4Event.eventEmitter.removeListener(event, callback);
    };
    return C4EventClass;
}());
this.C4EventClass = C4EventClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzRFdmVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDNEV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3RUFBd0U7QUFLeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRXZDLElBQUssZ0JBQThGO0FBQW5HLFdBQUssZ0JBQWdCO0lBQUcsdURBQVEsQ0FBQTtJQUFFLDJEQUFVLENBQUE7SUFBRSxxREFBTyxDQUFBO0lBQUUscURBQU8sQ0FBQTtJQUFFLDJEQUFVLENBQUE7SUFBRSwyREFBVSxDQUFBO0lBQUUsMkRBQVUsQ0FBQTtBQUFBLENBQUMsRUFBOUYsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUE4RTtBQUNuRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFFekM7SUFBQTtJQUdBLENBQUM7SUFGaUIsaUJBQWEsR0FBVSxlQUFlLENBQUM7SUFDdkMsdUJBQW1CLEdBQVUscUJBQXFCLENBQUM7SUFDckUsVUFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFFZjtJQUdJLHVCQUFZLEtBQUssRUFBRSxRQUFRO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBQUEsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFFcEM7SUFJSTtRQURRLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7SUFDMUMsQ0FBQztJQUNNLG9DQUFhLEdBQXBCLFVBQXFCLEtBQUssRUFBRSxRQUFRO1FBQ2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQztnQkFDN0YsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNwQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ00sb0NBQWEsR0FBcEIsVUFBcUIsS0FBSyxFQUFFLFFBQVE7UUFDaEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNaLENBQUM7SUFDTCxDQUFDO0lBQ00sMkJBQUksR0FBWCxVQUFZLEtBQUssRUFBRSxNQUFtQjtRQUNsQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNNLHlCQUFFLEdBQVQsVUFBVSxLQUFLLEVBQUUsUUFBUTtRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUM7UUFDWCxJQUFJLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDTSxxQ0FBYyxHQUFyQixVQUFzQixLQUFLLEVBQUUsUUFBUTtRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cblxuZGVjbGFyZSB2YXIgQzRFdmVudDphbnk7XG5kZWNsYXJlIHZhciBFdmVudEVtaXR0ZXI6YW55O1xuXG5jb25zb2xlLmxvZyhcIkxvYWRpbmcgQzRFdmVudHMudHMgLi4uXCIpO1xuXG5lbnVtIE9iamVjdENoYW5nZVR5cGUgeyBOYW1lID0gMCwgUGFyZW50ID0gMSwgTWFwID0gMiwgTmV3ID0gMywgUmVtb3ZlID0gNCwgTmV3TWFwID0gNSwgQ2hhbmdlID0gNn1cbnRoaXMuT2JqZWN0Q2hhbmdlVHlwZSA9IE9iamVjdENoYW5nZVR5cGU7XG5cbmNsYXNzIGM0ZSB7XG4gICAgcHVibGljIHN0YXRpYyBPYmplY3RDaGFuZ2VkOnN0cmluZyA9IFwiT2JqZWN0Q2hhbmdlZFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVxdWVzdE9iamVjdENoYW5nZTpzdHJpbmcgPSBcIlJlcXVlc3RPYmplY3RDaGFuZ2VcIjtcbn1cbnRoaXMuYzRlID0gYzRlO1xuXG5jbGFzcyBFdmVudEhhbmRsZXJzIHtcbiAgICBwdWJsaWMgZXZlbnQ6c3RyaW5nO1xuICAgIHB1YmxpYyBjYWxsYmFjazphbnk7XG4gICAgY29uc3RydWN0b3IoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cbn10aGlzLkV2ZW50SGFuZGxlcnMgPSBFdmVudEhhbmRsZXJzO1xuXG5jbGFzcyBDNEV2ZW50Q2xhc3Mge1xuXG4gICAgcHVibGljIGV2ZW50SGFuZGxlcnM6QXJyYXk8YW55PjtcbiAgICBwdWJsaWMgIGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKDIwKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICB9XG4gICAgcHVibGljIGhhbmRsZXJFeGlzdHMoZXZlbnQsIGNhbGxiYWNrKTpib29sZWFuIHtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBpbiB0aGlzLmV2ZW50SGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGlmICgodGhpcy5ldmVudEhhbmRsZXJzW2l0ZW1dLmV2ZW50ID09IGV2ZW50KSAmJiAodGhpcy5ldmVudEhhbmRsZXJzW2l0ZW1dLmNhbGxiYWNrID09IGNhbGxiYWNrKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHB1YmxpYyBkZWxldGVIYW5kbGVyKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKHZhciBpdGVtIGluIHRoaXMuZXZlbnRIYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKCh0aGlzLmV2ZW50SGFuZGxlcnNbaXRlbV0uZXZlbnQgPT0gZXZlbnQpICYmICh0aGlzLmV2ZW50SGFuZGxlcnNbaXRlbV0uY2FsbGJhY2sgPT0gY2FsbGJhY2spKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGVtaXQoZXZlbnQsIG9iamVjdDpFdmVudE1lc3NhZ2UpIHtcbiAgICAgICAgQzRFdmVudC5ldmVudEVtaXR0ZXIuZW1pdChldmVudCwgb2JqZWN0KTtcbiAgICB9XG4gICAgcHVibGljIG9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodGhpcy5oYW5kbGVyRXhpc3RzKGV2ZW50LCBjYWxsYmFjaykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBldmVudEl0ZW0gPSBuZXcgRXZlbnRIYW5kbGVycyhldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMucHVzaChldmVudEl0ZW0pO1xuICAgICAgICBDNEV2ZW50LmV2ZW50RW1pdHRlci5vbihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlSGFuZGxlcihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICBDNEV2ZW50LmV2ZW50RW1pdHRlci5yZW1vdmVMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbn0gdGhpcy5DNEV2ZW50Q2xhc3MgPSBDNEV2ZW50Q2xhc3M7Il19