/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InspectObject = (function (_super) {
    __extends(InspectObject, _super);
    function InspectObject(theObject) {
        _super.call(this);
        this.inspectionObject = theObject;
        this.show();
    }
    InspectObject.prototype.getView = function () {
        var textArea = new UINoteField();
        var objectString = JSON.stringify(JSON.decycle(this.inspectionObject), null, 4);
        textArea.setValue(objectString);
        this.addComponent("textArea", textArea);
        this.componentView = this.createView({
            view: "form", id: this.componentID,
            elements: [this.getComponent("textArea").getView(),]
        });
        return this.componentView;
    };
    InspectObject.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
    };
    InspectObject.prototype.show = function () {
        var theWindow = new UIPopupWindow("Object Inspection", this);
        theWindow.show();
        return;
    };
    return InspectObject;
}(UIComplexComponent));
this.InspectObject = InspectObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zcGVjdE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkluc3BlY3RPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0VBQXdFOzs7Ozs7QUFFcEU7SUFBNEIsaUNBQWtCO0lBSTFDLHVCQUFZLFNBQWE7UUFDckIsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDTSwrQkFBTyxHQUFkO1FBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUNoQztZQUNDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ2xDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUc7U0FDcEQsQ0FBQyxDQUFDO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUNNLGtDQUFVLEdBQWpCO1FBQ0ksZ0JBQUssQ0FBQyxVQUFVLFdBQUUsQ0FBQztRQUNuQixnQkFBSyxDQUFDLFlBQVksV0FBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUE5QkQsQ0FBNEIsa0JBQWtCLEdBOEI3QztBQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cclxuXHJcbiAgICBjbGFzcyBJbnNwZWN0T2JqZWN0IGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHVibGljIGluc3BlY3Rpb25PYmplY3Q6YW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aGVPYmplY3Q6YW55KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zcGVjdGlvbk9iamVjdCA9IHRoZU9iamVjdDtcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuICAgICAgICAgICAgdmFyIHRleHRBcmVhID0gbmV3IFVJTm90ZUZpZWxkKCk7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShKU09OLmRlY3ljbGUodGhpcy5pbnNwZWN0aW9uT2JqZWN0KSwgbnVsbCwgNCk7XHJcbiAgICAgICAgICAgIHRleHRBcmVhLnNldFZhbHVlKG9iamVjdFN0cmluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KFwidGV4dEFyZWFcIiwgdGV4dEFyZWEpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsIGlkOiB0aGlzLmNvbXBvbmVudElELFxyXG4gICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBbdGhpcy5nZXRDb21wb25lbnQoXCJ0ZXh0QXJlYVwiKS5nZXRWaWV3KCksIF1cclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgc3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzaG93KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhlV2luZG93ID0gbmV3IFVJUG9wdXBXaW5kb3coXCJPYmplY3QgSW5zcGVjdGlvblwiLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhlV2luZG93LnNob3coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgdGhpcy5JbnNwZWN0T2JqZWN0ID0gSW5zcGVjdE9iamVjdDsiXX0=