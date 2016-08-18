/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>

console.log("Loading ObjectUpdateRouter.ts ...");
class ObjectUpdateStats {
	type:string;
	counter:number = 0;
}  this.ObjectUpdateStats = ObjectUpdateStats;

class ObjectUpdateRouter extends C4Object {

	private static observeRouterCount = 0;
	private static observerInstance   = null;
	private static _observing         = false;
	public  observations:Array<any>;
	private handleArray:Array<any>;
	private handleList:Array<ClassType>;
	public productHandle:any;

	get observing():boolean {
		return ObjectUpdateRouter._observing;
	}
	constructor() {
		super();
		ObjectUpdateRouter.observerInstance = this;
		this.handleArray = new Array<any>();
		if (this.handleList == null)
			this.handleList = Factory.GetClassesToObserve();
		if (this.observations == null) {
			this.observations = new Array<any>();
			for (var item in this.handleList) {
				this.observations[<string>this.handleList[item]] = new Object();
				this.observations[<string>this.handleList[item]] = ObjectUpdateRouter.CreateStatObject();
			}
		}
	}
	public static SendObjectChange(object:any) {
		var changeMessage = new ObjectChangeMessage();
	//	MyApp.ObjectRouter.observations[object.classType]["change"].counter++;
		changeMessage.object     = object;
		changeMessage.changeType = ObjectChangeType.Change;
		changeMessage.classType  = object.classType
		changeMessage.origin     = "router";
		C4Event.emit(c4e.ObjectChanged, changeMessage);
	}
	public static SendRemoveObject(id:string, classType:ClassType) {
		var changeMessage = new ObjectChangeMessage();
		//MyApp.ObjectRouter.observations[<string>classType]["remove"].counter++;
		changeMessage.object = null;
		changeMessage.changeType = ObjectChangeType.Remove;
		changeMessage.classType  = classType;
		changeMessage.origin     = "router";
		changeMessage.removeID   = id;
		C4Event.emit(c4e.ObjectChanged, changeMessage);
	}
	public static SendAddObject(object:any) {
		var changeMessage = new ObjectChangeMessage();
		//MyApp.ObjectRouter.observations[object.classType]["add"].counter++;
		changeMessage.object     = object;
		changeMessage.changeType = ObjectChangeType.New;
		changeMessage.classType  = object.classType
		changeMessage.origin     = "router";
		C4Event.emit(c4e.ObjectChanged, changeMessage);
	}
	public static StartObservations() : ObjectUpdateRouter {
		if (this._observing) return;
		this.observerInstance = new ObjectUpdateRouter();
		this.observerInstance.startObservations();
		return this.observerInstance;
	}
	public static StopObservations() {
		this.observerInstance.stopObserve();
	}
	public observe() {
		if (ObjectUpdateRouter._observing) return;
		this.startObservations();
	}
	public static CreateStatObject():any {
		var newObject       = new Array<ObjectUpdateStats>();
		newObject["add"]    = new ObjectUpdateStats();
		newObject["remove"] = new ObjectUpdateStats();
		newObject["change"] = new ObjectUpdateStats();
		return newObject;
	}
	public startObservations() {
		ObjectUpdateRouter.observeRouterCount++
		this.observations = new Array<any>();
		for (var item in this.handleList) {
			console.log("Observing Class "+this.handleList[item])
			this.observeClass(this.handleList[item])
		}
		ObjectUpdateRouter._observing = true;
	}
	public observeClass(classType:ClassType) {
		var objectProxy = Factory.CreateProxyInstance(classType);
		VideoApp.assert(objectProxy != null, "Expected A Proxy and Got Null for classType = " + classType, new Error());
		var query = objectProxy.observe();
		VideoApp.assert(query != null, "Error Starting Observation = " + classType, new Error());
		this.handleArray[<string>classType] =
			query.observeChanges({
				added  : function (id, fields) {
							var theObject = Factory.CreateProxyInstance(classType).getOne(id);
				            ObjectUpdateRouter.SendAddObject(theObject);
			                },
			    changed : function (id, fields) {
				            var object = Factory.CreateProxyInstance(classType).getOne(id);
				            ObjectUpdateRouter.SendObjectChange(object);
			                },
			    removed : function (id) {
				            UI.Info("Remove ---"+classType);
				            ObjectUpdateRouter.SendRemoveObject(id, classType) }
		                    })
	}
	public stopObserve() {
		if (!ObjectUpdateRouter._observing) return;
		ObjectUpdateRouter.observeRouterCount--;
		for (var observations in this.handleArray) {
			this.handleArray[observations].stop();
		}
		ObjectUpdateRouter._observing = false;
	}
	destructor() {
		if (!ObjectUpdateRouter._observing) return;
		this.stopObserve();
	}
}
this.ObjectUpdateRouter = ObjectUpdateRouter;
