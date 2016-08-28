

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {

    var story = new Story();

    var videoPerspective = new VideoPerspective();

    story.addPerspective(videoPerspective);

    var annotationPerspective = new AnnotationPerspective();
    annotationPerspective.setOverlay(videoPerspective);
    story.addPerspective(annotationPerspective);


    var circle = new CircleAnnotation();
    circle.createObject();
    circle.startTime = 1;
    circle.endTime = 15;
    circle.setPerspective(annotationPerspective);
    story.addEvent(circle);

    circle = new CircleAnnotation();
    circle.createObject();
    circle.startTime = 15;
    circle.endTime = 30;
    circle.setPerspective(annotationPerspective);
    story.addEvent(circle);

    var rect = new RectAnnotation();
    rect.createObject();
    rect.startTime = 3;
    rect.endTime = 30;
    rect.setPerspective(annotationPerspective);
    story.addEvent(rect);

    var text = new TextAnnotation();
    text.createObject();
    text.startTime = 5;
    text.endTime = 30;
    text.setPerspective(annotationPerspective);
    story.addEvent(text);

    var thePortal = new Portal();
    var portalRoot = thePortal.getRoot();

    var newColumns = thePortal.createColumns("columns");
    portalRoot.addSection(newColumns);
    newColumns.scrollBarY = true;
    var col1Rows          = thePortal.createRows("column1Rows");
    newColumns.addSection(col1Rows);
    col1Rows.addHeader("Controls");
    col1Rows.addPortlet("controls", 50);
    col1Rows.width = 100;
    col1Rows.height = 300;
    newColumns.addResizer();

    var newRows = thePortal.createRows("column2Rows");
    newRows.addHeader("Events");
    newRows.addPortlet("events", 115);
    newRows.width = 800;
    newRows.height = 300;
    newColumns.addSection(newRows);

    var clockRow = thePortal.createRows("clockRow");
    clockRow.addHeader("Clock");
    clockRow.addPortlet("ClockRow" , 115);
    newRows.addSection(clockRow);

    var controls = new UIPlayerControls(story);

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



    var clockField = new UIStoryClock();

    dataTable.setList(story.getEvents());
    thePortal.getPortlet("controls").setComponent(controls);
    thePortal.getPortlet("events").setComponent(dataTable);
    thePortal.getPortlet("ClockRow").setComponent(clockField);

    thePortal.setContainer("videoControls-container");
    thePortal.show();

    story.clock.setSyncPlayer(videoPerspective.fabricPlayer);
    story.play();

})


Template["videoPane"].onDestroyed(function () {
	if (this.ui) this.ui.destructor();
});

