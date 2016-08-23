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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUJfR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQUJfR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXdFO0FBUXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRXJCO0lBQUE7SUFPQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEO0lBQUE7SUF3TkEsQ0FBQztJQXZOYyw4QkFBZSxHQUE3QixjQUFrQyxDQUFDO0lBQ3JCLDJCQUFZLEdBQTFCLFVBQTJCLFFBQVksRUFBRSxRQUFRO1FBQ2hELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ2EsZ0NBQWlCLEdBQS9CLFVBQWdDLE9BQU87UUFDdEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksV0FBdUIsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsTUFBTSxHQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxjQUFj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QUFDO0lBQ0YsQ0FBQztJQUNNLHFCQUFJLEdBQVg7UUFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQXpFRCxDQUFxQixrQkFBa0IsR0F5RXRDO0FBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuZGVjbGFyZSB2YXIgdG9hc3RyOmFueTtcbmRlY2xhcmUgdmFyIEM0Zm91cjphbnk7XG5kZWNsYXJlIHZhciBmaW5kQ2xhc3NUeXBlOmFueTtcbmRlY2xhcmUgdmFyIGZpbmRJRDphbnk7XG5kZWNsYXJlIHZhciBGaW5kSVQ6YW55O1xuXG5kZWNsYXJlIHZhciBidXp6OmFueTtcbmNvbnNvbGUubG9nKFwiTG9hZGluZyBndWkudHMgLi4uXCIpO1xuZmluZENsYXNzVHlwZSA9IG51bGw7XG5cbmNsYXNzIERyb3BNZXNzYWdlIHtcblx0cHVibGljIGZyb21PYmplY3RzOkFycmF5PGFueT47XG5cdHB1YmxpYyBmcm9tQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXHRwdWJsaWMgdG9Db21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdHB1YmxpYyB0b09iamVjdDphbnk7XG5cdHB1YmxpYyBjb250ZXh0OmFueTtcblx0cHVibGljIGV2OmFueTtcbn1cblxuY2xhc3MgVUlFdmVudEhhbmRsZXIge1xuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJUYWJDbGljaygpIHsgfVxuXHRwdWJsaWMgc3RhdGljIEZpZWxkQ2hhbmdlZChuZXdWYWx1ZTphbnksIG9sZFZhbHVlKSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudElEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlQ29tcG9uZW50ICAgPSA8VUlUZXh0RmllbGQ+ICQkKHRoZUNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXTtcblx0XHR0aGVDb21wb25lbnQuZmllbGRDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBDcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTpEcm9wTWVzc2FnZSB7XG5cdFx0dmFyIGZyb21JRDpzdHJpbmc7XG5cdFx0dmFyIGZyb21Db21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdFx0dmFyIHRvQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXHRcdHZhciBhcnJheU9mT2JqZWN0cyA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIHRvT2JqZWN0O1xuXHRcdGZyb21JRCAgID0gY29udGV4dFtcImZyb21cIl0uY29uZmlnLmlkO1xuXHRcdHZhciB0b0lEID0gY29udGV4dFtcInRvXCJdLmNvbmZpZy5pZDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRleHQuc291cmNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRhcnJheU9mT2JqZWN0cy5wdXNoKGNvbnRleHQuZnJvbS5nZXRJdGVtKGNvbnRleHQuc291cmNlW2ldKSk7XG5cdFx0fVxuXHRcdGlmICgkJChmcm9tSUQpKSBmcm9tQ29tcG9uZW50ID0gJCQoZnJvbUlEKVtcImNvbXBvbmVudFwiXTtcblx0XHRpZiAoJCQodG9JRCkpIHRvQ29tcG9uZW50ID0gJCQodG9JRClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gbmV3IERyb3BNZXNzYWdlKCk7XG5cdFx0ZHJvcE1lc3NhZ2UuZnJvbUNvbXBvbmVudCA9IGZyb21Db21wb25lbnQ7XG5cdFx0ZHJvcE1lc3NhZ2UudG9Db21wb25lbnQgICA9IHRvQ29tcG9uZW50O1xuXHRcdGRyb3BNZXNzYWdlLmZyb21PYmplY3RzICAgPSBhcnJheU9mT2JqZWN0cztcblx0XHRpZiAoY29udGV4dC50YXJnZXQgPT0gbnVsbClcblx0XHRcdGRyb3BNZXNzYWdlLnRvT2JqZWN0ID0gbnVsbDsgZWxzZSB7XG5cdFx0XHRkcm9wTWVzc2FnZS50b09iamVjdCA9ICQkKHRvSUQpLmdldEl0ZW0oY29udGV4dC50YXJnZXQucm93KTtcblx0XHR9XG5cdFx0ZHJvcE1lc3NhZ2UuY29udGV4dCA9IGNvbnRleHQ7XG5cdFx0ZHJvcE1lc3NhZ2UuZXYgICAgICA9IG51bGw7XG5cdFx0cmV0dXJuIGRyb3BNZXNzYWdlO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25CZWZvcmVEcmFnSW4oY29udGV4dCwgZXZlbnQpIHtcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJhZ0luID09ICdmdW5jdGlvbicpXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcmFnSW4oZHJvcE1lc3NhZ2UpOyBlbHNlIHtcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cHVibGljIHN0YXRpYyBvbkRyYWdPdXQoY29udGV4dCwgZXZlbnQpIHtcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcblx0XHRVSS5JbmZvKFwiT25EcmFnT3V0IFN0YXRpY1wiKVxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0ID09ICdmdW5jdGlvbicpXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0KGRyb3BNZXNzYWdlKTsgZWxzZSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgb25CZWZvcmVEcm9wKGNvbnRleHQsIGV2KSB7XG5cblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJEcm9wMihjb250ZXh0LCBldikge1xuXG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkFmdGVyRHJvcChjb250ZXh0LCBldmVudCkge1xuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25BZnRlckRyb3AgPT0gJ2Z1bmN0aW9uJylcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkFmdGVyRHJvcChkcm9wTWVzc2FnZSk7IGVsc2Uge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQnV0dG9uQ2xpY2soaWQ6c3RyaW5nLCBldmVudCkge1xuXHRcdHZhciB0aGVDb21wb25lbnRJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0aWYgKCEkJCh0aGVDb21wb25lbnRJRCkpIHJldHVybjtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJQnV0dG9uPiAkJCh0aGVDb21wb25lbnRJRClbXCJjb21wb25lbnRcIl07XG5cdFx0dGhlQ29tcG9uZW50Lm9uQnV0dG9uQ2xpY2sodGhlQ29tcG9uZW50KTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uRHJhZ091dChjb250ZXh0LCBldmVudCkge1xuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0ID09ICdmdW5jdGlvbicpXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0KGRyb3BNZXNzYWdlKTsgZWxzZSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25CZWZvcmVEcm9wKGNvbnRleHQsIGV2ZW50KSB7XG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyb3AgPT0gJ2Z1bmN0aW9uJylcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyb3AoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkNsaWNrKGV2OmFueSwgaWQ6c3RyaW5nKSB7XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkl0ZW1EYmxDbGljayhpZCxldixub2RlKSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciBzZWxlY3RlZE9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShpZC5yb3cpO1xuXHRcdHZhciBpdGVtTWVzc2FnZSA9IG5ldyBJdGVtU2VsZWN0ZWRFdmVudCgpO1xuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheS5wdXNoKHNlbGVjdGVkT2JqZWN0KTtcblx0XHR0aGVDb21wb25lbnQub25JdGVtRGJsQ2xpY2soaXRlbU1lc3NhZ2UpIDtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uSXRlbUNsaWNrKGlkOmFueSwgZXY6YW55LCBub2RlOmFueSkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgc2VsZWN0ZWRPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0oaWQucm93KTtcblx0XHR2YXIgaXRlbU1lc3NhZ2UgPSBuZXcgSXRlbVNlbGVjdGVkRXZlbnQoKTtcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkucHVzaChzZWxlY3RlZE9iamVjdCk7XG5cdFx0aXRlbU1lc3NhZ2Uucm93SUQgPSBpZC5yb3c7XG5cdFx0dGhlQ29tcG9uZW50Lm9uSXRlbUNsaWNrKGl0ZW1NZXNzYWdlKSA7XG5cdH1cblx0cHVibGljIHN0YXRpYyBvblNlbGVjdENoYW5nZSgpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIHJvd2lkID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKHRydWUpO1xuXHRcdHZhciBzZWxlY3RlZE9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XG5cdFx0dGhlQ29tcG9uZW50Lm9uU2VsZWN0Q2hhbmdlKHJvd2lkLCBzZWxlY3RlZE9iamVjdClcblx0fVxuXHRwdWJsaWMgc3RhdGljIG9uQWZ0ZXJFZGl0U3RvcChzdGF0ZSwgZWRpdG9yLCBpZ25vcmVVcGRhdGUpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIHRoZUNvbHVtbiAgICA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XG5cdFx0dGhlQ29sdW1uLmNvbHVtbk5hbWUgPSBlZGl0b3IuY29sdW1uO1xuXHRcdHRoZUNvbHVtbi5vbGRWYWx1ZSAgID0gc3RhdGUub2xkO1xuXHRcdHRoZUNvbHVtbi5uZXdWYWx1ZSAgID0gc3RhdGUudmFsdWU7XG5cdFx0dGhlQ29sdW1uLnJvd09iamVjdCAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0oZWRpdG9yLnJvdyk7XG5cdFx0dGhlQ29sdW1uLmVkaXRvciAgICAgPSBlZGl0b3I7XG5cdFx0dGhlQ29tcG9uZW50Lm9uU3RvcEVkaXQodGhlQ29sdW1uKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIG9uQmVmb3JlRWRpdFN0YXJ0VGFibGUoaWQgOiBhbnkpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIHJvdyA9IGlkLnJvdztcblx0XHR2YXIgY29sdW1uID0gaWQuY29sdW1uO1xuXHRcdHZhciByb3dJdGVtID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZCkuZ2V0SXRlbShyb3cpO1xuXHRcdHZhciB0aGVDb2x1bW4gICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXG5cdFx0dGhlQ29sdW1uLmNvbHVtbk5hbWUgPSBjb2x1bW47XG5cdFx0dGhlQ29sdW1uLm9sZFZhbHVlID0gbnVsbDtcblx0XHR0aGVDb2x1bW4ubmV3VmFsdWUgPSBudWxsO1xuXHRcdHRoZUNvbHVtbi5yb3dPYmplY3QgPSByb3dJdGVtO1xuXHRcdHRoZUNvbXBvbmVudC5vbkJlZm9yZUVkaXRTdGFydCh0aGVDb2x1bW4pO1xuXG5cdFx0aWYgKHJvd0l0ZW1bXCJiZWZvcmVFZGl0U3RhcnRSZXR1cm5cIl0hPW51bGwpIHJldHVybiByb3dJdGVtW1wiYmVmb3JlRWRpdFN0YXJ0UmV0dXJuXCJdO1xuXG5cdFx0cmV0dXJuICFyb3dJdGVtW2NvbHVtbitcIlJlYWRPbmx5XCJdO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25DaGFuZ2UobmV3diwgb2xkdikge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR0aGVDb21wb25lbnQub25DaGFuZ2UobmV3diwgb2xkdik7XG5cdH1cblx0cHVibGljIHN0YXRpYyBNZW51SGFuZGxlcihpZCwgY29udGV4dCkge1xuXHRcdHZhciB0aGVJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUNvbnRleHRNZW51PiAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIGp1bXBJdGVtID0gdGhlQ29tcG9uZW50LmdldE1lbnVJdGVtKGlkKTtcblx0XHR2YXIgdGhlT2JqZWN0ID0gdGhlQ29tcG9uZW50Lm93bmluZ0NvbXBvbmVudC5nZXRTZWxlY3RlZE9iamVjdCgpO1xuXHRcdGlmICghanVtcEl0ZW0uY2FsbGJhY2spIHJldHVybjtcblx0XHRqdW1wSXRlbS5jYWxsYmFjayhpZCwgdGhlQ29tcG9uZW50LCB0aGVPYmplY3QpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlclNlbGVjdChpZDphbnkpIHtcblx0XHR2YXIgdGhlSUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdGlmICghJCQodGhlSUQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIHRoZU5vZGUgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKS5nZXRJdGVtKGlkLnJvdyk7XG5cdFx0aWYgKCF0aGVOb2RlKSB7XG5cdFx0XHRVSS5NZXNzYWdlKFwiRXJyb3IgRXhwZWN0ZWQgVE8gRmluZCBOb2RlIGdvdCBOdWxsIHdpdGggSUQgXCIgKyBpZCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBJZEFycmF5ICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIG9iamVjdEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgcm93QXJyYXkgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciBuZXdJdGVtU2VsZWN0ZWQgPSBuZXcgSXRlbVNlbGVjdGVkRXZlbnQoKTtcblx0XHRJZEFycmF5WzBdICAgICAgICAgID0gaWQucm93O1xuXHRcdGlmICh0aGVOb2RlLm9yaWdpbmFsT2JqZWN0KVxuXHRcdFx0b2JqZWN0QXJyYXlbMF0gPSB0aGVOb2RlLm9yaWdpbmFsT2JqZWN0LmNsb25lKCk7IGVsc2Vcblx0XHRcdG9iamVjdEFycmF5WzBdID0gbnVsbDtcblx0XHRyb3dBcnJheVswXSAgICAgICAgICAgICAgICAgICA9IHRoZU5vZGU7XG5cdFx0bmV3SXRlbVNlbGVjdGVkLmlkQXJyYXkgICAgICAgPSBJZEFycmF5O1xuXHRcdG5ld0l0ZW1TZWxlY3RlZC5vYmplY3RBcnJheSAgID0gb2JqZWN0QXJyYXk7XG5cdFx0bmV3SXRlbVNlbGVjdGVkLml0ZW1zU2VsZWN0ZWQgPSBvYmplY3RBcnJheS5sZW5ndGg7XG5cdFx0bmV3SXRlbVNlbGVjdGVkLnJvd0FycmF5ICAgICAgPSByb3dBcnJheTtcblx0XHRuZXdJdGVtU2VsZWN0ZWQudGhlQ29tcG9uZW50ICA9IHRoZUNvbXBvbmVudDtcblx0XHR0aGVDb21wb25lbnQub25BZnRlclNlbGVjdChuZXdJdGVtU2VsZWN0ZWQpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgSGFuZGxlRmllbGRFbnRyeShzdGF0ZSwgZWRpdG9yLCBpZ25vcmVVcGRhdGUpIHtcblx0XHR2YXIgdGhlRXhwbG9yZXIgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKS5leHBsb3Jlcjtcblx0XHR2YXIgbmV3VGV4dCA9IHN0YXRlLnZhbHVlO1xuXHRcdHZhciByb3dJRCAgID0gZWRpdG9yLnJvdztcblx0XHR2YXIgdGhlTm9kZSA9ICQkKHRoZUV4cGxvcmVyLmNvbXBvbmVudElEKS5nZXRJdGVtKHJvd0lEKTtcblx0XHR2YXIgdGhlUHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlTm9kZS5jbGFzc1R5cGUpO1xuXHRcdHRoZVByb3h5LnVwZGF0ZU5hbWUodGhlTm9kZS5faWQsIG5ld1RleHQpO1xuXHRcdFVJLk1lc3NhZ2UoXCJSZWNvcmQgVXBkYXRlZFwiKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIElzRmllbGRFZGl0YWJsZShpZCk6Ym9vbGVhbiB7XG5cdFx0dmFyIHRoZUlEICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlRXhwbG9yZXIgPSAkJCh0aGVJRClbXCJleHBsb3JlclwiXTtcblx0XHR2YXIgcm93SXRlbSAgICAgPSAkJCh0aGVFeHBsb3Jlci5nZXRDb21wb25lbnRJRCgpKS5nZXRJdGVtKGlkKTtcblx0XHRpZiAocm93SXRlbS5jbGFzc1R5cGUuaW5kZXhPZihcIlJvb3RcIikgPT0gLTEpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cHVibGljIHN0YXRpYyBWYWxpZGF0ZUZpZWxkRW50cnkocm93LCB2YWx1ZTpzdHJpbmcpIHtcblx0XHR2YXIgdGhlSUQgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdHZhciB0aGVFeHBsb3JlciA9ICQkKHRoZUlEKS5leHBsb3Jlcjtcblx0XHR2YXIgcm93SXRlbSA9ICQkKHRoZUV4cGxvcmVyLmdldENvbXBvbmVudElEKCkpLmdldEl0ZW0ocm93LmlkKTtcblx0XHRBcHBMb2cuaW5mbyhcImluZm9cIiwgXCJCZWZvcmUgRWRpdCBFdmVudFwiKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIFByb2Nlc3NPbkRlc3RydWN0KHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xuXHRcdFVJLkRlYnVnKFwib24gRGVzdHJ1Y3QgQ2FsbGVkXCIpO1xuXHRcdHRoZUNvbXBvbmVudC5vbkRlc3RydWN0KCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBQcm9jZXNzVGFiQ2hhbmdlZCgpIHtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uRHJvcEV2ZW50KFNvdXJjZSwgdGFyZ2V0LCBldmVudCkge1xuXHRcdC8vIFVJLkluZm8oXCJEcm9wIEV2ZW50XCIpO1xuXHRcdGNvbnNvbGUubG9nKFwiT24gRHJvcCBFdmVudFwiKTtcblx0fVxuXG59IHRoaXMuVUlFdmVudEhhbmRsZXIgPSBVSUV2ZW50SGFuZGxlcjtcblxuZW51bSBTb3VuZHMgeyBQb3B1cCwgU2hhcGVEcm9wLCBTaGFwZURyYWdJbiwgU2hhcGVEcmFnT3V0LCBCbG9wLCBPcGVuRGlhZ3JhbSwgU2F2ZURpYWdyYW0sIENsb3NlRGlhZ3JhbSwgU2hhcGVPblNoYXBlRHJvcCwgRHJhd0xpbmssIEVycm9yIH10aGlzLlNvdW5kcyA9IFNvdW5kcztcblxuY2xhc3MgVUkgZXh0ZW5kcyBDNE9iamVjdCB7XG5cdHB1YmxpYyBzdGF0aWMgUGxheVNvdW5kKHNvdW5kOlNvdW5kcyA9IFNvdW5kcy5CbG9wKSB7XG5cdFx0dmFyIHM7XG5cdFx0c3dpdGNoIChzb3VuZCkge1xuXHRcdFx0Y2FzZSBTb3VuZHMuUG9wdXA6XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQ2xpY2tPZmYubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLkNsb3NlRGlhZ3JhbTpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9Eb29yIENsb3NlLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZURyb3A6XG5cdFx0XHRjYXNlIFNvdW5kcy5PcGVuRGlhZ3JhbTpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9CbG9wLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5CbG9wOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Jsb3AubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLkVycm9yOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Vycm9yMS5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVPblNoYXBlRHJvcDpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9NZXRhbENsaWNrMS5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuU2F2ZURpYWdyYW06XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvRHJvcCBGb3JrLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5EcmF3TGluazpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9Qb3BDb3JrLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZURyYWdJbjpcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlRHJhZ091dCA6XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQ2xpY2subXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0cy5wbGF5KCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBEZWJ1Zyh0ZXh0OnN0cmluZykge1xuXHRcdGlmICh0cnVlKVxuXHRcdFx0VUkuTWVzc2FnZSh0ZXh0KVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgTWVzc2FnZSh0ZXh0OnN0cmluZykge1xuXHRcdFVJLkluZm8odGV4dCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBJbmZvKHRleHQ6c3RyaW5nKSB7XG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXG5cdFx0fVxuXHRcdHRvYXN0cltcImluZm9cIl0odGV4dClcblx0fVxuXHRwdWJsaWMgc3RhdGljIFdhcm5pbmcodGV4dDpzdHJpbmcpIHtcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcblx0XHR9XG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5FcnJvcik7XG5cdFx0dG9hc3RyW1wid2FybmluZ1wiXSh0ZXh0KVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgU3VjY2Vzcyh0ZXh0OnN0cmluZykge1xuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxuXHRcdH1cblx0XHR0b2FzdHJbXCJzdWNjZXNzXCJdKHRleHQpXG5cdH1cblx0cHVibGljIHN0YXRpYyBFcnJvcih0ZXh0OnN0cmluZykge1xuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxuXHRcdH1cblx0XHRVSS5QbGF5U291bmQoU291bmRzLkVycm9yKTtcblx0XHR0b2FzdHJbXCJlcnJvclwiXSh0ZXh0KVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgRXhwb3J0VG9FeGNlbChjb21wb25lbnRJRDpzdHJpbmcpIHtcblx0XHQkJChjb21wb25lbnRJRCkuZXhwb3J0VG9FeGNlbCgpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgQWxlcnQoc3RyaW5nKSB7d2ViaXguYWxlcnQoc3RyaW5nKTt9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdCAgICBzdXBlcigpO1xuICAgIH1cblxufXRoaXMuVUkgPSBVSTtcblxuY2xhc3MgVUlDb21wb25lbnQgZXh0ZW5kcyBVSSB7XG5cblx0cHJvdGVjdGVkIG92ZXJsYXlNaXhpbjpib29sZWFuICAgICAgICAgID0gZmFsc2U7XG5cdHByb3RlY3RlZCBjb21wb25lbnRWYWx1ZTpzdHJpbmc7XG5cdHByb3RlY3RlZCBjb21wb25lbnRJRDpzdHJpbmc7XG5cdHByb3RlY3RlZCBjb21wb25lbnRMYWJlbDpzdHJpbmc7XG5cdHByb3RlY3RlZCBjb21wb25lbnRWaWV3OmFueTtcblx0cHJvdGVjdGVkIGNvbXBvbmVudENoYW5nZUNhbGxiYWNrOmFueTtcblx0cHJvdGVjdGVkIG93bmluZ0NvbXBvbmVudDpVSUNvbXBvbmVudDtcblx0cHJvdGVjdGVkIG9yZGVyOm51bWJlciAgICAgICAgICAgICAgICAgID0gMDtcblx0cHJvdGVjdGVkIGV2ZW50c0RlZmluZWQ6Ym9vbGVhbiAgICAgICAgID0gZmFsc2U7XG5cdHByb3RlY3RlZCB0cmFja2luZ09iamVjdENoYW5nZXM6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlICAgIF91aUNsYXNzVHlwZTpDbGFzc1R5cGU7XG5cdHByb3RlY3RlZCBpZFByZWZpeCAgICAgICAgICAgICAgICAgICAgICA9IFwiVUlDb21wb25lbnRfXCI7XG5cdHByaXZhdGUgICAgIHRoZU9iamVjdDphbnk7XG5cdHB1YmxpYyAgICAgIHRoZVRlc3QgICAgICAgICAgICAgICAgICAgICA9IG5ldyBDNE9iamVjdCgpO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50RGF0YTphbnk7XG5cdHByaXZhdGUgcmVsYXRpb25zaGlwT2JqZWN0O1xuXHRwcml2YXRlIF91c2VyRGF0YTphbnk7XG5cdHByb3RlY3RlZCBwcm9wZXJ0aWVzICAgICAgICAgICAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cblx0Z2V0IHVzZXJEYXRhKCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5fdXNlckRhdGE7XG5cdH1cblx0c2V0IHVzZXJEYXRhKHZhbHVlOmFueSkge1xuXHRcdHRoaXMuX3VzZXJEYXRhID0gdmFsdWU7XG5cdH1cblx0Z2V0IHVpQ2xhc3NUeXBlKCk6Q2xhc3NUeXBlIHtcblx0XHRyZXR1cm4gdGhpcy5fdWlDbGFzc1R5cGU7XG5cdH1cblx0c2V0IHVpQ2xhc3NUeXBlKHZhbHVlOkNsYXNzVHlwZSkge1xuXHRcdHRoaXMuX3VpQ2xhc3NUeXBlID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgc2hvd092ZXJsYXkoKSB7XG5cdFx0aWYgKCF0aGlzLm92ZXJsYXlNaXhpbilcblx0XHRcdHdlYml4LmV4dGVuZCgkJCh0aGlzLmNvbXBvbmVudElEKSwgd2ViaXguT3ZlcmxheUJveCk7XG5cdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2hvd092ZXJsYXkoKTtcblx0XHR0aGlzLm92ZXJsYXlNaXhpbiA9IHRydWU7XG5cdH1cblx0cHVibGljIGhpZGVPdmVybGF5KCkge1xuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmhpZGVPdmVybGF5KCk7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIFRyZWVJY29uKG9iajphbnkpIHtcblx0XHRpZiAob2JqLiRsZXZlbCA+IDEwMDEpXG5cdFx0XHRyZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1mb2xkZXItb3Blbic+PC9zcGFuPlwiO1xuXHRcdGlmIChvYmouJGxldmVsIDwgMTAwMCkge1xuXHRcdFx0cmV0dXJuIEZhY3RvcnkuR2V0Q2xhc3NJY29uKG9iai5fY2xhc3NUeXBlKTtcblx0XHR9XG5cdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZmlsbSc+PC9zcGFuPlwiO1xuXHR9XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gdGhpcy5pZFByZWZpeCArIHdlYml4LnVpZCgpO1xuXHRcdHRoaXMuYWRkUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcblx0fVxuXG5cdHB1YmxpYyBhdHRhY2hFdmVudChpZDpzdHJpbmcsIGV2ZW50LCBjYWxsYmFjaykge1xuXHRcdGlmICgkJChpZCkpIHtcblx0XHRcdCQkKGlkKS5hdHRhY2hFdmVudChldmVudCwgY2FsbGJhY2spO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0UmVsYXRpb25zaGlwT2JqZWN0KHRoZU9iamVjdDphbnkpIHtcblx0XHR0aGlzLnJlbGF0aW9uc2hpcE9iamVjdCA9IHRoZU9iamVjdDtcblx0fVxuXHRwdWJsaWMgZ2V0UmVsYXRpb25zaGlwT2JqZWN0KCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGlvbnNoaXBPYmplY3Q7XG5cdH1cblx0cHVibGljIGJsYW5rVmFsdWUoKSB7fVxuXHRwdWJsaWMgY3JlYXRlVmlldyh2aWV3T3B0aW9uczphbnkpOmFueSB7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcImRyYWdcIiwgdHJ1ZSk7XG5cdFx0dGhpcy5tZXJnZVByb3BlcnR5U2V0KHZpZXdPcHRpb25zKTtcblx0XHRyZXR1cm4gdmlld09wdGlvbnM7XG5cdH1cblx0cHVibGljIHNldElEKHByZWZpeDpzdHJpbmcpIHtcblx0XHR0aGlzLmlkUHJlZml4ICAgID0gcHJlZml4O1xuXHRcdHRoaXMuY29tcG9uZW50SUQgPSB0aGlzLmlkUHJlZml4ICsgd2ViaXgudWlkKCk7XG5cdH1cblx0cHVibGljIHNldENhbGxiYWNrKGNhbGxiYWNrOmFueSkge1xuXHRcdHRoaXMuY29tcG9uZW50Q2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0fVxuXHRwdWJsaWMgZ2V0Q2FsbGJhY2soKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Q2hhbmdlQ2FsbGJhY2s7XG5cdH1cblx0cHVibGljIGlzVmFsaWQoKTpib29sZWFuIHtcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcblx0XHRcdHJldHVybiAkJCh0aGlzLmNvbXBvbmVudElEKS52YWxpZGF0ZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIHNldERhdGEodGhlRGF0YTphbnkpIHtcblx0XHR0aGlzLmNvbXBvbmVudERhdGEgPSB0aGVEYXRhO1xuXHR9XG5cdHB1YmxpYyBnZXREYXRhKCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnREYXRhO1xuXHR9XG5cdHB1YmxpYyBzZXRMYWJlbCh0aGVMYWJlbCkge1xuXHRcdHRoaXMuY29tcG9uZW50TGFiZWwgPSB0aGVMYWJlbDtcblx0fVxuXHRwdWJsaWMgZ2V0TGFiZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50TGFiZWw7XG5cdH1cblx0cHVibGljIHNldFZhbHVlKHRoZVZhbHVlOmFueSkge1xuXHRcdHRoaXMuY29tcG9uZW50VmFsdWUgPSB0aGVWYWx1ZTtcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcblx0XHRcdHdlYml4LnVpKHRoaXMuZ2V0VmFsdWUsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcblx0XHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0T3duaW5nQ29tcG9uZW50KGNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xuXHRcdHRoaXMub3duaW5nQ29tcG9uZW50ID0gY29tcG9uZW50O1xuXHR9XG5cdHB1YmxpYyBnZXRPd25pbmdDb21wb25lbnQoKTpVSUNvbXBvbmVudCB7XG5cdFx0cmV0dXJuIHRoaXMub3duaW5nQ29tcG9uZW50O1xuXHR9XG5cdHB1YmxpYyBnZXRDb21wb25lbnRJRCgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50SUQ7XG5cdH1cblx0cHVibGljIHNldENvbXBvbmVudElEKGlkOnN0cmluZykge1xuXHRcdHRoaXMuY29tcG9uZW50SUQgPSBpZDtcblx0fVxuXHRwdWJsaWMgZ2V0VmFsdWUoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZhbHVlO1xuXHR9XG5cdHB1YmxpYyBnZXRDb21wb25lbnRWaWV3KCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBzZXRDb21wb25lbnRWaWV3KHRoZVZpZXc6YW55KSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhlVmlldztcblx0fVxuXHRwdWJsaWMgZ2V0U2VsZWN0ZWRPYmplY3QoKTphbnkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHB1YmxpYyBvbkJlZm9yZURyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSkge1xuXHRcdHdlYml4LmFsZXJ0KFwiU29ycnkgRHJvcHBpbmcgSGVyZSBOb3QgQWxsb3dlZCBZZXRcIik7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBvbkJlZm9yZURyYWdJbihtZXNzYWdlOkRyb3BNZXNzYWdlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBvbkFmdGVyRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKTphbnkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgb25EcmFnT3V0KG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmFueSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyB2YWxpZGF0ZURyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSk6YW55IHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIG9uU2VsZWN0Q2hhbmdlKGl0ZW1NZXNzYWdlOkl0ZW1TZWxlY3RlZEV2ZW50KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwib25TZWxlY3RDaGFuZ2VcIiwgaXRlbU1lc3NhZ2UpO1xuXHRcdHJldHVybjtcblx0fVxuXHRwdWJsaWMgb25JdGVtRGJsQ2xpY2soaXRlbU1lc3NhZ2UgOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xuXHRcdHRoaXMucHVibGlzaChcIm9uSXRlbURibENsaWNrXCIsaXRlbU1lc3NhZ2UpO1xuXHR9XG5cdHB1YmxpYyBvbkl0ZW1DbGljayhpdGVtTWVzc2FnZSA6IEl0ZW1TZWxlY3RlZEV2ZW50KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwib25JdGVtQ2xpY2tcIixpdGVtTWVzc2FnZSk7XG5cdH1cblx0cHVibGljIGdldE9iamVjdCgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMudGhlT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBzZXRPYmplY3QodGhlT2JqZWN0OmFueSkge1xuXHRcdHRoaXMudGhlT2JqZWN0ID0gdGhlT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBzZXREcmFnZ2FibGUoZmxhZzpib29sZWFuID0gdHJ1ZSkge1xuXHRcdHZhciBodG1sVmlldyA9ICQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXc7XG5cdFx0d2ViaXguRHJhZ0NvbnRyb2wuYWRkRHJvcCgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLCBVSUV2ZW50SGFuZGxlci5PbkRyb3BFdmVudCk7XG5cdH1cblx0cHVibGljIHNldFByb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG5cdFx0c3dpdGNoIChuYW1lKSB7XG5cdFx0XHRjYXNlIFwibGFiZWxcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuc2V0TGFiZWwodmFsdWUpO1xuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidmFsdWVcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiZGF0YVwiIDpcblx0XHRcdFx0dGhpcy5zZXREYXRhKHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiY2FsbGJhY2tcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuc2V0Q2FsbGJhY2sodmFsdWUpXG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdHRoaXMucHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgYWRkUHJvcGVydGllcyhwcm9wZXJ0eVNldDphbnkpIHtcblx0XHRmb3IgKHZhciBpdGVtIGluIHByb3BlcnR5U2V0KSB7XG5cdFx0XHR0aGlzLnNldFByb3BlcnR5KGl0ZW0sIHByb3BlcnR5U2V0W2l0ZW1dKTtcblx0XHR9XG5cdH1cblx0cHVibGljIGdldFByb3BlcnR5KG5hbWUpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcGVydGllc1tuYW1lXTtcblx0fVxuXHRwdWJsaWMgbWVyZ2VQcm9wZXJ0eVNldCh2aWV3OmFueSkge1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcblx0XHRcdHZpZXdbaXRlbV0gPSB0aGlzLnByb3BlcnRpZXNbaXRlbV07XG5cdFx0XHRpbmRleCsrO1xuXHRcdH1cblx0XHRyZXR1cm4gdmlldztcblx0fVxuXHRwdWJsaWMgZ2V0UHJvcGVydHlTZXQoKTphbnkge1xuXHRcdHZhciBpbmRleCAgID0gMDtcblx0XHR2YXIgcmVzdWx0cyA9IHt9O1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRyZXN1bHRzW2l0ZW1dID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xuXHRcdFx0aW5kZXgrKztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudCBNZXRob2RzXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgcmVmcmVzaCgpIHt9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0dGhpcy5ldmVudHNEZWZpbmVkID0gdHJ1ZTtcblx0XHRyZXR1cm47XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5kcmFnICAgICAgICAgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgZGVzdHJveVZpZXcoKSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSAkJCh0aGlzLmNvbXBvbmVudElEKS5kZXN0cnVjdG9yKCk7XG5cdH1cblx0cHVibGljIGRlc3Ryb3lPYmplY3QoKSB7XG5cdH1cblx0cHVibGljIG9uRGVzdHJ1Y3QoKSB7XG5cdFx0dGhpcy5kZXN0cm95T2JqZWN0KCk7XG5cdH1cblx0cHVibGljIGRlc3RydWN0b3IoKSB7XG5cdH1cblxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlVJQ29tcG9uZW50ID0gVUlDb21wb25lbnQ7XG5cbmNsYXNzIFVJQ29udGV4dE1lbnUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cdHB1YmxpYyBqdW1wSXRlbUFycmF5OkFycmF5PFVJSnVtcEl0ZW0+O1xuXHRwdWJsaWMgb3duaW5nQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5ID0gbmV3IEFycmF5PFVJSnVtcEl0ZW0+KCk7XG5cdFx0dGhpcy5zZXRJRChcInVpQ29udGV4dE1lbnVfXCIpO1xuXHR9XG5cblx0cHVibGljIGFkZEl0ZW0obGFiZWwsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG5ld0l0ZW0gICAgICA9IG5ldyBVSUp1bXBJdGVtKCk7XG5cdFx0bmV3SXRlbS5pZCAgICAgICA9IFwibWVudUl0ZW1fXCIgKyB3ZWJpeC51aWQoKTtcblx0XHRuZXdJdGVtLmxhYmVsICAgID0gbGFiZWw7XG5cdFx0bmV3SXRlbS5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHRoaXMuanVtcEl0ZW1BcnJheVtuZXdJdGVtLmlkXSA9IG5ld0l0ZW07XG5cdH1cblx0cHVibGljIGFkZFNlcGVyYXRvcigpIHtcblx0XHR2YXIgbmV3SXRlbSAgICAgID0gbmV3IFVJSnVtcEl0ZW0oKTtcblx0XHRuZXdJdGVtLmlkICAgICAgID0gXCJqdW1wSXRlbV9cIiArIHdlYml4LnVpZCgpO1xuXHRcdG5ld0l0ZW0ubGFiZWwgICAgPSBcIlwiO1xuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBudWxsO1xuXHRcdHRoaXMuanVtcEl0ZW1BcnJheVtuZXdJdGVtLmlkXSA9IG5ld0l0ZW07XG5cdH1cblx0cHVibGljIGdldE1lbnVJdGVtKGxhYmVsOnN0cmluZyk6VUlKdW1wSXRlbSB7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcblx0XHRcdGlmICh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWwgPT0gbGFiZWwpXG5cdFx0XHRcdHJldHVybiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV07XG5cdFx0fVxuXHR9XG5cblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dmFyIG1lbnVBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcblx0XHRcdHZhciBtZW51SXRlbSA9IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXTtcblx0XHRcdGlmIChtZW51SXRlbS5sYWJlbCA9PSBcIlwiKSB7XG5cdFx0XHRcdG1lbnVBcnJheS5wdXNoKHskdGVtcGxhdGU6IFwiU2VwYXJhdG9yXCJ9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1lbnVBcnJheS5wdXNoKG1lbnVJdGVtLmxhYmVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdHZpZXc6IFwiY29udGV4dG1lbnVcIiwgaWQ6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSwgZGF0YTogbWVudUFycmF5XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmdldFZpZXcoKTtcblx0XHRpZiAoISQkKHRoaXMuY29tcG9uZW50SUQpKVxuXHRcdFx0d2ViaXgudWkodGhpcy5jb21wb25lbnRWaWV3KS5hdHRhY2hUbygkJCh0aGlzLmdldE93bmluZ0NvbXBvbmVudCgpLmdldENvbXBvbmVudElEKCkpKTtcblx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpW1wiY29tcG9uZW50XCJdID0gdGhpcztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5nZXRDb21wb25lbnRJRCgpLCBcImNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk1lbnVIYW5kbGVyKTtcblx0fVxuXG5cdC8vZW5kcmVnaW9uXG59IHRoaXMuVUlDb250ZXh0TWVudSA9IFVJQ29udGV4dE1lbnU7XG5cbmVudW0gRmllbGRGb3JtYXQgeyBHRU5FUkFMLCBDVVJSRU5DWSwgTlVNQkVSLCBQRVJDRU5UIH10aGlzLkZpZWxkRm9ybWF0ID0gRmllbGRGb3JtYXQ7XG5cbmNsYXNzIFVJRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBsaXN0VHlwZTpzdHJpbmc7XG5cdHByaXZhdGUgcmVsYXRpb25zaGlwUG9pbnRlcjpib29sZWFuID0gZmFsc2U7XG5cdHByb3RlY3RlZCB1cGRhdGVGaWVsZDpzdHJpbmc7XG5cdHB1YmxpYyBtYXhMZW5ndGg6bnVtYmVyO1xuXHRwdWJsaWMgZmllbGRGb3JtYXQ6RmllbGRGb3JtYXQgICAgICA9IEZpZWxkRm9ybWF0LkdFTkVSQUw7XG5cdHB1YmxpYyBmb3JtYXRWaWV3OmFueTtcblx0cHVibGljIGZpZWxkVmFsdWU6YW55O1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcInVpZmllbGRfXCIpO1xuXHRcdHRoaXMuYWRkRXZlbnRQdWJsaWNhdGlvbihcImZpZWxkQ2hhbmdlZFwiKTtcblx0fVxuXG5cdHB1YmxpYyBmaWVsZENoYW5nZWQobmV3VmFsdWU6YW55LCBvbGRWYWx1ZSkge1xuXHRcdHZhciB0aGVQYXJlbnQgPSB0aGlzLmdldERhdGEoKTtcblx0XHRpZiAodGhpcy5nZXRDYWxsYmFjaygpKSB7XG5cdFx0XHR2YXIgY2FsbGJhY2sgPSB0aGlzLmdldENhbGxiYWNrKCk7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2sodGhpcywgdGhlUGFyZW50LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdH1cblx0XHR0aGlzLnZhbHVlQ2hhbmdlZCh0aGVQYXJlbnQsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0dGhpcy5wdWJsaXNoKFwiZmllbGRDaGFuZ2VkXCIsIHtuZXdWYWx1ZTogbmV3VmFsdWUsIG9sZFZhbHVlOiBvbGRWYWx1ZX0pXG5cdH1cblx0cHVibGljIHNldENsYXNzVHlwZShjbGFzc1R5cGU6Q2xhc3NUeXBlKSB7XG5cdFx0dGhpcy5saXN0VHlwZSA9IDxzdHJpbmc+IGNsYXNzVHlwZTtcblx0fVxuXHRwdWJsaWMgZ2V0Q2xhc3NUeXBlKCk6c3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5saXN0VHlwZTtcblx0fVxuXHRwdWJsaWMgc2V0VXBkYXRlRmllbGQodGhlRmllbGROYW1lOnN0cmluZykge1xuXHRcdHRoaXMudXBkYXRlRmllbGQgPSB0aGVGaWVsZE5hbWU7XG5cdH1cblx0cHVibGljIGdldFVwZGF0ZUZpZWxkKCk6c3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy51cGRhdGVGaWVsZDtcblx0fVxuXHRwdWJsaWMgc2V0RmllbGRGb3JtYXQodGhlRm9ybWF0OkZpZWxkRm9ybWF0KSB7XG5cdFx0dGhpcy5maWVsZEZvcm1hdCA9IHRoZUZvcm1hdDtcblx0XHRzd2l0Y2ggKHRoZUZvcm1hdCkge1xuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5DVVJSRU5DWSA6XG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuZm9ybWF0VmlldyA9IHdlYml4Lk51bWJlci5udW1Ub1N0cih7XG5cdFx0XHRcdFx0Z3JvdXBEZWxpbWl0ZXI6IFwiLFwiLCBncm91cGVTaXplOiAzLCBkZWNpbWFsRGVsaW1pdGVyOiBcIi5cIiwgZGVjaW1hbFNpemU6IDBcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5QRVJDRU5UIDpcblx0XHRcdHtcblxuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5HRU5FUkFMIDpcblx0XHRcdHtcblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0Lk5VTUJFUiA6XG5cdFx0XHR7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdCA6XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzZXRWYWx1ZSh2YWx1ZTphbnkpIHtcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmJsb2NrRXZlbnQoKTtcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnVuYmxvY2tFdmVudCgpO1xuXHRcdH1cblx0XHR0aGlzLmZpZWxkVmFsdWUgPSB2YWx1ZTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5jb21wb25lbnRJRCwgXCJvbkNoYW5nZVwiLCBVSUV2ZW50SGFuZGxlci5GaWVsZENoYW5nZWQpO1xuXHR9XG5cdHB1YmxpYyBnZXRWYWx1ZSgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuZmllbGRWYWx1ZTtcblx0fVxuXHRwdWJsaWMgYmxhbmtWYWx1ZSgpIHtcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNldFZhbHVlKFwiXCIpO1xuXHRcdH1cblx0XHR0aGlzLmZpZWxkVmFsdWUgPSBcIlwiO1xuXHR9XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQocGFyZW50Q29tcG9uZW50OlVJQ29tcG9uZW50LCBuZXdWYWx1ZTphbnksIG9sZFZhbHVlOmFueSkge1xuXHRcdGlmICghdGhpcy5pc1ZhbGlkKCkpXG5cdFx0XHRyZXR1cm47XG5cdFx0aWYgKCF0aGlzLnVwZGF0ZUZpZWxkKSByZXR1cm47XG5cdFx0dmFyIHRoZU9iamVjdCA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShwYXJlbnRDb21wb25lbnQuZ2V0T2JqZWN0KCkuY2xhc3NUeXBlKTtcblx0XHR0aGVPYmplY3QudXBkYXRlQXR0cmlidXRlKHBhcmVudENvbXBvbmVudC5nZXRPYmplY3QoKS5faWQsIHRoaXMudXBkYXRlRmllbGQsIG5ld1ZhbHVlKTtcblx0XHRVSS5NZXNzYWdlKFwiUmVjb3JkIFVwZGF0ZWRcIik7XG5cdH1cblxufSB0aGlzLlVJRmllbGQgPSBVSUZpZWxkO1xuXG5jbGFzcyBVSUNvdW50ZXJGaWVsZCBleHRlbmRzIFVJRmllbGQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUNvdW50ZXJGaWVsZF9cIik7XG5cdH1cblxuXHRwdWJsaWMgZmllbGRDaGFuZ2VkKG5ld3YsIG9sZHYpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJmaWVsZENoYW5nZWRcIiwge25ld1ZhbHVlOiBuZXd2LCBvbGRWYWx1ZTogb2xkdn0pO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwiY291bnRlclwiXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblxufXRoaXMuVUlDb3VudGVyRmllbGQgPSBVSUNvdW50ZXJGaWVsZDtcblxuY2xhc3MgVUlMYWJlbCBleHRlbmRzIFVJQ29tcG9uZW50IHtcblxuXHRwdWJsaWMgYWxpZ25tZW50OnN0cmluZyA9IFwiY2VudGVyXCI7XG5cdHB1YmxpYyBsYWJlbFdpZHRoOm51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUxhYmVsX1wiKTtcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgYWxpZ25tZW50ID0gXCJjZW50ZXJcIiwgbGFiZWxXaWR0aCA9IDEwMCkge1xuXHRcdHRoaXMuYWRkUHJvcGVydGllcyh7bGFiZWw6IGxhYmVsLCBhbGlnbm1lbnQ6IGFsaWdubWVudCwgbGFiZWxXaWR0aDogbGFiZWxXaWR0aH0pO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwibGFiZWxcIlxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblxufSB0aGlzLlVJTGFiZWwgPSBVSUxhYmVsO1xuXG5jbGFzcyBVSURhdGVGaWVsZCBleHRlbmRzIFVJRmllbGQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcInVpRGF0ZUZpZWxkX1wiKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICA6IFwiZGF0ZXBpY2tlclwiLFxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDAsXG5cdFx0XHR0aW1lcGlja2VyOiBmYWxzZVxuXHRcdH0pO1xuXHRcdGlmICh0aGlzLmZvcm1hdFZpZXcpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50Vmlld1tcImZvcm1hdFwiXSA9IHRoaXMuZm9ybWF0Vmlldztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcblx0fVxuXHRwdWJsaWMgZGVmaW5FdmVudHMoKSB7XG5cblx0fVxuXG59IHRoaXMuVUlEYXRlRmllbGQgPSBVSURhdGVGaWVsZDtcblxuY2xhc3MgVUlTbGlkZXJGaWVsZCBleHRlbmRzIFVJRmllbGQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSVNsaWRlckZpZWxkXCIpO1xuXHR9XG5cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSwgZGF0YTphbnksIGNhbGxiYWNrOmFueSwgdXBkYXRlRmllbGQgPSBudWxsLCBtaW5WYWx1ZTpudW1iZXIgPSAwLCBtYXhWYWx1ZTpudW1iZXIgPSAxLCBzdGVwOm51bWJlciA9IC4xKSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdHRoaXMudXBkYXRlRmllbGQgPSB1cGRhdGVGaWVsZDtcblx0XHR0aGlzLnNldFByb3BlcnR5KFwibWluXCIsIG1pblZhbHVlKTtcblx0XHR0aGlzLnNldFByb3BlcnR5KFwibWF4XCIsIG1heFZhbHVlKTtcblx0XHR0aGlzLnNldFByb3BlcnR5KFwic3RlcFwiLCBzdGVwKTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0bmFtZSA6IHRoaXMuZ2V0TGFiZWwoKSxcblx0XHRcdHZpZXcgOiBcInNsaWRlclwiLFxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcblx0XHRcdHZhbHVlOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0XHR0aXRsZTogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0XHRyZXR1cm4gd2ViaXguaTE4bi5udW1iZXJGb3JtYXQob2JqLnZhbHVlICogMTAwKSArIFwiJVwiO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XG5cbn0gdGhpcy5VSVNsaWRlckZpZWxkID0gVUlTbGlkZXJGaWVsZDtcblxuY2xhc3MgVUlUZXh0RmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRwdWJsaWMgdGV4dEFyZWEgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwidWlUZXh0RmllbGRfXCIpO1xuXHRcdHRoaXMudGV4dEFyZWEgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBzZXRUZXh0QXJlYSh0ZXh0QXJlYTpib29sZWFuKSB7XG5cdFx0dGhpcy50ZXh0QXJlYSA9IHRleHRBcmVhO1xuXHR9XG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55ID0gbnVsbCwgY2FsbGJhY2s6YW55ID0gbnVsbCwgdXBkYXRlRmllbGQgPSBudWxsLCB0ZXh0QXJlYSA9IGZhbHNlKSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdHRoaXMudGV4dEFyZWEgICAgPSB0ZXh0QXJlYTtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdGlmICh0aGlzLnRleHRBcmVhKVxuXHRcdFx0dmFyIHZpZXdUeXBlID0gXCJ0ZXh0YXJlYVwiOyBlbHNlXG5cdFx0XHR2aWV3VHlwZSA9IFwidGV4dFwiO1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCAgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0dmlldyAgICAgIDogdmlld1R5cGUsXG5cdFx0XHRuYW1lICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxuXHRcdFx0dmFsdWUgICAgIDogdGhpcy5nZXRWYWx1ZSgpLFxuXHRcdFx0bGFiZWwgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdGxhYmVsV2lkdGg6IDEwMFxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XG5cbn0gdGhpcy5VSVRleHRGaWVsZCA9IFVJVGV4dEZpZWxkO1xuXG5jbGFzcyBVSU5vdGVGaWVsZCBleHRlbmRzIFVJVGV4dEZpZWxkIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlOb3RlRmllbGRfXCIpO1xuXHRcdHRoaXMudGV4dEFyZWEgPSB0cnVlO1xuXHR9XG5cbn10aGlzLlVJTm90ZUZpZWxkID0gVUlOb3RlRmllbGQ7XG5cbmNsYXNzIFVJU2VsZWN0TGlzdCBleHRlbmRzIFVJRmllbGQge1xuXG5cdHB1YmxpYyBzZWxlY3Rpb25MaXN0OkFycmF5PGFueT47XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcInVpU2VsZWN0TGlzdF9cIik7XG5cdH1cblxuXHRwdWJsaWMgc2V0VmFsdWUodmFsdWUgOiBhbnkpIHtcblx0XHRzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzZXRTZWxlY3RMaXN0KGxhYmVsLCB2YWx1ZSwgdGhlTGlzdCwgZGF0YSwgY2FsbGJhY2ssIHVwZGF0ZUZpZWxkKSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXRMaXN0KHRoZUxpc3QpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKVxuXHRcdHRoaXMuc2V0VXBkYXRlRmllbGQodXBkYXRlRmllbGQpO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICA6IFwic2VsZWN0XCIsXG5cdFx0XHRuYW1lICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxuXHRcdFx0b3B0aW9ucyAgIDogdGhpcy5zZWxlY3Rpb25MaXN0LFxuXHRcdFx0dmFsdWUgICAgIDogdGhpcy5nZXRWYWx1ZSgpLFxuXHRcdFx0bGFiZWwgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcblx0XHRcdHZhbGlkYXRlICA6IHdlYml4LnJ1bGVzLmlzTm90RW1wdHlcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0fVxuXHRwdWJsaWMgc2V0TGlzdCh0aGVMaXN0OkFycmF5PGFueT4pIHtcblx0XHR0aGlzLnNlbGVjdGlvbkxpc3QgPSB0aGVMaXN0O1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhlTGlzdCkge1xuXHRcdFx0aWYgKHRoZUxpc3RbaXRlbV0ubmFtZSA9PSBcIlwiKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuc2VsZWN0aW9uTGlzdC5wdXNoKHtpZDogXCJcIiwgbmFtZTogXCJcIn0pO1xuXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5kZWZpbmUoXCJvcHRpb25zXCIsIHRoaXMuc2VsZWN0aW9uTGlzdCk7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5yZWZyZXNoKCk7XG5cdFx0fVxuXHR9XG5cbn0gdGhpcy5VSVNlbGVjdExpc3QgPSBVSVNlbGVjdExpc3Q7XG5cbmNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHR9XG5cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSA9IDAsIGRhdGE6YW55ID0gbnVsbCwgY2FsbGJhY2s6YW55ID0gbnVsbCkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksXG5cdFx0XHR2aWV3OiBcImNoZWNrYm94XCIsXG5cdFx0XHRsYWJlbDogdGhpcy5nZXRMYWJlbCgpLFxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBvbkNoYW5nZShuZXd2LCBvbGR2KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwib25DaGFuZ2VcIiwge25ld1ZhbHVlOiBuZXd2LCBvbGRWYWx1ZTogb2xkdn0pO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdH1cblxufSB0aGlzLlVJQ2hlY2tib3ggPSBVSUNoZWNrYm94O1xuXG5jbGFzcyBVSUp1bXBJdGVtIHtcblxuXHRwdWJsaWMgaWQ6c3RyaW5nO1xuXHRwdWJsaWMgbGFiZWw6c3RyaW5nO1xuXHRwdWJsaWMgY2FsbGJhY2s6YW55O1xuXHRwdWJsaWMgZXZlbnQ6YW55O1xuXHRwdWJsaWMgdHlwZTpzdHJpbmc7XG5cbn1cbmNsYXNzIFVJSnVtcEJhciBleHRlbmRzIFVJQ29tcG9uZW50IHtcblxuXHRwdWJsaWMganVtcEl0ZW1BcnJheTpBcnJheTxVSUp1bXBJdGVtPjtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUp1bXBCYXJfXCIpO1xuXHRcdHRoaXMuanVtcEl0ZW1BcnJheSA9IG5ldyBBcnJheTxVSUp1bXBJdGVtPigpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBKdW1wQ2FsbGJhY2soaWQ6c3RyaW5nLCBldmVudDphbnkpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQoaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciBjYWxsYmFjayA9IG51bGw7XG5cdFx0dGhlQ29tcG9uZW50LnB1Ymxpc2godGhlQ29tcG9uZW50Lmp1bXBJdGVtQXJyYXlbaWRdLmV2ZW50KVxuXHRcdC8vICAgIHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5jYWxsYmFjayh0aGVDb21wb25lbnQsIHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5sYWJlbCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dmFyIGJhclZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHR2YXIgbmV3SXRlbVZpZXcgPSB7XG5cdFx0XHRcdHZpZXcgOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRpZCAgIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLFxuXHRcdFx0XHR0eXBlIDogXCJodG1sYnV0dG9uXCIsXG5cdFx0XHRcdGNzcyAgOiBcImJ0XzFcIixcblx0XHRcdFx0bGFiZWw6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5sYWJlbCxcblx0XHRcdFx0dmFsdWU6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5sYWJlbFxuXHRcdFx0fVxuXHRcdFx0YmFyVmlldy5wdXNoKG5ld0l0ZW1WaWV3KTtcblx0XHR9XG5cdFx0dmFyIG5ld1ZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIGNvbHM6IGJhclZpZXdcblx0XHR9KTtcblx0XHRyZXR1cm4gbmV3Vmlldztcblx0fVxuXHRwdWJsaWMgYWRkSXRlbShsYWJlbDpzdHJpbmcsIGV2ZW50OnN0cmluZywgdHlwZSA9IFwiZGFuZ2VyXCIsIGNhbGxiYWNrID0gbnVsbCkge1xuXHRcdHZhciBuZXdJdGVtICAgICAgPSBuZXcgVUlKdW1wSXRlbSgpO1xuXHRcdG5ld0l0ZW0uaWQgICAgICAgPSBcImp1bXBCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcblx0XHRuZXdJdGVtLmxhYmVsICAgID0gbGFiZWw7XG5cdFx0bmV3SXRlbS5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdG5ld0l0ZW0uZXZlbnQgICAgPSBldmVudDtcblx0XHRuZXdJdGVtLnR5cGUgICAgID0gdHlwZTtcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcblx0XHRcdGlmICgkJCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQpKVxuXHRcdFx0XHRpZiAoISQkKHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5pZCkuaGFzRXZlbnQoXCJvbkl0ZW1DbGlja1wiKSlcblx0XHRcdFx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5pZCwgXCJvbkl0ZW1DbGlja1wiLCBVSUp1bXBCYXIuSnVtcENhbGxiYWNrKTtcblx0XHR9XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcblx0XHRcdGlmICgkJChpdGVtKSkge1xuXHRcdFx0XHQkJChpdGVtKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdFx0XHRcdCQkKGl0ZW0pW1wiZGF0YVwiXSAgICAgID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbn0gdGhpcy5VSUp1bXBCYXIgPSBVSUp1bXBCYXI7XG5cbmNsYXNzIFVJVG9vbGJhciBleHRlbmRzIFVJSnVtcEJhciB7XG5cblx0cHVibGljIGxhYmVsOnN0cmluZztcblx0cHVibGljIGljb246c3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdH1cblxuXHRwdWJsaWMgc2V0VG9vbEJhcihsYWJlbCwgaWNvbikge1xuXHRcdHRoaXMubGFiZWwgPSBsYWJlbDtcblx0XHR0aGlzLmljb24gID0gaWNvbjtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dmFyIGJhclZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciB0aGVCYXIgID0ge3ZpZXc6IFwibGFiZWxcIiwgbGFiZWw6IHRoaXMuaWNvbiArIFwiIFwiICsgdGhpcy5sYWJlbH07XG5cdFx0YmFyVmlldy5wdXNoKHRoZUJhcik7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmp1bXBJdGVtQXJyYXkpIHtcblx0XHRcdHZhciBuZXdJdGVtVmlldyA9IHtcblx0XHRcdFx0dmlldyA6IFwiYnV0dG9uXCIsXG5cdFx0XHRcdGlkICAgOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsXG5cdFx0XHRcdHR5cGUgOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0udHlwZSxcblx0XHRcdFx0dmFsdWU6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5sYWJlbFxuXHRcdFx0fVxuXHRcdFx0YmFyVmlldy5wdXNoKG5ld0l0ZW1WaWV3KTtcblx0XHR9XG5cdFx0dmFyIG5ld1ZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgIDogXCJ0b29sYmFyXCIsXG5cdFx0XHRjc3MgICAgIDogXCJoaWdobGlnaHRlZF9oZWFkZXIgaGVhZGVyM1wiLFxuXHRcdFx0cGFkZGluZ1g6IDUsXG5cdFx0XHRwYWRkaW5nWTogNSxcblx0XHRcdGhlaWdodCAgOiA0MCxcblx0XHRcdGNvbHMgICAgOiBiYXJWaWV3XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ld1ZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cbn0gdGhpcy5VSVRvb2xiYXIgPSBVSVRvb2xiYXI7XG5cbmNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdHB1YmxpYyBjb2xvcjpzdHJpbmc7XG5cdHB1YmxpYyBldmVudDpzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlCdXR0b25fXCIpO1xuXHR9XG5cblx0cHVibGljIG9uQnV0dG9uQ2xpY2sodGhlQ29tcG9uZW50OmFueSkge1xuXHRcdHRoaXMucHVibGlzaChcImNsaWNrXCIsIHRoaXMpO1xuXHR9XG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZT86YW55LCBkYXRhPzphbnksIGNhbGxiYWNrPzphbnkpIHtcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XG5cdFx0dGhpcy5jb2xvciA9IFwiYmFja2dyb3VuZC1jb2xvciA6ICNGRjlFOUVcIjtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgIDogXCJidXR0b25cIixcblx0XHRcdG5hbWUgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdHZhbHVlICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdGNzc0Zvcm1hdDogdGhpcy5jb2xvcixcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBzZXRMYWJlbCh0aGVMYWJlbDpzdHJpbmcpIHtcblx0XHRzdXBlci5zZXRMYWJlbCh0aGVMYWJlbCk7XG5cdFx0aWYgKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkpIHtcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkudmFsdWUgPSB0aGVMYWJlbDtcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkucmVmcmVzaCgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0Q29sb3IodmFsdWU6c3RyaW5nKSB7XG5cdFx0aWYgKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkpIHtcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uc3R5bGUuYmFja2dyb3VuZCAgPSB2YWx1ZTtcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uc3R5bGUuYm9yZGVyQ29sb3IgPSB2YWx1ZTtcblx0XHR9XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuY29tcG9uZW50SUQsIFwib25JdGVtQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25CdXR0b25DbGljayk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblxufSB0aGlzLlVJQnV0dG9uID0gVUlCdXR0b247XG5cbmNsYXNzIFVJRHJvcFpvbmUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldElEKFwiVUlEcm9wWm9uZV9cIik7XG5cdH1cblxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55LCBkYXRhOmFueSwgY2FsbGJhY2s6YW55LCB1cGRhdGVGaWVsZCA9IG51bGwpIHtcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5zZXRJblRoZVpvbmUoZmFsc2UpO1xuXHR9XG5cdHB1YmxpYyBzZXRJblRoZVpvbmUoaW5ab25lOmJvb2xlYW4pIHtcblx0XHRpZiAoaW5ab25lKVxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5kZWZpbmUoXCJjc3NcIiwgXCJpblRoZURyb3Bab25lXCIpOyBlbHNlXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmRlZmluZShcImNzc1wiLCBcIm91dE9mVGhlRHJvcFpvbmVcIik7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcblx0XHRcdGlkICAgICAgIDogdGhpcy5nZXRDb21wb25lbnRJRCgpLFxuXHRcdFx0dmlldyAgICAgOiBcImxpc3RcIixcblx0XHRcdG1pbldpZHRoIDogMTAwLFxuXHRcdFx0bWluSGVpZ2h0OiAxMDAsXG5cdFx0XHR0ZW1wbGF0ZSA6IFwiI3RpdGxlI1wiLFxuXHRcdFx0ZGF0YSAgICAgOiBbe3RpdGxlOiBcIkRyb3AgWm9uZVwifV0sXG5cdFx0XHRkcmFnICAgICA6IFwidGFyZ2V0XCJcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIG9uQmVmb3JlRHJhZ0luKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xuXHRcdHRoaXMuc2V0SW5UaGVab25lKHRydWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHB1YmxpYyBvbkRyYWdPdXQobWVzc2FnZTpEcm9wTWVzc2FnZSk6Ym9vbGVhbiB7XG5cdFx0dGhpcy5zZXRJblRoZVpvbmUoZmFsc2UpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uQmVmb3JlRHJvcFwiLCBVSUV2ZW50SGFuZGxlci5PbkJlZm9yZURyb3ApO1xuXHR9XG5cbn0gdGhpcy5VSURyb3Bab25lID0gVUlEcm9wWm9uZTtcblxuaW50ZXJmYWNlIG9uRWRpdENhbGxiYWNrIHtcblx0KG9iamVjdDphbnkpIDogYW55O1xufVxuXG5jbGFzcyBVSUNvbG9yRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlDb2xvckZpZWxkX1wiKTtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMocHJvcGVydGllcyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImNvbG9ycGlja2VyXCJcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cbn10aGlzLlVJQ29sb3JGaWVsZCA9IFVJQ29sb3JGaWVsZDtcblxuY2xhc3MgVUlEYXRhVGFibGVGaWVsZCBleHRlbmRzIFVJQ29tcG9uZW50IHtcblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXG5cdHB1YmxpYyBjb2x1bW5OdW1iZXI6bnVtYmVyO1xuXHRwdWJsaWMgY29sdW1uTmFtZTpzdHJpbmc7XG5cdHB1YmxpYyBvbGRWYWx1ZTphbnk7XG5cdHB1YmxpYyBuZXdWYWx1ZTphbnk7XG5cdHB1YmxpYyBlZGl0b3I6YW55O1xuXHRwdWJsaWMgcm93T2JqZWN0OmFueTtcblx0cHVibGljIGlzUmVmZXJlbmNlOmJvb2xlYW4gICAgICAgPSBmYWxzZTtcblx0cHVibGljIHJlZmVyZW5jZUNsYXNzVHlwZTpzdHJpbmcgPSBcIlwiO1xuXHRwdWJsaWMgcmVmZXJlbmNlRmllbGQ6YW55O1xuXHRwdWJsaWMgcmVmZXJlbmNlT2JqZWN0OmFueTtcblx0cHVibGljIGRpc3BsYXlGaWVsZE5hbWU7XG5cdHB1YmxpYyB2aWV3OmFueTtcblx0cHVibGljIG9wdGlvbkxpc3Q6QXJyYXk8YW55Pjtcblx0cHVibGljIG1hcHBlZDpib29sZWFuICAgICAgICAgICAgPSBmYWxzZTtcblx0cHVibGljIHRlbXBsYXRlOmFueTtcblx0cHVibGljIHJlZmVyZW5jZUNsYXNzRmllbGQ6YW55XG5cdC8vZW5kcmVnaW9uXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlVJRGF0YVRhYmxlRmllbGRfXCIpO1xuXHRcdHRoaXMuY29tcG9uZW50SUQgPSBcImRhdGFUYWJsZUZpZWxkX1wiICsgd2ViaXgudWlkKCk7XG5cdH1cbn0gdGhpcy5VSURhdGFUYWJsZUZpZWxkID0gVUlEYXRhVGFibGVGaWVsZDtcblxuY2xhc3MgVUlEYXRhVGFibGUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cdGdldCB0ZW1wbGF0ZSgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuXHR9XG5cblx0c2V0IHRlbXBsYXRlKHZhbHVlOmFueSkge1xuXHRcdHRoaXMuX3RlbXBsYXRlID0gdmFsdWU7XG5cdH1cblx0Z2V0IHNob3dUb29sQmFyKCk6Ym9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3Nob3dUb29sQmFyO1xuXHR9XG5cdHNldCBzaG93VG9vbEJhcih2YWx1ZTpib29sZWFuKSB7XG5cdFx0dGhpcy5fc2hvd1Rvb2xCYXIgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgTWFwcGVkQ29sdW1uTG9va3VwKG9iaikge1xuXHR9XG5cdHB1YmxpYyB2aWV3VHlwZSA9IFwiZGF0YXRhYmxlXCI7XG5cblx0cHJvdGVjdGVkIHRoZUxpc3QgICAgICAgICAgICAgICA6IEFycmF5PGFueT4gID0gbnVsbDtcblx0cHJvdGVjdGVkIGNvbHVtbnMgICAgICAgICAgICAgICA6IEFycmF5PFVJRGF0YVRhYmxlRmllbGQ+O1xuXHRwcm90ZWN0ZWQgcm93U2VsZWN0Q2FsbGJhY2sgICAgIDogYW55O1xuXHRwcm90ZWN0ZWQgZWRpdGFibGUgICAgICAgICAgICAgIDogYm9vbGVhbiAgICA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgZWRpdGFjdGlvbiAgICAgICAgICAgIDogc3RyaW5nICAgPSBcImRibGNsaWNrXCI7XG5cdHByb3RlY3RlZCB0b29sQmFyICAgICAgICAgICAgICAgOiBVSVRvb2xiYXI7XG5cdHByb3RlY3RlZCBkYXRhVGFibGVJRCAgICAgICAgICAgOiBzdHJpbmc7XG5cdHByaXZhdGUgX3Nob3dUb29sQmFyICAgICAgICAgICAgOiBib29sZWFuICA9IGZhbHNlO1xuXHRwcml2YXRlIF9tdWx0aVNlbGVjdCAgICAgICAgICAgIDogYm9vbGVhbiAgPSBmYWxzZTtcblx0cHJpdmF0ZSBfYXV0b0NvbHVtbkNvbmZpZ3VyZSAgPSBmYWxzZTtcblx0cHJpdmF0ZSBfc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSB0cnVlO1xuXHRwcml2YXRlIF93aWR0aCAgICAgICAgICAgICAgICA9IDA7XG5cdHByaXZhdGUgX2hlaWdodCAgICAgICAgICAgICAgID0gMDtcblx0cHJpdmF0ZSBfdGVtcGxhdGUgOiBhbnkgPSBudWxsO1xuXG5cdGdldCBtdWx0aVNlbGVjdCgpOmJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9tdWx0aVNlbGVjdDtcblx0fVxuXHRzZXQgbXVsdGlTZWxlY3QodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX211bHRpU2VsZWN0ID0gdmFsdWU7XG5cdH1cblx0Z2V0IGF1dG9Db2x1bW5Db25maWd1cmUoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0NvbHVtbkNvbmZpZ3VyZTtcblx0fVxuXHRzZXQgYXV0b0NvbHVtbkNvbmZpZ3VyZSh2YWx1ZTpib29sZWFuKSB7XG5cdFx0dGhpcy5fYXV0b0NvbHVtbkNvbmZpZ3VyZSA9IHZhbHVlO1xuXHR9XG5cdGdldCBzaG93QWRkRGVsZXRlQ29sdW1ucygpOmJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9zaG93QWRkRGVsZXRlQ29sdW1ucztcblx0fVxuXHRzZXQgc2hvd0FkZERlbGV0ZUNvbHVtbnModmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX3Nob3dBZGREZWxldGVDb2x1bW5zID0gdmFsdWU7XG5cdH1cblx0Z2V0IGhlaWdodCgpOm51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcblx0fVxuXHRzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcikge1xuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuXHR9XG5cdGdldCB3aWR0aCgpOm51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xuXHR9XG5cdHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpIHtcblx0XHR0aGlzLl93aWR0aCA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlEYXRhVGFibGVfXCIpO1xuXHRcdHRoaXMuY29sdW1ucyAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcblx0XHR0aGlzLmRhdGFUYWJsZUlEICAgICAgICAgID0gXCJkYXRhVGFibGVfXCIgKyB3ZWJpeC51aWQoKTtcblx0XHR0aGlzLnNob3dBZGREZWxldGVDb2x1bW5zID0gZmFsc2U7XG5cdH1cblxuXG5cdHB1YmxpYyBoaWRlQ29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xuXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5oaWRlQ29sdW1uKGNvbHVtbklEKTtcblx0fVxuXHRwdWJsaWMgc2hvd0NvbHVtbiggY29sdW1uSUQgOiBhbnkpIHtcblxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkgJCQodGhpcy5kYXRhVGFibGVJRCkuc2hvd0NvbHVtbihjb2x1bW5JRCk7XG5cdH1cblxuXG5cdHB1YmxpYyBuZXdJdGVtKCkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSB0aGlzO1xuXHRcdHZhciBvYmplY3RQcm94eSAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlQ29tcG9uZW50LnVpQ2xhc3NUeXBlKTtcblx0XHR2YXIgbmFtZSAgICAgICAgID0gXCJBIE5ldyBcIiArIG9iamVjdFByb3h5LmNsYXNzTGFiZWwoKTtcblx0XHR2YXIgbmV3SUQgICAgICAgID0gb2JqZWN0UHJveHkuYWRkTmV3KG5hbWUpO1xuXHRcdHZhciBuZXdPYmplY3QgICAgPSBvYmplY3RQcm94eS5nZXRPbmUobmV3SUQpO1xuXHRcdHZhciBuZXdSb3dJRCAgICAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmFkZChuZXdPYmplY3QpO1xuXHRcdCQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuc2hvd0l0ZW0obmV3Um93SUQpO1xuXHRcdCQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuc2VsZWN0KG5ld1Jvd0lELCBmYWxzZSk7XG5cdH1cblx0cHVibGljIGRlbGV0ZUl0ZW0odGhlVG9vbGJhcjpVSVRvb2xiYXIsIGxhYmVsOnN0cmluZykge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSB0aGlzO1xuXHRcdHZhciByb3dpZCAgICAgICAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSWQoKTtcblx0XHRpZiAoIXJvd2lkKSByZXR1cm47XG5cdFx0dmFyIHRoZU9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XG5cdFx0dGhlQ29tcG9uZW50LmhhbmRsZURlbGV0ZSh0aGVPYmplY3QpO1xuXHR9XG5cdHB1YmxpYyBvcHRpb25zKCkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSB0aGlzO1xuXHRcdHZhciByb3dpZCAgICAgICAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSWQoKTtcblx0XHRpZiAoIXJvd2lkKSByZXR1cm47XG5cdFx0dmFyIHRoZU9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XG5cdFx0dGhlQ29tcG9uZW50LmhhbmRsZURlbGV0ZSh0aGVPYmplY3QpO1xuXHR9XG5cblx0cHVibGljIGdldFNlbGVjdGVkT2JqZWN0KCkgOiBhbnkge1xuXHRcdHJldHVybiB0aGlzLmdldFNlbGVjdGVkKClbMF07XG5cdH1cblx0cHVibGljIGdldFNlbGVjdGVkKCk6QXJyYXk8YW55PiB7XG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XG5cdFx0XHR2YXIgaWRBcnJheSA9ICQkKHRoaXMuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSXRlbSh0cnVlKTtcblx0XHRcdHJldHVybiBpZEFycmF5O1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgb25TZWxlY3RDaGFuZ2UoaXRlbU1lc3NhZ2U6SXRlbVNlbGVjdGVkRXZlbnQpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJvblNlbGVjdENoYW5nZVwiLCBpdGVtTWVzc2FnZSk7XG5cdH1cblx0cHVibGljIGFkZENvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCB0aGVDb2x1bW46YW55KSB7XG5cdFx0dmFyIG5ld0NvbHVtbiA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XG5cdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgPSB0aGVDb2x1bW47XG5cdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciAgICAgPSBjb2x1bW5OdW1iZXI7XG5cdFx0dGhpcy5jb2x1bW5zW2NvbHVtbk51bWJlcl0gPSBuZXdDb2x1bW47XG5cdH1cblx0cHVibGljIGFkZE1hcHBlZENvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCByZWZlcmVuY2VDbGFzc0ZpZWxkOnN0cmluZywgcmVmZXJlbmNlRmllbGROYW1lLCBkaXNwbGF5RmllbGROYW1lLCB0aGVDb2x1bW5WaWV3OmFueSkge1xuXHRcdHZhciBuZXdDb2x1bW4gICAgICAgICAgICAgICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcblx0XHRuZXdDb2x1bW4ubWFwcGVkICAgICAgICAgICAgICA9IHRydWU7XG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUNsYXNzRmllbGQgPSByZWZlcmVuY2VDbGFzc0ZpZWxkXG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUZpZWxkICAgICAgPSByZWZlcmVuY2VGaWVsZE5hbWU7XG5cdFx0bmV3Q29sdW1uLmRpc3BsYXlGaWVsZE5hbWUgICAgPSBkaXNwbGF5RmllbGROYW1lO1xuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICA9IHRoZUNvbHVtblZpZXc7XG5cdFx0dmFyIGZ1bmN0aW9uTWFtZSAgICAgICAgICAgID0gXCJtYXBGdW5jdGlvblwiICsgd2ViaXgudWlkKCk7XG5cdFx0dmFyIG1hcHBlZEZ1bmN0aW9uICAgICAgICAgID0gbmV3IEZ1bmN0aW9uKCdvYmonLCAneycgKyAndmFyIG9iamVjdFByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKG9ialtcIicgKyByZWZlcmVuY2VDbGFzc0ZpZWxkICsgJ1wiXVwiKTsnICsgJ3ZhciB0aGlzT2JqZWN0ID0gb2JqZWN0UHJveHkuZ2V0T25lKG9ialtcIicgKyByZWZlcmVuY2VGaWVsZE5hbWUgKyAnXCJdKTsnICsgJ2lmICghdGhpc09iamVjdCkgcmV0dXJuIFwiTm90IEZvdW5kXCI7JyArICdyZXR1cm4gdGhpc09iamVjdFtcIicgKyBkaXNwbGF5RmllbGROYW1lICsgJ1wiXTsnICsgJ30nKTtcblx0XHRuZXdDb2x1bW4udGVtcGxhdGUgICAgICAgICAgPSBtYXBwZWRGdW5jdGlvbjtcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xuXHRcdG5ld0NvbHVtbi52aWV3W1wiX3RlbXBsYXRlXCJdID0gbmV3Q29sdW1uLnRlbXBsYXRlO1xuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdICA9IG5ld0NvbHVtbjtcblx0fVxuICAgIHB1YmxpYyBhZGRSZWZlcmVuY2VDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgcmVmZXJlbmNlQ2xhc3NUeXBlOnN0cmluZywgcmVmZXJlbmNlRmllbGROYW1lLCB0aGVDb2x1bW5WaWV3OmFueSkge1xuXHRcdHZhciBuZXdDb2x1bW4gICAgICAgICAgICAgICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VDbGFzc1R5cGUgPSByZWZlcmVuY2VDbGFzc1R5cGU7XG5cdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgICA9IHRoZUNvbHVtblZpZXc7XG5cdFx0dmFyIG9iamVjdFByb3h5ICAgICAgICA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShyZWZlcmVuY2VDbGFzc1R5cGUpO1xuXHRcdHZhciBvcHRpb25MaXN0ICAgICAgICAgPSBvYmplY3RQcm94eS5nZXRMaXN0KGZhbHNlKTtcblx0XHRuZXdDb2x1bW4ub3B0aW9uTGlzdCAgID0gb3B0aW9uTGlzdDtcblx0XHRuZXdDb2x1bW4uY29sdW1uTnVtYmVyID0gY29sdW1uTnVtYmVyO1xuXHRcdHZhciBvcHRpb25BcnJheSAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gb3B0aW9uTGlzdCkge1xuXHRcdFx0dmFyIG9wdGlvbiAgICAgICAgICAgICAgICAgPSBuZXcgQzRPYmplY3QoKTtcblx0XHRcdG9wdGlvbltcImlkXCJdICAgICAgICAgICAgICAgPSBvcHRpb25MaXN0W2l0ZW1dW1wiaWRcIl07XG5cdFx0XHRvcHRpb25bcmVmZXJlbmNlRmllbGROYW1lXSA9IG9wdGlvbkxpc3RbaXRlbV1bcmVmZXJlbmNlRmllbGROYW1lXTtcblx0XHRcdG9wdGlvbkFycmF5LnB1c2gob3B0aW9uKTtcblx0XHR9XG5cdFx0bmV3Q29sdW1uLnZpZXdbXCJvcHRpb25zXCJdID0gb3B0aW9uTGlzdDtcblx0XHQvL25ld0NvbHVtbi52aWV3W1wib25cIl0gPSB7IG9uQ2hhbmdlIDogZnVuY3Rpb24oKSB7IFVJLk1lc3NhZ2UoXCJTZWxlY3QgQ2hhbmdlZFwiKTt9fVxuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdID0gbmV3Q29sdW1uO1xuXHR9XG5cdHB1YmxpYyBhZGRPcHRpb25Db2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgb3B0aW9uTGlzdCwgdGhlQ29sdW1uKSB7XG5cdH1cblx0cHVibGljIHNldExpc3QodGhlTGlzdCkge1xuXHRcdHRoaXMudGhlTGlzdCA9IHRoZUxpc3Q7XG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5jbGVhckFsbCgpO1xuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkucGFyc2UodGhpcy50aGVMaXN0KTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldFZhbHVlKHRoZUxpc3Q6YW55KSB7XG5cdFx0dGhpcy5zZXRMaXN0KHRoZUxpc3QpO1xuXHR9XG5cdHB1YmxpYyBzZXRFZGl0YWJsZSh0aGVGbGFnOmJvb2xlYW4pIHtcblx0XHR0aGlzLmVkaXRhYmxlID0gdGhlRmxhZztcblx0fVxuXHRwdWJsaWMgb25TdG9wRWRpdCh0aGVGaWVsZDpVSURhdGFUYWJsZUZpZWxkKSB7XG5cdFx0aWYgKHRoaXMucHVibGlzaChcIm9uU3RvcEVkaXRcIiwgdGhlRmllbGQpKVxuXHRcdFx0cmV0dXJuO1xuXHRcdGlmICh0aGVGaWVsZC5uZXdWYWx1ZSA9PSB0aGVGaWVsZC5vbGRWYWx1ZSlcblx0XHRcdHJldHVybjtcblx0XHRpZiAodGhpcy51aUNsYXNzVHlwZSkge1xuXHRcdFx0dmFyIG9iamVjdFByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoaXMudWlDbGFzc1R5cGUpO1xuXHRcdFx0b2JqZWN0UHJveHkudXBkYXRlQXR0cmlidXRlKHRoZUZpZWxkLnJvd09iamVjdC5faWQsIHRoZUZpZWxkLmNvbHVtbk5hbWUsIHRoZUZpZWxkLm5ld1ZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVmcmVzaFJvdyhyb3dJRCA6IGFueSkge1xuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSlcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnJlZnJlc2gocm93SUQpO1xuXHR9XG5cdHB1YmxpYyBvbkJlZm9yZUVkaXRTdGFydCh0aGVGaWVsZCA6IFVJRGF0YVRhYmxlRmllbGQpIHtcblx0XHRpZiAodGhpcy5wdWJsaXNoKFwib25CZWZvcmVFZGl0U3RhcnRcIiwgdGhlRmllbGQpKVxuXHRcdFx0cmV0dXJuO1xuXHR9XG5cdHB1YmxpYyBoYW5kbGVEZWxldGUodGhlT2JqZWN0OmFueSkge1xuXHRcdFVJLk1lc3NhZ2UoXCJIYW5kbGUgRGVsZXRlXCIgKyB0aGVPYmplY3QuX2lkKVxuXHR9XG5cdHB1YmxpYyBjcmVhdGVOYXZpZ2F0aW9uQmFyKCkge1xuXHRcdHRoaXMudG9vbEJhciA9IG5ldyBVSVRvb2xiYXIoKTtcblx0XHR0aGlzLnRvb2xCYXIuYWRkSXRlbShcIk5ld1wiLCBcIm5ld0l0ZW1cIilcblx0XHR0aGlzLnRvb2xCYXIuYWRkSXRlbShcIkRlbGV0ZVwiLCBcImRlbGV0ZUl0ZW1cIilcblx0XHR0aGlzLnRvb2xCYXIuYWRkSXRlbShcIk9wdGlvbnNcIiwgXCJvcHRpb25zXCIpXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJFeHBvcnRcIiwgXCJleHBvcnRcIik7XG5cdFx0dGhpcy50b29sQmFyLnNldERhdGEodGhpcyk7XG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcblx0XHRcdHRoaXMudG9vbEJhci5zZXRUb29sQmFyKEZhY3RvcnkuR2V0Q2xhc3NMYWJlbCh0aGlzLnVpQ2xhc3NUeXBlKSwgRmFjdG9yeS5HZXRDbGFzc0ljb24odGhpcy51aUNsYXNzVHlwZSkpXG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIG9iamVjdCwgcHVibGlzaGVyKSB7XG5cdFx0c3dpdGNoIChldmVudCkge1xuXHRcdFx0Y2FzZSBcIm5ld0l0ZW1cIiA6XG5cdFx0XHRjYXNlIFwiZGVsZXRlSXRlbVwiIDpcblx0XHRcdGNhc2UgXCJvcHRpb25zXCIgOlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJleHBvcnRcIjpcblx0XHRcdFx0dGhpcy5leHBvcnRUb0V4Y2VsKCk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBleHBvcnRUb0V4Y2VsKCkge1xuXHRcdFVJLkV4cG9ydFRvRXhjZWwodGhpcy5kYXRhVGFibGVJRCk7XG5cdH1cblx0cHVibGljIGdldExpc3QoKTpBcnJheTxhbnk+IHtcblx0XHRpZiAodGhpcy50aGVMaXN0KVxuXHRcdFx0cmV0dXJuIHRoaXMudGhlTGlzdDtcblx0XHRpZiAodGhpcy51aUNsYXNzVHlwZSkge1xuXHRcdFx0dmFyIG9iamVjdFByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoaXMudWlDbGFzc1R5cGUpO1xuXHRcdFx0dmFyIHJldHVybkxpc3QgID0gb2JqZWN0UHJveHkuZ2V0TGlzdCh0cnVlKTtcblx0XHRcdHJldHVybiByZXR1cm5MaXN0O1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IEFycmF5PGFueT4oKTtcblx0fVxuXHRwdWJsaWMgY3JlYXRlQ29sdW1uVmlldygpOmFueSB7XG5cdFx0dmFyIGNvbHVtblZpZXcgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciBpICAgICAgICAgID0gMDtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29sdW1ucykge1xuXHRcdFx0Y29sdW1uVmlld1t0aGlzLmNvbHVtbnNbaXRlbV0uY29sdW1uTnVtYmVyXSA9IHRoaXMuY29sdW1uc1tpdGVtXS52aWV3O1xuXHRcdFx0aSsrO1xuXHRcdH1cblx0XHRpZiAodGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucykge1xuXHRcdFx0Y29sdW1uVmlld1tpKytdID0ge1xuXHRcdFx0XHRpZDogXCJcIiwgdGVtcGxhdGU6IHtcblx0XHRcdFx0XHR2aWV3ICAgICAgOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRcdHR5cGUgICAgICA6IFwiaHRtbGJ1dHRvblwiLFxuXHRcdFx0XHRcdGxhYmVsICAgICA6ICc8c3BhbiBjbGFzcz1cIndlYml4X2ljb24gZmEtYW5nbGUtbGVmdFwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRleHRcIj5iYWNrPC9zcGFuPicsXG5cdFx0XHRcdFx0aW5wdXRXaWR0aDogODBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29sdW1uVmlld1tpKytdID0ge2lkOiBcImRyYWdcIiwgaGVhZGVyOiBcIlwiLCB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSd3ZWJpeF9kcmFnX2hhbmRsZSc+PC9kaXY+XCIsIHdpZHRoOiAzNX1cblx0XHR9XG5cdFx0cmV0dXJuIGNvbHVtblZpZXc7XG5cdH1cblx0cHVibGljIHNldENvbHVtbnMoY29sdW1ucyA6IEFycmF5PGFueT4pIHtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gY29sdW1ucykge1xuXHRcdFx0dmFyIG5ld0NvbHVtbiA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XG5cdFx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICA9IGNvbHVtbnNbaXRlbV07XG5cdFx0XHRuZXdDb2x1bW4uY29sdW1uTnVtYmVyICAgICA9IGluZGV4Kys7XG5cdFx0XHR0aGlzLmNvbHVtbnNbaW5kZXhdID0gbmV3Q29sdW1uO1xuXHRcdH1cblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpIHtcblx0XHRcdHRoaXMucmVwbGFjZUNvbHVtbnMoY29sdW1ucyk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyByZXBsYWNlQ29sdW1ucyhjb2x1bW5zIDogQXJyYXk8YW55Pikge1xuXHRcdHRoaXMuY29sdW1ucyA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xuXHRcdHZhciBpbmRleD0wO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gY29sdW1ucykge1xuXHRcdFx0dGhpcy5hZGRDb2x1bW4oaW5kZXgrKyxjb2x1bW5zW2l0ZW1dKTtcblx0XHR9XG5cdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuY29uZmlnLmNvbHVtbnMgPSB0aGlzLmNyZWF0ZUNvbHVtblZpZXcoKTs7XG5cdFx0JCQodGhpcy5kYXRhVGFibGVJRCkucmVmcmVzaENvbHVtbnMoKTtcblx0fVxuXHRwdWJsaWMgc29ydChwcm9wZXJ0eSA6IHN0cmluZywgc29ydERpcmVjdGlvbjpzdHJpbmcsIHR5cGU6c3RyaW5nPVwic3RyaW5nXCIpIHtcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpXG5cdFx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnNvcnQocHJvcGVydHksc29ydERpcmVjdGlvbix0eXBlKTtcblxuXHR9XG5cblx0cHVibGljIGZpbHRlciggZnVuYyA6IGFueSkge1xuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLmZpbHRlcihmdW5jKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNyZWF0ZU5hdmlnYXRpb25CYXIoKTtcblx0XHR2YXIgcm93cyA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIGkgICAgPSAwO1xuXHRcdGlmICh0aGlzLl9zaG93VG9vbEJhcikge1xuXHRcdFx0dmFyIG5hdkJhclZpZXcgPSB0aGlzLnRvb2xCYXIuZ2V0VmlldygpO1xuXHRcdFx0cm93c1swXSAgICAgICAgPSBuYXZCYXJWaWV3O1xuXHRcdFx0aSsrXG5cdFx0fVxuXHRcdHZhciB2aWV3ID0gIHtcblx0XHRcdGlkICAgICAgICAgIDogdGhpcy5kYXRhVGFibGVJRCxcblx0XHRcdHZpZXcgICAgICAgIDogdGhpcy52aWV3VHlwZSxcblx0XHRcdHNlbGVjdCAgICAgIDogXCJyb3dcIixcblx0XHRcdG5hdmlnYXRpb24gIDogdHJ1ZSxcblx0XHRcdHJlc2l6ZUNvbHVtbjogdHJ1ZSxcblx0XHRcdHNjcm9sbHh5ICAgIDogdHJ1ZSxcblx0XHRcdGRyYWdDb2x1bW4gIDogdHJ1ZSxcblx0XHRcdGVkaXRhYmxlICAgIDogdGhpcy5lZGl0YWJsZSxcblx0XHRcdGVkaXRhY3Rpb24gIDogdGhpcy5lZGl0YWN0aW9uLFxuXHRcdH07XG5cblx0XHRpZiAodGhpcy5oZWlnaHQgPiAwKSB7XG5cdFx0XHR2aWV3W1wiaGVpZ2h0XCJdID0gdGhpcy5oZWlnaHQ7XG5cdFx0fVxuXHRcdGlmICh0aGlzLndpZHRoID4gMCkge1xuXHRcdFx0dmlld1tcIndpZHRoXCJdID0gdGhpcy53aWR0aDtcblxuXHRcdH1cblx0XHRpZiAodGhpcy5hdXRvQ29sdW1uQ29uZmlndXJlKSB7XG5cdFx0XHR2aWV3W1wiYXV0b0NvbmZpZ1wiXSA9IHRydWU7XG5cdFx0fSBlbHNlXG5cdFx0XHR2aWV3W1wiY29sdW1uc1wiXSA9IHRoaXMuY3JlYXRlQ29sdW1uVmlldygpO1xuXHRcdGlmICh0aGlzLm11bHRpU2VsZWN0KVxuXHRcdFx0dmlld1tcIm11bHRpc2VsZWN0XCJdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy50ZW1wbGF0ZSkge1xuXHRcdFx0dmlld1tcIl90ZW1wbGF0ZVwiXSA9IHRoaXMudGVtcGxhdGU7XG5cdFx0fVxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdHlwZTogXCJzcGFjZVwiLCByb3dzOiBbIHZpZXcgXVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvblNlbGVjdENoYW5nZVwiLCBVSUV2ZW50SGFuZGxlci5vblNlbGVjdENoYW5nZSk7XG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmRhdGFUYWJsZUlELCBcIm9uQWZ0ZXJFZGl0U3RvcFwiLCBVSUV2ZW50SGFuZGxlci5vbkFmdGVyRWRpdFN0b3ApO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkl0ZW1EYmxDbGlja1wiLCBVSUV2ZW50SGFuZGxlci5Pbkl0ZW1EYmxDbGljayk7XG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmRhdGFUYWJsZUlELCBcIm9uQmVmb3JlRWRpdFN0YXJ0XCIsIFVJRXZlbnRIYW5kbGVyLm9uQmVmb3JlRWRpdFN0YXJ0VGFibGUpO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkl0ZW1DbGlja1wiLCBVSUV2ZW50SGFuZGxlci5Pbkl0ZW1DbGljayk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHZhciByZXN1bHRMaXN0ID0gdGhpcy5nZXRMaXN0KCk7XG5cdFx0aWYgKHJlc3VsdExpc3QpXG5cdFx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpICQkKHRoaXMuZGF0YVRhYmxlSUQpLnBhcnNlKHJlc3VsdExpc3QpO1xuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSlcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcblx0XHRpZiAodGhpcy5fc2hvd1Rvb2xCYXIpXHR0aGlzLnRvb2xCYXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VGFibGVMaXN0KCkgOiBBcnJheTxhbnk+IHtcblx0XHR2YXIgZGF0YXRhYmxlID0gJCQodGhpcy5kYXRhVGFibGVJRClcblx0XHR2YXIgZGF0YUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLmVhY2hSb3coXG5cdFx0XHRmdW5jdGlvbiAocm93KXtcblx0XHRcdFx0dmFyIGl0ZW0gPSBkYXRhdGFibGUuZ2V0SXRlbShyb3cpO1xuXHRcdFx0XHRkYXRhTGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdClcblx0XHRyZXR1cm4gZGF0YUxpc3Q7XG5cdH1cblxufSB0aGlzLlVJRGF0YVRhYmxlID0gVUlEYXRhVGFibGU7XG5cbmNsYXNzIFVJVHJlZVRhYmxlIGV4dGVuZHMgVUlEYXRhVGFibGUge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJVHJlZVRhYmxlX1wiKTtcblx0XHR0aGlzLmNvbHVtbnMgICAgICAgICAgICAgID0gbmV3IEFycmF5PFVJRGF0YVRhYmxlRmllbGQ+KCk7XG5cdFx0dGhpcy5kYXRhVGFibGVJRCAgICAgICAgICA9IFwidHJlZVRhYmxlX1wiICsgd2ViaXgudWlkKCk7XG5cdFx0dGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucyA9IGZhbHNlO1xuXHRcdHRoaXMudmlld1R5cGUgPSBcInRyZWV0YWJsZVwiO1xuXHR9XG5cbn0gdGhpcy5VSVRyZWVUYWJsZSA9IFVJVHJlZVRhYmxlO1xuXG5jbGFzcyBVSUNhbGVuZGFyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUNhbGVuZGFyRmllbGRfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSwgZGF0YTphbnksIGNhbGxiYWNrOmFueSwgdXBkYXRlRmllbGQgPSBudWxsKSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdHRoaXMudXBkYXRlRmllbGQgPSB1cGRhdGVGaWVsZDtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xuXHRcdFx0aWQgICAgICAgICAgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0dmlldyAgICAgICAgICAgICAgOiBcImRhdGVwaWNrZXJcIixcblx0XHRcdG5hbWUgICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCwgLy9kYXRlOiAgbmV3IERhdGUoMjAxMiwgNiwgOCksXG5cdFx0XHR2YWx1ZSAgICAgICAgICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHRcdGxhYmVsICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdGxhYmVsV2lkdGggICAgICAgIDogMTAwLFxuXHRcdFx0ZXZlbnRzICAgICAgICAgICAgOiB3ZWJpeC5EYXRlLmlzSG9saWRheSxcblx0XHRcdGNhbGVuZGFyRGF0ZUZvcm1hdDogXCIlWS0lbS0lZFwiXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cbn0gdGhpcy5VSUNhbGVuZGFyRmllbGQgPSBVSUNhbGVuZGFyRmllbGQ7XG5cbmNsYXNzIFVJQ29tcGxleENvbXBvbmVudCBleHRlbmRzIFVJQ29tcG9uZW50IHtcblxuXHRwcm90ZWN0ZWQgY29tcG9uZW50QXJyYXk6QXJyYXk8VUlDb21wb25lbnQ+O1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJQ29tcGxleENvbXBvbmVudF9cIik7XG5cdFx0dGhpcy5jb21wb25lbnRBcnJheSA9IG5ldyBBcnJheTxVSUNvbXBvbmVudD4oKTtcblx0fVxuXG5cdHB1YmxpYyBhZGRDb21wb25lbnQobGFiZWw6c3RyaW5nLCBjb21wb25lbnQ6VUlDb21wb25lbnQpIHtcblx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2xhYmVsXSA9IGNvbXBvbmVudDtcblx0XHRpZiAoY29tcG9uZW50KSBjb21wb25lbnQuc2V0UHJvcGVydHkoXCJuYW1lXCIsIGxhYmVsKTtcblx0fVxuXHRwdWJsaWMgY3JlYXRlQ29tcG9uZW50c1ZpZXcoKTphbnkge1xuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciBpICAgICAgICAgPSAwO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheSkge1xuXHRcdFx0aWYgKGl0ZW0gIT0gXCJ0b29sYmFyXCIpXG5cdFx0XHRcdHZpZXdBcnJheVtpKytdID0gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5nZXRWaWV3KCk7XG5cdFx0fVxuXHRcdHJldHVybiB2aWV3QXJyYXk7XG5cdH1cblx0cHVibGljIG51bU9mQ29tcG9uZW50cygpOm51bWJlciB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50QXJyYXkpLmxlbmd0aFxuXHR9XG5cdHB1YmxpYyBnZXRDb21wb25lbnQobGFiZWw6c3RyaW5nKTpVSUNvbXBvbmVudCB7XG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50QXJyYXlbbGFiZWxdO1xuXHRcdHJldHVybiBjb21wb25lbnRcblx0fVxuXHRwdWJsaWMgZ2V0RmllbGRDb21wb25lbnQobGFiZWw6c3RyaW5nKTpVSUZpZWxkIHtcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRBcnJheVtsYWJlbF07XG5cdFx0cmV0dXJuIGNvbXBvbmVudFxuXHR9XG5cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcdH1cblx0XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uaW5pdGlhbGl6ZSgpO1xuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5zZXREYXRhKHRoaXMpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgZGVzdHJveVZpZXcoKSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSAkJCh0aGlzLmNvbXBvbmVudElEKS5kZXN0cnVjdG9yKCk7XG5cdH1cblx0cHVibGljIGRlc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIuZGVzdHJ1Y3RvcigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheSkge1xuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5kZXN0cnVjdG9yKCk7XG5cdFx0fVxuXHR9XG5cbn0gdGhpcy5VSUNvbXBsZXhDb21wb25lbnQgPSBVSUNvbXBsZXhDb21wb25lbnQ7XG5cbmNsYXNzIFBvcnRhbFNlY3Rpb24gZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXG5cdHB1YmxpYyBwb3J0YWxTZWN0aW9uSW5kZXggICAgICAgICA9IG51bGw7XG5cdHB1YmxpYyBjbGFzc1R5cGU6Q2xhc3NUeXBlO1xuXHRwdWJsaWMgdGhlQXJyYXk6QXJyYXk8YW55Pjtcblx0cHVibGljIGdyYXZpdHk6bnVtYmVyICAgICAgICAgICAgID0gMTtcblx0cHVibGljIHBvcnRsZXROYW1lICAgICAgICAgICAgICAgID0gXCJcIjtcblx0cHVibGljIHNlY3Rpb25IZWFkZXI6UG9ydGFsSGVhZGVyID0gbnVsbDtcblx0cHJpdmF0ZSB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgID0ge3R5cGU6IFwibGluZVwifTtcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyWCAgICAgICAgICAgICAgID0gZmFsc2U7XG5cdHByaXZhdGUgX3Njcm9sbEJhclkgICAgICAgICAgICAgICA9IGZhbHNlO1xuXHQvL2VuZHJlZ2lvblxuXHQvL3JlZ2lvbiBDbGFzcyBWYXJpYWJsZXNcblx0cHVibGljIHN0YXRpYyBDT0xVTU5TID0gXCJjb2xzXCI7XG5cdHB1YmxpYyBzdGF0aWMgUk9XUyAgICA9IFwicm93c1wiO1xuXHRwdWJsaWMgc3RhdGljIFJFU0laRVIgPSBcInJlc2l6ZXJcIjtcblx0cHVibGljIHN0YXRpYyBST09UICAgID0gXCJyb290O1wiXG5cdHB1YmxpYyBzdGF0aWMgSEVBREVSICA9IFwiaGVhZGVyXCI7XG5cdHB1YmxpYyBzdGF0aWMgUE9SVExFVCA9IFwicG9ydGxldFwiO1xuXHQvL2VuZHJlZ2lvblxuXHQvL3JlZ2lvbiBDbGFzcyBNZXRob2RzXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlQ29sdW1ucygpIHtcblx0XHRyZXR1cm4gbmV3IFBvcnRhbENvbHVtbigpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBDcmVhdGVSb3dzKCkge1xuXHRcdHJldHVybiBuZXcgUG9ydGFsUm93KCk7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZVJvb3QoKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxSb290KCk7XG5cdH1cblxuXHQvL2VuZHJlZ2lvblxuXHRnZXQgc2Nyb2xsQmFyWCgpOmJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxCYXJYO1xuXHR9XG5cdHNldCBzY3JvbGxCYXJYKHZhbHVlOmJvb2xlYW4pIHtcblx0XHR0aGlzLl9zY3JvbGxCYXJYID0gdmFsdWU7XG5cdH1cblx0Z2V0IHNjcm9sbEJhclkoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsQmFyWTtcblx0fVxuXHRzZXQgc2Nyb2xsQmFyWSh2YWx1ZTpib29sZWFuKSB7XG5cdFx0dGhpcy5fc2Nyb2xsQmFyWSA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IobmFtZSA9IFwibm9TZWN0aW9uTmFtZVwiKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsU2VjdGlvbl9cIik7XG5cdFx0dGhpcy50aGVBcnJheSAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dGhpcy5wb3J0bGV0TmFtZSA9IG5hbWU7XG5cdH1cblxuXHRwdWJsaWMgYWRkUG9ydGxldChuYW1lLCBncmF2aXR5ID0gMSk6UG9ydGxldCB7XG5cdFx0dmFyIHBvcnRsZXQgPSBuZXcgUG9ydGxldChuYW1lLCBncmF2aXR5KTtcblx0XHR0aGlzLnRoZUFycmF5LnB1c2gocG9ydGxldCk7XG5cdFx0cmV0dXJuIHBvcnRsZXQ7XG5cdH1cblx0cHVibGljIGFkZFNlY3Rpb24odGhlU2VjdGlvbjpQb3J0YWxTZWN0aW9uLCBncmF2aXR5ID0gMSkge1xuXHRcdHRoaXMudGhlQXJyYXkucHVzaCh0aGVTZWN0aW9uKTtcblx0XHR0aGlzLmdyYXZpdHkgPSBncmF2aXR5XG5cdH1cblx0cHVibGljIGFkZFJlc2l6ZXIoKTpQb3J0YWxTZWN0aW9uIHtcblx0XHR2YXIgcmVzaXplciA9IG5ldyBQb3J0YWxSZXNpemVyKCk7XG5cdFx0dGhpcy50aGVBcnJheS5wdXNoKHJlc2l6ZXIpO1xuXHRcdHJldHVybiByZXNpemVyO1xuXHR9XG5cdHB1YmxpYyBhZGRIZWFkZXIodGl0bGU6c3RyaW5nKTpQb3J0YWxIZWFkZXIge1xuXHRcdHZhciBoZWFkZXIgPSBuZXcgUG9ydGFsSGVhZGVyKHRpdGxlKTtcblx0XHR0aGlzLnRoZUFycmF5LnVuc2hpZnQoaGVhZGVyKTtcblx0XHR0aGlzLnNlY3Rpb25IZWFkZXIgPSBoZWFkZXI7XG5cdFx0cmV0dXJuIGhlYWRlcjtcblx0fVxuXHRwdWJsaWMgcmVtb3ZlSGVhZGVyKCkge1xuXHRcdGlmICghdGhpcy5zZWN0aW9uSGVhZGVyKSByZXR1cm47XG5cdFx0dGhpcy50aGVBcnJheS5zaGlmdCgpO1xuXHR9XG5cblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy50ZW1wbGF0ZVtcImdyYXZpdHlcIl0gPSB0aGlzLmdyYXZpdHk7XG5cdFx0dGhpcy50ZW1wbGF0ZVtcImlkXCJdICAgICAgPSB0aGlzLmNvbXBvbmVudElEO1xuXHRcdHRoaXMudGVtcGxhdGVbXCJkcmFnXCJdICAgID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5zY3JvbGxCYXJYICYmIHRoaXMuc2Nyb2xsQmFyWSkge1xuXHRcdFx0dGhpcy50ZW1wbGF0ZVtcInNjcm9sbHh5XCJdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuc2Nyb2xsQmFyWClcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx4XCJdID0gdHJ1ZTsgZWxzZSBpZiAodGhpcy5zY3JvbGxCYXJZKVxuXHRcdFx0dGhpcy50ZW1wbGF0ZVtcInNjcm9sbHlcIl0gPSB0cnVlO1xuXHRcdHJldHVybiB0aGlzLnRlbXBsYXRlO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnRoZUFycmF5KSB7XG5cdFx0XHR0aGlzLnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdH1cblxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlBvcnRhbFNlY3Rpb24gPSBQb3J0YWxTZWN0aW9uO1xuXG5jbGFzcyBQb3J0YWxDb2x1bW4gZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XG5cdFx0c3VwZXIobmFtZSk7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLkNPTFVNTlM7XG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkNPTFVNTlM7XG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbENvbHVtbl9cIik7XG5cdH1cbn0gdGhpcy5Qb3J0YWxDb2x1bW4gPSBQb3J0YWxDb2x1bW5cblxuY2xhc3MgUG9ydGFsUm9vdCBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcblx0XHRzdXBlcihuYW1lKTtcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9PVDtcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICA9IFwicm9vdFwiO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSb290X1wiKTtcblx0fVxufSB0aGlzLlBvcnRhbFJvb3QgPSBQb3J0YWxSb290XG5cbmNsYXNzIFBvcnRhbFJvdyBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcblx0XHRzdXBlcihuYW1lKTtcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9XUztcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICA9IFwicm93XCI7XG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFJvd19cIik7XG5cdH1cbn10aGlzLlBvcnRhbFJvdyA9IFBvcnRhbFJvdztcblxuY2xhc3MgUG9ydGFsSGVhZGVyIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XG5cdHB1YmxpYyBoZWFkZXJUZW1wbGF0ZSAgICA9IHt2aWV3OiBcInRlbXBsYXRlXCIsIHRlbXBsYXRlOiBcIkhlYWRlclwiLCB0eXBlOiBcImhlYWRlclwifTtcblx0cHVibGljIGhlYWRlclZpZXc6YW55O1xuXHRwdWJsaWMgaGVhZGVyVGV4dDpzdHJpbmcgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKHRpdGxlOnN0cmluZykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbEhlYWRlcl9cIik7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggICAgICAgICA9IFBvcnRhbFNlY3Rpb24uSEVBREVSO1xuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcblx0XHR0aGlzLmhlYWRlclRlbXBsYXRlW1wiaWRcIl0gICAgICAgPSBcImhlYWRlcl9cIiArIHdlYml4LnVpZCgpO1xuXHRcdHRoaXMuaGVhZGVyVGVtcGxhdGVbXCJ0ZW1wbGF0ZVwiXSA9IHRpdGxlO1xuXHRcdHRoaXMuaGVhZGVyVGV4dCAgICAgICAgICAgICAgICAgPSB0aXRsZTtcblx0fVxuXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5oZWFkZXJUZW1wbGF0ZTtcblx0fVxufXRoaXMuUG9ydGFsSGVhZGVyID0gUG9ydGFsSGVhZGVyO1xuY2xhc3MgUG9ydGFsUmVzaXplciBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xuXHRwdWJsaWMgIHJlc2l6ZXJUZW1wbGF0ZSA9IHt2aWV3OiBcInJlc2l6ZXJcIn07XG5cblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XG5cdFx0c3VwZXIobmFtZSk7XG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFJlc2l6ZXJfXCIpO1xuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ICAgID0gUG9ydGFsU2VjdGlvbi5SRVNJWkVSO1xuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5SRVNJWkVSO1xuXHRcdHRoaXMucmVzaXplclRlbXBsYXRlW1wiaWRcIl0gPSBcInVpUmVzaXplcl9cIiArIHdlYml4LnVpZCgpO1xuXHR9XG5cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLnJlc2l6ZXJUZW1wbGF0ZTtcblx0fVxufXRoaXMuUG9ydGFsUmVzaXplciA9IFBvcnRhbFJlc2l6ZXI7XG5cbmNsYXNzIFBvcnRsZXQgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblxuXHQvL3JlZ2lvbiBJbnN0YW5jZSBWYXJpYWJsZXNcblx0cHVibGljIHBvcnRsZXRWaWV3OmFueTtcblx0cHVibGljIHBvcnRsZXRDb21wb25lbnRWaWV3OmFueTtcblx0cHVibGljIGRlZmF1bHRQb3J0bGV0Vmlldzphbnk7XG5cdHB1YmxpYyBub25Db21wb25lbnRWaWV3OmFueSA9IG51bGw7XG5cdHB1YmxpYyBpbnRlcm5hbFZpZXc6YW55XG5cdHB1YmxpYyBncmF2aXR5Om51bWJlcjtcblx0cHVibGljIHZpZXdDb250cm9sbGVyOlVJQ29tcG9uZW50O1xuXHRwdWJsaWMgaGlkZGVuOmJvb2xlYW4gICAgICAgPSBmYWxzZTtcblx0Ly9lbmRyZWdpb25cblx0cHVibGljIHN0YXRpYyBjYXN0KGFTZWN0aW9uOmFueSk6UG9ydGxldCB7XG5cdFx0cmV0dXJuIDxQb3J0bGV0PiBhU2VjdGlvbjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHBvcnRsZXROYW1lOnN0cmluZywgZ3Jhdml0eSA9IDEpIHtcblx0XHRzdXBlcihwb3J0bGV0TmFtZSk7XG5cdFx0dGhpcy5ncmF2aXR5ICAgICAgICAgICAgICA9IGdyYXZpdHk7XG5cdFx0dGhpcy5wb3J0bGV0VmlldyAgICAgICAgICA9IHtpZDogdGhpcy5jb21wb25lbnRJRCwgbWluV2lkdGg6IDEwMCwgdGVtcGxhdGU6IFwiQ29udGVudFwiLCB2aWV3OiBcInRlbXBsYXRlXCJ9XG5cdFx0dGhpcy5wb3J0bGV0Q29tcG9uZW50VmlldyA9IHt0eXBlOiBcImxpbmVcIn1cblx0XHR0aGlzLmRlZmF1bHRQb3J0bGV0VmlldyAgID0gdGhpcy5wb3J0bGV0Vmlldztcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCAgID0gUG9ydGFsU2VjdGlvbi5QT1JUTEVUO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0bGV0X1wiKTtcblx0fVxuXG5cdHB1YmxpYyByZXBsYWNlVmlldygpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmdldFZpZXcoKSwgbnVsbCwgNikpO1xuXHRcdHdlYml4LnVpKHRoaXMuZ2V0VmlldygpLCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cdFx0Ly8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWaWV3KCksIG51bGwsIDYpKTtcblx0fVxuXHRwdWJsaWMgaGlkZSgpIHtcblx0XHR0aGlzLmhpZGRlbiA9IHRydWU7XG5cdH1cblx0cHVibGljIHNob3coKSB7XG5cdFx0dGhpcy5oaWRkZW4gPSBmYWxzZTtcblx0fVxuXHRwdWJsaWMgcmVzZXRWaWV3KCkge1xuXHRcdHRoaXMucG9ydGxldFZpZXcgPSB0aGlzLmRlZmF1bHRQb3J0bGV0Vmlld1xuXHR9XG5cdHB1YmxpYyBzZXRDb21wb25lbnQodGhlQ29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0dGhpcy52aWV3Q29udHJvbGxlciA9IHRoZUNvbXBvbmVudDtcblx0fVxuXHRwdWJsaWMgcmVzaXplKCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkucmVzaXplKCk7XG5cdFx0fVxuXHR9XG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50cyBNZXRob2RzXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRpZiAodGhpcy52aWV3Q29udHJvbGxlcikge1xuXHRcdFx0dmFyIHZpZXdBcnJheSAgICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRcdHRoaXMucG9ydGxldFZpZXcgICAgICAgICA9IHRoaXMucG9ydGxldENvbXBvbmVudFZpZXc7XG5cdFx0XHR2YXIgY29udHJvbGxlclZpZXcgICAgICAgPSB0aGlzLnZpZXdDb250cm9sbGVyLmdldFZpZXcoKTtcblx0XHRcdHZpZXdBcnJheVswXSAgICAgICAgICAgICA9IGNvbnRyb2xsZXJWaWV3O1xuXHRcdFx0dGhpcy5wb3J0bGV0Vmlld1tcInJvd3NcIl0gPSB2aWV3QXJyYXk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucG9ydGxldFZpZXcgPSB0aGlzLmRlZmF1bHRQb3J0bGV0Vmlldztcblx0XHR9XG5cdFx0dGhpcy5wb3J0bGV0Vmlld1tcImlkXCJdICAgICAgPSB0aGlzLmdldENvbXBvbmVudElEKCk7XG5cdFx0dGhpcy5wb3J0bGV0Vmlld1tcImdyYXZpdHlcIl0gPSB0aGlzLmdyYXZpdHk7XG5cdFx0dGhpcy5wb3J0bGV0Vmlld1tcImRyYWdcIl0gICAgPSB0cnVlO1xuXHRcdHJldHVybiB0aGlzLnBvcnRsZXRWaWV3O1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdFx0aWYgKHRoaXMudmlld0NvbnRyb2xsZXIpIHtcblx0XHRcdHRoaXMudmlld0NvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMudGhlQXJyYXkpIHtcblx0XHRcdHRoaXMudGhlQXJyYXlbaXRlbV0uaW5pdGlhbGl6ZSgpO1xuXHRcdH1cblx0fVxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlBvcnRsZXQgPSBQb3J0bGV0O1xuXG5lbnVtIFBvcnRhbFR5cGUgeyBPbmVWaWV3LCBFeHBsb3JlclZpZXcsIERldGFpbFZpZXcgfXRoaXMuUG9ydGFsVHlwZSA9IFBvcnRhbFR5cGU7XG5lbnVtIFBvcnRhbE5hbWVzIHtFWFBMT1JFUiA9IDAsIERFVEFJTCA9IDEsIE1BSU4gPSAyLCBJTkZPID0gM310aGlzLlBvcnRhbE5hbWVzID0gUG9ydGFsTmFtZXM7XG5cbmNsYXNzIFBvcnRhbCBleHRlbmRzIFVJQ29tcG9uZW50IHtcblx0cHVibGljIHBvcnRhbFJvb3Q6UG9ydGFsUm9vdDtcblx0cHVibGljIHBvcnRhbENvbnRhaW5lcjpzdHJpbmcgPSBudWxsO1xuXHRwdWJsaWMgdmlld1BvcnRsZXQ6UG9ydGxldCAgICA9IG51bGw7XG5cdHB1YmxpYyBwb3J0YWxUeXBlOlBvcnRhbFR5cGU7XG5cdHB1YmxpYyBuZXdWaWV3UG9ydDpib29sZWFuICAgID0gZmFsc2U7XG5cdHB1YmxpYyB2aWV3VHlwZSAgICAgICAgICAgICAgID0gbnVsbDtcblx0cHVibGljIHNlY3Rpb25UZW1wbGF0ZSAgICAgICAgPSB7dHlwZTogXCJsaW5lXCJ9O1xuXG5cdGNvbnN0cnVjdG9yKHBvcnRhbFR5cGU/OlBvcnRhbFR5cGUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxfXCIpO1xuXHRcdHRoaXMucG9ydGFsUm9vdCA9IG5ldyBQb3J0YWxSb290KCk7XG5cdFx0aWYgKCFwb3J0YWxUeXBlKSB7XG5cdFx0XHRzd2l0Y2ggKHBvcnRhbFR5cGUpIHtcblx0XHRcdFx0Y2FzZSBQb3J0YWxUeXBlLk9uZVZpZXcgOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplT25lVmlldygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5FeHBsb3JlclZpZXcgOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplRXhwbG9yZXJWaWV3KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBQb3J0YWxUeXBlLkRldGFpbFZpZXcgOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplRGV0YWlsVmlldygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHBvcnRhbFN0cmluZyhwb3J0YWxOYW1lczpQb3J0YWxOYW1lcykge1xuXHRcdHN3aXRjaCAocG9ydGFsTmFtZXMpIHtcblx0XHRcdGNhc2UgUG9ydGFsTmFtZXMuRVhQTE9SRVIgOlxuXHRcdFx0XHRyZXR1cm4gXCJleHBsb3JlclwiO1xuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5ERVRBSUwgOlxuXHRcdFx0XHRyZXR1cm4gXCJkZXRhaWxBcmVhXCI7XG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLk1BSU4gOlxuXHRcdFx0XHRyZXR1cm4gXCJtYWluXCI7XG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLklORk8gOlxuXHRcdFx0XHRyZXR1cm4gXCJpbmZvXCI7XG5cdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0cmV0dXJuIFwiTk9OQU1FXCI7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplRXhwbG9yZXJWaWV3KCkge1xuXHRcdHZhciByb290ICAgICAgPSB0aGlzLmdldFJvb3QoKTtcblx0XHR2YXIgbmV3Q29sdW1uID0gdGhpcy5jcmVhdGVDb2x1bW5zKFwiY29sdW1uc1wiKTtcblx0XHR2YXIgbmV3Um93ICAgID0gdGhpcy5jcmVhdGVSb3dzKFwicm93c1wiKTtcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcblx0XHRuZXdDb2x1bW4uYWRkUG9ydGxldChQb3J0YWxOYW1lcy5FWFBMT1JFUik7XG5cdFx0bmV3Q29sdW1uLmFkZFJlc2l6ZXIoKTtcblx0XHRuZXdSb3cuYWRkUG9ydGxldChQb3J0YWxOYW1lcy5ERVRBSUwpO1xuXHRcdG5ld1Jvdy5hZGRSZXNpemVyKCk7XG5cdFx0bmV3Um93LmFkZFBvcnRsZXQoUG9ydGFsTmFtZXMuSU5GTyk7XG5cdFx0bmV3Q29sdW1uLmFkZFNlY3Rpb24obmV3Um93KTtcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZU9uZVZpZXcoKSB7XG5cdFx0dmFyIHJvb3QgICAgICA9IHRoaXMuZ2V0Um9vdCgpO1xuXHRcdHZhciBuZXdDb2x1bW4gPSB0aGlzLmNyZWF0ZUNvbHVtbnMoXCJjb2x1bW5zXCIpO1xuXHRcdHJvb3QuYWRkU2VjdGlvbihuZXdDb2x1bW4pO1xuXHRcdG5ld0NvbHVtbi5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLk1BSU4pKTtcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZURldGFpbFZpZXcoKSB7XG5cdFx0dmFyIHJvb3QgICA9IHRoaXMuZ2V0Um9vdCgpO1xuXHRcdHZhciBuZXdSb3cgPSB0aGlzLmNyZWF0ZVJvd3MoXCJyb3dzXCIpO1xuXHRcdHJvb3QuYWRkU2VjdGlvbihuZXdSb3cpO1xuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLkRFVEFJTCkpO1xuXHRcdG5ld1Jvdy5hZGRSZXNpemVyKCk7XG5cdFx0bmV3Um93LmFkZFBvcnRsZXQodGhpcy5wb3J0YWxTdHJpbmcoUG9ydGFsTmFtZXMuSU5GTykpO1xuXHR9XG5cdHB1YmxpYyBnZXRSb290KCk6UG9ydGFsUm9vdCB7XG5cdFx0cmV0dXJuIHRoaXMucG9ydGFsUm9vdDtcblx0fVxuXHRwdWJsaWMgY3JlYXRlQ29sdW1ucyhuYW1lPyk6UG9ydGFsQ29sdW1uIHtcblx0XHRyZXR1cm4gbmV3IFBvcnRhbENvbHVtbihuYW1lKTtcblx0fVxuXHRwdWJsaWMgY3JlYXRlUm93cyhuYW1lPzpzdHJpbmcpOlBvcnRhbFJvdyB7XG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxSb3cobmFtZSk7XG5cdH1cblx0cHVibGljIHNldENvbnRhaW5lcihjb250YWluZXJJRDpzdHJpbmcpIHtcblx0XHR0aGlzLnBvcnRhbENvbnRhaW5lciA9IGNvbnRhaW5lcklEO1xuXHRcdHRoaXMudmlld1BvcnRsZXQgICAgID0gbnVsbDtcblx0fVxuXHRwdWJsaWMgc2V0Vmlld1BvcnRsZXQodGhlUG9ydGxldDpQb3J0bGV0KSB7XG5cdFx0dGhpcy52aWV3UG9ydGxldCAgICAgPSB0aGVQb3J0bGV0O1xuXHRcdHRoaXMucG9ydGFsQ29udGFpbmVyID0gXCJcIjtcblx0fVxuXHRwdWJsaWMgZ2V0UG9ydGxldChwb3J0YWxOYW1lOnN0cmluZyk6UG9ydGxldCB7XG5cdFx0cmV0dXJuIFBvcnRsZXQuY2FzdCh0aGlzLmZpbmQodGhpcy5wb3J0YWxSb290LCBwb3J0YWxOYW1lKSk7XG5cdH1cblx0cHVibGljIGZpbmQocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uLCBuYW1lKTpQb3J0YWxTZWN0aW9uIHtcblx0XHRmb3IgKHZhciBpdGVtIGluIHBvcnRhbFNlY3Rpb24udGhlQXJyYXkpIHtcblx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRsZXROYW1lID09IG5hbWUpXG5cdFx0XHRcdHJldHVybiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dO1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuZmluZCg8UG9ydGFsU2VjdGlvbj4gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXSwgbmFtZSk7XG5cdFx0XHRpZiAocmVzdWx0KVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dmFyIHZpZXdBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIHRoZVZpZXcgICA9IHRoaXMuc2VjdGlvblRlbXBsYXRlO1xuXHRcdHRoZVZpZXdbXCJpZFwiXSAgID0gdGhpcy5nZXRDb21wb25lbnRJRCgpO1xuXHRcdHZpZXdBcnJheVswXSAgICA9IHRoaXMuY3JlYXRlUG9ydGFsVmlldygpO1xuXHRcdHRoZVZpZXdbXCJyb3dzXCJdID0gdmlld0FycmF5O1xuXHRcdGlmICh0aGlzLnZpZXdUeXBlKVxuXHRcdFx0dGhlVmlld1tcInZpZXdcIl0gPSB0aGlzLnZpZXdUeXBlO1xuXHRcdHRoaXMuc2V0Q29tcG9uZW50Vmlldyh0aGVWaWV3KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBjcmVhdGVQb3J0YWxWaWV3KCk6YW55IHtcblx0XHR2YXIgdGhlUG9ydGFsVmlldzpQb3J0bGV0O1xuXHRcdHZhciByZXN1bHRBcnJheSA9IHRoaXMudHJlZSh0aGlzLnBvcnRhbFJvb3QpO1xuXHRcdHJldHVybiByZXN1bHRBcnJheVswXTtcblx0fVxuXHRwdWJsaWMgdHJlZShwb3J0YWxTZWN0aW9uOlBvcnRhbFNlY3Rpb24pOkFycmF5PGFueT4ge1xuXHRcdHZhciByZXR1cm5BcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5KSB7XG5cdFx0XHRpbmRleCA9IFBvcnRhbFNlY3Rpb24uUk9XUztcblx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleClcblx0XHRcdFx0aWYgKHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4ID09IFBvcnRhbFNlY3Rpb24uQ09MVU1OUyB8fCBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleCA9PSBQb3J0YWxTZWN0aW9uLlJPV1MpXG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXg7XG5cdFx0XHR2YXIgcmVzdWx0ID0gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5nZXRWaWV3KCk7XG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS50aGVBcnJheS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciByZXN1bHRBcnJheSA9IHRoaXMudHJlZSg8UG9ydGFsU2VjdGlvbj4gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXSk7XG5cdFx0XHRcdHJlc3VsdFtpbmRleF0gICA9IHJlc3VsdEFycmF5O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuQXJyYXkucHVzaChyZXN1bHQpXG5cdFx0XHQvLyAgY29uc29sZS5sb2coXCJSZXR1cm5pbmcgUmVzdWx0XCIrQzRsb2cucHJpbnRUaGlzKHJlc3VsdCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0dXJuQXJyYXk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemVUcmVlKCkge1xuXHRcdHZhciByZXR1cm5BcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnBvcnRhbFJvb3QudGhlQXJyYXkpIHtcblx0XHRcdHRoaXMucG9ydGFsUm9vdC50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXR1cm5BcnJheTtcblx0fVxuXHRwdWJsaWMgcmVmcmVzaCgpIHtcblx0XHR0aGlzLnNob3coKTtcblx0fVxuXHRwdWJsaWMgc2hvdyh0aGVXaW5kb3c/OmFueSk6YW55IHtcblx0XHR2YXIgc2hvd1ZpZXcgPSB0aGlzLmdldFZpZXcoKTtcblx0XHR2YXIgeFZpZXc6YW55O1xuXHRcdGlmICh0aGVXaW5kb3cpIHtcblx0XHRcdHZhciByb3dzICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRcdHJvd3NbMF0gICAgICAgICAgID0gc2hvd1ZpZXc7XG5cdFx0XHR0aGVXaW5kb3dbXCJyb3dzXCJdID0gcm93cztcblx0XHRcdEFwcExvZy5wcmludFRoaXModGhlV2luZG93KTtcblx0XHRcdHhWaWV3ID0gd2ViaXgudWkodGhlV2luZG93KS5zaG93KCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnBvcnRhbENvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5jb21wb25lbnRWaWV3W1wiY29udGFpbmVyXCJdID0gdGhpcy5wb3J0YWxDb250YWluZXI7XG5cdFx0XHR7XG5cdFx0XHRcdEFwcExvZy5wcmludFRoaXMoc2hvd1ZpZXcpO1xuXHRcdFx0XHR4VmlldyA9IHdlYml4LnVpKHNob3dWaWV3LCB0aGlzLnBvcnRhbENvbnRhaW5lcik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdEFwcExvZy5wcmludFRoaXMoc2hvd1ZpZXcpO1xuXHRcdFx0eFZpZXcgPSB3ZWJpeC51aShzaG93VmlldywgJCQodGhpcy5jb21wb25lbnRJRCkpO1xuXHRcdH1cblx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHQvL2NvbnNvbGUubG9nKFwiU2hvdyBWaWV3XCIpO1xuXHRcdC8vQzRsb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcblx0XHRyZXR1cm4geFZpZXc7XG5cdH1cblx0cHVibGljIHBvcHVwKHRoZVdpbmRvdzphbnkpIHtcblx0XHR2YXIgc2hvd1ZpZXcgPSB0aGlzLmdldFZpZXcoKTtcblx0XHR2YXIgcm93cyAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0cm93c1swXSAgICAgICAgICAgPSBzaG93Vmlldztcblx0XHR0aGVXaW5kb3dbXCJib2R5XCJdID0gQzRPYmplY3QuQ2xvbmUoc2hvd1ZpZXcpO1xuXHRcdC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhlV2luZG93KSk7XG5cdFx0dmFyIG5ld1dpbmRvdyA9IHdlYml4LnVpKHRoZVdpbmRvdyk7XG5cdFx0cmV0dXJuIG5ld1dpbmRvdztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZVRyZWUoKTtcblx0fVxuXG59IHRoaXMuUG9ydGFsID0gUG9ydGFsO1xuXG5jbGFzcyBVSVBvcHVwV2luZG93IGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcblx0cHVibGljIHN0YXRpYyBDbG9zZUJ1dHRvbigpIHtcblx0XHR2YXIgdGhlSUQgICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJQ29tcG9uZW50PiAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XG5cdFx0JCQodGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpLmNsb3NlKCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBGdWxsU2NyZWVuKCkge1xuXHRcdHZhciB0aGVJRCAgICAgICAgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlQb3B1cFdpbmRvdz4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHRoZUNvbXBvbmVudC5mdWxsc2NyZWVuVG9nZ2xlKCk7XG5cdH1cblxuXHQvL3JlZ2lvbiBJbnN0YW5jZSBWYXJpYWJsZXNcblx0cHVibGljIHRpdGxlOnN0cmluZztcblx0cHVibGljIHJlc2l6ZTpib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBtb2RhbDpib29sZWFuICA9IHRydWU7XG5cdHB1YmxpYyB0aGVDb21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdHB1YmxpYyB0aGVQb3J0YWwgICAgICA9IG5ldyBQb3J0YWwoKTtcblx0cHVibGljIGNsb3NlQnV0dG9uSUQgID0gXCJjbG9zZUJ1dHRvbl9cIiArIHdlYml4LnVpZCgpO1xuXHRwdWJsaWMgZnVsbHNjcmVlbklEICAgPSBcImZ1bGxTY3JlZW5JRF9cIit3ZWJpeC51aWQoKTtcblx0cHVibGljIHdpZHRoICAgICAgICAgID0gNTAwO1xuXHRwdWJsaWMgaGVpZ2h0ICAgICAgICAgPSA1MDA7XG5cdC8vZW5kcmVnaW9uXG5cdGNvbnN0cnVjdG9yKGxhYmVsOnN0cmluZyA9IFwiUG9wdXAgV2luZG93XCIsIHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCA9IG51bGwpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuYWRkUHJvcGVydGllcyAoIHsgd2lkdGggOiB0aGlzLndpZHRoLCBoZWlnaHQgOiB0aGlzLmhlaWdodCB9KVxuXHRcdHRoaXMuc2V0SUQoXCJVSVBvcHVwV2luZG93X1wiKTtcblx0XHR2YXIgcG9ydGFsUm9vdCA9IHRoaXMudGhlUG9ydGFsLmdldFJvb3QoKTtcblx0XHR2YXIgcm93cyA9IHRoaXMudGhlUG9ydGFsLmNyZWF0ZVJvd3MoKTtcblx0XHRyb3dzLmFkZFBvcnRsZXQoXCJtYWluXCIpO1xuXHRcdHBvcnRhbFJvb3QuYWRkU2VjdGlvbigocm93cykpO1xuXHRcdHRoaXMuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XG5cdFx0dGhpcy5jb21wb25lbnRMYWJlbCA9IGxhYmVsO1xuXHR9XG5cblx0cHVibGljIHNldENvbXBvbmVudCh0aGVDb21wb25lbnQ6VUlDb21wb25lbnQpIHtcblx0XHR0aGlzLnRoZUNvbXBvbmVudCA9IHRoZUNvbXBvbmVudDtcblx0XHR0aGlzLnRoZVBvcnRhbC5nZXRQb3J0bGV0KFwibWFpblwiKS5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcblx0XHR0aGlzLmFkZENvbXBvbmVudChcImNvbXBvbmVudFwiLCB0aGVDb21wb25lbnQpO1xuXHR9XG5cdHB1YmxpYyBzaG93KHRoZUNvbXBvbmVudD86VUlDb21wb25lbnQpIHtcblx0XHRpZiAodGhlQ29tcG9uZW50KSB7XG5cdFx0XHR0aGlzLnNldENvbXBvbmVudCh0aGVDb21wb25lbnQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy50aGVDb21wb25lbnQgPT09IG51bGwpIHtcblx0XHRcdEFwcExvZy5lcnJvcihcIlRyeWluZyB0byBTaG93IFdpbmRvdyBXaXRoIE1pc3NpbmcgVmlld1wiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIHBvcHVwID0gdGhpcy50aGVQb3J0YWwucG9wdXAodGhpcy5nZXRWaWV3KCkpO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuUG9wdXApO1xuXHRcdHBvcHVwLnNob3coKTtcblx0fVxuXG5cdHB1YmxpYyBmdWxsc2NyZWVuVG9nZ2xlKCkge1xuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmNvbmZpZy5mdWxsc2NyZWVuID0gISQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuY29uZmlnLmZ1bGxzY3JlZW5cblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkucmVzaXplKCk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBoaWRlKCkge1xuXHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIHRoaXMpO1xuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuQ2xvc2VEaWFncmFtKTtcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5oaWRlKCk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBjbG9zZSgpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCB0aGlzKTtcblx0XHRpZiAoJCQodGhpcy50aGVDb21wb25lbnQuZ2V0Q29tcG9uZW50SUQoKSkpIHtcblx0XHRcdCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpLmRlc3RydWN0b3IoKTtcblx0XHR9XG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5DbG9zZURpYWdyYW0pO1xuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHR2aWV3ICAgIDogXCJ3aW5kb3dcIixcblx0XHRcdGlkICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0Y3NzICAgICA6IFwiYzRwb3B1cCBhbmltYXRlZCB6b29tSW5cIixcblx0XHRcdHBvc2l0aW9uOiBcImNlbnRlclwiLFxuXHRcdFx0bW9kYWwgICA6IHRydWUsXG5cdFx0XHRtb3ZlICAgIDogdHJ1ZSxcblx0XHRcdHNjcm9sbHh5OiB0cnVlLFxuXHRcdFx0aGlkZGVuICA6IHRydWUsXG5cdFx0XHRyZXNpemUgIDogdHJ1ZSxcblx0XHRcdGhlYWQgICAgOiB7XG5cdFx0XHRcdHZpZXc6IFwidG9vbGJhclwiLCBtYXJnaW46IC00LCBwb3NpdGlvbjogXCJjZW50ZXJcIiwgY29sczogW1xuXHRcdFx0XHRcdCB7dmlldzogXCJsYWJlbFwiLCBsYWJlbDogdGhpcy5jb21wb25lbnRMYWJlbH0sXG5cdFx0XHRcdFx0IHt2aWV3IDogXCJpY29uXCIsaWQgOiB0aGlzLmZ1bGxzY3JlZW5JRCxpY29uIDogXCJhcnJvd3MtYWx0XCIsY3NzICA6IFwiYWx0ZXJcIixjbGljazogVUlQb3B1cFdpbmRvdy5GdWxsU2NyZWVufSxcblx0XHQgICAgICAgICAgICAge3ZpZXcgOiBcImljb25cIixpZCA6IHRoaXMuY2xvc2VCdXR0b25JRCxpY29uIDogXCJ0aW1lcy1jaXJjbGVcIixjc3MgIDogXCJhbHRlclwiLGNsaWNrOiBVSVBvcHVwV2luZG93LkNsb3NlQnV0dG9ufVxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdC8vIHRoaXMudGhlQ29tcG9uZW50LmluaXRpYWxpemUoKTtcblx0XHQkJCh0aGlzLmNsb3NlQnV0dG9uSUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcblx0XHQkJCh0aGlzLmZ1bGxzY3JlZW5JRClbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdICAgPSB0aGlzO1xuXHR9XG5cdC8vZW5kcmVnaW9uXG59IHRoaXMuVUlQb3B1cFdpbmRvdyA9IFVJUG9wdXBXaW5kb3c7XG5cbmNsYXNzIENvbmZpcm1BY3Rpb24ge1xuXHRsYWJlbDpzdHJpbmc7XG5cdGV2ZW50OnN0cmluZztcbn0gdGhpcy5Db25maXJtQWN0aW9uID0gQ29uZmlybUFjdGlvbjtcblxuY2xhc3MgVUlDb25maXJtV2luZG93IGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcblx0cHJvdGVjdGVkIHBvcHVwOlVJUG9wdXBXaW5kb3c7XG5cdHB1YmxpYyB0aXRsZTpzdHJpbmc7XG5cdHB1YmxpYyBzdGF0ZW1lbnQ6c3RyaW5nO1xuXHRwdWJsaWMgb3B0aW9uMTpDb25maXJtQWN0aW9uO1xuXHRwdWJsaWMgb3B0aW9uMjpDb25maXJtQWN0aW9uO1xuXHRwdWJsaWMgb3B0aW9uMzpDb25maXJtQWN0aW9uO1xuXG5cdGNvbnN0cnVjdG9yKHRpdGxlOnN0cmluZywgc3RhdGVtZW50OnN0cmluZywgb3B0aW9uMTpDb25maXJtQWN0aW9uLCBvcHRpb24yOkNvbmZpcm1BY3Rpb24gPSBudWxsLCBvcHRpb24zOkNvbmZpcm1BY3Rpb24gPSBudWxsKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnRpdGxlICAgICA9IHRpdGxlO1xuXHRcdHRoaXMuc3RhdGVtZW50ID0gc3RhdGVtZW50O1xuXHRcdHRoaXMub3B0aW9uMSAgID0gb3B0aW9uMTtcblx0XHR0aGlzLm9wdGlvbjIgICA9IG9wdGlvbjI7XG5cdFx0dGhpcy5vcHRpb24zICAgPSBvcHRpb24zO1xuXHR9XG5cblx0cHVibGljIGNsb3NlKCkge1xuXHRcdHRoaXMucG9wdXAuY2xvc2UoKTtcblx0fVxuXHRwdWJsaWMgbGlzdGVuKGV2ZW50OmFueSwgb2JqZWN0OmFueSwgY2FsbGVyOlVJQ29tcG9uZW50KSB7XG5cdFx0c3dpdGNoIChldmVudCkge1xuXHRcdFx0Y2FzZSBcImNsaWNrXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoY2FsbGVyID09PSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjFcIikpIHtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2godGhpcy5vcHRpb24xLmV2ZW50LCB0aGlzLm9wdGlvbjEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjYWxsZXIgPT09IHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKSkge1xuXHRcdFx0XHRcdHRoaXMucHVibGlzaCh0aGlzLm9wdGlvbjIuZXZlbnQsIHRoaXMub3B0aW9uMik7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNhbGxlciA9PT0gdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB7XG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoKHRoaXMub3B0aW9uMy5ldmVudCwgdGhpcy5vcHRpb24zKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJjbG9zZVwiIDpcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5wdWJsaXNoKFwiY2xvc2VcIiwgbnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR2YXIgdGl0bGUgPSBuZXcgVUlMYWJlbCh7bGFiZWw6IHRoaXMudGl0bGUsIGFsaWdubWVudDogXCJjZW50ZXJcIiwgbGFiZWxXaWR0aDogMTAwfSk7XG5cdFx0dGhpcy5hZGRDb21wb25lbnQoXCJ0aXRsZVwiLCB0aXRsZSk7XG5cdFx0dmFyIHRleHQgPSBuZXcgVUlMYWJlbCh7bGFiZWw6IHRoaXMuc3RhdGVtZW50LCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsIGxhYmVsV2lkdGg6IDEwMH0pO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGV4dFwiLCB0ZXh0KTtcblx0XHR2YXIgb3B0aW9uMSA9IG5ldyBVSUJ1dHRvbih7bGFiZWw6IHRoaXMub3B0aW9uMS5sYWJlbH0pO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uMVwiLCBvcHRpb24xKTtcblx0XHRpZiAodGhpcy5vcHRpb24xKSB7XG5cdFx0XHR2YXIgb3B0aW9uMiA9IG5ldyBVSUJ1dHRvbih0aGlzLm9wdGlvbjIubGFiZWwpO1xuXHRcdFx0dGhpcy5hZGRDb21wb25lbnQoXCJvcHRpb24yXCIsIG9wdGlvbjIpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5vcHRpb24zKSB7XG5cdFx0XHR2YXIgb3B0aW9uMyA9IG5ldyBVSUJ1dHRvbih0aGlzLm9wdGlvbjMubGFiZWwpO1xuXHRcdFx0dGhpcy5hZGRDb21wb25lbnQoXCJvcHRpb24zXCIsIG9wdGlvbjMpO1xuXHRcdH1cblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0dmlldzogXCJmb3JtXCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIHJvd3M6IHRoaXMuY3JlYXRlQ29tcG9uZW50c1ZpZXcoKVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIHNob3coKSB7XG5cdFx0dGhpcy5wb3B1cCA9IG5ldyBVSVBvcHVwV2luZG93KFwiQ29uZmlybWF0aW9uXCIsIHRoaXMpO1xuXHRcdHRoaXMucG9wdXAuc3Vic2NyaWJlKFwiY2xvc2VcIiwgdGhpcyk7XG5cdFx0dGhpcy5wb3B1cC5zaG93KCk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjFcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XG5cdFx0aWYgKHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKSkgdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24yXCIpLnN1YnNjcmliZShcImNsaWNrXCIsIHRoaXMpO1xuXHRcdGlmICh0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjNcIikpIHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uM1wiKS5zdWJzY3JpYmUoXCJjbGlja1wiLCB0aGlzKTtcblx0fVxufSB0aGlzLlVJQ29uZmlybVdpbmRvdyA9IFVJQ29uZmlybVdpbmRvd1xuXG5jbGFzcyBVSU11bHRpVmlldyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlVJTXVsdGlWaWV3X1wiKTtcblx0fVxuXG5cdHB1YmxpYyBhZGRWaWV3KGxhYmVsOnN0cmluZywgY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0dGhpcy5hZGRDb21wb25lbnQobGFiZWwsIGNvbXBvbmVudCk7XG5cdH1cblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XG5cdFx0c3VwZXIuc2V0UmVsYXRpb25zaGlwT2JqZWN0KHRoZU9iamVjdCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLnNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGlzLmdldFJlbGF0aW9uc2hpcE9iamVjdCgpKTtcblx0XHR9XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbXBvbmVudHNWaWV3KCk6YW55IHtcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgaSAgICAgICAgID0gMDtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcblx0XHRcdGlmIChpdGVtICE9IFwidG9vbGJhclwiKVxuXHRcdFx0XHR2aWV3QXJyYXlbaSsrXSA9IHtcblx0XHRcdFx0XHRoZWFkZXI6IGl0ZW0sIGJvZHk6IHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZ2V0VmlldygpXG5cdFx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHZpZXdBcnJheTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xuXHRcdFx0aWQ6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSwgdmlldzogXCJ0YWJ2aWV3XCIsIGFuaW1hdGU6IHRydWUsIGNlbGxzOiB0aGlzLmNyZWF0ZUNvbXBvbmVudHNWaWV3KClcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXG59IHRoaXMuVUlNdWx0aVZpZXcgPSBVSU11bHRpVmlldztcblxuY2xhc3MgVUlNZW51IGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcblxuXHRwdWJsaWMgbWVudUl0ZW1zIDogQXJyYXk8YW55PjtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMubWVudUl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcblx0fVxuXHRwdWJsaWMgYWRkTWVudUl0ZW0obWVudSA6IGFueSkge1xuXHRcdG1lbnVbXCJpZFwiXSA9IHdlYml4LnVpZCgpK1wiX21lbnVcIjtcblx0XHR0aGlzLm1lbnVJdGVtcy5wdXNoKG1lbnUpO1xuXHR9XG59IHRoaXMuVUlNZW51ID0gVUlNZW51O1xuXG5jbGFzcyBUYWJWaWV3Q2VsbCB7XG5cdHB1YmxpYyBuYW1lICAgICAgIDogc3RyaW5nO1xuXHRwdWJsaWMgcHJvcGVydGllcyA6IGFueTtcblx0cHVibGljIGNvbXBvbmVudCAgOiBVSUNvbXBsZXhDb21wb25lbnQ7XG59XG5cbmNsYXNzIFVJVGFiVmlldyAgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xuXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xuXHRwdWJsaWMgYW5pbWF0ZSAgICAgIDogYm9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgY2VsbHMgICAgICAgOiBBcnJheTxUYWJWaWV3Q2VsbD47XG5cdHB1YmxpYyBjbG9zZUFibGUgICAgOiBib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIGZpdEJpZ2dlc3QgICA6IGJvb2xlYW4gPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgOiBhbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJVGFiVmlld19cIik7XG5cdFx0dGhpcy5jZWxscyA9IG5ldyBBcnJheTxUYWJWaWV3Q2VsbD4oKTtcblx0fVxuXHRwdWJsaWMgYWRkVmlldyhuYW1lIDogc3RyaW5nLCBwcm9wZXJ0aWVzIDogYW55LCBjb21wb25lbnQgOiBVSUNvbXBsZXhDb21wb25lbnQpIHtcblx0XHR2YXIgY2VsbCA9IG5ldyBUYWJWaWV3Q2VsbCgpO1xuXHRcdGNlbGwucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG5cdFx0Y2VsbC5jb21wb25lbnQgPSBjb21wb25lbnQ7XG5cdFx0Y2VsbC5uYW1lID0gbmFtZTtcblx0XHR0aGlzLmNlbGxzW25hbWVdPWNlbGw7XG5cdFx0dGhpcy5hZGRDb21wb25lbnQobmFtZSxjb21wb25lbnQpO1xuXHR9XG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIGRhdGEsIGNhbGxlcikge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJldmVudE5hbWVcIjpcblx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHRVSS5JbmZvKGV2ZW50KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBjcmVhdGVDZWxscygpIDogQXJyYXk8YW55PiB7XG5cdFx0dmFyIGNlbGxBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNlbGxzKSB7XG5cdFx0XHR2YXIgY2VsbCA9IHsgYm9keSA6IHRoaXMuY2VsbHNbaXRlbV0uY29tcG9uZW50LmdldFZpZXcoKSAgfVxuXHRcdFx0Zm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5jZWxsc1tpdGVtXS5wcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdGNlbGxbcHJvcGVydHldID0gdGhpcy5jZWxsc1tpdGVtXS5wcm9wZXJ0aWVzW3Byb3BlcnR5XTtcblx0XHRcdH1cblx0XHRcdGNlbGxBcnJheS5wdXNoKGNlbGwpO1xuXHRcdH1cblx0XHRyZXR1cm4gY2VsbEFycmF5O1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCkgOiBhbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCAgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0dmlldyAgICAgIDogXCJ0YWJ2aWV3XCIsXG5cdFx0XHRtdWx0aXZpZXcgOiB7IGFuaW1hdGUgOiB0aGlzLmFuaW1hdGUsIGZpdEJpZ2dlc3QgOiB0aGlzLmZpdEJpZ2dlc3QgfSxcblx0XHRcdGNsb3NlICAgICA6IHRoaXMuY2xvc2VBYmxlLFxuXHRcdFx0dGFiYmFyICAgIDogeyBwb3B1cFdpZHRoOiAzMDAsdGFiTWluV2lkdGg6IDEyMCB9LFxuXHRcdFx0Y2VsbHMgICAgIDogdGhpcy5jcmVhdGVDZWxscygpXG5cblx0XHR9KVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbXBvbmVudCBMYWJlbCBcIik7XG5cdFx0dGhpcy5wb3B1cC5zaG93KHRoaXMpO1xuXHR9XG59IHRoaXMuVUlUYWJWaWV3ID0gVUlUYWJWaWV3O1xuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiVUlUYWJWaWV3XCIsIFVJVGFiVmlldyk7XG5cbmNsYXNzIFVJTGlzdCBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cblx0cHVibGljIHBvcHVwICAgICAgICA6IFVJUG9wdXBXaW5kb3c7XG5cdHB1YmxpYyBjb2x1bW5OYW1lICAgOiBzdHJpbmcgPSBudWxsO1xuXHRwdWJsaWMgdGFibGUgICAgICAgIDogVUlEYXRhVGFibGUgPSBudWxsO1xuXHRwdWJsaWMgZGF0YUFycmF5ICAgIDogQXJyYXk8YW55Pj1udWxsO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgOiBhbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJTGlzdF9cIik7XG5cdH1cblxuXHRwdWJsaWMgc2V0TGlzdChkYXRhIDogQXJyYXk8YW55Pikge1xuXG5cdH1cblx0cHVibGljIGxpc3RlbihldmVudCwgZGF0YSwgY2FsbGVyKSB7XG5cdFx0c3dpdGNoIChldmVudCkge1xuXHRcdFx0Y2FzZSBcIml0ZW1DbGlja1wiOiB7XG5cdFx0XHRcdHRoaXMuaXRlbUNoYW5nZShkYXRhKTtcblx0XHRcdH1cblx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHRVSS5JbmZvKGV2ZW50KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBpdGVtQ2hhbmdlKGl0ZW0gOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xuXHRcdHZhciBzdGF0dXMgPSBpdGVtLm9iamVjdEFycmF5WzBdW1wic3RhdHVzXCJdO1xuXHRcdGl0ZW0ub2JqZWN0QXJyYXlbMF1bXCJzdGF0dXNcIl0gPSAhc3RhdHVzO1xuXHRcdCg8VUlEYXRhVGFibGU+dGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkucmVmcmVzaFJvdyhpdGVtLnJvd0lEKTtcblx0XHR0aGlzLnB1Ymxpc2goXCJpdGVtQ2hhbmdlXCIsIGl0ZW0pO1xuXHR9XG5cdHB1YmxpYyBzZXQobmFtZSA6IHN0cmluZywgZGF0YUFycmF5IDogQXJyYXk8YW55Pikge1xuXHRcdHRoaXMuY29sdW1uTmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5kYXRhQXJyYXkgPSBkYXRhQXJyYXk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKSA6IGFueSB7XG5cdFx0dGhpcy50YWJsZSA9IG5ldyBVSURhdGFUYWJsZSgpO1xuXHRcdHRoaXMudGFibGUuYWRkQ29sdW1uKDAsIHsgaWQ6XCJzdGF0dXNcIiwgaGVhZGVyOlwiQWN0aXZlXCIsIHdpZHRoOjQwLCBjc3M6XCJjZW50ZXJcIiwgdHlwZSA6IFwidmFsdWVcIixcblx0XHRcdHRlbXBsYXRlOiBmdW5jdGlvbihvYmosdHlwZSx2YWx1ZSkge1xuXHRcdFx0XHRpZiAodmFsdWUpXG5cdFx0XHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X3RhYmxlX2NoZWNrYm94IHdlYml4X2ljb24gZmEtZXllJz48L3NwYW4+XCI7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfdGFibGVfY2hlY2tib3ggd2ViaXhfaWNvbiBmYS1leWUtc2xhc2gnPjwvc3Bhbj5cIjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnRhYmxlLmFkZENvbHVtbigxLCB7IGlkOlwidmFsdWVcIiwgIGhlYWRlcjp0aGlzLmNvbHVtbk5hbWUsIGZpbGxzcGFjZToxIH0pO1xuXHRcdHRoaXMudGFibGUuc2V0TGlzdCh0aGlzLmRhdGFBcnJheSk7XG5cdFx0dGhpcy5hZGRDb21wb25lbnQoXCJ0YWJsZVwiLHRoaXMudGFibGUpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgOiBcImZvcm1cIixcblx0XHRcdHJvd3MgOiBbdGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKS5nZXRWaWV3KCldXG5cdFx0fSlcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpKSB7XG5cdFx0XHQoPFVJRGF0YVRhYmxlPiB0aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpKS5zdWJzY3JpYmUoXCJvbkl0ZW1DbGlja1wiLHRoaXMsXCJpdGVtQ2xpY2tcIilcblx0XHR9XG5cdH1cblx0cHVibGljIHNob3coKSB7XG5cdFx0dGhpcy5wb3B1cCA9IG5ldyBVSVBvcHVwV2luZG93KHRoaXMuY29sdW1uTmFtZStcIiBMaXN0IFwiKTtcblx0XHR0aGlzLnBvcHVwLm1vZGFsPWZhbHNlO1xuXHRcdHRoaXMucG9wdXAuc2hvdyh0aGlzKTtcblx0fVxufSB0aGlzLlVJTGlzdCA9IFVJTGlzdDtcblxuIl19