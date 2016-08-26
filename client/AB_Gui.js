var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
console.log("Loading gui.ts ...");
findClassType = null;
var DropMessage = (function () {
    function DropMessage() {
    }
    return DropMessage;
}());
var UIEventHandler = (function () {
    function UIEventHandler() {
    }
    UIEventHandler.OnAfterTabClick = function () { };
    UIEventHandler.FieldChanged = function (newValue, oldValue) {
        var theComponentID = this["config"].id;
        var theComponent = $$(theComponentID)["component"];
        theComponent.fieldChanged(newValue, oldValue);
    };
    UIEventHandler.CreateDropMessage = function (context) {
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
    };
    UIEventHandler.OnBeforeDragIn = function (context, event) {
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onBeforeDragIn == 'function')
            return dropMessage.toComponent.onBeforeDragIn(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    };
    UIEventHandler.onDragOut = function (context, event) {
        var context = webix.DragControl.getContext();
        UI.Info("OnDragOut Static");
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onDragOut == 'function')
            return dropMessage.toComponent.onDragOut(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    };
    UIEventHandler.onBeforeDrop = function (context, ev) {
    };
    UIEventHandler.OnAfterDrop2 = function (context, ev) {
    };
    UIEventHandler.OnAfterDrop = function (context, event) {
        var context = webix.DragControl.getContext();
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onAfterDrop == 'function')
            return dropMessage.toComponent.onAfterDrop(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    };
    UIEventHandler.OnButtonClick = function (id, event) {
        var theComponentID = this["config"].id;
        if (!$$(theComponentID))
            return;
        var theComponent = $$(theComponentID)["component"];
        theComponent.onButtonClick(theComponent);
    };
    UIEventHandler.OnDragOut = function (context, event) {
        var context = webix.DragControl.getContext();
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onDragOut == 'function')
            return dropMessage.toComponent.onDragOut(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    };
    UIEventHandler.OnBeforeDrop = function (context, event) {
        var context = webix.DragControl.getContext();
        var dropMessage = UIEventHandler.CreateDropMessage(context);
        if (typeof dropMessage.toComponent.onBeforeDrop == 'function')
            return dropMessage.toComponent.onBeforeDrop(dropMessage);
        else {
            AppLog.error("peformDrop not implemented for object", new Error(), dropMessage);
            return;
        }
    };
    UIEventHandler.OnClick = function (ev, id) {
    };
    UIEventHandler.OnItemDblClick = function (id, ev, node) {
        var theComponent = $$(this["config"].id)["component"];
        var selectedObject = $$(theComponent.dataTableID).getItem(id.row);
        var itemMessage = new ItemSelectedEvent();
        itemMessage.objectArray = new Array();
        itemMessage.objectArray.push(selectedObject);
        theComponent.onItemDblClick(itemMessage);
    };
    UIEventHandler.OnItemClick = function (id, ev, node) {
        var theComponent = $$(this["config"].id)["component"];
        var selectedObject = $$(theComponent.dataTableID).getItem(id.row);
        var itemMessage = new ItemSelectedEvent();
        itemMessage.objectArray = new Array();
        itemMessage.objectArray.push(selectedObject);
        itemMessage.rowID = id.row;
        theComponent.onItemClick(itemMessage);
    };
    UIEventHandler.onSelectChange = function () {
        var theComponent = $$(this["config"].id)["component"];
        var rowid = $$(theComponent.dataTableID).getSelectedId(true);
        var selectedObject = $$(theComponent.dataTableID).getItem(rowid);
        theComponent.onSelectChange(rowid, selectedObject);
    };
    UIEventHandler.onAfterEditStop = function (state, editor, ignoreUpdate) {
        var theComponent = $$(this["config"].id)["component"];
        var theColumn = new UIDataTableField();
        theColumn.columnName = editor.column;
        theColumn.oldValue = state.old;
        theColumn.newValue = state.value;
        theColumn.rowObject = $$(theComponent.dataTableID).getItem(editor.row);
        theColumn.editor = editor;
        theComponent.onStopEdit(theColumn);
    };
    UIEventHandler.onBeforeEditStartTable = function (id) {
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
    };
    UIEventHandler.OnChange = function (newv, oldv) {
        var theComponent = $$(this["config"].id)["component"];
        theComponent.onChange(newv, oldv);
    };
    UIEventHandler.MenuHandler = function (id, context) {
        var theID = this["config"].id;
        var theComponent = $$(theID)["component"];
        var jumpItem = theComponent.getMenuItem(id);
        var theObject = theComponent.owningComponent.getSelectedObject();
        if (!jumpItem.callback)
            return;
        jumpItem.callback(id, theComponent, theObject);
    };
    UIEventHandler.OnAfterSelect = function (id) {
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
    };
    UIEventHandler.HandleFieldEntry = function (state, editor, ignoreUpdate) {
        var theExplorer = $$(this["config"].id).explorer;
        var newText = state.value;
        var rowID = editor.row;
        var theNode = $$(theExplorer.componentID).getItem(rowID);
        var theProxy = Factory.CreateProxyInstance(theNode.classType);
        theProxy.updateName(theNode._id, newText);
        UI.Message("Record Updated");
    };
    UIEventHandler.IsFieldEditable = function (id) {
        var theID = this["config"].id;
        var theExplorer = $$(theID)["explorer"];
        var rowItem = $$(theExplorer.getComponentID()).getItem(id);
        if (rowItem.classType.indexOf("Root") == -1)
            return false;
        else
            return true;
    };
    UIEventHandler.ValidateFieldEntry = function (row, value) {
        var theID = this["config"].id;
        var theExplorer = $$(theID).explorer;
        var rowItem = $$(theExplorer.getComponentID()).getItem(row.id);
        AppLog.info("info", "Before Edit Event");
        return true;
    };
    UIEventHandler.ProcessOnDestruct = function (theComponent) {
        UI.Debug("on Destruct Called");
        theComponent.onDestruct();
    };
    UIEventHandler.ProcessTabChanged = function () {
    };
    UIEventHandler.OnDropEvent = function (Source, target, event) {
        // UI.Info("Drop Event");
        console.log("On Drop Event");
    };
    return UIEventHandler;
}());
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
var UI = (function (_super) {
    __extends(UI, _super);
    function UI() {
        _super.call(this);
    }
    UI.PlaySound = function (sound) {
        if (sound === void 0) { sound = Sounds.Blop; }
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
    };
    UI.Debug = function (text) {
        if (true)
            UI.Message(text);
    };
    UI.Message = function (text) {
        UI.Info(text);
    };
    UI.Info = function (text) {
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
    };
    UI.Warning = function (text) {
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
    };
    UI.Success = function (text) {
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
    };
    UI.Error = function (text) {
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
    };
    UI.ExportToExcel = function (componentID) {
        $$(componentID).exportToExcel();
    };
    UI.Alert = function (string) { webix.alert(string); };
    return UI;
}(C4Object));
this.UI = UI;
var UIComponent = (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this);
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
    Object.defineProperty(UIComponent.prototype, "userData", {
        get: function () {
            return this._userData;
        },
        set: function (value) {
            this._userData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "uiClassType", {
        get: function () {
            return this._uiClassType;
        },
        set: function (value) {
            this._uiClassType = value;
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype.showOverlay = function () {
        if (!this.overlayMixin)
            webix.extend($$(this.componentID), webix.OverlayBox);
        $$(this.componentID).showOverlay();
        this.overlayMixin = true;
    };
    UIComponent.prototype.hideOverlay = function () {
        $$(this.componentID).hideOverlay();
    };
    UIComponent.TreeIcon = function (obj) {
        if (obj.$level > 1001)
            return "<span class='webix_icon fa-folder-open'></span>";
        if (obj.$level < 1000) {
            return Factory.GetClassIcon(obj._classType);
        }
        return "<span class='webix_icon fa-film'></span>";
    };
    UIComponent.prototype.attachEvent = function (id, event, callback) {
        if ($$(id)) {
            $$(id).attachEvent(event, callback);
        }
    };
    UIComponent.prototype.setRelationshipObject = function (theObject) {
        this.relationshipObject = theObject;
    };
    UIComponent.prototype.getRelationshipObject = function () {
        return this.relationshipObject;
    };
    UIComponent.prototype.blankValue = function () { };
    UIComponent.prototype.createView = function (viewOptions) {
        this.setProperty("drag", true);
        this.mergePropertySet(viewOptions);
        return viewOptions;
    };
    UIComponent.prototype.setID = function (prefix) {
        this.idPrefix = prefix;
        this.componentID = this.idPrefix + webix.uid();
    };
    UIComponent.prototype.setCallback = function (callback) {
        this.componentChangeCallback = callback;
    };
    UIComponent.prototype.getCallback = function () {
        return this.componentChangeCallback;
    };
    UIComponent.prototype.isValid = function () {
        if ($$(this.componentID)) {
            return $$(this.componentID).validate();
        }
        return false;
    };
    UIComponent.prototype.setData = function (theData) {
        this.componentData = theData;
    };
    UIComponent.prototype.getData = function () {
        return this.componentData;
    };
    UIComponent.prototype.setLabel = function (theLabel) {
        this.componentLabel = theLabel;
    };
    UIComponent.prototype.getLabel = function () {
        return this.componentLabel;
    };
    UIComponent.prototype.setValue = function (theValue) {
        this.componentValue = theValue;
        if ($$(this.componentID)) {
            webix.ui(this.getValue, $$(this.componentID));
            this.initialize();
        }
    };
    UIComponent.prototype.setOwningComponent = function (component) {
        this.owningComponent = component;
    };
    UIComponent.prototype.getOwningComponent = function () {
        return this.owningComponent;
    };
    UIComponent.prototype.getComponentID = function () {
        return this.componentID;
    };
    UIComponent.prototype.setComponentID = function (id) {
        this.componentID = id;
    };
    UIComponent.prototype.getValue = function () {
        return this.componentValue;
    };
    UIComponent.prototype.getComponentView = function () {
        return this.componentView;
    };
    UIComponent.prototype.setComponentView = function (theView) {
        this.componentView = theView;
    };
    UIComponent.prototype.getSelectedObject = function () {
        return null;
    };
    UIComponent.prototype.onBeforeDrop = function (message) {
        webix.alert("Sorry Dropping Here Not Allowed Yet");
        return false;
    };
    UIComponent.prototype.onBeforeDragIn = function (message) {
        return false;
    };
    UIComponent.prototype.onAfterDrop = function (message) {
        return false;
    };
    UIComponent.prototype.onDragOut = function (message) {
        return false;
    };
    UIComponent.prototype.validateDrop = function (message) {
        return false;
    };
    UIComponent.prototype.onSelectChange = function (itemMessage) {
        this.publish("onSelectChange", itemMessage);
        return;
    };
    UIComponent.prototype.onItemDblClick = function (itemMessage) {
        this.publish("onItemDblClick", itemMessage);
    };
    UIComponent.prototype.onItemClick = function (itemMessage) {
        this.publish("onItemClick", itemMessage);
    };
    UIComponent.prototype.getObject = function () {
        return this.theObject;
    };
    UIComponent.prototype.setObject = function (theObject) {
        this.theObject = theObject;
    };
    UIComponent.prototype.setDraggable = function (flag) {
        if (flag === void 0) { flag = true; }
        var htmlView = $$(this.getComponentID()).$view;
        webix.DragControl.addDrop($$(this.getComponentID()), UIEventHandler.OnDropEvent);
    };
    UIComponent.prototype.setProperty = function (name, value) {
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
    };
    UIComponent.prototype.addProperties = function (propertySet) {
        for (var item in propertySet) {
            this.setProperty(item, propertySet[item]);
        }
    };
    UIComponent.prototype.getProperty = function (name) {
        return this.properties[name];
    };
    UIComponent.prototype.mergePropertySet = function (view) {
        var index = 0;
        for (var item in this.properties) {
            view[item] = this.properties[item];
            index++;
        }
        return view;
    };
    UIComponent.prototype.getPropertySet = function () {
        var index = 0;
        var results = {};
        for (var item in this.properties) {
            results[item] = this.properties[item];
            index++;
        }
        return results;
    };
    //region UIComponent Methods
    UIComponent.prototype.getView = function () {
        return null;
    };
    UIComponent.prototype.refresh = function () { };
    UIComponent.prototype.defineEvents = function () {
        this.eventsDefined = true;
        return;
    };
    UIComponent.prototype.initialize = function () {
        if ($$(this.componentID)) {
            $$(this.componentID)["component"] = this;
            $$(this.componentID).drag = true;
        }
    };
    UIComponent.prototype.destroyView = function () {
        if ($$(this.componentID))
            $$(this.componentID).destructor();
    };
    UIComponent.prototype.destroyObject = function () {
    };
    UIComponent.prototype.onDestruct = function () {
        this.destroyObject();
    };
    UIComponent.prototype.destructor = function () {
    };
    return UIComponent;
}(UI));
this.UIComponent = UIComponent;
var UIContextMenu = (function (_super) {
    __extends(UIContextMenu, _super);
    function UIContextMenu(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.jumpItemArray = new Array();
        this.setID("uiContextMenu_");
    }
    UIContextMenu.prototype.addItem = function (label, callback) {
        var newItem = new UIJumpItem();
        newItem.id = "menuItem_" + webix.uid();
        newItem.label = label;
        newItem.callback = callback;
        this.jumpItemArray[newItem.id] = newItem;
    };
    UIContextMenu.prototype.addSeperator = function () {
        var newItem = new UIJumpItem();
        newItem.id = "jumpItem_" + webix.uid();
        newItem.label = "";
        newItem.callback = null;
        this.jumpItemArray[newItem.id] = newItem;
    };
    UIContextMenu.prototype.getMenuItem = function (label) {
        for (var item in this.jumpItemArray) {
            if (this.jumpItemArray[item].label == label)
                return this.jumpItemArray[item];
        }
    };
    //region UIComponent Methods
    UIContextMenu.prototype.getView = function () {
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
    };
    UIContextMenu.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
        this.componentView = this.getView();
        if (!$$(this.componentID))
            webix.ui(this.componentView).attachTo($$(this.getOwningComponent().getComponentID()));
        $$(this.getComponentID())["component"] = this;
    };
    UIContextMenu.prototype.defineEvents = function () {
        this.attachEvent(this.getComponentID(), "click", UIEventHandler.MenuHandler);
    };
    return UIContextMenu;
}(UIComponent));
this.UIContextMenu = UIContextMenu;
var FieldFormat;
(function (FieldFormat) {
    FieldFormat[FieldFormat["GENERAL"] = 0] = "GENERAL";
    FieldFormat[FieldFormat["CURRENCY"] = 1] = "CURRENCY";
    FieldFormat[FieldFormat["NUMBER"] = 2] = "NUMBER";
    FieldFormat[FieldFormat["PERCENT"] = 3] = "PERCENT";
})(FieldFormat || (FieldFormat = {}));
this.FieldFormat = FieldFormat;
var UIField = (function (_super) {
    __extends(UIField, _super);
    function UIField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.relationshipPointer = false;
        this.fieldFormat = FieldFormat.GENERAL;
        this.setID("uifield_");
        this.addEventPublication("fieldChanged");
    }
    UIField.prototype.fieldChanged = function (newValue, oldValue) {
        var theParent = this.getData();
        if (this.getCallback()) {
            var callback = this.getCallback();
            return callback(this, theParent, newValue, oldValue);
        }
        this.valueChanged(theParent, newValue, oldValue);
        this.publish("fieldChanged", { newValue: newValue, oldValue: oldValue });
    };
    UIField.prototype.setClassType = function (classType) {
        this.listType = classType;
    };
    UIField.prototype.getClassType = function () {
        return this.listType;
    };
    UIField.prototype.setUpdateField = function (theFieldName) {
        this.updateField = theFieldName;
    };
    UIField.prototype.getUpdateField = function () {
        return this.updateField;
    };
    UIField.prototype.setFieldFormat = function (theFormat) {
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
    };
    UIField.prototype.setValue = function (value) {
        if ($$(this.componentID)) {
            $$(this.componentID).blockEvent();
            $$(this.componentID).setValue(value);
            $$(this.componentID).unblockEvent();
        }
        this.fieldValue = value;
    };
    UIField.prototype.defineEvents = function () {
        this.attachEvent(this.componentID, "onChange", UIEventHandler.FieldChanged);
    };
    UIField.prototype.getValue = function () {
        return this.fieldValue;
    };
    UIField.prototype.blankValue = function () {
        if ($$(this.componentID)) {
            $$(this.componentID).setValue("");
        }
        this.fieldValue = "";
    };
    UIField.prototype.valueChanged = function (parentComponent, newValue, oldValue) {
        if (!this.isValid())
            return;
        if (!this.updateField)
            return;
        var theObject = Factory.CreateProxyInstance(parentComponent.getObject().classType);
        theObject.updateAttribute(parentComponent.getObject()._id, this.updateField, newValue);
        UI.Message("Record Updated");
    };
    return UIField;
}(UIComponent));
this.UIField = UIField;
var UICounterField = (function (_super) {
    __extends(UICounterField, _super);
    function UICounterField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UICounterField_");
    }
    UICounterField.prototype.fieldChanged = function (newv, oldv) {
        this.publish("fieldChanged", { newValue: newv, oldValue: oldv });
    };
    UICounterField.prototype.getView = function () {
        this.componentView = this.createView({
            id: this.componentID, view: "counter"
        });
        return this.componentView;
    };
    UICounterField.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
    };
    return UICounterField;
}(UIField));
this.UICounterField = UICounterField;
var UILabel = (function (_super) {
    __extends(UILabel, _super);
    function UILabel(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.alignment = "center";
        this.setID("UILabel_");
    }
    UILabel.prototype.setComponent = function (label, alignment, labelWidth) {
        if (alignment === void 0) { alignment = "center"; }
        if (labelWidth === void 0) { labelWidth = 100; }
        this.addProperties({ label: label, alignment: alignment, labelWidth: labelWidth });
    };
    UILabel.prototype.getView = function () {
        this.componentView = this.createView({
            id: this.componentID, view: "label"
        });
        return this.componentView;
    };
    return UILabel;
}(UIComponent));
this.UILabel = UILabel;
var UIDateField = (function (_super) {
    __extends(UIDateField, _super);
    function UIDateField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("uiDateField_");
    }
    UIDateField.prototype.getView = function () {
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
    };
    UIDateField.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UIDateField.prototype.definEvents = function () {
    };
    return UIDateField;
}(UIField));
this.UIDateField = UIDateField;
var UISliderField = (function (_super) {
    __extends(UISliderField, _super);
    function UISliderField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UISliderField");
    }
    UISliderField.prototype.setComponent = function (label, value, data, callback, updateField, minValue, maxValue, step) {
        if (updateField === void 0) { updateField = null; }
        if (minValue === void 0) { minValue = 0; }
        if (maxValue === void 0) { maxValue = 1; }
        if (step === void 0) { step = .1; }
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.updateField = updateField;
        this.setProperty("min", minValue);
        this.setProperty("max", maxValue);
        this.setProperty("step", step);
    };
    UISliderField.prototype.getView = function () {
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
    };
    UISliderField.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UISliderField.prototype.defineEvents = function () { };
    return UISliderField;
}(UIField));
this.UISliderField = UISliderField;
var UITextField = (function (_super) {
    __extends(UITextField, _super);
    function UITextField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.textArea = false;
        this.setID("uiTextField_");
        this.textArea = false;
    }
    UITextField.prototype.setTextArea = function (textArea) {
        this.textArea = textArea;
    };
    UITextField.prototype.setComponent = function (label, value, data, callback, updateField, textArea) {
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        if (updateField === void 0) { updateField = null; }
        if (textArea === void 0) { textArea = false; }
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.textArea = textArea;
        this.updateField = updateField;
    };
    UITextField.prototype.getView = function () {
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
    };
    UITextField.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UITextField.prototype.defineEvents = function () { };
    return UITextField;
}(UIField));
this.UITextField = UITextField;
var UINoteField = (function (_super) {
    __extends(UINoteField, _super);
    function UINoteField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UINoteField_");
        this.textArea = true;
    }
    return UINoteField;
}(UITextField));
this.UINoteField = UINoteField;
var UISelectList = (function (_super) {
    __extends(UISelectList, _super);
    function UISelectList(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("uiSelectList_");
    }
    UISelectList.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
        if ($$(this.componentID)) {
            $$(this.componentID).setValue(value);
        }
    };
    UISelectList.prototype.setSelectList = function (label, value, theList, data, callback, updateField) {
        this.setLabel(label);
        this.setValue(value);
        this.setList(theList);
        this.setData(data);
        this.setCallback(callback);
        this.setUpdateField(updateField);
    };
    UISelectList.prototype.getView = function () {
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
    };
    UISelectList.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
    };
    UISelectList.prototype.setList = function (theList) {
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
    };
    return UISelectList;
}(UIField));
this.UISelectList = UISelectList;
var UICheckbox = (function (_super) {
    __extends(UICheckbox, _super);
    function UICheckbox(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
    }
    UICheckbox.prototype.setComponent = function (label, value, data, callback) {
        if (value === void 0) { value = 0; }
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
    };
    UICheckbox.prototype.getView = function () {
        this.componentView = this.createView({
            id: this.getComponentID(),
            view: "checkbox",
            label: this.getLabel(),
            value: this.getValue(),
        });
        return this.componentView;
    };
    UICheckbox.prototype.onChange = function (newv, oldv) {
        this.publish("onChange", { newValue: newv, oldValue: oldv });
    };
    UICheckbox.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UICheckbox.prototype.defineEvents = function () {
    };
    return UICheckbox;
}(UIField));
this.UICheckbox = UICheckbox;
var UIJumpItem = (function () {
    function UIJumpItem() {
    }
    return UIJumpItem;
}());
var UIJumpBar = (function (_super) {
    __extends(UIJumpBar, _super);
    function UIJumpBar(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UIJumpBar_");
        this.jumpItemArray = new Array();
    }
    UIJumpBar.JumpCallback = function (id, event) {
        var theComponent = $$(id)["component"];
        var callback = null;
        theComponent.publish(theComponent.jumpItemArray[id].event);
        //    theComponent.jumpItemArray[id].callback(theComponent, theComponent.jumpItemArray[id].label);
    };
    UIJumpBar.prototype.getView = function () {
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
    };
    UIJumpBar.prototype.addItem = function (label, event, type, callback) {
        if (type === void 0) { type = "danger"; }
        if (callback === void 0) { callback = null; }
        var newItem = new UIJumpItem();
        newItem.id = "jumpButton_" + webix.uid();
        newItem.label = label;
        newItem.callback = callback;
        newItem.event = event;
        newItem.type = type;
        this.jumpItemArray[newItem.id] = newItem;
    };
    UIJumpBar.prototype.defineEvents = function () {
        for (var item in this.jumpItemArray) {
            if ($$(this.jumpItemArray[item].id))
                if (!$$(this.jumpItemArray[item].id).hasEvent("onItemClick"))
                    this.attachEvent(this.jumpItemArray[item].id, "onItemClick", UIJumpBar.JumpCallback);
        }
    };
    UIJumpBar.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
        for (var item in this.jumpItemArray) {
            if ($$(item)) {
                $$(item)["component"] = this;
                $$(item)["data"] = this.getData();
            }
        }
    };
    return UIJumpBar;
}(UIComponent));
this.UIJumpBar = UIJumpBar;
var UIToolbar = (function (_super) {
    __extends(UIToolbar, _super);
    function UIToolbar(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
    }
    UIToolbar.prototype.setToolBar = function (label, icon) {
        this.label = label;
        this.icon = icon;
    };
    UIToolbar.prototype.getView = function () {
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
    };
    UIToolbar.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
    };
    return UIToolbar;
}(UIJumpBar));
this.UIToolbar = UIToolbar;
var UIButton = (function (_super) {
    __extends(UIButton, _super);
    function UIButton(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UIButton_");
    }
    UIButton.prototype.onButtonClick = function (theComponent) {
        this.publish("click", this);
    };
    UIButton.prototype.setComponent = function (label, value, data, callback) {
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.color = "background-color : #FF9E9E";
    };
    UIButton.prototype.getView = function () {
        this.componentView = this.createView({
            id: this.componentID,
            view: "button",
            name: this.componentLabel,
            value: this.componentLabel,
            cssFormat: this.color,
        });
        return this.componentView;
    };
    UIButton.prototype.setLabel = function (theLabel) {
        _super.prototype.setLabel.call(this, theLabel);
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).value = theLabel;
            $$(this.getComponentID()).refresh();
        }
    };
    UIButton.prototype.setColor = function (value) {
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).$view.getElementsByTagName("button")[0].style.background = value;
            $$(this.getComponentID()).$view.getElementsByTagName("button")[0].style.borderColor = value;
        }
    };
    UIButton.prototype.defineEvents = function () {
        this.attachEvent(this.componentID, "onItemClick", UIEventHandler.OnButtonClick);
    };
    UIButton.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    return UIButton;
}(UIComponent));
this.UIButton = UIButton;
var UIDropZone = (function (_super) {
    __extends(UIDropZone, _super);
    function UIDropZone() {
        _super.call(this);
        this.setID("UIDropZone_");
    }
    UIDropZone.prototype.setComponent = function (label, value, data, callback, updateField) {
        if (updateField === void 0) { updateField = null; }
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
    };
    UIDropZone.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
        this.setInTheZone(false);
    };
    UIDropZone.prototype.setInTheZone = function (inZone) {
        if (inZone)
            $$(this.getComponentID()).define("css", "inTheDropZone");
        else
            $$(this.getComponentID()).define("css", "outOfTheDropZone");
    };
    UIDropZone.prototype.getView = function () {
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
    };
    UIDropZone.prototype.onBeforeDrop = function (message) {
        this.setInTheZone(false);
        return false;
    };
    UIDropZone.prototype.onBeforeDragIn = function (message) {
        this.setInTheZone(true);
        return true;
    };
    UIDropZone.prototype.onDragOut = function (message) {
        this.setInTheZone(false);
        return true;
    };
    UIDropZone.prototype.defineEvents = function () {
        this.attachEvent(this.componentID, "onBeforeDrop", UIEventHandler.OnBeforeDrop);
    };
    return UIDropZone;
}(UIComponent));
this.UIDropZone = UIDropZone;
var UIColorField = (function (_super) {
    __extends(UIColorField, _super);
    function UIColorField(properties) {
        _super.call(this, properties);
        this.setID("UIColorField_");
        this.addProperties(properties);
    }
    UIColorField.prototype.getView = function () {
        this.componentView = this.createView({
            id: this.componentID, view: "colorpicker"
        });
        return this.componentView;
    };
    UIColorField.prototype.defineEvents = function () {
    };
    UIColorField.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    return UIColorField;
}(UIField));
this.UIColorField = UIColorField;
var UIDataTableField = (function (_super) {
    __extends(UIDataTableField, _super);
    //endregion
    function UIDataTableField() {
        _super.call(this);
        this.isReference = false;
        this.referenceClassType = "";
        this.mapped = false;
        this.setID("UIDataTableField_");
        this.componentID = "dataTableField_" + webix.uid();
    }
    return UIDataTableField;
}(UIComponent));
this.UIDataTableField = UIDataTableField;
var UIDataTable = (function (_super) {
    __extends(UIDataTable, _super);
    function UIDataTable(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
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
    Object.defineProperty(UIDataTable.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (value) {
            this._template = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataTable.prototype, "showToolBar", {
        get: function () {
            return this._showToolBar;
        },
        set: function (value) {
            this._showToolBar = value;
        },
        enumerable: true,
        configurable: true
    });
    UIDataTable.MappedColumnLookup = function (obj) {
    };
    Object.defineProperty(UIDataTable.prototype, "multiSelect", {
        get: function () {
            return this._multiSelect;
        },
        set: function (value) {
            this._multiSelect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataTable.prototype, "autoColumnConfigure", {
        get: function () {
            return this._autoColumnConfigure;
        },
        set: function (value) {
            this._autoColumnConfigure = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataTable.prototype, "showAddDeleteColumns", {
        get: function () {
            return this._showAddDeleteColumns;
        },
        set: function (value) {
            this._showAddDeleteColumns = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataTable.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataTable.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: true,
        configurable: true
    });
    UIDataTable.prototype.hideColumn = function (columnID) {
        if ($$(this.dataTableID))
            $$(this.dataTableID).hideColumn(columnID);
    };
    UIDataTable.prototype.showColumn = function (columnID) {
        if ($$(this.dataTableID))
            $$(this.dataTableID).showColumn(columnID);
    };
    UIDataTable.prototype.newItem = function () {
        var theComponent = this;
        var objectProxy = Factory.CreateProxyInstance(theComponent.uiClassType);
        var name = "A New " + objectProxy.classLabel();
        var newID = objectProxy.addNew(name);
        var newObject = objectProxy.getOne(newID);
        var newRowID = $$(theComponent.dataTableID).add(newObject);
        $$(theComponent.dataTableID).showItem(newRowID);
        $$(theComponent.dataTableID).select(newRowID, false);
    };
    UIDataTable.prototype.deleteItem = function (theToolbar, label) {
        var theComponent = this;
        var rowid = $$(theComponent.dataTableID).getSelectedId();
        if (!rowid)
            return;
        var theObject = $$(theComponent.dataTableID).getItem(rowid);
        theComponent.handleDelete(theObject);
    };
    UIDataTable.prototype.options = function () {
        var theComponent = this;
        var rowid = $$(theComponent.dataTableID).getSelectedId();
        if (!rowid)
            return;
        var theObject = $$(theComponent.dataTableID).getItem(rowid);
        theComponent.handleDelete(theObject);
    };
    UIDataTable.prototype.getSelectedObject = function () {
        return this.getSelected()[0];
    };
    UIDataTable.prototype.getSelected = function () {
        if ($$(this.dataTableID)) {
            var idArray = $$(this.dataTableID).getSelectedItem(true);
            return idArray;
        }
        return null;
    };
    UIDataTable.prototype.onSelectChange = function (itemMessage) {
        this.publish("onSelectChange", itemMessage);
    };
    UIDataTable.prototype.addColumn = function (columnNumber, theColumn) {
        var newColumn = new UIDataTableField();
        newColumn.view = theColumn;
        newColumn.columnNumber = columnNumber;
        this.columns[columnNumber] = newColumn;
    };
    UIDataTable.prototype.addMappedColumn = function (columnNumber, referenceClassField, referenceFieldName, displayFieldName, theColumnView) {
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
    };
    UIDataTable.prototype.addReferenceColumn = function (columnNumber, referenceClassType, referenceFieldName, theColumnView) {
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
    };
    UIDataTable.prototype.addOptionColumn = function (columnNumber, optionList, theColumn) {
    };
    UIDataTable.prototype.setList = function (theList) {
        this.theList = theList;
        if ($$(this.dataTableID)) {
            $$(this.dataTableID).clearAll();
            $$(this.dataTableID).parse(this.theList);
        }
    };
    UIDataTable.prototype.setValue = function (theList) {
        this.setList(theList);
    };
    UIDataTable.prototype.setEditable = function (theFlag) {
        this.editable = theFlag;
    };
    UIDataTable.prototype.onStopEdit = function (theField) {
        if (this.publish("onStopEdit", theField))
            return;
        if (theField.newValue == theField.oldValue)
            return;
        if (this.uiClassType) {
            var objectProxy = Factory.CreateProxyInstance(this.uiClassType);
            objectProxy.updateAttribute(theField.rowObject._id, theField.columnName, theField.newValue);
        }
    };
    UIDataTable.prototype.refreshRow = function (rowID) {
        if ($$(this.dataTableID))
            $$(this.dataTableID).refresh(rowID);
    };
    UIDataTable.prototype.onBeforeEditStart = function (theField) {
        if (this.publish("onBeforeEditStart", theField))
            return;
    };
    UIDataTable.prototype.handleDelete = function (theObject) {
        UI.Message("Handle Delete" + theObject._id);
    };
    UIDataTable.prototype.createNavigationBar = function () {
        this.toolBar = new UIToolbar();
        this.toolBar.addItem("New", "newItem");
        this.toolBar.addItem("Delete", "deleteItem");
        this.toolBar.addItem("Options", "options");
        this.toolBar.addItem("Export", "export");
        this.toolBar.setData(this);
        if (this.uiClassType) {
            this.toolBar.setToolBar(Factory.GetClassLabel(this.uiClassType), Factory.GetClassIcon(this.uiClassType));
        }
    };
    UIDataTable.prototype.listen = function (event, object, publisher) {
        switch (event) {
            case "newItem":
            case "deleteItem":
            case "options":
                break;
            case "export":
                this.exportToExcel();
        }
    };
    UIDataTable.prototype.exportToExcel = function () {
        UI.ExportToExcel(this.dataTableID);
    };
    UIDataTable.prototype.getList = function () {
        if (this.theList)
            return this.theList;
        if (this.uiClassType) {
            var objectProxy = Factory.CreateProxyInstance(this.uiClassType);
            var returnList = objectProxy.getList(true);
            return returnList;
        }
        return new Array();
    };
    UIDataTable.prototype.createColumnView = function () {
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
    };
    UIDataTable.prototype.setColumns = function (columns) {
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
    };
    UIDataTable.prototype.replaceColumns = function (columns) {
        this.columns = new Array();
        var index = 0;
        for (var item in columns) {
            this.addColumn(index++, columns[item]);
        }
        $$(this.dataTableID).config.columns = this.createColumnView();
        ;
        $$(this.dataTableID).refreshColumns();
    };
    UIDataTable.prototype.sort = function (property, sortDirection, type) {
        if (type === void 0) { type = "string"; }
        if ($$(this.dataTableID))
            $$(this.dataTableID).sort(property, sortDirection, type);
    };
    UIDataTable.prototype.filter = function (func) {
        $$(this.dataTableID).filter(func);
    };
    UIDataTable.prototype.getView = function () {
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
    };
    UIDataTable.prototype.defineEvents = function () {
        this.attachEvent(this.dataTableID, "onSelectChange", UIEventHandler.onSelectChange);
        this.attachEvent(this.dataTableID, "onAfterEditStop", UIEventHandler.onAfterEditStop);
        this.attachEvent(this.dataTableID, "onItemDblClick", UIEventHandler.OnItemDblClick);
        this.attachEvent(this.dataTableID, "onBeforeEditStart", UIEventHandler.onBeforeEditStartTable);
        this.attachEvent(this.dataTableID, "onItemClick", UIEventHandler.OnItemClick);
    };
    UIDataTable.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        var resultList = this.getList();
        if (resultList)
            if ($$(this.dataTableID))
                $$(this.dataTableID).parse(resultList);
        if ($$(this.dataTableID))
            $$(this.dataTableID)["component"] = this;
        if (this._showToolBar)
            this.toolBar.initialize();
        this.defineEvents();
    };
    UIDataTable.prototype.getTableList = function () {
        var datatable = $$(this.dataTableID);
        var dataList = new Array();
        $$(this.dataTableID).eachRow(function (row) {
            var item = datatable.getItem(row);
            dataList.push(item);
        });
        return dataList;
    };
    return UIDataTable;
}(UIComponent));
this.UIDataTable = UIDataTable;
var UITreeTable = (function (_super) {
    __extends(UITreeTable, _super);
    function UITreeTable(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UITreeTable_");
        this.columns = new Array();
        this.dataTableID = "treeTable_" + webix.uid();
        this.showAddDeleteColumns = false;
        this.viewType = "treetable";
    }
    return UITreeTable;
}(UIDataTable));
this.UITreeTable = UITreeTable;
var UICalendarField = (function (_super) {
    __extends(UICalendarField, _super);
    function UICalendarField(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UICalendarField_");
    }
    UICalendarField.prototype.setComponent = function (label, value, data, callback, updateField) {
        if (updateField === void 0) { updateField = null; }
        this.setLabel(label);
        this.setValue(value);
        this.setData(data);
        this.setCallback(callback);
        this.updateField = updateField;
    };
    UICalendarField.prototype.getView = function () {
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
    };
    UICalendarField.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
    };
    return UICalendarField;
}(UIField));
this.UICalendarField = UICalendarField;
var UIComplexComponent = (function (_super) {
    __extends(UIComplexComponent, _super);
    function UIComplexComponent(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.setID("UIComplexComponent_");
        this.componentArray = new Array();
    }
    UIComplexComponent.prototype.addComponent = function (label, component) {
        this.componentArray[label] = component;
        if (component)
            component.setProperty("name", label);
    };
    UIComplexComponent.prototype.createComponentsView = function () {
        var viewArray = new Array();
        var i = 0;
        for (var item in this.componentArray) {
            if (item != "toolbar")
                viewArray[i++] = this.componentArray[item].getView();
        }
        return viewArray;
    };
    UIComplexComponent.prototype.numOfComponents = function () {
        return Object.keys(this.componentArray).length;
    };
    UIComplexComponent.prototype.getComponent = function (label) {
        var component = this.componentArray[label];
        return component;
    };
    UIComplexComponent.prototype.getFieldComponent = function (label) {
        var component = this.componentArray[label];
        return component;
    };
    UIComplexComponent.prototype.defineEvents = function () { };
    UIComplexComponent.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        for (var item in this.componentArray) {
            this.componentArray[item].initialize();
            this.componentArray[item].setData(this);
        }
    };
    UIComplexComponent.prototype.destroyView = function () {
        if ($$(this.componentID))
            $$(this.componentID).destructor();
    };
    UIComplexComponent.prototype.destructor = function () {
        _super.prototype.destructor.call(this);
        for (var item in this.componentArray) {
            this.componentArray[item].destructor();
        }
    };
    return UIComplexComponent;
}(UIComponent));
this.UIComplexComponent = UIComplexComponent;
var PortalSection = (function (_super) {
    __extends(PortalSection, _super);
    function PortalSection(name) {
        if (name === void 0) { name = "noSectionName"; }
        _super.call(this);
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
    PortalSection.CreateColumns = function () {
        return new PortalColumn();
    };
    PortalSection.CreateRows = function () {
        return new PortalRow();
    };
    PortalSection.CreateRoot = function () {
        return new PortalRoot();
    };
    Object.defineProperty(PortalSection.prototype, "scrollBarX", {
        //endregion
        get: function () {
            return this._scrollBarX;
        },
        set: function (value) {
            this._scrollBarX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalSection.prototype, "scrollBarY", {
        get: function () {
            return this._scrollBarY;
        },
        set: function (value) {
            this._scrollBarY = value;
        },
        enumerable: true,
        configurable: true
    });
    PortalSection.prototype.addPortlet = function (name, gravity) {
        if (gravity === void 0) { gravity = 1; }
        var portlet = new Portlet(name, gravity);
        this.theArray.push(portlet);
        return portlet;
    };
    PortalSection.prototype.addSection = function (theSection, gravity) {
        if (gravity === void 0) { gravity = 1; }
        this.theArray.push(theSection);
        this.gravity = gravity;
    };
    PortalSection.prototype.addResizer = function () {
        var resizer = new PortalResizer();
        this.theArray.push(resizer);
        return resizer;
    };
    PortalSection.prototype.addHeader = function (title) {
        var header = new PortalHeader(title);
        this.theArray.unshift(header);
        this.sectionHeader = header;
        return header;
    };
    PortalSection.prototype.removeHeader = function () {
        if (!this.sectionHeader)
            return;
        this.theArray.shift();
    };
    //region UIComponent Methods
    PortalSection.prototype.getView = function () {
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
    };
    PortalSection.prototype.defineEvents = function () {
    };
    PortalSection.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
        for (var item in this.theArray) {
            this.theArray[item].initialize();
        }
    };
    //endregion
    //region Class Variables
    PortalSection.COLUMNS = "cols";
    PortalSection.ROWS = "rows";
    PortalSection.RESIZER = "resizer";
    PortalSection.ROOT = "root;";
    PortalSection.HEADER = "header";
    PortalSection.PORTLET = "portlet";
    return PortalSection;
}(UIComponent));
this.PortalSection = PortalSection;
var PortalColumn = (function (_super) {
    __extends(PortalColumn, _super);
    function PortalColumn(name) {
        _super.call(this, name);
        this.portalSectionIndex = PortalSection.COLUMNS;
        this.classType = PortalSection.COLUMNS;
        this.setID("PortalColumn_");
    }
    return PortalColumn;
}(PortalSection));
this.PortalColumn = PortalColumn;
var PortalRoot = (function (_super) {
    __extends(PortalRoot, _super);
    function PortalRoot(name) {
        _super.call(this, name);
        this.portalSectionIndex = PortalSection.ROOT;
        this.classType = "root";
        this.setID("PortalRoot_");
    }
    return PortalRoot;
}(PortalSection));
this.PortalRoot = PortalRoot;
var PortalRow = (function (_super) {
    __extends(PortalRow, _super);
    function PortalRow(name) {
        _super.call(this, name);
        this.portalSectionIndex = PortalSection.ROWS;
        this.classType = "row";
        this.setID("PortalRow_");
    }
    return PortalRow;
}(PortalSection));
this.PortalRow = PortalRow;
var PortalHeader = (function (_super) {
    __extends(PortalHeader, _super);
    function PortalHeader(title) {
        _super.call(this);
        this.headerTemplate = { view: "template", template: "Header", type: "header" };
        this.headerText = null;
        this.setID("PortalHeader_");
        this.portalSectionIndex = PortalSection.HEADER;
        this.classType = PortalSection.HEADER;
        this.headerTemplate["id"] = "header_" + webix.uid();
        this.headerTemplate["template"] = title;
        this.headerText = title;
    }
    PortalHeader.prototype.getView = function () {
        return this.headerTemplate;
    };
    return PortalHeader;
}(PortalSection));
this.PortalHeader = PortalHeader;
var PortalResizer = (function (_super) {
    __extends(PortalResizer, _super);
    function PortalResizer(name) {
        _super.call(this, name);
        this.resizerTemplate = { view: "resizer" };
        this.setID("PortalResizer_");
        this.portalSectionIndex = PortalSection.RESIZER;
        this.classType = PortalSection.RESIZER;
        this.resizerTemplate["id"] = "uiResizer_" + webix.uid();
    }
    PortalResizer.prototype.getView = function () {
        return this.resizerTemplate;
    };
    return PortalResizer;
}(PortalSection));
this.PortalResizer = PortalResizer;
var Portlet = (function (_super) {
    __extends(Portlet, _super);
    function Portlet(portletName, gravity) {
        if (gravity === void 0) { gravity = 1; }
        _super.call(this, portletName);
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
    Portlet.cast = function (aSection) {
        return aSection;
    };
    Portlet.prototype.replaceView = function () {
        // console.log(JSON.stringify(this.getView(), null, 6));
        webix.ui(this.getView(), $$(this.componentID));
        this.initialize();
        // console.log(JSON.stringify(this.getView(), null, 6));
    };
    Portlet.prototype.hide = function () {
        this.hidden = true;
    };
    Portlet.prototype.show = function () {
        this.hidden = false;
    };
    Portlet.prototype.resetView = function () {
        this.portletView = this.defaultPortletView;
    };
    Portlet.prototype.setComponent = function (theComponent) {
        this.viewController = theComponent;
    };
    Portlet.prototype.resize = function () {
        if ($$(this.componentID)) {
            $$(this.componentID).resize();
        }
    };
    //region UIComponents Methods
    Portlet.prototype.getView = function () {
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
    };
    Portlet.prototype.defineEvents = function () {
    };
    Portlet.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
        if (this.viewController) {
            this.viewController.initialize();
        }
        for (var item in this.theArray) {
            this.theArray[item].initialize();
        }
    };
    return Portlet;
}(PortalSection));
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
var Portal = (function (_super) {
    __extends(Portal, _super);
    function Portal(portalType) {
        _super.call(this);
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
    Portal.prototype.portalString = function (portalNames) {
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
    };
    Portal.prototype.initializeExplorerView = function () {
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
    };
    Portal.prototype.initializeOneView = function () {
        var root = this.getRoot();
        var newColumn = this.createColumns("columns");
        root.addSection(newColumn);
        newColumn.addPortlet(this.portalString(PortalNames.MAIN));
    };
    Portal.prototype.initializeDetailView = function () {
        var root = this.getRoot();
        var newRow = this.createRows("rows");
        root.addSection(newRow);
        newRow.addPortlet(this.portalString(PortalNames.DETAIL));
        newRow.addResizer();
        newRow.addPortlet(this.portalString(PortalNames.INFO));
    };
    Portal.prototype.getRoot = function () {
        return this.portalRoot;
    };
    Portal.prototype.createColumns = function (name) {
        return new PortalColumn(name);
    };
    Portal.prototype.createRows = function (name) {
        return new PortalRow(name);
    };
    Portal.prototype.setContainer = function (containerID) {
        this.portalContainer = containerID;
        this.viewPortlet = null;
    };
    Portal.prototype.setViewPortlet = function (thePortlet) {
        this.viewPortlet = thePortlet;
        this.portalContainer = "";
    };
    Portal.prototype.getPortlet = function (portalName) {
        return Portlet.cast(this.find(this.portalRoot, portalName));
    };
    Portal.prototype.find = function (portalSection, name) {
        for (var item in portalSection.theArray) {
            if (portalSection.theArray[item].portletName == name)
                return portalSection.theArray[item];
            var result = this.find(portalSection.theArray[item], name);
            if (result)
                return result;
        }
        return null;
    };
    Portal.prototype.getView = function () {
        var viewArray = new Array();
        var theView = this.sectionTemplate;
        theView["id"] = this.getComponentID();
        viewArray[0] = this.createPortalView();
        theView["rows"] = viewArray;
        if (this.viewType)
            theView["view"] = this.viewType;
        this.setComponentView(theView);
        return this.componentView;
    };
    Portal.prototype.createPortalView = function () {
        var thePortalView;
        var resultArray = this.tree(this.portalRoot);
        return resultArray[0];
    };
    Portal.prototype.tree = function (portalSection) {
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
    };
    Portal.prototype.initializeTree = function () {
        var returnArray = new Array();
        for (var item in this.portalRoot.theArray) {
            this.portalRoot.theArray[item].initialize();
        }
        return returnArray;
    };
    Portal.prototype.refresh = function () {
        this.show();
    };
    Portal.prototype.show = function (theWindow) {
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
    };
    Portal.prototype.popup = function (theWindow) {
        var showView = this.getView();
        var rows = new Array();
        rows[0] = showView;
        theWindow["body"] = C4Object.Clone(showView);
        //console.log(JSON.stringify(theWindow));
        var newWindow = webix.ui(theWindow);
        return newWindow;
    };
    Portal.prototype.defineEvents = function () {
    };
    Portal.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
        this.initializeTree();
    };
    return Portal;
}(UIComponent));
this.Portal = Portal;
var UIPopupWindow = (function (_super) {
    __extends(UIPopupWindow, _super);
    //endregion
    function UIPopupWindow(label, theComponent) {
        if (label === void 0) { label = "Popup Window"; }
        if (theComponent === void 0) { theComponent = null; }
        _super.call(this);
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
    UIPopupWindow.CloseButton = function () {
        var theID = this["config"].id;
        var theComponent = $$(theID)["component"];
        $$(theComponent.getComponentID()).close();
    };
    UIPopupWindow.FullScreen = function () {
        var theID = this["config"].id;
        var theComponent = $$(theID)["component"];
        theComponent.fullscreenToggle();
    };
    UIPopupWindow.prototype.setComponent = function (theComponent) {
        this.theComponent = theComponent;
        this.thePortal.getPortlet("main").setComponent(theComponent);
        this.addComponent("component", theComponent);
    };
    UIPopupWindow.prototype.show = function (theComponent) {
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
    };
    UIPopupWindow.prototype.fullscreenToggle = function () {
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).config.fullscreen = !$$(this.getComponentID()).config.fullscreen;
            $$(this.getComponentID()).resize();
        }
    };
    UIPopupWindow.prototype.hide = function () {
        this.publish("close", this);
        UI.PlaySound(Sounds.CloseDiagram);
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).hide();
        }
    };
    UIPopupWindow.prototype.close = function () {
        this.publish("close", this);
        if ($$(this.theComponent.getComponentID())) {
            $$(this.theComponent.getComponentID()).destructor();
        }
        UI.PlaySound(Sounds.CloseDiagram);
        if ($$(this.getComponentID())) {
            $$(this.getComponentID()).close();
        }
    };
    //region UIComponent Methods
    UIPopupWindow.prototype.getView = function () {
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
    };
    UIPopupWindow.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        // this.theComponent.initialize();
        $$(this.closeButtonID)["component"] = this;
        $$(this.fullscreenID)["component"] = this;
        $$(this.componentID)["component"] = this;
    };
    return UIPopupWindow;
}(UIComplexComponent));
this.UIPopupWindow = UIPopupWindow;
var ConfirmAction = (function () {
    function ConfirmAction() {
    }
    return ConfirmAction;
}());
this.ConfirmAction = ConfirmAction;
var UIConfirmWindow = (function (_super) {
    __extends(UIConfirmWindow, _super);
    function UIConfirmWindow(title, statement, option1, option2, option3) {
        if (option2 === void 0) { option2 = null; }
        if (option3 === void 0) { option3 = null; }
        _super.call(this);
        this.title = title;
        this.statement = statement;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
    }
    UIConfirmWindow.prototype.close = function () {
        this.popup.close();
    };
    UIConfirmWindow.prototype.listen = function (event, object, caller) {
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
    };
    UIConfirmWindow.prototype.getView = function () {
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
    };
    UIConfirmWindow.prototype.show = function () {
        this.popup = new UIPopupWindow("Confirmation", this);
        this.popup.subscribe("close", this);
        this.popup.show();
    };
    UIConfirmWindow.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UIConfirmWindow.prototype.defineEvents = function () {
        this.getComponent("option1").subscribe("click", this);
        if (this.getComponent("option2"))
            this.getComponent("option2").subscribe("click", this);
        if (this.getComponent("option3"))
            this.getComponent("option3").subscribe("click", this);
    };
    return UIConfirmWindow;
}(UIComplexComponent));
this.UIConfirmWindow = UIConfirmWindow;
var UIMultiView = (function (_super) {
    __extends(UIMultiView, _super);
    function UIMultiView() {
        _super.call(this);
        this.setID("UIMultiView_");
    }
    UIMultiView.prototype.addView = function (label, component) {
        this.addComponent(label, component);
    };
    UIMultiView.prototype.setRelationshipObject = function (theObject) {
        _super.prototype.setRelationshipObject.call(this, theObject);
        for (var item in this.componentArray[item]) {
            this.componentArray[item].setRelationshipObject(this.getRelationshipObject());
        }
    };
    UIMultiView.prototype.createComponentsView = function () {
        var viewArray = new Array();
        var i = 0;
        for (var item in this.componentArray) {
            if (item != "toolbar")
                viewArray[i++] = {
                    header: item, body: this.componentArray[item].getView()
                };
        }
        return viewArray;
    };
    UIMultiView.prototype.getView = function () {
        this.componentView = {
            id: this.getComponentID(), view: "tabview", animate: true, cells: this.createComponentsView()
        };
        return this.componentView;
    };
    return UIMultiView;
}(UIComplexComponent));
this.UIMultiView = UIMultiView;
var UIMenu = (function (_super) {
    __extends(UIMenu, _super);
    function UIMenu(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.menuItems = new Array();
    }
    UIMenu.prototype.addMenuItem = function (menu) {
        menu["id"] = webix.uid() + "_menu";
        this.menuItems.push(menu);
    };
    return UIMenu;
}(UIComplexComponent));
this.UIMenu = UIMenu;
var TabViewCell = (function () {
    function TabViewCell() {
    }
    return TabViewCell;
}());
var UITabView = (function (_super) {
    __extends(UITabView, _super);
    function UITabView(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.animate = true;
        this.closeAble = true;
        this.fitBiggest = true;
        this.setID("UITabView_");
        this.cells = new Array();
    }
    UITabView.prototype.addView = function (name, properties, component) {
        var cell = new TabViewCell();
        cell.properties = properties;
        cell.component = component;
        cell.name = name;
        this.cells[name] = cell;
        this.addComponent(name, component);
    };
    UITabView.prototype.listen = function (event, data, caller) {
        switch (event) {
            case "eventName":
            default:
                UI.Info(event);
                break;
        }
    };
    UITabView.prototype.createCells = function () {
        var cellArray = new Array();
        for (var item in this.cells) {
            var cell = { body: this.cells[item].component.getView() };
            for (var property in this.cells[item].properties) {
                cell[property] = this.cells[item].properties[property];
            }
            cellArray.push(cell);
        }
        return cellArray;
    };
    UITabView.prototype.getView = function () {
        this.componentView = this.createView({
            id: this.componentID,
            view: "tabview",
            multiview: { animate: this.animate, fitBiggest: this.fitBiggest },
            close: this.closeAble,
            tabbar: { popupWidth: 300, tabMinWidth: 120 },
            cells: this.createCells()
        });
        return this.componentView;
    };
    UITabView.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UITabView.prototype.defineEvents = function () { };
    UITabView.prototype.show = function () {
        this.popup = new UIPopupWindow("Component Label ");
        this.popup.show(this);
    };
    return UITabView;
}(UIComplexComponent));
this.UITabView = UITabView;
Factory.AddStringToClass("UITabView", UITabView);
var UIList = (function (_super) {
    __extends(UIList, _super);
    function UIList(properties) {
        if (properties === void 0) { properties = null; }
        _super.call(this, properties);
        this.columnName = null;
        this.table = null;
        this.dataArray = null;
        this.setID("UIList_");
    }
    UIList.prototype.setList = function (data) {
    };
    UIList.prototype.listen = function (event, data, caller) {
        switch (event) {
            case "itemClick": {
                this.itemChange(data);
            }
            default:
                UI.Info(event);
                break;
        }
    };
    UIList.prototype.itemChange = function (item) {
        var status = item.objectArray[0]["status"];
        item.objectArray[0]["status"] = !status;
        this.getComponent("table").refreshRow(item.rowID);
        this.publish("itemChange", item);
    };
    UIList.prototype.set = function (name, dataArray) {
        this.columnName = name;
        this.dataArray = dataArray;
    };
    UIList.prototype.getView = function () {
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
    };
    UIList.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        this.defineEvents();
    };
    UIList.prototype.defineEvents = function () {
        if (this.getComponent("table")) {
            this.getComponent("table").subscribe("onItemClick", this, "itemClick");
        }
    };
    UIList.prototype.show = function () {
        this.popup = new UIPopupWindow(this.columnName + " List ");
        this.popup.modal = false;
        this.popup.show(this);
    };
    return UIList;
}(UIComplexComponent));
this.UIList = UIList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUJfR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQUJfR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXdFO0FBUXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRXJCO0lBQUE7SUFPQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEO0lBQUE7SUF3TkEsQ0FBQztJQXZOYyw4QkFBZSxHQUE3QixjQUFrQyxDQUFDO0lBQ3JCLDJCQUFZLEdBQTFCLFVBQTJCLFFBQVksRUFBRSxRQUFRO1FBQ2hELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ2EsZ0NBQWlCLEdBQS9CLFVBQWdDLE9BQU87UUFDdEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksV0FBdUIsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsTUFBTSxHQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxjQUFj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QUFDO0lBQ0YsQ0FBQztJQUNNLHFCQUFJLEdBQVg7UUFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQXpFRCxDQUFxQixrQkFBa0IsR0F5RXRDO0FBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxyXG5kZWNsYXJlIHZhciB0b2FzdHI6YW55O1xyXG5kZWNsYXJlIHZhciBDNGZvdXI6YW55O1xyXG5kZWNsYXJlIHZhciBmaW5kQ2xhc3NUeXBlOmFueTtcclxuZGVjbGFyZSB2YXIgZmluZElEOmFueTtcclxuZGVjbGFyZSB2YXIgRmluZElUOmFueTtcclxuXHJcbmRlY2xhcmUgdmFyIGJ1eno6YW55O1xyXG5jb25zb2xlLmxvZyhcIkxvYWRpbmcgZ3VpLnRzIC4uLlwiKTtcclxuZmluZENsYXNzVHlwZSA9IG51bGw7XHJcblxyXG5jbGFzcyBEcm9wTWVzc2FnZSB7XHJcblx0cHVibGljIGZyb21PYmplY3RzOkFycmF5PGFueT47XHJcblx0cHVibGljIGZyb21Db21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0cHVibGljIHRvQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cdHB1YmxpYyB0b09iamVjdDphbnk7XHJcblx0cHVibGljIGNvbnRleHQ6YW55O1xyXG5cdHB1YmxpYyBldjphbnk7XHJcbn1cclxuXHJcbmNsYXNzIFVJRXZlbnRIYW5kbGVyIHtcclxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJUYWJDbGljaygpIHsgfVxyXG5cdHB1YmxpYyBzdGF0aWMgRmllbGRDaGFuZ2VkKG5ld1ZhbHVlOmFueSwgb2xkVmFsdWUpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnRJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ICAgPSA8VUlUZXh0RmllbGQ+ICQkKHRoZUNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHRoZUNvbXBvbmVudC5maWVsZENoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTpEcm9wTWVzc2FnZSB7XHJcblx0XHR2YXIgZnJvbUlEOnN0cmluZztcclxuXHRcdHZhciBmcm9tQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cdFx0dmFyIHRvQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cdFx0dmFyIGFycmF5T2ZPYmplY3RzID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciB0b09iamVjdDtcclxuXHRcdGZyb21JRCAgID0gY29udGV4dFtcImZyb21cIl0uY29uZmlnLmlkO1xyXG5cdFx0dmFyIHRvSUQgPSBjb250ZXh0W1widG9cIl0uY29uZmlnLmlkO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0LnNvdXJjZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcnJheU9mT2JqZWN0cy5wdXNoKGNvbnRleHQuZnJvbS5nZXRJdGVtKGNvbnRleHQuc291cmNlW2ldKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCQoZnJvbUlEKSkgZnJvbUNvbXBvbmVudCA9ICQkKGZyb21JRClbXCJjb21wb25lbnRcIl07XHJcblx0XHRpZiAoJCQodG9JRCkpIHRvQ29tcG9uZW50ID0gJCQodG9JRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBuZXcgRHJvcE1lc3NhZ2UoKTtcclxuXHRcdGRyb3BNZXNzYWdlLmZyb21Db21wb25lbnQgPSBmcm9tQ29tcG9uZW50O1xyXG5cdFx0ZHJvcE1lc3NhZ2UudG9Db21wb25lbnQgICA9IHRvQ29tcG9uZW50O1xyXG5cdFx0ZHJvcE1lc3NhZ2UuZnJvbU9iamVjdHMgICA9IGFycmF5T2ZPYmplY3RzO1xyXG5cdFx0aWYgKGNvbnRleHQudGFyZ2V0ID09IG51bGwpXHJcblx0XHRcdGRyb3BNZXNzYWdlLnRvT2JqZWN0ID0gbnVsbDsgZWxzZSB7XHJcblx0XHRcdGRyb3BNZXNzYWdlLnRvT2JqZWN0ID0gJCQodG9JRCkuZ2V0SXRlbShjb250ZXh0LnRhcmdldC5yb3cpO1xyXG5cdFx0fVxyXG5cdFx0ZHJvcE1lc3NhZ2UuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0XHRkcm9wTWVzc2FnZS5ldiAgICAgID0gbnVsbDtcclxuXHRcdHJldHVybiBkcm9wTWVzc2FnZTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkJlZm9yZURyYWdJbihjb250ZXh0LCBldmVudCkge1xyXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XHJcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJhZ0luID09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyYWdJbihkcm9wTWVzc2FnZSk7IGVsc2Uge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBvbkRyYWdPdXQoY29udGV4dCwgZXZlbnQpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xyXG5cdFx0VUkuSW5mbyhcIk9uRHJhZ091dCBTdGF0aWNcIilcclxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xyXG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQgPT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dChkcm9wTWVzc2FnZSk7IGVsc2Uge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBvbkJlZm9yZURyb3AoY29udGV4dCwgZXYpIHtcclxuXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlckRyb3AyKGNvbnRleHQsIGV2KSB7XHJcblxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJEcm9wKGNvbnRleHQsIGV2ZW50KSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcclxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xyXG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkFmdGVyRHJvcCA9PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25BZnRlckRyb3AoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25CdXR0b25DbGljayhpZDpzdHJpbmcsIGV2ZW50KSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50SUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0aWYgKCEkJCh0aGVDb21wb25lbnRJRCkpIHJldHVybjtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlCdXR0b24+ICQkKHRoZUNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHRoZUNvbXBvbmVudC5vbkJ1dHRvbkNsaWNrKHRoZUNvbXBvbmVudCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25EcmFnT3V0KGNvbnRleHQsIGV2ZW50KSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcclxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xyXG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQgPT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dChkcm9wTWVzc2FnZSk7IGVsc2Uge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkJlZm9yZURyb3AoY29udGV4dCwgZXZlbnQpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xyXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XHJcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJvcCA9PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcm9wKGRyb3BNZXNzYWdlKTsgZWxzZSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQ2xpY2soZXY6YW55LCBpZDpzdHJpbmcpIHtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkl0ZW1EYmxDbGljayhpZCxldixub2RlKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgc2VsZWN0ZWRPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0oaWQucm93KTtcclxuXHRcdHZhciBpdGVtTWVzc2FnZSA9IG5ldyBJdGVtU2VsZWN0ZWRFdmVudCgpO1xyXG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkucHVzaChzZWxlY3RlZE9iamVjdCk7XHJcblx0XHR0aGVDb21wb25lbnQub25JdGVtRGJsQ2xpY2soaXRlbU1lc3NhZ2UpIDtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkl0ZW1DbGljayhpZDphbnksIGV2OmFueSwgbm9kZTphbnkpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciBzZWxlY3RlZE9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShpZC5yb3cpO1xyXG5cdFx0dmFyIGl0ZW1NZXNzYWdlID0gbmV3IEl0ZW1TZWxlY3RlZEV2ZW50KCk7XHJcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheS5wdXNoKHNlbGVjdGVkT2JqZWN0KTtcclxuXHRcdGl0ZW1NZXNzYWdlLnJvd0lEID0gaWQucm93O1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uSXRlbUNsaWNrKGl0ZW1NZXNzYWdlKSA7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgb25TZWxlY3RDaGFuZ2UoKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgcm93aWQgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSWQodHJ1ZSk7XHJcblx0XHR2YXIgc2VsZWN0ZWRPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uU2VsZWN0Q2hhbmdlKHJvd2lkLCBzZWxlY3RlZE9iamVjdClcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBvbkFmdGVyRWRpdFN0b3Aoc3RhdGUsIGVkaXRvciwgaWdub3JlVXBkYXRlKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgdGhlQ29sdW1uICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdHRoZUNvbHVtbi5jb2x1bW5OYW1lID0gZWRpdG9yLmNvbHVtbjtcclxuXHRcdHRoZUNvbHVtbi5vbGRWYWx1ZSAgID0gc3RhdGUub2xkO1xyXG5cdFx0dGhlQ29sdW1uLm5ld1ZhbHVlICAgPSBzdGF0ZS52YWx1ZTtcclxuXHRcdHRoZUNvbHVtbi5yb3dPYmplY3QgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKGVkaXRvci5yb3cpO1xyXG5cdFx0dGhlQ29sdW1uLmVkaXRvciAgICAgPSBlZGl0b3I7XHJcblx0XHR0aGVDb21wb25lbnQub25TdG9wRWRpdCh0aGVDb2x1bW4pO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIG9uQmVmb3JlRWRpdFN0YXJ0VGFibGUoaWQgOiBhbnkpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciByb3cgPSBpZC5yb3c7XHJcblx0XHR2YXIgY29sdW1uID0gaWQuY29sdW1uO1xyXG5cdFx0dmFyIHJvd0l0ZW0gPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKS5nZXRJdGVtKHJvdyk7XHJcblx0XHR2YXIgdGhlQ29sdW1uICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHJcblx0XHR0aGVDb2x1bW4uY29sdW1uTmFtZSA9IGNvbHVtbjtcclxuXHRcdHRoZUNvbHVtbi5vbGRWYWx1ZSA9IG51bGw7XHJcblx0XHR0aGVDb2x1bW4ubmV3VmFsdWUgPSBudWxsO1xyXG5cdFx0dGhlQ29sdW1uLnJvd09iamVjdCA9IHJvd0l0ZW07XHJcblx0XHR0aGVDb21wb25lbnQub25CZWZvcmVFZGl0U3RhcnQodGhlQ29sdW1uKTtcclxuXHJcblx0XHRpZiAocm93SXRlbVtcImJlZm9yZUVkaXRTdGFydFJldHVyblwiXSE9bnVsbCkgcmV0dXJuIHJvd0l0ZW1bXCJiZWZvcmVFZGl0U3RhcnRSZXR1cm5cIl07XHJcblxyXG5cdFx0cmV0dXJuICFyb3dJdGVtW2NvbHVtbitcIlJlYWRPbmx5XCJdO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQ2hhbmdlKG5ld3YsIG9sZHYpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHRoZUNvbXBvbmVudC5vbkNoYW5nZShuZXd2LCBvbGR2KTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBNZW51SGFuZGxlcihpZCwgY29udGV4dCkge1xyXG5cdFx0dmFyIHRoZUlEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlDb250ZXh0TWVudT4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIGp1bXBJdGVtID0gdGhlQ29tcG9uZW50LmdldE1lbnVJdGVtKGlkKTtcclxuXHRcdHZhciB0aGVPYmplY3QgPSB0aGVDb21wb25lbnQub3duaW5nQ29tcG9uZW50LmdldFNlbGVjdGVkT2JqZWN0KCk7XHJcblx0XHRpZiAoIWp1bXBJdGVtLmNhbGxiYWNrKSByZXR1cm47XHJcblx0XHRqdW1wSXRlbS5jYWxsYmFjayhpZCwgdGhlQ29tcG9uZW50LCB0aGVPYmplY3QpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJTZWxlY3QoaWQ6YW55KSB7XHJcblx0XHR2YXIgdGhlSUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0aWYgKCEkJCh0aGVJRCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciB0aGVOb2RlID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZCkuZ2V0SXRlbShpZC5yb3cpO1xyXG5cdFx0aWYgKCF0aGVOb2RlKSB7XHJcblx0XHRcdFVJLk1lc3NhZ2UoXCJFcnJvciBFeHBlY3RlZCBUTyBGaW5kIE5vZGUgZ290IE51bGwgd2l0aCBJRCBcIiArIGlkKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIElkQXJyYXkgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBvYmplY3RBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR2YXIgcm93QXJyYXkgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIG5ld0l0ZW1TZWxlY3RlZCA9IG5ldyBJdGVtU2VsZWN0ZWRFdmVudCgpO1xyXG5cdFx0SWRBcnJheVswXSAgICAgICAgICA9IGlkLnJvdztcclxuXHRcdGlmICh0aGVOb2RlLm9yaWdpbmFsT2JqZWN0KVxyXG5cdFx0XHRvYmplY3RBcnJheVswXSA9IHRoZU5vZGUub3JpZ2luYWxPYmplY3QuY2xvbmUoKTsgZWxzZVxyXG5cdFx0XHRvYmplY3RBcnJheVswXSA9IG51bGw7XHJcblx0XHRyb3dBcnJheVswXSAgICAgICAgICAgICAgICAgICA9IHRoZU5vZGU7XHJcblx0XHRuZXdJdGVtU2VsZWN0ZWQuaWRBcnJheSAgICAgICA9IElkQXJyYXk7XHJcblx0XHRuZXdJdGVtU2VsZWN0ZWQub2JqZWN0QXJyYXkgICA9IG9iamVjdEFycmF5O1xyXG5cdFx0bmV3SXRlbVNlbGVjdGVkLml0ZW1zU2VsZWN0ZWQgPSBvYmplY3RBcnJheS5sZW5ndGg7XHJcblx0XHRuZXdJdGVtU2VsZWN0ZWQucm93QXJyYXkgICAgICA9IHJvd0FycmF5O1xyXG5cdFx0bmV3SXRlbVNlbGVjdGVkLnRoZUNvbXBvbmVudCAgPSB0aGVDb21wb25lbnQ7XHJcblx0XHR0aGVDb21wb25lbnQub25BZnRlclNlbGVjdChuZXdJdGVtU2VsZWN0ZWQpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEhhbmRsZUZpZWxkRW50cnkoc3RhdGUsIGVkaXRvciwgaWdub3JlVXBkYXRlKSB7XHJcblx0XHR2YXIgdGhlRXhwbG9yZXIgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKS5leHBsb3JlcjtcclxuXHRcdHZhciBuZXdUZXh0ID0gc3RhdGUudmFsdWU7XHJcblx0XHR2YXIgcm93SUQgICA9IGVkaXRvci5yb3c7XHJcblx0XHR2YXIgdGhlTm9kZSA9ICQkKHRoZUV4cGxvcmVyLmNvbXBvbmVudElEKS5nZXRJdGVtKHJvd0lEKTtcclxuXHRcdHZhciB0aGVQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGVOb2RlLmNsYXNzVHlwZSk7XHJcblx0XHR0aGVQcm94eS51cGRhdGVOYW1lKHRoZU5vZGUuX2lkLCBuZXdUZXh0KTtcclxuXHRcdFVJLk1lc3NhZ2UoXCJSZWNvcmQgVXBkYXRlZFwiKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBJc0ZpZWxkRWRpdGFibGUoaWQpOmJvb2xlYW4ge1xyXG5cdFx0dmFyIHRoZUlEICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdHZhciB0aGVFeHBsb3JlciA9ICQkKHRoZUlEKVtcImV4cGxvcmVyXCJdO1xyXG5cdFx0dmFyIHJvd0l0ZW0gICAgID0gJCQodGhlRXhwbG9yZXIuZ2V0Q29tcG9uZW50SUQoKSkuZ2V0SXRlbShpZCk7XHJcblx0XHRpZiAocm93SXRlbS5jbGFzc1R5cGUuaW5kZXhPZihcIlJvb3RcIikgPT0gLTEpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgVmFsaWRhdGVGaWVsZEVudHJ5KHJvdywgdmFsdWU6c3RyaW5nKSB7XHJcblx0XHR2YXIgdGhlSUQgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUV4cGxvcmVyID0gJCQodGhlSUQpLmV4cGxvcmVyO1xyXG5cdFx0dmFyIHJvd0l0ZW0gPSAkJCh0aGVFeHBsb3Jlci5nZXRDb21wb25lbnRJRCgpKS5nZXRJdGVtKHJvdy5pZCk7XHJcblx0XHRBcHBMb2cuaW5mbyhcImluZm9cIiwgXCJCZWZvcmUgRWRpdCBFdmVudFwiKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIFByb2Nlc3NPbkRlc3RydWN0KHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xyXG5cdFx0VUkuRGVidWcoXCJvbiBEZXN0cnVjdCBDYWxsZWRcIik7XHJcblx0XHR0aGVDb21wb25lbnQub25EZXN0cnVjdCgpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIFByb2Nlc3NUYWJDaGFuZ2VkKCkge1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uRHJvcEV2ZW50KFNvdXJjZSwgdGFyZ2V0LCBldmVudCkge1xyXG5cdFx0Ly8gVUkuSW5mbyhcIkRyb3AgRXZlbnRcIik7XHJcblx0XHRjb25zb2xlLmxvZyhcIk9uIERyb3AgRXZlbnRcIik7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJRXZlbnRIYW5kbGVyID0gVUlFdmVudEhhbmRsZXI7XHJcblxyXG5lbnVtIFNvdW5kcyB7IFBvcHVwLCBTaGFwZURyb3AsIFNoYXBlRHJhZ0luLCBTaGFwZURyYWdPdXQsIEJsb3AsIE9wZW5EaWFncmFtLCBTYXZlRGlhZ3JhbSwgQ2xvc2VEaWFncmFtLCBTaGFwZU9uU2hhcGVEcm9wLCBEcmF3TGluaywgRXJyb3IgfXRoaXMuU291bmRzID0gU291bmRzO1xyXG5cclxuY2xhc3MgVUkgZXh0ZW5kcyBDNE9iamVjdCB7XHJcblx0cHVibGljIHN0YXRpYyBQbGF5U291bmQoc291bmQ6U291bmRzID0gU291bmRzLkJsb3ApIHtcclxuXHRcdHZhciBzO1xyXG5cdFx0c3dpdGNoIChzb3VuZCkge1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5Qb3B1cDpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0NsaWNrT2ZmLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuQ2xvc2VEaWFncmFtOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvRG9vciBDbG9zZS5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlRHJvcDpcclxuXHRcdFx0Y2FzZSBTb3VuZHMuT3BlbkRpYWdyYW06XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9CbG9wLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuQmxvcDpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Jsb3AubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5FcnJvcjpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Vycm9yMS5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlT25TaGFwZURyb3A6XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9NZXRhbENsaWNrMS5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLlNhdmVEaWFncmFtOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvRHJvcCBGb3JrLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuRHJhd0xpbms6XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9Qb3BDb3JrLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVEcmFnSW46XHJcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlRHJhZ091dCA6XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9DbGljay5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRzLnBsYXkoKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBEZWJ1Zyh0ZXh0OnN0cmluZykge1xyXG5cdFx0aWYgKHRydWUpXHJcblx0XHRcdFVJLk1lc3NhZ2UodGV4dClcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBNZXNzYWdlKHRleHQ6c3RyaW5nKSB7XHJcblx0XHRVSS5JbmZvKHRleHQpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEluZm8odGV4dDpzdHJpbmcpIHtcclxuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xyXG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXHJcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcclxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcclxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxyXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXHJcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXHJcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxyXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXHJcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcclxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxyXG5cdFx0fVxyXG5cdFx0dG9hc3RyW1wiaW5mb1wiXSh0ZXh0KVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIFdhcm5pbmcodGV4dDpzdHJpbmcpIHtcclxuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xyXG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXHJcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcclxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcclxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxyXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXHJcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXHJcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxyXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXHJcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcclxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxyXG5cdFx0fVxyXG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5FcnJvcik7XHJcblx0XHR0b2FzdHJbXCJ3YXJuaW5nXCJdKHRleHQpXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgU3VjY2Vzcyh0ZXh0OnN0cmluZykge1xyXG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XHJcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXHJcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcclxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxyXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXHJcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcclxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcclxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcclxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXHJcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcclxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxyXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXHJcblx0XHR9XHJcblx0XHR0b2FzdHJbXCJzdWNjZXNzXCJdKHRleHQpXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgRXJyb3IodGV4dDpzdHJpbmcpIHtcclxuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xyXG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXHJcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcclxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcclxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxyXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXHJcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXHJcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxyXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXHJcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcclxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxyXG5cdFx0fVxyXG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5FcnJvcik7XHJcblx0XHR0b2FzdHJbXCJlcnJvclwiXSh0ZXh0KVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEV4cG9ydFRvRXhjZWwoY29tcG9uZW50SUQ6c3RyaW5nKSB7XHJcblx0XHQkJChjb21wb25lbnRJRCkuZXhwb3J0VG9FeGNlbCgpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEFsZXJ0KHN0cmluZykge3dlYml4LmFsZXJ0KHN0cmluZyk7fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHQgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbn10aGlzLlVJID0gVUk7XHJcblxyXG5jbGFzcyBVSUNvbXBvbmVudCBleHRlbmRzIFVJIHtcclxuXHJcblx0cHJvdGVjdGVkIG92ZXJsYXlNaXhpbjpib29sZWFuICAgICAgICAgID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudFZhbHVlOnN0cmluZztcclxuXHRwcm90ZWN0ZWQgY29tcG9uZW50SUQ6c3RyaW5nO1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnRMYWJlbDpzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudFZpZXc6YW55O1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnRDaGFuZ2VDYWxsYmFjazphbnk7XHJcblx0cHJvdGVjdGVkIG93bmluZ0NvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHRwcm90ZWN0ZWQgb3JkZXI6bnVtYmVyICAgICAgICAgICAgICAgICAgPSAwO1xyXG5cdHByb3RlY3RlZCBldmVudHNEZWZpbmVkOmJvb2xlYW4gICAgICAgICA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCB0cmFja2luZ09iamVjdENoYW5nZXM6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgICAgX3VpQ2xhc3NUeXBlOkNsYXNzVHlwZTtcclxuXHRwcm90ZWN0ZWQgaWRQcmVmaXggICAgICAgICAgICAgICAgICAgICAgPSBcIlVJQ29tcG9uZW50X1wiO1xyXG5cdHByaXZhdGUgICAgIHRoZU9iamVjdDphbnk7XHJcblx0cHVibGljICAgICAgdGhlVGVzdCAgICAgICAgICAgICAgICAgICAgID0gbmV3IEM0T2JqZWN0KCk7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudERhdGE6YW55O1xyXG5cdHByaXZhdGUgcmVsYXRpb25zaGlwT2JqZWN0O1xyXG5cdHByaXZhdGUgX3VzZXJEYXRhOmFueTtcclxuXHRwcm90ZWN0ZWQgcHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cclxuXHRnZXQgdXNlckRhdGEoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VzZXJEYXRhO1xyXG5cdH1cclxuXHRzZXQgdXNlckRhdGEodmFsdWU6YW55KSB7XHJcblx0XHR0aGlzLl91c2VyRGF0YSA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgdWlDbGFzc1R5cGUoKTpDbGFzc1R5cGUge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VpQ2xhc3NUeXBlO1xyXG5cdH1cclxuXHRzZXQgdWlDbGFzc1R5cGUodmFsdWU6Q2xhc3NUeXBlKSB7XHJcblx0XHR0aGlzLl91aUNsYXNzVHlwZSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNob3dPdmVybGF5KCkge1xyXG5cdFx0aWYgKCF0aGlzLm92ZXJsYXlNaXhpbilcclxuXHRcdFx0d2ViaXguZXh0ZW5kKCQkKHRoaXMuY29tcG9uZW50SUQpLCB3ZWJpeC5PdmVybGF5Qm94KTtcclxuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNob3dPdmVybGF5KCk7XHJcblx0XHR0aGlzLm92ZXJsYXlNaXhpbiA9IHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBoaWRlT3ZlcmxheSgpIHtcclxuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmhpZGVPdmVybGF5KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIFRyZWVJY29uKG9iajphbnkpIHtcclxuXHRcdGlmIChvYmouJGxldmVsID4gMTAwMSlcclxuXHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZm9sZGVyLW9wZW4nPjwvc3Bhbj5cIjtcclxuXHRcdGlmIChvYmouJGxldmVsIDwgMTAwMCkge1xyXG5cdFx0XHRyZXR1cm4gRmFjdG9yeS5HZXRDbGFzc0ljb24ob2JqLl9jbGFzc1R5cGUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZmlsbSc+PC9zcGFuPlwiO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IHRoaXMuaWRQcmVmaXggKyB3ZWJpeC51aWQoKTtcclxuXHRcdHRoaXMuYWRkUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhdHRhY2hFdmVudChpZDpzdHJpbmcsIGV2ZW50LCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKCQkKGlkKSkge1xyXG5cdFx0XHQkJChpZCkuYXR0YWNoRXZlbnQoZXZlbnQsIGNhbGxiYWNrKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XHJcblx0XHR0aGlzLnJlbGF0aW9uc2hpcE9iamVjdCA9IHRoZU9iamVjdDtcclxuXHR9XHJcblx0cHVibGljIGdldFJlbGF0aW9uc2hpcE9iamVjdCgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGlvbnNoaXBPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBibGFua1ZhbHVlKCkge31cclxuXHRwdWJsaWMgY3JlYXRlVmlldyh2aWV3T3B0aW9uczphbnkpOmFueSB7XHJcblx0XHR0aGlzLnNldFByb3BlcnR5KFwiZHJhZ1wiLCB0cnVlKTtcclxuXHRcdHRoaXMubWVyZ2VQcm9wZXJ0eVNldCh2aWV3T3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gdmlld09wdGlvbnM7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRJRChwcmVmaXg6c3RyaW5nKSB7XHJcblx0XHR0aGlzLmlkUHJlZml4ICAgID0gcHJlZml4O1xyXG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IHRoaXMuaWRQcmVmaXggKyB3ZWJpeC51aWQoKTtcclxuXHR9XHJcblx0cHVibGljIHNldENhbGxiYWNrKGNhbGxiYWNrOmFueSkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRDaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Q2FsbGJhY2soKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRDaGFuZ2VDYWxsYmFjaztcclxuXHR9XHJcblx0cHVibGljIGlzVmFsaWQoKTpib29sZWFuIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHRyZXR1cm4gJCQodGhpcy5jb21wb25lbnRJRCkudmFsaWRhdGUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIHNldERhdGEodGhlRGF0YTphbnkpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50RGF0YSA9IHRoZURhdGE7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXREYXRhKCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudERhdGE7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRMYWJlbCh0aGVMYWJlbCkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRMYWJlbCA9IHRoZUxhYmVsO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRMYWJlbDtcclxuXHR9XHJcblx0cHVibGljIHNldFZhbHVlKHRoZVZhbHVlOmFueSkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWYWx1ZSA9IHRoZVZhbHVlO1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdHdlYml4LnVpKHRoaXMuZ2V0VmFsdWUsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcclxuXHRcdFx0dGhpcy5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRPd25pbmdDb21wb25lbnQoY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHR0aGlzLm93bmluZ0NvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuXHR9XHJcblx0cHVibGljIGdldE93bmluZ0NvbXBvbmVudCgpOlVJQ29tcG9uZW50IHtcclxuXHRcdHJldHVybiB0aGlzLm93bmluZ0NvbXBvbmVudDtcclxuXHR9XHJcblx0cHVibGljIGdldENvbXBvbmVudElEKCk6c3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudElEO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50SUQoaWQ6c3RyaW5nKSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudElEID0gaWQ7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWYWx1ZSgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWYWx1ZTtcclxuXHR9XHJcblx0cHVibGljIGdldENvbXBvbmVudFZpZXcoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudFZpZXcodGhlVmlldzphbnkpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoZVZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRTZWxlY3RlZE9iamVjdCgpOmFueSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIG9uQmVmb3JlRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKSB7XHJcblx0XHR3ZWJpeC5hbGVydChcIlNvcnJ5IERyb3BwaW5nIEhlcmUgTm90IEFsbG93ZWQgWWV0XCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVEcmFnSW4obWVzc2FnZTpEcm9wTWVzc2FnZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25BZnRlckRyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSk6YW55IHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIG9uRHJhZ091dChtZXNzYWdlOkRyb3BNZXNzYWdlKTphbnkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgdmFsaWRhdGVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmFueSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyBvblNlbGVjdENoYW5nZShpdGVtTWVzc2FnZTpJdGVtU2VsZWN0ZWRFdmVudCkge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwib25TZWxlY3RDaGFuZ2VcIiwgaXRlbU1lc3NhZ2UpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRwdWJsaWMgb25JdGVtRGJsQ2xpY2soaXRlbU1lc3NhZ2UgOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwib25JdGVtRGJsQ2xpY2tcIixpdGVtTWVzc2FnZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkl0ZW1DbGljayhpdGVtTWVzc2FnZSA6IEl0ZW1TZWxlY3RlZEV2ZW50KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJvbkl0ZW1DbGlja1wiLGl0ZW1NZXNzYWdlKTtcclxuXHR9XHJcblx0cHVibGljIGdldE9iamVjdCgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy50aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRPYmplY3QodGhlT2JqZWN0OmFueSkge1xyXG5cdFx0dGhpcy50aGVPYmplY3QgPSB0aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXREcmFnZ2FibGUoZmxhZzpib29sZWFuID0gdHJ1ZSkge1xyXG5cdFx0dmFyIGh0bWxWaWV3ID0gJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS4kdmlldztcclxuXHRcdHdlYml4LkRyYWdDb250cm9sLmFkZERyb3AoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSwgVUlFdmVudEhhbmRsZXIuT25Ecm9wRXZlbnQpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0UHJvcGVydHkobmFtZSwgdmFsdWUpIHtcclxuXHRcdHN3aXRjaCAobmFtZSkge1xyXG5cdFx0XHRjYXNlIFwibGFiZWxcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNldExhYmVsKHZhbHVlKTtcclxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwidmFsdWVcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiZGF0YVwiIDpcclxuXHRcdFx0XHR0aGlzLnNldERhdGEodmFsdWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiY2FsbGJhY2tcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNldENhbGxiYWNrKHZhbHVlKVxyXG5cdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMucHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgYWRkUHJvcGVydGllcyhwcm9wZXJ0eVNldDphbnkpIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gcHJvcGVydHlTZXQpIHtcclxuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eShpdGVtLCBwcm9wZXJ0eVNldFtpdGVtXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQcm9wZXJ0eShuYW1lKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcGVydGllc1tuYW1lXTtcclxuXHR9XHJcblx0cHVibGljIG1lcmdlUHJvcGVydHlTZXQodmlldzphbnkpIHtcclxuXHRcdHZhciBpbmRleCA9IDA7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMucHJvcGVydGllcykge1xyXG5cdFx0XHR2aWV3W2l0ZW1dID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRQcm9wZXJ0eVNldCgpOmFueSB7XHJcblx0XHR2YXIgaW5kZXggICA9IDA7XHJcblx0XHR2YXIgcmVzdWx0cyA9IHt9O1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcclxuXHRcdFx0cmVzdWx0c1tpdGVtXSA9IHRoaXMucHJvcGVydGllc1tpdGVtXTtcclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG5cdH1cclxuXHJcblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRwdWJsaWMgcmVmcmVzaCgpIHt9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdHRoaXMuZXZlbnRzRGVmaW5lZCA9IHRydWU7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZHJhZyAgICAgICAgID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSAkJCh0aGlzLmNvbXBvbmVudElEKS5kZXN0cnVjdG9yKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZXN0cm95T2JqZWN0KCkge1xyXG5cdH1cclxuXHRwdWJsaWMgb25EZXN0cnVjdCgpIHtcclxuXHRcdHRoaXMuZGVzdHJveU9iamVjdCgpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVzdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdC8vZW5kcmVnaW9uXHJcbn0gdGhpcy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50O1xyXG5cclxuY2xhc3MgVUlDb250ZXh0TWVudSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHRwdWJsaWMganVtcEl0ZW1BcnJheTpBcnJheTxVSUp1bXBJdGVtPjtcclxuXHRwdWJsaWMgb3duaW5nQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXkgPSBuZXcgQXJyYXk8VUlKdW1wSXRlbT4oKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJ1aUNvbnRleHRNZW51X1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRJdGVtKGxhYmVsLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIG5ld0l0ZW0gICAgICA9IG5ldyBVSUp1bXBJdGVtKCk7XHJcblx0XHRuZXdJdGVtLmlkICAgICAgID0gXCJtZW51SXRlbV9cIiArIHdlYml4LnVpZCgpO1xyXG5cdFx0bmV3SXRlbS5sYWJlbCAgICA9IGxhYmVsO1xyXG5cdFx0bmV3SXRlbS5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcclxuXHR9XHJcblx0cHVibGljIGFkZFNlcGVyYXRvcigpIHtcclxuXHRcdHZhciBuZXdJdGVtICAgICAgPSBuZXcgVUlKdW1wSXRlbSgpO1xyXG5cdFx0bmV3SXRlbS5pZCAgICAgICA9IFwianVtcEl0ZW1fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdG5ld0l0ZW0ubGFiZWwgICAgPSBcIlwiO1xyXG5cdFx0bmV3SXRlbS5jYWxsYmFjayA9IG51bGw7XHJcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TWVudUl0ZW0obGFiZWw6c3RyaW5nKTpVSUp1bXBJdGVtIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdGlmICh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWwgPT0gbGFiZWwpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR2YXIgbWVudUFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdHZhciBtZW51SXRlbSA9IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXTtcclxuXHRcdFx0aWYgKG1lbnVJdGVtLmxhYmVsID09IFwiXCIpIHtcclxuXHRcdFx0XHRtZW51QXJyYXkucHVzaCh7JHRlbXBsYXRlOiBcIlNlcGFyYXRvclwifSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVudUFycmF5LnB1c2gobWVudUl0ZW0ubGFiZWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHR2aWV3OiBcImNvbnRleHRtZW51XCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIGRhdGE6IG1lbnVBcnJheVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuZ2V0VmlldygpO1xyXG5cdFx0aWYgKCEkJCh0aGlzLmNvbXBvbmVudElEKSlcclxuXHRcdFx0d2ViaXgudWkodGhpcy5jb21wb25lbnRWaWV3KS5hdHRhY2hUbygkJCh0aGlzLmdldE93bmluZ0NvbXBvbmVudCgpLmdldENvbXBvbmVudElEKCkpKTtcclxuXHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSlbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmdldENvbXBvbmVudElEKCksIFwiY2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuTWVudUhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlVJQ29udGV4dE1lbnUgPSBVSUNvbnRleHRNZW51O1xyXG5cclxuZW51bSBGaWVsZEZvcm1hdCB7IEdFTkVSQUwsIENVUlJFTkNZLCBOVU1CRVIsIFBFUkNFTlQgfXRoaXMuRmllbGRGb3JtYXQgPSBGaWVsZEZvcm1hdDtcclxuXHJcbmNsYXNzIFVJRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHByaXZhdGUgbGlzdFR5cGU6c3RyaW5nO1xyXG5cdHByaXZhdGUgcmVsYXRpb25zaGlwUG9pbnRlcjpib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIHVwZGF0ZUZpZWxkOnN0cmluZztcclxuXHRwdWJsaWMgbWF4TGVuZ3RoOm51bWJlcjtcclxuXHRwdWJsaWMgZmllbGRGb3JtYXQ6RmllbGRGb3JtYXQgICAgICA9IEZpZWxkRm9ybWF0LkdFTkVSQUw7XHJcblx0cHVibGljIGZvcm1hdFZpZXc6YW55O1xyXG5cdHB1YmxpYyBmaWVsZFZhbHVlOmFueTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcInVpZmllbGRfXCIpO1xyXG5cdFx0dGhpcy5hZGRFdmVudFB1YmxpY2F0aW9uKFwiZmllbGRDaGFuZ2VkXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGZpZWxkQ2hhbmdlZChuZXdWYWx1ZTphbnksIG9sZFZhbHVlKSB7XHJcblx0XHR2YXIgdGhlUGFyZW50ID0gdGhpcy5nZXREYXRhKCk7XHJcblx0XHRpZiAodGhpcy5nZXRDYWxsYmFjaygpKSB7XHJcblx0XHRcdHZhciBjYWxsYmFjayA9IHRoaXMuZ2V0Q2FsbGJhY2soKTtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKHRoaXMsIHRoZVBhcmVudCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuXHRcdH1cclxuXHRcdHRoaXMudmFsdWVDaGFuZ2VkKHRoZVBhcmVudCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuXHRcdHRoaXMucHVibGlzaChcImZpZWxkQ2hhbmdlZFwiLCB7bmV3VmFsdWU6IG5ld1ZhbHVlLCBvbGRWYWx1ZTogb2xkVmFsdWV9KVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q2xhc3NUeXBlKGNsYXNzVHlwZTpDbGFzc1R5cGUpIHtcclxuXHRcdHRoaXMubGlzdFR5cGUgPSA8c3RyaW5nPiBjbGFzc1R5cGU7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRDbGFzc1R5cGUoKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMubGlzdFR5cGU7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRVcGRhdGVGaWVsZCh0aGVGaWVsZE5hbWU6c3RyaW5nKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdGhlRmllbGROYW1lO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VXBkYXRlRmllbGQoKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMudXBkYXRlRmllbGQ7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRGaWVsZEZvcm1hdCh0aGVGb3JtYXQ6RmllbGRGb3JtYXQpIHtcclxuXHRcdHRoaXMuZmllbGRGb3JtYXQgPSB0aGVGb3JtYXQ7XHJcblx0XHRzd2l0Y2ggKHRoZUZvcm1hdCkge1xyXG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0LkNVUlJFTkNZIDpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuZm9ybWF0VmlldyA9IHdlYml4Lk51bWJlci5udW1Ub1N0cih7XHJcblx0XHRcdFx0XHRncm91cERlbGltaXRlcjogXCIsXCIsIGdyb3VwZVNpemU6IDMsIGRlY2ltYWxEZWxpbWl0ZXI6IFwiLlwiLCBkZWNpbWFsU2l6ZTogMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuUEVSQ0VOVCA6XHJcblx0XHRcdHtcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuR0VORVJBTCA6XHJcblx0XHRcdHtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0Lk5VTUJFUiA6XHJcblx0XHRcdHtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFZhbHVlKHZhbHVlOmFueSkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmJsb2NrRXZlbnQoKTtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS51bmJsb2NrRXZlbnQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmllbGRWYWx1ZSA9IHZhbHVlO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uQ2hhbmdlXCIsIFVJRXZlbnRIYW5kbGVyLkZpZWxkQ2hhbmdlZCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWYWx1ZSgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5maWVsZFZhbHVlO1xyXG5cdH1cclxuXHRwdWJsaWMgYmxhbmtWYWx1ZSgpIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZShcIlwiKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmllbGRWYWx1ZSA9IFwiXCI7XHJcblx0fVxyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQocGFyZW50Q29tcG9uZW50OlVJQ29tcG9uZW50LCBuZXdWYWx1ZTphbnksIG9sZFZhbHVlOmFueSkge1xyXG5cdFx0aWYgKCF0aGlzLmlzVmFsaWQoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0aWYgKCF0aGlzLnVwZGF0ZUZpZWxkKSByZXR1cm47XHJcblx0XHR2YXIgdGhlT2JqZWN0ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHBhcmVudENvbXBvbmVudC5nZXRPYmplY3QoKS5jbGFzc1R5cGUpO1xyXG5cdFx0dGhlT2JqZWN0LnVwZGF0ZUF0dHJpYnV0ZShwYXJlbnRDb21wb25lbnQuZ2V0T2JqZWN0KCkuX2lkLCB0aGlzLnVwZGF0ZUZpZWxkLCBuZXdWYWx1ZSk7XHJcblx0XHRVSS5NZXNzYWdlKFwiUmVjb3JkIFVwZGF0ZWRcIik7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJRmllbGQgPSBVSUZpZWxkO1xyXG5cclxuY2xhc3MgVUlDb3VudGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlDb3VudGVyRmllbGRfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGZpZWxkQ2hhbmdlZChuZXd2LCBvbGR2KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJmaWVsZENoYW5nZWRcIiwge25ld1ZhbHVlOiBuZXd2LCBvbGRWYWx1ZTogb2xkdn0pO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJjb3VudGVyXCJcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG59dGhpcy5VSUNvdW50ZXJGaWVsZCA9IFVJQ291bnRlckZpZWxkO1xyXG5cclxuY2xhc3MgVUlMYWJlbCBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblx0cHVibGljIGFsaWdubWVudDpzdHJpbmcgPSBcImNlbnRlclwiO1xyXG5cdHB1YmxpYyBsYWJlbFdpZHRoOm51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTGFiZWxfXCIpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgYWxpZ25tZW50ID0gXCJjZW50ZXJcIiwgbGFiZWxXaWR0aCA9IDEwMCkge1xyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0aWVzKHtsYWJlbDogbGFiZWwsIGFsaWdubWVudDogYWxpZ25tZW50LCBsYWJlbFdpZHRoOiBsYWJlbFdpZHRofSk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImxhYmVsXCJcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG59IHRoaXMuVUlMYWJlbCA9IFVJTGFiZWw7XHJcblxyXG5jbGFzcyBVSURhdGVGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwidWlEYXRlRmllbGRfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgIDogXCJkYXRlcGlja2VyXCIsXHJcblx0XHRcdG5hbWUgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcclxuXHRcdFx0bGFiZWwgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0bGFiZWxXaWR0aDogMTAwLFxyXG5cdFx0XHR0aW1lcGlja2VyOiBmYWxzZVxyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5mb3JtYXRWaWV3KSB7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50Vmlld1tcImZvcm1hdFwiXSA9IHRoaXMuZm9ybWF0VmlldztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5FdmVudHMoKSB7XHJcblxyXG5cdH1cclxuXHJcbn0gdGhpcy5VSURhdGVGaWVsZCA9IFVJRGF0ZUZpZWxkO1xyXG5cclxuY2xhc3MgVUlTbGlkZXJGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSVNsaWRlckZpZWxkXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSwgZGF0YTphbnksIGNhbGxiYWNrOmFueSwgdXBkYXRlRmllbGQgPSBudWxsLCBtaW5WYWx1ZTpudW1iZXIgPSAwLCBtYXhWYWx1ZTpudW1iZXIgPSAxLCBzdGVwOm51bWJlciA9IC4xKSB7XHJcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XHJcblx0XHR0aGlzLnNldFByb3BlcnR5KFwibWluXCIsIG1pblZhbHVlKTtcclxuXHRcdHRoaXMuc2V0UHJvcGVydHkoXCJtYXhcIiwgbWF4VmFsdWUpO1xyXG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcInN0ZXBcIiwgc3RlcCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHRuYW1lIDogdGhpcy5nZXRMYWJlbCgpLFxyXG5cdFx0XHR2aWV3IDogXCJzbGlkZXJcIixcclxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWUoKSxcclxuXHRcdFx0dGl0bGU6IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0XHRyZXR1cm4gd2ViaXguaTE4bi5udW1iZXJGb3JtYXQob2JqLnZhbHVlICogMTAwKSArIFwiJVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge31cclxuXHJcbn0gdGhpcy5VSVNsaWRlckZpZWxkID0gVUlTbGlkZXJGaWVsZDtcclxuXHJcbmNsYXNzIFVJVGV4dEZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XHJcblxyXG5cdHB1YmxpYyB0ZXh0QXJlYSA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcInVpVGV4dEZpZWxkX1wiKTtcclxuXHRcdHRoaXMudGV4dEFyZWEgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUZXh0QXJlYSh0ZXh0QXJlYTpib29sZWFuKSB7XHJcblx0XHR0aGlzLnRleHRBcmVhID0gdGV4dEFyZWE7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55ID0gbnVsbCwgY2FsbGJhY2s6YW55ID0gbnVsbCwgdXBkYXRlRmllbGQgPSBudWxsLCB0ZXh0QXJlYSA9IGZhbHNlKSB7XHJcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0XHR0aGlzLnRleHRBcmVhICAgID0gdGV4dEFyZWE7XHJcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdGlmICh0aGlzLnRleHRBcmVhKVxyXG5cdFx0XHR2YXIgdmlld1R5cGUgPSBcInRleHRhcmVhXCI7IGVsc2VcclxuXHRcdFx0dmlld1R5cGUgPSBcInRleHRcIjtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICA6IHZpZXdUeXBlLFxyXG5cdFx0XHRuYW1lICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdGxhYmVsV2lkdGg6IDEwMFxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XHJcblxyXG59IHRoaXMuVUlUZXh0RmllbGQgPSBVSVRleHRGaWVsZDtcclxuXHJcbmNsYXNzIFVJTm90ZUZpZWxkIGV4dGVuZHMgVUlUZXh0RmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTm90ZUZpZWxkX1wiKTtcclxuXHRcdHRoaXMudGV4dEFyZWEgPSB0cnVlO1xyXG5cdH1cclxuXHJcbn10aGlzLlVJTm90ZUZpZWxkID0gVUlOb3RlRmllbGQ7XHJcblxyXG5jbGFzcyBVSVNlbGVjdExpc3QgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHJcblx0cHVibGljIHNlbGVjdGlvbkxpc3Q6QXJyYXk8YW55PjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJ1aVNlbGVjdExpc3RfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFZhbHVlKHZhbHVlIDogYW55KSB7XHJcblx0XHRzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0U2VsZWN0TGlzdChsYWJlbCwgdmFsdWUsIHRoZUxpc3QsIGRhdGEsIGNhbGxiYWNrLCB1cGRhdGVGaWVsZCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0TGlzdCh0aGVMaXN0KTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spXHJcblx0XHR0aGlzLnNldFVwZGF0ZUZpZWxkKHVwZGF0ZUZpZWxkKTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgIDogXCJzZWxlY3RcIixcclxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0b3B0aW9ucyAgIDogdGhpcy5zZWxlY3Rpb25MaXN0LFxyXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0dmFsaWRhdGUgIDogd2ViaXgucnVsZXMuaXNOb3RFbXB0eVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0TGlzdCh0aGVMaXN0OkFycmF5PGFueT4pIHtcclxuXHRcdHRoaXMuc2VsZWN0aW9uTGlzdCA9IHRoZUxpc3Q7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoZUxpc3QpIHtcclxuXHRcdFx0aWYgKHRoZUxpc3RbaXRlbV0ubmFtZSA9PSBcIlwiKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VsZWN0aW9uTGlzdC5wdXNoKHtpZDogXCJcIiwgbmFtZTogXCJcIn0pO1xyXG5cclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5kZWZpbmUoXCJvcHRpb25zXCIsIHRoaXMuc2VsZWN0aW9uTGlzdCk7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnJlZnJlc2goKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IHRoaXMuVUlTZWxlY3RMaXN0ID0gVUlTZWxlY3RMaXN0O1xyXG5cclxuY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55ID0gMCwgZGF0YTphbnkgPSBudWxsLCBjYWxsYmFjazphbnkgPSBudWxsKSB7XHJcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksXHJcblx0XHRcdHZpZXc6IFwiY2hlY2tib3hcIixcclxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWUoKSxcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIG9uQ2hhbmdlKG5ld3YsIG9sZHYpIHtcclxuXHRcdHRoaXMucHVibGlzaChcIm9uQ2hhbmdlXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJQ2hlY2tib3ggPSBVSUNoZWNrYm94O1xyXG5cclxuY2xhc3MgVUlKdW1wSXRlbSB7XHJcblxyXG5cdHB1YmxpYyBpZDpzdHJpbmc7XHJcblx0cHVibGljIGxhYmVsOnN0cmluZztcclxuXHRwdWJsaWMgY2FsbGJhY2s6YW55O1xyXG5cdHB1YmxpYyBldmVudDphbnk7XHJcblx0cHVibGljIHR5cGU6c3RyaW5nO1xyXG5cclxufVxyXG5jbGFzcyBVSUp1bXBCYXIgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBqdW1wSXRlbUFycmF5OkFycmF5PFVJSnVtcEl0ZW0+O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlKdW1wQmFyX1wiKTtcclxuXHRcdHRoaXMuanVtcEl0ZW1BcnJheSA9IG5ldyBBcnJheTxVSUp1bXBJdGVtPigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBKdW1wQ2FsbGJhY2soaWQ6c3RyaW5nLCBldmVudDphbnkpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJChpZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgY2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0dGhlQ29tcG9uZW50LnB1Ymxpc2godGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmV2ZW50KVxyXG5cdFx0Ly8gICAgdGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmNhbGxiYWNrKHRoZUNvbXBvbmVudCwgdGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmxhYmVsKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdHZhciBuZXdJdGVtVmlldyA9IHtcclxuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIixcclxuXHRcdFx0XHRpZCAgIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLFxyXG5cdFx0XHRcdHR5cGUgOiBcImh0bWxidXR0b25cIixcclxuXHRcdFx0XHRjc3MgIDogXCJidF8xXCIsXHJcblx0XHRcdFx0bGFiZWw6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5sYWJlbCxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmxhYmVsXHJcblx0XHRcdH1cclxuXHRcdFx0YmFyVmlldy5wdXNoKG5ld0l0ZW1WaWV3KTtcclxuXHRcdH1cclxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIGNvbHM6IGJhclZpZXdcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld1ZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRJdGVtKGxhYmVsOnN0cmluZywgZXZlbnQ6c3RyaW5nLCB0eXBlID0gXCJkYW5nZXJcIiwgY2FsbGJhY2sgPSBudWxsKSB7XHJcblx0XHR2YXIgbmV3SXRlbSAgICAgID0gbmV3IFVJSnVtcEl0ZW0oKTtcclxuXHRcdG5ld0l0ZW0uaWQgICAgICAgPSBcImp1bXBCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdG5ld0l0ZW0ubGFiZWwgICAgPSBsYWJlbDtcclxuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdG5ld0l0ZW0uZXZlbnQgICAgPSBldmVudDtcclxuXHRcdG5ld0l0ZW0udHlwZSAgICAgPSB0eXBlO1xyXG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdGlmICgkJCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQpKVxyXG5cdFx0XHRcdGlmICghJCQodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkKS5oYXNFdmVudChcIm9uSXRlbUNsaWNrXCIpKVxyXG5cdFx0XHRcdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsIFwib25JdGVtQ2xpY2tcIiwgVUlKdW1wQmFyLkp1bXBDYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcclxuXHRcdFx0aWYgKCQkKGl0ZW0pKSB7XHJcblx0XHRcdFx0JCQoaXRlbSlbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xyXG5cdFx0XHRcdCQkKGl0ZW0pW1wiZGF0YVwiXSAgICAgID0gdGhpcy5nZXREYXRhKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG59IHRoaXMuVUlKdW1wQmFyID0gVUlKdW1wQmFyO1xyXG5cclxuY2xhc3MgVUlUb29sYmFyIGV4dGVuZHMgVUlKdW1wQmFyIHtcclxuXHJcblx0cHVibGljIGxhYmVsOnN0cmluZztcclxuXHRwdWJsaWMgaWNvbjpzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUb29sQmFyKGxhYmVsLCBpY29uKSB7XHJcblx0XHR0aGlzLmxhYmVsID0gbGFiZWw7XHJcblx0XHR0aGlzLmljb24gID0gaWNvbjtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dmFyIGJhclZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHRoZUJhciAgPSB7dmlldzogXCJsYWJlbFwiLCBsYWJlbDogdGhpcy5pY29uICsgXCIgXCIgKyB0aGlzLmxhYmVsfTtcclxuXHRcdGJhclZpZXcucHVzaCh0aGVCYXIpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcclxuXHRcdFx0dmFyIG5ld0l0ZW1WaWV3ID0ge1xyXG5cdFx0XHRcdHZpZXcgOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRcdGlkICAgOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsXHJcblx0XHRcdFx0dHlwZSA6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS50eXBlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWxcclxuXHRcdFx0fVxyXG5cdFx0XHRiYXJWaWV3LnB1c2gobmV3SXRlbVZpZXcpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld1ZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICA6IFwidG9vbGJhclwiLFxyXG5cdFx0XHRjc3MgICAgIDogXCJoaWdobGlnaHRlZF9oZWFkZXIgaGVhZGVyM1wiLFxyXG5cdFx0XHRwYWRkaW5nWDogNSxcclxuXHRcdFx0cGFkZGluZ1k6IDUsXHJcblx0XHRcdGhlaWdodCAgOiA0MCxcclxuXHRcdFx0Y29scyAgICA6IGJhclZpZXdcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld1ZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJVG9vbGJhciA9IFVJVG9vbGJhcjtcclxuXHJcbmNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHRwdWJsaWMgY29sb3I6c3RyaW5nO1xyXG5cdHB1YmxpYyBldmVudDpzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUJ1dHRvbl9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25CdXR0b25DbGljayh0aGVDb21wb25lbnQ6YW55KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJjbGlja1wiLCB0aGlzKTtcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlPzphbnksIGRhdGE/OmFueSwgY2FsbGJhY2s/OmFueSkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdFx0dGhpcy5jb2xvciA9IFwiYmFja2dyb3VuZC1jb2xvciA6ICNGRjlFOUVcIjtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHR2aWV3ICAgICA6IFwiYnV0dG9uXCIsXHJcblx0XHRcdG5hbWUgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0dmFsdWUgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHRjc3NGb3JtYXQ6IHRoaXMuY29sb3IsXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRMYWJlbCh0aGVMYWJlbDpzdHJpbmcpIHtcclxuXHRcdHN1cGVyLnNldExhYmVsKHRoZUxhYmVsKTtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkudmFsdWUgPSB0aGVMYWJlbDtcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5yZWZyZXNoKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb2xvcih2YWx1ZTpzdHJpbmcpIHtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uc3R5bGUuYmFja2dyb3VuZCAgPSB2YWx1ZTtcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS4kdmlldy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXS5zdHlsZS5ib3JkZXJDb2xvciA9IHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uSXRlbUNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk9uQnV0dG9uQ2xpY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlCdXR0b24gPSBVSUJ1dHRvbjtcclxuXHJcbmNsYXNzIFVJRHJvcFpvbmUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSURyb3Bab25lX1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcclxuXHR9XHJcblx0cHVibGljIHNldEluVGhlWm9uZShpblpvbmU6Ym9vbGVhbikge1xyXG5cdFx0aWYgKGluWm9uZSlcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5kZWZpbmUoXCJjc3NcIiwgXCJpblRoZURyb3Bab25lXCIpOyBlbHNlXHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuZGVmaW5lKFwiY3NzXCIsIFwib3V0T2ZUaGVEcm9wWm9uZVwiKTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZCAgICAgICA6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSxcclxuXHRcdFx0dmlldyAgICAgOiBcImxpc3RcIixcclxuXHRcdFx0bWluV2lkdGggOiAxMDAsXHJcblx0XHRcdG1pbkhlaWdodDogMTAwLFxyXG5cdFx0XHR0ZW1wbGF0ZSA6IFwiI3RpdGxlI1wiLFxyXG5cdFx0XHRkYXRhICAgICA6IFt7dGl0bGU6IFwiRHJvcCBab25lXCJ9XSxcclxuXHRcdFx0ZHJhZyAgICAgOiBcInRhcmdldFwiXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xyXG5cdFx0dGhpcy5zZXRJblRoZVpvbmUoZmFsc2UpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVEcmFnSW4obWVzc2FnZTpEcm9wTWVzc2FnZSk6Ym9vbGVhbiB7XHJcblx0XHR0aGlzLnNldEluVGhlWm9uZSh0cnVlKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25EcmFnT3V0KG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xyXG5cdFx0dGhpcy5zZXRJblRoZVpvbmUoZmFsc2UpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuY29tcG9uZW50SUQsIFwib25CZWZvcmVEcm9wXCIsIFVJRXZlbnRIYW5kbGVyLk9uQmVmb3JlRHJvcCk7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJRHJvcFpvbmUgPSBVSURyb3Bab25lO1xyXG5cclxuaW50ZXJmYWNlIG9uRWRpdENhbGxiYWNrIHtcclxuXHQob2JqZWN0OmFueSkgOiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIFVJQ29sb3JGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55KSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUNvbG9yRmllbGRfXCIpO1xyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwiY29sb3JwaWNrZXJcIlxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcbn10aGlzLlVJQ29sb3JGaWVsZCA9IFVJQ29sb3JGaWVsZDtcclxuXHJcbmNsYXNzIFVJRGF0YVRhYmxlRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXHJcblx0cHVibGljIGNvbHVtbk51bWJlcjpudW1iZXI7XHJcblx0cHVibGljIGNvbHVtbk5hbWU6c3RyaW5nO1xyXG5cdHB1YmxpYyBvbGRWYWx1ZTphbnk7XHJcblx0cHVibGljIG5ld1ZhbHVlOmFueTtcclxuXHRwdWJsaWMgZWRpdG9yOmFueTtcclxuXHRwdWJsaWMgcm93T2JqZWN0OmFueTtcclxuXHRwdWJsaWMgaXNSZWZlcmVuY2U6Ym9vbGVhbiAgICAgICA9IGZhbHNlO1xyXG5cdHB1YmxpYyByZWZlcmVuY2VDbGFzc1R5cGU6c3RyaW5nID0gXCJcIjtcclxuXHRwdWJsaWMgcmVmZXJlbmNlRmllbGQ6YW55O1xyXG5cdHB1YmxpYyByZWZlcmVuY2VPYmplY3Q6YW55O1xyXG5cdHB1YmxpYyBkaXNwbGF5RmllbGROYW1lO1xyXG5cdHB1YmxpYyB2aWV3OmFueTtcclxuXHRwdWJsaWMgb3B0aW9uTGlzdDpBcnJheTxhbnk+O1xyXG5cdHB1YmxpYyBtYXBwZWQ6Ym9vbGVhbiAgICAgICAgICAgID0gZmFsc2U7XHJcblx0cHVibGljIHRlbXBsYXRlOmFueTtcclxuXHRwdWJsaWMgcmVmZXJlbmNlQ2xhc3NGaWVsZDphbnlcclxuXHQvL2VuZHJlZ2lvblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSURhdGFUYWJsZUZpZWxkX1wiKTtcclxuXHRcdHRoaXMuY29tcG9uZW50SUQgPSBcImRhdGFUYWJsZUZpZWxkX1wiICsgd2ViaXgudWlkKCk7XHJcblx0fVxyXG59IHRoaXMuVUlEYXRhVGFibGVGaWVsZCA9IFVJRGF0YVRhYmxlRmllbGQ7XHJcblxyXG5jbGFzcyBVSURhdGFUYWJsZSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHRnZXQgdGVtcGxhdGUoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG5cdH1cclxuXHJcblx0c2V0IHRlbXBsYXRlKHZhbHVlOmFueSkge1xyXG5cdFx0dGhpcy5fdGVtcGxhdGUgPSB2YWx1ZTtcclxuXHR9XHJcblx0Z2V0IHNob3dUb29sQmFyKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hvd1Rvb2xCYXI7XHJcblx0fVxyXG5cdHNldCBzaG93VG9vbEJhcih2YWx1ZTpib29sZWFuKSB7XHJcblx0XHR0aGlzLl9zaG93VG9vbEJhciA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBNYXBwZWRDb2x1bW5Mb29rdXAob2JqKSB7XHJcblx0fVxyXG5cdHB1YmxpYyB2aWV3VHlwZSA9IFwiZGF0YXRhYmxlXCI7XHJcblxyXG5cdHByb3RlY3RlZCB0aGVMaXN0ICAgICAgICAgICAgICAgOiBBcnJheTxhbnk+ICA9IG51bGw7XHJcblx0cHJvdGVjdGVkIGNvbHVtbnMgICAgICAgICAgICAgICA6IEFycmF5PFVJRGF0YVRhYmxlRmllbGQ+O1xyXG5cdHByb3RlY3RlZCByb3dTZWxlY3RDYWxsYmFjayAgICAgOiBhbnk7XHJcblx0cHJvdGVjdGVkIGVkaXRhYmxlICAgICAgICAgICAgICA6IGJvb2xlYW4gICAgPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgZWRpdGFjdGlvbiAgICAgICAgICAgIDogc3RyaW5nICAgPSBcImRibGNsaWNrXCI7XHJcblx0cHJvdGVjdGVkIHRvb2xCYXIgICAgICAgICAgICAgICA6IFVJVG9vbGJhcjtcclxuXHRwcm90ZWN0ZWQgZGF0YVRhYmxlSUQgICAgICAgICAgIDogc3RyaW5nO1xyXG5cdHByaXZhdGUgX3Nob3dUb29sQmFyICAgICAgICAgICAgOiBib29sZWFuICA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX211bHRpU2VsZWN0ICAgICAgICAgICAgOiBib29sZWFuICA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2F1dG9Db2x1bW5Db25maWd1cmUgID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSB0cnVlO1xyXG5cdHByaXZhdGUgX3dpZHRoICAgICAgICAgICAgICAgID0gMDtcclxuXHRwcml2YXRlIF9oZWlnaHQgICAgICAgICAgICAgICA9IDA7XHJcblx0cHJpdmF0ZSBfdGVtcGxhdGUgOiBhbnkgPSBudWxsO1xyXG5cclxuXHRnZXQgbXVsdGlTZWxlY3QoKTpib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9tdWx0aVNlbGVjdDtcclxuXHR9XHJcblx0c2V0IG11bHRpU2VsZWN0KHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX211bHRpU2VsZWN0ID0gdmFsdWU7XHJcblx0fVxyXG5cdGdldCBhdXRvQ29sdW1uQ29uZmlndXJlKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0NvbHVtbkNvbmZpZ3VyZTtcclxuXHR9XHJcblx0c2V0IGF1dG9Db2x1bW5Db25maWd1cmUodmFsdWU6Ym9vbGVhbikge1xyXG5cdFx0dGhpcy5fYXV0b0NvbHVtbkNvbmZpZ3VyZSA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgc2hvd0FkZERlbGV0ZUNvbHVtbnMoKTpib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9zaG93QWRkRGVsZXRlQ29sdW1ucztcclxuXHR9XHJcblx0c2V0IHNob3dBZGREZWxldGVDb2x1bW5zKHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX3Nob3dBZGREZWxldGVDb2x1bW5zID0gdmFsdWU7XHJcblx0fVxyXG5cdGdldCBoZWlnaHQoKTpudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcclxuXHR9XHJcblx0c2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpIHtcclxuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgd2lkdGgoKTpudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdH1cclxuXHRzZXQgd2lkdGgodmFsdWU6bnVtYmVyKSB7XHJcblx0XHR0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJRGF0YVRhYmxlX1wiKTtcclxuXHRcdHRoaXMuY29sdW1ucyAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcclxuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcImRhdGFUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xyXG5cdFx0dGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucyA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBoaWRlQ29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xyXG5cclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkgJCQodGhpcy5kYXRhVGFibGVJRCkuaGlkZUNvbHVtbihjb2x1bW5JRCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93Q29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xyXG5cclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkgJCQodGhpcy5kYXRhVGFibGVJRCkuc2hvd0NvbHVtbihjb2x1bW5JRCk7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIG5ld0l0ZW0oKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcclxuXHRcdHZhciBvYmplY3RQcm94eSAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlQ29tcG9uZW50LnVpQ2xhc3NUeXBlKTtcclxuXHRcdHZhciBuYW1lICAgICAgICAgPSBcIkEgTmV3IFwiICsgb2JqZWN0UHJveHkuY2xhc3NMYWJlbCgpO1xyXG5cdFx0dmFyIG5ld0lEICAgICAgICA9IG9iamVjdFByb3h5LmFkZE5ldyhuYW1lKTtcclxuXHRcdHZhciBuZXdPYmplY3QgICAgPSBvYmplY3RQcm94eS5nZXRPbmUobmV3SUQpO1xyXG5cdFx0dmFyIG5ld1Jvd0lEICAgICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuYWRkKG5ld09iamVjdCk7XHJcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNob3dJdGVtKG5ld1Jvd0lEKTtcclxuXHRcdCQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuc2VsZWN0KG5ld1Jvd0lELCBmYWxzZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWxldGVJdGVtKHRoZVRvb2xiYXI6VUlUb29sYmFyLCBsYWJlbDpzdHJpbmcpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSB0aGlzO1xyXG5cdFx0dmFyIHJvd2lkICAgICAgICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJZCgpO1xyXG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xyXG5cdFx0dmFyIHRoZU9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XHJcblx0XHR0aGVDb21wb25lbnQuaGFuZGxlRGVsZXRlKHRoZU9iamVjdCk7XHJcblx0fVxyXG5cdHB1YmxpYyBvcHRpb25zKCkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IHRoaXM7XHJcblx0XHR2YXIgcm93aWQgICAgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKCk7XHJcblx0XHRpZiAoIXJvd2lkKSByZXR1cm47XHJcblx0XHR2YXIgdGhlT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKHJvd2lkKTtcclxuXHRcdHRoZUNvbXBvbmVudC5oYW5kbGVEZWxldGUodGhlT2JqZWN0KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRTZWxlY3RlZE9iamVjdCgpIDogYW55IHtcclxuXHRcdHJldHVybiB0aGlzLmdldFNlbGVjdGVkKClbMF07XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRTZWxlY3RlZCgpOkFycmF5PGFueT4ge1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XHJcblx0XHRcdHZhciBpZEFycmF5ID0gJCQodGhpcy5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJdGVtKHRydWUpO1xyXG5cdFx0XHRyZXR1cm4gaWRBcnJheTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRwdWJsaWMgb25TZWxlY3RDaGFuZ2UoaXRlbU1lc3NhZ2U6SXRlbVNlbGVjdGVkRXZlbnQpIHtcclxuXHRcdHRoaXMucHVibGlzaChcIm9uU2VsZWN0Q2hhbmdlXCIsIGl0ZW1NZXNzYWdlKTtcclxuXHR9XHJcblx0cHVibGljIGFkZENvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCB0aGVDb2x1bW46YW55KSB7XHJcblx0XHR2YXIgbmV3Q29sdW1uID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgID0gdGhlQ29sdW1uO1xyXG5cdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciAgICAgPSBjb2x1bW5OdW1iZXI7XHJcblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSA9IG5ld0NvbHVtbjtcclxuXHR9XHJcblx0cHVibGljIGFkZE1hcHBlZENvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCByZWZlcmVuY2VDbGFzc0ZpZWxkOnN0cmluZywgcmVmZXJlbmNlRmllbGROYW1lLCBkaXNwbGF5RmllbGROYW1lLCB0aGVDb2x1bW5WaWV3OmFueSkge1xyXG5cdFx0dmFyIG5ld0NvbHVtbiAgICAgICAgICAgICAgICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xyXG5cdFx0bmV3Q29sdW1uLm1hcHBlZCAgICAgICAgICAgICAgPSB0cnVlO1xyXG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUNsYXNzRmllbGQgPSByZWZlcmVuY2VDbGFzc0ZpZWxkXHJcblx0XHRuZXdDb2x1bW4ucmVmZXJlbmNlRmllbGQgICAgICA9IHJlZmVyZW5jZUZpZWxkTmFtZTtcclxuXHRcdG5ld0NvbHVtbi5kaXNwbGF5RmllbGROYW1lICAgID0gZGlzcGxheUZpZWxkTmFtZTtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICA9IHRoZUNvbHVtblZpZXc7XHJcblx0XHR2YXIgZnVuY3Rpb25NYW1lICAgICAgICAgICAgPSBcIm1hcEZ1bmN0aW9uXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdHZhciBtYXBwZWRGdW5jdGlvbiAgICAgICAgICA9IG5ldyBGdW5jdGlvbignb2JqJywgJ3snICsgJ3ZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShvYmpbXCInICsgcmVmZXJlbmNlQ2xhc3NGaWVsZCArICdcIl1cIik7JyArICd2YXIgdGhpc09iamVjdCA9IG9iamVjdFByb3h5LmdldE9uZShvYmpbXCInICsgcmVmZXJlbmNlRmllbGROYW1lICsgJ1wiXSk7JyArICdpZiAoIXRoaXNPYmplY3QpIHJldHVybiBcIk5vdCBGb3VuZFwiOycgKyAncmV0dXJuIHRoaXNPYmplY3RbXCInICsgZGlzcGxheUZpZWxkTmFtZSArICdcIl07JyArICd9Jyk7XHJcblx0XHRuZXdDb2x1bW4udGVtcGxhdGUgICAgICAgICAgPSBtYXBwZWRGdW5jdGlvbjtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICA9IHRoZUNvbHVtblZpZXc7XHJcblx0XHRuZXdDb2x1bW4udmlld1tcIl90ZW1wbGF0ZVwiXSA9IG5ld0NvbHVtbi50ZW1wbGF0ZTtcclxuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdICA9IG5ld0NvbHVtbjtcclxuXHR9XHJcbiAgICBwdWJsaWMgYWRkUmVmZXJlbmNlQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIHJlZmVyZW5jZUNsYXNzVHlwZTpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcclxuXHRcdHZhciBuZXdDb2x1bW4gICAgICAgICAgICAgICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xyXG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUNsYXNzVHlwZSA9IHJlZmVyZW5jZUNsYXNzVHlwZTtcclxuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xyXG5cdFx0dmFyIG9iamVjdFByb3h5ICAgICAgICA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShyZWZlcmVuY2VDbGFzc1R5cGUpO1xyXG5cdFx0dmFyIG9wdGlvbkxpc3QgICAgICAgICA9IG9iamVjdFByb3h5LmdldExpc3QoZmFsc2UpO1xyXG5cdFx0bmV3Q29sdW1uLm9wdGlvbkxpc3QgICA9IG9wdGlvbkxpc3Q7XHJcblx0XHRuZXdDb2x1bW4uY29sdW1uTnVtYmVyID0gY29sdW1uTnVtYmVyO1xyXG5cdFx0dmFyIG9wdGlvbkFycmF5ICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIG9wdGlvbkxpc3QpIHtcclxuXHRcdFx0dmFyIG9wdGlvbiAgICAgICAgICAgICAgICAgPSBuZXcgQzRPYmplY3QoKTtcclxuXHRcdFx0b3B0aW9uW1wiaWRcIl0gICAgICAgICAgICAgICA9IG9wdGlvbkxpc3RbaXRlbV1bXCJpZFwiXTtcclxuXHRcdFx0b3B0aW9uW3JlZmVyZW5jZUZpZWxkTmFtZV0gPSBvcHRpb25MaXN0W2l0ZW1dW3JlZmVyZW5jZUZpZWxkTmFtZV07XHJcblx0XHRcdG9wdGlvbkFycmF5LnB1c2gob3B0aW9uKTtcclxuXHRcdH1cclxuXHRcdG5ld0NvbHVtbi52aWV3W1wib3B0aW9uc1wiXSA9IG9wdGlvbkxpc3Q7XHJcblx0XHQvL25ld0NvbHVtbi52aWV3W1wib25cIl0gPSB7IG9uQ2hhbmdlIDogZnVuY3Rpb24oKSB7IFVJLk1lc3NhZ2UoXCJTZWxlY3QgQ2hhbmdlZFwiKTt9fVxyXG5cdFx0dGhpcy5jb2x1bW5zW2NvbHVtbk51bWJlcl0gPSBuZXdDb2x1bW47XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRPcHRpb25Db2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgb3B0aW9uTGlzdCwgdGhlQ29sdW1uKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRMaXN0KHRoZUxpc3QpIHtcclxuXHRcdHRoaXMudGhlTGlzdCA9IHRoZUxpc3Q7XHJcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuY2xlYXJBbGwoKTtcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkucGFyc2UodGhpcy50aGVMaXN0KTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFZhbHVlKHRoZUxpc3Q6YW55KSB7XHJcblx0XHR0aGlzLnNldExpc3QodGhlTGlzdCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRFZGl0YWJsZSh0aGVGbGFnOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuZWRpdGFibGUgPSB0aGVGbGFnO1xyXG5cdH1cclxuXHRwdWJsaWMgb25TdG9wRWRpdCh0aGVGaWVsZDpVSURhdGFUYWJsZUZpZWxkKSB7XHJcblx0XHRpZiAodGhpcy5wdWJsaXNoKFwib25TdG9wRWRpdFwiLCB0aGVGaWVsZCkpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGlmICh0aGVGaWVsZC5uZXdWYWx1ZSA9PSB0aGVGaWVsZC5vbGRWYWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcclxuXHRcdFx0dmFyIG9iamVjdFByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoaXMudWlDbGFzc1R5cGUpO1xyXG5cdFx0XHRvYmplY3RQcm94eS51cGRhdGVBdHRyaWJ1dGUodGhlRmllbGQucm93T2JqZWN0Ll9pZCwgdGhlRmllbGQuY29sdW1uTmFtZSwgdGhlRmllbGQubmV3VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHJlZnJlc2hSb3cocm93SUQgOiBhbnkpIHtcclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSlcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkucmVmcmVzaChyb3dJRCk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkJlZm9yZUVkaXRTdGFydCh0aGVGaWVsZCA6IFVJRGF0YVRhYmxlRmllbGQpIHtcclxuXHRcdGlmICh0aGlzLnB1Ymxpc2goXCJvbkJlZm9yZUVkaXRTdGFydFwiLCB0aGVGaWVsZCkpXHJcblx0XHRcdHJldHVybjtcclxuXHR9XHJcblx0cHVibGljIGhhbmRsZURlbGV0ZSh0aGVPYmplY3Q6YW55KSB7XHJcblx0XHRVSS5NZXNzYWdlKFwiSGFuZGxlIERlbGV0ZVwiICsgdGhlT2JqZWN0Ll9pZClcclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZU5hdmlnYXRpb25CYXIoKSB7XHJcblx0XHR0aGlzLnRvb2xCYXIgPSBuZXcgVUlUb29sYmFyKCk7XHJcblx0XHR0aGlzLnRvb2xCYXIuYWRkSXRlbShcIk5ld1wiLCBcIm5ld0l0ZW1cIilcclxuXHRcdHRoaXMudG9vbEJhci5hZGRJdGVtKFwiRGVsZXRlXCIsIFwiZGVsZXRlSXRlbVwiKVxyXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJPcHRpb25zXCIsIFwib3B0aW9uc1wiKVxyXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJFeHBvcnRcIiwgXCJleHBvcnRcIik7XHJcblx0XHR0aGlzLnRvb2xCYXIuc2V0RGF0YSh0aGlzKTtcclxuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XHJcblx0XHRcdHRoaXMudG9vbEJhci5zZXRUb29sQmFyKEZhY3RvcnkuR2V0Q2xhc3NMYWJlbCh0aGlzLnVpQ2xhc3NUeXBlKSwgRmFjdG9yeS5HZXRDbGFzc0ljb24odGhpcy51aUNsYXNzVHlwZSkpXHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIG9iamVjdCwgcHVibGlzaGVyKSB7XHJcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XHJcblx0XHRcdGNhc2UgXCJuZXdJdGVtXCIgOlxyXG5cdFx0XHRjYXNlIFwiZGVsZXRlSXRlbVwiIDpcclxuXHRcdFx0Y2FzZSBcIm9wdGlvbnNcIiA6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJleHBvcnRcIjpcclxuXHRcdFx0XHR0aGlzLmV4cG9ydFRvRXhjZWwoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGV4cG9ydFRvRXhjZWwoKSB7XHJcblx0XHRVSS5FeHBvcnRUb0V4Y2VsKHRoaXMuZGF0YVRhYmxlSUQpO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0TGlzdCgpOkFycmF5PGFueT4ge1xyXG5cdFx0aWYgKHRoaXMudGhlTGlzdClcclxuXHRcdFx0cmV0dXJuIHRoaXMudGhlTGlzdDtcclxuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XHJcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcclxuXHRcdFx0dmFyIHJldHVybkxpc3QgID0gb2JqZWN0UHJveHkuZ2V0TGlzdCh0cnVlKTtcclxuXHRcdFx0cmV0dXJuIHJldHVybkxpc3Q7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3IEFycmF5PGFueT4oKTtcclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZUNvbHVtblZpZXcoKTphbnkge1xyXG5cdFx0dmFyIGNvbHVtblZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIGkgICAgICAgICAgPSAwO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbHVtbnMpIHtcclxuXHRcdFx0Y29sdW1uVmlld1t0aGlzLmNvbHVtbnNbaXRlbV0uY29sdW1uTnVtYmVyXSA9IHRoaXMuY29sdW1uc1tpdGVtXS52aWV3O1xyXG5cdFx0XHRpKys7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucykge1xyXG5cdFx0XHRjb2x1bW5WaWV3W2krK10gPSB7XHJcblx0XHRcdFx0aWQ6IFwiXCIsIHRlbXBsYXRlOiB7XHJcblx0XHRcdFx0XHR2aWV3ICAgICAgOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRcdFx0dHlwZSAgICAgIDogXCJodG1sYnV0dG9uXCIsXHJcblx0XHRcdFx0XHRsYWJlbCAgICAgOiAnPHNwYW4gY2xhc3M9XCJ3ZWJpeF9pY29uIGZhLWFuZ2xlLWxlZnRcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+YmFjazwvc3Bhbj4nLFxyXG5cdFx0XHRcdFx0aW5wdXRXaWR0aDogODBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Y29sdW1uVmlld1tpKytdID0ge2lkOiBcImRyYWdcIiwgaGVhZGVyOiBcIlwiLCB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSd3ZWJpeF9kcmFnX2hhbmRsZSc+PC9kaXY+XCIsIHdpZHRoOiAzNX1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjb2x1bW5WaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29sdW1ucyhjb2x1bW5zIDogQXJyYXk8YW55Pikge1xyXG5cdFx0dmFyIGluZGV4ID0gMDtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gY29sdW1ucykge1xyXG5cdFx0XHR2YXIgbmV3Q29sdW1uID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgPSBjb2x1bW5zW2l0ZW1dO1xyXG5cdFx0XHRuZXdDb2x1bW4uY29sdW1uTnVtYmVyICAgICA9IGluZGV4Kys7XHJcblx0XHRcdHRoaXMuY29sdW1uc1tpbmRleF0gPSBuZXdDb2x1bW47XHJcblx0XHR9XHJcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpIHtcclxuXHRcdFx0dGhpcy5yZXBsYWNlQ29sdW1ucyhjb2x1bW5zKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHJlcGxhY2VDb2x1bW5zKGNvbHVtbnMgOiBBcnJheTxhbnk+KSB7XHJcblx0XHR0aGlzLmNvbHVtbnMgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcclxuXHRcdHZhciBpbmRleD0wO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBjb2x1bW5zKSB7XHJcblx0XHRcdHRoaXMuYWRkQ29sdW1uKGluZGV4KyssY29sdW1uc1tpdGVtXSk7XHJcblx0XHR9XHJcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5jb25maWcuY29sdW1ucyA9IHRoaXMuY3JlYXRlQ29sdW1uVmlldygpOztcclxuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnJlZnJlc2hDb2x1bW5zKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzb3J0KHByb3BlcnR5IDogc3RyaW5nLCBzb3J0RGlyZWN0aW9uOnN0cmluZywgdHlwZTpzdHJpbmc9XCJzdHJpbmdcIikge1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKVxyXG5cdFx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnNvcnQocHJvcGVydHksc29ydERpcmVjdGlvbix0eXBlKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZmlsdGVyKCBmdW5jIDogYW55KSB7XHJcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5maWx0ZXIoZnVuYyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNyZWF0ZU5hdmlnYXRpb25CYXIoKTtcclxuXHRcdHZhciByb3dzID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBpICAgID0gMDtcclxuXHRcdGlmICh0aGlzLl9zaG93VG9vbEJhcikge1xyXG5cdFx0XHR2YXIgbmF2QmFyVmlldyA9IHRoaXMudG9vbEJhci5nZXRWaWV3KCk7XHJcblx0XHRcdHJvd3NbMF0gICAgICAgID0gbmF2QmFyVmlldztcclxuXHRcdFx0aSsrXHJcblx0XHR9XHJcblx0XHR2YXIgdmlldyA9ICB7XHJcblx0XHRcdGlkICAgICAgICAgIDogdGhpcy5kYXRhVGFibGVJRCxcclxuXHRcdFx0dmlldyAgICAgICAgOiB0aGlzLnZpZXdUeXBlLFxyXG5cdFx0XHRzZWxlY3QgICAgICA6IFwicm93XCIsXHJcblx0XHRcdG5hdmlnYXRpb24gIDogdHJ1ZSxcclxuXHRcdFx0cmVzaXplQ29sdW1uOiB0cnVlLFxyXG5cdFx0XHRzY3JvbGx4eSAgICA6IHRydWUsXHJcblx0XHRcdGRyYWdDb2x1bW4gIDogdHJ1ZSxcclxuXHRcdFx0ZWRpdGFibGUgICAgOiB0aGlzLmVkaXRhYmxlLFxyXG5cdFx0XHRlZGl0YWN0aW9uICA6IHRoaXMuZWRpdGFjdGlvbixcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaGVpZ2h0ID4gMCkge1xyXG5cdFx0XHR2aWV3W1wiaGVpZ2h0XCJdID0gdGhpcy5oZWlnaHQ7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53aWR0aCA+IDApIHtcclxuXHRcdFx0dmlld1tcIndpZHRoXCJdID0gdGhpcy53aWR0aDtcclxuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5hdXRvQ29sdW1uQ29uZmlndXJlKSB7XHJcblx0XHRcdHZpZXdbXCJhdXRvQ29uZmlnXCJdID0gdHJ1ZTtcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHR2aWV3W1wiY29sdW1uc1wiXSA9IHRoaXMuY3JlYXRlQ29sdW1uVmlldygpO1xyXG5cdFx0aWYgKHRoaXMubXVsdGlTZWxlY3QpXHJcblx0XHRcdHZpZXdbXCJtdWx0aXNlbGVjdFwiXSA9IHRydWU7XHJcblx0XHRpZiAodGhpcy50ZW1wbGF0ZSkge1xyXG5cdFx0XHR2aWV3W1wiX3RlbXBsYXRlXCJdID0gdGhpcy50ZW1wbGF0ZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB0eXBlOiBcInNwYWNlXCIsIHJvd3M6IFsgdmlldyBdXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmRhdGFUYWJsZUlELCBcIm9uU2VsZWN0Q2hhbmdlXCIsIFVJRXZlbnRIYW5kbGVyLm9uU2VsZWN0Q2hhbmdlKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkFmdGVyRWRpdFN0b3BcIiwgVUlFdmVudEhhbmRsZXIub25BZnRlckVkaXRTdG9wKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkl0ZW1EYmxDbGlja1wiLCBVSUV2ZW50SGFuZGxlci5Pbkl0ZW1EYmxDbGljayk7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25CZWZvcmVFZGl0U3RhcnRcIiwgVUlFdmVudEhhbmRsZXIub25CZWZvcmVFZGl0U3RhcnRUYWJsZSk7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtQ2xpY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dmFyIHJlc3VsdExpc3QgPSB0aGlzLmdldExpc3QoKTtcclxuXHRcdGlmIChyZXN1bHRMaXN0KVxyXG5cdFx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpICQkKHRoaXMuZGF0YVRhYmxlSUQpLnBhcnNlKHJlc3VsdExpc3QpO1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKVxyXG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XHJcblx0XHRpZiAodGhpcy5fc2hvd1Rvb2xCYXIpXHR0aGlzLnRvb2xCYXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRUYWJsZUxpc3QoKSA6IEFycmF5PGFueT4ge1xyXG5cdFx0dmFyIGRhdGF0YWJsZSA9ICQkKHRoaXMuZGF0YVRhYmxlSUQpXHJcblx0XHR2YXIgZGF0YUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuZWFjaFJvdyhcclxuXHRcdFx0ZnVuY3Rpb24gKHJvdyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSBkYXRhdGFibGUuZ2V0SXRlbShyb3cpO1xyXG5cdFx0XHRcdGRhdGFMaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdClcclxuXHRcdHJldHVybiBkYXRhTGlzdDtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlEYXRhVGFibGUgPSBVSURhdGFUYWJsZTtcclxuXHJcbmNsYXNzIFVJVHJlZVRhYmxlIGV4dGVuZHMgVUlEYXRhVGFibGUge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlUcmVlVGFibGVfXCIpO1xyXG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xyXG5cdFx0dGhpcy5kYXRhVGFibGVJRCAgICAgICAgICA9IFwidHJlZVRhYmxlX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHR0aGlzLnNob3dBZGREZWxldGVDb2x1bW5zID0gZmFsc2U7XHJcblx0XHR0aGlzLnZpZXdUeXBlID0gXCJ0cmVldGFibGVcIjtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlUcmVlVGFibGUgPSBVSVRyZWVUYWJsZTtcclxuXHJcbmNsYXNzIFVJQ2FsZW5kYXJGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlDYWxlbmRhckZpZWxkX1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHVwZGF0ZUZpZWxkO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB7XHJcblx0XHRcdGlkICAgICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgICAgICAgICAgOiBcImRhdGVwaWNrZXJcIixcclxuXHRcdFx0bmFtZSAgICAgICAgICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLCAvL2RhdGU6ICBuZXcgRGF0ZSgyMDEyLCA2LCA4KSxcclxuXHRcdFx0dmFsdWUgICAgICAgICAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0bGFiZWxXaWR0aCAgICAgICAgOiAxMDAsXHJcblx0XHRcdGV2ZW50cyAgICAgICAgICAgIDogd2ViaXguRGF0ZS5pc0hvbGlkYXksXHJcblx0XHRcdGNhbGVuZGFyRGF0ZUZvcm1hdDogXCIlWS0lbS0lZFwiXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUNhbGVuZGFyRmllbGQgPSBVSUNhbGVuZGFyRmllbGQ7XHJcblxyXG5jbGFzcyBVSUNvbXBsZXhDb21wb25lbnQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHByb3RlY3RlZCBjb21wb25lbnRBcnJheTpBcnJheTxVSUNvbXBvbmVudD47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUNvbXBsZXhDb21wb25lbnRfXCIpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRBcnJheSA9IG5ldyBBcnJheTxVSUNvbXBvbmVudD4oKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRDb21wb25lbnQobGFiZWw6c3RyaW5nLCBjb21wb25lbnQ6VUlDb21wb25lbnQpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50QXJyYXlbbGFiZWxdID0gY29tcG9uZW50O1xyXG5cdFx0aWYgKGNvbXBvbmVudCkgY29tcG9uZW50LnNldFByb3BlcnR5KFwibmFtZVwiLCBsYWJlbCk7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDb21wb25lbnRzVmlldygpOmFueSB7XHJcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBpICAgICAgICAgPSAwO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XHJcblx0XHRcdGlmIChpdGVtICE9IFwidG9vbGJhclwiKVxyXG5cdFx0XHRcdHZpZXdBcnJheVtpKytdID0gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5nZXRWaWV3KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdmlld0FycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgbnVtT2ZDb21wb25lbnRzKCk6bnVtYmVyIHtcclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudEFycmF5KS5sZW5ndGhcclxuXHR9XHJcblx0cHVibGljIGdldENvbXBvbmVudChsYWJlbDpzdHJpbmcpOlVJQ29tcG9uZW50IHtcclxuXHRcdHZhciBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEFycmF5W2xhYmVsXTtcclxuXHRcdHJldHVybiBjb21wb25lbnRcclxuXHR9XHJcblx0cHVibGljIGdldEZpZWxkQ29tcG9uZW50KGxhYmVsOnN0cmluZyk6VUlGaWVsZCB7XHJcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRBcnJheVtsYWJlbF07XHJcblx0XHRyZXR1cm4gY29tcG9uZW50XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1x0fVxyXG5cdFxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcclxuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uc2V0RGF0YSh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSAkJCh0aGlzLmNvbXBvbmVudElEKS5kZXN0cnVjdG9yKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZXN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZGVzdHJ1Y3RvcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUNvbXBsZXhDb21wb25lbnQgPSBVSUNvbXBsZXhDb21wb25lbnQ7XHJcblxyXG5jbGFzcyBQb3J0YWxTZWN0aW9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHQvL3JlZ2lvbiBJbnN0YW5jZSBWYXJpYWJsZXNcclxuXHRwdWJsaWMgcG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBudWxsO1xyXG5cdHB1YmxpYyBjbGFzc1R5cGU6Q2xhc3NUeXBlO1xyXG5cdHB1YmxpYyB0aGVBcnJheTpBcnJheTxhbnk+O1xyXG5cdHB1YmxpYyBncmF2aXR5Om51bWJlciAgICAgICAgICAgICA9IDE7XHJcblx0cHVibGljIHBvcnRsZXROYW1lICAgICAgICAgICAgICAgID0gXCJcIjtcclxuXHRwdWJsaWMgc2VjdGlvbkhlYWRlcjpQb3J0YWxIZWFkZXIgPSBudWxsO1xyXG5cdHByaXZhdGUgdGVtcGxhdGUgICAgICAgICAgICAgICAgICA9IHt0eXBlOiBcImxpbmVcIn07XHJcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyWCAgICAgICAgICAgICAgID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyWSAgICAgICAgICAgICAgID0gZmFsc2U7XHJcblx0Ly9lbmRyZWdpb25cclxuXHQvL3JlZ2lvbiBDbGFzcyBWYXJpYWJsZXNcclxuXHRwdWJsaWMgc3RhdGljIENPTFVNTlMgPSBcImNvbHNcIjtcclxuXHRwdWJsaWMgc3RhdGljIFJPV1MgICAgPSBcInJvd3NcIjtcclxuXHRwdWJsaWMgc3RhdGljIFJFU0laRVIgPSBcInJlc2l6ZXJcIjtcclxuXHRwdWJsaWMgc3RhdGljIFJPT1QgICAgPSBcInJvb3Q7XCJcclxuXHRwdWJsaWMgc3RhdGljIEhFQURFUiAgPSBcImhlYWRlclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgUE9SVExFVCA9IFwicG9ydGxldFwiO1xyXG5cdC8vZW5kcmVnaW9uXHJcblx0Ly9yZWdpb24gQ2xhc3MgTWV0aG9kc1xyXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlQ29sdW1ucygpIHtcclxuXHRcdHJldHVybiBuZXcgUG9ydGFsQ29sdW1uKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZVJvd3MoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFBvcnRhbFJvdygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVSb290KCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxSb290KCk7XHJcblx0fVxyXG5cclxuXHQvL2VuZHJlZ2lvblxyXG5cdGdldCBzY3JvbGxCYXJYKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsQmFyWDtcclxuXHR9XHJcblx0c2V0IHNjcm9sbEJhclgodmFsdWU6Ym9vbGVhbikge1xyXG5cdFx0dGhpcy5fc2Nyb2xsQmFyWCA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgc2Nyb2xsQmFyWSgpOmJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbEJhclk7XHJcblx0fVxyXG5cdHNldCBzY3JvbGxCYXJZKHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX3Njcm9sbEJhclkgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKG5hbWUgPSBcIm5vU2VjdGlvbk5hbWVcIikge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxTZWN0aW9uX1wiKTtcclxuXHRcdHRoaXMudGhlQXJyYXkgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dGhpcy5wb3J0bGV0TmFtZSA9IG5hbWU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkUG9ydGxldChuYW1lLCBncmF2aXR5ID0gMSk6UG9ydGxldCB7XHJcblx0XHR2YXIgcG9ydGxldCA9IG5ldyBQb3J0bGV0KG5hbWUsIGdyYXZpdHkpO1xyXG5cdFx0dGhpcy50aGVBcnJheS5wdXNoKHBvcnRsZXQpO1xyXG5cdFx0cmV0dXJuIHBvcnRsZXQ7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRTZWN0aW9uKHRoZVNlY3Rpb246UG9ydGFsU2VjdGlvbiwgZ3Jhdml0eSA9IDEpIHtcclxuXHRcdHRoaXMudGhlQXJyYXkucHVzaCh0aGVTZWN0aW9uKTtcclxuXHRcdHRoaXMuZ3Jhdml0eSA9IGdyYXZpdHlcclxuXHR9XHJcblx0cHVibGljIGFkZFJlc2l6ZXIoKTpQb3J0YWxTZWN0aW9uIHtcclxuXHRcdHZhciByZXNpemVyID0gbmV3IFBvcnRhbFJlc2l6ZXIoKTtcclxuXHRcdHRoaXMudGhlQXJyYXkucHVzaChyZXNpemVyKTtcclxuXHRcdHJldHVybiByZXNpemVyO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkSGVhZGVyKHRpdGxlOnN0cmluZyk6UG9ydGFsSGVhZGVyIHtcclxuXHRcdHZhciBoZWFkZXIgPSBuZXcgUG9ydGFsSGVhZGVyKHRpdGxlKTtcclxuXHRcdHRoaXMudGhlQXJyYXkudW5zaGlmdChoZWFkZXIpO1xyXG5cdFx0dGhpcy5zZWN0aW9uSGVhZGVyID0gaGVhZGVyO1xyXG5cdFx0cmV0dXJuIGhlYWRlcjtcclxuXHR9XHJcblx0cHVibGljIHJlbW92ZUhlYWRlcigpIHtcclxuXHRcdGlmICghdGhpcy5zZWN0aW9uSGVhZGVyKSByZXR1cm47XHJcblx0XHR0aGlzLnRoZUFycmF5LnNoaWZ0KCk7XHJcblx0fVxyXG5cclxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudCBNZXRob2RzXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy50ZW1wbGF0ZVtcImdyYXZpdHlcIl0gPSB0aGlzLmdyYXZpdHk7XHJcblx0XHR0aGlzLnRlbXBsYXRlW1wiaWRcIl0gICAgICA9IHRoaXMuY29tcG9uZW50SUQ7XHJcblx0XHR0aGlzLnRlbXBsYXRlW1wiZHJhZ1wiXSAgICA9IHRydWU7XHJcblx0XHRpZiAodGhpcy5zY3JvbGxCYXJYICYmIHRoaXMuc2Nyb2xsQmFyWSkge1xyXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseHlcIl0gPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnNjcm9sbEJhclgpXHJcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx4XCJdID0gdHJ1ZTsgZWxzZSBpZiAodGhpcy5zY3JvbGxCYXJZKVxyXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseVwiXSA9IHRydWU7XHJcblx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMudGhlQXJyYXkpIHtcclxuXHRcdFx0dGhpcy50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL2VuZHJlZ2lvblxyXG59IHRoaXMuUG9ydGFsU2VjdGlvbiA9IFBvcnRhbFNlY3Rpb247XHJcblxyXG5jbGFzcyBQb3J0YWxDb2x1bW4gZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG5hbWUpO1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLkNPTFVNTlM7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICA9IFBvcnRhbFNlY3Rpb24uQ09MVU1OUztcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxDb2x1bW5fXCIpO1xyXG5cdH1cclxufSB0aGlzLlBvcnRhbENvbHVtbiA9IFBvcnRhbENvbHVtblxyXG5cclxuY2xhc3MgUG9ydGFsUm9vdCBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xyXG5cdFx0c3VwZXIobmFtZSk7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9PVDtcclxuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgID0gXCJyb290XCI7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsUm9vdF9cIik7XHJcblx0fVxyXG59IHRoaXMuUG9ydGFsUm9vdCA9IFBvcnRhbFJvb3RcclxuXHJcbmNsYXNzIFBvcnRhbFJvdyBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xyXG5cdFx0c3VwZXIobmFtZSk7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9XUztcclxuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgID0gXCJyb3dcIjtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSb3dfXCIpO1xyXG5cdH1cclxufXRoaXMuUG9ydGFsUm93ID0gUG9ydGFsUm93O1xyXG5cclxuY2xhc3MgUG9ydGFsSGVhZGVyIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblx0cHVibGljIGhlYWRlclRlbXBsYXRlICAgID0ge3ZpZXc6IFwidGVtcGxhdGVcIiwgdGVtcGxhdGU6IFwiSGVhZGVyXCIsIHR5cGU6IFwiaGVhZGVyXCJ9O1xyXG5cdHB1YmxpYyBoZWFkZXJWaWV3OmFueTtcclxuXHRwdWJsaWMgaGVhZGVyVGV4dDpzdHJpbmcgPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsSGVhZGVyX1wiKTtcclxuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcclxuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcclxuXHRcdHRoaXMuaGVhZGVyVGVtcGxhdGVbXCJpZFwiXSAgICAgICA9IFwiaGVhZGVyX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHR0aGlzLmhlYWRlclRlbXBsYXRlW1widGVtcGxhdGVcIl0gPSB0aXRsZTtcclxuXHRcdHRoaXMuaGVhZGVyVGV4dCAgICAgICAgICAgICAgICAgPSB0aXRsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLmhlYWRlclRlbXBsYXRlO1xyXG5cdH1cclxufXRoaXMuUG9ydGFsSGVhZGVyID0gUG9ydGFsSGVhZGVyO1xyXG5jbGFzcyBQb3J0YWxSZXNpemVyIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblx0cHVibGljICByZXNpemVyVGVtcGxhdGUgPSB7dmlldzogXCJyZXNpemVyXCJ9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG5hbWUpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFJlc2l6ZXJfXCIpO1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggICAgPSBQb3J0YWxTZWN0aW9uLlJFU0laRVI7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICA9IFBvcnRhbFNlY3Rpb24uUkVTSVpFUjtcclxuXHRcdHRoaXMucmVzaXplclRlbXBsYXRlW1wiaWRcIl0gPSBcInVpUmVzaXplcl9cIiArIHdlYml4LnVpZCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVzaXplclRlbXBsYXRlO1xyXG5cdH1cclxufXRoaXMuUG9ydGFsUmVzaXplciA9IFBvcnRhbFJlc2l6ZXI7XHJcblxyXG5jbGFzcyBQb3J0bGV0IGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblxyXG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xyXG5cdHB1YmxpYyBwb3J0bGV0Vmlldzphbnk7XHJcblx0cHVibGljIHBvcnRsZXRDb21wb25lbnRWaWV3OmFueTtcclxuXHRwdWJsaWMgZGVmYXVsdFBvcnRsZXRWaWV3OmFueTtcclxuXHRwdWJsaWMgbm9uQ29tcG9uZW50VmlldzphbnkgPSBudWxsO1xyXG5cdHB1YmxpYyBpbnRlcm5hbFZpZXc6YW55XHJcblx0cHVibGljIGdyYXZpdHk6bnVtYmVyO1xyXG5cdHB1YmxpYyB2aWV3Q29udHJvbGxlcjpVSUNvbXBvbmVudDtcclxuXHRwdWJsaWMgaGlkZGVuOmJvb2xlYW4gICAgICAgPSBmYWxzZTtcclxuXHQvL2VuZHJlZ2lvblxyXG5cdHB1YmxpYyBzdGF0aWMgY2FzdChhU2VjdGlvbjphbnkpOlBvcnRsZXQge1xyXG5cdFx0cmV0dXJuIDxQb3J0bGV0PiBhU2VjdGlvbjtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKHBvcnRsZXROYW1lOnN0cmluZywgZ3Jhdml0eSA9IDEpIHtcclxuXHRcdHN1cGVyKHBvcnRsZXROYW1lKTtcclxuXHRcdHRoaXMuZ3Jhdml0eSAgICAgICAgICAgICAgPSBncmF2aXR5O1xyXG5cdFx0dGhpcy5wb3J0bGV0VmlldyAgICAgICAgICA9IHtpZDogdGhpcy5jb21wb25lbnRJRCwgbWluV2lkdGg6IDEwMCwgdGVtcGxhdGU6IFwiQ29udGVudFwiLCB2aWV3OiBcInRlbXBsYXRlXCJ9XHJcblx0XHR0aGlzLnBvcnRsZXRDb21wb25lbnRWaWV3ID0ge3R5cGU6IFwibGluZVwifVxyXG5cdFx0dGhpcy5kZWZhdWx0UG9ydGxldFZpZXcgICA9IHRoaXMucG9ydGxldFZpZXc7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCAgID0gUG9ydGFsU2VjdGlvbi5QT1JUTEVUO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRsZXRfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHJlcGxhY2VWaWV3KCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWaWV3KCksIG51bGwsIDYpKTtcclxuXHRcdHdlYml4LnVpKHRoaXMuZ2V0VmlldygpLCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XHJcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0VmlldygpLCBudWxsLCA2KSk7XHJcblx0fVxyXG5cdHB1YmxpYyBoaWRlKCkge1xyXG5cdFx0dGhpcy5oaWRkZW4gPSB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyByZXNldFZpZXcoKSB7XHJcblx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXdcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudCh0aGVDb21wb25lbnQ6VUlDb21wb25lbnQpIHtcclxuXHRcdHRoaXMudmlld0NvbnRyb2xsZXIgPSB0aGVDb21wb25lbnQ7XHJcblx0fVxyXG5cdHB1YmxpYyByZXNpemUoKSB7XHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkucmVzaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50cyBNZXRob2RzXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0aWYgKHRoaXMudmlld0NvbnRyb2xsZXIpIHtcclxuXHRcdFx0dmFyIHZpZXdBcnJheSAgICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdFx0dGhpcy5wb3J0bGV0VmlldyAgICAgICAgID0gdGhpcy5wb3J0bGV0Q29tcG9uZW50VmlldztcclxuXHRcdFx0dmFyIGNvbnRyb2xsZXJWaWV3ICAgICAgID0gdGhpcy52aWV3Q29udHJvbGxlci5nZXRWaWV3KCk7XHJcblx0XHRcdHZpZXdBcnJheVswXSAgICAgICAgICAgICA9IGNvbnRyb2xsZXJWaWV3O1xyXG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3W1wicm93c1wiXSA9IHZpZXdBcnJheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucG9ydGxldFZpZXcgPSB0aGlzLmRlZmF1bHRQb3J0bGV0VmlldztcclxuXHRcdH1cclxuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJpZFwiXSAgICAgID0gdGhpcy5nZXRDb21wb25lbnRJRCgpO1xyXG5cdFx0dGhpcy5wb3J0bGV0Vmlld1tcImdyYXZpdHlcIl0gPSB0aGlzLmdyYXZpdHk7XHJcblx0XHR0aGlzLnBvcnRsZXRWaWV3W1wiZHJhZ1wiXSAgICA9IHRydWU7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3J0bGV0VmlldztcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHRpZiAodGhpcy52aWV3Q29udHJvbGxlcikge1xyXG5cdFx0XHR0aGlzLnZpZXdDb250cm9sbGVyLmluaXRpYWxpemUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy50aGVBcnJheSkge1xyXG5cdFx0XHR0aGlzLnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlBvcnRsZXQgPSBQb3J0bGV0O1xyXG5cclxuZW51bSBQb3J0YWxUeXBlIHsgT25lVmlldywgRXhwbG9yZXJWaWV3LCBEZXRhaWxWaWV3IH10aGlzLlBvcnRhbFR5cGUgPSBQb3J0YWxUeXBlO1xyXG5lbnVtIFBvcnRhbE5hbWVzIHtFWFBMT1JFUiA9IDAsIERFVEFJTCA9IDEsIE1BSU4gPSAyLCBJTkZPID0gM310aGlzLlBvcnRhbE5hbWVzID0gUG9ydGFsTmFtZXM7XHJcblxyXG5jbGFzcyBQb3J0YWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblx0cHVibGljIHBvcnRhbFJvb3Q6UG9ydGFsUm9vdDtcclxuXHRwdWJsaWMgcG9ydGFsQ29udGFpbmVyOnN0cmluZyA9IG51bGw7XHJcblx0cHVibGljIHZpZXdQb3J0bGV0OlBvcnRsZXQgICAgPSBudWxsO1xyXG5cdHB1YmxpYyBwb3J0YWxUeXBlOlBvcnRhbFR5cGU7XHJcblx0cHVibGljIG5ld1ZpZXdQb3J0OmJvb2xlYW4gICAgPSBmYWxzZTtcclxuXHRwdWJsaWMgdmlld1R5cGUgICAgICAgICAgICAgICA9IG51bGw7XHJcblx0cHVibGljIHNlY3Rpb25UZW1wbGF0ZSAgICAgICAgPSB7dHlwZTogXCJsaW5lXCJ9O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwb3J0YWxUeXBlPzpQb3J0YWxUeXBlKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbF9cIik7XHJcblx0XHR0aGlzLnBvcnRhbFJvb3QgPSBuZXcgUG9ydGFsUm9vdCgpO1xyXG5cdFx0aWYgKCFwb3J0YWxUeXBlKSB7XHJcblx0XHRcdHN3aXRjaCAocG9ydGFsVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5PbmVWaWV3IDpcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemVPbmVWaWV3KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBQb3J0YWxUeXBlLkV4cGxvcmVyVmlldyA6XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplRXhwbG9yZXJWaWV3KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBQb3J0YWxUeXBlLkRldGFpbFZpZXcgOlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZURldGFpbFZpZXcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHBvcnRhbFN0cmluZyhwb3J0YWxOYW1lczpQb3J0YWxOYW1lcykge1xyXG5cdFx0c3dpdGNoIChwb3J0YWxOYW1lcykge1xyXG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLkVYUExPUkVSIDpcclxuXHRcdFx0XHRyZXR1cm4gXCJleHBsb3JlclwiO1xyXG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLkRFVEFJTCA6XHJcblx0XHRcdFx0cmV0dXJuIFwiZGV0YWlsQXJlYVwiO1xyXG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLk1BSU4gOlxyXG5cdFx0XHRcdHJldHVybiBcIm1haW5cIjtcclxuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5JTkZPIDpcclxuXHRcdFx0XHRyZXR1cm4gXCJpbmZvXCI7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHJldHVybiBcIk5PTkFNRVwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpIHtcclxuXHRcdHZhciByb290ICAgICAgPSB0aGlzLmdldFJvb3QoKTtcclxuXHRcdHZhciBuZXdDb2x1bW4gPSB0aGlzLmNyZWF0ZUNvbHVtbnMoXCJjb2x1bW5zXCIpO1xyXG5cdFx0dmFyIG5ld1JvdyAgICA9IHRoaXMuY3JlYXRlUm93cyhcInJvd3NcIik7XHJcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRQb3J0bGV0KFBvcnRhbE5hbWVzLkVYUExPUkVSKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRSZXNpemVyKCk7XHJcblx0XHRuZXdSb3cuYWRkUG9ydGxldChQb3J0YWxOYW1lcy5ERVRBSUwpO1xyXG5cdFx0bmV3Um93LmFkZFJlc2l6ZXIoKTtcclxuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KFBvcnRhbE5hbWVzLklORk8pO1xyXG5cdFx0bmV3Q29sdW1uLmFkZFNlY3Rpb24obmV3Um93KTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemVPbmVWaWV3KCkge1xyXG5cdFx0dmFyIHJvb3QgICAgICA9IHRoaXMuZ2V0Um9vdCgpO1xyXG5cdFx0dmFyIG5ld0NvbHVtbiA9IHRoaXMuY3JlYXRlQ29sdW1ucyhcImNvbHVtbnNcIik7XHJcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLk1BSU4pKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemVEZXRhaWxWaWV3KCkge1xyXG5cdFx0dmFyIHJvb3QgICA9IHRoaXMuZ2V0Um9vdCgpO1xyXG5cdFx0dmFyIG5ld1JvdyA9IHRoaXMuY3JlYXRlUm93cyhcInJvd3NcIik7XHJcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Um93KTtcclxuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLkRFVEFJTCkpO1xyXG5cdFx0bmV3Um93LmFkZFJlc2l6ZXIoKTtcclxuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLklORk8pKTtcclxuXHR9XHJcblx0cHVibGljIGdldFJvb3QoKTpQb3J0YWxSb290IHtcclxuXHRcdHJldHVybiB0aGlzLnBvcnRhbFJvb3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDb2x1bW5zKG5hbWU/KTpQb3J0YWxDb2x1bW4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxDb2x1bW4obmFtZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVSb3dzKG5hbWU/OnN0cmluZyk6UG9ydGFsUm93IHtcclxuXHRcdHJldHVybiBuZXcgUG9ydGFsUm93KG5hbWUpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29udGFpbmVyKGNvbnRhaW5lcklEOnN0cmluZykge1xyXG5cdFx0dGhpcy5wb3J0YWxDb250YWluZXIgPSBjb250YWluZXJJRDtcclxuXHRcdHRoaXMudmlld1BvcnRsZXQgICAgID0gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIHNldFZpZXdQb3J0bGV0KHRoZVBvcnRsZXQ6UG9ydGxldCkge1xyXG5cdFx0dGhpcy52aWV3UG9ydGxldCAgICAgPSB0aGVQb3J0bGV0O1xyXG5cdFx0dGhpcy5wb3J0YWxDb250YWluZXIgPSBcIlwiO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0UG9ydGxldChwb3J0YWxOYW1lOnN0cmluZyk6UG9ydGxldCB7XHJcblx0XHRyZXR1cm4gUG9ydGxldC5jYXN0KHRoaXMuZmluZCh0aGlzLnBvcnRhbFJvb3QsIHBvcnRhbE5hbWUpKTtcclxuXHR9XHJcblx0cHVibGljIGZpbmQocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uLCBuYW1lKTpQb3J0YWxTZWN0aW9uIHtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gcG9ydGFsU2VjdGlvbi50aGVBcnJheSkge1xyXG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0bGV0TmFtZSA9PSBuYW1lKVxyXG5cdFx0XHRcdHJldHVybiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dO1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5maW5kKDxQb3J0YWxTZWN0aW9uPiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLCBuYW1lKTtcclxuXHRcdFx0aWYgKHJlc3VsdClcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHRoZVZpZXcgICA9IHRoaXMuc2VjdGlvblRlbXBsYXRlO1xyXG5cdFx0dGhlVmlld1tcImlkXCJdICAgPSB0aGlzLmdldENvbXBvbmVudElEKCk7XHJcblx0XHR2aWV3QXJyYXlbMF0gICAgPSB0aGlzLmNyZWF0ZVBvcnRhbFZpZXcoKTtcclxuXHRcdHRoZVZpZXdbXCJyb3dzXCJdID0gdmlld0FycmF5O1xyXG5cdFx0aWYgKHRoaXMudmlld1R5cGUpXHJcblx0XHRcdHRoZVZpZXdbXCJ2aWV3XCJdID0gdGhpcy52aWV3VHlwZTtcclxuXHRcdHRoaXMuc2V0Q29tcG9uZW50Vmlldyh0aGVWaWV3KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVQb3J0YWxWaWV3KCk6YW55IHtcclxuXHRcdHZhciB0aGVQb3J0YWxWaWV3OlBvcnRsZXQ7XHJcblx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUodGhpcy5wb3J0YWxSb290KTtcclxuXHRcdHJldHVybiByZXN1bHRBcnJheVswXTtcclxuXHR9XHJcblx0cHVibGljIHRyZWUocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uKTpBcnJheTxhbnk+IHtcclxuXHRcdHZhciByZXR1cm5BcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHBvcnRhbFNlY3Rpb24udGhlQXJyYXkpIHtcclxuXHRcdFx0aW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XHJcblx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleClcclxuXHRcdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXggPT0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TIHx8IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4ID09IFBvcnRhbFNlY3Rpb24uUk9XUylcclxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4O1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5nZXRWaWV3KCk7XHJcblx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnRoZUFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUoPFBvcnRhbFNlY3Rpb24+IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0pO1xyXG5cdFx0XHRcdHJlc3VsdFtpbmRleF0gICA9IHJlc3VsdEFycmF5O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybkFycmF5LnB1c2gocmVzdWx0KVxyXG5cdFx0XHQvLyAgY29uc29sZS5sb2coXCJSZXR1cm5pbmcgUmVzdWx0XCIrQzRsb2cucHJpbnRUaGlzKHJlc3VsdCkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybkFycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZVRyZWUoKSB7XHJcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnBvcnRhbFJvb3QudGhlQXJyYXkpIHtcclxuXHRcdFx0dGhpcy5wb3J0YWxSb290LnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5BcnJheTtcclxuXHR9XHJcblx0cHVibGljIHJlZnJlc2goKSB7XHJcblx0XHR0aGlzLnNob3coKTtcclxuXHR9XHJcblx0cHVibGljIHNob3codGhlV2luZG93PzphbnkpOmFueSB7XHJcblx0XHR2YXIgc2hvd1ZpZXcgPSB0aGlzLmdldFZpZXcoKTtcclxuXHRcdHZhciB4Vmlldzphbnk7XHJcblx0XHRpZiAodGhlV2luZG93KSB7XHJcblx0XHRcdHZhciByb3dzICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdFx0cm93c1swXSAgICAgICAgICAgPSBzaG93VmlldztcclxuXHRcdFx0dGhlV2luZG93W1wicm93c1wiXSA9IHJvd3M7XHJcblx0XHRcdEFwcExvZy5wcmludFRoaXModGhlV2luZG93KTtcclxuXHRcdFx0eFZpZXcgPSB3ZWJpeC51aSh0aGVXaW5kb3cpLnNob3coKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBvcnRhbENvbnRhaW5lcikge1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudFZpZXdbXCJjb250YWluZXJcIl0gPSB0aGlzLnBvcnRhbENvbnRhaW5lcjtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEFwcExvZy5wcmludFRoaXMoc2hvd1ZpZXcpO1xyXG5cdFx0XHRcdHhWaWV3ID0gd2ViaXgudWkoc2hvd1ZpZXcsIHRoaXMucG9ydGFsQ29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLnByaW50VGhpcyhzaG93Vmlldyk7XHJcblx0XHRcdHhWaWV3ID0gd2ViaXgudWkoc2hvd1ZpZXcsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcIlNob3cgVmlld1wiKTtcclxuXHRcdC8vQzRsb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcclxuXHRcdHJldHVybiB4VmlldztcclxuXHR9XHJcblx0cHVibGljIHBvcHVwKHRoZVdpbmRvdzphbnkpIHtcclxuXHRcdHZhciBzaG93VmlldyA9IHRoaXMuZ2V0VmlldygpO1xyXG5cdFx0dmFyIHJvd3MgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0cm93c1swXSAgICAgICAgICAgPSBzaG93VmlldztcclxuXHRcdHRoZVdpbmRvd1tcImJvZHlcIl0gPSBDNE9iamVjdC5DbG9uZShzaG93Vmlldyk7XHJcblx0XHQvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoZVdpbmRvdykpO1xyXG5cdFx0dmFyIG5ld1dpbmRvdyA9IHdlYml4LnVpKHRoZVdpbmRvdyk7XHJcblx0XHRyZXR1cm4gbmV3V2luZG93O1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZVRyZWUoKTtcclxuXHR9XHJcblxyXG59IHRoaXMuUG9ydGFsID0gUG9ydGFsO1xyXG5cclxuY2xhc3MgVUlQb3B1cFdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0cHVibGljIHN0YXRpYyBDbG9zZUJ1dHRvbigpIHtcclxuXHRcdHZhciB0aGVJRCAgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUNvbXBvbmVudD4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0JCQodGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpLmNsb3NlKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgRnVsbFNjcmVlbigpIHtcclxuXHRcdHZhciB0aGVJRCAgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSVBvcHVwV2luZG93PiAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR0aGVDb21wb25lbnQuZnVsbHNjcmVlblRvZ2dsZSgpO1xyXG5cdH1cclxuXHJcblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXHJcblx0cHVibGljIHRpdGxlOnN0cmluZztcclxuXHRwdWJsaWMgcmVzaXplOmJvb2xlYW4gPSBmYWxzZTtcclxuXHRwdWJsaWMgbW9kYWw6Ym9vbGVhbiAgPSB0cnVlO1xyXG5cdHB1YmxpYyB0aGVDb21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0cHVibGljIHRoZVBvcnRhbCAgICAgID0gbmV3IFBvcnRhbCgpO1xyXG5cdHB1YmxpYyBjbG9zZUJ1dHRvbklEICA9IFwiY2xvc2VCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRwdWJsaWMgZnVsbHNjcmVlbklEICAgPSBcImZ1bGxTY3JlZW5JRF9cIit3ZWJpeC51aWQoKTtcclxuXHRwdWJsaWMgd2lkdGggICAgICAgICAgPSA1MDA7XHJcblx0cHVibGljIGhlaWdodCAgICAgICAgID0gNTAwO1xyXG5cdC8vZW5kcmVnaW9uXHJcblx0Y29uc3RydWN0b3IobGFiZWw6c3RyaW5nID0gXCJQb3B1cCBXaW5kb3dcIiwgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50ID0gbnVsbCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuYWRkUHJvcGVydGllcyAoIHsgd2lkdGggOiB0aGlzLndpZHRoLCBoZWlnaHQgOiB0aGlzLmhlaWdodCB9KVxyXG5cdFx0dGhpcy5zZXRJRChcIlVJUG9wdXBXaW5kb3dfXCIpO1xyXG5cdFx0dmFyIHBvcnRhbFJvb3QgPSB0aGlzLnRoZVBvcnRhbC5nZXRSb290KCk7XHJcblx0XHR2YXIgcm93cyA9IHRoaXMudGhlUG9ydGFsLmNyZWF0ZVJvd3MoKTtcclxuXHRcdHJvd3MuYWRkUG9ydGxldChcIm1haW5cIik7XHJcblx0XHRwb3J0YWxSb290LmFkZFNlY3Rpb24oKHJvd3MpKTtcclxuXHRcdHRoaXMuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XHJcblx0XHR0aGlzLmNvbXBvbmVudExhYmVsID0gbGFiZWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xyXG5cdFx0dGhpcy50aGVDb21wb25lbnQgPSB0aGVDb21wb25lbnQ7XHJcblx0XHR0aGlzLnRoZVBvcnRhbC5nZXRQb3J0bGV0KFwibWFpblwiKS5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwiY29tcG9uZW50XCIsIHRoZUNvbXBvbmVudCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93KHRoZUNvbXBvbmVudD86VUlDb21wb25lbnQpIHtcclxuXHRcdGlmICh0aGVDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnRoZUNvbXBvbmVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJUcnlpbmcgdG8gU2hvdyBXaW5kb3cgV2l0aCBNaXNzaW5nIFZpZXdcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBwb3B1cCA9IHRoaXMudGhlUG9ydGFsLnBvcHVwKHRoaXMuZ2V0VmlldygpKTtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5Qb3B1cCk7XHJcblx0XHRwb3B1cC5zaG93KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZnVsbHNjcmVlblRvZ2dsZSgpIHtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuY29uZmlnLmZ1bGxzY3JlZW4gPSAhJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5jb25maWcuZnVsbHNjcmVlblxyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgaGlkZSgpIHtcclxuXHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIHRoaXMpO1xyXG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5DbG9zZURpYWdyYW0pO1xyXG5cdFx0aWYgKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkpIHtcclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBjbG9zZSgpIHtcclxuXHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIHRoaXMpO1xyXG5cdFx0aWYgKCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpLmRlc3RydWN0b3IoKTtcclxuXHRcdH1cclxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuQ2xvc2VEaWFncmFtKTtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuY2xvc2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdHZpZXcgICAgOiBcIndpbmRvd1wiLFxyXG5cdFx0XHRpZCAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0Y3NzICAgICA6IFwiYzRwb3B1cCBhbmltYXRlZCB6b29tSW5cIixcclxuXHRcdFx0cG9zaXRpb246IFwiY2VudGVyXCIsXHJcblx0XHRcdG1vZGFsICAgOiB0cnVlLFxyXG5cdFx0XHRtb3ZlICAgIDogdHJ1ZSxcclxuXHRcdFx0c2Nyb2xseHk6IHRydWUsXHJcblx0XHRcdGhpZGRlbiAgOiB0cnVlLFxyXG5cdFx0XHRyZXNpemUgIDogdHJ1ZSxcclxuXHRcdFx0aGVhZCAgICA6IHtcclxuXHRcdFx0XHR2aWV3OiBcInRvb2xiYXJcIiwgbWFyZ2luOiAtNCwgcG9zaXRpb246IFwiY2VudGVyXCIsIGNvbHM6IFtcclxuXHRcdFx0XHRcdCB7dmlldzogXCJsYWJlbFwiLCBsYWJlbDogdGhpcy5jb21wb25lbnRMYWJlbH0sXHJcblx0XHRcdFx0XHQge3ZpZXcgOiBcImljb25cIixpZCA6IHRoaXMuZnVsbHNjcmVlbklELGljb24gOiBcImFycm93cy1hbHRcIixjc3MgIDogXCJhbHRlclwiLGNsaWNrOiBVSVBvcHVwV2luZG93LkZ1bGxTY3JlZW59LFxyXG5cdFx0ICAgICAgICAgICAgIHt2aWV3IDogXCJpY29uXCIsaWQgOiB0aGlzLmNsb3NlQnV0dG9uSUQsaWNvbiA6IFwidGltZXMtY2lyY2xlXCIsY3NzICA6IFwiYWx0ZXJcIixjbGljazogVUlQb3B1cFdpbmRvdy5DbG9zZUJ1dHRvbn1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHQvLyB0aGlzLnRoZUNvbXBvbmVudC5pbml0aWFsaXplKCk7XHJcblx0XHQkJCh0aGlzLmNsb3NlQnV0dG9uSUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcclxuXHRcdCQkKHRoaXMuZnVsbHNjcmVlbklEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XHJcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXSAgID0gdGhpcztcclxuXHR9XHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlVJUG9wdXBXaW5kb3cgPSBVSVBvcHVwV2luZG93O1xyXG5cclxuY2xhc3MgQ29uZmlybUFjdGlvbiB7XHJcblx0bGFiZWw6c3RyaW5nO1xyXG5cdGV2ZW50OnN0cmluZztcclxufSB0aGlzLkNvbmZpcm1BY3Rpb24gPSBDb25maXJtQWN0aW9uO1xyXG5cclxuY2xhc3MgVUlDb25maXJtV2luZG93IGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcclxuXHRwcm90ZWN0ZWQgcG9wdXA6VUlQb3B1cFdpbmRvdztcclxuXHRwdWJsaWMgdGl0bGU6c3RyaW5nO1xyXG5cdHB1YmxpYyBzdGF0ZW1lbnQ6c3RyaW5nO1xyXG5cdHB1YmxpYyBvcHRpb24xOkNvbmZpcm1BY3Rpb247XHJcblx0cHVibGljIG9wdGlvbjI6Q29uZmlybUFjdGlvbjtcclxuXHRwdWJsaWMgb3B0aW9uMzpDb25maXJtQWN0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcsIHN0YXRlbWVudDpzdHJpbmcsIG9wdGlvbjE6Q29uZmlybUFjdGlvbiwgb3B0aW9uMjpDb25maXJtQWN0aW9uID0gbnVsbCwgb3B0aW9uMzpDb25maXJtQWN0aW9uID0gbnVsbCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMudGl0bGUgICAgID0gdGl0bGU7XHJcblx0XHR0aGlzLnN0YXRlbWVudCA9IHN0YXRlbWVudDtcclxuXHRcdHRoaXMub3B0aW9uMSAgID0gb3B0aW9uMTtcclxuXHRcdHRoaXMub3B0aW9uMiAgID0gb3B0aW9uMjtcclxuXHRcdHRoaXMub3B0aW9uMyAgID0gb3B0aW9uMztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjbG9zZSgpIHtcclxuXHRcdHRoaXMucG9wdXAuY2xvc2UoKTtcclxuXHR9XHJcblx0cHVibGljIGxpc3RlbihldmVudDphbnksIG9iamVjdDphbnksIGNhbGxlcjpVSUNvbXBvbmVudCkge1xyXG5cdFx0c3dpdGNoIChldmVudCkge1xyXG5cdFx0XHRjYXNlIFwiY2xpY2tcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZiAoY2FsbGVyID09PSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjFcIikpIHtcclxuXHRcdFx0XHRcdHRoaXMucHVibGlzaCh0aGlzLm9wdGlvbjEuZXZlbnQsIHRoaXMub3B0aW9uMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjYWxsZXIgPT09IHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoKHRoaXMub3B0aW9uMi5ldmVudCwgdGhpcy5vcHRpb24yKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNhbGxlciA9PT0gdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2godGhpcy5vcHRpb24zLmV2ZW50LCB0aGlzLm9wdGlvbjMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiY2xvc2VcIiA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCBudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR2YXIgdGl0bGUgPSBuZXcgVUlMYWJlbCh7bGFiZWw6IHRoaXMudGl0bGUsIGFsaWdubWVudDogXCJjZW50ZXJcIiwgbGFiZWxXaWR0aDogMTAwfSk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcInRpdGxlXCIsIHRpdGxlKTtcclxuXHRcdHZhciB0ZXh0ID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnN0YXRlbWVudCwgYWxpZ25tZW50OiBcImNlbnRlclwiLCBsYWJlbFdpZHRoOiAxMDB9KTtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGV4dFwiLCB0ZXh0KTtcclxuXHRcdHZhciBvcHRpb24xID0gbmV3IFVJQnV0dG9uKHtsYWJlbDogdGhpcy5vcHRpb24xLmxhYmVsfSk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcIm9wdGlvbjFcIiwgb3B0aW9uMSk7XHJcblx0XHRpZiAodGhpcy5vcHRpb24xKSB7XHJcblx0XHRcdHZhciBvcHRpb24yID0gbmV3IFVJQnV0dG9uKHRoaXMub3B0aW9uMi5sYWJlbCk7XHJcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uMlwiLCBvcHRpb24yKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbjMpIHtcclxuXHRcdFx0dmFyIG9wdGlvbjMgPSBuZXcgVUlCdXR0b24odGhpcy5vcHRpb24zLmxhYmVsKTtcclxuXHRcdFx0dGhpcy5hZGRDb21wb25lbnQoXCJvcHRpb24zXCIsIG9wdGlvbjMpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0dmlldzogXCJmb3JtXCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIHJvd3M6IHRoaXMuY3JlYXRlQ29tcG9uZW50c1ZpZXcoKVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbmZpcm1hdGlvblwiLCB0aGlzKTtcclxuXHRcdHRoaXMucG9wdXAuc3Vic2NyaWJlKFwiY2xvc2VcIiwgdGhpcyk7XHJcblx0XHR0aGlzLnBvcHVwLnNob3coKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0XHR0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjFcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24yXCIpKSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjNcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0fVxyXG59IHRoaXMuVUlDb25maXJtV2luZG93ID0gVUlDb25maXJtV2luZG93XHJcblxyXG5jbGFzcyBVSU11bHRpVmlldyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTXVsdGlWaWV3X1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRWaWV3KGxhYmVsOnN0cmluZywgY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChsYWJlbCwgY29tcG9uZW50KTtcclxuXHR9XHJcblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XHJcblx0XHRzdXBlci5zZXRSZWxhdGlvbnNoaXBPYmplY3QodGhlT2JqZWN0KTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXSkge1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLnNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGlzLmdldFJlbGF0aW9uc2hpcE9iamVjdCgpKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZUNvbXBvbmVudHNWaWV3KCk6YW55IHtcclxuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIGkgICAgICAgICA9IDA7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcclxuXHRcdFx0aWYgKGl0ZW0gIT0gXCJ0b29sYmFyXCIpXHJcblx0XHRcdFx0dmlld0FycmF5W2krK10gPSB7XHJcblx0XHRcdFx0XHRoZWFkZXI6IGl0ZW0sIGJvZHk6IHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZ2V0VmlldygpXHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZpZXdBcnJheTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLCB2aWV3OiBcInRhYnZpZXdcIiwgYW5pbWF0ZTogdHJ1ZSwgY2VsbHM6IHRoaXMuY3JlYXRlQ29tcG9uZW50c1ZpZXcoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG59IHRoaXMuVUlNdWx0aVZpZXcgPSBVSU11bHRpVmlldztcclxuXHJcbmNsYXNzIFVJTWVudSBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBtZW51SXRlbXMgOiBBcnJheTxhbnk+O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLm1lbnVJdGVtcyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRNZW51SXRlbShtZW51IDogYW55KSB7XHJcblx0XHRtZW51W1wiaWRcIl0gPSB3ZWJpeC51aWQoKStcIl9tZW51XCI7XHJcblx0XHR0aGlzLm1lbnVJdGVtcy5wdXNoKG1lbnUpO1xyXG5cdH1cclxufSB0aGlzLlVJTWVudSA9IFVJTWVudTtcclxuXHJcbmNsYXNzIFRhYlZpZXdDZWxsIHtcclxuXHRwdWJsaWMgbmFtZSAgICAgICA6IHN0cmluZztcclxuXHRwdWJsaWMgcHJvcGVydGllcyA6IGFueTtcclxuXHRwdWJsaWMgY29tcG9uZW50ICA6IFVJQ29tcGxleENvbXBvbmVudDtcclxufVxyXG5cclxuY2xhc3MgVUlUYWJWaWV3ICBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xyXG5cdHB1YmxpYyBhbmltYXRlICAgICAgOiBib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIGNlbGxzICAgICAgIDogQXJyYXk8VGFiVmlld0NlbGw+O1xyXG5cdHB1YmxpYyBjbG9zZUFibGUgICAgOiBib29sZWFuID0gdHJ1ZTtcclxuXHRwdWJsaWMgZml0QmlnZ2VzdCAgIDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgOiBhbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSVRhYlZpZXdfXCIpO1xyXG5cdFx0dGhpcy5jZWxscyA9IG5ldyBBcnJheTxUYWJWaWV3Q2VsbD4oKTtcclxuXHR9XHJcblx0cHVibGljIGFkZFZpZXcobmFtZSA6IHN0cmluZywgcHJvcGVydGllcyA6IGFueSwgY29tcG9uZW50IDogVUlDb21wbGV4Q29tcG9uZW50KSB7XHJcblx0XHR2YXIgY2VsbCA9IG5ldyBUYWJWaWV3Q2VsbCgpO1xyXG5cdFx0Y2VsbC5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuXHRcdGNlbGwuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG5cdFx0Y2VsbC5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuY2VsbHNbbmFtZV09Y2VsbDtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KG5hbWUsY29tcG9uZW50KTtcclxuXHR9XHJcblx0cHVibGljIGxpc3RlbihldmVudCwgZGF0YSwgY2FsbGVyKSB7XHJcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XHJcblx0XHRcdGNhc2UgXCJldmVudE5hbWVcIjpcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDZWxscygpIDogQXJyYXk8YW55PiB7XHJcblx0XHR2YXIgY2VsbEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jZWxscykge1xyXG5cdFx0XHR2YXIgY2VsbCA9IHsgYm9keSA6IHRoaXMuY2VsbHNbaXRlbV0uY29tcG9uZW50LmdldFZpZXcoKSAgfVxyXG5cdFx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLmNlbGxzW2l0ZW1dLnByb3BlcnRpZXMpIHtcclxuXHRcdFx0XHRjZWxsW3Byb3BlcnR5XSA9IHRoaXMuY2VsbHNbaXRlbV0ucHJvcGVydGllc1twcm9wZXJ0eV07XHJcblx0XHRcdH1cclxuXHRcdFx0Y2VsbEFycmF5LnB1c2goY2VsbCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2VsbEFycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpIDogYW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICA6IFwidGFidmlld1wiLFxyXG5cdFx0XHRtdWx0aXZpZXcgOiB7IGFuaW1hdGUgOiB0aGlzLmFuaW1hdGUsIGZpdEJpZ2dlc3QgOiB0aGlzLmZpdEJpZ2dlc3QgfSxcclxuXHRcdFx0Y2xvc2UgICAgIDogdGhpcy5jbG9zZUFibGUsXHJcblx0XHRcdHRhYmJhciAgICA6IHsgcG9wdXBXaWR0aDogMzAwLHRhYk1pbldpZHRoOiAxMjAgfSxcclxuXHRcdFx0Y2VsbHMgICAgIDogdGhpcy5jcmVhdGVDZWxscygpXHJcblxyXG5cdFx0fSlcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge31cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbXBvbmVudCBMYWJlbCBcIik7XHJcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XHJcblx0fVxyXG59IHRoaXMuVUlUYWJWaWV3ID0gVUlUYWJWaWV3O1xyXG5GYWN0b3J5LkFkZFN0cmluZ1RvQ2xhc3MoXCJVSVRhYlZpZXdcIiwgVUlUYWJWaWV3KTtcclxuXHJcbmNsYXNzIFVJTGlzdCBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xyXG5cdHB1YmxpYyBjb2x1bW5OYW1lICAgOiBzdHJpbmcgPSBudWxsO1xyXG5cdHB1YmxpYyB0YWJsZSAgICAgICAgOiBVSURhdGFUYWJsZSA9IG51bGw7XHJcblx0cHVibGljIGRhdGFBcnJheSAgICA6IEFycmF5PGFueT49bnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA6IGFueSA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJTGlzdF9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0TGlzdChkYXRhIDogQXJyYXk8YW55Pikge1xyXG5cclxuXHR9XHJcblx0cHVibGljIGxpc3RlbihldmVudCwgZGF0YSwgY2FsbGVyKSB7XHJcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XHJcblx0XHRcdGNhc2UgXCJpdGVtQ2xpY2tcIjoge1xyXG5cdFx0XHRcdHRoaXMuaXRlbUNoYW5nZShkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHRVSS5JbmZvKGV2ZW50KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGl0ZW1DaGFuZ2UoaXRlbSA6IEl0ZW1TZWxlY3RlZEV2ZW50KSB7XHJcblx0XHR2YXIgc3RhdHVzID0gaXRlbS5vYmplY3RBcnJheVswXVtcInN0YXR1c1wiXTtcclxuXHRcdGl0ZW0ub2JqZWN0QXJyYXlbMF1bXCJzdGF0dXNcIl0gPSAhc3RhdHVzO1xyXG5cdFx0KDxVSURhdGFUYWJsZT50aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpKS5yZWZyZXNoUm93KGl0ZW0ucm93SUQpO1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwiaXRlbUNoYW5nZVwiLCBpdGVtKTtcclxuXHR9XHJcblx0cHVibGljIHNldChuYW1lIDogc3RyaW5nLCBkYXRhQXJyYXkgOiBBcnJheTxhbnk+KSB7XHJcblx0XHR0aGlzLmNvbHVtbk5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5kYXRhQXJyYXkgPSBkYXRhQXJyYXk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCkgOiBhbnkge1xyXG5cdFx0dGhpcy50YWJsZSA9IG5ldyBVSURhdGFUYWJsZSgpO1xyXG5cdFx0dGhpcy50YWJsZS5hZGRDb2x1bW4oMCwgeyBpZDpcInN0YXR1c1wiLCBoZWFkZXI6XCJBY3RpdmVcIiwgd2lkdGg6NDAsIGNzczpcImNlbnRlclwiLCB0eXBlIDogXCJ2YWx1ZVwiLFxyXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24ob2JqLHR5cGUsdmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUpXHJcblx0XHRcdFx0XHRyZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfdGFibGVfY2hlY2tib3ggd2ViaXhfaWNvbiBmYS1leWUnPjwvc3Bhbj5cIjtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfdGFibGVfY2hlY2tib3ggd2ViaXhfaWNvbiBmYS1leWUtc2xhc2gnPjwvc3Bhbj5cIjtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnRhYmxlLmFkZENvbHVtbigxLCB7IGlkOlwidmFsdWVcIiwgIGhlYWRlcjp0aGlzLmNvbHVtbk5hbWUsIGZpbGxzcGFjZToxIH0pO1xyXG5cdFx0dGhpcy50YWJsZS5zZXRMaXN0KHRoaXMuZGF0YUFycmF5KTtcclxuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGFibGVcIix0aGlzLnRhYmxlKTtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgOiBcImZvcm1cIixcclxuXHRcdFx0cm93cyA6IFt0aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpLmdldFZpZXcoKV1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0aWYgKHRoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikpIHtcclxuXHRcdFx0KDxVSURhdGFUYWJsZT4gdGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkuc3Vic2NyaWJlKFwib25JdGVtQ2xpY2tcIix0aGlzLFwiaXRlbUNsaWNrXCIpXHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93KCkge1xyXG5cdFx0dGhpcy5wb3B1cCA9IG5ldyBVSVBvcHVwV2luZG93KHRoaXMuY29sdW1uTmFtZStcIiBMaXN0IFwiKTtcclxuXHRcdHRoaXMucG9wdXAubW9kYWw9ZmFsc2U7XHJcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XHJcblx0fVxyXG59IHRoaXMuVUlMaXN0ID0gVUlMaXN0O1xyXG5cclxuIl19