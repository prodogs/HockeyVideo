

declare var C4logDB:Mongo.Collection<any>;
declare var videojs : any;

Template["videoPane"].onRendered(function () {

    var story = new Story();

    var videoPerspective = new VideoPerspective();
    story.addPerspective(videoPerspective);

    var annotationPerspective = new AnnotationPerspective();
    annotationPerspective.setOverlay(videoPerspective);
    story.addPerspective(annotationPerspective);

    var goalieClipboard = new ClipboardPerspective("http://localhost:3000/goalie.png");
    goalieClipboard.setCanvas("goalCanvas");
    story.addPerspective(goalieClipboard);

    var rinkClipboard = new ClipboardPerspective("http://localhost:3000/rink2.png");
    rinkClipboard.setCanvas("rinkCanvas");
    story.addPerspective(rinkClipboard);

    var circle = new CircleAnnotation();
    circle.startTime = 1;
    circle.endTime = 15;
    circle.setPerspective(annotationPerspective);
    story.addEvent(circle);

    var circle = new CircleAnnotation();
    circle.startTime = 1;
    circle.endTime = 15;
    circle.setPerspective(goalieClipboard);
    story.addEvent(circle);

    var circle = new CircleAnnotation();
    circle.startTime = 1;
    circle.endTime = 15;
    circle.setPerspective(rinkClipboard);
    story.addEvent(circle);




    var circle2 = new RectAnnotation();
    circle2.startTime = 13;
    circle2.endTime = 30;
    circle2.top = 200;
    circle2.left=200;
    circle2.setPerspective(annotationPerspective);
    story.addEvent(circle2);

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
    videoEvent.setPerspective(videoPerspective);
    story.addEvent(videoEvent);

    videoEvent = new VideoEvent(VideoAction.Slow);
    videoEvent.startTime = 8;
    videoEvent.endTime = 15;
    videoEvent.speed = .5;
    videoEvent.setPerspective(videoPerspective);
    story.addEvent(videoEvent);


    videoEvent = new VideoEvent(VideoAction.Slow);
    videoEvent.startTime = 20;
    videoEvent.endTime = 25;
    videoEvent.speed = 3
    videoEvent.setPerspective(videoPerspective);
    story.addEvent(videoEvent);




    var thePortal = new Portal();
    var portalRoot = thePortal.getRoot();

    var newColumns = thePortal.createColumns("columns");
    portalRoot.addSection(newColumns);
    newColumns.scrollBarY = true;
    var col1Rows          = thePortal.createRows("column1Rows");
    newColumns.addSection(col1Rows);
    col1Rows.addPortlet("controls", 50);
    col1Rows.width = 100;
    col1Rows.height = 300;
    newColumns.addResizer();

    var newRows = thePortal.createRows("column2Rows");
    newRows.addPortlet("events", 115);
    newRows.width = 800;
    newRows.height = 300;
    newColumns.addSection(newRows);

    var clockRow = thePortal.createRows("clockRow");
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

