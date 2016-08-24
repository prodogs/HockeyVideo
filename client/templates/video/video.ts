/// <reference path="../../../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../../both/C4log.ts"/>

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {

    var fabricPlayer = new FabricPlayer();
    fabricPlayer.setCanvas("fabricCanvas");
    var videoPlayer = new VideoPlayer("videoDiv");
    fabricPlayer.setVideo(videoPlayer);

    var annotationBlock = new VEventManager();

    var circle = new CircleAnnotation();
    circle.createObject();
    circle.startTime = 1;
    circle.endTime = 15;

    annotationBlock.add(circle);


    var circle = new CircleAnnotation();
    circle.createObject();
    circle.startTime = 15;
    circle.endTime = 30;
    annotationBlock.add(circle);


    var rect = new RectAnnotation();
    rect.createObject();
    rect.startTime = 3;
    rect.endTime = 30;
    annotationBlock.add(rect);

    var text = new TextAnnotation();
    text.createObject();
    text.startTime = 5;
    text.endTime = 30;
    annotationBlock.add(text);


    var thePortal = new Portal();
    var portalRoot = thePortal.getRoot();

    var newColumns = thePortal.createColumns("columns");
    portalRoot.addSection(newColumns);
    newColumns.scrollBarY = true;
    var col1Rows          = thePortal.createRows("column1Rows");
    newColumns.addSection(col1Rows);
    col1Rows.addHeader("Explorer");
    col1Rows.addPortlet("explorer", 1);
    newColumns.addResizer();
    var newRows = thePortal.createRows("column2Rows");
    newRows.addHeader("Detail");
    newRows.addPortlet("detailArea", 15);
    newColumns.addSection(newRows);

    var controls = new UIPlayerControls(fabricPlayer);

    var dataTable = new UIDataTable();

    dataTable.uiClassType = null;

    dataTable.setEditable(true);
    var index=0;
    dataTable.addColumn(index++, {id: "label", header: "Name", width: 100, sort: "string", editor: "text"});
    dataTable.addColumn(index++, {id: "startTime", header: "Start", width: 100, sort: "string", editor: "text"});
    dataTable.addColumn(index++, {id: "endTime", header: "End", width: 100, sort: "string", editor: "text"});
    dataTable.addColumn(index++, {id: "radius", header: "Radius", width: 100, sort: "string", editor: "text"});
    dataTable.addColumn(index++, {id: "y", header: "x", width: 100, sort: "string", editor: "text"});
    dataTable.addColumn(index++, {id: "x", header: "y", width: 100, sort: "string", editor: "text"});

    //dataTable.addColumn(1, {id: "label", header: "Name", width: 150, sort: "string", editor: "text"});
    //dataTable.addColumn(2, {id: "startTime", header: "Start", width: 150, sort: "string", editor: "text"});
    //dataTable.addColumn(3, {id: "endTime", header: "End", width: 150, sort: "string", editor: "text"});


    dataTable.setList(annotationBlock.annotationList);
    thePortal.getPortlet("explorer").setComponent(controls);
    thePortal.getPortlet("detailArea").setComponent(dataTable);

    thePortal.setContainer("videoControls-container");
    thePortal.show();

    fabricPlayer.play();

})


Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

