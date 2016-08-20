/// <reference path="../typescript-defs/all-definitions.d.ts"/>

declare var RelationshipStore:Mongo.Collection<any>
declare var MetaDataStore:Mongo.Collection<any>
declare var CounterStore:Mongo.Collection<any>
declare var MapStore:Mongo.Collection<any>

//endregion
console.log("Loading AA_BasicClass.ts ...");

class C4Object extends Object {
	private 	_id : string;
	private 	theID : string;
	public 		classType:ClassType;
	private 	_typeName : string;

	protected eventsPublished = new Array<any>();
	protected notifyEvents:Array<any>;

	public static IsArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	public static Clone(obj) {
		if (typeof window != "undefined")
			return jQuery.extend(true, {}, obj); else
			return JSON.parse(JSON.stringify(obj));
	}
	public static Hash(theString:string):number {
		var hash = 0, i, chr, len;
		if (theString.length === 0) return hash;
		for (i = 0, len = theString.length; i < len; i++) {
			chr  = theString.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}
	public static GetID(object) {
		var id = object["_id"]
		if (typeof id == "string")
			return id;
		if (typeof id == "object")
			return id._str;
		id = object["id"];
		if (typeof id === "string")
			return id;
		id = object["theID"];
		if (typeof id == "string")
			return id;
		return null;
	}
	constructor(classType?:ClassType) {
		super();
		this.classType = classType;
	}
	public getID() {
		if (this["_id"]!=null && typeof this["_id"]["_str"] === "string") return this["_id"]["_str"];
		if (this["theID"]!=null && typeof this["theID"]["_str"] === "string") return this["theID"]["_str"];
		if (typeof this["_id"] != "undefined") return this["_id"];
		if (typeof this["theID"] != "undefined") return this["theID"];
	}
	public setID(theID : string) {
		this["_id"] = theID;
		this["theID"] = theID;
	}
	public typeName() : string {
		return this._typeName;
	}
	public setTypeName(type : string) {
		this._typeName = type;
	}
	public addEventPublication(event:string) {
		this.eventsPublished.push(event);
	}
	public listen(event:string, object:any, caller?:any) {return;}
	public publish(event:string, object:any) {
		if (!this.notifyEvents || !this.notifyEvents[event]) return false;
		for (var item in this.notifyEvents[event]) {
			var publishEvent = this.notifyEvents[event][item];
			var component    = this.notifyEvents[event][item].component;
			if (this.notifyEvents[event][item].objectHandler != null) {
				component[this.notifyEvents[event][item].objectHandler](publishEvent.sendEvent, object, this);
			} else
				component.listen(publishEvent.sendEvent, object, this);
		}
	}
	public subscribe(event:string, theComponent:UIComponent, sendEvent?:string, objectMethod = null) {
		if (!sendEvent) sendEvent = event;
		if (!this.notifyEvents) {
			this.notifyEvents = new Array<any>();
		}
		if (!this.notifyEvents[event])
			this.notifyEvents[event] = new Array<any>();
		this.notifyEvents[event][theComponent.getComponentID()] = {
			component: theComponent, sendEvent: sendEvent, objectHandler: objectMethod
		};
	}
	public classLabel():string {
		return Factory.GetClassLabel(this.classType);
	}
	public classRootNode():string {
		return Factory.GetClassRootName(this.classType);
	}
	public fromJSONValue(doc:any) {
		// default implementation
		for (var properties in doc) {
			this[properties] = doc[properties];
		}

		if (typeof this["_id"] != "undefined" && typeof this["theID"]=== "undefined")
			this["theID"] = this["_id"];
	}
	public getClassName() {
		var funcNameRegex = /function (.{1,})\(/;
		var results       = (funcNameRegex).exec(this["constructor"].toString());
		return (results && results.length > 1) ? results[1] : "";
	}
	public setProperty(propertyName:string, propertyValue:any) {
		this[propertyName] = propertyValue;
	}
	public clone():any {
		if (typeof window != "undefined")
			return jQuery.extend(true, {}, this); else
			return JSON.parse(JSON.stringify(this));
	}

} this.C4Object = C4Object;

class Factory extends C4Object {

	public static stringToClass:Array<ClassType> = new Array<ClassType>();
	public static relationshipArray:Array<any>;
	public static collectionArray:Array<ClassMetaData>;

	public static Initialize() {

	//	Factory.AddStringToClass("MetricMetaStore", MetricMetaStore);
		if (Meteor.isClient) {
			try {
				Meteor.subscribe("MetaData", {
					onReady: function () {
						Factory.collectionArray = MetaDataStore.find().fetch();
						console.log("Completed Loading of Meta Data");
					}
				});
				Meteor.subscribe("Relationships",  {
					onReady: function () {
						Factory.relationshipArray = RelationshipStore.find().fetch();
						console.log("Completed Loading of Relationship");
					}
				});
			} catch (e) {
				AppLog.error("Fatal Error : Errors reading initializing MetaData ", e);
				debugger;
			}
		}
		else {
			try {
				 Factory.collectionArray = MetaDataStore.find().fetch();
				 Factory.relationshipArray = RelationshipStore.find().fetch();
			} catch (e) {
				AppLog.error("Fatal Error : Errors reading initializing MetaData ", e);
				debugger;
			}
		}

	}
	public static GetAllMeasurableSubjects() : Array<ClassMetaData> {
		var returnList = new Array<any>();
		for (var item in Factory.collectionArray) {
			if (Factory.collectionArray[item].measureable) {
				returnList.push(Factory.collectionArray[item]);
			}
		}
		return returnList;
	}
	public static IsRootClasType(classType:ClassType):boolean {
		if (Factory.GetClassFromRoot(classType) != null)
			return true;
		else
			return false;
	}
	public static IsPersistant(classType:ClassType):boolean {
		var objectSpec = Factory.GetObjectSpecs(classType);
		if (!objectSpec || !objectSpec.isPersistant)
			return false;
		return true;
	}
	public static CreateProxyInstanceTree(classType:ClassType):TreeBase {
		var objectSpecs:ClassMetaData;
		objectSpecs = Factory.GetObjectSpecs(classType);
		if (objectSpecs.structureType == ProxyClassTypes.Tree)
			return new TreeBase(classType); else if (objectSpecs.structureType == ProxyClassTypes.Map)
			return <TreeBase> new Maps(classType); else if (objectSpecs.structureType == ProxyClassTypes.Library)
			return new TreeBase(classType);
		AppLog.error("Attempt TO create tree from class that is not a tree", new Error(), classType);
		return null;
	}
	public static CreateProxyInstance(classType:ClassType):BaseClass {
		var objectSpecs = <ClassMetaData> Factory.GetObjectSpecs(classType);
		VideoApp.assert(objectSpecs != null, "Error : Got Null when trying to get proxy for class " + classType, new Error());
		var objectReturn = Factory.CreateObjectFromString(objectSpecs.proxyClassString)
		VideoApp.assert((objectReturn != null), "Error Can Not Find Object of Type = " + classType, new Error());
		return new objectReturn(classType);
	}
	public static CreateObjectInstance(classType:ClassType):Subject {
		var objectSpecs = <ClassMetaData> Factory.GetObjectSpecs(classType);
		var objectReturn = Factory.CreateObjectFromString(objectSpecs.objectClassString)
		VideoApp.assert((objectReturn != null), "Error Can Not Find Object of Type = " + classType, new Error());
		return new objectReturn(classType);
	}
	public static CreateProxyInstanceMap(classType:ClassType):Maps {
		var objectSpecs = Factory.GetObjectSpecs(classType);
		if (objectSpecs.structureType != ProxyClassTypes.Map) return
		return <Maps> Factory.CreateProxyInstance(ClassType.MAP);
	}
	public static IsFolderClass(classType:string):boolean {
		var x = classType.indexOf("_folder");
		if (x != -1) return true; else return false;
	}
	public static CreateObjectFromString(objectName:string):any {
		return Factory.stringToClass[objectName];
	}
	public static CreateInstanceFromJSON(object:any):C4Object {
		VideoApp.assert(( object.classType != null), "Can Not Create Object - classType not found")
		var metaData = Factory.GetObjectSpecs(object.classType);
		var newObject = Factory.CreateObjectInstance(object.classType);
		newObject.fromJSONValue(object);
		return newObject;
	}
	public static GetRelationshipArray():Array<RelationshipMetaData> {
		return Factory.castIt(this.relationshipArray);
	}
	public static GetRelationshipSpecs(from:ClassType, to:ClassType):RelationshipMetaData {
		var relationshipArray = Factory.GetRelationshipArray();
		for (var item in relationshipArray) {
			if (relationshipArray[item].from == from && relationshipArray[item].to == to)
				return relationshipArray[item];
			if (relationshipArray[item].from == to && relationshipArray[item].to == from)
				return relationshipArray[item];
		}
		return null;
	}
	public static GetValidRelationshipTypes(classType:ClassType):Array<ClassType> {
		var returnArray = new Array<ClassType>();
		for (var i = 0; i < Factory.relationshipArray.length; i++) {
			if (Factory.relationshipArray[i].from == classType) {
				returnArray.push(Factory.relationshipArray[i].from);
			}
		}
		return returnArray;
	}
	public static AllowRelationship(fromObject:any, toObject:any):boolean {
		var relationshipRecord = Factory.GetRelationshipSpecs(fromObject.classType, toObject.classType);
		if (!relationshipRecord) return false;
		return true;
	}
	public static RelationshipPossibilties(fromObject:any, toObject:any):RelationshipPossible {
		var returnResult       = new Array<RelationshipPossible>();
		var relationshipRecord = Factory.GetRelationshipSpecs(fromObject.classType, toObject.classType);
		if (!relationshipRecord) {
			returnResult.push(RelationshipPossible.NotAllowed);
			return RelationshipPossible.NotAllowed;
		}
		var mapProxy = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var mapList = mapProxy.getMap(fromObject._id, toObject._id);
		if (!mapList || mapList.length == 0) {
			returnResult.push(RelationshipPossible.Add);
			return RelationshipPossible.Add;
		}
		return RelationshipPossible.Replace;
	}
	public static GetMandatoryRelationships(classType:ClassType):Array<RelationshipMetaData> {
		var dependencyList = new Array<RelationshipMetaData>();
		var mandatory      = false;
		for (var i = 0; i < Factory.relationshipArray.length; i++) {
			if (Factory.relationshipArray[i].from == classType) {
				var dependency = Factory.relationshipArray[i];
				for (var j = 0; j < dependency.relationshipLabels.length; j++) {
					if (dependency.relationshipLabels[j].optional == false) {
						mandatory = true;
					}
				}
				if (mandatory == true) dependencyList.push(<any>dependency);
				mandatory = false;
			}
		}
		return dependencyList;
	}
	public static castIt(theArray:Array<any>):Array<RelationshipMetaData> {
		return theArray;
	}
	public static AddStringToClass(classString:string, theClass:ClassType):any {
		Factory.stringToClass[classString] = theClass;
	}
	public static GetObjectSpecs(classType:ClassType):ClassMetaData {
		for (var i = 0; i < Factory.collectionArray.length; i++) {
			if (Factory.collectionArray[i].classType == classType) {
				return Factory.collectionArray[i];
			}
			if (Factory.collectionArray[i].rootName == classType)
				return Factory.collectionArray[i];
		}
		AppLog.error("Error : Got Null when trying to get objectSpecs for class " + classType, new Error());
		return null;
	}
	public static GetClassIcon(classType:ClassType):string {
		var objectSpecs:ClassMetaData = Factory.GetObjectSpecs(classType);
		if (!objectSpecs) return "<span class='webix_icon fa-globe'></span>"
		return objectSpecs.htmlIcon;
	}
	public static GetClassFromRoot(rootName:ClassType):string {
		for (var i = 0; i < Factory.collectionArray.length; i++) {
			if (Factory.collectionArray[i].rootName == rootName) {
				return <string> Factory.collectionArray[i].classType
			}
		}
		return null;
	}
	public static GetClassDetail(classType:ClassType):any {
		var result = Factory.GetObjectSpecs(classType);
		if (!result) return null;
		return Factory.stringToClass[result.subjectDetail];
	}
	public static GetClassManager(classType:ClassType):any {
		var result:any = Factory.GetObjectSpecs(classType);
		if (!result) return null;
		if (!result.subjectManager) return null;
		return Factory.stringToClass[result.subjectManager];
	}
	public static GetClassLabel(classType:ClassType):string {
		var result = Factory.GetObjectSpecs(classType);
		if (!result) return null;
		return result.label;
	}
	public static GetClassRootName(classType:ClassType):string {
		var result = Factory.GetObjectSpecs(classType);
		if (!result) return null;
		return result.rootName;
	}
	public static GetCollection(classType:ClassType) {
		var objectSpecs = Factory.GetObjectSpecs(classType);
		if (!objectSpecs) return null;
		//     return this[objectSpecs.collection];
		return Factory.CreateObjectFromString(objectSpecs.collection);
	}
	public static GetClassesToObserve():Array<ClassType> {
		var classTypes = new Array<ClassType>();
		for (var i = 0; i < Factory.collectionArray.length; i++) {
			if (Factory.collectionArray[i].observeUpdates) {
				classTypes.push(Factory.collectionArray[i].classType);
			}
		}
		return classTypes;
	}
	public static IsVisibleRelationship(type1, type2):boolean {
		var theSpec = Factory.GetRelationshipSpecs(type1, type2);
		if (theSpec == null) return false;
		if (typeof theSpec.visual == "undefined") return false;
		return theSpec.visual;
	}

}this.Factory = Factory;

class BaseClass extends C4Object {

	get theCollection():Mongo.Collection<any> {
		return Factory.GetCollection(this.classType);
	}

	constructor(classType:ClassType) {
		super(classType);
		//   this.theCollection =
	}
	public static HandleCollectionErrors(error, result) {
		if (error)
			AppLog.error("Collection Error Has Occurred", error, result);
	}
	public observe(constraint?:any) {
		if (this.theCollection == null) {
			console.log(this);
		}
		return this.theCollection.find();
	}
	public addMandatoryRelationships(id:string, classType:ClassType):boolean {
		var relationshipArray = Factory.GetMandatoryRelationships(classType);
		if (relationshipArray.length == 0) return true;
		var mapProxy = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		for (var i = 0; i < relationshipArray.length; i++) {
			var relationship = relationshipArray[i];
			for (var j = 0; j < relationship.relationshipLabels.labels.length; j++) {
				if (relationship.relationshipLabels[j].optional == false) {
					var proxy = Factory.CreateProxyInstance(relationship.to);
					var newID = proxy.addNew(relationship.relationshipLabels[j].label, "");
					mapProxy.addNewMap(relationship.label, relationship.from, id, relationship.to, newID);
				}
			}
		}
	}
	public addNewObject(object:any):any {
		try {
			var newID = this.theCollection.insert(object, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("Error Inserting New Object for Class = " + this.classType, e, object);
		}
		this.addMandatoryRelationships(newID, this.classType);
		return newID;
	}
	public addNew(name:string, description?:string):string {
		if (!description) description = "none";
		var insertObject:any;
		insertObject = {name: name, description: description};
		var collection = this.theCollection
		try {
			var newID:string = collection.insert(insertObject, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("inserting into class " + this.classType, e, insertObject)
		}
		this.addMandatoryRelationships(newID, this.classType);
		return newID;
	}
	public updateName(id:string, name:string, description?:string) {
		if (!description)
			try {
				this.theCollection.update({_id: id}, {$set: {name: name}}, BaseClass.HandleCollectionErrors);
			} catch (e) {
				AppLog.error("Error Updating Name for class = " + this.classType, e, {id: id, name: name});
			} else {
			try {
				this.theCollection.update({_id: id}, {$set: {name: name, description: description}});
			} catch (e) {
				AppLog.error("Error Updating Name for class = " + this.classType, e, {id: id, name: name, description: description});
			}
		}
	}
	public updateAttribute(id:string, attribute:string, value:any) {
		var setModifier             = {$set: {}};
		setModifier.$set[attribute] = value;
		try {
			this.theCollection.update({_id: id}, setModifier, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("updateAttribute ", e, {id: id, attribute: attribute, value: value});
		}
	}
	public update(id:string, object:any) {
		var updateObject = JSON.parse(JSON.stringify(object));
		this.theCollection.update({_id: id}, {$set: updateObject}, BaseClass.HandleCollectionErrors)
	}
	public removeAll() {
		Meteor.call("removeAll", this.classType);
	}
	public removeAllServer() {
		this.theCollection.remove({}, BaseClass.HandleCollectionErrors);
	}
	public removeSet(arrayOfIds:Array<string>) {
		for (var i = 0; i < arrayOfIds.length; i++) {
			this.removeServer(arrayOfIds[i]);
		}
	}
	public remove(id:string) {
		var result = Meteor.call('removeObject', {id: id, classType: this.classType});
	}
	public removeServer(theObject:any) {
		var id = theObject.id;
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		try {
			this.theCollection.remove({_id: id}, BaseClass.HandleCollectionErrors);
			map.removeReference(id, id);
		} catch (e) {
			AppLog.error("error removing object form class = " + this.classType, e, id);
		}
	}
	public restoreObject(object):string {
		try {
			var newID = this.theCollection.insert(object, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("Error Inserting New Object for Class = " + this.classType, e, object);
		}
		return newID;
	}
	public getRelatedObjects(sourceID:string, targetType?:ClassType):Array<any> {
		var mapProxy = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var theList  = mapProxy.getRelatedObjects(sourceID, targetType);
		return theList;
	}
	public getRelatedObject(sourceID:string, targetID:string):any {
		var mapProxy  = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var theObject = mapProxy.getRelatedObject(sourceID, targetID);
		return theObject;
	}
	public get(criteria:any): Array<any> {
		try {
			var objects = this.theCollection.find(criteria).fetch();
		} catch (e) {
			AppLog.error("error finding objects for criteria " + criteria, new Error(), {criteria: criteria});
			return null;
		}
		return objects;
	}
	public getOne(id:string):any {
		try {
			var theObject = this.theCollection.findOne({_id: id});
		} catch (e) {
			AppLog.error("error getting one of type " + this.classType, e, id);
			return null;
		}
		if (typeof theObject === "undefined") theObject = null;
		return theObject;
	}
	public count():number {
		var theList = this.getList();
		return theList.length;
	}
	public getList(orderID = true) {
		try {
			var theList = this.theCollection.find().fetch();
		} catch (e) {
			AppLog.error("getList for class type " + this.classType, e);
		}
		for (var i = 0; i < theList.length; i++) {
			theList[i].value = new C4Object();
			theList[i].value = theList[i].name;
			theList[i].id    = new C4Object();
			if (orderID)
				theList[i].id = i; else
				theList[i].id = theList[i]._id;
		}
		return theList;
	}

} this.BaseClass = BaseClass;
Factory.AddStringToClass("BaseClass", BaseClass);

class Subject extends BaseClass {

	public name : string;
	public description : string;

	constructor(classType:ClassType = null) {
		super(classType)
		this.setTypeName("Subject");
	}

}this.Subject = Subject;
Factory.AddStringToClass("Subject", this.Subject);

class CounterClass extends Subject {
	public counterName:string;

	constructor(counterName:string) {
		super(ClassType.COUNTER);
		this.counterName = counterName;
	}

	public getNextIndex(counterName?:string):number {
		if (!counterName) counterName = this.counterName;
		var counterList = this.get({name: counterName});
		if (counterList.length == 0) {
			var indexId = this.addNewObject({name: counterName, index: 1});
			var index   = 1;
		} else {
			index   = counterList[0].index;
			indexId = counterList[0]._id
		}
		this.updateAttribute(indexId, "index", index + 1);
		return index;
	}

} this.CounterClass = CounterClass;
Factory.AddStringToClass("CounterClass", CounterClass);

class TreeBase extends BaseClass {
	constructor(classType:ClassType) {
		super(classType);
	}

	public addNewObject(object):string {
		var newID = super.addNewObject(object);
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		map.addNewMap("New Map", this.classType, "0", this.classType, newID);
		this.addMandatoryRelationships(newID, this.classType);
		return newID;
	}
	public addNewNode(targetObject:any, placement:string) { // REMOVE THIS
		var newID  = this.addNew("New");
		var object = this.getOne(newID);
		this.placeNewNode("New", targetObject, object, placement);
	}
	public addNew(name:string, description?:string):string {
		var newID = super.addNew(name, description);
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		map.addNewMap(name, this.classType, "0", this.classType, newID,RelationshipKey.SUBJECT_TREE);
		this.addMandatoryRelationships(newID, this.classType);
		return newID;
	}
	public updateParent(id:string, newParentID:string) {
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var oldParentID = map.getParentID(id);
		VideoApp.assert(oldParentID != null,"Failed To Get Parent for "+id,new Error(), { id : id, newParentID : newParentID });
		map.changeParent(id, oldParentID, newParentID);
	}
	public placeNewNode(name, targetObject, newObject, placement) {
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var getNewObjectParent = map.getParents(newObject._id);
		if (getNewObjectParent.length == 0 || getNewObjectParent.length > 1) {
			AppLog.error("Error Expected To Get Parent for newObject got errror", null, newObject);
			return;
		}
		var newObjectParentID = getNewObjectParent[0].mapObjectID1;
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		switch (placement) {
			case "sibling" :
			{
				var parents = map.getParents(targetObject._id);
				if (parents.length == 0) {
					AppLog.error("Error Expected Parent for Target got null ", null, targetObject);
					return;
				}
				if (parents.length > 1) {
					AppLog.error("Error expected one parent for target got multiple", null, targetObject);
					return;
				}
				map.changeParent(newObject._id, newObjectParentID, parents[0].mapObjectID1);
			}
				break;
			case "child" :
			{
				map.changeParent(newObject._id, newObjectParentID, targetObject._id);
			}
				break;
			case "root" :
			{
			}
				break;
		}
	}
	public removeServer(theObject:any) {
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		this.theCollection.remove(theObject.id);
		map.removeReference(theObject.id, theObject.id);
	}
	public remove(id:string) {
		var result = Meteor.call('removeObject', {id: id, classType: this.classType});
	}
	public removeSet(arrayOfIds:Array<string>) {
		for (var i = 0; i < arrayOfIds.length; i++) {
			this.removeServer(arrayOfIds[i]);
		}
	}
	public open(id:string, flag:boolean) {
		try {
			this.theCollection.update({_id: id}, {$set: {open: flag}}, BaseClass.HandleCollectionErrors)
		} catch (e) {
			AppLog.error("error open on object type " + this.classType, e);
		}
	}
	public getRootID(id:string):string {
		return null;
	}
	public getParentID(id):any {
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		try {
			var theObject = map.getParents(id);
			if (theObject.length > 1) {
				throw "error , expected only 1 parent got more than 1 for dimension";
			}
		} catch (e) {
			AppLog.error("error expected 1 parent got many for dimension", e);
		}
		if (theObject.length == 0)
			return "0"
		if (!theObject[0]) {
			AppLog.error("error expected a parent for dimension");
			return null;
		}
		return theObject[0].mapObjectID1;
	}
	public createTree(callback?):any {
		if (!callback) {
			return this.createTreeServer();
		}
		var theTree = this.createTreeServer();
		callback(theTree);
		return;
	}
	public createTreeServer():Array<any> {
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var objectList  = this.getList(false);
		var objectLinks = map.getMapType(this.classType, this.classType);
		var roots       = this.CreateTree(objectList, objectLinks);
		//roots = this.assignLevelsToTree(roots);
		return roots;
	}
	public CreateTree(theList:Array<any>, theLinks:Array<any>):Array<any> {
		var map = new Array;
		for (var i:number = 0; i < theList.length; i++) {
			map[theList[i]._id] = i;
		}
		var parent:any;
		var child:any;
		var root:Array<any> = new Array();
		for (var i:number = 0; i < theLinks.length; i++) {
			child = theList[map[theLinks[i].mapObjectID2]];
			if (!child.data) child.data = new Array();
			if (theLinks[i].mapObjectID1 === "0") {
				root.push(child);
				child.parent   = "0";
				child.parentID = "0";
			} else {
				parent = theList[map[theLinks[i].mapObjectID1]];
				if (!parent.data)
					parent.data = new Array();
				child.parentID = parent._id;
				child.parent   = parent._id;
				parent.data.push(child);
			}
		}
		return root;
	}
	public createFolderTree(theList:Array<any>, theFolders:Array<any>, folderLinks:Array<any>) {
		var map:Array<any> = new Array<any>();
		for (var i:number = 0; i < theList.length; i++) {
			map[theList[i]._id] = i;
		}
		for (var i = 0; i < theFolders.length; i++) {
			map[theFolders[i]._id] = 10000 + i;
		}
		var parent:any;
		var child:any;
		var root = new Array<any>();
		for (var i = 0; i < folderLinks.length; i++) {
			var index = map[folderLinks[i].mapObjectID2];
			if (index > 9999) {
				index = index - 10000;
				child = theFolders[index];
			} else {
				child = theList[index];
			}
			if (!child["data"]) child["data"] = null;
			if (folderLinks[i].mapObjectID1 == "0") {
				root.push(child);
				child.parent   = "0";
				child.parentID = "0";
			} else {
				index = map[folderLinks[i].mapObjectID1];
				if (index > 9999) {
					index  = index - 10000;
					parent = theFolders[index];
				} else {
					parent = theList[index];
				}
				if (!parent.data)
					parent.data = new Array();
				child.parentID = parent._id;
				child.parent   = parent._id;
				parent.data.push(child);
			}
		}
		return root;
	}
	public assignLevelsToTree(theTree:Array<any>) {
		this.pushNodeLevel(theTree, "");
		return theTree;
	}
	public pushNodeLevel(theTree:Array<any>, level:string) {
		for (var i = 0; i < theTree.length; i++) {
			var levelString  = level + (i + 1).toString();
			theTree[i].level = "";
			theTree[i].level = levelString;
			if (theTree[i].data) {
				this.pushNodeLevel(theTree[i].data, levelString + ".");
			}
		}
	}

} this.TreeBase = TreeBase;
Factory.AddStringToClass("TreeBase", TreeBase);

class MapList {
	public id         : string;
	public leftToRight: boolean;
	public idType     : ClassType;
	public mapID      : string;
	public mapType    : ClassType;

} this.MapList = MapList;

class Maps extends TreeBase {
	private object:TreeBase;

	constructor(classType:ClassType= ClassType.MAP) {
		super(ClassType.MAP);
	}

	public addNewMap(name:string, classType1:ClassType, id1:string, classType2:ClassType, id2:string,key:string="") {
		try {
			var insertObject = {
				name          : name,
				mapObjectType1: classType1,
				mapObjectID1  : id1,
				mapObjectType2: classType2,
				mapObjectID2  : id2,
				classType     : "map",
				relationshipKey           : key
			};
			var newID = this.theCollection.insert(insertObject, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("error inserting Map " + e, insertObject);
		}
		var mapObject = this.getOne(newID);
		return mapObject;
	}
	public addRelationship(sourceObject, targetObject, key: string = ""):string {
		var alreadyExists = this.getRelatedObject(sourceObject.classType, sourceObject.getID(),key);
		if (alreadyExists) {
			AppLog.error("Attempt To Add Relationship Which Already Exists", new Error(), {
				source: sourceObject, target: targetObject
			});
			return alreadyExists._id;
		}
		return this.addNewMap("MAP", sourceObject.classType, sourceObject.getID(), targetObject.classType,targetObject.getID(),key);
	}
	public addFolderRootMap(name:string, classType:ClassType, folderID:string) {
		try {
			var newID = this.theCollection.insert({
				name          : name,
				mapObjectType1: classType,
				mapObjectID1  : "0",
				mapObjectType2: classType,
				mapObjectID2  : folderID,
				classType     : "map"
			}, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("error inserting Map " + e, e);
		}
		var mapObject = this.getOne(newID);
		return mapObject;
	}
	public updateRelatedObjectID(sourceType:string, sourceID:string, oldID:string, newID:string):any {
		var mapObject = this.theCollection.findOne({
			mapObjectType1: sourceType, mapObjectID1: sourceID, mapObjectID2: oldID
		})
		this.updateAttribute(mapObject._id, "mapObjectID2", newID);
	}
	public getRelatedObject(sourceID:string, targetID:string,relationshipKey:string= null):any {

		var criteria = {mapObjectID1: sourceID, mapObjectID2: targetID};
		if (relationshipKey) criteria["key"] = relationshipKey;
		var mapObject = this.theCollection.findOne(criteria)
		if (!mapObject) {
			criteria = {mapObjectID2: sourceID, mapObjectID1: targetID};
			if (relationshipKey) criteria["key"] = relationshipKey;
			mapObject = this.theCollection.findOne(criteria)
		}
		if (!mapObject) return null;

		var theProxy = Factory.CreateProxyInstance(mapObject.mapObjectType2);
		var theObject = theProxy.getOne(mapObject.mapObjectID2);
		return theObject;
	}
	public getRelatedObjectsStrict(sourceID:string, targetType?:ClassType):Array<any> {
		var queryObject:any;
		if (targetType)
			queryObject = {mapObjectID1: sourceID, mapObjectType2: targetType};
		else
			queryObject = {mapObjectID1: sourceID};
		var theList       = this.theCollection.find(queryObject).fetch();
		var resultList    = new Array<any>();
		var resultMapList = new Array<any>();
		for (var item in theList) {
			resultMapList.push({
				leftToRight: true,
				id         : theList[item].mapObjectID1,
				idType     : theList[item].mapObjectType1,
				mapID      : theList[item].mapObjectID2,
				mapType    : theList[item].mapObjectType2
			});
		}
		if (targetType)
			queryObject = {mapObjectID2: sourceID, mapObjectType1: targetType};
		else
			queryObject = {mapObjectID2: sourceID};
		var theList2 = this.theCollection.find(queryObject).fetch();
		for (var item in theList2) {
			resultMapList.push({
				leftToRight: false,
				id         : theList2[item].mapObjectID2,
				idType     : theList2[item].mapObjectType2,
				mapID      : theList2[item].mapObjectID1,
				mapType    : theList2[item].mapObjectType1
			});
		}
		if (resultMapList.length == 0)
			return resultList;
		for (var item in resultMapList) {
			if (resultMapList[item].leftToRight) {
				var theID   = resultMapList[item].mapID
				var theType = resultMapList[item].mapType
			} else {
				theID   = resultMapList[item].mapID;
				theType = resultMapList[item].mapType;
			}
			var theProxy  = Factory.CreateProxyInstance(theType);
			var theObject = theProxy.getOne(theID);
			resultList.push(theObject);
		}
		return resultList;
	}
	public getRelatedObjects(sourceID:string, targetType?:ClassType):Array<any> {
		var queryObject:any;
		if (targetType)
			queryObject = {
				mapObjectID1: sourceID, mapObjectType2: targetType
			}; else
			queryObject = {
				mapObjectID1: sourceID,
			};
		var theList    = this.theCollection.find(queryObject).fetch();
		var resultList = new Array<any>();
		if (theList.length == 0)
			return resultList;
		for (var i = 0; i < theList.length; i++) {
			var theProxy  = Factory.CreateProxyInstance(theList[i].mapObjectType2);
			var theObject = theProxy.getOne(theList[i].mapObjectID2);
			resultList.push(theObject);
		}
		return resultList;
	}
	public getRootFolder(classType:ClassType) {
		try {
			var mapObject = this.theCollection.findOne({
				mapObjectType1: classType, mapObjectType2: classType, mapObjectID1: "0"
			})
		} catch (e) {
			AppLog.error("Error Finding Root Folder for Class " + classType, e);
			return null;
		}
		if (mapObject)  return mapObject.mapObjectID2; else return null;
	}
	public getOne(id:string):any {
		try {
			var object = this.theCollection.findOne({_id: id});
		} catch (e) {
			AppLog.error(" error getting one Map", e);
		}
		return object;
	}
	public getMapType(mapType1:ClassType, mapType2:ClassType, domain?:string):any {
		var mapList1 = this.theCollection.find({mapObjectType1: mapType1, mapObjectType2: mapType2}).fetch();
		if (mapType1 == mapType2) return mapList1;
		var mapList2 = this.theCollection.find({mapObjectType1: mapType2, mapObjectType2: mapType1}).fetch();
		if (mapList1 == null)
			return mapList2;
		if (mapList2 == null)
			return mapList1;
		var returnMap = mapList1.concat(mapList2);
		return returnMap
	}
	public getMapsStrict(id:string) : Array<MapList> {
		var returnList = new Array<MapList>();
		var theList    = this.theCollection.find({mapObjectID1: id}).fetch();
		var index      = 0;
		try {
			for (var item in theList) {
				var mapList = new MapList();
				mapList.id = id;
				mapList.leftToRight = true;
				mapList.idType = theList[item].mapObjectType1;
				mapList.mapID = theList[item].mapObjectID2;
				mapList.mapType = theList[item].mapObjectType2;
				returnList.push(mapList);;
			}
			var theList2 = this.theCollection.find({mapObjectID2: id}).fetch();
			for (var item in theList2) {
				mapList = new MapList();
				mapList.id = id;
				mapList.leftToRight = false;
				mapList.idType = theList2[item].mapObjectType2;
				mapList.mapID = theList2[item].mapObjectID1;
				mapList.mapType = theList2[item].mapObjectType1;
				returnList.push(mapList);
			}
		} catch (e) {
			AppLog.error("Error in getMapsStrict", e, {id: id});
			return null;
		}
		return returnList;
	}
	public hasChildren(id:string):boolean {
		try {
			var theList = this.theCollection.find({mapObjectID1: id}).fetch();
		} catch (e) {
			AppLog.error("Error in hasChildren", e, {id: id});
			return;
		}
		if (theList.length > 0)
			return true; else
			return false;
	}
	public getMaps(id:string):Array<any> {
		var theList = Array();
		theList      = this.theCollection.find({mapObjectID1: id}).fetch();
		var theList2 = this.theCollection.find({mapObjectID2: id}).fetch();
		for (var i = 0; i < theList2.length; i++) {
			var newMapObject          = theList2[i];
			var id1                   = newMapObject.mapObjectID1;
			newMapObject.mapObjectID1 = newMapObject.mapObjectID2;
			newMapObject.mapObjectID2 = id1;
			theList.push(newMapObject);
		}
		return theList;
	}
	public getMap(id1:string, id2:string) {
		try {
			var theObject = this.theCollection.findOne({mapObjectID1: id1, mapObjectID2: id2})
			if (!theObject) {
				theObject = this.theCollection.findOne({mapObjectID1: id2, mapObjectID2: id1})
			}
		} catch (e) {
			AppLog.error("Error Finding One Map " + e, e);
		}
		return theObject;
	}
	public exists(id1:string, id2:string):boolean {
		var object = this.getMap(id1, id2);
		if (object == null) return false; else return true;
	}
	public changeParent(id, oldParent, newParent):any {
		try {
			var linkRecords = this.theCollection.find({mapObjectID1: oldParent, mapObjectID2: id}).fetch();
		} catch (e) {
			AppLog.error("error fnding record in Maps - ChangeParent", e);
		}
		if (linkRecords.length > 1) {
			AppLog.error("expected only 1 parent in GetParent call got more than1");
			return null;
		}
		var linkRecord = linkRecords[0];
		try {
			this.theCollection.update({_id: linkRecord._id}, {$set: {mapObjectID1: newParent}})
		} catch (e) {
			AppLog.error("error updating Maps for ID ", e, {linkRecord: linkRecord});
		}
		return linkRecord._id;
	}
	public hasParents(id) {
		var parentList = this.getParents(id);
		if (parentList.length > 0) {
			if (parentList[0].mapObjectID1 === "0")
				return false;
			return true;
		}
		return false;
	}
	public getParentID(id) {
		var parentList = this.getParents(id);
		if (parentList != null && parentList.length != 0)
			return parentList[0].mapObjectID1; else return null;
	}
	public getParents(id:string) {
		try {
			var theList:Array<any> = this.theCollection.find({
				mapObjectID2: id
			}).fetch();
		} catch (e) {
			AppLog.error("error GetParents " + id + " ", e);
		}
		var parentList:Array<any> = new Array<any>();
		for (var i:number = 0; i < theList.length; i++) {
			if (theList[i].mapObjectType1 === theList[i].mapObjectType2)
				parentList.push(theList[i])
		}
		return parentList;
	}
	public getFolderLinks(classType:ClassType, folderClassType:ClassType):Array<any> {
		var folderLink1 = this.getMapType(folderClassType, folderClassType);
		var folderLink2 = this.getMapType(folderClassType, classType);
		if (folderLink1.length == 0) return folderLink2;
		if (folderLink2.length == 0) return folderLink1;
		var returnMap = folderLink1.concat(folderLink2);
		return returnMap;
	}
	public getFolderParent(folderClassType:string, objectClassType:string, childID:string):any {
		try {
			var mapObject = this.theCollection.findOne({
				mapObjectType1: folderClassType, mapObjectType2: objectClassType, mapObjectID2: childID
			});
		} catch (e) {
			AppLog.error("error GetParents " + childID + " ", e, {
				folderClassType: folderClassType, objectClassType: objectClassType, childID: childID
			});
		}
		if (mapObject == null) return null;
		return mapObject;
	}
	public changeFolderParent(folderClassType:string, childClassType:string, childID:string, oldParentID:string, newParentID:string) {
		var mapObject = this.getMap(oldParentID, childID);
		this.updateAttribute(mapObject._id, "mapObjectID1", newParentID);
	}
	public deleteLink(fromID:string, toID?:string) {
		if (!toID) toID = null;
		Meteor.call("deleteLink", fromID, toID, function (error, result) {
			if (error) {
				AppLog.error("error calling server for deleteLink with id " + fromID + " to " + toID, error);
			}
		})
	}
	public deleteLinkServer(fromID:string, toID?:string) {
		if (!toID) {
			try {
				this.theCollection.remove({mapObjectID1: fromID});
				this.theCollection.remove({mapObjectID2: fromID});
			} catch (e) {
				AppLog.error("error removing links from map for id = " + fromID, e);
			}
		} else {
			try {
				this.theCollection.remove({mapObjectID1: fromID, mapObjectID2: toID});
			} catch (e) {
				AppLog.error("error removing links from map for fromID = " + fromID + " toID " + toID, e);
			}
		}
	}
	public removeReference(id1:string, id2:string) {
		var result = Meteor.call("removeMapReference", {id1: id1, id2: id2, classType: this.classType});
	}
	public removeReferenceServer(id1:string, id2?:string) {
		this.theCollection.remove({mapObjectID1: id1});
		if (id2)
			this.theCollection.remove({mapObjectID2: id2});
	}

} this.Maps = Maps;
Factory.AddStringToClass("Maps", Maps);

class FolderBase extends TreeBase {

	public static FolderClassType(classType:ClassType):string {
		return classType + "_folder";
	}
	constructor(classType:string) {
		super(classType);
	}
	public addNewFolder(name:string, classType:ClassType, description:string = null, parentFolderID:string = null) {
		var newID;
		if (parentFolderID == null)
			parentFolderID = this.getRoot(classType);
		if (!description) description = "";
		try {
			newID = this.theCollection.insert({
				name           : name,
				description    : description,
				classType      : FolderBase.FolderClassType(classType),
				folderClassType: classType
			}, BaseClass.HandleCollectionErrors)
		} catch (e) {
			AppLog.error("error inserting folder " + e, null, {
				name: name, classType: classType, description: description, parentFolderID: parentFolderID
			})
		}
		var map    = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var newMap = map.addNewMap("<" + name + ">", FolderBase.FolderClassType(classType), parentFolderID,
			FolderBase.FolderClassType(classType), newID);
		return newID;
	}
	public addFolderRoot(classType:ClassType) {
		var objectSpec = Factory.GetObjectSpecs(classType);
		var label      = objectSpec.label;
		try {
			var newID = this.theCollection.insert({
				folderClassType: classType,
				name           : label,
				classType      : FolderBase.FolderClassType(classType),
				description    : label + "Root Node",
			});
			var map   = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
			map.addFolderRootMap(label, FolderBase.FolderClassType(classType), newID);
		} catch (e) {
			AppLog.error("Error Adding Root for folder " + classType, e, {classType: classType});
			return null;
		}
		return newID;
	}
	public changeName(id:string, name:string) {
		try {
			FolderStore.update({_id: id}, {$set: {name: name}}, BaseClass.HandleCollectionErrors);
		} catch (e) {
			AppLog.error("Error Updating Folder Name", e, {id: id, name: name});
		}
	}
	public changeFolderParent(classType, isChildAFolder:boolean, childID:string, newParentID:string) {
		if (isChildAFolder)
			var childClassType = FolderBase.FolderClassType(classType); else
			childClassType = classType;
		var folderClassType = FolderBase.FolderClassType(classType);
		var mapProxy = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var oldParentMap = mapProxy.getFolderParent(folderClassType, childClassType, childID);
		mapProxy.changeFolderParent(folderClassType, childClassType, childID, oldParentMap.mapObjectID1, newParentID)
	}
	public changeObjectFolder(classType:string, id:string, newParentID:string) {
		var oldParentID = this.getParentID(id);
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		map.changeParent(id, oldParentID, newParentID);
	}
	public linkToFolder(nodeID:string, classType:ClassType, folderID:string):any {
		var map    = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var newMap = map.addNewMap("Folder Link", FolderBase.FolderClassType(classType), folderID, classType, nodeID);
		return newMap;
	}
	public removeFolderLink(id:string) {
	}
	public getParentID(id):any {
		return super.getParentID(id);
	}
	public getFolders(classType:ClassType):Array<any> {
		try {
			var folderList = this.theCollection.find({classType: FolderBase.FolderClassType(classType)}).fetch();
		} catch (e) {
			AppLog.error("Error Getting Folders for " + classType, e);
			return null;
		}
		return folderList;
	}
	public getLinks(classType:ClassType):Array<any> {
		var folderRoot  = this.getRoot(classType);
		var map         = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var folderLinks = map.getFolderLinks(classType, FolderBase.FolderClassType(classType));
		return folderLinks;
	}
	public getRoot(classType:ClassType):any {
		var map = <Maps> Factory.CreateProxyInstanceMap(ClassType.MAP);
		var mapObject = map.getRootFolder(FolderBase.FolderClassType(classType));
		if (!mapObject)
			mapObject = this.addFolderRoot(classType);
		return mapObject;
	}
	public remove(id:string) {
		if (!this.isEmpty(id)) {
			AppLog.error("Error Trying to Delete Folder that is not empty", new Error(), {id: id});
			return false;
		}
		super.remove(id);
		var mapProxy = <Maps> Factory.CreateProxyInstance(ClassType.MAP);
		var theMaps = mapProxy.getMaps(id);
		if (theMaps.length > 1) {
			AppLog.error("Expected Only 1 Map for deleting folder found multiple", new Error(), {id: id});
			return false;
		}
		mapProxy.remove(theMaps[0]._id);
		return true;
	}
	public isEmpty(folderID:string):boolean {
		var mapProxy = <Maps> Factory.CreateProxyInstance(ClassType.MAP);
		return !mapProxy.hasChildren(folderID);
	}

} this.FolderBase = FolderBase;
Factory.AddStringToClass("FolderBase", FolderBase);

