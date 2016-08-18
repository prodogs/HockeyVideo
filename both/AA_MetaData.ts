/// <reference path="../typescript-defs/all-definitions.d.ts"/>


console.log("Loading MetaData.ts....");
class RelationshipKey {

	public static SUBJECT_TREE            = "SUBJECT_TREE";
}
this.RelationshipKey = RelationshipKey;

class ClassType {
	public static MAP:string            	= "map"
	public static COUNTER:string            = "counter";

}
this.ClassType = ClassType;
enum ClassStructureTypes { Basic = 0, Tree = 1 }
this.ClassStructureTypes = ClassStructureTypes;

class ClassMetaData {

	public static cast(object:any):any {
		return <ClassMetaData> object;
	}
	public classType:ClassType;
	public structureType:ProxyClassTypes;
	public proxyClass:typeof C4Object;
	public proxyClassString:string;
	public objectClassString:string;
	public timeCapsule:boolean;
	public collection:any;
	public description:string;
	public rootName:string;
	public label:string;
	public subjectDetail:string;
	public subjectManager:string;
	public explorerView:string;
	public htmlIcon:string;
	public observeUpdates:boolean;
	public isPersistant:boolean;
	public measureable:boolean;

	public fromJSONValue(doc:any) {
		// default implementation
		for (var properties in doc) {
			this[properties] = doc[properties];
		}
	}
	public toString():string { return "no string";}
	public equals(other:ClassMetaData) {
		if (!(other instanceof ClassMetaData))
			return false;
		if (EJSON.stringify(<any>this) == EJSON.stringify(<any>other))
			return true;
		return false;
	}
	public typeName() {
		return "ClassMetaData";
	}
	public clone():ClassMetaData {
		var newObject = new ClassMetaData();
		newObject.fromJSONValue(this);
		return newObject;
	}
}
this.ClassMetaData = ClassMetaData;
enum RelationshipType { Tree = 0, OneWay = 1, TwoWay = 2}
this.RelationshipType = RelationshipType;
enum RelationshipPossible { Add = 0, Replace = 1, Remove = 3, NotAllowed = 4, AlreadyExists = 5 }
this.RelationshipPossible = RelationshipPossible;

class RelationshipLabel {
	public label:string;
	public optional:boolean;

	public clone():RelationshipLabel {
		var newObject = new RelationshipLabel();
		newObject.fromJSONValue(this);
		return newObject;
	}

	public fromJSONValue(doc:any) {
		this.label    = doc["label"];
		this.optional = doc["optional"];
	}

	public toJSONValue() {
		return {
			"label": this.label, "optional": this.optional
		}
	}

	public typeName() {
		return "RelationshipLabel";
	}

	public equals(other:RelationshipLabel) {
		if (!(other instanceof RelationshipLabel))
			return false;
		if (EJSON.stringify(<any>this) == EJSON.stringify(<any>other))
			return true;
		return false;
	}
}
this.RelationshipLabel = RelationshipLabel;
class RelationshipLabels {

	public labels:Array<RelationshipLabel>;

	public clone():RelationshipLabels {
		var newObject = new RelationshipLabels();
		newObject.fromJSONValue(this);
		return newObject;
	}
	public toJSONValue():any {
		var valueArray = new Array<any>();
		for (var item in this.labels) {
			var value = this.labels[item].toJSONValue();
			valueArray.push(value);
		}
		return {
			labels: this.labels
		}
	}
	public fromJSONValue(doc:any) {
		this.labels = new Array<RelationshipLabel>();
		for (var item in doc.labels) {
			var label = new RelationshipLabel();
			label.fromJSONValue(doc.labels[item]);
			this.labels.push(label);
		}
	}
	public typeName() {
		return "RelationshipLabels";
	}
	public equals(other:RelationshipLabels) {
		if (!(other instanceof RelationshipLabels))
			return false;
		if (EJSON.stringify(<any>this) == EJSON.stringify(<any>other))
			return true;
		return false;
	}
}
this.RelationshipLabels = RelationshipLabels;
class RelationshipMetaData {

	public from:ClassType;
	public to:ClassType;
	public description:string;
	public label:string;
	public relationshipType:RelationshipType;
	public relationshipLabels:RelationshipLabels;
	public useOnlyRelationLabels:boolean;
	public sameObjectEnumeration:number;
	public sameClassEnumeration:number;
	public sameObjectReverseAllowed:boolean;
	public routing:RoutingType;
	public curve:CurveType;
	public maxLinks:number;
	public visual:boolean;
	public isPersistant:boolean;

	public toJSONValue():any {
		return {
			from                    : this.from,
			to                      : this.to,
			description             : this.description,
			label                   : this.label,
			relationshipType        : this.relationshipType,
			relationshipLabels      : this.relationshipLabels.toJSONValue(),
			useOnlyRelationLabels   : this.useOnlyRelationLabels,
			sameObjectEnumeration   : this.sameObjectEnumeration,
			sameClassEnumeration    : this.sameClassEnumeration,
			sameObjectReverseAllowed: this.sameObjectReverseAllowed,
			routing                 : this.routing,
			curve                   : this.curve,
			maxLinks                : this.maxLinks,
			visual                  : this.visual
		}
	}
	public fromJSONValue(doc:any):any {
		this["_id"]             = doc._id;
		this["theID"]           = doc._id;
		this.to                 = doc.to;
		this.from               = doc.from;
		this.description        = doc.description;
		this.label              = doc.label;
		this.relationshipType   = doc.relationshipType;
		this.relationshipLabels = new RelationshipLabels();
		this.relationshipLabels.fromJSONValue(doc.relationshipLabels);
		this.useOnlyRelationLabels = doc.useOnlyRelationLabels;
		this.sameObjectEnumeration = doc.sameObjectEnumeration;
		this.routing               = doc.routing;
		this.curve                 = doc.routing;
		this.maxLinks              = doc.maxLinks;
		this.visual                = doc.visual;
		this.isPersistant          = doc.isPersistant;
	}
	public toString():string { return "no string";}
	public equals(other:RelationshipMetaData) {
		if (!(other instanceof RelationshipMetaData))
			return false;
		if (EJSON.stringify(<any>this) == EJSON.stringify(<any>other))
			return true;
		return false;
	}
	public typeName() {
		return "RelationshipMetaData";
	}
	public clone():RelationshipMetaData {
		var newObject = new RelationshipMetaData();
		newObject.fromJSONValue(this);
		return newObject;
	}
}
this.RelationshipMetaData = RelationshipMetaData;
enum ProxyClassTypes { Basic = 0, Tree = 1, Map = 2, Folder = 3, Library = 4}
this.ProxyClassTypes = ProxyClassTypes;
enum RoutingType { Orthogonal = 0, Normal = 1, AvoidsNodes = 2 }
this.RoutingType = RoutingType;
enum CurveType   { JumpOver = 0, Bezier = 1 }
this.CurveType = CurveType;
