/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UITreeMap = (function (_super) {
    __extends(UITreeMap, _super);
    function UITreeMap(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.headerTemplate = "#name#";
        this.valueTemplate = "#value#";
        this.activeItem = false;
        this.subRender = false;
    }
    UITreeMap.OnItemClick = function (id) {
        var theComponentID = this["config"].id;
        if (!$$(theComponentID))
            return;
        var theComponent = $$(theComponentID)["component"];
        theComponent.onItemClick(id);
    };
    UITreeMap.prototype.listen = function (event, data, caller) {
        switch (event) {
            case "eventName":
            default:
                UI.Info(event);
                break;
        }
    };
    UITreeMap.prototype.onItemClick = function (id) {
        this.publish("onItemClick", id);
    };
    UITreeMap.prototype.getView = function () {
        this.componentView = this.createView({
            view: "treemap",
            id: this.componentID,
            value: this.valueTemplate,
            headerTemplate: this.headerTemplate,
            activeItem: this.activeItem,
            subRender: this.subRender,
            type: {
                cssClass: this.colorFunction
            }
        });
        return this.componentView;
    };
    UITreeMap.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UITreeMap.prototype.defineEvents = function () {
        if ($$(this.componentID)) {
            $$(this.componentID).attachEvent("onItemClick", UITreeMap.OnItemClick);
        }
    };
    UITreeMap.prototype.show = function () {
        this.popup = new UIPopupWindow("Component Label ");
        this.popup.show(this);
    };
    return UITreeMap;
}(UIComplexComponent));
this.UITreeMap = UITreeMap;
Factory.AddStringToClass("UITreeMap", UITreeMap);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUlUcmVlTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVUlUcmVlTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTs7Ozs7O0FBTXhFO0lBQXdCLDZCQUFrQjtJQWdCekMsbUJBQVksVUFBcUI7UUFBckIsMEJBQXFCLEdBQXJCLGlCQUFxQjtRQUNoQyxrQkFBTSxVQUFVLENBQUMsQ0FBQztRQWJaLG1CQUFjLEdBQU8sUUFBUSxDQUFDO1FBQzlCLGtCQUFhLEdBQVEsU0FBUyxDQUFDO1FBQy9CLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztJQVdsQyxDQUFDO0lBVGEscUJBQVcsR0FBekIsVUFBMEIsRUFBUztRQUNsQyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksWUFBWSxHQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFNTSwwQkFBTSxHQUFiLFVBQWMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNO1FBQ2hDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLFdBQVcsQ0FBQztZQUNqQjtnQkFDQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLEtBQUssQ0FBQztRQUNSLENBQUM7SUFDRixDQUFDO0lBRU0sK0JBQVcsR0FBbEIsVUFBbUIsRUFBTTtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sMkJBQU8sR0FBZDtRQUNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNwQyxJQUFJLEVBQVksU0FBUztZQUN6QixFQUFFLEVBQWMsSUFBSSxDQUFDLFdBQVc7WUFDaEMsS0FBSyxFQUFXLElBQUksQ0FBQyxhQUFhO1lBQ2xDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxVQUFVLEVBQU0sSUFBSSxDQUFDLFVBQVU7WUFDL0IsU0FBUyxFQUFPLElBQUksQ0FBQyxTQUFTO1lBQzlCLElBQUksRUFBWTtnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDNUI7U0FDRCxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDQyxnQkFBSyxDQUFDLFVBQVUsV0FBRSxDQUFDO1FBQ25CLGdCQUFLLENBQUMsWUFBWSxXQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxnQ0FBWSxHQUFuQjtRQUNDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNGLENBQUM7SUFFTSx3QkFBSSxHQUFYO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFoRUQsQ0FBd0Isa0JBQWtCLEdBZ0V6QztBQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuXG5cbmludGVyZmFjZSBDb2xvckZ1bmN0aW9uIHtcblx0KG9iamVjdDphbnkpIDogc3RyaW5nO1xufVxuY2xhc3MgVUlUcmVlTWFwIGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcblx0cHVibGljIHBvcHVwOlVJUG9wdXBXaW5kb3c7XG5cdHB1YmxpYyB0cmVlTWFwOkFycmF5PGFueT47XG5cdHB1YmxpYyBjb2xvckZ1bmN0aW9uOkNvbG9yRnVuY3Rpb247XG5cdHB1YmxpYyBoZWFkZXJUZW1wbGF0ZSAgICAgPSBcIiNuYW1lI1wiO1xuXHRwdWJsaWMgdmFsdWVUZW1wbGF0ZSAgICAgID0gXCIjdmFsdWUjXCI7XG5cdHB1YmxpYyBhY3RpdmVJdGVtOmJvb2xlYW4gPSBmYWxzZTtcblx0cHVibGljIHN1YlJlbmRlcjpib29sZWFuICA9IGZhbHNlO1xuXG5cdHB1YmxpYyBzdGF0aWMgT25JdGVtQ2xpY2soaWQ6c3RyaW5nKSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudElEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHRpZiAoISQkKHRoZUNvbXBvbmVudElEKSkgcmV0dXJuO1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlUcmVlTWFwPiAkJCh0aGVDb21wb25lbnRJRClbXCJjb21wb25lbnRcIl07XG5cdFx0dGhlQ29tcG9uZW50Lm9uSXRlbUNsaWNrKGlkKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHR9XG5cblx0cHVibGljIGxpc3RlbihldmVudCwgZGF0YSwgY2FsbGVyKSB7XG5cdFx0c3dpdGNoIChldmVudCkge1xuXHRcdFx0Y2FzZSBcImV2ZW50TmFtZVwiOlxuXHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdFVJLkluZm8oZXZlbnQpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgb25JdGVtQ2xpY2soaWQ6YW55KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwib25JdGVtQ2xpY2tcIiwgaWQpO1xuXHR9XG5cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHR2aWV3ICAgICAgICAgIDogXCJ0cmVlbWFwXCIsXG5cdFx0XHRpZCAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZhbHVlICAgICAgICAgOiB0aGlzLnZhbHVlVGVtcGxhdGUsXG5cdFx0XHRoZWFkZXJUZW1wbGF0ZTogdGhpcy5oZWFkZXJUZW1wbGF0ZSxcblx0XHRcdGFjdGl2ZUl0ZW0gICAgOiB0aGlzLmFjdGl2ZUl0ZW0sXG5cdFx0XHRzdWJSZW5kZXIgICAgIDogdGhpcy5zdWJSZW5kZXIsXG5cdFx0XHR0eXBlICAgICAgICAgIDoge1xuXHRcdFx0XHRjc3NDbGFzczogdGhpcy5jb2xvckZ1bmN0aW9uXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuYXR0YWNoRXZlbnQoXCJvbkl0ZW1DbGlja1wiLCBVSVRyZWVNYXAuT25JdGVtQ2xpY2spO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbXBvbmVudCBMYWJlbCBcIik7XG5cdFx0dGhpcy5wb3B1cC5zaG93KHRoaXMpO1xuXHR9XG59XG50aGlzLlVJVHJlZU1hcCA9IFVJVHJlZU1hcDtcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIlVJVHJlZU1hcFwiLCBVSVRyZWVNYXApOyJdfQ==