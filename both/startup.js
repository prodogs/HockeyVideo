/// <reference path="../typescript-defs/all-definitions.d.ts"/>
console.log(" loading startup.ts for client/server running");
Meteor.startup(function () {
    console.log(" starting startup.ts for client/server running");
    this.Initialization = new ReactiveVar(0);
    if (Meteor.isClient) {
        if (window)
            window.onerror = AppLog.defaultExceptionHandler;
    }
    EJSON.addType("MeasureObservation", function fromJSONValue(value) {
        //	var metricValue = new MeasureObservation();
        //	metricValue.fromJSONValue(value);
        //	return metricValue;
    });
    EJSON.addType("MetricMetaMeaningItem", function fromJSONValue(value) {
        //	var newMeaningItem = new MetricMetaMeaningItem();
        //	newMeaningItem.fromJSONValue(value);
        //	return newMeaningItem;
    });
    EJSON.addType("MetricMetaMeaning", function fromJSONValue(value) {
        //	var newMetricMeaning = new MetricMetaMeaning();
        //	newMetricMeaning.fromJSONValue(value);
        //	return newMetricMeaning;
    });
    EJSON.addType("MetricMeta", function fromJSONValue(value) {
        //	var newMetricMeaning = new MetricMeta();
        //	newMetricMeaning.fromJSONValue(value);
        //	return newMetricMeaning;
    });
    EJSON.addType("RelationshipMetaData", function fromJSONValue(value) {
        //	var newObject = new RelationshipMetaData();
        //	newObject.fromJSONValue(value);
        //	return newObject;
    });
    EJSON.addType("RelationshipLabels", function fromJSONValue(value) {
        //	var newObject = new RelationshipLabels();
        //	newObject.fromJSONValue(value);
        //	return newObject;
    });
    EJSON.addType("RelationshipLabel", function fromJSONValue(value) {
        //	var newObject = new RelationshipLabel();
        //	newObject.fromJSONValue(value);
        //	return newObject;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBRS9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQTtBQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO0lBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1YsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsdUJBQXVCLENBQUM7SUFDbEQsQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEtBQVM7UUFDcEUsOENBQThDO1FBQzlDLG9DQUFvQztRQUNwQyxzQkFBc0I7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixLQUFTO1FBQ3ZFLG9EQUFvRDtRQUNwRCx1Q0FBdUM7UUFDdkMseUJBQXlCO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsS0FBUztRQUNuRSxrREFBa0Q7UUFDbEQseUNBQXlDO1FBQ3pDLDJCQUEyQjtJQUMzQixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLHVCQUF1QixLQUFTO1FBQzVELDJDQUEyQztRQUMzQyx5Q0FBeUM7UUFDekMsMkJBQTJCO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSx1QkFBdUIsS0FBUztRQUN0RSw4Q0FBOEM7UUFDOUMsa0NBQWtDO1FBQ2xDLG9CQUFvQjtJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEtBQVM7UUFDcEUsNENBQTRDO1FBQzVDLGtDQUFrQztRQUNsQyxvQkFBb0I7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixLQUFTO1FBQ25FLDJDQUEyQztRQUMzQyxrQ0FBa0M7UUFDbEMsb0JBQW9CO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuZGVjbGFyZSB2YXIgd2luZG93OldpbmRvdztcbmNvbnNvbGUubG9nKFwiIGxvYWRpbmcgc3RhcnR1cC50cyBmb3IgY2xpZW50L3NlcnZlciBydW5uaW5nXCIpXG5NZXRlb3Iuc3RhcnR1cChmdW5jdGlvbiAoKSB7XG5cdGNvbnNvbGUubG9nKFwiIHN0YXJ0aW5nIHN0YXJ0dXAudHMgZm9yIGNsaWVudC9zZXJ2ZXIgcnVubmluZ1wiKVxuXHR0aGlzLkluaXRpYWxpemF0aW9uID0gbmV3IFJlYWN0aXZlVmFyKDApO1xuXHRpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG5cdFx0aWYgKHdpbmRvdylcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gQXBwTG9nLmRlZmF1bHRFeGNlcHRpb25IYW5kbGVyO1xuXHR9XG5cdEVKU09OLmFkZFR5cGUoXCJNZWFzdXJlT2JzZXJ2YXRpb25cIiwgZnVuY3Rpb24gZnJvbUpTT05WYWx1ZSh2YWx1ZTphbnkpOmFueSB7XG5cdC8vXHR2YXIgbWV0cmljVmFsdWUgPSBuZXcgTWVhc3VyZU9ic2VydmF0aW9uKCk7XG5cdC8vXHRtZXRyaWNWYWx1ZS5mcm9tSlNPTlZhbHVlKHZhbHVlKTtcblx0Ly9cdHJldHVybiBtZXRyaWNWYWx1ZTtcblx0fSk7XG5cdEVKU09OLmFkZFR5cGUoXCJNZXRyaWNNZXRhTWVhbmluZ0l0ZW1cIiwgZnVuY3Rpb24gZnJvbUpTT05WYWx1ZSh2YWx1ZTphbnkpOmFueSB7XG5cdC8vXHR2YXIgbmV3TWVhbmluZ0l0ZW0gPSBuZXcgTWV0cmljTWV0YU1lYW5pbmdJdGVtKCk7XG5cdC8vXHRuZXdNZWFuaW5nSXRlbS5mcm9tSlNPTlZhbHVlKHZhbHVlKTtcblx0Ly9cdHJldHVybiBuZXdNZWFuaW5nSXRlbTtcblx0fSk7XG5cdEVKU09OLmFkZFR5cGUoXCJNZXRyaWNNZXRhTWVhbmluZ1wiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcblx0Ly9cdHZhciBuZXdNZXRyaWNNZWFuaW5nID0gbmV3IE1ldHJpY01ldGFNZWFuaW5nKCk7XG5cdC8vXHRuZXdNZXRyaWNNZWFuaW5nLmZyb21KU09OVmFsdWUodmFsdWUpO1xuXHQvL1x0cmV0dXJuIG5ld01ldHJpY01lYW5pbmc7XG5cdH0pO1xuXHRFSlNPTi5hZGRUeXBlKFwiTWV0cmljTWV0YVwiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcblx0Ly9cdHZhciBuZXdNZXRyaWNNZWFuaW5nID0gbmV3IE1ldHJpY01ldGEoKTtcblx0Ly9cdG5ld01ldHJpY01lYW5pbmcuZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XG5cdC8vXHRyZXR1cm4gbmV3TWV0cmljTWVhbmluZztcblx0fSk7XG5cdEVKU09OLmFkZFR5cGUoXCJSZWxhdGlvbnNoaXBNZXRhRGF0YVwiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcblx0Ly9cdHZhciBuZXdPYmplY3QgPSBuZXcgUmVsYXRpb25zaGlwTWV0YURhdGEoKTtcblx0Ly9cdG5ld09iamVjdC5mcm9tSlNPTlZhbHVlKHZhbHVlKTtcblx0Ly9cdHJldHVybiBuZXdPYmplY3Q7XG5cdH0pO1xuXHRFSlNPTi5hZGRUeXBlKFwiUmVsYXRpb25zaGlwTGFiZWxzXCIsIGZ1bmN0aW9uIGZyb21KU09OVmFsdWUodmFsdWU6YW55KTphbnkge1xuXHQvL1x0dmFyIG5ld09iamVjdCA9IG5ldyBSZWxhdGlvbnNoaXBMYWJlbHMoKTtcblx0Ly9cdG5ld09iamVjdC5mcm9tSlNPTlZhbHVlKHZhbHVlKTtcblx0Ly9cdHJldHVybiBuZXdPYmplY3Q7XG5cdH0pO1xuXHRFSlNPTi5hZGRUeXBlKFwiUmVsYXRpb25zaGlwTGFiZWxcIiwgZnVuY3Rpb24gZnJvbUpTT05WYWx1ZSh2YWx1ZTphbnkpOmFueSB7XG5cdC8vXHR2YXIgbmV3T2JqZWN0ID0gbmV3IFJlbGF0aW9uc2hpcExhYmVsKCk7XG5cdC8vXHRuZXdPYmplY3QuZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XG5cdC8vXHRyZXR1cm4gbmV3T2JqZWN0O1xuXHR9KTtcbn0pOyJdfQ==