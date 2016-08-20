/// <reference path="../typescript-defs/all-definitions.d.ts"/>
console.log("Loading TimeMachine.ts ...");
//endregion
var TimeMachineClass = (function () {
    function TimeMachineClass() {
        this.objectCount = 0;
        this.checkPointPrefix = "Time Machine Checkpoint ";
        this.versionDate = Date();
        this.versionID = Random.id();
    }
    TimeMachineClass.prototype.restore = function (id) {
        Meteor.call("loadTimeMachine", id);
    };
    TimeMachineClass.prototype.getVersion = function () {
        return "Version ID = " + this.versionID + " Date = " + this.getDate().toLocaleDateString;
    };
    TimeMachineClass.prototype.getDate = function () {
        return this.versionDate;
    };
    TimeMachineClass.prototype.getVersionName = function () {
        return this.checkPointPrefix + this.getDate().toDateString() + " " + this.getDate().toTimeString();
    };
    TimeMachineClass.prototype.Checkpoint = function () {
        Meteor.call("checkpointTimeMachine");
    };
    TimeMachineClass.prototype.checkPointServer = function (checkPointPrefix) {
        /*
           if (checkPointPrefix) {
               this.checkPointPrefix = checkPointPrefix
           }
           AppLog.info("Time Machine SaveAll Called = " + this.getVersion());
           try {
               this.jsonArray = new Array<any>();
               for (var item in Factory.collectionArray) {
                   var objectSpec = (Factory.collectionArray[item]);
                   if (objectSpec.timeCapsule) {
                       this.pushCollection(objectSpec.classType);
                   }
               }
               var capsuleString:string = EJSON.stringify(VideoApp.EJSONcast(this.jsonArray));
               var timeMachineProxy:any = Factory.CreateProxyInstance(ClassType.TIME_MACHINE);
               this.versionDate = new Date();
               var checkPointObject:any = {
                   name: this.getVersionName(),
                   versionID       : this.versionID,
                   objectCount     : this.objectCount,
                   date: this.versionDate,
                   jsonArray: capsuleString
               };
               timeMachineProxy.addNewObject(checkPointObject);
           } catch (e) { AppLog.error("Error While Saving All in TimeMachine", e);}
           */
    };
    TimeMachineClass.prototype.pushCollection = function (classType) {
        try {
            var objectProxy = Factory.CreateProxyInstance(classType);
            var records = objectProxy.getList(false);
            this.objectCount += records.length;
            // var stringy = EJSON.stringify(records);
            this.jsonArray.push({ classType: classType, records: records });
        }
        catch (e) {
            AppLog.error("Error Pushing Collection for ClassType = " + classType, e);
        }
    };
    TimeMachineClass.prototype.restoreServer = function (id) {
        AppLog.info("TimeMachine RestoreAll Called with ID = " + id);
        this.checkPointServer("Checkpoint B4 restore ");
        this.CleanDB();
        // var timeMachineProxy = Factory.CreateProxyInstance(ClassType.TIME_MACHINE);
        AppLog.info("Time Machine Getting Capsule to restore");
        try {
            this.capsule = timeMachineProxy.getOne(id);
        }
        catch (e) {
            AppLog.error("Error Getting TimeMachine Capsule for id = " + id, e);
        }
        if (!this.capsule) {
            AppLog.error("Could Not Find TimeMachine Capsule for ID " + id);
            return;
        }
        this.capsuleArray = EJSON.parse(this.capsule.jsonArray);
        AppLog.info("Time Machine Loading Capsule Collections");
        for (var i = 0; i < this.capsuleArray.length; i++) {
            this.popCollection(this.capsuleArray[i]);
        }
    };
    TimeMachineClass.prototype.popCollection = function (theRecord) {
        var objectProxy = Factory.CreateProxyInstance(theRecord.classType);
        AppLog.info("Time Machine Restoring Collection for " + theRecord.classType);
        var classType = theRecord.classType;
        if (!objectProxy) {
            AppLog.error("Could Not Find Collection for Class = " + classType);
            return;
        }
        for (var i = 0; i < theRecord.records.length; i++) {
            try {
                objectProxy.restoreObject(theRecord.records[i]);
            }
            catch (e) {
                AppLog.error("Time Machine Error Inserting Object", e, theRecord.records[i]);
            }
        }
    };
    TimeMachineClass.prototype.CleanDB = function () {
        Meteor.call("cleanDB");
    };
    TimeMachineClass.prototype.cleanDBServer = function () {
        AppLog.record("Cleaning Database From Server", new Error(), null);
        this.checkPointServer("CleanDB CheckPoint ");
        for (var item in Factory.collectionArray) {
            var objectSpec = Factory.collectionArray[item];
            if (objectSpec.timeCapsule) {
                var objectProxy = Factory.CreateProxyInstance(objectSpec.classType);
                objectProxy.removeAll();
            }
        }
    };
    return TimeMachineClass;
}());
this.TimeMachineClass = TimeMachineClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZU1hY2hpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUaW1lTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFJL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBc0IxQyxXQUFXO0FBRVg7SUFVSTtRQUhPLGdCQUFXLEdBQVUsQ0FBQyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFVLDBCQUEwQixDQUFDO1FBR3hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLGtDQUFPLEdBQWQsVUFBZSxFQUFTO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLHFDQUFVLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7SUFDN0YsQ0FBQztJQUNNLGtDQUFPLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBQ00seUNBQWMsR0FBckI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZHLENBQUM7SUFDTSxxQ0FBVSxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ00sMkNBQWdCLEdBQXZCLFVBQXdCLGdCQUF3QjtRQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQXlCSztJQUNOLENBQUM7SUFDTSx5Q0FBYyxHQUFyQixVQUFzQixTQUFtQjtRQUNyQyxJQUFJLENBQUM7WUFDRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDbkMsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLEdBQUcsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzVFLENBQUM7SUFDTCxDQUFDO0lBQ00sd0NBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQiw4RUFBOEU7UUFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QyxDQUFDO0lBQ0wsQ0FBQztJQUNNLHdDQUFhLEdBQXBCLFVBQXFCLFNBQWE7UUFDOUIsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMzRSxJQUFJLFNBQVMsR0FBYSxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUM7Z0JBQ0QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQztRQUNqRyxDQUFDO0lBQ0wsQ0FBQztJQUNNLGtDQUFPLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDTSx3Q0FBYSxHQUFwQjtRQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsK0JBQStCLEVBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLFVBQVUsR0FBRSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDNUIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBdkhELElBdUhDO0FBQUEsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cclxuXHJcblxyXG5cclxuY29uc29sZS5sb2coXCJMb2FkaW5nIFRpbWVNYWNoaW5lLnRzIC4uLlwiKTtcclxuXHJcbi8vcmVnaW9uIEdsb2JhbCBWYXJpYWJsZSBEZWNsYXJhdGlvbnNcclxuZGVjbGFyZSB2YXIgVGltZU1hY2hpbmVTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT47XHJcbmRlY2xhcmUgdmFyIENhcGFiaWxpdHlTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT47XHJcbmRlY2xhcmUgdmFyIERpbWVuc2lvblN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBUYXNrU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbmRlY2xhcmUgdmFyIFNjZW5hcmlvU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbmRlY2xhcmUgdmFyIFByb2R1Y3RTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT5cclxuZGVjbGFyZSB2YXIgR29hbFN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBNZXRyaWNTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT5cclxuZGVjbGFyZSB2YXIgTWFwOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBBc3NldFN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBGb2xkZXJTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT5cclxuZGVjbGFyZSB2YXIgTGlicmFyeVN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBGZWF0dXJlU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbmRlY2xhcmUgdmFyIEluaXRpYXRpdmVTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT5cclxuZGVjbGFyZSB2YXIgVGFza0RlcGVuZGVuY3lTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT5cclxuZGVjbGFyZSB2YXIgTWV0cmljVHlwZVN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBBc3NldENhdGVnb3J5U3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbmRlY2xhcmUgdmFyIFByb2R1Y3RDYXRlZ29yeVN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5kZWNsYXJlIHZhciBEaWFncmFtU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbi8vZW5kcmVnaW9uXHJcblxyXG5jbGFzcyBUaW1lTWFjaGluZUNsYXNzIHtcclxuXHJcbiAgICBwdWJsaWMgdmVyc2lvbklEOnN0cmluZztcclxuICAgIHB1YmxpYyB2ZXJzaW9uRGF0ZTphbnk7XHJcbiAgICBwdWJsaWMganNvbkFycmF5IDogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyBjYXBzdWxlIDogYW55O1xyXG4gICAgcHVibGljIGNhcHN1bGVBcnJheSA6IGFueTtcclxuICAgIHB1YmxpYyBvYmplY3RDb3VudDpudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGNoZWNrUG9pbnRQcmVmaXg6c3RyaW5nID0gXCJUaW1lIE1hY2hpbmUgQ2hlY2twb2ludCBcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZlcnNpb25EYXRlID0gRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudmVyc2lvbklEID0gUmFuZG9tLmlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc3RvcmUoaWQ6c3RyaW5nKSB7XHJcbiAgICAgICAgTWV0ZW9yLmNhbGwoXCJsb2FkVGltZU1hY2hpbmVcIiwgaWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFZlcnNpb24oKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlZlcnNpb24gSUQgPSBcIiArIHRoaXMudmVyc2lvbklEICsgXCIgRGF0ZSA9IFwiICsgdGhpcy5nZXREYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldERhdGUoKTogRGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbkRhdGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmVyc2lvbk5hbWUoKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrUG9pbnRQcmVmaXggKyB0aGlzLmdldERhdGUoKS50b0RhdGVTdHJpbmcoKSArIFwiIFwiICsgdGhpcy5nZXREYXRlKCkudG9UaW1lU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ2hlY2twb2ludCgpIHtcclxuICAgICAgICBNZXRlb3IuY2FsbChcImNoZWNrcG9pbnRUaW1lTWFjaGluZVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjaGVja1BvaW50U2VydmVyKGNoZWNrUG9pbnRQcmVmaXg/OnN0cmluZykge1xyXG4gICAgIC8qXHJcbiAgICAgICAgaWYgKGNoZWNrUG9pbnRQcmVmaXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1BvaW50UHJlZml4ID0gY2hlY2tQb2ludFByZWZpeFxyXG4gICAgICAgIH1cclxuICAgICAgICBBcHBMb2cuaW5mbyhcIlRpbWUgTWFjaGluZSBTYXZlQWxsIENhbGxlZCA9IFwiICsgdGhpcy5nZXRWZXJzaW9uKCkpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuanNvbkFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdFNwZWMgPSAoRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXlbaXRlbV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdFNwZWMudGltZUNhcHN1bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hDb2xsZWN0aW9uKG9iamVjdFNwZWMuY2xhc3NUeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY2Fwc3VsZVN0cmluZzpzdHJpbmcgPSBFSlNPTi5zdHJpbmdpZnkoVmlkZW9BcHAuRUpTT05jYXN0KHRoaXMuanNvbkFycmF5KSk7XHJcbiAgICAgICAgICAgIHZhciB0aW1lTWFjaGluZVByb3h5OmFueSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShDbGFzc1R5cGUuVElNRV9NQUNISU5FKTtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVja1BvaW50T2JqZWN0OmFueSA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZ2V0VmVyc2lvbk5hbWUoKSxcclxuICAgICAgICAgICAgICAgIHZlcnNpb25JRCAgICAgICA6IHRoaXMudmVyc2lvbklELFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0Q291bnQgICAgIDogdGhpcy5vYmplY3RDb3VudCxcclxuICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMudmVyc2lvbkRhdGUsXHJcbiAgICAgICAgICAgICAgICBqc29uQXJyYXk6IGNhcHN1bGVTdHJpbmdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGltZU1hY2hpbmVQcm94eS5hZGROZXdPYmplY3QoY2hlY2tQb2ludE9iamVjdCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBBcHBMb2cuZXJyb3IoXCJFcnJvciBXaGlsZSBTYXZpbmcgQWxsIGluIFRpbWVNYWNoaW5lXCIsIGUpO31cclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgcHVibGljIHB1c2hDb2xsZWN0aW9uKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0UHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UoY2xhc3NUeXBlKTtcclxuICAgICAgICAgICAgdmFyIHJlY29yZHMgPSBvYmplY3RQcm94eS5nZXRMaXN0KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RDb3VudCArPSByZWNvcmRzLmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gdmFyIHN0cmluZ3kgPSBFSlNPTi5zdHJpbmdpZnkocmVjb3Jkcyk7XHJcbiAgICAgICAgICAgIHRoaXMuanNvbkFycmF5LnB1c2goe2NsYXNzVHlwZTogY2xhc3NUeXBlLCByZWNvcmRzOiByZWNvcmRzfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBBcHBMb2cuZXJyb3IoXCJFcnJvciBQdXNoaW5nIENvbGxlY3Rpb24gZm9yIENsYXNzVHlwZSA9IFwiICsgY2xhc3NUeXBlLCBlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZXN0b3JlU2VydmVyKGlkOnN0cmluZykge1xyXG4gICAgICAgIEFwcExvZy5pbmZvKFwiVGltZU1hY2hpbmUgUmVzdG9yZUFsbCBDYWxsZWQgd2l0aCBJRCA9IFwiICsgaWQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQb2ludFNlcnZlcihcIkNoZWNrcG9pbnQgQjQgcmVzdG9yZSBcIik7XHJcbiAgICAgICAgdGhpcy5DbGVhbkRCKCk7XHJcbiAgICAgICAvLyB2YXIgdGltZU1hY2hpbmVQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShDbGFzc1R5cGUuVElNRV9NQUNISU5FKTtcclxuICAgICAgICBBcHBMb2cuaW5mbyhcIlRpbWUgTWFjaGluZSBHZXR0aW5nIENhcHN1bGUgdG8gcmVzdG9yZVwiKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmNhcHN1bGUgPSB0aW1lTWFjaGluZVByb3h5LmdldE9uZShpZCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgQXBwTG9nLmVycm9yKFwiRXJyb3IgR2V0dGluZyBUaW1lTWFjaGluZSBDYXBzdWxlIGZvciBpZCA9IFwiICsgaWQsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY2Fwc3VsZSkge1xyXG4gICAgICAgICAgICBBcHBMb2cuZXJyb3IoXCJDb3VsZCBOb3QgRmluZCBUaW1lTWFjaGluZSBDYXBzdWxlIGZvciBJRCBcIiArIGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhcHN1bGVBcnJheSA9IEVKU09OLnBhcnNlKHRoaXMuY2Fwc3VsZS5qc29uQXJyYXkpO1xyXG4gICAgICAgIEFwcExvZy5pbmZvKFwiVGltZSBNYWNoaW5lIExvYWRpbmcgQ2Fwc3VsZSBDb2xsZWN0aW9uc1wiKTtcclxuICAgICAgICBmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLmNhcHN1bGVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBvcENvbGxlY3Rpb24odGhpcy5jYXBzdWxlQXJyYXlbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHBvcENvbGxlY3Rpb24odGhlUmVjb3JkOmFueSkge1xyXG4gICAgICAgIHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGVSZWNvcmQuY2xhc3NUeXBlKTtcclxuICAgICAgICBBcHBMb2cuaW5mbyhcIlRpbWUgTWFjaGluZSBSZXN0b3JpbmcgQ29sbGVjdGlvbiBmb3IgXCIgKyB0aGVSZWNvcmQuY2xhc3NUeXBlKVxyXG4gICAgICAgIHZhciBjbGFzc1R5cGU6Q2xhc3NUeXBlID0gdGhlUmVjb3JkLmNsYXNzVHlwZTtcclxuICAgICAgICBpZiAoIW9iamVjdFByb3h5KSB7XHJcbiAgICAgICAgICAgIEFwcExvZy5lcnJvcihcIkNvdWxkIE5vdCBGaW5kIENvbGxlY3Rpb24gZm9yIENsYXNzID0gXCIgKyBjbGFzc1R5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoZVJlY29yZC5yZWNvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RQcm94eS5yZXN0b3JlT2JqZWN0KHRoZVJlY29yZC5yZWNvcmRzW2ldKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyBBcHBMb2cuZXJyb3IoXCJUaW1lIE1hY2hpbmUgRXJyb3IgSW5zZXJ0aW5nIE9iamVjdFwiLCBlLCB0aGVSZWNvcmQucmVjb3Jkc1tpXSk7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ2xlYW5EQigpIHtcclxuICAgICAgICBNZXRlb3IuY2FsbChcImNsZWFuREJcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYW5EQlNlcnZlcigpIHtcclxuICAgICAgICBBcHBMb2cucmVjb3JkKFwiQ2xlYW5pbmcgRGF0YWJhc2UgRnJvbSBTZXJ2ZXJcIiwgbmV3IEVycm9yKCksIG51bGwpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQb2ludFNlcnZlcihcIkNsZWFuREIgQ2hlY2tQb2ludCBcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0U3BlYz0gRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXlbaXRlbV07XHJcbiAgICAgICAgICAgIGlmIChvYmplY3RTcGVjLnRpbWVDYXBzdWxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0UHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2Uob2JqZWN0U3BlYy5jbGFzc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0UHJveHkucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn10aGlzLlRpbWVNYWNoaW5lQ2xhc3MgPSBUaW1lTWFjaGluZUNsYXNzOyJdfQ==