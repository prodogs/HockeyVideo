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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUFfQmFzaWNDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFBX0Jhc2ljQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0Esc0NBQXNDO0FBRXRDLCtEQUErRDtBQVEvRCxXQUFXO0FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRTVDLHVCQUF1QixNQUFNO0lBeUM1QixZQUFZLFNBQW9CO1FBQy9CLE9BQU8sQ0FBQztRQXBDQyxvQkFBZSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFxQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFuQ0QsT0FBYyxPQUFPLENBQUMsR0FBRztRQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO0lBQ2pFLENBQUM7SUFDRCxPQUFjLEtBQUssQ0FBQyxHQUFHO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxJQUFJLFdBQVcsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQUMsSUFBSTtZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELE9BQWMsSUFBSSxDQUFDLFNBQWdCO1FBQ2xDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FB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QixJQUFJLFFBQVEsR0FBVSxPQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztBQUVGLENBQUM7QUFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUMvQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBQV9NZXRhRGF0YS50c1wiLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XHJcbi8vcmVnaW9uIEdsb2JhbCBWYXJpYWJsZSBEZWNsYXJhdGlvblxyXG5cclxuZGVjbGFyZSB2YXIgUmVsYXRpb25zaGlwU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbmRlY2xhcmUgdmFyIE1ldGFEYXRhU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcbmRlY2xhcmUgdmFyIENvdW50ZXJTdG9yZTpNb25nby5Db2xsZWN0aW9uPGFueT5cclxuZGVjbGFyZSB2YXIgTWFwU3RvcmU6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcblxyXG4vL2VuZHJlZ2lvblxyXG5jb25zb2xlLmxvZyhcIkxvYWRpbmcgQUFfQmFzaWNDbGFzcy50cyAuLi5cIik7XHJcblxyXG5jbGFzcyBDNE9iamVjdCBleHRlbmRzIE9iamVjdCB7XHJcblx0cHJpdmF0ZSBcdF9pZCA6IHN0cmluZztcclxuXHRwcml2YXRlIFx0dGhlSUQgOiBzdHJpbmc7XHJcblx0cHVibGljIFx0XHRjbGFzc1R5cGU6Q2xhc3NUeXBlO1xyXG5cdHByaXZhdGUgXHRfdHlwZU5hbWUgOiBzdHJpbmc7XHJcblxyXG5cdHByb3RlY3RlZCBldmVudHNQdWJsaXNoZWQgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdHByb3RlY3RlZCBub3RpZnlFdmVudHM6QXJyYXk8YW55PjtcclxuXHJcblx0cHVibGljIHN0YXRpYyBJc0FycmF5KG9iaikge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIENsb25lKG9iaikge1xyXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0cmV0dXJuIGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIG9iaik7IGVsc2VcclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgSGFzaCh0aGVTdHJpbmc6c3RyaW5nKTpudW1iZXIge1xyXG5cdFx0dmFyIGhhc2ggPSAwLCBpLCBjaHIsIGxlbjtcclxuXHRcdGlmICh0aGVTdHJpbmcubGVuZ3RoID09PSAwKSByZXR1cm4gaGFzaDtcclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IHRoZVN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRjaHIgID0gdGhlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcblx0XHRcdGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNocjtcclxuXHRcdFx0aGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcclxuXHRcdH1cclxuXHRcdHJldHVybiBoYXNoO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldElEKG9iamVjdCkge1xyXG5cdFx0dmFyIGlkID0gb2JqZWN0W1wiX2lkXCJdXHJcblx0XHRpZiAodHlwZW9mIGlkID09IFwic3RyaW5nXCIpXHJcblx0XHRcdHJldHVybiBpZDtcclxuXHRcdGlmICh0eXBlb2YgaWQgPT0gXCJvYmplY3RcIilcclxuXHRcdFx0cmV0dXJuIGlkLl9zdHI7XHJcblx0XHRpZCA9IG9iamVjdFtcImlkXCJdO1xyXG5cdFx0aWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0aWQgPSBvYmplY3RbXCJ0aGVJRFwiXTtcclxuXHRcdGlmICh0eXBlb2YgaWQgPT0gXCJzdHJpbmdcIilcclxuXHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdGNvbnN0cnVjdG9yKGNsYXNzVHlwZT86Q2xhc3NUeXBlKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5jbGFzc1R5cGUgPSBjbGFzc1R5cGU7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRJRCgpIHtcclxuXHRcdGlmICh0aGlzW1wiX2lkXCJdIT1udWxsICYmIHR5cGVvZiB0aGlzW1wiX2lkXCJdW1wiX3N0clwiXSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRoaXNbXCJfaWRcIl1bXCJfc3RyXCJdO1xyXG5cdFx0aWYgKHRoaXNbXCJ0aGVJRFwiXSE9bnVsbCAmJiB0eXBlb2YgdGhpc1tcInRoZUlEXCJdW1wiX3N0clwiXSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRoaXNbXCJ0aGVJRFwiXVtcIl9zdHJcIl07XHJcblx0XHRpZiAodHlwZW9mIHRoaXNbXCJfaWRcIl0gIT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRoaXNbXCJfaWRcIl07XHJcblx0XHRpZiAodHlwZW9mIHRoaXNbXCJ0aGVJRFwiXSAhPSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdGhpc1tcInRoZUlEXCJdO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0SUQodGhlSUQgOiBzdHJpbmcpIHtcclxuXHRcdHRoaXNbXCJfaWRcIl0gPSB0aGVJRDtcclxuXHRcdHRoaXNbXCJ0aGVJRFwiXSA9IHRoZUlEO1xyXG5cdH1cclxuXHRwdWJsaWMgdHlwZU5hbWUoKSA6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHlwZU5hbWU7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRUeXBlTmFtZSh0eXBlIDogc3RyaW5nKSB7XHJcblx0XHR0aGlzLl90eXBlTmFtZSA9IHR5cGU7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRFdmVudFB1YmxpY2F0aW9uKGV2ZW50OnN0cmluZykge1xyXG5cdFx0dGhpcy5ldmVudHNQdWJsaXNoZWQucHVzaChldmVudCk7XHJcblx0fVxyXG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQ6c3RyaW5nLCBvYmplY3Q6YW55LCBjYWxsZXI/OmFueSkge3JldHVybjt9XHJcblx0cHVibGljIHB1Ymxpc2goZXZlbnQ6c3RyaW5nLCBvYmplY3Q6YW55KSB7XHJcblx0XHRpZiAoIXRoaXMubm90aWZ5RXZlbnRzIHx8ICF0aGlzLm5vdGlmeUV2ZW50c1tldmVudF0pIHJldHVybiBmYWxzZTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdKSB7XHJcblx0XHRcdHZhciBwdWJsaXNoRXZlbnQgPSB0aGlzLm5vdGlmeUV2ZW50c1tldmVudF1baXRlbV07XHJcblx0XHRcdHZhciBjb21wb25lbnQgICAgPSB0aGlzLm5vdGlmeUV2ZW50c1tldmVudF1baXRlbV0uY29tcG9uZW50O1xyXG5cdFx0XHRpZiAodGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdW2l0ZW1dLm9iamVjdEhhbmRsZXIgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGNvbXBvbmVudFt0aGlzLm5vdGlmeUV2ZW50c1tldmVudF1baXRlbV0ub2JqZWN0SGFuZGxlcl0ocHVibGlzaEV2ZW50LnNlbmRFdmVudCwgb2JqZWN0LCB0aGlzKTtcclxuXHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0Y29tcG9uZW50Lmxpc3RlbihwdWJsaXNoRXZlbnQuc2VuZEV2ZW50LCBvYmplY3QsIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc3Vic2NyaWJlKGV2ZW50OnN0cmluZywgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50LCBzZW5kRXZlbnQ/OnN0cmluZywgb2JqZWN0TWV0aG9kID0gbnVsbCkge1xyXG5cdFx0aWYgKCFzZW5kRXZlbnQpIHNlbmRFdmVudCA9IGV2ZW50O1xyXG5cdFx0aWYgKCF0aGlzLm5vdGlmeUV2ZW50cykge1xyXG5cdFx0XHR0aGlzLm5vdGlmeUV2ZW50cyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMubm90aWZ5RXZlbnRzW2V2ZW50XSlcclxuXHRcdFx0dGhpcy5ub3RpZnlFdmVudHNbZXZlbnRdID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHRoaXMubm90aWZ5RXZlbnRzW2V2ZW50XVt0aGVDb21wb25lbnQuZ2V0Q29tcG9uZW50SUQoKV0gPSB7XHJcblx0XHRcdGNvbXBvbmVudDogdGhlQ29tcG9uZW50LCBzZW5kRXZlbnQ6IHNlbmRFdmVudCwgb2JqZWN0SGFuZGxlcjogb2JqZWN0TWV0aG9kXHJcblx0XHR9O1xyXG5cdH1cclxuXHRwdWJsaWMgY2xhc3NMYWJlbCgpOnN0cmluZyB7XHJcblx0XHRyZXR1cm4gRmFjdG9yeS5HZXRDbGFzc0xhYmVsKHRoaXMuY2xhc3NUeXBlKTtcclxuXHR9XHJcblx0cHVibGljIGNsYXNzUm9vdE5vZGUoKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIEZhY3RvcnkuR2V0Q2xhc3NSb290TmFtZSh0aGlzLmNsYXNzVHlwZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBmcm9tSlNPTlZhbHVlKGRvYzphbnkpIHtcclxuXHRcdC8vIGRlZmF1bHQgaW1wbGVtZW50YXRpb25cclxuXHRcdGZvciAodmFyIHByb3BlcnRpZXMgaW4gZG9jKSB7XHJcblx0XHRcdHRoaXNbcHJvcGVydGllc10gPSBkb2NbcHJvcGVydGllc107XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW1wiX2lkXCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXNbXCJ0aGVJRFwiXT09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHR0aGlzW1widGhlSURcIl0gPSB0aGlzW1wiX2lkXCJdO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Q2xhc3NOYW1lKCkge1xyXG5cdFx0dmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb24gKC57MSx9KVxcKC87XHJcblx0XHR2YXIgcmVzdWx0cyAgICAgICA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKHRoaXNbXCJjb25zdHJ1Y3RvclwiXS50b1N0cmluZygpKTtcclxuXHRcdHJldHVybiAocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEpID8gcmVzdWx0c1sxXSA6IFwiXCI7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6c3RyaW5nLCBwcm9wZXJ0eVZhbHVlOmFueSkge1xyXG5cdFx0dGhpc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlWYWx1ZTtcclxuXHR9XHJcblx0cHVibGljIGNsb25lKCk6YW55IHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ICE9IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzKTsgZWxzZVxyXG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSk7XHJcblx0fVxyXG5cclxufSB0aGlzLkM0T2JqZWN0ID0gQzRPYmplY3Q7XHJcblxyXG5jbGFzcyBGYWN0b3J5IGV4dGVuZHMgQzRPYmplY3Qge1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIHN0cmluZ1RvQ2xhc3M6QXJyYXk8Q2xhc3NUeXBlPiA9IG5ldyBBcnJheTxDbGFzc1R5cGU+KCk7XHJcblx0cHVibGljIHN0YXRpYyByZWxhdGlvbnNoaXBBcnJheTpBcnJheTxhbnk+O1xyXG5cdHB1YmxpYyBzdGF0aWMgY29sbGVjdGlvbkFycmF5OkFycmF5PENsYXNzTWV0YURhdGE+O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIEluaXRpYWxpemUoKSB7XHJcblxyXG5cdC8vXHRGYWN0b3J5LkFkZFN0cmluZ1RvQ2xhc3MoXCJNZXRyaWNNZXRhU3RvcmVcIiwgTWV0cmljTWV0YVN0b3JlKTtcclxuXHRcdGlmIChNZXRlb3IuaXNDbGllbnQpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRNZXRlb3Iuc3Vic2NyaWJlKFwiTWV0YURhdGFcIiwge1xyXG5cdFx0XHRcdFx0b25SZWFkeTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRGYWN0b3J5LmNvbGxlY3Rpb25BcnJheSA9IE1ldGFEYXRhU3RvcmUuZmluZCgpLmZldGNoKCk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiQ29tcGxldGVkIExvYWRpbmcgb2YgTWV0YSBEYXRhXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdE1ldGVvci5zdWJzY3JpYmUoXCJSZWxhdGlvbnNoaXBzXCIsICB7XHJcblx0XHRcdFx0XHRvblJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXkgPSBSZWxhdGlvbnNoaXBTdG9yZS5maW5kKCkuZmV0Y2goKTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJDb21wbGV0ZWQgTG9hZGluZyBvZiBSZWxhdGlvbnNoaXBcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJGYXRhbCBFcnJvciA6IEVycm9ycyByZWFkaW5nIGluaXRpYWxpemluZyBNZXRhRGF0YSBcIiwgZSk7XHJcblx0XHRcdFx0ZGVidWdnZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdCBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheSA9IE1ldGFEYXRhU3RvcmUuZmluZCgpLmZldGNoKCk7XHJcblx0XHRcdFx0IEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXkgPSBSZWxhdGlvbnNoaXBTdG9yZS5maW5kKCkuZmV0Y2goKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdEFwcExvZy5lcnJvcihcIkZhdGFsIEVycm9yIDogRXJyb3JzIHJlYWRpbmcgaW5pdGlhbGl6aW5nIE1ldGFEYXRhIFwiLCBlKTtcclxuXHRcdFx0XHRkZWJ1Z2dlcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBHZXRBbGxNZWFzdXJhYmxlU3ViamVjdHMoKSA6IEFycmF5PENsYXNzTWV0YURhdGE+IHtcclxuXHRcdHZhciByZXR1cm5MaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXkpIHtcclxuXHRcdFx0aWYgKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2l0ZW1dLm1lYXN1cmVhYmxlKSB7XHJcblx0XHRcdFx0cmV0dXJuTGlzdC5wdXNoKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2l0ZW1dKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybkxpc3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgSXNSb290Q2xhc1R5cGUoY2xhc3NUeXBlOkNsYXNzVHlwZSk6Ym9vbGVhbiB7XHJcblx0XHRpZiAoRmFjdG9yeS5HZXRDbGFzc0Zyb21Sb290KGNsYXNzVHlwZSkgIT0gbnVsbClcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBJc1BlcnNpc3RhbnQoY2xhc3NUeXBlOkNsYXNzVHlwZSk6Ym9vbGVhbiB7XHJcblx0XHR2YXIgb2JqZWN0U3BlYyA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcclxuXHRcdGlmICghb2JqZWN0U3BlYyB8fCAhb2JqZWN0U3BlYy5pc1BlcnNpc3RhbnQpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZVByb3h5SW5zdGFuY2VUcmVlKGNsYXNzVHlwZTpDbGFzc1R5cGUpOlRyZWVCYXNlIHtcclxuXHRcdHZhciBvYmplY3RTcGVjczpDbGFzc01ldGFEYXRhO1xyXG5cdFx0b2JqZWN0U3BlY3MgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XHJcblx0XHRpZiAob2JqZWN0U3BlY3Muc3RydWN0dXJlVHlwZSA9PSBQcm94eUNsYXNzVHlwZXMuVHJlZSlcclxuXHRcdFx0cmV0dXJuIG5ldyBUcmVlQmFzZShjbGFzc1R5cGUpOyBlbHNlIGlmIChvYmplY3RTcGVjcy5zdHJ1Y3R1cmVUeXBlID09IFByb3h5Q2xhc3NUeXBlcy5NYXApXHJcblx0XHRcdHJldHVybiA8VHJlZUJhc2U+IG5ldyBNYXBzKGNsYXNzVHlwZSk7IGVsc2UgaWYgKG9iamVjdFNwZWNzLnN0cnVjdHVyZVR5cGUgPT0gUHJveHlDbGFzc1R5cGVzLkxpYnJhcnkpXHJcblx0XHRcdHJldHVybiBuZXcgVHJlZUJhc2UoY2xhc3NUeXBlKTtcclxuXHRcdEFwcExvZy5lcnJvcihcIkF0dGVtcHQgVE8gY3JlYXRlIHRyZWUgZnJvbSBjbGFzcyB0aGF0IGlzIG5vdCBhIHRyZWVcIiwgbmV3IEVycm9yKCksIGNsYXNzVHlwZSk7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVQcm94eUluc3RhbmNlKGNsYXNzVHlwZTpDbGFzc1R5cGUpOkJhc2VDbGFzcyB7XHJcblx0XHR2YXIgb2JqZWN0U3BlY3MgPSA8Q2xhc3NNZXRhRGF0YT4gRmFjdG9yeS5HZXRPYmplY3RTcGVjcyhjbGFzc1R5cGUpO1xyXG5cdFx0VmlkZW9BcHAuYXNzZXJ0KG9iamVjdFNwZWNzICE9IG51bGwsIFwiRXJyb3IgOiBHb3QgTnVsbCB3aGVuIHRyeWluZyB0byBnZXQgcHJveHkgZm9yIGNsYXNzIFwiICsgY2xhc3NUeXBlLCBuZXcgRXJyb3IoKSk7XHJcblx0XHR2YXIgb2JqZWN0UmV0dXJuID0gRmFjdG9yeS5DcmVhdGVPYmplY3RGcm9tU3RyaW5nKG9iamVjdFNwZWNzLnByb3h5Q2xhc3NTdHJpbmcpXHJcblx0XHRWaWRlb0FwcC5hc3NlcnQoKG9iamVjdFJldHVybiAhPSBudWxsKSwgXCJFcnJvciBDYW4gTm90IEZpbmQgT2JqZWN0IG9mIFR5cGUgPSBcIiArIGNsYXNzVHlwZSwgbmV3IEVycm9yKCkpO1xyXG5cdFx0cmV0dXJuIG5ldyBvYmplY3RSZXR1cm4oY2xhc3NUeXBlKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVPYmplY3RJbnN0YW5jZShjbGFzc1R5cGU6Q2xhc3NUeXBlKTpTdWJqZWN0IHtcclxuXHRcdHZhciBvYmplY3RTcGVjcyA9IDxDbGFzc01ldGFEYXRhPiBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XHJcblx0XHR2YXIgb2JqZWN0UmV0dXJuID0gRmFjdG9yeS5DcmVhdGVPYmplY3RGcm9tU3RyaW5nKG9iamVjdFNwZWNzLm9iamVjdENsYXNzU3RyaW5nKVxyXG5cdFx0VmlkZW9BcHAuYXNzZXJ0KChvYmplY3RSZXR1cm4gIT0gbnVsbCksIFwiRXJyb3IgQ2FuIE5vdCBGaW5kIE9iamVjdCBvZiBUeXBlID0gXCIgKyBjbGFzc1R5cGUsIG5ldyBFcnJvcigpKTtcclxuXHRcdHJldHVybiBuZXcgb2JqZWN0UmV0dXJuKGNsYXNzVHlwZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChjbGFzc1R5cGU6Q2xhc3NUeXBlKTpNYXBzIHtcclxuXHRcdHZhciBvYmplY3RTcGVjcyA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcclxuXHRcdGlmIChvYmplY3RTcGVjcy5zdHJ1Y3R1cmVUeXBlICE9IFByb3h5Q2xhc3NUeXBlcy5NYXApIHJldHVyblxyXG5cdFx0cmV0dXJuIDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UoQ2xhc3NUeXBlLk1BUCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgSXNGb2xkZXJDbGFzcyhjbGFzc1R5cGU6c3RyaW5nKTpib29sZWFuIHtcclxuXHRcdHZhciB4ID0gY2xhc3NUeXBlLmluZGV4T2YoXCJfZm9sZGVyXCIpO1xyXG5cdFx0aWYgKHggIT0gLTEpIHJldHVybiB0cnVlOyBlbHNlIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVPYmplY3RGcm9tU3RyaW5nKG9iamVjdE5hbWU6c3RyaW5nKTphbnkge1xyXG5cdFx0cmV0dXJuIEZhY3Rvcnkuc3RyaW5nVG9DbGFzc1tvYmplY3ROYW1lXTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVJbnN0YW5jZUZyb21KU09OKG9iamVjdDphbnkpOkM0T2JqZWN0IHtcclxuXHRcdFZpZGVvQXBwLmFzc2VydCgoIG9iamVjdC5jbGFzc1R5cGUgIT0gbnVsbCksIFwiQ2FuIE5vdCBDcmVhdGUgT2JqZWN0IC0gY2xhc3NUeXBlIG5vdCBmb3VuZFwiKVxyXG5cdFx0dmFyIG1ldGFEYXRhID0gRmFjdG9yeS5HZXRPYmplY3RTcGVjcyhvYmplY3QuY2xhc3NUeXBlKTtcclxuXHRcdHZhciBuZXdPYmplY3QgPSBGYWN0b3J5LkNyZWF0ZU9iamVjdEluc3RhbmNlKG9iamVjdC5jbGFzc1R5cGUpO1xyXG5cdFx0bmV3T2JqZWN0LmZyb21KU09OVmFsdWUob2JqZWN0KTtcclxuXHRcdHJldHVybiBuZXdPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgR2V0UmVsYXRpb25zaGlwQXJyYXkoKTpBcnJheTxSZWxhdGlvbnNoaXBNZXRhRGF0YT4ge1xyXG5cdFx0cmV0dXJuIEZhY3RvcnkuY2FzdEl0KHRoaXMucmVsYXRpb25zaGlwQXJyYXkpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldFJlbGF0aW9uc2hpcFNwZWNzKGZyb206Q2xhc3NUeXBlLCB0bzpDbGFzc1R5cGUpOlJlbGF0aW9uc2hpcE1ldGFEYXRhIHtcclxuXHRcdHZhciByZWxhdGlvbnNoaXBBcnJheSA9IEZhY3RvcnkuR2V0UmVsYXRpb25zaGlwQXJyYXkoKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gcmVsYXRpb25zaGlwQXJyYXkpIHtcclxuXHRcdFx0aWYgKHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dLmZyb20gPT0gZnJvbSAmJiByZWxhdGlvbnNoaXBBcnJheVtpdGVtXS50byA9PSB0bylcclxuXHRcdFx0XHRyZXR1cm4gcmVsYXRpb25zaGlwQXJyYXlbaXRlbV07XHJcblx0XHRcdGlmIChyZWxhdGlvbnNoaXBBcnJheVtpdGVtXS5mcm9tID09IHRvICYmIHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dLnRvID09IGZyb20pXHJcblx0XHRcdFx0cmV0dXJuIHJlbGF0aW9uc2hpcEFycmF5W2l0ZW1dO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgR2V0VmFsaWRSZWxhdGlvbnNoaXBUeXBlcyhjbGFzc1R5cGU6Q2xhc3NUeXBlKTpBcnJheTxDbGFzc1R5cGU+IHtcclxuXHRcdHZhciByZXR1cm5BcnJheSA9IG5ldyBBcnJheTxDbGFzc1R5cGU+KCk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXlbaV0uZnJvbSA9PSBjbGFzc1R5cGUpIHtcclxuXHRcdFx0XHRyZXR1cm5BcnJheS5wdXNoKEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXlbaV0uZnJvbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5BcnJheTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBBbGxvd1JlbGF0aW9uc2hpcChmcm9tT2JqZWN0OmFueSwgdG9PYmplY3Q6YW55KTpib29sZWFuIHtcclxuXHRcdHZhciByZWxhdGlvbnNoaXBSZWNvcmQgPSBGYWN0b3J5LkdldFJlbGF0aW9uc2hpcFNwZWNzKGZyb21PYmplY3QuY2xhc3NUeXBlLCB0b09iamVjdC5jbGFzc1R5cGUpO1xyXG5cdFx0aWYgKCFyZWxhdGlvbnNoaXBSZWNvcmQpIHJldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIFJlbGF0aW9uc2hpcFBvc3NpYmlsdGllcyhmcm9tT2JqZWN0OmFueSwgdG9PYmplY3Q6YW55KTpSZWxhdGlvbnNoaXBQb3NzaWJsZSB7XHJcblx0XHR2YXIgcmV0dXJuUmVzdWx0ICAgICAgID0gbmV3IEFycmF5PFJlbGF0aW9uc2hpcFBvc3NpYmxlPigpO1xyXG5cdFx0dmFyIHJlbGF0aW9uc2hpcFJlY29yZCA9IEZhY3RvcnkuR2V0UmVsYXRpb25zaGlwU3BlY3MoZnJvbU9iamVjdC5jbGFzc1R5cGUsIHRvT2JqZWN0LmNsYXNzVHlwZSk7XHJcblx0XHRpZiAoIXJlbGF0aW9uc2hpcFJlY29yZCkge1xyXG5cdFx0XHRyZXR1cm5SZXN1bHQucHVzaChSZWxhdGlvbnNoaXBQb3NzaWJsZS5Ob3RBbGxvd2VkKTtcclxuXHRcdFx0cmV0dXJuIFJlbGF0aW9uc2hpcFBvc3NpYmxlLk5vdEFsbG93ZWQ7XHJcblx0XHR9XHJcblx0XHR2YXIgbWFwUHJveHkgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0dmFyIG1hcExpc3QgPSBtYXBQcm94eS5nZXRNYXAoZnJvbU9iamVjdC5faWQsIHRvT2JqZWN0Ll9pZCk7XHJcblx0XHRpZiAoIW1hcExpc3QgfHwgbWFwTGlzdC5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRyZXR1cm5SZXN1bHQucHVzaChSZWxhdGlvbnNoaXBQb3NzaWJsZS5BZGQpO1xyXG5cdFx0XHRyZXR1cm4gUmVsYXRpb25zaGlwUG9zc2libGUuQWRkO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFJlbGF0aW9uc2hpcFBvc3NpYmxlLlJlcGxhY2U7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgR2V0TWFuZGF0b3J5UmVsYXRpb25zaGlwcyhjbGFzc1R5cGU6Q2xhc3NUeXBlKTpBcnJheTxSZWxhdGlvbnNoaXBNZXRhRGF0YT4ge1xyXG5cdFx0dmFyIGRlcGVuZGVuY3lMaXN0ID0gbmV3IEFycmF5PFJlbGF0aW9uc2hpcE1ldGFEYXRhPigpO1xyXG5cdFx0dmFyIG1hbmRhdG9yeSAgICAgID0gZmFsc2U7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXlbaV0uZnJvbSA9PSBjbGFzc1R5cGUpIHtcclxuXHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IEZhY3RvcnkucmVsYXRpb25zaGlwQXJyYXlbaV07XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkZXBlbmRlbmN5LnJlbGF0aW9uc2hpcExhYmVscy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0aWYgKGRlcGVuZGVuY3kucmVsYXRpb25zaGlwTGFiZWxzW2pdLm9wdGlvbmFsID09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdG1hbmRhdG9yeSA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtYW5kYXRvcnkgPT0gdHJ1ZSkgZGVwZW5kZW5jeUxpc3QucHVzaCg8YW55PmRlcGVuZGVuY3kpO1xyXG5cdFx0XHRcdG1hbmRhdG9yeSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGVwZW5kZW5jeUxpc3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgY2FzdEl0KHRoZUFycmF5OkFycmF5PGFueT4pOkFycmF5PFJlbGF0aW9uc2hpcE1ldGFEYXRhPiB7XHJcblx0XHRyZXR1cm4gdGhlQXJyYXk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgQWRkU3RyaW5nVG9DbGFzcyhjbGFzc1N0cmluZzpzdHJpbmcsIHRoZUNsYXNzOkNsYXNzVHlwZSk6YW55IHtcclxuXHRcdEZhY3Rvcnkuc3RyaW5nVG9DbGFzc1tjbGFzc1N0cmluZ10gPSB0aGVDbGFzcztcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBHZXRPYmplY3RTcGVjcyhjbGFzc1R5cGU6Q2xhc3NUeXBlKTpDbGFzc01ldGFEYXRhIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2ldLmNsYXNzVHlwZSA9PSBjbGFzc1R5cGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXlbaV07XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2ldLnJvb3ROYW1lID09IGNsYXNzVHlwZSlcclxuXHRcdFx0XHRyZXR1cm4gRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXlbaV07XHJcblx0XHR9XHJcblx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciA6IEdvdCBOdWxsIHdoZW4gdHJ5aW5nIHRvIGdldCBvYmplY3RTcGVjcyBmb3IgY2xhc3MgXCIgKyBjbGFzc1R5cGUsIG5ldyBFcnJvcigpKTtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldENsYXNzSWNvbihjbGFzc1R5cGU6Q2xhc3NUeXBlKTpzdHJpbmcge1xyXG5cdFx0dmFyIG9iamVjdFNwZWNzOkNsYXNzTWV0YURhdGEgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XHJcblx0XHRpZiAoIW9iamVjdFNwZWNzKSByZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1nbG9iZSc+PC9zcGFuPlwiXHJcblx0XHRyZXR1cm4gb2JqZWN0U3BlY3MuaHRtbEljb247XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgR2V0Q2xhc3NGcm9tUm9vdChyb290TmFtZTpDbGFzc1R5cGUpOnN0cmluZyB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEZhY3RvcnkuY29sbGVjdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXS5yb290TmFtZSA9PSByb290TmFtZSkge1xyXG5cdFx0XHRcdHJldHVybiA8c3RyaW5nPiBGYWN0b3J5LmNvbGxlY3Rpb25BcnJheVtpXS5jbGFzc1R5cGVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgR2V0Q2xhc3NEZXRhaWwoY2xhc3NUeXBlOkNsYXNzVHlwZSk6YW55IHtcclxuXHRcdHZhciByZXN1bHQgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XHJcblx0XHRpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XHJcblx0XHRyZXR1cm4gRmFjdG9yeS5zdHJpbmdUb0NsYXNzW3Jlc3VsdC5zdWJqZWN0RGV0YWlsXTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBHZXRDbGFzc01hbmFnZXIoY2xhc3NUeXBlOkNsYXNzVHlwZSk6YW55IHtcclxuXHRcdHZhciByZXN1bHQ6YW55ID0gRmFjdG9yeS5HZXRPYmplY3RTcGVjcyhjbGFzc1R5cGUpO1xyXG5cdFx0aWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xyXG5cdFx0aWYgKCFyZXN1bHQuc3ViamVjdE1hbmFnZXIpIHJldHVybiBudWxsO1xyXG5cdFx0cmV0dXJuIEZhY3Rvcnkuc3RyaW5nVG9DbGFzc1tyZXN1bHQuc3ViamVjdE1hbmFnZXJdO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldENsYXNzTGFiZWwoY2xhc3NUeXBlOkNsYXNzVHlwZSk6c3RyaW5nIHtcclxuXHRcdHZhciByZXN1bHQgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XHJcblx0XHRpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XHJcblx0XHRyZXR1cm4gcmVzdWx0LmxhYmVsO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldENsYXNzUm9vdE5hbWUoY2xhc3NUeXBlOkNsYXNzVHlwZSk6c3RyaW5nIHtcclxuXHRcdHZhciByZXN1bHQgPSBGYWN0b3J5LkdldE9iamVjdFNwZWNzKGNsYXNzVHlwZSk7XHJcblx0XHRpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XHJcblx0XHRyZXR1cm4gcmVzdWx0LnJvb3ROYW1lO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldENvbGxlY3Rpb24oY2xhc3NUeXBlOkNsYXNzVHlwZSkge1xyXG5cdFx0dmFyIG9iamVjdFNwZWNzID0gRmFjdG9yeS5HZXRPYmplY3RTcGVjcyhjbGFzc1R5cGUpO1xyXG5cdFx0aWYgKCFvYmplY3RTcGVjcykgcmV0dXJuIG51bGw7XHJcblx0XHQvLyAgICAgcmV0dXJuIHRoaXNbb2JqZWN0U3BlY3MuY29sbGVjdGlvbl07XHJcblx0XHRyZXR1cm4gRmFjdG9yeS5DcmVhdGVPYmplY3RGcm9tU3RyaW5nKG9iamVjdFNwZWNzLmNvbGxlY3Rpb24pO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEdldENsYXNzZXNUb09ic2VydmUoKTpBcnJheTxDbGFzc1R5cGU+IHtcclxuXHRcdHZhciBjbGFzc1R5cGVzID0gbmV3IEFycmF5PENsYXNzVHlwZT4oKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgRmFjdG9yeS5jb2xsZWN0aW9uQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2ldLm9ic2VydmVVcGRhdGVzKSB7XHJcblx0XHRcdFx0Y2xhc3NUeXBlcy5wdXNoKEZhY3RvcnkuY29sbGVjdGlvbkFycmF5W2ldLmNsYXNzVHlwZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjbGFzc1R5cGVzO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIElzVmlzaWJsZVJlbGF0aW9uc2hpcCh0eXBlMSwgdHlwZTIpOmJvb2xlYW4ge1xyXG5cdFx0dmFyIHRoZVNwZWMgPSBGYWN0b3J5LkdldFJlbGF0aW9uc2hpcFNwZWNzKHR5cGUxLCB0eXBlMik7XHJcblx0XHRpZiAodGhlU3BlYyA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblx0XHRpZiAodHlwZW9mIHRoZVNwZWMudmlzdWFsID09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGVTcGVjLnZpc3VhbDtcclxuXHR9XHJcblxyXG59dGhpcy5GYWN0b3J5ID0gRmFjdG9yeTtcclxuXHJcbmNsYXNzIEJhc2VDbGFzcyBleHRlbmRzIEM0T2JqZWN0IHtcclxuXHJcblx0Z2V0IHRoZUNvbGxlY3Rpb24oKTpNb25nby5Db2xsZWN0aW9uPGFueT4ge1xyXG5cdFx0cmV0dXJuIEZhY3RvcnkuR2V0Q29sbGVjdGlvbih0aGlzLmNsYXNzVHlwZSk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihjbGFzc1R5cGU6Q2xhc3NUeXBlKSB7XHJcblx0XHRzdXBlcihjbGFzc1R5cGUpO1xyXG5cdFx0Ly8gICB0aGlzLnRoZUNvbGxlY3Rpb24gPVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEhhbmRsZUNvbGxlY3Rpb25FcnJvcnMoZXJyb3IsIHJlc3VsdCkge1xyXG5cdFx0aWYgKGVycm9yKVxyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJDb2xsZWN0aW9uIEVycm9yIEhhcyBPY2N1cnJlZFwiLCBlcnJvciwgcmVzdWx0KTtcclxuXHR9XHJcblx0cHVibGljIG9ic2VydmUoY29uc3RyYWludD86YW55KSB7XHJcblx0XHRpZiAodGhpcy50aGVDb2xsZWN0aW9uID09IG51bGwpIHtcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoKTtcclxuXHR9XHJcblx0cHVibGljIGFkZE1hbmRhdG9yeVJlbGF0aW9uc2hpcHMoaWQ6c3RyaW5nLCBjbGFzc1R5cGU6Q2xhc3NUeXBlKTpib29sZWFuIHtcclxuXHRcdHZhciByZWxhdGlvbnNoaXBBcnJheSA9IEZhY3RvcnkuR2V0TWFuZGF0b3J5UmVsYXRpb25zaGlwcyhjbGFzc1R5cGUpO1xyXG5cdFx0aWYgKHJlbGF0aW9uc2hpcEFycmF5Lmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHRcdHZhciBtYXBQcm94eSA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlbGF0aW9uc2hpcEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciByZWxhdGlvbnNoaXAgPSByZWxhdGlvbnNoaXBBcnJheVtpXTtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCByZWxhdGlvbnNoaXAucmVsYXRpb25zaGlwTGFiZWxzLmxhYmVscy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGlmIChyZWxhdGlvbnNoaXAucmVsYXRpb25zaGlwTGFiZWxzW2pdLm9wdGlvbmFsID09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHR2YXIgcHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocmVsYXRpb25zaGlwLnRvKTtcclxuXHRcdFx0XHRcdHZhciBuZXdJRCA9IHByb3h5LmFkZE5ldyhyZWxhdGlvbnNoaXAucmVsYXRpb25zaGlwTGFiZWxzW2pdLmxhYmVsLCBcIlwiKTtcclxuXHRcdFx0XHRcdG1hcFByb3h5LmFkZE5ld01hcChyZWxhdGlvbnNoaXAubGFiZWwsIHJlbGF0aW9uc2hpcC5mcm9tLCBpZCwgcmVsYXRpb25zaGlwLnRvLCBuZXdJRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBhZGROZXdPYmplY3Qob2JqZWN0OmFueSk6YW55IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBuZXdJRCA9IHRoaXMudGhlQ29sbGVjdGlvbi5pbnNlcnQob2JqZWN0LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcIkVycm9yIEluc2VydGluZyBOZXcgT2JqZWN0IGZvciBDbGFzcyA9IFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIG9iamVjdCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmFkZE1hbmRhdG9yeVJlbGF0aW9uc2hpcHMobmV3SUQsIHRoaXMuY2xhc3NUeXBlKTtcclxuXHRcdHJldHVybiBuZXdJRDtcclxuXHR9XHJcblx0cHVibGljIGFkZE5ldyhuYW1lOnN0cmluZywgZGVzY3JpcHRpb24/OnN0cmluZyk6c3RyaW5nIHtcclxuXHRcdGlmICghZGVzY3JpcHRpb24pIGRlc2NyaXB0aW9uID0gXCJub25lXCI7XHJcblx0XHR2YXIgaW5zZXJ0T2JqZWN0OmFueTtcclxuXHRcdGluc2VydE9iamVjdCA9IHtuYW1lOiBuYW1lLCBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb259O1xyXG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB0aGlzLnRoZUNvbGxlY3Rpb25cclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBuZXdJRDpzdHJpbmcgPSBjb2xsZWN0aW9uLmluc2VydChpbnNlcnRPYmplY3QsIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiaW5zZXJ0aW5nIGludG8gY2xhc3MgXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSwgaW5zZXJ0T2JqZWN0KVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5hZGRNYW5kYXRvcnlSZWxhdGlvbnNoaXBzKG5ld0lELCB0aGlzLmNsYXNzVHlwZSk7XHJcblx0XHRyZXR1cm4gbmV3SUQ7XHJcblx0fVxyXG5cdHB1YmxpYyB1cGRhdGVOYW1lKGlkOnN0cmluZywgbmFtZTpzdHJpbmcsIGRlc2NyaXB0aW9uPzpzdHJpbmcpIHtcclxuXHRcdGlmICghZGVzY3JpcHRpb24pXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnVwZGF0ZSh7X2lkOiBpZH0sIHskc2V0OiB7bmFtZTogbmFtZX19LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBVcGRhdGluZyBOYW1lIGZvciBjbGFzcyA9IFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIHtpZDogaWQsIG5hbWU6IG5hbWV9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0aGlzLnRoZUNvbGxlY3Rpb24udXBkYXRlKHtfaWQ6IGlkfSwgeyRzZXQ6IHtuYW1lOiBuYW1lLCBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb259fSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBVcGRhdGluZyBOYW1lIGZvciBjbGFzcyA9IFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIHtpZDogaWQsIG5hbWU6IG5hbWUsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbn0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGUoaWQ6c3RyaW5nLCBhdHRyaWJ1dGU6c3RyaW5nLCB2YWx1ZTphbnkpIHtcclxuXHRcdHZhciBzZXRNb2RpZmllciAgICAgICAgICAgICA9IHskc2V0OiB7fX07XHJcblx0XHRzZXRNb2RpZmllci4kc2V0W2F0dHJpYnV0ZV0gPSB2YWx1ZTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi51cGRhdGUoe19pZDogaWR9LCBzZXRNb2RpZmllciwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJ1cGRhdGVBdHRyaWJ1dGUgXCIsIGUsIHtpZDogaWQsIGF0dHJpYnV0ZTogYXR0cmlidXRlLCB2YWx1ZTogdmFsdWV9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHVwZGF0ZShpZDpzdHJpbmcsIG9iamVjdDphbnkpIHtcclxuXHRcdHZhciB1cGRhdGVPYmplY3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xyXG5cdFx0dGhpcy50aGVDb2xsZWN0aW9uLnVwZGF0ZSh7X2lkOiBpZH0sIHskc2V0OiB1cGRhdGVPYmplY3R9LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycylcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZUFsbCgpIHtcclxuXHRcdE1ldGVvci5jYWxsKFwicmVtb3ZlQWxsXCIsIHRoaXMuY2xhc3NUeXBlKTtcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZUFsbFNlcnZlcigpIHtcclxuXHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe30sIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZVNldChhcnJheU9mSWRzOkFycmF5PHN0cmluZz4pIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZklkcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnJlbW92ZVNlcnZlcihhcnJheU9mSWRzW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHJlbW92ZShpZDpzdHJpbmcpIHtcclxuXHRcdHZhciByZXN1bHQgPSBNZXRlb3IuY2FsbCgncmVtb3ZlT2JqZWN0Jywge2lkOiBpZCwgY2xhc3NUeXBlOiB0aGlzLmNsYXNzVHlwZX0pO1xyXG5cdH1cclxuXHRwdWJsaWMgcmVtb3ZlU2VydmVyKHRoZU9iamVjdDphbnkpIHtcclxuXHRcdHZhciBpZCA9IHRoZU9iamVjdC5pZDtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnJlbW92ZSh7X2lkOiBpZH0sIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcclxuXHRcdFx0bWFwLnJlbW92ZVJlZmVyZW5jZShpZCwgaWQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciByZW1vdmluZyBvYmplY3QgZm9ybSBjbGFzcyA9IFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIGlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHJlc3RvcmVPYmplY3Qob2JqZWN0KTpzdHJpbmcge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIG5ld0lEID0gdGhpcy50aGVDb2xsZWN0aW9uLmluc2VydChvYmplY3QsIEJhc2VDbGFzcy5IYW5kbGVDb2xsZWN0aW9uRXJyb3JzKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgSW5zZXJ0aW5nIE5ldyBPYmplY3QgZm9yIENsYXNzID0gXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSwgb2JqZWN0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdJRDtcclxuXHR9XHJcblx0cHVibGljIGdldFJlbGF0ZWRPYmplY3RzKHNvdXJjZUlEOnN0cmluZywgdGFyZ2V0VHlwZT86Q2xhc3NUeXBlKTpBcnJheTxhbnk+IHtcclxuXHRcdHZhciBtYXBQcm94eSA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XHJcblx0XHR2YXIgdGhlTGlzdCAgPSBtYXBQcm94eS5nZXRSZWxhdGVkT2JqZWN0cyhzb3VyY2VJRCwgdGFyZ2V0VHlwZSk7XHJcblx0XHRyZXR1cm4gdGhlTGlzdDtcclxuXHR9XHJcblx0cHVibGljIGdldFJlbGF0ZWRPYmplY3Qoc291cmNlSUQ6c3RyaW5nLCB0YXJnZXRJRDpzdHJpbmcpOmFueSB7XHJcblx0XHR2YXIgbWFwUHJveHkgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcclxuXHRcdHZhciB0aGVPYmplY3QgPSBtYXBQcm94eS5nZXRSZWxhdGVkT2JqZWN0KHNvdXJjZUlELCB0YXJnZXRJRCk7XHJcblx0XHRyZXR1cm4gdGhlT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0KGNyaXRlcmlhOmFueSk6IEFycmF5PGFueT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIG9iamVjdHMgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZChjcml0ZXJpYSkuZmV0Y2goKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgZmluZGluZyBvYmplY3RzIGZvciBjcml0ZXJpYSBcIiArIGNyaXRlcmlhLCBuZXcgRXJyb3IoKSwge2NyaXRlcmlhOiBjcml0ZXJpYX0pO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBvYmplY3RzO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0T25lKGlkOnN0cmluZyk6YW55IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciB0aGVPYmplY3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZE9uZSh7X2lkOiBpZH0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBnZXR0aW5nIG9uZSBvZiB0eXBlIFwiICsgdGhpcy5jbGFzc1R5cGUsIGUsIGlkKTtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHRpZiAodHlwZW9mIHRoZU9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIikgdGhlT2JqZWN0ID0gbnVsbDtcclxuXHRcdHJldHVybiB0aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBjb3VudCgpOm51bWJlciB7XHJcblx0XHR2YXIgdGhlTGlzdCA9IHRoaXMuZ2V0TGlzdCgpO1xyXG5cdFx0cmV0dXJuIHRoZUxpc3QubGVuZ3RoO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TGlzdChvcmRlcklEID0gdHJ1ZSkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIHRoZUxpc3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCgpLmZldGNoKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImdldExpc3QgZm9yIGNsYXNzIHR5cGUgXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSk7XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhlTGlzdFtpXS52YWx1ZSA9IG5ldyBDNE9iamVjdCgpO1xyXG5cdFx0XHR0aGVMaXN0W2ldLnZhbHVlID0gdGhlTGlzdFtpXS5uYW1lO1xyXG5cdFx0XHR0aGVMaXN0W2ldLmlkICAgID0gbmV3IEM0T2JqZWN0KCk7XHJcblx0XHRcdGlmIChvcmRlcklEKVxyXG5cdFx0XHRcdHRoZUxpc3RbaV0uaWQgPSBpOyBlbHNlXHJcblx0XHRcdFx0dGhlTGlzdFtpXS5pZCA9IHRoZUxpc3RbaV0uX2lkO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoZUxpc3Q7XHJcblx0fVxyXG5cclxufSB0aGlzLkJhc2VDbGFzcyA9IEJhc2VDbGFzcztcclxuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiQmFzZUNsYXNzXCIsIEJhc2VDbGFzcyk7XHJcblxyXG5jbGFzcyBTdWJqZWN0IGV4dGVuZHMgQmFzZUNsYXNzIHtcclxuXHJcblx0cHVibGljIG5hbWUgOiBzdHJpbmc7XHJcblx0cHVibGljIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjbGFzc1R5cGU6Q2xhc3NUeXBlID0gbnVsbCkge1xyXG5cdFx0c3VwZXIoY2xhc3NUeXBlKVxyXG5cdFx0dGhpcy5zZXRUeXBlTmFtZShcIlN1YmplY3RcIik7XHJcblx0fVxyXG5cclxufXRoaXMuU3ViamVjdCA9IFN1YmplY3Q7XHJcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIlN1YmplY3RcIiwgdGhpcy5TdWJqZWN0KTtcclxuXHJcbmNsYXNzIENvdW50ZXJDbGFzcyBleHRlbmRzIFN1YmplY3Qge1xyXG5cdHB1YmxpYyBjb3VudGVyTmFtZTpzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdW50ZXJOYW1lOnN0cmluZykge1xyXG5cdFx0c3VwZXIoQ2xhc3NUeXBlLkNPVU5URVIpO1xyXG5cdFx0dGhpcy5jb3VudGVyTmFtZSA9IGNvdW50ZXJOYW1lO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldE5leHRJbmRleChjb3VudGVyTmFtZT86c3RyaW5nKTpudW1iZXIge1xyXG5cdFx0aWYgKCFjb3VudGVyTmFtZSkgY291bnRlck5hbWUgPSB0aGlzLmNvdW50ZXJOYW1lO1xyXG5cdFx0dmFyIGNvdW50ZXJMaXN0ID0gdGhpcy5nZXQoe25hbWU6IGNvdW50ZXJOYW1lfSk7XHJcblx0XHRpZiAoY291bnRlckxpc3QubGVuZ3RoID09IDApIHtcclxuXHRcdFx0dmFyIGluZGV4SWQgPSB0aGlzLmFkZE5ld09iamVjdCh7bmFtZTogY291bnRlck5hbWUsIGluZGV4OiAxfSk7XHJcblx0XHRcdHZhciBpbmRleCAgID0gMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGluZGV4ICAgPSBjb3VudGVyTGlzdFswXS5pbmRleDtcclxuXHRcdFx0aW5kZXhJZCA9IGNvdW50ZXJMaXN0WzBdLl9pZFxyXG5cdFx0fVxyXG5cdFx0dGhpcy51cGRhdGVBdHRyaWJ1dGUoaW5kZXhJZCwgXCJpbmRleFwiLCBpbmRleCArIDEpO1xyXG5cdFx0cmV0dXJuIGluZGV4O1xyXG5cdH1cclxuXHJcbn0gdGhpcy5Db3VudGVyQ2xhc3MgPSBDb3VudGVyQ2xhc3M7XHJcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIkNvdW50ZXJDbGFzc1wiLCBDb3VudGVyQ2xhc3MpO1xyXG5cclxuY2xhc3MgVHJlZUJhc2UgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xyXG5cdGNvbnN0cnVjdG9yKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcclxuXHRcdHN1cGVyKGNsYXNzVHlwZSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkTmV3T2JqZWN0KG9iamVjdCk6c3RyaW5nIHtcclxuXHRcdHZhciBuZXdJRCA9IHN1cGVyLmFkZE5ld09iamVjdChvYmplY3QpO1xyXG5cdFx0dmFyIG1hcCA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XHJcblx0XHRtYXAuYWRkTmV3TWFwKFwiTmV3IE1hcFwiLCB0aGlzLmNsYXNzVHlwZSwgXCIwXCIsIHRoaXMuY2xhc3NUeXBlLCBuZXdJRCk7XHJcblx0XHR0aGlzLmFkZE1hbmRhdG9yeVJlbGF0aW9uc2hpcHMobmV3SUQsIHRoaXMuY2xhc3NUeXBlKTtcclxuXHRcdHJldHVybiBuZXdJRDtcclxuXHR9XHJcblx0cHVibGljIGFkZE5ld05vZGUodGFyZ2V0T2JqZWN0OmFueSwgcGxhY2VtZW50OnN0cmluZykgeyAvLyBSRU1PVkUgVEhJU1xyXG5cdFx0dmFyIG5ld0lEICA9IHRoaXMuYWRkTmV3KFwiTmV3XCIpO1xyXG5cdFx0dmFyIG9iamVjdCA9IHRoaXMuZ2V0T25lKG5ld0lEKTtcclxuXHRcdHRoaXMucGxhY2VOZXdOb2RlKFwiTmV3XCIsIHRhcmdldE9iamVjdCwgb2JqZWN0LCBwbGFjZW1lbnQpO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkTmV3KG5hbWU6c3RyaW5nLCBkZXNjcmlwdGlvbj86c3RyaW5nKTpzdHJpbmcge1xyXG5cdFx0dmFyIG5ld0lEID0gc3VwZXIuYWRkTmV3KG5hbWUsIGRlc2NyaXB0aW9uKTtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0bWFwLmFkZE5ld01hcChuYW1lLCB0aGlzLmNsYXNzVHlwZSwgXCIwXCIsIHRoaXMuY2xhc3NUeXBlLCBuZXdJRCxSZWxhdGlvbnNoaXBLZXkuU1VCSkVDVF9UUkVFKTtcclxuXHRcdHRoaXMuYWRkTWFuZGF0b3J5UmVsYXRpb25zaGlwcyhuZXdJRCwgdGhpcy5jbGFzc1R5cGUpO1xyXG5cdFx0cmV0dXJuIG5ld0lEO1xyXG5cdH1cclxuXHRwdWJsaWMgdXBkYXRlUGFyZW50KGlkOnN0cmluZywgbmV3UGFyZW50SUQ6c3RyaW5nKSB7XHJcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcclxuXHRcdHZhciBvbGRQYXJlbnRJRCA9IG1hcC5nZXRQYXJlbnRJRChpZCk7XHJcblx0XHRWaWRlb0FwcC5hc3NlcnQob2xkUGFyZW50SUQgIT0gbnVsbCxcIkZhaWxlZCBUbyBHZXQgUGFyZW50IGZvciBcIitpZCxuZXcgRXJyb3IoKSwgeyBpZCA6IGlkLCBuZXdQYXJlbnRJRCA6IG5ld1BhcmVudElEIH0pO1xyXG5cdFx0bWFwLmNoYW5nZVBhcmVudChpZCwgb2xkUGFyZW50SUQsIG5ld1BhcmVudElEKTtcclxuXHR9XHJcblx0cHVibGljIHBsYWNlTmV3Tm9kZShuYW1lLCB0YXJnZXRPYmplY3QsIG5ld09iamVjdCwgcGxhY2VtZW50KSB7XHJcblx0XHR2YXIgbWFwID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcclxuXHRcdHZhciBnZXROZXdPYmplY3RQYXJlbnQgPSBtYXAuZ2V0UGFyZW50cyhuZXdPYmplY3QuX2lkKTtcclxuXHRcdGlmIChnZXROZXdPYmplY3RQYXJlbnQubGVuZ3RoID09IDAgfHwgZ2V0TmV3T2JqZWN0UGFyZW50Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgRXhwZWN0ZWQgVG8gR2V0IFBhcmVudCBmb3IgbmV3T2JqZWN0IGdvdCBlcnJyb3JcIiwgbnVsbCwgbmV3T2JqZWN0KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld09iamVjdFBhcmVudElEID0gZ2V0TmV3T2JqZWN0UGFyZW50WzBdLm1hcE9iamVjdElEMTtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0c3dpdGNoIChwbGFjZW1lbnQpIHtcclxuXHRcdFx0Y2FzZSBcInNpYmxpbmdcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgcGFyZW50cyA9IG1hcC5nZXRQYXJlbnRzKHRhcmdldE9iamVjdC5faWQpO1xyXG5cdFx0XHRcdGlmIChwYXJlbnRzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBFeHBlY3RlZCBQYXJlbnQgZm9yIFRhcmdldCBnb3QgbnVsbCBcIiwgbnVsbCwgdGFyZ2V0T2JqZWN0KTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgZXhwZWN0ZWQgb25lIHBhcmVudCBmb3IgdGFyZ2V0IGdvdCBtdWx0aXBsZVwiLCBudWxsLCB0YXJnZXRPYmplY3QpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtYXAuY2hhbmdlUGFyZW50KG5ld09iamVjdC5faWQsIG5ld09iamVjdFBhcmVudElELCBwYXJlbnRzWzBdLm1hcE9iamVjdElEMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcImNoaWxkXCIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bWFwLmNoYW5nZVBhcmVudChuZXdPYmplY3QuX2lkLCBuZXdPYmplY3RQYXJlbnRJRCwgdGFyZ2V0T2JqZWN0Ll9pZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcInJvb3RcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgcmVtb3ZlU2VydmVyKHRoZU9iamVjdDphbnkpIHtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0dGhpcy50aGVDb2xsZWN0aW9uLnJlbW92ZSh0aGVPYmplY3QuaWQpO1xyXG5cdFx0bWFwLnJlbW92ZVJlZmVyZW5jZSh0aGVPYmplY3QuaWQsIHRoZU9iamVjdC5pZCk7XHJcblx0fVxyXG5cdHB1YmxpYyByZW1vdmUoaWQ6c3RyaW5nKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gTWV0ZW9yLmNhbGwoJ3JlbW92ZU9iamVjdCcsIHtpZDogaWQsIGNsYXNzVHlwZTogdGhpcy5jbGFzc1R5cGV9KTtcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZVNldChhcnJheU9mSWRzOkFycmF5PHN0cmluZz4pIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZklkcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnJlbW92ZVNlcnZlcihhcnJheU9mSWRzW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIG9wZW4oaWQ6c3RyaW5nLCBmbGFnOmJvb2xlYW4pIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi51cGRhdGUoe19pZDogaWR9LCB7JHNldDoge29wZW46IGZsYWd9fSwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIG9wZW4gb24gb2JqZWN0IHR5cGUgXCIgKyB0aGlzLmNsYXNzVHlwZSwgZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRSb290SUQoaWQ6c3RyaW5nKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQYXJlbnRJRChpZCk6YW55IHtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIHRoZU9iamVjdCA9IG1hcC5nZXRQYXJlbnRzKGlkKTtcclxuXHRcdFx0aWYgKHRoZU9iamVjdC5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0dGhyb3cgXCJlcnJvciAsIGV4cGVjdGVkIG9ubHkgMSBwYXJlbnQgZ290IG1vcmUgdGhhbiAxIGZvciBkaW1lbnNpb25cIjtcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBleHBlY3RlZCAxIHBhcmVudCBnb3QgbWFueSBmb3IgZGltZW5zaW9uXCIsIGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoZU9iamVjdC5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIFwiMFwiXHJcblx0XHRpZiAoIXRoZU9iamVjdFswXSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBleHBlY3RlZCBhIHBhcmVudCBmb3IgZGltZW5zaW9uXCIpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGVPYmplY3RbMF0ubWFwT2JqZWN0SUQxO1xyXG5cdH1cclxuXHRwdWJsaWMgY3JlYXRlVHJlZShjYWxsYmFjaz8pOmFueSB7XHJcblx0XHRpZiAoIWNhbGxiYWNrKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZVRyZWVTZXJ2ZXIoKTtcclxuXHRcdH1cclxuXHRcdHZhciB0aGVUcmVlID0gdGhpcy5jcmVhdGVUcmVlU2VydmVyKCk7XHJcblx0XHRjYWxsYmFjayh0aGVUcmVlKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZVRyZWVTZXJ2ZXIoKTpBcnJheTxhbnk+IHtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0dmFyIG9iamVjdExpc3QgID0gdGhpcy5nZXRMaXN0KGZhbHNlKTtcclxuXHRcdHZhciBvYmplY3RMaW5rcyA9IG1hcC5nZXRNYXBUeXBlKHRoaXMuY2xhc3NUeXBlLCB0aGlzLmNsYXNzVHlwZSk7XHJcblx0XHR2YXIgcm9vdHMgICAgICAgPSB0aGlzLkNyZWF0ZVRyZWUob2JqZWN0TGlzdCwgb2JqZWN0TGlua3MpO1xyXG5cdFx0Ly9yb290cyA9IHRoaXMuYXNzaWduTGV2ZWxzVG9UcmVlKHJvb3RzKTtcclxuXHRcdHJldHVybiByb290cztcclxuXHR9XHJcblx0cHVibGljIENyZWF0ZVRyZWUodGhlTGlzdDpBcnJheTxhbnk+LCB0aGVMaW5rczpBcnJheTxhbnk+KTpBcnJheTxhbnk+IHtcclxuXHRcdHZhciBtYXAgPSBuZXcgQXJyYXk7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdG1hcFt0aGVMaXN0W2ldLl9pZF0gPSBpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHBhcmVudDphbnk7XHJcblx0XHR2YXIgY2hpbGQ6YW55O1xyXG5cdFx0dmFyIHJvb3Q6QXJyYXk8YW55PiA9IG5ldyBBcnJheSgpO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhlTGlua3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Y2hpbGQgPSB0aGVMaXN0W21hcFt0aGVMaW5rc1tpXS5tYXBPYmplY3RJRDJdXTtcclxuXHRcdFx0aWYgKCFjaGlsZC5kYXRhKSBjaGlsZC5kYXRhID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdGlmICh0aGVMaW5rc1tpXS5tYXBPYmplY3RJRDEgPT09IFwiMFwiKSB7XHJcblx0XHRcdFx0cm9vdC5wdXNoKGNoaWxkKTtcclxuXHRcdFx0XHRjaGlsZC5wYXJlbnQgICA9IFwiMFwiO1xyXG5cdFx0XHRcdGNoaWxkLnBhcmVudElEID0gXCIwXCI7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cGFyZW50ID0gdGhlTGlzdFttYXBbdGhlTGlua3NbaV0ubWFwT2JqZWN0SUQxXV07XHJcblx0XHRcdFx0aWYgKCFwYXJlbnQuZGF0YSlcclxuXHRcdFx0XHRcdHBhcmVudC5kYXRhID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdFx0Y2hpbGQucGFyZW50SUQgPSBwYXJlbnQuX2lkO1xyXG5cdFx0XHRcdGNoaWxkLnBhcmVudCAgID0gcGFyZW50Ll9pZDtcclxuXHRcdFx0XHRwYXJlbnQuZGF0YS5wdXNoKGNoaWxkKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJvb3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVGb2xkZXJUcmVlKHRoZUxpc3Q6QXJyYXk8YW55PiwgdGhlRm9sZGVyczpBcnJheTxhbnk+LCBmb2xkZXJMaW5rczpBcnJheTxhbnk+KSB7XHJcblx0XHR2YXIgbWFwOkFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhlTGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRtYXBbdGhlTGlzdFtpXS5faWRdID0gaTtcclxuXHRcdH1cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhlRm9sZGVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRtYXBbdGhlRm9sZGVyc1tpXS5faWRdID0gMTAwMDAgKyBpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHBhcmVudDphbnk7XHJcblx0XHR2YXIgY2hpbGQ6YW55O1xyXG5cdFx0dmFyIHJvb3QgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmb2xkZXJMaW5rcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaW5kZXggPSBtYXBbZm9sZGVyTGlua3NbaV0ubWFwT2JqZWN0SUQyXTtcclxuXHRcdFx0aWYgKGluZGV4ID4gOTk5OSkge1xyXG5cdFx0XHRcdGluZGV4ID0gaW5kZXggLSAxMDAwMDtcclxuXHRcdFx0XHRjaGlsZCA9IHRoZUZvbGRlcnNbaW5kZXhdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNoaWxkID0gdGhlTGlzdFtpbmRleF07XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFjaGlsZFtcImRhdGFcIl0pIGNoaWxkW1wiZGF0YVwiXSA9IG51bGw7XHJcblx0XHRcdGlmIChmb2xkZXJMaW5rc1tpXS5tYXBPYmplY3RJRDEgPT0gXCIwXCIpIHtcclxuXHRcdFx0XHRyb290LnB1c2goY2hpbGQpO1xyXG5cdFx0XHRcdGNoaWxkLnBhcmVudCAgID0gXCIwXCI7XHJcblx0XHRcdFx0Y2hpbGQucGFyZW50SUQgPSBcIjBcIjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRleCA9IG1hcFtmb2xkZXJMaW5rc1tpXS5tYXBPYmplY3RJRDFdO1xyXG5cdFx0XHRcdGlmIChpbmRleCA+IDk5OTkpIHtcclxuXHRcdFx0XHRcdGluZGV4ICA9IGluZGV4IC0gMTAwMDA7XHJcblx0XHRcdFx0XHRwYXJlbnQgPSB0aGVGb2xkZXJzW2luZGV4XTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cGFyZW50ID0gdGhlTGlzdFtpbmRleF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghcGFyZW50LmRhdGEpXHJcblx0XHRcdFx0XHRwYXJlbnQuZGF0YSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRcdGNoaWxkLnBhcmVudElEID0gcGFyZW50Ll9pZDtcclxuXHRcdFx0XHRjaGlsZC5wYXJlbnQgICA9IHBhcmVudC5faWQ7XHJcblx0XHRcdFx0cGFyZW50LmRhdGEucHVzaChjaGlsZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByb290O1xyXG5cdH1cclxuXHRwdWJsaWMgYXNzaWduTGV2ZWxzVG9UcmVlKHRoZVRyZWU6QXJyYXk8YW55Pikge1xyXG5cdFx0dGhpcy5wdXNoTm9kZUxldmVsKHRoZVRyZWUsIFwiXCIpO1xyXG5cdFx0cmV0dXJuIHRoZVRyZWU7XHJcblx0fVxyXG5cdHB1YmxpYyBwdXNoTm9kZUxldmVsKHRoZVRyZWU6QXJyYXk8YW55PiwgbGV2ZWw6c3RyaW5nKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoZVRyZWUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGxldmVsU3RyaW5nICA9IGxldmVsICsgKGkgKyAxKS50b1N0cmluZygpO1xyXG5cdFx0XHR0aGVUcmVlW2ldLmxldmVsID0gXCJcIjtcclxuXHRcdFx0dGhlVHJlZVtpXS5sZXZlbCA9IGxldmVsU3RyaW5nO1xyXG5cdFx0XHRpZiAodGhlVHJlZVtpXS5kYXRhKSB7XHJcblx0XHRcdFx0dGhpcy5wdXNoTm9kZUxldmVsKHRoZVRyZWVbaV0uZGF0YSwgbGV2ZWxTdHJpbmcgKyBcIi5cIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG59IHRoaXMuVHJlZUJhc2UgPSBUcmVlQmFzZTtcclxuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiVHJlZUJhc2VcIiwgVHJlZUJhc2UpO1xyXG5cclxuY2xhc3MgTWFwTGlzdCB7XHJcblx0cHVibGljIGlkICAgICAgICAgOiBzdHJpbmc7XHJcblx0cHVibGljIGxlZnRUb1JpZ2h0OiBib29sZWFuO1xyXG5cdHB1YmxpYyBpZFR5cGUgICAgIDogQ2xhc3NUeXBlO1xyXG5cdHB1YmxpYyBtYXBJRCAgICAgIDogc3RyaW5nO1xyXG5cdHB1YmxpYyBtYXBUeXBlICAgIDogQ2xhc3NUeXBlO1xyXG5cclxufSB0aGlzLk1hcExpc3QgPSBNYXBMaXN0O1xyXG5cclxuY2xhc3MgTWFwcyBleHRlbmRzIFRyZWVCYXNlIHtcclxuXHRwcml2YXRlIG9iamVjdDpUcmVlQmFzZTtcclxuXHJcblx0Y29uc3RydWN0b3IoY2xhc3NUeXBlOkNsYXNzVHlwZT0gQ2xhc3NUeXBlLk1BUCkge1xyXG5cdFx0c3VwZXIoQ2xhc3NUeXBlLk1BUCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkTmV3TWFwKG5hbWU6c3RyaW5nLCBjbGFzc1R5cGUxOkNsYXNzVHlwZSwgaWQxOnN0cmluZywgY2xhc3NUeXBlMjpDbGFzc1R5cGUsIGlkMjpzdHJpbmcsa2V5OnN0cmluZz1cIlwiKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgaW5zZXJ0T2JqZWN0ID0ge1xyXG5cdFx0XHRcdG5hbWUgICAgICAgICAgOiBuYW1lLFxyXG5cdFx0XHRcdG1hcE9iamVjdFR5cGUxOiBjbGFzc1R5cGUxLFxyXG5cdFx0XHRcdG1hcE9iamVjdElEMSAgOiBpZDEsXHJcblx0XHRcdFx0bWFwT2JqZWN0VHlwZTI6IGNsYXNzVHlwZTIsXHJcblx0XHRcdFx0bWFwT2JqZWN0SUQyICA6IGlkMixcclxuXHRcdFx0XHRjbGFzc1R5cGUgICAgIDogXCJtYXBcIixcclxuXHRcdFx0XHRyZWxhdGlvbnNoaXBLZXkgICAgICAgICAgIDoga2V5XHJcblx0XHRcdH07XHJcblx0XHRcdHZhciBuZXdJRCA9IHRoaXMudGhlQ29sbGVjdGlvbi5pbnNlcnQoaW5zZXJ0T2JqZWN0LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGluc2VydGluZyBNYXAgXCIgKyBlLCBpbnNlcnRPYmplY3QpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG1hcE9iamVjdCA9IHRoaXMuZ2V0T25lKG5ld0lEKTtcclxuXHRcdHJldHVybiBtYXBPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRSZWxhdGlvbnNoaXAoc291cmNlT2JqZWN0LCB0YXJnZXRPYmplY3QsIGtleTogc3RyaW5nID0gXCJcIik6c3RyaW5nIHtcclxuXHRcdHZhciBhbHJlYWR5RXhpc3RzID0gdGhpcy5nZXRSZWxhdGVkT2JqZWN0KHNvdXJjZU9iamVjdC5jbGFzc1R5cGUsIHNvdXJjZU9iamVjdC5nZXRJRCgpLGtleSk7XHJcblx0XHRpZiAoYWxyZWFkeUV4aXN0cykge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJBdHRlbXB0IFRvIEFkZCBSZWxhdGlvbnNoaXAgV2hpY2ggQWxyZWFkeSBFeGlzdHNcIiwgbmV3IEVycm9yKCksIHtcclxuXHRcdFx0XHRzb3VyY2U6IHNvdXJjZU9iamVjdCwgdGFyZ2V0OiB0YXJnZXRPYmplY3RcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBhbHJlYWR5RXhpc3RzLl9pZDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmFkZE5ld01hcChcIk1BUFwiLCBzb3VyY2VPYmplY3QuY2xhc3NUeXBlLCBzb3VyY2VPYmplY3QuZ2V0SUQoKSwgdGFyZ2V0T2JqZWN0LmNsYXNzVHlwZSx0YXJnZXRPYmplY3QuZ2V0SUQoKSxrZXkpO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkRm9sZGVyUm9vdE1hcChuYW1lOnN0cmluZywgY2xhc3NUeXBlOkNsYXNzVHlwZSwgZm9sZGVySUQ6c3RyaW5nKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgbmV3SUQgPSB0aGlzLnRoZUNvbGxlY3Rpb24uaW5zZXJ0KHtcclxuXHRcdFx0XHRuYW1lICAgICAgICAgIDogbmFtZSxcclxuXHRcdFx0XHRtYXBPYmplY3RUeXBlMTogY2xhc3NUeXBlLFxyXG5cdFx0XHRcdG1hcE9iamVjdElEMSAgOiBcIjBcIixcclxuXHRcdFx0XHRtYXBPYmplY3RUeXBlMjogY2xhc3NUeXBlLFxyXG5cdFx0XHRcdG1hcE9iamVjdElEMiAgOiBmb2xkZXJJRCxcclxuXHRcdFx0XHRjbGFzc1R5cGUgICAgIDogXCJtYXBcIlxyXG5cdFx0XHR9LCBCYXNlQ2xhc3MuSGFuZGxlQ29sbGVjdGlvbkVycm9ycyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGluc2VydGluZyBNYXAgXCIgKyBlLCBlKTtcclxuXHRcdH1cclxuXHRcdHZhciBtYXBPYmplY3QgPSB0aGlzLmdldE9uZShuZXdJRCk7XHJcblx0XHRyZXR1cm4gbWFwT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgdXBkYXRlUmVsYXRlZE9iamVjdElEKHNvdXJjZVR5cGU6c3RyaW5nLCBzb3VyY2VJRDpzdHJpbmcsIG9sZElEOnN0cmluZywgbmV3SUQ6c3RyaW5nKTphbnkge1xyXG5cdFx0dmFyIG1hcE9iamVjdCA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kT25lKHtcclxuXHRcdFx0bWFwT2JqZWN0VHlwZTE6IHNvdXJjZVR5cGUsIG1hcE9iamVjdElEMTogc291cmNlSUQsIG1hcE9iamVjdElEMjogb2xkSURcclxuXHRcdH0pXHJcblx0XHR0aGlzLnVwZGF0ZUF0dHJpYnV0ZShtYXBPYmplY3QuX2lkLCBcIm1hcE9iamVjdElEMlwiLCBuZXdJRCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRSZWxhdGVkT2JqZWN0KHNvdXJjZUlEOnN0cmluZywgdGFyZ2V0SUQ6c3RyaW5nLHJlbGF0aW9uc2hpcEtleTpzdHJpbmc9IG51bGwpOmFueSB7XHJcblxyXG5cdFx0dmFyIGNyaXRlcmlhID0ge21hcE9iamVjdElEMTogc291cmNlSUQsIG1hcE9iamVjdElEMjogdGFyZ2V0SUR9O1xyXG5cdFx0aWYgKHJlbGF0aW9uc2hpcEtleSkgY3JpdGVyaWFbXCJrZXlcIl0gPSByZWxhdGlvbnNoaXBLZXk7XHJcblx0XHR2YXIgbWFwT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoY3JpdGVyaWEpXHJcblx0XHRpZiAoIW1hcE9iamVjdCkge1xyXG5cdFx0XHRjcml0ZXJpYSA9IHttYXBPYmplY3RJRDI6IHNvdXJjZUlELCBtYXBPYmplY3RJRDE6IHRhcmdldElEfTtcclxuXHRcdFx0aWYgKHJlbGF0aW9uc2hpcEtleSkgY3JpdGVyaWFbXCJrZXlcIl0gPSByZWxhdGlvbnNoaXBLZXk7XHJcblx0XHRcdG1hcE9iamVjdCA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kT25lKGNyaXRlcmlhKVxyXG5cdFx0fVxyXG5cdFx0aWYgKCFtYXBPYmplY3QpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHZhciB0aGVQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShtYXBPYmplY3QubWFwT2JqZWN0VHlwZTIpO1xyXG5cdFx0dmFyIHRoZU9iamVjdCA9IHRoZVByb3h5LmdldE9uZShtYXBPYmplY3QubWFwT2JqZWN0SUQyKTtcclxuXHRcdHJldHVybiB0aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRSZWxhdGVkT2JqZWN0c1N0cmljdChzb3VyY2VJRDpzdHJpbmcsIHRhcmdldFR5cGU/OkNsYXNzVHlwZSk6QXJyYXk8YW55PiB7XHJcblx0XHR2YXIgcXVlcnlPYmplY3Q6YW55O1xyXG5cdFx0aWYgKHRhcmdldFR5cGUpXHJcblx0XHRcdHF1ZXJ5T2JqZWN0ID0ge21hcE9iamVjdElEMTogc291cmNlSUQsIG1hcE9iamVjdFR5cGUyOiB0YXJnZXRUeXBlfTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cXVlcnlPYmplY3QgPSB7bWFwT2JqZWN0SUQxOiBzb3VyY2VJRH07XHJcblx0XHR2YXIgdGhlTGlzdCAgICAgICA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHF1ZXJ5T2JqZWN0KS5mZXRjaCgpO1xyXG5cdFx0dmFyIHJlc3VsdExpc3QgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHJlc3VsdE1hcExpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGVMaXN0KSB7XHJcblx0XHRcdHJlc3VsdE1hcExpc3QucHVzaCh7XHJcblx0XHRcdFx0bGVmdFRvUmlnaHQ6IHRydWUsXHJcblx0XHRcdFx0aWQgICAgICAgICA6IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0SUQxLFxyXG5cdFx0XHRcdGlkVHlwZSAgICAgOiB0aGVMaXN0W2l0ZW1dLm1hcE9iamVjdFR5cGUxLFxyXG5cdFx0XHRcdG1hcElEICAgICAgOiB0aGVMaXN0W2l0ZW1dLm1hcE9iamVjdElEMixcclxuXHRcdFx0XHRtYXBUeXBlICAgIDogdGhlTGlzdFtpdGVtXS5tYXBPYmplY3RUeXBlMlxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmICh0YXJnZXRUeXBlKVxyXG5cdFx0XHRxdWVyeU9iamVjdCA9IHttYXBPYmplY3RJRDI6IHNvdXJjZUlELCBtYXBPYmplY3RUeXBlMTogdGFyZ2V0VHlwZX07XHJcblx0XHRlbHNlXHJcblx0XHRcdHF1ZXJ5T2JqZWN0ID0ge21hcE9iamVjdElEMjogc291cmNlSUR9O1xyXG5cdFx0dmFyIHRoZUxpc3QyID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQocXVlcnlPYmplY3QpLmZldGNoKCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoZUxpc3QyKSB7XHJcblx0XHRcdHJlc3VsdE1hcExpc3QucHVzaCh7XHJcblx0XHRcdFx0bGVmdFRvUmlnaHQ6IGZhbHNlLFxyXG5cdFx0XHRcdGlkICAgICAgICAgOiB0aGVMaXN0MltpdGVtXS5tYXBPYmplY3RJRDIsXHJcblx0XHRcdFx0aWRUeXBlICAgICA6IHRoZUxpc3QyW2l0ZW1dLm1hcE9iamVjdFR5cGUyLFxyXG5cdFx0XHRcdG1hcElEICAgICAgOiB0aGVMaXN0MltpdGVtXS5tYXBPYmplY3RJRDEsXHJcblx0XHRcdFx0bWFwVHlwZSAgICA6IHRoZUxpc3QyW2l0ZW1dLm1hcE9iamVjdFR5cGUxXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHJlc3VsdE1hcExpc3QubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiByZXN1bHRMaXN0O1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiByZXN1bHRNYXBMaXN0KSB7XHJcblx0XHRcdGlmIChyZXN1bHRNYXBMaXN0W2l0ZW1dLmxlZnRUb1JpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIHRoZUlEICAgPSByZXN1bHRNYXBMaXN0W2l0ZW1dLm1hcElEXHJcblx0XHRcdFx0dmFyIHRoZVR5cGUgPSByZXN1bHRNYXBMaXN0W2l0ZW1dLm1hcFR5cGVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGVJRCAgID0gcmVzdWx0TWFwTGlzdFtpdGVtXS5tYXBJRDtcclxuXHRcdFx0XHR0aGVUeXBlID0gcmVzdWx0TWFwTGlzdFtpdGVtXS5tYXBUeXBlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciB0aGVQcm94eSAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlVHlwZSk7XHJcblx0XHRcdHZhciB0aGVPYmplY3QgPSB0aGVQcm94eS5nZXRPbmUodGhlSUQpO1xyXG5cdFx0XHRyZXN1bHRMaXN0LnB1c2godGhlT2JqZWN0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHRMaXN0O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0UmVsYXRlZE9iamVjdHMoc291cmNlSUQ6c3RyaW5nLCB0YXJnZXRUeXBlPzpDbGFzc1R5cGUpOkFycmF5PGFueT4ge1xyXG5cdFx0dmFyIHF1ZXJ5T2JqZWN0OmFueTtcclxuXHRcdGlmICh0YXJnZXRUeXBlKVxyXG5cdFx0XHRxdWVyeU9iamVjdCA9IHtcclxuXHRcdFx0XHRtYXBPYmplY3RJRDE6IHNvdXJjZUlELCBtYXBPYmplY3RUeXBlMjogdGFyZ2V0VHlwZVxyXG5cdFx0XHR9OyBlbHNlXHJcblx0XHRcdHF1ZXJ5T2JqZWN0ID0ge1xyXG5cdFx0XHRcdG1hcE9iamVjdElEMTogc291cmNlSUQsXHJcblx0XHRcdH07XHJcblx0XHR2YXIgdGhlTGlzdCAgICA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHF1ZXJ5T2JqZWN0KS5mZXRjaCgpO1xyXG5cdFx0dmFyIHJlc3VsdExpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0aWYgKHRoZUxpc3QubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiByZXN1bHRMaXN0O1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciB0aGVQcm94eSAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlTGlzdFtpXS5tYXBPYmplY3RUeXBlMik7XHJcblx0XHRcdHZhciB0aGVPYmplY3QgPSB0aGVQcm94eS5nZXRPbmUodGhlTGlzdFtpXS5tYXBPYmplY3RJRDIpO1xyXG5cdFx0XHRyZXN1bHRMaXN0LnB1c2godGhlT2JqZWN0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHRMaXN0O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Um9vdEZvbGRlcihjbGFzc1R5cGU6Q2xhc3NUeXBlKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgbWFwT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe1xyXG5cdFx0XHRcdG1hcE9iamVjdFR5cGUxOiBjbGFzc1R5cGUsIG1hcE9iamVjdFR5cGUyOiBjbGFzc1R5cGUsIG1hcE9iamVjdElEMTogXCIwXCJcclxuXHRcdFx0fSlcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgRmluZGluZyBSb290IEZvbGRlciBmb3IgQ2xhc3MgXCIgKyBjbGFzc1R5cGUsIGUpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGlmIChtYXBPYmplY3QpICByZXR1cm4gbWFwT2JqZWN0Lm1hcE9iamVjdElEMjsgZWxzZSByZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIGdldE9uZShpZDpzdHJpbmcpOmFueSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgb2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe19pZDogaWR9KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiIGVycm9yIGdldHRpbmcgb25lIE1hcFwiLCBlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBvYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRNYXBUeXBlKG1hcFR5cGUxOkNsYXNzVHlwZSwgbWFwVHlwZTI6Q2xhc3NUeXBlLCBkb21haW4/OnN0cmluZyk6YW55IHtcclxuXHRcdHZhciBtYXBMaXN0MSA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHttYXBPYmplY3RUeXBlMTogbWFwVHlwZTEsIG1hcE9iamVjdFR5cGUyOiBtYXBUeXBlMn0pLmZldGNoKCk7XHJcblx0XHRpZiAobWFwVHlwZTEgPT0gbWFwVHlwZTIpIHJldHVybiBtYXBMaXN0MTtcclxuXHRcdHZhciBtYXBMaXN0MiA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHttYXBPYmplY3RUeXBlMTogbWFwVHlwZTIsIG1hcE9iamVjdFR5cGUyOiBtYXBUeXBlMX0pLmZldGNoKCk7XHJcblx0XHRpZiAobWFwTGlzdDEgPT0gbnVsbClcclxuXHRcdFx0cmV0dXJuIG1hcExpc3QyO1xyXG5cdFx0aWYgKG1hcExpc3QyID09IG51bGwpXHJcblx0XHRcdHJldHVybiBtYXBMaXN0MTtcclxuXHRcdHZhciByZXR1cm5NYXAgPSBtYXBMaXN0MS5jb25jYXQobWFwTGlzdDIpO1xyXG5cdFx0cmV0dXJuIHJldHVybk1hcFxyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TWFwc1N0cmljdChpZDpzdHJpbmcpIDogQXJyYXk8TWFwTGlzdD4ge1xyXG5cdFx0dmFyIHJldHVybkxpc3QgPSBuZXcgQXJyYXk8TWFwTGlzdD4oKTtcclxuXHRcdHZhciB0aGVMaXN0ICAgID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe21hcE9iamVjdElEMTogaWR9KS5mZXRjaCgpO1xyXG5cdFx0dmFyIGluZGV4ICAgICAgPSAwO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGVMaXN0KSB7XHJcblx0XHRcdFx0dmFyIG1hcExpc3QgPSBuZXcgTWFwTGlzdCgpO1xyXG5cdFx0XHRcdG1hcExpc3QuaWQgPSBpZDtcclxuXHRcdFx0XHRtYXBMaXN0LmxlZnRUb1JpZ2h0ID0gdHJ1ZTtcclxuXHRcdFx0XHRtYXBMaXN0LmlkVHlwZSA9IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0VHlwZTE7XHJcblx0XHRcdFx0bWFwTGlzdC5tYXBJRCA9IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0SUQyO1xyXG5cdFx0XHRcdG1hcExpc3QubWFwVHlwZSA9IHRoZUxpc3RbaXRlbV0ubWFwT2JqZWN0VHlwZTI7XHJcblx0XHRcdFx0cmV0dXJuTGlzdC5wdXNoKG1hcExpc3QpOztcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgdGhlTGlzdDIgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCh7bWFwT2JqZWN0SUQyOiBpZH0pLmZldGNoKCk7XHJcblx0XHRcdGZvciAodmFyIGl0ZW0gaW4gdGhlTGlzdDIpIHtcclxuXHRcdFx0XHRtYXBMaXN0ID0gbmV3IE1hcExpc3QoKTtcclxuXHRcdFx0XHRtYXBMaXN0LmlkID0gaWQ7XHJcblx0XHRcdFx0bWFwTGlzdC5sZWZ0VG9SaWdodCA9IGZhbHNlO1xyXG5cdFx0XHRcdG1hcExpc3QuaWRUeXBlID0gdGhlTGlzdDJbaXRlbV0ubWFwT2JqZWN0VHlwZTI7XHJcblx0XHRcdFx0bWFwTGlzdC5tYXBJRCA9IHRoZUxpc3QyW2l0ZW1dLm1hcE9iamVjdElEMTtcclxuXHRcdFx0XHRtYXBMaXN0Lm1hcFR5cGUgPSB0aGVMaXN0MltpdGVtXS5tYXBPYmplY3RUeXBlMTtcclxuXHRcdFx0XHRyZXR1cm5MaXN0LnB1c2gobWFwTGlzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgaW4gZ2V0TWFwc1N0cmljdFwiLCBlLCB7aWQ6IGlkfSk7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybkxpc3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBoYXNDaGlsZHJlbihpZDpzdHJpbmcpOmJvb2xlYW4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIHRoZUxpc3QgPSB0aGlzLnRoZUNvbGxlY3Rpb24uZmluZCh7bWFwT2JqZWN0SUQxOiBpZH0pLmZldGNoKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcIkVycm9yIGluIGhhc0NoaWxkcmVuXCIsIGUsIHtpZDogaWR9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoZUxpc3QubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRydWU7IGVsc2VcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TWFwcyhpZDpzdHJpbmcpOkFycmF5PGFueT4ge1xyXG5cdFx0dmFyIHRoZUxpc3QgPSBBcnJheSgpO1xyXG5cdFx0dGhlTGlzdCAgICAgID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe21hcE9iamVjdElEMTogaWR9KS5mZXRjaCgpO1xyXG5cdFx0dmFyIHRoZUxpc3QyID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe21hcE9iamVjdElEMjogaWR9KS5mZXRjaCgpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVMaXN0Mi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgbmV3TWFwT2JqZWN0ICAgICAgICAgID0gdGhlTGlzdDJbaV07XHJcblx0XHRcdHZhciBpZDEgICAgICAgICAgICAgICAgICAgPSBuZXdNYXBPYmplY3QubWFwT2JqZWN0SUQxO1xyXG5cdFx0XHRuZXdNYXBPYmplY3QubWFwT2JqZWN0SUQxID0gbmV3TWFwT2JqZWN0Lm1hcE9iamVjdElEMjtcclxuXHRcdFx0bmV3TWFwT2JqZWN0Lm1hcE9iamVjdElEMiA9IGlkMTtcclxuXHRcdFx0dGhlTGlzdC5wdXNoKG5ld01hcE9iamVjdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhlTGlzdDtcclxuXHR9XHJcblx0cHVibGljIGdldE1hcChpZDE6c3RyaW5nLCBpZDI6c3RyaW5nKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgdGhlT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe21hcE9iamVjdElEMTogaWQxLCBtYXBPYmplY3RJRDI6IGlkMn0pXHJcblx0XHRcdGlmICghdGhlT2JqZWN0KSB7XHJcblx0XHRcdFx0dGhlT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe21hcE9iamVjdElEMTogaWQyLCBtYXBPYmplY3RJRDI6IGlkMX0pXHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgRmluZGluZyBPbmUgTWFwIFwiICsgZSwgZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhlT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgZXhpc3RzKGlkMTpzdHJpbmcsIGlkMjpzdHJpbmcpOmJvb2xlYW4ge1xyXG5cdFx0dmFyIG9iamVjdCA9IHRoaXMuZ2V0TWFwKGlkMSwgaWQyKTtcclxuXHRcdGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuIGZhbHNlOyBlbHNlIHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgY2hhbmdlUGFyZW50KGlkLCBvbGRQYXJlbnQsIG5ld1BhcmVudCk6YW55IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBsaW5rUmVjb3JkcyA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHttYXBPYmplY3RJRDE6IG9sZFBhcmVudCwgbWFwT2JqZWN0SUQyOiBpZH0pLmZldGNoKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGZuZGluZyByZWNvcmQgaW4gTWFwcyAtIENoYW5nZVBhcmVudFwiLCBlKTtcclxuXHRcdH1cclxuXHRcdGlmIChsaW5rUmVjb3Jkcy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImV4cGVjdGVkIG9ubHkgMSBwYXJlbnQgaW4gR2V0UGFyZW50IGNhbGwgZ290IG1vcmUgdGhhbjFcIik7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGxpbmtSZWNvcmQgPSBsaW5rUmVjb3Jkc1swXTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi51cGRhdGUoe19pZDogbGlua1JlY29yZC5faWR9LCB7JHNldDoge21hcE9iamVjdElEMTogbmV3UGFyZW50fX0pXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIHVwZGF0aW5nIE1hcHMgZm9yIElEIFwiLCBlLCB7bGlua1JlY29yZDogbGlua1JlY29yZH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGxpbmtSZWNvcmQuX2lkO1xyXG5cdH1cclxuXHRwdWJsaWMgaGFzUGFyZW50cyhpZCkge1xyXG5cdFx0dmFyIHBhcmVudExpc3QgPSB0aGlzLmdldFBhcmVudHMoaWQpO1xyXG5cdFx0aWYgKHBhcmVudExpc3QubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRpZiAocGFyZW50TGlzdFswXS5tYXBPYmplY3RJRDEgPT09IFwiMFwiKVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQYXJlbnRJRChpZCkge1xyXG5cdFx0dmFyIHBhcmVudExpc3QgPSB0aGlzLmdldFBhcmVudHMoaWQpO1xyXG5cdFx0aWYgKHBhcmVudExpc3QgIT0gbnVsbCAmJiBwYXJlbnRMaXN0Lmxlbmd0aCAhPSAwKVxyXG5cdFx0XHRyZXR1cm4gcGFyZW50TGlzdFswXS5tYXBPYmplY3RJRDE7IGVsc2UgcmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQYXJlbnRzKGlkOnN0cmluZykge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIHRoZUxpc3Q6QXJyYXk8YW55PiA9IHRoaXMudGhlQ29sbGVjdGlvbi5maW5kKHtcclxuXHRcdFx0XHRtYXBPYmplY3RJRDI6IGlkXHJcblx0XHRcdH0pLmZldGNoKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIEdldFBhcmVudHMgXCIgKyBpZCArIFwiIFwiLCBlKTtcclxuXHRcdH1cclxuXHRcdHZhciBwYXJlbnRMaXN0OkFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhlTGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhlTGlzdFtpXS5tYXBPYmplY3RUeXBlMSA9PT0gdGhlTGlzdFtpXS5tYXBPYmplY3RUeXBlMilcclxuXHRcdFx0XHRwYXJlbnRMaXN0LnB1c2godGhlTGlzdFtpXSlcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJlbnRMaXN0O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Rm9sZGVyTGlua3MoY2xhc3NUeXBlOkNsYXNzVHlwZSwgZm9sZGVyQ2xhc3NUeXBlOkNsYXNzVHlwZSk6QXJyYXk8YW55PiB7XHJcblx0XHR2YXIgZm9sZGVyTGluazEgPSB0aGlzLmdldE1hcFR5cGUoZm9sZGVyQ2xhc3NUeXBlLCBmb2xkZXJDbGFzc1R5cGUpO1xyXG5cdFx0dmFyIGZvbGRlckxpbmsyID0gdGhpcy5nZXRNYXBUeXBlKGZvbGRlckNsYXNzVHlwZSwgY2xhc3NUeXBlKTtcclxuXHRcdGlmIChmb2xkZXJMaW5rMS5sZW5ndGggPT0gMCkgcmV0dXJuIGZvbGRlckxpbmsyO1xyXG5cdFx0aWYgKGZvbGRlckxpbmsyLmxlbmd0aCA9PSAwKSByZXR1cm4gZm9sZGVyTGluazE7XHJcblx0XHR2YXIgcmV0dXJuTWFwID0gZm9sZGVyTGluazEuY29uY2F0KGZvbGRlckxpbmsyKTtcclxuXHRcdHJldHVybiByZXR1cm5NYXA7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRGb2xkZXJQYXJlbnQoZm9sZGVyQ2xhc3NUeXBlOnN0cmluZywgb2JqZWN0Q2xhc3NUeXBlOnN0cmluZywgY2hpbGRJRDpzdHJpbmcpOmFueSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgbWFwT2JqZWN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmRPbmUoe1xyXG5cdFx0XHRcdG1hcE9iamVjdFR5cGUxOiBmb2xkZXJDbGFzc1R5cGUsIG1hcE9iamVjdFR5cGUyOiBvYmplY3RDbGFzc1R5cGUsIG1hcE9iamVjdElEMjogY2hpbGRJRFxyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgR2V0UGFyZW50cyBcIiArIGNoaWxkSUQgKyBcIiBcIiwgZSwge1xyXG5cdFx0XHRcdGZvbGRlckNsYXNzVHlwZTogZm9sZGVyQ2xhc3NUeXBlLCBvYmplY3RDbGFzc1R5cGU6IG9iamVjdENsYXNzVHlwZSwgY2hpbGRJRDogY2hpbGRJRFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmIChtYXBPYmplY3QgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblx0XHRyZXR1cm4gbWFwT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgY2hhbmdlRm9sZGVyUGFyZW50KGZvbGRlckNsYXNzVHlwZTpzdHJpbmcsIGNoaWxkQ2xhc3NUeXBlOnN0cmluZywgY2hpbGRJRDpzdHJpbmcsIG9sZFBhcmVudElEOnN0cmluZywgbmV3UGFyZW50SUQ6c3RyaW5nKSB7XHJcblx0XHR2YXIgbWFwT2JqZWN0ID0gdGhpcy5nZXRNYXAob2xkUGFyZW50SUQsIGNoaWxkSUQpO1xyXG5cdFx0dGhpcy51cGRhdGVBdHRyaWJ1dGUobWFwT2JqZWN0Ll9pZCwgXCJtYXBPYmplY3RJRDFcIiwgbmV3UGFyZW50SUQpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVsZXRlTGluayhmcm9tSUQ6c3RyaW5nLCB0b0lEPzpzdHJpbmcpIHtcclxuXHRcdGlmICghdG9JRCkgdG9JRCA9IG51bGw7XHJcblx0XHRNZXRlb3IuY2FsbChcImRlbGV0ZUxpbmtcIiwgZnJvbUlELCB0b0lELCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRBcHBMb2cuZXJyb3IoXCJlcnJvciBjYWxsaW5nIHNlcnZlciBmb3IgZGVsZXRlTGluayB3aXRoIGlkIFwiICsgZnJvbUlEICsgXCIgdG8gXCIgKyB0b0lELCBlcnJvcik7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdHB1YmxpYyBkZWxldGVMaW5rU2VydmVyKGZyb21JRDpzdHJpbmcsIHRvSUQ/OnN0cmluZykge1xyXG5cdFx0aWYgKCF0b0lEKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dGhpcy50aGVDb2xsZWN0aW9uLnJlbW92ZSh7bWFwT2JqZWN0SUQxOiBmcm9tSUR9KTtcclxuXHRcdFx0XHR0aGlzLnRoZUNvbGxlY3Rpb24ucmVtb3ZlKHttYXBPYmplY3RJRDI6IGZyb21JRH0pO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0QXBwTG9nLmVycm9yKFwiZXJyb3IgcmVtb3ZpbmcgbGlua3MgZnJvbSBtYXAgZm9yIGlkID0gXCIgKyBmcm9tSUQsIGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe21hcE9iamVjdElEMTogZnJvbUlELCBtYXBPYmplY3RJRDI6IHRvSUR9KTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIHJlbW92aW5nIGxpbmtzIGZyb20gbWFwIGZvciBmcm9tSUQgPSBcIiArIGZyb21JRCArIFwiIHRvSUQgXCIgKyB0b0lELCBlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgcmVtb3ZlUmVmZXJlbmNlKGlkMTpzdHJpbmcsIGlkMjpzdHJpbmcpIHtcclxuXHRcdHZhciByZXN1bHQgPSBNZXRlb3IuY2FsbChcInJlbW92ZU1hcFJlZmVyZW5jZVwiLCB7aWQxOiBpZDEsIGlkMjogaWQyLCBjbGFzc1R5cGU6IHRoaXMuY2xhc3NUeXBlfSk7XHJcblx0fVxyXG5cdHB1YmxpYyByZW1vdmVSZWZlcmVuY2VTZXJ2ZXIoaWQxOnN0cmluZywgaWQyPzpzdHJpbmcpIHtcclxuXHRcdHRoaXMudGhlQ29sbGVjdGlvbi5yZW1vdmUoe21hcE9iamVjdElEMTogaWQxfSk7XHJcblx0XHRpZiAoaWQyKVxyXG5cdFx0XHR0aGlzLnRoZUNvbGxlY3Rpb24ucmVtb3ZlKHttYXBPYmplY3RJRDI6IGlkMn0pO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5NYXBzID0gTWFwcztcclxuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiTWFwc1wiLCBNYXBzKTtcclxuXHJcbmNsYXNzIEZvbGRlckJhc2UgZXh0ZW5kcyBUcmVlQmFzZSB7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZTpDbGFzc1R5cGUpOnN0cmluZyB7XHJcblx0XHRyZXR1cm4gY2xhc3NUeXBlICsgXCJfZm9sZGVyXCI7XHJcblx0fVxyXG5cdGNvbnN0cnVjdG9yKGNsYXNzVHlwZTpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKGNsYXNzVHlwZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGROZXdGb2xkZXIobmFtZTpzdHJpbmcsIGNsYXNzVHlwZTpDbGFzc1R5cGUsIGRlc2NyaXB0aW9uOnN0cmluZyA9IG51bGwsIHBhcmVudEZvbGRlcklEOnN0cmluZyA9IG51bGwpIHtcclxuXHRcdHZhciBuZXdJRDtcclxuXHRcdGlmIChwYXJlbnRGb2xkZXJJRCA9PSBudWxsKVxyXG5cdFx0XHRwYXJlbnRGb2xkZXJJRCA9IHRoaXMuZ2V0Um9vdChjbGFzc1R5cGUpO1xyXG5cdFx0aWYgKCFkZXNjcmlwdGlvbikgZGVzY3JpcHRpb24gPSBcIlwiO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bmV3SUQgPSB0aGlzLnRoZUNvbGxlY3Rpb24uaW5zZXJ0KHtcclxuXHRcdFx0XHRuYW1lICAgICAgICAgICA6IG5hbWUsXHJcblx0XHRcdFx0ZGVzY3JpcHRpb24gICAgOiBkZXNjcmlwdGlvbixcclxuXHRcdFx0XHRjbGFzc1R5cGUgICAgICA6IEZvbGRlckJhc2UuRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZSksXHJcblx0XHRcdFx0Zm9sZGVyQ2xhc3NUeXBlOiBjbGFzc1R5cGVcclxuXHRcdFx0fSwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcImVycm9yIGluc2VydGluZyBmb2xkZXIgXCIgKyBlLCBudWxsLCB7XHJcblx0XHRcdFx0bmFtZTogbmFtZSwgY2xhc3NUeXBlOiBjbGFzc1R5cGUsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwgcGFyZW50Rm9sZGVySUQ6IHBhcmVudEZvbGRlcklEXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHR2YXIgbWFwICAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcclxuXHRcdHZhciBuZXdNYXAgPSBtYXAuYWRkTmV3TWFwKFwiPFwiICsgbmFtZSArIFwiPlwiLCBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpLCBwYXJlbnRGb2xkZXJJRCxcclxuXHRcdFx0Rm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKSwgbmV3SUQpO1xyXG5cdFx0cmV0dXJuIG5ld0lEO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkRm9sZGVyUm9vdChjbGFzc1R5cGU6Q2xhc3NUeXBlKSB7XHJcblx0XHR2YXIgb2JqZWN0U3BlYyA9IEZhY3RvcnkuR2V0T2JqZWN0U3BlY3MoY2xhc3NUeXBlKTtcclxuXHRcdHZhciBsYWJlbCAgICAgID0gb2JqZWN0U3BlYy5sYWJlbDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBuZXdJRCA9IHRoaXMudGhlQ29sbGVjdGlvbi5pbnNlcnQoe1xyXG5cdFx0XHRcdGZvbGRlckNsYXNzVHlwZTogY2xhc3NUeXBlLFxyXG5cdFx0XHRcdG5hbWUgICAgICAgICAgIDogbGFiZWwsXHJcblx0XHRcdFx0Y2xhc3NUeXBlICAgICAgOiBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpLFxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uICAgIDogbGFiZWwgKyBcIlJvb3QgTm9kZVwiLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIG1hcCAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcclxuXHRcdFx0bWFwLmFkZEZvbGRlclJvb3RNYXAobGFiZWwsIEZvbGRlckJhc2UuRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZSksIG5ld0lEKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiRXJyb3IgQWRkaW5nIFJvb3QgZm9yIGZvbGRlciBcIiArIGNsYXNzVHlwZSwgZSwge2NsYXNzVHlwZTogY2xhc3NUeXBlfSk7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ld0lEO1xyXG5cdH1cclxuXHRwdWJsaWMgY2hhbmdlTmFtZShpZDpzdHJpbmcsIG5hbWU6c3RyaW5nKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRGb2xkZXJTdG9yZS51cGRhdGUoe19pZDogaWR9LCB7JHNldDoge25hbWU6IG5hbWV9fSwgQmFzZUNsYXNzLkhhbmRsZUNvbGxlY3Rpb25FcnJvcnMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBVcGRhdGluZyBGb2xkZXIgTmFtZVwiLCBlLCB7aWQ6IGlkLCBuYW1lOiBuYW1lfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBjaGFuZ2VGb2xkZXJQYXJlbnQoY2xhc3NUeXBlLCBpc0NoaWxkQUZvbGRlcjpib29sZWFuLCBjaGlsZElEOnN0cmluZywgbmV3UGFyZW50SUQ6c3RyaW5nKSB7XHJcblx0XHRpZiAoaXNDaGlsZEFGb2xkZXIpXHJcblx0XHRcdHZhciBjaGlsZENsYXNzVHlwZSA9IEZvbGRlckJhc2UuRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZSk7IGVsc2VcclxuXHRcdFx0Y2hpbGRDbGFzc1R5cGUgPSBjbGFzc1R5cGU7XHJcblx0XHR2YXIgZm9sZGVyQ2xhc3NUeXBlID0gRm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKTtcclxuXHRcdHZhciBtYXBQcm94eSA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XHJcblx0XHR2YXIgb2xkUGFyZW50TWFwID0gbWFwUHJveHkuZ2V0Rm9sZGVyUGFyZW50KGZvbGRlckNsYXNzVHlwZSwgY2hpbGRDbGFzc1R5cGUsIGNoaWxkSUQpO1xyXG5cdFx0bWFwUHJveHkuY2hhbmdlRm9sZGVyUGFyZW50KGZvbGRlckNsYXNzVHlwZSwgY2hpbGRDbGFzc1R5cGUsIGNoaWxkSUQsIG9sZFBhcmVudE1hcC5tYXBPYmplY3RJRDEsIG5ld1BhcmVudElEKVxyXG5cdH1cclxuXHRwdWJsaWMgY2hhbmdlT2JqZWN0Rm9sZGVyKGNsYXNzVHlwZTpzdHJpbmcsIGlkOnN0cmluZywgbmV3UGFyZW50SUQ6c3RyaW5nKSB7XHJcblx0XHR2YXIgb2xkUGFyZW50SUQgPSB0aGlzLmdldFBhcmVudElEKGlkKTtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0bWFwLmNoYW5nZVBhcmVudChpZCwgb2xkUGFyZW50SUQsIG5ld1BhcmVudElEKTtcclxuXHR9XHJcblx0cHVibGljIGxpbmtUb0ZvbGRlcihub2RlSUQ6c3RyaW5nLCBjbGFzc1R5cGU6Q2xhc3NUeXBlLCBmb2xkZXJJRDpzdHJpbmcpOmFueSB7XHJcblx0XHR2YXIgbWFwICAgID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZU1hcChDbGFzc1R5cGUuTUFQKTtcclxuXHRcdHZhciBuZXdNYXAgPSBtYXAuYWRkTmV3TWFwKFwiRm9sZGVyIExpbmtcIiwgRm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKSwgZm9sZGVySUQsIGNsYXNzVHlwZSwgbm9kZUlEKTtcclxuXHRcdHJldHVybiBuZXdNYXA7XHJcblx0fVxyXG5cdHB1YmxpYyByZW1vdmVGb2xkZXJMaW5rKGlkOnN0cmluZykge1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0UGFyZW50SUQoaWQpOmFueSB7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0UGFyZW50SUQoaWQpO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Rm9sZGVycyhjbGFzc1R5cGU6Q2xhc3NUeXBlKTpBcnJheTxhbnk+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBmb2xkZXJMaXN0ID0gdGhpcy50aGVDb2xsZWN0aW9uLmZpbmQoe2NsYXNzVHlwZTogRm9sZGVyQmFzZS5Gb2xkZXJDbGFzc1R5cGUoY2xhc3NUeXBlKX0pLmZldGNoKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcIkVycm9yIEdldHRpbmcgRm9sZGVycyBmb3IgXCIgKyBjbGFzc1R5cGUsIGUpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmb2xkZXJMaXN0O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TGlua3MoY2xhc3NUeXBlOkNsYXNzVHlwZSk6QXJyYXk8YW55PiB7XHJcblx0XHR2YXIgZm9sZGVyUm9vdCAgPSB0aGlzLmdldFJvb3QoY2xhc3NUeXBlKTtcclxuXHRcdHZhciBtYXAgICAgICAgICA9IDxNYXBzPiBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2VNYXAoQ2xhc3NUeXBlLk1BUCk7XHJcblx0XHR2YXIgZm9sZGVyTGlua3MgPSBtYXAuZ2V0Rm9sZGVyTGlua3MoY2xhc3NUeXBlLCBGb2xkZXJCYXNlLkZvbGRlckNsYXNzVHlwZShjbGFzc1R5cGUpKTtcclxuXHRcdHJldHVybiBmb2xkZXJMaW5rcztcclxuXHR9XHJcblx0cHVibGljIGdldFJvb3QoY2xhc3NUeXBlOkNsYXNzVHlwZSk6YW55IHtcclxuXHRcdHZhciBtYXAgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlTWFwKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0dmFyIG1hcE9iamVjdCA9IG1hcC5nZXRSb290Rm9sZGVyKEZvbGRlckJhc2UuRm9sZGVyQ2xhc3NUeXBlKGNsYXNzVHlwZSkpO1xyXG5cdFx0aWYgKCFtYXBPYmplY3QpXHJcblx0XHRcdG1hcE9iamVjdCA9IHRoaXMuYWRkRm9sZGVyUm9vdChjbGFzc1R5cGUpO1xyXG5cdFx0cmV0dXJuIG1hcE9iamVjdDtcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZShpZDpzdHJpbmcpIHtcclxuXHRcdGlmICghdGhpcy5pc0VtcHR5KGlkKSkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJFcnJvciBUcnlpbmcgdG8gRGVsZXRlIEZvbGRlciB0aGF0IGlzIG5vdCBlbXB0eVwiLCBuZXcgRXJyb3IoKSwge2lkOiBpZH0pO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRzdXBlci5yZW1vdmUoaWQpO1xyXG5cdFx0dmFyIG1hcFByb3h5ID0gPE1hcHM+IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShDbGFzc1R5cGUuTUFQKTtcclxuXHRcdHZhciB0aGVNYXBzID0gbWFwUHJveHkuZ2V0TWFwcyhpZCk7XHJcblx0XHRpZiAodGhlTWFwcy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcIkV4cGVjdGVkIE9ubHkgMSBNYXAgZm9yIGRlbGV0aW5nIGZvbGRlciBmb3VuZCBtdWx0aXBsZVwiLCBuZXcgRXJyb3IoKSwge2lkOiBpZH0pO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRtYXBQcm94eS5yZW1vdmUodGhlTWFwc1swXS5faWQpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBpc0VtcHR5KGZvbGRlcklEOnN0cmluZyk6Ym9vbGVhbiB7XHJcblx0XHR2YXIgbWFwUHJveHkgPSA8TWFwcz4gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKENsYXNzVHlwZS5NQVApO1xyXG5cdFx0cmV0dXJuICFtYXBQcm94eS5oYXNDaGlsZHJlbihmb2xkZXJJRCk7XHJcblx0fVxyXG5cclxufSB0aGlzLkZvbGRlckJhc2UgPSBGb2xkZXJCYXNlO1xyXG5GYWN0b3J5LkFkZFN0cmluZ1RvQ2xhc3MoXCJGb2xkZXJCYXNlXCIsIEZvbGRlckJhc2UpO1xyXG5cclxuIl19