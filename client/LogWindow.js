var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
var LogWindow = (function (_super) {
    __extends(LogWindow, _super);
    function LogWindow() {
        _super.call(this);
        this.popup = new UIPopupWindow();
    }
    LogWindow.prototype.getView = function () {
        var proxy = webix.proxy("meteor", C4logDB);
        var table = {
            view: "datatable",
            autoWidth: true,
            height: 500,
            width: 1000,
            id: "c4LogTable",
            resizeColumn: true,
            scroll: "xy",
            select: true,
            columns: [{
                    id: "type", sort: "string", width: 50, header: ["type", { content: "textFilter" }],
                }, {
                    id: "message", fillspace: true, header: ["Message", { content: "textFilter" }], sort: "string", gravity: 2
                }, {
                    id: "createdAt",
                    width: 150,
                    sort: "date",
                    header: ["Date", { content: "textFilter" }],
                    format: webix.Date.dateToStr("%m/%d/%y - %H:%i:%s"),
                }, {
                    id: "createdBy", width: 90, sort: "string", header: ["User", { content: "textFilter" }],
                }],
            url: proxy,
        };
        this.componentView = {
            id: this.componentID, view: "form", elements: [table]
        };
        return this.componentView;
    };
    LogWindow.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    LogWindow.prototype.defineEvents = function () {
        $$("c4LogTable").attachEvent("onItemDblClick", function (id, e, node) {
            var theId = id.row;
            var logRecord = $$("c4LogTable").getItem(id);
            var logDetail = new LogDetailWindow(logRecord);
            logDetail.show();
        });
    };
    LogWindow.prototype.show = function () {
        this.popup.show(this);
    };
    return LogWindow;
}(UIComplexComponent));
this.LogWindow = LogWindow;
var LogDetailWindow = (function (_super) {
    __extends(LogDetailWindow, _super);
    function LogDetailWindow(logRecord) {
        _super.call(this);
        this.logRecord = logRecord;
        this.popup = new UIPopupWindow();
    }
    LogDetailWindow.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
    };
    LogDetailWindow.prototype.getView = function () {
        //  this.popup.width = 1000;
        //  this.popup.height = 800;
        var logTable = {
            id: "win3", view: "form", width: 1200, height: 700, scrolly: true, elements: [{
                    view: "text", labelWidth: 100, id: "typeID", label: "Type", name: "type", value: this.logRecord.type
                }, {
                    view: "text",
                    labelWidth: 100,
                    id: "messageID",
                    label: "Message",
                    name: "lname",
                    value: this.logRecord.message
                }, {
                    view: "text",
                    labelWidth: 100,
                    id: "descriptionID",
                    label: "Description",
                    name: "description",
                    value: this.logRecord.description
                }, {
                    type: "line", cols: [{
                            label: "Object",
                            labelWidth: 100,
                            height: 250,
                            id: "objectID",
                            view: "textarea",
                            value: AppLog.prettyPrint(this.logRecord.object)
                        }, {
                            label: "Error Object",
                            labelWidth: 100,
                            id: "errorObjectID",
                            height: 250,
                            view: "textarea",
                            value: AppLog.prettyPrint(this.logRecord.errorObject)
                        }]
                }, {
                    label: "Caller",
                    labelWidth: 100,
                    height: 250,
                    id: "callerID",
                    view: "textarea",
                    value: (this.logRecord.caller)
                }, {
                    label: "Browser",
                    labelWidth: 100,
                    height: 100,
                    id: "browserID",
                    view: "textarea",
                    value: AppLog.prettyPrint(this.logRecord.browser)
                }, {
                    label: "User", labelWidth: 100, view: "text", value: this.logRecord.createdBy
                }, {
                    label: "Created At", labelWidth: 100, view: "text", id: "createdAt", value: this.logRecord.createdAt
                },]
        };
        this.popup.width = 1200;
        this.popup.height = 700;
        this.componentView = {
            id: this.componentID, view: "form", elements: [logTable]
        };
        return this.componentView;
    };
    LogDetailWindow.prototype.show = function () {
        this.popup.show(this);
    };
    return LogDetailWindow;
}(UIComplexComponent));
this.LogDetailWindow = LogDetailWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nV2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTG9nV2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXdFO0FBQ3hFO0lBQXdCLDZCQUFrQjtJQUd6QztRQUNDLGlCQUFPLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLDJCQUFPLEdBQWQ7UUFDQyxJQUFJLEtBQUssR0FBWSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLEtBQUssR0FBWTtZQUNwQixJQUFJLEVBQVUsV0FBVztZQUN6QixTQUFTLEVBQUssSUFBSTtZQUNsQixNQUFNLEVBQVEsR0FBRztZQUNqQixLQUFLLEVBQVMsSUFBSTtZQUNsQixFQUFFLEVBQVksWUFBWTtZQUMxQixZQUFZLEVBQUUsSUFBSTtZQUNsQixNQUFNLEVBQVEsSUFBSTtZQUNsQixNQUFNLEVBQVEsSUFBSTtZQUNsQixPQUFPLEVBQU8sQ0FBQztvQkFDZCxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUM7aUJBQ2hGLEVBQUU7b0JBQ0YsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7aUJBQ3hHLEVBQUU7b0JBQ0YsRUFBRSxFQUFNLFdBQVc7b0JBQ25CLEtBQUssRUFBRyxHQUFHO29CQUNYLElBQUksRUFBSSxNQUFNO29CQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQztvQkFDekMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO2lCQUNuRCxFQUFFO29CQUNGLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQztpQkFDckYsQ0FBQztZQUNGLEdBQUcsRUFBVyxLQUFLO1NBQ25CLENBQUE7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ3BCLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3JELENBQUE7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDQyxnQkFBSyxDQUFDLFVBQVUsV0FBRSxDQUFDO1FBQ25CLGdCQUFLLENBQUMsWUFBWSxXQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxnQ0FBWSxHQUFuQjtRQUNDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUk7WUFDbkUsSUFBSSxLQUFLLEdBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUN2QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSx3QkFBSSxHQUFYO1FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQTFERCxDQUF3QixrQkFBa0IsR0EwRHpDO0FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0I7SUFBOEIsbUNBQWtCO0lBSS9DLHlCQUFZLFNBQWE7UUFDeEIsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQU8sSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU0sb0NBQVUsR0FBakI7UUFDQyxnQkFBSyxDQUFDLFVBQVUsV0FBRSxDQUFDO1FBQ25CLGdCQUFLLENBQUMsWUFBWSxXQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLGlDQUFPLEdBQWQ7UUFDQyw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLElBQUksUUFBUSxHQUFTO1lBQ3BCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztvQkFDN0UsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7aUJBQ3BHLEVBQUU7b0JBQ0YsSUFBSSxFQUFRLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHO29CQUNmLEVBQUUsRUFBVSxXQUFXO29CQUN2QixLQUFLLEVBQU8sU0FBUztvQkFDckIsSUFBSSxFQUFRLE9BQU87b0JBQ25CLEtBQUssRUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87aUJBQ2xDLEVBQUU7b0JBQ0YsSUFBSSxFQUFRLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHO29CQUNmLEVBQUUsRUFBVSxlQUFlO29CQUMzQixLQUFLLEVBQU8sYUFBYTtvQkFDekIsSUFBSSxFQUFRLGFBQWE7b0JBQ3pCLEtBQUssRUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVc7aUJBQ3RDLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs0QkFDcEIsS0FBSyxFQUFPLFFBQVE7NEJBQ3BCLFVBQVUsRUFBRSxHQUFHOzRCQUNmLE1BQU0sRUFBTSxHQUFHOzRCQUNmLEVBQUUsRUFBVSxVQUFVOzRCQUN0QixJQUFJLEVBQVEsVUFBVTs0QkFDdEIsS0FBSyxFQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7eUJBQ3JELEVBQUU7NEJBQ0YsS0FBSyxFQUFPLGNBQWM7NEJBQzFCLFVBQVUsRUFBRSxHQUFHOzRCQUNmLEVBQUUsRUFBVSxlQUFlOzRCQUMzQixNQUFNLEVBQU0sR0FBRzs0QkFDZixJQUFJLEVBQVEsVUFBVTs0QkFDdEIsS0FBSyxFQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7eUJBQzFELENBQUM7aUJBQ0YsRUFBRTtvQkFDRixLQUFLLEVBQU8sUUFBUTtvQkFDcEIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsTUFBTSxFQUFNLEdBQUc7b0JBQ2YsRUFBRSxFQUFVLFVBQVU7b0JBQ3RCLElBQUksRUFBUSxVQUFVO29CQUN0QixLQUFLLEVBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztpQkFDbkMsRUFBRTtvQkFDRixLQUFLLEVBQU8sU0FBUztvQkFDckIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsTUFBTSxFQUFNLEdBQUc7b0JBQ2YsRUFBRSxFQUFVLFdBQVc7b0JBQ3ZCLElBQUksRUFBUSxVQUFVO29CQUN0QixLQUFLLEVBQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztpQkFDdEQsRUFBRTtvQkFDRixLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTO2lCQUM3RSxFQUFFO29CQUNGLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztpQkFDcEcsRUFBRTtTQUNILENBQUE7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBSyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUksR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDcEIsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDeEQsQ0FBQTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzNCLENBQUM7SUFFTSw4QkFBSSxHQUFYO1FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQWxGRCxDQUE4QixrQkFBa0IsR0FrRi9DO0FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxyXG5jbGFzcyBMb2dXaW5kb3cgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cdHB1YmxpYyBwb3B1cDpVSVBvcHVwV2luZG93O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnBvcHVwID0gbmV3IFVJUG9wdXBXaW5kb3coKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCkge1xyXG5cdFx0dmFyIHByb3h5ICAgICAgICAgID0gd2ViaXgucHJveHkoXCJtZXRlb3JcIiwgQzRsb2dEQik7XHJcblx0XHR2YXIgdGFibGUgICAgICAgICAgPSB7XHJcblx0XHRcdHZpZXcgICAgICAgIDogXCJkYXRhdGFibGVcIixcclxuXHRcdFx0YXV0b1dpZHRoICAgOiB0cnVlLFxyXG5cdFx0XHRoZWlnaHQgICAgICA6IDUwMCxcclxuXHRcdFx0d2lkdGggICAgICAgOiAxMDAwLFxyXG5cdFx0XHRpZCAgICAgICAgICA6IFwiYzRMb2dUYWJsZVwiLFxyXG5cdFx0XHRyZXNpemVDb2x1bW46IHRydWUsXHJcblx0XHRcdHNjcm9sbCAgICAgIDogXCJ4eVwiLFxyXG5cdFx0XHRzZWxlY3QgICAgICA6IHRydWUsXHJcblx0XHRcdGNvbHVtbnMgICAgIDogW3tcclxuXHRcdFx0XHRpZDogXCJ0eXBlXCIsIHNvcnQ6IFwic3RyaW5nXCIsIHdpZHRoOiA1MCwgaGVhZGVyOiBbXCJ0eXBlXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWQ6IFwibWVzc2FnZVwiLCBmaWxsc3BhY2U6IHRydWUsIGhlYWRlcjogW1wiTWVzc2FnZVwiLCB7Y29udGVudDogXCJ0ZXh0RmlsdGVyXCJ9XSwgc29ydDogXCJzdHJpbmdcIiwgZ3Jhdml0eTogMlxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWQgICAgOiBcImNyZWF0ZWRBdFwiLFxyXG5cdFx0XHRcdHdpZHRoIDogMTUwLFxyXG5cdFx0XHRcdHNvcnQgIDogXCJkYXRlXCIsXHJcblx0XHRcdFx0aGVhZGVyOiBbXCJEYXRlXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHRcdGZvcm1hdDogd2ViaXguRGF0ZS5kYXRlVG9TdHIoXCIlbS8lZC8leSAtICVIOiVpOiVzXCIpLFxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWQ6IFwiY3JlYXRlZEJ5XCIsIHdpZHRoOiA5MCwgc29ydDogXCJzdHJpbmdcIiwgaGVhZGVyOiBbXCJVc2VyXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHR9XSxcclxuXHRcdFx0dXJsICAgICAgICAgOiBwcm94eSxcclxuXHRcdH1cclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwiZm9ybVwiLCBlbGVtZW50czogW3RhYmxlXVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdCQkKFwiYzRMb2dUYWJsZVwiKS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uIChpZCwgZSwgbm9kZSkge1xyXG5cdFx0XHR2YXIgdGhlSWQgICAgID0gaWQucm93O1xyXG5cdFx0XHR2YXIgbG9nUmVjb3JkID0gJCQoXCJjNExvZ1RhYmxlXCIpLmdldEl0ZW0oaWQpO1xyXG5cdFx0XHR2YXIgbG9nRGV0YWlsID0gbmV3IExvZ0RldGFpbFdpbmRvdyhsb2dSZWNvcmQpO1xyXG5cdFx0XHRsb2dEZXRhaWwuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAuc2hvdyh0aGlzKTtcclxuXHR9XHJcbn1cclxudGhpcy5Mb2dXaW5kb3cgPSBMb2dXaW5kb3c7XHJcbmNsYXNzIExvZ0RldGFpbFdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0cHVibGljIGxvZ1JlY29yZDphbnlcclxuXHRwdWJsaWMgcG9wdXA6VUlQb3B1cFdpbmRvdztcclxuXHJcblx0Y29uc3RydWN0b3IobG9nUmVjb3JkOmFueSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubG9nUmVjb3JkID0gbG9nUmVjb3JkO1xyXG5cdFx0dGhpcy5wb3B1cCAgICAgPSBuZXcgVUlQb3B1cFdpbmRvdygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCkge1xyXG5cdFx0Ly8gIHRoaXMucG9wdXAud2lkdGggPSAxMDAwO1xyXG5cdFx0Ly8gIHRoaXMucG9wdXAuaGVpZ2h0ID0gODAwO1xyXG5cdFx0dmFyIGxvZ1RhYmxlICAgICAgID0ge1xyXG5cdFx0XHRpZDogXCJ3aW4zXCIsIHZpZXc6IFwiZm9ybVwiLCB3aWR0aDogMTIwMCwgaGVpZ2h0OiA3MDAsIHNjcm9sbHk6IHRydWUsIGVsZW1lbnRzOiBbe1xyXG5cdFx0XHRcdHZpZXc6IFwidGV4dFwiLCBsYWJlbFdpZHRoOiAxMDAsIGlkOiBcInR5cGVJRFwiLCBsYWJlbDogXCJUeXBlXCIsIG5hbWU6IFwidHlwZVwiLCB2YWx1ZTogdGhpcy5sb2dSZWNvcmQudHlwZVxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0dmlldyAgICAgIDogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0bGFiZWxXaWR0aDogMTAwLFxyXG5cdFx0XHRcdGlkICAgICAgICA6IFwibWVzc2FnZUlEXCIsXHJcblx0XHRcdFx0bGFiZWwgICAgIDogXCJNZXNzYWdlXCIsXHJcblx0XHRcdFx0bmFtZSAgICAgIDogXCJsbmFtZVwiLFxyXG5cdFx0XHRcdHZhbHVlICAgICA6IHRoaXMubG9nUmVjb3JkLm1lc3NhZ2VcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dFwiLFxyXG5cdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRpZCAgICAgICAgOiBcImRlc2NyaXB0aW9uSURcIixcclxuXHRcdFx0XHRsYWJlbCAgICAgOiBcIkRlc2NyaXB0aW9uXCIsXHJcblx0XHRcdFx0bmFtZSAgICAgIDogXCJkZXNjcmlwdGlvblwiLFxyXG5cdFx0XHRcdHZhbHVlICAgICA6IHRoaXMubG9nUmVjb3JkLmRlc2NyaXB0aW9uXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHR0eXBlOiBcImxpbmVcIiwgY29sczogW3tcclxuXHRcdFx0XHRcdGxhYmVsICAgICA6IFwiT2JqZWN0XCIsXHJcblx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRoZWlnaHQgICAgOiAyNTAsXHJcblx0XHRcdFx0XHRpZCAgICAgICAgOiBcIm9iamVjdElEXCIsXHJcblx0XHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0XHR2YWx1ZSAgICAgOiBBcHBMb2cucHJldHR5UHJpbnQodGhpcy5sb2dSZWNvcmQub2JqZWN0KVxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdGxhYmVsICAgICA6IFwiRXJyb3IgT2JqZWN0XCIsXHJcblx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRpZCAgICAgICAgOiBcImVycm9yT2JqZWN0SURcIixcclxuXHRcdFx0XHRcdGhlaWdodCAgICA6IDI1MCxcclxuXHRcdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dGFyZWFcIixcclxuXHRcdFx0XHRcdHZhbHVlICAgICA6IEFwcExvZy5wcmV0dHlQcmludCh0aGlzLmxvZ1JlY29yZC5lcnJvck9iamVjdClcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0bGFiZWwgICAgIDogXCJDYWxsZXJcIixcclxuXHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0aGVpZ2h0ICAgIDogMjUwLFxyXG5cdFx0XHRcdGlkICAgICAgICA6IFwiY2FsbGVySURcIixcclxuXHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0dmFsdWUgICAgIDogKHRoaXMubG9nUmVjb3JkLmNhbGxlcilcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGxhYmVsICAgICA6IFwiQnJvd3NlclwiLFxyXG5cdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRoZWlnaHQgICAgOiAxMDAsXHJcblx0XHRcdFx0aWQgICAgICAgIDogXCJicm93c2VySURcIixcclxuXHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0dmFsdWUgICAgIDogQXBwTG9nLnByZXR0eVByaW50KHRoaXMubG9nUmVjb3JkLmJyb3dzZXIpXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRsYWJlbDogXCJVc2VyXCIsIGxhYmVsV2lkdGg6IDEwMCwgdmlldzogXCJ0ZXh0XCIsIHZhbHVlOiB0aGlzLmxvZ1JlY29yZC5jcmVhdGVkQnlcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGxhYmVsOiBcIkNyZWF0ZWQgQXRcIiwgbGFiZWxXaWR0aDogMTAwLCB2aWV3OiBcInRleHRcIiwgaWQ6IFwiY3JlYXRlZEF0XCIsIHZhbHVlOiB0aGlzLmxvZ1JlY29yZC5jcmVhdGVkQXRcclxuXHRcdFx0fSxdXHJcblx0XHR9XHJcblx0XHR0aGlzLnBvcHVwLndpZHRoICAgPSAxMjAwO1xyXG5cdFx0dGhpcy5wb3B1cC5oZWlnaHQgID0gNzAwO1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJmb3JtXCIsIGVsZW1lbnRzOiBbbG9nVGFibGVdXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNob3coKSB7XHJcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XHJcblx0fVxyXG59XHJcbnRoaXMuTG9nRGV0YWlsV2luZG93ID0gTG9nRGV0YWlsV2luZG93XHJcbiJdfQ==