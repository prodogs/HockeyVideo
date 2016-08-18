/// <reference path="AA_MetaData.ts"/>
/// <reference path="../typescript-defs/all-definitions.d.ts"/>
//endregion
console.log("Loading AA_BasicClass.ts ...");
class C4Object extends Object {
    constructor(classType) {
        super();
        this.eventsPublished = new Array();
        this.classType = classType;
    }
    static IsArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    static Clone(obj) {
        if (typeof window != "undefined")
            return jQuery.extend(true, {}, obj);
        else
            return JSON.parse(JSON.stringify(obj));
    }
    static Hash(theString) {
        var hash = 0, i, chr, len;
        if (theString.length === 0)
            return hash;
        for (i = 0, len = theString.length; i < len; i++) {
            chr = theString.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    static GetID(object) {
        var id = object["_id"];
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
    getID() {
        if (this["_id"] != null && typeof this["_id"]["_str"] === "string")
            return this["_id"]["_str"];
        if (this["theID"] != null && typeof this["theID"]["_str"] === "string")
            return this["theID"]["_str"];
        if (typeof this["_id"] != "undefined")
            return this["_id"];
        if (typeof this["theID"] != "undefined")
            return this["theID"];
    }
    setID(theID) {
        this["_id"] = theID;
        this["theID"] = theID;
    }
    typeName() {
        return this._typeName;
    }
    setTypeName(type) {
        this._typeName = type;
    }
    addEventPublication(event) {
        this.eventsPublished.push(event);
    }
    listen(event, object, caller) { return; }
    publish(event, object) {
        if (!this.notifyEvents || !this.notifyEvents[event])
            return false;
        for (var item in this.notifyEvents[event]) {
            var publishEvent = this.notifyEvents[event][item];
            var component = this.notifyEvents[event][item].component;
            if (this.notifyEvents[event][item].objectHandler != null) {
                component[this.notifyEvents[event][item].objectHandler](publishEvent.sendEvent, object, this);
            }
            else
                component.listen(publishEvent.sendEvent, object, this);
        }
    }
    subscribe(event, theComponent, sendEvent, objectMethod = null) {
        if (!sendEvent)
            sendEvent = event;
        if (!this.notifyEvents) {
            this.notifyEvents = new Array();
        }
        if (!this.notifyEvents[event])
            this.notifyEvents[event] = new Array();
        this.notifyEvents[event][theComponent.getComponentID()] = {
            component: theComponent, sendEvent: sendEvent, objectHandler: objectMethod
        };
    }
    classLabel() {
        return Factory.GetClassLabel(this.classType);
    }
    classRootNode() {
        return Factory.GetClassRootName(this.classType);
    }
    fromJSONValue(doc) {
        // default implementation
        for (var properties in doc) {
            this[properties] = doc[properties];
        }
        if (typeof this["_id"] != "undefined" && typeof this["theID"] === "undefined")
            this["theID"] = this["_id"];
    }
    getClassName() {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(this["constructor"].toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    setProperty(propertyName, propertyValue) {
        this[propertyName] = propertyValue;
    }
    clone() {
        if (typeof window != "undefined")
            return jQuery.extend(true, {}, this);
        else
            return JSON.parse(JSON.stringify(this));
    }
}
this.C4Object = C4Object;
class Factory extends C4Object {
    static Initialize() {
        //	Factory.AddStringToClass("MetricMetaStore", MetricMetaStore);
        if (Meteor.isClient) {
            try {
                Meteor.subscribe("MetaData", {
                    onReady: function () {
                        Factory.collectionArray = MetaDataStore.find().fetch();
                        console.log("Completed Loading of Meta Data");
                    }
                });
                Meteor.subscribe("Relationships", {
                    onReady: function () {
                        Factory.relationshipArray = RelationshipStore.find().fetch();
                        console.log("Completed Loading of Relationship");
                    }
                });
            }
            catch (e) {
                AppLog.error("Fatal Error : Errors reading initializing MetaData ", e);
                debugger;
            }
        }
        else {
            try {
                Factory.collectionArray = MetaDataStore.find().fetch();
                Factory.relationshipArray = RelationshipStore.find().fetch();
            }
            catch (e) {
                AppLog.error("Fatal Error : Errors reading initializing MetaData ", e);
                debugger;
            }
        }
    }
    static GetAllMeasurableSubjects() {
        var returnList = new Array();
        for (var item in Factory.collectionArray) {
            if (Factory.collectionArray[item].measureable) {
                returnList.push(Factory.collectionArray[item]);
            }
        }
        return returnList;
    }
    static IsRootClasType(classType) {
        if (Factory.GetClassFromRoot(classType) != null)
            return true;
        else
            return false;
    }
    static IsPersistant(classType) {
        var objectSpec = Factory.GetObjectSpecs(classType);
        if (!objectSpec || !objectSpec.isPersistant)
            return false;
        return true;
    }
    static CreateProxyInstanceTree(classType) {
        var objectSpecs;
        objectSpecs = Factory.GetObjectSpecs(classType);
        if (objectSpecs.structureType == ProxyClassTypes.Tree)
            return new TreeBase(classType);
        else if (objectSpecs.structureType == ProxyClassTypes.Map)
            return new Maps(classType);
        else if (objectSpecs.structureType == ProxyClassTypes.Library)
            return new TreeBase(classType);
        AppLog.error("Attempt TO create tree from class that is not a tree", new Error(), classType);
        return null;
    }
    static CreateProxyInstance(classType) {
        var objectSpecs = Factory.GetObjectSpecs(classType);
        VideoApp.assert(objectSpecs != null, "Error : Got Null when trying to get proxy for class " + classType, new Error());
        var objectReturn = Factory.CreateObjectFromString(objectSpecs.proxyClassString);
        VideoApp.assert((objectReturn != null), "Error Can Not Find Object of Type = " + classType, new Error());
        return new objectReturn(classType);
    }
    static CreateObjectInstance(classType) {
        var objectSpecs = Factory.GetObjectSpecs(classType);
        var objectReturn = Factory.CreateObjectFromString(objectSpecs.objectClassString);
        VideoApp.assert((objectReturn != null), "Error Can Not Find Object of Type = " + classType, new Error());
        return new objectReturn(classType);
    }
    static CreateProxyInstanceMap(classType) {
        var objectSpecs = Factory.GetObjectSpecs(classType);
        if (objectSpecs.structureType != ProxyClassTypes.Map)
            return;
        return Factory.CreateProxyInstance(ClassType.MAP);
    }
    static IsFolderClass(classType) {
        var x = classType.indexOf("_folder");
        if (x != -1)
            return true;
        else
            return false;
    }
    static CreateObjectFromString(objectName) {
        return Factory.stringToClass[objectName];
    }
    static CreateInstanceFromJSON(object) {
        VideoApp.assert((object.classType != null), "Can Not Create Object - classType not found");
        var metaData = Factory.GetObjectSpecs(object.classType);
        var newObject = Factory.CreateObjectInstance(object.classType);
        newObject.fromJSONValue(object);
        return newObject;
    }
    static GetRelationshipArray() {
        return Factory.castIt(this.relationshipArray);
    }
    static GetRelationshipSpecs(from, to) {
        var relationshipArray = Factory.GetRelationshipArray();
        for (var item in relationshipArray) {
            if (relationshipArray[item].from == from && relationshipArray[item].to == to)
                return relationshipArray[item];
            if (relationshipArray[item].from == to && relationshipArray[item].to == from)
                return relationshipArray[item];
        }
        return null;
    }
    static GetValidRelationshipTypes(classType) {
        var returnArray = new Array();
        for (var i = 0; i < Factory.relationshipArray.length; i++) {
            if (Factory.relationshipArray[i].from == classType) {
                returnArray.push(Factory.relationshipArray[i].from);
            }
        }
        return returnArray;
    }
    static AllowRelationship(fromObject, toObject) {
        var relationshipRecord = Factory.GetRelationshipSpecs(fromObject.classType, toObject.classType);
        if (!relationshipRecord)
            return false;
        return true;
    }
    static RelationshipPossibilties(fromObject, toObject) {
        var returnResult = new Array();
        var relationshipRecord = Factory.GetRelationshipSpecs(fromObject.classType, toObject.classType);
        if (!relationshipRecord) {
            returnResult.push(RelationshipPossible.NotAllowed);
            return RelationshipPossible.NotAllowed;
        }
        var mapProxy = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var mapList = mapProxy.getMap(fromObject._id, toObject._id);
        if (!mapList || mapList.length == 0) {
            returnResult.push(RelationshipPossible.Add);
            return RelationshipPossible.Add;
        }
        return RelationshipPossible.Replace;
    }
    static GetMandatoryRelationships(classType) {
        var dependencyList = new Array();
        var mandatory = false;
        for (var i = 0; i < Factory.relationshipArray.length; i++) {
            if (Factory.relationshipArray[i].from == classType) {
                var dependency = Factory.relationshipArray[i];
                for (var j = 0; j < dependency.relationshipLabels.length; j++) {
                    if (dependency.relationshipLabels[j].optional == false) {
                        mandatory = true;
                    }
                }
                if (mandatory == true)
                    dependencyList.push(dependency);
                mandatory = false;
            }
        }
        return dependencyList;
    }
    static castIt(theArray) {
        return theArray;
    }
    static AddStringToClass(classString, theClass) {
        Factory.stringToClass[classString] = theClass;
    }
    static GetObjectSpecs(classType) {
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
    static GetClassIcon(classType) {
        var objectSpecs = Factory.GetObjectSpecs(classType);
        if (!objectSpecs)
            return "<span class='webix_icon fa-globe'></span>";
        return objectSpecs.htmlIcon;
    }
    static GetClassFromRoot(rootName) {
        for (var i = 0; i < Factory.collectionArray.length; i++) {
            if (Factory.collectionArray[i].rootName == rootName) {
                return Factory.collectionArray[i].classType;
            }
        }
        return null;
    }
    static GetClassDetail(classType) {
        var result = Factory.GetObjectSpecs(classType);
        if (!result)
            return null;
        return Factory.stringToClass[result.subjectDetail];
    }
    static GetClassManager(classType) {
        var result = Factory.GetObjectSpecs(classType);
        if (!result)
            return null;
        if (!result.subjectManager)
            return null;
        return Factory.stringToClass[result.subjectManager];
    }
    static GetClassLabel(classType) {
        var result = Factory.GetObjectSpecs(classType);
        if (!result)
            return null;
        return result.label;
    }
    static GetClassRootName(classType) {
        var result = Factory.GetObjectSpecs(classType);
        if (!result)
            return null;
        return result.rootName;
    }
    static GetCollection(classType) {
        var objectSpecs = Factory.GetObjectSpecs(classType);
        if (!objectSpecs)
            return null;
        //     return this[objectSpecs.collection];
        return Factory.CreateObjectFromString(objectSpecs.collection);
    }
    static GetClassesToObserve() {
        var classTypes = new Array();
        for (var i = 0; i < Factory.collectionArray.length; i++) {
            if (Factory.collectionArray[i].observeUpdates) {
                classTypes.push(Factory.collectionArray[i].classType);
            }
        }
        return classTypes;
    }
    static IsVisibleRelationship(type1, type2) {
        var theSpec = Factory.GetRelationshipSpecs(type1, type2);
        if (theSpec == null)
            return false;
        if (typeof theSpec.visual == "undefined")
            return false;
        return theSpec.visual;
    }
}
Factory.stringToClass = new Array();
this.Factory = Factory;
class BaseClass extends C4Object {
    constructor(classType) {
        super(classType);
        //   this.theCollection =
    }
    get theCollection() {
        return Factory.GetCollection(this.classType);
    }
    static HandleCollectionErrors(error, result) {
        if (error)
            AppLog.error("Collection Error Has Occurred", error, result);
    }
    observe(constraint) {
        if (this.theCollection == null) {
            console.log(this);
        }
        return this.theCollection.find();
    }
    addMandatoryRelationships(id, classType) {
        var relationshipArray = Factory.GetMandatoryRelationships(classType);
        if (relationshipArray.length == 0)
            return true;
        var mapProxy = Factory.CreateProxyInstanceMap(ClassType.MAP);
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
    addNewObject(object) {
        try {
            var newID = this.theCollection.insert(object, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("Error Inserting New Object for Class = " + this.classType, e, object);
        }
        this.addMandatoryRelationships(newID, this.classType);
        return newID;
    }
    addNew(name, description) {
        if (!description)
            description = "none";
        var insertObject;
        insertObject = { name: name, description: description };
        var collection = this.theCollection;
        try {
            var newID = collection.insert(insertObject, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("inserting into class " + this.classType, e, insertObject);
        }
        this.addMandatoryRelationships(newID, this.classType);
        return newID;
    }
    updateName(id, name, description) {
        if (!description)
            try {
                this.theCollection.update({ _id: id }, { $set: { name: name } }, BaseClass.HandleCollectionErrors);
            }
            catch (e) {
                AppLog.error("Error Updating Name for class = " + this.classType, e, { id: id, name: name });
            }
        else {
            try {
                this.theCollection.update({ _id: id }, { $set: { name: name, description: description } });
            }
            catch (e) {
                AppLog.error("Error Updating Name for class = " + this.classType, e, { id: id, name: name, description: description });
            }
        }
    }
    updateAttribute(id, attribute, value) {
        var setModifier = { $set: {} };
        setModifier.$set[attribute] = value;
        try {
            this.theCollection.update({ _id: id }, setModifier, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("updateAttribute ", e, { id: id, attribute: attribute, value: value });
        }
    }
    update(id, object) {
        var updateObject = JSON.parse(JSON.stringify(object));
        this.theCollection.update({ _id: id }, { $set: updateObject }, BaseClass.HandleCollectionErrors);
    }
    removeAll() {
        Meteor.call("removeAll", this.classType);
    }
    removeAllServer() {
        this.theCollection.remove({}, BaseClass.HandleCollectionErrors);
    }
    removeSet(arrayOfIds) {
        for (var i = 0; i < arrayOfIds.length; i++) {
            this.removeServer(arrayOfIds[i]);
        }
    }
    remove(id) {
        var result = Meteor.call('removeObject', { id: id, classType: this.classType });
    }
    removeServer(theObject) {
        var id = theObject.id;
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        try {
            this.theCollection.remove({ _id: id }, BaseClass.HandleCollectionErrors);
            map.removeReference(id, id);
        }
        catch (e) {
            AppLog.error("error removing object form class = " + this.classType, e, id);
        }
    }
    restoreObject(object) {
        try {
            var newID = this.theCollection.insert(object, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("Error Inserting New Object for Class = " + this.classType, e, object);
        }
        return newID;
    }
    getRelatedObjects(sourceID, targetType) {
        var mapProxy = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var theList = mapProxy.getRelatedObjects(sourceID, targetType);
        return theList;
    }
    getRelatedObject(sourceID, targetID) {
        var mapProxy = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var theObject = mapProxy.getRelatedObject(sourceID, targetID);
        return theObject;
    }
    get(criteria) {
        try {
            var objects = this.theCollection.find(criteria).fetch();
        }
        catch (e) {
            AppLog.error("error finding objects for criteria " + criteria, new Error(), { criteria: criteria });
            return null;
        }
        return objects;
    }
    getOne(id) {
        try {
            var theObject = this.theCollection.findOne({ _id: id });
        }
        catch (e) {
            AppLog.error("error getting one of type " + this.classType, e, id);
            return null;
        }
        if (typeof theObject === "undefined")
            theObject = null;
        return theObject;
    }
    count() {
        var theList = this.getList();
        return theList.length;
    }
    getList(orderID = true) {
        try {
            var theList = this.theCollection.find().fetch();
        }
        catch (e) {
            AppLog.error("getList for class type " + this.classType, e);
        }
        for (var i = 0; i < theList.length; i++) {
            theList[i].value = new C4Object();
            theList[i].value = theList[i].name;
            theList[i].id = new C4Object();
            if (orderID)
                theList[i].id = i;
            else
                theList[i].id = theList[i]._id;
        }
        return theList;
    }
}
this.BaseClass = BaseClass;
Factory.AddStringToClass("BaseClass", BaseClass);
class Subject extends BaseClass {
    constructor(classType = null) {
        super(classType);
        this.setTypeName("Subject");
    }
}
this.Subject = Subject;
Factory.AddStringToClass("Subject", this.Subject);
class CounterClass extends Subject {
    constructor(counterName) {
        super(ClassType.COUNTER);
        this.counterName = counterName;
    }
    getNextIndex(counterName) {
        if (!counterName)
            counterName = this.counterName;
        var counterList = this.get({ name: counterName });
        if (counterList.length == 0) {
            var indexId = this.addNewObject({ name: counterName, index: 1 });
            var index = 1;
        }
        else {
            index = counterList[0].index;
            indexId = counterList[0]._id;
        }
        this.updateAttribute(indexId, "index", index + 1);
        return index;
    }
}
this.CounterClass = CounterClass;
Factory.AddStringToClass("CounterClass", CounterClass);
class TreeBase extends BaseClass {
    constructor(classType) {
        super(classType);
    }
    addNewObject(object) {
        var newID = super.addNewObject(object);
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        map.addNewMap("New Map", this.classType, "0", this.classType, newID);
        this.addMandatoryRelationships(newID, this.classType);
        return newID;
    }
    addNewNode(targetObject, placement) {
        var newID = this.addNew("New");
        var object = this.getOne(newID);
        this.placeNewNode("New", targetObject, object, placement);
    }
    addNew(name, description) {
        var newID = super.addNew(name, description);
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        map.addNewMap(name, this.classType, "0", this.classType, newID, RelationshipKey.SUBJECT_TREE);
        this.addMandatoryRelationships(newID, this.classType);
        return newID;
    }
    updateParent(id, newParentID) {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var oldParentID = map.getParentID(id);
        VideoApp.assert(oldParentID != null, "Failed To Get Parent for " + id, new Error(), { id: id, newParentID: newParentID });
        map.changeParent(id, oldParentID, newParentID);
    }
    placeNewNode(name, targetObject, newObject, placement) {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var getNewObjectParent = map.getParents(newObject._id);
        if (getNewObjectParent.length == 0 || getNewObjectParent.length > 1) {
            AppLog.error("Error Expected To Get Parent for newObject got errror", null, newObject);
            return;
        }
        var newObjectParentID = getNewObjectParent[0].mapObjectID1;
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        switch (placement) {
            case "sibling":
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
            case "child":
                {
                    map.changeParent(newObject._id, newObjectParentID, targetObject._id);
                }
                break;
            case "root":
                {
                }
                break;
        }
    }
    removeServer(theObject) {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        this.theCollection.remove(theObject.id);
        map.removeReference(theObject.id, theObject.id);
    }
    remove(id) {
        var result = Meteor.call('removeObject', { id: id, classType: this.classType });
    }
    removeSet(arrayOfIds) {
        for (var i = 0; i < arrayOfIds.length; i++) {
            this.removeServer(arrayOfIds[i]);
        }
    }
    open(id, flag) {
        try {
            this.theCollection.update({ _id: id }, { $set: { open: flag } }, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("error open on object type " + this.classType, e);
        }
    }
    getRootID(id) {
        return null;
    }
    getParentID(id) {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        try {
            var theObject = map.getParents(id);
            if (theObject.length > 1) {
                throw "error , expected only 1 parent got more than 1 for dimension";
            }
        }
        catch (e) {
            AppLog.error("error expected 1 parent got many for dimension", e);
        }
        if (theObject.length == 0)
            return "0";
        if (!theObject[0]) {
            AppLog.error("error expected a parent for dimension");
            return null;
        }
        return theObject[0].mapObjectID1;
    }
    createTree(callback) {
        if (!callback) {
            return this.createTreeServer();
        }
        var theTree = this.createTreeServer();
        callback(theTree);
        return;
    }
    createTreeServer() {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var objectList = this.getList(false);
        var objectLinks = map.getMapType(this.classType, this.classType);
        var roots = this.CreateTree(objectList, objectLinks);
        //roots = this.assignLevelsToTree(roots);
        return roots;
    }
    CreateTree(theList, theLinks) {
        var map = new Array;
        for (var i = 0; i < theList.length; i++) {
            map[theList[i]._id] = i;
        }
        var parent;
        var child;
        var root = new Array();
        for (var i = 0; i < theLinks.length; i++) {
            child = theList[map[theLinks[i].mapObjectID2]];
            if (!child.data)
                child.data = new Array();
            if (theLinks[i].mapObjectID1 === "0") {
                root.push(child);
                child.parent = "0";
                child.parentID = "0";
            }
            else {
                parent = theList[map[theLinks[i].mapObjectID1]];
                if (!parent.data)
                    parent.data = new Array();
                child.parentID = parent._id;
                child.parent = parent._id;
                parent.data.push(child);
            }
        }
        return root;
    }
    createFolderTree(theList, theFolders, folderLinks) {
        var map = new Array();
        for (var i = 0; i < theList.length; i++) {
            map[theList[i]._id] = i;
        }
        for (var i = 0; i < theFolders.length; i++) {
            map[theFolders[i]._id] = 10000 + i;
        }
        var parent;
        var child;
        var root = new Array();
        for (var i = 0; i < folderLinks.length; i++) {
            var index = map[folderLinks[i].mapObjectID2];
            if (index > 9999) {
                index = index - 10000;
                child = theFolders[index];
            }
            else {
                child = theList[index];
            }
            if (!child["data"])
                child["data"] = null;
            if (folderLinks[i].mapObjectID1 == "0") {
                root.push(child);
                child.parent = "0";
                child.parentID = "0";
            }
            else {
                index = map[folderLinks[i].mapObjectID1];
                if (index > 9999) {
                    index = index - 10000;
                    parent = theFolders[index];
                }
                else {
                    parent = theList[index];
                }
                if (!parent.data)
                    parent.data = new Array();
                child.parentID = parent._id;
                child.parent = parent._id;
                parent.data.push(child);
            }
        }
        return root;
    }
    assignLevelsToTree(theTree) {
        this.pushNodeLevel(theTree, "");
        return theTree;
    }
    pushNodeLevel(theTree, level) {
        for (var i = 0; i < theTree.length; i++) {
            var levelString = level + (i + 1).toString();
            theTree[i].level = "";
            theTree[i].level = levelString;
            if (theTree[i].data) {
                this.pushNodeLevel(theTree[i].data, levelString + ".");
            }
        }
    }
}
this.TreeBase = TreeBase;
Factory.AddStringToClass("TreeBase", TreeBase);
class MapList {
}
this.MapList = MapList;
class Maps extends TreeBase {
    constructor(classType = ClassType.MAP) {
        super(ClassType.MAP);
    }
    addNewMap(name, classType1, id1, classType2, id2, key = "") {
        try {
            var insertObject = {
                name: name,
                mapObjectType1: classType1,
                mapObjectID1: id1,
                mapObjectType2: classType2,
                mapObjectID2: id2,
                classType: "map",
                relationshipKey: key
            };
            var newID = this.theCollection.insert(insertObject, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("error inserting Map " + e, insertObject);
        }
        var mapObject = this.getOne(newID);
        return mapObject;
    }
    addRelationship(sourceObject, targetObject, key = "") {
        var alreadyExists = this.getRelatedObject(sourceObject.classType, sourceObject.getID(), key);
        if (alreadyExists) {
            AppLog.error("Attempt To Add Relationship Which Already Exists", new Error(), {
                source: sourceObject, target: targetObject
            });
            return alreadyExists._id;
        }
        return this.addNewMap("MAP", sourceObject.classType, sourceObject.getID(), targetObject.classType, targetObject.getID(), key);
    }
    addFolderRootMap(name, classType, folderID) {
        try {
            var newID = this.theCollection.insert({
                name: name,
                mapObjectType1: classType,
                mapObjectID1: "0",
                mapObjectType2: classType,
                mapObjectID2: folderID,
                classType: "map"
            }, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("error inserting Map " + e, e);
        }
        var mapObject = this.getOne(newID);
        return mapObject;
    }
    updateRelatedObjectID(sourceType, sourceID, oldID, newID) {
        var mapObject = this.theCollection.findOne({
            mapObjectType1: sourceType, mapObjectID1: sourceID, mapObjectID2: oldID
        });
        this.updateAttribute(mapObject._id, "mapObjectID2", newID);
    }
    getRelatedObject(sourceID, targetID, relationshipKey = null) {
        var criteria = { mapObjectID1: sourceID, mapObjectID2: targetID };
        if (relationshipKey)
            criteria["key"] = relationshipKey;
        var mapObject = this.theCollection.findOne(criteria);
        if (!mapObject) {
            criteria = { mapObjectID2: sourceID, mapObjectID1: targetID };
            if (relationshipKey)
                criteria["key"] = relationshipKey;
            mapObject = this.theCollection.findOne(criteria);
        }
        if (!mapObject)
            return null;
        var theProxy = Factory.CreateProxyInstance(mapObject.mapObjectType2);
        var theObject = theProxy.getOne(mapObject.mapObjectID2);
        return theObject;
    }
    getRelatedObjectsStrict(sourceID, targetType) {
        var queryObject;
        if (targetType)
            queryObject = { mapObjectID1: sourceID, mapObjectType2: targetType };
        else
            queryObject = { mapObjectID1: sourceID };
        var theList = this.theCollection.find(queryObject).fetch();
        var resultList = new Array();
        var resultMapList = new Array();
        for (var item in theList) {
            resultMapList.push({
                leftToRight: true,
                id: theList[item].mapObjectID1,
                idType: theList[item].mapObjectType1,
                mapID: theList[item].mapObjectID2,
                mapType: theList[item].mapObjectType2
            });
        }
        if (targetType)
            queryObject = { mapObjectID2: sourceID, mapObjectType1: targetType };
        else
            queryObject = { mapObjectID2: sourceID };
        var theList2 = this.theCollection.find(queryObject).fetch();
        for (var item in theList2) {
            resultMapList.push({
                leftToRight: false,
                id: theList2[item].mapObjectID2,
                idType: theList2[item].mapObjectType2,
                mapID: theList2[item].mapObjectID1,
                mapType: theList2[item].mapObjectType1
            });
        }
        if (resultMapList.length == 0)
            return resultList;
        for (var item in resultMapList) {
            if (resultMapList[item].leftToRight) {
                var theID = resultMapList[item].mapID;
                var theType = resultMapList[item].mapType;
            }
            else {
                theID = resultMapList[item].mapID;
                theType = resultMapList[item].mapType;
            }
            var theProxy = Factory.CreateProxyInstance(theType);
            var theObject = theProxy.getOne(theID);
            resultList.push(theObject);
        }
        return resultList;
    }
    getRelatedObjects(sourceID, targetType) {
        var queryObject;
        if (targetType)
            queryObject = {
                mapObjectID1: sourceID, mapObjectType2: targetType
            };
        else
            queryObject = {
                mapObjectID1: sourceID,
            };
        var theList = this.theCollection.find(queryObject).fetch();
        var resultList = new Array();
        if (theList.length == 0)
            return resultList;
        for (var i = 0; i < theList.length; i++) {
            var theProxy = Factory.CreateProxyInstance(theList[i].mapObjectType2);
            var theObject = theProxy.getOne(theList[i].mapObjectID2);
            resultList.push(theObject);
        }
        return resultList;
    }
    getRootFolder(classType) {
        try {
            var mapObject = this.theCollection.findOne({
                mapObjectType1: classType, mapObjectType2: classType, mapObjectID1: "0"
            });
        }
        catch (e) {
            AppLog.error("Error Finding Root Folder for Class " + classType, e);
            return null;
        }
        if (mapObject)
            return mapObject.mapObjectID2;
        else
            return null;
    }
    getOne(id) {
        try {
            var object = this.theCollection.findOne({ _id: id });
        }
        catch (e) {
            AppLog.error(" error getting one Map", e);
        }
        return object;
    }
    getMapType(mapType1, mapType2, domain) {
        var mapList1 = this.theCollection.find({ mapObjectType1: mapType1, mapObjectType2: mapType2 }).fetch();
        if (mapType1 == mapType2)
            return mapList1;
        var mapList2 = this.theCollection.find({ mapObjectType1: mapType2, mapObjectType2: mapType1 }).fetch();
        if (mapList1 == null)
            return mapList2;
        if (mapList2 == null)
            return mapList1;
        var returnMap = mapList1.concat(mapList2);
        return returnMap;
    }
    getMapsStrict(id) {
        var returnList = new Array();
        var theList = this.theCollection.find({ mapObjectID1: id }).fetch();
        var index = 0;
        try {
            for (var item in theList) {
                var mapList = new MapList();
                mapList.id = id;
                mapList.leftToRight = true;
                mapList.idType = theList[item].mapObjectType1;
                mapList.mapID = theList[item].mapObjectID2;
                mapList.mapType = theList[item].mapObjectType2;
                returnList.push(mapList);
                ;
            }
            var theList2 = this.theCollection.find({ mapObjectID2: id }).fetch();
            for (var item in theList2) {
                mapList = new MapList();
                mapList.id = id;
                mapList.leftToRight = false;
                mapList.idType = theList2[item].mapObjectType2;
                mapList.mapID = theList2[item].mapObjectID1;
                mapList.mapType = theList2[item].mapObjectType1;
                returnList.push(mapList);
            }
        }
        catch (e) {
            AppLog.error("Error in getMapsStrict", e, { id: id });
            return null;
        }
        return returnList;
    }
    hasChildren(id) {
        try {
            var theList = this.theCollection.find({ mapObjectID1: id }).fetch();
        }
        catch (e) {
            AppLog.error("Error in hasChildren", e, { id: id });
            return;
        }
        if (theList.length > 0)
            return true;
        else
            return false;
    }
    getMaps(id) {
        var theList = Array();
        theList = this.theCollection.find({ mapObjectID1: id }).fetch();
        var theList2 = this.theCollection.find({ mapObjectID2: id }).fetch();
        for (var i = 0; i < theList2.length; i++) {
            var newMapObject = theList2[i];
            var id1 = newMapObject.mapObjectID1;
            newMapObject.mapObjectID1 = newMapObject.mapObjectID2;
            newMapObject.mapObjectID2 = id1;
            theList.push(newMapObject);
        }
        return theList;
    }
    getMap(id1, id2) {
        try {
            var theObject = this.theCollection.findOne({ mapObjectID1: id1, mapObjectID2: id2 });
            if (!theObject) {
                theObject = this.theCollection.findOne({ mapObjectID1: id2, mapObjectID2: id1 });
            }
        }
        catch (e) {
            AppLog.error("Error Finding One Map " + e, e);
        }
        return theObject;
    }
    exists(id1, id2) {
        var object = this.getMap(id1, id2);
        if (object == null)
            return false;
        else
            return true;
    }
    changeParent(id, oldParent, newParent) {
        try {
            var linkRecords = this.theCollection.find({ mapObjectID1: oldParent, mapObjectID2: id }).fetch();
        }
        catch (e) {
            AppLog.error("error fnding record in Maps - ChangeParent", e);
        }
        if (linkRecords.length > 1) {
            AppLog.error("expected only 1 parent in GetParent call got more than1");
            return null;
        }
        var linkRecord = linkRecords[0];
        try {
            this.theCollection.update({ _id: linkRecord._id }, { $set: { mapObjectID1: newParent } });
        }
        catch (e) {
            AppLog.error("error updating Maps for ID ", e, { linkRecord: linkRecord });
        }
        return linkRecord._id;
    }
    hasParents(id) {
        var parentList = this.getParents(id);
        if (parentList.length > 0) {
            if (parentList[0].mapObjectID1 === "0")
                return false;
            return true;
        }
        return false;
    }
    getParentID(id) {
        var parentList = this.getParents(id);
        if (parentList != null && parentList.length != 0)
            return parentList[0].mapObjectID1;
        else
            return null;
    }
    getParents(id) {
        try {
            var theList = this.theCollection.find({
                mapObjectID2: id
            }).fetch();
        }
        catch (e) {
            AppLog.error("error GetParents " + id + " ", e);
        }
        var parentList = new Array();
        for (var i = 0; i < theList.length; i++) {
            if (theList[i].mapObjectType1 === theList[i].mapObjectType2)
                parentList.push(theList[i]);
        }
        return parentList;
    }
    getFolderLinks(classType, folderClassType) {
        var folderLink1 = this.getMapType(folderClassType, folderClassType);
        var folderLink2 = this.getMapType(folderClassType, classType);
        if (folderLink1.length == 0)
            return folderLink2;
        if (folderLink2.length == 0)
            return folderLink1;
        var returnMap = folderLink1.concat(folderLink2);
        return returnMap;
    }
    getFolderParent(folderClassType, objectClassType, childID) {
        try {
            var mapObject = this.theCollection.findOne({
                mapObjectType1: folderClassType, mapObjectType2: objectClassType, mapObjectID2: childID
            });
        }
        catch (e) {
            AppLog.error("error GetParents " + childID + " ", e, {
                folderClassType: folderClassType, objectClassType: objectClassType, childID: childID
            });
        }
        if (mapObject == null)
            return null;
        return mapObject;
    }
    changeFolderParent(folderClassType, childClassType, childID, oldParentID, newParentID) {
        var mapObject = this.getMap(oldParentID, childID);
        this.updateAttribute(mapObject._id, "mapObjectID1", newParentID);
    }
    deleteLink(fromID, toID) {
        if (!toID)
            toID = null;
        Meteor.call("deleteLink", fromID, toID, function (error, result) {
            if (error) {
                AppLog.error("error calling server for deleteLink with id " + fromID + " to " + toID, error);
            }
        });
    }
    deleteLinkServer(fromID, toID) {
        if (!toID) {
            try {
                this.theCollection.remove({ mapObjectID1: fromID });
                this.theCollection.remove({ mapObjectID2: fromID });
            }
            catch (e) {
                AppLog.error("error removing links from map for id = " + fromID, e);
            }
        }
        else {
            try {
                this.theCollection.remove({ mapObjectID1: fromID, mapObjectID2: toID });
            }
            catch (e) {
                AppLog.error("error removing links from map for fromID = " + fromID + " toID " + toID, e);
            }
        }
    }
    removeReference(id1, id2) {
        var result = Meteor.call("removeMapReference", { id1: id1, id2: id2, classType: this.classType });
    }
    removeReferenceServer(id1, id2) {
        this.theCollection.remove({ mapObjectID1: id1 });
        if (id2)
            this.theCollection.remove({ mapObjectID2: id2 });
    }
}
this.Maps = Maps;
Factory.AddStringToClass("Maps", Maps);
class FolderBase extends TreeBase {
    constructor(classType) {
        super(classType);
    }
    static FolderClassType(classType) {
        return classType + "_folder";
    }
    addNewFolder(name, classType, description = null, parentFolderID = null) {
        var newID;
        if (parentFolderID == null)
            parentFolderID = this.getRoot(classType);
        if (!description)
            description = "";
        try {
            newID = this.theCollection.insert({
                name: name,
                description: description,
                classType: FolderBase.FolderClassType(classType),
                folderClassType: classType
            }, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("error inserting folder " + e, null, {
                name: name, classType: classType, description: description, parentFolderID: parentFolderID
            });
        }
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var newMap = map.addNewMap("<" + name + ">", FolderBase.FolderClassType(classType), parentFolderID, FolderBase.FolderClassType(classType), newID);
        return newID;
    }
    addFolderRoot(classType) {
        var objectSpec = Factory.GetObjectSpecs(classType);
        var label = objectSpec.label;
        try {
            var newID = this.theCollection.insert({
                folderClassType: classType,
                name: label,
                classType: FolderBase.FolderClassType(classType),
                description: label + "Root Node",
            });
            var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
            map.addFolderRootMap(label, FolderBase.FolderClassType(classType), newID);
        }
        catch (e) {
            AppLog.error("Error Adding Root for folder " + classType, e, { classType: classType });
            return null;
        }
        return newID;
    }
    changeName(id, name) {
        try {
            FolderStore.update({ _id: id }, { $set: { name: name } }, BaseClass.HandleCollectionErrors);
        }
        catch (e) {
            AppLog.error("Error Updating Folder Name", e, { id: id, name: name });
        }
    }
    changeFolderParent(classType, isChildAFolder, childID, newParentID) {
        if (isChildAFolder)
            var childClassType = FolderBase.FolderClassType(classType);
        else
            childClassType = classType;
        var folderClassType = FolderBase.FolderClassType(classType);
        var mapProxy = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var oldParentMap = mapProxy.getFolderParent(folderClassType, childClassType, childID);
        mapProxy.changeFolderParent(folderClassType, childClassType, childID, oldParentMap.mapObjectID1, newParentID);
    }
    changeObjectFolder(classType, id, newParentID) {
        var oldParentID = this.getParentID(id);
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        map.changeParent(id, oldParentID, newParentID);
    }
    linkToFolder(nodeID, classType, folderID) {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var newMap = map.addNewMap("Folder Link", FolderBase.FolderClassType(classType), folderID, classType, nodeID);
        return newMap;
    }
    removeFolderLink(id) {
    }
    getParentID(id) {
        return super.getParentID(id);
    }
    getFolders(classType) {
        try {
            var folderList = this.theCollection.find({ classType: FolderBase.FolderClassType(classType) }).fetch();
        }
        catch (e) {
            AppLog.error("Error Getting Folders for " + classType, e);
            return null;
        }
        return folderList;
    }
    getLinks(classType) {
        var folderRoot = this.getRoot(classType);
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var folderLinks = map.getFolderLinks(classType, FolderBase.FolderClassType(classType));
        return folderLinks;
    }
    getRoot(classType) {
        var map = Factory.CreateProxyInstanceMap(ClassType.MAP);
        var mapObject = map.getRootFolder(FolderBase.FolderClassType(classType));
        if (!mapObject)
            mapObject = this.addFolderRoot(classType);
        return mapObject;
    }
    remove(id) {
        if (!this.isEmpty(id)) {
            AppLog.error("Error Trying to Delete Folder that is not empty", new Error(), { id: id });
            return false;
        }
        super.remove(id);
        var mapProxy = Factory.CreateProxyInstance(ClassType.MAP);
        var theMaps = mapProxy.getMaps(id);
        if (theMaps.length > 1) {
            AppLog.error("Expected Only 1 Map for deleting folder found multiple", new Error(), { id: id });
            return false;
        }
        mapProxy.remove(theMaps[0]._id);
        return true;
    }
    isEmpty(folderID) {
        var mapProxy = Factory.CreateProxyInstance(ClassType.MAP);
        return !mapProxy.hasChildren(folderID);
    }
}
this.FolderBase = FolderBase;
Factory.AddStringToClass("FolderBase", FolderBase);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUFfQmFzaWNDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFBX0Jhc2ljQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0Esc0NBQXNDO0FBRXRDLCtEQUErRDtBQVEvRCxXQUFXO0FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRTVDLHVCQUF1QixNQUFNO0lBeUM1QixZQUFZLFNBQW9CO1FBQy9CLE9BQU8sQ0FBQztRQXBDQyxvQkFBZSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFxQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFuQ0QsT0FBYyxPQUFPLENBQUMsR0FBRztRQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO0lBQ2pFLENBQUM7SUFDRCxPQUFjLEtBQUssQ0FBQyxHQUFHO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxJQUFJLFdBQVcsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQUMsSUFBSTtZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELE9BQWMsSUFBSSxDQUFDLFNBQWdCO1FBQ2xDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FB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QixJQUFJLFFBQVEsR0FBVSxPQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztBQUVGLENBQUM7QUFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUMvQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQUFfTWV0YURhdGEudHNcIi8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XG4vL3JlZ2lvbiBHbG9iYWwgVmFyaWFibGUgRGVjbGFyYXRpb25cblxuZGVjbGFyZSB2YXIgUmVsYXRpb25zaGlwU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XG5kZWNsYXJlIHZhciBNZXRhRGF0YVN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxuZGVjbGFyZSB2YXIgQ291bnRlclN0b3JlOk1vbmdvLkNvbGxlY3Rpb248YW55PlxuZGVjbGFyZSB2YXIgTWFwU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XG5cbi8vZW5kcmVnaW9uXG5jb25zb2xlLmxvZyhcIkxvYWRpbmcgQUFfQmFzaWNDbGFzcy50cyAuLi5cIik7XG5cbmNsYXNzIEM0T2JqZWN0IGV4dGVuZHMgT2JqZWN0IHtcblx0cHJpdmF0ZSBcdF9pZCA6IHN0cmluZztcblx0cHJpdmF0ZSBcdHRoZUlEIDogc3RyaW5nO1xuXHRwdWJsaWMgXHRcdGNsYXNzVHlwZTpDbGFzc1R5cGU7XG5cdHByaXZhdGUgXHRfdHlwZU5hbWUgOiBzdHJpbmc7XG5cblx0cHJvdGVjdGVkIGV2ZW50c1B1Ymxpc2hlZCA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdHByb3RlY3RlZCBub3RpZnlFdmVudHM6QXJyYXk8YW55PjtcblxuXHRwdWJsaWMgc3RhdGljIElzQXJyYXkob2JqKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgQ2xvbmUob2JqKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmopOyBlbHNlXG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEhhc2godGhlU3RyaW5nOnN0cmluZyk6bnVtYmVyIHtcblx0XHR2YXIgaGFzaCA9IDAsIGksIGNociwgbGVuO1xuXHRcdGlmICh0aGVTdHJpbmcubGVuZ3RoID09PSAwKSByZXR1cm4gaGFzaDtcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSB0aGVTdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGNociAgPSB0aGVTdHJpbmcuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNocjtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXHRcdHJldHVybiBoYXNoO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0SUQob2JqZWN0KSB7XG5cdFx0dmFyIGlkID0gb2JqZWN0W1wiX2lkXCJdXG5cdFx0aWYgKHR5cGVvZiBpZCA9PSBcInN0cmluZ1wiKVxuXHRcdFx0cmV0dXJuIGlkO1xuXHRcdGlmICh0eXBlb2YgaWQgPT0gXCJvYmplY3RcIilcblx0XHRcdHJldHVybiBpZC5fc3RyO1xuXHRcdGlkID0gb2JqZWN0W1wiaWRcIl07XG5cdFx0aWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIilcblx0XHRcdHJldHVybiBpZDtcblx0XHRpZCA9IG9iamVjdFtcInRoZUlEXCJdO1xuXHRcdGlmICh0eXBlb2YgaWQgPT0gXCJzdHJpbmdcIilcblx0XHRcdHJldHVybiBpZDtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRjb25zdHJ1Y3RvcihjbGFzc1R5cGU/OkNsYXNzVHlwZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5jbGFzc1R5cGUgPSBjbGFzc1R5cGU7XG5cdH1cblx0cHVibGljIGdldElEKCkge1xuXHRcdGlmICh0aGlzW1wiX2lkXCJdIT1udWxsICYmIHR5cGVvZiB0aGlzW1wiX2lkXCJdW1wiX3N0clwiXSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRoaXNbXCJfaWRcIl1bXCJfc3RyXCJdO1xuXHRcdGlmICh0aGlzW1widGhlSURcIl0hPW51bGwgJiYgdHlwZW9mIHRoaXNbXCJ0aGVJRFwiXVtcIl9zdHJcIl0gPT09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzW1widGhlSURcIl1bXCJfc3RyXCJdO1xuXHRcdGlmICh0eXBlb2YgdGhpc1tcIl9pZFwiXSAhPSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdGhpc1tcIl9pZFwiXTtcblx0XHRpZiAodHlwZW9mIHRoaXNbXCJ0aGVJRFwiXSAhPSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdGhpc1tcInRoZUlEXCJdO1xuXHR9XG5cdHB1YmxpYyBzZXRJRCh0aGVJRCA6IHN0cmluZykge1xuXHRcdHRoaXNbXCJfaWRcIl0gPSB0aGVJRDtcblx0XHR0aGlzW1widGhlSURcIl0gPSB0aGVJRDtcblx0fVxuXHRwdWJsaWMgdHlwZU5hbWUoKSA6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX3R5cGVOYW1lO1xuXHR9XG5cdHB1YmxpYyBzZXRUeXBlTmFtZSh0eXBlIDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fdHlwZU5hbWUgPSB0eXBlO1xuXHR9XG5cdHB1YmxpYyBhZGRFdmVudFB1YmxpY2F0aW9uKGV2ZW50OnN0cmluZykge1xuXHRcdHRoaXMuZXZlbnRzUHVibGlzaGVkLnB1c2goZXZlbnQpO1xuXHR9XG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQ6c3RyaW5nLCBvYmplY3Q6YW55LCBjYWxsZXI/OmFueSkge3JldHVybjt9XG5cdHB1YmxpYyBwdWJsaXNoKGV2ZW50OnN0cmluZywgb2JqZWN0OmFueSkge1xuXHRcdGlmICghdGhpcy5ub3RpZnlFdmVudHMgfHwgIXRoaXMubm90aWZ5RXZlbnRzW2V2ZW50XSkgcmV0dXJuIGZhbHNlO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdKSB7XG5cdFx0XHR2YXIgcHVibGlzaEV2ZW50ID0gdGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdW2l0ZW1dO1xuXHRcdFx0dmFyIGNvbXBvbmVudCAgICA9IHRoaXMubm90aWZ5RXZlbnRzW2V2ZW50XVtpdGVtXS5jb21wb25lbnQ7XG5cdFx0XHRpZiAodGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdW2l0ZW1dLm9iamVjdEhhbmRsZXIgIT0gbnVsbCkge1xuXHRcdFx0XHRjb21wb25lbnRbdGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdW2l0ZW1dLm9iamVjdEhhbmRsZXJdKHB1Ymxpc2hFdmVudC5zZW5kRXZlbnQsIG9iamVjdCwgdGhpcyk7XG5cdFx0XHR9IGVsc2Vcblx0XHRcdFx0Y29tcG9uZW50Lmxpc3RlbihwdWJsaXNoRXZlbnQuc2VuZEV2ZW50LCBvYmplY3QsIHRoaXMpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc3Vic2NyaWJlKGV2ZW50OnN0cmluZywgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50LCBzZW5kRXZlbnQ/OnN0cmluZywgb2JqZWN0TWV0aG9kID0gbnVsbCkge1xuXHRcdGlmICghc2VuZEV2ZW50KSBzZW5kRXZlbnQgPSBldmVudDtcblx0XHRpZiAoIXRoaXMubm90aWZ5RXZlbnRzKSB7XG5cdFx0XHR0aGlzLm5vdGlmeUV2ZW50cyA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdKVxuXHRcdFx0dGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR0aGlzLm5vdGlmeUV2ZW50c1tldmVudF1bdGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCldID0ge1xuXHRcdFx0Y29tcG9uZW50OiB0aGVDb21wb25lbnQsIHNlbmRFdmVudDogc2VuZEV2ZW50LCBvYmplY3RIYW5kbGVyOiBvYmplY3RNZXRob2Rcblx0XHR9O1xuXHR9XG5cdHB1YmxpYyBjbGFzc0xhYmVsKCk6c3RyaW5nIHtcblx0XHRyZXR1cm4gRmFjdG9yeS5HZXRDbGFzc0xhYmVsKHRoaXMuY2xhc3NUeXBlKTtcblx0fVxuXHRwdWJsaWMgY2xhc3NSb290Tm9kZSgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIEZhY3RvcnkuR2V0Q2xhc3NSb290TmFtZSh0aGlzLmNsYXNzVHlwZSk7XG5cdH1cblx0cHVibGljIGZyb21KU09OVmFsdWUoZG9jOmFueSkge1xuXHRcdC8vIGRlZmF1bHQgaW1wbGVtZW50YXRpb25cblx0XHRmb3IgKHZhciBwcm9wZXJ0aWVzIGluIGRvYykge1xuXHRcdFx0dGhpc1twcm9wZXJ0aWVzXSA9IGRvY1twcm9wZXJ0aWVzXTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHRoaXNbXCJfaWRcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpc1tcInRoZUlEXCJdPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHR0aGlzW1widGhlSURcIl0gPSB0aGlzW1wiX2lkXCJdO1xuXHR9XG5cdHB1YmxpYyBnZXRDbGFzc05hbWUoKSB7XG5cdFx0dmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb24gKC57MSx9KVxcKC87XG5cdFx0dmFyIHJlc3VsdHMgICAgICAgPSAoZnVuY05hbWVSZWdleCkuZXhlYyh0aGlzW1wiY29uc3RydWN0b3JcIl0udG9TdHJpbmcoKSk7XG5cdFx0cmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdIDogXCJcIjtcblx0fVxuXHRwdWJsaWMgc2V0UHJvcGVydHkocHJvcGVydHlOYW1lOnN0cmluZywgcHJvcGVydHlWYWx1ZTphbnkpIHtcblx0XHR0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eVZhbHVlO1xuXHR9XG5cdHB1YmxpYyBjbG9uZSgpOmFueSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzKTsgZWxzZVxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpO1xuXHR9XG5cbn0gdGhpcy5DNE9iamVjdCA9IEM0T2JqZWN0O1xuXG5jbGFzcyBGYWN0b3J5IGV4dGVuZHMgQzRPYmplY3Qge1xuXG5cdHB1YmxpYyBzdGF0aWMgc3RyaW5nVG9DbGFzczpBcnJheTxDbGFzc1R5cGU+ID0gbmV3IEFycmF5PENsYXNzVHlwZT4oKTtcblx0cHVibGljIHN0YXRpYyByZWxhdGlvbnNoaXBBcnJheTpBcnJheTxhbnk+O1xuXHRwdWJsaWMgc3RhdGljIGNvbGxlY3Rpb25BcnJheTpBcnJheTxDbGFzc01ldGFEYXRhPjtcblxuXHRwdWJsaWMgc3RhdGljIEluaXRpYWxpemUoKSB7XG5cblx0Ly9cdEZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIk1ldHJpY01ldGFTdG9yZVwiLCBNZXRyaWNNZXRhU3RvcmUpO1xuXHRcdGlmIChNZXRlb3IuaXNDbGllbnQpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdE1ldGVvci5zdWJzY3JpYmUoXCJNZXRhRGF0YVwiLCB7XG5cdFx0XHRcdFx0b25SZWFkeTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0RmFjdG9yeS5jb2xsZWN0aW9uQXJyYXkgPSBNZXRhRGF0YVN0b3JlLmZpbmQoKS5mZXRjaCgpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJDb21wbGV0ZWQgTG9hZGluZyBvZiBNZXRhIERhdGFcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0TWV0ZW9yLnN1YnNjcmliZShcIlJlbGF0aW9uc2hpcHNcIiwgIHtcblx0XHRcdFx0XHRvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRGYWN0b3J5LnJlbGF0aW9uc2hpcEFycmF5ID0gUmVsYXRpb25zaGlwU3RvcmUuZmluZCgpLmZldGNoKCk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkNvbXBsZXRlZCBMb2FkaW5nIG9mIFJlbGF0aW9uc2hpcFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJGYXRhbCBFcnJvciA6IEVycm9ycyByZWFkaW5nIGluaXRpYWxpemluZyBNZXRhRGF0YSBcIiwgZSk7XG5cdFx0XHRcdGRlYnVnZ2VyO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdCBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheSA9IE1ldGFEYXRhU3RvcmUuZmluZCgpLmZldGNoKCk7XG5cdFx0XHRcdCBGYWN0b3J5LnJlbGF0aW9uc2hpcEFycmF5ID0gUmVsYXRpb25zaGlwU3RvcmUuZmluZCgpLmZldGNoKCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdEFwcExvZy5lcnJvcihcIkZhdGFsIEVycm9yIDogRXJyb3JzIHJlYWRpbmcgaW5pdGlhbGl6aW5nIE1ldGFEYXRhIFwiLCBlKTtcblx0XHRcdFx0ZGVidWdnZXI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblx0cHVibGljIHN0YXRpYyBHZXRBbGxNZWFzdXJhYmxlU3ViamVjdHMoKSA6IEFycmF5PENsYXNzTWV0YURhdGE+IHtcblx0XHR2YXIgcmV0dXJuTGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheSkge1xuXHRcdFx0aWYgKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2l0ZW1dLm1lYXN1cmVhYmxlKSB7XG5cdFx0XHRcdHJldHVybkxpc3QucHVzaChGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpdGVtXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXR1cm5MaXN0O1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgSXNSb290Q2xhc1R5cGUoY2xhc3NUeXBlOkNsYXNzVHlwZSk6Ym9vbGVhbiB7XG5cdFx0aWYgKEZhY3RvcnkuR2V0Q2xhc3NGcm9tUm9vdChjbGFzc1R5cGUpICE9IG51bGwpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIHN0YXRpYyBJc1BlcnNpc3RhbnQoY2xhc3NUeXBlOkNsYXNzVHlwZSk6Ym9vbGVhbiB7XG5cdFx0dmFyIG9iamVjdFNwZWMgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XG5cdFx0aWYgKCFvYmplY3RTcGVjIHx8ICFvYmplY3RTcGVjLmlzUGVyc2lzdGFudClcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZVByb3h5SW5zdGFuY2VUcmVlKGNsYXNzVHlwZTpDbGFzc1R5cGUpOlRyZWVCYXNlIHtcblx0XHR2YXIgb2JqZWN0U3BlY3M6Q2xhc3NNZXRhRGF0YTtcblx0XHRvYmplY3RTcGVjcyA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcblx0XHRpZiAob2JqZWN0U3BlY3Muc3RydWN0dXJlVHlwZSA9PSBQcm94eUNsYXNzVHlwZXMuVHJlZSlcblx0XHRcdHJldHVybiBuZXcgVHJlZUJhc2UoY2xhc3NUeXBlKTsgZWxzZSBpZiAob2JqZWN0U3BlY3Muc3RydWN0dXJlVHlwZSA9PSBQcm94eUNsYXNzVHlwZXMuTWFwKVxuXHRcdFx0cmV0dXJuIDxUcmVlQmFzZT4gbmV3IE1hcHMoY2xhc3NUeXBlKTsgZWxzZSBpZiAob2JqZWN0U3BlY3Muc3RydWN0dXJlVHlwZSA9PSBQcm94eUNsYXNzVHlwZXMuTGlicmFyeSlcblx0XHRcdHJldHVybiBuZXcgVHJlZUJhc2UoY2xhc3NUeXBlKTtcblx0XHRBcHBMb2cuZXJyb3IoXCJBdHRlbXB0IFRPIGNyZWF0ZSB0cmVlIGZyb20gY2xhc3MgdGhhdCBpcyBub3QgYSB0cmVlXCIsIG5ldyBFcnJvcigpLCBjbGFzc1R5cGUpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlUHJveHlJbnN0YW5jZShjbGFzc1R5cGU6Q2xhc3NUeXBlKTpCYXNlQ2xhc3Mge1xuXHRcdHZhciBvYmplY3RTcGVjcyA9IDxDbGFzc01ldGFEYXRhPiBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XG5cdFx0VmlkZW9BcHAuYXNzZXJ0KG9iamVjdFNwZWNzICE9IG51bGwsIFwiRXJyb3IgOiBHb3QgTnVsbCB3aGVuIHRyeWluZyB0byBnZXQgcHJveHkgZm9yIGNsYXNzIFwiICsgY2xhc3NUeXBlLCBuZXcgRXJyb3IoKSk7XG5cdFx0dmFyIG9iamVjdFJldHVybiA9IEZhY3RvcnkuQ3JlYXRlT2JqZWN0RnJvbVN0cmluZyhvYmplY3RTcGVjcy5wcm94eUNsYXNzU3RyaW5nKVxuXHRcdFZpZGVvQXBwLmFzc2VydCgob2JqZWN0UmV0dXJuICE9IG51bGwpLCBcIkVycm9yIENhbiBOb3QgRmluZCBPYmplY3Qgb2YgVHlwZSA9IFwiICsgY2xhc3NUeXBlLCBuZXcgRXJyb3IoKSk7XG5cdFx0cmV0dXJuIG5ldyBvYmplY3RSZXR1cm4oY2xhc3NUeXBlKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZU9iamVjdEluc3RhbmNlKGNsYXNzVHlwZTpDbGFzc1R5cGUpOlN1YmplY3Qge1xuXHRcdHZhciBvYmplY3RTcGVjcyA9IDxDbGFzc01ldGFEYXRhPiBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XG5cdFx0dmFyIG9iamVjdFJldHVybiA9IEZhY3RvcnkuQ3JlYXRlT2JqZWN0RnJvbVN0cmluZyhvYmplY3RTcGVjcy5vYmplY3RDbGFzc1N0cmluZylcblx0XHRWaWRlb0FwcC5hc3NlcnQoKG9iamVjdFJldHVybiAhPSBudWxsKSwgXCJFcnJvciBDYW4gTm90IEZpbmQgT2JqZWN0IG9mIFR5cGUgPSBcIiArIGNsYXNzVHlwZSwgbmV3IEVycm9yKCkpO1xuXHRcdHJldHVybiBuZXcgb2JqZWN0UmV0dXJuKGNsYXNzVHlwZSk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBDcmVhdGVQcm94eUluc3RhbmNlTWFwKGNsYXNzVHlwZTpDbGFzc1R5cGUpOk1hcHMge1xuXHRcdHZhciBvYmplY3RTcGVjcyA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcblx0XHRpZiAob2JqZWN0U3BlY3Muc3RydWN0dXJlVHlwZSAhPSBQcm94eUNsYXNzVHlwZXMuTWFwKSByZXR1cm5cblx0XHRyZXR1cm4gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShDbGFzc1R5cGUuTUFQKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIElzRm9sZGVyQ2xhc3MoY2xhc3NUeXBlOnN0cmluZyk6Ym9vbGVhbiB7XG5cdFx0dmFyIHggPSBjbGFzc1R5cGUuaW5kZXhPZihcIl9mb2xkZXJcIik7XG5cdFx0aWYgKHggIT0gLTEpIHJldHVybiB0cnVlOyBlbHNlIHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZU9iamVjdEZyb21TdHJpbmcob2JqZWN0TmFtZTpzdHJpbmcpOmFueSB7XG5cdFx0cmV0dXJuIEZhY3Rvcnkuc3RyaW5nVG9DbGFzc1tvYmplY3ROYW1lXTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZUluc3RhbmNlRnJvbUpTT04ob2JqZWN0OmFueSk6QzRPYmplY3Qge1xuXHRcdFZpZGVvQXBwLmFzc2VydCgoIG9iamVjdC5jbGFzc1R5cGUgIT0gbnVsbCksIFwiQ2FuIE5vdCBDcmVhdGUgT2JqZWN0IC0gY2xhc3NUeXBlIG5vdCBmb3VuZFwiKVxuXHRcdHZhciBtZXRhRGF0YSA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3Mob2JqZWN0LmNsYXNzVHlwZSk7XG5cdFx0dmFyIG5ld09iamVjdCA9IEZhY3RvcnkuQ3JlYXRlT2JqZWN0SW5zdGFuY2Uob2JqZWN0LmNsYXNzVHlwZSk7XG5cdFx0bmV3T2JqZWN0LmZyb21KU09OVmFsdWUob2JqZWN0KTtcblx0XHRyZXR1cm4gbmV3T2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0UmVsYXRpb25zaGlwQXJyYXkoKTpBcnJheTxSZWxhdGlvbnNoaXBNZXRhRGF0YT4ge1xuXHRcdHJldHVybiBGYWN0b3J5LmNhc3RJdCh0aGlzLnJlbGF0aW9uc2hpcEFycmF5KTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEdldFJlbGF0aW9uc2hpcFNwZWNzKGZyb206Q2xhc3NUeXBlLCB0bzpDbGFzc1R5cGUpOlJlbGF0aW9uc2hpcE1ldGFEYXRhIHtcblx0XHR2YXIgcmVsYXRpb25zaGlwQXJyYXkgPSBGYWN0b3J5LkdldFJlbGF0aW9uc2hpcEFycmF5KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiByZWxhdGlvbnNoaXBBcnJheSkge1xuXHRcdFx0aWYgKHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dLmZyb20gPT0gZnJvbSAmJiByZWxhdGlvbnNoaXBBcnJheVtpdGVtXS50byA9PSB0bylcblx0XHRcdFx0cmV0dXJuIHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dO1xuXHRcdFx0aWYgKHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dLmZyb20gPT0gdG8gJiYgcmVsYXRpb25zaGlwQXJyYXlbaXRlbV0udG8gPT0gZnJvbSlcblx0XHRcdFx0cmV0dXJuIHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEdldFZhbGlkUmVsYXRpb25zaGlwVHlwZXMoY2xhc3NUeXBlOkNsYXNzVHlwZSk6QXJyYXk8Q2xhc3NUeXBlPiB7XG5cdFx0dmFyIHJldHVybkFycmF5ID0gbmV3IEFycmF5PENsYXNzVHlwZT4oKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChGYWN0b3J5LnJlbGF0aW9uc2hpcEFycmF5W2ldLmZyb20gPT0gY2xhc3NUeXBlKSB7XG5cdFx0XHRcdHJldHVybkFycmF5LnB1c2goRmFjdG9yeS5yZWxhdGlvbnNoaXBBcnJheVtpXS5mcm9tKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJldHVybkFycmF5O1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgQWxsb3dSZWxhdGlvbnNoaXAoZnJvbU9iamVjdDphbnksIHRvT2JqZWN0OmFueSk6Ym9vbGVhbiB7XG5cdFx0dmFyIHJlbGF0aW9uc2hpcFJlY29yZCA9IEZhY3RvcnkuR2V0UmVsYXRpb25zaGlwU3BlY3MoZnJvbU9iamVjdC5jbGFzc1R5cGUsIHRvT2JqZWN0LmNsYXNzVHlwZSk7XG5cdFx0aWYgKCFyZWxhdGlvbnNoaXBSZWNvcmQpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIFJlbGF0aW9uc2hpcFBvc3NpYmlsdGllcyhmcm9tT2JqZWN0OmFueSwgdG9PYmplY3Q6YW55KTpSZWxhdGlvbnNoaXBQb3NzaWJsZSB7XG5cdFx0dmFyIHJldHVyblJlc3VsdCAgICAgICA9IG5ldyBBcnJheTxSZWxhdGlvbnNoaXBQb3NzaWJsZT4oKTtcblx0XHR2YXIgcmVsYXRpb25zaGlwUmVjb3JkID0gRmFjdG9yeS5HZXRSZWxhdGlvbnNoaXBTcGVjcyhmcm9tT2JqZWN0LmNsYXNzVHlwZSwgdG9PYmplY3QuY2xhc3NUeXBlKTtcblx0XHRpZiAoIXJlbGF0aW9uc2hpcFJlY29yZCkge1xuXHRcdFx0cmV0dXJuUmVzdWx0LnB1c2goUmVsYXRpb25zaGlwUG9zc2libGUuTm90QWxsb3dlZCk7XG5cdFx0XHRyZXR1cm4gUmVsYXRpb25zaGlwUG9zc2libGUuTm90QWxsb3dlZDtcblx0XHR9XG5cdFx0dmFyIG1hcFByb3h5ID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgbWFwTGlzdCA9IG1hcFByb3h5LmdldE1hcChmcm9tT2JqZWN0Ll9pZCwgdG9PYmplY3QuX2lkKTtcblx0XHRpZiAoIW1hcExpc3QgfHwgbWFwTGlzdC5sZW5ndGggPT0gMCkge1xuXHRcdFx0cmV0dXJuUmVzdWx0LnB1c2goUmVsYXRpb25zaGlwUG9zc2libGUuQWRkKTtcblx0XHRcdHJldHVybiBSZWxhdGlvbnNoaXBQb3NzaWJsZS5BZGQ7XG5cdFx0fVxuXHRcdHJldHVybiBSZWxhdGlvbnNoaXBQb3NzaWJsZS5SZXBsYWNlO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0TWFuZGF0b3J5UmVsYXRpb25zaGlwcyhjbGFzc1R5cGU6Q2xhc3NUeXBlKTpBcnJheTxSZWxhdGlvbnNoaXBNZXRhRGF0YT4ge1xuXHRcdHZhciBkZXBlbmRlbmN5TGlzdCA9IG5ldyBBcnJheTxSZWxhdGlvbnNoaXBNZXRhRGF0YT4oKTtcblx0XHR2YXIgbWFuZGF0b3J5ICAgICAgPSBmYWxzZTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChGYWN0b3J5LnJlbGF0aW9uc2hpcEFycmF5W2ldLmZyb20gPT0gY2xhc3NUeXBlKSB7XG5cdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gRmFjdG9yeS5yZWxhdGlvbnNoaXBBcnJheVtpXTtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkZXBlbmRlbmN5LnJlbGF0aW9uc2hpcExhYmVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGlmIChkZXBlbmRlbmN5LnJlbGF0aW9uc2hpcExhYmVsc1tqXS5vcHRpb25hbCA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0bWFuZGF0b3J5ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG1hbmRhdG9yeSA9PSB0cnVlKSBkZXBlbmRlbmN5TGlzdC5wdXNoKDxhbnk+ZGVwZW5kZW5jeSk7XG5cdFx0XHRcdG1hbmRhdG9yeSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVwZW5kZW5jeUxpc3Q7XG5cdH1cblx0cHVibGljIHN0YXRpYyBjYXN0SXQodGhlQXJyYXk6QXJyYXk8YW55Pik6QXJyYXk8UmVsYXRpb25zaGlwTWV0YURhdGE+IHtcblx0XHRyZXR1cm4gdGhlQXJyYXk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBBZGRTdHJpbmdUb0NsYXNzKGNsYXNzU3RyaW5nOnN0cmluZywgdGhlQ2xhc3M6Q2xhc3NUeXBlKTphbnkge1xuXHRcdEZhY3Rvcnkuc3RyaW5nVG9DbGFzc1tjbGFzc1N0cmluZ10gPSB0aGVDbGFzcztcblx0fVxuXHRwdWJsaWMgc3RhdGljIEdldE9iamVjdFNwZWNzKGNsYXNzVHlwZTpDbGFzc1R5cGUpOkNsYXNzTWV0YURhdGEge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXS5jbGFzc1R5cGUgPT0gY2xhc3NUeXBlKSB7XG5cdFx0XHRcdHJldHVybiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXTtcblx0XHRcdH1cblx0XHRcdGlmIChGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXS5yb290TmFtZSA9PSBjbGFzc1R5cGUpXG5cdFx0XHRcdHJldHVybiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXTtcblx0XHR9XG5cdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgOiBHb3QgTnVsbCB3aGVuIHRyeWluZyB0byBnZXQgb2JqZWN0U3BlY3MgZm9yIGNsYXNzIFwiICsgY2xhc3NUeXBlLCBuZXcgRXJyb3IoKSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIHN0YXRpYyBHZXRDbGFzc0ljb24oY2xhc3NUeXBlOkNsYXNzVHlwZSk6c3RyaW5nIHtcblx0XHR2YXIgb2JqZWN0U3BlY3M6Q2xhc3NNZXRhRGF0YSA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcblx0XHRpZiAoIW9iamVjdFNwZWNzKSByZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1nbG9iZSc+PC9zcGFuPlwiXG5cdFx0cmV0dXJuIG9iamVjdFNwZWNzLmh0bWxJY29uO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0Q2xhc3NGcm9tUm9vdChyb290TmFtZTpDbGFzc1R5cGUpOnN0cmluZyB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2ldLnJvb3ROYW1lID09IHJvb3ROYW1lKSB7XG5cdFx0XHRcdHJldHVybiA8c3RyaW5nPiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXS5jbGFzc1R5cGVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIHN0YXRpYyBHZXRDbGFzc0RldGFpbChjbGFzc1R5cGU6Q2xhc3NUeXBlKTphbnkge1xuXHRcdHZhciByZXN1bHQgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XG5cdFx0aWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiBGYWN0b3J5LnN0cmluZ1RvQ2xhc3NbcmVzdWx0LnN1YmplY3REZXRhaWxdO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0Q2xhc3NNYW5hZ2VyKGNsYXNzVHlwZTpDbGFzc1R5cGUpOmFueSB7XG5cdFx0dmFyIHJlc3VsdDphbnkgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XG5cdFx0aWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xuXHRcdGlmICghcmVzdWx0LnN1YmplY3RNYW5hZ2VyKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gRmFjdG9yeS5zdHJpbmdUb0NsYXNzW3Jlc3VsdC5zdWJqZWN0TWFuYWdlcl07XG5cdH1cblx0cHVibGljIHN0YXRpYyBHZXRDbGFzc0xhYmVsKGNsYXNzVHlwZTpDbGFzc1R5cGUpOnN0cmluZyB7XG5cdFx0dmFyIHJlc3VsdCA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcblx0XHRpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHJlc3VsdC5sYWJlbDtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEdldENsYXNzUm9vdE5hbWUoY2xhc3NUeXBlOkNsYXNzVHlwZSk6c3RyaW5nIHtcblx0XHR2YXIgcmVzdWx0ID0gRmFjdG9yeS5HZXRPYmplY3RTcGVjcyhjbGFzc1R5cGUpO1xuXHRcdGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gcmVzdWx0LnJvb3ROYW1lO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0Q29sbGVjdGlvbihjbGFzc1R5cGU6Q2xhc3NUeXBlKSB7XG5cdFx0dmFyIG9iamVjdFNwZWNzID0gRmFjdG9yeS5HZXRPYmplY3RTcGVjcyhjbGFzc1R5cGUpO1xuXHRcdGlmICghb2JqZWN0U3BlY3MpIHJldHVybiBudWxsO1xuXHRcdC8vICAgICByZXR1cm4gdGhpc1tvYmplY3RTcGVjcy5jb2xsZWN0aW9uXTtcblx0XHRyZXR1cm4gRmFjdG9yeS5DcmVhdGVPYmplY3RGcm9tU3RyaW5nKG9iamVjdFNwZWNzLmNvbGxlY3Rpb24pO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgR2V0Q2xhc3Nlc1RvT2JzZXJ2ZSgpOkFycmF5PENsYXNzVHlwZT4ge1xuXHRcdHZhciBjbGFzc1R5cGVzID0gbmV3IEFycmF5PENsYXNzVHlwZT4oKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEZhY3RvcnkuY29sbGVjdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXlbaV0ub2JzZXJ2ZVVwZGF0ZXMpIHtcblx0XHRcdFx0Y2xhc3NUeXBlcy5wdXNoKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2ldLmNsYXNzVHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjbGFzc1R5cGVzO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgSXNWaXNpYmxlUmVsYXRpb25zaGlwKHR5cGUxLCB0eXBlMik6Ym9vbGVhbiB7XG5cdFx0dmFyIHRoZVNwZWMgPSBGYWN0b3J5LkdldFJlbGF0aW9uc2hpcFNwZWNzKHR5cGUxLCB0eXBlMik7XG5cdFx0aWYgKHRoZVNwZWMgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmICh0eXBlb2YgdGhlU3BlYy52aXN1YWwgPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuXHRcdHJldHVybiB0aGVTcGVjLnZpc3VhbDtcblx0fVxuXG59dGhpcy5GYWN0b3J5ID0gRmFjdG9yeTtcblxuY2xhc3MgQmFzZUNsYXNzIGV4dGVuZHMgQzRPYmplY3Qge1xuXG5cdGdldCB0aGVDb2xsZWN0aW9uKCk6TW9uZ28uQ29sbGVjdGlvbjxhbnk+IHtcblx0XHRyZXR1cm4gRmFjdG9yeS5HZXRDb2xsZWN0aW9uKHRoaXMuY2xhc3NUeXBlKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcblx0XHRzdXBlcihjbGFzc1R5cGUpO1xuXHRcdC8vICAgdGhpcy50aGVDb2xsZWN0aW9uID1cblx0fVxuXHRwdWJsaWMgc3RhdGljIEhhbmRsZUNvbGxlY3Rpb25FcnJvcnMoZXJyb3IsIHJlc3VsdCkge1xuXHRcdGlmIChlcnJvcilcblx0XHRcdEFwcExvZy5lcnJvcihcIkNvbGxlY3Rpb24gRXJyb3IgSGFzIE9jY3VycmVkXCIsIGVycm9yLCByZXN1bHQpO1xuXHR9XG5cdHB1YmxpYyBvYnNlcnZlKGNvbnN0cmFpbnQ/OmFueSkge1xuXHRcdGlmICh0aGlzLnRoZUNvbGxlY3Rpb24gPT0gbnVsbCkge1xuXHRcdFx0Y29uc29sZS5sb2codGhpcyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCgpO1xuXHR9XG5cdHB1YmxpYyBhZGRNYW5kYXRvcnlSZWxhdGlvbnNoaXBzKGlkOnN0cmluZywgY2xhc3NUeXBlOkNsYXNzVHlwZSk6Ym9vbGVhbiB7XG5cdFx0dmFyIHJlbGF0aW9uc2hpcEFycmF5ID0gRmFjdG9yeS5HZXRNYW5kYXRvcnlSZWxhdGlvbnNoaXBzKGNsYXNzVHlwZSk7XG5cdFx0aWYgKHJlbGF0aW9uc2hpcEFycmF5Lmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcblx0XHR2YXIgbWFwUHJveHkgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVsYXRpb25zaGlwQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciByZWxhdGlvbnNoaXAgPSByZWxhdGlvbnNoaXBBcnJheVtpXTtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgcmVsYXRpb25zaGlwLnJlbGF0aW9uc2hpcExhYmVscy5sYWJlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0aWYgKHJlbGF0aW9uc2hpcC5yZWxhdGlvbnNoaXBMYWJlbHNbal0ub3B0aW9uYWwgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHR2YXIgcHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocmVsYXRpb25zaGlwLnRvKTtcblx0XHRcdFx0XHR2YXIgbmV3SUQgPSBwcm94eS5hZGROZXcocmVsYXRpb25zaGlwLnJlbGF0aW9uc2hpcExhYmVsc1tqXS5sYWJlbCwgXCJcIik7XG5cdFx0XHRcdFx0bWFwUHJveHkuYWRkTmV3TWFwKHJlbGF0aW9uc2hpcC5sYWJlbCwgcmVsYXRpb25zaGlwLmZyb20sIGlkLCByZWxhdGlvbnNoaXAudG8sIG5ld0lEKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwdWJsaWMgYWRkTmV3T2JqZWN0KG9iamVjdDphbnkpOmFueSB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBuZXdJRCA9IHRoaXMudGhlQ29sbGVjdGlvbi5pbnNlcnQob2JqZWN0LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgSW5zZXJ0aW5nIE5ldyBPYmplY3QgZm9yIENsYXNzID0gXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSwgb2JqZWN0KTtcblx0XHR9XG5cdFx0dGhpcy5hZGRNYW5kYXRvcnlSZWxhdGlvbnNoaXBzKG5ld0lELCB0aGlzLmNsYXNzVHlwZSk7XG5cdFx0cmV0dXJuIG5ld0lEO1xuXHR9XG5cdHB1YmxpYyBhZGROZXcobmFtZTpzdHJpbmcsIGRlc2NyaXB0aW9uPzpzdHJpbmcpOnN0cmluZyB7XG5cdFx0aWYgKCFkZXNjcmlwdGlvbikgZGVzY3JpcHRpb24gPSBcIm5vbmVcIjtcblx0XHR2YXIgaW5zZXJ0T2JqZWN0OmFueTtcblx0XHRpbnNlcnRPYmplY3QgPSB7bmFtZTogbmFtZSwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9ufTtcblx0XHR2YXIgY29sbGVjdGlvbiA9IHRoaXMudGhlQ29sbGVjdGlvblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbmV3SUQ6c3RyaW5nID0gY29sbGVjdGlvbi5pbnNlcnQoaW5zZXJ0T2JqZWN0LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiaW5zZXJ0aW5nIGludG8gY2xhc3MgXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSwgaW5zZXJ0T2JqZWN0KVxuXHRcdH1cblx0XHR0aGlzLmFkZE1hbmRhdG9yeVJlbGF0aW9uc2hpcHMobmV3SUQsIHRoaXMuY2xhc3NUeXBlKTtcblx0XHRyZXR1cm4gbmV3SUQ7XG5cdH1cblx0cHVibGljIHVwZGF0ZU5hbWUoaWQ6c3RyaW5nLCBuYW1lOnN0cmluZywgZGVzY3JpcHRpb24/OnN0cmluZykge1xuXHRcdGlmICghZGVzY3JpcHRpb24pXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLnRoZUNvbGxlY3Rpb24udXBkYXRlKHtfaWQ6IGlkfSwgeyRzZXQ6IHtuYW1lOiBuYW1lfX0sIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgVXBkYXRpbmcgTmFtZSBmb3IgY2xhc3MgPSBcIiArIHRoaXMuY2xhc3NUeXBlLCBlLCB7aWQ6IGlkLCBuYW1lOiBuYW1lfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnVwZGF0ZSh7X2lkOiBpZH0sIHskc2V0OiB7bmFtZTogbmFtZSwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9ufX0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBVcGRhdGluZyBOYW1lIGZvciBjbGFzcyA9IFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIHtpZDogaWQsIG5hbWU6IG5hbWUsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbn0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwdWJsaWMgdXBkYXRlQXR0cmlidXRlKGlkOnN0cmluZywgYXR0cmlidXRlOnN0cmluZywgdmFsdWU6YW55KSB7XG5cdFx0dmFyIHNldE1vZGlmaWVyICAgICAgICAgICAgID0geyRzZXQ6IHt9fTtcblx0XHRzZXRNb2RpZmllci4kc2V0W2F0dHJpYnV0ZV0gPSB2YWx1ZTtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnVwZGF0ZSh7X2lkOiBpZH0sIHNldE1vZGlmaWVyLCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwidXBkYXRlQXR0cmlidXRlIFwiLCBlLCB7aWQ6IGlkLCBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSwgdmFsdWU6IHZhbHVlfSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyB1cGRhdGUoaWQ6c3RyaW5nLCBvYmplY3Q6YW55KSB7XG5cdFx0dmFyIHVwZGF0ZU9iamVjdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG5cdFx0dGhpcy50aGVDb2xsZWN0aW9uLnVwZGF0ZSh7X2lkOiBpZH0sIHskc2V0OiB1cGRhdGVPYmplY3R9LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycylcblx0fVxuXHRwdWJsaWMgcmVtb3ZlQWxsKCkge1xuXHRcdE1ldGVvci5jYWxsKFwicmVtb3ZlQWxsXCIsIHRoaXMuY2xhc3NUeXBlKTtcblx0fVxuXHRwdWJsaWMgcmVtb3ZlQWxsU2VydmVyKCkge1xuXHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe30sIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcblx0fVxuXHRwdWJsaWMgcmVtb3ZlU2V0KGFycmF5T2ZJZHM6QXJyYXk8c3RyaW5nPikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZklkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5yZW1vdmVTZXJ2ZXIoYXJyYXlPZklkc1tpXSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyByZW1vdmUoaWQ6c3RyaW5nKSB7XG5cdFx0dmFyIHJlc3VsdCA9IE1ldGVvci5jYWxsKCdyZW1vdmVPYmplY3QnLCB7aWQ6IGlkLCBjbGFzc1R5cGU6IHRoaXMuY2xhc3NUeXBlfSk7XG5cdH1cblx0cHVibGljIHJlbW92ZVNlcnZlcih0aGVPYmplY3Q6YW55KSB7XG5cdFx0dmFyIGlkID0gdGhlT2JqZWN0LmlkO1xuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnRoZUNvbGxlY3Rpb24ucmVtb3ZlKHtfaWQ6IGlkfSwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpO1xuXHRcdFx0bWFwLnJlbW92ZVJlZmVyZW5jZShpZCwgaWQpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIHJlbW92aW5nIG9iamVjdCBmb3JtIGNsYXNzID0gXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSwgaWQpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgcmVzdG9yZU9iamVjdChvYmplY3QpOnN0cmluZyB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBuZXdJRCA9IHRoaXMudGhlQ29sbGVjdGlvbi5pbnNlcnQob2JqZWN0LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgSW5zZXJ0aW5nIE5ldyBPYmplY3QgZm9yIENsYXNzID0gXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSwgb2JqZWN0KTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld0lEO1xuXHR9XG5cdHB1YmxpYyBnZXRSZWxhdGVkT2JqZWN0cyhzb3VyY2VJRDpzdHJpbmcsIHRhcmdldFR5cGU/OkNsYXNzVHlwZSk6QXJyYXk8YW55PiB7XG5cdFx0dmFyIG1hcFByb3h5ID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgdGhlTGlzdCAgPSBtYXBQcm94eS5nZXRSZWxhdGVkT2JqZWN0cyhzb3VyY2VJRCwgdGFyZ2V0VHlwZSk7XG5cdFx0cmV0dXJuIHRoZUxpc3Q7XG5cdH1cblx0cHVibGljIGdldFJlbGF0ZWRPYmplY3Qoc291cmNlSUQ6c3RyaW5nLCB0YXJnZXRJRDpzdHJpbmcpOmFueSB7XG5cdFx0dmFyIG1hcFByb3h5ICA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XG5cdFx0dmFyIHRoZU9iamVjdCA9IG1hcFByb3h5LmdldFJlbGF0ZWRPYmplY3Qoc291cmNlSUQsIHRhcmdldElEKTtcblx0XHRyZXR1cm4gdGhlT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBnZXQoY3JpdGVyaWE6YW55KTogQXJyYXk8YW55PiB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBvYmplY3RzID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoY3JpdGVyaWEpLmZldGNoKCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgZmluZGluZyBvYmplY3RzIGZvciBjcml0ZXJpYSBcIiArIGNyaXRlcmlhLCBuZXcgRXJyb3IoKSwge2NyaXRlcmlhOiBjcml0ZXJpYX0pO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBvYmplY3RzO1xuXHR9XG5cdHB1YmxpYyBnZXRPbmUoaWQ6c3RyaW5nKTphbnkge1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgdGhlT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe19pZDogaWR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBnZXR0aW5nIG9uZSBvZiB0eXBlIFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIGlkKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHRoZU9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIikgdGhlT2JqZWN0ID0gbnVsbDtcblx0XHRyZXR1cm4gdGhlT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBjb3VudCgpOm51bWJlciB7XG5cdFx0dmFyIHRoZUxpc3QgPSB0aGlzLmdldExpc3QoKTtcblx0XHRyZXR1cm4gdGhlTGlzdC5sZW5ndGg7XG5cdH1cblx0cHVibGljIGdldExpc3Qob3JkZXJJRCA9IHRydWUpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIHRoZUxpc3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCgpLmZldGNoKCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiZ2V0TGlzdCBmb3IgY2xhc3MgdHlwZSBcIiArIHRoaXMuY2xhc3NUeXBlLCBlKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGVMaXN0W2ldLnZhbHVlID0gbmV3IEM0T2JqZWN0KCk7XG5cdFx0XHR0aGVMaXN0W2ldLnZhbHVlID0gdGhlTGlzdFtpXS5uYW1lO1xuXHRcdFx0dGhlTGlzdFtpXS5pZCAgICA9IG5ldyBDNE9iamVjdCgpO1xuXHRcdFx0aWYgKG9yZGVySUQpXG5cdFx0XHRcdHRoZUxpc3RbaV0uaWQgPSBpOyBlbHNlXG5cdFx0XHRcdHRoZUxpc3RbaV0uaWQgPSB0aGVMaXN0W2ldLl9pZDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoZUxpc3Q7XG5cdH1cblxufSB0aGlzLkJhc2VDbGFzcyA9IEJhc2VDbGFzcztcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIkJhc2VDbGFzc1wiLCBCYXNlQ2xhc3MpO1xuXG5jbGFzcyBTdWJqZWN0IGV4dGVuZHMgQmFzZUNsYXNzIHtcblxuXHRwdWJsaWMgbmFtZSA6IHN0cmluZztcblx0cHVibGljIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGNsYXNzVHlwZTpDbGFzc1R5cGUgPSBudWxsKSB7XG5cdFx0c3VwZXIoY2xhc3NUeXBlKVxuXHRcdHRoaXMuc2V0VHlwZU5hbWUoXCJTdWJqZWN0XCIpO1xuXHR9XG5cbn10aGlzLlN1YmplY3QgPSBTdWJqZWN0O1xuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiU3ViamVjdFwiLCB0aGlzLlN1YmplY3QpO1xuXG5jbGFzcyBDb3VudGVyQ2xhc3MgZXh0ZW5kcyBTdWJqZWN0IHtcblx0cHVibGljIGNvdW50ZXJOYW1lOnN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihjb3VudGVyTmFtZTpzdHJpbmcpIHtcblx0XHRzdXBlcihDbGFzc1R5cGUuQ09VTlRFUik7XG5cdFx0dGhpcy5jb3VudGVyTmFtZSA9IGNvdW50ZXJOYW1lO1xuXHR9XG5cblx0cHVibGljIGdldE5leHRJbmRleChjb3VudGVyTmFtZT86c3RyaW5nKTpudW1iZXIge1xuXHRcdGlmICghY291bnRlck5hbWUpIGNvdW50ZXJOYW1lID0gdGhpcy5jb3VudGVyTmFtZTtcblx0XHR2YXIgY291bnRlckxpc3QgPSB0aGlzLmdldCh7bmFtZTogY291bnRlck5hbWV9KTtcblx0XHRpZiAoY291bnRlckxpc3QubGVuZ3RoID09IDApIHtcblx0XHRcdHZhciBpbmRleElkID0gdGhpcy5hZGROZXdPYmplY3Qoe25hbWU6IGNvdW50ZXJOYW1lLCBpbmRleDogMX0pO1xuXHRcdFx0dmFyIGluZGV4ICAgPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbmRleCAgID0gY291bnRlckxpc3RbMF0uaW5kZXg7XG5cdFx0XHRpbmRleElkID0gY291bnRlckxpc3RbMF0uX2lkXG5cdFx0fVxuXHRcdHRoaXMudXBkYXRlQXR0cmlidXRlKGluZGV4SWQsIFwiaW5kZXhcIiwgaW5kZXggKyAxKTtcblx0XHRyZXR1cm4gaW5kZXg7XG5cdH1cblxufSB0aGlzLkNvdW50ZXJDbGFzcyA9IENvdW50ZXJDbGFzcztcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIkNvdW50ZXJDbGFzc1wiLCBDb3VudGVyQ2xhc3MpO1xuXG5jbGFzcyBUcmVlQmFzZSBleHRlbmRzIEJhc2VDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcblx0XHRzdXBlcihjbGFzc1R5cGUpO1xuXHR9XG5cblx0cHVibGljIGFkZE5ld09iamVjdChvYmplY3QpOnN0cmluZyB7XG5cdFx0dmFyIG5ld0lEID0gc3VwZXIuYWRkTmV3T2JqZWN0KG9iamVjdCk7XG5cdFx0dmFyIG1hcCA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XG5cdFx0bWFwLmFkZE5ld01hcChcIk5ldyBNYXBcIiwgdGhpcy5jbGFzc1R5cGUsIFwiMFwiLCB0aGlzLmNsYXNzVHlwZSwgbmV3SUQpO1xuXHRcdHRoaXMuYWRkTWFuZGF0b3J5UmVsYXRpb25zaGlwcyhuZXdJRCwgdGhpcy5jbGFzc1R5cGUpO1xuXHRcdHJldHVybiBuZXdJRDtcblx0fVxuXHRwdWJsaWMgYWRkTmV3Tm9kZSh0YXJnZXRPYmplY3Q6YW55LCBwbGFjZW1lbnQ6c3RyaW5nKSB7IC8vIFJFTU9WRSBUSElTXG5cdFx0dmFyIG5ld0lEICA9IHRoaXMuYWRkTmV3KFwiTmV3XCIpO1xuXHRcdHZhciBvYmplY3QgPSB0aGlzLmdldE9uZShuZXdJRCk7XG5cdFx0dGhpcy5wbGFjZU5ld05vZGUoXCJOZXdcIiwgdGFyZ2V0T2JqZWN0LCBvYmplY3QsIHBsYWNlbWVudCk7XG5cdH1cblx0cHVibGljIGFkZE5ldyhuYW1lOnN0cmluZywgZGVzY3JpcHRpb24/OnN0cmluZyk6c3RyaW5nIHtcblx0XHR2YXIgbmV3SUQgPSBzdXBlci5hZGROZXcobmFtZSwgZGVzY3JpcHRpb24pO1xuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xuXHRcdG1hcC5hZGROZXdNYXAobmFtZSwgdGhpcy5jbGFzc1R5cGUsIFwiMFwiLCB0aGlzLmNsYXNzVHlwZSwgbmV3SUQsUmVsYXRpb25zaGlwS2V5LlNVQkpFQ1RfVFJFRSk7XG5cdFx0dGhpcy5hZGRNYW5kYXRvcnlSZWxhdGlvbnNoaXBzKG5ld0lELCB0aGlzLmNsYXNzVHlwZSk7XG5cdFx0cmV0dXJuIG5ld0lEO1xuXHR9XG5cdHB1YmxpYyB1cGRhdGVQYXJlbnQoaWQ6c3RyaW5nLCBuZXdQYXJlbnRJRDpzdHJpbmcpIHtcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgb2xkUGFyZW50SUQgPSBtYXAuZ2V0UGFyZW50SUQoaWQpO1xuXHRcdFZpZGVvQXBwLmFzc2VydChvbGRQYXJlbnRJRCAhPSBudWxsLFwiRmFpbGVkIFRvIEdldCBQYXJlbnQgZm9yIFwiK2lkLG5ldyBFcnJvcigpLCB7IGlkIDogaWQsIG5ld1BhcmVudElEIDogbmV3UGFyZW50SUQgfSk7XG5cdFx0bWFwLmNoYW5nZVBhcmVudChpZCwgb2xkUGFyZW50SUQsIG5ld1BhcmVudElEKTtcblx0fVxuXHRwdWJsaWMgcGxhY2VOZXdOb2RlKG5hbWUsIHRhcmdldE9iamVjdCwgbmV3T2JqZWN0LCBwbGFjZW1lbnQpIHtcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgZ2V0TmV3T2JqZWN0UGFyZW50ID0gbWFwLmdldFBhcmVudHMobmV3T2JqZWN0Ll9pZCk7XG5cdFx0aWYgKGdldE5ld09iamVjdFBhcmVudC5sZW5ndGggPT0gMCB8fCBnZXROZXdPYmplY3RQYXJlbnQubGVuZ3RoID4gMSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgRXhwZWN0ZWQgVG8gR2V0IFBhcmVudCBmb3IgbmV3T2JqZWN0IGdvdCBlcnJyb3JcIiwgbnVsbCwgbmV3T2JqZWN0KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIG5ld09iamVjdFBhcmVudElEID0gZ2V0TmV3T2JqZWN0UGFyZW50WzBdLm1hcE9iamVjdElEMTtcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHRzd2l0Y2ggKHBsYWNlbWVudCkge1xuXHRcdFx0Y2FzZSBcInNpYmxpbmdcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdHZhciBwYXJlbnRzID0gbWFwLmdldFBhcmVudHModGFyZ2V0T2JqZWN0Ll9pZCk7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgRXhwZWN0ZWQgUGFyZW50IGZvciBUYXJnZXQgZ290IG51bGwgXCIsIG51bGwsIHRhcmdldE9iamVjdCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwYXJlbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBleHBlY3RlZCBvbmUgcGFyZW50IGZvciB0YXJnZXQgZ290IG11bHRpcGxlXCIsIG51bGwsIHRhcmdldE9iamVjdCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG1hcC5jaGFuZ2VQYXJlbnQobmV3T2JqZWN0Ll9pZCwgbmV3T2JqZWN0UGFyZW50SUQsIHBhcmVudHNbMF0ubWFwT2JqZWN0SUQxKTtcblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiY2hpbGRcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdG1hcC5jaGFuZ2VQYXJlbnQobmV3T2JqZWN0Ll9pZCwgbmV3T2JqZWN0UGFyZW50SUQsIHRhcmdldE9iamVjdC5faWQpO1xuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJyb290XCIgOlxuXHRcdFx0e1xuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0cHVibGljIHJlbW92ZVNlcnZlcih0aGVPYmplY3Q6YW55KSB7XG5cdFx0dmFyIG1hcCA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XG5cdFx0dGhpcy50aGVDb2xsZWN0aW9uLnJlbW92ZSh0aGVPYmplY3QuaWQpO1xuXHRcdG1hcC5yZW1vdmVSZWZlcmVuY2UodGhlT2JqZWN0LmlkLCB0aGVPYmplY3QuaWQpO1xuXHR9XG5cdHB1YmxpYyByZW1vdmUoaWQ6c3RyaW5nKSB7XG5cdFx0dmFyIHJlc3VsdCA9IE1ldGVvci5jYWxsKCdyZW1vdmVPYmplY3QnLCB7aWQ6IGlkLCBjbGFzc1R5cGU6IHRoaXMuY2xhc3NUeXBlfSk7XG5cdH1cblx0cHVibGljIHJlbW92ZVNldChhcnJheU9mSWRzOkFycmF5PHN0cmluZz4pIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMucmVtb3ZlU2VydmVyKGFycmF5T2ZJZHNbaV0pO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgb3BlbihpZDpzdHJpbmcsIGZsYWc6Ym9vbGVhbikge1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLnRoZUNvbGxlY3Rpb24udXBkYXRlKHtfaWQ6IGlkfSwgeyRzZXQ6IHtvcGVuOiBmbGFnfX0sIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIG9wZW4gb24gb2JqZWN0IHR5cGUgXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBnZXRSb290SUQoaWQ6c3RyaW5nKTpzdHJpbmcge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHB1YmxpYyBnZXRQYXJlbnRJRChpZCk6YW55IHtcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR0cnkge1xuXHRcdFx0dmFyIHRoZU9iamVjdCA9IG1hcC5nZXRQYXJlbnRzKGlkKTtcblx0XHRcdGlmICh0aGVPYmplY3QubGVuZ3RoID4gMSkge1xuXHRcdFx0XHR0aHJvdyBcImVycm9yICwgZXhwZWN0ZWQgb25seSAxIHBhcmVudCBnb3QgbW9yZSB0aGFuIDEgZm9yIGRpbWVuc2lvblwiO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGV4cGVjdGVkIDEgcGFyZW50IGdvdCBtYW55IGZvciBkaW1lbnNpb25cIiwgZSk7XG5cdFx0fVxuXHRcdGlmICh0aGVPYmplY3QubGVuZ3RoID09IDApXG5cdFx0XHRyZXR1cm4gXCIwXCJcblx0XHRpZiAoIXRoZU9iamVjdFswXSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgZXhwZWN0ZWQgYSBwYXJlbnQgZm9yIGRpbWVuc2lvblwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhlT2JqZWN0WzBdLm1hcE9iamVjdElEMTtcblx0fVxuXHRwdWJsaWMgY3JlYXRlVHJlZShjYWxsYmFjaz8pOmFueSB7XG5cdFx0aWYgKCFjYWxsYmFjaykge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlVHJlZVNlcnZlcigpO1xuXHRcdH1cblx0XHR2YXIgdGhlVHJlZSA9IHRoaXMuY3JlYXRlVHJlZVNlcnZlcigpO1xuXHRcdGNhbGxiYWNrKHRoZVRyZWUpO1xuXHRcdHJldHVybjtcblx0fVxuXHRwdWJsaWMgY3JlYXRlVHJlZVNlcnZlcigpOkFycmF5PGFueT4ge1xuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xuXHRcdHZhciBvYmplY3RMaXN0ICA9IHRoaXMuZ2V0TGlzdChmYWxzZSk7XG5cdFx0dmFyIG9iamVjdExpbmtzID0gbWFwLmdldE1hcFR5cGUodGhpcy5jbGFzc1R5cGUsIHRoaXMuY2xhc3NUeXBlKTtcblx0XHR2YXIgcm9vdHMgICAgICAgPSB0aGlzLkNyZWF0ZVRyZWUob2JqZWN0TGlzdCwgb2JqZWN0TGlua3MpO1xuXHRcdC8vcm9vdHMgPSB0aGlzLmFzc2lnbkxldmVsc1RvVHJlZShyb290cyk7XG5cdFx0cmV0dXJuIHJvb3RzO1xuXHR9XG5cdHB1YmxpYyBDcmVhdGVUcmVlKHRoZUxpc3Q6QXJyYXk8YW55PiwgdGhlTGlua3M6QXJyYXk8YW55Pik6QXJyYXk8YW55PiB7XG5cdFx0dmFyIG1hcCA9IG5ldyBBcnJheTtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRtYXBbdGhlTGlzdFtpXS5faWRdID0gaTtcblx0XHR9XG5cdFx0dmFyIHBhcmVudDphbnk7XG5cdFx0dmFyIGNoaWxkOmFueTtcblx0XHR2YXIgcm9vdDpBcnJheTxhbnk+ID0gbmV3IEFycmF5KCk7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhlTGlua3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNoaWxkID0gdGhlTGlzdFttYXBbdGhlTGlua3NbaV0ubWFwT2JqZWN0SUQyXV07XG5cdFx0XHRpZiAoIWNoaWxkLmRhdGEpIGNoaWxkLmRhdGEgPSBuZXcgQXJyYXkoKTtcblx0XHRcdGlmICh0aGVMaW5rc1tpXS5tYXBPYmplY3RJRDEgPT09IFwiMFwiKSB7XG5cdFx0XHRcdHJvb3QucHVzaChjaGlsZCk7XG5cdFx0XHRcdGNoaWxkLnBhcmVudCAgID0gXCIwXCI7XG5cdFx0XHRcdGNoaWxkLnBhcmVudElEID0gXCIwXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXJlbnQgPSB0aGVMaXN0W21hcFt0aGVMaW5rc1tpXS5tYXBPYmplY3RJRDFdXTtcblx0XHRcdFx0aWYgKCFwYXJlbnQuZGF0YSlcblx0XHRcdFx0XHRwYXJlbnQuZGF0YSA9IG5ldyBBcnJheSgpO1xuXHRcdFx0XHRjaGlsZC5wYXJlbnRJRCA9IHBhcmVudC5faWQ7XG5cdFx0XHRcdGNoaWxkLnBhcmVudCAgID0gcGFyZW50Ll9pZDtcblx0XHRcdFx0cGFyZW50LmRhdGEucHVzaChjaGlsZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9XG5cdHB1YmxpYyBjcmVhdGVGb2xkZXJUcmVlKHRoZUxpc3Q6QXJyYXk8YW55PiwgdGhlRm9sZGVyczpBcnJheTxhbnk+LCBmb2xkZXJMaW5rczpBcnJheTxhbnk+KSB7XG5cdFx0dmFyIG1hcDpBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRtYXBbdGhlTGlzdFtpXS5faWRdID0gaTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVGb2xkZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRtYXBbdGhlRm9sZGVyc1tpXS5faWRdID0gMTAwMDAgKyBpO1xuXHRcdH1cblx0XHR2YXIgcGFyZW50OmFueTtcblx0XHR2YXIgY2hpbGQ6YW55O1xuXHRcdHZhciByb290ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZvbGRlckxpbmtzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaW5kZXggPSBtYXBbZm9sZGVyTGlua3NbaV0ubWFwT2JqZWN0SUQyXTtcblx0XHRcdGlmIChpbmRleCA+IDk5OTkpIHtcblx0XHRcdFx0aW5kZXggPSBpbmRleCAtIDEwMDAwO1xuXHRcdFx0XHRjaGlsZCA9IHRoZUZvbGRlcnNbaW5kZXhdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2hpbGQgPSB0aGVMaXN0W2luZGV4XTtcblx0XHRcdH1cblx0XHRcdGlmICghY2hpbGRbXCJkYXRhXCJdKSBjaGlsZFtcImRhdGFcIl0gPSBudWxsO1xuXHRcdFx0aWYgKGZvbGRlckxpbmtzW2ldLm1hcE9iamVjdElEMSA9PSBcIjBcIikge1xuXHRcdFx0XHRyb290LnB1c2goY2hpbGQpO1xuXHRcdFx0XHRjaGlsZC5wYXJlbnQgICA9IFwiMFwiO1xuXHRcdFx0XHRjaGlsZC5wYXJlbnRJRCA9IFwiMFwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5kZXggPSBtYXBbZm9sZGVyTGlua3NbaV0ubWFwT2JqZWN0SUQxXTtcblx0XHRcdFx0aWYgKGluZGV4ID4gOTk5OSkge1xuXHRcdFx0XHRcdGluZGV4ICA9IGluZGV4IC0gMTAwMDA7XG5cdFx0XHRcdFx0cGFyZW50ID0gdGhlRm9sZGVyc1tpbmRleF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFyZW50ID0gdGhlTGlzdFtpbmRleF07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFwYXJlbnQuZGF0YSlcblx0XHRcdFx0XHRwYXJlbnQuZGF0YSA9IG5ldyBBcnJheSgpO1xuXHRcdFx0XHRjaGlsZC5wYXJlbnRJRCA9IHBhcmVudC5faWQ7XG5cdFx0XHRcdGNoaWxkLnBhcmVudCAgID0gcGFyZW50Ll9pZDtcblx0XHRcdFx0cGFyZW50LmRhdGEucHVzaChjaGlsZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9XG5cdHB1YmxpYyBhc3NpZ25MZXZlbHNUb1RyZWUodGhlVHJlZTpBcnJheTxhbnk+KSB7XG5cdFx0dGhpcy5wdXNoTm9kZUxldmVsKHRoZVRyZWUsIFwiXCIpO1xuXHRcdHJldHVybiB0aGVUcmVlO1xuXHR9XG5cdHB1YmxpYyBwdXNoTm9kZUxldmVsKHRoZVRyZWU6QXJyYXk8YW55PiwgbGV2ZWw6c3RyaW5nKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVUcmVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbGV2ZWxTdHJpbmcgID0gbGV2ZWwgKyAoaSArIDEpLnRvU3RyaW5nKCk7XG5cdFx0XHR0aGVUcmVlW2ldLmxldmVsID0gXCJcIjtcblx0XHRcdHRoZVRyZWVbaV0ubGV2ZWwgPSBsZXZlbFN0cmluZztcblx0XHRcdGlmICh0aGVUcmVlW2ldLmRhdGEpIHtcblx0XHRcdFx0dGhpcy5wdXNoTm9kZUxldmVsKHRoZVRyZWVbaV0uZGF0YSwgbGV2ZWxTdHJpbmcgKyBcIi5cIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbn0gdGhpcy5UcmVlQmFzZSA9IFRyZWVCYXNlO1xuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiVHJlZUJhc2VcIiwgVHJlZUJhc2UpO1xuXG5jbGFzcyBNYXBMaXN0IHtcblx0cHVibGljIGlkICAgICAgICAgOiBzdHJpbmc7XG5cdHB1YmxpYyBsZWZ0VG9SaWdodDogYm9vbGVhbjtcblx0cHVibGljIGlkVHlwZSAgICAgOiBDbGFzc1R5cGU7XG5cdHB1YmxpYyBtYXBJRCAgICAgIDogc3RyaW5nO1xuXHRwdWJsaWMgbWFwVHlwZSAgICA6IENsYXNzVHlwZTtcblxufSB0aGlzLk1hcExpc3QgPSBNYXBMaXN0O1xuXG5jbGFzcyBNYXBzIGV4dGVuZHMgVHJlZUJhc2Uge1xuXHRwcml2YXRlIG9iamVjdDpUcmVlQmFzZTtcblxuXHRjb25zdHJ1Y3RvcihjbGFzc1R5cGU6Q2xhc3NUeXBlPSBDbGFzc1R5cGUuTUFQKSB7XG5cdFx0c3VwZXIoQ2xhc3NUeXBlLk1BUCk7XG5cdH1cblxuXHRwdWJsaWMgYWRkTmV3TWFwKG5hbWU6c3RyaW5nLCBjbGFzc1R5cGUxOkNsYXNzVHlwZSwgaWQxOnN0cmluZywgY2xhc3NUeXBlMjpDbGFzc1R5cGUsIGlkMjpzdHJpbmcsa2V5OnN0cmluZz1cIlwiKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBpbnNlcnRPYmplY3QgPSB7XG5cdFx0XHRcdG5hbWUgICAgICAgICAgOiBuYW1lLFxuXHRcdFx0XHRtYXBPYmplY3RUeXBlMTogY2xhc3NUeXBlMSxcblx0XHRcdFx0bWFwT2JqZWN0SUQxICA6IGlkMSxcblx0XHRcdFx0bWFwT2JqZWN0VHlwZTI6IGNsYXNzVHlwZTIsXG5cdFx0XHRcdG1hcE9iamVjdElEMiAgOiBpZDIsXG5cdFx0XHRcdGNsYXNzVHlwZSAgICAgOiBcIm1hcFwiLFxuXHRcdFx0XHRyZWxhdGlvbnNoaXBLZXkgICAgICAgICAgIDoga2V5XG5cdFx0XHR9O1xuXHRcdFx0dmFyIG5ld0lEID0gdGhpcy50aGVDb2xsZWN0aW9uLmluc2VydChpbnNlcnRPYmplY3QsIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBpbnNlcnRpbmcgTWFwIFwiICsgZSwgaW5zZXJ0T2JqZWN0KTtcblx0XHR9XG5cdFx0dmFyIG1hcE9iamVjdCA9IHRoaXMuZ2V0T25lKG5ld0lEKTtcblx0XHRyZXR1cm4gbWFwT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBhZGRSZWxhdGlvbnNoaXAoc291cmNlT2JqZWN0LCB0YXJnZXRPYmplY3QsIGtleTogc3RyaW5nID0gXCJcIik6c3RyaW5nIHtcblx0XHR2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMuZ2V0UmVsYXRlZE9iamVjdChzb3VyY2VPYmplY3QuY2xhc3NUeXBlLCBzb3VyY2VPYmplY3QuZ2V0SUQoKSxrZXkpO1xuXHRcdGlmIChhbHJlYWR5RXhpc3RzKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJBdHRlbXB0IFRvIEFkZCBSZWxhdGlvbnNoaXAgV2hpY2ggQWxyZWFkeSBFeGlzdHNcIiwgbmV3IEVycm9yKCksIHtcblx0XHRcdFx0c291cmNlOiBzb3VyY2VPYmplY3QsIHRhcmdldDogdGFyZ2V0T2JqZWN0XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBhbHJlYWR5RXhpc3RzLl9pZDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuYWRkTmV3TWFwKFwiTUFQXCIsIHNvdXJjZU9iamVjdC5jbGFzc1R5cGUsIHNvdXJjZU9iamVjdC5nZXRJRCgpLCB0YXJnZXRPYmplY3QuY2xhc3NUeXBlLHRhcmdldE9iamVjdC5nZXRJRCgpLGtleSk7XG5cdH1cblx0cHVibGljIGFkZEZvbGRlclJvb3RNYXAobmFtZTpzdHJpbmcsIGNsYXNzVHlwZTpDbGFzc1R5cGUsIGZvbGRlcklEOnN0cmluZykge1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbmV3SUQgPSB0aGlzLnRoZUNvbGxlY3Rpb24uaW5zZXJ0KHtcblx0XHRcdFx0bmFtZSAgICAgICAgICA6IG5hbWUsXG5cdFx0XHRcdG1hcE9iamVjdFR5cGUxOiBjbGFzc1R5cGUsXG5cdFx0XHRcdG1hcE9iamVjdElEMSAgOiBcIjBcIixcblx0XHRcdFx0bWFwT2JqZWN0VHlwZTI6IGNsYXNzVHlwZSxcblx0XHRcdFx0bWFwT2JqZWN0SUQyICA6IGZvbGRlcklELFxuXHRcdFx0XHRjbGFzc1R5cGUgICAgIDogXCJtYXBcIlxuXHRcdFx0fSwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGluc2VydGluZyBNYXAgXCIgKyBlLCBlKTtcblx0XHR9XG5cdFx0dmFyIG1hcE9iamVjdCA9IHRoaXMuZ2V0T25lKG5ld0lEKTtcblx0XHRyZXR1cm4gbWFwT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyB1cGRhdGVSZWxhdGVkT2JqZWN0SUQoc291cmNlVHlwZTpzdHJpbmcsIHNvdXJjZUlEOnN0cmluZywgb2xkSUQ6c3RyaW5nLCBuZXdJRDpzdHJpbmcpOmFueSB7XG5cdFx0dmFyIG1hcE9iamVjdCA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kT25lKHtcblx0XHRcdG1hcE9iamVjdFR5cGUxOiBzb3VyY2VUeXBlLCBtYXBPYmplY3RJRDE6IHNvdXJjZUlELCBtYXBPYmplY3RJRDI6IG9sZElEXG5cdFx0fSlcblx0XHR0aGlzLnVwZGF0ZUF0dHJpYnV0ZShtYXBPYmplY3QuX2lkLCBcIm1hcE9iamVjdElEMlwiLCBuZXdJRCk7XG5cdH1cblx0cHVibGljIGdldFJlbGF0ZWRPYmplY3Qoc291cmNlSUQ6c3RyaW5nLCB0YXJnZXRJRDpzdHJpbmcscmVsYXRpb25zaGlwS2V5OnN0cmluZz0gbnVsbCk6YW55IHtcblxuXHRcdHZhciBjcml0ZXJpYSA9IHttYXBPYmplY3RJRDE6IHNvdXJjZUlELCBtYXBPYmplY3RJRDI6IHRhcmdldElEfTtcblx0XHRpZiAocmVsYXRpb25zaGlwS2V5KSBjcml0ZXJpYVtcImtleVwiXSA9IHJlbGF0aW9uc2hpcEtleTtcblx0XHR2YXIgbWFwT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoY3JpdGVyaWEpXG5cdFx0aWYgKCFtYXBPYmplY3QpIHtcblx0XHRcdGNyaXRlcmlhID0ge21hcE9iamVjdElEMjogc291cmNlSUQsIG1hcE9iamVjdElEMTogdGFyZ2V0SUR9O1xuXHRcdFx0aWYgKHJlbGF0aW9uc2hpcEtleSkgY3JpdGVyaWFbXCJrZXlcIl0gPSByZWxhdGlvbnNoaXBLZXk7XG5cdFx0XHRtYXBPYmplY3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZE9uZShjcml0ZXJpYSlcblx0XHR9XG5cdFx0aWYgKCFtYXBPYmplY3QpIHJldHVybiBudWxsO1xuXG5cdFx0dmFyIHRoZVByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKG1hcE9iamVjdC5tYXBPYmplY3RUeXBlMik7XG5cdFx0dmFyIHRoZU9iamVjdCA9IHRoZVByb3h5LmdldE9uZShtYXBPYmplY3QubWFwT2JqZWN0SUQyKTtcblx0XHRyZXR1cm4gdGhlT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBnZXRSZWxhdGVkT2JqZWN0c1N0cmljdChzb3VyY2VJRDpzdHJpbmcsIHRhcmdldFR5cGU/OkNsYXNzVHlwZSk6QXJyYXk8YW55PiB7XG5cdFx0dmFyIHF1ZXJ5T2JqZWN0OmFueTtcblx0XHRpZiAodGFyZ2V0VHlwZSlcblx0XHRcdHF1ZXJ5T2JqZWN0ID0ge21hcE9iamVjdElEMTogc291cmNlSUQsIG1hcE9iamVjdFR5cGUyOiB0YXJnZXRUeXBlfTtcblx0XHRlbHNlXG5cdFx0XHRxdWVyeU9iamVjdCA9IHttYXBPYmplY3RJRDE6IHNvdXJjZUlEfTtcblx0XHR2YXIgdGhlTGlzdCAgICAgICA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHF1ZXJ5T2JqZWN0KS5mZXRjaCgpO1xuXHRcdHZhciByZXN1bHRMaXN0ICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgcmVzdWx0TWFwTGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGVMaXN0KSB7XG5cdFx0XHRyZXN1bHRNYXBMaXN0LnB1c2goe1xuXHRcdFx0XHRsZWZ0VG9SaWdodDogdHJ1ZSxcblx0XHRcdFx0aWQgICAgICAgICA6IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0SUQxLFxuXHRcdFx0XHRpZFR5cGUgICAgIDogdGhlTGlzdFtpdGVtXS5tYXBPYmplY3RUeXBlMSxcblx0XHRcdFx0bWFwSUQgICAgICA6IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0SUQyLFxuXHRcdFx0XHRtYXBUeXBlICAgIDogdGhlTGlzdFtpdGVtXS5tYXBPYmplY3RUeXBlMlxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmICh0YXJnZXRUeXBlKVxuXHRcdFx0cXVlcnlPYmplY3QgPSB7bWFwT2JqZWN0SUQyOiBzb3VyY2VJRCwgbWFwT2JqZWN0VHlwZTE6IHRhcmdldFR5cGV9O1xuXHRcdGVsc2Vcblx0XHRcdHF1ZXJ5T2JqZWN0ID0ge21hcE9iamVjdElEMjogc291cmNlSUR9O1xuXHRcdHZhciB0aGVMaXN0MiA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHF1ZXJ5T2JqZWN0KS5mZXRjaCgpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhlTGlzdDIpIHtcblx0XHRcdHJlc3VsdE1hcExpc3QucHVzaCh7XG5cdFx0XHRcdGxlZnRUb1JpZ2h0OiBmYWxzZSxcblx0XHRcdFx0aWQgICAgICAgICA6IHRoZUxpc3QyW2l0ZW1dLm1hcE9iamVjdElEMixcblx0XHRcdFx0aWRUeXBlICAgICA6IHRoZUxpc3QyW2l0ZW1dLm1hcE9iamVjdFR5cGUyLFxuXHRcdFx0XHRtYXBJRCAgICAgIDogdGhlTGlzdDJbaXRlbV0ubWFwT2JqZWN0SUQxLFxuXHRcdFx0XHRtYXBUeXBlICAgIDogdGhlTGlzdDJbaXRlbV0ubWFwT2JqZWN0VHlwZTFcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0TWFwTGlzdC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiByZXN1bHRMaXN0O1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gcmVzdWx0TWFwTGlzdCkge1xuXHRcdFx0aWYgKHJlc3VsdE1hcExpc3RbaXRlbV0ubGVmdFRvUmlnaHQpIHtcblx0XHRcdFx0dmFyIHRoZUlEICAgPSByZXN1bHRNYXBMaXN0W2l0ZW1dLm1hcElEXG5cdFx0XHRcdHZhciB0aGVUeXBlID0gcmVzdWx0TWFwTGlzdFtpdGVtXS5tYXBUeXBlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGVJRCAgID0gcmVzdWx0TWFwTGlzdFtpdGVtXS5tYXBJRDtcblx0XHRcdFx0dGhlVHlwZSA9IHJlc3VsdE1hcExpc3RbaXRlbV0ubWFwVHlwZTtcblx0XHRcdH1cblx0XHRcdHZhciB0aGVQcm94eSAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlVHlwZSk7XG5cdFx0XHR2YXIgdGhlT2JqZWN0ID0gdGhlUHJveHkuZ2V0T25lKHRoZUlEKTtcblx0XHRcdHJlc3VsdExpc3QucHVzaCh0aGVPYmplY3QpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxuXHRwdWJsaWMgZ2V0UmVsYXRlZE9iamVjdHMoc291cmNlSUQ6c3RyaW5nLCB0YXJnZXRUeXBlPzpDbGFzc1R5cGUpOkFycmF5PGFueT4ge1xuXHRcdHZhciBxdWVyeU9iamVjdDphbnk7XG5cdFx0aWYgKHRhcmdldFR5cGUpXG5cdFx0XHRxdWVyeU9iamVjdCA9IHtcblx0XHRcdFx0bWFwT2JqZWN0SUQxOiBzb3VyY2VJRCwgbWFwT2JqZWN0VHlwZTI6IHRhcmdldFR5cGVcblx0XHRcdH07IGVsc2Vcblx0XHRcdHF1ZXJ5T2JqZWN0ID0ge1xuXHRcdFx0XHRtYXBPYmplY3RJRDE6IHNvdXJjZUlELFxuXHRcdFx0fTtcblx0XHR2YXIgdGhlTGlzdCAgICA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHF1ZXJ5T2JqZWN0KS5mZXRjaCgpO1xuXHRcdHZhciByZXN1bHRMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRpZiAodGhlTGlzdC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiByZXN1bHRMaXN0O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhlTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHRoZVByb3h5ICA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGVMaXN0W2ldLm1hcE9iamVjdFR5cGUyKTtcblx0XHRcdHZhciB0aGVPYmplY3QgPSB0aGVQcm94eS5nZXRPbmUodGhlTGlzdFtpXS5tYXBPYmplY3RJRDIpO1xuXHRcdFx0cmVzdWx0TGlzdC5wdXNoKHRoZU9iamVjdCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRMaXN0O1xuXHR9XG5cdHB1YmxpYyBnZXRSb290Rm9sZGVyKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIG1hcE9iamVjdCA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kT25lKHtcblx0XHRcdFx0bWFwT2JqZWN0VHlwZTE6IGNsYXNzVHlwZSwgbWFwT2JqZWN0VHlwZTI6IGNsYXNzVHlwZSwgbWFwT2JqZWN0SUQxOiBcIjBcIlxuXHRcdFx0fSlcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBGaW5kaW5nIFJvb3QgRm9sZGVyIGZvciBDbGFzcyBcIiArIGNsYXNzVHlwZSwgZSk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKG1hcE9iamVjdCkgIHJldHVybiBtYXBPYmplY3QubWFwT2JqZWN0SUQyOyBlbHNlIHJldHVybiBudWxsO1xuXHR9XG5cdHB1YmxpYyBnZXRPbmUoaWQ6c3RyaW5nKTphbnkge1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgb2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe19pZDogaWR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCIgZXJyb3IgZ2V0dGluZyBvbmUgTWFwXCIsIGUpO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBnZXRNYXBUeXBlKG1hcFR5cGUxOkNsYXNzVHlwZSwgbWFwVHlwZTI6Q2xhc3NUeXBlLCBkb21haW4/OnN0cmluZyk6YW55IHtcblx0XHR2YXIgbWFwTGlzdDEgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCh7bWFwT2JqZWN0VHlwZTE6IG1hcFR5cGUxLCBtYXBPYmplY3RUeXBlMjogbWFwVHlwZTJ9KS5mZXRjaCgpO1xuXHRcdGlmIChtYXBUeXBlMSA9PSBtYXBUeXBlMikgcmV0dXJuIG1hcExpc3QxO1xuXHRcdHZhciBtYXBMaXN0MiA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHttYXBPYmplY3RUeXBlMTogbWFwVHlwZTIsIG1hcE9iamVjdFR5cGUyOiBtYXBUeXBlMX0pLmZldGNoKCk7XG5cdFx0aWYgKG1hcExpc3QxID09IG51bGwpXG5cdFx0XHRyZXR1cm4gbWFwTGlzdDI7XG5cdFx0aWYgKG1hcExpc3QyID09IG51bGwpXG5cdFx0XHRyZXR1cm4gbWFwTGlzdDE7XG5cdFx0dmFyIHJldHVybk1hcCA9IG1hcExpc3QxLmNvbmNhdChtYXBMaXN0Mik7XG5cdFx0cmV0dXJuIHJldHVybk1hcFxuXHR9XG5cdHB1YmxpYyBnZXRNYXBzU3RyaWN0KGlkOnN0cmluZykgOiBBcnJheTxNYXBMaXN0PiB7XG5cdFx0dmFyIHJldHVybkxpc3QgPSBuZXcgQXJyYXk8TWFwTGlzdD4oKTtcblx0XHR2YXIgdGhlTGlzdCAgICA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHttYXBPYmplY3RJRDE6IGlkfSkuZmV0Y2goKTtcblx0XHR2YXIgaW5kZXggICAgICA9IDA7XG5cdFx0dHJ5IHtcblx0XHRcdGZvciAodmFyIGl0ZW0gaW4gdGhlTGlzdCkge1xuXHRcdFx0XHR2YXIgbWFwTGlzdCA9IG5ldyBNYXBMaXN0KCk7XG5cdFx0XHRcdG1hcExpc3QuaWQgPSBpZDtcblx0XHRcdFx0bWFwTGlzdC5sZWZ0VG9SaWdodCA9IHRydWU7XG5cdFx0XHRcdG1hcExpc3QuaWRUeXBlID0gdGhlTGlzdFtpdGVtXS5tYXBPYmplY3RUeXBlMTtcblx0XHRcdFx0bWFwTGlzdC5tYXBJRCA9IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0SUQyO1xuXHRcdFx0XHRtYXBMaXN0Lm1hcFR5cGUgPSB0aGVMaXN0W2l0ZW1dLm1hcE9iamVjdFR5cGUyO1xuXHRcdFx0XHRyZXR1cm5MaXN0LnB1c2gobWFwTGlzdCk7O1xuXHRcdFx0fVxuXHRcdFx0dmFyIHRoZUxpc3QyID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe21hcE9iamVjdElEMjogaWR9KS5mZXRjaCgpO1xuXHRcdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGVMaXN0Mikge1xuXHRcdFx0XHRtYXBMaXN0ID0gbmV3IE1hcExpc3QoKTtcblx0XHRcdFx0bWFwTGlzdC5pZCA9IGlkO1xuXHRcdFx0XHRtYXBMaXN0LmxlZnRUb1JpZ2h0ID0gZmFsc2U7XG5cdFx0XHRcdG1hcExpc3QuaWRUeXBlID0gdGhlTGlzdDJbaXRlbV0ubWFwT2JqZWN0VHlwZTI7XG5cdFx0XHRcdG1hcExpc3QubWFwSUQgPSB0aGVMaXN0MltpdGVtXS5tYXBPYmplY3RJRDE7XG5cdFx0XHRcdG1hcExpc3QubWFwVHlwZSA9IHRoZUxpc3QyW2l0ZW1dLm1hcE9iamVjdFR5cGUxO1xuXHRcdFx0XHRyZXR1cm5MaXN0LnB1c2gobWFwTGlzdCk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgaW4gZ2V0TWFwc1N0cmljdFwiLCBlLCB7aWQ6IGlkfSk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHJldHVybkxpc3Q7XG5cdH1cblx0cHVibGljIGhhc0NoaWxkcmVuKGlkOnN0cmluZyk6Ym9vbGVhbiB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciB0aGVMaXN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe21hcE9iamVjdElEMTogaWR9KS5mZXRjaCgpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcIkVycm9yIGluIGhhc0NoaWxkcmVuXCIsIGUsIHtpZDogaWR9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoZUxpc3QubGVuZ3RoID4gMClcblx0XHRcdHJldHVybiB0cnVlOyBlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIGdldE1hcHMoaWQ6c3RyaW5nKTpBcnJheTxhbnk+IHtcblx0XHR2YXIgdGhlTGlzdCA9IEFycmF5KCk7XG5cdFx0dGhlTGlzdCAgICAgID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe21hcE9iamVjdElEMTogaWR9KS5mZXRjaCgpO1xuXHRcdHZhciB0aGVMaXN0MiA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHttYXBPYmplY3RJRDI6IGlkfSkuZmV0Y2goKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoZUxpc3QyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbmV3TWFwT2JqZWN0ICAgICAgICAgID0gdGhlTGlzdDJbaV07XG5cdFx0XHR2YXIgaWQxICAgICAgICAgICAgICAgICAgID0gbmV3TWFwT2JqZWN0Lm1hcE9iamVjdElEMTtcblx0XHRcdG5ld01hcE9iamVjdC5tYXBPYmplY3RJRDEgPSBuZXdNYXBPYmplY3QubWFwT2JqZWN0SUQyO1xuXHRcdFx0bmV3TWFwT2JqZWN0Lm1hcE9iamVjdElEMiA9IGlkMTtcblx0XHRcdHRoZUxpc3QucHVzaChuZXdNYXBPYmplY3QpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhlTGlzdDtcblx0fVxuXHRwdWJsaWMgZ2V0TWFwKGlkMTpzdHJpbmcsIGlkMjpzdHJpbmcpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIHRoZU9iamVjdCA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kT25lKHttYXBPYmplY3RJRDE6IGlkMSwgbWFwT2JqZWN0SUQyOiBpZDJ9KVxuXHRcdFx0aWYgKCF0aGVPYmplY3QpIHtcblx0XHRcdFx0dGhlT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe21hcE9iamVjdElEMTogaWQyLCBtYXBPYmplY3RJRDI6IGlkMX0pXG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgRmluZGluZyBPbmUgTWFwIFwiICsgZSwgZSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGVPYmplY3Q7XG5cdH1cblx0cHVibGljIGV4aXN0cyhpZDE6c3RyaW5nLCBpZDI6c3RyaW5nKTpib29sZWFuIHtcblx0XHR2YXIgb2JqZWN0ID0gdGhpcy5nZXRNYXAoaWQxLCBpZDIpO1xuXHRcdGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuIGZhbHNlOyBlbHNlIHJldHVybiB0cnVlO1xuXHR9XG5cdHB1YmxpYyBjaGFuZ2VQYXJlbnQoaWQsIG9sZFBhcmVudCwgbmV3UGFyZW50KTphbnkge1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbGlua1JlY29yZHMgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCh7bWFwT2JqZWN0SUQxOiBvbGRQYXJlbnQsIG1hcE9iamVjdElEMjogaWR9KS5mZXRjaCgpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGZuZGluZyByZWNvcmQgaW4gTWFwcyAtIENoYW5nZVBhcmVudFwiLCBlKTtcblx0XHR9XG5cdFx0aWYgKGxpbmtSZWNvcmRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcImV4cGVjdGVkIG9ubHkgMSBwYXJlbnQgaW4gR2V0UGFyZW50IGNhbGwgZ290IG1vcmUgdGhhbjFcIik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0dmFyIGxpbmtSZWNvcmQgPSBsaW5rUmVjb3Jkc1swXTtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnVwZGF0ZSh7X2lkOiBsaW5rUmVjb3JkLl9pZH0sIHskc2V0OiB7bWFwT2JqZWN0SUQxOiBuZXdQYXJlbnR9fSlcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciB1cGRhdGluZyBNYXBzIGZvciBJRCBcIiwgZSwge2xpbmtSZWNvcmQ6IGxpbmtSZWNvcmR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmtSZWNvcmQuX2lkO1xuXHR9XG5cdHB1YmxpYyBoYXNQYXJlbnRzKGlkKSB7XG5cdFx0dmFyIHBhcmVudExpc3QgPSB0aGlzLmdldFBhcmVudHMoaWQpO1xuXHRcdGlmIChwYXJlbnRMaXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGlmIChwYXJlbnRMaXN0WzBdLm1hcE9iamVjdElEMSA9PT0gXCIwXCIpXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIGdldFBhcmVudElEKGlkKSB7XG5cdFx0dmFyIHBhcmVudExpc3QgPSB0aGlzLmdldFBhcmVudHMoaWQpO1xuXHRcdGlmIChwYXJlbnRMaXN0ICE9IG51bGwgJiYgcGFyZW50TGlzdC5sZW5ndGggIT0gMClcblx0XHRcdHJldHVybiBwYXJlbnRMaXN0WzBdLm1hcE9iamVjdElEMTsgZWxzZSByZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgZ2V0UGFyZW50cyhpZDpzdHJpbmcpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIHRoZUxpc3Q6QXJyYXk8YW55PiA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHtcblx0XHRcdFx0bWFwT2JqZWN0SUQyOiBpZFxuXHRcdFx0fSkuZmV0Y2goKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBHZXRQYXJlbnRzIFwiICsgaWQgKyBcIiBcIiwgZSk7XG5cdFx0fVxuXHRcdHZhciBwYXJlbnRMaXN0OkFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoZUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGVMaXN0W2ldLm1hcE9iamVjdFR5cGUxID09PSB0aGVMaXN0W2ldLm1hcE9iamVjdFR5cGUyKVxuXHRcdFx0XHRwYXJlbnRMaXN0LnB1c2godGhlTGlzdFtpXSlcblx0XHR9XG5cdFx0cmV0dXJuIHBhcmVudExpc3Q7XG5cdH1cblx0cHVibGljIGdldEZvbGRlckxpbmtzKGNsYXNzVHlwZTpDbGFzc1R5cGUsIGZvbGRlckNsYXNzVHlwZTpDbGFzc1R5cGUpOkFycmF5PGFueT4ge1xuXHRcdHZhciBmb2xkZXJMaW5rMSA9IHRoaXMuZ2V0TWFwVHlwZShmb2xkZXJDbGFzc1R5cGUsIGZvbGRlckNsYXNzVHlwZSk7XG5cdFx0dmFyIGZvbGRlckxpbmsyID0gdGhpcy5nZXRNYXBUeXBlKGZvbGRlckNsYXNzVHlwZSwgY2xhc3NUeXBlKTtcblx0XHRpZiAoZm9sZGVyTGluazEubGVuZ3RoID09IDApIHJldHVybiBmb2xkZXJMaW5rMjtcblx0XHRpZiAoZm9sZGVyTGluazIubGVuZ3RoID09IDApIHJldHVybiBmb2xkZXJMaW5rMTtcblx0XHR2YXIgcmV0dXJuTWFwID0gZm9sZGVyTGluazEuY29uY2F0KGZvbGRlckxpbmsyKTtcblx0XHRyZXR1cm4gcmV0dXJuTWFwO1xuXHR9XG5cdHB1YmxpYyBnZXRGb2xkZXJQYXJlbnQoZm9sZGVyQ2xhc3NUeXBlOnN0cmluZywgb2JqZWN0Q2xhc3NUeXBlOnN0cmluZywgY2hpbGRJRDpzdHJpbmcpOmFueSB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBtYXBPYmplY3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZE9uZSh7XG5cdFx0XHRcdG1hcE9iamVjdFR5cGUxOiBmb2xkZXJDbGFzc1R5cGUsIG1hcE9iamVjdFR5cGUyOiBvYmplY3RDbGFzc1R5cGUsIG1hcE9iamVjdElEMjogY2hpbGRJRFxuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgR2V0UGFyZW50cyBcIiArIGNoaWxkSUQgKyBcIiBcIiwgZSwge1xuXHRcdFx0XHRmb2xkZXJDbGFzc1R5cGU6IGZvbGRlckNsYXNzVHlwZSwgb2JqZWN0Q2xhc3NUeXBlOiBvYmplY3RDbGFzc1R5cGUsIGNoaWxkSUQ6IGNoaWxkSURcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAobWFwT2JqZWN0ID09IG51bGwpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiBtYXBPYmplY3Q7XG5cdH1cblx0cHVibGljIGNoYW5nZUZvbGRlclBhcmVudChmb2xkZXJDbGFzc1R5cGU6c3RyaW5nLCBjaGlsZENsYXNzVHlwZTpzdHJpbmcsIGNoaWxkSUQ6c3RyaW5nLCBvbGRQYXJlbnRJRDpzdHJpbmcsIG5ld1BhcmVudElEOnN0cmluZykge1xuXHRcdHZhciBtYXBPYmplY3QgPSB0aGlzLmdldE1hcChvbGRQYXJlbnRJRCwgY2hpbGRJRCk7XG5cdFx0dGhpcy51cGRhdGVBdHRyaWJ1dGUobWFwT2JqZWN0Ll9pZCwgXCJtYXBPYmplY3RJRDFcIiwgbmV3UGFyZW50SUQpO1xuXHR9XG5cdHB1YmxpYyBkZWxldGVMaW5rKGZyb21JRDpzdHJpbmcsIHRvSUQ/OnN0cmluZykge1xuXHRcdGlmICghdG9JRCkgdG9JRCA9IG51bGw7XG5cdFx0TWV0ZW9yLmNhbGwoXCJkZWxldGVMaW5rXCIsIGZyb21JRCwgdG9JRCwgZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBjYWxsaW5nIHNlcnZlciBmb3IgZGVsZXRlTGluayB3aXRoIGlkIFwiICsgZnJvbUlEICsgXCIgdG8gXCIgKyB0b0lELCBlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXHRwdWJsaWMgZGVsZXRlTGlua1NlcnZlcihmcm9tSUQ6c3RyaW5nLCB0b0lEPzpzdHJpbmcpIHtcblx0XHRpZiAoIXRvSUQpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe21hcE9iamVjdElEMTogZnJvbUlEfSk7XG5cdFx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe21hcE9iamVjdElEMjogZnJvbUlEfSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIHJlbW92aW5nIGxpbmtzIGZyb20gbWFwIGZvciBpZCA9IFwiICsgZnJvbUlELCBlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnJlbW92ZSh7bWFwT2JqZWN0SUQxOiBmcm9tSUQsIG1hcE9iamVjdElEMjogdG9JRH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciByZW1vdmluZyBsaW5rcyBmcm9tIG1hcCBmb3IgZnJvbUlEID0gXCIgKyBmcm9tSUQgKyBcIiB0b0lEIFwiICsgdG9JRCwgZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyByZW1vdmVSZWZlcmVuY2UoaWQxOnN0cmluZywgaWQyOnN0cmluZykge1xuXHRcdHZhciByZXN1bHQgPSBNZXRlb3IuY2FsbChcInJlbW92ZU1hcFJlZmVyZW5jZVwiLCB7aWQxOiBpZDEsIGlkMjogaWQyLCBjbGFzc1R5cGU6IHRoaXMuY2xhc3NUeXBlfSk7XG5cdH1cblx0cHVibGljIHJlbW92ZVJlZmVyZW5jZVNlcnZlcihpZDE6c3RyaW5nLCBpZDI/OnN0cmluZykge1xuXHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe21hcE9iamVjdElEMTogaWQxfSk7XG5cdFx0aWYgKGlkMilcblx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe21hcE9iamVjdElEMjogaWQyfSk7XG5cdH1cblxufSB0aGlzLk1hcHMgPSBNYXBzO1xuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiTWFwc1wiLCBNYXBzKTtcblxuY2xhc3MgRm9sZGVyQmFzZSBleHRlbmRzIFRyZWVCYXNlIHtcblxuXHRwdWJsaWMgc3RhdGljIEZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGU6Q2xhc3NUeXBlKTpzdHJpbmcge1xuXHRcdHJldHVybiBjbGFzc1R5cGUgKyBcIl9mb2xkZXJcIjtcblx0fVxuXHRjb25zdHJ1Y3RvcihjbGFzc1R5cGU6c3RyaW5nKSB7XG5cdFx0c3VwZXIoY2xhc3NUeXBlKTtcblx0fVxuXHRwdWJsaWMgYWRkTmV3Rm9sZGVyKG5hbWU6c3RyaW5nLCBjbGFzc1R5cGU6Q2xhc3NUeXBlLCBkZXNjcmlwdGlvbjpzdHJpbmcgPSBudWxsLCBwYXJlbnRGb2xkZXJJRDpzdHJpbmcgPSBudWxsKSB7XG5cdFx0dmFyIG5ld0lEO1xuXHRcdGlmIChwYXJlbnRGb2xkZXJJRCA9PSBudWxsKVxuXHRcdFx0cGFyZW50Rm9sZGVySUQgPSB0aGlzLmdldFJvb3QoY2xhc3NUeXBlKTtcblx0XHRpZiAoIWRlc2NyaXB0aW9uKSBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cdFx0dHJ5IHtcblx0XHRcdG5ld0lEID0gdGhpcy50aGVDb2xsZWN0aW9uLmluc2VydCh7XG5cdFx0XHRcdG5hbWUgICAgICAgICAgIDogbmFtZSxcblx0XHRcdFx0ZGVzY3JpcHRpb24gICAgOiBkZXNjcmlwdGlvbixcblx0XHRcdFx0Y2xhc3NUeXBlICAgICAgOiBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpLFxuXHRcdFx0XHRmb2xkZXJDbGFzc1R5cGU6IGNsYXNzVHlwZVxuXHRcdFx0fSwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpXG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgaW5zZXJ0aW5nIGZvbGRlciBcIiArIGUsIG51bGwsIHtcblx0XHRcdFx0bmFtZTogbmFtZSwgY2xhc3NUeXBlOiBjbGFzc1R5cGUsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwgcGFyZW50Rm9sZGVySUQ6IHBhcmVudEZvbGRlcklEXG5cdFx0XHR9KVxuXHRcdH1cblx0XHR2YXIgbWFwICAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgbmV3TWFwID0gbWFwLmFkZE5ld01hcChcIjxcIiArIG5hbWUgKyBcIj5cIiwgRm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKSwgcGFyZW50Rm9sZGVySUQsXG5cdFx0XHRGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpLCBuZXdJRCk7XG5cdFx0cmV0dXJuIG5ld0lEO1xuXHR9XG5cdHB1YmxpYyBhZGRGb2xkZXJSb290KGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcblx0XHR2YXIgb2JqZWN0U3BlYyA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcblx0XHR2YXIgbGFiZWwgICAgICA9IG9iamVjdFNwZWMubGFiZWw7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBuZXdJRCA9IHRoaXMudGhlQ29sbGVjdGlvbi5pbnNlcnQoe1xuXHRcdFx0XHRmb2xkZXJDbGFzc1R5cGU6IGNsYXNzVHlwZSxcblx0XHRcdFx0bmFtZSAgICAgICAgICAgOiBsYWJlbCxcblx0XHRcdFx0Y2xhc3NUeXBlICAgICAgOiBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpLFxuXHRcdFx0XHRkZXNjcmlwdGlvbiAgICA6IGxhYmVsICsgXCJSb290IE5vZGVcIixcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG1hcCAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHRcdG1hcC5hZGRGb2xkZXJSb290TWFwKGxhYmVsLCBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpLCBuZXdJRCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgQWRkaW5nIFJvb3QgZm9yIGZvbGRlciBcIiArIGNsYXNzVHlwZSwgZSwge2NsYXNzVHlwZTogY2xhc3NUeXBlfSk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld0lEO1xuXHR9XG5cdHB1YmxpYyBjaGFuZ2VOYW1lKGlkOnN0cmluZywgbmFtZTpzdHJpbmcpIHtcblx0XHR0cnkge1xuXHRcdFx0Rm9sZGVyU3RvcmUudXBkYXRlKHtfaWQ6IGlkfSwgeyRzZXQ6IHtuYW1lOiBuYW1lfX0sIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBVcGRhdGluZyBGb2xkZXIgTmFtZVwiLCBlLCB7aWQ6IGlkLCBuYW1lOiBuYW1lfSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBjaGFuZ2VGb2xkZXJQYXJlbnQoY2xhc3NUeXBlLCBpc0NoaWxkQUZvbGRlcjpib29sZWFuLCBjaGlsZElEOnN0cmluZywgbmV3UGFyZW50SUQ6c3RyaW5nKSB7XG5cdFx0aWYgKGlzQ2hpbGRBRm9sZGVyKVxuXHRcdFx0dmFyIGNoaWxkQ2xhc3NUeXBlID0gRm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKTsgZWxzZVxuXHRcdFx0Y2hpbGRDbGFzc1R5cGUgPSBjbGFzc1R5cGU7XG5cdFx0dmFyIGZvbGRlckNsYXNzVHlwZSA9IEZvbGRlckJhc2UuRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZSk7XG5cdFx0dmFyIG1hcFByb3h5ID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgb2xkUGFyZW50TWFwID0gbWFwUHJveHkuZ2V0Rm9sZGVyUGFyZW50KGZvbGRlckNsYXNzVHlwZSwgY2hpbGRDbGFzc1R5cGUsIGNoaWxkSUQpO1xuXHRcdG1hcFByb3h5LmNoYW5nZUZvbGRlclBhcmVudChmb2xkZXJDbGFzc1R5cGUsIGNoaWxkQ2xhc3NUeXBlLCBjaGlsZElELCBvbGRQYXJlbnRNYXAubWFwT2JqZWN0SUQxLCBuZXdQYXJlbnRJRClcblx0fVxuXHRwdWJsaWMgY2hhbmdlT2JqZWN0Rm9sZGVyKGNsYXNzVHlwZTpzdHJpbmcsIGlkOnN0cmluZywgbmV3UGFyZW50SUQ6c3RyaW5nKSB7XG5cdFx0dmFyIG9sZFBhcmVudElEID0gdGhpcy5nZXRQYXJlbnRJRChpZCk7XG5cdFx0dmFyIG1hcCA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XG5cdFx0bWFwLmNoYW5nZVBhcmVudChpZCwgb2xkUGFyZW50SUQsIG5ld1BhcmVudElEKTtcblx0fVxuXHRwdWJsaWMgbGlua1RvRm9sZGVyKG5vZGVJRDpzdHJpbmcsIGNsYXNzVHlwZTpDbGFzc1R5cGUsIGZvbGRlcklEOnN0cmluZyk6YW55IHtcblx0XHR2YXIgbWFwICAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgbmV3TWFwID0gbWFwLmFkZE5ld01hcChcIkZvbGRlciBMaW5rXCIsIEZvbGRlckJhc2UuRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZSksIGZvbGRlcklELCBjbGFzc1R5cGUsIG5vZGVJRCk7XG5cdFx0cmV0dXJuIG5ld01hcDtcblx0fVxuXHRwdWJsaWMgcmVtb3ZlRm9sZGVyTGluayhpZDpzdHJpbmcpIHtcblx0fVxuXHRwdWJsaWMgZ2V0UGFyZW50SUQoaWQpOmFueSB7XG5cdFx0cmV0dXJuIHN1cGVyLmdldFBhcmVudElEKGlkKTtcblx0fVxuXHRwdWJsaWMgZ2V0Rm9sZGVycyhjbGFzc1R5cGU6Q2xhc3NUeXBlKTpBcnJheTxhbnk+IHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIGZvbGRlckxpc3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCh7Y2xhc3NUeXBlOiBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpfSkuZmV0Y2goKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBHZXR0aW5nIEZvbGRlcnMgZm9yIFwiICsgY2xhc3NUeXBlLCBlKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gZm9sZGVyTGlzdDtcblx0fVxuXHRwdWJsaWMgZ2V0TGlua3MoY2xhc3NUeXBlOkNsYXNzVHlwZSk6QXJyYXk8YW55PiB7XG5cdFx0dmFyIGZvbGRlclJvb3QgID0gdGhpcy5nZXRSb290KGNsYXNzVHlwZSk7XG5cdFx0dmFyIG1hcCAgICAgICAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgZm9sZGVyTGlua3MgPSBtYXAuZ2V0Rm9sZGVyTGlua3MoY2xhc3NUeXBlLCBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpKTtcblx0XHRyZXR1cm4gZm9sZGVyTGlua3M7XG5cdH1cblx0cHVibGljIGdldFJvb3QoY2xhc3NUeXBlOkNsYXNzVHlwZSk6YW55IHtcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcblx0XHR2YXIgbWFwT2JqZWN0ID0gbWFwLmdldFJvb3RGb2xkZXIoRm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKSk7XG5cdFx0aWYgKCFtYXBPYmplY3QpXG5cdFx0XHRtYXBPYmplY3QgPSB0aGlzLmFkZEZvbGRlclJvb3QoY2xhc3NUeXBlKTtcblx0XHRyZXR1cm4gbWFwT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyByZW1vdmUoaWQ6c3RyaW5nKSB7XG5cdFx0aWYgKCF0aGlzLmlzRW1wdHkoaWQpKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBUcnlpbmcgdG8gRGVsZXRlIEZvbGRlciB0aGF0IGlzIG5vdCBlbXB0eVwiLCBuZXcgRXJyb3IoKSwge2lkOiBpZH0pO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRzdXBlci5yZW1vdmUoaWQpO1xuXHRcdHZhciBtYXBQcm94eSA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UoQ2xhc3NUeXBlLk1BUCk7XG5cdFx0dmFyIHRoZU1hcHMgPSBtYXBQcm94eS5nZXRNYXBzKGlkKTtcblx0XHRpZiAodGhlTWFwcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFeHBlY3RlZCBPbmx5IDEgTWFwIGZvciBkZWxldGluZyBmb2xkZXIgZm91bmQgbXVsdGlwbGVcIiwgbmV3IEVycm9yKCksIHtpZDogaWR9KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0bWFwUHJveHkucmVtb3ZlKHRoZU1hcHNbMF0uX2lkKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgaXNFbXB0eShmb2xkZXJJRDpzdHJpbmcpOmJvb2xlYW4ge1xuXHRcdHZhciBtYXBQcm94eSA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UoQ2xhc3NUeXBlLk1BUCk7XG5cdFx0cmV0dXJuICFtYXBQcm94eS5oYXNDaGlsZHJlbihmb2xkZXJJRCk7XG5cdH1cblxufSB0aGlzLkZvbGRlckJhc2UgPSBGb2xkZXJCYXNlO1xuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiRm9sZGVyQmFzZVwiLCBGb2xkZXJCYXNlKTtcblxuIl19