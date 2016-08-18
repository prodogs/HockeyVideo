/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
class LogWindow extends UIComplexComponent {
	public popup:UIPopupWindow;

	constructor() {
		super();
		this.popup = new UIPopupWindow();
	}

	public getView() {
		var proxy          = webix.proxy("meteor", C4logDB);
		var table          = {
			view        : "datatable",
			autoWidth   : true,
			height      : 500,
			width       : 1000,
			id          : "c4LogTable",
			resizeColumn: true,
			scroll      : "xy",
			select      : true,
			columns     : [{
				id: "type", sort: "string", width: 50, header: ["type", {content: "textFilter"}],
			}, {
				id: "message", fillspace: true, header: ["Message", {content: "textFilter"}], sort: "string", gravity: 2
			}, {
				id    : "createdAt",
				width : 150,
				sort  : "date",
				header: ["Date", {content: "textFilter"}],
				format: webix.Date.dateToStr("%m/%d/%y - %H:%i:%s"),
			}, {
				id: "createdBy", width: 90, sort: "string", header: ["User", {content: "textFilter"}],
			}],
			url         : proxy,
		}
		this.componentView = {
			id: this.componentID, view: "form", elements: [table]
		}
		return this.componentView;
	}

	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}

	public defineEvents() {
		$$("c4LogTable").attachEvent("onItemDblClick", function (id, e, node) {
			var theId     = id.row;
			var logRecord = $$("c4LogTable").getItem(id);
			var logDetail = new LogDetailWindow(logRecord);
			logDetail.show();
		});
	}

	public show() {
		this.popup.show(this);
	}
}
this.LogWindow = LogWindow;
class LogDetailWindow extends UIComplexComponent {
	public logRecord:any
	public popup:UIPopupWindow;

	constructor(logRecord:any) {
		super();
		this.logRecord = logRecord;
		this.popup     = new UIPopupWindow();
	}

	public initialize() {
		super.initialize();
		super.defineEvents();
	}

	public getView() {
		//  this.popup.width = 1000;
		//  this.popup.height = 800;
		var logTable       = {
			id: "win3", view: "form", width: 1200, height: 700, scrolly: true, elements: [{
				view: "text", labelWidth: 100, id: "typeID", label: "Type", name: "type", value: this.logRecord.type
			}, {
				view      : "text",
				labelWidth: 100,
				id        : "messageID",
				label     : "Message",
				name      : "lname",
				value     : this.logRecord.message
			}, {
				view      : "text",
				labelWidth: 100,
				id        : "descriptionID",
				label     : "Description",
				name      : "description",
				value     : this.logRecord.description
			}, {
				type: "line", cols: [{
					label     : "Object",
					labelWidth: 100,
					height    : 250,
					id        : "objectID",
					view      : "textarea",
					value     : AppLog.prettyPrint(this.logRecord.object)
				}, {
					label     : "Error Object",
					labelWidth: 100,
					id        : "errorObjectID",
					height    : 250,
					view      : "textarea",
					value     : AppLog.prettyPrint(this.logRecord.errorObject)
				}]
			}, {
				label     : "Caller",
				labelWidth: 100,
				height    : 250,
				id        : "callerID",
				view      : "textarea",
				value     : (this.logRecord.caller)
			}, {
				label     : "Browser",
				labelWidth: 100,
				height    : 100,
				id        : "browserID",
				view      : "textarea",
				value     : AppLog.prettyPrint(this.logRecord.browser)
			}, {
				label: "User", labelWidth: 100, view: "text", value: this.logRecord.createdBy
			}, {
				label: "Created At", labelWidth: 100, view: "text", id: "createdAt", value: this.logRecord.createdAt
			},]
		}
		this.popup.width   = 1200;
		this.popup.height  = 700;
		this.componentView = {
			id: this.componentID, view: "form", elements: [logTable]
		}
		return this.componentView;
	}

	public show() {
		this.popup.show(this);
	}
}
this.LogDetailWindow = LogDetailWindow
