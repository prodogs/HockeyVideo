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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBRS9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQTtBQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO0lBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1YsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsdUJBQXVCLENBQUM7SUFDbEQsQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEtBQVM7UUFDcEUsOENBQThDO1FBQzlDLG9DQUFvQztRQUNwQyxzQkFBc0I7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixLQUFTO1FBQ3ZFLG9EQUFvRDtRQUNwRCx1Q0FBdUM7UUFDdkMseUJBQXlCO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsS0FBUztRQUNuRSxrREFBa0Q7UUFDbEQseUNBQXlDO1FBQ3pDLDJCQUEyQjtJQUMzQixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLHVCQUF1QixLQUFTO1FBQzVELDJDQUEyQztRQUMzQyx5Q0FBeUM7UUFDekMsMkJBQTJCO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSx1QkFBdUIsS0FBUztRQUN0RSw4Q0FBOEM7UUFDOUMsa0NBQWtDO1FBQ2xDLG9CQUFvQjtJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEtBQVM7UUFDcEUsNENBQTRDO1FBQzVDLGtDQUFrQztRQUNsQyxvQkFBb0I7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixLQUFTO1FBQ25FLDJDQUEyQztRQUMzQyxrQ0FBa0M7UUFDbEMsb0JBQW9CO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxyXG5kZWNsYXJlIHZhciB3aW5kb3c6V2luZG93O1xyXG5jb25zb2xlLmxvZyhcIiBsb2FkaW5nIHN0YXJ0dXAudHMgZm9yIGNsaWVudC9zZXJ2ZXIgcnVubmluZ1wiKVxyXG5NZXRlb3Iuc3RhcnR1cChmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS5sb2coXCIgc3RhcnRpbmcgc3RhcnR1cC50cyBmb3IgY2xpZW50L3NlcnZlciBydW5uaW5nXCIpXHJcblx0dGhpcy5Jbml0aWFsaXphdGlvbiA9IG5ldyBSZWFjdGl2ZVZhcigwKTtcclxuXHRpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XHJcblx0XHRpZiAod2luZG93KVxyXG5cdFx0XHR3aW5kb3cub25lcnJvciA9IEFwcExvZy5kZWZhdWx0RXhjZXB0aW9uSGFuZGxlcjtcclxuXHR9XHJcblx0RUpTT04uYWRkVHlwZShcIk1lYXN1cmVPYnNlcnZhdGlvblwiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcclxuXHQvL1x0dmFyIG1ldHJpY1ZhbHVlID0gbmV3IE1lYXN1cmVPYnNlcnZhdGlvbigpO1xyXG5cdC8vXHRtZXRyaWNWYWx1ZS5mcm9tSlNPTlZhbHVlKHZhbHVlKTtcclxuXHQvL1x0cmV0dXJuIG1ldHJpY1ZhbHVlO1xyXG5cdH0pO1xyXG5cdEVKU09OLmFkZFR5cGUoXCJNZXRyaWNNZXRhTWVhbmluZ0l0ZW1cIiwgZnVuY3Rpb24gZnJvbUpTT05WYWx1ZSh2YWx1ZTphbnkpOmFueSB7XHJcblx0Ly9cdHZhciBuZXdNZWFuaW5nSXRlbSA9IG5ldyBNZXRyaWNNZXRhTWVhbmluZ0l0ZW0oKTtcclxuXHQvL1x0bmV3TWVhbmluZ0l0ZW0uZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XHJcblx0Ly9cdHJldHVybiBuZXdNZWFuaW5nSXRlbTtcclxuXHR9KTtcclxuXHRFSlNPTi5hZGRUeXBlKFwiTWV0cmljTWV0YU1lYW5pbmdcIiwgZnVuY3Rpb24gZnJvbUpTT05WYWx1ZSh2YWx1ZTphbnkpOmFueSB7XHJcblx0Ly9cdHZhciBuZXdNZXRyaWNNZWFuaW5nID0gbmV3IE1ldHJpY01ldGFNZWFuaW5nKCk7XHJcblx0Ly9cdG5ld01ldHJpY01lYW5pbmcuZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XHJcblx0Ly9cdHJldHVybiBuZXdNZXRyaWNNZWFuaW5nO1xyXG5cdH0pO1xyXG5cdEVKU09OLmFkZFR5cGUoXCJNZXRyaWNNZXRhXCIsIGZ1bmN0aW9uIGZyb21KU09OVmFsdWUodmFsdWU6YW55KTphbnkge1xyXG5cdC8vXHR2YXIgbmV3TWV0cmljTWVhbmluZyA9IG5ldyBNZXRyaWNNZXRhKCk7XHJcblx0Ly9cdG5ld01ldHJpY01lYW5pbmcuZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XHJcblx0Ly9cdHJldHVybiBuZXdNZXRyaWNNZWFuaW5nO1xyXG5cdH0pO1xyXG5cdEVKU09OLmFkZFR5cGUoXCJSZWxhdGlvbnNoaXBNZXRhRGF0YVwiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcclxuXHQvL1x0dmFyIG5ld09iamVjdCA9IG5ldyBSZWxhdGlvbnNoaXBNZXRhRGF0YSgpO1xyXG5cdC8vXHRuZXdPYmplY3QuZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XHJcblx0Ly9cdHJldHVybiBuZXdPYmplY3Q7XHJcblx0fSk7XHJcblx0RUpTT04uYWRkVHlwZShcIlJlbGF0aW9uc2hpcExhYmVsc1wiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcclxuXHQvL1x0dmFyIG5ld09iamVjdCA9IG5ldyBSZWxhdGlvbnNoaXBMYWJlbHMoKTtcclxuXHQvL1x0bmV3T2JqZWN0LmZyb21KU09OVmFsdWUodmFsdWUpO1xyXG5cdC8vXHRyZXR1cm4gbmV3T2JqZWN0O1xyXG5cdH0pO1xyXG5cdEVKU09OLmFkZFR5cGUoXCJSZWxhdGlvbnNoaXBMYWJlbFwiLCBmdW5jdGlvbiBmcm9tSlNPTlZhbHVlKHZhbHVlOmFueSk6YW55IHtcclxuXHQvL1x0dmFyIG5ld09iamVjdCA9IG5ldyBSZWxhdGlvbnNoaXBMYWJlbCgpO1xyXG5cdC8vXHRuZXdPYmplY3QuZnJvbUpTT05WYWx1ZSh2YWx1ZSk7XHJcblx0Ly9cdHJldHVybiBuZXdPYmplY3Q7XHJcblx0fSk7XHJcbn0pOyJdfQ==