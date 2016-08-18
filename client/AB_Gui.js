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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUJfR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQUJfR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQVF4RSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUVyQjtBQU9BLENBQUM7QUFFRDtJQUNDLE9BQWMsZUFBZSxLQUFLLENBQUM7SUFDbkMsT0FBYyxZQUFZLENBQUMsUUFBWSxFQUFFLFFBQVE7UUFDaEQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFlBQVksR0FBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25FLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxPQUFjLGlCQUFpQixDQUFDLE9BQU87UUFDdEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksV0FBdUIsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsTUFBTSxHQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMs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LENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7WUFDMUYsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDRixDQUFDO0lBQ00sSUFBSTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBQ00sS0FBSztRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckQsQ0FBQztRQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElB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QUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsRUFBRSxFQUFHLElBQUksQ0FBQyxXQUFXO1lBQ3JCLElBQUksRUFBRyxNQUFNO1lBQ2IsSUFBSSxFQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM3QyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzQixDQUFDO0lBRU0sVUFBVTtRQUNoQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3JGLENBQUM7SUFDRixDQUFDO0lBQ00sSUFBSTtRQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztBQUNGLENBQUM7QUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XHJcbmRlY2xhcmUgdmFyIHRvYXN0cjphbnk7XHJcbmRlY2xhcmUgdmFyIEM0Zm91cjphbnk7XHJcbmRlY2xhcmUgdmFyIGZpbmRDbGFzc1R5cGU6YW55O1xyXG5kZWNsYXJlIHZhciBmaW5kSUQ6YW55O1xyXG5kZWNsYXJlIHZhciBGaW5kSVQ6YW55O1xyXG5cclxuZGVjbGFyZSB2YXIgYnV6ejphbnk7XHJcbmNvbnNvbGUubG9nKFwiTG9hZGluZyBndWkudHMgLi4uXCIpO1xyXG5maW5kQ2xhc3NUeXBlID0gbnVsbDtcclxuXHJcbmNsYXNzIERyb3BNZXNzYWdlIHtcclxuXHRwdWJsaWMgZnJvbU9iamVjdHM6QXJyYXk8YW55PjtcclxuXHRwdWJsaWMgZnJvbUNvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHRwdWJsaWMgdG9Db21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0cHVibGljIHRvT2JqZWN0OmFueTtcclxuXHRwdWJsaWMgY29udGV4dDphbnk7XHJcblx0cHVibGljIGV2OmFueTtcclxufVxyXG5cclxuY2xhc3MgVUlFdmVudEhhbmRsZXIge1xyXG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlclRhYkNsaWNrKCkgeyB9XHJcblx0cHVibGljIHN0YXRpYyBGaWVsZENoYW5nZWQobmV3VmFsdWU6YW55LCBvbGRWYWx1ZSkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudElEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgICA9IDxVSVRleHRGaWVsZD4gJCQodGhlQ29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dGhlQ29tcG9uZW50LmZpZWxkQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpOkRyb3BNZXNzYWdlIHtcclxuXHRcdHZhciBmcm9tSUQ6c3RyaW5nO1xyXG5cdFx0dmFyIGZyb21Db21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0XHR2YXIgdG9Db21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0XHR2YXIgYXJyYXlPZk9iamVjdHMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHRvT2JqZWN0O1xyXG5cdFx0ZnJvbUlEICAgPSBjb250ZXh0W1wiZnJvbVwiXS5jb25maWcuaWQ7XHJcblx0XHR2YXIgdG9JRCA9IGNvbnRleHRbXCJ0b1wiXS5jb25maWcuaWQ7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRleHQuc291cmNlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFycmF5T2ZPYmplY3RzLnB1c2goY29udGV4dC5mcm9tLmdldEl0ZW0oY29udGV4dC5zb3VyY2VbaV0pKTtcclxuXHRcdH1cclxuXHRcdGlmICgkJChmcm9tSUQpKSBmcm9tQ29tcG9uZW50ID0gJCQoZnJvbUlEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdGlmICgkJCh0b0lEKSkgdG9Db21wb25lbnQgPSAkJCh0b0lEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IG5ldyBEcm9wTWVzc2FnZSgpO1xyXG5cdFx0ZHJvcE1lc3NhZ2UuZnJvbUNvbXBvbmVudCA9IGZyb21Db21wb25lbnQ7XHJcblx0XHRkcm9wTWVzc2FnZS50b0NvbXBvbmVudCAgID0gdG9Db21wb25lbnQ7XHJcblx0XHRkcm9wTWVzc2FnZS5mcm9tT2JqZWN0cyAgID0gYXJyYXlPZk9iamVjdHM7XHJcblx0XHRpZiAoY29udGV4dC50YXJnZXQgPT0gbnVsbClcclxuXHRcdFx0ZHJvcE1lc3NhZ2UudG9PYmplY3QgPSBudWxsOyBlbHNlIHtcclxuXHRcdFx0ZHJvcE1lc3NhZ2UudG9PYmplY3QgPSAkJCh0b0lEKS5nZXRJdGVtKGNvbnRleHQudGFyZ2V0LnJvdyk7XHJcblx0XHR9XHJcblx0XHRkcm9wTWVzc2FnZS5jb250ZXh0ID0gY29udGV4dDtcclxuXHRcdGRyb3BNZXNzYWdlLmV2ICAgICAgPSBudWxsO1xyXG5cdFx0cmV0dXJuIGRyb3BNZXNzYWdlO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQmVmb3JlRHJhZ0luKGNvbnRleHQsIGV2ZW50KSB7XHJcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcclxuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcmFnSW4gPT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJhZ0luKGRyb3BNZXNzYWdlKTsgZWxzZSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIG9uRHJhZ091dChjb250ZXh0LCBldmVudCkge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XHJcblx0XHRVSS5JbmZvKFwiT25EcmFnT3V0IFN0YXRpY1wiKVxyXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XHJcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dCA9PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0KGRyb3BNZXNzYWdlKTsgZWxzZSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIG9uQmVmb3JlRHJvcChjb250ZXh0LCBldikge1xyXG5cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkFmdGVyRHJvcDIoY29udGV4dCwgZXYpIHtcclxuXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlckRyb3AoY29udGV4dCwgZXZlbnQpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xyXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XHJcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQWZ0ZXJEcm9wID09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkFmdGVyRHJvcChkcm9wTWVzc2FnZSk7IGVsc2Uge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkJ1dHRvbkNsaWNrKGlkOnN0cmluZywgZXZlbnQpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnRJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XHJcblx0XHRpZiAoISQkKHRoZUNvbXBvbmVudElEKSkgcmV0dXJuO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUJ1dHRvbj4gJCQodGhlQ29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uQnV0dG9uQ2xpY2sodGhlQ29tcG9uZW50KTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkRyYWdPdXQoY29udGV4dCwgZXZlbnQpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xyXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XHJcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dCA9PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0KGRyb3BNZXNzYWdlKTsgZWxzZSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQmVmb3JlRHJvcChjb250ZXh0LCBldmVudCkge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XHJcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcclxuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcm9wID09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyb3AoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25DbGljayhldjphbnksIGlkOnN0cmluZykge1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uSXRlbURibENsaWNrKGlkLGV2LG5vZGUpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciBzZWxlY3RlZE9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShpZC5yb3cpO1xyXG5cdFx0dmFyIGl0ZW1NZXNzYWdlID0gbmV3IEl0ZW1TZWxlY3RlZEV2ZW50KCk7XHJcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheS5wdXNoKHNlbGVjdGVkT2JqZWN0KTtcclxuXHRcdHRoZUNvbXBvbmVudC5vbkl0ZW1EYmxDbGljayhpdGVtTWVzc2FnZSkgO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uSXRlbUNsaWNrKGlkOmFueSwgZXY6YW55LCBub2RlOmFueSkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIHNlbGVjdGVkT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKGlkLnJvdyk7XHJcblx0XHR2YXIgaXRlbU1lc3NhZ2UgPSBuZXcgSXRlbVNlbGVjdGVkRXZlbnQoKTtcclxuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5LnB1c2goc2VsZWN0ZWRPYmplY3QpO1xyXG5cdFx0aXRlbU1lc3NhZ2Uucm93SUQgPSBpZC5yb3c7XHJcblx0XHR0aGVDb21wb25lbnQub25JdGVtQ2xpY2soaXRlbU1lc3NhZ2UpIDtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBvblNlbGVjdENoYW5nZSgpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciByb3dpZCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJZCh0cnVlKTtcclxuXHRcdHZhciBzZWxlY3RlZE9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XHJcblx0XHR0aGVDb21wb25lbnQub25TZWxlY3RDaGFuZ2Uocm93aWQsIHNlbGVjdGVkT2JqZWN0KVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIG9uQWZ0ZXJFZGl0U3RvcChzdGF0ZSwgZWRpdG9yLCBpZ25vcmVVcGRhdGUpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciB0aGVDb2x1bW4gICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xyXG5cdFx0dGhlQ29sdW1uLmNvbHVtbk5hbWUgPSBlZGl0b3IuY29sdW1uO1xyXG5cdFx0dGhlQ29sdW1uLm9sZFZhbHVlICAgPSBzdGF0ZS5vbGQ7XHJcblx0XHR0aGVDb2x1bW4ubmV3VmFsdWUgICA9IHN0YXRlLnZhbHVlO1xyXG5cdFx0dGhlQ29sdW1uLnJvd09iamVjdCAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0oZWRpdG9yLnJvdyk7XHJcblx0XHR0aGVDb2x1bW4uZWRpdG9yICAgICA9IGVkaXRvcjtcclxuXHRcdHRoZUNvbXBvbmVudC5vblN0b3BFZGl0KHRoZUNvbHVtbik7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgb25CZWZvcmVFZGl0U3RhcnRUYWJsZShpZCA6IGFueSkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIHJvdyA9IGlkLnJvdztcclxuXHRcdHZhciBjb2x1bW4gPSBpZC5jb2x1bW47XHJcblx0XHR2YXIgcm93SXRlbSA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpLmdldEl0ZW0ocm93KTtcclxuXHRcdHZhciB0aGVDb2x1bW4gICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xyXG5cclxuXHRcdHRoZUNvbHVtbi5jb2x1bW5OYW1lID0gY29sdW1uO1xyXG5cdFx0dGhlQ29sdW1uLm9sZFZhbHVlID0gbnVsbDtcclxuXHRcdHRoZUNvbHVtbi5uZXdWYWx1ZSA9IG51bGw7XHJcblx0XHR0aGVDb2x1bW4ucm93T2JqZWN0ID0gcm93SXRlbTtcclxuXHRcdHRoZUNvbXBvbmVudC5vbkJlZm9yZUVkaXRTdGFydCh0aGVDb2x1bW4pO1xyXG5cclxuXHRcdGlmIChyb3dJdGVtW1wiYmVmb3JlRWRpdFN0YXJ0UmV0dXJuXCJdIT1udWxsKSByZXR1cm4gcm93SXRlbVtcImJlZm9yZUVkaXRTdGFydFJldHVyblwiXTtcclxuXHJcblx0XHRyZXR1cm4gIXJvd0l0ZW1bY29sdW1uK1wiUmVhZE9ubHlcIl07XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25DaGFuZ2UobmV3diwgb2xkdikge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uQ2hhbmdlKG5ld3YsIG9sZHYpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE1lbnVIYW5kbGVyKGlkLCBjb250ZXh0KSB7XHJcblx0XHR2YXIgdGhlSUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUNvbnRleHRNZW51PiAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIganVtcEl0ZW0gPSB0aGVDb21wb25lbnQuZ2V0TWVudUl0ZW0oaWQpO1xyXG5cdFx0dmFyIHRoZU9iamVjdCA9IHRoZUNvbXBvbmVudC5vd25pbmdDb21wb25lbnQuZ2V0U2VsZWN0ZWRPYmplY3QoKTtcclxuXHRcdGlmICghanVtcEl0ZW0uY2FsbGJhY2spIHJldHVybjtcclxuXHRcdGp1bXBJdGVtLmNhbGxiYWNrKGlkLCB0aGVDb21wb25lbnQsIHRoZU9iamVjdCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlclNlbGVjdChpZDphbnkpIHtcclxuXHRcdHZhciB0aGVJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XHJcblx0XHRpZiAoISQkKHRoZUlEKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIHRoZU5vZGUgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKS5nZXRJdGVtKGlkLnJvdyk7XHJcblx0XHRpZiAoIXRoZU5vZGUpIHtcclxuXHRcdFx0VUkuTWVzc2FnZShcIkVycm9yIEV4cGVjdGVkIFRPIEZpbmQgTm9kZSBnb3QgTnVsbCB3aXRoIElEIFwiICsgaWQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR2YXIgSWRBcnJheSAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIG9iamVjdEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciByb3dBcnJheSAgICA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR2YXIgbmV3SXRlbVNlbGVjdGVkID0gbmV3IEl0ZW1TZWxlY3RlZEV2ZW50KCk7XHJcblx0XHRJZEFycmF5WzBdICAgICAgICAgID0gaWQucm93O1xyXG5cdFx0aWYgKHRoZU5vZGUub3JpZ2luYWxPYmplY3QpXHJcblx0XHRcdG9iamVjdEFycmF5WzBdID0gdGhlTm9kZS5vcmlnaW5hbE9iamVjdC5jbG9uZSgpOyBlbHNlXHJcblx0XHRcdG9iamVjdEFycmF5WzBdID0gbnVsbDtcclxuXHRcdHJvd0FycmF5WzBdICAgICAgICAgICAgICAgICAgID0gdGhlTm9kZTtcclxuXHRcdG5ld0l0ZW1TZWxlY3RlZC5pZEFycmF5ICAgICAgID0gSWRBcnJheTtcclxuXHRcdG5ld0l0ZW1TZWxlY3RlZC5vYmplY3RBcnJheSAgID0gb2JqZWN0QXJyYXk7XHJcblx0XHRuZXdJdGVtU2VsZWN0ZWQuaXRlbXNTZWxlY3RlZCA9IG9iamVjdEFycmF5Lmxlbmd0aDtcclxuXHRcdG5ld0l0ZW1TZWxlY3RlZC5yb3dBcnJheSAgICAgID0gcm93QXJyYXk7XHJcblx0XHRuZXdJdGVtU2VsZWN0ZWQudGhlQ29tcG9uZW50ICA9IHRoZUNvbXBvbmVudDtcclxuXHRcdHRoZUNvbXBvbmVudC5vbkFmdGVyU2VsZWN0KG5ld0l0ZW1TZWxlY3RlZCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgSGFuZGxlRmllbGRFbnRyeShzdGF0ZSwgZWRpdG9yLCBpZ25vcmVVcGRhdGUpIHtcclxuXHRcdHZhciB0aGVFeHBsb3JlciA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpLmV4cGxvcmVyO1xyXG5cdFx0dmFyIG5ld1RleHQgPSBzdGF0ZS52YWx1ZTtcclxuXHRcdHZhciByb3dJRCAgID0gZWRpdG9yLnJvdztcclxuXHRcdHZhciB0aGVOb2RlID0gJCQodGhlRXhwbG9yZXIuY29tcG9uZW50SUQpLmdldEl0ZW0ocm93SUQpO1xyXG5cdFx0dmFyIHRoZVByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoZU5vZGUuY2xhc3NUeXBlKTtcclxuXHRcdHRoZVByb3h5LnVwZGF0ZU5hbWUodGhlTm9kZS5faWQsIG5ld1RleHQpO1xyXG5cdFx0VUkuTWVzc2FnZShcIlJlY29yZCBVcGRhdGVkXCIpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIElzRmllbGRFZGl0YWJsZShpZCk6Ym9vbGVhbiB7XHJcblx0XHR2YXIgdGhlSUQgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUV4cGxvcmVyID0gJCQodGhlSUQpW1wiZXhwbG9yZXJcIl07XHJcblx0XHR2YXIgcm93SXRlbSAgICAgPSAkJCh0aGVFeHBsb3Jlci5nZXRDb21wb25lbnRJRCgpKS5nZXRJdGVtKGlkKTtcclxuXHRcdGlmIChyb3dJdGVtLmNsYXNzVHlwZS5pbmRleE9mKFwiUm9vdFwiKSA9PSAtMSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBWYWxpZGF0ZUZpZWxkRW50cnkocm93LCB2YWx1ZTpzdHJpbmcpIHtcclxuXHRcdHZhciB0aGVJRCAgICAgICA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XHJcblx0XHR2YXIgdGhlRXhwbG9yZXIgPSAkJCh0aGVJRCkuZXhwbG9yZXI7XHJcblx0XHR2YXIgcm93SXRlbSA9ICQkKHRoZUV4cGxvcmVyLmdldENvbXBvbmVudElEKCkpLmdldEl0ZW0ocm93LmlkKTtcclxuXHRcdEFwcExvZy5pbmZvKFwiaW5mb1wiLCBcIkJlZm9yZSBFZGl0IEV2ZW50XCIpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgUHJvY2Vzc09uRGVzdHJ1Y3QodGhlQ29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHRVSS5EZWJ1ZyhcIm9uIERlc3RydWN0IENhbGxlZFwiKTtcclxuXHRcdHRoZUNvbXBvbmVudC5vbkRlc3RydWN0KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgUHJvY2Vzc1RhYkNoYW5nZWQoKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25Ecm9wRXZlbnQoU291cmNlLCB0YXJnZXQsIGV2ZW50KSB7XHJcblx0XHQvLyBVSS5JbmZvKFwiRHJvcCBFdmVudFwiKTtcclxuXHRcdGNvbnNvbGUubG9nKFwiT24gRHJvcCBFdmVudFwiKTtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlFdmVudEhhbmRsZXIgPSBVSUV2ZW50SGFuZGxlcjtcclxuXHJcbmVudW0gU291bmRzIHsgUG9wdXAsIFNoYXBlRHJvcCwgU2hhcGVEcmFnSW4sIFNoYXBlRHJhZ091dCwgQmxvcCwgT3BlbkRpYWdyYW0sIFNhdmVEaWFncmFtLCBDbG9zZURpYWdyYW0sIFNoYXBlT25TaGFwZURyb3AsIERyYXdMaW5rLCBFcnJvciB9dGhpcy5Tb3VuZHMgPSBTb3VuZHM7XHJcblxyXG5jbGFzcyBVSSBleHRlbmRzIEM0T2JqZWN0IHtcclxuXHRwdWJsaWMgc3RhdGljIFBsYXlTb3VuZChzb3VuZDpTb3VuZHMgPSBTb3VuZHMuQmxvcCkge1xyXG5cdFx0dmFyIHM7XHJcblx0XHRzd2l0Y2ggKHNvdW5kKSB7XHJcblx0XHRcdGNhc2UgU291bmRzLlBvcHVwOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQ2xpY2tPZmYubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5DbG9zZURpYWdyYW06XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9Eb29yIENsb3NlLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVEcm9wOlxyXG5cdFx0XHRjYXNlIFNvdW5kcy5PcGVuRGlhZ3JhbTpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Jsb3AubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5CbG9wOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQmxvcC5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLkVycm9yOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvRXJyb3IxLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVPblNoYXBlRHJvcDpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL01ldGFsQ2xpY2sxLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuU2F2ZURpYWdyYW06XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9Ecm9wIEZvcmsubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5EcmF3TGluazpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL1BvcENvcmsubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZURyYWdJbjpcclxuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVEcmFnT3V0IDpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0NsaWNrLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdHMucGxheSgpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIERlYnVnKHRleHQ6c3RyaW5nKSB7XHJcblx0XHRpZiAodHJ1ZSlcclxuXHRcdFx0VUkuTWVzc2FnZSh0ZXh0KVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE1lc3NhZ2UodGV4dDpzdHJpbmcpIHtcclxuXHRcdFVJLkluZm8odGV4dCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgSW5mbyh0ZXh0OnN0cmluZykge1xyXG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XHJcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcclxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxyXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXHJcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcclxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcclxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXHJcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcclxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxyXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXHJcblx0XHR9XHJcblx0XHR0b2FzdHJbXCJpbmZvXCJdKHRleHQpXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgV2FybmluZyh0ZXh0OnN0cmluZykge1xyXG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XHJcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcclxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxyXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXHJcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcclxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcclxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXHJcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcclxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxyXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXHJcblx0XHR9XHJcblx0XHRVSS5QbGF5U291bmQoU291bmRzLkVycm9yKTtcclxuXHRcdHRvYXN0cltcIndhcm5pbmdcIl0odGV4dClcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBTdWNjZXNzKHRleHQ6c3RyaW5nKSB7XHJcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcclxuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxyXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXHJcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXHJcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcclxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxyXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxyXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcclxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxyXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXHJcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcclxuXHRcdH1cclxuXHRcdHRvYXN0cltcInN1Y2Nlc3NcIl0odGV4dClcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBFcnJvcih0ZXh0OnN0cmluZykge1xyXG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XHJcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcclxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxyXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXHJcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcclxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcclxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXHJcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcclxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxyXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXHJcblx0XHR9XHJcblx0XHRVSS5QbGF5U291bmQoU291bmRzLkVycm9yKTtcclxuXHRcdHRvYXN0cltcImVycm9yXCJdKHRleHQpXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgRXhwb3J0VG9FeGNlbChjb21wb25lbnRJRDpzdHJpbmcpIHtcclxuXHRcdCQkKGNvbXBvbmVudElEKS5leHBvcnRUb0V4Y2VsKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgQWxlcnQoc3RyaW5nKSB7d2ViaXguYWxlcnQoc3RyaW5nKTt9XHJcbn10aGlzLlVJID0gVUk7XHJcblxyXG5jbGFzcyBVSUNvbXBvbmVudCBleHRlbmRzIFVJIHtcclxuXHJcblx0cHJvdGVjdGVkIG92ZXJsYXlNaXhpbjpib29sZWFuICAgICAgICAgID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudFZhbHVlOnN0cmluZztcclxuXHRwcm90ZWN0ZWQgY29tcG9uZW50SUQ6c3RyaW5nO1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnRMYWJlbDpzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudFZpZXc6YW55O1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnRDaGFuZ2VDYWxsYmFjazphbnk7XHJcblx0cHJvdGVjdGVkIG93bmluZ0NvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHRwcm90ZWN0ZWQgb3JkZXI6bnVtYmVyICAgICAgICAgICAgICAgICAgPSAwO1xyXG5cdHByb3RlY3RlZCBldmVudHNEZWZpbmVkOmJvb2xlYW4gICAgICAgICA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCB0cmFja2luZ09iamVjdENoYW5nZXM6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgICAgX3VpQ2xhc3NUeXBlOkNsYXNzVHlwZTtcclxuXHRwcm90ZWN0ZWQgaWRQcmVmaXggICAgICAgICAgICAgICAgICAgICAgPSBcIlVJQ29tcG9uZW50X1wiO1xyXG5cdHByaXZhdGUgICAgIHRoZU9iamVjdDphbnk7XHJcblx0cHVibGljICAgICAgdGhlVGVzdCAgICAgICAgICAgICAgICAgICAgID0gbmV3IEM0T2JqZWN0KCk7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudERhdGE6YW55O1xyXG5cdHByaXZhdGUgcmVsYXRpb25zaGlwT2JqZWN0O1xyXG5cdHByaXZhdGUgX3VzZXJEYXRhOmFueTtcclxuXHRwcm90ZWN0ZWQgcHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cclxuXHRnZXQgdXNlckRhdGEoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VzZXJEYXRhO1xyXG5cdH1cclxuXHRzZXQgdXNlckRhdGEodmFsdWU6YW55KSB7XHJcblx0XHR0aGlzLl91c2VyRGF0YSA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgdWlDbGFzc1R5cGUoKTpDbGFzc1R5cGUge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VpQ2xhc3NUeXBlO1xyXG5cdH1cclxuXHRzZXQgdWlDbGFzc1R5cGUodmFsdWU6Q2xhc3NUeXBlKSB7XHJcblx0XHR0aGlzLl91aUNsYXNzVHlwZSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNob3dPdmVybGF5KCkge1xyXG5cdFx0aWYgKCF0aGlzLm92ZXJsYXlNaXhpbilcclxuXHRcdFx0d2ViaXguZXh0ZW5kKCQkKHRoaXMuY29tcG9uZW50SUQpLCB3ZWJpeC5PdmVybGF5Qm94KTtcclxuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNob3dPdmVybGF5KCk7XHJcblx0XHR0aGlzLm92ZXJsYXlNaXhpbiA9IHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBoaWRlT3ZlcmxheSgpIHtcclxuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmhpZGVPdmVybGF5KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIFRyZWVJY29uKG9iajphbnkpIHtcclxuXHRcdGlmIChvYmouJGxldmVsID4gMTAwMSlcclxuXHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZm9sZGVyLW9wZW4nPjwvc3Bhbj5cIjtcclxuXHRcdGlmIChvYmouJGxldmVsIDwgMTAwMCkge1xyXG5cdFx0XHRyZXR1cm4gRmFjdG9yeS5HZXRDbGFzc0ljb24ob2JqLl9jbGFzc1R5cGUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZmlsbSc+PC9zcGFuPlwiO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IHRoaXMuaWRQcmVmaXggKyB3ZWJpeC51aWQoKTtcclxuXHRcdHRoaXMuYWRkUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhdHRhY2hFdmVudChpZDpzdHJpbmcsIGV2ZW50LCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKCQkKGlkKSkge1xyXG5cdFx0XHQkJChpZCkuYXR0YWNoRXZlbnQoZXZlbnQsIGNhbGxiYWNrKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XHJcblx0XHR0aGlzLnJlbGF0aW9uc2hpcE9iamVjdCA9IHRoZU9iamVjdDtcclxuXHR9XHJcblx0cHVibGljIGdldFJlbGF0aW9uc2hpcE9iamVjdCgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGlvbnNoaXBPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBibGFua1ZhbHVlKCkge31cclxuXHRwdWJsaWMgY3JlYXRlVmlldyh2aWV3T3B0aW9uczphbnkpOmFueSB7XHJcblx0XHR0aGlzLnNldFByb3BlcnR5KFwiZHJhZ1wiLCB0cnVlKTtcclxuXHRcdHRoaXMubWVyZ2VQcm9wZXJ0eVNldCh2aWV3T3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gdmlld09wdGlvbnM7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRJRChwcmVmaXg6c3RyaW5nKSB7XHJcblx0XHR0aGlzLmlkUHJlZml4ICAgID0gcHJlZml4O1xyXG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IHRoaXMuaWRQcmVmaXggKyB3ZWJpeC51aWQoKTtcclxuXHR9XHJcblx0cHVibGljIHNldENhbGxiYWNrKGNhbGxiYWNrOmFueSkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRDaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Q2FsbGJhY2soKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRDaGFuZ2VDYWxsYmFjaztcclxuXHR9XHJcblx0cHVibGljIGlzVmFsaWQoKTpib29sZWFuIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHRyZXR1cm4gJCQodGhpcy5jb21wb25lbnRJRCkudmFsaWRhdGUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIHNldERhdGEodGhlRGF0YTphbnkpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50RGF0YSA9IHRoZURhdGE7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXREYXRhKCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudERhdGE7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRMYWJlbCh0aGVMYWJlbCkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRMYWJlbCA9IHRoZUxhYmVsO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRMYWJlbDtcclxuXHR9XHJcblx0cHVibGljIHNldFZhbHVlKHRoZVZhbHVlOmFueSkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWYWx1ZSA9IHRoZVZhbHVlO1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdHdlYml4LnVpKHRoaXMuZ2V0VmFsdWUsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcclxuXHRcdFx0dGhpcy5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRPd25pbmdDb21wb25lbnQoY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHR0aGlzLm93bmluZ0NvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuXHR9XHJcblx0cHVibGljIGdldE93bmluZ0NvbXBvbmVudCgpOlVJQ29tcG9uZW50IHtcclxuXHRcdHJldHVybiB0aGlzLm93bmluZ0NvbXBvbmVudDtcclxuXHR9XHJcblx0cHVibGljIGdldENvbXBvbmVudElEKCk6c3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudElEO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50SUQoaWQ6c3RyaW5nKSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudElEID0gaWQ7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWYWx1ZSgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWYWx1ZTtcclxuXHR9XHJcblx0cHVibGljIGdldENvbXBvbmVudFZpZXcoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudFZpZXcodGhlVmlldzphbnkpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoZVZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRTZWxlY3RlZE9iamVjdCgpOmFueSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIG9uQmVmb3JlRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKSB7XHJcblx0XHR3ZWJpeC5hbGVydChcIlNvcnJ5IERyb3BwaW5nIEhlcmUgTm90IEFsbG93ZWQgWWV0XCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVEcmFnSW4obWVzc2FnZTpEcm9wTWVzc2FnZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25BZnRlckRyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSk6YW55IHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIG9uRHJhZ091dChtZXNzYWdlOkRyb3BNZXNzYWdlKTphbnkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgdmFsaWRhdGVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmFueSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyBvblNlbGVjdENoYW5nZShpdGVtTWVzc2FnZTpJdGVtU2VsZWN0ZWRFdmVudCkge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwib25TZWxlY3RDaGFuZ2VcIiwgaXRlbU1lc3NhZ2UpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRwdWJsaWMgb25JdGVtRGJsQ2xpY2soaXRlbU1lc3NhZ2UgOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwib25JdGVtRGJsQ2xpY2tcIixpdGVtTWVzc2FnZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkl0ZW1DbGljayhpdGVtTWVzc2FnZSA6IEl0ZW1TZWxlY3RlZEV2ZW50KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJvbkl0ZW1DbGlja1wiLGl0ZW1NZXNzYWdlKTtcclxuXHR9XHJcblx0cHVibGljIGdldE9iamVjdCgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy50aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRPYmplY3QodGhlT2JqZWN0OmFueSkge1xyXG5cdFx0dGhpcy50aGVPYmplY3QgPSB0aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXREcmFnZ2FibGUoZmxhZzpib29sZWFuID0gdHJ1ZSkge1xyXG5cdFx0dmFyIGh0bWxWaWV3ID0gJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS4kdmlldztcclxuXHRcdHdlYml4LkRyYWdDb250cm9sLmFkZERyb3AoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSwgVUlFdmVudEhhbmRsZXIuT25Ecm9wRXZlbnQpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0UHJvcGVydHkobmFtZSwgdmFsdWUpIHtcclxuXHRcdHN3aXRjaCAobmFtZSkge1xyXG5cdFx0XHRjYXNlIFwibGFiZWxcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNldExhYmVsKHZhbHVlKTtcclxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwidmFsdWVcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiZGF0YVwiIDpcclxuXHRcdFx0XHR0aGlzLnNldERhdGEodmFsdWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiY2FsbGJhY2tcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNldENhbGxiYWNrKHZhbHVlKVxyXG5cdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMucHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgYWRkUHJvcGVydGllcyhwcm9wZXJ0eVNldDphbnkpIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gcHJvcGVydHlTZXQpIHtcclxuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eShpdGVtLCBwcm9wZXJ0eVNldFtpdGVtXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQcm9wZXJ0eShuYW1lKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcGVydGllc1tuYW1lXTtcclxuXHR9XHJcblx0cHVibGljIG1lcmdlUHJvcGVydHlTZXQodmlldzphbnkpIHtcclxuXHRcdHZhciBpbmRleCA9IDA7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMucHJvcGVydGllcykge1xyXG5cdFx0XHR2aWV3W2l0ZW1dID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQcm9wZXJ0eVNldCgpOmFueSB7XHJcblx0XHR2YXIgaW5kZXggICA9IDA7XHJcblx0XHR2YXIgcmVzdWx0cyA9IHt9O1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cmVzdWx0c1tpdGVtXSA9IHRoaXMucHJvcGVydGllc1tpdGVtXTtcclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG5cdH1cclxuXHJcblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRwdWJsaWMgcmVmcmVzaCgpIHt9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdHRoaXMuZXZlbnRzRGVmaW5lZCA9IHRydWU7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZHJhZyAgICAgICAgID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSAkJCh0aGlzLmNvbXBvbmVudElEKS5kZXN0cnVjdG9yKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZXN0cm95T2JqZWN0KCkge1xyXG5cdH1cclxuXHRwdWJsaWMgb25EZXN0cnVjdCgpIHtcclxuXHRcdHRoaXMuZGVzdHJveU9iamVjdCgpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVzdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdC8vZW5kcmVnaW9uXHJcbn0gdGhpcy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50O1xyXG5cclxuY2xhc3MgVUlDb250ZXh0TWVudSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHRwdWJsaWMganVtcEl0ZW1BcnJheTpBcnJheTxVSUp1bXBJdGVtPjtcclxuXHRwdWJsaWMgb3duaW5nQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXkgPSBuZXcgQXJyYXk8VUlKdW1wSXRlbT4oKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJ1aUNvbnRleHRNZW51X1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRJdGVtKGxhYmVsLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIG5ld0l0ZW0gICAgICA9IG5ldyBVSUp1bXBJdGVtKCk7XHJcblx0XHRuZXdJdGVtLmlkICAgICAgID0gXCJtZW51SXRlbV9cIiArIHdlYml4LnVpZCgpO1xyXG5cdFx0bmV3SXRlbS5sYWJlbCAgICA9IGxhYmVsO1xyXG5cdFx0bmV3SXRlbS5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcclxuXHR9XHJcblx0cHVibGljIGFkZFNlcGVyYXRvcigpIHtcclxuXHRcdHZhciBuZXdJdGVtICAgICAgPSBuZXcgVUlKdW1wSXRlbSgpO1xyXG5cdFx0bmV3SXRlbS5pZCAgICAgICA9IFwianVtcEl0ZW1fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdG5ld0l0ZW0ubGFiZWwgICAgPSBcIlwiO1xyXG5cdFx0bmV3SXRlbS5jYWxsYmFjayA9IG51bGw7XHJcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TWVudUl0ZW0obGFiZWw6c3RyaW5nKTpVSUp1bXBJdGVtIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdGlmICh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWwgPT0gbGFiZWwpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR2YXIgbWVudUFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdHZhciBtZW51SXRlbSA9IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXTtcclxuXHRcdFx0aWYgKG1lbnVJdGVtLmxhYmVsID09IFwiXCIpIHtcclxuXHRcdFx0XHRtZW51QXJyYXkucHVzaCh7JHRlbXBsYXRlOiBcIlNlcGFyYXRvclwifSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVudUFycmF5LnB1c2gobWVudUl0ZW0ubGFiZWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHR2aWV3OiBcImNvbnRleHRtZW51XCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIGRhdGE6IG1lbnVBcnJheVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuZ2V0VmlldygpO1xyXG5cdFx0aWYgKCEkJCh0aGlzLmNvbXBvbmVudElEKSlcclxuXHRcdFx0d2ViaXgudWkodGhpcy5jb21wb25lbnRWaWV3KS5hdHRhY2hUbygkJCh0aGlzLmdldE93bmluZ0NvbXBvbmVudCgpLmdldENvbXBvbmVudElEKCkpKTtcclxuXHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSlbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmdldENvbXBvbmVudElEKCksIFwiY2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuTWVudUhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlVJQ29udGV4dE1lbnUgPSBVSUNvbnRleHRNZW51O1xyXG5cclxuZW51bSBGaWVsZEZvcm1hdCB7IEdFTkVSQUwsIENVUlJFTkNZLCBOVU1CRVIsIFBFUkNFTlQgfXRoaXMuRmllbGRGb3JtYXQgPSBGaWVsZEZvcm1hdDtcclxuXHJcbmNsYXNzIFVJRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHByaXZhdGUgbGlzdFR5cGU6c3RyaW5nO1xyXG5cdHByaXZhdGUgcmVsYXRpb25zaGlwUG9pbnRlcjpib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIHVwZGF0ZUZpZWxkOnN0cmluZztcclxuXHRwdWJsaWMgbWF4TGVuZ3RoOm51bWJlcjtcclxuXHRwdWJsaWMgZmllbGRGb3JtYXQ6RmllbGRGb3JtYXQgICAgICA9IEZpZWxkRm9ybWF0LkdFTkVSQUw7XHJcblx0cHVibGljIGZvcm1hdFZpZXc6YW55O1xyXG5cdHB1YmxpYyBmaWVsZFZhbHVlOmFueTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcInVpZmllbGRfXCIpO1xyXG5cdFx0dGhpcy5hZGRFdmVudFB1YmxpY2F0aW9uKFwiZmllbGRDaGFuZ2VkXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGZpZWxkQ2hhbmdlZChuZXdWYWx1ZTphbnksIG9sZFZhbHVlKSB7XHJcblx0XHR2YXIgdGhlUGFyZW50ID0gdGhpcy5nZXREYXRhKCk7XHJcblx0XHRpZiAodGhpcy5nZXRDYWxsYmFjaygpKSB7XHJcblx0XHRcdHZhciBjYWxsYmFjayA9IHRoaXMuZ2V0Q2FsbGJhY2soKTtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKHRoaXMsIHRoZVBhcmVudCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuXHRcdH1cclxuXHRcdHRoaXMudmFsdWVDaGFuZ2VkKHRoZVBhcmVudCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuXHRcdHRoaXMucHVibGlzaChcImZpZWxkQ2hhbmdlZFwiLCB7bmV3VmFsdWU6IG5ld1ZhbHVlLCBvbGRWYWx1ZTogb2xkVmFsdWV9KVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q2xhc3NUeXBlKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcclxuXHRcdHRoaXMubGlzdFR5cGUgPSA8c3RyaW5nPiBjbGFzc1R5cGU7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRDbGFzc1R5cGUoKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubGlzdFR5cGU7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRVcGRhdGVGaWVsZCh0aGVGaWVsZE5hbWU6c3RyaW5nKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdGhlRmllbGROYW1lO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VXBkYXRlRmllbGQoKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMudXBkYXRlRmllbGQ7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRGaWVsZEZvcm1hdCh0aGVGb3JtYXQ6RmllbGRGb3JtYXQpIHtcclxuXHRcdHRoaXMuZmllbGRGb3JtYXQgPSB0aGVGb3JtYXQ7XHJcblx0XHRzd2l0Y2ggKHRoZUZvcm1hdCkge1xyXG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0LkNVUlJFTkNZIDpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuZm9ybWF0VmlldyA9IHdlYml4Lk51bWJlci5udW1Ub1N0cih7XHJcblx0XHRcdFx0XHRncm91cERlbGltaXRlcjogXCIsXCIsIGdyb3VwZVNpemU6IDMsIGRlY2ltYWxEZWxpbWl0ZXI6IFwiLlwiLCBkZWNpbWFsU2l6ZTogMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuUEVSQ0VOVCA6XHJcblx0XHRcdHtcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuR0VORVJBTCA6XHJcblx0XHRcdHtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0Lk5VTUJFUiA6XHJcblx0XHRcdHtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFZhbHVlKHZhbHVlOmFueSkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmJsb2NrRXZlbnQoKTtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS51bmJsb2NrRXZlbnQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmllbGRWYWx1ZSA9IHZhbHVlO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uQ2hhbmdlXCIsIFVJRXZlbnRIYW5kbGVyLkZpZWxkQ2hhbmdlZCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWYWx1ZSgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5maWVsZFZhbHVlO1xyXG5cdH1cclxuXHRwdWJsaWMgYmxhbmtWYWx1ZSgpIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZShcIlwiKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmllbGRWYWx1ZSA9IFwiXCI7XHJcblx0fVxyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQocGFyZW50Q29tcG9uZW50OlVJQ29tcG9uZW50LCBuZXdWYWx1ZTphbnksIG9sZFZhbHVlOmFueSkge1xyXG5cdFx0aWYgKCF0aGlzLmlzVmFsaWQoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0aWYgKCF0aGlzLnVwZGF0ZUZpZWxkKSByZXR1cm47XHJcblx0XHR2YXIgdGhlT2JqZWN0ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHBhcmVudENvbXBvbmVudC5nZXRPYmplY3QoKS5jbGFzc1R5cGUpO1xyXG5cdFx0dGhlT2JqZWN0LnVwZGF0ZUF0dHJpYnV0ZShwYXJlbnRDb21wb25lbnQuZ2V0T2JqZWN0KCkuX2lkLCB0aGlzLnVwZGF0ZUZpZWxkLCBuZXdWYWx1ZSk7XHJcblx0XHRVSS5NZXNzYWdlKFwiUmVjb3JkIFVwZGF0ZWRcIik7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJRmllbGQgPSBVSUZpZWxkO1xyXG5cclxuY2xhc3MgVUlDb3VudGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlDb3VudGVyRmllbGRfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGZpZWxkQ2hhbmdlZChuZXd2LCBvbGR2KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJmaWVsZENoYW5nZWRcIiwge25ld1ZhbHVlOiBuZXd2LCBvbGRWYWx1ZTogb2xkdn0pO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJjb3VudGVyXCJcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG59dGhpcy5VSUNvdW50ZXJGaWVsZCA9IFVJQ291bnRlckZpZWxkO1xyXG5cclxuY2xhc3MgVUlMYWJlbCBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblx0cHVibGljIGFsaWdubWVudDpzdHJpbmcgPSBcImNlbnRlclwiO1xyXG5cdHB1YmxpYyBsYWJlbFdpZHRoOm51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTGFiZWxfXCIpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgYWxpZ25tZW50ID0gXCJjZW50ZXJcIiwgbGFiZWxXaWR0aCA9IDEwMCkge1xyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0aWVzKHtsYWJlbDogbGFiZWwsIGFsaWdubWVudDogYWxpZ25tZW50LCBsYWJlbFdpZHRoOiBsYWJlbFdpZHRofSk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImxhYmVsXCJcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG59IHRoaXMuVUlMYWJlbCA9IFVJTGFiZWw7XHJcblxyXG5jbGFzcyBVSURhdGVGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwidWlEYXRlRmllbGRfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgIDogXCJkYXRlcGlja2VyXCIsXHJcblx0XHRcdG5hbWUgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcclxuXHRcdFx0bGFiZWwgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0bGFiZWxXaWR0aDogMTAwLFxyXG5cdFx0XHR0aW1lcGlja2VyOiBmYWxzZVxyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5mb3JtYXRWaWV3KSB7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50Vmlld1tcImZvcm1hdFwiXSA9IHRoaXMuZm9ybWF0VmlldztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5FdmVudHMoKSB7XHJcblxyXG5cdH1cclxuXHJcbn0gdGhpcy5VSURhdGVGaWVsZCA9IFVJRGF0ZUZpZWxkO1xyXG5cclxuY2xhc3MgVUlTbGlkZXJGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSVNsaWRlckZpZWxkXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSwgZGF0YTphbnksIGNhbGxiYWNrOmFueSwgdXBkYXRlRmllbGQgPSBudWxsLCBtaW5WYWx1ZTpudW1iZXIgPSAwLCBtYXhWYWx1ZTpudW1iZXIgPSAxLCBzdGVwOm51bWJlciA9IC4xKSB7XHJcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XHJcblx0XHR0aGlzLnNldFByb3BlcnR5KFwibWluXCIsIG1pblZhbHVlKTtcclxuXHRcdHRoaXMuc2V0UHJvcGVydHkoXCJtYXhcIiwgbWF4VmFsdWUpO1xyXG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcInN0ZXBcIiwgc3RlcCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHRuYW1lIDogdGhpcy5nZXRMYWJlbCgpLFxyXG5cdFx0XHR2aWV3IDogXCJzbGlkZXJcIixcclxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWUoKSxcclxuXHRcdFx0dGl0bGU6IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0XHRyZXR1cm4gd2ViaXguaTE4bi5udW1iZXJGb3JtYXQob2JqLnZhbHVlICogMTAwKSArIFwiJVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge31cclxuXHJcbn0gdGhpcy5VSVNsaWRlckZpZWxkID0gVUlTbGlkZXJGaWVsZDtcclxuXHJcbmNsYXNzIFVJVGV4dEZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XHJcblxyXG5cdHB1YmxpYyB0ZXh0QXJlYSA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcInVpVGV4dEZpZWxkX1wiKTtcclxuXHRcdHRoaXMudGV4dEFyZWEgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUZXh0QXJlYSh0ZXh0QXJlYTpib29sZWFuKSB7XHJcblx0XHR0aGlzLnRleHRBcmVhID0gdGV4dEFyZWE7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55ID0gbnVsbCwgY2FsbGJhY2s6YW55ID0gbnVsbCwgdXBkYXRlRmllbGQgPSBudWxsLCB0ZXh0QXJlYSA9IGZhbHNlKSB7XHJcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0XHR0aGlzLnRleHRBcmVhICAgID0gdGV4dEFyZWE7XHJcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdGlmICh0aGlzLnRleHRBcmVhKVxyXG5cdFx0XHR2YXIgdmlld1R5cGUgPSBcInRleHRhcmVhXCI7IGVsc2VcclxuXHRcdFx0dmlld1R5cGUgPSBcInRleHRcIjtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICA6IHZpZXdUeXBlLFxyXG5cdFx0XHRuYW1lICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdGxhYmVsV2lkdGg6IDEwMFxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XHJcblxyXG59IHRoaXMuVUlUZXh0RmllbGQgPSBVSVRleHRGaWVsZDtcclxuXHJcbmNsYXNzIFVJTm90ZUZpZWxkIGV4dGVuZHMgVUlUZXh0RmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTm90ZUZpZWxkX1wiKTtcclxuXHRcdHRoaXMudGV4dEFyZWEgPSB0cnVlO1xyXG5cdH1cclxuXHJcbn10aGlzLlVJTm90ZUZpZWxkID0gVUlOb3RlRmllbGQ7XHJcblxyXG5jbGFzcyBVSVNlbGVjdExpc3QgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHJcblx0cHVibGljIHNlbGVjdGlvbkxpc3Q6QXJyYXk8YW55PjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJ1aVNlbGVjdExpc3RfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFZhbHVlKHZhbHVlIDogYW55KSB7XHJcblx0XHRzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0U2VsZWN0TGlzdChsYWJlbCwgdmFsdWUsIHRoZUxpc3QsIGRhdGEsIGNhbGxiYWNrLCB1cGRhdGVGaWVsZCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0TGlzdCh0aGVMaXN0KTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spXHJcblx0XHR0aGlzLnNldFVwZGF0ZUZpZWxkKHVwZGF0ZUZpZWxkKTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgIDogXCJzZWxlY3RcIixcclxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0b3B0aW9ucyAgIDogdGhpcy5zZWxlY3Rpb25MaXN0LFxyXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0dmFsaWRhdGUgIDogd2ViaXgucnVsZXMuaXNOb3RFbXB0eVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0TGlzdCh0aGVMaXN0OkFycmF5PGFueT4pIHtcclxuXHRcdHRoaXMuc2VsZWN0aW9uTGlzdCA9IHRoZUxpc3Q7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoZUxpc3QpIHtcclxuXHRcdFx0aWYgKHRoZUxpc3RbaXRlbV0ubmFtZSA9PSBcIlwiKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VsZWN0aW9uTGlzdC5wdXNoKHtpZDogXCJcIiwgbmFtZTogXCJcIn0pO1xyXG5cclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5kZWZpbmUoXCJvcHRpb25zXCIsIHRoaXMuc2VsZWN0aW9uTGlzdCk7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnJlZnJlc2goKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IHRoaXMuVUlTZWxlY3RMaXN0ID0gVUlTZWxlY3RMaXN0O1xyXG5cclxuY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55ID0gMCwgZGF0YTphbnkgPSBudWxsLCBjYWxsYmFjazphbnkgPSBudWxsKSB7XHJcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksXHJcblx0XHRcdHZpZXc6IFwiY2hlY2tib3hcIixcclxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWUoKSxcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIG9uQ2hhbmdlKG5ld3YsIG9sZHYpIHtcclxuXHRcdHRoaXMucHVibGlzaChcIm9uQ2hhbmdlXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJQ2hlY2tib3ggPSBVSUNoZWNrYm94O1xyXG5cclxuY2xhc3MgVUlKdW1wSXRlbSB7XHJcblxyXG5cdHB1YmxpYyBpZDpzdHJpbmc7XHJcblx0cHVibGljIGxhYmVsOnN0cmluZztcclxuXHRwdWJsaWMgY2FsbGJhY2s6YW55O1xyXG5cdHB1YmxpYyBldmVudDphbnk7XHJcblx0cHVibGljIHR5cGU6c3RyaW5nO1xyXG5cclxufVxyXG5jbGFzcyBVSUp1bXBCYXIgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBqdW1wSXRlbUFycmF5OkFycmF5PFVJSnVtcEl0ZW0+O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlKdW1wQmFyX1wiKTtcclxuXHRcdHRoaXMuanVtcEl0ZW1BcnJheSA9IG5ldyBBcnJheTxVSUp1bXBJdGVtPigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBKdW1wQ2FsbGJhY2soaWQ6c3RyaW5nLCBldmVudDphbnkpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJChpZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgY2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0dGhlQ29tcG9uZW50LnB1Ymxpc2godGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmV2ZW50KVxyXG5cdFx0Ly8gICAgdGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmNhbGxiYWNrKHRoZUNvbXBvbmVudCwgdGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmxhYmVsKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdHZhciBuZXdJdGVtVmlldyA9IHtcclxuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIixcclxuXHRcdFx0XHRpZCAgIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLFxyXG5cdFx0XHRcdHR5cGUgOiBcImh0bWxidXR0b25cIixcclxuXHRcdFx0XHRjc3MgIDogXCJidF8xXCIsXHJcblx0XHRcdFx0bGFiZWw6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5sYWJlbCxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmxhYmVsXHJcblx0XHRcdH1cclxuXHRcdFx0YmFyVmlldy5wdXNoKG5ld0l0ZW1WaWV3KTtcclxuXHRcdH1cclxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIGNvbHM6IGJhclZpZXdcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld1ZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRJdGVtKGxhYmVsOnN0cmluZywgZXZlbnQ6c3RyaW5nLCB0eXBlID0gXCJkYW5nZXJcIiwgY2FsbGJhY2sgPSBudWxsKSB7XHJcblx0XHR2YXIgbmV3SXRlbSAgICAgID0gbmV3IFVJSnVtcEl0ZW0oKTtcclxuXHRcdG5ld0l0ZW0uaWQgICAgICAgPSBcImp1bXBCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdG5ld0l0ZW0ubGFiZWwgICAgPSBsYWJlbDtcclxuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdG5ld0l0ZW0uZXZlbnQgICAgPSBldmVudDtcclxuXHRcdG5ld0l0ZW0udHlwZSAgICAgPSB0eXBlO1xyXG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdGlmICgkJCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQpKVxyXG5cdFx0XHRcdGlmICghJCQodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkKS5oYXNFdmVudChcIm9uSXRlbUNsaWNrXCIpKVxyXG5cdFx0XHRcdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsIFwib25JdGVtQ2xpY2tcIiwgVUlKdW1wQmFyLkp1bXBDYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcclxuXHRcdFx0aWYgKCQkKGl0ZW0pKSB7XHJcblx0XHRcdFx0JCQoaXRlbSlbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xyXG5cdFx0XHRcdCQkKGl0ZW0pW1wiZGF0YVwiXSAgICAgID0gdGhpcy5nZXREYXRhKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG59IHRoaXMuVUlKdW1wQmFyID0gVUlKdW1wQmFyO1xyXG5cclxuY2xhc3MgVUlUb29sYmFyIGV4dGVuZHMgVUlKdW1wQmFyIHtcclxuXHJcblx0cHVibGljIGxhYmVsOnN0cmluZztcclxuXHRwdWJsaWMgaWNvbjpzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUb29sQmFyKGxhYmVsLCBpY29uKSB7XHJcblx0XHR0aGlzLmxhYmVsID0gbGFiZWw7XHJcblx0XHR0aGlzLmljb24gID0gaWNvbjtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dmFyIGJhclZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHRoZUJhciAgPSB7dmlldzogXCJsYWJlbFwiLCBsYWJlbDogdGhpcy5pY29uICsgXCIgXCIgKyB0aGlzLmxhYmVsfTtcclxuXHRcdGJhclZpZXcucHVzaCh0aGVCYXIpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcclxuXHRcdFx0dmFyIG5ld0l0ZW1WaWV3ID0ge1xyXG5cdFx0XHRcdHZpZXcgOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRcdGlkICAgOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsXHJcblx0XHRcdFx0dHlwZSA6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS50eXBlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWxcclxuXHRcdFx0fVxyXG5cdFx0XHRiYXJWaWV3LnB1c2gobmV3SXRlbVZpZXcpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld1ZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICA6IFwidG9vbGJhclwiLFxyXG5cdFx0XHRjc3MgICAgIDogXCJoaWdobGlnaHRlZF9oZWFkZXIgaGVhZGVyM1wiLFxyXG5cdFx0XHRwYWRkaW5nWDogNSxcclxuXHRcdFx0cGFkZGluZ1k6IDUsXHJcblx0XHRcdGhlaWdodCAgOiA0MCxcclxuXHRcdFx0Y29scyAgICA6IGJhclZpZXdcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld1ZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJVG9vbGJhciA9IFVJVG9vbGJhcjtcclxuXHJcbmNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHRwdWJsaWMgY29sb3I6c3RyaW5nO1xyXG5cdHB1YmxpYyBldmVudDpzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUJ1dHRvbl9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25CdXR0b25DbGljayh0aGVDb21wb25lbnQ6YW55KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJjbGlja1wiLCB0aGlzKTtcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlPzphbnksIGRhdGE/OmFueSwgY2FsbGJhY2s/OmFueSkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdFx0dGhpcy5jb2xvciA9IFwiYmFja2dyb3VuZC1jb2xvciA6ICNGRjlFOUVcIjtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHR2aWV3ICAgICA6IFwiYnV0dG9uXCIsXHJcblx0XHRcdG5hbWUgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0dmFsdWUgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHRjc3NGb3JtYXQ6IHRoaXMuY29sb3IsXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRMYWJlbCh0aGVMYWJlbDpzdHJpbmcpIHtcclxuXHRcdHN1cGVyLnNldExhYmVsKHRoZUxhYmVsKTtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkudmFsdWUgPSB0aGVMYWJlbDtcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5yZWZyZXNoKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb2xvcih2YWx1ZTpzdHJpbmcpIHtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uc3R5bGUuYmFja2dyb3VuZCAgPSB2YWx1ZTtcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS4kdmlldy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXS5zdHlsZS5ib3JkZXJDb2xvciA9IHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uSXRlbUNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk9uQnV0dG9uQ2xpY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlCdXR0b24gPSBVSUJ1dHRvbjtcclxuXHJcbmNsYXNzIFVJRHJvcFpvbmUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSURyb3Bab25lX1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcclxuXHR9XHJcblx0cHVibGljIHNldEluVGhlWm9uZShpblpvbmU6Ym9vbGVhbikge1xyXG5cdFx0aWYgKGluWm9uZSlcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5kZWZpbmUoXCJjc3NcIiwgXCJpblRoZURyb3Bab25lXCIpOyBlbHNlXHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuZGVmaW5lKFwiY3NzXCIsIFwib3V0T2ZUaGVEcm9wWm9uZVwiKTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZCAgICAgICA6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSxcclxuXHRcdFx0dmlldyAgICAgOiBcImxpc3RcIixcclxuXHRcdFx0bWluV2lkdGggOiAxMDAsXHJcblx0XHRcdG1pbkhlaWdodDogMTAwLFxyXG5cdFx0XHR0ZW1wbGF0ZSA6IFwiI3RpdGxlI1wiLFxyXG5cdFx0XHRkYXRhICAgICA6IFt7dGl0bGU6IFwiRHJvcCBab25lXCJ9XSxcclxuXHRcdFx0ZHJhZyAgICAgOiBcInRhcmdldFwiXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xyXG5cdFx0dGhpcy5zZXRJblRoZVpvbmUoZmFsc2UpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVEcmFnSW4obWVzc2FnZTpEcm9wTWVzc2FnZSk6Ym9vbGVhbiB7XHJcblx0XHR0aGlzLnNldEluVGhlWm9uZSh0cnVlKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25EcmFnT3V0KG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xyXG5cdFx0dGhpcy5zZXRJblRoZVpvbmUoZmFsc2UpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuY29tcG9uZW50SUQsIFwib25CZWZvcmVEcm9wXCIsIFVJRXZlbnRIYW5kbGVyLk9uQmVmb3JlRHJvcCk7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJRHJvcFpvbmUgPSBVSURyb3Bab25lO1xyXG5cclxuaW50ZXJmYWNlIG9uRWRpdENhbGxiYWNrIHtcclxuXHQob2JqZWN0OmFueSkgOiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIFVJQ29sb3JGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55KSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUNvbG9yRmllbGRfXCIpO1xyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwiY29sb3JwaWNrZXJcIlxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcbn10aGlzLlVJQ29sb3JGaWVsZCA9IFVJQ29sb3JGaWVsZDtcclxuXHJcbmNsYXNzIFVJRGF0YVRhYmxlRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXHJcblx0cHVibGljIGNvbHVtbk51bWJlcjpudW1iZXI7XHJcblx0cHVibGljIGNvbHVtbk5hbWU6c3RyaW5nO1xyXG5cdHB1YmxpYyBvbGRWYWx1ZTphbnk7XHJcblx0cHVibGljIG5ld1ZhbHVlOmFueTtcclxuXHRwdWJsaWMgZWRpdG9yOmFueTtcclxuXHRwdWJsaWMgcm93T2JqZWN0OmFueTtcclxuXHRwdWJsaWMgaXNSZWZlcmVuY2U6Ym9vbGVhbiAgICAgICA9IGZhbHNlO1xyXG5cdHB1YmxpYyByZWZlcmVuY2VDbGFzc1R5cGU6c3RyaW5nID0gXCJcIjtcclxuXHRwdWJsaWMgcmVmZXJlbmNlRmllbGQ6YW55O1xyXG5cdHB1YmxpYyByZWZlcmVuY2VPYmplY3Q6YW55O1xyXG5cdHB1YmxpYyBkaXNwbGF5RmllbGROYW1lO1xyXG5cdHB1YmxpYyB2aWV3OmFueTtcclxuXHRwdWJsaWMgb3B0aW9uTGlzdDpBcnJheTxhbnk+O1xyXG5cdHB1YmxpYyBtYXBwZWQ6Ym9vbGVhbiAgICAgICAgICAgID0gZmFsc2U7XHJcblx0cHVibGljIHRlbXBsYXRlOmFueTtcclxuXHRwdWJsaWMgcmVmZXJlbmNlQ2xhc3NGaWVsZDphbnlcclxuXHQvL2VuZHJlZ2lvblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSURhdGFUYWJsZUZpZWxkX1wiKTtcclxuXHRcdHRoaXMuY29tcG9uZW50SUQgPSBcImRhdGFUYWJsZUZpZWxkX1wiICsgd2ViaXgudWlkKCk7XHJcblx0fVxyXG59IHRoaXMuVUlEYXRhVGFibGVGaWVsZCA9IFVJRGF0YVRhYmxlRmllbGQ7XHJcblxyXG5jbGFzcyBVSURhdGFUYWJsZSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHRnZXQgdGVtcGxhdGUoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG5cdH1cclxuXHJcblx0c2V0IHRlbXBsYXRlKHZhbHVlOmFueSkge1xyXG5cdFx0dGhpcy5fdGVtcGxhdGUgPSB2YWx1ZTtcclxuXHR9XHJcblx0Z2V0IHNob3dUb29sQmFyKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hvd1Rvb2xCYXI7XHJcblx0fVxyXG5cdHNldCBzaG93VG9vbEJhcih2YWx1ZTpib29sZWFuKSB7XHJcblx0XHR0aGlzLl9zaG93VG9vbEJhciA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBNYXBwZWRDb2x1bW5Mb29rdXAob2JqKSB7XHJcblx0fVxyXG5cdHB1YmxpYyB2aWV3VHlwZSA9IFwiZGF0YXRhYmxlXCI7XHJcblxyXG5cdHByb3RlY3RlZCB0aGVMaXN0ICAgICAgICAgICAgICAgOiBBcnJheTxhbnk+ICA9IG51bGw7XHJcblx0cHJvdGVjdGVkIGNvbHVtbnMgICAgICAgICAgICAgICA6IEFycmF5PFVJRGF0YVRhYmxlRmllbGQ+O1xyXG5cdHByb3RlY3RlZCByb3dTZWxlY3RDYWxsYmFjayAgICAgOiBhbnk7XHJcblx0cHJvdGVjdGVkIGVkaXRhYmxlICAgICAgICAgICAgICA6IGJvb2xlYW4gICAgPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgZWRpdGFjdGlvbiAgICAgICAgICAgIDogc3RyaW5nICAgPSBcImRibGNsaWNrXCI7XHJcblx0cHJvdGVjdGVkIHRvb2xCYXIgICAgICAgICAgICAgICA6IFVJVG9vbGJhcjtcclxuXHRwcm90ZWN0ZWQgZGF0YVRhYmxlSUQgICAgICAgICAgIDogc3RyaW5nO1xyXG5cdHByaXZhdGUgX3Nob3dUb29sQmFyICAgICAgICAgICAgOiBib29sZWFuICA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX211bHRpU2VsZWN0ICAgICAgICAgICAgOiBib29sZWFuICA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2F1dG9Db2x1bW5Db25maWd1cmUgID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSB0cnVlO1xyXG5cdHByaXZhdGUgX3dpZHRoICAgICAgICAgICAgICAgID0gMDtcclxuXHRwcml2YXRlIF9oZWlnaHQgICAgICAgICAgICAgICA9IDA7XHJcblx0cHJpdmF0ZSBfdGVtcGxhdGUgOiBhbnkgPSBudWxsO1xyXG5cclxuXHRnZXQgbXVsdGlTZWxlY3QoKTpib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9tdWx0aVNlbGVjdDtcclxuXHR9XHJcblx0c2V0IG11bHRpU2VsZWN0KHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX211bHRpU2VsZWN0ID0gdmFsdWU7XHJcblx0fVxyXG5cdGdldCBhdXRvQ29sdW1uQ29uZmlndXJlKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0NvbHVtbkNvbmZpZ3VyZTtcclxuXHR9XHJcblx0c2V0IGF1dG9Db2x1bW5Db25maWd1cmUodmFsdWU6Ym9vbGVhbikge1xyXG5cdFx0dGhpcy5fYXV0b0NvbHVtbkNvbmZpZ3VyZSA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgc2hvd0FkZERlbGV0ZUNvbHVtbnMoKTpib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9zaG93QWRkRGVsZXRlQ29sdW1ucztcclxuXHR9XHJcblx0c2V0IHNob3dBZGREZWxldGVDb2x1bW5zKHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX3Nob3dBZGREZWxldGVDb2x1bW5zID0gdmFsdWU7XHJcblx0fVxyXG5cdGdldCBoZWlnaHQoKTpudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcclxuXHR9XHJcblx0c2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpIHtcclxuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgd2lkdGgoKTpudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdH1cclxuXHRzZXQgd2lkdGgodmFsdWU6bnVtYmVyKSB7XHJcblx0XHR0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlEYXRhVGFibGVfXCIpO1xyXG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xyXG5cdFx0dGhpcy5kYXRhVGFibGVJRCAgICAgICAgICA9IFwiZGF0YVRhYmxlX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHR0aGlzLnNob3dBZGREZWxldGVDb2x1bW5zID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIGhpZGVDb2x1bW4oIGNvbHVtbklEIDogYW55KSB7XHJcblxyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5oaWRlQ29sdW1uKGNvbHVtbklEKTtcclxuXHR9XHJcblx0cHVibGljIHNob3dDb2x1bW4oIGNvbHVtbklEIDogYW55KSB7XHJcblxyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5zaG93Q29sdW1uKGNvbHVtbklEKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0cHVibGljIG5ld0l0ZW0oKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcclxuXHRcdHZhciBvYmplY3RQcm94eSAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlQ29tcG9uZW50LnVpQ2xhc3NUeXBlKTtcclxuXHRcdHZhciBuYW1lICAgICAgICAgPSBcIkEgTmV3IFwiICsgb2JqZWN0UHJveHkuY2xhc3NMYWJlbCgpO1xyXG5cdFx0dmFyIG5ld0lEICAgICAgICA9IG9iamVjdFByb3h5LmFkZE5ldyhuYW1lKTtcclxuXHRcdHZhciBuZXdPYmplY3QgICAgPSBvYmplY3RQcm94eS5nZXRPbmUobmV3SUQpO1xyXG5cdFx0dmFyIG5ld1Jvd0lEICAgICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuYWRkKG5ld09iamVjdCk7XHJcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNob3dJdGVtKG5ld1Jvd0lEKTtcclxuXHRcdCQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuc2VsZWN0KG5ld1Jvd0lELCBmYWxzZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWxldGVJdGVtKHRoZVRvb2xiYXI6VUlUb29sYmFyLCBsYWJlbDpzdHJpbmcpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSB0aGlzO1xyXG5cdFx0dmFyIHJvd2lkICAgICAgICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJZCgpO1xyXG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xyXG5cdFx0dmFyIHRoZU9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XHJcblx0XHR0aGVDb21wb25lbnQuaGFuZGxlRGVsZXRlKHRoZU9iamVjdCk7XHJcblx0fVxyXG5cdHB1YmxpYyBvcHRpb25zKCkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IHRoaXM7XHJcblx0XHR2YXIgcm93aWQgICAgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKCk7XHJcblx0XHRpZiAoIXJvd2lkKSByZXR1cm47XHJcblx0XHR2YXIgdGhlT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKHJvd2lkKTtcclxuXHRcdHRoZUNvbXBvbmVudC5oYW5kbGVEZWxldGUodGhlT2JqZWN0KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRTZWxlY3RlZE9iamVjdCgpIDogYW55IHtcclxuXHRcdHJldHVybiB0aGlzLmdldFNlbGVjdGVkKClbMF07XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRTZWxlY3RlZCgpOkFycmF5PGFueT4ge1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XHJcblx0XHRcdHZhciBpZEFycmF5ID0gJCQodGhpcy5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJdGVtKHRydWUpO1xyXG5cdFx0XHRyZXR1cm4gaWRBcnJheTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRwdWJsaWMgb25TZWxlY3RDaGFuZ2UoaXRlbU1lc3NhZ2U6SXRlbVNlbGVjdGVkRXZlbnQpIHtcclxuXHRcdHRoaXMucHVibGlzaChcIm9uU2VsZWN0Q2hhbmdlXCIsIGl0ZW1NZXNzYWdlKTtcclxuXHR9XHJcblx0cHVibGljIGFkZENvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCB0aGVDb2x1bW46YW55KSB7XHJcblx0XHR2YXIgbmV3Q29sdW1uID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgID0gdGhlQ29sdW1uO1xyXG5cdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciAgICAgPSBjb2x1bW5OdW1iZXI7XHJcblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSA9IG5ld0NvbHVtbjtcclxuXHR9XHJcblx0cHVibGljIGFkZE1hcHBlZENvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCByZWZlcmVuY2VDbGFzc0ZpZWxkOnN0cmluZywgcmVmZXJlbmNlRmllbGROYW1lLCBkaXNwbGF5RmllbGROYW1lLCB0aGVDb2x1bW5WaWV3OmFueSkge1xyXG5cdFx0dmFyIG5ld0NvbHVtbiAgICAgICAgICAgICAgICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xyXG5cdFx0bmV3Q29sdW1uLm1hcHBlZCAgICAgICAgICAgICAgPSB0cnVlO1xyXG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUNsYXNzRmllbGQgPSByZWZlcmVuY2VDbGFzc0ZpZWxkXHJcblx0XHRuZXdDb2x1bW4ucmVmZXJlbmNlRmllbGQgICAgICA9IHJlZmVyZW5jZUZpZWxkTmFtZTtcclxuXHRcdG5ld0NvbHVtbi5kaXNwbGF5RmllbGROYW1lICAgID0gZGlzcGxheUZpZWxkTmFtZTtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICA9IHRoZUNvbHVtblZpZXc7XHJcblx0XHR2YXIgZnVuY3Rpb25NYW1lICAgICAgICAgICAgPSBcIm1hcEZ1bmN0aW9uXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdHZhciBtYXBwZWRGdW5jdGlvbiAgICAgICAgICA9IG5ldyBGdW5jdGlvbignb2JqJywgJ3snICsgJ3ZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShvYmpbXCInICsgcmVmZXJlbmNlQ2xhc3NGaWVsZCArICdcIl1cIik7JyArICd2YXIgdGhpc09iamVjdCA9IG9iamVjdFByb3h5LmdldE9uZShvYmpbXCInICsgcmVmZXJlbmNlRmllbGROYW1lICsgJ1wiXSk7JyArICdpZiAoIXRoaXNPYmplY3QpIHJldHVybiBcIk5vdCBGb3VuZFwiOycgKyAncmV0dXJuIHRoaXNPYmplY3RbXCInICsgZGlzcGxheUZpZWxkTmFtZSArICdcIl07JyArICd9Jyk7XHJcblx0XHRuZXdDb2x1bW4udGVtcGxhdGUgICAgICAgICAgPSBtYXBwZWRGdW5jdGlvbjtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICA9IHRoZUNvbHVtblZpZXc7XHJcblx0XHRuZXdDb2x1bW4udmlld1tcIl90ZW1wbGF0ZVwiXSA9IG5ld0NvbHVtbi50ZW1wbGF0ZTtcclxuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdICA9IG5ld0NvbHVtbjtcclxuXHR9XHJcbiAgICBwdWJsaWMgYWRkUmVmZXJlbmNlQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIHJlZmVyZW5jZUNsYXNzVHlwZTpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcclxuXHRcdHZhciBuZXdDb2x1bW4gICAgICAgICAgICAgICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xyXG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUNsYXNzVHlwZSA9IHJlZmVyZW5jZUNsYXNzVHlwZTtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xyXG5cdFx0dmFyIG9iamVjdFByb3h5ICAgICAgICA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShyZWZlcmVuY2VDbGFzc1R5cGUpO1xyXG5cdFx0dmFyIG9wdGlvbkxpc3QgICAgICAgICA9IG9iamVjdFByb3h5LmdldExpc3QoZmFsc2UpO1xyXG5cdFx0bmV3Q29sdW1uLm9wdGlvbkxpc3QgICA9IG9wdGlvbkxpc3Q7XHJcblx0XHRuZXdDb2x1bW4uY29sdW1uTnVtYmVyID0gY29sdW1uTnVtYmVyO1xyXG5cdFx0dmFyIG9wdGlvbkFycmF5ICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIG9wdGlvbkxpc3QpIHtcclxuXHRcdFx0dmFyIG9wdGlvbiAgICAgICAgICAgICAgICAgPSBuZXcgQzRPYmplY3QoKTtcclxuXHRcdFx0b3B0aW9uW1wiaWRcIl0gICAgICAgICAgICAgICA9IG9wdGlvbkxpc3RbaXRlbV1bXCJpZFwiXTtcclxuXHRcdFx0b3B0aW9uW3JlZmVyZW5jZUZpZWxkTmFtZV0gPSBvcHRpb25MaXN0W2l0ZW1dW3JlZmVyZW5jZUZpZWxkTmFtZV07XHJcblx0XHRcdG9wdGlvbkFycmF5LnB1c2gob3B0aW9uKTtcclxuXHRcdH1cclxuXHRcdG5ld0NvbHVtbi52aWV3W1wib3B0aW9uc1wiXSA9IG9wdGlvbkxpc3Q7XHJcblx0XHQvL25ld0NvbHVtbi52aWV3W1wib25cIl0gPSB7IG9uQ2hhbmdlIDogZnVuY3Rpb24oKSB7IFVJLk1lc3NhZ2UoXCJTZWxlY3QgQ2hhbmdlZFwiKTt9fVxyXG5cdFx0dGhpcy5jb2x1bW5zW2NvbHVtbk51bWJlcl0gPSBuZXdDb2x1bW47XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRPcHRpb25Db2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgb3B0aW9uTGlzdCwgdGhlQ29sdW1uKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRMaXN0KHRoZUxpc3QpIHtcclxuXHRcdHRoaXMudGhlTGlzdCA9IHRoZUxpc3Q7XHJcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuY2xlYXJBbGwoKTtcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkucGFyc2UodGhpcy50aGVMaXN0KTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFZhbHVlKHRoZUxpc3Q6YW55KSB7XHJcblx0XHR0aGlzLnNldExpc3QodGhlTGlzdCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRFZGl0YWJsZSh0aGVGbGFnOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuZWRpdGFibGUgPSB0aGVGbGFnO1xyXG5cdH1cclxuXHRwdWJsaWMgb25TdG9wRWRpdCh0aGVGaWVsZDpVSURhdGFUYWJsZUZpZWxkKSB7XHJcblx0XHRpZiAodGhpcy5wdWJsaXNoKFwib25TdG9wRWRpdFwiLCB0aGVGaWVsZCkpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGlmICh0aGVGaWVsZC5uZXdWYWx1ZSA9PSB0aGVGaWVsZC5vbGRWYWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcclxuXHRcdFx0dmFyIG9iamVjdFByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoaXMudWlDbGFzc1R5cGUpO1xyXG5cdFx0XHRvYmplY3RQcm94eS51cGRhdGVBdHRyaWJ1dGUodGhlRmllbGQucm93T2JqZWN0Ll9pZCwgdGhlRmllbGQuY29sdW1uTmFtZSwgdGhlRmllbGQubmV3VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHJlZnJlc2hSb3cocm93SUQgOiBhbnkpIHtcclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSlcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkucmVmcmVzaChyb3dJRCk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkJlZm9yZUVkaXRTdGFydCh0aGVGaWVsZCA6IFVJRGF0YVRhYmxlRmllbGQpIHtcclxuXHRcdGlmICh0aGlzLnB1Ymxpc2goXCJvbkJlZm9yZUVkaXRTdGFydFwiLCB0aGVGaWVsZCkpXHJcblx0XHRcdHJldHVybjtcclxuXHR9XHJcblx0cHVibGljIGhhbmRsZURlbGV0ZSh0aGVPYmplY3Q6YW55KSB7XHJcblx0XHRVSS5NZXNzYWdlKFwiSGFuZGxlIERlbGV0ZVwiICsgdGhlT2JqZWN0Ll9pZClcclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZU5hdmlnYXRpb25CYXIoKSB7XHJcblx0XHR0aGlzLnRvb2xCYXIgPSBuZXcgVUlUb29sYmFyKCk7XHJcblx0XHR0aGlzLnRvb2xCYXIuYWRkSXRlbShcIk5ld1wiLCBcIm5ld0l0ZW1cIilcclxuXHRcdHRoaXMudG9vbEJhci5hZGRJdGVtKFwiRGVsZXRlXCIsIFwiZGVsZXRlSXRlbVwiKVxyXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJPcHRpb25zXCIsIFwib3B0aW9uc1wiKVxyXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJFeHBvcnRcIiwgXCJleHBvcnRcIik7XHJcblx0XHR0aGlzLnRvb2xCYXIuc2V0RGF0YSh0aGlzKTtcclxuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XHJcblx0XHRcdHRoaXMudG9vbEJhci5zZXRUb29sQmFyKEZhY3RvcnkuR2V0Q2xhc3NMYWJlbCh0aGlzLnVpQ2xhc3NUeXBlKSwgRmFjdG9yeS5HZXRDbGFzc0ljb24odGhpcy51aUNsYXNzVHlwZSkpXHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIG9iamVjdCwgcHVibGlzaGVyKSB7XHJcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XHJcblx0XHRcdGNhc2UgXCJuZXdJdGVtXCIgOlxyXG5cdFx0XHRjYXNlIFwiZGVsZXRlSXRlbVwiIDpcclxuXHRcdFx0Y2FzZSBcIm9wdGlvbnNcIiA6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJleHBvcnRcIjpcclxuXHRcdFx0XHR0aGlzLmV4cG9ydFRvRXhjZWwoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGV4cG9ydFRvRXhjZWwoKSB7XHJcblx0XHRVSS5FeHBvcnRUb0V4Y2VsKHRoaXMuZGF0YVRhYmxlSUQpO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TGlzdCgpOkFycmF5PGFueT4ge1xyXG5cdFx0aWYgKHRoaXMudGhlTGlzdClcclxuXHRcdFx0cmV0dXJuIHRoaXMudGhlTGlzdDtcclxuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XHJcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcclxuXHRcdFx0dmFyIHJldHVybkxpc3QgID0gb2JqZWN0UHJveHkuZ2V0TGlzdCh0cnVlKTtcclxuXHRcdFx0cmV0dXJuIHJldHVybkxpc3Q7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3IEFycmF5PGFueT4oKTtcclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZUNvbHVtblZpZXcoKTphbnkge1xyXG5cdFx0dmFyIGNvbHVtblZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIGkgICAgICAgICAgPSAwO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbHVtbnMpIHtcclxuXHRcdFx0Y29sdW1uVmlld1t0aGlzLmNvbHVtbnNbaXRlbV0uY29sdW1uTnVtYmVyXSA9IHRoaXMuY29sdW1uc1tpdGVtXS52aWV3O1xyXG5cdFx0XHRpKys7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucykge1xyXG5cdFx0XHRjb2x1bW5WaWV3W2krK10gPSB7XHJcblx0XHRcdFx0aWQ6IFwiXCIsIHRlbXBsYXRlOiB7XHJcblx0XHRcdFx0XHR2aWV3ICAgICAgOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRcdFx0dHlwZSAgICAgIDogXCJodG1sYnV0dG9uXCIsXHJcblx0XHRcdFx0XHRsYWJlbCAgICAgOiAnPHNwYW4gY2xhc3M9XCJ3ZWJpeF9pY29uIGZhLWFuZ2xlLWxlZnRcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+YmFjazwvc3Bhbj4nLFxyXG5cdFx0XHRcdFx0aW5wdXRXaWR0aDogODBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Y29sdW1uVmlld1tpKytdID0ge2lkOiBcImRyYWdcIiwgaGVhZGVyOiBcIlwiLCB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSd3ZWJpeF9kcmFnX2hhbmRsZSc+PC9kaXY+XCIsIHdpZHRoOiAzNX1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjb2x1bW5WaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29sdW1ucyhjb2x1bW5zIDogQXJyYXk8YW55Pikge1xyXG5cdFx0dmFyIGluZGV4ID0gMDtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gY29sdW1ucykge1xyXG5cdFx0XHR2YXIgbmV3Q29sdW1uID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgPSBjb2x1bW5zW2l0ZW1dO1xyXG5cdFx0XHRuZXdDb2x1bW4uY29sdW1uTnVtYmVyICAgICA9IGluZGV4Kys7XHJcblx0XHRcdHRoaXMuY29sdW1uc1tpbmRleF0gPSBuZXdDb2x1bW47XHJcblx0XHR9XHJcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpIHtcclxuXHRcdFx0dGhpcy5yZXBsYWNlQ29sdW1ucyhjb2x1bW5zKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHJlcGxhY2VDb2x1bW5zKGNvbHVtbnMgOiBBcnJheTxhbnk+KSB7XHJcblx0XHR0aGlzLmNvbHVtbnMgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcclxuXHRcdHZhciBpbmRleD0wO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBjb2x1bW5zKSB7XHJcblx0XHRcdHRoaXMuYWRkQ29sdW1uKGluZGV4KyssY29sdW1uc1tpdGVtXSk7XHJcblx0XHR9XHJcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5jb25maWcuY29sdW1ucyA9IHRoaXMuY3JlYXRlQ29sdW1uVmlldygpOztcclxuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnJlZnJlc2hDb2x1bW5zKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzb3J0KHByb3BlcnR5IDogc3RyaW5nLCBzb3J0RGlyZWN0aW9uOnN0cmluZywgdHlwZTpzdHJpbmc9XCJzdHJpbmdcIikge1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKVxyXG5cdFx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnNvcnQocHJvcGVydHksc29ydERpcmVjdGlvbix0eXBlKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZmlsdGVyKCBmdW5jIDogYW55KSB7XHJcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5maWx0ZXIoZnVuYyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNyZWF0ZU5hdmlnYXRpb25CYXIoKTtcclxuXHRcdHZhciByb3dzID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBpICAgID0gMDtcclxuXHRcdGlmICh0aGlzLl9zaG93VG9vbEJhcikge1xyXG5cdFx0XHR2YXIgbmF2QmFyVmlldyA9IHRoaXMudG9vbEJhci5nZXRWaWV3KCk7XHJcblx0XHRcdHJvd3NbMF0gICAgICAgID0gbmF2QmFyVmlldztcclxuXHRcdFx0aSsrXHJcblx0XHR9XHJcblx0XHR2YXIgdmlldyA9ICB7XHJcblx0XHRcdGlkICAgICAgICAgIDogdGhpcy5kYXRhVGFibGVJRCxcclxuXHRcdFx0dmlldyAgICAgICAgOiB0aGlzLnZpZXdUeXBlLFxyXG5cdFx0XHRzZWxlY3QgICAgICA6IFwicm93XCIsXHJcblx0XHRcdG5hdmlnYXRpb24gIDogdHJ1ZSxcclxuXHRcdFx0cmVzaXplQ29sdW1uOiB0cnVlLFxyXG5cdFx0XHRzY3JvbGx4eSAgICA6IHRydWUsXHJcblx0XHRcdGRyYWdDb2x1bW4gIDogdHJ1ZSxcclxuXHRcdFx0ZWRpdGFibGUgICAgOiB0aGlzLmVkaXRhYmxlLFxyXG5cdFx0XHRlZGl0YWN0aW9uICA6IHRoaXMuZWRpdGFjdGlvbixcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaGVpZ2h0ID4gMCkge1xyXG5cdFx0XHR2aWV3W1wiaGVpZ2h0XCJdID0gdGhpcy5oZWlnaHQ7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53aWR0aCA+IDApIHtcclxuXHRcdFx0dmlld1tcIndpZHRoXCJdID0gdGhpcy53aWR0aDtcclxuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5hdXRvQ29sdW1uQ29uZmlndXJlKSB7XHJcblx0XHRcdHZpZXdbXCJhdXRvQ29uZmlnXCJdID0gdHJ1ZTtcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHR2aWV3W1wiY29sdW1uc1wiXSA9IHRoaXMuY3JlYXRlQ29sdW1uVmlldygpO1xyXG5cdFx0aWYgKHRoaXMubXVsdGlTZWxlY3QpXHJcblx0XHRcdHZpZXdbXCJtdWx0aXNlbGVjdFwiXSA9IHRydWU7XHJcblx0XHRpZiAodGhpcy50ZW1wbGF0ZSkge1xyXG5cdFx0XHR2aWV3W1wiX3RlbXBsYXRlXCJdID0gdGhpcy50ZW1wbGF0ZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB0eXBlOiBcInNwYWNlXCIsIHJvd3M6IFsgdmlldyBdXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmRhdGFUYWJsZUlELCBcIm9uU2VsZWN0Q2hhbmdlXCIsIFVJRXZlbnRIYW5kbGVyLm9uU2VsZWN0Q2hhbmdlKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkFmdGVyRWRpdFN0b3BcIiwgVUlFdmVudEhhbmRsZXIub25BZnRlckVkaXRTdG9wKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkl0ZW1EYmxDbGlja1wiLCBVSUV2ZW50SGFuZGxlci5Pbkl0ZW1EYmxDbGljayk7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25CZWZvcmVFZGl0U3RhcnRcIiwgVUlFdmVudEhhbmRsZXIub25CZWZvcmVFZGl0U3RhcnRUYWJsZSk7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtQ2xpY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dmFyIHJlc3VsdExpc3QgPSB0aGlzLmdldExpc3QoKTtcclxuXHRcdGlmIChyZXN1bHRMaXN0KVxyXG5cdFx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpICQkKHRoaXMuZGF0YVRhYmxlSUQpLnBhcnNlKHJlc3VsdExpc3QpO1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKVxyXG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XHJcblx0XHRpZiAodGhpcy5fc2hvd1Rvb2xCYXIpXHR0aGlzLnRvb2xCYXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRUYWJsZUxpc3QoKSA6IEFycmF5PGFueT4ge1xyXG5cdFx0dmFyIGRhdGF0YWJsZSA9ICQkKHRoaXMuZGF0YVRhYmxlSUQpXHJcblx0XHR2YXIgZGF0YUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuZWFjaFJvdyhcclxuXHRcdFx0ZnVuY3Rpb24gKHJvdyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSBkYXRhdGFibGUuZ2V0SXRlbShyb3cpO1xyXG5cdFx0XHRcdGRhdGFMaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdClcclxuXHRcdHJldHVybiBkYXRhTGlzdDtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlEYXRhVGFibGUgPSBVSURhdGFUYWJsZTtcclxuXHJcbmNsYXNzIFVJVHJlZVRhYmxlIGV4dGVuZHMgVUlEYXRhVGFibGUge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlUcmVlVGFibGVfXCIpO1xyXG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xyXG5cdFx0dGhpcy5kYXRhVGFibGVJRCAgICAgICAgICA9IFwidHJlZVRhYmxlX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHR0aGlzLnNob3dBZGREZWxldGVDb2x1bW5zID0gZmFsc2U7XHJcblx0XHR0aGlzLnZpZXdUeXBlID0gXCJ0cmVldGFibGVcIjtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlUcmVlVGFibGUgPSBVSVRyZWVUYWJsZTtcclxuXHJcbmNsYXNzIFVJQ2FsZW5kYXJGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlDYWxlbmRhckZpZWxkX1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHVwZGF0ZUZpZWxkO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB7XHJcblx0XHRcdGlkICAgICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgICAgICAgICAgOiBcImRhdGVwaWNrZXJcIixcclxuXHRcdFx0bmFtZSAgICAgICAgICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLCAvL2RhdGU6ICBuZXcgRGF0ZSgyMDEyLCA2LCA4KSxcclxuXHRcdFx0dmFsdWUgICAgICAgICAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0bGFiZWxXaWR0aCAgICAgICAgOiAxMDAsXHJcblx0XHRcdGV2ZW50cyAgICAgICAgICAgIDogd2ViaXguRGF0ZS5pc0hvbGlkYXksXHJcblx0XHRcdGNhbGVuZGFyRGF0ZUZvcm1hdDogXCIlWS0lbS0lZFwiXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUNhbGVuZGFyRmllbGQgPSBVSUNhbGVuZGFyRmllbGQ7XHJcblxyXG5jbGFzcyBVSUNvbXBsZXhDb21wb25lbnQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHByb3RlY3RlZCBjb21wb25lbnRBcnJheTpBcnJheTxVSUNvbXBvbmVudD47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUNvbXBsZXhDb21wb25lbnRfXCIpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRBcnJheSA9IG5ldyBBcnJheTxVSUNvbXBvbmVudD4oKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRDb21wb25lbnQobGFiZWw6c3RyaW5nLCBjb21wb25lbnQ6VUlDb21wb25lbnQpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50QXJyYXlbbGFiZWxdID0gY29tcG9uZW50O1xyXG5cdFx0aWYgKGNvbXBvbmVudCkgY29tcG9uZW50LnNldFByb3BlcnR5KFwibmFtZVwiLCBsYWJlbCk7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDb21wb25lbnRzVmlldygpOmFueSB7XHJcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBpICAgICAgICAgPSAwO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XHJcblx0XHRcdGlmIChpdGVtICE9IFwidG9vbGJhclwiKVxyXG5cdFx0XHRcdHZpZXdBcnJheVtpKytdID0gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5nZXRWaWV3KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdmlld0FycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgbnVtT2ZDb21wb25lbnRzKCk6bnVtYmVyIHtcclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudEFycmF5KS5sZW5ndGhcclxuXHR9XHJcblx0cHVibGljIGdldENvbXBvbmVudChsYWJlbDpzdHJpbmcpOlVJQ29tcG9uZW50IHtcclxuXHRcdHZhciBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEFycmF5W2xhYmVsXTtcclxuXHRcdHJldHVybiBjb21wb25lbnRcclxuXHR9XHJcblx0cHVibGljIGdldEZpZWxkQ29tcG9uZW50KGxhYmVsOnN0cmluZyk6VUlGaWVsZCB7XHJcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRBcnJheVtsYWJlbF07XHJcblx0XHRyZXR1cm4gY29tcG9uZW50XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1x0fVxyXG5cdFxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcclxuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uc2V0RGF0YSh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSAkJCh0aGlzLmNvbXBvbmVudElEKS5kZXN0cnVjdG9yKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZXN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZGVzdHJ1Y3RvcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUNvbXBsZXhDb21wb25lbnQgPSBVSUNvbXBsZXhDb21wb25lbnQ7XHJcblxyXG5jbGFzcyBQb3J0YWxTZWN0aW9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHQvL3JlZ2lvbiBJbnN0YW5jZSBWYXJpYWJsZXNcclxuXHRwdWJsaWMgcG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBudWxsO1xyXG5cdHB1YmxpYyBjbGFzc1R5cGU6Q2xhc3NUeXBlO1xyXG5cdHB1YmxpYyB0aGVBcnJheTpBcnJheTxhbnk+O1xyXG5cdHB1YmxpYyBncmF2aXR5Om51bWJlciAgICAgICAgICAgICA9IDE7XHJcblx0cHVibGljIHBvcnRsZXROYW1lICAgICAgICAgICAgICAgID0gXCJcIjtcclxuXHRwdWJsaWMgc2VjdGlvbkhlYWRlcjpQb3J0YWxIZWFkZXIgPSBudWxsO1xyXG5cdHByaXZhdGUgdGVtcGxhdGUgICAgICAgICAgICAgICAgICA9IHt0eXBlOiBcImxpbmVcIn07XHJcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyWCAgICAgICAgICAgICAgID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyWSAgICAgICAgICAgICAgID0gZmFsc2U7XHJcblx0Ly9lbmRyZWdpb25cclxuXHQvL3JlZ2lvbiBDbGFzcyBWYXJpYWJsZXNcclxuXHRwdWJsaWMgc3RhdGljIENPTFVNTlMgPSBcImNvbHNcIjtcclxuXHRwdWJsaWMgc3RhdGljIFJPV1MgICAgPSBcInJvd3NcIjtcclxuXHRwdWJsaWMgc3RhdGljIFJFU0laRVIgPSBcInJlc2l6ZXJcIjtcclxuXHRwdWJsaWMgc3RhdGljIFJPT1QgICAgPSBcInJvb3Q7XCJcclxuXHRwdWJsaWMgc3RhdGljIEhFQURFUiAgPSBcImhlYWRlclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgUE9SVExFVCA9IFwicG9ydGxldFwiO1xyXG5cdC8vZW5kcmVnaW9uXHJcblx0Ly9yZWdpb24gQ2xhc3MgTWV0aG9kc1xyXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlQ29sdW1ucygpIHtcclxuXHRcdHJldHVybiBuZXcgUG9ydGFsQ29sdW1uKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZVJvd3MoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFBvcnRhbFJvdygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVSb290KCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxSb290KCk7XHJcblx0fVxyXG5cclxuXHQvL2VuZHJlZ2lvblxyXG5cdGdldCBzY3JvbGxCYXJYKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsQmFyWDtcclxuXHR9XHJcblx0c2V0IHNjcm9sbEJhclgodmFsdWU6Ym9vbGVhbikge1xyXG5cdFx0dGhpcy5fc2Nyb2xsQmFyWCA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgc2Nyb2xsQmFyWSgpOmJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbEJhclk7XHJcblx0fVxyXG5cdHNldCBzY3JvbGxCYXJZKHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX3Njcm9sbEJhclkgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKG5hbWUgPSBcIm5vU2VjdGlvbk5hbWVcIikge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxTZWN0aW9uX1wiKTtcclxuXHRcdHRoaXMudGhlQXJyYXkgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dGhpcy5wb3J0bGV0TmFtZSA9IG5hbWU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkUG9ydGxldChuYW1lLCBncmF2aXR5ID0gMSk6UG9ydGxldCB7XHJcblx0XHR2YXIgcG9ydGxldCA9IG5ldyBQb3J0bGV0KG5hbWUsIGdyYXZpdHkpO1xyXG5cdFx0dGhpcy50aGVBcnJheS5wdXNoKHBvcnRsZXQpO1xyXG5cdFx0cmV0dXJuIHBvcnRsZXQ7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRTZWN0aW9uKHRoZVNlY3Rpb246UG9ydGFsU2VjdGlvbiwgZ3Jhdml0eSA9IDEpIHtcclxuXHRcdHRoaXMudGhlQXJyYXkucHVzaCh0aGVTZWN0aW9uKTtcclxuXHRcdHRoaXMuZ3Jhdml0eSA9IGdyYXZpdHlcclxuXHR9XHJcblx0cHVibGljIGFkZFJlc2l6ZXIoKTpQb3J0YWxTZWN0aW9uIHtcclxuXHRcdHZhciByZXNpemVyID0gbmV3IFBvcnRhbFJlc2l6ZXIoKTtcclxuXHRcdHRoaXMudGhlQXJyYXkucHVzaChyZXNpemVyKTtcclxuXHRcdHJldHVybiByZXNpemVyO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkSGVhZGVyKHRpdGxlOnN0cmluZyk6UG9ydGFsSGVhZGVyIHtcclxuXHRcdHZhciBoZWFkZXIgPSBuZXcgUG9ydGFsSGVhZGVyKHRpdGxlKTtcclxuXHRcdHRoaXMudGhlQXJyYXkudW5zaGlmdChoZWFkZXIpO1xyXG5cdFx0dGhpcy5zZWN0aW9uSGVhZGVyID0gaGVhZGVyO1xyXG5cdFx0cmV0dXJuIGhlYWRlcjtcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZUhlYWRlcigpIHtcclxuXHRcdGlmICghdGhpcy5zZWN0aW9uSGVhZGVyKSByZXR1cm47XHJcblx0XHR0aGlzLnRoZUFycmF5LnNoaWZ0KCk7XHJcblx0fVxyXG5cclxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudCBNZXRob2RzXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy50ZW1wbGF0ZVtcImdyYXZpdHlcIl0gPSB0aGlzLmdyYXZpdHk7XHJcblx0XHR0aGlzLnRlbXBsYXRlW1wiaWRcIl0gICAgICA9IHRoaXMuY29tcG9uZW50SUQ7XHJcblx0XHR0aGlzLnRlbXBsYXRlW1wiZHJhZ1wiXSAgICA9IHRydWU7XHJcblx0XHRpZiAodGhpcy5zY3JvbGxCYXJYICYmIHRoaXMuc2Nyb2xsQmFyWSkge1xyXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseHlcIl0gPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnNjcm9sbEJhclgpXHJcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx4XCJdID0gdHJ1ZTsgZWxzZSBpZiAodGhpcy5zY3JvbGxCYXJZKVxyXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseVwiXSA9IHRydWU7XHJcblx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMudGhlQXJyYXkpIHtcclxuXHRcdFx0dGhpcy50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL2VuZHJlZ2lvblxyXG59IHRoaXMuUG9ydGFsU2VjdGlvbiA9IFBvcnRhbFNlY3Rpb247XHJcblxyXG5jbGFzcyBQb3J0YWxDb2x1bW4gZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG5hbWUpO1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLkNPTFVNTlM7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICA9IFBvcnRhbFNlY3Rpb24uQ09MVU1OUztcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxDb2x1bW5fXCIpO1xyXG5cdH1cclxufSB0aGlzLlBvcnRhbENvbHVtbiA9IFBvcnRhbENvbHVtblxyXG5cclxuY2xhc3MgUG9ydGFsUm9vdCBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xyXG5cdFx0c3VwZXIobmFtZSk7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9PVDtcclxuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgID0gXCJyb290XCI7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsUm9vdF9cIik7XHJcblx0fVxyXG59IHRoaXMuUG9ydGFsUm9vdCA9IFBvcnRhbFJvb3RcclxuXHJcbmNsYXNzIFBvcnRhbFJvdyBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xyXG5cdFx0c3VwZXIobmFtZSk7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9XUztcclxuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgID0gXCJyb3dcIjtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSb3dfXCIpO1xyXG5cdH1cclxufXRoaXMuUG9ydGFsUm93ID0gUG9ydGFsUm93O1xyXG5cclxuY2xhc3MgUG9ydGFsSGVhZGVyIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblx0cHVibGljIGhlYWRlclRlbXBsYXRlICAgID0ge3ZpZXc6IFwidGVtcGxhdGVcIiwgdGVtcGxhdGU6IFwiSGVhZGVyXCIsIHR5cGU6IFwiaGVhZGVyXCJ9O1xyXG5cdHB1YmxpYyBoZWFkZXJWaWV3OmFueTtcclxuXHRwdWJsaWMgaGVhZGVyVGV4dDpzdHJpbmcgPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsSGVhZGVyX1wiKTtcclxuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcclxuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcclxuXHRcdHRoaXMuaGVhZGVyVGVtcGxhdGVbXCJpZFwiXSAgICAgICA9IFwiaGVhZGVyX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHR0aGlzLmhlYWRlclRlbXBsYXRlW1widGVtcGxhdGVcIl0gPSB0aXRsZTtcclxuXHRcdHRoaXMuaGVhZGVyVGV4dCAgICAgICAgICAgICAgICAgPSB0aXRsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLmhlYWRlclRlbXBsYXRlO1xyXG5cdH1cclxufXRoaXMuUG9ydGFsSGVhZGVyID0gUG9ydGFsSGVhZGVyO1xyXG5jbGFzcyBQb3J0YWxSZXNpemVyIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblx0cHVibGljICByZXNpemVyVGVtcGxhdGUgPSB7dmlldzogXCJyZXNpemVyXCJ9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG5hbWUpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFJlc2l6ZXJfXCIpO1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggICAgPSBQb3J0YWxTZWN0aW9uLlJFU0laRVI7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICA9IFBvcnRhbFNlY3Rpb24uUkVTSVpFUjtcclxuXHRcdHRoaXMucmVzaXplclRlbXBsYXRlW1wiaWRcIl0gPSBcInVpUmVzaXplcl9cIiArIHdlYml4LnVpZCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVzaXplclRlbXBsYXRlO1xyXG5cdH1cclxufXRoaXMuUG9ydGFsUmVzaXplciA9IFBvcnRhbFJlc2l6ZXI7XHJcblxyXG5jbGFzcyBQb3J0bGV0IGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblxyXG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xyXG5cdHB1YmxpYyBwb3J0bGV0Vmlldzphbnk7XHJcblx0cHVibGljIHBvcnRsZXRDb21wb25lbnRWaWV3OmFueTtcclxuXHRwdWJsaWMgZGVmYXVsdFBvcnRsZXRWaWV3OmFueTtcclxuXHRwdWJsaWMgbm9uQ29tcG9uZW50VmlldzphbnkgPSBudWxsO1xyXG5cdHB1YmxpYyBpbnRlcm5hbFZpZXc6YW55XHJcblx0cHVibGljIGdyYXZpdHk6bnVtYmVyO1xyXG5cdHB1YmxpYyB2aWV3Q29udHJvbGxlcjpVSUNvbXBvbmVudDtcclxuXHRwdWJsaWMgaGlkZGVuOmJvb2xlYW4gICAgICAgPSBmYWxzZTtcclxuXHQvL2VuZHJlZ2lvblxyXG5cdHB1YmxpYyBzdGF0aWMgY2FzdChhU2VjdGlvbjphbnkpOlBvcnRsZXQge1xyXG5cdFx0cmV0dXJuIDxQb3J0bGV0PiBhU2VjdGlvbjtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKHBvcnRsZXROYW1lOnN0cmluZywgZ3Jhdml0eSA9IDEpIHtcclxuXHRcdHN1cGVyKHBvcnRsZXROYW1lKTtcclxuXHRcdHRoaXMuZ3Jhdml0eSAgICAgICAgICAgICAgPSBncmF2aXR5O1xyXG5cdFx0dGhpcy5wb3J0bGV0VmlldyAgICAgICAgICA9IHtpZDogdGhpcy5jb21wb25lbnRJRCwgbWluV2lkdGg6IDEwMCwgdGVtcGxhdGU6IFwiQ29udGVudFwiLCB2aWV3OiBcInRlbXBsYXRlXCJ9XHJcblx0XHR0aGlzLnBvcnRsZXRDb21wb25lbnRWaWV3ID0ge3R5cGU6IFwibGluZVwifVxyXG5cdFx0dGhpcy5kZWZhdWx0UG9ydGxldFZpZXcgICA9IHRoaXMucG9ydGxldFZpZXc7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCAgID0gUG9ydGFsU2VjdGlvbi5QT1JUTEVUO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRsZXRfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHJlcGxhY2VWaWV3KCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWaWV3KCksIG51bGwsIDYpKTtcclxuXHRcdHdlYml4LnVpKHRoaXMuZ2V0VmlldygpLCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XHJcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0VmlldygpLCBudWxsLCA2KSk7XHJcblx0fVxyXG5cdHB1YmxpYyBoaWRlKCkge1xyXG5cdFx0dGhpcy5oaWRkZW4gPSB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyByZXNldFZpZXcoKSB7XHJcblx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXdcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudCh0aGVDb21wb25lbnQ6VUlDb21wb25lbnQpIHtcclxuXHRcdHRoaXMudmlld0NvbnRyb2xsZXIgPSB0aGVDb21wb25lbnQ7XHJcblx0fVxyXG5cdHB1YmxpYyByZXNpemUoKSB7XHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkucmVzaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50cyBNZXRob2RzXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0aWYgKHRoaXMudmlld0NvbnRyb2xsZXIpIHtcclxuXHRcdFx0dmFyIHZpZXdBcnJheSAgICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdFx0dGhpcy5wb3J0bGV0VmlldyAgICAgICAgID0gdGhpcy5wb3J0bGV0Q29tcG9uZW50VmlldztcclxuXHRcdFx0dmFyIGNvbnRyb2xsZXJWaWV3ICAgICAgID0gdGhpcy52aWV3Q29udHJvbGxlci5nZXRWaWV3KCk7XHJcblx0XHRcdHZpZXdBcnJheVswXSAgICAgICAgICAgICA9IGNvbnRyb2xsZXJWaWV3O1xyXG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3W1wicm93c1wiXSA9IHZpZXdBcnJheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucG9ydGxldFZpZXcgPSB0aGlzLmRlZmF1bHRQb3J0bGV0VmlldztcclxuXHRcdH1cclxuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJpZFwiXSAgICAgID0gdGhpcy5nZXRDb21wb25lbnRJRCgpO1xyXG5cdFx0dGhpcy5wb3J0bGV0Vmlld1tcImdyYXZpdHlcIl0gPSB0aGlzLmdyYXZpdHk7XHJcblx0XHR0aGlzLnBvcnRsZXRWaWV3W1wiZHJhZ1wiXSAgICA9IHRydWU7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3J0bGV0VmlldztcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHRpZiAodGhpcy52aWV3Q29udHJvbGxlcikge1xyXG5cdFx0XHR0aGlzLnZpZXdDb250cm9sbGVyLmluaXRpYWxpemUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy50aGVBcnJheSkge1xyXG5cdFx0XHR0aGlzLnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlBvcnRsZXQgPSBQb3J0bGV0O1xyXG5cclxuZW51bSBQb3J0YWxUeXBlIHsgT25lVmlldywgRXhwbG9yZXJWaWV3LCBEZXRhaWxWaWV3IH10aGlzLlBvcnRhbFR5cGUgPSBQb3J0YWxUeXBlO1xyXG5lbnVtIFBvcnRhbE5hbWVzIHtFWFBMT1JFUiA9IDAsIERFVEFJTCA9IDEsIE1BSU4gPSAyLCBJTkZPID0gM310aGlzLlBvcnRhbE5hbWVzID0gUG9ydGFsTmFtZXM7XHJcblxyXG5jbGFzcyBQb3J0YWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblx0cHVibGljIHBvcnRhbFJvb3Q6UG9ydGFsUm9vdDtcclxuXHRwdWJsaWMgcG9ydGFsQ29udGFpbmVyOnN0cmluZyA9IG51bGw7XHJcblx0cHVibGljIHZpZXdQb3J0bGV0OlBvcnRsZXQgICAgPSBudWxsO1xyXG5cdHB1YmxpYyBwb3J0YWxUeXBlOlBvcnRhbFR5cGU7XHJcblx0cHVibGljIG5ld1ZpZXdQb3J0OmJvb2xlYW4gICAgPSBmYWxzZTtcclxuXHRwdWJsaWMgdmlld1R5cGUgICAgICAgICAgICAgICA9IG51bGw7XHJcblx0cHVibGljIHNlY3Rpb25UZW1wbGF0ZSAgICAgICAgPSB7dHlwZTogXCJsaW5lXCJ9O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwb3J0YWxUeXBlPzpQb3J0YWxUeXBlKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbF9cIik7XHJcblx0XHR0aGlzLnBvcnRhbFJvb3QgPSBuZXcgUG9ydGFsUm9vdCgpO1xyXG5cdFx0aWYgKCFwb3J0YWxUeXBlKSB7XHJcblx0XHRcdHN3aXRjaCAocG9ydGFsVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5PbmVWaWV3IDpcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemVPbmVWaWV3KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBQb3J0YWxUeXBlLkV4cGxvcmVyVmlldyA6XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplRXhwbG9yZXJWaWV3KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBQb3J0YWxUeXBlLkRldGFpbFZpZXcgOlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZURldGFpbFZpZXcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHBvcnRhbFN0cmluZyhwb3J0YWxOYW1lczpQb3J0YWxOYW1lcykge1xyXG5cdFx0c3dpdGNoIChwb3J0YWxOYW1lcykge1xyXG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLkVYUExPUkVSIDpcclxuXHRcdFx0XHRyZXR1cm4gXCJleHBsb3JlclwiO1xyXG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLkRFVEFJTCA6XHJcblx0XHRcdFx0cmV0dXJuIFwiZGV0YWlsQXJlYVwiO1xyXG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLk1BSU4gOlxyXG5cdFx0XHRcdHJldHVybiBcIm1haW5cIjtcclxuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5JTkZPIDpcclxuXHRcdFx0XHRyZXR1cm4gXCJpbmZvXCI7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHJldHVybiBcIk5PTkFNRVwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpIHtcclxuXHRcdHZhciByb290ICAgICAgPSB0aGlzLmdldFJvb3QoKTtcclxuXHRcdHZhciBuZXdDb2x1bW4gPSB0aGlzLmNyZWF0ZUNvbHVtbnMoXCJjb2x1bW5zXCIpO1xyXG5cdFx0dmFyIG5ld1JvdyAgICA9IHRoaXMuY3JlYXRlUm93cyhcInJvd3NcIik7XHJcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRQb3J0bGV0KFBvcnRhbE5hbWVzLkVYUExPUkVSKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRSZXNpemVyKCk7XHJcblx0XHRuZXdSb3cuYWRkUG9ydGxldChQb3J0YWxOYW1lcy5ERVRBSUwpO1xyXG5cdFx0bmV3Um93LmFkZFJlc2l6ZXIoKTtcclxuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KFBvcnRhbE5hbWVzLklORk8pO1xyXG5cdFx0bmV3Q29sdW1uLmFkZFNlY3Rpb24obmV3Um93KTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemVPbmVWaWV3KCkge1xyXG5cdFx0dmFyIHJvb3QgICAgICA9IHRoaXMuZ2V0Um9vdCgpO1xyXG5cdFx0dmFyIG5ld0NvbHVtbiA9IHRoaXMuY3JlYXRlQ29sdW1ucyhcImNvbHVtbnNcIik7XHJcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLk1BSU4pKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemVEZXRhaWxWaWV3KCkge1xyXG5cdFx0dmFyIHJvb3QgICA9IHRoaXMuZ2V0Um9vdCgpO1xyXG5cdFx0dmFyIG5ld1JvdyA9IHRoaXMuY3JlYXRlUm93cyhcInJvd3NcIik7XHJcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Um93KTtcclxuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLkRFVEFJTCkpO1xyXG5cdFx0bmV3Um93LmFkZFJlc2l6ZXIoKTtcclxuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLklORk8pKTtcclxuXHR9XHJcblx0cHVibGljIGdldFJvb3QoKTpQb3J0YWxSb290IHtcclxuXHRcdHJldHVybiB0aGlzLnBvcnRhbFJvb3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDb2x1bW5zKG5hbWU/KTpQb3J0YWxDb2x1bW4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxDb2x1bW4obmFtZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVSb3dzKG5hbWU/OnN0cmluZyk6UG9ydGFsUm93IHtcclxuXHRcdHJldHVybiBuZXcgUG9ydGFsUm93KG5hbWUpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29udGFpbmVyKGNvbnRhaW5lcklEOnN0cmluZykge1xyXG5cdFx0dGhpcy5wb3J0YWxDb250YWluZXIgPSBjb250YWluZXJJRDtcclxuXHRcdHRoaXMudmlld1BvcnRsZXQgICAgID0gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIHNldFZpZXdQb3J0bGV0KHRoZVBvcnRsZXQ6UG9ydGxldCkge1xyXG5cdFx0dGhpcy52aWV3UG9ydGxldCAgICAgPSB0aGVQb3J0bGV0O1xyXG5cdFx0dGhpcy5wb3J0YWxDb250YWluZXIgPSBcIlwiO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0UG9ydGxldChwb3J0YWxOYW1lOnN0cmluZyk6UG9ydGxldCB7XHJcblx0XHRyZXR1cm4gUG9ydGxldC5jYXN0KHRoaXMuZmluZCh0aGlzLnBvcnRhbFJvb3QsIHBvcnRhbE5hbWUpKTtcclxuXHR9XHJcblx0cHVibGljIGZpbmQocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uLCBuYW1lKTpQb3J0YWxTZWN0aW9uIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gcG9ydGFsU2VjdGlvbi50aGVBcnJheSkge1xyXG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0bGV0TmFtZSA9PSBuYW1lKVxyXG5cdFx0XHRcdHJldHVybiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dO1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5maW5kKDxQb3J0YWxTZWN0aW9uPiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLCBuYW1lKTtcclxuXHRcdFx0aWYgKHJlc3VsdClcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHRoZVZpZXcgICA9IHRoaXMuc2VjdGlvblRlbXBsYXRlO1xyXG5cdFx0dGhlVmlld1tcImlkXCJdICAgPSB0aGlzLmdldENvbXBvbmVudElEKCk7XHJcblx0XHR2aWV3QXJyYXlbMF0gICAgPSB0aGlzLmNyZWF0ZVBvcnRhbFZpZXcoKTtcclxuXHRcdHRoZVZpZXdbXCJyb3dzXCJdID0gdmlld0FycmF5O1xyXG5cdFx0aWYgKHRoaXMudmlld1R5cGUpXHJcblx0XHRcdHRoZVZpZXdbXCJ2aWV3XCJdID0gdGhpcy52aWV3VHlwZTtcclxuXHRcdHRoaXMuc2V0Q29tcG9uZW50Vmlldyh0aGVWaWV3KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVQb3J0YWxWaWV3KCk6YW55IHtcclxuXHRcdHZhciB0aGVQb3J0YWxWaWV3OlBvcnRsZXQ7XHJcblx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUodGhpcy5wb3J0YWxSb290KTtcclxuXHRcdHJldHVybiByZXN1bHRBcnJheVswXTtcclxuXHR9XHJcblx0cHVibGljIHRyZWUocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uKTpBcnJheTxhbnk+IHtcclxuXHRcdHZhciByZXR1cm5BcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHBvcnRhbFNlY3Rpb24udGhlQXJyYXkpIHtcclxuXHRcdFx0aW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XHJcblx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleClcclxuXHRcdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXggPT0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TIHx8IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4ID09IFBvcnRhbFNlY3Rpb24uUk9XUylcclxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4O1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5nZXRWaWV3KCk7XHJcblx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnRoZUFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUoPFBvcnRhbFNlY3Rpb24+IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0pO1xyXG5cdFx0XHRcdHJlc3VsdFtpbmRleF0gICA9IHJlc3VsdEFycmF5O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybkFycmF5LnB1c2gocmVzdWx0KVxyXG5cdFx0XHQvLyAgY29uc29sZS5sb2coXCJSZXR1cm5pbmcgUmVzdWx0XCIrQzRsb2cucHJpbnRUaGlzKHJlc3VsdCkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybkFycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZVRyZWUoKSB7XHJcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnBvcnRhbFJvb3QudGhlQXJyYXkpIHtcclxuXHRcdFx0dGhpcy5wb3J0YWxSb290LnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5BcnJheTtcclxuXHR9XHJcblx0cHVibGljIHJlZnJlc2goKSB7XHJcblx0XHR0aGlzLnNob3coKTtcclxuXHR9XHJcblx0cHVibGljIHNob3codGhlV2luZG93PzphbnkpOmFueSB7XHJcblx0XHR2YXIgc2hvd1ZpZXcgPSB0aGlzLmdldFZpZXcoKTtcclxuXHRcdHZhciB4Vmlldzphbnk7XHJcblx0XHRpZiAodGhlV2luZG93KSB7XHJcblx0XHRcdHZhciByb3dzICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdFx0cm93c1swXSAgICAgICAgICAgPSBzaG93VmlldztcclxuXHRcdFx0dGhlV2luZG93W1wicm93c1wiXSA9IHJvd3M7XHJcblx0XHRcdEFwcExvZy5wcmludFRoaXModGhlV2luZG93KTtcclxuXHRcdFx0eFZpZXcgPSB3ZWJpeC51aSh0aGVXaW5kb3cpLnNob3coKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBvcnRhbENvbnRhaW5lcikge1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudFZpZXdbXCJjb250YWluZXJcIl0gPSB0aGlzLnBvcnRhbENvbnRhaW5lcjtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEFwcExvZy5wcmludFRoaXMoc2hvd1ZpZXcpO1xyXG5cdFx0XHRcdHhWaWV3ID0gd2ViaXgudWkoc2hvd1ZpZXcsIHRoaXMucG9ydGFsQ29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLnByaW50VGhpcyhzaG93Vmlldyk7XHJcblx0XHRcdHhWaWV3ID0gd2ViaXgudWkoc2hvd1ZpZXcsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcIlNob3cgVmlld1wiKTtcclxuXHRcdC8vQzRsb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcclxuXHRcdHJldHVybiB4VmlldztcclxuXHR9XHJcblx0cHVibGljIHBvcHVwKHRoZVdpbmRvdzphbnkpIHtcclxuXHRcdHZhciBzaG93VmlldyA9IHRoaXMuZ2V0VmlldygpO1xyXG5cdFx0dmFyIHJvd3MgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0cm93c1swXSAgICAgICAgICAgPSBzaG93VmlldztcclxuXHRcdHRoZVdpbmRvd1tcImJvZHlcIl0gPSBDNE9iamVjdC5DbG9uZShzaG93Vmlldyk7XHJcblx0XHQvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoZVdpbmRvdykpO1xyXG5cdFx0dmFyIG5ld1dpbmRvdyA9IHdlYml4LnVpKHRoZVdpbmRvdyk7XHJcblx0XHRyZXR1cm4gbmV3V2luZG93O1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZVRyZWUoKTtcclxuXHR9XHJcblxyXG59IHRoaXMuUG9ydGFsID0gUG9ydGFsO1xyXG5cclxuY2xhc3MgVUlQb3B1cFdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0cHVibGljIHN0YXRpYyBDbG9zZUJ1dHRvbigpIHtcclxuXHRcdHZhciB0aGVJRCAgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUNvbXBvbmVudD4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0JCQodGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpLmNsb3NlKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgRnVsbFNjcmVlbigpIHtcclxuXHRcdHZhciB0aGVJRCAgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSVBvcHVwV2luZG93PiAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR0aGVDb21wb25lbnQuZnVsbHNjcmVlblRvZ2dsZSgpO1xyXG5cdH1cclxuXHJcblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXHJcblx0cHVibGljIHRpdGxlOnN0cmluZztcclxuXHRwdWJsaWMgcmVzaXplOmJvb2xlYW4gPSBmYWxzZTtcclxuXHRwdWJsaWMgbW9kYWw6Ym9vbGVhbiAgPSB0cnVlO1xyXG5cdHB1YmxpYyB0aGVDb21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0cHVibGljIHRoZVBvcnRhbCAgICAgID0gbmV3IFBvcnRhbCgpO1xyXG5cdHB1YmxpYyBjbG9zZUJ1dHRvbklEICA9IFwiY2xvc2VCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRwdWJsaWMgZnVsbHNjcmVlbklEICAgPSBcImZ1bGxTY3JlZW5JRF9cIit3ZWJpeC51aWQoKTtcclxuXHRwdWJsaWMgd2lkdGggICAgICAgICAgPSA1MDA7XHJcblx0cHVibGljIGhlaWdodCAgICAgICAgID0gNTAwO1xyXG5cdC8vZW5kcmVnaW9uXHJcblx0Y29uc3RydWN0b3IobGFiZWw6c3RyaW5nID0gXCJQb3B1cCBXaW5kb3dcIiwgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50ID0gbnVsbCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuYWRkUHJvcGVydGllcyAoIHsgd2lkdGggOiB0aGlzLndpZHRoLCBoZWlnaHQgOiB0aGlzLmhlaWdodCB9KVxyXG5cdFx0dGhpcy5zZXRJRChcIlVJUG9wdXBXaW5kb3dfXCIpO1xyXG5cdFx0dmFyIHBvcnRhbFJvb3QgPSB0aGlzLnRoZVBvcnRhbC5nZXRSb290KCk7XHJcblx0XHR2YXIgcm93cyA9IHRoaXMudGhlUG9ydGFsLmNyZWF0ZVJvd3MoKTtcclxuXHRcdHJvd3MuYWRkUG9ydGxldChcIm1haW5cIik7XHJcblx0XHRwb3J0YWxSb290LmFkZFNlY3Rpb24oKHJvd3MpKTtcclxuXHRcdHRoaXMuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XHJcblx0XHR0aGlzLmNvbXBvbmVudExhYmVsID0gbGFiZWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xyXG5cdFx0dGhpcy50aGVDb21wb25lbnQgPSB0aGVDb21wb25lbnQ7XHJcblx0XHR0aGlzLnRoZVBvcnRhbC5nZXRQb3J0bGV0KFwibWFpblwiKS5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwiY29tcG9uZW50XCIsIHRoZUNvbXBvbmVudCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93KHRoZUNvbXBvbmVudD86VUlDb21wb25lbnQpIHtcclxuXHRcdGlmICh0aGVDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnRoZUNvbXBvbmVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJUcnlpbmcgdG8gU2hvdyBXaW5kb3cgV2l0aCBNaXNzaW5nIFZpZXdcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBwb3B1cCA9IHRoaXMudGhlUG9ydGFsLnBvcHVwKHRoaXMuZ2V0VmlldygpKTtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5Qb3B1cCk7XHJcblx0XHRwb3B1cC5zaG93KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZnVsbHNjcmVlblRvZ2dsZSgpIHtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuY29uZmlnLmZ1bGxzY3JlZW4gPSAhJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5jb25maWcuZnVsbHNjcmVlblxyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgaGlkZSgpIHtcclxuXHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIHRoaXMpO1xyXG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5DbG9zZURpYWdyYW0pO1xyXG5cdFx0aWYgKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkpIHtcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBjbG9zZSgpIHtcclxuXHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIHRoaXMpO1xyXG5cdFx0aWYgKCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpLmRlc3RydWN0b3IoKTtcclxuXHRcdH1cclxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuQ2xvc2VEaWFncmFtKTtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuY2xvc2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdHZpZXcgICAgOiBcIndpbmRvd1wiLFxyXG5cdFx0XHRpZCAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0Y3NzICAgICA6IFwiYzRwb3B1cCBhbmltYXRlZCB6b29tSW5cIixcclxuXHRcdFx0cG9zaXRpb246IFwiY2VudGVyXCIsXHJcblx0XHRcdG1vZGFsICAgOiB0cnVlLFxyXG5cdFx0XHRtb3ZlICAgIDogdHJ1ZSxcclxuXHRcdFx0c2Nyb2xseHk6IHRydWUsXHJcblx0XHRcdGhpZGRlbiAgOiB0cnVlLFxyXG5cdFx0XHRyZXNpemUgIDogdHJ1ZSxcclxuXHRcdFx0aGVhZCAgICA6IHtcclxuXHRcdFx0XHR2aWV3OiBcInRvb2xiYXJcIiwgbWFyZ2luOiAtNCwgcG9zaXRpb246IFwiY2VudGVyXCIsIGNvbHM6IFtcclxuXHRcdFx0XHRcdCB7dmlldzogXCJsYWJlbFwiLCBsYWJlbDogdGhpcy5jb21wb25lbnRMYWJlbH0sXHJcblx0XHRcdFx0XHQge3ZpZXcgOiBcImljb25cIixpZCA6IHRoaXMuZnVsbHNjcmVlbklELGljb24gOiBcImFycm93cy1hbHRcIixjc3MgIDogXCJhbHRlclwiLGNsaWNrOiBVSVBvcHVwV2luZG93LkZ1bGxTY3JlZW59LFxyXG5cdFx0ICAgICAgICAgICAgIHt2aWV3IDogXCJpY29uXCIsaWQgOiB0aGlzLmNsb3NlQnV0dG9uSUQsaWNvbiA6IFwidGltZXMtY2lyY2xlXCIsY3NzICA6IFwiYWx0ZXJcIixjbGljazogVUlQb3B1cFdpbmRvdy5DbG9zZUJ1dHRvbn1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHQvLyB0aGlzLnRoZUNvbXBvbmVudC5pbml0aWFsaXplKCk7XHJcblx0XHQkJCh0aGlzLmNsb3NlQnV0dG9uSUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcclxuXHRcdCQkKHRoaXMuZnVsbHNjcmVlbklEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XHJcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXSAgID0gdGhpcztcclxuXHR9XHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlVJUG9wdXBXaW5kb3cgPSBVSVBvcHVwV2luZG93O1xyXG5cclxuY2xhc3MgQ29uZmlybUFjdGlvbiB7XHJcblx0bGFiZWw6c3RyaW5nO1xyXG5cdGV2ZW50OnN0cmluZztcclxufSB0aGlzLkNvbmZpcm1BY3Rpb24gPSBDb25maXJtQWN0aW9uO1xyXG5cclxuY2xhc3MgVUlDb25maXJtV2luZG93IGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcclxuXHRwcm90ZWN0ZWQgcG9wdXA6VUlQb3B1cFdpbmRvdztcclxuXHRwdWJsaWMgdGl0bGU6c3RyaW5nO1xyXG5cdHB1YmxpYyBzdGF0ZW1lbnQ6c3RyaW5nO1xyXG5cdHB1YmxpYyBvcHRpb24xOkNvbmZpcm1BY3Rpb247XHJcblx0cHVibGljIG9wdGlvbjI6Q29uZmlybUFjdGlvbjtcclxuXHRwdWJsaWMgb3B0aW9uMzpDb25maXJtQWN0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcsIHN0YXRlbWVudDpzdHJpbmcsIG9wdGlvbjE6Q29uZmlybUFjdGlvbiwgb3B0aW9uMjpDb25maXJtQWN0aW9uID0gbnVsbCwgb3B0aW9uMzpDb25maXJtQWN0aW9uID0gbnVsbCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMudGl0bGUgICAgID0gdGl0bGU7XHJcblx0XHR0aGlzLnN0YXRlbWVudCA9IHN0YXRlbWVudDtcclxuXHRcdHRoaXMub3B0aW9uMSAgID0gb3B0aW9uMTtcclxuXHRcdHRoaXMub3B0aW9uMiAgID0gb3B0aW9uMjtcclxuXHRcdHRoaXMub3B0aW9uMyAgID0gb3B0aW9uMztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjbG9zZSgpIHtcclxuXHRcdHRoaXMucG9wdXAuY2xvc2UoKTtcclxuXHR9XHJcblx0cHVibGljIGxpc3RlbihldmVudDphbnksIG9iamVjdDphbnksIGNhbGxlcjpVSUNvbXBvbmVudCkge1xyXG5cdFx0c3dpdGNoIChldmVudCkge1xyXG5cdFx0XHRjYXNlIFwiY2xpY2tcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZiAoY2FsbGVyID09PSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjFcIikpIHtcclxuXHRcdFx0XHRcdHRoaXMucHVibGlzaCh0aGlzLm9wdGlvbjEuZXZlbnQsIHRoaXMub3B0aW9uMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjYWxsZXIgPT09IHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoKHRoaXMub3B0aW9uMi5ldmVudCwgdGhpcy5vcHRpb24yKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNhbGxlciA9PT0gdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2godGhpcy5vcHRpb24zLmV2ZW50LCB0aGlzLm9wdGlvbjMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiY2xvc2VcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCBudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR2YXIgdGl0bGUgPSBuZXcgVUlMYWJlbCh7bGFiZWw6IHRoaXMudGl0bGUsIGFsaWdubWVudDogXCJjZW50ZXJcIiwgbGFiZWxXaWR0aDogMTAwfSk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcInRpdGxlXCIsIHRpdGxlKTtcclxuXHRcdHZhciB0ZXh0ID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnN0YXRlbWVudCwgYWxpZ25tZW50OiBcImNlbnRlclwiLCBsYWJlbFdpZHRoOiAxMDB9KTtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGV4dFwiLCB0ZXh0KTtcclxuXHRcdHZhciBvcHRpb24xID0gbmV3IFVJQnV0dG9uKHtsYWJlbDogdGhpcy5vcHRpb24xLmxhYmVsfSk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcIm9wdGlvbjFcIiwgb3B0aW9uMSk7XHJcblx0XHRpZiAodGhpcy5vcHRpb24xKSB7XHJcblx0XHRcdHZhciBvcHRpb24yID0gbmV3IFVJQnV0dG9uKHRoaXMub3B0aW9uMi5sYWJlbCk7XHJcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uMlwiLCBvcHRpb24yKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbjMpIHtcclxuXHRcdFx0dmFyIG9wdGlvbjMgPSBuZXcgVUlCdXR0b24odGhpcy5vcHRpb24zLmxhYmVsKTtcclxuXHRcdFx0dGhpcy5hZGRDb21wb25lbnQoXCJvcHRpb24zXCIsIG9wdGlvbjMpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0dmlldzogXCJmb3JtXCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIHJvd3M6IHRoaXMuY3JlYXRlQ29tcG9uZW50c1ZpZXcoKVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbmZpcm1hdGlvblwiLCB0aGlzKTtcclxuXHRcdHRoaXMucG9wdXAuc3Vic2NyaWJlKFwiY2xvc2VcIiwgdGhpcyk7XHJcblx0XHR0aGlzLnBvcHVwLnNob3coKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0XHR0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjFcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24yXCIpKSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjNcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0fVxyXG59IHRoaXMuVUlDb25maXJtV2luZG93ID0gVUlDb25maXJtV2luZG93XHJcblxyXG5jbGFzcyBVSU11bHRpVmlldyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTXVsdGlWaWV3X1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRWaWV3KGxhYmVsOnN0cmluZywgY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChsYWJlbCwgY29tcG9uZW50KTtcclxuXHR9XHJcblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XHJcblx0XHRzdXBlci5zZXRSZWxhdGlvbnNoaXBPYmplY3QodGhlT2JqZWN0KTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXSkge1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLnNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGlzLmdldFJlbGF0aW9uc2hpcE9iamVjdCgpKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZUNvbXBvbmVudHNWaWV3KCk6YW55IHtcclxuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIGkgICAgICAgICA9IDA7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcclxuXHRcdFx0aWYgKGl0ZW0gIT0gXCJ0b29sYmFyXCIpXHJcblx0XHRcdFx0dmlld0FycmF5W2krK10gPSB7XHJcblx0XHRcdFx0XHRoZWFkZXI6IGl0ZW0sIGJvZHk6IHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZ2V0VmlldygpXHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZpZXdBcnJheTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLCB2aWV3OiBcInRhYnZpZXdcIiwgYW5pbWF0ZTogdHJ1ZSwgY2VsbHM6IHRoaXMuY3JlYXRlQ29tcG9uZW50c1ZpZXcoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG59IHRoaXMuVUlNdWx0aVZpZXcgPSBVSU11bHRpVmlldztcclxuXHJcbmNsYXNzIFVJTWVudSBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBtZW51SXRlbXMgOiBBcnJheTxhbnk+O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLm1lbnVJdGVtcyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRNZW51SXRlbShtZW51IDogYW55KSB7XHJcblx0XHRtZW51W1wiaWRcIl0gPSB3ZWJpeC51aWQoKStcIl9tZW51XCI7XHJcblx0XHR0aGlzLm1lbnVJdGVtcy5wdXNoKG1lbnUpO1xyXG5cdH1cclxufSB0aGlzLlVJTWVudSA9IFVJTWVudTtcclxuXHJcbmNsYXNzIFRhYlZpZXdDZWxsIHtcclxuXHRwdWJsaWMgbmFtZSAgICAgICA6IHN0cmluZztcclxuXHRwdWJsaWMgcHJvcGVydGllcyA6IGFueTtcclxuXHRwdWJsaWMgY29tcG9uZW50ICA6IFVJQ29tcGxleENvbXBvbmVudDtcclxufVxyXG5cclxuY2xhc3MgVUlUYWJWaWV3ICBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xyXG5cdHB1YmxpYyBhbmltYXRlICAgICAgOiBib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIGNlbGxzICAgICAgIDogQXJyYXk8VGFiVmlld0NlbGw+O1xyXG5cdHB1YmxpYyBjbG9zZUFibGUgICAgOiBib29sZWFuID0gdHJ1ZTtcclxuXHRwdWJsaWMgZml0QmlnZ2VzdCAgIDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgOiBhbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSVRhYlZpZXdfXCIpO1xyXG5cdFx0dGhpcy5jZWxscyA9IG5ldyBBcnJheTxUYWJWaWV3Q2VsbD4oKTtcclxuXHR9XHJcblx0cHVibGljIGFkZFZpZXcobmFtZSA6IHN0cmluZywgcHJvcGVydGllcyA6IGFueSwgY29tcG9uZW50IDogVUlDb21wbGV4Q29tcG9uZW50KSB7XHJcblx0XHR2YXIgY2VsbCA9IG5ldyBUYWJWaWV3Q2VsbCgpO1xyXG5cdFx0Y2VsbC5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuXHRcdGNlbGwuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG5cdFx0Y2VsbC5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuY2VsbHNbbmFtZV09Y2VsbDtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KG5hbWUsY29tcG9uZW50KTtcclxuXHR9XHJcblx0cHVibGljIGxpc3RlbihldmVudCwgZGF0YSwgY2FsbGVyKSB7XHJcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XHJcblx0XHRcdGNhc2UgXCJldmVudE5hbWVcIjpcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDZWxscygpIDogQXJyYXk8YW55PiB7XHJcblx0XHR2YXIgY2VsbEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jZWxscykge1xyXG5cdFx0XHR2YXIgY2VsbCA9IHsgYm9keSA6IHRoaXMuY2VsbHNbaXRlbV0uY29tcG9uZW50LmdldFZpZXcoKSAgfVxyXG5cdFx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLmNlbGxzW2l0ZW1dLnByb3BlcnRpZXMpIHtcclxuXHRcdFx0XHRjZWxsW3Byb3BlcnR5XSA9IHRoaXMuY2VsbHNbaXRlbV0ucHJvcGVydGllc1twcm9wZXJ0eV07XHJcblx0XHRcdH1cclxuXHRcdFx0Y2VsbEFycmF5LnB1c2goY2VsbCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2VsbEFycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpIDogYW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICA6IFwidGFidmlld1wiLFxyXG5cdFx0XHRtdWx0aXZpZXcgOiB7IGFuaW1hdGUgOiB0aGlzLmFuaW1hdGUsIGZpdEJpZ2dlc3QgOiB0aGlzLmZpdEJpZ2dlc3QgfSxcclxuXHRcdFx0Y2xvc2UgICAgIDogdGhpcy5jbG9zZUFibGUsXHJcblx0XHRcdHRhYmJhciAgICA6IHsgcG9wdXBXaWR0aDogMzAwLHRhYk1pbldpZHRoOiAxMjAgfSxcclxuXHRcdFx0Y2VsbHMgICAgIDogdGhpcy5jcmVhdGVDZWxscygpXHJcblxyXG5cdFx0fSlcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge31cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbXBvbmVudCBMYWJlbCBcIik7XHJcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XHJcblx0fVxyXG59IHRoaXMuVUlUYWJWaWV3ID0gVUlUYWJWaWV3O1xyXG5GYWN0b3J5LkFkZFN0cmluZ1RvQ2xhc3MoXCJVSVRhYlZpZXdcIiwgVUlUYWJWaWV3KTtcclxuXHJcbmNsYXNzIFVJTGlzdCBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xyXG5cdHB1YmxpYyBjb2x1bW5OYW1lICAgOiBzdHJpbmcgPSBudWxsO1xyXG5cdHB1YmxpYyB0YWJsZSAgICAgICAgOiBVSURhdGFUYWJsZSA9IG51bGw7XHJcblx0cHVibGljIGRhdGFBcnJheSAgICA6IEFycmF5PGFueT49bnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA6IGFueSA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTGlzdF9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0TGlzdChkYXRhIDogQXJyYXk8YW55Pikge1xyXG5cclxuXHR9XHJcblx0cHVibGljIGxpc3RlbihldmVudCwgZGF0YSwgY2FsbGVyKSB7XHJcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XHJcblx0XHRcdGNhc2UgXCJpdGVtQ2xpY2tcIjoge1xyXG5cdFx0XHRcdHRoaXMuaXRlbUNoYW5nZShkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHRVSS5JbmZvKGV2ZW50KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGl0ZW1DaGFuZ2UoaXRlbSA6IEl0ZW1TZWxlY3RlZEV2ZW50KSB7XHJcblx0XHR2YXIgc3RhdHVzID0gaXRlbS5vYmplY3RBcnJheVswXVtcInN0YXR1c1wiXTtcclxuXHRcdGl0ZW0ub2JqZWN0QXJyYXlbMF1bXCJzdGF0dXNcIl0gPSAhc3RhdHVzO1xyXG5cdFx0KDxVSURhdGFUYWJsZT50aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpKS5yZWZyZXNoUm93KGl0ZW0ucm93SUQpO1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwiaXRlbUNoYW5nZVwiLCBpdGVtKTtcclxuXHR9XHJcblx0cHVibGljIHNldChuYW1lIDogc3RyaW5nLCBkYXRhQXJyYXkgOiBBcnJheTxhbnk+KSB7XHJcblx0XHR0aGlzLmNvbHVtbk5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5kYXRhQXJyYXkgPSBkYXRhQXJyYXk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCkgOiBhbnkge1xyXG5cdFx0dGhpcy50YWJsZSA9IG5ldyBVSURhdGFUYWJsZSgpO1xyXG5cdFx0dGhpcy50YWJsZS5hZGRDb2x1bW4oMCwgeyBpZDpcInN0YXR1c1wiLCBoZWFkZXI6XCJBY3RpdmVcIiwgd2lkdGg6NDAsIGNzczpcImNlbnRlclwiLCB0eXBlIDogXCJ2YWx1ZVwiLFxyXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24ob2JqLHR5cGUsdmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUpXHJcblx0XHRcdFx0XHRyZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfdGFibGVfY2hlY2tib3ggd2ViaXhfaWNvbiBmYS1leWUnPjwvc3Bhbj5cIjtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfdGFibGVfY2hlY2tib3ggd2ViaXhfaWNvbiBmYS1leWUtc2xhc2gnPjwvc3Bhbj5cIjtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnRhYmxlLmFkZENvbHVtbigxLCB7IGlkOlwidmFsdWVcIiwgIGhlYWRlcjp0aGlzLmNvbHVtbk5hbWUsIGZpbGxzcGFjZToxIH0pO1xyXG5cdFx0dGhpcy50YWJsZS5zZXRMaXN0KHRoaXMuZGF0YUFycmF5KTtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGFibGVcIix0aGlzLnRhYmxlKTtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgOiBcImZvcm1cIixcclxuXHRcdFx0cm93cyA6IFt0aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpLmdldFZpZXcoKV1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0aWYgKHRoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikpIHtcclxuXHRcdFx0KDxVSURhdGFUYWJsZT4gdGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkuc3Vic2NyaWJlKFwib25JdGVtQ2xpY2tcIix0aGlzLFwiaXRlbUNsaWNrXCIpXHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93KCkge1xyXG5cdFx0dGhpcy5wb3B1cCA9IG5ldyBVSVBvcHVwV2luZG93KHRoaXMuY29sdW1uTmFtZStcIiBMaXN0IFwiKTtcclxuXHRcdHRoaXMucG9wdXAubW9kYWw9ZmFsc2U7XHJcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XHJcblx0fVxyXG59IHRoaXMuVUlMaXN0ID0gVUlMaXN0O1xyXG5cclxuIl19