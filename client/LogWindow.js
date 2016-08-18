/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
class LogWindow extends UIComplexComponent {
    constructor() {
        super();
        this.popup = new UIPopupWindow();
    }
    getView() {
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
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() {
        $$("c4LogTable").attachEvent("onItemDblClick", function (id, e, node) {
            var theId = id.row;
            var logRecord = $$("c4LogTable").getItem(id);
            var logDetail = new LogDetailWindow(logRecord);
            logDetail.show();
        });
    }
    show() {
        this.popup.show(this);
    }
}
this.LogWindow = LogWindow;
class LogDetailWindow extends UIComplexComponent {
    constructor(logRecord) {
        super();
        this.logRecord = logRecord;
        this.popup = new UIPopupWindow();
    }
    initialize() {
        super.initialize();
        super.defineEvents();
    }
    getView() {
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
    }
    show() {
        this.popup.show(this);
    }
}
this.LogDetailWindow = LogDetailWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nV2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTG9nV2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQUN4RSx3QkFBd0Isa0JBQWtCO0lBR3pDO1FBQ0MsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxPQUFPO1FBQ2IsSUFBSSxLQUFLLEdBQVksS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxLQUFLLEdBQVk7WUFDcEIsSUFBSSxFQUFVLFdBQVc7WUFDekIsU0FBUyxFQUFLLElBQUk7WUFDbEIsTUFBTSxFQUFRLEdBQUc7WUFDakIsS0FBSyxFQUFTLElBQUk7WUFDbEIsRUFBRSxFQUFZLFlBQVk7WUFDMUIsWUFBWSxFQUFFLElBQUk7WUFDbEIsTUFBTSxFQUFRLElBQUk7WUFDbEIsTUFBTSxFQUFRLElBQUk7WUFDbEIsT0FBTyxFQUFPLENBQUM7b0JBQ2QsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxDQUFDO2lCQUNoRixFQUFFO29CQUNGLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDO2lCQUN4RyxFQUFFO29CQUNGLEVBQUUsRUFBTSxXQUFXO29CQUNuQixLQUFLLEVBQUcsR0FBRztvQkFDWCxJQUFJLEVBQUksTUFBTTtvQkFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFD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QyxTQUFTLENBQUMsU0FBUztpQkFDN0UsRUFBRTtvQkFDRixLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7aUJBQ3BHLEVBQUU7U0FDSCxDQUFBO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUssSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFJLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ3BCLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDO1NBQ3hELENBQUE7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBRU0sSUFBSTtRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7QUFDRixDQUFDO0FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxyXG5jbGFzcyBMb2dXaW5kb3cgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cdHB1YmxpYyBwb3B1cDpVSVBvcHVwV2luZG93O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnBvcHVwID0gbmV3IFVJUG9wdXBXaW5kb3coKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCkge1xyXG5cdFx0dmFyIHByb3h5ICAgICAgICAgID0gd2ViaXgucHJveHkoXCJtZXRlb3JcIiwgQzRsb2dEQik7XHJcblx0XHR2YXIgdGFibGUgICAgICAgICAgPSB7XHJcblx0XHRcdHZpZXcgICAgICAgIDogXCJkYXRhdGFibGVcIixcclxuXHRcdFx0YXV0b1dpZHRoICAgOiB0cnVlLFxyXG5cdFx0XHRoZWlnaHQgICAgICA6IDUwMCxcclxuXHRcdFx0d2lkdGggICAgICAgOiAxMDAwLFxyXG5cdFx0XHRpZCAgICAgICAgICA6IFwiYzRMb2dUYWJsZVwiLFxyXG5cdFx0XHRyZXNpemVDb2x1bW46IHRydWUsXHJcblx0XHRcdHNjcm9sbCAgICAgIDogXCJ4eVwiLFxyXG5cdFx0XHRzZWxlY3QgICAgICA6IHRydWUsXHJcblx0XHRcdGNvbHVtbnMgICAgIDogW3tcclxuXHRcdFx0XHRpZDogXCJ0eXBlXCIsIHNvcnQ6IFwic3RyaW5nXCIsIHdpZHRoOiA1MCwgaGVhZGVyOiBbXCJ0eXBlXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWQ6IFwibWVzc2FnZVwiLCBmaWxsc3BhY2U6IHRydWUsIGhlYWRlcjogW1wiTWVzc2FnZVwiLCB7Y29udGVudDogXCJ0ZXh0RmlsdGVyXCJ9XSwgc29ydDogXCJzdHJpbmdcIiwgZ3Jhdml0eTogMlxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWQgICAgOiBcImNyZWF0ZWRBdFwiLFxyXG5cdFx0XHRcdHdpZHRoIDogMTUwLFxyXG5cdFx0XHRcdHNvcnQgIDogXCJkYXRlXCIsXHJcblx0XHRcdFx0aGVhZGVyOiBbXCJEYXRlXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHRcdGZvcm1hdDogd2ViaXguRGF0ZS5kYXRlVG9TdHIoXCIlbS8lZC8leSAtICVIOiVpOiVzXCIpLFxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0aWQ6IFwiY3JlYXRlZEJ5XCIsIHdpZHRoOiA5MCwgc29ydDogXCJzdHJpbmdcIiwgaGVhZGVyOiBbXCJVc2VyXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHR9XSxcclxuXHRcdFx0dXJsICAgICAgICAgOiBwcm94eSxcclxuXHRcdH1cclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwiZm9ybVwiLCBlbGVtZW50czogW3RhYmxlXVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdCQkKFwiYzRMb2dUYWJsZVwiKS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uIChpZCwgZSwgbm9kZSkge1xyXG5cdFx0XHR2YXIgdGhlSWQgICAgID0gaWQucm93O1xyXG5cdFx0XHR2YXIgbG9nUmVjb3JkID0gJCQoXCJjNExvZ1RhYmxlXCIpLmdldEl0ZW0oaWQpO1xyXG5cdFx0XHR2YXIgbG9nRGV0YWlsID0gbmV3IExvZ0RldGFpbFdpbmRvdyhsb2dSZWNvcmQpO1xyXG5cdFx0XHRsb2dEZXRhaWwuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAuc2hvdyh0aGlzKTtcclxuXHR9XHJcbn1cclxudGhpcy5Mb2dXaW5kb3cgPSBMb2dXaW5kb3c7XHJcbmNsYXNzIExvZ0RldGFpbFdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0cHVibGljIGxvZ1JlY29yZDphbnlcclxuXHRwdWJsaWMgcG9wdXA6VUlQb3B1cFdpbmRvdztcclxuXHJcblx0Y29uc3RydWN0b3IobG9nUmVjb3JkOmFueSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubG9nUmVjb3JkID0gbG9nUmVjb3JkO1xyXG5cdFx0dGhpcy5wb3B1cCAgICAgPSBuZXcgVUlQb3B1cFdpbmRvdygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCkge1xyXG5cdFx0Ly8gIHRoaXMucG9wdXAud2lkdGggPSAxMDAwO1xyXG5cdFx0Ly8gIHRoaXMucG9wdXAuaGVpZ2h0ID0gODAwO1xyXG5cdFx0dmFyIGxvZ1RhYmxlICAgICAgID0ge1xyXG5cdFx0XHRpZDogXCJ3aW4zXCIsIHZpZXc6IFwiZm9ybVwiLCB3aWR0aDogMTIwMCwgaGVpZ2h0OiA3MDAsIHNjcm9sbHk6IHRydWUsIGVsZW1lbnRzOiBbe1xyXG5cdFx0XHRcdHZpZXc6IFwidGV4dFwiLCBsYWJlbFdpZHRoOiAxMDAsIGlkOiBcInR5cGVJRFwiLCBsYWJlbDogXCJUeXBlXCIsIG5hbWU6IFwidHlwZVwiLCB2YWx1ZTogdGhpcy5sb2dSZWNvcmQudHlwZVxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0dmlldyAgICAgIDogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0bGFiZWxXaWR0aDogMTAwLFxyXG5cdFx0XHRcdGlkICAgICAgICA6IFwibWVzc2FnZUlEXCIsXHJcblx0XHRcdFx0bGFiZWwgICAgIDogXCJNZXNzYWdlXCIsXHJcblx0XHRcdFx0bmFtZSAgICAgIDogXCJsbmFtZVwiLFxyXG5cdFx0XHRcdHZhbHVlICAgICA6IHRoaXMubG9nUmVjb3JkLm1lc3NhZ2VcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dFwiLFxyXG5cdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRpZCAgICAgICAgOiBcImRlc2NyaXB0aW9uSURcIixcclxuXHRcdFx0XHRsYWJlbCAgICAgOiBcIkRlc2NyaXB0aW9uXCIsXHJcblx0XHRcdFx0bmFtZSAgICAgIDogXCJkZXNjcmlwdGlvblwiLFxyXG5cdFx0XHRcdHZhbHVlICAgICA6IHRoaXMubG9nUmVjb3JkLmRlc2NyaXB0aW9uXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHR0eXBlOiBcImxpbmVcIiwgY29sczogW3tcclxuXHRcdFx0XHRcdGxhYmVsICAgICA6IFwiT2JqZWN0XCIsXHJcblx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRoZWlnaHQgICAgOiAyNTAsXHJcblx0XHRcdFx0XHRpZCAgICAgICAgOiBcIm9iamVjdElEXCIsXHJcblx0XHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0XHR2YWx1ZSAgICAgOiBBcHBMb2cucHJldHR5UHJpbnQodGhpcy5sb2dSZWNvcmQub2JqZWN0KVxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdGxhYmVsICAgICA6IFwiRXJyb3IgT2JqZWN0XCIsXHJcblx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRpZCAgICAgICAgOiBcImVycm9yT2JqZWN0SURcIixcclxuXHRcdFx0XHRcdGhlaWdodCAgICA6IDI1MCxcclxuXHRcdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dGFyZWFcIixcclxuXHRcdFx0XHRcdHZhbHVlICAgICA6IEFwcExvZy5wcmV0dHlQcmludCh0aGlzLmxvZ1JlY29yZC5lcnJvck9iamVjdClcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0bGFiZWwgICAgIDogXCJDYWxsZXJcIixcclxuXHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0aGVpZ2h0ICAgIDogMjUwLFxyXG5cdFx0XHRcdGlkICAgICAgICA6IFwiY2FsbGVySURcIixcclxuXHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0dmFsdWUgICAgIDogKHRoaXMubG9nUmVjb3JkLmNhbGxlcilcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGxhYmVsICAgICA6IFwiQnJvd3NlclwiLFxyXG5cdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRoZWlnaHQgICAgOiAxMDAsXHJcblx0XHRcdFx0aWQgICAgICAgIDogXCJicm93c2VySURcIixcclxuXHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0dmFsdWUgICAgIDogQXBwTG9nLnByZXR0eVByaW50KHRoaXMubG9nUmVjb3JkLmJyb3dzZXIpXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRsYWJlbDogXCJVc2VyXCIsIGxhYmVsV2lkdGg6IDEwMCwgdmlldzogXCJ0ZXh0XCIsIHZhbHVlOiB0aGlzLmxvZ1JlY29yZC5jcmVhdGVkQnlcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGxhYmVsOiBcIkNyZWF0ZWQgQXRcIiwgbGFiZWxXaWR0aDogMTAwLCB2aWV3OiBcInRleHRcIiwgaWQ6IFwiY3JlYXRlZEF0XCIsIHZhbHVlOiB0aGlzLmxvZ1JlY29yZC5jcmVhdGVkQXRcclxuXHRcdFx0fSxdXHJcblx0XHR9XHJcblx0XHR0aGlzLnBvcHVwLndpZHRoICAgPSAxMjAwO1xyXG5cdFx0dGhpcy5wb3B1cC5oZWlnaHQgID0gNzAwO1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJmb3JtXCIsIGVsZW1lbnRzOiBbbG9nVGFibGVdXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNob3coKSB7XHJcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XHJcblx0fVxyXG59XHJcbnRoaXMuTG9nRGV0YWlsV2luZG93ID0gTG9nRGV0YWlsV2luZG93XHJcbiJdfQ==