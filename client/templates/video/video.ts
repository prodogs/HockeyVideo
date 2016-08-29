

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
    circle.startTime = 1;
    circle.endTime = 15;
    circle.setPerspective(annotationPerspective);
    story.addEvent(circle);

    circle = new CircleAnnotation();
    circle.startTime = 15;
    circle.endTime = 30;
    circle.setPerspective(annotationPerspective);
    story.addEvent(circle);

    var rect = new RectAnnotation();
    rect.startTime = 3;
    rect.endTime = 30;
    rect.setPerspective(annotationPerspective);
    story.addEvent(rect);

    var text = new TextAnnotation();
    text.startTime = 5;
    text.endTime = 30;
    text.setPerspective(annotationPerspective);
    story.addEvent(text);

    var videoEvent = new VideoEvent(VideoAction.Pause);
    videoEvent.startTime = 3;
    videoEvent.endTime = 5;
    story.addEvent(videoEvent);

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

    var annotationTable = new UIAnnotationTable();

    var dataTable = new UIAnnotationTable();

    dataTable.uiClassType = null;

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

