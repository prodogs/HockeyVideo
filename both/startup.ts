/// <reference path="../typescript-defs/all-definitions.d.ts"/>
declare var window:Window;
console.log(" loading startup.ts for client/server running")
Meteor.startup(function () {
	console.log(" starting startup.ts for client/server running")
	this.Initialization = new ReactiveVar(0);
	if (Meteor.isClient) {
		if (window)
			window.onerror = AppLog.defaultExceptionHandler;
	}
	EJSON.addType("MeasureObservation", function fromJSONValue(value:any):any {
	//	var metricValue = new MeasureObservation();
	//	metricValue.fromJSONValue(value);
	//	return metricValue;
	});
	EJSON.addType("MetricMetaMeaningItem", function fromJSONValue(value:any):any {
	//	var newMeaningItem = new MetricMetaMeaningItem();
	//	newMeaningItem.fromJSONValue(value);
	//	return newMeaningItem;
	});
	EJSON.addType("MetricMetaMeaning", function fromJSONValue(value:any):any {
	//	var newMetricMeaning = new MetricMetaMeaning();
	//	newMetricMeaning.fromJSONValue(value);
	//	return newMetricMeaning;
	});
	EJSON.addType("MetricMeta", function fromJSONValue(value:any):any {
	//	var newMetricMeaning = new MetricMeta();
	//	newMetricMeaning.fromJSONValue(value);
	//	return newMetricMeaning;
	});
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