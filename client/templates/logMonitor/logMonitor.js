/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../../both/C4log.ts"/>
Template["logMonitor"].onRendered(function () {
    var proxy = webix.proxy("meteor", C4logDB);
    var table = {
        view: "datatable",
        autoWidth: true,
        height: 500,
        id: "c4LogTable",
        resizeColumn: true,
        scroll: "xy",
        select: true,
        columns: [
            {
                id: "type", sort: "string", width: 50, header: ["type", { content: "textFilter" }],
            }, {
                id: "message", fillspace: true, header: ["Message", { content: "textFilter" }], sort: "string", gravity: 2
            }, {
                id: "createdAt", width: 150, sort: "date",
                header: ["Date", { content: "textFilter" }], format: webix.Date.dateToStr("%m/%d/%y - %H:%i:%s"),
            },
            {
                id: "createdBy", width: 90, sort: "string", header: ["User", { content: "textFilter" }],
            }
        ],
        url: proxy,
    };
    this.ui = webix.ui({
        rows: [table], container: "logMonitor-container"
    });
    //$$("c4LogTable").sort("createdAt","desc");
    $$("c4LogTable").attachEvent("onItemDblClick", function (id, e, node) {
        UI.Message("Inside Dbl Click" + node.message);
        var theId = id.row;
        var logRecord = $$("c4LogTable").getItem(id);
        var logTable = webix.ui({
            view: "window", autoheight: true, id: "win3", head: {
                view: "toolbar", cols: [
                    { view: "label", label: "C4Log Detail" }, {
                        view: "button", label: 'close Me', width: 100, align: 'right', click: "$$('win3').close();"
                    }
                ]
            }, width: 1200, left: 200, top: 100, move: true, resize: true, modal: true, body: {
                rows: [
                    { template: "Header", height: 50, view: "template" }, {
                        cols: [
                            {
                                type: "line", rows: [
                                    {
                                        type: "line", rows: [
                                            {
                                                view: "fieldset", label: "Log Detail", body: {
                                                    rows: [
                                                        {
                                                            view: "text",
                                                            labelWidth: 100,
                                                            id: "typeID",
                                                            label: "Type",
                                                            name: "type",
                                                            value: logRecord.type
                                                        }, {
                                                            view: "text",
                                                            labelWidth: 100,
                                                            id: "messageID",
                                                            label: "Message",
                                                            name: "lname",
                                                            value: logRecord.message
                                                        }, {
                                                            view: "text",
                                                            labelWidth: 100,
                                                            id: "descriptionID",
                                                            label: "Description",
                                                            name: "description",
                                                            value: logRecord.description
                                                        }, {
                                                            type: "line", cols: [
                                                                {
                                                                    label: "Object",
                                                                    labelWidth: 100,
                                                                    height: 250,
                                                                    id: "objectID",
                                                                    view: "textarea",
                                                                    value: C4log.prettyPrint(logRecord.object)
                                                                }, {
                                                                    label: "Error Object",
                                                                    labelWidth: 100,
                                                                    id: "errorObjectID",
                                                                    height: 250,
                                                                    view: "textarea",
                                                                    value: C4log.prettyPrint(logRecord.errorObject)
                                                                }
                                                            ]
                                                        }, {
                                                            label: "Caller",
                                                            labelWidth: 100,
                                                            height: 250,
                                                            id: "callerID",
                                                            view: "textarea",
                                                            value: (logRecord.caller)
                                                        }, {
                                                            label: "Browser",
                                                            labelWidth: 100,
                                                            height: 100,
                                                            id: "browserID",
                                                            view: "textarea",
                                                            value: C4log.prettyPrint(logRecord.browser)
                                                        }, {
                                                            label: "User", labelWidth: 100, view: "text", value: logRecord.createdBy
                                                        }, {
                                                            label: "Created At",
                                                            labelWidth: 100,
                                                            view: "text",
                                                            id: "createdAt",
                                                            value: logRecord.createdAt
                                                        },
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }).show();
    });
});
Template["logMonitor"].onDestroyed(function () {
    if (this.ui)
        this.ui.destructor();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nTW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ01vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUVBQXFFO0FBRXJFLDhDQUE4QztBQUk5QyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBRWpDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRTNDLElBQUksS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFVLFdBQVc7UUFDekIsU0FBUyxFQUFLLElBQUk7UUFDbEIsTUFBTSxFQUFRLEdBQUc7UUFDakIsRUFBRSxFQUFZLFlBQVk7UUFDMUIsWUFBWSxFQUFFLElBQUk7UUFDbEIsTUFBTSxFQUFRLElBQUk7UUFDbEIsTUFBTSxFQUFRLElBQUk7UUFDbEIsT0FBTyxFQUFPO1lBQ2I7Z0JBQ0MsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxDQUFDO2FBQ2hGLEVBQUU7Z0JBQ0YsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFFeEcsRUFBRTtnQkFDRixFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU07Z0JBRXpDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQzthQUM5RjtZQUVEO2dC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U0FBUyxDQUFDLFNBQVM7eURBQy9CO3FEQUNEO2lEQUNEOzZDQUNBO3lDQUNEO3FDQUNBO2lDQUNEOzZCQUNBO3lCQUNEO3FCQUNEO2lCQUNEO2FBQ0Q7U0FDdUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRW5DLENBQUMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9ib3RoL0M0bG9nLnRzXCIvPlxyXG5cclxuZGVjbGFyZSB2YXIgQzRsb2dEQjpNb25nby5Db2xsZWN0aW9uPGFueT47XHJcblxyXG5UZW1wbGF0ZVtcImxvZ01vbml0b3JcIl0ub25SZW5kZXJlZChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdHZhciBwcm94eSA9IHdlYml4LnByb3h5KFwibWV0ZW9yXCIsIEM0bG9nREIpO1xyXG5cclxuXHR2YXIgdGFibGUgPSB7XHJcblx0XHR2aWV3ICAgICAgICA6IFwiZGF0YXRhYmxlXCIsXHJcblx0XHRhdXRvV2lkdGggICA6IHRydWUsXHJcblx0XHRoZWlnaHQgICAgICA6IDUwMCxcclxuXHRcdGlkICAgICAgICAgIDogXCJjNExvZ1RhYmxlXCIsXHJcblx0XHRyZXNpemVDb2x1bW46IHRydWUsXHJcblx0XHRzY3JvbGwgICAgICA6IFwieHlcIixcclxuXHRcdHNlbGVjdCAgICAgIDogdHJ1ZSxcclxuXHRcdGNvbHVtbnMgICAgIDogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWQ6IFwidHlwZVwiLCBzb3J0OiBcInN0cmluZ1wiLCB3aWR0aDogNTAsIGhlYWRlcjogW1widHlwZVwiLCB7Y29udGVudDogXCJ0ZXh0RmlsdGVyXCJ9XSxcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGlkOiBcIm1lc3NhZ2VcIiwgZmlsbHNwYWNlOiB0cnVlLCBoZWFkZXI6IFtcIk1lc3NhZ2VcIiwge2NvbnRlbnQ6IFwidGV4dEZpbHRlclwifV0sIHNvcnQ6IFwic3RyaW5nXCIsIGdyYXZpdHk6IDJcclxuXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRpZDogXCJjcmVhdGVkQXRcIiwgd2lkdGg6IDE1MCwgc29ydDogXCJkYXRlXCIsXHJcblxyXG5cdFx0XHRcdGhlYWRlcjogW1wiRGF0ZVwiLCB7Y29udGVudDogXCJ0ZXh0RmlsdGVyXCJ9XSwgZm9ybWF0OiB3ZWJpeC5EYXRlLmRhdGVUb1N0cihcIiVtLyVkLyV5IC0gJUg6JWk6JXNcIiksXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWQ6IFwiY3JlYXRlZEJ5XCIsIHdpZHRoOiA5MCwgc29ydDogXCJzdHJpbmdcIiwgaGVhZGVyOiBbXCJVc2VyXCIsIHtjb250ZW50OiBcInRleHRGaWx0ZXJcIn1dLFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XSxcclxuXHRcdHVybCAgICAgICAgIDogcHJveHksXHJcblx0fVxyXG5cclxuXHR0aGlzLnVpID0gd2ViaXgudWkoe1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgIHJvd3M6IFt0YWJsZV0sIGNvbnRhaW5lcjogXCJsb2dNb25pdG9yLWNvbnRhaW5lclwiXHJcblx0ICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHQvLyQkKFwiYzRMb2dUYWJsZVwiKS5zb3J0KFwiY3JlYXRlZEF0XCIsXCJkZXNjXCIpO1xyXG5cclxuXHQkJChcImM0TG9nVGFibGVcIikuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoaWQsIGUsIG5vZGUpIHtcclxuXHJcblx0XHRVSS5NZXNzYWdlKFwiSW5zaWRlIERibCBDbGlja1wiICsgbm9kZS5tZXNzYWdlKTtcclxuXHRcdHZhciB0aGVJZCA9IGlkLnJvdztcclxuXHJcblx0XHR2YXIgbG9nUmVjb3JkID0gJCQoXCJjNExvZ1RhYmxlXCIpLmdldEl0ZW0oaWQpO1xyXG5cclxuXHRcdHZhciBsb2dUYWJsZSA9IHdlYml4LnVpKHtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIiwgYXV0b2hlaWdodDogdHJ1ZSwgaWQ6IFwid2luM1wiLCBoZWFkOiB7XHJcblx0XHRcdFx0dmlldzogXCJ0b29sYmFyXCIsIGNvbHM6IFtcclxuXHRcdFx0XHRcdHt2aWV3OiBcImxhYmVsXCIsIGxhYmVsOiBcIkM0TG9nIERldGFpbFwifSwge1xyXG5cdFx0XHRcdFx0XHR2aWV3OiBcImJ1dHRvblwiLCBsYWJlbDogJ2Nsb3NlIE1lJywgd2lkdGg6IDEwMCwgYWxpZ246ICdyaWdodCcsIGNsaWNrOiBcIiQkKCd3aW4zJykuY2xvc2UoKTtcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSwgd2lkdGggICAgICAgICAgICAgICAgICAgIDogMTIwMCwgbGVmdDogMjAwLCB0b3A6IDEwMCwgbW92ZTogdHJ1ZSwgcmVzaXplOiB0cnVlLCBtb2RhbDogdHJ1ZSwgYm9keToge1xyXG5cdFx0XHRcdHJvd3M6IFtcclxuXHRcdFx0XHRcdHt0ZW1wbGF0ZTogXCJIZWFkZXJcIiwgaGVpZ2h0OiA1MCwgdmlldzogXCJ0ZW1wbGF0ZVwifSwge1xyXG5cdFx0XHRcdFx0XHRjb2xzOiBbXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJsaW5lXCIsIHJvd3M6IFtcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJsaW5lXCIsIHJvd3M6IFtcclxuXHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZpZXc6IFwiZmllbGRzZXRcIiwgbGFiZWw6IFwiTG9nIERldGFpbFwiLCBib2R5OiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cm93czogW1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxXaWR0aDogMTAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBcInR5cGVJRFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBcIlR5cGVcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bmFtZSAgICAgIDogXCJ0eXBlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICAgICA6IGxvZ1JlY29yZC50eXBlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IFwibWVzc2FnZUlEXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsICAgICA6IFwiTWVzc2FnZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRuYW1lICAgICAgOiBcImxuYW1lXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICAgICA6IGxvZ1JlY29yZC5tZXNzYWdlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IFwiZGVzY3JpcHRpb25JRFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBcIkRlc2NyaXB0aW9uXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWUgICAgICA6IFwiZGVzY3JpcHRpb25cIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgICAgIDogbG9nUmVjb3JkLmRlc2NyaXB0aW9uXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwibGluZVwiLCBjb2xzOiBbXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogXCJPYmplY3RcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodCAgICA6IDI1MCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IFwib2JqZWN0SURcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dGFyZWFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICAgICA6IEM0bG9nLnByZXR0eVByaW50KGxvZ1JlY29yZC5vYmplY3QpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogXCJFcnJvciBPYmplY3RcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IFwiZXJyb3JPYmplY3RJRFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0ICAgIDogMjUwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmlldyAgICAgIDogXCJ0ZXh0YXJlYVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgICAgIDogQzRsb2cucHJldHR5UHJpbnQobG9nUmVjb3JkLmVycm9yT2JqZWN0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBcIkNhbGxlclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodCAgICA6IDI1MCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWQgICAgICAgIDogXCJjYWxsZXJJRFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2aWV3ICAgICAgOiBcInRleHRhcmVhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICAgICA6IChsb2dSZWNvcmQuY2FsbGVyKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBcIkJyb3dzZXJcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxXaWR0aDogMTAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQgICAgOiAxMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IFwiYnJvd3NlcklEXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpZXcgICAgICA6IFwidGV4dGFyZWFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgICAgIDogQzRsb2cucHJldHR5UHJpbnQobG9nUmVjb3JkLmJyb3dzZXIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIlVzZXJcIiwgbGFiZWxXaWR0aDogMTAwLCB2aWV3OiBcInRleHRcIiwgdmFsdWU6IGxvZ1JlY29yZC5jcmVhdGVkQnlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogXCJDcmVhdGVkIEF0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmlldyAgICAgIDogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IFwiY3JlYXRlZEF0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICAgICA6IGxvZ1JlY29yZC5jcmVhdGVkQXRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdF1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICB9KS5zaG93KCk7XHJcblxyXG5cdH0pO1xyXG5cclxufSlcclxuXHJcblRlbXBsYXRlW1wibG9nTW9uaXRvclwiXS5vbkRlc3Ryb3llZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHRoaXMudWkpIHRoaXMudWkuZGVzdHJ1Y3RvcigpO1xyXG59KTtcclxuXHJcbiJdfQ==