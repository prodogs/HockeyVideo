/// <reference path="../typescript-defs/all-definitions.d.ts"/>
/// <reference path="./SystemHealth.ts"/>


/*
 table structure
 result, check , classType, message, id1, id2, type1, type2
 */

class ConsistencyChecker extends C4Object {

    public resultList:Array<any>;

    constructor() {
        super();
        this.resultList = new Array<any>();
    }

    public start() {
        var results = this.healthCheck();9
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
    public pushResult(result, name, classType, checker, object1, object2, id1, id2, type1, type2, description) {
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
        }
        this.resultList.push(row);
    }
    public healthCheck():any {
        var results = this.checkRelationships();
        var errors = 0;
        var records = 0;
        for (var item in results) {
            if (results[item]["result"] != "OK")
                errors++;
            records++;
        }
        return {data: results, errors: errors, records: records}
    }
    public checkRelationships(cleanUp:boolean = false) {
        this.checkMaps(cleanUp);

        return this.resultList;
    }
    public checkMaps(cleanUp:boolean = false) {
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


    
}this.ConsistencyChecker = ConsistencyChecker;