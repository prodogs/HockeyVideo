console.log("Loading TimeMachine.ts ...");

//region Global Variable Declarations
declare var TimeMachineStore:Mongo.Collection<any>;
declare var CapabilityStore:Mongo.Collection<any>;
declare var DimensionStore:Mongo.Collection<any>
declare var TaskStore:Mongo.Collection<any>
declare var ScenarioStore:Mongo.Collection<any>
declare var ProductStore:Mongo.Collection<any>
declare var GoalStore:Mongo.Collection<any>
declare var MetricStore:Mongo.Collection<any>
declare var Map:Mongo.Collection<any>
declare var AssetStore:Mongo.Collection<any>
declare var FolderStore:Mongo.Collection<any>
declare var LibraryStore:Mongo.Collection<any>
declare var FeatureStore:Mongo.Collection<any>
declare var InitiativeStore:Mongo.Collection<any>
declare var TaskDependencyStore:Mongo.Collection<any>
declare var MetricTypeStore:Mongo.Collection<any>
declare var AssetCategoryStore:Mongo.Collection<any>
declare var ProductCategoryStore:Mongo.Collection<any>
declare var DiagramStore:Mongo.Collection<any>
//endregion

class TimeMachineClass {

    public versionID:string;
    public versionDate:any;
    public jsonArray : Array<any>;
    public capsule : any;
    public capsuleArray : any;
    public objectCount:number = 0;
    public checkPointPrefix:string = "Time Machine Checkpoint ";

    constructor() {
        this.versionDate = Date();
        this.versionID = Random.id();
    }

    public restore(id:string) {
        Meteor.call("loadTimeMachine", id);
    }
    public getVersion():string {
        return "Version ID = " + this.versionID + " Date = " + this.getDate().toLocaleDateString;
    }
    public getDate(): Date {
        return this.versionDate;
    }
    public getVersionName():string {
        return this.checkPointPrefix + this.getDate().toDateString() + " " + this.getDate().toTimeString();
    }
    public Checkpoint() {
        Meteor.call("checkpointTimeMachine");
    }
    public checkPointServer(checkPointPrefix?:string) {
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
    }
    public pushCollection(classType:ClassType) {
        try {
            var objectProxy = Factory.CreateProxyInstance(classType);
            var records = objectProxy.getList(false);
            this.objectCount += records.length;
            // var stringy = EJSON.stringify(records);
            this.jsonArray.push({classType: classType, records: records});
        } catch (e) {
            AppLog.error("Error Pushing Collection for ClassType = " + classType, e)
        }
    }
    public restoreServer(id:string) {
        /*
        AppLog.info("TimeMachine RestoreAll Called with ID = " + id);
        this.checkPointServer("Checkpoint B4 restore ");
        this.CleanDB();
       var timeMachineProxy = Factory.CreateProxyInstance(ClassType.TIME_MACHINE);
        AppLog.info("Time Machine Getting Capsule to restore");
        try {
            this.capsule = timeMachineProxy.getOne(id);

        } catch (e) {
            AppLog.error("Error Getting TimeMachine Capsule for id = " + id, e);
        }
        if (!this.capsule) {
            AppLog.error("Could Not Find TimeMachine Capsule for ID " + id);
            return;
        }
        this.capsuleArray = EJSON.parse(this.capsule.jsonArray);
        AppLog.info("Time Machine Loading Capsule Collections");
        for (var i:number = 0; i < this.capsuleArray.length; i++) {
            this.popCollection(this.capsuleArray[i])
        }
        */
    }
    public popCollection(theRecord:any) {
        var objectProxy = Factory.CreateProxyInstance(theRecord.classType);
        AppLog.info("Time Machine Restoring Collection for " + theRecord.classType)
        var classType:ClassType = theRecord.classType;
        if (!objectProxy) {
            AppLog.error("Could Not Find Collection for Class = " + classType);
            return;
        }
        for (var i:number = 0; i < theRecord.records.length; i++) {
            try {
                objectProxy.restoreObject(theRecord.records[i]);
            } catch (e) { AppLog.error("Time Machine Error Inserting Object", e, theRecord.records[i]); }
        }
    }
    public CleanDB() {
        Meteor.call("cleanDB");
    }
    public cleanDBServer() {
        AppLog.record("Cleaning Database From Server", new Error(), null);
        this.checkPointServer("CleanDB CheckPoint ");
        for (var item in Factory.collectionArray) {
            var objectSpec= Factory.collectionArray[item];
            if (objectSpec.timeCapsule) {
                var objectProxy = Factory.CreateProxyInstance(objectSpec.classType);
                objectProxy.removeAll();
            }
        }
    }

}this.TimeMachineClass = TimeMachineClass;
