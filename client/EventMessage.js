/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
console.log("Loading EventMessage.ts ...");
var EventMessage = (function () {
    function EventMessage() {
    }
    return EventMessage;
}());
this.EventMessage = EventMessage;
var ObjectChangeMessage = (function (_super) {
    __extends(ObjectChangeMessage, _super);
    function ObjectChangeMessage() {
        _super.apply(this, arguments);
    }
    return ObjectChangeMessage;
}(EventMessage));
this.ObjectChangeMessage = ObjectChangeMessage;
var ItemSelectedEvent = (function () {
    function ItemSelectedEvent() {
    }
    return ItemSelectedEvent;
}());
this.ItemSelectedEvent = ItemSelectedEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTs7Ozs7O0FBRXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUczQztJQUFBO0lBQ0EsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQURELElBQ0M7QUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUVqQztJQUFrQyx1Q0FBWTtJQUE5QztRQUFrQyw4QkFBWTtJQWlCOUMsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFrQyxZQUFZLEdBaUI3QztBQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUcvQztJQUFBO0lBU0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxyXG5cclxuY29uc29sZS5sb2coXCJMb2FkaW5nIEV2ZW50TWVzc2FnZS50cyAuLi5cIik7XHJcblxyXG5cclxuY2xhc3MgRXZlbnRNZXNzYWdlIHtcclxufVxyXG50aGlzLkV2ZW50TWVzc2FnZSA9IEV2ZW50TWVzc2FnZTtcclxuXHJcbmNsYXNzIE9iamVjdENoYW5nZU1lc3NhZ2UgZXh0ZW5kcyBFdmVudE1lc3NhZ2Uge1xyXG5cclxuICAgIHB1YmxpYyBvcmlnaW4gOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb2JqZWN0IDogYW55O1xyXG4gICAgcHVibGljIG5vZGVJRCA6IGFueTtcclxuICAgIHB1YmxpYyByZW1vdmVJRCA6IGFueTtcclxuICAgIHB1YmxpYyBuZXdUZXh0IDogc3RyaW5nO1xyXG4gICAgcHVibGljIHR5cGUgOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY2hhbmdlVHlwZTpPYmplY3RDaGFuZ2VUeXBlO1xyXG4gICAgcHVibGljIG5ld09iamVjdCA6IGFueTtcclxuICAgIHB1YmxpYyBvbGRPYmplY3QgOiBhbnk7XHJcbiAgICBwdWJsaWMgZnJvbU9iamVjdCA6IGFueTtcclxuICAgIHB1YmxpYyB0b09iamVjdCA6IGFueTtcclxuICAgIHB1YmxpYyBmcm9tTm9kZSA6IGFueTtcclxuICAgIHB1YmxpYyB0b05vZGUgOiBhbnk7XHJcbiAgICBwdWJsaWMgY2xhc3NUeXBlOkNsYXNzVHlwZTtcclxuXHJcbn1cclxudGhpcy5PYmplY3RDaGFuZ2VNZXNzYWdlID0gT2JqZWN0Q2hhbmdlTWVzc2FnZTtcclxuXHJcblxyXG5jbGFzcyBJdGVtU2VsZWN0ZWRFdmVudCB7XHJcblxyXG4gICAgcHVibGljIGlkQXJyYXk6QXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyB0aGVDb21wb25lbnQ6VUlDb21wb25lbnQ7XHJcbiAgICBwdWJsaWMgaXRlbXNTZWxlY3RlZDpudW1iZXI7XHJcbiAgICBwdWJsaWMgb2JqZWN0QXJyYXk6QXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyByb3dBcnJheTpBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIHJvd0lEIDogYW55O1xyXG5cclxufVxyXG50aGlzLkl0ZW1TZWxlY3RlZEV2ZW50ID0gSXRlbVNlbGVjdGVkRXZlbnQ7XHJcbiJdfQ==