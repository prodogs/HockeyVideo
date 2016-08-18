/// <reference path="../typescript-defs/all-definitions.d.ts"/>
/// <reference path="./SystemHealth.ts"/>
/*
 table structure
 result, check , classType, message, id1, id2, type1, type2
 */
class ConsistencyChecker extends C4Object {
    constructor() {
        super();
        this.resultList = new Array();
    }
    start() {
        var results = this.healthCheck();
        9;
        /*
                if (results.errors > 0) {
                    var health = SystemHealthIndicator.FATAL;
                    var resultMessage = results.errors + " errors out of " + results.records + " detected";
                } else {
                    resultMessage = results.records + " successfully checked";
                    health = SystemHealthIndicator.FULL_HEALTH;
                }
                var systemHealth = new SystemHealth();
                systemHealth.setHealth(SystemAspect.CONSISTENCY_CHECKER, health, resultMessage);
        
                return resultMessage; */
    }
    pushResult(result, name, classType, checker, object1, object2, id1, id2, type1, type2, description) {
        var row = {
            result: result,
            classType: classType,
            checker: checker,
            object1: object1,
            object2: object2,
            id1: id1,
            id2: id2,
            type1: type1,
            type2: type2,
            description: description
        };
        this.resultList.push(row);
    }
    healthCheck() {
        var results = this.checkRelationships();
        var errors = 0;
        var records = 0;
        for (var item in results) {
            if (results[item]["result"] != "OK")
                errors++;
            records++;
        }
        return { data: results, errors: errors, records: records };
    }
    checkRelationships(cleanUp = false) {
        this.checkMaps(cleanUp);
        return this.resultList;
    }
    checkMaps(cleanUp = false) {
        /*
       // var mapProxy = Factory.CreateProxyInstance(ClassType.MAP);
        var mapEntries = mapProxy.getList(false);
        var resultsArray = new Array<any>();
        var resultIndex = 0;

        var consistencyStatus = true;

        for (var item in mapEntries) {
            var subject1Proxy = Factory.CreateProxyInstance(mapEntries[item].mapObjectType1);
            var subject2Proxy = Factory.CreateProxyInstance(mapEntries[item].mapObjectType2);
            var subject1Object = subject1Proxy.getOne(mapEntries[item].mapObjectID1);
            var subject2Object = subject2Proxy.getOne(mapEntries[item].mapObjectID2);

            var checker = "Map Checker";
            var object1 = "OK";
            var object2 = "OK";
            var result = "OK";

            if (( mapEntries[item].mapObjectID1 != "0" && subject1Object == null)) {
                consistencyStatus = false;
                object1 = "Not Found"
            }
            if (subject2Object == null) {
                object2 = "Not Found";
            }
            if (object1 != "OK" || object2 != "OK") {
                consistencyStatus = false;
                result = "Fail";
            }
            else
                result = "OK";

            var name = mapEntries[item]["name"];
            var description = mapEntries[item]["description"];
            var type1 = mapEntries[item]["mapObjectType1"];
            var id1 = mapEntries[item]["mapObjectID1"];
            var type2 = mapEntries[item]["mapObjectType2"];
            var id2 = mapEntries[item]["mapObjectID2"];

            if (result != "OK" && cleanUp) {
                consistencyStatus = false;
                mapProxy.remove(mapEntries[item]._id);
            }
            this.pushResult(result, name, ClassType.MAP, checker, object1, object2, id1, id2, type1, type2, description)
        }
        */
    }
}
this.ConsistencyChecker = ConsistencyChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc2lzdGVuY3lDaGVja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29uc2lzdGVuY3lDaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRDtBQUMvRCx5Q0FBeUM7QUFHekM7OztHQUdHO0FBRUgsaUNBQWlDLFFBQVE7SUFJckM7UUFDSSxPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7SUFDdkMsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFBQSxDQUFDLENBQUE7UUFDMUM7Ozs7Ozs7Ozs7O3dDQVdnQztJQUM1QixDQUFDO0lBQ00sVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXO1FBQ3JHLElBQUksR0FBRyxHQUFHO1lBQ04sTUFBTSxFQUFFLE1BQU07WUFDZCxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUE7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ00sV0FBVztRQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRSxDQUFDO1lBQ2IsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQ00sa0JBQWtCLENBQUMsT0FBTyxHQUFXLEtBQUs7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBQ00sU0FBUyxDQUFDLE9BQU8sR0FBVyxLQUFLO1FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBOENFO0lBQ04sQ0FBQztBQUlMLENBQUM7QUFBQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vU3lzdGVtSGVhbHRoLnRzXCIvPlxuXG5cbi8qXG4gdGFibGUgc3RydWN0dXJlXG4gcmVzdWx0LCBjaGVjayAsIGNsYXNzVHlwZSwgbWVzc2FnZSwgaWQxLCBpZDIsIHR5cGUxLCB0eXBlMlxuICovXG5cbmNsYXNzIENvbnNpc3RlbmN5Q2hlY2tlciBleHRlbmRzIEM0T2JqZWN0IHtcblxuICAgIHB1YmxpYyByZXN1bHRMaXN0OkFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gdGhpcy5oZWFsdGhDaGVjaygpOzlcbi8qXG4gICAgICAgIGlmIChyZXN1bHRzLmVycm9ycyA+IDApIHtcbiAgICAgICAgICAgIHZhciBoZWFsdGggPSBTeXN0ZW1IZWFsdGhJbmRpY2F0b3IuRkFUQUw7XG4gICAgICAgICAgICB2YXIgcmVzdWx0TWVzc2FnZSA9IHJlc3VsdHMuZXJyb3JzICsgXCIgZXJyb3JzIG91dCBvZiBcIiArIHJlc3VsdHMucmVjb3JkcyArIFwiIGRldGVjdGVkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRNZXNzYWdlID0gcmVzdWx0cy5yZWNvcmRzICsgXCIgc3VjY2Vzc2Z1bGx5IGNoZWNrZWRcIjtcbiAgICAgICAgICAgIGhlYWx0aCA9IFN5c3RlbUhlYWx0aEluZGljYXRvci5GVUxMX0hFQUxUSDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3lzdGVtSGVhbHRoID0gbmV3IFN5c3RlbUhlYWx0aCgpO1xuICAgICAgICBzeXN0ZW1IZWFsdGguc2V0SGVhbHRoKFN5c3RlbUFzcGVjdC5DT05TSVNURU5DWV9DSEVDS0VSLCBoZWFsdGgsIHJlc3VsdE1lc3NhZ2UpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRNZXNzYWdlOyAqL1xuICAgIH1cbiAgICBwdWJsaWMgcHVzaFJlc3VsdChyZXN1bHQsIG5hbWUsIGNsYXNzVHlwZSwgY2hlY2tlciwgb2JqZWN0MSwgb2JqZWN0MiwgaWQxLCBpZDIsIHR5cGUxLCB0eXBlMiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIHJvdyA9IHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgY2xhc3NUeXBlOiBjbGFzc1R5cGUsXG4gICAgICAgICAgICBjaGVja2VyOiBjaGVja2VyLFxuICAgICAgICAgICAgb2JqZWN0MTogb2JqZWN0MSxcbiAgICAgICAgICAgIG9iamVjdDI6IG9iamVjdDIsXG4gICAgICAgICAgICBpZDE6IGlkMSxcbiAgICAgICAgICAgIGlkMjogaWQyLFxuICAgICAgICAgICAgdHlwZTE6IHR5cGUxLFxuICAgICAgICAgICAgdHlwZTI6IHR5cGUyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0LnB1c2gocm93KTtcbiAgICB9XG4gICAgcHVibGljIGhlYWx0aENoZWNrKCk6YW55IHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSB0aGlzLmNoZWNrUmVsYXRpb25zaGlwcygpO1xuICAgICAgICB2YXIgZXJyb3JzID0gMDtcbiAgICAgICAgdmFyIHJlY29yZHMgPSAwO1xuICAgICAgICBmb3IgKHZhciBpdGVtIGluIHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzW2l0ZW1dW1wicmVzdWx0XCJdICE9IFwiT0tcIilcbiAgICAgICAgICAgICAgICBlcnJvcnMrKztcbiAgICAgICAgICAgIHJlY29yZHMrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge2RhdGE6IHJlc3VsdHMsIGVycm9yczogZXJyb3JzLCByZWNvcmRzOiByZWNvcmRzfVxuICAgIH1cbiAgICBwdWJsaWMgY2hlY2tSZWxhdGlvbnNoaXBzKGNsZWFuVXA6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tNYXBzKGNsZWFuVXApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdExpc3Q7XG4gICAgfVxuICAgIHB1YmxpYyBjaGVja01hcHMoY2xlYW5VcDpib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgLypcbiAgICAgICAvLyB2YXIgbWFwUHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UoQ2xhc3NUeXBlLk1BUCk7XG4gICAgICAgIHZhciBtYXBFbnRyaWVzID0gbWFwUHJveHkuZ2V0TGlzdChmYWxzZSk7XG4gICAgICAgIHZhciByZXN1bHRzQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICB2YXIgcmVzdWx0SW5kZXggPSAwO1xuXG4gICAgICAgIHZhciBjb25zaXN0ZW5jeVN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBtYXBFbnRyaWVzKSB7XG4gICAgICAgICAgICB2YXIgc3ViamVjdDFQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShtYXBFbnRyaWVzW2l0ZW1dLm1hcE9iamVjdFR5cGUxKTtcbiAgICAgICAgICAgIHZhciBzdWJqZWN0MlByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKG1hcEVudHJpZXNbaXRlbV0ubWFwT2JqZWN0VHlwZTIpO1xuICAgICAgICAgICAgdmFyIHN1YmplY3QxT2JqZWN0ID0gc3ViamVjdDFQcm94eS5nZXRPbmUobWFwRW50cmllc1tpdGVtXS5tYXBPYmplY3RJRDEpO1xuICAgICAgICAgICAgdmFyIHN1YmplY3QyT2JqZWN0ID0gc3ViamVjdDJQcm94eS5nZXRPbmUobWFwRW50cmllc1tpdGVtXS5tYXBPYmplY3RJRDIpO1xuXG4gICAgICAgICAgICB2YXIgY2hlY2tlciA9IFwiTWFwIENoZWNrZXJcIjtcbiAgICAgICAgICAgIHZhciBvYmplY3QxID0gXCJPS1wiO1xuICAgICAgICAgICAgdmFyIG9iamVjdDIgPSBcIk9LXCI7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJPS1wiO1xuXG4gICAgICAgICAgICBpZiAoKCBtYXBFbnRyaWVzW2l0ZW1dLm1hcE9iamVjdElEMSAhPSBcIjBcIiAmJiBzdWJqZWN0MU9iamVjdCA9PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIGNvbnNpc3RlbmN5U3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgb2JqZWN0MSA9IFwiTm90IEZvdW5kXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJqZWN0Mk9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0MiA9IFwiTm90IEZvdW5kXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0MSAhPSBcIk9LXCIgfHwgb2JqZWN0MiAhPSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zaXN0ZW5jeVN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiRmFpbFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiT0tcIjtcblxuICAgICAgICAgICAgdmFyIG5hbWUgPSBtYXBFbnRyaWVzW2l0ZW1dW1wibmFtZVwiXTtcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IG1hcEVudHJpZXNbaXRlbV1bXCJkZXNjcmlwdGlvblwiXTtcbiAgICAgICAgICAgIHZhciB0eXBlMSA9IG1hcEVudHJpZXNbaXRlbV1bXCJtYXBPYmplY3RUeXBlMVwiXTtcbiAgICAgICAgICAgIHZhciBpZDEgPSBtYXBFbnRyaWVzW2l0ZW1dW1wibWFwT2JqZWN0SUQxXCJdO1xuICAgICAgICAgICAgdmFyIHR5cGUyID0gbWFwRW50cmllc1tpdGVtXVtcIm1hcE9iamVjdFR5cGUyXCJdO1xuICAgICAgICAgICAgdmFyIGlkMiA9IG1hcEVudHJpZXNbaXRlbV1bXCJtYXBPYmplY3RJRDJcIl07XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gXCJPS1wiICYmIGNsZWFuVXApIHtcbiAgICAgICAgICAgICAgICBjb25zaXN0ZW5jeVN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1hcFByb3h5LnJlbW92ZShtYXBFbnRyaWVzW2l0ZW1dLl9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnB1c2hSZXN1bHQocmVzdWx0LCBuYW1lLCBDbGFzc1R5cGUuTUFQLCBjaGVja2VyLCBvYmplY3QxLCBvYmplY3QyLCBpZDEsIGlkMiwgdHlwZTEsIHR5cGUyLCBkZXNjcmlwdGlvbilcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH1cblxuXG4gICAgXG59dGhpcy5Db25zaXN0ZW5jeUNoZWNrZXIgPSBDb25zaXN0ZW5jeUNoZWNrZXI7Il19