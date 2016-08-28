

interface ColorFunction {
	(object:any) : string;
}
class UITreeMap extends UIComplexComponent {
	public popup:UIPopupWindow;
	public treeMap:Array<any>;
	public colorFunction:ColorFunction;
	public headerTemplate     = "#name#";
	public valueTemplate      = "#value#";
	public activeItem:boolean = false;
	public subRender:boolean  = false;

	public static OnItemClick(id:string) {
		var theComponentID = this["config"].id;
		if (!$$(theComponentID)) return;
		var theComponent = <UITreeMap> $$(theComponentID)["component"];
		theComponent.onItemClick(id);
	}

	constructor(properties:any = null) {
		super(properties);
	}

	public listen(event, data, caller) {
		switch (event) {
			case "eventName":
			default :
				UI.Info(event);
				break;
		}
	}

	public onItemClick(id:any) {
		this.publish("onItemClick", id);
	}

	public getView():any {
		this.componentView = this.createView({
			view          : "treemap",
			id            : this.componentID,
			value         : this.valueTemplate,
			headerTemplate: this.headerTemplate,
			activeItem    : this.activeItem,
			subRender     : this.subRender,
			type          : {
				cssClass: this.colorFunction
			}
		})
		return this.componentView;
	}

	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}

	public defineEvents() {
		if ($$(this.componentID)) {
			$$(this.componentID).attachEvent("onItemClick", UITreeMap.OnItemClick);
		}
	}

	public show() {
		this.popup = new UIPopupWindow("Component Label ");
		this.popup.show(this);
	}
}
this.UITreeMap = UITreeMap;
Factory.AddStringToClass("UITreeMap", UITreeMap);