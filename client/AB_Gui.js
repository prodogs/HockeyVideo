/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
console.log("Loading gui.ts ...");
findClassType = null;
class DropMessage {
}
class UIEventHandler {
    static OnAfterTabClick() { }
    static FieldChanged(newValue, oldValue) {
        var theComponentID = this["config"].id;
        var theComponent = $$(theComponentID)["component"];
        theComponent.fieldChanged(newValue, oldValue);
    }
    static CreateDropMessage(context) {
        var fromID;
        var fromComponent;
        var toComponent;
        var arrayOfObjects = new Array();
        var toObject;
        fromID = context["from"].config.id;
        var toID = context["to"].config.id;
        for (var i = 0; i < context.source.length; i++) {
            arrayOfObjects.push(context.from.getItem(context.source[i]));
        }
        if ($$(fromID))
            fromComponent = $$(fromID)["component"];
        if ($$(toID))
            toComponent = $$(toID)["component"];
        var dropMessage = new DropMessage();
        dropMessage.fromComponent = fromComponent;
        dropMessage.toComponent = toComponent;
        dropMessage.fromObjects = arrayOfObjects;
        if (context.target == null)
            dropMessage.toObject = null;
        else {
            dropMessage.toObject = $$(toID).getItem(context.target.row);
        }
        dropMessage.context = context;
        dropMessage.ev = null;
        return dropMessage;
    }
    static OnBeforeDragIn(context, event) {
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onBeforeDragIn == 'function')
            return dropMessage.toComponent.onBeforeDragIn(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    }
    static onDragOut(context, event) {
        var context = webix.DragControl.getContext();
        UI.Info("OnDragOut Static");
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onDragOut == 'function')
            return dropMessage.toComponent.onDragOut(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    }
    static onBeforeDrop(context, ev) {
    }
    static OnAfterDrop2(context, ev) {
    }
    static OnAfterDrop(context, event) {
        var context = webix.DragControl.getContext();
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onAfterDrop == 'function')
            return dropMessage.toComponent.onAfterDrop(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    }
    static OnButtonClick(id, event) {
        var theComponentID = this["config"].id;
        if (!$$(theComponentID))
            return;
        var theComponent = $$(theComponentID)["component"];
        theComponent.onButtonClick(theComponent);
    }
    static OnDragOut(context, event) {
        var context = webix.DragControl.getContext();
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onDragOut == 'function')
            return dropMessage.toComponent.onDragOut(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    }
    static OnBeforeDrop(context, event) {
        var context = webix.DragControl.getContext();
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onBeforeDrop == 'function')
            return dropMessage.toComponent.onBeforeDrop(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    }
    static OnClick(ev, id) {
    }
    static OnItemDblClick(id, ev, node) {
        var theComponent = $$(this["config"].id)["component"];
        var selectedObject = $$(theComponent.dataTableID).getItem(id.row);
        var itemMessage = new ItemSelectedEvent();
        itemMessage.objectArray = new Array();
        itemMessage.objectArray.push(selectedObject);
        theComponent.onItemDblClick(itemMessage);
    }
    static OnItemClick(id, ev, node) {
        var theComponent = $$(this["config"].id)["component"];
        var selectedObject = $$(theComponent.dataTableID).getItem(id.row);
        var itemMessage = new ItemSelectedEvent();
        itemMessage.objectArray = new Array();
        itemMessage.objectArray.push(selectedObject);
        itemMessage.rowID = id.row;
        theComponent.onItemClick(itemMessage);
    }
    static onSelectChange() {
        var theComponent = $$(this["config"].id)["component"];
        var rowid = $$(theComponent.dataTableID).getSelectedId(true);
        var selectedObject = $$(theComponent.dataTableID).getItem(rowid);
        theComponent.onSelectChange(rowid, selectedObject);
    }
    static onAfterEditStop(state, editor, ignoreUpdate) {
        var theComponent = $$(this["config"].id)["component"];
        var theColumn = new UIDataTableField();
        theColumn.columnName = editor.column;
        theColumn.oldValue = state.old;
        theColumn.newValue = state.value;
        theColumn.rowObject = $$(theComponent.dataTableID).getItem(editor.row);
        theColumn.editor = editor;
        theComponent.onStopEdit(theColumn);
    }
    static onBeforeEditStartTable(id) {
        var theComponent = $$(this["config"].id)["component"];
        var row = id.row;
        var column = id.column;
        var rowItem = $$(this["config"].id).getItem(row);
        var theColumn = new UIDataTableField();
        theColumn.columnName = column;
        theColumn.oldValue = null;
        theColumn.newValue = null;
        theColumn.rowObject = rowItem;
        theComponent.onBeforeEditStart(theColumn);
        if (rowItem["beforeEditStartReturn"] != null)
            return rowItem["beforeEditStartReturn"];
        return !rowItem[column + "ReadOnly"];
    }
    static OnChange(newv, oldv) {
        var theComponent = $$(this["config"].id)["component"];
        theComponent.onChange(newv, oldv);
    }
    static MenuHandler(id, context) {
        var theID = this["config"].id;
        var theComponent = $$(theID)["component"];
        var jumpItem = theComponent.getMenuItem(id);
        var theObject = theComponent.owningComponent.getSelectedObject();
        if (!jumpItem.callback)
            return;
        jumpItem.callback(id, theComponent, theObject);
    }
    static OnAfterSelect(id) {
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
        var IdArray = new Array();
        var objectArray = new Array();
        var rowArray = new Array();
        var newItemSelected = new ItemSelectedEvent();
        IdArray[0] = id.row;
        if (theNode.originalObject)
            objectArray[0] = theNode.originalObject.clone();
        else
            objectArray[0] = null;
        rowArray[0] = theNode;
        newItemSelected.idArray = IdArray;
        newItemSelected.objectArray = objectArray;
        newItemSelected.itemsSelected = objectArray.length;
        newItemSelected.rowArray = rowArray;
        newItemSelected.theComponent = theComponent;
        theComponent.onAfterSelect(newItemSelected);
    }
    static HandleFieldEntry(state, editor, ignoreUpdate) {
        var theExplorer = $$(this["config"].id).explorer;
        var newText = state.value;
        var rowID = editor.row;
        var theNode = $$(theExplorer.componentID).getItem(rowID);
        var theProxy = Factory.CreateProxyInstance(theNode.classType);
        theProxy.updateName(theNode._id, newText);
        UI.Message("Record Updated");
    }
    static IsFieldEditable(id) {
        var theID = this["config"].id;
        var theExplorer = $$(theID)["explorer"];
        var rowItem = $$(theExplorer.getComponentID()).getItem(id);
        if (rowItem.classType.indexOf("Root") == -1)
            return false;
        else
            return true;
    }
    static ValidateFieldEntry(row, value) {
        var theID = this["config"].id;
        var theExplorer = $$(theID).explorer;
        var rowItem = $$(theExplorer.getComponentID()).getItem(row.id);
        AppLog.info("info", "Before Edit Event");
        return true;
    }
    static ProcessOnDestruct(theComponent) {
        UI.Debug("on Destruct Called");
        theComponent.onDestruct();
    }
    static ProcessTabChanged() {
    }
    static OnDropEvent(Source, target, event) {
        // UI.Info("Drop Event");
        console.log("On Drop Event");
    }
}
this.UIEventHandler = UIEventHandler;
var Sounds;
(function (Sounds) {
    Sounds[Sounds["Popup"] = 0] = "Popup";
    Sounds[Sounds["ShapeDrop"] = 1] = "ShapeDrop";
    Sounds[Sounds["ShapeDragIn"] = 2] = "ShapeDragIn";
    Sounds[Sounds["ShapeDragOut"] = 3] = "ShapeDragOut";
    Sounds[Sounds["Blop"] = 4] = "Blop";
    Sounds[Sounds["OpenDiagram"] = 5] = "OpenDiagram";
    Sounds[Sounds["SaveDiagram"] = 6] = "SaveDiagram";
    Sounds[Sounds["CloseDiagram"] = 7] = "CloseDiagram";
    Sounds[Sounds["ShapeOnShapeDrop"] = 8] = "ShapeOnShapeDrop";
    Sounds[Sounds["DrawLink"] = 9] = "DrawLink";
    Sounds[Sounds["Error"] = 10] = "Error";
})(Sounds || (Sounds = {}));
this.Sounds = Sounds;
class UI extends C4Object {
    static PlaySound(sound = Sounds.Blop) {
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
            case Sounds.ShapeDragOut:
                s = new buzz.sound("/sounds/Click.mp3");
                break;
        }
        s.play();
    }
    static Debug(text) {
        if (true)
            UI.Message(text);
    }
    static Message(text) {
        UI.Info(text);
    }
    static Info(text) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        toastr["info"](text);
    }
    static Warning(text) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        UI.PlaySound(Sounds.Error);
        toastr["warning"](text);
    }
    static Success(text) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        toastr["success"](text);
    }
    static Error(text) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        UI.PlaySound(Sounds.Error);
        toastr["error"](text);
    }
    static ExportToExcel(componentID) {
        $$(componentID).exportToExcel();
    }
    static Alert(string) { webix.alert(string); }
}
this.UI = UI;
class UIComponent extends UI {
    constructor(properties = null) {
        super();
        this.overlayMixin = false;
        this.order = 0;
        this.eventsDefined = false;
        this.trackingObjectChanges = false;
        this.idPrefix = "UIComponent_";
        this.theTest = new C4Object();
        this.properties = new Array();
        this.componentID = this.idPrefix + webix.uid();
        this.addProperties(properties);
    }
    get userData() {
        return this._userData;
    }
    set userData(value) {
        this._userData = value;
    }
    get uiClassType() {
        return this._uiClassType;
    }
    set uiClassType(value) {
        this._uiClassType = value;
    }
    showOverlay() {
        if (!this.overlayMixin)
            webix.extend($$(this.componentID), webix.OverlayBox);
        $$(this.componentID).showOverlay();
        this.overlayMixin = true;
    }
    hideOverlay() {
        $$(this.componentID).hideOverlay();
    }
    static TreeIcon(obj) {
        if (obj.$level > 1001)
            return "<span class='webix_icon fa-folder-open'></span>";
        if (obj.$level < 1000) {
            return Factory.GetClassIcon(obj._classType);
        }
        return "<span class='webix_icon fa-film'></span>";
    }
    attachEvent(id, event, callback) {
        if ($$(id)) {
            $$(id).attachEvent(event, callback);
        }
    }
    setRelationshipObject(theObject) {
        this.relationshipObject = theObject;
    }
    getRelationshipObject() {
        return this.relationshipObject;
    }
    blankValue() { }
    createView(viewOptions) {
        this.setProperty("drag", true);
        this.mergePropertySet(viewOptions);
        return viewOptions;
    }
    setID(prefix) {
        this.idPrefix = prefix;
        this.componentID = this.idPrefix + webix.uid();
    }
    setCallback(callback) {
        this.componentChangeCallback = callback;
    }
    getCallback() {
        return this.componentChangeCallback;
    }
    isValid() {
        if ($$(this.componentID)) {
            return $$(this.componentID).validate();
        }
        return false;
    }
    setData(theData) {
        this.componentData = theData;
    }
    getData() {
        return this.componentData;
    }
    setLabel(theLabel) {
        this.componentLabel = theLabel;
    }
    getLabel() {
        return this.componentLabel;
    }
    setValue(theValue) {
        this.componentValue = theValue;
        if ($$(this.componentID)) {
            webix.ui(this.getValue, $$(this.componentID));
            this.initialize();
        }
    }
    setOwningComponent(component) {
        this.owningComponent = component;
    }
    getOwningComponent() {
        return this.owningComponent;
    }
    getComponentID() {
        return this.componentID;
    }
    setComponentID(id) {
        this.componentID = id;
    }
    getValue() {
        return this.componentValue;
    }
    getComponentView() {
        return this.componentView;
    }
    setComponentView(theView) {
        this.componentView = theView;
    }
    getSelectedObject() {
        return null;
    }
    onBeforeDrop(message) {
        webix.alert("Sorry Dropping Here Not Allowed Yet");
        return false;
    }
    onBeforeDragIn(message) {
        return false;
    }
    onAfterDrop(message) {
        return false;
    }
    onDragOut(message) {
        return false;
    }
    validateDrop(message) {
        return false;
    }
    onSelectChange(itemMessage) {
        this.publish("onSelectChange", itemMessage);
        return;
    }
    onItemDblClick(itemMessage) {
        this.publish("onItemDblClick", itemMessage);
    }
    onItemClick(itemMessage) {
        this.publish("onItemClick", itemMessage);
    }
    getObject() {
        return this.theObject;
    }
    setObject(theObject) {
        this.theObject = theObject;
    }
    setDraggable(flag = true) {
        var htmlView = $$(this.getComponentID()).$view;
        webix.DragControl.addDrop($$(this.getComponentID()), UIEventHandler.OnDropEvent);
    }
    setProperty(name, value) {
        switch (name) {
            case "label":
                {
                    this.setLabel(value);
                    this.properties[name] = value;
                }
                break;
            case "value":
                {
                    this.setValue(value);
                    this.properties[name] = value;
                }
                break;
            case "data":
                this.setData(value);
                break;
            case "callback":
                {
                    this.setCallback(value);
                }
                break;
            default:
                this.properties[name] = value;
        }
    }
    addProperties(propertySet) {
        for (var item in propertySet) {
            this.setProperty(item, propertySet[item]);
        }
    }
    getProperty(name) {
        return this.properties[name];
    }
    mergePropertySet(view) {
        var index = 0;
        for (var item in this.properties) {
            view[item] = this.properties[item];
            index++;
        }
        return view;
    }
    getPropertySet() {
        var index = 0;
        var results = {};
        for (var item in this.properties) {
            results[item] = this.properties[item];
            index++;
        }
        return results;
    }
    //region UIComponent Methods
    getView() {
        return null;
    }
    refresh() { }
    defineEvents() {
        this.eventsDefined = true;
        return;
    }
    initialize() {
        if ($$(this.componentID)) {
            $$(this.componentID)["component"] = this;
            $$(this.componentID).drag = true;
        }
    }
    destroyView() {
        if ($$(this.componentID))
            $$(this.componentID).destructor();
    }
    destroyObject() {
    }
    onDestruct() {
        this.destroyObject();
    }
    destructor() {
    }
}
this.UIComponent = UIComponent;
class UIContextMenu extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.jumpItemArray = new Array();
        this.setID("uiContextMenu_");
    }
    addItem(label, callback) {
        var newItem = new UIJumpItem();
        newItem.id = "menuItem_" + webix.uid();
        newItem.label = label;
        newItem.callback = callback;
        this.jumpItemArray[newItem.id] = newItem;
    }
    addSeperator() {
        var newItem = new UIJumpItem();
        newItem.id = "jumpItem_" + webix.uid();
        newItem.label = "";
        newItem.callback = null;
        this.jumpItemArray[newItem.id] = newItem;
    }
    getMenuItem(label) {
        for (var item in this.jumpItemArray) {
            if (this.jumpItemArray[item].label == label)
                return this.jumpItemArray[item];
        }
    }
    //region UIComponent Methods
    getView() {
        var menuArray = new Array();
        for (var item in this.jumpItemArray) {
            var menuItem = this.jumpItemArray[item];
            if (menuItem.label == "") {
                menuArray.push({ $template: "Separator" });
            }
            else {
                menuArray.push(menuItem.label);
            }
        }
        this.componentView = this.createView({
            view: "contextmenu", id: this.getComponentID(), data: menuArray
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
        this.componentView = this.getView();
        if (!$$(this.componentID))
            webix.ui(this.componentView).attachTo($$(this.getOwningComponent().getComponentID()));
        $$(this.getComponentID())["component"] = this;
    }
    defineEvents() {
        this.attachEvent(this.getComponentID(), "click", UIEventHandler.MenuHandler);
    }
}
this.UIContextMenu = UIContextMenu;
var FieldFormat;
(function (FieldFormat) {
    FieldFormat[FieldFormat["GENERAL"] = 0] = "GENERAL";
    FieldFormat[FieldFormat["CURRENCY"] = 1] = "CURRENCY";
    FieldFormat[FieldFormat["NUMBER"] = 2] = "NUMBER";
    FieldFormat[FieldFormat["PERCENT"] = 3] = "PERCENT";
})(FieldFormat || (FieldFormat = {}));
this.FieldFormat = FieldFormat;
class UIField extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.relationshipPointer = false;
        this.fieldFormat = FieldFormat.GENERAL;
        this.setID("uifield_");
        this.addEventPublication("fieldChanged");
    }
    fieldChanged(newValue, oldValue) {
        var theParent = this.getData();
        if (this.getCallback()) {
            var callback = this.getCallback();
            return callback(this, theParent, newValue, oldValue);
        }
        this.valueChanged(theParent, newValue, oldValue);
        this.publish("fieldChanged", { newValue: newValue, oldValue: oldValue });
    }
    setClassType(classType) {
        this.listType = classType;
    }
    getClassType() {
        return this.listType;
    }
    setUpdateField(theFieldName) {
        this.updateField = theFieldName;
    }
    getUpdateField() {
        return this.updateField;
    }
    setFieldFormat(theFormat) {
        this.fieldFormat = theFormat;
        switch (theFormat) {
            case FieldFormat.CURRENCY:
                {
                    this.formatView = webix.Number.numToStr({
                        groupDelimiter: ",", groupeSize: 3, decimalDelimiter: ".", decimalSize: 0
                    });
                }
                break;
            case FieldFormat.PERCENT:
                {
                }
                break;
            case FieldFormat.GENERAL:
                {
                }
                break;
            case FieldFormat.NUMBER:
                {
                }
                break;
            default:
        }
    }
    setValue(value) {
        if ($$(this.componentID)) {
            $$(this.componentID).blockEvent();
            $$(this.componentID).setValue(value);
            $$(this.componentID).unblockEvent();
        }
        this.fieldValue = value;
    }
    defineEvents() {
        this.attachEvent(this.componentID, "onChange", UIEventHandler.FieldChanged);
    }
    getValue() {
        return this.fieldValue;
    }
    blankValue() {
        if ($$(this.componentID)) {
            $$(this.componentID).setValue("");
        }
        this.fieldValue = "";
    }
    valueChanged(parentComponent, newValue, oldValue) {
        if (!this.isValid())
            return;
        if (!this.updateField)
            return;
        var theObject = Factory.CreateProxyInstance(parentComponent.getObject().classType);
        theObject.updateAttribute(parentComponent.getObject()._id, this.updateField, newValue);
        UI.Message("Record Updated");
    }
}
this.UIField = UIField;
class UICounterField extends UIField {
    constructor(properties = null) {
        super(properties);
        this.setID("UICounterField_");
    }
    fieldChanged(newv, oldv) {
        this.publish("fieldChanged", { newValue: newv, oldValue: oldv });
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID, view: "counter"
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
    }
}
this.UICounterField = UICounterField;
class UILabel extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.alignment = "center";
        this.setID("UILabel_");
    }
    setComponent(label, alignment = "center", labelWidth = 100) {
        this.addProperties({ label: label, alignment: alignment, labelWidth: labelWidth });
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID, view: "label"
        });
        return this.componentView;
    }
}
this.UILabel = UILabel;
class UIDateField extends UIField {
    constructor(properties = null) {
        super(properties);
        this.setID("uiDateField_");
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID,
            view: "datepicker",
            name: this.componentLabel,
            value: this.getValue(),
            label: this.componentLabel,
            labelWidth: 100,
            timepicker: false
        });
        if (this.formatView) {
            this.componentView["format"] = this.formatView;
        }
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    definEvents() {
    }
}
this.UIDateField = UIDateField;
class UISliderField extends UIField {
    constructor(properties = null) {
        super(properties);
        this.setID("UISliderField");
    }
    setComponent(label, value, data, callback, updateField = null, minValue = 0, maxValue = 1, step = .1) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.updateField = updateField;
        this.setProperty("min", minValue);
        this.setProperty("max", maxValue);
        this.setProperty("step", step);
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID,
            name: this.getLabel(),
            view: "slider",
            label: this.getLabel(),
            value: this.getValue(),
            title: function (obj) {
                return webix.i18n.numberFormat(obj.value * 100) + "%";
            }
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() { }
}
this.UISliderField = UISliderField;
class UITextField extends UIField {
    constructor(properties = null) {
        super(properties);
        this.textArea = false;
        this.setID("uiTextField_");
        this.textArea = false;
    }
    setTextArea(textArea) {
        this.textArea = textArea;
    }
    setComponent(label, value, data = null, callback = null, updateField = null, textArea = false) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.textArea = textArea;
        this.updateField = updateField;
    }
    getView() {
        if (this.textArea)
            var viewType = "textarea";
        else
            viewType = "text";
        this.componentView = this.createView({
            id: this.componentID,
            view: viewType,
            name: this.componentLabel,
            value: this.getValue(),
            label: this.componentLabel,
            labelWidth: 100
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() { }
}
this.UITextField = UITextField;
class UINoteField extends UITextField {
    constructor(properties = null) {
        super(properties);
        this.setID("UINoteField_");
        this.textArea = true;
    }
}
this.UINoteField = UINoteField;
class UISelectList extends UIField {
    constructor(properties = null) {
        super(properties);
        this.setID("uiSelectList_");
    }
    setValue(value) {
        super.setValue(value);
        if ($$(this.componentID)) {
            $$(this.componentID).setValue(value);
        }
    }
    setSelectList(label, value, theList, data, callback, updateField) {
        this.setLabel(label);
        this.setValue(value);
        this.setList(theList);
        this.setData(data);
        this.setCallback(callback);
        this.setUpdateField(updateField);
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID,
            view: "select",
            name: this.componentLabel,
            options: this.selectionList,
            value: this.getValue(),
            label: this.componentLabel,
            labelWidth: 100,
            validate: webix.rules.isNotEmpty
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
    }
    setList(theList) {
        this.selectionList = theList;
        for (var item in theList) {
            if (theList[item].name == "")
                return;
        }
        this.selectionList.push({ id: "", name: "" });
        if ($$(this.componentID)) {
            $$(this.componentID).define("options", this.selectionList);
            $$(this.componentID).refresh();
        }
    }
}
this.UISelectList = UISelectList;
class UICheckbox extends UIField {
    constructor(properties = null) {
        super(properties);
    }
    setComponent(label, value = 0, data = null, callback = null) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
    }
    getView() {
        this.componentView = this.createView({
            id: this.getComponentID(),
            view: "checkbox",
            label: this.getLabel(),
            value: this.getValue(),
        });
        return this.componentView;
    }
    onChange(newv, oldv) {
        this.publish("onChange", { newValue: newv, oldValue: oldv });
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() {
    }
}
this.UICheckbox = UICheckbox;
class UIJumpItem {
}
class UIJumpBar extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.setID("UIJumpBar_");
        this.jumpItemArray = new Array();
    }
    static JumpCallback(id, event) {
        var theComponent = $$(id)["component"];
        var callback = null;
        theComponent.publish(theComponent.jumpItemArray[id].event);
        //    theComponent.jumpItemArray[id].callback(theComponent, theComponent.jumpItemArray[id].label);
    }
    getView() {
        var barView = new Array();
        for (var item in this.jumpItemArray) {
            var newItemView = {
                view: "button",
                id: this.jumpItemArray[item].id,
                type: "htmlbutton",
                css: "bt_1",
                label: this.jumpItemArray[item].label,
                value: this.jumpItemArray[item].label
            };
            barView.push(newItemView);
        }
        var newView = this.createView({
            id: this.componentID, cols: barView
        });
        return newView;
    }
    addItem(label, event, type = "danger", callback = null) {
        var newItem = new UIJumpItem();
        newItem.id = "jumpButton_" + webix.uid();
        newItem.label = label;
        newItem.callback = callback;
        newItem.event = event;
        newItem.type = type;
        this.jumpItemArray[newItem.id] = newItem;
    }
    defineEvents() {
        for (var item in this.jumpItemArray) {
            if ($$(this.jumpItemArray[item].id))
                if (!$$(this.jumpItemArray[item].id).hasEvent("onItemClick"))
                    this.attachEvent(this.jumpItemArray[item].id, "onItemClick", UIJumpBar.JumpCallback);
        }
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
        for (var item in this.jumpItemArray) {
            if ($$(item)) {
                $$(item)["component"] = this;
                $$(item)["data"] = this.getData();
            }
        }
    }
}
this.UIJumpBar = UIJumpBar;
class UIToolbar extends UIJumpBar {
    constructor(properties = null) {
        super(properties);
    }
    setToolBar(label, icon) {
        this.label = label;
        this.icon = icon;
    }
    getView() {
        var barView = new Array();
        var theBar = { view: "label", label: this.icon + " " + this.label };
        barView.push(theBar);
        for (var item in this.jumpItemArray) {
            var newItemView = {
                view: "button",
                id: this.jumpItemArray[item].id,
                type: this.jumpItemArray[item].type,
                value: this.jumpItemArray[item].label
            };
            barView.push(newItemView);
        }
        var newView = this.createView({
            id: this.componentID,
            view: "toolbar",
            css: "highlighted_header header3",
            paddingX: 5,
            paddingY: 5,
            height: 40,
            cols: barView
        });
        return newView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
    }
}
this.UIToolbar = UIToolbar;
class UIButton extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.setID("UIButton_");
    }
    onButtonClick(theComponent) {
        this.publish("click", this);
    }
    setComponent(label, value, data, callback) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.color = "background-color : #FF9E9E";
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID,
            view: "button",
            name: this.componentLabel,
            value: this.componentLabel,
            cssFormat: this.color,
        });
        return this.componentView;
    }
    setLabel(theLabel) {
        super.setLabel(theLabel);
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).value = theLabel;
            $$(this.getComponentID()).refresh();
        }
    }
    setColor(value) {
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).$view.getElementsByTagName("button")[0].style.background = value;
            $$(this.getComponentID()).$view.getElementsByTagName("button")[0].style.borderColor = value;
        }
    }
    defineEvents() {
        this.attachEvent(this.componentID, "onItemClick", UIEventHandler.OnButtonClick);
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
}
this.UIButton = UIButton;
class UIDropZone extends UIComponent {
    constructor() {
        super();
        this.setID("UIDropZone_");
    }
    setComponent(label, value, data, callback, updateField = null) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
        this.setInTheZone(false);
    }
    setInTheZone(inZone) {
        if (inZone)
            $$(this.getComponentID()).define("css", "inTheDropZone");
        else
            $$(this.getComponentID()).define("css", "outOfTheDropZone");
    }
    getView() {
        this.componentView = {
            id: this.getComponentID(),
            view: "list",
            minWidth: 100,
            minHeight: 100,
            template: "#title#",
            data: [{ title: "Drop Zone" }],
            drag: "target"
        };
        return this.componentView;
    }
    onBeforeDrop(message) {
        this.setInTheZone(false);
        return false;
    }
    onBeforeDragIn(message) {
        this.setInTheZone(true);
        return true;
    }
    onDragOut(message) {
        this.setInTheZone(false);
        return true;
    }
    defineEvents() {
        this.attachEvent(this.componentID, "onBeforeDrop", UIEventHandler.OnBeforeDrop);
    }
}
this.UIDropZone = UIDropZone;
class UIColorField extends UIField {
    constructor(properties) {
        super(properties);
        this.setID("UIColorField_");
        this.addProperties(properties);
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID, view: "colorpicker"
        });
        return this.componentView;
    }
    defineEvents() {
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
}
this.UIColorField = UIColorField;
class UIDataTableField extends UIComponent {
    //endregion
    constructor() {
        super();
        this.isReference = false;
        this.referenceClassType = "";
        this.mapped = false;
        this.setID("UIDataTableField_");
        this.componentID = "dataTableField_" + webix.uid();
    }
}
this.UIDataTableField = UIDataTableField;
class UIDataTable extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.viewType = "datatable";
        this.theList = null;
        this.editable = false;
        this.editaction = "dblclick";
        this._showToolBar = false;
        this._multiSelect = false;
        this._autoColumnConfigure = false;
        this._showAddDeleteColumns = true;
        this._width = 0;
        this._height = 0;
        this._template = null;
        this.setID("UIDataTable_");
        this.columns = new Array();
        this.dataTableID = "dataTable_" + webix.uid();
        this.showAddDeleteColumns = false;
    }
    get template() {
        return this._template;
    }
    set template(value) {
        this._template = value;
    }
    get showToolBar() {
        return this._showToolBar;
    }
    set showToolBar(value) {
        this._showToolBar = value;
    }
    static MappedColumnLookup(obj) {
    }
    get multiSelect() {
        return this._multiSelect;
    }
    set multiSelect(value) {
        this._multiSelect = value;
    }
    get autoColumnConfigure() {
        return this._autoColumnConfigure;
    }
    set autoColumnConfigure(value) {
        this._autoColumnConfigure = value;
    }
    get showAddDeleteColumns() {
        return this._showAddDeleteColumns;
    }
    set showAddDeleteColumns(value) {
        this._showAddDeleteColumns = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    hideColumn(columnID) {
        if ($$(this.dataTableID))
            $$(this.dataTableID).hideColumn(columnID);
    }
    showColumn(columnID) {
        if ($$(this.dataTableID))
            $$(this.dataTableID).showColumn(columnID);
    }
    newItem() {
        var theComponent = this;
        var objectProxy = Factory.CreateProxyInstance(theComponent.uiClassType);
        var name = "A New " + objectProxy.classLabel();
        var newID = objectProxy.addNew(name);
        var newObject = objectProxy.getOne(newID);
        var newRowID = $$(theComponent.dataTableID).add(newObject);
        $$(theComponent.dataTableID).showItem(newRowID);
        $$(theComponent.dataTableID).select(newRowID, false);
    }
    deleteItem(theToolbar, label) {
        var theComponent = this;
        var rowid = $$(theComponent.dataTableID).getSelectedId();
        if (!rowid)
            return;
        var theObject = $$(theComponent.dataTableID).getItem(rowid);
        theComponent.handleDelete(theObject);
    }
    options() {
        var theComponent = this;
        var rowid = $$(theComponent.dataTableID).getSelectedId();
        if (!rowid)
            return;
        var theObject = $$(theComponent.dataTableID).getItem(rowid);
        theComponent.handleDelete(theObject);
    }
    getSelectedObject() {
        return this.getSelected()[0];
    }
    getSelected() {
        if ($$(this.dataTableID)) {
            var idArray = $$(this.dataTableID).getSelectedItem(true);
            return idArray;
        }
        return null;
    }
    onSelectChange(itemMessage) {
        this.publish("onSelectChange", itemMessage);
    }
    addColumn(columnNumber, theColumn) {
        var newColumn = new UIDataTableField();
        newColumn.view = theColumn;
        newColumn.columnNumber = columnNumber;
        this.columns[columnNumber] = newColumn;
    }
    addMappedColumn(columnNumber, referenceClassField, referenceFieldName, displayFieldName, theColumnView) {
        var newColumn = new UIDataTableField();
        newColumn.mapped = true;
        newColumn.referenceClassField = referenceClassField;
        newColumn.referenceField = referenceFieldName;
        newColumn.displayFieldName = displayFieldName;
        newColumn.view = theColumnView;
        var functionMame = "mapFunction" + webix.uid();
        var mappedFunction = new Function('obj', '{' + 'var objectProxy = Factory.CreateProxyInstance(obj["' + referenceClassField + '"]");' + 'var thisObject = objectProxy.getOne(obj["' + referenceFieldName + '"]);' + 'if (!thisObject) return "Not Found";' + 'return thisObject["' + displayFieldName + '"];' + '}');
        newColumn.template = mappedFunction;
        newColumn.view = theColumnView;
        newColumn.view["_template"] = newColumn.template;
        this.columns[columnNumber] = newColumn;
    }
    addReferenceColumn(columnNumber, referenceClassType, referenceFieldName, theColumnView) {
        var newColumn = new UIDataTableField();
        newColumn.referenceClassType = referenceClassType;
        newColumn.view = theColumnView;
        var objectProxy = Factory.CreateProxyInstance(referenceClassType);
        var optionList = objectProxy.getList(false);
        newColumn.optionList = optionList;
        newColumn.columnNumber = columnNumber;
        var optionArray = new Array();
        for (var item in optionList) {
            var option = new C4Object();
            option["id"] = optionList[item]["id"];
            option[referenceFieldName] = optionList[item][referenceFieldName];
            optionArray.push(option);
        }
        newColumn.view["options"] = optionList;
        //newColumn.view["on"] = { onChange : function() { UI.Message("Select Changed");}}
        this.columns[columnNumber] = newColumn;
    }
    addOptionColumn(columnNumber, optionList, theColumn) {
    }
    setList(theList) {
        this.theList = theList;
        if ($$(this.dataTableID)) {
            $$(this.dataTableID).clearAll();
            $$(this.dataTableID).parse(this.theList);
        }
    }
    setValue(theList) {
        this.setList(theList);
    }
    setEditable(theFlag) {
        this.editable = theFlag;
    }
    onStopEdit(theField) {
        if (this.publish("onStopEdit", theField))
            return;
        if (theField.newValue == theField.oldValue)
            return;
        if (this.uiClassType) {
            var objectProxy = Factory.CreateProxyInstance(this.uiClassType);
            objectProxy.updateAttribute(theField.rowObject._id, theField.columnName, theField.newValue);
        }
    }
    refreshRow(rowID) {
        if ($$(this.dataTableID))
            $$(this.dataTableID).refresh(rowID);
    }
    onBeforeEditStart(theField) {
        if (this.publish("onBeforeEditStart", theField))
            return;
    }
    handleDelete(theObject) {
        UI.Message("Handle Delete" + theObject._id);
    }
    createNavigationBar() {
        this.toolBar = new UIToolbar();
        this.toolBar.addItem("New", "newItem");
        this.toolBar.addItem("Delete", "deleteItem");
        this.toolBar.addItem("Options", "options");
        this.toolBar.addItem("Export", "export");
        this.toolBar.setData(this);
        if (this.uiClassType) {
            this.toolBar.setToolBar(Factory.GetClassLabel(this.uiClassType), Factory.GetClassIcon(this.uiClassType));
        }
    }
    listen(event, object, publisher) {
        switch (event) {
            case "newItem":
            case "deleteItem":
            case "options":
                break;
            case "export":
                this.exportToExcel();
        }
    }
    exportToExcel() {
        UI.ExportToExcel(this.dataTableID);
    }
    getList() {
        if (this.theList)
            return this.theList;
        if (this.uiClassType) {
            var objectProxy = Factory.CreateProxyInstance(this.uiClassType);
            var returnList = objectProxy.getList(true);
            return returnList;
        }
        return new Array();
    }
    createColumnView() {
        var columnView = new Array();
        var i = 0;
        for (var item in this.columns) {
            columnView[this.columns[item].columnNumber] = this.columns[item].view;
            i++;
        }
        if (this.showAddDeleteColumns) {
            columnView[i++] = {
                id: "", template: {
                    view: "button",
                    type: "htmlbutton",
                    label: '<span class="webix_icon fa-angle-left"></span><span class="text">back</span>',
                    inputWidth: 80
                }
            };
            columnView[i++] = { id: "drag", header: "", template: "<div class='webix_drag_handle'></div>", width: 35 };
        }
        return columnView;
    }
    setColumns(columns) {
        var index = 0;
        for (var item in columns) {
            var newColumn = new UIDataTableField();
            newColumn.view = columns[item];
            newColumn.columnNumber = index++;
            this.columns[index] = newColumn;
        }
        if ($$(this.dataTableID)) {
            this.replaceColumns(columns);
        }
    }
    replaceColumns(columns) {
        this.columns = new Array();
        var index = 0;
        for (var item in columns) {
            this.addColumn(index++, columns[item]);
        }
        $$(this.dataTableID).config.columns = this.createColumnView();
        ;
        $$(this.dataTableID).refreshColumns();
    }
    sort(property, sortDirection, type = "string") {
        if ($$(this.dataTableID))
            $$(this.dataTableID).sort(property, sortDirection, type);
    }
    filter(func) {
        $$(this.dataTableID).filter(func);
    }
    getView() {
        this.createNavigationBar();
        var rows = new Array();
        var i = 0;
        if (this._showToolBar) {
            var navBarView = this.toolBar.getView();
            rows[0] = navBarView;
            i++;
        }
        var view = {
            id: this.dataTableID,
            view: this.viewType,
            select: "row",
            navigation: true,
            resizeColumn: true,
            scrollxy: true,
            dragColumn: true,
            editable: this.editable,
            editaction: this.editaction,
        };
        if (this.height > 0) {
            view["height"] = this.height;
        }
        if (this.width > 0) {
            view["width"] = this.width;
        }
        if (this.autoColumnConfigure) {
            view["autoConfig"] = true;
        }
        else
            view["columns"] = this.createColumnView();
        if (this.multiSelect)
            view["multiselect"] = true;
        if (this.template) {
            view["_template"] = this.template;
        }
        this.componentView = this.createView({
            id: this.componentID, type: "space", rows: [view]
        });
        return this.componentView;
    }
    defineEvents() {
        this.attachEvent(this.dataTableID, "onSelectChange", UIEventHandler.onSelectChange);
        this.attachEvent(this.dataTableID, "onAfterEditStop", UIEventHandler.onAfterEditStop);
        this.attachEvent(this.dataTableID, "onItemDblClick", UIEventHandler.OnItemDblClick);
        this.attachEvent(this.dataTableID, "onBeforeEditStart", UIEventHandler.onBeforeEditStartTable);
        this.attachEvent(this.dataTableID, "onItemClick", UIEventHandler.OnItemClick);
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        var resultList = this.getList();
        if (resultList)
            if ($$(this.dataTableID))
                $$(this.dataTableID).parse(resultList);
        if ($$(this.dataTableID))
            $$(this.dataTableID)["component"] = this;
        if (this._showToolBar)
            this.toolBar.initialize();
        this.defineEvents();
    }
    getTableList() {
        var datatable = $$(this.dataTableID);
        var dataList = new Array();
        $$(this.dataTableID).eachRow(function (row) {
            var item = datatable.getItem(row);
            dataList.push(item);
        });
        return dataList;
    }
}
this.UIDataTable = UIDataTable;
class UITreeTable extends UIDataTable {
    constructor(properties = null) {
        super(properties);
        this.setID("UITreeTable_");
        this.columns = new Array();
        this.dataTableID = "treeTable_" + webix.uid();
        this.showAddDeleteColumns = false;
        this.viewType = "treetable";
    }
}
this.UITreeTable = UITreeTable;
class UICalendarField extends UIField {
    constructor(properties = null) {
        super(properties);
        this.setID("UICalendarField_");
    }
    setComponent(label, value, data, callback, updateField = null) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.updateField = updateField;
    }
    getView() {
        this.componentView = {
            id: this.componentID,
            view: "datepicker",
            name: this.componentLabel,
            value: this.getValue(),
            label: this.componentLabel,
            labelWidth: 100,
            events: webix.Date.isHoliday,
            calendarDateFormat: "%Y-%m-%d"
        };
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
    }
}
this.UICalendarField = UICalendarField;
class UIComplexComponent extends UIComponent {
    constructor(properties = null) {
        super(properties);
        this.setID("UIComplexComponent_");
        this.componentArray = new Array();
    }
    addComponent(label, component) {
        this.componentArray[label] = component;
        if (component)
            component.setProperty("name", label);
    }
    createComponentsView() {
        var viewArray = new Array();
        var i = 0;
        for (var item in this.componentArray) {
            if (item != "toolbar")
                viewArray[i++] = this.componentArray[item].getView();
        }
        return viewArray;
    }
    numOfComponents() {
        return Object.keys(this.componentArray).length;
    }
    getComponent(label) {
        var component = this.componentArray[label];
        return component;
    }
    getFieldComponent(label) {
        var component = this.componentArray[label];
        return component;
    }
    defineEvents() { }
    initialize() {
        super.initialize();
        super.defineEvents();
        for (var item in this.componentArray) {
            this.componentArray[item].initialize();
            this.componentArray[item].setData(this);
        }
    }
    destroyView() {
        if ($$(this.componentID))
            $$(this.componentID).destructor();
    }
    destructor() {
        super.destructor();
        for (var item in this.componentArray) {
            this.componentArray[item].destructor();
        }
    }
}
this.UIComplexComponent = UIComplexComponent;
class PortalSection extends UIComponent {
    constructor(name = "noSectionName") {
        super();
        //region Instance Variables
        this.portalSectionIndex = null;
        this.gravity = 1;
        this.portletName = "";
        this.sectionHeader = null;
        this.template = { type: "line" };
        this._scrollBarX = false;
        this._scrollBarY = false;
        this.setID("PortalSection_");
        this.theArray = new Array();
        this.portletName = name;
    }
    //endregion
    //region Class Methods
    static CreateColumns() {
        return new PortalColumn();
    }
    static CreateRows() {
        return new PortalRow();
    }
    static CreateRoot() {
        return new PortalRoot();
    }
    //endregion
    get scrollBarX() {
        return this._scrollBarX;
    }
    set scrollBarX(value) {
        this._scrollBarX = value;
    }
    get scrollBarY() {
        return this._scrollBarY;
    }
    set scrollBarY(value) {
        this._scrollBarY = value;
    }
    addPortlet(name, gravity = 1) {
        var portlet = new Portlet(name, gravity);
        this.theArray.push(portlet);
        return portlet;
    }
    addSection(theSection, gravity = 1) {
        this.theArray.push(theSection);
        this.gravity = gravity;
    }
    addResizer() {
        var resizer = new PortalResizer();
        this.theArray.push(resizer);
        return resizer;
    }
    addHeader(title) {
        var header = new PortalHeader(title);
        this.theArray.unshift(header);
        this.sectionHeader = header;
        return header;
    }
    removeHeader() {
        if (!this.sectionHeader)
            return;
        this.theArray.shift();
    }
    //region UIComponent Methods
    getView() {
        this.template["gravity"] = this.gravity;
        this.template["id"] = this.componentID;
        this.template["drag"] = true;
        if (this.scrollBarX && this.scrollBarY) {
            this.template["scrollxy"] = true;
        }
        else if (this.scrollBarX)
            this.template["scrollx"] = true;
        else if (this.scrollBarY)
            this.template["scrolly"] = true;
        return this.template;
    }
    defineEvents() {
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
        for (var item in this.theArray) {
            this.theArray[item].initialize();
        }
    }
}
//endregion
//region Class Variables
PortalSection.COLUMNS = "cols";
PortalSection.ROWS = "rows";
PortalSection.RESIZER = "resizer";
PortalSection.ROOT = "root;";
PortalSection.HEADER = "header";
PortalSection.PORTLET = "portlet";
this.PortalSection = PortalSection;
class PortalColumn extends PortalSection {
    constructor(name) {
        super(name);
        this.portalSectionIndex = PortalSection.COLUMNS;
        this.classType = PortalSection.COLUMNS;
        this.setID("PortalColumn_");
    }
}
this.PortalColumn = PortalColumn;
class PortalRoot extends PortalSection {
    constructor(name) {
        super(name);
        this.portalSectionIndex = PortalSection.ROOT;
        this.classType = "root";
        this.setID("PortalRoot_");
    }
}
this.PortalRoot = PortalRoot;
class PortalRow extends PortalSection {
    constructor(name) {
        super(name);
        this.portalSectionIndex = PortalSection.ROWS;
        this.classType = "row";
        this.setID("PortalRow_");
    }
}
this.PortalRow = PortalRow;
class PortalHeader extends PortalSection {
    constructor(title) {
        super();
        this.headerTemplate = { view: "template", template: "Header", type: "header" };
        this.headerText = null;
        this.setID("PortalHeader_");
        this.portalSectionIndex = PortalSection.HEADER;
        this.classType = PortalSection.HEADER;
        this.headerTemplate["id"] = "header_" + webix.uid();
        this.headerTemplate["template"] = title;
        this.headerText = title;
    }
    getView() {
        return this.headerTemplate;
    }
}
this.PortalHeader = PortalHeader;
class PortalResizer extends PortalSection {
    constructor(name) {
        super(name);
        this.resizerTemplate = { view: "resizer" };
        this.setID("PortalResizer_");
        this.portalSectionIndex = PortalSection.RESIZER;
        this.classType = PortalSection.RESIZER;
        this.resizerTemplate["id"] = "uiResizer_" + webix.uid();
    }
    getView() {
        return this.resizerTemplate;
    }
}
this.PortalResizer = PortalResizer;
class Portlet extends PortalSection {
    constructor(portletName, gravity = 1) {
        super(portletName);
        this.nonComponentView = null;
        this.hidden = false;
        this.gravity = gravity;
        this.portletView = { id: this.componentID, minWidth: 100, template: "Content", view: "template" };
        this.portletComponentView = { type: "line" };
        this.defaultPortletView = this.portletView;
        this.portalSectionIndex = PortalSection.PORTLET;
        this.setID("Portlet_");
    }
    //endregion
    static cast(aSection) {
        return aSection;
    }
    replaceView() {
        // console.log(JSON.stringify(this.getView(), null, 6));
        webix.ui(this.getView(), $$(this.componentID));
        this.initialize();
        // console.log(JSON.stringify(this.getView(), null, 6));
    }
    hide() {
        this.hidden = true;
    }
    show() {
        this.hidden = false;
    }
    resetView() {
        this.portletView = this.defaultPortletView;
    }
    setComponent(theComponent) {
        this.viewController = theComponent;
    }
    resize() {
        if ($$(this.componentID)) {
            $$(this.componentID).resize();
        }
    }
    //region UIComponents Methods
    getView() {
        if (this.viewController) {
            var viewArray = new Array();
            this.portletView = this.portletComponentView;
            var controllerView = this.viewController.getView();
            viewArray[0] = controllerView;
            this.portletView["rows"] = viewArray;
        }
        else {
            this.portletView = this.defaultPortletView;
        }
        this.portletView["id"] = this.getComponentID();
        this.portletView["gravity"] = this.gravity;
        this.portletView["drag"] = true;
        return this.portletView;
    }
    defineEvents() {
    }
    initialize() {
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
}
this.Portlet = Portlet;
var PortalType;
(function (PortalType) {
    PortalType[PortalType["OneView"] = 0] = "OneView";
    PortalType[PortalType["ExplorerView"] = 1] = "ExplorerView";
    PortalType[PortalType["DetailView"] = 2] = "DetailView";
})(PortalType || (PortalType = {}));
this.PortalType = PortalType;
var PortalNames;
(function (PortalNames) {
    PortalNames[PortalNames["EXPLORER"] = 0] = "EXPLORER";
    PortalNames[PortalNames["DETAIL"] = 1] = "DETAIL";
    PortalNames[PortalNames["MAIN"] = 2] = "MAIN";
    PortalNames[PortalNames["INFO"] = 3] = "INFO";
})(PortalNames || (PortalNames = {}));
this.PortalNames = PortalNames;
class Portal extends UIComponent {
    constructor(portalType) {
        super();
        this.portalContainer = null;
        this.viewPortlet = null;
        this.newViewPort = false;
        this.viewType = null;
        this.sectionTemplate = { type: "line" };
        this.setID("Portal_");
        this.portalRoot = new PortalRoot();
        if (!portalType) {
            switch (portalType) {
                case PortalType.OneView:
                    {
                        this.initializeOneView();
                    }
                    break;
                case PortalType.ExplorerView:
                    {
                        this.initializeExplorerView();
                    }
                    break;
                case PortalType.DetailView:
                    {
                        this.initializeDetailView();
                    }
                    break;
            }
        }
    }
    portalString(portalNames) {
        switch (portalNames) {
            case PortalNames.EXPLORER:
                return "explorer";
            case PortalNames.DETAIL:
                return "detailArea";
            case PortalNames.MAIN:
                return "main";
            case PortalNames.INFO:
                return "info";
            default:
                return "NONAME";
        }
    }
    initializeExplorerView() {
        var root = this.getRoot();
        var newColumn = this.createColumns("columns");
        var newRow = this.createRows("rows");
        root.addSection(newColumn);
        newColumn.addPortlet(PortalNames.EXPLORER);
        newColumn.addResizer();
        newRow.addPortlet(PortalNames.DETAIL);
        newRow.addResizer();
        newRow.addPortlet(PortalNames.INFO);
        newColumn.addSection(newRow);
    }
    initializeOneView() {
        var root = this.getRoot();
        var newColumn = this.createColumns("columns");
        root.addSection(newColumn);
        newColumn.addPortlet(this.portalString(PortalNames.MAIN));
    }
    initializeDetailView() {
        var root = this.getRoot();
        var newRow = this.createRows("rows");
        root.addSection(newRow);
        newRow.addPortlet(this.portalString(PortalNames.DETAIL));
        newRow.addResizer();
        newRow.addPortlet(this.portalString(PortalNames.INFO));
    }
    getRoot() {
        return this.portalRoot;
    }
    createColumns(name) {
        return new PortalColumn(name);
    }
    createRows(name) {
        return new PortalRow(name);
    }
    setContainer(containerID) {
        this.portalContainer = containerID;
        this.viewPortlet = null;
    }
    setViewPortlet(thePortlet) {
        this.viewPortlet = thePortlet;
        this.portalContainer = "";
    }
    getPortlet(portalName) {
        return Portlet.cast(this.find(this.portalRoot, portalName));
    }
    find(portalSection, name) {
        for (var item in portalSection.theArray) {
            if (portalSection.theArray[item].portletName == name)
                return portalSection.theArray[item];
            var result = this.find(portalSection.theArray[item], name);
            if (result)
                return result;
        }
        return null;
    }
    getView() {
        var viewArray = new Array();
        var theView = this.sectionTemplate;
        theView["id"] = this.getComponentID();
        viewArray[0] = this.createPortalView();
        theView["rows"] = viewArray;
        if (this.viewType)
            theView["view"] = this.viewType;
        this.setComponentView(theView);
        return this.componentView;
    }
    createPortalView() {
        var thePortalView;
        var resultArray = this.tree(this.portalRoot);
        return resultArray[0];
    }
    tree(portalSection) {
        var returnArray = new Array();
        for (var item in portalSection.theArray) {
            index = PortalSection.ROWS;
            if (portalSection.theArray[item].portalSectionIndex)
                if (portalSection.theArray[item].portalSectionIndex == PortalSection.COLUMNS || portalSection.theArray[item].portalSectionIndex == PortalSection.ROWS)
                    var index = portalSection.theArray[item].portalSectionIndex;
            var result = portalSection.theArray[item].getView();
            if (portalSection.theArray[item].theArray.length > 0) {
                var resultArray = this.tree(portalSection.theArray[item]);
                result[index] = resultArray;
            }
            returnArray.push(result);
        }
        return returnArray;
    }
    initializeTree() {
        var returnArray = new Array();
        for (var item in this.portalRoot.theArray) {
            this.portalRoot.theArray[item].initialize();
        }
        return returnArray;
    }
    refresh() {
        this.show();
    }
    show(theWindow) {
        var showView = this.getView();
        var xView;
        if (theWindow) {
            var rows = new Array();
            rows[0] = showView;
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
        }
        else {
            AppLog.printThis(showView);
            xView = webix.ui(showView, $$(this.componentID));
        }
        this.initialize();
        //console.log("Show View");
        //C4log.printThis(showView);
        return xView;
    }
    popup(theWindow) {
        var showView = this.getView();
        var rows = new Array();
        rows[0] = showView;
        theWindow["body"] = C4Object.Clone(showView);
        //console.log(JSON.stringify(theWindow));
        var newWindow = webix.ui(theWindow);
        return newWindow;
    }
    defineEvents() {
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
        this.initializeTree();
    }
}
this.Portal = Portal;
class UIPopupWindow extends UIComplexComponent {
    //endregion
    constructor(label = "Popup Window", theComponent = null) {
        super();
        this.resize = false;
        this.modal = true;
        this.thePortal = new Portal();
        this.closeButtonID = "closeButton_" + webix.uid();
        this.fullscreenID = "fullScreenID_" + webix.uid();
        this.width = 500;
        this.height = 500;
        this.addProperties({ width: this.width, height: this.height });
        this.setID("UIPopupWindow_");
        var portalRoot = this.thePortal.getRoot();
        var rows = this.thePortal.createRows();
        rows.addPortlet("main");
        portalRoot.addSection((rows));
        this.setComponent(theComponent);
        this.componentLabel = label;
    }
    static CloseButton() {
        var theID = this["config"].id;
        var theComponent = $$(theID)["component"];
        $$(theComponent.getComponentID()).close();
    }
    static FullScreen() {
        var theID = this["config"].id;
        var theComponent = $$(theID)["component"];
        theComponent.fullscreenToggle();
    }
    setComponent(theComponent) {
        this.theComponent = theComponent;
        this.thePortal.getPortlet("main").setComponent(theComponent);
        this.addComponent("component", theComponent);
    }
    show(theComponent) {
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
    fullscreenToggle() {
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).config.fullscreen = !$$(this.getComponentID()).config.fullscreen;
            $$(this.getComponentID()).resize();
        }
    }
    hide() {
        this.publish("close", this);
        UI.PlaySound(Sounds.CloseDiagram);
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).hide();
        }
    }
    close() {
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
    getView() {
        this.componentView = this.createView({
            view: "window",
            id: this.componentID,
            css: "c4popup animated zoomIn",
            position: "center",
            modal: true,
            move: true,
            scrollxy: true,
            hidden: true,
            resize: true,
            head: {
                view: "toolbar", margin: -4, position: "center", cols: [
                    { view: "label", label: this.componentLabel },
                    { view: "icon", id: this.fullscreenID, icon: "arrows-alt", css: "alter", click: UIPopupWindow.FullScreen },
                    { view: "icon", id: this.closeButtonID, icon: "times-circle", css: "alter", click: UIPopupWindow.CloseButton }
                ]
            },
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        // this.theComponent.initialize();
        $$(this.closeButtonID)["component"] = this;
        $$(this.fullscreenID)["component"] = this;
        $$(this.componentID)["component"] = this;
    }
}
this.UIPopupWindow = UIPopupWindow;
class ConfirmAction {
}
this.ConfirmAction = ConfirmAction;
class UIConfirmWindow extends UIComplexComponent {
    constructor(title, statement, option1, option2 = null, option3 = null) {
        super();
        this.title = title;
        this.statement = statement;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
    }
    close() {
        this.popup.close();
    }
    listen(event, object, caller) {
        switch (event) {
            case "click":
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
            case "close":
                {
                    this.publish("close", null);
                }
        }
    }
    getView() {
        var title = new UILabel({ label: this.title, alignment: "center", labelWidth: 100 });
        this.addComponent("title", title);
        var text = new UILabel({ label: this.statement, alignment: "center", labelWidth: 100 });
        this.addComponent("text", text);
        var option1 = new UIButton({ label: this.option1.label });
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
    show() {
        this.popup = new UIPopupWindow("Confirmation", this);
        this.popup.subscribe("close", this);
        this.popup.show();
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() {
        this.getComponent("option1").subscribe("click", this);
        if (this.getComponent("option2"))
            this.getComponent("option2").subscribe("click", this);
        if (this.getComponent("option3"))
            this.getComponent("option3").subscribe("click", this);
    }
}
this.UIConfirmWindow = UIConfirmWindow;
class UIMultiView extends UIComplexComponent {
    constructor() {
        super();
        this.setID("UIMultiView_");
    }
    addView(label, component) {
        this.addComponent(label, component);
    }
    setRelationshipObject(theObject) {
        super.setRelationshipObject(theObject);
        for (var item in this.componentArray[item]) {
            this.componentArray[item].setRelationshipObject(this.getRelationshipObject());
        }
    }
    createComponentsView() {
        var viewArray = new Array();
        var i = 0;
        for (var item in this.componentArray) {
            if (item != "toolbar")
                viewArray[i++] = {
                    header: item, body: this.componentArray[item].getView()
                };
        }
        return viewArray;
    }
    getView() {
        this.componentView = {
            id: this.getComponentID(), view: "tabview", animate: true, cells: this.createComponentsView()
        };
        return this.componentView;
    }
}
this.UIMultiView = UIMultiView;
class UIMenu extends UIComplexComponent {
    constructor(properties = null) {
        super(properties);
        this.menuItems = new Array();
    }
    addMenuItem(menu) {
        menu["id"] = webix.uid() + "_menu";
        this.menuItems.push(menu);
    }
}
this.UIMenu = UIMenu;
class TabViewCell {
}
class UITabView extends UIComplexComponent {
    constructor(properties = null) {
        super(properties);
        this.animate = true;
        this.closeAble = true;
        this.fitBiggest = true;
        this.setID("UITabView_");
        this.cells = new Array();
    }
    addView(name, properties, component) {
        var cell = new TabViewCell();
        cell.properties = properties;
        cell.component = component;
        cell.name = name;
        this.cells[name] = cell;
        this.addComponent(name, component);
    }
    listen(event, data, caller) {
        switch (event) {
            case "eventName":
            default:
                UI.Info(event);
                break;
        }
    }
    createCells() {
        var cellArray = new Array();
        for (var item in this.cells) {
            var cell = { body: this.cells[item].component.getView() };
            for (var property in this.cells[item].properties) {
                cell[property] = this.cells[item].properties[property];
            }
            cellArray.push(cell);
        }
        return cellArray;
    }
    getView() {
        this.componentView = this.createView({
            id: this.componentID,
            view: "tabview",
            multiview: { animate: this.animate, fitBiggest: this.fitBiggest },
            close: this.closeAble,
            tabbar: { popupWidth: 300, tabMinWidth: 120 },
            cells: this.createCells()
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() { }
    show() {
        this.popup = new UIPopupWindow("Component Label ");
        this.popup.show(this);
    }
}
this.UITabView = UITabView;
Factory.AddStringToClass("UITabView", UITabView);
class UIList extends UIComplexComponent {
    constructor(properties = null) {
        super(properties);
        this.columnName = null;
        this.table = null;
        this.dataArray = null;
        this.setID("UIList_");
    }
    setList(data) {
    }
    listen(event, data, caller) {
        switch (event) {
            case "itemClick": {
                this.itemChange(data);
            }
            default:
                UI.Info(event);
                break;
        }
    }
    itemChange(item) {
        var status = item.objectArray[0]["status"];
        item.objectArray[0]["status"] = !status;
        this.getComponent("table").refreshRow(item.rowID);
        this.publish("itemChange", item);
    }
    set(name, dataArray) {
        this.columnName = name;
        this.dataArray = dataArray;
    }
    getView() {
        this.table = new UIDataTable();
        this.table.addColumn(0, { id: "status", header: "Active", width: 40, css: "center", type: "value",
            template: function (obj, type, value) {
                if (value)
                    return "<span class='webix_table_checkbox webix_icon fa-eye'></span>";
                else
                    return "<span class='webix_table_checkbox webix_icon fa-eye-slash'></span>";
            }
        });
        this.table.addColumn(1, { id: "value", header: this.columnName, fillspace: 1 });
        this.table.setList(this.dataArray);
        this.addComponent("table", this.table);
        this.componentView = this.createView({
            id: this.componentID,
            view: "form",
            rows: [this.getComponent("table").getView()]
        });
        return this.componentView;
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        this.defineEvents();
    }
    defineEvents() {
        if (this.getComponent("table")) {
            this.getComponent("table").subscribe("onItemClick", this, "itemClick");
        }
    }
    show() {
        this.popup = new UIPopupWindow(this.columnName + " List ");
        this.popup.modal = false;
        this.popup.show(this);
    }
}
this.UIList = UIList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUJfR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQUJfR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQVF4RSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUVyQjtBQU9BLENBQUM7QUFFRDtJQUNDLE9BQWMsZUFBZSxLQUFLLENBQUM7SUFDbkMsT0FBYyxZQUFZLENBQUMsUUFBWSxFQUFFLFFBQVE7UUFDaEQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFlBQVksR0FBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25FLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxPQUFjLGlCQUFpQixDQUFDLE9BQU87UUFDdEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksV0FBdUIsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsTUFBTSxHQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMs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LENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7WUFDMUYsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDRixDQUFDO0lBQ00sSUFBSTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBQ00sS0FBSztRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckQsQ0FBQztRQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDRixDQUFDO0lBQ0QsNEJBQTRCO0lBQ3JCLE9BQU87UUFDYixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxFQUFNLFFBQVE7WUFDbEIsRUFBRSxFQUFRLElBQUksQ0FBQyxXQUFXO1lBQzFCLEdBQUcsRUFBTyx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFLLElBQUk7WUFDZCxJQUFJLEVBQU0sSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFJLElBQUk7WUFDZCxNQUFNLEVBQUksSUFBSTtZQUNkLElBQUksRUFBTTtnQkFDVCxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtvQkFDckQsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFDO29CQUMzQyxFQUFDLElBQUksRUFBRyxNQUFNLEVBQUMsRUFBRSxFQUFHLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxFQUFHLFlBQVksRUFBQyxHQUFHLEVBQUksT0FBTyxFQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFDO29CQUNoRyxFQUFDLElBQUksRUFBRyxNQUFNLEVBQUMsRUFBRSxFQUFHLElBQUksQ0FBQyxhQUFhLEVBQUMsSUFBSSxFQUFHLGNBQWMsRUFBQyxHQUFHLEVBQUksT0FBTyxFQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsV0FBVyxFQUFDO2lCQUN2SDthQUNEO1NBQ0QsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDM0IsQ0FBQztJQUNNLFVBQVU7UUFDaEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQixrQ0FBa0M7UUFDbEMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDM0MsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDMUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBSyxJQUFJLENBQUM7SUFDNUMsQ0FBQztBQUVGLENBQUM7QUFBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVyQztBQUdBLENBQUM7QUFBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVyQyw4QkFBOEIsa0JBQWtCO0lBUS9DLFlBQVksS0FBWSxFQUFFLFNBQWdCLEVBQUUsT0FBcUIsRUFBRSxPQUFPLEdBQWlCLElBQUksRUFBRSxPQUFPLEdBQWlCLElBQUk7UUFDNUgsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBTyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBSyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBSyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBSyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVNLEtBQUs7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBUyxFQUFFLE1BQVUsRUFBRSxNQUFrQjtRQUN0RCxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxPQUFPO2dCQUNaLENBQUM7b0JBQ0EsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0YsQ0FBQztnQkFDQSxLQUFLLENBQUM7WUFDUCxLQUFLLE9BQU87Z0JBQ1osQ0FBQztvQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBQ00sT0FBTztRQUNiLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNwQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtTQUMxRSxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBQ00sSUFBSTtRQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDTSxVQUFVO1FBQ2hCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDTSxZQUFZO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUNGLENBQUM7QUFBQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQTtBQUV4QywwQkFBMEIsa0JBQWtCO0lBQzNDO1FBQ0MsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQVksRUFBRSxTQUFxQjtRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ00scUJBQXFCLENBQUMsU0FBYTtRQUN6QyxLQUFLLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLENBQUM7SUFDRixDQUFDO0lBQ00sb0JBQW9CO1FBQzFCLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7Z0JBQ3JCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHO29CQUNoQixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtpQkFDdkQsQ0FBQTtRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFDTSxPQUFPO1FBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNwQixFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1NBQzdGLENBQUE7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0FBRUYsQ0FBQztBQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBRWpDLHFCQUFxQixrQkFBa0I7SUFJdEMsWUFBWSxVQUFVLEdBQUcsSUFBSTtRQUM1QixNQUFNLFVBQVUsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztJQUNuQyxDQUFDO0lBQ00sV0FBVyxDQUFDLElBQVU7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztBQUNGLENBQUM7QUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUV2QjtBQUlBLENBQUM7QUFFRCx3QkFBeUIsa0JBQWtCO0lBUTFDLFlBQVksVUFBVSxHQUFTLElBQUk7UUFDbEMsTUFBTSxVQUFVLENBQUMsQ0FBQztRQU5aLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBRTlCLGNBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBQzlCLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFJcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFlLENBQUM7SUFDdkMsQ0FBQztJQUNNLE9BQU8sQ0FBQyxJQUFhLEVBQUUsVUFBZ0IsRUFBRSxTQUE4QjtRQUM3RSxJQUFJLElBQUksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNO1FBQ2hDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLFdBQVcsQ0FBQztZQUNqQjtnQkFDQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLEtBQUssQ0FBQztRQUNSLENBQUM7SUFDRixDQUFDO0lBQ00sV0FBVztRQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFHLENBQUE7WUFDM0QsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUNNLE9BQU87UUFDYixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsRUFBRSxFQUFVLElBQUksQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBUSxTQUFTO1lBQ3JCLFNBQVMsRUFBRyxFQUFFLE9BQU8sRUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BFLEtBQUssRUFBTyxJQUFJLENBQUMsU0FBUztZQUMxQixNQUFNLEVBQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7WUFDaEQsS0FBSyxFQUFPLElBQUksQ0FBQyxXQUFXLEVBQUU7U0FFOUIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDM0IsQ0FBQztJQUNNLFVBQVU7UUFDaEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNNLFlBQVksS0FBSSxDQUFDO0lBQ2pCLElBQUk7UUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztBQUNGLENBQUM7QUFBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM3QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRWpELHFCQUFxQixrQkFBa0I7SUFPdEMsWUFBWSxVQUFVLEdBQVMsSUFBSTtRQUNsQyxNQUFNLFVBQVUsQ0FBQyxDQUFDO1FBTFosZUFBVSxHQUFjLElBQUksQ0FBQztRQUM3QixVQUFLLEdBQXdCLElBQUksQ0FBQztRQUNsQyxjQUFTLEdBQWlCLElBQUksQ0FBQztRQUlyQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBaUI7SUFFaEMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU07UUFDaEMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssV0FBVyxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNEO2dCQUNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsS0FBSyxDQUFDO1FBQ1IsQ0FBQztJQUNGLENBQUM7SUFDTSxVQUFVLENBQUMsSUFBd0I7UUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ00sR0FBRyxDQUFDLElBQWEsRUFBRSxTQUFzQjtRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBQ00sT0FBTztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRyxPQUFPO1lBQzdGLFFBQVEsRUFBRSxVQUFTLEdBQUcsRUFBQyxJQUFJLEVBQUMsS0FBSztnQkFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNULE1BQU0sQ0FBQyw4REFBOEQsQ0FBQztnQkFDdkUsSUFBSTtvQkFDSCxNQUFNLENBQUMsb0VBQW9FLENBQUM7WUFDOUUsQ0FBQztTQUNELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUcsTUFBTSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsRUFBRSxFQUFHLElBQUksQ0FBQyxXQUFXO1lBQ3JCLElBQUksRUFBRyxNQUFNO1lBQ2IsSUFBSSxFQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM3QyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBRU0sVUFBVTtRQUNoQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3JGLENBQUM7SUFDRixDQUFDO0lBQ00sSUFBSTtRQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztBQUNGLENBQUM7QUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XG5kZWNsYXJlIHZhciB0b2FzdHI6YW55O1xuZGVjbGFyZSB2YXIgQzRmb3VyOmFueTtcbmRlY2xhcmUgdmFyIGZpbmRDbGFzc1R5cGU6YW55O1xuZGVjbGFyZSB2YXIgZmluZElEOmFueTtcbmRlY2xhcmUgdmFyIEZpbmRJVDphbnk7XG5cbmRlY2xhcmUgdmFyIGJ1eno6YW55O1xuY29uc29sZS5sb2coXCJMb2FkaW5nIGd1aS50cyAuLi5cIik7XG5maW5kQ2xhc3NUeXBlID0gbnVsbDtcblxuY2xhc3MgRHJvcE1lc3NhZ2Uge1xuXHRwdWJsaWMgZnJvbU9iamVjdHM6QXJyYXk8YW55Pjtcblx0cHVibGljIGZyb21Db21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdHB1YmxpYyB0b0NvbXBvbmVudDpVSUNvbXBvbmVudDtcblx0cHVibGljIHRvT2JqZWN0OmFueTtcblx0cHVibGljIGNvbnRleHQ6YW55O1xuXHRwdWJsaWMgZXY6YW55O1xufVxuXG5jbGFzcyBVSUV2ZW50SGFuZGxlciB7XG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlclRhYkNsaWNrKCkgeyB9XG5cdHB1YmxpYyBzdGF0aWMgRmllbGRDaGFuZ2VkKG5ld1ZhbHVlOmFueSwgb2xkVmFsdWUpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50SUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdHZhciB0aGVDb21wb25lbnQgICA9IDxVSVRleHRGaWVsZD4gJCQodGhlQ29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHRoZUNvbXBvbmVudC5maWVsZENoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpOkRyb3BNZXNzYWdlIHtcblx0XHR2YXIgZnJvbUlEOnN0cmluZztcblx0XHR2YXIgZnJvbUNvbXBvbmVudDpVSUNvbXBvbmVudDtcblx0XHR2YXIgdG9Db21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdFx0dmFyIGFycmF5T2ZPYmplY3RzID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgdG9PYmplY3Q7XG5cdFx0ZnJvbUlEICAgPSBjb250ZXh0W1wiZnJvbVwiXS5jb25maWcuaWQ7XG5cdFx0dmFyIHRvSUQgPSBjb250ZXh0W1widG9cIl0uY29uZmlnLmlkO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29udGV4dC5zb3VyY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdGFycmF5T2ZPYmplY3RzLnB1c2goY29udGV4dC5mcm9tLmdldEl0ZW0oY29udGV4dC5zb3VyY2VbaV0pKTtcblx0XHR9XG5cdFx0aWYgKCQkKGZyb21JRCkpIGZyb21Db21wb25lbnQgPSAkJChmcm9tSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdGlmICgkJCh0b0lEKSkgdG9Db21wb25lbnQgPSAkJCh0b0lEKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBuZXcgRHJvcE1lc3NhZ2UoKTtcblx0XHRkcm9wTWVzc2FnZS5mcm9tQ29tcG9uZW50ID0gZnJvbUNvbXBvbmVudDtcblx0XHRkcm9wTWVzc2FnZS50b0NvbXBvbmVudCAgID0gdG9Db21wb25lbnQ7XG5cdFx0ZHJvcE1lc3NhZ2UuZnJvbU9iamVjdHMgICA9IGFycmF5T2ZPYmplY3RzO1xuXHRcdGlmIChjb250ZXh0LnRhcmdldCA9PSBudWxsKVxuXHRcdFx0ZHJvcE1lc3NhZ2UudG9PYmplY3QgPSBudWxsOyBlbHNlIHtcblx0XHRcdGRyb3BNZXNzYWdlLnRvT2JqZWN0ID0gJCQodG9JRCkuZ2V0SXRlbShjb250ZXh0LnRhcmdldC5yb3cpO1xuXHRcdH1cblx0XHRkcm9wTWVzc2FnZS5jb250ZXh0ID0gY29udGV4dDtcblx0XHRkcm9wTWVzc2FnZS5ldiAgICAgID0gbnVsbDtcblx0XHRyZXR1cm4gZHJvcE1lc3NhZ2U7XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkJlZm9yZURyYWdJbihjb250ZXh0LCBldmVudCkge1xuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcmFnSW4gPT0gJ2Z1bmN0aW9uJylcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyYWdJbihkcm9wTWVzc2FnZSk7IGVsc2Uge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc3RhdGljIG9uRHJhZ091dChjb250ZXh0LCBldmVudCkge1xuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xuXHRcdFVJLkluZm8oXCJPbkRyYWdPdXQgU3RhdGljXCIpXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQgPT0gJ2Z1bmN0aW9uJylcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cHVibGljIHN0YXRpYyBvbkJlZm9yZURyb3AoY29udGV4dCwgZXYpIHtcblxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlckRyb3AyKGNvbnRleHQsIGV2KSB7XG5cblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJEcm9wKGNvbnRleHQsIGV2ZW50KSB7XG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkFmdGVyRHJvcCA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQWZ0ZXJEcm9wKGRyb3BNZXNzYWdlKTsgZWxzZSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25CdXR0b25DbGljayhpZDpzdHJpbmcsIGV2ZW50KSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudElEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHRpZiAoISQkKHRoZUNvbXBvbmVudElEKSkgcmV0dXJuO1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlCdXR0b24+ICQkKHRoZUNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXTtcblx0XHR0aGVDb21wb25lbnQub25CdXR0b25DbGljayh0aGVDb21wb25lbnQpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25EcmFnT3V0KGNvbnRleHQsIGV2ZW50KSB7XG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQgPT0gJ2Z1bmN0aW9uJylcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkJlZm9yZURyb3AoY29udGV4dCwgZXZlbnQpIHtcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJvcCA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJvcChkcm9wTWVzc2FnZSk7IGVsc2Uge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQ2xpY2soZXY6YW55LCBpZDpzdHJpbmcpIHtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uSXRlbURibENsaWNrKGlkLGV2LG5vZGUpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIHNlbGVjdGVkT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKGlkLnJvdyk7XG5cdFx0dmFyIGl0ZW1NZXNzYWdlID0gbmV3IEl0ZW1TZWxlY3RlZEV2ZW50KCk7XG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5LnB1c2goc2VsZWN0ZWRPYmplY3QpO1xuXHRcdHRoZUNvbXBvbmVudC5vbkl0ZW1EYmxDbGljayhpdGVtTWVzc2FnZSkgO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25JdGVtQ2xpY2soaWQ6YW55LCBldjphbnksIG5vZGU6YW55KSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciBzZWxlY3RlZE9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShpZC5yb3cpO1xuXHRcdHZhciBpdGVtTWVzc2FnZSA9IG5ldyBJdGVtU2VsZWN0ZWRFdmVudCgpO1xuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheS5wdXNoKHNlbGVjdGVkT2JqZWN0KTtcblx0XHRpdGVtTWVzc2FnZS5yb3dJRCA9IGlkLnJvdztcblx0XHR0aGVDb21wb25lbnQub25JdGVtQ2xpY2soaXRlbU1lc3NhZ2UpIDtcblx0fVxuXHRwdWJsaWMgc3RhdGljIG9uU2VsZWN0Q2hhbmdlKCkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgcm93aWQgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSWQodHJ1ZSk7XG5cdFx0dmFyIHNlbGVjdGVkT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKHJvd2lkKTtcblx0XHR0aGVDb21wb25lbnQub25TZWxlY3RDaGFuZ2Uocm93aWQsIHNlbGVjdGVkT2JqZWN0KVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgb25BZnRlckVkaXRTdG9wKHN0YXRlLCBlZGl0b3IsIGlnbm9yZVVwZGF0ZSkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgdGhlQ29sdW1uICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcblx0XHR0aGVDb2x1bW4uY29sdW1uTmFtZSA9IGVkaXRvci5jb2x1bW47XG5cdFx0dGhlQ29sdW1uLm9sZFZhbHVlICAgPSBzdGF0ZS5vbGQ7XG5cdFx0dGhlQ29sdW1uLm5ld1ZhbHVlICAgPSBzdGF0ZS52YWx1ZTtcblx0XHR0aGVDb2x1bW4ucm93T2JqZWN0ICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShlZGl0b3Iucm93KTtcblx0XHR0aGVDb2x1bW4uZWRpdG9yICAgICA9IGVkaXRvcjtcblx0XHR0aGVDb21wb25lbnQub25TdG9wRWRpdCh0aGVDb2x1bW4pO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgb25CZWZvcmVFZGl0U3RhcnRUYWJsZShpZCA6IGFueSkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgcm93ID0gaWQucm93O1xuXHRcdHZhciBjb2x1bW4gPSBpZC5jb2x1bW47XG5cdFx0dmFyIHJvd0l0ZW0gPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKS5nZXRJdGVtKHJvdyk7XG5cdFx0dmFyIHRoZUNvbHVtbiAgICA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XG5cblx0XHR0aGVDb2x1bW4uY29sdW1uTmFtZSA9IGNvbHVtbjtcblx0XHR0aGVDb2x1bW4ub2xkVmFsdWUgPSBudWxsO1xuXHRcdHRoZUNvbHVtbi5uZXdWYWx1ZSA9IG51bGw7XG5cdFx0dGhlQ29sdW1uLnJvd09iamVjdCA9IHJvd0l0ZW07XG5cdFx0dGhlQ29tcG9uZW50Lm9uQmVmb3JlRWRpdFN0YXJ0KHRoZUNvbHVtbik7XG5cblx0XHRpZiAocm93SXRlbVtcImJlZm9yZUVkaXRTdGFydFJldHVyblwiXSE9bnVsbCkgcmV0dXJuIHJvd0l0ZW1bXCJiZWZvcmVFZGl0U3RhcnRSZXR1cm5cIl07XG5cblx0XHRyZXR1cm4gIXJvd0l0ZW1bY29sdW1uK1wiUmVhZE9ubHlcIl07XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkNoYW5nZShuZXd2LCBvbGR2KSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHRoZUNvbXBvbmVudC5vbkNoYW5nZShuZXd2LCBvbGR2KTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE1lbnVIYW5kbGVyKGlkLCBjb250ZXh0KSB7XG5cdFx0dmFyIHRoZUlEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJQ29udGV4dE1lbnU+ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIganVtcEl0ZW0gPSB0aGVDb21wb25lbnQuZ2V0TWVudUl0ZW0oaWQpO1xuXHRcdHZhciB0aGVPYmplY3QgPSB0aGVDb21wb25lbnQub3duaW5nQ29tcG9uZW50LmdldFNlbGVjdGVkT2JqZWN0KCk7XG5cdFx0aWYgKCFqdW1wSXRlbS5jYWxsYmFjaykgcmV0dXJuO1xuXHRcdGp1bXBJdGVtLmNhbGxiYWNrKGlkLCB0aGVDb21wb25lbnQsIHRoZU9iamVjdCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkFmdGVyU2VsZWN0KGlkOmFueSkge1xuXHRcdHZhciB0aGVJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0aWYgKCEkJCh0aGVJRCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgdGhlTm9kZSA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpLmdldEl0ZW0oaWQucm93KTtcblx0XHRpZiAoIXRoZU5vZGUpIHtcblx0XHRcdFVJLk1lc3NhZ2UoXCJFcnJvciBFeHBlY3RlZCBUTyBGaW5kIE5vZGUgZ290IE51bGwgd2l0aCBJRCBcIiArIGlkKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIElkQXJyYXkgICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgb2JqZWN0QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciByb3dBcnJheSAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIG5ld0l0ZW1TZWxlY3RlZCA9IG5ldyBJdGVtU2VsZWN0ZWRFdmVudCgpO1xuXHRcdElkQXJyYXlbMF0gICAgICAgICAgPSBpZC5yb3c7XG5cdFx0aWYgKHRoZU5vZGUub3JpZ2luYWxPYmplY3QpXG5cdFx0XHRvYmplY3RBcnJheVswXSA9IHRoZU5vZGUub3JpZ2luYWxPYmplY3QuY2xvbmUoKTsgZWxzZVxuXHRcdFx0b2JqZWN0QXJyYXlbMF0gPSBudWxsO1xuXHRcdHJvd0FycmF5WzBdICAgICAgICAgICAgICAgICAgID0gdGhlTm9kZTtcblx0XHRuZXdJdGVtU2VsZWN0ZWQuaWRBcnJheSAgICAgICA9IElkQXJyYXk7XG5cdFx0bmV3SXRlbVNlbGVjdGVkLm9iamVjdEFycmF5ICAgPSBvYmplY3RBcnJheTtcblx0XHRuZXdJdGVtU2VsZWN0ZWQuaXRlbXNTZWxlY3RlZCA9IG9iamVjdEFycmF5Lmxlbmd0aDtcblx0XHRuZXdJdGVtU2VsZWN0ZWQucm93QXJyYXkgICAgICA9IHJvd0FycmF5O1xuXHRcdG5ld0l0ZW1TZWxlY3RlZC50aGVDb21wb25lbnQgID0gdGhlQ29tcG9uZW50O1xuXHRcdHRoZUNvbXBvbmVudC5vbkFmdGVyU2VsZWN0KG5ld0l0ZW1TZWxlY3RlZCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBIYW5kbGVGaWVsZEVudHJ5KHN0YXRlLCBlZGl0b3IsIGlnbm9yZVVwZGF0ZSkge1xuXHRcdHZhciB0aGVFeHBsb3JlciA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpLmV4cGxvcmVyO1xuXHRcdHZhciBuZXdUZXh0ID0gc3RhdGUudmFsdWU7XG5cdFx0dmFyIHJvd0lEICAgPSBlZGl0b3Iucm93O1xuXHRcdHZhciB0aGVOb2RlID0gJCQodGhlRXhwbG9yZXIuY29tcG9uZW50SUQpLmdldEl0ZW0ocm93SUQpO1xuXHRcdHZhciB0aGVQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGVOb2RlLmNsYXNzVHlwZSk7XG5cdFx0dGhlUHJveHkudXBkYXRlTmFtZSh0aGVOb2RlLl9pZCwgbmV3VGV4dCk7XG5cdFx0VUkuTWVzc2FnZShcIlJlY29yZCBVcGRhdGVkXCIpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgSXNGaWVsZEVkaXRhYmxlKGlkKTpib29sZWFuIHtcblx0XHR2YXIgdGhlSUQgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdHZhciB0aGVFeHBsb3JlciA9ICQkKHRoZUlEKVtcImV4cGxvcmVyXCJdO1xuXHRcdHZhciByb3dJdGVtICAgICA9ICQkKHRoZUV4cGxvcmVyLmdldENvbXBvbmVudElEKCkpLmdldEl0ZW0oaWQpO1xuXHRcdGlmIChyb3dJdGVtLmNsYXNzVHlwZS5pbmRleE9mKFwiUm9vdFwiKSA9PSAtMSlcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIFZhbGlkYXRlRmllbGRFbnRyeShyb3csIHZhbHVlOnN0cmluZykge1xuXHRcdHZhciB0aGVJRCAgICAgICA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0dmFyIHRoZUV4cGxvcmVyID0gJCQodGhlSUQpLmV4cGxvcmVyO1xuXHRcdHZhciByb3dJdGVtID0gJCQodGhlRXhwbG9yZXIuZ2V0Q29tcG9uZW50SUQoKSkuZ2V0SXRlbShyb3cuaWQpO1xuXHRcdEFwcExvZy5pbmZvKFwiaW5mb1wiLCBcIkJlZm9yZSBFZGl0IEV2ZW50XCIpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgUHJvY2Vzc09uRGVzdHJ1Y3QodGhlQ29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0VUkuRGVidWcoXCJvbiBEZXN0cnVjdCBDYWxsZWRcIik7XG5cdFx0dGhlQ29tcG9uZW50Lm9uRGVzdHJ1Y3QoKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIFByb2Nlc3NUYWJDaGFuZ2VkKCkge1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25Ecm9wRXZlbnQoU291cmNlLCB0YXJnZXQsIGV2ZW50KSB7XG5cdFx0Ly8gVUkuSW5mbyhcIkRyb3AgRXZlbnRcIik7XG5cdFx0Y29uc29sZS5sb2coXCJPbiBEcm9wIEV2ZW50XCIpO1xuXHR9XG5cbn0gdGhpcy5VSUV2ZW50SGFuZGxlciA9IFVJRXZlbnRIYW5kbGVyO1xuXG5lbnVtIFNvdW5kcyB7IFBvcHVwLCBTaGFwZURyb3AsIFNoYXBlRHJhZ0luLCBTaGFwZURyYWdPdXQsIEJsb3AsIE9wZW5EaWFncmFtLCBTYXZlRGlhZ3JhbSwgQ2xvc2VEaWFncmFtLCBTaGFwZU9uU2hhcGVEcm9wLCBEcmF3TGluaywgRXJyb3IgfXRoaXMuU291bmRzID0gU291bmRzO1xuXG5jbGFzcyBVSSBleHRlbmRzIEM0T2JqZWN0IHtcblx0cHVibGljIHN0YXRpYyBQbGF5U291bmQoc291bmQ6U291bmRzID0gU291bmRzLkJsb3ApIHtcblx0XHR2YXIgcztcblx0XHRzd2l0Y2ggKHNvdW5kKSB7XG5cdFx0XHRjYXNlIFNvdW5kcy5Qb3B1cDpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9DbGlja09mZi5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuQ2xvc2VEaWFncmFtOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Rvb3IgQ2xvc2UubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlRHJvcDpcblx0XHRcdGNhc2UgU291bmRzLk9wZW5EaWFncmFtOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Jsb3AubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLkJsb3A6XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQmxvcC5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuRXJyb3I6XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvRXJyb3IxLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZU9uU2hhcGVEcm9wOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL01ldGFsQ2xpY2sxLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5TYXZlRGlhZ3JhbTpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9Ecm9wIEZvcmsubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLkRyYXdMaW5rOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL1BvcENvcmsubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlRHJhZ0luOlxuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVEcmFnT3V0IDpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9DbGljay5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRzLnBsYXkoKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIERlYnVnKHRleHQ6c3RyaW5nKSB7XG5cdFx0aWYgKHRydWUpXG5cdFx0XHRVSS5NZXNzYWdlKHRleHQpXG5cdH1cblx0cHVibGljIHN0YXRpYyBNZXNzYWdlKHRleHQ6c3RyaW5nKSB7XG5cdFx0VUkuSW5mbyh0ZXh0KTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEluZm8odGV4dDpzdHJpbmcpIHtcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcblx0XHR9XG5cdFx0dG9hc3RyW1wiaW5mb1wiXSh0ZXh0KVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgV2FybmluZyh0ZXh0OnN0cmluZykge1xuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxuXHRcdH1cblx0XHRVSS5QbGF5U291bmQoU291bmRzLkVycm9yKTtcblx0XHR0b2FzdHJbXCJ3YXJuaW5nXCJdKHRleHQpXG5cdH1cblx0cHVibGljIHN0YXRpYyBTdWNjZXNzKHRleHQ6c3RyaW5nKSB7XG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXG5cdFx0fVxuXHRcdHRvYXN0cltcInN1Y2Nlc3NcIl0odGV4dClcblx0fVxuXHRwdWJsaWMgc3RhdGljIEVycm9yKHRleHQ6c3RyaW5nKSB7XG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXG5cdFx0fVxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuRXJyb3IpO1xuXHRcdHRvYXN0cltcImVycm9yXCJdKHRleHQpXG5cdH1cblx0cHVibGljIHN0YXRpYyBFeHBvcnRUb0V4Y2VsKGNvbXBvbmVudElEOnN0cmluZykge1xuXHRcdCQkKGNvbXBvbmVudElEKS5leHBvcnRUb0V4Y2VsKCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBBbGVydChzdHJpbmcpIHt3ZWJpeC5hbGVydChzdHJpbmcpO31cbn10aGlzLlVJID0gVUk7XG5cbmNsYXNzIFVJQ29tcG9uZW50IGV4dGVuZHMgVUkge1xuXG5cdHByb3RlY3RlZCBvdmVybGF5TWl4aW46Ym9vbGVhbiAgICAgICAgICA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50VmFsdWU6c3RyaW5nO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50SUQ6c3RyaW5nO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50TGFiZWw6c3RyaW5nO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50Vmlldzphbnk7XG5cdHByb3RlY3RlZCBjb21wb25lbnRDaGFuZ2VDYWxsYmFjazphbnk7XG5cdHByb3RlY3RlZCBvd25pbmdDb21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdHByb3RlY3RlZCBvcmRlcjpudW1iZXIgICAgICAgICAgICAgICAgICA9IDA7XG5cdHByb3RlY3RlZCBldmVudHNEZWZpbmVkOmJvb2xlYW4gICAgICAgICA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgdHJhY2tpbmdPYmplY3RDaGFuZ2VzOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSAgICBfdWlDbGFzc1R5cGU6Q2xhc3NUeXBlO1xuXHRwcm90ZWN0ZWQgaWRQcmVmaXggICAgICAgICAgICAgICAgICAgICAgPSBcIlVJQ29tcG9uZW50X1wiO1xuXHRwcml2YXRlICAgICB0aGVPYmplY3Q6YW55O1xuXHRwdWJsaWMgICAgICB0aGVUZXN0ICAgICAgICAgICAgICAgICAgICAgPSBuZXcgQzRPYmplY3QoKTtcblx0cHJvdGVjdGVkIGNvbXBvbmVudERhdGE6YW55O1xuXHRwcml2YXRlIHJlbGF0aW9uc2hpcE9iamVjdDtcblx0cHJpdmF0ZSBfdXNlckRhdGE6YW55O1xuXHRwcm90ZWN0ZWQgcHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXG5cdGdldCB1c2VyRGF0YSgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuX3VzZXJEYXRhO1xuXHR9XG5cdHNldCB1c2VyRGF0YSh2YWx1ZTphbnkpIHtcblx0XHR0aGlzLl91c2VyRGF0YSA9IHZhbHVlO1xuXHR9XG5cdGdldCB1aUNsYXNzVHlwZSgpOkNsYXNzVHlwZSB7XG5cdFx0cmV0dXJuIHRoaXMuX3VpQ2xhc3NUeXBlO1xuXHR9XG5cdHNldCB1aUNsYXNzVHlwZSh2YWx1ZTpDbGFzc1R5cGUpIHtcblx0XHR0aGlzLl91aUNsYXNzVHlwZSA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIHNob3dPdmVybGF5KCkge1xuXHRcdGlmICghdGhpcy5vdmVybGF5TWl4aW4pXG5cdFx0XHR3ZWJpeC5leHRlbmQoJCQodGhpcy5jb21wb25lbnRJRCksIHdlYml4Lk92ZXJsYXlCb3gpO1xuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNob3dPdmVybGF5KCk7XG5cdFx0dGhpcy5vdmVybGF5TWl4aW4gPSB0cnVlO1xuXHR9XG5cdHB1YmxpYyBoaWRlT3ZlcmxheSgpIHtcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5oaWRlT3ZlcmxheSgpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBUcmVlSWNvbihvYmo6YW55KSB7XG5cdFx0aWYgKG9iai4kbGV2ZWwgPiAxMDAxKVxuXHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZm9sZGVyLW9wZW4nPjwvc3Bhbj5cIjtcblx0XHRpZiAob2JqLiRsZXZlbCA8IDEwMDApIHtcblx0XHRcdHJldHVybiBGYWN0b3J5LkdldENsYXNzSWNvbihvYmouX2NsYXNzVHlwZSk7XG5cdFx0fVxuXHRcdHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIGZhLWZpbG0nPjwvc3Bhbj5cIjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IHRoaXMuaWRQcmVmaXggKyB3ZWJpeC51aWQoKTtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMocHJvcGVydGllcyk7XG5cdH1cblxuXHRwdWJsaWMgYXR0YWNoRXZlbnQoaWQ6c3RyaW5nLCBldmVudCwgY2FsbGJhY2spIHtcblx0XHRpZiAoJCQoaWQpKSB7XG5cdFx0XHQkJChpZCkuYXR0YWNoRXZlbnQoZXZlbnQsIGNhbGxiYWNrKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XG5cdFx0dGhpcy5yZWxhdGlvbnNoaXBPYmplY3QgPSB0aGVPYmplY3Q7XG5cdH1cblx0cHVibGljIGdldFJlbGF0aW9uc2hpcE9iamVjdCgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpb25zaGlwT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBibGFua1ZhbHVlKCkge31cblx0cHVibGljIGNyZWF0ZVZpZXcodmlld09wdGlvbnM6YW55KTphbnkge1xuXHRcdHRoaXMuc2V0UHJvcGVydHkoXCJkcmFnXCIsIHRydWUpO1xuXHRcdHRoaXMubWVyZ2VQcm9wZXJ0eVNldCh2aWV3T3B0aW9ucyk7XG5cdFx0cmV0dXJuIHZpZXdPcHRpb25zO1xuXHR9XG5cdHB1YmxpYyBzZXRJRChwcmVmaXg6c3RyaW5nKSB7XG5cdFx0dGhpcy5pZFByZWZpeCAgICA9IHByZWZpeDtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gdGhpcy5pZFByZWZpeCArIHdlYml4LnVpZCgpO1xuXHR9XG5cdHB1YmxpYyBzZXRDYWxsYmFjayhjYWxsYmFjazphbnkpIHtcblx0XHR0aGlzLmNvbXBvbmVudENoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdH1cblx0cHVibGljIGdldENhbGxiYWNrKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudENoYW5nZUNhbGxiYWNrO1xuXHR9XG5cdHB1YmxpYyBpc1ZhbGlkKCk6Ym9vbGVhbiB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHRyZXR1cm4gJCQodGhpcy5jb21wb25lbnRJRCkudmFsaWRhdGUoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBzZXREYXRhKHRoZURhdGE6YW55KSB7XG5cdFx0dGhpcy5jb21wb25lbnREYXRhID0gdGhlRGF0YTtcblx0fVxuXHRwdWJsaWMgZ2V0RGF0YSgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50RGF0YTtcblx0fVxuXHRwdWJsaWMgc2V0TGFiZWwodGhlTGFiZWwpIHtcblx0XHR0aGlzLmNvbXBvbmVudExhYmVsID0gdGhlTGFiZWw7XG5cdH1cblx0cHVibGljIGdldExhYmVsKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudExhYmVsO1xuXHR9XG5cdHB1YmxpYyBzZXRWYWx1ZSh0aGVWYWx1ZTphbnkpIHtcblx0XHR0aGlzLmNvbXBvbmVudFZhbHVlID0gdGhlVmFsdWU7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHR3ZWJpeC51aSh0aGlzLmdldFZhbHVlLCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XG5cdFx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldE93bmluZ0NvbXBvbmVudChjb21wb25lbnQ6VUlDb21wb25lbnQpIHtcblx0XHR0aGlzLm93bmluZ0NvbXBvbmVudCA9IGNvbXBvbmVudDtcblx0fVxuXHRwdWJsaWMgZ2V0T3duaW5nQ29tcG9uZW50KCk6VUlDb21wb25lbnQge1xuXHRcdHJldHVybiB0aGlzLm93bmluZ0NvbXBvbmVudDtcblx0fVxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50SUQoKTpzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudElEO1xuXHR9XG5cdHB1YmxpYyBzZXRDb21wb25lbnRJRChpZDpzdHJpbmcpIHtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gaWQ7XG5cdH1cblx0cHVibGljIGdldFZhbHVlKCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWYWx1ZTtcblx0fVxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50VmlldygpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50Vmlldyh0aGVWaWV3OmFueSkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoZVZpZXc7XG5cdH1cblx0cHVibGljIGdldFNlbGVjdGVkT2JqZWN0KCk6YW55IHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpIHtcblx0XHR3ZWJpeC5hbGVydChcIlNvcnJ5IERyb3BwaW5nIEhlcmUgTm90IEFsbG93ZWQgWWV0XCIpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVEcmFnSW4obWVzc2FnZTpEcm9wTWVzc2FnZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgb25BZnRlckRyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSk6YW55IHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIG9uRHJhZ091dChtZXNzYWdlOkRyb3BNZXNzYWdlKTphbnkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgdmFsaWRhdGVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmFueSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBvblNlbGVjdENoYW5nZShpdGVtTWVzc2FnZTpJdGVtU2VsZWN0ZWRFdmVudCkge1xuXHRcdHRoaXMucHVibGlzaChcIm9uU2VsZWN0Q2hhbmdlXCIsIGl0ZW1NZXNzYWdlKTtcblx0XHRyZXR1cm47XG5cdH1cblx0cHVibGljIG9uSXRlbURibENsaWNrKGl0ZW1NZXNzYWdlIDogSXRlbVNlbGVjdGVkRXZlbnQpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJvbkl0ZW1EYmxDbGlja1wiLGl0ZW1NZXNzYWdlKTtcblx0fVxuXHRwdWJsaWMgb25JdGVtQ2xpY2soaXRlbU1lc3NhZ2UgOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xuXHRcdHRoaXMucHVibGlzaChcIm9uSXRlbUNsaWNrXCIsaXRlbU1lc3NhZ2UpO1xuXHR9XG5cdHB1YmxpYyBnZXRPYmplY3QoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLnRoZU9iamVjdDtcblx0fVxuXHRwdWJsaWMgc2V0T2JqZWN0KHRoZU9iamVjdDphbnkpIHtcblx0XHR0aGlzLnRoZU9iamVjdCA9IHRoZU9iamVjdDtcblx0fVxuXHRwdWJsaWMgc2V0RHJhZ2dhYmxlKGZsYWc6Ym9vbGVhbiA9IHRydWUpIHtcblx0XHR2YXIgaHRtbFZpZXcgPSAkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3O1xuXHRcdHdlYml4LkRyYWdDb250cm9sLmFkZERyb3AoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSwgVUlFdmVudEhhbmRsZXIuT25Ecm9wRXZlbnQpO1xuXHR9XG5cdHB1YmxpYyBzZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSkge1xuXHRcdHN3aXRjaCAobmFtZSkge1xuXHRcdFx0Y2FzZSBcImxhYmVsXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldExhYmVsKHZhbHVlKTtcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInZhbHVlXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImRhdGFcIiA6XG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImNhbGxiYWNrXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldENhbGxiYWNrKHZhbHVlKVxuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcblx0XHR9XG5cdH1cblx0cHVibGljIGFkZFByb3BlcnRpZXMocHJvcGVydHlTZXQ6YW55KSB7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBwcm9wZXJ0eVNldCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eShpdGVtLCBwcm9wZXJ0eVNldFtpdGVtXSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBnZXRQcm9wZXJ0eShuYW1lKTphbnkge1xuXHRcdHJldHVybiB0aGlzLnByb3BlcnRpZXNbbmFtZV07XG5cdH1cblx0cHVibGljIG1lcmdlUHJvcGVydHlTZXQodmlldzphbnkpIHtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG5cdFx0XHR2aWV3W2l0ZW1dID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xuXHRcdFx0aW5kZXgrKztcblx0XHR9XG5cdFx0cmV0dXJuIHZpZXc7XG5cdH1cblx0cHVibGljIGdldFByb3BlcnR5U2V0KCk6YW55IHtcblx0XHR2YXIgaW5kZXggICA9IDA7XG5cdFx0dmFyIHJlc3VsdHMgPSB7fTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMucHJvcGVydGllcykge1xuXHRcdFx0cmVzdWx0c1tpdGVtXSA9IHRoaXMucHJvcGVydGllc1tpdGVtXTtcblx0XHRcdGluZGV4Kys7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIHJlZnJlc2goKSB7fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuZXZlbnRzRGVmaW5lZCA9IHRydWU7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRClbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZHJhZyAgICAgICAgID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkgJCQodGhpcy5jb21wb25lbnRJRCkuZGVzdHJ1Y3RvcigpO1xuXHR9XG5cdHB1YmxpYyBkZXN0cm95T2JqZWN0KCkge1xuXHR9XG5cdHB1YmxpYyBvbkRlc3RydWN0KCkge1xuXHRcdHRoaXMuZGVzdHJveU9iamVjdCgpO1xuXHR9XG5cdHB1YmxpYyBkZXN0cnVjdG9yKCkge1xuXHR9XG5cblx0Ly9lbmRyZWdpb25cbn0gdGhpcy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50O1xuXG5jbGFzcyBVSUNvbnRleHRNZW51IGV4dGVuZHMgVUlDb21wb25lbnQge1xuXHRwdWJsaWMganVtcEl0ZW1BcnJheTpBcnJheTxVSUp1bXBJdGVtPjtcblx0cHVibGljIG93bmluZ0NvbXBvbmVudDpVSUNvbXBvbmVudDtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuanVtcEl0ZW1BcnJheSA9IG5ldyBBcnJheTxVSUp1bXBJdGVtPigpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aUNvbnRleHRNZW51X1wiKTtcblx0fVxuXG5cdHB1YmxpYyBhZGRJdGVtKGxhYmVsLCBjYWxsYmFjaykge1xuXHRcdHZhciBuZXdJdGVtICAgICAgPSBuZXcgVUlKdW1wSXRlbSgpO1xuXHRcdG5ld0l0ZW0uaWQgICAgICAgPSBcIm1lbnVJdGVtX1wiICsgd2ViaXgudWlkKCk7XG5cdFx0bmV3SXRlbS5sYWJlbCAgICA9IGxhYmVsO1xuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xuXHR9XG5cdHB1YmxpYyBhZGRTZXBlcmF0b3IoKSB7XG5cdFx0dmFyIG5ld0l0ZW0gICAgICA9IG5ldyBVSUp1bXBJdGVtKCk7XG5cdFx0bmV3SXRlbS5pZCAgICAgICA9IFwianVtcEl0ZW1fXCIgKyB3ZWJpeC51aWQoKTtcblx0XHRuZXdJdGVtLmxhYmVsICAgID0gXCJcIjtcblx0XHRuZXdJdGVtLmNhbGxiYWNrID0gbnVsbDtcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xuXHR9XG5cdHB1YmxpYyBnZXRNZW51SXRlbShsYWJlbDpzdHJpbmcpOlVJSnVtcEl0ZW0ge1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHRpZiAodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmxhYmVsID09IGxhYmVsKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dO1xuXHRcdH1cblx0fVxuXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciBtZW51QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHR2YXIgbWVudUl0ZW0gPSB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV07XG5cdFx0XHRpZiAobWVudUl0ZW0ubGFiZWwgPT0gXCJcIikge1xuXHRcdFx0XHRtZW51QXJyYXkucHVzaCh7JHRlbXBsYXRlOiBcIlNlcGFyYXRvclwifSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZW51QXJyYXkucHVzaChtZW51SXRlbS5sYWJlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHR2aWV3OiBcImNvbnRleHRtZW51XCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIGRhdGE6IG1lbnVBcnJheVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XG5cdFx0aWYgKCEkJCh0aGlzLmNvbXBvbmVudElEKSlcblx0XHRcdHdlYml4LnVpKHRoaXMuY29tcG9uZW50VmlldykuYXR0YWNoVG8oJCQodGhpcy5nZXRPd25pbmdDb21wb25lbnQoKS5nZXRDb21wb25lbnRJRCgpKSk7XG5cdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZ2V0Q29tcG9uZW50SUQoKSwgXCJjbGlja1wiLCBVSUV2ZW50SGFuZGxlci5NZW51SGFuZGxlcik7XG5cdH1cblxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlVJQ29udGV4dE1lbnUgPSBVSUNvbnRleHRNZW51O1xuXG5lbnVtIEZpZWxkRm9ybWF0IHsgR0VORVJBTCwgQ1VSUkVOQ1ksIE5VTUJFUiwgUEVSQ0VOVCB9dGhpcy5GaWVsZEZvcm1hdCA9IEZpZWxkRm9ybWF0O1xuXG5jbGFzcyBVSUZpZWxkIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdHByaXZhdGUgbGlzdFR5cGU6c3RyaW5nO1xuXHRwcml2YXRlIHJlbGF0aW9uc2hpcFBvaW50ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgdXBkYXRlRmllbGQ6c3RyaW5nO1xuXHRwdWJsaWMgbWF4TGVuZ3RoOm51bWJlcjtcblx0cHVibGljIGZpZWxkRm9ybWF0OkZpZWxkRm9ybWF0ICAgICAgPSBGaWVsZEZvcm1hdC5HRU5FUkFMO1xuXHRwdWJsaWMgZm9ybWF0Vmlldzphbnk7XG5cdHB1YmxpYyBmaWVsZFZhbHVlOmFueTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aWZpZWxkX1wiKTtcblx0XHR0aGlzLmFkZEV2ZW50UHVibGljYXRpb24oXCJmaWVsZENoYW5nZWRcIik7XG5cdH1cblxuXHRwdWJsaWMgZmllbGRDaGFuZ2VkKG5ld1ZhbHVlOmFueSwgb2xkVmFsdWUpIHtcblx0XHR2YXIgdGhlUGFyZW50ID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0aWYgKHRoaXMuZ2V0Q2FsbGJhY2soKSkge1xuXHRcdFx0dmFyIGNhbGxiYWNrID0gdGhpcy5nZXRDYWxsYmFjaygpO1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKHRoaXMsIHRoZVBhcmVudCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHR9XG5cdFx0dGhpcy52YWx1ZUNoYW5nZWQodGhlUGFyZW50LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdHRoaXMucHVibGlzaChcImZpZWxkQ2hhbmdlZFwiLCB7bmV3VmFsdWU6IG5ld1ZhbHVlLCBvbGRWYWx1ZTogb2xkVmFsdWV9KVxuXHR9XG5cdHB1YmxpYyBzZXRDbGFzc1R5cGUoY2xhc3NUeXBlOkNsYXNzVHlwZSkge1xuXHRcdHRoaXMubGlzdFR5cGUgPSA8c3RyaW5nPiBjbGFzc1R5cGU7XG5cdH1cblx0cHVibGljIGdldENsYXNzVHlwZSgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMubGlzdFR5cGU7XG5cdH1cblx0cHVibGljIHNldFVwZGF0ZUZpZWxkKHRoZUZpZWxkTmFtZTpzdHJpbmcpIHtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdGhlRmllbGROYW1lO1xuXHR9XG5cdHB1YmxpYyBnZXRVcGRhdGVGaWVsZCgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMudXBkYXRlRmllbGQ7XG5cdH1cblx0cHVibGljIHNldEZpZWxkRm9ybWF0KHRoZUZvcm1hdDpGaWVsZEZvcm1hdCkge1xuXHRcdHRoaXMuZmllbGRGb3JtYXQgPSB0aGVGb3JtYXQ7XG5cdFx0c3dpdGNoICh0aGVGb3JtYXQpIHtcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuQ1VSUkVOQ1kgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLmZvcm1hdFZpZXcgPSB3ZWJpeC5OdW1iZXIubnVtVG9TdHIoe1xuXHRcdFx0XHRcdGdyb3VwRGVsaW1pdGVyOiBcIixcIiwgZ3JvdXBlU2l6ZTogMywgZGVjaW1hbERlbGltaXRlcjogXCIuXCIsIGRlY2ltYWxTaXplOiAwXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuUEVSQ0VOVCA6XG5cdFx0XHR7XG5cblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuR0VORVJBTCA6XG5cdFx0XHR7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5OVU1CRVIgOlxuXHRcdFx0e1xuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQgOlxuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0VmFsdWUodmFsdWU6YW55KSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5ibG9ja0V2ZW50KCk7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS51bmJsb2NrRXZlbnQoKTtcblx0XHR9XG5cdFx0dGhpcy5maWVsZFZhbHVlID0gdmFsdWU7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuY29tcG9uZW50SUQsIFwib25DaGFuZ2VcIiwgVUlFdmVudEhhbmRsZXIuRmllbGRDaGFuZ2VkKTtcblx0fVxuXHRwdWJsaWMgZ2V0VmFsdWUoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLmZpZWxkVmFsdWU7XG5cdH1cblx0cHVibGljIGJsYW5rVmFsdWUoKSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZShcIlwiKTtcblx0XHR9XG5cdFx0dGhpcy5maWVsZFZhbHVlID0gXCJcIjtcblx0fVxuXHRwdWJsaWMgdmFsdWVDaGFuZ2VkKHBhcmVudENvbXBvbmVudDpVSUNvbXBvbmVudCwgbmV3VmFsdWU6YW55LCBvbGRWYWx1ZTphbnkpIHtcblx0XHRpZiAoIXRoaXMuaXNWYWxpZCgpKVxuXHRcdFx0cmV0dXJuO1xuXHRcdGlmICghdGhpcy51cGRhdGVGaWVsZCkgcmV0dXJuO1xuXHRcdHZhciB0aGVPYmplY3QgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocGFyZW50Q29tcG9uZW50LmdldE9iamVjdCgpLmNsYXNzVHlwZSk7XG5cdFx0dGhlT2JqZWN0LnVwZGF0ZUF0dHJpYnV0ZShwYXJlbnRDb21wb25lbnQuZ2V0T2JqZWN0KCkuX2lkLCB0aGlzLnVwZGF0ZUZpZWxkLCBuZXdWYWx1ZSk7XG5cdFx0VUkuTWVzc2FnZShcIlJlY29yZCBVcGRhdGVkXCIpO1xuXHR9XG5cbn0gdGhpcy5VSUZpZWxkID0gVUlGaWVsZDtcblxuY2xhc3MgVUlDb3VudGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlDb3VudGVyRmllbGRfXCIpO1xuXHR9XG5cblx0cHVibGljIGZpZWxkQ2hhbmdlZChuZXd2LCBvbGR2KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwiZmllbGRDaGFuZ2VkXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImNvdW50ZXJcIlxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cbn10aGlzLlVJQ291bnRlckZpZWxkID0gVUlDb3VudGVyRmllbGQ7XG5cbmNsYXNzIFVJTGFiZWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHVibGljIGFsaWdubWVudDpzdHJpbmcgPSBcImNlbnRlclwiO1xuXHRwdWJsaWMgbGFiZWxXaWR0aDpudW1iZXI7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlMYWJlbF9cIik7XG5cdH1cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIGFsaWdubWVudCA9IFwiY2VudGVyXCIsIGxhYmVsV2lkdGggPSAxMDApIHtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMoe2xhYmVsOiBsYWJlbCwgYWxpZ25tZW50OiBhbGlnbm1lbnQsIGxhYmVsV2lkdGg6IGxhYmVsV2lkdGh9KTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImxhYmVsXCJcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cbn0gdGhpcy5VSUxhYmVsID0gVUlMYWJlbDtcblxuY2xhc3MgVUlEYXRlRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aURhdGVGaWVsZF9cIik7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgICAgOiBcImRhdGVwaWNrZXJcIixcblx0XHRcdG5hbWUgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0XHRsYWJlbCAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxuXHRcdFx0bGFiZWxXaWR0aDogMTAwLFxuXHRcdFx0dGltZXBpY2tlcjogZmFsc2Vcblx0XHR9KTtcblx0XHRpZiAodGhpcy5mb3JtYXRWaWV3KSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudFZpZXdbXCJmb3JtYXRcIl0gPSB0aGlzLmZvcm1hdFZpZXc7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIGRlZmluRXZlbnRzKCkge1xuXG5cdH1cblxufSB0aGlzLlVJRGF0ZUZpZWxkID0gVUlEYXRlRmllbGQ7XG5cbmNsYXNzIFVJU2xpZGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlTbGlkZXJGaWVsZFwiKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCwgbWluVmFsdWU6bnVtYmVyID0gMCwgbWF4VmFsdWU6bnVtYmVyID0gMSwgc3RlcDpudW1iZXIgPSAuMSkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcIm1pblwiLCBtaW5WYWx1ZSk7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcIm1heFwiLCBtYXhWYWx1ZSk7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcInN0ZXBcIiwgc3RlcCk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdG5hbWUgOiB0aGlzLmdldExhYmVsKCksXG5cdFx0XHR2aWV3IDogXCJzbGlkZXJcIixcblx0XHRcdGxhYmVsOiB0aGlzLmdldExhYmVsKCksXG5cdFx0XHR2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLFxuXHRcdFx0dGl0bGU6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdFx0cmV0dXJuIHdlYml4LmkxOG4ubnVtYmVyRm9ybWF0KG9iai52YWx1ZSAqIDEwMCkgKyBcIiVcIjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxuXG59IHRoaXMuVUlTbGlkZXJGaWVsZCA9IFVJU2xpZGVyRmllbGQ7XG5cbmNsYXNzIFVJVGV4dEZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XG5cblx0cHVibGljIHRleHRBcmVhID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcInVpVGV4dEZpZWxkX1wiKTtcblx0XHR0aGlzLnRleHRBcmVhID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgc2V0VGV4dEFyZWEodGV4dEFyZWE6Ym9vbGVhbikge1xuXHRcdHRoaXMudGV4dEFyZWEgPSB0ZXh0QXJlYTtcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55LCBkYXRhOmFueSA9IG51bGwsIGNhbGxiYWNrOmFueSA9IG51bGwsIHVwZGF0ZUZpZWxkID0gbnVsbCwgdGV4dEFyZWEgPSBmYWxzZSkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHR0aGlzLnRleHRBcmVhICAgID0gdGV4dEFyZWE7XG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHVwZGF0ZUZpZWxkO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRpZiAodGhpcy50ZXh0QXJlYSlcblx0XHRcdHZhciB2aWV3VHlwZSA9IFwidGV4dGFyZWFcIjsgZWxzZVxuXHRcdFx0dmlld1R5cGUgPSBcInRleHRcIjtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICA6IHZpZXdUeXBlLFxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDBcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxuXG59IHRoaXMuVUlUZXh0RmllbGQgPSBVSVRleHRGaWVsZDtcblxuY2xhc3MgVUlOb3RlRmllbGQgZXh0ZW5kcyBVSVRleHRGaWVsZCB7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJTm90ZUZpZWxkX1wiKTtcblx0XHR0aGlzLnRleHRBcmVhID0gdHJ1ZTtcblx0fVxuXG59dGhpcy5VSU5vdGVGaWVsZCA9IFVJTm90ZUZpZWxkO1xuXG5jbGFzcyBVSVNlbGVjdExpc3QgZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRwdWJsaWMgc2VsZWN0aW9uTGlzdDpBcnJheTxhbnk+O1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aVNlbGVjdExpc3RfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldFZhbHVlKHZhbHVlIDogYW55KSB7XG5cdFx0c3VwZXIuc2V0VmFsdWUodmFsdWUpO1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUodmFsdWUpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0U2VsZWN0TGlzdChsYWJlbCwgdmFsdWUsIHRoZUxpc3QsIGRhdGEsIGNhbGxiYWNrLCB1cGRhdGVGaWVsZCkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0TGlzdCh0aGVMaXN0KTtcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjaylcblx0XHR0aGlzLnNldFVwZGF0ZUZpZWxkKHVwZGF0ZUZpZWxkKTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgICAgOiBcInNlbGVjdFwiLFxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdG9wdGlvbnMgICA6IHRoaXMuc2VsZWN0aW9uTGlzdCxcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDAsXG5cdFx0XHR2YWxpZGF0ZSAgOiB3ZWJpeC5ydWxlcy5pc05vdEVtcHR5XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIHNldExpc3QodGhlTGlzdDpBcnJheTxhbnk+KSB7XG5cdFx0dGhpcy5zZWxlY3Rpb25MaXN0ID0gdGhlTGlzdDtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoZUxpc3QpIHtcblx0XHRcdGlmICh0aGVMaXN0W2l0ZW1dLm5hbWUgPT0gXCJcIilcblx0XHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnNlbGVjdGlvbkxpc3QucHVzaCh7aWQ6IFwiXCIsIG5hbWU6IFwiXCJ9KTtcblxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZGVmaW5lKFwib3B0aW9uc1wiLCB0aGlzLnNlbGVjdGlvbkxpc3QpO1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkucmVmcmVzaCgpO1xuXHRcdH1cblx0fVxuXG59IHRoaXMuVUlTZWxlY3RMaXN0ID0gVUlTZWxlY3RMaXN0O1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlGaWVsZCB7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnkgPSAwLCBkYXRhOmFueSA9IG51bGwsIGNhbGxiYWNrOmFueSA9IG51bGwpIHtcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLFxuXHRcdFx0dmlldzogXCJjaGVja2JveFwiLFxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcblx0XHRcdHZhbHVlOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgb25DaGFuZ2UobmV3diwgb2xkdikge1xuXHRcdHRoaXMucHVibGlzaChcIm9uQ2hhbmdlXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cbn0gdGhpcy5VSUNoZWNrYm94ID0gVUlDaGVja2JveDtcblxuY2xhc3MgVUlKdW1wSXRlbSB7XG5cblx0cHVibGljIGlkOnN0cmluZztcblx0cHVibGljIGxhYmVsOnN0cmluZztcblx0cHVibGljIGNhbGxiYWNrOmFueTtcblx0cHVibGljIGV2ZW50OmFueTtcblx0cHVibGljIHR5cGU6c3RyaW5nO1xuXG59XG5jbGFzcyBVSUp1bXBCYXIgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHVibGljIGp1bXBJdGVtQXJyYXk6QXJyYXk8VUlKdW1wSXRlbT47XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlKdW1wQmFyX1wiKTtcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXkgPSBuZXcgQXJyYXk8VUlKdW1wSXRlbT4oKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgSnVtcENhbGxiYWNrKGlkOnN0cmluZywgZXZlbnQ6YW55KSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKGlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgY2FsbGJhY2sgPSBudWxsO1xuXHRcdHRoZUNvbXBvbmVudC5wdWJsaXNoKHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5ldmVudClcblx0XHQvLyAgICB0aGVDb21wb25lbnQuanVtcEl0ZW1BcnJheVtpZF0uY2FsbGJhY2sodGhlQ29tcG9uZW50LCB0aGVDb21wb25lbnQuanVtcEl0ZW1BcnJheVtpZF0ubGFiZWwpO1xuXHR9XG5cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuanVtcEl0ZW1BcnJheSkge1xuXHRcdFx0dmFyIG5ld0l0ZW1WaWV3ID0ge1xuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIixcblx0XHRcdFx0aWQgICA6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5pZCxcblx0XHRcdFx0dHlwZSA6IFwiaHRtbGJ1dHRvblwiLFxuXHRcdFx0XHRjc3MgIDogXCJidF8xXCIsXG5cdFx0XHRcdGxhYmVsOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWwsXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWxcblx0XHRcdH1cblx0XHRcdGJhclZpZXcucHVzaChuZXdJdGVtVmlldyk7XG5cdFx0fVxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCBjb2xzOiBiYXJWaWV3XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ld1ZpZXc7XG5cdH1cblx0cHVibGljIGFkZEl0ZW0obGFiZWw6c3RyaW5nLCBldmVudDpzdHJpbmcsIHR5cGUgPSBcImRhbmdlclwiLCBjYWxsYmFjayA9IG51bGwpIHtcblx0XHR2YXIgbmV3SXRlbSAgICAgID0gbmV3IFVJSnVtcEl0ZW0oKTtcblx0XHRuZXdJdGVtLmlkICAgICAgID0gXCJqdW1wQnV0dG9uX1wiICsgd2ViaXgudWlkKCk7XG5cdFx0bmV3SXRlbS5sYWJlbCAgICA9IGxhYmVsO1xuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRuZXdJdGVtLmV2ZW50ICAgID0gZXZlbnQ7XG5cdFx0bmV3SXRlbS50eXBlICAgICA9IHR5cGU7XG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHRpZiAoJCQodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkKSlcblx0XHRcdFx0aWYgKCEkJCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQpLmhhc0V2ZW50KFwib25JdGVtQ2xpY2tcIikpXG5cdFx0XHRcdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsIFwib25JdGVtQ2xpY2tcIiwgVUlKdW1wQmFyLkp1bXBDYWxsYmFjayk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHRpZiAoJCQoaXRlbSkpIHtcblx0XHRcdFx0JCQoaXRlbSlbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xuXHRcdFx0XHQkJChpdGVtKVtcImRhdGFcIl0gICAgICA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG59IHRoaXMuVUlKdW1wQmFyID0gVUlKdW1wQmFyO1xuXG5jbGFzcyBVSVRvb2xiYXIgZXh0ZW5kcyBVSUp1bXBCYXIge1xuXG5cdHB1YmxpYyBsYWJlbDpzdHJpbmc7XG5cdHB1YmxpYyBpY29uOnN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHR9XG5cblx0cHVibGljIHNldFRvb2xCYXIobGFiZWwsIGljb24pIHtcblx0XHR0aGlzLmxhYmVsID0gbGFiZWw7XG5cdFx0dGhpcy5pY29uICA9IGljb247XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgdGhlQmFyICA9IHt2aWV3OiBcImxhYmVsXCIsIGxhYmVsOiB0aGlzLmljb24gKyBcIiBcIiArIHRoaXMubGFiZWx9O1xuXHRcdGJhclZpZXcucHVzaCh0aGVCYXIpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHR2YXIgbmV3SXRlbVZpZXcgPSB7XG5cdFx0XHRcdHZpZXcgOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRpZCAgIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLFxuXHRcdFx0XHR0eXBlIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLnR5cGUsXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWxcblx0XHRcdH1cblx0XHRcdGJhclZpZXcucHVzaChuZXdJdGVtVmlldyk7XG5cdFx0fVxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0dmlldyAgICA6IFwidG9vbGJhclwiLFxuXHRcdFx0Y3NzICAgICA6IFwiaGlnaGxpZ2h0ZWRfaGVhZGVyIGhlYWRlcjNcIixcblx0XHRcdHBhZGRpbmdYOiA1LFxuXHRcdFx0cGFkZGluZ1k6IDUsXG5cdFx0XHRoZWlnaHQgIDogNDAsXG5cdFx0XHRjb2xzICAgIDogYmFyVmlld1xuXHRcdH0pO1xuXHRcdHJldHVybiBuZXdWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0fVxuXG59IHRoaXMuVUlUb29sYmFyID0gVUlUb29sYmFyO1xuXG5jbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJQ29tcG9uZW50IHtcblxuXHRwdWJsaWMgY29sb3I6c3RyaW5nO1xuXHRwdWJsaWMgZXZlbnQ6c3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJQnV0dG9uX1wiKTtcblx0fVxuXG5cdHB1YmxpYyBvbkJ1dHRvbkNsaWNrKHRoZUNvbXBvbmVudDphbnkpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJjbGlja1wiLCB0aGlzKTtcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU/OmFueSwgZGF0YT86YW55LCBjYWxsYmFjaz86YW55KSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdHRoaXMuY29sb3IgPSBcImJhY2tncm91bmQtY29sb3IgOiAjRkY5RTlFXCI7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgICA6IFwiYnV0dG9uXCIsXG5cdFx0XHRuYW1lICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHR2YWx1ZSAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRjc3NGb3JtYXQ6IHRoaXMuY29sb3IsXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgc2V0TGFiZWwodGhlTGFiZWw6c3RyaW5nKSB7XG5cdFx0c3VwZXIuc2V0TGFiZWwodGhlTGFiZWwpO1xuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnZhbHVlID0gdGhlTGFiZWw7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnJlZnJlc2goKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldENvbG9yKHZhbHVlOnN0cmluZykge1xuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLnN0eWxlLmJhY2tncm91bmQgID0gdmFsdWU7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLnN0eWxlLmJvcmRlckNvbG9yID0gdmFsdWU7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uSXRlbUNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk9uQnV0dG9uQ2xpY2spO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cbn0gdGhpcy5VSUJ1dHRvbiA9IFVJQnV0dG9uO1xuXG5jbGFzcyBVSURyb3Bab25lIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlVJRHJvcFpvbmVfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSwgZGF0YTphbnksIGNhbGxiYWNrOmFueSwgdXBkYXRlRmllbGQgPSBudWxsKSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcblx0fVxuXHRwdWJsaWMgc2V0SW5UaGVab25lKGluWm9uZTpib29sZWFuKSB7XG5cdFx0aWYgKGluWm9uZSlcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuZGVmaW5lKFwiY3NzXCIsIFwiaW5UaGVEcm9wWm9uZVwiKTsgZWxzZVxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5kZWZpbmUoXCJjc3NcIiwgXCJvdXRPZlRoZURyb3Bab25lXCIpO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB7XG5cdFx0XHRpZCAgICAgICA6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSxcblx0XHRcdHZpZXcgICAgIDogXCJsaXN0XCIsXG5cdFx0XHRtaW5XaWR0aCA6IDEwMCxcblx0XHRcdG1pbkhlaWdodDogMTAwLFxuXHRcdFx0dGVtcGxhdGUgOiBcIiN0aXRsZSNcIixcblx0XHRcdGRhdGEgICAgIDogW3t0aXRsZTogXCJEcm9wIFpvbmVcIn1dLFxuXHRcdFx0ZHJhZyAgICAgOiBcInRhcmdldFwiXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIG9uQmVmb3JlRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKTpib29sZWFuIHtcblx0XHR0aGlzLnNldEluVGhlWm9uZShmYWxzZSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBvbkJlZm9yZURyYWdJbihtZXNzYWdlOkRyb3BNZXNzYWdlKTpib29sZWFuIHtcblx0XHR0aGlzLnNldEluVGhlWm9uZSh0cnVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgb25EcmFnT3V0KG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5jb21wb25lbnRJRCwgXCJvbkJlZm9yZURyb3BcIiwgVUlFdmVudEhhbmRsZXIuT25CZWZvcmVEcm9wKTtcblx0fVxuXG59IHRoaXMuVUlEcm9wWm9uZSA9IFVJRHJvcFpvbmU7XG5cbmludGVyZmFjZSBvbkVkaXRDYWxsYmFjayB7XG5cdChvYmplY3Q6YW55KSA6IGFueTtcbn1cblxuY2xhc3MgVUlDb2xvckZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55KSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJQ29sb3JGaWVsZF9cIik7XG5cdFx0dGhpcy5hZGRQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuXHR9XG5cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJjb2xvcnBpY2tlclwiXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG59dGhpcy5VSUNvbG9yRmllbGQgPSBVSUNvbG9yRmllbGQ7XG5cbmNsYXNzIFVJRGF0YVRhYmxlRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xuXHRwdWJsaWMgY29sdW1uTnVtYmVyOm51bWJlcjtcblx0cHVibGljIGNvbHVtbk5hbWU6c3RyaW5nO1xuXHRwdWJsaWMgb2xkVmFsdWU6YW55O1xuXHRwdWJsaWMgbmV3VmFsdWU6YW55O1xuXHRwdWJsaWMgZWRpdG9yOmFueTtcblx0cHVibGljIHJvd09iamVjdDphbnk7XG5cdHB1YmxpYyBpc1JlZmVyZW5jZTpib29sZWFuICAgICAgID0gZmFsc2U7XG5cdHB1YmxpYyByZWZlcmVuY2VDbGFzc1R5cGU6c3RyaW5nID0gXCJcIjtcblx0cHVibGljIHJlZmVyZW5jZUZpZWxkOmFueTtcblx0cHVibGljIHJlZmVyZW5jZU9iamVjdDphbnk7XG5cdHB1YmxpYyBkaXNwbGF5RmllbGROYW1lO1xuXHRwdWJsaWMgdmlldzphbnk7XG5cdHB1YmxpYyBvcHRpb25MaXN0OkFycmF5PGFueT47XG5cdHB1YmxpYyBtYXBwZWQ6Ym9vbGVhbiAgICAgICAgICAgID0gZmFsc2U7XG5cdHB1YmxpYyB0ZW1wbGF0ZTphbnk7XG5cdHB1YmxpYyByZWZlcmVuY2VDbGFzc0ZpZWxkOmFueVxuXHQvL2VuZHJlZ2lvblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSURhdGFUYWJsZUZpZWxkX1wiKTtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gXCJkYXRhVGFibGVGaWVsZF9cIiArIHdlYml4LnVpZCgpO1xuXHR9XG59IHRoaXMuVUlEYXRhVGFibGVGaWVsZCA9IFVJRGF0YVRhYmxlRmllbGQ7XG5cbmNsYXNzIFVJRGF0YVRhYmxlIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXHRnZXQgdGVtcGxhdGUoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcblx0fVxuXG5cdHNldCB0ZW1wbGF0ZSh2YWx1ZTphbnkpIHtcblx0XHR0aGlzLl90ZW1wbGF0ZSA9IHZhbHVlO1xuXHR9XG5cdGdldCBzaG93VG9vbEJhcigpOmJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9zaG93VG9vbEJhcjtcblx0fVxuXHRzZXQgc2hvd1Rvb2xCYXIodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX3Nob3dUb29sQmFyID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIE1hcHBlZENvbHVtbkxvb2t1cChvYmopIHtcblx0fVxuXHRwdWJsaWMgdmlld1R5cGUgPSBcImRhdGF0YWJsZVwiO1xuXG5cdHByb3RlY3RlZCB0aGVMaXN0ICAgICAgICAgICAgICAgOiBBcnJheTxhbnk+ICA9IG51bGw7XG5cdHByb3RlY3RlZCBjb2x1bW5zICAgICAgICAgICAgICAgOiBBcnJheTxVSURhdGFUYWJsZUZpZWxkPjtcblx0cHJvdGVjdGVkIHJvd1NlbGVjdENhbGxiYWNrICAgICA6IGFueTtcblx0cHJvdGVjdGVkIGVkaXRhYmxlICAgICAgICAgICAgICA6IGJvb2xlYW4gICAgPSBmYWxzZTtcblx0cHJvdGVjdGVkIGVkaXRhY3Rpb24gICAgICAgICAgICA6IHN0cmluZyAgID0gXCJkYmxjbGlja1wiO1xuXHRwcm90ZWN0ZWQgdG9vbEJhciAgICAgICAgICAgICAgIDogVUlUb29sYmFyO1xuXHRwcm90ZWN0ZWQgZGF0YVRhYmxlSUQgICAgICAgICAgIDogc3RyaW5nO1xuXHRwcml2YXRlIF9zaG93VG9vbEJhciAgICAgICAgICAgIDogYm9vbGVhbiAgPSBmYWxzZTtcblx0cHJpdmF0ZSBfbXVsdGlTZWxlY3QgICAgICAgICAgICA6IGJvb2xlYW4gID0gZmFsc2U7XG5cdHByaXZhdGUgX2F1dG9Db2x1bW5Db25maWd1cmUgID0gZmFsc2U7XG5cdHByaXZhdGUgX3Nob3dBZGREZWxldGVDb2x1bW5zID0gdHJ1ZTtcblx0cHJpdmF0ZSBfd2lkdGggICAgICAgICAgICAgICAgPSAwO1xuXHRwcml2YXRlIF9oZWlnaHQgICAgICAgICAgICAgICA9IDA7XG5cdHByaXZhdGUgX3RlbXBsYXRlIDogYW55ID0gbnVsbDtcblxuXHRnZXQgbXVsdGlTZWxlY3QoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fbXVsdGlTZWxlY3Q7XG5cdH1cblx0c2V0IG11bHRpU2VsZWN0KHZhbHVlOmJvb2xlYW4pIHtcblx0XHR0aGlzLl9tdWx0aVNlbGVjdCA9IHZhbHVlO1xuXHR9XG5cdGdldCBhdXRvQ29sdW1uQ29uZmlndXJlKCk6Ym9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9Db2x1bW5Db25maWd1cmU7XG5cdH1cblx0c2V0IGF1dG9Db2x1bW5Db25maWd1cmUodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX2F1dG9Db2x1bW5Db25maWd1cmUgPSB2YWx1ZTtcblx0fVxuXHRnZXQgc2hvd0FkZERlbGV0ZUNvbHVtbnMoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fc2hvd0FkZERlbGV0ZUNvbHVtbnM7XG5cdH1cblx0c2V0IHNob3dBZGREZWxldGVDb2x1bW5zKHZhbHVlOmJvb2xlYW4pIHtcblx0XHR0aGlzLl9zaG93QWRkRGVsZXRlQ29sdW1ucyA9IHZhbHVlO1xuXHR9XG5cdGdldCBoZWlnaHQoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblx0c2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpIHtcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcblx0fVxuXHRnZXQgd2lkdGgoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXHRzZXQgd2lkdGgodmFsdWU6bnVtYmVyKSB7XG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcblx0fVxuXG5cblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSURhdGFUYWJsZV9cIik7XG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcImRhdGFUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xuXHRcdHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSBmYWxzZTtcblx0fVxuXG5cblx0cHVibGljIGhpZGVDb2x1bW4oIGNvbHVtbklEIDogYW55KSB7XG5cblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpICQkKHRoaXMuZGF0YVRhYmxlSUQpLmhpZGVDb2x1bW4oY29sdW1uSUQpO1xuXHR9XG5cdHB1YmxpYyBzaG93Q29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xuXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5zaG93Q29sdW1uKGNvbHVtbklEKTtcblx0fVxuXG5cblxuXHRwdWJsaWMgbmV3SXRlbSgpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcblx0XHR2YXIgb2JqZWN0UHJveHkgID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoZUNvbXBvbmVudC51aUNsYXNzVHlwZSk7XG5cdFx0dmFyIG5hbWUgICAgICAgICA9IFwiQSBOZXcgXCIgKyBvYmplY3RQcm94eS5jbGFzc0xhYmVsKCk7XG5cdFx0dmFyIG5ld0lEICAgICAgICA9IG9iamVjdFByb3h5LmFkZE5ldyhuYW1lKTtcblx0XHR2YXIgbmV3T2JqZWN0ICAgID0gb2JqZWN0UHJveHkuZ2V0T25lKG5ld0lEKTtcblx0XHR2YXIgbmV3Um93SUQgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5hZGQobmV3T2JqZWN0KTtcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNob3dJdGVtKG5ld1Jvd0lEKTtcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNlbGVjdChuZXdSb3dJRCwgZmFsc2UpO1xuXHR9XG5cdHB1YmxpYyBkZWxldGVJdGVtKHRoZVRvb2xiYXI6VUlUb29sYmFyLCBsYWJlbDpzdHJpbmcpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcblx0XHR2YXIgcm93aWQgICAgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKCk7XG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xuXHRcdHZhciB0aGVPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xuXHRcdHRoZUNvbXBvbmVudC5oYW5kbGVEZWxldGUodGhlT2JqZWN0KTtcblx0fVxuXHRwdWJsaWMgb3B0aW9ucygpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcblx0XHR2YXIgcm93aWQgICAgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKCk7XG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xuXHRcdHZhciB0aGVPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xuXHRcdHRoZUNvbXBvbmVudC5oYW5kbGVEZWxldGUodGhlT2JqZWN0KTtcblx0fVxuXG5cdHB1YmxpYyBnZXRTZWxlY3RlZE9iamVjdCgpIDogYW55IHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTZWxlY3RlZCgpWzBdO1xuXHR9XG5cdHB1YmxpYyBnZXRTZWxlY3RlZCgpOkFycmF5PGFueT4ge1xuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkge1xuXHRcdFx0dmFyIGlkQXJyYXkgPSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZEl0ZW0odHJ1ZSk7XG5cdFx0XHRyZXR1cm4gaWRBcnJheTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIG9uU2VsZWN0Q2hhbmdlKGl0ZW1NZXNzYWdlOkl0ZW1TZWxlY3RlZEV2ZW50KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwib25TZWxlY3RDaGFuZ2VcIiwgaXRlbU1lc3NhZ2UpO1xuXHR9XG5cdHB1YmxpYyBhZGRDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgdGhlQ29sdW1uOmFueSkge1xuXHRcdHZhciBuZXdDb2x1bW4gPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgID0gdGhlQ29sdW1uO1xuXHRcdG5ld0NvbHVtbi5jb2x1bW5OdW1iZXIgICAgID0gY29sdW1uTnVtYmVyO1xuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdID0gbmV3Q29sdW1uO1xuXHR9XG5cdHB1YmxpYyBhZGRNYXBwZWRDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgcmVmZXJlbmNlQ2xhc3NGaWVsZDpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgZGlzcGxheUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcblx0XHR2YXIgbmV3Q29sdW1uICAgICAgICAgICAgICAgICA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XG5cdFx0bmV3Q29sdW1uLm1hcHBlZCAgICAgICAgICAgICAgPSB0cnVlO1xuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VDbGFzc0ZpZWxkID0gcmVmZXJlbmNlQ2xhc3NGaWVsZFxuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VGaWVsZCAgICAgID0gcmVmZXJlbmNlRmllbGROYW1lO1xuXHRcdG5ld0NvbHVtbi5kaXNwbGF5RmllbGROYW1lICAgID0gZGlzcGxheUZpZWxkTmFtZTtcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xuXHRcdHZhciBmdW5jdGlvbk1hbWUgICAgICAgICAgICA9IFwibWFwRnVuY3Rpb25cIiArIHdlYml4LnVpZCgpO1xuXHRcdHZhciBtYXBwZWRGdW5jdGlvbiAgICAgICAgICA9IG5ldyBGdW5jdGlvbignb2JqJywgJ3snICsgJ3ZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShvYmpbXCInICsgcmVmZXJlbmNlQ2xhc3NGaWVsZCArICdcIl1cIik7JyArICd2YXIgdGhpc09iamVjdCA9IG9iamVjdFByb3h5LmdldE9uZShvYmpbXCInICsgcmVmZXJlbmNlRmllbGROYW1lICsgJ1wiXSk7JyArICdpZiAoIXRoaXNPYmplY3QpIHJldHVybiBcIk5vdCBGb3VuZFwiOycgKyAncmV0dXJuIHRoaXNPYmplY3RbXCInICsgZGlzcGxheUZpZWxkTmFtZSArICdcIl07JyArICd9Jyk7XG5cdFx0bmV3Q29sdW1uLnRlbXBsYXRlICAgICAgICAgID0gbWFwcGVkRnVuY3Rpb247XG5cdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgID0gdGhlQ29sdW1uVmlldztcblx0XHRuZXdDb2x1bW4udmlld1tcIl90ZW1wbGF0ZVwiXSA9IG5ld0NvbHVtbi50ZW1wbGF0ZTtcblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSAgPSBuZXdDb2x1bW47XG5cdH1cbiAgICBwdWJsaWMgYWRkUmVmZXJlbmNlQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIHJlZmVyZW5jZUNsYXNzVHlwZTpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcblx0XHR2YXIgbmV3Q29sdW1uICAgICAgICAgICAgICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcblx0XHRuZXdDb2x1bW4ucmVmZXJlbmNlQ2xhc3NUeXBlID0gcmVmZXJlbmNlQ2xhc3NUeXBlO1xuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xuXHRcdHZhciBvYmplY3RQcm94eSAgICAgICAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocmVmZXJlbmNlQ2xhc3NUeXBlKTtcblx0XHR2YXIgb3B0aW9uTGlzdCAgICAgICAgID0gb2JqZWN0UHJveHkuZ2V0TGlzdChmYWxzZSk7XG5cdFx0bmV3Q29sdW1uLm9wdGlvbkxpc3QgICA9IG9wdGlvbkxpc3Q7XG5cdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciA9IGNvbHVtbk51bWJlcjtcblx0XHR2YXIgb3B0aW9uQXJyYXkgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIG9wdGlvbkxpc3QpIHtcblx0XHRcdHZhciBvcHRpb24gICAgICAgICAgICAgICAgID0gbmV3IEM0T2JqZWN0KCk7XG5cdFx0XHRvcHRpb25bXCJpZFwiXSAgICAgICAgICAgICAgID0gb3B0aW9uTGlzdFtpdGVtXVtcImlkXCJdO1xuXHRcdFx0b3B0aW9uW3JlZmVyZW5jZUZpZWxkTmFtZV0gPSBvcHRpb25MaXN0W2l0ZW1dW3JlZmVyZW5jZUZpZWxkTmFtZV07XG5cdFx0XHRvcHRpb25BcnJheS5wdXNoKG9wdGlvbik7XG5cdFx0fVxuXHRcdG5ld0NvbHVtbi52aWV3W1wib3B0aW9uc1wiXSA9IG9wdGlvbkxpc3Q7XG5cdFx0Ly9uZXdDb2x1bW4udmlld1tcIm9uXCJdID0geyBvbkNoYW5nZSA6IGZ1bmN0aW9uKCkgeyBVSS5NZXNzYWdlKFwiU2VsZWN0IENoYW5nZWRcIik7fX1cblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSA9IG5ld0NvbHVtbjtcblx0fVxuXHRwdWJsaWMgYWRkT3B0aW9uQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIG9wdGlvbkxpc3QsIHRoZUNvbHVtbikge1xuXHR9XG5cdHB1YmxpYyBzZXRMaXN0KHRoZUxpc3QpIHtcblx0XHR0aGlzLnRoZUxpc3QgPSB0aGVMaXN0O1xuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkge1xuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuY2xlYXJBbGwoKTtcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnBhcnNlKHRoaXMudGhlTGlzdCk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzZXRWYWx1ZSh0aGVMaXN0OmFueSkge1xuXHRcdHRoaXMuc2V0TGlzdCh0aGVMaXN0KTtcblx0fVxuXHRwdWJsaWMgc2V0RWRpdGFibGUodGhlRmxhZzpib29sZWFuKSB7XG5cdFx0dGhpcy5lZGl0YWJsZSA9IHRoZUZsYWc7XG5cdH1cblx0cHVibGljIG9uU3RvcEVkaXQodGhlRmllbGQ6VUlEYXRhVGFibGVGaWVsZCkge1xuXHRcdGlmICh0aGlzLnB1Ymxpc2goXCJvblN0b3BFZGl0XCIsIHRoZUZpZWxkKSlcblx0XHRcdHJldHVybjtcblx0XHRpZiAodGhlRmllbGQubmV3VmFsdWUgPT0gdGhlRmllbGQub2xkVmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcblx0XHRcdG9iamVjdFByb3h5LnVwZGF0ZUF0dHJpYnV0ZSh0aGVGaWVsZC5yb3dPYmplY3QuX2lkLCB0aGVGaWVsZC5jb2x1bW5OYW1lLCB0aGVGaWVsZC5uZXdWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHJlZnJlc2hSb3cocm93SUQgOiBhbnkpIHtcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpXG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5yZWZyZXNoKHJvd0lEKTtcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVFZGl0U3RhcnQodGhlRmllbGQgOiBVSURhdGFUYWJsZUZpZWxkKSB7XG5cdFx0aWYgKHRoaXMucHVibGlzaChcIm9uQmVmb3JlRWRpdFN0YXJ0XCIsIHRoZUZpZWxkKSlcblx0XHRcdHJldHVybjtcblx0fVxuXHRwdWJsaWMgaGFuZGxlRGVsZXRlKHRoZU9iamVjdDphbnkpIHtcblx0XHRVSS5NZXNzYWdlKFwiSGFuZGxlIERlbGV0ZVwiICsgdGhlT2JqZWN0Ll9pZClcblx0fVxuXHRwdWJsaWMgY3JlYXRlTmF2aWdhdGlvbkJhcigpIHtcblx0XHR0aGlzLnRvb2xCYXIgPSBuZXcgVUlUb29sYmFyKCk7XG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJOZXdcIiwgXCJuZXdJdGVtXCIpXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJEZWxldGVcIiwgXCJkZWxldGVJdGVtXCIpXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJPcHRpb25zXCIsIFwib3B0aW9uc1wiKVxuXHRcdHRoaXMudG9vbEJhci5hZGRJdGVtKFwiRXhwb3J0XCIsIFwiZXhwb3J0XCIpO1xuXHRcdHRoaXMudG9vbEJhci5zZXREYXRhKHRoaXMpO1xuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XG5cdFx0XHR0aGlzLnRvb2xCYXIuc2V0VG9vbEJhcihGYWN0b3J5LkdldENsYXNzTGFiZWwodGhpcy51aUNsYXNzVHlwZSksIEZhY3RvcnkuR2V0Q2xhc3NJY29uKHRoaXMudWlDbGFzc1R5cGUpKVxuXHRcdH1cblx0fVxuXHRwdWJsaWMgbGlzdGVuKGV2ZW50LCBvYmplY3QsIHB1Ymxpc2hlcikge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJuZXdJdGVtXCIgOlxuXHRcdFx0Y2FzZSBcImRlbGV0ZUl0ZW1cIiA6XG5cdFx0XHRjYXNlIFwib3B0aW9uc1wiIDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiZXhwb3J0XCI6XG5cdFx0XHRcdHRoaXMuZXhwb3J0VG9FeGNlbCgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgZXhwb3J0VG9FeGNlbCgpIHtcblx0XHRVSS5FeHBvcnRUb0V4Y2VsKHRoaXMuZGF0YVRhYmxlSUQpO1xuXHR9XG5cdHB1YmxpYyBnZXRMaXN0KCk6QXJyYXk8YW55PiB7XG5cdFx0aWYgKHRoaXMudGhlTGlzdClcblx0XHRcdHJldHVybiB0aGlzLnRoZUxpc3Q7XG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcblx0XHRcdHZhciByZXR1cm5MaXN0ICA9IG9iamVjdFByb3h5LmdldExpc3QodHJ1ZSk7XG5cdFx0XHRyZXR1cm4gcmV0dXJuTGlzdDtcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBBcnJheTxhbnk+KCk7XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbHVtblZpZXcoKTphbnkge1xuXHRcdHZhciBjb2x1bW5WaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgaSAgICAgICAgICA9IDA7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbHVtbnMpIHtcblx0XHRcdGNvbHVtblZpZXdbdGhpcy5jb2x1bW5zW2l0ZW1dLmNvbHVtbk51bWJlcl0gPSB0aGlzLmNvbHVtbnNbaXRlbV0udmlldztcblx0XHRcdGkrKztcblx0XHR9XG5cdFx0aWYgKHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMpIHtcblx0XHRcdGNvbHVtblZpZXdbaSsrXSA9IHtcblx0XHRcdFx0aWQ6IFwiXCIsIHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0dmlldyAgICAgIDogXCJidXR0b25cIixcblx0XHRcdFx0XHR0eXBlICAgICAgOiBcImh0bWxidXR0b25cIixcblx0XHRcdFx0XHRsYWJlbCAgICAgOiAnPHNwYW4gY2xhc3M9XCJ3ZWJpeF9pY29uIGZhLWFuZ2xlLWxlZnRcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+YmFjazwvc3Bhbj4nLFxuXHRcdFx0XHRcdGlucHV0V2lkdGg6IDgwXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbHVtblZpZXdbaSsrXSA9IHtpZDogXCJkcmFnXCIsIGhlYWRlcjogXCJcIiwgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nd2ViaXhfZHJhZ19oYW5kbGUnPjwvZGl2PlwiLCB3aWR0aDogMzV9XG5cdFx0fVxuXHRcdHJldHVybiBjb2x1bW5WaWV3O1xuXHR9XG5cdHB1YmxpYyBzZXRDb2x1bW5zKGNvbHVtbnMgOiBBcnJheTxhbnk+KSB7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHRmb3IgKHZhciBpdGVtIGluIGNvbHVtbnMpIHtcblx0XHRcdHZhciBuZXdDb2x1bW4gPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXHRcdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgPSBjb2x1bW5zW2l0ZW1dO1xuXHRcdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciAgICAgPSBpbmRleCsrO1xuXHRcdFx0dGhpcy5jb2x1bW5zW2luZGV4XSA9IG5ld0NvbHVtbjtcblx0XHR9XG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XG5cdFx0XHR0aGlzLnJlcGxhY2VDb2x1bW5zKGNvbHVtbnMpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgcmVwbGFjZUNvbHVtbnMoY29sdW1ucyA6IEFycmF5PGFueT4pIHtcblx0XHR0aGlzLmNvbHVtbnMgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcblx0XHR2YXIgaW5kZXg9MDtcblx0XHRmb3IgKHZhciBpdGVtIGluIGNvbHVtbnMpIHtcblx0XHRcdHRoaXMuYWRkQ29sdW1uKGluZGV4KyssY29sdW1uc1tpdGVtXSk7XG5cdFx0fVxuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLmNvbmZpZy5jb2x1bW5zID0gdGhpcy5jcmVhdGVDb2x1bW5WaWV3KCk7O1xuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnJlZnJlc2hDb2x1bW5zKCk7XG5cdH1cblx0cHVibGljIHNvcnQocHJvcGVydHkgOiBzdHJpbmcsIHNvcnREaXJlY3Rpb246c3RyaW5nLCB0eXBlOnN0cmluZz1cInN0cmluZ1wiKSB7XG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKVxuXHRcdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5zb3J0KHByb3BlcnR5LHNvcnREaXJlY3Rpb24sdHlwZSk7XG5cblx0fVxuXG5cdHB1YmxpYyBmaWx0ZXIoIGZ1bmMgOiBhbnkpIHtcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5maWx0ZXIoZnVuYyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jcmVhdGVOYXZpZ2F0aW9uQmFyKCk7XG5cdFx0dmFyIHJvd3MgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciBpICAgID0gMDtcblx0XHRpZiAodGhpcy5fc2hvd1Rvb2xCYXIpIHtcblx0XHRcdHZhciBuYXZCYXJWaWV3ID0gdGhpcy50b29sQmFyLmdldFZpZXcoKTtcblx0XHRcdHJvd3NbMF0gICAgICAgID0gbmF2QmFyVmlldztcblx0XHRcdGkrK1xuXHRcdH1cblx0XHR2YXIgdmlldyA9ICB7XG5cdFx0XHRpZCAgICAgICAgICA6IHRoaXMuZGF0YVRhYmxlSUQsXG5cdFx0XHR2aWV3ICAgICAgICA6IHRoaXMudmlld1R5cGUsXG5cdFx0XHRzZWxlY3QgICAgICA6IFwicm93XCIsXG5cdFx0XHRuYXZpZ2F0aW9uICA6IHRydWUsXG5cdFx0XHRyZXNpemVDb2x1bW46IHRydWUsXG5cdFx0XHRzY3JvbGx4eSAgICA6IHRydWUsXG5cdFx0XHRkcmFnQ29sdW1uICA6IHRydWUsXG5cdFx0XHRlZGl0YWJsZSAgICA6IHRoaXMuZWRpdGFibGUsXG5cdFx0XHRlZGl0YWN0aW9uICA6IHRoaXMuZWRpdGFjdGlvbixcblx0XHR9O1xuXG5cdFx0aWYgKHRoaXMuaGVpZ2h0ID4gMCkge1xuXHRcdFx0dmlld1tcImhlaWdodFwiXSA9IHRoaXMuaGVpZ2h0O1xuXHRcdH1cblx0XHRpZiAodGhpcy53aWR0aCA+IDApIHtcblx0XHRcdHZpZXdbXCJ3aWR0aFwiXSA9IHRoaXMud2lkdGg7XG5cblx0XHR9XG5cdFx0aWYgKHRoaXMuYXV0b0NvbHVtbkNvbmZpZ3VyZSkge1xuXHRcdFx0dmlld1tcImF1dG9Db25maWdcIl0gPSB0cnVlO1xuXHRcdH0gZWxzZVxuXHRcdFx0dmlld1tcImNvbHVtbnNcIl0gPSB0aGlzLmNyZWF0ZUNvbHVtblZpZXcoKTtcblx0XHRpZiAodGhpcy5tdWx0aVNlbGVjdClcblx0XHRcdHZpZXdbXCJtdWx0aXNlbGVjdFwiXSA9IHRydWU7XG5cdFx0aWYgKHRoaXMudGVtcGxhdGUpIHtcblx0XHRcdHZpZXdbXCJfdGVtcGxhdGVcIl0gPSB0aGlzLnRlbXBsYXRlO1xuXHRcdH1cblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHR5cGU6IFwic3BhY2VcIiwgcm93czogWyB2aWV3IF1cblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25TZWxlY3RDaGFuZ2VcIiwgVUlFdmVudEhhbmRsZXIub25TZWxlY3RDaGFuZ2UpO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkFmdGVyRWRpdFN0b3BcIiwgVUlFdmVudEhhbmRsZXIub25BZnRlckVkaXRTdG9wKTtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtRGJsQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtRGJsQ2xpY2spO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkJlZm9yZUVkaXRTdGFydFwiLCBVSUV2ZW50SGFuZGxlci5vbkJlZm9yZUVkaXRTdGFydFRhYmxlKTtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtQ2xpY2spO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR2YXIgcmVzdWx0TGlzdCA9IHRoaXMuZ2V0TGlzdCgpO1xuXHRcdGlmIChyZXN1bHRMaXN0KVxuXHRcdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5wYXJzZShyZXN1bHRMaXN0KTtcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpXG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdFx0aWYgKHRoaXMuX3Nob3dUb29sQmFyKVx0dGhpcy50b29sQmFyLmluaXRpYWxpemUoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cblx0cHVibGljIGdldFRhYmxlTGlzdCgpIDogQXJyYXk8YW55PiB7XG5cdFx0dmFyIGRhdGF0YWJsZSA9ICQkKHRoaXMuZGF0YVRhYmxlSUQpXG5cdFx0dmFyIGRhdGFMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5lYWNoUm93KFxuXHRcdFx0ZnVuY3Rpb24gKHJvdyl7XG5cdFx0XHRcdHZhciBpdGVtID0gZGF0YXRhYmxlLmdldEl0ZW0ocm93KTtcblx0XHRcdFx0ZGF0YUxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHQpXG5cdFx0cmV0dXJuIGRhdGFMaXN0O1xuXHR9XG5cbn0gdGhpcy5VSURhdGFUYWJsZSA9IFVJRGF0YVRhYmxlO1xuXG5jbGFzcyBVSVRyZWVUYWJsZSBleHRlbmRzIFVJRGF0YVRhYmxlIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSVRyZWVUYWJsZV9cIik7XG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcInRyZWVUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xuXHRcdHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSBmYWxzZTtcblx0XHR0aGlzLnZpZXdUeXBlID0gXCJ0cmVldGFibGVcIjtcblx0fVxuXG59IHRoaXMuVUlUcmVlVGFibGUgPSBVSVRyZWVUYWJsZTtcblxuY2xhc3MgVUlDYWxlbmRhckZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlDYWxlbmRhckZpZWxkX1wiKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcblx0XHRcdGlkICAgICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICAgICAgICAgIDogXCJkYXRlcGlja2VyXCIsXG5cdFx0XHRuYW1lICAgICAgICAgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsIC8vZGF0ZTogIG5ldyBEYXRlKDIwMTIsIDYsIDgpLFxuXHRcdFx0dmFsdWUgICAgICAgICAgICAgOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0XHRsYWJlbCAgICAgICAgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoICAgICAgICA6IDEwMCxcblx0XHRcdGV2ZW50cyAgICAgICAgICAgIDogd2ViaXguRGF0ZS5pc0hvbGlkYXksXG5cdFx0XHRjYWxlbmRhckRhdGVGb3JtYXQ6IFwiJVktJW0tJWRcIlxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0fVxuXG59IHRoaXMuVUlDYWxlbmRhckZpZWxkID0gVUlDYWxlbmRhckZpZWxkO1xuXG5jbGFzcyBVSUNvbXBsZXhDb21wb25lbnQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIGNvbXBvbmVudEFycmF5OkFycmF5PFVJQ29tcG9uZW50PjtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUNvbXBsZXhDb21wb25lbnRfXCIpO1xuXHRcdHRoaXMuY29tcG9uZW50QXJyYXkgPSBuZXcgQXJyYXk8VUlDb21wb25lbnQ+KCk7XG5cdH1cblxuXHRwdWJsaWMgYWRkQ29tcG9uZW50KGxhYmVsOnN0cmluZywgY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0dGhpcy5jb21wb25lbnRBcnJheVtsYWJlbF0gPSBjb21wb25lbnQ7XG5cdFx0aWYgKGNvbXBvbmVudCkgY29tcG9uZW50LnNldFByb3BlcnR5KFwibmFtZVwiLCBsYWJlbCk7XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbXBvbmVudHNWaWV3KCk6YW55IHtcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgaSAgICAgICAgID0gMDtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcblx0XHRcdGlmIChpdGVtICE9IFwidG9vbGJhclwiKVxuXHRcdFx0XHR2aWV3QXJyYXlbaSsrXSA9IHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZ2V0VmlldygpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmlld0FycmF5O1xuXHR9XG5cdHB1YmxpYyBudW1PZkNvbXBvbmVudHMoKTpudW1iZXIge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudEFycmF5KS5sZW5ndGhcblx0fVxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZyk6VUlDb21wb25lbnQge1xuXHRcdHZhciBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEFycmF5W2xhYmVsXTtcblx0XHRyZXR1cm4gY29tcG9uZW50XG5cdH1cblx0cHVibGljIGdldEZpZWxkQ29tcG9uZW50KGxhYmVsOnN0cmluZyk6VUlGaWVsZCB7XG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50QXJyYXlbbGFiZWxdO1xuXHRcdHJldHVybiBjb21wb25lbnRcblx0fVxuXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHR9XG5cdFxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uc2V0RGF0YSh0aGlzKTtcblx0XHR9XG5cdH1cblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkgJCQodGhpcy5jb21wb25lbnRJRCkuZGVzdHJ1Y3RvcigpO1xuXHR9XG5cdHB1YmxpYyBkZXN0cnVjdG9yKCkge1xuXHRcdHN1cGVyLmRlc3RydWN0b3IoKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZGVzdHJ1Y3RvcigpO1xuXHRcdH1cblx0fVxuXG59IHRoaXMuVUlDb21wbGV4Q29tcG9uZW50ID0gVUlDb21wbGV4Q29tcG9uZW50O1xuXG5jbGFzcyBQb3J0YWxTZWN0aW9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xuXHRwdWJsaWMgcG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBudWxsO1xuXHRwdWJsaWMgY2xhc3NUeXBlOkNsYXNzVHlwZTtcblx0cHVibGljIHRoZUFycmF5OkFycmF5PGFueT47XG5cdHB1YmxpYyBncmF2aXR5Om51bWJlciAgICAgICAgICAgICA9IDE7XG5cdHB1YmxpYyBwb3J0bGV0TmFtZSAgICAgICAgICAgICAgICA9IFwiXCI7XG5cdHB1YmxpYyBzZWN0aW9uSGVhZGVyOlBvcnRhbEhlYWRlciA9IG51bGw7XG5cdHByaXZhdGUgdGVtcGxhdGUgICAgICAgICAgICAgICAgICA9IHt0eXBlOiBcImxpbmVcIn07XG5cdHByaXZhdGUgX3Njcm9sbEJhclggICAgICAgICAgICAgICA9IGZhbHNlO1xuXHRwcml2YXRlIF9zY3JvbGxCYXJZICAgICAgICAgICAgICAgPSBmYWxzZTtcblx0Ly9lbmRyZWdpb25cblx0Ly9yZWdpb24gQ2xhc3MgVmFyaWFibGVzXG5cdHB1YmxpYyBzdGF0aWMgQ09MVU1OUyA9IFwiY29sc1wiO1xuXHRwdWJsaWMgc3RhdGljIFJPV1MgICAgPSBcInJvd3NcIjtcblx0cHVibGljIHN0YXRpYyBSRVNJWkVSID0gXCJyZXNpemVyXCI7XG5cdHB1YmxpYyBzdGF0aWMgUk9PVCAgICA9IFwicm9vdDtcIlxuXHRwdWJsaWMgc3RhdGljIEhFQURFUiAgPSBcImhlYWRlclwiO1xuXHRwdWJsaWMgc3RhdGljIFBPUlRMRVQgPSBcInBvcnRsZXRcIjtcblx0Ly9lbmRyZWdpb25cblx0Ly9yZWdpb24gQ2xhc3MgTWV0aG9kc1xuXHRwdWJsaWMgc3RhdGljIENyZWF0ZUNvbHVtbnMoKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxDb2x1bW4oKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlUm93cygpIHtcblx0XHRyZXR1cm4gbmV3IFBvcnRhbFJvdygpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBDcmVhdGVSb290KCkge1xuXHRcdHJldHVybiBuZXcgUG9ydGFsUm9vdCgpO1xuXHR9XG5cblx0Ly9lbmRyZWdpb25cblx0Z2V0IHNjcm9sbEJhclgoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsQmFyWDtcblx0fVxuXHRzZXQgc2Nyb2xsQmFyWCh2YWx1ZTpib29sZWFuKSB7XG5cdFx0dGhpcy5fc2Nyb2xsQmFyWCA9IHZhbHVlO1xuXHR9XG5cdGdldCBzY3JvbGxCYXJZKCk6Ym9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbEJhclk7XG5cdH1cblx0c2V0IHNjcm9sbEJhclkodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX3Njcm9sbEJhclkgPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKG5hbWUgPSBcIm5vU2VjdGlvbk5hbWVcIikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFNlY3Rpb25fXCIpO1xuXHRcdHRoaXMudGhlQXJyYXkgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHRoaXMucG9ydGxldE5hbWUgPSBuYW1lO1xuXHR9XG5cblx0cHVibGljIGFkZFBvcnRsZXQobmFtZSwgZ3Jhdml0eSA9IDEpOlBvcnRsZXQge1xuXHRcdHZhciBwb3J0bGV0ID0gbmV3IFBvcnRsZXQobmFtZSwgZ3Jhdml0eSk7XG5cdFx0dGhpcy50aGVBcnJheS5wdXNoKHBvcnRsZXQpO1xuXHRcdHJldHVybiBwb3J0bGV0O1xuXHR9XG5cdHB1YmxpYyBhZGRTZWN0aW9uKHRoZVNlY3Rpb246UG9ydGFsU2VjdGlvbiwgZ3Jhdml0eSA9IDEpIHtcblx0XHR0aGlzLnRoZUFycmF5LnB1c2godGhlU2VjdGlvbik7XG5cdFx0dGhpcy5ncmF2aXR5ID0gZ3Jhdml0eVxuXHR9XG5cdHB1YmxpYyBhZGRSZXNpemVyKCk6UG9ydGFsU2VjdGlvbiB7XG5cdFx0dmFyIHJlc2l6ZXIgPSBuZXcgUG9ydGFsUmVzaXplcigpO1xuXHRcdHRoaXMudGhlQXJyYXkucHVzaChyZXNpemVyKTtcblx0XHRyZXR1cm4gcmVzaXplcjtcblx0fVxuXHRwdWJsaWMgYWRkSGVhZGVyKHRpdGxlOnN0cmluZyk6UG9ydGFsSGVhZGVyIHtcblx0XHR2YXIgaGVhZGVyID0gbmV3IFBvcnRhbEhlYWRlcih0aXRsZSk7XG5cdFx0dGhpcy50aGVBcnJheS51bnNoaWZ0KGhlYWRlcik7XG5cdFx0dGhpcy5zZWN0aW9uSGVhZGVyID0gaGVhZGVyO1xuXHRcdHJldHVybiBoZWFkZXI7XG5cdH1cblx0cHVibGljIHJlbW92ZUhlYWRlcigpIHtcblx0XHRpZiAoIXRoaXMuc2VjdGlvbkhlYWRlcikgcmV0dXJuO1xuXHRcdHRoaXMudGhlQXJyYXkuc2hpZnQoKTtcblx0fVxuXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMudGVtcGxhdGVbXCJncmF2aXR5XCJdID0gdGhpcy5ncmF2aXR5O1xuXHRcdHRoaXMudGVtcGxhdGVbXCJpZFwiXSAgICAgID0gdGhpcy5jb21wb25lbnRJRDtcblx0XHR0aGlzLnRlbXBsYXRlW1wiZHJhZ1wiXSAgICA9IHRydWU7XG5cdFx0aWYgKHRoaXMuc2Nyb2xsQmFyWCAmJiB0aGlzLnNjcm9sbEJhclkpIHtcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx4eVwiXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnNjcm9sbEJhclgpXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseFwiXSA9IHRydWU7IGVsc2UgaWYgKHRoaXMuc2Nyb2xsQmFyWSlcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx5XCJdID0gdHJ1ZTtcblx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy50aGVBcnJheSkge1xuXHRcdFx0dGhpcy50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9lbmRyZWdpb25cbn0gdGhpcy5Qb3J0YWxTZWN0aW9uID0gUG9ydGFsU2VjdGlvbjtcblxuY2xhc3MgUG9ydGFsQ29sdW1uIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xuXHRcdHN1cGVyKG5hbWUpO1xuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ID0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TO1xuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxDb2x1bW5fXCIpO1xuXHR9XG59IHRoaXMuUG9ydGFsQ29sdW1uID0gUG9ydGFsQ29sdW1uXG5cbmNsYXNzIFBvcnRhbFJvb3QgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XG5cdFx0c3VwZXIobmFtZSk7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPT1Q7XG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgPSBcInJvb3RcIjtcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsUm9vdF9cIik7XG5cdH1cbn0gdGhpcy5Qb3J0YWxSb290ID0gUG9ydGFsUm9vdFxuXG5jbGFzcyBQb3J0YWxSb3cgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XG5cdFx0c3VwZXIobmFtZSk7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgPSBcInJvd1wiO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSb3dfXCIpO1xuXHR9XG59dGhpcy5Qb3J0YWxSb3cgPSBQb3J0YWxSb3c7XG5cbmNsYXNzIFBvcnRhbEhlYWRlciBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xuXHRwdWJsaWMgaGVhZGVyVGVtcGxhdGUgICAgPSB7dmlldzogXCJ0ZW1wbGF0ZVwiLCB0ZW1wbGF0ZTogXCJIZWFkZXJcIiwgdHlwZTogXCJoZWFkZXJcIn07XG5cdHB1YmxpYyBoZWFkZXJWaWV3OmFueTtcblx0cHVibGljIGhlYWRlclRleHQ6c3RyaW5nID0gbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxIZWFkZXJfXCIpO1xuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5IRUFERVI7XG5cdFx0dGhpcy5oZWFkZXJUZW1wbGF0ZVtcImlkXCJdICAgICAgID0gXCJoZWFkZXJfXCIgKyB3ZWJpeC51aWQoKTtcblx0XHR0aGlzLmhlYWRlclRlbXBsYXRlW1widGVtcGxhdGVcIl0gPSB0aXRsZTtcblx0XHR0aGlzLmhlYWRlclRleHQgICAgICAgICAgICAgICAgID0gdGl0bGU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuaGVhZGVyVGVtcGxhdGU7XG5cdH1cbn10aGlzLlBvcnRhbEhlYWRlciA9IFBvcnRhbEhlYWRlcjtcbmNsYXNzIFBvcnRhbFJlc2l6ZXIgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0cHVibGljICByZXNpemVyVGVtcGxhdGUgPSB7dmlldzogXCJyZXNpemVyXCJ9O1xuXG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xuXHRcdHN1cGVyKG5hbWUpO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSZXNpemVyX1wiKTtcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCAgICA9IFBvcnRhbFNlY3Rpb24uUkVTSVpFUjtcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICA9IFBvcnRhbFNlY3Rpb24uUkVTSVpFUjtcblx0XHR0aGlzLnJlc2l6ZXJUZW1wbGF0ZVtcImlkXCJdID0gXCJ1aVJlc2l6ZXJfXCIgKyB3ZWJpeC51aWQoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5yZXNpemVyVGVtcGxhdGU7XG5cdH1cbn10aGlzLlBvcnRhbFJlc2l6ZXIgPSBQb3J0YWxSZXNpemVyO1xuXG5jbGFzcyBQb3J0bGV0IGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XG5cblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXG5cdHB1YmxpYyBwb3J0bGV0Vmlldzphbnk7XG5cdHB1YmxpYyBwb3J0bGV0Q29tcG9uZW50Vmlldzphbnk7XG5cdHB1YmxpYyBkZWZhdWx0UG9ydGxldFZpZXc6YW55O1xuXHRwdWJsaWMgbm9uQ29tcG9uZW50VmlldzphbnkgPSBudWxsO1xuXHRwdWJsaWMgaW50ZXJuYWxWaWV3OmFueVxuXHRwdWJsaWMgZ3Jhdml0eTpudW1iZXI7XG5cdHB1YmxpYyB2aWV3Q29udHJvbGxlcjpVSUNvbXBvbmVudDtcblx0cHVibGljIGhpZGRlbjpib29sZWFuICAgICAgID0gZmFsc2U7XG5cdC8vZW5kcmVnaW9uXG5cdHB1YmxpYyBzdGF0aWMgY2FzdChhU2VjdGlvbjphbnkpOlBvcnRsZXQge1xuXHRcdHJldHVybiA8UG9ydGxldD4gYVNlY3Rpb247XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihwb3J0bGV0TmFtZTpzdHJpbmcsIGdyYXZpdHkgPSAxKSB7XG5cdFx0c3VwZXIocG9ydGxldE5hbWUpO1xuXHRcdHRoaXMuZ3Jhdml0eSAgICAgICAgICAgICAgPSBncmF2aXR5O1xuXHRcdHRoaXMucG9ydGxldFZpZXcgICAgICAgICAgPSB7aWQ6IHRoaXMuY29tcG9uZW50SUQsIG1pbldpZHRoOiAxMDAsIHRlbXBsYXRlOiBcIkNvbnRlbnRcIiwgdmlldzogXCJ0ZW1wbGF0ZVwifVxuXHRcdHRoaXMucG9ydGxldENvbXBvbmVudFZpZXcgPSB7dHlwZTogXCJsaW5lXCJ9XG5cdFx0dGhpcy5kZWZhdWx0UG9ydGxldFZpZXcgICA9IHRoaXMucG9ydGxldFZpZXc7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggICA9IFBvcnRhbFNlY3Rpb24uUE9SVExFVDtcblx0XHR0aGlzLnNldElEKFwiUG9ydGxldF9cIik7XG5cdH1cblxuXHRwdWJsaWMgcmVwbGFjZVZpZXcoKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWaWV3KCksIG51bGwsIDYpKTtcblx0XHR3ZWJpeC51aSh0aGlzLmdldFZpZXcoKSwgJCQodGhpcy5jb21wb25lbnRJRCkpO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXHRcdC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0VmlldygpLCBudWxsLCA2KSk7XG5cdH1cblx0cHVibGljIGhpZGUoKSB7XG5cdFx0dGhpcy5oaWRkZW4gPSB0cnVlO1xuXHR9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cdH1cblx0cHVibGljIHJlc2V0VmlldygpIHtcblx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXdcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xuXHRcdHRoaXMudmlld0NvbnRyb2xsZXIgPSB0aGVDb21wb25lbnQ7XG5cdH1cblx0cHVibGljIHJlc2l6ZSgpIHtcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudHMgTWV0aG9kc1xuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0aWYgKHRoaXMudmlld0NvbnRyb2xsZXIpIHtcblx0XHRcdHZhciB2aWV3QXJyYXkgICAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3ICAgICAgICAgPSB0aGlzLnBvcnRsZXRDb21wb25lbnRWaWV3O1xuXHRcdFx0dmFyIGNvbnRyb2xsZXJWaWV3ICAgICAgID0gdGhpcy52aWV3Q29udHJvbGxlci5nZXRWaWV3KCk7XG5cdFx0XHR2aWV3QXJyYXlbMF0gICAgICAgICAgICAgPSBjb250cm9sbGVyVmlldztcblx0XHRcdHRoaXMucG9ydGxldFZpZXdbXCJyb3dzXCJdID0gdmlld0FycmF5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXc7XG5cdFx0fVxuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJpZFwiXSAgICAgID0gdGhpcy5nZXRDb21wb25lbnRJRCgpO1xuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJncmF2aXR5XCJdID0gdGhpcy5ncmF2aXR5O1xuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJkcmFnXCJdICAgID0gdHJ1ZTtcblx0XHRyZXR1cm4gdGhpcy5wb3J0bGV0Vmlldztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdGlmICh0aGlzLnZpZXdDb250cm9sbGVyKSB7XG5cdFx0XHR0aGlzLnZpZXdDb250cm9sbGVyLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnRoZUFycmF5KSB7XG5cdFx0XHR0aGlzLnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdH1cblx0Ly9lbmRyZWdpb25cbn0gdGhpcy5Qb3J0bGV0ID0gUG9ydGxldDtcblxuZW51bSBQb3J0YWxUeXBlIHsgT25lVmlldywgRXhwbG9yZXJWaWV3LCBEZXRhaWxWaWV3IH10aGlzLlBvcnRhbFR5cGUgPSBQb3J0YWxUeXBlO1xuZW51bSBQb3J0YWxOYW1lcyB7RVhQTE9SRVIgPSAwLCBERVRBSUwgPSAxLCBNQUlOID0gMiwgSU5GTyA9IDN9dGhpcy5Qb3J0YWxOYW1lcyA9IFBvcnRhbE5hbWVzO1xuXG5jbGFzcyBQb3J0YWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cdHB1YmxpYyBwb3J0YWxSb290OlBvcnRhbFJvb3Q7XG5cdHB1YmxpYyBwb3J0YWxDb250YWluZXI6c3RyaW5nID0gbnVsbDtcblx0cHVibGljIHZpZXdQb3J0bGV0OlBvcnRsZXQgICAgPSBudWxsO1xuXHRwdWJsaWMgcG9ydGFsVHlwZTpQb3J0YWxUeXBlO1xuXHRwdWJsaWMgbmV3Vmlld1BvcnQ6Ym9vbGVhbiAgICA9IGZhbHNlO1xuXHRwdWJsaWMgdmlld1R5cGUgICAgICAgICAgICAgICA9IG51bGw7XG5cdHB1YmxpYyBzZWN0aW9uVGVtcGxhdGUgICAgICAgID0ge3R5cGU6IFwibGluZVwifTtcblxuXHRjb25zdHJ1Y3Rvcihwb3J0YWxUeXBlPzpQb3J0YWxUeXBlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsX1wiKTtcblx0XHR0aGlzLnBvcnRhbFJvb3QgPSBuZXcgUG9ydGFsUm9vdCgpO1xuXHRcdGlmICghcG9ydGFsVHlwZSkge1xuXHRcdFx0c3dpdGNoIChwb3J0YWxUeXBlKSB7XG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5PbmVWaWV3IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZU9uZVZpZXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFBvcnRhbFR5cGUuRXhwbG9yZXJWaWV3IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5EZXRhaWxWaWV3IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZURldGFpbFZpZXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBwb3J0YWxTdHJpbmcocG9ydGFsTmFtZXM6UG9ydGFsTmFtZXMpIHtcblx0XHRzd2l0Y2ggKHBvcnRhbE5hbWVzKSB7XG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLkVYUExPUkVSIDpcblx0XHRcdFx0cmV0dXJuIFwiZXhwbG9yZXJcIjtcblx0XHRcdGNhc2UgUG9ydGFsTmFtZXMuREVUQUlMIDpcblx0XHRcdFx0cmV0dXJuIFwiZGV0YWlsQXJlYVwiO1xuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5NQUlOIDpcblx0XHRcdFx0cmV0dXJuIFwibWFpblwiO1xuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5JTkZPIDpcblx0XHRcdFx0cmV0dXJuIFwiaW5mb1wiO1xuXHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdHJldHVybiBcIk5PTkFNRVwiO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpIHtcblx0XHR2YXIgcm9vdCAgICAgID0gdGhpcy5nZXRSb290KCk7XG5cdFx0dmFyIG5ld0NvbHVtbiA9IHRoaXMuY3JlYXRlQ29sdW1ucyhcImNvbHVtbnNcIik7XG5cdFx0dmFyIG5ld1JvdyAgICA9IHRoaXMuY3JlYXRlUm93cyhcInJvd3NcIik7XG5cdFx0cm9vdC5hZGRTZWN0aW9uKG5ld0NvbHVtbik7XG5cdFx0bmV3Q29sdW1uLmFkZFBvcnRsZXQoUG9ydGFsTmFtZXMuRVhQTE9SRVIpO1xuXHRcdG5ld0NvbHVtbi5hZGRSZXNpemVyKCk7XG5cdFx0bmV3Um93LmFkZFBvcnRsZXQoUG9ydGFsTmFtZXMuREVUQUlMKTtcblx0XHRuZXdSb3cuYWRkUmVzaXplcigpO1xuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KFBvcnRhbE5hbWVzLklORk8pO1xuXHRcdG5ld0NvbHVtbi5hZGRTZWN0aW9uKG5ld1Jvdyk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemVPbmVWaWV3KCkge1xuXHRcdHZhciByb290ICAgICAgPSB0aGlzLmdldFJvb3QoKTtcblx0XHR2YXIgbmV3Q29sdW1uID0gdGhpcy5jcmVhdGVDb2x1bW5zKFwiY29sdW1uc1wiKTtcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcblx0XHRuZXdDb2x1bW4uYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5NQUlOKSk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemVEZXRhaWxWaWV3KCkge1xuXHRcdHZhciByb290ICAgPSB0aGlzLmdldFJvb3QoKTtcblx0XHR2YXIgbmV3Um93ID0gdGhpcy5jcmVhdGVSb3dzKFwicm93c1wiKTtcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Um93KTtcblx0XHRuZXdSb3cuYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5ERVRBSUwpKTtcblx0XHRuZXdSb3cuYWRkUmVzaXplcigpO1xuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLklORk8pKTtcblx0fVxuXHRwdWJsaWMgZ2V0Um9vdCgpOlBvcnRhbFJvb3Qge1xuXHRcdHJldHVybiB0aGlzLnBvcnRhbFJvb3Q7XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbHVtbnMobmFtZT8pOlBvcnRhbENvbHVtbiB7XG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxDb2x1bW4obmFtZSk7XG5cdH1cblx0cHVibGljIGNyZWF0ZVJvd3MobmFtZT86c3RyaW5nKTpQb3J0YWxSb3cge1xuXHRcdHJldHVybiBuZXcgUG9ydGFsUm93KG5hbWUpO1xuXHR9XG5cdHB1YmxpYyBzZXRDb250YWluZXIoY29udGFpbmVySUQ6c3RyaW5nKSB7XG5cdFx0dGhpcy5wb3J0YWxDb250YWluZXIgPSBjb250YWluZXJJRDtcblx0XHR0aGlzLnZpZXdQb3J0bGV0ICAgICA9IG51bGw7XG5cdH1cblx0cHVibGljIHNldFZpZXdQb3J0bGV0KHRoZVBvcnRsZXQ6UG9ydGxldCkge1xuXHRcdHRoaXMudmlld1BvcnRsZXQgICAgID0gdGhlUG9ydGxldDtcblx0XHR0aGlzLnBvcnRhbENvbnRhaW5lciA9IFwiXCI7XG5cdH1cblx0cHVibGljIGdldFBvcnRsZXQocG9ydGFsTmFtZTpzdHJpbmcpOlBvcnRsZXQge1xuXHRcdHJldHVybiBQb3J0bGV0LmNhc3QodGhpcy5maW5kKHRoaXMucG9ydGFsUm9vdCwgcG9ydGFsTmFtZSkpO1xuXHR9XG5cdHB1YmxpYyBmaW5kKHBvcnRhbFNlY3Rpb246UG9ydGFsU2VjdGlvbiwgbmFtZSk6UG9ydGFsU2VjdGlvbiB7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5KSB7XG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0bGV0TmFtZSA9PSBuYW1lKVxuXHRcdFx0XHRyZXR1cm4gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXTtcblx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmZpbmQoPFBvcnRhbFNlY3Rpb24+IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0sIG5hbWUpO1xuXHRcdFx0aWYgKHJlc3VsdClcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciB0aGVWaWV3ICAgPSB0aGlzLnNlY3Rpb25UZW1wbGF0ZTtcblx0XHR0aGVWaWV3W1wiaWRcIl0gICA9IHRoaXMuZ2V0Q29tcG9uZW50SUQoKTtcblx0XHR2aWV3QXJyYXlbMF0gICAgPSB0aGlzLmNyZWF0ZVBvcnRhbFZpZXcoKTtcblx0XHR0aGVWaWV3W1wicm93c1wiXSA9IHZpZXdBcnJheTtcblx0XHRpZiAodGhpcy52aWV3VHlwZSlcblx0XHRcdHRoZVZpZXdbXCJ2aWV3XCJdID0gdGhpcy52aWV3VHlwZTtcblx0XHR0aGlzLnNldENvbXBvbmVudFZpZXcodGhlVmlldyk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgY3JlYXRlUG9ydGFsVmlldygpOmFueSB7XG5cdFx0dmFyIHRoZVBvcnRhbFZpZXc6UG9ydGxldDtcblx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUodGhpcy5wb3J0YWxSb290KTtcblx0XHRyZXR1cm4gcmVzdWx0QXJyYXlbMF07XG5cdH1cblx0cHVibGljIHRyZWUocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uKTpBcnJheTxhbnk+IHtcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gcG9ydGFsU2VjdGlvbi50aGVBcnJheSkge1xuXHRcdFx0aW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXgpXG5cdFx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleCA9PSBQb3J0YWxTZWN0aW9uLkNPTFVNTlMgfHwgcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXggPT0gUG9ydGFsU2VjdGlvbi5ST1dTKVxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4O1xuXHRcdFx0dmFyIHJlc3VsdCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0uZ2V0VmlldygpO1xuXHRcdFx0aWYgKHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0udGhlQXJyYXkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUoPFBvcnRhbFNlY3Rpb24+IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0pO1xuXHRcdFx0XHRyZXN1bHRbaW5kZXhdICAgPSByZXN1bHRBcnJheTtcblx0XHRcdH1cblx0XHRcdHJldHVybkFycmF5LnB1c2gocmVzdWx0KVxuXHRcdFx0Ly8gIGNvbnNvbGUubG9nKFwiUmV0dXJuaW5nIFJlc3VsdFwiK0M0bG9nLnByaW50VGhpcyhyZXN1bHQpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldHVybkFycmF5O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplVHJlZSgpIHtcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wb3J0YWxSb290LnRoZUFycmF5KSB7XG5cdFx0XHR0aGlzLnBvcnRhbFJvb3QudGhlQXJyYXlbaXRlbV0uaW5pdGlhbGl6ZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0dXJuQXJyYXk7XG5cdH1cblx0cHVibGljIHJlZnJlc2goKSB7XG5cdFx0dGhpcy5zaG93KCk7XG5cdH1cblx0cHVibGljIHNob3codGhlV2luZG93PzphbnkpOmFueSB7XG5cdFx0dmFyIHNob3dWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XG5cdFx0dmFyIHhWaWV3OmFueTtcblx0XHRpZiAodGhlV2luZG93KSB7XG5cdFx0XHR2YXIgcm93cyAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0XHRyb3dzWzBdICAgICAgICAgICA9IHNob3dWaWV3O1xuXHRcdFx0dGhlV2luZG93W1wicm93c1wiXSA9IHJvd3M7XG5cdFx0XHRBcHBMb2cucHJpbnRUaGlzKHRoZVdpbmRvdyk7XG5cdFx0XHR4VmlldyA9IHdlYml4LnVpKHRoZVdpbmRvdykuc2hvdygpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wb3J0YWxDb250YWluZXIpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50Vmlld1tcImNvbnRhaW5lclwiXSA9IHRoaXMucG9ydGFsQ29udGFpbmVyO1xuXHRcdFx0e1xuXHRcdFx0XHRBcHBMb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcblx0XHRcdFx0eFZpZXcgPSB3ZWJpeC51aShzaG93VmlldywgdGhpcy5wb3J0YWxDb250YWluZXIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRBcHBMb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcblx0XHRcdHhWaWV3ID0gd2ViaXgudWkoc2hvd1ZpZXcsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcblx0XHR9XG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIlNob3cgVmlld1wiKTtcblx0XHQvL0M0bG9nLnByaW50VGhpcyhzaG93Vmlldyk7XG5cdFx0cmV0dXJuIHhWaWV3O1xuXHR9XG5cdHB1YmxpYyBwb3B1cCh0aGVXaW5kb3c6YW55KSB7XG5cdFx0dmFyIHNob3dWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XG5cdFx0dmFyIHJvd3MgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHJvd3NbMF0gICAgICAgICAgID0gc2hvd1ZpZXc7XG5cdFx0dGhlV2luZG93W1wiYm9keVwiXSA9IEM0T2JqZWN0LkNsb25lKHNob3dWaWV3KTtcblx0XHQvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoZVdpbmRvdykpO1xuXHRcdHZhciBuZXdXaW5kb3cgPSB3ZWJpeC51aSh0aGVXaW5kb3cpO1xuXHRcdHJldHVybiBuZXdXaW5kb3c7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmluaXRpYWxpemVUcmVlKCk7XG5cdH1cblxufSB0aGlzLlBvcnRhbCA9IFBvcnRhbDtcblxuY2xhc3MgVUlQb3B1cFdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cdHB1YmxpYyBzdGF0aWMgQ2xvc2VCdXR0b24oKSB7XG5cdFx0dmFyIHRoZUlEICAgICAgICA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUNvbXBvbmVudD4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdCQkKHRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKS5jbG9zZSgpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgRnVsbFNjcmVlbigpIHtcblx0XHR2YXIgdGhlSUQgICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJUG9wdXBXaW5kb3c+ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcblx0XHR0aGVDb21wb25lbnQuZnVsbHNjcmVlblRvZ2dsZSgpO1xuXHR9XG5cblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXG5cdHB1YmxpYyB0aXRsZTpzdHJpbmc7XG5cdHB1YmxpYyByZXNpemU6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgbW9kYWw6Ym9vbGVhbiAgPSB0cnVlO1xuXHRwdWJsaWMgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXHRwdWJsaWMgdGhlUG9ydGFsICAgICAgPSBuZXcgUG9ydGFsKCk7XG5cdHB1YmxpYyBjbG9zZUJ1dHRvbklEICA9IFwiY2xvc2VCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcblx0cHVibGljIGZ1bGxzY3JlZW5JRCAgID0gXCJmdWxsU2NyZWVuSURfXCIrd2ViaXgudWlkKCk7XG5cdHB1YmxpYyB3aWR0aCAgICAgICAgICA9IDUwMDtcblx0cHVibGljIGhlaWdodCAgICAgICAgID0gNTAwO1xuXHQvL2VuZHJlZ2lvblxuXHRjb25zdHJ1Y3RvcihsYWJlbDpzdHJpbmcgPSBcIlBvcHVwIFdpbmRvd1wiLCB0aGVDb21wb25lbnQ6VUlDb21wb25lbnQgPSBudWxsKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMgKCB7IHdpZHRoIDogdGhpcy53aWR0aCwgaGVpZ2h0IDogdGhpcy5oZWlnaHQgfSlcblx0XHR0aGlzLnNldElEKFwiVUlQb3B1cFdpbmRvd19cIik7XG5cdFx0dmFyIHBvcnRhbFJvb3QgPSB0aGlzLnRoZVBvcnRhbC5nZXRSb290KCk7XG5cdFx0dmFyIHJvd3MgPSB0aGlzLnRoZVBvcnRhbC5jcmVhdGVSb3dzKCk7XG5cdFx0cm93cy5hZGRQb3J0bGV0KFwibWFpblwiKTtcblx0XHRwb3J0YWxSb290LmFkZFNlY3Rpb24oKHJvd3MpKTtcblx0XHR0aGlzLnNldENvbXBvbmVudCh0aGVDb21wb25lbnQpO1xuXHRcdHRoaXMuY29tcG9uZW50TGFiZWwgPSBsYWJlbDtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQodGhlQ29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0dGhpcy50aGVDb21wb25lbnQgPSB0aGVDb21wb25lbnQ7XG5cdFx0dGhpcy50aGVQb3J0YWwuZ2V0UG9ydGxldChcIm1haW5cIikuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XG5cdFx0dGhpcy5hZGRDb21wb25lbnQoXCJjb21wb25lbnRcIiwgdGhlQ29tcG9uZW50KTtcblx0fVxuXHRwdWJsaWMgc2hvdyh0aGVDb21wb25lbnQ/OlVJQ29tcG9uZW50KSB7XG5cdFx0aWYgKHRoZUNvbXBvbmVudCkge1xuXHRcdFx0dGhpcy5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMudGhlQ29tcG9uZW50ID09PSBudWxsKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJUcnlpbmcgdG8gU2hvdyBXaW5kb3cgV2l0aCBNaXNzaW5nIFZpZXdcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBwb3B1cCA9IHRoaXMudGhlUG9ydGFsLnBvcHVwKHRoaXMuZ2V0VmlldygpKTtcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHRVSS5QbGF5U291bmQoU291bmRzLlBvcHVwKTtcblx0XHRwb3B1cC5zaG93KCk7XG5cdH1cblxuXHRwdWJsaWMgZnVsbHNjcmVlblRvZ2dsZSgpIHtcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5jb25maWcuZnVsbHNjcmVlbiA9ICEkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmNvbmZpZy5mdWxsc2NyZWVuXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgaGlkZSgpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCB0aGlzKTtcblx0XHRVSS5QbGF5U291bmQoU291bmRzLkNsb3NlRGlhZ3JhbSk7XG5cdFx0aWYgKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkpIHtcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuaGlkZSgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgY2xvc2UoKSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwiY2xvc2VcIiwgdGhpcyk7XG5cdFx0aWYgKCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLnRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKS5kZXN0cnVjdG9yKCk7XG5cdFx0fVxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuQ2xvc2VEaWFncmFtKTtcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudCBNZXRob2RzXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0dmlldyAgICA6IFwid2luZG93XCIsXG5cdFx0XHRpZCAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdGNzcyAgICAgOiBcImM0cG9wdXAgYW5pbWF0ZWQgem9vbUluXCIsXG5cdFx0XHRwb3NpdGlvbjogXCJjZW50ZXJcIixcblx0XHRcdG1vZGFsICAgOiB0cnVlLFxuXHRcdFx0bW92ZSAgICA6IHRydWUsXG5cdFx0XHRzY3JvbGx4eTogdHJ1ZSxcblx0XHRcdGhpZGRlbiAgOiB0cnVlLFxuXHRcdFx0cmVzaXplICA6IHRydWUsXG5cdFx0XHRoZWFkICAgIDoge1xuXHRcdFx0XHR2aWV3OiBcInRvb2xiYXJcIiwgbWFyZ2luOiAtNCwgcG9zaXRpb246IFwiY2VudGVyXCIsIGNvbHM6IFtcblx0XHRcdFx0XHQge3ZpZXc6IFwibGFiZWxcIiwgbGFiZWw6IHRoaXMuY29tcG9uZW50TGFiZWx9LFxuXHRcdFx0XHRcdCB7dmlldyA6IFwiaWNvblwiLGlkIDogdGhpcy5mdWxsc2NyZWVuSUQsaWNvbiA6IFwiYXJyb3dzLWFsdFwiLGNzcyAgOiBcImFsdGVyXCIsY2xpY2s6IFVJUG9wdXBXaW5kb3cuRnVsbFNjcmVlbn0sXG5cdFx0ICAgICAgICAgICAgIHt2aWV3IDogXCJpY29uXCIsaWQgOiB0aGlzLmNsb3NlQnV0dG9uSUQsaWNvbiA6IFwidGltZXMtY2lyY2xlXCIsY3NzICA6IFwiYWx0ZXJcIixjbGljazogVUlQb3B1cFdpbmRvdy5DbG9zZUJ1dHRvbn1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHQvLyB0aGlzLnRoZUNvbXBvbmVudC5pbml0aWFsaXplKCk7XG5cdFx0JCQodGhpcy5jbG9zZUJ1dHRvbklEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdFx0JCQodGhpcy5mdWxsc2NyZWVuSUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXSAgID0gdGhpcztcblx0fVxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlVJUG9wdXBXaW5kb3cgPSBVSVBvcHVwV2luZG93O1xuXG5jbGFzcyBDb25maXJtQWN0aW9uIHtcblx0bGFiZWw6c3RyaW5nO1xuXHRldmVudDpzdHJpbmc7XG59IHRoaXMuQ29uZmlybUFjdGlvbiA9IENvbmZpcm1BY3Rpb247XG5cbmNsYXNzIFVJQ29uZmlybVdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cdHByb3RlY3RlZCBwb3B1cDpVSVBvcHVwV2luZG93O1xuXHRwdWJsaWMgdGl0bGU6c3RyaW5nO1xuXHRwdWJsaWMgc3RhdGVtZW50OnN0cmluZztcblx0cHVibGljIG9wdGlvbjE6Q29uZmlybUFjdGlvbjtcblx0cHVibGljIG9wdGlvbjI6Q29uZmlybUFjdGlvbjtcblx0cHVibGljIG9wdGlvbjM6Q29uZmlybUFjdGlvbjtcblxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcsIHN0YXRlbWVudDpzdHJpbmcsIG9wdGlvbjE6Q29uZmlybUFjdGlvbiwgb3B0aW9uMjpDb25maXJtQWN0aW9uID0gbnVsbCwgb3B0aW9uMzpDb25maXJtQWN0aW9uID0gbnVsbCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy50aXRsZSAgICAgPSB0aXRsZTtcblx0XHR0aGlzLnN0YXRlbWVudCA9IHN0YXRlbWVudDtcblx0XHR0aGlzLm9wdGlvbjEgICA9IG9wdGlvbjE7XG5cdFx0dGhpcy5vcHRpb24yICAgPSBvcHRpb24yO1xuXHRcdHRoaXMub3B0aW9uMyAgID0gb3B0aW9uMztcblx0fVxuXG5cdHB1YmxpYyBjbG9zZSgpIHtcblx0XHR0aGlzLnBvcHVwLmNsb3NlKCk7XG5cdH1cblx0cHVibGljIGxpc3RlbihldmVudDphbnksIG9iamVjdDphbnksIGNhbGxlcjpVSUNvbXBvbmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJjbGlja1wiIDpcblx0XHRcdHtcblx0XHRcdFx0aWYgKGNhbGxlciA9PT0gdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24xXCIpKSB7XG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoKHRoaXMub3B0aW9uMS5ldmVudCwgdGhpcy5vcHRpb24xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2FsbGVyID09PSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikpIHtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2godGhpcy5vcHRpb24yLmV2ZW50LCB0aGlzLm9wdGlvbjIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjYWxsZXIgPT09IHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uM1wiKSkge1xuXHRcdFx0XHRcdHRoaXMucHVibGlzaCh0aGlzLm9wdGlvbjMuZXZlbnQsIHRoaXMub3B0aW9uMyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiY2xvc2VcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIG51bGwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dmFyIHRpdGxlID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnRpdGxlLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsIGxhYmVsV2lkdGg6IDEwMH0pO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGl0bGVcIiwgdGl0bGUpO1xuXHRcdHZhciB0ZXh0ID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnN0YXRlbWVudCwgYWxpZ25tZW50OiBcImNlbnRlclwiLCBsYWJlbFdpZHRoOiAxMDB9KTtcblx0XHR0aGlzLmFkZENvbXBvbmVudChcInRleHRcIiwgdGV4dCk7XG5cdFx0dmFyIG9wdGlvbjEgPSBuZXcgVUlCdXR0b24oe2xhYmVsOiB0aGlzLm9wdGlvbjEubGFiZWx9KTtcblx0XHR0aGlzLmFkZENvbXBvbmVudChcIm9wdGlvbjFcIiwgb3B0aW9uMSk7XG5cdFx0aWYgKHRoaXMub3B0aW9uMSkge1xuXHRcdFx0dmFyIG9wdGlvbjIgPSBuZXcgVUlCdXR0b24odGhpcy5vcHRpb24yLmxhYmVsKTtcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uMlwiLCBvcHRpb24yKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMub3B0aW9uMykge1xuXHRcdFx0dmFyIG9wdGlvbjMgPSBuZXcgVUlCdXR0b24odGhpcy5vcHRpb24zLmxhYmVsKTtcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uM1wiLCBvcHRpb24zKTtcblx0XHR9XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdHZpZXc6IFwiZm9ybVwiLCBpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLCByb3dzOiB0aGlzLmNyZWF0ZUNvbXBvbmVudHNWaWV3KClcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbmZpcm1hdGlvblwiLCB0aGlzKTtcblx0XHR0aGlzLnBvcHVwLnN1YnNjcmliZShcImNsb3NlXCIsIHRoaXMpO1xuXHRcdHRoaXMucG9wdXAuc2hvdygpO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0dGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24xXCIpLnN1YnNjcmliZShcImNsaWNrXCIsIHRoaXMpO1xuXHRcdGlmICh0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikpIHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKS5zdWJzY3JpYmUoXCJjbGlja1wiLCB0aGlzKTtcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjNcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XG5cdH1cbn0gdGhpcy5VSUNvbmZpcm1XaW5kb3cgPSBVSUNvbmZpcm1XaW5kb3dcblxuY2xhc3MgVUlNdWx0aVZpZXcgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSU11bHRpVmlld19cIik7XG5cdH1cblxuXHRwdWJsaWMgYWRkVmlldyhsYWJlbDpzdHJpbmcsIGNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KGxhYmVsLCBjb21wb25lbnQpO1xuXHR9XG5cdHB1YmxpYyBzZXRSZWxhdGlvbnNoaXBPYmplY3QodGhlT2JqZWN0OmFueSkge1xuXHRcdHN1cGVyLnNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3QpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXSkge1xuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5zZXRSZWxhdGlvbnNoaXBPYmplY3QodGhpcy5nZXRSZWxhdGlvbnNoaXBPYmplY3QoKSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBjcmVhdGVDb21wb25lbnRzVmlldygpOmFueSB7XG5cdFx0dmFyIHZpZXdBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIGkgICAgICAgICA9IDA7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XG5cdFx0XHRpZiAoaXRlbSAhPSBcInRvb2xiYXJcIilcblx0XHRcdFx0dmlld0FycmF5W2krK10gPSB7XG5cdFx0XHRcdFx0aGVhZGVyOiBpdGVtLCBib2R5OiB0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLmdldFZpZXcoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB2aWV3QXJyYXk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcblx0XHRcdGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIHZpZXc6IFwidGFidmlld1wiLCBhbmltYXRlOiB0cnVlLCBjZWxsczogdGhpcy5jcmVhdGVDb21wb25lbnRzVmlldygpXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblxufSB0aGlzLlVJTXVsdGlWaWV3ID0gVUlNdWx0aVZpZXc7XG5cbmNsYXNzIFVJTWVudSBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cblx0cHVibGljIG1lbnVJdGVtcyA6IEFycmF5PGFueT47XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLm1lbnVJdGVtcyA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdH1cblx0cHVibGljIGFkZE1lbnVJdGVtKG1lbnUgOiBhbnkpIHtcblx0XHRtZW51W1wiaWRcIl0gPSB3ZWJpeC51aWQoKStcIl9tZW51XCI7XG5cdFx0dGhpcy5tZW51SXRlbXMucHVzaChtZW51KTtcblx0fVxufSB0aGlzLlVJTWVudSA9IFVJTWVudTtcblxuY2xhc3MgVGFiVmlld0NlbGwge1xuXHRwdWJsaWMgbmFtZSAgICAgICA6IHN0cmluZztcblx0cHVibGljIHByb3BlcnRpZXMgOiBhbnk7XG5cdHB1YmxpYyBjb21wb25lbnQgIDogVUlDb21wbGV4Q29tcG9uZW50O1xufVxuXG5jbGFzcyBVSVRhYlZpZXcgIGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcblxuXHRwdWJsaWMgcG9wdXAgICAgICAgIDogVUlQb3B1cFdpbmRvdztcblx0cHVibGljIGFuaW1hdGUgICAgICA6IGJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIGNlbGxzICAgICAgIDogQXJyYXk8VGFiVmlld0NlbGw+O1xuXHRwdWJsaWMgY2xvc2VBYmxlICAgIDogYm9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBmaXRCaWdnZXN0ICAgOiBib29sZWFuID0gdHJ1ZTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzIDogYW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSVRhYlZpZXdfXCIpO1xuXHRcdHRoaXMuY2VsbHMgPSBuZXcgQXJyYXk8VGFiVmlld0NlbGw+KCk7XG5cdH1cblx0cHVibGljIGFkZFZpZXcobmFtZSA6IHN0cmluZywgcHJvcGVydGllcyA6IGFueSwgY29tcG9uZW50IDogVUlDb21wbGV4Q29tcG9uZW50KSB7XG5cdFx0dmFyIGNlbGwgPSBuZXcgVGFiVmlld0NlbGwoKTtcblx0XHRjZWxsLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXHRcdGNlbGwuY29tcG9uZW50ID0gY29tcG9uZW50O1xuXHRcdGNlbGwubmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5jZWxsc1tuYW1lXT1jZWxsO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KG5hbWUsY29tcG9uZW50KTtcblx0fVxuXHRwdWJsaWMgbGlzdGVuKGV2ZW50LCBkYXRhLCBjYWxsZXIpIHtcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XG5cdFx0XHRjYXNlIFwiZXZlbnROYW1lXCI6XG5cdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgY3JlYXRlQ2VsbHMoKSA6IEFycmF5PGFueT4ge1xuXHRcdHZhciBjZWxsQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jZWxscykge1xuXHRcdFx0dmFyIGNlbGwgPSB7IGJvZHkgOiB0aGlzLmNlbGxzW2l0ZW1dLmNvbXBvbmVudC5nZXRWaWV3KCkgIH1cblx0XHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuY2VsbHNbaXRlbV0ucHJvcGVydGllcykge1xuXHRcdFx0XHRjZWxsW3Byb3BlcnR5XSA9IHRoaXMuY2VsbHNbaXRlbV0ucHJvcGVydGllc1twcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0XHRjZWxsQXJyYXkucHVzaChjZWxsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNlbGxBcnJheTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpIDogYW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICA6IFwidGFidmlld1wiLFxuXHRcdFx0bXVsdGl2aWV3IDogeyBhbmltYXRlIDogdGhpcy5hbmltYXRlLCBmaXRCaWdnZXN0IDogdGhpcy5maXRCaWdnZXN0IH0sXG5cdFx0XHRjbG9zZSAgICAgOiB0aGlzLmNsb3NlQWJsZSxcblx0XHRcdHRhYmJhciAgICA6IHsgcG9wdXBXaWR0aDogMzAwLHRhYk1pbldpZHRoOiAxMjAgfSxcblx0XHRcdGNlbGxzICAgICA6IHRoaXMuY3JlYXRlQ2VsbHMoKVxuXG5cdFx0fSlcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxuXHRwdWJsaWMgc2hvdygpIHtcblx0XHR0aGlzLnBvcHVwID0gbmV3IFVJUG9wdXBXaW5kb3coXCJDb21wb25lbnQgTGFiZWwgXCIpO1xuXHRcdHRoaXMucG9wdXAuc2hvdyh0aGlzKTtcblx0fVxufSB0aGlzLlVJVGFiVmlldyA9IFVJVGFiVmlldztcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIlVJVGFiVmlld1wiLCBVSVRhYlZpZXcpO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xuXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xuXHRwdWJsaWMgY29sdW1uTmFtZSAgIDogc3RyaW5nID0gbnVsbDtcblx0cHVibGljIHRhYmxlICAgICAgICA6IFVJRGF0YVRhYmxlID0gbnVsbDtcblx0cHVibGljIGRhdGFBcnJheSAgICA6IEFycmF5PGFueT49bnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzIDogYW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUxpc3RfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldExpc3QoZGF0YSA6IEFycmF5PGFueT4pIHtcblxuXHR9XG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIGRhdGEsIGNhbGxlcikge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJpdGVtQ2xpY2tcIjoge1xuXHRcdFx0XHR0aGlzLml0ZW1DaGFuZ2UoZGF0YSk7XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgaXRlbUNoYW5nZShpdGVtIDogSXRlbVNlbGVjdGVkRXZlbnQpIHtcblx0XHR2YXIgc3RhdHVzID0gaXRlbS5vYmplY3RBcnJheVswXVtcInN0YXR1c1wiXTtcblx0XHRpdGVtLm9iamVjdEFycmF5WzBdW1wic3RhdHVzXCJdID0gIXN0YXR1cztcblx0XHQoPFVJRGF0YVRhYmxlPnRoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikpLnJlZnJlc2hSb3coaXRlbS5yb3dJRCk7XG5cdFx0dGhpcy5wdWJsaXNoKFwiaXRlbUNoYW5nZVwiLCBpdGVtKTtcblx0fVxuXHRwdWJsaWMgc2V0KG5hbWUgOiBzdHJpbmcsIGRhdGFBcnJheSA6IEFycmF5PGFueT4pIHtcblx0XHR0aGlzLmNvbHVtbk5hbWUgPSBuYW1lO1xuXHRcdHRoaXMuZGF0YUFycmF5ID0gZGF0YUFycmF5O1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCkgOiBhbnkge1xuXHRcdHRoaXMudGFibGUgPSBuZXcgVUlEYXRhVGFibGUoKTtcblx0XHR0aGlzLnRhYmxlLmFkZENvbHVtbigwLCB7IGlkOlwic3RhdHVzXCIsIGhlYWRlcjpcIkFjdGl2ZVwiLCB3aWR0aDo0MCwgY3NzOlwiY2VudGVyXCIsIHR5cGUgOiBcInZhbHVlXCIsXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24ob2JqLHR5cGUsdmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlKVxuXHRcdFx0XHRcdHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF90YWJsZV9jaGVja2JveCB3ZWJpeF9pY29uIGZhLWV5ZSc+PC9zcGFuPlwiO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X3RhYmxlX2NoZWNrYm94IHdlYml4X2ljb24gZmEtZXllLXNsYXNoJz48L3NwYW4+XCI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy50YWJsZS5hZGRDb2x1bW4oMSwgeyBpZDpcInZhbHVlXCIsICBoZWFkZXI6dGhpcy5jb2x1bW5OYW1lLCBmaWxsc3BhY2U6MSB9KTtcblx0XHR0aGlzLnRhYmxlLnNldExpc3QodGhpcy5kYXRhQXJyYXkpO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGFibGVcIix0aGlzLnRhYmxlKTtcblxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3IDogXCJmb3JtXCIsXG5cdFx0XHRyb3dzIDogW3RoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikuZ2V0VmlldygpXVxuXHRcdH0pXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkge1xuXHRcdFx0KDxVSURhdGFUYWJsZT4gdGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkuc3Vic2NyaWJlKFwib25JdGVtQ2xpY2tcIix0aGlzLFwiaXRlbUNsaWNrXCIpXG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyh0aGlzLmNvbHVtbk5hbWUrXCIgTGlzdCBcIik7XG5cdFx0dGhpcy5wb3B1cC5tb2RhbD1mYWxzZTtcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XG5cdH1cbn0gdGhpcy5VSUxpc3QgPSBVSUxpc3Q7XG5cbiJdfQ==