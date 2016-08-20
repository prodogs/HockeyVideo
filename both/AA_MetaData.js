/// <reference path="../typescript-defs/all-definitions.d.ts"/>
console.log("Loading MetaData.ts....");
var RelationshipKey = (function () {
    function RelationshipKey() {
    }
    RelationshipKey.SUBJECT_TREE = "SUBJECT_TREE";
    return RelationshipKey;
}());
this.RelationshipKey = RelationshipKey;
var ClassType = (function () {
    function ClassType() {
    }
    ClassType.MAP = "map";
    ClassType.COUNTER = "counter";
    return ClassType;
}());
this.ClassType = ClassType;
var ClassStructureTypes;
(function (ClassStructureTypes) {
    ClassStructureTypes[ClassStructureTypes["Basic"] = 0] = "Basic";
    ClassStructureTypes[ClassStructureTypes["Tree"] = 1] = "Tree";
})(ClassStructureTypes || (ClassStructureTypes = {}));
this.ClassStructureTypes = ClassStructureTypes;
var ClassMetaData = (function () {
    function ClassMetaData() {
    }
    ClassMetaData.cast = function (object) {
        return object;
    };
    ClassMetaData.prototype.fromJSONValue = function (doc) {
        // default implementation
        for (var properties in doc) {
            this[properties] = doc[properties];
        }
    };
    ClassMetaData.prototype.toString = function () { return "no string"; };
    ClassMetaData.prototype.equals = function (other) {
        if (!(other instanceof ClassMetaData))
            return false;
        if (EJSON.stringify(this) == EJSON.stringify(other))
            return true;
        return false;
    };
    ClassMetaData.prototype.typeName = function () {
        return "ClassMetaData";
    };
    ClassMetaData.prototype.clone = function () {
        var newObject = new ClassMetaData();
        newObject.fromJSONValue(this);
        return newObject;
    };
    return ClassMetaData;
}());
this.ClassMetaData = ClassMetaData;
var RelationshipType;
(function (RelationshipType) {
    RelationshipType[RelationshipType["Tree"] = 0] = "Tree";
    RelationshipType[RelationshipType["OneWay"] = 1] = "OneWay";
    RelationshipType[RelationshipType["TwoWay"] = 2] = "TwoWay";
})(RelationshipType || (RelationshipType = {}));
this.RelationshipType = RelationshipType;
var RelationshipPossible;
(function (RelationshipPossible) {
    RelationshipPossible[RelationshipPossible["Add"] = 0] = "Add";
    RelationshipPossible[RelationshipPossible["Replace"] = 1] = "Replace";
    RelationshipPossible[RelationshipPossible["Remove"] = 3] = "Remove";
    RelationshipPossible[RelationshipPossible["NotAllowed"] = 4] = "NotAllowed";
    RelationshipPossible[RelationshipPossible["AlreadyExists"] = 5] = "AlreadyExists";
})(RelationshipPossible || (RelationshipPossible = {}));
this.RelationshipPossible = RelationshipPossible;
var RelationshipLabel = (function () {
    function RelationshipLabel() {
    }
    RelationshipLabel.prototype.clone = function () {
        var newObject = new RelationshipLabel();
        newObject.fromJSONValue(this);
        return newObject;
    };
    RelationshipLabel.prototype.fromJSONValue = function (doc) {
        this.label = doc["label"];
        this.optional = doc["optional"];
    };
    RelationshipLabel.prototype.toJSONValue = function () {
        return {
            "label": this.label, "optional": this.optional
        };
    };
    RelationshipLabel.prototype.typeName = function () {
        return "RelationshipLabel";
    };
    RelationshipLabel.prototype.equals = function (other) {
        if (!(other instanceof RelationshipLabel))
            return false;
        if (EJSON.stringify(this) == EJSON.stringify(other))
            return true;
        return false;
    };
    return RelationshipLabel;
}());
this.RelationshipLabel = RelationshipLabel;
var RelationshipLabels = (function () {
    function RelationshipLabels() {
    }
    RelationshipLabels.prototype.clone = function () {
        var newObject = new RelationshipLabels();
        newObject.fromJSONValue(this);
        return newObject;
    };
    RelationshipLabels.prototype.toJSONValue = function () {
        var valueArray = new Array();
        for (var item in this.labels) {
            var value = this.labels[item].toJSONValue();
            valueArray.push(value);
        }
        return {
            labels: this.labels
        };
    };
    RelationshipLabels.prototype.fromJSONValue = function (doc) {
        this.labels = new Array();
        for (var item in doc.labels) {
            var label = new RelationshipLabel();
            label.fromJSONValue(doc.labels[item]);
            this.labels.push(label);
        }
    };
    RelationshipLabels.prototype.typeName = function () {
        return "RelationshipLabels";
    };
    RelationshipLabels.prototype.equals = function (other) {
        if (!(other instanceof RelationshipLabels))
            return false;
        if (EJSON.stringify(this) == EJSON.stringify(other))
            return true;
        return false;
    };
    return RelationshipLabels;
}());
this.RelationshipLabels = RelationshipLabels;
var RelationshipMetaData = (function () {
    function RelationshipMetaData() {
    }
    RelationshipMetaData.prototype.toJSONValue = function () {
        return {
            from: this.from,
            to: this.to,
            description: this.description,
            label: this.label,
            relationshipType: this.relationshipType,
            relationshipLabels: this.relationshipLabels.toJSONValue(),
            useOnlyRelationLabels: this.useOnlyRelationLabels,
            sameObjectEnumeration: this.sameObjectEnumeration,
            sameClassEnumeration: this.sameClassEnumeration,
            sameObjectReverseAllowed: this.sameObjectReverseAllowed,
            routing: this.routing,
            curve: this.curve,
            maxLinks: this.maxLinks,
            visual: this.visual
        };
    };
    RelationshipMetaData.prototype.fromJSONValue = function (doc) {
        this["_id"] = doc._id;
        this["theID"] = doc._id;
        this.to = doc.to;
        this.from = doc.from;
        this.description = doc.description;
        this.label = doc.label;
        this.relationshipType = doc.relationshipType;
        this.relationshipLabels = new RelationshipLabels();
        this.relationshipLabels.fromJSONValue(doc.relationshipLabels);
        this.useOnlyRelationLabels = doc.useOnlyRelationLabels;
        this.sameObjectEnumeration = doc.sameObjectEnumeration;
        this.routing = doc.routing;
        this.curve = doc.routing;
        this.maxLinks = doc.maxLinks;
        this.visual = doc.visual;
        this.isPersistant = doc.isPersistant;
    };
    RelationshipMetaData.prototype.toString = function () { return "no string"; };
    RelationshipMetaData.prototype.equals = function (other) {
        if (!(other instanceof RelationshipMetaData))
            return false;
        if (EJSON.stringify(this) == EJSON.stringify(other))
            return true;
        return false;
    };
    RelationshipMetaData.prototype.typeName = function () {
        return "RelationshipMetaData";
    };
    RelationshipMetaData.prototype.clone = function () {
        var newObject = new RelationshipMetaData();
        newObject.fromJSONValue(this);
        return newObject;
    };
    return RelationshipMetaData;
}());
this.RelationshipMetaData = RelationshipMetaData;
var ProxyClassTypes;
(function (ProxyClassTypes) {
    ProxyClassTypes[ProxyClassTypes["Basic"] = 0] = "Basic";
    ProxyClassTypes[ProxyClassTypes["Tree"] = 1] = "Tree";
    ProxyClassTypes[ProxyClassTypes["Map"] = 2] = "Map";
    ProxyClassTypes[ProxyClassTypes["Folder"] = 3] = "Folder";
    ProxyClassTypes[ProxyClassTypes["Library"] = 4] = "Library";
})(ProxyClassTypes || (ProxyClassTypes = {}));
this.ProxyClassTypes = ProxyClassTypes;
var RoutingType;
(function (RoutingType) {
    RoutingType[RoutingType["Orthogonal"] = 0] = "Orthogonal";
    RoutingType[RoutingType["Normal"] = 1] = "Normal";
    RoutingType[RoutingType["AvoidsNodes"] = 2] = "AvoidsNodes";
})(RoutingType || (RoutingType = {}));
this.RoutingType = RoutingType;
var CurveType;
(function (CurveType) {
    CurveType[CurveType["JumpOver"] = 0] = "JumpOver";
    CurveType[CurveType["Bezier"] = 1] = "Bezier";
})(CurveType || (CurveType = {}));
this.CurveType = CurveType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUFfTWV0YURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBQV9NZXRhRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFHL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZDO0lBQUE7SUFHQSxDQUFDO0lBRGMsNEJBQVksR0FBYyxjQUFjLENBQUM7SUFDeEQsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBRXZDO0lBQUE7SUFJQSxDQUFDO0lBSGMsYUFBRyxHQUFzQixLQUFLLENBQUE7SUFDOUIsaUJBQU8sR0FBcUIsU0FBUyxDQUFDO0lBRXJELGdCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixJQUFLLG1CQUEyQztBQUFoRCxXQUFLLG1CQUFtQjtJQUFHLCtEQUFTLENBQUE7SUFBRSw2REFBUSxDQUFBO0FBQUMsQ0FBQyxFQUEzQyxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBQXdCO0FBQ2hELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUUvQztJQUFBO0lBNkNBLENBQUM7SUEzQ2Msa0JBQUksR0FBbEIsVUFBbUIsTUFBVTtRQUM1QixNQUFNLENBQWlCLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBbUJNLHFDQUFhLEdBQXBCLFVBQXFCLEdBQU87UUFDM0IseUJBQXlCO1FBQ3pCLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0YsQ0FBQztJQUNNLGdDQUFRLEdBQWYsY0FBMkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7SUFDeEMsOEJBQU0sR0FBYixVQUFjLEtBQW1CO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNkLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQU0sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBTSxLQUFLLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDTSxnQ0FBUSxHQUFmO1FBQ0MsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN4QixDQUFDO0lBQ00sNkJBQUssR0FBWjtRQUNDLElBQUksU0FBUyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDcEMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUNuQyxJQUFLLGdCQUFvRDtBQUF6RCxXQUFLLGdCQUFnQjtJQUFHLHVEQUFRLENBQUE7SUFBRSwyREFBVSxDQUFBO0lBQUUsMkRBQVUsQ0FBQTtBQUFBLENBQUMsRUFBcEQsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUFvQztBQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDekMsSUFBSyxvQkFBNEY7QUFBakcsV0FBSyxvQkFBb0I7SUFBRyw2REFBTyxDQUFBO0lBQUUscUVBQVcsQ0FBQTtJQUFFLG1FQUFVLENBQUE7SUFBRSwyRUFBYyxDQUFBO0lBQUUsaUZBQWlCLENBQUE7QUFBQyxDQUFDLEVBQTVGLG9CQUFvQixLQUFwQixvQkFBb0IsUUFBd0U7QUFDakcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBRWpEO0lBQUE7SUFnQ0EsQ0FBQztJQTVCTyxpQ0FBSyxHQUFaO1FBQ0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBRU0seUNBQWEsR0FBcEIsVUFBcUIsR0FBTztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sdUNBQVcsR0FBbEI7UUFDQyxNQUFNLENBQUM7WUFDTixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDOUMsQ0FBQTtJQUNGLENBQUM7SUFFTSxvQ0FBUSxHQUFmO1FBQ0MsTUFBTSxDQUFDLG1CQUFtQixDQUFDO0lBQzVCLENBQUM7SUFFTSxrQ0FBTSxHQUFiLFVBQWMsS0FBdUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQU0sS0FBSyxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0Ysd0JBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDO0lBQUE7SUFxQ0EsQ0FBQztJQWpDTyxrQ0FBSyxHQUFaO1FBQ0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ00sd0NBQVcsR0FBbEI7UUFDQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsTUFBTSxDQUFDO1lBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ25CLENBQUE7SUFDRixDQUFDO0lBQ00sMENBQWEsR0FBcEIsVUFBcUIsR0FBTztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFxQixDQUFDO1FBQzdDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUNwQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0YsQ0FBQztJQUNNLHFDQUFRLEdBQWY7UUFDQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7SUFDN0IsQ0FBQztJQUNNLG1DQUFNLEdBQWIsVUFBYyxLQUF3QjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLGtCQUFrQixDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNkLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQU0sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBTSxLQUFLLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0M7QUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDN0M7SUFBQTtJQXNFQSxDQUFDO0lBcERPLDBDQUFXLEdBQWxCO1FBQ0MsTUFBTSxDQUFDO1lBQ04sSUFBSSxFQUFzQixJQUFJLENBQUMsSUFBSTtZQUNuQyxFQUFFLEVBQXdCLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFdBQVcsRUFBZSxJQUFJLENBQUMsV0FBVztZQUMxQyxLQUFLLEVBQXFCLElBQUksQ0FBQyxLQUFLO1lBQ3BDLGdCQUFnQixFQUFVLElBQUksQ0FBQyxnQkFBZ0I7WUFDL0Msa0JBQWtCLEVBQVEsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUMvRCxxQkFBcUIsRUFBSyxJQUFJLENBQUMscUJBQXFCO1lBQ3BELHFCQUFxQixFQUFLLElBQUksQ0FBQyxxQkFBcUI7WUFDcEQsb0JBQW9CLEVBQU0sSUFBSSxDQUFDLG9CQUFvQjtZQUNuRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1lBQ3ZELE9BQU8sRUFBbUIsSUFBSSxDQUFDLE9BQU87WUFDdEMsS0FBSyxFQUFxQixJQUFJLENBQUMsS0FBSztZQUNwQyxRQUFRLEVBQWtCLElBQUksQ0FBQyxRQUFRO1lBQ3ZDLE1BQU0sRUFBb0IsSUFBSSxDQUFDLE1BQU07U0FDckMsQ0FBQTtJQUNGLENBQUM7SUFDTSw0Q0FBYSxHQUFwQixVQUFxQixHQUFPO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBZSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBYSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQW1CLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBaUIsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUssR0FBRyxDQUFDLGdCQUFnQixDQUFDO1FBQy9DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMscUJBQXFCLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBaUIsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFtQixHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQWdCLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBa0IsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFZLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDL0MsQ0FBQztJQUNNLHVDQUFRLEdBQWYsY0FBMkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7SUFDeEMscUNBQU0sR0FBYixVQUFjLEtBQTBCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksb0JBQW9CLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFNLEtBQUssQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNNLHVDQUFRLEdBQWY7UUFDQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7SUFDL0IsQ0FBQztJQUNNLG9DQUFLLEdBQVo7UUFDQyxJQUFJLFNBQVMsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFDM0MsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUF0RUQsSUFzRUM7QUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7QUFDakQsSUFBSyxlQUF3RTtBQUE3RSxXQUFLLGVBQWU7SUFBRyx1REFBUyxDQUFBO0lBQUUscURBQVEsQ0FBQTtJQUFFLG1EQUFPLENBQUE7SUFBRSx5REFBVSxDQUFBO0lBQUUsMkRBQVcsQ0FBQTtBQUFBLENBQUMsRUFBeEUsZUFBZSxLQUFmLGVBQWUsUUFBeUQ7QUFDN0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDdkMsSUFBSyxXQUEyRDtBQUFoRSxXQUFLLFdBQVc7SUFBRyx5REFBYyxDQUFBO0lBQUUsaURBQVUsQ0FBQTtJQUFFLDJEQUFlLENBQUE7QUFBQyxDQUFDLEVBQTNELFdBQVcsS0FBWCxXQUFXLFFBQWdEO0FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQy9CLElBQUssU0FBd0M7QUFBN0MsV0FBSyxTQUFTO0lBQUssaURBQVksQ0FBQTtJQUFFLDZDQUFVLENBQUE7QUFBQyxDQUFDLEVBQXhDLFNBQVMsS0FBVCxTQUFTLFFBQStCO0FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cblxuXG5jb25zb2xlLmxvZyhcIkxvYWRpbmcgTWV0YURhdGEudHMuLi4uXCIpO1xuY2xhc3MgUmVsYXRpb25zaGlwS2V5IHtcblxuXHRwdWJsaWMgc3RhdGljIFNVQkpFQ1RfVFJFRSAgICAgICAgICAgID0gXCJTVUJKRUNUX1RSRUVcIjtcbn1cbnRoaXMuUmVsYXRpb25zaGlwS2V5ID0gUmVsYXRpb25zaGlwS2V5O1xuXG5jbGFzcyBDbGFzc1R5cGUge1xuXHRwdWJsaWMgc3RhdGljIE1BUDpzdHJpbmcgICAgICAgICAgICBcdD0gXCJtYXBcIlxuXHRwdWJsaWMgc3RhdGljIENPVU5URVI6c3RyaW5nICAgICAgICAgICAgPSBcImNvdW50ZXJcIjtcblxufVxudGhpcy5DbGFzc1R5cGUgPSBDbGFzc1R5cGU7XG5lbnVtIENsYXNzU3RydWN0dXJlVHlwZXMgeyBCYXNpYyA9IDAsIFRyZWUgPSAxIH1cbnRoaXMuQ2xhc3NTdHJ1Y3R1cmVUeXBlcyA9IENsYXNzU3RydWN0dXJlVHlwZXM7XG5cbmNsYXNzIENsYXNzTWV0YURhdGEge1xuXG5cdHB1YmxpYyBzdGF0aWMgY2FzdChvYmplY3Q6YW55KTphbnkge1xuXHRcdHJldHVybiA8Q2xhc3NNZXRhRGF0YT4gb2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBjbGFzc1R5cGU6Q2xhc3NUeXBlO1xuXHRwdWJsaWMgc3RydWN0dXJlVHlwZTpQcm94eUNsYXNzVHlwZXM7XG5cdHB1YmxpYyBwcm94eUNsYXNzOnR5cGVvZiBDNE9iamVjdDtcblx0cHVibGljIHByb3h5Q2xhc3NTdHJpbmc6c3RyaW5nO1xuXHRwdWJsaWMgb2JqZWN0Q2xhc3NTdHJpbmc6c3RyaW5nO1xuXHRwdWJsaWMgdGltZUNhcHN1bGU6Ym9vbGVhbjtcblx0cHVibGljIGNvbGxlY3Rpb246YW55O1xuXHRwdWJsaWMgZGVzY3JpcHRpb246c3RyaW5nO1xuXHRwdWJsaWMgcm9vdE5hbWU6c3RyaW5nO1xuXHRwdWJsaWMgbGFiZWw6c3RyaW5nO1xuXHRwdWJsaWMgc3ViamVjdERldGFpbDpzdHJpbmc7XG5cdHB1YmxpYyBzdWJqZWN0TWFuYWdlcjpzdHJpbmc7XG5cdHB1YmxpYyBleHBsb3JlclZpZXc6c3RyaW5nO1xuXHRwdWJsaWMgaHRtbEljb246c3RyaW5nO1xuXHRwdWJsaWMgb2JzZXJ2ZVVwZGF0ZXM6Ym9vbGVhbjtcblx0cHVibGljIGlzUGVyc2lzdGFudDpib29sZWFuO1xuXHRwdWJsaWMgbWVhc3VyZWFibGU6Ym9vbGVhbjtcblxuXHRwdWJsaWMgZnJvbUpTT05WYWx1ZShkb2M6YW55KSB7XG5cdFx0Ly8gZGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuXHRcdGZvciAodmFyIHByb3BlcnRpZXMgaW4gZG9jKSB7XG5cdFx0XHR0aGlzW3Byb3BlcnRpZXNdID0gZG9jW3Byb3BlcnRpZXNdO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmcgeyByZXR1cm4gXCJubyBzdHJpbmdcIjt9XG5cdHB1YmxpYyBlcXVhbHMob3RoZXI6Q2xhc3NNZXRhRGF0YSkge1xuXHRcdGlmICghKG90aGVyIGluc3RhbmNlb2YgQ2xhc3NNZXRhRGF0YSkpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0aWYgKEVKU09OLnN0cmluZ2lmeSg8YW55PnRoaXMpID09IEVKU09OLnN0cmluZ2lmeSg8YW55Pm90aGVyKSlcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgdHlwZU5hbWUoKSB7XG5cdFx0cmV0dXJuIFwiQ2xhc3NNZXRhRGF0YVwiO1xuXHR9XG5cdHB1YmxpYyBjbG9uZSgpOkNsYXNzTWV0YURhdGEge1xuXHRcdHZhciBuZXdPYmplY3QgPSBuZXcgQ2xhc3NNZXRhRGF0YSgpO1xuXHRcdG5ld09iamVjdC5mcm9tSlNPTlZhbHVlKHRoaXMpO1xuXHRcdHJldHVybiBuZXdPYmplY3Q7XG5cdH1cbn1cbnRoaXMuQ2xhc3NNZXRhRGF0YSA9IENsYXNzTWV0YURhdGE7XG5lbnVtIFJlbGF0aW9uc2hpcFR5cGUgeyBUcmVlID0gMCwgT25lV2F5ID0gMSwgVHdvV2F5ID0gMn1cbnRoaXMuUmVsYXRpb25zaGlwVHlwZSA9IFJlbGF0aW9uc2hpcFR5cGU7XG5lbnVtIFJlbGF0aW9uc2hpcFBvc3NpYmxlIHsgQWRkID0gMCwgUmVwbGFjZSA9IDEsIFJlbW92ZSA9IDMsIE5vdEFsbG93ZWQgPSA0LCBBbHJlYWR5RXhpc3RzID0gNSB9XG50aGlzLlJlbGF0aW9uc2hpcFBvc3NpYmxlID0gUmVsYXRpb25zaGlwUG9zc2libGU7XG5cbmNsYXNzIFJlbGF0aW9uc2hpcExhYmVsIHtcblx0cHVibGljIGxhYmVsOnN0cmluZztcblx0cHVibGljIG9wdGlvbmFsOmJvb2xlYW47XG5cblx0cHVibGljIGNsb25lKCk6UmVsYXRpb25zaGlwTGFiZWwge1xuXHRcdHZhciBuZXdPYmplY3QgPSBuZXcgUmVsYXRpb25zaGlwTGFiZWwoKTtcblx0XHRuZXdPYmplY3QuZnJvbUpTT05WYWx1ZSh0aGlzKTtcblx0XHRyZXR1cm4gbmV3T2JqZWN0O1xuXHR9XG5cblx0cHVibGljIGZyb21KU09OVmFsdWUoZG9jOmFueSkge1xuXHRcdHRoaXMubGFiZWwgICAgPSBkb2NbXCJsYWJlbFwiXTtcblx0XHR0aGlzLm9wdGlvbmFsID0gZG9jW1wib3B0aW9uYWxcIl07XG5cdH1cblxuXHRwdWJsaWMgdG9KU09OVmFsdWUoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdFwibGFiZWxcIjogdGhpcy5sYWJlbCwgXCJvcHRpb25hbFwiOiB0aGlzLm9wdGlvbmFsXG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHR5cGVOYW1lKCkge1xuXHRcdHJldHVybiBcIlJlbGF0aW9uc2hpcExhYmVsXCI7XG5cdH1cblxuXHRwdWJsaWMgZXF1YWxzKG90aGVyOlJlbGF0aW9uc2hpcExhYmVsKSB7XG5cdFx0aWYgKCEob3RoZXIgaW5zdGFuY2VvZiBSZWxhdGlvbnNoaXBMYWJlbCkpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0aWYgKEVKU09OLnN0cmluZ2lmeSg8YW55PnRoaXMpID09IEVKU09OLnN0cmluZ2lmeSg8YW55Pm90aGVyKSlcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxudGhpcy5SZWxhdGlvbnNoaXBMYWJlbCA9IFJlbGF0aW9uc2hpcExhYmVsO1xuY2xhc3MgUmVsYXRpb25zaGlwTGFiZWxzIHtcblxuXHRwdWJsaWMgbGFiZWxzOkFycmF5PFJlbGF0aW9uc2hpcExhYmVsPjtcblxuXHRwdWJsaWMgY2xvbmUoKTpSZWxhdGlvbnNoaXBMYWJlbHMge1xuXHRcdHZhciBuZXdPYmplY3QgPSBuZXcgUmVsYXRpb25zaGlwTGFiZWxzKCk7XG5cdFx0bmV3T2JqZWN0LmZyb21KU09OVmFsdWUodGhpcyk7XG5cdFx0cmV0dXJuIG5ld09iamVjdDtcblx0fVxuXHRwdWJsaWMgdG9KU09OVmFsdWUoKTphbnkge1xuXHRcdHZhciB2YWx1ZUFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMubGFiZWxzKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSB0aGlzLmxhYmVsc1tpdGVtXS50b0pTT05WYWx1ZSgpO1xuXHRcdFx0dmFsdWVBcnJheS5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxhYmVsczogdGhpcy5sYWJlbHNcblx0XHR9XG5cdH1cblx0cHVibGljIGZyb21KU09OVmFsdWUoZG9jOmFueSkge1xuXHRcdHRoaXMubGFiZWxzID0gbmV3IEFycmF5PFJlbGF0aW9uc2hpcExhYmVsPigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gZG9jLmxhYmVscykge1xuXHRcdFx0dmFyIGxhYmVsID0gbmV3IFJlbGF0aW9uc2hpcExhYmVsKCk7XG5cdFx0XHRsYWJlbC5mcm9tSlNPTlZhbHVlKGRvYy5sYWJlbHNbaXRlbV0pO1xuXHRcdFx0dGhpcy5sYWJlbHMucHVzaChsYWJlbCk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyB0eXBlTmFtZSgpIHtcblx0XHRyZXR1cm4gXCJSZWxhdGlvbnNoaXBMYWJlbHNcIjtcblx0fVxuXHRwdWJsaWMgZXF1YWxzKG90aGVyOlJlbGF0aW9uc2hpcExhYmVscykge1xuXHRcdGlmICghKG90aGVyIGluc3RhbmNlb2YgUmVsYXRpb25zaGlwTGFiZWxzKSlcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRpZiAoRUpTT04uc3RyaW5naWZ5KDxhbnk+dGhpcykgPT0gRUpTT04uc3RyaW5naWZ5KDxhbnk+b3RoZXIpKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG50aGlzLlJlbGF0aW9uc2hpcExhYmVscyA9IFJlbGF0aW9uc2hpcExhYmVscztcbmNsYXNzIFJlbGF0aW9uc2hpcE1ldGFEYXRhIHtcblxuXHRwdWJsaWMgZnJvbTpDbGFzc1R5cGU7XG5cdHB1YmxpYyB0bzpDbGFzc1R5cGU7XG5cdHB1YmxpYyBkZXNjcmlwdGlvbjpzdHJpbmc7XG5cdHB1YmxpYyBsYWJlbDpzdHJpbmc7XG5cdHB1YmxpYyByZWxhdGlvbnNoaXBUeXBlOlJlbGF0aW9uc2hpcFR5cGU7XG5cdHB1YmxpYyByZWxhdGlvbnNoaXBMYWJlbHM6UmVsYXRpb25zaGlwTGFiZWxzO1xuXHRwdWJsaWMgdXNlT25seVJlbGF0aW9uTGFiZWxzOmJvb2xlYW47XG5cdHB1YmxpYyBzYW1lT2JqZWN0RW51bWVyYXRpb246bnVtYmVyO1xuXHRwdWJsaWMgc2FtZUNsYXNzRW51bWVyYXRpb246bnVtYmVyO1xuXHRwdWJsaWMgc2FtZU9iamVjdFJldmVyc2VBbGxvd2VkOmJvb2xlYW47XG5cdHB1YmxpYyByb3V0aW5nOlJvdXRpbmdUeXBlO1xuXHRwdWJsaWMgY3VydmU6Q3VydmVUeXBlO1xuXHRwdWJsaWMgbWF4TGlua3M6bnVtYmVyO1xuXHRwdWJsaWMgdmlzdWFsOmJvb2xlYW47XG5cdHB1YmxpYyBpc1BlcnNpc3RhbnQ6Ym9vbGVhbjtcblxuXHRwdWJsaWMgdG9KU09OVmFsdWUoKTphbnkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmcm9tICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZnJvbSxcblx0XHRcdHRvICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy50byxcblx0XHRcdGRlc2NyaXB0aW9uICAgICAgICAgICAgIDogdGhpcy5kZXNjcmlwdGlvbixcblx0XHRcdGxhYmVsICAgICAgICAgICAgICAgICAgIDogdGhpcy5sYWJlbCxcblx0XHRcdHJlbGF0aW9uc2hpcFR5cGUgICAgICAgIDogdGhpcy5yZWxhdGlvbnNoaXBUeXBlLFxuXHRcdFx0cmVsYXRpb25zaGlwTGFiZWxzICAgICAgOiB0aGlzLnJlbGF0aW9uc2hpcExhYmVscy50b0pTT05WYWx1ZSgpLFxuXHRcdFx0dXNlT25seVJlbGF0aW9uTGFiZWxzICAgOiB0aGlzLnVzZU9ubHlSZWxhdGlvbkxhYmVscyxcblx0XHRcdHNhbWVPYmplY3RFbnVtZXJhdGlvbiAgIDogdGhpcy5zYW1lT2JqZWN0RW51bWVyYXRpb24sXG5cdFx0XHRzYW1lQ2xhc3NFbnVtZXJhdGlvbiAgICA6IHRoaXMuc2FtZUNsYXNzRW51bWVyYXRpb24sXG5cdFx0XHRzYW1lT2JqZWN0UmV2ZXJzZUFsbG93ZWQ6IHRoaXMuc2FtZU9iamVjdFJldmVyc2VBbGxvd2VkLFxuXHRcdFx0cm91dGluZyAgICAgICAgICAgICAgICAgOiB0aGlzLnJvdXRpbmcsXG5cdFx0XHRjdXJ2ZSAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3VydmUsXG5cdFx0XHRtYXhMaW5rcyAgICAgICAgICAgICAgICA6IHRoaXMubWF4TGlua3MsXG5cdFx0XHR2aXN1YWwgICAgICAgICAgICAgICAgICA6IHRoaXMudmlzdWFsXG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBmcm9tSlNPTlZhbHVlKGRvYzphbnkpOmFueSB7XG5cdFx0dGhpc1tcIl9pZFwiXSAgICAgICAgICAgICA9IGRvYy5faWQ7XG5cdFx0dGhpc1tcInRoZUlEXCJdICAgICAgICAgICA9IGRvYy5faWQ7XG5cdFx0dGhpcy50byAgICAgICAgICAgICAgICAgPSBkb2MudG87XG5cdFx0dGhpcy5mcm9tICAgICAgICAgICAgICAgPSBkb2MuZnJvbTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uICAgICAgICA9IGRvYy5kZXNjcmlwdGlvbjtcblx0XHR0aGlzLmxhYmVsICAgICAgICAgICAgICA9IGRvYy5sYWJlbDtcblx0XHR0aGlzLnJlbGF0aW9uc2hpcFR5cGUgICA9IGRvYy5yZWxhdGlvbnNoaXBUeXBlO1xuXHRcdHRoaXMucmVsYXRpb25zaGlwTGFiZWxzID0gbmV3IFJlbGF0aW9uc2hpcExhYmVscygpO1xuXHRcdHRoaXMucmVsYXRpb25zaGlwTGFiZWxzLmZyb21KU09OVmFsdWUoZG9jLnJlbGF0aW9uc2hpcExhYmVscyk7XG5cdFx0dGhpcy51c2VPbmx5UmVsYXRpb25MYWJlbHMgPSBkb2MudXNlT25seVJlbGF0aW9uTGFiZWxzO1xuXHRcdHRoaXMuc2FtZU9iamVjdEVudW1lcmF0aW9uID0gZG9jLnNhbWVPYmplY3RFbnVtZXJhdGlvbjtcblx0XHR0aGlzLnJvdXRpbmcgICAgICAgICAgICAgICA9IGRvYy5yb3V0aW5nO1xuXHRcdHRoaXMuY3VydmUgICAgICAgICAgICAgICAgID0gZG9jLnJvdXRpbmc7XG5cdFx0dGhpcy5tYXhMaW5rcyAgICAgICAgICAgICAgPSBkb2MubWF4TGlua3M7XG5cdFx0dGhpcy52aXN1YWwgICAgICAgICAgICAgICAgPSBkb2MudmlzdWFsO1xuXHRcdHRoaXMuaXNQZXJzaXN0YW50ICAgICAgICAgID0gZG9jLmlzUGVyc2lzdGFudDtcblx0fVxuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmcgeyByZXR1cm4gXCJubyBzdHJpbmdcIjt9XG5cdHB1YmxpYyBlcXVhbHMob3RoZXI6UmVsYXRpb25zaGlwTWV0YURhdGEpIHtcblx0XHRpZiAoIShvdGhlciBpbnN0YW5jZW9mIFJlbGF0aW9uc2hpcE1ldGFEYXRhKSlcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRpZiAoRUpTT04uc3RyaW5naWZ5KDxhbnk+dGhpcykgPT0gRUpTT04uc3RyaW5naWZ5KDxhbnk+b3RoZXIpKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyB0eXBlTmFtZSgpIHtcblx0XHRyZXR1cm4gXCJSZWxhdGlvbnNoaXBNZXRhRGF0YVwiO1xuXHR9XG5cdHB1YmxpYyBjbG9uZSgpOlJlbGF0aW9uc2hpcE1ldGFEYXRhIHtcblx0XHR2YXIgbmV3T2JqZWN0ID0gbmV3IFJlbGF0aW9uc2hpcE1ldGFEYXRhKCk7XG5cdFx0bmV3T2JqZWN0LmZyb21KU09OVmFsdWUodGhpcyk7XG5cdFx0cmV0dXJuIG5ld09iamVjdDtcblx0fVxufVxudGhpcy5SZWxhdGlvbnNoaXBNZXRhRGF0YSA9IFJlbGF0aW9uc2hpcE1ldGFEYXRhO1xuZW51bSBQcm94eUNsYXNzVHlwZXMgeyBCYXNpYyA9IDAsIFRyZWUgPSAxLCBNYXAgPSAyLCBGb2xkZXIgPSAzLCBMaWJyYXJ5ID0gNH1cbnRoaXMuUHJveHlDbGFzc1R5cGVzID0gUHJveHlDbGFzc1R5cGVzO1xuZW51bSBSb3V0aW5nVHlwZSB7IE9ydGhvZ29uYWwgPSAwLCBOb3JtYWwgPSAxLCBBdm9pZHNOb2RlcyA9IDIgfVxudGhpcy5Sb3V0aW5nVHlwZSA9IFJvdXRpbmdUeXBlO1xuZW51bSBDdXJ2ZVR5cGUgICB7IEp1bXBPdmVyID0gMCwgQmV6aWVyID0gMSB9XG50aGlzLkN1cnZlVHlwZSA9IEN1cnZlVHlwZTtcbiJdfQ==