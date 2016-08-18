/// <reference path="../typescript-defs/all-definitions.d.ts"/>

declare var SimpleSchema:any;

SimpleSchema.debug = true;
this.Initialization = new ReactiveVar(0);

console.log("Loading Collections.ts ...");
console.log("defining collections ...");

this.MetaDataStore = new Mongo.Collection("MetaData", {
    transform: function (doc) {
        var newObject = new ClassMetaData();
        newObject.fromJSONValue(doc);
        return newObject;
    }
});
this.RelationshipStore = new Mongo.Collection("Relationships", {
    transform: function (doc) {
        var newObject = new RelationshipMetaData();
        newObject.fromJSONValue(doc);
        return newObject;
    }
});

this.SystemHealthStoreSchema = new SimpleSchema({
    name          : {
        type: String, label: "Name"
    }, description: {
        type: String, label: "Description", optional: true, defaultValue: ""
    }, healthLevel: {
        type: Number, label: "Health"
    }, message    : {
        type: String, label: "Message", optional: true, defaultValue: ""
    }, classType  : {
        type: String, optional: true, defaultValue: "systemHealth"
    }, createdAt  : {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy  : {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.SystemHealthStore       = new Mongo.Collection("SystemHealth", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.SystemHealthStore.attachSchema(this.SystemHealthStoreSchema);

this.CounterSchema = new SimpleSchema({
    name    : {
        type: String, label: "Name"
    }, index: {
        type: Number, label: "Index",
    }, classType: {
        type: String, optional: true, defaultValue: "counter"
    }, createdAt: {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy: {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.CounterStore  = new Mongo.Collection("Counter", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.CounterStore.attachSchema(this.CounterSchema);

this.TimeMachineStore  = new Mongo.Collection("TimeMachine", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.TimeMachineSchema = new SimpleSchema({
    name: {
        type: String, label: "Name"
    }, description: {
        type: String, label: "Description", optional: true
    }, versionID  : {
        type: String, label: "Version", optional: true
    }, jsonArray  : {
        type: String, label: "Capsule Objects", optional: true
    }, objectCount: {
        type: Number, label: "Number of Objects",
    }, date       : {
        type: Date, label: "Snapshot Date",
    }, classType  : {
        type: String, optional: true, defaultValue: "timeMachine",
    }, createdAt: {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy: {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.TimeMachineStore.attachSchema(this.TimeMachineSchema);

this.C4logDB     = new Mongo.Collection("C4log");
this.C4logSchema = new SimpleSchema({
    type          : {
        type: String, label: "Category"
    }, message    : {
        type: String, label: "message"
    }, description: {
        type: String, label: "Description", optional: true
    }, errorObject: {
        type: String, label: "Error Object",
    }, classType  : {
        type: String, optional: true, defaultValue: "c4logDB",
    }, object     : {
        type: String, label: "Object",
    }, caller     : {
        type: String, label: "Caller", optional: true
    }, browser    : {
        type: String, label: "Browser", optional: true, defaultValue: ""
    }, createdAt  : {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy  : {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.C4logDB.attachSchema(this.C4logSchema);

this.LibraryStore  = new Mongo.Collection("container", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.LibrarySchema = new SimpleSchema({
    name          : {
        type: String, label: "Category"
    }, description: {
        type: String, label: "message"
    }, theObjects : {
        type: String, label: "Object Json", optional: true
    }, theLinks   : {
        type: String, label: "Link Json", optional: true
    }, createdAt: {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy: {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.LibraryStore.attachSchema(this.LibrarySchema);

this.ImportLogStore = new Mongo.Collection("ImportLog"), {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
};
this.ImportLogSchema = new SimpleSchema({
    name         : {
        type: String, label: "Name"
    }, message   : {
        type: String, label: "Message", optional: true
    }, theObjects: {
        type: String, label: "The Objects", optional: true
    }, createdAt: {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy: {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.ImportLogStore.attachSchema(this.ImportLogSchema);

this.ApplicationContextSchema = new SimpleSchema({
    name          : {
        type: String, label: "name"
    }, description: {
        type: String, label: "description", max: 200, defaultValue: "", optional: true
    }, classType  : {
        type: String, optional: true, defaultValue: "applicationContext",
    }, createdAt  : {
        type: Date, optional: true, autoValue: function () {
            return new Date()
        }
    }, createdBy: {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.ApplicationContextStore  = new Mongo.Collection("ApplicationContext", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.ApplicationContextStore.attachSchema(this.ApplicationContextSchema);

this.FolderSchema = new SimpleSchema({
    name              : {
        type: String, label: "name"
    }, description    : {
        type: String, label: "description", optional: true, defaultValue: ""
    }, folderClassType: {
        type: String, label: "Folder Type"
    }, classType      : {
        type: String,
    }, createdAt      : {
        type: Date, autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                return this.unset();  // Prevent user from supplying their own value
            }
        }
    }, updatedAt      : {
        type         : Date, autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        }, denyInsert: true, optional: true
    }, createdBy      : {
        type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.FolderStore  = new Mongo.Collection("Folder", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.FolderStore.attachSchema(this.FolderSchema);

this.MapSchema = new SimpleSchema({
    name          : { type: String, label: "Name" },
    mapObjectID1  : { type: String, label: "MapObject ID 1"   },
    mapObjectType1: { type: String, label: "MapObject Type 1"   },
    mapObjectType2: { type: String, label: "MapObject Type 2"   },
    mapObjectID2  : { type: String, label: "MapObject ID 2",     },
    description   : { type: String, label: "Description", optional: true, defaultValue: ""  },
    label         : { type: String, label: "Label", optional: true, defaultValue: ""},
    relationshipKey         : { type: String, label: "Relationship Key", optional: true, defaultValue: ""},
    tags          : { type: String, label: "Tags", optional: true, defaultValue: "" },
    scenario      : { type: String, label: "scenario", optional: true, defaultValue: ""  },
    classType     : { type: String, optional: true, defaultValue: "map",  },
    createdAt     : { type: Date, optional: true, autoValue: function () {  return new Date()   }  },
    createdBy     : { type: String, optional: true, autoValue: function () {
            return this.userId
        }
    }
});
this.MapStore  = new Mongo.Collection("Map", {
    transform: function (doc) {
        var newObject = Factory.CreateInstanceFromJSON(doc);
        return newObject;
    }
});
this.MapStore.attachSchema(this.MapSchema);

console.log("setting permissions for collections");
    
this.LibraryStore.allow({
    insert: function () {return true }, update: function () {return true }, remove: function () {return true }
});
this.C4logDB.allow({
    insert: function () {return true }, update: function () {return true }, remove: function () {return true }
});
this.FolderStore.allow({
    insert: function () {return true }, update: function () {return true }, remove: function () {return true }
});
this.MapStore.allow({
    insert: function () {return true }, update: function () {return true }, remove: function () {return true }
});
this.TimeMachineStore.allow({
    insert: function () {return true }, update: function () {return true }, remove: function () {return true }
});
this.CounterStore.allow({
    insert: function () { return true }, update: function () { return true }, remove: function () { return true }
});
this.SystemHealthStore.allow({
    insert: function () { return true }, update: function () { return true }, remove: function () { return true }
});


if (Meteor.isClient) {

    console.log("Subscribing to Collections");
    Meteor.subscribe("MetaData", {
        onReady: function () { console.log("onReady MetaData nd the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("Relationships", {
        onReady: function () { console.log("onReady Relationships And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("SystemHealth", {
        onReady: function () { console.log("onReady SystemHealth And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("Counter", {
        onReady: function () { console.log("onReady Counter And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("TimeMachine", {
        onReady: function () { console.log("onReady TimeMachine And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("C4log", {
        onReady: function () { console.log("onReady C4log And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("ApplicationContext", {
        onReady: function () { console.log("onReady ApplicationContext And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("Folder", {
        onReady: function () { console.log("onReady Folder And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
    Meteor.subscribe("Map", {
        onReady: function () { console.log("onReady Map And the Itemns actually Arrive", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
}

if (Meteor.isServer) {
    console.log("Publishing Collections ...");
    Meteor.publish("MetaData", function () {     return MetaDataStore.find();    });
    Meteor.publish("Relationships", function () {    return RelationshipStore.find();    });
    Meteor.publish("Counter", function () { return CounterStore.find();});
    Meteor.publish("TimeMachine", function () { return TimeMachineStore.find(); });
    Meteor.publish("C4log", function () { return C4logDB.find(); });
    Meteor.publish("Folder", function () { return FolderStore.find(); });
    Meteor.publish("Map", function () { return MapStore.find(); });
}