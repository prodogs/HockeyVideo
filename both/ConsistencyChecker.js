/// <reference path="../typescript-defs/all-definitions.d.ts"/>
/// <reference path="./SystemHealth.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 table structure
 result, check , classType, message, id1, id2, type1, type2
 */
var ConsistencyChecker = (function (_super) {
    __extends(ConsistencyChecker, _super);
    function ConsistencyChecker() {
        _super.call(this);
        this.resultList = new Array();
    }
    ConsistencyChecker.prototype.start = function () {
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
    };
    ConsistencyChecker.prototype.pushResult = function (result, name, classType, checker, object1, object2, id1, id2, type1, type2, description) {
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
    };
    ConsistencyChecker.prototype.healthCheck = function () {
        var results = this.checkRelationships();
        var errors = 0;
        var records = 0;
        for (var item in results) {
            if (results[item]["result"] != "OK")
                errors++;
            records++;
        }
        return { data: results, errors: errors, records: records };
    };
    ConsistencyChecker.prototype.checkRelationships = function (cleanUp) {
        if (cleanUp === void 0) { cleanUp = false; }
        this.checkMaps(cleanUp);
        return this.resultList;
    };
    ConsistencyChecker.prototype.checkMaps = function (cleanUp) {
        if (cleanUp === void 0) { cleanUp = false; }
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
    };
    return ConsistencyChecker;
}(C4Object));
this.ConsistencyChecker = ConsistencyChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc2lzdGVuY3lDaGVja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29uc2lzdGVuY3lDaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRDtBQUMvRCx5Q0FBeUM7Ozs7OztBQUd6Qzs7O0dBR0c7QUFFSDtJQUFpQyxzQ0FBUTtJQUlyQztRQUNJLGlCQUFPLENBQUM7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7SUFDdkMsQ0FBQztJQUVNLGtDQUFLLEdBQVo7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFBQSxDQUFDLENBQUE7UUFDMUM7Ozs7Ozs7Ozs7O3dDQVdnQztJQUM1QixDQUFDO0lBQ00sdUNBQVUsR0FBakIsVUFBa0IsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVc7UUFDckcsSUFBSSxHQUFHLEdBQUc7WUFDTixNQUFNLEVBQUUsTUFBTTtZQUNkLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLFdBQVc7U0FDM0IsQ0FBQTtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTSx3Q0FBVyxHQUFsQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRSxDQUFDO1lBQ2IsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQ00sK0NBQWtCLEdBQXpCLFVBQTBCLE9BQXVCO1FBQXZCLHVCQUF1QixHQUF2QixlQUF1QjtRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDTSxzQ0FBUyxHQUFoQixVQUFpQixPQUF1QjtRQUF2Qix1QkFBdUIsR0FBdkIsZUFBdUI7UUFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUE4Q0U7SUFDTixDQUFDO0lBSUwseUJBQUM7QUFBRCxDQUFDLEFBM0dELENBQWlDLFFBQVEsR0EyR3hDO0FBQUEsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1N5c3RlbUhlYWx0aC50c1wiLz5cblxuXG4vKlxuIHRhYmxlIHN0cnVjdHVyZVxuIHJlc3VsdCwgY2hlY2sgLCBjbGFzc1R5cGUsIG1lc3NhZ2UsIGlkMSwgaWQyLCB0eXBlMSwgdHlwZTJcbiAqL1xuXG5jbGFzcyBDb25zaXN0ZW5jeUNoZWNrZXIgZXh0ZW5kcyBDNE9iamVjdCB7XG5cbiAgICBwdWJsaWMgcmVzdWx0TGlzdDpBcnJheTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuaGVhbHRoQ2hlY2soKTs5XG4vKlxuICAgICAgICBpZiAocmVzdWx0cy5lcnJvcnMgPiAwKSB7XG4gICAgICAgICAgICB2YXIgaGVhbHRoID0gU3lzdGVtSGVhbHRoSW5kaWNhdG9yLkZBVEFMO1xuICAgICAgICAgICAgdmFyIHJlc3VsdE1lc3NhZ2UgPSByZXN1bHRzLmVycm9ycyArIFwiIGVycm9ycyBvdXQgb2YgXCIgKyByZXN1bHRzLnJlY29yZHMgKyBcIiBkZXRlY3RlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0TWVzc2FnZSA9IHJlc3VsdHMucmVjb3JkcyArIFwiIHN1Y2Nlc3NmdWxseSBjaGVja2VkXCI7XG4gICAgICAgICAgICBoZWFsdGggPSBTeXN0ZW1IZWFsdGhJbmRpY2F0b3IuRlVMTF9IRUFMVEg7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN5c3RlbUhlYWx0aCA9IG5ldyBTeXN0ZW1IZWFsdGgoKTtcbiAgICAgICAgc3lzdGVtSGVhbHRoLnNldEhlYWx0aChTeXN0ZW1Bc3BlY3QuQ09OU0lTVEVOQ1lfQ0hFQ0tFUiwgaGVhbHRoLCByZXN1bHRNZXNzYWdlKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0TWVzc2FnZTsgKi9cbiAgICB9XG4gICAgcHVibGljIHB1c2hSZXN1bHQocmVzdWx0LCBuYW1lLCBjbGFzc1R5cGUsIGNoZWNrZXIsIG9iamVjdDEsIG9iamVjdDIsIGlkMSwgaWQyLCB0eXBlMSwgdHlwZTIsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciByb3cgPSB7XG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgIGNsYXNzVHlwZTogY2xhc3NUeXBlLFxuICAgICAgICAgICAgY2hlY2tlcjogY2hlY2tlcixcbiAgICAgICAgICAgIG9iamVjdDE6IG9iamVjdDEsXG4gICAgICAgICAgICBvYmplY3QyOiBvYmplY3QyLFxuICAgICAgICAgICAgaWQxOiBpZDEsXG4gICAgICAgICAgICBpZDI6IGlkMixcbiAgICAgICAgICAgIHR5cGUxOiB0eXBlMSxcbiAgICAgICAgICAgIHR5cGUyOiB0eXBlMixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHB1YmxpYyBoZWFsdGhDaGVjaygpOmFueSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gdGhpcy5jaGVja1JlbGF0aW9uc2hpcHMoKTtcbiAgICAgICAgdmFyIGVycm9ycyA9IDA7XG4gICAgICAgIHZhciByZWNvcmRzID0gMDtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBpbiByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0c1tpdGVtXVtcInJlc3VsdFwiXSAhPSBcIk9LXCIpXG4gICAgICAgICAgICAgICAgZXJyb3JzKys7XG4gICAgICAgICAgICByZWNvcmRzKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtkYXRhOiByZXN1bHRzLCBlcnJvcnM6IGVycm9ycywgcmVjb3JkczogcmVjb3Jkc31cbiAgICB9XG4gICAgcHVibGljIGNoZWNrUmVsYXRpb25zaGlwcyhjbGVhblVwOmJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNoZWNrTWFwcyhjbGVhblVwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRMaXN0O1xuICAgIH1cbiAgICBwdWJsaWMgY2hlY2tNYXBzKGNsZWFuVXA6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIC8qXG4gICAgICAgLy8gdmFyIG1hcFByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKENsYXNzVHlwZS5NQVApO1xuICAgICAgICB2YXIgbWFwRW50cmllcyA9IG1hcFByb3h5LmdldExpc3QoZmFsc2UpO1xuICAgICAgICB2YXIgcmVzdWx0c0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICAgICAgdmFyIHJlc3VsdEluZGV4ID0gMDtcblxuICAgICAgICB2YXIgY29uc2lzdGVuY3lTdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgIGZvciAodmFyIGl0ZW0gaW4gbWFwRW50cmllcykge1xuICAgICAgICAgICAgdmFyIHN1YmplY3QxUHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UobWFwRW50cmllc1tpdGVtXS5tYXBPYmplY3RUeXBlMSk7XG4gICAgICAgICAgICB2YXIgc3ViamVjdDJQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShtYXBFbnRyaWVzW2l0ZW1dLm1hcE9iamVjdFR5cGUyKTtcbiAgICAgICAgICAgIHZhciBzdWJqZWN0MU9iamVjdCA9IHN1YmplY3QxUHJveHkuZ2V0T25lKG1hcEVudHJpZXNbaXRlbV0ubWFwT2JqZWN0SUQxKTtcbiAgICAgICAgICAgIHZhciBzdWJqZWN0Mk9iamVjdCA9IHN1YmplY3QyUHJveHkuZ2V0T25lKG1hcEVudHJpZXNbaXRlbV0ubWFwT2JqZWN0SUQyKTtcblxuICAgICAgICAgICAgdmFyIGNoZWNrZXIgPSBcIk1hcCBDaGVja2VyXCI7XG4gICAgICAgICAgICB2YXIgb2JqZWN0MSA9IFwiT0tcIjtcbiAgICAgICAgICAgIHZhciBvYmplY3QyID0gXCJPS1wiO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiT0tcIjtcblxuICAgICAgICAgICAgaWYgKCggbWFwRW50cmllc1tpdGVtXS5tYXBPYmplY3RJRDEgIT0gXCIwXCIgJiYgc3ViamVjdDFPYmplY3QgPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICBjb25zaXN0ZW5jeVN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG9iamVjdDEgPSBcIk5vdCBGb3VuZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViamVjdDJPYmplY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9iamVjdDIgPSBcIk5vdCBGb3VuZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iamVjdDEgIT0gXCJPS1wiIHx8IG9iamVjdDIgIT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc2lzdGVuY3lTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIkZhaWxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIk9LXCI7XG5cbiAgICAgICAgICAgIHZhciBuYW1lID0gbWFwRW50cmllc1tpdGVtXVtcIm5hbWVcIl07XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBtYXBFbnRyaWVzW2l0ZW1dW1wiZGVzY3JpcHRpb25cIl07XG4gICAgICAgICAgICB2YXIgdHlwZTEgPSBtYXBFbnRyaWVzW2l0ZW1dW1wibWFwT2JqZWN0VHlwZTFcIl07XG4gICAgICAgICAgICB2YXIgaWQxID0gbWFwRW50cmllc1tpdGVtXVtcIm1hcE9iamVjdElEMVwiXTtcbiAgICAgICAgICAgIHZhciB0eXBlMiA9IG1hcEVudHJpZXNbaXRlbV1bXCJtYXBPYmplY3RUeXBlMlwiXTtcbiAgICAgICAgICAgIHZhciBpZDIgPSBtYXBFbnRyaWVzW2l0ZW1dW1wibWFwT2JqZWN0SUQyXCJdO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IFwiT0tcIiAmJiBjbGVhblVwKSB7XG4gICAgICAgICAgICAgICAgY29uc2lzdGVuY3lTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtYXBQcm94eS5yZW1vdmUobWFwRW50cmllc1tpdGVtXS5faWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wdXNoUmVzdWx0KHJlc3VsdCwgbmFtZSwgQ2xhc3NUeXBlLk1BUCwgY2hlY2tlciwgb2JqZWN0MSwgb2JqZWN0MiwgaWQxLCBpZDIsIHR5cGUxLCB0eXBlMiwgZGVzY3JpcHRpb24pXG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICB9XG5cblxuICAgIFxufXRoaXMuQ29uc2lzdGVuY3lDaGVja2VyID0gQ29uc2lzdGVuY3lDaGVja2VyOyJdfQ==