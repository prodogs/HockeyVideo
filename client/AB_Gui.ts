/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
declare var toastr:any;
declare var C4four:any;
declare var findClassType:any;
declare var findID:any;
declare var FindIT:any;

declare var buzz:any;
console.log("Loading gui.ts ...");
findClassType = null;

class DropMessage {
	public fromObjects:Array<any>;
	public fromComponent:UIComponent;
	public toComponent:UIComponent;
	public toObject:any;
	public context:any;
	public ev:any;
}

class UIEventHandler {
	public static OnAfterTabClick() { }
	public static FieldChanged(newValue:any, oldValue) {
		var theComponentID = this["config"].id;
		var theComponent   = <UITextField> $$(theComponentID)["component"];
		theComponent.fieldChanged(newValue, oldValue);
	}
	public static CreateDropMessage(context):DropMessage {
		var fromID:string;
		var fromComponent:UIComponent;
		var toComponent:UIComponent;
		var arrayOfObjects = new Array<any>();
		var toObject;
		fromID   = context["from"].config.id;
		var toID = context["to"].config.id;
		for (var i = 0; i < context.source.length; i++) {
			arrayOfObjects.push(context.from.getItem(context.source[i]));
		}
		if ($$(fromID)) fromComponent = $$(fromID)["component"];
		if ($$(toID)) toComponent = $$(toID)["component"];
		var dropMessage = new DropMessage();
		dropMessage.fromComponent = fromComponent;
		dropMessage.toComponent   = toComponent;
		dropMessage.fromObjects   = arrayOfObjects;
		if (context.target == null)
			dropMessage.toObject = null; else {
			dropMessage.toObject = $$(toID).getItem(context.target.row);
		}
		dropMessage.context = context;
		dropMessage.ev      = null;
		return dropMessage;
	}
	public static OnBeforeDragIn(context, event) {
		var dropMessage = UIEventHandler.CreateDropMessage(context);
		if (typeof dropMessage.toComponent.onBeforeDragIn == 'function')
			return dropMessage.toComponent.onBeforeDragIn(dropMessage); else {
			AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
			return;
		}
	}
	public static onDragOut(context, event) {
		var context = webix.DragControl.getContext();
		UI.Info("OnDragOut Static")
		var dropMessage = UIEventHandler.CreateDropMessage(context);
		if (typeof dropMessage.toComponent.onDragOut == 'function')
			return dropMessage.toComponent.onDragOut(dropMessage); else {
			AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
			return;
		}
	}
	public static onBeforeDrop(context, ev) {

	}
	public static OnAfterDrop2(context, ev) {

	}
	public static OnAfterDrop(context, event) {
		var context = webix.DragControl.getContext();
		var dropMessage = UIEventHandler.CreateDropMessage(context);
		if (typeof dropMessage.toComponent.onAfterDrop == 'function')
			return dropMessage.toComponent.onAfterDrop(dropMessage); else {
			AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
			return;
		}
	}
	public static OnButtonClick(id:string, event) {
		var theComponentID = this["config"].id;
		if (!$$(theComponentID)) return;
		var theComponent = <UIButton> $$(theComponentID)["component"];
		theComponent.onButtonClick(theComponent);
	}
	public static OnDragOut(context, event) {
		var context = webix.DragControl.getContext();
		var dropMessage = UIEventHandler.CreateDropMessage(context);
		if (typeof dropMessage.toComponent.onDragOut == 'function')
			return dropMessage.toComponent.onDragOut(dropMessage); else {
			AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
			return;
		}
	}
	public static OnBeforeDrop(context, event) {
		var context = webix.DragControl.getContext();
		var dropMessage = UIEventHandler.CreateDropMessage(context);
		if (typeof dropMessage.toComponent.onBeforeDrop == 'function')
			return dropMessage.toComponent.onBeforeDrop(dropMessage); else {
			AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
			return;
		}
	}
	public static OnClick(ev:any, id:string) {
	}
	public static OnItemDblClick(id,ev,node) {
		var theComponent = $$(this["config"].id)["component"];
		var selectedObject = $$(theComponent.dataTableID).getItem(id.row);
		var itemMessage = new ItemSelectedEvent();
		itemMessage.objectArray = new Array<any>();
		itemMessage.objectArray.push(selectedObject);
		theComponent.onItemDblClick(itemMessage) ;
	}
	public static OnItemClick(id:any, ev:any, node:any) {
		var theComponent = $$(this["config"].id)["component"];
		var selectedObject = $$(theComponent.dataTableID).getItem(id.row);
		var itemMessage = new ItemSelectedEvent();
		itemMessage.objectArray = new Array<any>();
		itemMessage.objectArray.push(selectedObject);
		itemMessage.rowID = id.row;
		theComponent.onItemClick(itemMessage) ;
	}
	public static onSelectChange() {
		var theComponent = $$(this["config"].id)["component"];
		var rowid = $$(theComponent.dataTableID).getSelectedId(true);
		var selectedObject = $$(theComponent.dataTableID).getItem(rowid);
		theComponent.onSelectChange(rowid, selectedObject)
	}
	public static onAfterEditStop(state, editor, ignoreUpdate) {
		var theComponent = $$(this["config"].id)["component"];
		var theColumn    = new UIDataTableField();
		theColumn.columnName = editor.column;
		theColumn.oldValue   = state.old;
		theColumn.newValue   = state.value;
		theColumn.rowObject  = $$(theComponent.dataTableID).getItem(editor.row);
		theColumn.editor     = editor;
		theComponent.onStopEdit(theColumn);
	}
	public static onBeforeEditStartTable(id : any) {
		var theComponent = $$(this["config"].id)["component"];
		var row = id.row;
		var column = id.column;
		var rowItem = $$(this["config"].id).getItem(row);
		var theColumn    = new UIDataTableField();

		theColumn.columnName = column;
		theColumn.oldValue = null;
		theColumn.newValue = null;
		theColumn.rowObject = rowItem;
		theComponent.onBeforeEditStart(theColumn);

		if (rowItem["beforeEditStartReturn"]!=null) return rowItem["beforeEditStartReturn"];

		return !rowItem[column+"ReadOnly"];
	}
	public static OnChange(newv, oldv) {
		var theComponent = $$(this["config"].id)["component"];
		theComponent.onChange(newv, oldv);
	}
	public static MenuHandler(id, context) {
		var theID = this["config"].id;
		var theComponent = <UIContextMenu> $$(theID)["component"];
		var jumpItem = theComponent.getMenuItem(id);
		var theObject = theComponent.owningComponent.getSelectedObject();
		if (!jumpItem.callback) return;
		jumpItem.callback(id, theComponent, theObject);
	}
	public static OnAfterSelect(id:any) {
		var theID = this["config"].id;
		if (!$$(theID)) {
			return;
		}
		var theComponent = $$(theID)["component"];
		var theNode = $$(this["config"].id).getItem(id.row);
		if (!theNode) {
			UI.Message("Error Expected TO Find Node got Null with ID " + id);
			return;
		}
		var IdArray     = new Array<any>();
		var objectArray = new Array<any>();
		var rowArray    = new Array<any>();
		var newItemSelected = new ItemSelectedEvent();
		IdArray[0]          = id.row;
		if (theNode.originalObject)
			objectArray[0] = theNode.originalObject.clone(); else
			objectArray[0] = null;
		rowArray[0]                   = theNode;
		newItemSelected.idArray       = IdArray;
		newItemSelected.objectArray   = objectArray;
		newItemSelected.itemsSelected = objectArray.length;
		newItemSelected.rowArray      = rowArray;
		newItemSelected.theComponent  = theComponent;
		theComponent.onAfterSelect(newItemSelected);
	}
	public static HandleFieldEntry(state, editor, ignoreUpdate) {
		var theExplorer = $$(this["config"].id).explorer;
		var newText = state.value;
		var rowID   = editor.row;
		var theNode = $$(theExplorer.componentID).getItem(rowID);
		var theProxy = Factory.CreateProxyInstance(theNode.classType);
		theProxy.updateName(theNode._id, newText);
		UI.Message("Record Updated");
	}
	public static IsFieldEditable(id):boolean {
		var theID       = this["config"].id;
		var theExplorer = $$(theID)["explorer"];
		var rowItem     = $$(theExplorer.getComponentID()).getItem(id);
		if (rowItem.classType.indexOf("Root") == -1)
			return false;
		else
			return true;
	}
	public static ValidateFieldEntry(row, value:string) {
		var theID       = this["config"].id;
		var theExplorer = $$(theID).explorer;
		var rowItem = $$(theExplorer.getComponentID()).getItem(row.id);
		AppLog.info("info", "Before Edit Event");
		return true;
	}
	public static ProcessOnDestruct(theComponent:UIComponent) {
		UI.Debug("on Destruct Called");
		theComponent.onDestruct();
	}
	public static ProcessTabChanged() {
	}
	public static OnDropEvent(Source, target, event) {
		// UI.Info("Drop Event");
		console.log("On Drop Event");
	}

} this.UIEventHandler = UIEventHandler;

enum Sounds { Popup, ShapeDrop, ShapeDragIn, ShapeDragOut, Blop, OpenDiagram, SaveDiagram, CloseDiagram, ShapeOnShapeDrop, DrawLink, Error }this.Sounds = Sounds;

class UI extends C4Object {
	public static PlaySound(sound:Sounds = Sounds.Blop) {
		var s;
		switch (sound) {
			case Sounds.Popup:
				s = new buzz.sound("/sounds/ClickOff.mp3");
				break;
			case Sounds.CloseDiagram:
				s = new buzz.sound("/sounds/Door Close.mp3");
				break;
			case Sounds.ShapeDrop:
			case Sounds.OpenDiagram:
				s = new buzz.sound("/sounds/Blop.mp3");
				break;
			case Sounds.Blop:
				s = new buzz.sound("/sounds/Blop.mp3");
				break;
			case Sounds.Error:
				s = new buzz.sound("/sounds/Error1.mp3");
				break;
			case Sounds.ShapeOnShapeDrop:
				s = new buzz.sound("/sounds/MetalClick1.mp3");
				break;
			case Sounds.SaveDiagram:
				s = new buzz.sound("/sounds/Drop Fork.mp3");
				break;
			case Sounds.DrawLink:
				s = new buzz.sound("/sounds/PopCork.mp3");
				break;
			case Sounds.ShapeDragIn:
			case Sounds.ShapeDragOut :
				s = new buzz.sound("/sounds/Click.mp3");
				break;
		}
		s.play();
	}
	public static Debug(text:string) {
		if (true)
			UI.Message(text)
	}
	public static Message(text:string) {
		UI.Info(text);
	}
	public static Info(text:string) {
		toastr.options = {
			"closeButton"      : false,
			"debug"            : false,
			"newestOnTop"      : false,
			"progressBar"      : true,
			"positionClass"    : "toast-top-right",
			"preventDuplicates": false,
			"onclick"          : null,
			"showDuration"     : "300",
			"hideDuration"     : "1000",
			"timeOut"          : "5000",
			"extendedTimeOut"  : "1000",
			"showEasing"       : "swing",
			"hideEasing"       : "linear",
			"showMethod"       : "fadeIn",
			"hideMethod"       : "fadeOut"
		}
		toastr["info"](text)
	}
	public static Warning(text:string) {
		toastr.options = {
			"closeButton"      : false,
			"debug"            : false,
			"newestOnTop"      : false,
			"progressBar"      : true,
			"positionClass"    : "toast-top-right",
			"preventDuplicates": false,
			"onclick"          : null,
			"showDuration"     : "300",
			"hideDuration"     : "1000",
			"timeOut"          : "5000",
			"extendedTimeOut"  : "1000",
			"showEasing"       : "swing",
			"hideEasing"       : "linear",
			"showMethod"       : "fadeIn",
			"hideMethod"       : "fadeOut"
		}
		UI.PlaySound(Sounds.Error);
		toastr["warning"](text)
	}
	public static Success(text:string) {
		toastr.options = {
			"closeButton"      : false,
			"debug"            : false,
			"newestOnTop"      : false,
			"progressBar"      : true,
			"positionClass"    : "toast-top-right",
			"preventDuplicates": false,
			"onclick"          : null,
			"showDuration"     : "300",
			"hideDuration"     : "1000",
			"timeOut"          : "5000",
			"extendedTimeOut"  : "1000",
			"showEasing"       : "swing",
			"hideEasing"       : "linear",
			"showMethod"       : "fadeIn",
			"hideMethod"       : "fadeOut"
		}
		toastr["success"](text)
	}
	public static Error(text:string) {
		toastr.options = {
			"closeButton"      : false,
			"debug"            : false,
			"newestOnTop"      : false,
			"progressBar"      : true,
			"positionClass"    : "toast-top-right",
			"preventDuplicates": false,
			"onclick"          : null,
			"showDuration"     : "300",
			"hideDuration"     : "1000",
			"timeOut"          : "5000",
			"extendedTimeOut"  : "1000",
			"showEasing"       : "swing",
			"hideEasing"       : "linear",
			"showMethod"       : "fadeIn",
			"hideMethod"       : "fadeOut"
		}
		UI.PlaySound(Sounds.Error);
		toastr["error"](text)
	}
	public static ExportToExcel(componentID:string) {
		$$(componentID).exportToExcel();
	}
	public static Alert(string) {webix.alert(string);}

	constructor() {
	    super();
    }

}this.UI = UI;

class UIComponent extends UI {

	protected overlayMixin:boolean          = false;
	protected componentValue:string;
	protected componentID:string;
	protected componentLabel:string;
	protected componentView:any;
	protected componentChangeCallback:any;
	protected owningComponent:UIComponent;
	protected order:number                  = 0;
	protected eventsDefined:boolean         = false;
	protected trackingObjectChanges:boolean = false;
	private    _uiClassType:ClassType;
	protected idPrefix                      = "UIComponent_";
	private     theObject:any;
	public      theTest                     = new C4Object();
	protected componentData:any;
	private relationshipObject;
	private _userData:any;
	protected properties                    = new Array<any>();

	get userData():any {
		return this._userData;
	}
	set userData(value:any) {
		this._userData = value;
	}
	get uiClassType():ClassType {
		return this._uiClassType;
	}
	set uiClassType(value:ClassType) {
		this._uiClassType = value;
	}

	public showOverlay() {
		if (!this.overlayMixin)
			webix.extend($$(this.componentID), webix.OverlayBox);
		$$(this.componentID).showOverlay();
		this.overlayMixin = true;
	}
	public hideOverlay() {
		$$(this.componentID).hideOverlay();
	}

	public static TreeIcon(obj:any) {
		if (obj.$level > 1001)
			return "<span class='webix_icon fa-folder-open'></span>";
		if (obj.$level < 1000) {
			return Factory.GetClassIcon(obj._classType);
		}
		return "<span class='webix_icon fa-film'></span>";
	}

	constructor(properties:any = null) {
		super();
		this.componentID = this.idPrefix + webix.uid();
		this.addProperties(properties);
	}

	public attachEvent(id:string, event, callback) {
		if ($$(id)) {
			$$(id).attachEvent(event, callback);
		}
	}
	public setRelationshipObject(theObject:any) {
		this.relationshipObject = theObject;
	}
	public getRelationshipObject():any {
		return this.relationshipObject;
	}
	public blankValue() {}
	public createView(viewOptions:any):any {
		this.setProperty("drag", true);
		this.mergePropertySet(viewOptions);
		return viewOptions;
	}
	public setID(prefix:string) {
		this.idPrefix    = prefix;
		this.componentID = this.idPrefix + webix.uid();
	}
	public setCallback(callback:any) {
		this.componentChangeCallback = callback;
	}
	public getCallback() {
		return this.componentChangeCallback;
	}
	public isValid():boolean {
		if ($$(this.componentID)) {
			return $$(this.componentID).validate();
		}
		return false;
	}
	public setData(theData:any) {
		this.componentData = theData;
	}
	public getData():any {
		return this.componentData;
	}
	public setLabel(theLabel) {
		this.componentLabel = theLabel;
	}
	public getLabel() {
		return this.componentLabel;
	}
	public setValue(theValue:any) {
		this.componentValue = theValue;
		if ($$(this.componentID)) {
			webix.ui(this.getValue, $$(this.componentID));
			this.initialize();
		}
	}
	public setOwningComponent(component:UIComponent) {
		this.owningComponent = component;
	}
	public getOwningComponent():UIComponent {
		return this.owningComponent;
	}
	public getComponentID():string {
		return this.componentID;
	}
	public setComponentID(id:string) {
		this.componentID = id;
	}
	public getValue():any {
		return this.componentValue;
	}
	public getComponentView():any {
		return this.componentView;
	}
	public setComponentView(theView:any) {
		this.componentView = theView;
	}
	public getSelectedObject():any {
		return null;
	}
	public onBeforeDrop(message:DropMessage) {
		webix.alert("Sorry Dropping Here Not Allowed Yet");
		return false;
	}
	public onBeforeDragIn(message:DropMessage) {
		return false;
	}
	public onAfterDrop(message:DropMessage):any {
		return false;
	}
	public onDragOut(message:DropMessage):any {
		return false;
	}
	public validateDrop(message:DropMessage):any {
		return false;
	}
	public onSelectChange(itemMessage:ItemSelectedEvent) {
		this.publish("onSelectChange", itemMessage);
		return;
	}
	public onItemDblClick(itemMessage : ItemSelectedEvent) {
		this.publish("onItemDblClick",itemMessage);
	}
	public onItemClick(itemMessage : ItemSelectedEvent) {
		this.publish("onItemClick",itemMessage);
	}
	public getObject():any {
		return this.theObject;
	}
	public setObject(theObject:any) {
		this.theObject = theObject;
	}
	public setDraggable(flag:boolean = true) {
		var htmlView = $$(this.getComponentID()).$view;
		webix.DragControl.addDrop($$(this.getComponentID()), UIEventHandler.OnDropEvent);
	}
	public setProperty(name, value) {
		switch (name) {
			case "label" :
			{
				this.setLabel(value);
				this.properties[name] = value;
			}
				break;
			case "value" :
			{
				this.setValue(value);
				this.properties[name] = value;
			}
				break;
			case "data" :
				this.setData(value);
				break;
			case "callback" :
			{
				this.setCallback(value)
			}
				break;
			default :
				this.properties[name] = value;
		}
	}
	public addProperties(propertySet:any) {
		for (var item in propertySet) {
			this.setProperty(item, propertySet[item]);
		}
	}
	public getProperty(name):any {
		return this.properties[name];
	}
	public mergePropertySet(view:any) {
		var index = 0;
		for (var item in this.properties) {
			view[item] = this.properties[item];
			index++;
		}
		return view;
	}
	public getPropertySet():any {
		var index   = 0;
		var results = {};
		for (var item in this.properties) {
			results[item] = this.properties[item];
			index++;
		}
		return results;
	}

	//region UIComponent Methods
	public getView():any {
		return null;
	}
	public refresh() {}
	public defineEvents() {
		this.eventsDefined = true;
		return;
	}
	public initialize() {
		if ($$(this.componentID)) {
			$$(this.componentID)["component"] = this;
			$$(this.componentID).drag         = true;
		}
	}
	public destroyView() {
		if ($$(this.componentID)) $$(this.componentID).destructor();
	}
	public destroyObject() {
	}
	public onDestruct() {
		this.destroyObject();
	}
	public destructor() {
	}

	//endregion
} this.UIComponent = UIComponent;

class UIContextMenu extends UIComponent {
	public jumpItemArray:Array<UIJumpItem>;
	public owningComponent:UIComponent;

	constructor(properties = null) {
		super(properties);
		this.jumpItemArray = new Array<UIJumpItem>();
		this.setID("uiContextMenu_");
	}

	public addItem(label, callback) {
		var newItem      = new UIJumpItem();
		newItem.id       = "menuItem_" + webix.uid();
		newItem.label    = label;
		newItem.callback = callback;
		this.jumpItemArray[newItem.id] = newItem;
	}
	public addSeperator() {
		var newItem      = new UIJumpItem();
		newItem.id       = "jumpItem_" + webix.uid();
		newItem.label    = "";
		newItem.callback = null;
		this.jumpItemArray[newItem.id] = newItem;
	}
	public getMenuItem(label:string):UIJumpItem {
		for (var item in this.jumpItemArray) {
			if (this.jumpItemArray[item].label == label)
				return this.jumpItemArray[item];
		}
	}

	//region UIComponent Methods
	public getView():any {
		var menuArray = new Array<any>();
		for (var item in this.jumpItemArray) {
			var menuItem = this.jumpItemArray[item];
			if (menuItem.label == "") {
				menuArray.push({$template: "Separator"});
			} else {
				menuArray.push(menuItem.label);
			}
		}
		this.componentView = this.createView({
			view: "contextmenu", id: this.getComponentID(), data: menuArray
		});
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
		this.componentView = this.getView();
		if (!$$(this.componentID))
			webix.ui(this.componentView).attachTo($$(this.getOwningComponent().getComponentID()));
		$$(this.getComponentID())["component"] = this;
	}
	public defineEvents() {
		this.attachEvent(this.getComponentID(), "click", UIEventHandler.MenuHandler);
	}

	//endregion
} this.UIContextMenu = UIContextMenu;

enum FieldFormat { GENERAL, CURRENCY, NUMBER, PERCENT }this.FieldFormat = FieldFormat;

class UIField extends UIComponent {

	private listType:string;
	private relationshipPointer:boolean = false;
	protected updateField:string;
	public maxLength:number;
	public fieldFormat:FieldFormat      = FieldFormat.GENERAL;
	public formatView:any;
	public fieldValue:any;

	constructor(properties = null) {
		super(properties);
		this.setID("uifield_");
		this.addEventPublication("fieldChanged");
	}

	public fieldChanged(newValue:any, oldValue) {
		var theParent = this.getData();
		if (this.getCallback()) {
			var callback = this.getCallback();
			return callback(this, theParent, newValue, oldValue);
		}
		this.valueChanged(theParent, newValue, oldValue);
		this.publish("fieldChanged", {newValue: newValue, oldValue: oldValue})
	}
	public setClassType(classType:ClassType) {
		this.listType = <string> classType;
	}
	public getClassType():string {
		return this.listType;
	}
	public setUpdateField(theFieldName:string) {
		this.updateField = theFieldName;
	}
	public getUpdateField():string {
		return this.updateField;
	}
	public setFieldFormat(theFormat:FieldFormat) {
		this.fieldFormat = theFormat;
		switch (theFormat) {
			case FieldFormat.CURRENCY :
			{
				this.formatView = webix.Number.numToStr({
					groupDelimiter: ",", groupeSize: 3, decimalDelimiter: ".", decimalSize: 0
				});
			}
				break;
			case FieldFormat.PERCENT :
			{

			}
				break;

			case FieldFormat.GENERAL :
			{
			}
				break;
			case FieldFormat.NUMBER :
			{
			}
				break;
			default :
		}
	}
	public setValue(value:any) {
		if ($$(this.componentID)) {
			$$(this.componentID).blockEvent();
			$$(this.componentID).setValue(value);
			$$(this.componentID).unblockEvent();
		}
		this.fieldValue = value;
	}
	public defineEvents() {
		this.attachEvent(this.componentID, "onChange", UIEventHandler.FieldChanged);
	}
	public getValue():any {
		return this.fieldValue;
	}
	public blankValue() {
		if ($$(this.componentID)) {
			$$(this.componentID).setValue("");
		}
		this.fieldValue = "";
	}
	public valueChanged(parentComponent:UIComponent, newValue:any, oldValue:any) {
		if (!this.isValid())
			return;
		if (!this.updateField) return;
		var theObject = Factory.CreateProxyInstance(parentComponent.getObject().classType);
		theObject.updateAttribute(parentComponent.getObject()._id, this.updateField, newValue);
		UI.Message("Record Updated");
	}

} this.UIField = UIField;

class UICounterField extends UIField {
	constructor(properties = null) {
		super(properties);
		this.setID("UICounterField_");
	}

	public fieldChanged(newv, oldv) {
		this.publish("fieldChanged", {newValue: newv, oldValue: oldv});
	}
	public getView():any {
		this.componentView = this.createView({
			id: this.componentID, view: "counter"
		});
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
	}

}this.UICounterField = UICounterField;

class UILabel extends UIComponent {

	public alignment:string = "center";
	public labelWidth:number;

	constructor(properties = null) {
		super(properties);
		this.setID("UILabel_");
	}
	public setComponent(label:string, alignment = "center", labelWidth = 100) {
		this.addProperties({label: label, alignment: alignment, labelWidth: labelWidth});
	}
	public getView():any {
		this.componentView = this.createView({
			id: this.componentID, view: "label"
		});
		return this.componentView;
	}

} this.UILabel = UILabel;

class UIDateField extends UIField {

	constructor(properties = null) {
		super(properties);
		this.setID("uiDateField_");
	}

	public getView():any {
		this.componentView = this.createView({
			id        : this.componentID,
			view      : "datepicker",
			name      : this.componentLabel,
			value     : this.getValue(),
			label     : this.componentLabel,
			labelWidth: 100,
			timepicker: false
		});
		if (this.formatView) {
			this.componentView["format"] = this.formatView;
		}
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
	public definEvents() {

	}

} this.UIDateField = UIDateField;

class UISliderField extends UIField {
	constructor(properties = null) {
		super(properties);
		this.setID("UISliderField");
	}

	public setComponent(label:string, value:any, data:any, callback:any, updateField = null, minValue:number = 0, maxValue:number = 1, step:number = .1) {
		this.setLabel(label);
		this.setValue(value);
		this.setData(data);
		this.setCallback(callback);
		this.updateField = updateField;
		this.setProperty("min", minValue);
		this.setProperty("max", maxValue);
		this.setProperty("step", step);
	}
	public getView():any {
		this.componentView = this.createView({
			id   : this.componentID,
			name : this.getLabel(),
			view : "slider",
			label: this.getLabel(),
			value: this.getValue(),
			title: function (obj) {
				return webix.i18n.numberFormat(obj.value * 100) + "%";
			}
		});
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
	public defineEvents() {}

} this.UISliderField = UISliderField;

class UITextField extends UIField {

	public textArea = false;

	constructor(properties:any = null) {
		super(properties);
		this.setID("uiTextField_");
		this.textArea = false;
	}

	public setTextArea(textArea:boolean) {
		this.textArea = textArea;
	}
	public setComponent(label:string, value:any, data:any = null, callback:any = null, updateField = null, textArea = false) {
		this.setLabel(label);
		this.setValue(value);
		this.setData(data);
		this.setCallback(callback);
		this.textArea    = textArea;
		this.updateField = updateField;
	}
	public getView():any {
		if (this.textArea)
			var viewType = "textarea"; else
			viewType = "text";
		this.componentView = this.createView({
			id        : this.componentID,
			view      : viewType,
			name      : this.componentLabel,
			value     : this.getValue(),
			label     : this.componentLabel,
			labelWidth: 100
		});
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
	public defineEvents() {}

} this.UITextField = UITextField;

class UINoteField extends UITextField {

	constructor(properties:any = null) {
		super(properties);
		this.setID("UINoteField_");
		this.textArea = true;
	}

}this.UINoteField = UINoteField;

class UISelectList extends UIField {

	public selectionList:Array<any>;

	constructor(properties:any = null) {
		super(properties);
		this.setID("uiSelectList_");
	}

	public setValue(value : any) {
		super.setValue(value);
		if ($$(this.componentID)) {
			$$(this.componentID).setValue(value);
		}
	}
	public setSelectList(label, value, theList, data, callback, updateField) {
		this.setLabel(label);
		this.setValue(value);
		this.setList(theList);
		this.setData(data);
		this.setCallback(callback)
		this.setUpdateField(updateField);
	}
	public getView():any {
		this.componentView = this.createView({
			id        : this.componentID,
			view      : "select",
			name      : this.componentLabel,
			options   : this.selectionList,
			value     : this.getValue(),
			label     : this.componentLabel,
			labelWidth: 100,
			validate  : webix.rules.isNotEmpty
		});
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
	}
	public setList(theList:Array<any>) {
		this.selectionList = theList;
		for (var item in theList) {
			if (theList[item].name == "")
				return;
		}
		this.selectionList.push({id: "", name: ""});

		if ($$(this.componentID)) {
			$$(this.componentID).define("options", this.selectionList);
			$$(this.componentID).refresh();
		}
	}

} this.UISelectList = UISelectList;

class UICheckbox extends UIField {

	constructor(properties = null) {
		super(properties);
	}

	public setComponent(label:string, value:any = 0, data:any = null, callback:any = null) {
		this.setLabel(label);
		this.setValue(value);
		this.setData(data);
		this.setCallback(callback);
	}
	public getView():any {
		this.componentView = this.createView({
			id: this.getComponentID(),
			view: "checkbox",
			label: this.getLabel(),
			value: this.getValue(),
		});
		return this.componentView;
	}
	public onChange(newv, oldv) {
		this.publish("onChange", {newValue: newv, oldValue: oldv});
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
	public defineEvents() {
	}

} this.UICheckbox = UICheckbox;

class UIJumpItem {

	public id:string;
	public label:string;
	public callback:any;
	public event:any;
	public type:string;

}
class UIJumpBar extends UIComponent {

	public jumpItemArray:Array<UIJumpItem>;

	constructor(properties = null) {
		super(properties);
		this.setID("UIJumpBar_");
		this.jumpItemArray = new Array<UIJumpItem>();
	}

	public static JumpCallback(id:string, event:any) {
		var theComponent = $$(id)["component"];
		var callback = null;
		theComponent.publish(theComponent.jumpItemArray[id].event)
		//    theComponent.jumpItemArray[id].callback(theComponent, theComponent.jumpItemArray[id].label);
	}

	public getView():any {
		var barView = new Array<any>();
		for (var item in this.jumpItemArray) {
			var newItemView = {
				view : "button",
				id   : this.jumpItemArray[item].id,
				type : "htmlbutton",
				css  : "bt_1",
				label: this.jumpItemArray[item].label,
				value: this.jumpItemArray[item].label
			}
			barView.push(newItemView);
		}
		var newView = this.createView({
			id: this.componentID, cols: barView
		});
		return newView;
	}
	public addItem(label:string, event:string, type = "danger", callback = null) {
		var newItem      = new UIJumpItem();
		newItem.id       = "jumpButton_" + webix.uid();
		newItem.label    = label;
		newItem.callback = callback;
		newItem.event    = event;
		newItem.type     = type;
		this.jumpItemArray[newItem.id] = newItem;
	}
	public defineEvents() {
		for (var item in this.jumpItemArray) {
			if ($$(this.jumpItemArray[item].id))
				if (!$$(this.jumpItemArray[item].id).hasEvent("onItemClick"))
					this.attachEvent(this.jumpItemArray[item].id, "onItemClick", UIJumpBar.JumpCallback);
		}
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
		for (var item in this.jumpItemArray) {
			if ($$(item)) {
				$$(item)["component"] = this;
				$$(item)["data"]      = this.getData();
			}
		}
	}

} this.UIJumpBar = UIJumpBar;

class UIToolbar extends UIJumpBar {

	public label:string;
	public icon:string;

	constructor(properties = null) {
		super(properties);
	}

	public setToolBar(label, icon) {
		this.label = label;
		this.icon  = icon;
	}
	public getView():any {
		var barView = new Array<any>();
		var theBar  = {view: "label", label: this.icon + " " + this.label};
		barView.push(theBar);
		for (var item in this.jumpItemArray) {
			var newItemView = {
				view : "button",
				id   : this.jumpItemArray[item].id,
				type : this.jumpItemArray[item].type,
				value: this.jumpItemArray[item].label
			}
			barView.push(newItemView);
		}
		var newView = this.createView({
			id      : this.componentID,
			view    : "toolbar",
			css     : "highlighted_header header3",
			paddingX: 5,
			paddingY: 5,
			height  : 40,
			cols    : barView
		});
		return newView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
	}

} this.UIToolbar = UIToolbar;

class UIButton extends UIComponent {

	public color:string;
	public event:string;

	constructor(properties = null) {
		super(properties);
		this.setID("UIButton_");
	}

	public onButtonClick(theComponent:any) {
		this.publish("click", this);
	}
	public setComponent(label:string, value?:any, data?:any, callback?:any) {
		this.setLabel(label);
		this.setValue(value);
		this.setData(data);
		this.setCallback(callback);
		this.color = "background-color : #FF9E9E";
	}
	public getView():any {
		this.componentView = this.createView({
			id       : this.componentID,
			view     : "button",
			name     : this.componentLabel,
			value    : this.componentLabel,
			cssFormat: this.color,
		});
		return this.componentView;
	}
	public setLabel(theLabel:string) {
		super.setLabel(theLabel);
		if ($$(this.getComponentID())) {
			$$(this.getComponentID()).value = theLabel;
			$$(this.getComponentID()).refresh();
		}
	}
	public setColor(value:string) {
		if ($$(this.getComponentID())) {
			$$(this.getComponentID()).$view.getElementsByTagName("button")[0].style.background  = value;
			$$(this.getComponentID()).$view.getElementsByTagName("button")[0].style.borderColor = value;
		}
	}
	public defineEvents() {
		this.attachEvent(this.componentID, "onItemClick", UIEventHandler.OnButtonClick);
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}

} this.UIButton = UIButton;

class UIDropZone extends UIComponent {

	constructor() {
		super();
		this.setID("UIDropZone_");
	}

	public setComponent(label:string, value:any, data:any, callback:any, updateField = null) {
		this.setLabel(label);
		this.setValue(value);
		this.setData(data);
		this.setCallback(callback);
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
		this.setInTheZone(false);
	}
	public setInTheZone(inZone:boolean) {
		if (inZone)
			$$(this.getComponentID()).define("css", "inTheDropZone"); else
			$$(this.getComponentID()).define("css", "outOfTheDropZone");
	}
	public getView():any {
		this.componentView = {
			id       : this.getComponentID(),
			view     : "list",
			minWidth : 100,
			minHeight: 100,
			template : "#title#",
			data     : [{title: "Drop Zone"}],
			drag     : "target"
		}
		return this.componentView;
	}
	public onBeforeDrop(message:DropMessage):boolean {
		this.setInTheZone(false);
		return false;
	}
	public onBeforeDragIn(message:DropMessage):boolean {
		this.setInTheZone(true);
		return true;
	}
	public onDragOut(message:DropMessage):boolean {
		this.setInTheZone(false);
		return true;
	}
	public defineEvents() {
		this.attachEvent(this.componentID, "onBeforeDrop", UIEventHandler.OnBeforeDrop);
	}

} this.UIDropZone = UIDropZone;

interface onEditCallback {
	(object:any) : any;
}

class UIColorField extends UIField {
	constructor(properties:any) {
		super(properties);
		this.setID("UIColorField_");
		this.addProperties(properties);
	}

	public getView():any {
		this.componentView = this.createView({
			id: this.componentID, view: "colorpicker"
		});
		return this.componentView;
	}
	public defineEvents() {
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
}this.UIColorField = UIColorField;

class UIDataTableField extends UIComponent {
	//region Instance Variables
	public columnNumber:number;
	public columnName:string;
	public oldValue:any;
	public newValue:any;
	public editor:any;
	public rowObject:any;
	public isReference:boolean       = false;
	public referenceClassType:string = "";
	public referenceField:any;
	public referenceObject:any;
	public displayFieldName;
	public view:any;
	public optionList:Array<any>;
	public mapped:boolean            = false;
	public template:any;
	public referenceClassField:any
	//endregion
	constructor() {
		super();
		this.setID("UIDataTableField_");
		this.componentID = "dataTableField_" + webix.uid();
	}
} this.UIDataTableField = UIDataTableField;

class UIDataTable extends UIComponent {
	get template():any {
		return this._template;
	}

	set template(value:any) {
		this._template = value;
	}
	get showToolBar():boolean {
		return this._showToolBar;
	}
	set showToolBar(value:boolean) {
		this._showToolBar = value;
	}

	public static MappedColumnLookup(obj) {
	}
	public viewType = "datatable";

	protected theList               : Array<any>  = null;
	protected columns               : Array<UIDataTableField>;
	protected rowSelectCallback     : any;
	protected editable              : boolean    = false;
	protected editaction            : string   = "dblclick";
	protected toolBar               : UIToolbar;
	protected dataTableID           : string;
	private _showToolBar            : boolean  = false;
	private _multiSelect            : boolean  = false;
	private _autoColumnConfigure  = false;
	private _showAddDeleteColumns = true;
	private _width                = 0;
	private _height               = 0;
	private _template : any = null;

	get multiSelect():boolean {
		return this._multiSelect;
	}
	set multiSelect(value:boolean) {
		this._multiSelect = value;
	}
	get autoColumnConfigure():boolean {
		return this._autoColumnConfigure;
	}
	set autoColumnConfigure(value:boolean) {
		this._autoColumnConfigure = value;
	}
	get showAddDeleteColumns():boolean {
		return this._showAddDeleteColumns;
	}
	set showAddDeleteColumns(value:boolean) {
		this._showAddDeleteColumns = value;
	}
	get height():number {
		return this._height;
	}
	set height(value:number) {
		this._height = value;
	}
	get width():number {
		return this._width;
	}
	set width(value:number) {
		this._width = value;
	}



	constructor(properties = null) {
		super(properties);
		this.setID("UIDataTable_");
		this.columns              = new Array<UIDataTableField>();
		this.dataTableID          = "dataTable_" + webix.uid();
		this.showAddDeleteColumns = false;
	}


	public hideColumn( columnID : any) {

		if ($$(this.dataTableID)) $$(this.dataTableID).hideColumn(columnID);
	}
	public showColumn( columnID : any) {

		if ($$(this.dataTableID)) $$(this.dataTableID).showColumn(columnID);
	}



	public newItem() {
		var theComponent = this;
		var objectProxy  = Factory.CreateProxyInstance(theComponent.uiClassType);
		var name         = "A New " + objectProxy.classLabel();
		var newID        = objectProxy.addNew(name);
		var newObject    = objectProxy.getOne(newID);
		var newRowID     = $$(theComponent.dataTableID).add(newObject);
		$$(theComponent.dataTableID).showItem(newRowID);
		$$(theComponent.dataTableID).select(newRowID, false);
	}
	public deleteItem(theToolbar:UIToolbar, label:string) {
		var theComponent = this;
		var rowid        = $$(theComponent.dataTableID).getSelectedId();
		if (!rowid) return;
		var theObject = $$(theComponent.dataTableID).getItem(rowid);
		theComponent.handleDelete(theObject);
	}
	public options() {
		var theComponent = this;
		var rowid        = $$(theComponent.dataTableID).getSelectedId();
		if (!rowid) return;
		var theObject = $$(theComponent.dataTableID).getItem(rowid);
		theComponent.handleDelete(theObject);
	}

	public getSelectedObject() : any {
		return this.getSelected()[0];
	}
	public getSelected():Array<any> {
		if ($$(this.dataTableID)) {
			var idArray = $$(this.dataTableID).getSelectedItem(true);
			return idArray;
		}
		return null;
	}
	public onSelectChange(itemMessage:ItemSelectedEvent) {
		this.publish("onSelectChange", itemMessage);
	}
	public addColumn(columnNumber:number, theColumn:any) {
		var newColumn = new UIDataTableField();
		newColumn.view             = theColumn;
		newColumn.columnNumber     = columnNumber;
		this.columns[columnNumber] = newColumn;
	}
	public addMappedColumn(columnNumber:number, referenceClassField:string, referenceFieldName, displayFieldName, theColumnView:any) {
		var newColumn                 = new UIDataTableField();
		newColumn.mapped              = true;
		newColumn.referenceClassField = referenceClassField
		newColumn.referenceField      = referenceFieldName;
		newColumn.displayFieldName    = displayFieldName;
		newColumn.view              = theColumnView;
		var functionMame            = "mapFunction" + webix.uid();
		var mappedFunction          = new Function('obj', '{' + 'var objectProxy = Factory.CreateProxyInstance(obj["' + referenceClassField + '"]");' + 'var thisObject = objectProxy.getOne(obj["' + referenceFieldName + '"]);' + 'if (!thisObject) return "Not Found";' + 'return thisObject["' + displayFieldName + '"];' + '}');
		newColumn.template          = mappedFunction;
		newColumn.view              = theColumnView;
		newColumn.view["_template"] = newColumn.template;
		this.columns[columnNumber]  = newColumn;
	}
    public addReferenceColumn(columnNumber:number, referenceClassType:string, referenceFieldName, theColumnView:any) {
		var newColumn                = new UIDataTableField();
		newColumn.referenceClassType = referenceClassType;
		newColumn.view               = theColumnView;
		var objectProxy        = Factory.CreateProxyInstance(referenceClassType);
		var optionList         = objectProxy.getList(false);
		newColumn.optionList   = optionList;
		newColumn.columnNumber = columnNumber;
		var optionArray        = new Array<any>();
		for (var item in optionList) {
			var option                 = new C4Object();
			option["id"]               = optionList[item]["id"];
			option[referenceFieldName] = optionList[item][referenceFieldName];
			optionArray.push(option);
		}
		newColumn.view["options"] = optionList;
		//newColumn.view["on"] = { onChange : function() { UI.Message("Select Changed");}}
		this.columns[columnNumber] = newColumn;
	}
	public addOptionColumn(columnNumber:number, optionList, theColumn) {
	}
	public setList(theList) {
		this.theList = theList;
		if ($$(this.dataTableID)) {
			$$(this.dataTableID).clearAll();
			$$(this.dataTableID).parse(this.theList);
		}
	}
	public setValue(theList:any) {
		this.setList(theList);
	}
	public setEditable(theFlag:boolean) {
		this.editable = theFlag;
	}
	public onStopEdit(theField:UIDataTableField) {
		if (this.publish("onStopEdit", theField))
			return;
		if (theField.newValue == theField.oldValue)
			return;
		if (this.uiClassType) {
			var objectProxy = Factory.CreateProxyInstance(this.uiClassType);
			objectProxy.updateAttribute(theField.rowObject._id, theField.columnName, theField.newValue);
		}
	}

	public refreshRow(rowID : any) {
		if ($$(this.dataTableID))
			$$(this.dataTableID).refresh(rowID);
	}
	public onBeforeEditStart(theField : UIDataTableField) {
		if (this.publish("onBeforeEditStart", theField))
			return;
	}
	public handleDelete(theObject:any) {
		UI.Message("Handle Delete" + theObject._id)
	}
	public createNavigationBar() {
		this.toolBar = new UIToolbar();
		this.toolBar.addItem("New", "newItem")
		this.toolBar.addItem("Delete", "deleteItem")
		this.toolBar.addItem("Options", "options")
		this.toolBar.addItem("Export", "export");
		this.toolBar.setData(this);
		if (this.uiClassType) {
			this.toolBar.setToolBar(Factory.GetClassLabel(this.uiClassType), Factory.GetClassIcon(this.uiClassType))
		}
	}
	public listen(event, object, publisher) {
		switch (event) {
			case "newItem" :
			case "deleteItem" :
			case "options" :
				break;
			case "export":
				this.exportToExcel();
		}
	}
	public exportToExcel() {
		UI.ExportToExcel(this.dataTableID);
	}
	public getList():Array<any> {
		if (this.theList)
			return this.theList;
		if (this.uiClassType) {
			var objectProxy = Factory.CreateProxyInstance(this.uiClassType);
			var returnList  = objectProxy.getList(true);
			return returnList;
		}
		return new Array<any>();
	}
	public createColumnView():any {
		var columnView = new Array<any>();
		var i          = 0;
		for (var item in this.columns) {
			columnView[this.columns[item].columnNumber] = this.columns[item].view;
			i++;
		}
		if (this.showAddDeleteColumns) {
			columnView[i++] = {
				id: "", template: {
					view      : "button",
					type      : "htmlbutton",
					label     : '<span class="webix_icon fa-angle-left"></span><span class="text">back</span>',
					inputWidth: 80
				}
			}
			columnView[i++] = {id: "drag", header: "", template: "<div class='webix_drag_handle'></div>", width: 35}
		}
		return columnView;
	}
	public setColumns(columns : Array<any>) {
		var index = 0;
		for (var item in columns) {
			var newColumn = new UIDataTableField();
			newColumn.view             = columns[item];
			newColumn.columnNumber     = index++;
			this.columns[index] = newColumn;
		}
		if ($$(this.dataTableID)) {
			this.replaceColumns(columns);
		}
	}
	public replaceColumns(columns : Array<any>) {
		this.columns = new Array<UIDataTableField>();
		var index=0;
		for (var item in columns) {
			this.addColumn(index++,columns[item]);
		}
		$$(this.dataTableID).config.columns = this.createColumnView();;
		$$(this.dataTableID).refreshColumns();
	}
	public sort(property : string, sortDirection:string, type:string="string") {
		if ($$(this.dataTableID))
				$$(this.dataTableID).sort(property,sortDirection,type);

	}

	public filter( func : any) {
		$$(this.dataTableID).filter(func);
	}

	public getView():any {
		this.createNavigationBar();
		var rows = new Array<any>();
		var i    = 0;
		if (this._showToolBar) {
			var navBarView = this.toolBar.getView();
			rows[0]        = navBarView;
			i++
		}
		var view =  {
			id          : this.dataTableID,
			view        : this.viewType,
			select      : "row",
			navigation  : true,
			resizeColumn: true,
			scrollxy    : true,
			dragColumn  : true,
			editable    : this.editable,
			editaction  : this.editaction,
		};

		if (this.height > 0) {
			view["height"] = this.height;
		}
		if (this.width > 0) {
			view["width"] = this.width;

		}
		if (this.autoColumnConfigure) {
			view["autoConfig"] = true;
		} else
			view["columns"] = this.createColumnView();
		if (this.multiSelect)
			view["multiselect"] = true;
		if (this.template) {
			view["_template"] = this.template;
		}
		this.componentView = this.createView({
			id: this.componentID, type: "space", rows: [ view ]
		});

		return this.componentView;
	}
	public defineEvents() {
		this.attachEvent(this.dataTableID, "onSelectChange", UIEventHandler.onSelectChange);
		this.attachEvent(this.dataTableID, "onAfterEditStop", UIEventHandler.onAfterEditStop);
		this.attachEvent(this.dataTableID, "onItemDblClick", UIEventHandler.OnItemDblClick);
		this.attachEvent(this.dataTableID, "onBeforeEditStart", UIEventHandler.onBeforeEditStartTable);
		this.attachEvent(this.dataTableID, "onItemClick", UIEventHandler.OnItemClick);
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		var resultList = this.getList();
		if (resultList)
			if ($$(this.dataTableID)) $$(this.dataTableID).parse(resultList);
		if ($$(this.dataTableID))
			$$(this.dataTableID)["component"] = this;
		if (this._showToolBar)	this.toolBar.initialize();
		this.defineEvents();
	}

	public getTableList() : Array<any> {
		var datatable = $$(this.dataTableID)
		var dataList = new Array<any>();
		$$(this.dataTableID).eachRow(
			function (row){
				var item = datatable.getItem(row);
				dataList.push(item);
			}
		)
		return dataList;
	}

} this.UIDataTable = UIDataTable;

class UITreeTable extends UIDataTable {

	constructor(properties = null) {
		super(properties);
		this.setID("UITreeTable_");
		this.columns              = new Array<UIDataTableField>();
		this.dataTableID          = "treeTable_" + webix.uid();
		this.showAddDeleteColumns = false;
		this.viewType = "treetable";
	}

} this.UITreeTable = UITreeTable;

class UICalendarField extends UIField {

	constructor(properties = null) {
		super(properties);
		this.setID("UICalendarField_");
	}

	public setComponent(label:string, value:any, data:any, callback:any, updateField = null) {
		this.setLabel(label);
		this.setValue(value);
		this.setData(data);
		this.setCallback(callback);
		this.updateField = updateField;
	}
	public getView():any {
		this.componentView = {
			id                : this.componentID,
			view              : "datepicker",
			name              : this.componentLabel, //date:  new Date(2012, 6, 8),
			value             : this.getValue(),
			label             : this.componentLabel,
			labelWidth        : 100,
			events            : webix.Date.isHoliday,
			calendarDateFormat: "%Y-%m-%d"
		}
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
	}

} this.UICalendarField = UICalendarField;

class UIComplexComponent extends UIComponent {

	protected componentArray:Array<UIComponent>;

	constructor(properties = null) {
		super(properties);
		this.setID("UIComplexComponent_");
		this.componentArray = new Array<UIComponent>();
	}

	public addComponent(label:string, component:UIComponent) {
		this.componentArray[label] = component;
		if (component) component.setProperty("name", label);
	}
	public createComponentsView():any {
		var viewArray = new Array<any>();
		var i         = 0;
		for (var item in this.componentArray) {
			if (item != "toolbar")
				viewArray[i++] = this.componentArray[item].getView();
		}
		return viewArray;
	}
	public numOfComponents():number {
		return Object.keys(this.componentArray).length
	}
	public getComponent(label:string):UIComponent {
		var component = this.componentArray[label];
		return component
	}
	public getFieldComponent(label:string):UIField {
		var component = this.componentArray[label];
		return component
	}

	public defineEvents() {	}
	
	public initialize() {
		super.initialize();
		super.defineEvents();
		for (var item in this.componentArray) {
			this.componentArray[item].initialize();
			this.componentArray[item].setData(this);
		}
	}
	public destroyView() {
		if ($$(this.componentID)) $$(this.componentID).destructor();
	}
	public destructor() {
		super.destructor();
		for (var item in this.componentArray) {
			this.componentArray[item].destructor();
		}
	}

} this.UIComplexComponent = UIComplexComponent;

class PortalSection extends UIComponent {

	//region Instance Variables
	public portalSectionIndex         = null;
	public classType:ClassType;
	public theArray:Array<any>;
	public gravity:number             = 1;
	public portletName                = "";
	public sectionHeader:PortalHeader = null;
	private template                  = {type: "line"};
	private _scrollBarX               = false;
	private _scrollBarY               = false;
	//endregion
	//region Class Variables
	public static COLUMNS = "cols";
	public static ROWS    = "rows";
	public static RESIZER = "resizer";
	public static ROOT    = "root;"
	public static HEADER  = "header";
	public static PORTLET = "portlet";
	//endregion
	//region Class Methods
	public static CreateColumns() {
		return new PortalColumn();
	}

	public static CreateRows() {
		return new PortalRow();
	}

	public static CreateRoot() {
		return new PortalRoot();
	}

	//endregion
	get scrollBarX():boolean {
		return this._scrollBarX;
	}
	set scrollBarX(value:boolean) {
		this._scrollBarX = value;
	}
	get scrollBarY():boolean {
		return this._scrollBarY;
	}
	set scrollBarY(value:boolean) {
		this._scrollBarY = value;
	}

	constructor(name = "noSectionName") {
		super();
		this.setID("PortalSection_");
		this.theArray    = new Array<any>();
		this.portletName = name;
	}

	public addPortlet(name, gravity = 1):Portlet {
		var portlet = new Portlet(name, gravity);
		this.theArray.push(portlet);
		return portlet;
	}
	public addSection(theSection:PortalSection, gravity = 1) {
		this.theArray.push(theSection);
		this.gravity = gravity
	}
	public addResizer():PortalSection {
		var resizer = new PortalResizer();
		this.theArray.push(resizer);
		return resizer;
	}
	public addHeader(title:string):PortalHeader {
		var header = new PortalHeader(title);
		this.theArray.unshift(header);
		this.sectionHeader = header;
		return header;
	}
	public removeHeader() {
		if (!this.sectionHeader) return;
		this.theArray.shift();
	}

	//region UIComponent Methods
	public getView():any {
		this.template["gravity"] = this.gravity;
		this.template["id"]      = this.componentID;
		this.template["drag"]    = true;
		if (this.scrollBarX && this.scrollBarY) {
			this.template["scrollxy"] = true;
		} else if (this.scrollBarX)
			this.template["scrollx"] = true; else if (this.scrollBarY)
			this.template["scrolly"] = true;
		return this.template;
	}
	public defineEvents() {
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
		for (var item in this.theArray) {
			this.theArray[item].initialize();
		}
	}

	//endregion
} this.PortalSection = PortalSection;

class PortalColumn extends PortalSection {
	constructor(name?:string) {
		super(name);
		this.portalSectionIndex = PortalSection.COLUMNS;
		this.classType          = PortalSection.COLUMNS;
		this.setID("PortalColumn_");
	}
} this.PortalColumn = PortalColumn

class PortalRoot extends PortalSection {
	constructor(name?:string) {
		super(name);
		this.portalSectionIndex = PortalSection.ROOT;
		this.classType          = "root";
		this.setID("PortalRoot_");
	}
} this.PortalRoot = PortalRoot

class PortalRow extends PortalSection {
	constructor(name?:string) {
		super(name);
		this.portalSectionIndex = PortalSection.ROWS;
		this.classType          = "row";
		this.setID("PortalRow_");
	}
}this.PortalRow = PortalRow;

class PortalHeader extends PortalSection {
	public headerTemplate    = {view: "template", template: "Header", type: "header"};
	public headerView:any;
	public headerText:string = null;

	constructor(title:string) {
		super();
		this.setID("PortalHeader_");
		this.portalSectionIndex         = PortalSection.HEADER;
		this.classType                  = PortalSection.HEADER;
		this.headerTemplate["id"]       = "header_" + webix.uid();
		this.headerTemplate["template"] = title;
		this.headerText                 = title;
	}

	public getView():any {
		return this.headerTemplate;
	}
}this.PortalHeader = PortalHeader;
class PortalResizer extends PortalSection {
	public  resizerTemplate = {view: "resizer"};

	constructor(name?:string) {
		super(name);
		this.setID("PortalResizer_");
		this.portalSectionIndex    = PortalSection.RESIZER;
		this.classType             = PortalSection.RESIZER;
		this.resizerTemplate["id"] = "uiResizer_" + webix.uid();
	}

	public getView():any {
		return this.resizerTemplate;
	}
}this.PortalResizer = PortalResizer;

class Portlet extends PortalSection {

	//region Instance Variables
	public portletView:any;
	public portletComponentView:any;
	public defaultPortletView:any;
	public nonComponentView:any = null;
	public internalView:any
	public gravity:number;
	public viewController:UIComponent;
	public hidden:boolean       = false;
	//endregion
	public static cast(aSection:any):Portlet {
		return <Portlet> aSection;
	}

	constructor(portletName:string, gravity = 1) {
		super(portletName);
		this.gravity              = gravity;
		this.portletView          = {id: this.componentID, minWidth: 100, template: "Content", view: "template"}
		this.portletComponentView = {type: "line"}
		this.defaultPortletView   = this.portletView;
		this.portalSectionIndex   = PortalSection.PORTLET;
		this.setID("Portlet_");
	}

	public replaceView() {
		// console.log(JSON.stringify(this.getView(), null, 6));
		webix.ui(this.getView(), $$(this.componentID));
		this.initialize();
		// console.log(JSON.stringify(this.getView(), null, 6));
	}
	public hide() {
		this.hidden = true;
	}
	public show() {
		this.hidden = false;
	}
	public resetView() {
		this.portletView = this.defaultPortletView
	}
	public setComponent(theComponent:UIComponent) {
		this.viewController = theComponent;
	}
	public resize() {
		if ($$(this.componentID)) {
			$$(this.componentID).resize();
		}
	}
	//region UIComponents Methods
	public getView():any {
		if (this.viewController) {
			var viewArray            = new Array<any>();
			this.portletView         = this.portletComponentView;
			var controllerView       = this.viewController.getView();
			viewArray[0]             = controllerView;
			this.portletView["rows"] = viewArray;
		} else {
			this.portletView = this.defaultPortletView;
		}
		this.portletView["id"]      = this.getComponentID();
		this.portletView["gravity"] = this.gravity;
		this.portletView["drag"]    = true;
		return this.portletView;
	}
	public defineEvents() {
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
		if (this.viewController) {
			this.viewController.initialize();
		}
		for (var item in this.theArray) {
			this.theArray[item].initialize();
		}
	}
	//endregion
} this.Portlet = Portlet;

enum PortalType { OneView, ExplorerView, DetailView }this.PortalType = PortalType;
enum PortalNames {EXPLORER = 0, DETAIL = 1, MAIN = 2, INFO = 3}this.PortalNames = PortalNames;

class Portal extends UIComponent {
	public portalRoot:PortalRoot;
	public portalContainer:string = null;
	public viewPortlet:Portlet    = null;
	public portalType:PortalType;
	public newViewPort:boolean    = false;
	public viewType               = null;
	public sectionTemplate        = {type: "line"};

	constructor(portalType?:PortalType) {
		super();
		this.setID("Portal_");
		this.portalRoot = new PortalRoot();
		if (!portalType) {
			switch (portalType) {
				case PortalType.OneView :
				{
					this.initializeOneView();
				}
					break;
				case PortalType.ExplorerView :
				{
					this.initializeExplorerView();
				}
					break;
				case PortalType.DetailView :
				{
					this.initializeDetailView();
				}
					break;
			}
		}
	}

	public portalString(portalNames:PortalNames) {
		switch (portalNames) {
			case PortalNames.EXPLORER :
				return "explorer";
			case PortalNames.DETAIL :
				return "detailArea";
			case PortalNames.MAIN :
				return "main";
			case PortalNames.INFO :
				return "info";
			default :
				return "NONAME";
		}
	}
	public initializeExplorerView() {
		var root      = this.getRoot();
		var newColumn = this.createColumns("columns");
		var newRow    = this.createRows("rows");
		root.addSection(newColumn);
		newColumn.addPortlet(PortalNames.EXPLORER);
		newColumn.addResizer();
		newRow.addPortlet(PortalNames.DETAIL);
		newRow.addResizer();
		newRow.addPortlet(PortalNames.INFO);
		newColumn.addSection(newRow);
	}
	public initializeOneView() {
		var root      = this.getRoot();
		var newColumn = this.createColumns("columns");
		root.addSection(newColumn);
		newColumn.addPortlet(this.portalString(PortalNames.MAIN));
	}
	public initializeDetailView() {
		var root   = this.getRoot();
		var newRow = this.createRows("rows");
		root.addSection(newRow);
		newRow.addPortlet(this.portalString(PortalNames.DETAIL));
		newRow.addResizer();
		newRow.addPortlet(this.portalString(PortalNames.INFO));
	}
	public getRoot():PortalRoot {
		return this.portalRoot;
	}
	public createColumns(name?):PortalColumn {
		return new PortalColumn(name);
	}
	public createRows(name?:string):PortalRow {
		return new PortalRow(name);
	}
	public setContainer(containerID:string) {
		this.portalContainer = containerID;
		this.viewPortlet     = null;
	}
	public setViewPortlet(thePortlet:Portlet) {
		this.viewPortlet     = thePortlet;
		this.portalContainer = "";
	}
	public getPortlet(portalName:string):Portlet {
		return Portlet.cast(this.find(this.portalRoot, portalName));
	}
	public find(portalSection:PortalSection, name):PortalSection {
		for (var item in portalSection.theArray) {
			if (portalSection.theArray[item].portletName == name)
				return portalSection.theArray[item];
			var result = this.find(<PortalSection> portalSection.theArray[item], name);
			if (result)
				return result;
		}
		return null;
	}
	public getView():any {
		var viewArray = new Array<any>();
		var theView   = this.sectionTemplate;
		theView["id"]   = this.getComponentID();
		viewArray[0]    = this.createPortalView();
		theView["rows"] = viewArray;
		if (this.viewType)
			theView["view"] = this.viewType;
		this.setComponentView(theView);
		return this.componentView;
	}
	public createPortalView():any {
		var thePortalView:Portlet;
		var resultArray = this.tree(this.portalRoot);
		return resultArray[0];
	}
	public tree(portalSection:PortalSection):Array<any> {
		var returnArray = new Array<any>();
		for (var item in portalSection.theArray) {
			index = PortalSection.ROWS;
			if (portalSection.theArray[item].portalSectionIndex)
				if (portalSection.theArray[item].portalSectionIndex == PortalSection.COLUMNS || portalSection.theArray[item].portalSectionIndex == PortalSection.ROWS)
					var index = portalSection.theArray[item].portalSectionIndex;
			var result = portalSection.theArray[item].getView();
			if (portalSection.theArray[item].theArray.length > 0) {
				var resultArray = this.tree(<PortalSection> portalSection.theArray[item]);
				result[index]   = resultArray;
			}
			returnArray.push(result)
			//  console.log("Returning Result"+C4log.printThis(result));
		}
		return returnArray;
	}
	public initializeTree() {
		var returnArray = new Array<any>();
		for (var item in this.portalRoot.theArray) {
			this.portalRoot.theArray[item].initialize();
		}
		return returnArray;
	}
	public refresh() {
		this.show();
	}
	public show(theWindow?:any):any {
		var showView = this.getView();
		var xView:any;
		if (theWindow) {
			var rows          = new Array<any>();
			rows[0]           = showView;
			theWindow["rows"] = rows;
			AppLog.printThis(theWindow);
			xView = webix.ui(theWindow).show();
		}
		if (this.portalContainer) {
			this.componentView["container"] = this.portalContainer;
			{
				AppLog.printThis(showView);
				xView = webix.ui(showView, this.portalContainer);
			}
		} else {
			AppLog.printThis(showView);
			xView = webix.ui(showView, $$(this.componentID));
		}
		this.initialize();
		//console.log("Show View");
		//C4log.printThis(showView);
		return xView;
	}
	public popup(theWindow:any) {
		var showView = this.getView();
		var rows          = new Array<any>();
		rows[0]           = showView;
		theWindow["body"] = C4Object.Clone(showView);
		//console.log(JSON.stringify(theWindow));
		var newWindow = webix.ui(theWindow);
		return newWindow;
	}
	public defineEvents() {
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
		this.initializeTree();
	}

} this.Portal = Portal;

class UIPopupWindow extends UIComplexComponent {
	public static CloseButton() {
		var theID        = this["config"].id;
		var theComponent = <UIComponent> $$(theID)["component"];
		$$(theComponent.getComponentID()).close();
	}
	public static FullScreen() {
		var theID        = this["config"].id;
		var theComponent = <UIPopupWindow> $$(theID)["component"];
		theComponent.fullscreenToggle();
	}

	//region Instance Variables
	public title:string;
	public resize:boolean = false;
	public modal:boolean  = true;
	public theComponent:UIComponent;
	public thePortal      = new Portal();
	public closeButtonID  = "closeButton_" + webix.uid();
	public fullscreenID   = "fullScreenID_"+webix.uid();
	public width          = 500;
	public height         = 500;
	//endregion
	constructor(label:string = "Popup Window", theComponent:UIComponent = null) {
		super();
		this.addProperties ( { width : this.width, height : this.height })
		this.setID("UIPopupWindow_");
		var portalRoot = this.thePortal.getRoot();
		var rows = this.thePortal.createRows();
		rows.addPortlet("main");
		portalRoot.addSection((rows));
		this.setComponent(theComponent);
		this.componentLabel = label;
	}

	public setComponent(theComponent:UIComponent) {
		this.theComponent = theComponent;
		this.thePortal.getPortlet("main").setComponent(theComponent);
		this.addComponent("component", theComponent);
	}
	public show(theComponent?:UIComponent) {
		if (theComponent) {
			this.setComponent(theComponent);
		}
		if (this.theComponent === null) {
			AppLog.error("Trying to Show Window With Missing View");
			return;
		}
		var popup = this.thePortal.popup(this.getView());
		this.initialize();
		UI.PlaySound(Sounds.Popup);
		popup.show();
	}

	public fullscreenToggle() {
		if ($$(this.getComponentID())) {
			$$(this.getComponentID()).config.fullscreen = !$$(this.getComponentID()).config.fullscreen
			$$(this.getComponentID()).resize();
		}
	}
	public hide() {
		this.publish("close", this);
		UI.PlaySound(Sounds.CloseDiagram);
		if ($$(this.getComponentID())) {
			$$(this.getComponentID()).hide();
		}
	}
	public close() {
		this.publish("close", this);
		if ($$(this.theComponent.getComponentID())) {
			$$(this.theComponent.getComponentID()).destructor();
		}
		UI.PlaySound(Sounds.CloseDiagram);
		if ($$(this.getComponentID())) {
			$$(this.getComponentID()).close();
		}
	}
	//region UIComponent Methods
	public getView():any {
		this.componentView = this.createView({
			view    : "window",
			id      : this.componentID,
			css     : "c4popup animated zoomIn",
			position: "center",
			modal   : true,
			move    : true,
			scrollxy: true,
			hidden  : true,
			resize  : true,
			head    : {
				view: "toolbar", margin: -4, position: "center", cols: [
					 {view: "label", label: this.componentLabel},
					 {view : "icon",id : this.fullscreenID,icon : "arrows-alt",css  : "alter",click: UIPopupWindow.FullScreen},
		             {view : "icon",id : this.closeButtonID,icon : "times-circle",css  : "alter",click: UIPopupWindow.CloseButton}
				]
			},
		});
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		// this.theComponent.initialize();
		$$(this.closeButtonID)["component"] = this;
		$$(this.fullscreenID)["component"] = this;
		$$(this.componentID)["component"]   = this;
	}
	//endregion
} this.UIPopupWindow = UIPopupWindow;

class ConfirmAction {
	label:string;
	event:string;
} this.ConfirmAction = ConfirmAction;

class UIConfirmWindow extends UIComplexComponent {
	protected popup:UIPopupWindow;
	public title:string;
	public statement:string;
	public option1:ConfirmAction;
	public option2:ConfirmAction;
	public option3:ConfirmAction;

	constructor(title:string, statement:string, option1:ConfirmAction, option2:ConfirmAction = null, option3:ConfirmAction = null) {
		super();
		this.title     = title;
		this.statement = statement;
		this.option1   = option1;
		this.option2   = option2;
		this.option3   = option3;
	}

	public close() {
		this.popup.close();
	}
	public listen(event:any, object:any, caller:UIComponent) {
		switch (event) {
			case "click" :
			{
				if (caller === this.getComponent("option1")) {
					this.publish(this.option1.event, this.option1);
				}
				if (caller === this.getComponent("option2")) {
					this.publish(this.option2.event, this.option2);
				}
				if (caller === this.getComponent("option3")) {
					this.publish(this.option3.event, this.option3);
				}
			}
				break;
			case "close" :
			{
				this.publish("close", null);
			}
		}
	}
	public getView():any {
		var title = new UILabel({label: this.title, alignment: "center", labelWidth: 100});
		this.addComponent("title", title);
		var text = new UILabel({label: this.statement, alignment: "center", labelWidth: 100});
		this.addComponent("text", text);
		var option1 = new UIButton({label: this.option1.label});
		this.addComponent("option1", option1);
		if (this.option1) {
			var option2 = new UIButton(this.option2.label);
			this.addComponent("option2", option2);
		}
		if (this.option3) {
			var option3 = new UIButton(this.option3.label);
			this.addComponent("option3", option3);
		}
		this.componentView = this.createView({
			view: "form", id: this.getComponentID(), rows: this.createComponentsView()
		});
		return this.componentView;
	}
	public show() {
		this.popup = new UIPopupWindow("Confirmation", this);
		this.popup.subscribe("close", this);
		this.popup.show();
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
	public defineEvents() {
		this.getComponent("option1").subscribe("click", this);
		if (this.getComponent("option2")) this.getComponent("option2").subscribe("click", this);
		if (this.getComponent("option3")) this.getComponent("option3").subscribe("click", this);
	}
} this.UIConfirmWindow = UIConfirmWindow

class UIMultiView extends UIComplexComponent {
	constructor() {
		super();
		this.setID("UIMultiView_");
	}

	public addView(label:string, component:UIComponent) {
		this.addComponent(label, component);
	}
	public setRelationshipObject(theObject:any) {
		super.setRelationshipObject(theObject);
		for (var item in this.componentArray[item]) {
			this.componentArray[item].setRelationshipObject(this.getRelationshipObject());
		}
	}
	public createComponentsView():any {
		var viewArray = new Array<any>();
		var i         = 0;
		for (var item in this.componentArray) {
			if (item != "toolbar")
				viewArray[i++] = {
					header: item, body: this.componentArray[item].getView()
				}
		}
		return viewArray;
	}
	public getView():any {
		this.componentView = {
			id: this.getComponentID(), view: "tabview", animate: true, cells: this.createComponentsView()
		}
		return this.componentView;
	}

} this.UIMultiView = UIMultiView;

class UIMenu extends UIComplexComponent {

	public menuItems : Array<any>;

	constructor(properties = null) {
		super(properties);
		this.menuItems = new Array<any>();
	}
	public addMenuItem(menu : any) {
		menu["id"] = webix.uid()+"_menu";
		this.menuItems.push(menu);
	}
} this.UIMenu = UIMenu;

class TabViewCell {
	public name       : string;
	public properties : any;
	public component  : UIComplexComponent;
}

class UITabView  extends UIComplexComponent {

	public popup        : UIPopupWindow;
	public animate      : boolean = true;
	private cells       : Array<TabViewCell>;
	public closeAble    : boolean = true;
	public fitBiggest   : boolean = true;

	constructor(properties : any = null) {
		super(properties);
		this.setID("UITabView_");
		this.cells = new Array<TabViewCell>();
	}
	public addView(name : string, properties : any, component : UIComplexComponent) {
		var cell = new TabViewCell();
		cell.properties = properties;
		cell.component = component;
		cell.name = name;
		this.cells[name]=cell;
		this.addComponent(name,component);
	}
	public listen(event, data, caller) {
		switch (event) {
			case "eventName":
			default :
				UI.Info(event);
				break;
		}
	}
	public createCells() : Array<any> {
		var cellArray = new Array<any>();
		for (var item in this.cells) {
			var cell = { body : this.cells[item].component.getView()  }
			for (var property in this.cells[item].properties) {
				cell[property] = this.cells[item].properties[property];
			}
			cellArray.push(cell);
		}
		return cellArray;
	}
	public getView() : any {
		this.componentView = this.createView({
			id        : this.componentID,
			view      : "tabview",
			multiview : { animate : this.animate, fitBiggest : this.fitBiggest },
			close     : this.closeAble,
			tabbar    : { popupWidth: 300,tabMinWidth: 120 },
			cells     : this.createCells()

		})
		return this.componentView;
	}
	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}
	public defineEvents() {}
	public show() {
		this.popup = new UIPopupWindow("Component Label ");
		this.popup.show(this);
	}
} this.UITabView = UITabView;
Factory.AddStringToClass("UITabView", UITabView);

class UIList extends UIComplexComponent {

	public popup        : UIPopupWindow;
	public columnName   : string = null;
	public table        : UIDataTable = null;
	public dataArray    : Array<any>=null;

	constructor(properties : any = null) {
		super(properties);
		this.setID("UIList_");
	}

	public setList(data : Array<any>) {

	}
	public listen(event, data, caller) {
		switch (event) {
			case "itemClick": {
				this.itemChange(data);
			}
			default :
				UI.Info(event);
				break;
		}
	}
	public itemChange(item : ItemSelectedEvent) {
		var status = item.objectArray[0]["status"];
		item.objectArray[0]["status"] = !status;
		(<UIDataTable>this.getComponent("table")).refreshRow(item.rowID);
		this.publish("itemChange", item);
	}
	public set(name : string, dataArray : Array<any>) {
		this.columnName = name;
		this.dataArray = dataArray;
	}
	public getView() : any {
		this.table = new UIDataTable();
		this.table.addColumn(0, { id:"status", header:"Active", width:40, css:"center", type : "value",
			template: function(obj,type,value) {
				if (value)
					return "<span class='webix_table_checkbox webix_icon fa-eye'></span>";
				else
					return "<span class='webix_table_checkbox webix_icon fa-eye-slash'></span>";
			}
		});
		this.table.addColumn(1, { id:"value",  header:this.columnName, fillspace:1 });
		this.table.setList(this.dataArray);
		this.addComponent("table",this.table);

		this.componentView = this.createView({
			id : this.componentID,
			view : "form",
			rows : [this.getComponent("table").getView()]
		})
		return this.componentView;
	}

	public initialize() {
		super.initialize();
		super.defineEvents();
		this.defineEvents();
	}

	public defineEvents() {
		if (this.getComponent("table")) {
			(<UIDataTable> this.getComponent("table")).subscribe("onItemClick",this,"itemClick")
		}
	}
	public show() {
		this.popup = new UIPopupWindow(this.columnName+" List ");
		this.popup.modal=false;
		this.popup.show(this);
	}
} this.UIList = UIList;

