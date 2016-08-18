/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>

/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;

Template["logMonitor"].onRendered(function () {

	var proxy = webix.proxy("meteor", C4logDB);

	var table = {
		view        : "datatable",
		autoWidth   : true,
		height      : 500,
		id          : "c4LogTable",
		resizeColumn: true,
		scroll      : "xy",
		select      : true,
		columns     : [
			{
				id: "type", sort: "string", width: 50, header: ["type", {content: "textFilter"}],
			}, {
				id: "message", fillspace: true, header: ["Message", {content: "textFilter"}], sort: "string", gravity: 2

			}, {
				id: "createdAt", width: 150, sort: "date",

				header: ["Date", {content: "textFilter"}], format: webix.Date.dateToStr("%m/%d/%y - %H:%i:%s"),
			},

			{
				id: "createdBy", width: 90, sort: "string", header: ["User", {content: "textFilter"}],
			}

		],
		url         : proxy,
	}

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
					{view: "label", label: "C4Log Detail"}, {
						view: "button", label: 'close Me', width: 100, align: 'right', click: "$$('win3').close();"
					}
				]
			}, width                    : 1200, left: 200, top: 100, move: true, resize: true, modal: true, body: {
				rows: [
					{template: "Header", height: 50, view: "template"}, {
						cols: [
							{
								type: "line", rows: [
								{
									type: "line", rows: [
									{
										view: "fieldset", label: "Log Detail", body: {
										rows: [
											{
												view      : "text",
												labelWidth: 100,
												id        : "typeID",
												label     : "Type",
												name      : "type",
												value     : logRecord.type
											}, {
												view      : "text",
												labelWidth: 100,
												id        : "messageID",
												label     : "Message",
												name      : "lname",
												value     : logRecord.message
											}, {
												view      : "text",
												labelWidth: 100,
												id        : "descriptionID",
												label     : "Description",
												name      : "description",
												value     : logRecord.description
											}, {
												type: "line", cols: [
													{
														label     : "Object",
														labelWidth: 100,
														height    : 250,
														id        : "objectID",
														view      : "textarea",
														value     : C4log.prettyPrint(logRecord.object)
													}, {
														label     : "Error Object",
														labelWidth: 100,
														id        : "errorObjectID",
														height    : 250,
														view      : "textarea",
														value     : C4log.prettyPrint(logRecord.errorObject)
													}
												]
											}, {
												label     : "Caller",
												labelWidth: 100,
												height    : 250,
												id        : "callerID",
												view      : "textarea",
												value     : (logRecord.caller)
											}, {
												label     : "Browser",
												labelWidth: 100,
												height    : 100,
												id        : "browserID",
												view      : "textarea",
												value     : C4log.prettyPrint(logRecord.browser)
											}, {
												label: "User", labelWidth: 100, view: "text", value: logRecord.createdBy
											}, {
												label     : "Created At",
												labelWidth: 100,
												view      : "text",
												id        : "createdAt",
												value     : logRecord.createdAt
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

})

Template["logMonitor"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

