interface Window {

}
declare var window:Window;


console.log(" loading startup.ts for client/server running")
Meteor.startup(function () {
	console.log(" starting startup.ts for client/server running")
	this.Initialization = new ReactiveVar(0);
	if (Meteor.isClient) {
		if (window)
			window.onerror = AppLog.defaultExceptionHandler;
	}
	EJSON.addType("RelationshipMetaData", function fromJSONValue(value:any):any {
	//	var newObject = new RelationshipMetaData();
	//	newObject.fromJSONValue(value);
	//	return newObject;
	});
	EJSON.addType("RelationshipLabels", function fromJSONValue(value:any):any {
	//	var newObject = new RelationshipLabels();
	//	newObject.fromJSONValue(value);
	//	return newObject;
	});
	EJSON.addType("RelationshipLabel", function fromJSONValue(value:any):any {
	//	var newObject = new RelationshipLabel();
	//	newObject.fromJSONValue(value);
	//	return newObject;
	});
});
