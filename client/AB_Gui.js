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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUJfR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQUJfR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXdFO0FBUXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRXJCO0lBQUE7SUFPQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEO0lBQUE7SUF3TkEsQ0FBQztJQXZOYyw4QkFBZSxHQUE3QixjQUFrQyxDQUFDO0lBQ3JCLDJCQUFZLEdBQTFCLFVBQTJCLFFBQVksRUFBRSxRQUFRO1FBQ2hELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ2EsZ0NBQWlCLEdBQS9CLFVBQWdDLE9BQU87UUFDdEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksV0FBdUIsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsTUFBTSxHQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxjQUFj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LENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7WUFDMUYsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDRixDQUFDO0lBQ00sNEJBQUksR0FBWDtRQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBQ00sNkJBQUssR0FBWjtRQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckQsQ0FBQztRQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDRixDQUFDO0lBQ0QsNEJBQTRCO0lBQ3JCLCtCQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsYUFBYSxH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Q0FBQztJQUNGLENBQUM7SUFDTSxxQkFBSSxHQUFYO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUF6RUQsQ0FBcUIsa0JBQWtCLEdBeUV0QztBQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cclxuZGVjbGFyZSB2YXIgdG9hc3RyOmFueTtcclxuZGVjbGFyZSB2YXIgQzRmb3VyOmFueTtcclxuZGVjbGFyZSB2YXIgZmluZENsYXNzVHlwZTphbnk7XHJcbmRlY2xhcmUgdmFyIGZpbmRJRDphbnk7XHJcbmRlY2xhcmUgdmFyIEZpbmRJVDphbnk7XHJcblxyXG5kZWNsYXJlIHZhciBidXp6OmFueTtcclxuY29uc29sZS5sb2coXCJMb2FkaW5nIGd1aS50cyAuLi5cIik7XHJcbmZpbmRDbGFzc1R5cGUgPSBudWxsO1xyXG5cclxuY2xhc3MgRHJvcE1lc3NhZ2Uge1xyXG5cdHB1YmxpYyBmcm9tT2JqZWN0czpBcnJheTxhbnk+O1xyXG5cdHB1YmxpYyBmcm9tQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cdHB1YmxpYyB0b0NvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHRwdWJsaWMgdG9PYmplY3Q6YW55O1xyXG5cdHB1YmxpYyBjb250ZXh0OmFueTtcclxuXHRwdWJsaWMgZXY6YW55O1xyXG59XHJcblxyXG5jbGFzcyBVSUV2ZW50SGFuZGxlciB7XHJcblx0cHVibGljIHN0YXRpYyBPbkFmdGVyVGFiQ2xpY2soKSB7IH1cclxuXHRwdWJsaWMgc3RhdGljIEZpZWxkQ2hhbmdlZChuZXdWYWx1ZTphbnksIG9sZFZhbHVlKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50SUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCAgID0gPFVJVGV4dEZpZWxkPiAkJCh0aGVDb21wb25lbnRJRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR0aGVDb21wb25lbnQuZmllbGRDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk6RHJvcE1lc3NhZ2Uge1xyXG5cdFx0dmFyIGZyb21JRDpzdHJpbmc7XHJcblx0XHR2YXIgZnJvbUNvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHRcdHZhciB0b0NvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHRcdHZhciBhcnJheU9mT2JqZWN0cyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR2YXIgdG9PYmplY3Q7XHJcblx0XHRmcm9tSUQgICA9IGNvbnRleHRbXCJmcm9tXCJdLmNvbmZpZy5pZDtcclxuXHRcdHZhciB0b0lEID0gY29udGV4dFtcInRvXCJdLmNvbmZpZy5pZDtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29udGV4dC5zb3VyY2UubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJyYXlPZk9iamVjdHMucHVzaChjb250ZXh0LmZyb20uZ2V0SXRlbShjb250ZXh0LnNvdXJjZVtpXSkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQkKGZyb21JRCkpIGZyb21Db21wb25lbnQgPSAkJChmcm9tSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0aWYgKCQkKHRvSUQpKSB0b0NvbXBvbmVudCA9ICQkKHRvSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gbmV3IERyb3BNZXNzYWdlKCk7XHJcblx0XHRkcm9wTWVzc2FnZS5mcm9tQ29tcG9uZW50ID0gZnJvbUNvbXBvbmVudDtcclxuXHRcdGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50ICAgPSB0b0NvbXBvbmVudDtcclxuXHRcdGRyb3BNZXNzYWdlLmZyb21PYmplY3RzICAgPSBhcnJheU9mT2JqZWN0cztcclxuXHRcdGlmIChjb250ZXh0LnRhcmdldCA9PSBudWxsKVxyXG5cdFx0XHRkcm9wTWVzc2FnZS50b09iamVjdCA9IG51bGw7IGVsc2Uge1xyXG5cdFx0XHRkcm9wTWVzc2FnZS50b09iamVjdCA9ICQkKHRvSUQpLmdldEl0ZW0oY29udGV4dC50YXJnZXQucm93KTtcclxuXHRcdH1cclxuXHRcdGRyb3BNZXNzYWdlLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0ZHJvcE1lc3NhZ2UuZXYgICAgICA9IG51bGw7XHJcblx0XHRyZXR1cm4gZHJvcE1lc3NhZ2U7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25CZWZvcmVEcmFnSW4oY29udGV4dCwgZXZlbnQpIHtcclxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xyXG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyYWdJbiA9PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcmFnSW4oZHJvcE1lc3NhZ2UpOyBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgb25EcmFnT3V0KGNvbnRleHQsIGV2ZW50KSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcclxuXHRcdFVJLkluZm8oXCJPbkRyYWdPdXQgU3RhdGljXCIpXHJcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcclxuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0ID09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgb25CZWZvcmVEcm9wKGNvbnRleHQsIGV2KSB7XHJcblxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJEcm9wMihjb250ZXh0LCBldikge1xyXG5cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkFmdGVyRHJvcChjb250ZXh0LCBldmVudCkge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XHJcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcclxuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25BZnRlckRyb3AgPT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQWZ0ZXJEcm9wKGRyb3BNZXNzYWdlKTsgZWxzZSB7XHJcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uQnV0dG9uQ2xpY2soaWQ6c3RyaW5nLCBldmVudCkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudElEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdGlmICghJCQodGhlQ29tcG9uZW50SUQpKSByZXR1cm47XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJQnV0dG9uPiAkJCh0aGVDb21wb25lbnRJRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR0aGVDb21wb25lbnQub25CdXR0b25DbGljayh0aGVDb21wb25lbnQpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIE9uRHJhZ091dChjb250ZXh0LCBldmVudCkge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XHJcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcclxuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25EcmFnT3V0ID09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkRyYWdPdXQoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25CZWZvcmVEcm9wKGNvbnRleHQsIGV2ZW50KSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcclxuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xyXG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyb3AgPT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJvcChkcm9wTWVzc2FnZSk7IGVsc2Uge1xyXG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkNsaWNrKGV2OmFueSwgaWQ6c3RyaW5nKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25JdGVtRGJsQ2xpY2soaWQsZXYsbm9kZSkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIHNlbGVjdGVkT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKGlkLnJvdyk7XHJcblx0XHR2YXIgaXRlbU1lc3NhZ2UgPSBuZXcgSXRlbVNlbGVjdGVkRXZlbnQoKTtcclxuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5LnB1c2goc2VsZWN0ZWRPYmplY3QpO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uSXRlbURibENsaWNrKGl0ZW1NZXNzYWdlKSA7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgT25JdGVtQ2xpY2soaWQ6YW55LCBldjphbnksIG5vZGU6YW55KSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgc2VsZWN0ZWRPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0oaWQucm93KTtcclxuXHRcdHZhciBpdGVtTWVzc2FnZSA9IG5ldyBJdGVtU2VsZWN0ZWRFdmVudCgpO1xyXG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkucHVzaChzZWxlY3RlZE9iamVjdCk7XHJcblx0XHRpdGVtTWVzc2FnZS5yb3dJRCA9IGlkLnJvdztcclxuXHRcdHRoZUNvbXBvbmVudC5vbkl0ZW1DbGljayhpdGVtTWVzc2FnZSkgO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIG9uU2VsZWN0Q2hhbmdlKCkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIHJvd2lkID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKHRydWUpO1xyXG5cdFx0dmFyIHNlbGVjdGVkT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKHJvd2lkKTtcclxuXHRcdHRoZUNvbXBvbmVudC5vblNlbGVjdENoYW5nZShyb3dpZCwgc2VsZWN0ZWRPYmplY3QpXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgb25BZnRlckVkaXRTdG9wKHN0YXRlLCBlZGl0b3IsIGlnbm9yZVVwZGF0ZSkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIHRoZUNvbHVtbiAgICA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XHJcblx0XHR0aGVDb2x1bW4uY29sdW1uTmFtZSA9IGVkaXRvci5jb2x1bW47XHJcblx0XHR0aGVDb2x1bW4ub2xkVmFsdWUgICA9IHN0YXRlLm9sZDtcclxuXHRcdHRoZUNvbHVtbi5uZXdWYWx1ZSAgID0gc3RhdGUudmFsdWU7XHJcblx0XHR0aGVDb2x1bW4ucm93T2JqZWN0ICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShlZGl0b3Iucm93KTtcclxuXHRcdHRoZUNvbHVtbi5lZGl0b3IgICAgID0gZWRpdG9yO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uU3RvcEVkaXQodGhlQ29sdW1uKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBvbkJlZm9yZUVkaXRTdGFydFRhYmxlKGlkIDogYW55KSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgcm93ID0gaWQucm93O1xyXG5cdFx0dmFyIGNvbHVtbiA9IGlkLmNvbHVtbjtcclxuXHRcdHZhciByb3dJdGVtID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZCkuZ2V0SXRlbShyb3cpO1xyXG5cdFx0dmFyIHRoZUNvbHVtbiAgICA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XHJcblxyXG5cdFx0dGhlQ29sdW1uLmNvbHVtbk5hbWUgPSBjb2x1bW47XHJcblx0XHR0aGVDb2x1bW4ub2xkVmFsdWUgPSBudWxsO1xyXG5cdFx0dGhlQ29sdW1uLm5ld1ZhbHVlID0gbnVsbDtcclxuXHRcdHRoZUNvbHVtbi5yb3dPYmplY3QgPSByb3dJdGVtO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uQmVmb3JlRWRpdFN0YXJ0KHRoZUNvbHVtbik7XHJcblxyXG5cdFx0aWYgKHJvd0l0ZW1bXCJiZWZvcmVFZGl0U3RhcnRSZXR1cm5cIl0hPW51bGwpIHJldHVybiByb3dJdGVtW1wiYmVmb3JlRWRpdFN0YXJ0UmV0dXJuXCJdO1xyXG5cclxuXHRcdHJldHVybiAhcm93SXRlbVtjb2x1bW4rXCJSZWFkT25seVwiXTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkNoYW5nZShuZXd2LCBvbGR2KSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XHJcblx0XHR0aGVDb21wb25lbnQub25DaGFuZ2UobmV3diwgb2xkdik7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgTWVudUhhbmRsZXIoaWQsIGNvbnRleHQpIHtcclxuXHRcdHZhciB0aGVJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJQ29udGV4dE1lbnU+ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdHZhciBqdW1wSXRlbSA9IHRoZUNvbXBvbmVudC5nZXRNZW51SXRlbShpZCk7XHJcblx0XHR2YXIgdGhlT2JqZWN0ID0gdGhlQ29tcG9uZW50Lm93bmluZ0NvbXBvbmVudC5nZXRTZWxlY3RlZE9iamVjdCgpO1xyXG5cdFx0aWYgKCFqdW1wSXRlbS5jYWxsYmFjaykgcmV0dXJuO1xyXG5cdFx0anVtcEl0ZW0uY2FsbGJhY2soaWQsIHRoZUNvbXBvbmVudCwgdGhlT2JqZWN0KTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkFmdGVyU2VsZWN0KGlkOmFueSkge1xyXG5cdFx0dmFyIHRoZUlEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdGlmICghJCQodGhlSUQpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGVJRClbXCJjb21wb25lbnRcIl07XHJcblx0XHR2YXIgdGhlTm9kZSA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpLmdldEl0ZW0oaWQucm93KTtcclxuXHRcdGlmICghdGhlTm9kZSkge1xyXG5cdFx0XHRVSS5NZXNzYWdlKFwiRXJyb3IgRXhwZWN0ZWQgVE8gRmluZCBOb2RlIGdvdCBOdWxsIHdpdGggSUQgXCIgKyBpZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBJZEFycmF5ICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR2YXIgb2JqZWN0QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0dmFyIHJvd0FycmF5ICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBuZXdJdGVtU2VsZWN0ZWQgPSBuZXcgSXRlbVNlbGVjdGVkRXZlbnQoKTtcclxuXHRcdElkQXJyYXlbMF0gICAgICAgICAgPSBpZC5yb3c7XHJcblx0XHRpZiAodGhlTm9kZS5vcmlnaW5hbE9iamVjdClcclxuXHRcdFx0b2JqZWN0QXJyYXlbMF0gPSB0aGVOb2RlLm9yaWdpbmFsT2JqZWN0LmNsb25lKCk7IGVsc2VcclxuXHRcdFx0b2JqZWN0QXJyYXlbMF0gPSBudWxsO1xyXG5cdFx0cm93QXJyYXlbMF0gICAgICAgICAgICAgICAgICAgPSB0aGVOb2RlO1xyXG5cdFx0bmV3SXRlbVNlbGVjdGVkLmlkQXJyYXkgICAgICAgPSBJZEFycmF5O1xyXG5cdFx0bmV3SXRlbVNlbGVjdGVkLm9iamVjdEFycmF5ICAgPSBvYmplY3RBcnJheTtcclxuXHRcdG5ld0l0ZW1TZWxlY3RlZC5pdGVtc1NlbGVjdGVkID0gb2JqZWN0QXJyYXkubGVuZ3RoO1xyXG5cdFx0bmV3SXRlbVNlbGVjdGVkLnJvd0FycmF5ICAgICAgPSByb3dBcnJheTtcclxuXHRcdG5ld0l0ZW1TZWxlY3RlZC50aGVDb21wb25lbnQgID0gdGhlQ29tcG9uZW50O1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uQWZ0ZXJTZWxlY3QobmV3SXRlbVNlbGVjdGVkKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBIYW5kbGVGaWVsZEVudHJ5KHN0YXRlLCBlZGl0b3IsIGlnbm9yZVVwZGF0ZSkge1xyXG5cdFx0dmFyIHRoZUV4cGxvcmVyID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZCkuZXhwbG9yZXI7XHJcblx0XHR2YXIgbmV3VGV4dCA9IHN0YXRlLnZhbHVlO1xyXG5cdFx0dmFyIHJvd0lEICAgPSBlZGl0b3Iucm93O1xyXG5cdFx0dmFyIHRoZU5vZGUgPSAkJCh0aGVFeHBsb3Jlci5jb21wb25lbnRJRCkuZ2V0SXRlbShyb3dJRCk7XHJcblx0XHR2YXIgdGhlUHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhlTm9kZS5jbGFzc1R5cGUpO1xyXG5cdFx0dGhlUHJveHkudXBkYXRlTmFtZSh0aGVOb2RlLl9pZCwgbmV3VGV4dCk7XHJcblx0XHRVSS5NZXNzYWdlKFwiUmVjb3JkIFVwZGF0ZWRcIik7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgSXNGaWVsZEVkaXRhYmxlKGlkKTpib29sZWFuIHtcclxuXHRcdHZhciB0aGVJRCAgICAgICA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XHJcblx0XHR2YXIgdGhlRXhwbG9yZXIgPSAkJCh0aGVJRClbXCJleHBsb3JlclwiXTtcclxuXHRcdHZhciByb3dJdGVtICAgICA9ICQkKHRoZUV4cGxvcmVyLmdldENvbXBvbmVudElEKCkpLmdldEl0ZW0oaWQpO1xyXG5cdFx0aWYgKHJvd0l0ZW0uY2xhc3NUeXBlLmluZGV4T2YoXCJSb290XCIpID09IC0xKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIFZhbGlkYXRlRmllbGRFbnRyeShyb3csIHZhbHVlOnN0cmluZykge1xyXG5cdFx0dmFyIHRoZUlEICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdHZhciB0aGVFeHBsb3JlciA9ICQkKHRoZUlEKS5leHBsb3JlcjtcclxuXHRcdHZhciByb3dJdGVtID0gJCQodGhlRXhwbG9yZXIuZ2V0Q29tcG9uZW50SUQoKSkuZ2V0SXRlbShyb3cuaWQpO1xyXG5cdFx0QXBwTG9nLmluZm8oXCJpbmZvXCIsIFwiQmVmb3JlIEVkaXQgRXZlbnRcIik7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBQcm9jZXNzT25EZXN0cnVjdCh0aGVDb21wb25lbnQ6VUlDb21wb25lbnQpIHtcclxuXHRcdFVJLkRlYnVnKFwib24gRGVzdHJ1Y3QgQ2FsbGVkXCIpO1xyXG5cdFx0dGhlQ29tcG9uZW50Lm9uRGVzdHJ1Y3QoKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBQcm9jZXNzVGFiQ2hhbmdlZCgpIHtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBPbkRyb3BFdmVudChTb3VyY2UsIHRhcmdldCwgZXZlbnQpIHtcclxuXHRcdC8vIFVJLkluZm8oXCJEcm9wIEV2ZW50XCIpO1xyXG5cdFx0Y29uc29sZS5sb2coXCJPbiBEcm9wIEV2ZW50XCIpO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUV2ZW50SGFuZGxlciA9IFVJRXZlbnRIYW5kbGVyO1xyXG5cclxuZW51bSBTb3VuZHMgeyBQb3B1cCwgU2hhcGVEcm9wLCBTaGFwZURyYWdJbiwgU2hhcGVEcmFnT3V0LCBCbG9wLCBPcGVuRGlhZ3JhbSwgU2F2ZURpYWdyYW0sIENsb3NlRGlhZ3JhbSwgU2hhcGVPblNoYXBlRHJvcCwgRHJhd0xpbmssIEVycm9yIH10aGlzLlNvdW5kcyA9IFNvdW5kcztcclxuXHJcbmNsYXNzIFVJIGV4dGVuZHMgQzRPYmplY3Qge1xyXG5cdHB1YmxpYyBzdGF0aWMgUGxheVNvdW5kKHNvdW5kOlNvdW5kcyA9IFNvdW5kcy5CbG9wKSB7XHJcblx0XHR2YXIgcztcclxuXHRcdHN3aXRjaCAoc291bmQpIHtcclxuXHRcdFx0Y2FzZSBTb3VuZHMuUG9wdXA6XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9DbGlja09mZi5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLkNsb3NlRGlhZ3JhbTpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Rvb3IgQ2xvc2UubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZURyb3A6XHJcblx0XHRcdGNhc2UgU291bmRzLk9wZW5EaWFncmFtOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQmxvcC5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLkJsb3A6XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9CbG9wLm1wM1wiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBTb3VuZHMuRXJyb3I6XHJcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9FcnJvcjEubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZU9uU2hhcGVEcm9wOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvTWV0YWxDbGljazEubXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFNvdW5kcy5TYXZlRGlhZ3JhbTpcclxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Ryb3AgRm9yay5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLkRyYXdMaW5rOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvUG9wQ29yay5tcDNcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlRHJhZ0luOlxyXG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZURyYWdPdXQgOlxyXG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQ2xpY2subXAzXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0cy5wbGF5KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgRGVidWcodGV4dDpzdHJpbmcpIHtcclxuXHRcdGlmICh0cnVlKVxyXG5cdFx0XHRVSS5NZXNzYWdlKHRleHQpXHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgTWVzc2FnZSh0ZXh0OnN0cmluZykge1xyXG5cdFx0VUkuSW5mbyh0ZXh0KTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBJbmZvKHRleHQ6c3RyaW5nKSB7XHJcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcclxuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxyXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXHJcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXHJcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcclxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxyXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxyXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcclxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxyXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXHJcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcclxuXHRcdH1cclxuXHRcdHRvYXN0cltcImluZm9cIl0odGV4dClcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBXYXJuaW5nKHRleHQ6c3RyaW5nKSB7XHJcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcclxuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxyXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXHJcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXHJcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcclxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxyXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxyXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcclxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxyXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXHJcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcclxuXHRcdH1cclxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuRXJyb3IpO1xyXG5cdFx0dG9hc3RyW1wid2FybmluZ1wiXSh0ZXh0KVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIFN1Y2Nlc3ModGV4dDpzdHJpbmcpIHtcclxuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xyXG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXHJcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcclxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcclxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxyXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXHJcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXHJcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXHJcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxyXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXHJcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcclxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxyXG5cdFx0fVxyXG5cdFx0dG9hc3RyW1wic3VjY2Vzc1wiXSh0ZXh0KVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEVycm9yKHRleHQ6c3RyaW5nKSB7XHJcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcclxuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcclxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxyXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXHJcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXHJcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcclxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxyXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxyXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxyXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcclxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxyXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXHJcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcclxuXHRcdH1cclxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuRXJyb3IpO1xyXG5cdFx0dG9hc3RyW1wiZXJyb3JcIl0odGV4dClcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBFeHBvcnRUb0V4Y2VsKGNvbXBvbmVudElEOnN0cmluZykge1xyXG5cdFx0JCQoY29tcG9uZW50SUQpLmV4cG9ydFRvRXhjZWwoKTtcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBBbGVydChzdHJpbmcpIHt3ZWJpeC5hbGVydChzdHJpbmcpO31cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0ICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG59dGhpcy5VSSA9IFVJO1xyXG5cclxuY2xhc3MgVUlDb21wb25lbnQgZXh0ZW5kcyBVSSB7XHJcblxyXG5cdHByb3RlY3RlZCBvdmVybGF5TWl4aW46Ym9vbGVhbiAgICAgICAgICA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnRWYWx1ZTpzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGNvbXBvbmVudElEOnN0cmluZztcclxuXHRwcm90ZWN0ZWQgY29tcG9uZW50TGFiZWw6c3RyaW5nO1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnRWaWV3OmFueTtcclxuXHRwcm90ZWN0ZWQgY29tcG9uZW50Q2hhbmdlQ2FsbGJhY2s6YW55O1xyXG5cdHByb3RlY3RlZCBvd25pbmdDb21wb25lbnQ6VUlDb21wb25lbnQ7XHJcblx0cHJvdGVjdGVkIG9yZGVyOm51bWJlciAgICAgICAgICAgICAgICAgID0gMDtcclxuXHRwcm90ZWN0ZWQgZXZlbnRzRGVmaW5lZDpib29sZWFuICAgICAgICAgPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgdHJhY2tpbmdPYmplY3RDaGFuZ2VzOmJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlICAgIF91aUNsYXNzVHlwZTpDbGFzc1R5cGU7XHJcblx0cHJvdGVjdGVkIGlkUHJlZml4ICAgICAgICAgICAgICAgICAgICAgID0gXCJVSUNvbXBvbmVudF9cIjtcclxuXHRwcml2YXRlICAgICB0aGVPYmplY3Q6YW55O1xyXG5cdHB1YmxpYyAgICAgIHRoZVRlc3QgICAgICAgICAgICAgICAgICAgICA9IG5ldyBDNE9iamVjdCgpO1xyXG5cdHByb3RlY3RlZCBjb21wb25lbnREYXRhOmFueTtcclxuXHRwcml2YXRlIHJlbGF0aW9uc2hpcE9iamVjdDtcclxuXHRwcml2YXRlIF91c2VyRGF0YTphbnk7XHJcblx0cHJvdGVjdGVkIHByb3BlcnRpZXMgICAgICAgICAgICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHJcblx0Z2V0IHVzZXJEYXRhKCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLl91c2VyRGF0YTtcclxuXHR9XHJcblx0c2V0IHVzZXJEYXRhKHZhbHVlOmFueSkge1xyXG5cdFx0dGhpcy5fdXNlckRhdGEgPSB2YWx1ZTtcclxuXHR9XHJcblx0Z2V0IHVpQ2xhc3NUeXBlKCk6Q2xhc3NUeXBlIHtcclxuXHRcdHJldHVybiB0aGlzLl91aUNsYXNzVHlwZTtcclxuXHR9XHJcblx0c2V0IHVpQ2xhc3NUeXBlKHZhbHVlOkNsYXNzVHlwZSkge1xyXG5cdFx0dGhpcy5fdWlDbGFzc1R5cGUgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzaG93T3ZlcmxheSgpIHtcclxuXHRcdGlmICghdGhpcy5vdmVybGF5TWl4aW4pXHJcblx0XHRcdHdlYml4LmV4dGVuZCgkJCh0aGlzLmNvbXBvbmVudElEKSwgd2ViaXguT3ZlcmxheUJveCk7XHJcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zaG93T3ZlcmxheSgpO1xyXG5cdFx0dGhpcy5vdmVybGF5TWl4aW4gPSB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgaGlkZU92ZXJsYXkoKSB7XHJcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5oaWRlT3ZlcmxheSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBUcmVlSWNvbihvYmo6YW55KSB7XHJcblx0XHRpZiAob2JqLiRsZXZlbCA+IDEwMDEpXHJcblx0XHRcdHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIGZhLWZvbGRlci1vcGVuJz48L3NwYW4+XCI7XHJcblx0XHRpZiAob2JqLiRsZXZlbCA8IDEwMDApIHtcclxuXHRcdFx0cmV0dXJuIEZhY3RvcnkuR2V0Q2xhc3NJY29uKG9iai5fY2xhc3NUeXBlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIGZhLWZpbG0nPjwvc3Bhbj5cIjtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuY29tcG9uZW50SUQgPSB0aGlzLmlkUHJlZml4ICsgd2ViaXgudWlkKCk7XHJcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMocHJvcGVydGllcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXR0YWNoRXZlbnQoaWQ6c3RyaW5nLCBldmVudCwgY2FsbGJhY2spIHtcclxuXHRcdGlmICgkJChpZCkpIHtcclxuXHRcdFx0JCQoaWQpLmF0dGFjaEV2ZW50KGV2ZW50LCBjYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRSZWxhdGlvbnNoaXBPYmplY3QodGhlT2JqZWN0OmFueSkge1xyXG5cdFx0dGhpcy5yZWxhdGlvbnNoaXBPYmplY3QgPSB0aGVPYmplY3Q7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRSZWxhdGlvbnNoaXBPYmplY3QoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpb25zaGlwT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgYmxhbmtWYWx1ZSgpIHt9XHJcblx0cHVibGljIGNyZWF0ZVZpZXcodmlld09wdGlvbnM6YW55KTphbnkge1xyXG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcImRyYWdcIiwgdHJ1ZSk7XHJcblx0XHR0aGlzLm1lcmdlUHJvcGVydHlTZXQodmlld09wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIHZpZXdPcHRpb25zO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0SUQocHJlZml4OnN0cmluZykge1xyXG5cdFx0dGhpcy5pZFByZWZpeCAgICA9IHByZWZpeDtcclxuXHRcdHRoaXMuY29tcG9uZW50SUQgPSB0aGlzLmlkUHJlZml4ICsgd2ViaXgudWlkKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDYWxsYmFjayhjYWxsYmFjazphbnkpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50Q2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0cHVibGljIGdldENhbGxiYWNrKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Q2hhbmdlQ2FsbGJhY2s7XHJcblx0fVxyXG5cdHB1YmxpYyBpc1ZhbGlkKCk6Ym9vbGVhbiB7XHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0cmV0dXJuICQkKHRoaXMuY29tcG9uZW50SUQpLnZhbGlkYXRlKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXREYXRhKHRoZURhdGE6YW55KSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudERhdGEgPSB0aGVEYXRhO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0RGF0YSgpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnREYXRhO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0TGFiZWwodGhlTGFiZWwpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50TGFiZWwgPSB0aGVMYWJlbDtcclxuXHR9XHJcblx0cHVibGljIGdldExhYmVsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50TGFiZWw7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRWYWx1ZSh0aGVWYWx1ZTphbnkpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmFsdWUgPSB0aGVWYWx1ZTtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHR3ZWJpeC51aSh0aGlzLmdldFZhbHVlLCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XHJcblx0XHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0T3duaW5nQ29tcG9uZW50KGNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xyXG5cdFx0dGhpcy5vd25pbmdDb21wb25lbnQgPSBjb21wb25lbnQ7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRPd25pbmdDb21wb25lbnQoKTpVSUNvbXBvbmVudCB7XHJcblx0XHRyZXR1cm4gdGhpcy5vd25pbmdDb21wb25lbnQ7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRDb21wb25lbnRJRCgpOnN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRJRDtcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudElEKGlkOnN0cmluZykge1xyXG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IGlkO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmFsdWUoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmFsdWU7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRDb21wb25lbnRWaWV3KCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnRWaWV3KHRoZVZpZXc6YW55KSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGVWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0U2VsZWN0ZWRPYmplY3QoKTphbnkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkJlZm9yZURyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSkge1xyXG5cdFx0d2ViaXguYWxlcnQoXCJTb3JyeSBEcm9wcGluZyBIZXJlIE5vdCBBbGxvd2VkIFlldFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIG9uQmVmb3JlRHJhZ0luKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIG9uQWZ0ZXJEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmFueSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkRyYWdPdXQobWVzc2FnZTpEcm9wTWVzc2FnZSk6YW55IHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIHZhbGlkYXRlRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKTphbnkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgb25TZWxlY3RDaGFuZ2UoaXRlbU1lc3NhZ2U6SXRlbVNlbGVjdGVkRXZlbnQpIHtcclxuXHRcdHRoaXMucHVibGlzaChcIm9uU2VsZWN0Q2hhbmdlXCIsIGl0ZW1NZXNzYWdlKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cHVibGljIG9uSXRlbURibENsaWNrKGl0ZW1NZXNzYWdlIDogSXRlbVNlbGVjdGVkRXZlbnQpIHtcclxuXHRcdHRoaXMucHVibGlzaChcIm9uSXRlbURibENsaWNrXCIsaXRlbU1lc3NhZ2UpO1xyXG5cdH1cclxuXHRwdWJsaWMgb25JdGVtQ2xpY2soaXRlbU1lc3NhZ2UgOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwib25JdGVtQ2xpY2tcIixpdGVtTWVzc2FnZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRPYmplY3QoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGhlT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0T2JqZWN0KHRoZU9iamVjdDphbnkpIHtcclxuXHRcdHRoaXMudGhlT2JqZWN0ID0gdGhlT2JqZWN0O1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0RHJhZ2dhYmxlKGZsYWc6Ym9vbGVhbiA9IHRydWUpIHtcclxuXHRcdHZhciBodG1sVmlldyA9ICQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXc7XHJcblx0XHR3ZWJpeC5EcmFnQ29udHJvbC5hZGREcm9wKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSksIFVJRXZlbnRIYW5kbGVyLk9uRHJvcEV2ZW50KTtcclxuXHR9XHJcblx0cHVibGljIHNldFByb3BlcnR5KG5hbWUsIHZhbHVlKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSBcImxhYmVsXCIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5zZXRMYWJlbCh2YWx1ZSk7XHJcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcInZhbHVlXCIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcImRhdGFcIiA6XHJcblx0XHRcdFx0dGhpcy5zZXREYXRhKHZhbHVlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcImNhbGxiYWNrXCIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5zZXRDYWxsYmFjayh2YWx1ZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGFkZFByb3BlcnRpZXMocHJvcGVydHlTZXQ6YW55KSB7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHByb3BlcnR5U2V0KSB7XHJcblx0XHRcdHRoaXMuc2V0UHJvcGVydHkoaXRlbSwgcHJvcGVydHlTZXRbaXRlbV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgZ2V0UHJvcGVydHkobmFtZSk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLnByb3BlcnRpZXNbbmFtZV07XHJcblx0fVxyXG5cdHB1YmxpYyBtZXJnZVByb3BlcnR5U2V0KHZpZXc6YW55KSB7XHJcblx0XHR2YXIgaW5kZXggPSAwO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcclxuXHRcdFx0dmlld1tpdGVtXSA9IHRoaXMucHJvcGVydGllc1tpdGVtXTtcclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdH1cclxuXHRcdHJldHVybiB2aWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0UHJvcGVydHlTZXQoKTphbnkge1xyXG5cdFx0dmFyIGluZGV4ICAgPSAwO1xyXG5cdFx0dmFyIHJlc3VsdHMgPSB7fTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XHJcblx0XHRcdHJlc3VsdHNbaXRlbV0gPSB0aGlzLnByb3BlcnRpZXNbaXRlbV07XHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHR9XHJcblxyXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIHJlZnJlc2goKSB7fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0XHR0aGlzLmV2ZW50c0RlZmluZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLmRyYWcgICAgICAgICA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBkZXN0cm95VmlldygpIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkgJCQodGhpcy5jb21wb25lbnRJRCkuZGVzdHJ1Y3RvcigpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVzdHJveU9iamVjdCgpIHtcclxuXHR9XHJcblx0cHVibGljIG9uRGVzdHJ1Y3QoKSB7XHJcblx0XHR0aGlzLmRlc3Ryb3lPYmplY3QoKTtcclxuXHR9XHJcblx0cHVibGljIGRlc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHQvL2VuZHJlZ2lvblxyXG59IHRoaXMuVUlDb21wb25lbnQgPSBVSUNvbXBvbmVudDtcclxuXHJcbmNsYXNzIFVJQ29udGV4dE1lbnUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblx0cHVibGljIGp1bXBJdGVtQXJyYXk6QXJyYXk8VUlKdW1wSXRlbT47XHJcblx0cHVibGljIG93bmluZ0NvbXBvbmVudDpVSUNvbXBvbmVudDtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5ID0gbmV3IEFycmF5PFVJSnVtcEl0ZW0+KCk7XHJcblx0XHR0aGlzLnNldElEKFwidWlDb250ZXh0TWVudV9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkSXRlbShsYWJlbCwgY2FsbGJhY2spIHtcclxuXHRcdHZhciBuZXdJdGVtICAgICAgPSBuZXcgVUlKdW1wSXRlbSgpO1xyXG5cdFx0bmV3SXRlbS5pZCAgICAgICA9IFwibWVudUl0ZW1fXCIgKyB3ZWJpeC51aWQoKTtcclxuXHRcdG5ld0l0ZW0ubGFiZWwgICAgPSBsYWJlbDtcclxuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHRoaXMuanVtcEl0ZW1BcnJheVtuZXdJdGVtLmlkXSA9IG5ld0l0ZW07XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRTZXBlcmF0b3IoKSB7XHJcblx0XHR2YXIgbmV3SXRlbSAgICAgID0gbmV3IFVJSnVtcEl0ZW0oKTtcclxuXHRcdG5ld0l0ZW0uaWQgICAgICAgPSBcImp1bXBJdGVtX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHRuZXdJdGVtLmxhYmVsICAgID0gXCJcIjtcclxuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcclxuXHR9XHJcblx0cHVibGljIGdldE1lbnVJdGVtKGxhYmVsOnN0cmluZyk6VUlKdW1wSXRlbSB7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuanVtcEl0ZW1BcnJheSkge1xyXG5cdFx0XHRpZiAodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmxhYmVsID09IGxhYmVsKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudCBNZXRob2RzXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dmFyIG1lbnVBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuanVtcEl0ZW1BcnJheSkge1xyXG5cdFx0XHR2YXIgbWVudUl0ZW0gPSB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV07XHJcblx0XHRcdGlmIChtZW51SXRlbS5sYWJlbCA9PSBcIlwiKSB7XHJcblx0XHRcdFx0bWVudUFycmF5LnB1c2goeyR0ZW1wbGF0ZTogXCJTZXBhcmF0b3JcIn0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1lbnVBcnJheS5wdXNoKG1lbnVJdGVtLmxhYmVsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0dmlldzogXCJjb250ZXh0bWVudVwiLCBpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLCBkYXRhOiBtZW51QXJyYXlcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmdldFZpZXcoKTtcclxuXHRcdGlmICghJCQodGhpcy5jb21wb25lbnRJRCkpXHJcblx0XHRcdHdlYml4LnVpKHRoaXMuY29tcG9uZW50VmlldykuYXR0YWNoVG8oJCQodGhpcy5nZXRPd25pbmdDb21wb25lbnQoKS5nZXRDb21wb25lbnRJRCgpKSk7XHJcblx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpW1wiY29tcG9uZW50XCJdID0gdGhpcztcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5nZXRDb21wb25lbnRJRCgpLCBcImNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk1lbnVIYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdC8vZW5kcmVnaW9uXHJcbn0gdGhpcy5VSUNvbnRleHRNZW51ID0gVUlDb250ZXh0TWVudTtcclxuXHJcbmVudW0gRmllbGRGb3JtYXQgeyBHRU5FUkFMLCBDVVJSRU5DWSwgTlVNQkVSLCBQRVJDRU5UIH10aGlzLkZpZWxkRm9ybWF0ID0gRmllbGRGb3JtYXQ7XHJcblxyXG5jbGFzcyBVSUZpZWxkIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHRwcml2YXRlIGxpc3RUeXBlOnN0cmluZztcclxuXHRwcml2YXRlIHJlbGF0aW9uc2hpcFBvaW50ZXI6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCB1cGRhdGVGaWVsZDpzdHJpbmc7XHJcblx0cHVibGljIG1heExlbmd0aDpudW1iZXI7XHJcblx0cHVibGljIGZpZWxkRm9ybWF0OkZpZWxkRm9ybWF0ICAgICAgPSBGaWVsZEZvcm1hdC5HRU5FUkFMO1xyXG5cdHB1YmxpYyBmb3JtYXRWaWV3OmFueTtcclxuXHRwdWJsaWMgZmllbGRWYWx1ZTphbnk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJ1aWZpZWxkX1wiKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRQdWJsaWNhdGlvbihcImZpZWxkQ2hhbmdlZFwiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBmaWVsZENoYW5nZWQobmV3VmFsdWU6YW55LCBvbGRWYWx1ZSkge1xyXG5cdFx0dmFyIHRoZVBhcmVudCA9IHRoaXMuZ2V0RGF0YSgpO1xyXG5cdFx0aWYgKHRoaXMuZ2V0Q2FsbGJhY2soKSkge1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSB0aGlzLmdldENhbGxiYWNrKCk7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayh0aGlzLCB0aGVQYXJlbnQsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnZhbHVlQ2hhbmdlZCh0aGVQYXJlbnQsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJmaWVsZENoYW5nZWRcIiwge25ld1ZhbHVlOiBuZXdWYWx1ZSwgb2xkVmFsdWU6IG9sZFZhbHVlfSlcclxuXHR9XHJcblx0cHVibGljIHNldENsYXNzVHlwZShjbGFzc1R5cGU6Q2xhc3NUeXBlKSB7XHJcblx0XHR0aGlzLmxpc3RUeXBlID0gPHN0cmluZz4gY2xhc3NUeXBlO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0Q2xhc3NUeXBlKCk6c3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLmxpc3RUeXBlO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0VXBkYXRlRmllbGQodGhlRmllbGROYW1lOnN0cmluZykge1xyXG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHRoZUZpZWxkTmFtZTtcclxuXHR9XHJcblx0cHVibGljIGdldFVwZGF0ZUZpZWxkKCk6c3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLnVwZGF0ZUZpZWxkO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0RmllbGRGb3JtYXQodGhlRm9ybWF0OkZpZWxkRm9ybWF0KSB7XHJcblx0XHR0aGlzLmZpZWxkRm9ybWF0ID0gdGhlRm9ybWF0O1xyXG5cdFx0c3dpdGNoICh0aGVGb3JtYXQpIHtcclxuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5DVVJSRU5DWSA6XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmZvcm1hdFZpZXcgPSB3ZWJpeC5OdW1iZXIubnVtVG9TdHIoe1xyXG5cdFx0XHRcdFx0Z3JvdXBEZWxpbWl0ZXI6IFwiLFwiLCBncm91cGVTaXplOiAzLCBkZWNpbWFsRGVsaW1pdGVyOiBcIi5cIiwgZGVjaW1hbFNpemU6IDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0LlBFUkNFTlQgOlxyXG5cdFx0XHR7XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIEZpZWxkRm9ybWF0LkdFTkVSQUwgOlxyXG5cdFx0XHR7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5OVU1CRVIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRWYWx1ZSh2YWx1ZTphbnkpIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5ibG9ja0V2ZW50KCk7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkudW5ibG9ja0V2ZW50KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmZpZWxkVmFsdWUgPSB2YWx1ZTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5jb21wb25lbnRJRCwgXCJvbkNoYW5nZVwiLCBVSUV2ZW50SGFuZGxlci5GaWVsZENoYW5nZWQpO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmFsdWUoKTphbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZmllbGRWYWx1ZTtcclxuXHR9XHJcblx0cHVibGljIGJsYW5rVmFsdWUoKSB7XHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUoXCJcIik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmZpZWxkVmFsdWUgPSBcIlwiO1xyXG5cdH1cclxuXHRwdWJsaWMgdmFsdWVDaGFuZ2VkKHBhcmVudENvbXBvbmVudDpVSUNvbXBvbmVudCwgbmV3VmFsdWU6YW55LCBvbGRWYWx1ZTphbnkpIHtcclxuXHRcdGlmICghdGhpcy5pc1ZhbGlkKCkpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGlmICghdGhpcy51cGRhdGVGaWVsZCkgcmV0dXJuO1xyXG5cdFx0dmFyIHRoZU9iamVjdCA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShwYXJlbnRDb21wb25lbnQuZ2V0T2JqZWN0KCkuY2xhc3NUeXBlKTtcclxuXHRcdHRoZU9iamVjdC51cGRhdGVBdHRyaWJ1dGUocGFyZW50Q29tcG9uZW50LmdldE9iamVjdCgpLl9pZCwgdGhpcy51cGRhdGVGaWVsZCwgbmV3VmFsdWUpO1xyXG5cdFx0VUkuTWVzc2FnZShcIlJlY29yZCBVcGRhdGVkXCIpO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUZpZWxkID0gVUlGaWVsZDtcclxuXHJcbmNsYXNzIFVJQ291bnRlckZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJQ291bnRlckZpZWxkX1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBmaWVsZENoYW5nZWQobmV3diwgb2xkdikge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwiZmllbGRDaGFuZ2VkXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHZpZXc6IFwiY291bnRlclwiXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxufXRoaXMuVUlDb3VudGVyRmllbGQgPSBVSUNvdW50ZXJGaWVsZDtcclxuXHJcbmNsYXNzIFVJTGFiZWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cdHB1YmxpYyBhbGlnbm1lbnQ6c3RyaW5nID0gXCJjZW50ZXJcIjtcclxuXHRwdWJsaWMgbGFiZWxXaWR0aDpudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUxhYmVsX1wiKTtcclxuXHR9XHJcblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIGFsaWdubWVudCA9IFwiY2VudGVyXCIsIGxhYmVsV2lkdGggPSAxMDApIHtcclxuXHRcdHRoaXMuYWRkUHJvcGVydGllcyh7bGFiZWw6IGxhYmVsLCBhbGlnbm1lbnQ6IGFsaWdubWVudCwgbGFiZWxXaWR0aDogbGFiZWxXaWR0aH0pO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJsYWJlbFwiXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJTGFiZWwgPSBVSUxhYmVsO1xyXG5cclxuY2xhc3MgVUlEYXRlRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcInVpRGF0ZUZpZWxkX1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICA6IFwiZGF0ZXBpY2tlclwiLFxyXG5cdFx0XHRuYW1lICAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdGxhYmVsV2lkdGg6IDEwMCxcclxuXHRcdFx0dGltZXBpY2tlcjogZmFsc2VcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuZm9ybWF0Vmlldykge1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudFZpZXdbXCJmb3JtYXRcIl0gPSB0aGlzLmZvcm1hdFZpZXc7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluRXZlbnRzKCkge1xyXG5cclxuXHR9XHJcblxyXG59IHRoaXMuVUlEYXRlRmllbGQgPSBVSURhdGVGaWVsZDtcclxuXHJcbmNsYXNzIFVJU2xpZGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlTbGlkZXJGaWVsZFwiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCwgbWluVmFsdWU6bnVtYmVyID0gMCwgbWF4VmFsdWU6bnVtYmVyID0gMSwgc3RlcDpudW1iZXIgPSAuMSkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHVwZGF0ZUZpZWxkO1xyXG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcIm1pblwiLCBtaW5WYWx1ZSk7XHJcblx0XHR0aGlzLnNldFByb3BlcnR5KFwibWF4XCIsIG1heFZhbHVlKTtcclxuXHRcdHRoaXMuc2V0UHJvcGVydHkoXCJzdGVwXCIsIHN0ZXApO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0bmFtZSA6IHRoaXMuZ2V0TGFiZWwoKSxcclxuXHRcdFx0dmlldyA6IFwic2xpZGVyXCIsXHJcblx0XHRcdGxhYmVsOiB0aGlzLmdldExhYmVsKCksXHJcblx0XHRcdHZhbHVlOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHRcdHRpdGxlOiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRcdFx0cmV0dXJuIHdlYml4LmkxOG4ubnVtYmVyRm9ybWF0KG9iai52YWx1ZSAqIDEwMCkgKyBcIiVcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XHJcblxyXG59IHRoaXMuVUlTbGlkZXJGaWVsZCA9IFVJU2xpZGVyRmllbGQ7XHJcblxyXG5jbGFzcyBVSVRleHRGaWVsZCBleHRlbmRzIFVJRmllbGQge1xyXG5cclxuXHRwdWJsaWMgdGV4dEFyZWEgPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJ1aVRleHRGaWVsZF9cIik7XHJcblx0XHR0aGlzLnRleHRBcmVhID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0VGV4dEFyZWEodGV4dEFyZWE6Ym9vbGVhbikge1xyXG5cdFx0dGhpcy50ZXh0QXJlYSA9IHRleHRBcmVhO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55LCBkYXRhOmFueSA9IG51bGwsIGNhbGxiYWNrOmFueSA9IG51bGwsIHVwZGF0ZUZpZWxkID0gbnVsbCwgdGV4dEFyZWEgPSBmYWxzZSkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdFx0dGhpcy50ZXh0QXJlYSAgICA9IHRleHRBcmVhO1xyXG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHVwZGF0ZUZpZWxkO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHRpZiAodGhpcy50ZXh0QXJlYSlcclxuXHRcdFx0dmFyIHZpZXdUeXBlID0gXCJ0ZXh0YXJlYVwiOyBlbHNlXHJcblx0XHRcdHZpZXdUeXBlID0gXCJ0ZXh0XCI7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCAgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHR2aWV3ICAgICAgOiB2aWV3VHlwZSxcclxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0dmFsdWUgICAgIDogdGhpcy5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRsYWJlbCAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDBcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxyXG5cclxufSB0aGlzLlVJVGV4dEZpZWxkID0gVUlUZXh0RmllbGQ7XHJcblxyXG5jbGFzcyBVSU5vdGVGaWVsZCBleHRlbmRzIFVJVGV4dEZpZWxkIHtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSU5vdGVGaWVsZF9cIik7XHJcblx0XHR0aGlzLnRleHRBcmVhID0gdHJ1ZTtcclxuXHR9XHJcblxyXG59dGhpcy5VSU5vdGVGaWVsZCA9IFVJTm90ZUZpZWxkO1xyXG5cclxuY2xhc3MgVUlTZWxlY3RMaXN0IGV4dGVuZHMgVUlGaWVsZCB7XHJcblxyXG5cdHB1YmxpYyBzZWxlY3Rpb25MaXN0OkFycmF5PGFueT47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwidWlTZWxlY3RMaXN0X1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRWYWx1ZSh2YWx1ZSA6IGFueSkge1xyXG5cdFx0c3VwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldFNlbGVjdExpc3QobGFiZWwsIHZhbHVlLCB0aGVMaXN0LCBkYXRhLCBjYWxsYmFjaywgdXBkYXRlRmllbGQpIHtcclxuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xyXG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHR0aGlzLnNldExpc3QodGhlTGlzdCk7XHJcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XHJcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKVxyXG5cdFx0dGhpcy5zZXRVcGRhdGVGaWVsZCh1cGRhdGVGaWVsZCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICA6IFwic2VsZWN0XCIsXHJcblx0XHRcdG5hbWUgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdG9wdGlvbnMgICA6IHRoaXMuc2VsZWN0aW9uTGlzdCxcclxuXHRcdFx0dmFsdWUgICAgIDogdGhpcy5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRsYWJlbCAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxyXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDAsXHJcblx0XHRcdHZhbGlkYXRlICA6IHdlYml4LnJ1bGVzLmlzTm90RW1wdHlcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblx0cHVibGljIHNldExpc3QodGhlTGlzdDpBcnJheTxhbnk+KSB7XHJcblx0XHR0aGlzLnNlbGVjdGlvbkxpc3QgPSB0aGVMaXN0O1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGVMaXN0KSB7XHJcblx0XHRcdGlmICh0aGVMaXN0W2l0ZW1dLm5hbWUgPT0gXCJcIilcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNlbGVjdGlvbkxpc3QucHVzaCh7aWQ6IFwiXCIsIG5hbWU6IFwiXCJ9KTtcclxuXHJcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcclxuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZGVmaW5lKFwib3B0aW9uc1wiLCB0aGlzLnNlbGVjdGlvbkxpc3QpO1xyXG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5yZWZyZXNoKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSB0aGlzLlVJU2VsZWN0TGlzdCA9IFVJU2VsZWN0TGlzdDtcclxuXHJcbmNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSA9IDAsIGRhdGE6YW55ID0gbnVsbCwgY2FsbGJhY2s6YW55ID0gbnVsbCkge1xyXG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcclxuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLFxyXG5cdFx0XHR2aWV3OiBcImNoZWNrYm94XCIsXHJcblx0XHRcdGxhYmVsOiB0aGlzLmdldExhYmVsKCksXHJcblx0XHRcdHZhbHVlOiB0aGlzLmdldFZhbHVlKCksXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkNoYW5nZShuZXd2LCBvbGR2KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJvbkNoYW5nZVwiLCB7bmV3VmFsdWU6IG5ld3YsIG9sZFZhbHVlOiBvbGR2fSk7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSUNoZWNrYm94ID0gVUlDaGVja2JveDtcclxuXHJcbmNsYXNzIFVJSnVtcEl0ZW0ge1xyXG5cclxuXHRwdWJsaWMgaWQ6c3RyaW5nO1xyXG5cdHB1YmxpYyBsYWJlbDpzdHJpbmc7XHJcblx0cHVibGljIGNhbGxiYWNrOmFueTtcclxuXHRwdWJsaWMgZXZlbnQ6YW55O1xyXG5cdHB1YmxpYyB0eXBlOnN0cmluZztcclxuXHJcbn1cclxuY2xhc3MgVUlKdW1wQmFyIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHRwdWJsaWMganVtcEl0ZW1BcnJheTpBcnJheTxVSUp1bXBJdGVtPjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJSnVtcEJhcl9cIik7XHJcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXkgPSBuZXcgQXJyYXk8VUlKdW1wSXRlbT4oKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgSnVtcENhbGxiYWNrKGlkOnN0cmluZywgZXZlbnQ6YW55KSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQoaWQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dmFyIGNhbGxiYWNrID0gbnVsbDtcclxuXHRcdHRoZUNvbXBvbmVudC5wdWJsaXNoKHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5ldmVudClcclxuXHRcdC8vICAgIHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5jYWxsYmFjayh0aGVDb21wb25lbnQsIHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5sYWJlbCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR2YXIgYmFyVmlldyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuanVtcEl0ZW1BcnJheSkge1xyXG5cdFx0XHR2YXIgbmV3SXRlbVZpZXcgPSB7XHJcblx0XHRcdFx0dmlldyA6IFwiYnV0dG9uXCIsXHJcblx0XHRcdFx0aWQgICA6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5pZCxcclxuXHRcdFx0XHR0eXBlIDogXCJodG1sYnV0dG9uXCIsXHJcblx0XHRcdFx0Y3NzICA6IFwiYnRfMVwiLFxyXG5cdFx0XHRcdGxhYmVsOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWwsXHJcblx0XHRcdFx0dmFsdWU6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5sYWJlbFxyXG5cdFx0XHR9XHJcblx0XHRcdGJhclZpZXcucHVzaChuZXdJdGVtVmlldyk7XHJcblx0XHR9XHJcblx0XHR2YXIgbmV3VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCBjb2xzOiBiYXJWaWV3XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXdWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkSXRlbShsYWJlbDpzdHJpbmcsIGV2ZW50OnN0cmluZywgdHlwZSA9IFwiZGFuZ2VyXCIsIGNhbGxiYWNrID0gbnVsbCkge1xyXG5cdFx0dmFyIG5ld0l0ZW0gICAgICA9IG5ldyBVSUp1bXBJdGVtKCk7XHJcblx0XHRuZXdJdGVtLmlkICAgICAgID0gXCJqdW1wQnV0dG9uX1wiICsgd2ViaXgudWlkKCk7XHJcblx0XHRuZXdJdGVtLmxhYmVsICAgID0gbGFiZWw7XHJcblx0XHRuZXdJdGVtLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRuZXdJdGVtLmV2ZW50ICAgID0gZXZlbnQ7XHJcblx0XHRuZXdJdGVtLnR5cGUgICAgID0gdHlwZTtcclxuXHRcdHRoaXMuanVtcEl0ZW1BcnJheVtuZXdJdGVtLmlkXSA9IG5ld0l0ZW07XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuanVtcEl0ZW1BcnJheSkge1xyXG5cdFx0XHRpZiAoJCQodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkKSlcclxuXHRcdFx0XHRpZiAoISQkKHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5pZCkuaGFzRXZlbnQoXCJvbkl0ZW1DbGlja1wiKSlcclxuXHRcdFx0XHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLCBcIm9uSXRlbUNsaWNrXCIsIFVJSnVtcEJhci5KdW1wQ2FsbGJhY2spO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdGlmICgkJChpdGVtKSkge1xyXG5cdFx0XHRcdCQkKGl0ZW0pW1wiY29tcG9uZW50XCJdID0gdGhpcztcclxuXHRcdFx0XHQkJChpdGVtKVtcImRhdGFcIl0gICAgICA9IHRoaXMuZ2V0RGF0YSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSB0aGlzLlVJSnVtcEJhciA9IFVJSnVtcEJhcjtcclxuXHJcbmNsYXNzIFVJVG9vbGJhciBleHRlbmRzIFVJSnVtcEJhciB7XHJcblxyXG5cdHB1YmxpYyBsYWJlbDpzdHJpbmc7XHJcblx0cHVibGljIGljb246c3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0VG9vbEJhcihsYWJlbCwgaWNvbikge1xyXG5cdFx0dGhpcy5sYWJlbCA9IGxhYmVsO1xyXG5cdFx0dGhpcy5pY29uICA9IGljb247XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciB0aGVCYXIgID0ge3ZpZXc6IFwibGFiZWxcIiwgbGFiZWw6IHRoaXMuaWNvbiArIFwiIFwiICsgdGhpcy5sYWJlbH07XHJcblx0XHRiYXJWaWV3LnB1c2godGhlQmFyKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XHJcblx0XHRcdHZhciBuZXdJdGVtVmlldyA9IHtcclxuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIixcclxuXHRcdFx0XHRpZCAgIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLFxyXG5cdFx0XHRcdHR5cGUgOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0udHlwZSxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmxhYmVsXHJcblx0XHRcdH1cclxuXHRcdFx0YmFyVmlldy5wdXNoKG5ld0l0ZW1WaWV3KTtcclxuXHRcdH1cclxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgOiBcInRvb2xiYXJcIixcclxuXHRcdFx0Y3NzICAgICA6IFwiaGlnaGxpZ2h0ZWRfaGVhZGVyIGhlYWRlcjNcIixcclxuXHRcdFx0cGFkZGluZ1g6IDUsXHJcblx0XHRcdHBhZGRpbmdZOiA1LFxyXG5cdFx0XHRoZWlnaHQgIDogNDAsXHJcblx0XHRcdGNvbHMgICAgOiBiYXJWaWV3XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXdWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSVRvb2xiYXIgPSBVSVRvb2xiYXI7XHJcblxyXG5jbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblx0cHVibGljIGNvbG9yOnN0cmluZztcclxuXHRwdWJsaWMgZXZlbnQ6c3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlCdXR0b25fXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uQnV0dG9uQ2xpY2sodGhlQ29tcG9uZW50OmFueSkge1xyXG5cdFx0dGhpcy5wdWJsaXNoKFwiY2xpY2tcIiwgdGhpcyk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZT86YW55LCBkYXRhPzphbnksIGNhbGxiYWNrPzphbnkpIHtcclxuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xyXG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XHJcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRcdHRoaXMuY29sb3IgPSBcImJhY2tncm91bmQtY29sb3IgOiAjRkY5RTlFXCI7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcclxuXHRcdFx0dmlldyAgICAgOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRuYW1lICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdHZhbHVlICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcclxuXHRcdFx0Y3NzRm9ybWF0OiB0aGlzLmNvbG9yLFxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0TGFiZWwodGhlTGFiZWw6c3RyaW5nKSB7XHJcblx0XHRzdXBlci5zZXRMYWJlbCh0aGVMYWJlbCk7XHJcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnZhbHVlID0gdGhlTGFiZWw7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkucmVmcmVzaCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0Q29sb3IodmFsdWU6c3RyaW5nKSB7XHJcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLnN0eWxlLmJhY2tncm91bmQgID0gdmFsdWU7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuJHZpZXcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uc3R5bGUuYm9yZGVyQ29sb3IgPSB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5jb21wb25lbnRJRCwgXCJvbkl0ZW1DbGlja1wiLCBVSUV2ZW50SGFuZGxlci5PbkJ1dHRvbkNsaWNrKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJQnV0dG9uID0gVUlCdXR0b247XHJcblxyXG5jbGFzcyBVSURyb3Bab25lIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlEcm9wWm9uZV9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55LCBkYXRhOmFueSwgY2FsbGJhY2s6YW55LCB1cGRhdGVGaWVsZCA9IG51bGwpIHtcclxuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xyXG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XHJcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLnNldEluVGhlWm9uZShmYWxzZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRJblRoZVpvbmUoaW5ab25lOmJvb2xlYW4pIHtcclxuXHRcdGlmIChpblpvbmUpXHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuZGVmaW5lKFwiY3NzXCIsIFwiaW5UaGVEcm9wWm9uZVwiKTsgZWxzZVxyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmRlZmluZShcImNzc1wiLCBcIm91dE9mVGhlRHJvcFpvbmVcIik7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcclxuXHRcdFx0aWQgICAgICAgOiB0aGlzLmdldENvbXBvbmVudElEKCksXHJcblx0XHRcdHZpZXcgICAgIDogXCJsaXN0XCIsXHJcblx0XHRcdG1pbldpZHRoIDogMTAwLFxyXG5cdFx0XHRtaW5IZWlnaHQ6IDEwMCxcclxuXHRcdFx0dGVtcGxhdGUgOiBcIiN0aXRsZSNcIixcclxuXHRcdFx0ZGF0YSAgICAgOiBbe3RpdGxlOiBcIkRyb3AgWm9uZVwifV0sXHJcblx0XHRcdGRyYWcgICAgIDogXCJ0YXJnZXRcIlxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIG9uQmVmb3JlRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKTpib29sZWFuIHtcclxuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHVibGljIG9uQmVmb3JlRHJhZ0luKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xyXG5cdFx0dGhpcy5zZXRJblRoZVpvbmUodHJ1ZSk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0cHVibGljIG9uRHJhZ091dChtZXNzYWdlOkRyb3BNZXNzYWdlKTpib29sZWFuIHtcclxuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uQmVmb3JlRHJvcFwiLCBVSUV2ZW50SGFuZGxlci5PbkJlZm9yZURyb3ApO1xyXG5cdH1cclxuXHJcbn0gdGhpcy5VSURyb3Bab25lID0gVUlEcm9wWm9uZTtcclxuXHJcbmludGVyZmFjZSBvbkVkaXRDYWxsYmFjayB7XHJcblx0KG9iamVjdDphbnkpIDogYW55O1xyXG59XHJcblxyXG5jbGFzcyBVSUNvbG9yRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOmFueSkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlDb2xvckZpZWxkX1wiKTtcclxuXHRcdHRoaXMuYWRkUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImNvbG9ycGlja2VyXCJcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG59dGhpcy5VSUNvbG9yRmllbGQgPSBVSUNvbG9yRmllbGQ7XHJcblxyXG5jbGFzcyBVSURhdGFUYWJsZUZpZWxkIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xyXG5cdHB1YmxpYyBjb2x1bW5OdW1iZXI6bnVtYmVyO1xyXG5cdHB1YmxpYyBjb2x1bW5OYW1lOnN0cmluZztcclxuXHRwdWJsaWMgb2xkVmFsdWU6YW55O1xyXG5cdHB1YmxpYyBuZXdWYWx1ZTphbnk7XHJcblx0cHVibGljIGVkaXRvcjphbnk7XHJcblx0cHVibGljIHJvd09iamVjdDphbnk7XHJcblx0cHVibGljIGlzUmVmZXJlbmNlOmJvb2xlYW4gICAgICAgPSBmYWxzZTtcclxuXHRwdWJsaWMgcmVmZXJlbmNlQ2xhc3NUeXBlOnN0cmluZyA9IFwiXCI7XHJcblx0cHVibGljIHJlZmVyZW5jZUZpZWxkOmFueTtcclxuXHRwdWJsaWMgcmVmZXJlbmNlT2JqZWN0OmFueTtcclxuXHRwdWJsaWMgZGlzcGxheUZpZWxkTmFtZTtcclxuXHRwdWJsaWMgdmlldzphbnk7XHJcblx0cHVibGljIG9wdGlvbkxpc3Q6QXJyYXk8YW55PjtcclxuXHRwdWJsaWMgbWFwcGVkOmJvb2xlYW4gICAgICAgICAgICA9IGZhbHNlO1xyXG5cdHB1YmxpYyB0ZW1wbGF0ZTphbnk7XHJcblx0cHVibGljIHJlZmVyZW5jZUNsYXNzRmllbGQ6YW55XHJcblx0Ly9lbmRyZWdpb25cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlEYXRhVGFibGVGaWVsZF9cIik7XHJcblx0XHR0aGlzLmNvbXBvbmVudElEID0gXCJkYXRhVGFibGVGaWVsZF9cIiArIHdlYml4LnVpZCgpO1xyXG5cdH1cclxufSB0aGlzLlVJRGF0YVRhYmxlRmllbGQgPSBVSURhdGFUYWJsZUZpZWxkO1xyXG5cclxuY2xhc3MgVUlEYXRhVGFibGUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblx0Z2V0IHRlbXBsYXRlKCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcclxuXHR9XHJcblxyXG5cdHNldCB0ZW1wbGF0ZSh2YWx1ZTphbnkpIHtcclxuXHRcdHRoaXMuX3RlbXBsYXRlID0gdmFsdWU7XHJcblx0fVxyXG5cdGdldCBzaG93VG9vbEJhcigpOmJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Nob3dUb29sQmFyO1xyXG5cdH1cclxuXHRzZXQgc2hvd1Rvb2xCYXIodmFsdWU6Ym9vbGVhbikge1xyXG5cdFx0dGhpcy5fc2hvd1Rvb2xCYXIgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgTWFwcGVkQ29sdW1uTG9va3VwKG9iaikge1xyXG5cdH1cclxuXHRwdWJsaWMgdmlld1R5cGUgPSBcImRhdGF0YWJsZVwiO1xyXG5cclxuXHRwcm90ZWN0ZWQgdGhlTGlzdCAgICAgICAgICAgICAgIDogQXJyYXk8YW55PiAgPSBudWxsO1xyXG5cdHByb3RlY3RlZCBjb2x1bW5zICAgICAgICAgICAgICAgOiBBcnJheTxVSURhdGFUYWJsZUZpZWxkPjtcclxuXHRwcm90ZWN0ZWQgcm93U2VsZWN0Q2FsbGJhY2sgICAgIDogYW55O1xyXG5cdHByb3RlY3RlZCBlZGl0YWJsZSAgICAgICAgICAgICAgOiBib29sZWFuICAgID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGVkaXRhY3Rpb24gICAgICAgICAgICA6IHN0cmluZyAgID0gXCJkYmxjbGlja1wiO1xyXG5cdHByb3RlY3RlZCB0b29sQmFyICAgICAgICAgICAgICAgOiBVSVRvb2xiYXI7XHJcblx0cHJvdGVjdGVkIGRhdGFUYWJsZUlEICAgICAgICAgICA6IHN0cmluZztcclxuXHRwcml2YXRlIF9zaG93VG9vbEJhciAgICAgICAgICAgIDogYm9vbGVhbiAgPSBmYWxzZTtcclxuXHRwcml2YXRlIF9tdWx0aVNlbGVjdCAgICAgICAgICAgIDogYm9vbGVhbiAgPSBmYWxzZTtcclxuXHRwcml2YXRlIF9hdXRvQ29sdW1uQ29uZmlndXJlICA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX3Nob3dBZGREZWxldGVDb2x1bW5zID0gdHJ1ZTtcclxuXHRwcml2YXRlIF93aWR0aCAgICAgICAgICAgICAgICA9IDA7XHJcblx0cHJpdmF0ZSBfaGVpZ2h0ICAgICAgICAgICAgICAgPSAwO1xyXG5cdHByaXZhdGUgX3RlbXBsYXRlIDogYW55ID0gbnVsbDtcclxuXHJcblx0Z2V0IG11bHRpU2VsZWN0KCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbXVsdGlTZWxlY3Q7XHJcblx0fVxyXG5cdHNldCBtdWx0aVNlbGVjdCh2YWx1ZTpib29sZWFuKSB7XHJcblx0XHR0aGlzLl9tdWx0aVNlbGVjdCA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgYXV0b0NvbHVtbkNvbmZpZ3VyZSgpOmJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9Db2x1bW5Db25maWd1cmU7XHJcblx0fVxyXG5cdHNldCBhdXRvQ29sdW1uQ29uZmlndXJlKHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX2F1dG9Db2x1bW5Db25maWd1cmUgPSB2YWx1ZTtcclxuXHR9XHJcblx0Z2V0IHNob3dBZGREZWxldGVDb2x1bW5zKCk6Ym9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hvd0FkZERlbGV0ZUNvbHVtbnM7XHJcblx0fVxyXG5cdHNldCBzaG93QWRkRGVsZXRlQ29sdW1ucyh2YWx1ZTpib29sZWFuKSB7XHJcblx0XHR0aGlzLl9zaG93QWRkRGVsZXRlQ29sdW1ucyA9IHZhbHVlO1xyXG5cdH1cclxuXHRnZXQgaGVpZ2h0KCk6bnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcblx0fVxyXG5cdHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKSB7XHJcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuXHR9XHJcblx0Z2V0IHdpZHRoKCk6bnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcclxuXHR9XHJcblx0c2V0IHdpZHRoKHZhbHVlOm51bWJlcikge1xyXG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJRGF0YVRhYmxlX1wiKTtcclxuXHRcdHRoaXMuY29sdW1ucyAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcclxuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcImRhdGFUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xyXG5cdFx0dGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucyA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBoaWRlQ29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xyXG5cclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkgJCQodGhpcy5kYXRhVGFibGVJRCkuaGlkZUNvbHVtbihjb2x1bW5JRCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93Q29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xyXG5cclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkgJCQodGhpcy5kYXRhVGFibGVJRCkuc2hvd0NvbHVtbihjb2x1bW5JRCk7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdHB1YmxpYyBuZXdJdGVtKCkge1xyXG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IHRoaXM7XHJcblx0XHR2YXIgb2JqZWN0UHJveHkgID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoZUNvbXBvbmVudC51aUNsYXNzVHlwZSk7XHJcblx0XHR2YXIgbmFtZSAgICAgICAgID0gXCJBIE5ldyBcIiArIG9iamVjdFByb3h5LmNsYXNzTGFiZWwoKTtcclxuXHRcdHZhciBuZXdJRCAgICAgICAgPSBvYmplY3RQcm94eS5hZGROZXcobmFtZSk7XHJcblx0XHR2YXIgbmV3T2JqZWN0ICAgID0gb2JqZWN0UHJveHkuZ2V0T25lKG5ld0lEKTtcclxuXHRcdHZhciBuZXdSb3dJRCAgICAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmFkZChuZXdPYmplY3QpO1xyXG5cdFx0JCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5zaG93SXRlbShuZXdSb3dJRCk7XHJcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNlbGVjdChuZXdSb3dJRCwgZmFsc2UpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVsZXRlSXRlbSh0aGVUb29sYmFyOlVJVG9vbGJhciwgbGFiZWw6c3RyaW5nKSB7XHJcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcclxuXHRcdHZhciByb3dpZCAgICAgICAgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSWQoKTtcclxuXHRcdGlmICghcm93aWQpIHJldHVybjtcclxuXHRcdHZhciB0aGVPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xyXG5cdFx0dGhlQ29tcG9uZW50LmhhbmRsZURlbGV0ZSh0aGVPYmplY3QpO1xyXG5cdH1cclxuXHRwdWJsaWMgb3B0aW9ucygpIHtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSB0aGlzO1xyXG5cdFx0dmFyIHJvd2lkICAgICAgICA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJZCgpO1xyXG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xyXG5cdFx0dmFyIHRoZU9iamVjdCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0SXRlbShyb3dpZCk7XHJcblx0XHR0aGVDb21wb25lbnQuaGFuZGxlRGVsZXRlKHRoZU9iamVjdCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0U2VsZWN0ZWRPYmplY3QoKSA6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRTZWxlY3RlZCgpWzBdO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0U2VsZWN0ZWQoKTpBcnJheTxhbnk+IHtcclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkge1xyXG5cdFx0XHR2YXIgaWRBcnJheSA9ICQkKHRoaXMuZGF0YVRhYmxlSUQpLmdldFNlbGVjdGVkSXRlbSh0cnVlKTtcclxuXHRcdFx0cmV0dXJuIGlkQXJyYXk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHVibGljIG9uU2VsZWN0Q2hhbmdlKGl0ZW1NZXNzYWdlOkl0ZW1TZWxlY3RlZEV2ZW50KSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJvblNlbGVjdENoYW5nZVwiLCBpdGVtTWVzc2FnZSk7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgdGhlQ29sdW1uOmFueSkge1xyXG5cdFx0dmFyIG5ld0NvbHVtbiA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XHJcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICA9IHRoZUNvbHVtbjtcclxuXHRcdG5ld0NvbHVtbi5jb2x1bW5OdW1iZXIgICAgID0gY29sdW1uTnVtYmVyO1xyXG5cdFx0dGhpcy5jb2x1bW5zW2NvbHVtbk51bWJlcl0gPSBuZXdDb2x1bW47XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRNYXBwZWRDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgcmVmZXJlbmNlQ2xhc3NGaWVsZDpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgZGlzcGxheUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcclxuXHRcdHZhciBuZXdDb2x1bW4gICAgICAgICAgICAgICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdG5ld0NvbHVtbi5tYXBwZWQgICAgICAgICAgICAgID0gdHJ1ZTtcclxuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VDbGFzc0ZpZWxkID0gcmVmZXJlbmNlQ2xhc3NGaWVsZFxyXG5cdFx0bmV3Q29sdW1uLnJlZmVyZW5jZUZpZWxkICAgICAgPSByZWZlcmVuY2VGaWVsZE5hbWU7XHJcblx0XHRuZXdDb2x1bW4uZGlzcGxheUZpZWxkTmFtZSAgICA9IGRpc3BsYXlGaWVsZE5hbWU7XHJcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xyXG5cdFx0dmFyIGZ1bmN0aW9uTWFtZSAgICAgICAgICAgID0gXCJtYXBGdW5jdGlvblwiICsgd2ViaXgudWlkKCk7XHJcblx0XHR2YXIgbWFwcGVkRnVuY3Rpb24gICAgICAgICAgPSBuZXcgRnVuY3Rpb24oJ29iaicsICd7JyArICd2YXIgb2JqZWN0UHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2Uob2JqW1wiJyArIHJlZmVyZW5jZUNsYXNzRmllbGQgKyAnXCJdXCIpOycgKyAndmFyIHRoaXNPYmplY3QgPSBvYmplY3RQcm94eS5nZXRPbmUob2JqW1wiJyArIHJlZmVyZW5jZUZpZWxkTmFtZSArICdcIl0pOycgKyAnaWYgKCF0aGlzT2JqZWN0KSByZXR1cm4gXCJOb3QgRm91bmRcIjsnICsgJ3JldHVybiB0aGlzT2JqZWN0W1wiJyArIGRpc3BsYXlGaWVsZE5hbWUgKyAnXCJdOycgKyAnfScpO1xyXG5cdFx0bmV3Q29sdW1uLnRlbXBsYXRlICAgICAgICAgID0gbWFwcGVkRnVuY3Rpb247XHJcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xyXG5cdFx0bmV3Q29sdW1uLnZpZXdbXCJfdGVtcGxhdGVcIl0gPSBuZXdDb2x1bW4udGVtcGxhdGU7XHJcblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSAgPSBuZXdDb2x1bW47XHJcblx0fVxyXG4gICAgcHVibGljIGFkZFJlZmVyZW5jZUNvbHVtbihjb2x1bW5OdW1iZXI6bnVtYmVyLCByZWZlcmVuY2VDbGFzc1R5cGU6c3RyaW5nLCByZWZlcmVuY2VGaWVsZE5hbWUsIHRoZUNvbHVtblZpZXc6YW55KSB7XHJcblx0XHR2YXIgbmV3Q29sdW1uICAgICAgICAgICAgICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcclxuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VDbGFzc1R5cGUgPSByZWZlcmVuY2VDbGFzc1R5cGU7XHJcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICAgID0gdGhlQ29sdW1uVmlldztcclxuXHRcdHZhciBvYmplY3RQcm94eSAgICAgICAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocmVmZXJlbmNlQ2xhc3NUeXBlKTtcclxuXHRcdHZhciBvcHRpb25MaXN0ICAgICAgICAgPSBvYmplY3RQcm94eS5nZXRMaXN0KGZhbHNlKTtcclxuXHRcdG5ld0NvbHVtbi5vcHRpb25MaXN0ICAgPSBvcHRpb25MaXN0O1xyXG5cdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciA9IGNvbHVtbk51bWJlcjtcclxuXHRcdHZhciBvcHRpb25BcnJheSAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBvcHRpb25MaXN0KSB7XHJcblx0XHRcdHZhciBvcHRpb24gICAgICAgICAgICAgICAgID0gbmV3IEM0T2JqZWN0KCk7XHJcblx0XHRcdG9wdGlvbltcImlkXCJdICAgICAgICAgICAgICAgPSBvcHRpb25MaXN0W2l0ZW1dW1wiaWRcIl07XHJcblx0XHRcdG9wdGlvbltyZWZlcmVuY2VGaWVsZE5hbWVdID0gb3B0aW9uTGlzdFtpdGVtXVtyZWZlcmVuY2VGaWVsZE5hbWVdO1xyXG5cdFx0XHRvcHRpb25BcnJheS5wdXNoKG9wdGlvbik7XHJcblx0XHR9XHJcblx0XHRuZXdDb2x1bW4udmlld1tcIm9wdGlvbnNcIl0gPSBvcHRpb25MaXN0O1xyXG5cdFx0Ly9uZXdDb2x1bW4udmlld1tcIm9uXCJdID0geyBvbkNoYW5nZSA6IGZ1bmN0aW9uKCkgeyBVSS5NZXNzYWdlKFwiU2VsZWN0IENoYW5nZWRcIik7fX1cclxuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdID0gbmV3Q29sdW1uO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkT3B0aW9uQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIG9wdGlvbkxpc3QsIHRoZUNvbHVtbikge1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0TGlzdCh0aGVMaXN0KSB7XHJcblx0XHR0aGlzLnRoZUxpc3QgPSB0aGVMaXN0O1xyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLmNsZWFyQWxsKCk7XHJcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnBhcnNlKHRoaXMudGhlTGlzdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRWYWx1ZSh0aGVMaXN0OmFueSkge1xyXG5cdFx0dGhpcy5zZXRMaXN0KHRoZUxpc3QpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0RWRpdGFibGUodGhlRmxhZzpib29sZWFuKSB7XHJcblx0XHR0aGlzLmVkaXRhYmxlID0gdGhlRmxhZztcclxuXHR9XHJcblx0cHVibGljIG9uU3RvcEVkaXQodGhlRmllbGQ6VUlEYXRhVGFibGVGaWVsZCkge1xyXG5cdFx0aWYgKHRoaXMucHVibGlzaChcIm9uU3RvcEVkaXRcIiwgdGhlRmllbGQpKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRpZiAodGhlRmllbGQubmV3VmFsdWUgPT0gdGhlRmllbGQub2xkVmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XHJcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcclxuXHRcdFx0b2JqZWN0UHJveHkudXBkYXRlQXR0cmlidXRlKHRoZUZpZWxkLnJvd09iamVjdC5faWQsIHRoZUZpZWxkLmNvbHVtbk5hbWUsIHRoZUZpZWxkLm5ld1ZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZWZyZXNoUm93KHJvd0lEIDogYW55KSB7XHJcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpXHJcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnJlZnJlc2gocm93SUQpO1xyXG5cdH1cclxuXHRwdWJsaWMgb25CZWZvcmVFZGl0U3RhcnQodGhlRmllbGQgOiBVSURhdGFUYWJsZUZpZWxkKSB7XHJcblx0XHRpZiAodGhpcy5wdWJsaXNoKFwib25CZWZvcmVFZGl0U3RhcnRcIiwgdGhlRmllbGQpKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHB1YmxpYyBoYW5kbGVEZWxldGUodGhlT2JqZWN0OmFueSkge1xyXG5cdFx0VUkuTWVzc2FnZShcIkhhbmRsZSBEZWxldGVcIiArIHRoZU9iamVjdC5faWQpXHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVOYXZpZ2F0aW9uQmFyKCkge1xyXG5cdFx0dGhpcy50b29sQmFyID0gbmV3IFVJVG9vbGJhcigpO1xyXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJOZXdcIiwgXCJuZXdJdGVtXCIpXHJcblx0XHR0aGlzLnRvb2xCYXIuYWRkSXRlbShcIkRlbGV0ZVwiLCBcImRlbGV0ZUl0ZW1cIilcclxuXHRcdHRoaXMudG9vbEJhci5hZGRJdGVtKFwiT3B0aW9uc1wiLCBcIm9wdGlvbnNcIilcclxuXHRcdHRoaXMudG9vbEJhci5hZGRJdGVtKFwiRXhwb3J0XCIsIFwiZXhwb3J0XCIpO1xyXG5cdFx0dGhpcy50b29sQmFyLnNldERhdGEodGhpcyk7XHJcblx0XHRpZiAodGhpcy51aUNsYXNzVHlwZSkge1xyXG5cdFx0XHR0aGlzLnRvb2xCYXIuc2V0VG9vbEJhcihGYWN0b3J5LkdldENsYXNzTGFiZWwodGhpcy51aUNsYXNzVHlwZSksIEZhY3RvcnkuR2V0Q2xhc3NJY29uKHRoaXMudWlDbGFzc1R5cGUpKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgbGlzdGVuKGV2ZW50LCBvYmplY3QsIHB1Ymxpc2hlcikge1xyXG5cdFx0c3dpdGNoIChldmVudCkge1xyXG5cdFx0XHRjYXNlIFwibmV3SXRlbVwiIDpcclxuXHRcdFx0Y2FzZSBcImRlbGV0ZUl0ZW1cIiA6XHJcblx0XHRcdGNhc2UgXCJvcHRpb25zXCIgOlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiZXhwb3J0XCI6XHJcblx0XHRcdFx0dGhpcy5leHBvcnRUb0V4Y2VsKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBleHBvcnRUb0V4Y2VsKCkge1xyXG5cdFx0VUkuRXhwb3J0VG9FeGNlbCh0aGlzLmRhdGFUYWJsZUlEKTtcclxuXHR9XHJcblx0cHVibGljIGdldExpc3QoKTpBcnJheTxhbnk+IHtcclxuXHRcdGlmICh0aGlzLnRoZUxpc3QpXHJcblx0XHRcdHJldHVybiB0aGlzLnRoZUxpc3Q7XHJcblx0XHRpZiAodGhpcy51aUNsYXNzVHlwZSkge1xyXG5cdFx0XHR2YXIgb2JqZWN0UHJveHkgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UodGhpcy51aUNsYXNzVHlwZSk7XHJcblx0XHRcdHZhciByZXR1cm5MaXN0ICA9IG9iamVjdFByb3h5LmdldExpc3QodHJ1ZSk7XHJcblx0XHRcdHJldHVybiByZXR1cm5MaXN0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ldyBBcnJheTxhbnk+KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDb2x1bW5WaWV3KCk6YW55IHtcclxuXHRcdHZhciBjb2x1bW5WaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBpICAgICAgICAgID0gMDtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb2x1bW5zKSB7XHJcblx0XHRcdGNvbHVtblZpZXdbdGhpcy5jb2x1bW5zW2l0ZW1dLmNvbHVtbk51bWJlcl0gPSB0aGlzLmNvbHVtbnNbaXRlbV0udmlldztcclxuXHRcdFx0aSsrO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMpIHtcclxuXHRcdFx0Y29sdW1uVmlld1tpKytdID0ge1xyXG5cdFx0XHRcdGlkOiBcIlwiLCB0ZW1wbGF0ZToge1xyXG5cdFx0XHRcdFx0dmlldyAgICAgIDogXCJidXR0b25cIixcclxuXHRcdFx0XHRcdHR5cGUgICAgICA6IFwiaHRtbGJ1dHRvblwiLFxyXG5cdFx0XHRcdFx0bGFiZWwgICAgIDogJzxzcGFuIGNsYXNzPVwid2ViaXhfaWNvbiBmYS1hbmdsZS1sZWZ0XCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGV4dFwiPmJhY2s8L3NwYW4+JyxcclxuXHRcdFx0XHRcdGlucHV0V2lkdGg6IDgwXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvbHVtblZpZXdbaSsrXSA9IHtpZDogXCJkcmFnXCIsIGhlYWRlcjogXCJcIiwgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nd2ViaXhfZHJhZ19oYW5kbGUnPjwvZGl2PlwiLCB3aWR0aDogMzV9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29sdW1uVmlldztcclxuXHR9XHJcblx0cHVibGljIHNldENvbHVtbnMoY29sdW1ucyA6IEFycmF5PGFueT4pIHtcclxuXHRcdHZhciBpbmRleCA9IDA7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIGNvbHVtbnMpIHtcclxuXHRcdFx0dmFyIG5ld0NvbHVtbiA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XHJcblx0XHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgID0gY29sdW1uc1tpdGVtXTtcclxuXHRcdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciAgICAgPSBpbmRleCsrO1xyXG5cdFx0XHR0aGlzLmNvbHVtbnNbaW5kZXhdID0gbmV3Q29sdW1uO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XHJcblx0XHRcdHRoaXMucmVwbGFjZUNvbHVtbnMoY29sdW1ucyk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyByZXBsYWNlQ29sdW1ucyhjb2x1bW5zIDogQXJyYXk8YW55Pikge1xyXG5cdFx0dGhpcy5jb2x1bW5zID0gbmV3IEFycmF5PFVJRGF0YVRhYmxlRmllbGQ+KCk7XHJcblx0XHR2YXIgaW5kZXg9MDtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gY29sdW1ucykge1xyXG5cdFx0XHR0aGlzLmFkZENvbHVtbihpbmRleCsrLGNvbHVtbnNbaXRlbV0pO1xyXG5cdFx0fVxyXG5cdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuY29uZmlnLmNvbHVtbnMgPSB0aGlzLmNyZWF0ZUNvbHVtblZpZXcoKTs7XHJcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5yZWZyZXNoQ29sdW1ucygpO1xyXG5cdH1cclxuXHRwdWJsaWMgc29ydChwcm9wZXJ0eSA6IHN0cmluZywgc29ydERpcmVjdGlvbjpzdHJpbmcsIHR5cGU6c3RyaW5nPVwic3RyaW5nXCIpIHtcclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSlcclxuXHRcdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5zb3J0KHByb3BlcnR5LHNvcnREaXJlY3Rpb24sdHlwZSk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGZpbHRlciggZnVuYyA6IGFueSkge1xyXG5cdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuZmlsdGVyKGZ1bmMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jcmVhdGVOYXZpZ2F0aW9uQmFyKCk7XHJcblx0XHR2YXIgcm93cyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR2YXIgaSAgICA9IDA7XHJcblx0XHRpZiAodGhpcy5fc2hvd1Rvb2xCYXIpIHtcclxuXHRcdFx0dmFyIG5hdkJhclZpZXcgPSB0aGlzLnRvb2xCYXIuZ2V0VmlldygpO1xyXG5cdFx0XHRyb3dzWzBdICAgICAgICA9IG5hdkJhclZpZXc7XHJcblx0XHRcdGkrK1xyXG5cdFx0fVxyXG5cdFx0dmFyIHZpZXcgPSAge1xyXG5cdFx0XHRpZCAgICAgICAgICA6IHRoaXMuZGF0YVRhYmxlSUQsXHJcblx0XHRcdHZpZXcgICAgICAgIDogdGhpcy52aWV3VHlwZSxcclxuXHRcdFx0c2VsZWN0ICAgICAgOiBcInJvd1wiLFxyXG5cdFx0XHRuYXZpZ2F0aW9uICA6IHRydWUsXHJcblx0XHRcdHJlc2l6ZUNvbHVtbjogdHJ1ZSxcclxuXHRcdFx0c2Nyb2xseHkgICAgOiB0cnVlLFxyXG5cdFx0XHRkcmFnQ29sdW1uICA6IHRydWUsXHJcblx0XHRcdGVkaXRhYmxlICAgIDogdGhpcy5lZGl0YWJsZSxcclxuXHRcdFx0ZWRpdGFjdGlvbiAgOiB0aGlzLmVkaXRhY3Rpb24sXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLmhlaWdodCA+IDApIHtcclxuXHRcdFx0dmlld1tcImhlaWdodFwiXSA9IHRoaXMuaGVpZ2h0O1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2lkdGggPiAwKSB7XHJcblx0XHRcdHZpZXdbXCJ3aWR0aFwiXSA9IHRoaXMud2lkdGg7XHJcblxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuYXV0b0NvbHVtbkNvbmZpZ3VyZSkge1xyXG5cdFx0XHR2aWV3W1wiYXV0b0NvbmZpZ1wiXSA9IHRydWU7XHJcblx0XHR9IGVsc2VcclxuXHRcdFx0dmlld1tcImNvbHVtbnNcIl0gPSB0aGlzLmNyZWF0ZUNvbHVtblZpZXcoKTtcclxuXHRcdGlmICh0aGlzLm11bHRpU2VsZWN0KVxyXG5cdFx0XHR2aWV3W1wibXVsdGlzZWxlY3RcIl0gPSB0cnVlO1xyXG5cdFx0aWYgKHRoaXMudGVtcGxhdGUpIHtcclxuXHRcdFx0dmlld1tcIl90ZW1wbGF0ZVwiXSA9IHRoaXMudGVtcGxhdGU7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdHlwZTogXCJzcGFjZVwiLCByb3dzOiBbIHZpZXcgXVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvblNlbGVjdENoYW5nZVwiLCBVSUV2ZW50SGFuZGxlci5vblNlbGVjdENoYW5nZSk7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25BZnRlckVkaXRTdG9wXCIsIFVJRXZlbnRIYW5kbGVyLm9uQWZ0ZXJFZGl0U3RvcCk7XHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtRGJsQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtRGJsQ2xpY2spO1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmRhdGFUYWJsZUlELCBcIm9uQmVmb3JlRWRpdFN0YXJ0XCIsIFVJRXZlbnRIYW5kbGVyLm9uQmVmb3JlRWRpdFN0YXJ0VGFibGUpO1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmRhdGFUYWJsZUlELCBcIm9uSXRlbUNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk9uSXRlbUNsaWNrKTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHZhciByZXN1bHRMaXN0ID0gdGhpcy5nZXRMaXN0KCk7XHJcblx0XHRpZiAocmVzdWx0TGlzdClcclxuXHRcdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5wYXJzZShyZXN1bHRMaXN0KTtcclxuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSlcclxuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRClbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xyXG5cdFx0aWYgKHRoaXMuX3Nob3dUb29sQmFyKVx0dGhpcy50b29sQmFyLmluaXRpYWxpemUoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VGFibGVMaXN0KCkgOiBBcnJheTxhbnk+IHtcclxuXHRcdHZhciBkYXRhdGFibGUgPSAkJCh0aGlzLmRhdGFUYWJsZUlEKVxyXG5cdFx0dmFyIGRhdGFMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLmVhY2hSb3coXHJcblx0XHRcdGZ1bmN0aW9uIChyb3cpe1xyXG5cdFx0XHRcdHZhciBpdGVtID0gZGF0YXRhYmxlLmdldEl0ZW0ocm93KTtcclxuXHRcdFx0XHRkYXRhTGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHQpXHJcblx0XHRyZXR1cm4gZGF0YUxpc3Q7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJRGF0YVRhYmxlID0gVUlEYXRhVGFibGU7XHJcblxyXG5jbGFzcyBVSVRyZWVUYWJsZSBleHRlbmRzIFVJRGF0YVRhYmxlIHtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJVHJlZVRhYmxlX1wiKTtcclxuXHRcdHRoaXMuY29sdW1ucyAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcclxuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcInRyZWVUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xyXG5cdFx0dGhpcy5zaG93QWRkRGVsZXRlQ29sdW1ucyA9IGZhbHNlO1xyXG5cdFx0dGhpcy52aWV3VHlwZSA9IFwidHJlZXRhYmxlXCI7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJVHJlZVRhYmxlID0gVUlUcmVlVGFibGU7XHJcblxyXG5jbGFzcyBVSUNhbGVuZGFyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlVJQ2FsZW5kYXJGaWVsZF9cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55LCBkYXRhOmFueSwgY2FsbGJhY2s6YW55LCB1cGRhdGVGaWVsZCA9IG51bGwpIHtcclxuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xyXG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XHJcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRcdHRoaXMudXBkYXRlRmllbGQgPSB1cGRhdGVGaWVsZDtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0ge1xyXG5cdFx0XHRpZCAgICAgICAgICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdHZpZXcgICAgICAgICAgICAgIDogXCJkYXRlcGlja2VyXCIsXHJcblx0XHRcdG5hbWUgICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCwgLy9kYXRlOiAgbmV3IERhdGUoMjAxMiwgNiwgOCksXHJcblx0XHRcdHZhbHVlICAgICAgICAgICAgIDogdGhpcy5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRsYWJlbCAgICAgICAgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXHJcblx0XHRcdGxhYmVsV2lkdGggICAgICAgIDogMTAwLFxyXG5cdFx0XHRldmVudHMgICAgICAgICAgICA6IHdlYml4LkRhdGUuaXNIb2xpZGF5LFxyXG5cdFx0XHRjYWxlbmRhckRhdGVGb3JtYXQ6IFwiJVktJW0tJWRcIlxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblxyXG59IHRoaXMuVUlDYWxlbmRhckZpZWxkID0gVUlDYWxlbmRhckZpZWxkO1xyXG5cclxuY2xhc3MgVUlDb21wbGV4Q29tcG9uZW50IGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHRwcm90ZWN0ZWQgY29tcG9uZW50QXJyYXk6QXJyYXk8VUlDb21wb25lbnQ+O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlDb21wbGV4Q29tcG9uZW50X1wiKTtcclxuXHRcdHRoaXMuY29tcG9uZW50QXJyYXkgPSBuZXcgQXJyYXk8VUlDb21wb25lbnQ+KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkQ29tcG9uZW50KGxhYmVsOnN0cmluZywgY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2xhYmVsXSA9IGNvbXBvbmVudDtcclxuXHRcdGlmIChjb21wb25lbnQpIGNvbXBvbmVudC5zZXRQcm9wZXJ0eShcIm5hbWVcIiwgbGFiZWwpO1xyXG5cdH1cclxuXHRwdWJsaWMgY3JlYXRlQ29tcG9uZW50c1ZpZXcoKTphbnkge1xyXG5cdFx0dmFyIHZpZXdBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHR2YXIgaSAgICAgICAgID0gMDtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheSkge1xyXG5cdFx0XHRpZiAoaXRlbSAhPSBcInRvb2xiYXJcIilcclxuXHRcdFx0XHR2aWV3QXJyYXlbaSsrXSA9IHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZ2V0VmlldygpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZpZXdBcnJheTtcclxuXHR9XHJcblx0cHVibGljIG51bU9mQ29tcG9uZW50cygpOm51bWJlciB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRBcnJheSkubGVuZ3RoXHJcblx0fVxyXG5cdHB1YmxpYyBnZXRDb21wb25lbnQobGFiZWw6c3RyaW5nKTpVSUNvbXBvbmVudCB7XHJcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRBcnJheVtsYWJlbF07XHJcblx0XHRyZXR1cm4gY29tcG9uZW50XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRGaWVsZENvbXBvbmVudChsYWJlbDpzdHJpbmcpOlVJRmllbGQge1xyXG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50QXJyYXlbbGFiZWxdO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudFxyXG5cdH1cclxuXHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcdH1cclxuXHRcclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XHJcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uaW5pdGlhbGl6ZSgpO1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLnNldERhdGEodGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBkZXN0cm95VmlldygpIHtcclxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkgJCQodGhpcy5jb21wb25lbnRJRCkuZGVzdHJ1Y3RvcigpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVzdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyLmRlc3RydWN0b3IoKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheSkge1xyXG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLmRlc3RydWN0b3IoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IHRoaXMuVUlDb21wbGV4Q29tcG9uZW50ID0gVUlDb21wbGV4Q29tcG9uZW50O1xyXG5cclxuY2xhc3MgUG9ydGFsU2VjdGlvbiBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXHJcblx0cHVibGljIHBvcnRhbFNlY3Rpb25JbmRleCAgICAgICAgID0gbnVsbDtcclxuXHRwdWJsaWMgY2xhc3NUeXBlOkNsYXNzVHlwZTtcclxuXHRwdWJsaWMgdGhlQXJyYXk6QXJyYXk8YW55PjtcclxuXHRwdWJsaWMgZ3Jhdml0eTpudW1iZXIgICAgICAgICAgICAgPSAxO1xyXG5cdHB1YmxpYyBwb3J0bGV0TmFtZSAgICAgICAgICAgICAgICA9IFwiXCI7XHJcblx0cHVibGljIHNlY3Rpb25IZWFkZXI6UG9ydGFsSGVhZGVyID0gbnVsbDtcclxuXHRwcml2YXRlIHRlbXBsYXRlICAgICAgICAgICAgICAgICAgPSB7dHlwZTogXCJsaW5lXCJ9O1xyXG5cdHByaXZhdGUgX3Njcm9sbEJhclggICAgICAgICAgICAgICA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX3Njcm9sbEJhclkgICAgICAgICAgICAgICA9IGZhbHNlO1xyXG5cdC8vZW5kcmVnaW9uXHJcblx0Ly9yZWdpb24gQ2xhc3MgVmFyaWFibGVzXHJcblx0cHVibGljIHN0YXRpYyBDT0xVTU5TID0gXCJjb2xzXCI7XHJcblx0cHVibGljIHN0YXRpYyBST1dTICAgID0gXCJyb3dzXCI7XHJcblx0cHVibGljIHN0YXRpYyBSRVNJWkVSID0gXCJyZXNpemVyXCI7XHJcblx0cHVibGljIHN0YXRpYyBST09UICAgID0gXCJyb290O1wiXHJcblx0cHVibGljIHN0YXRpYyBIRUFERVIgID0gXCJoZWFkZXJcIjtcclxuXHRwdWJsaWMgc3RhdGljIFBPUlRMRVQgPSBcInBvcnRsZXRcIjtcclxuXHQvL2VuZHJlZ2lvblxyXG5cdC8vcmVnaW9uIENsYXNzIE1ldGhvZHNcclxuXHRwdWJsaWMgc3RhdGljIENyZWF0ZUNvbHVtbnMoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFBvcnRhbENvbHVtbigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBDcmVhdGVSb3dzKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxSb3coKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlUm9vdCgpIHtcclxuXHRcdHJldHVybiBuZXcgUG9ydGFsUm9vdCgpO1xyXG5cdH1cclxuXHJcblx0Ly9lbmRyZWdpb25cclxuXHRnZXQgc2Nyb2xsQmFyWCgpOmJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbEJhclg7XHJcblx0fVxyXG5cdHNldCBzY3JvbGxCYXJYKHZhbHVlOmJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX3Njcm9sbEJhclggPSB2YWx1ZTtcclxuXHR9XHJcblx0Z2V0IHNjcm9sbEJhclkoKTpib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxCYXJZO1xyXG5cdH1cclxuXHRzZXQgc2Nyb2xsQmFyWSh2YWx1ZTpib29sZWFuKSB7XHJcblx0XHR0aGlzLl9zY3JvbGxCYXJZID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lID0gXCJub1NlY3Rpb25OYW1lXCIpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsU2VjdGlvbl9cIik7XHJcblx0XHR0aGlzLnRoZUFycmF5ICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHRoaXMucG9ydGxldE5hbWUgPSBuYW1lO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZFBvcnRsZXQobmFtZSwgZ3Jhdml0eSA9IDEpOlBvcnRsZXQge1xyXG5cdFx0dmFyIHBvcnRsZXQgPSBuZXcgUG9ydGxldChuYW1lLCBncmF2aXR5KTtcclxuXHRcdHRoaXMudGhlQXJyYXkucHVzaChwb3J0bGV0KTtcclxuXHRcdHJldHVybiBwb3J0bGV0O1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkU2VjdGlvbih0aGVTZWN0aW9uOlBvcnRhbFNlY3Rpb24sIGdyYXZpdHkgPSAxKSB7XHJcblx0XHR0aGlzLnRoZUFycmF5LnB1c2godGhlU2VjdGlvbik7XHJcblx0XHR0aGlzLmdyYXZpdHkgPSBncmF2aXR5XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRSZXNpemVyKCk6UG9ydGFsU2VjdGlvbiB7XHJcblx0XHR2YXIgcmVzaXplciA9IG5ldyBQb3J0YWxSZXNpemVyKCk7XHJcblx0XHR0aGlzLnRoZUFycmF5LnB1c2gocmVzaXplcik7XHJcblx0XHRyZXR1cm4gcmVzaXplcjtcclxuXHR9XHJcblx0cHVibGljIGFkZEhlYWRlcih0aXRsZTpzdHJpbmcpOlBvcnRhbEhlYWRlciB7XHJcblx0XHR2YXIgaGVhZGVyID0gbmV3IFBvcnRhbEhlYWRlcih0aXRsZSk7XHJcblx0XHR0aGlzLnRoZUFycmF5LnVuc2hpZnQoaGVhZGVyKTtcclxuXHRcdHRoaXMuc2VjdGlvbkhlYWRlciA9IGhlYWRlcjtcclxuXHRcdHJldHVybiBoZWFkZXI7XHJcblx0fVxyXG5cdHB1YmxpYyByZW1vdmVIZWFkZXIoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2VjdGlvbkhlYWRlcikgcmV0dXJuO1xyXG5cdFx0dGhpcy50aGVBcnJheS5zaGlmdCgpO1xyXG5cdH1cclxuXHJcblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMudGVtcGxhdGVbXCJncmF2aXR5XCJdID0gdGhpcy5ncmF2aXR5O1xyXG5cdFx0dGhpcy50ZW1wbGF0ZVtcImlkXCJdICAgICAgPSB0aGlzLmNvbXBvbmVudElEO1xyXG5cdFx0dGhpcy50ZW1wbGF0ZVtcImRyYWdcIl0gICAgPSB0cnVlO1xyXG5cdFx0aWYgKHRoaXMuc2Nyb2xsQmFyWCAmJiB0aGlzLnNjcm9sbEJhclkpIHtcclxuXHRcdFx0dGhpcy50ZW1wbGF0ZVtcInNjcm9sbHh5XCJdID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5zY3JvbGxCYXJYKVxyXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseFwiXSA9IHRydWU7IGVsc2UgaWYgKHRoaXMuc2Nyb2xsQmFyWSlcclxuXHRcdFx0dGhpcy50ZW1wbGF0ZVtcInNjcm9sbHlcIl0gPSB0cnVlO1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcGxhdGU7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnRoZUFycmF5KSB7XHJcblx0XHRcdHRoaXMudGhlQXJyYXlbaXRlbV0uaW5pdGlhbGl6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly9lbmRyZWdpb25cclxufSB0aGlzLlBvcnRhbFNlY3Rpb24gPSBQb3J0YWxTZWN0aW9uO1xyXG5cclxuY2xhc3MgUG9ydGFsQ29sdW1uIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XHJcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XHJcblx0XHRzdXBlcihuYW1lKTtcclxuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ID0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TO1xyXG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkNPTFVNTlM7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsQ29sdW1uX1wiKTtcclxuXHR9XHJcbn0gdGhpcy5Qb3J0YWxDb2x1bW4gPSBQb3J0YWxDb2x1bW5cclxuXHJcbmNsYXNzIFBvcnRhbFJvb3QgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG5hbWUpO1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPT1Q7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICA9IFwicm9vdFwiO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFJvb3RfXCIpO1xyXG5cdH1cclxufSB0aGlzLlBvcnRhbFJvb3QgPSBQb3J0YWxSb290XHJcblxyXG5jbGFzcyBQb3J0YWxSb3cgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lPzpzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG5hbWUpO1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICA9IFwicm93XCI7XHJcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsUm93X1wiKTtcclxuXHR9XHJcbn10aGlzLlBvcnRhbFJvdyA9IFBvcnRhbFJvdztcclxuXHJcbmNsYXNzIFBvcnRhbEhlYWRlciBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cdHB1YmxpYyBoZWFkZXJUZW1wbGF0ZSAgICA9IHt2aWV3OiBcInRlbXBsYXRlXCIsIHRlbXBsYXRlOiBcIkhlYWRlclwiLCB0eXBlOiBcImhlYWRlclwifTtcclxuXHRwdWJsaWMgaGVhZGVyVmlldzphbnk7XHJcblx0cHVibGljIGhlYWRlclRleHQ6c3RyaW5nID0gbnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IodGl0bGU6c3RyaW5nKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbEhlYWRlcl9cIik7XHJcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5IRUFERVI7XHJcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5IRUFERVI7XHJcblx0XHR0aGlzLmhlYWRlclRlbXBsYXRlW1wiaWRcIl0gICAgICAgPSBcImhlYWRlcl9cIiArIHdlYml4LnVpZCgpO1xyXG5cdFx0dGhpcy5oZWFkZXJUZW1wbGF0ZVtcInRlbXBsYXRlXCJdID0gdGl0bGU7XHJcblx0XHR0aGlzLmhlYWRlclRleHQgICAgICAgICAgICAgICAgID0gdGl0bGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oZWFkZXJUZW1wbGF0ZTtcclxuXHR9XHJcbn10aGlzLlBvcnRhbEhlYWRlciA9IFBvcnRhbEhlYWRlcjtcclxuY2xhc3MgUG9ydGFsUmVzaXplciBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cdHB1YmxpYyAgcmVzaXplclRlbXBsYXRlID0ge3ZpZXc6IFwicmVzaXplclwifTtcclxuXHJcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XHJcblx0XHRzdXBlcihuYW1lKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSZXNpemVyX1wiKTtcclxuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ICAgID0gUG9ydGFsU2VjdGlvbi5SRVNJWkVSO1xyXG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLlJFU0laRVI7XHJcblx0XHR0aGlzLnJlc2l6ZXJUZW1wbGF0ZVtcImlkXCJdID0gXCJ1aVJlc2l6ZXJfXCIgKyB3ZWJpeC51aWQoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHJldHVybiB0aGlzLnJlc2l6ZXJUZW1wbGF0ZTtcclxuXHR9XHJcbn10aGlzLlBvcnRhbFJlc2l6ZXIgPSBQb3J0YWxSZXNpemVyO1xyXG5cclxuY2xhc3MgUG9ydGxldCBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xyXG5cclxuXHQvL3JlZ2lvbiBJbnN0YW5jZSBWYXJpYWJsZXNcclxuXHRwdWJsaWMgcG9ydGxldFZpZXc6YW55O1xyXG5cdHB1YmxpYyBwb3J0bGV0Q29tcG9uZW50Vmlldzphbnk7XHJcblx0cHVibGljIGRlZmF1bHRQb3J0bGV0Vmlldzphbnk7XHJcblx0cHVibGljIG5vbkNvbXBvbmVudFZpZXc6YW55ID0gbnVsbDtcclxuXHRwdWJsaWMgaW50ZXJuYWxWaWV3OmFueVxyXG5cdHB1YmxpYyBncmF2aXR5Om51bWJlcjtcclxuXHRwdWJsaWMgdmlld0NvbnRyb2xsZXI6VUlDb21wb25lbnQ7XHJcblx0cHVibGljIGhpZGRlbjpib29sZWFuICAgICAgID0gZmFsc2U7XHJcblx0Ly9lbmRyZWdpb25cclxuXHRwdWJsaWMgc3RhdGljIGNhc3QoYVNlY3Rpb246YW55KTpQb3J0bGV0IHtcclxuXHRcdHJldHVybiA8UG9ydGxldD4gYVNlY3Rpb247XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwb3J0bGV0TmFtZTpzdHJpbmcsIGdyYXZpdHkgPSAxKSB7XHJcblx0XHRzdXBlcihwb3J0bGV0TmFtZSk7XHJcblx0XHR0aGlzLmdyYXZpdHkgICAgICAgICAgICAgID0gZ3Jhdml0eTtcclxuXHRcdHRoaXMucG9ydGxldFZpZXcgICAgICAgICAgPSB7aWQ6IHRoaXMuY29tcG9uZW50SUQsIG1pbldpZHRoOiAxMDAsIHRlbXBsYXRlOiBcIkNvbnRlbnRcIiwgdmlldzogXCJ0ZW1wbGF0ZVwifVxyXG5cdFx0dGhpcy5wb3J0bGV0Q29tcG9uZW50VmlldyA9IHt0eXBlOiBcImxpbmVcIn1cclxuXHRcdHRoaXMuZGVmYXVsdFBvcnRsZXRWaWV3ICAgPSB0aGlzLnBvcnRsZXRWaWV3O1xyXG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggICA9IFBvcnRhbFNlY3Rpb24uUE9SVExFVDtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0bGV0X1wiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZXBsYWNlVmlldygpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0VmlldygpLCBudWxsLCA2KSk7XHJcblx0XHR3ZWJpeC51aSh0aGlzLmdldFZpZXcoKSwgJCQodGhpcy5jb21wb25lbnRJRCkpO1xyXG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmdldFZpZXcoKSwgbnVsbCwgNikpO1xyXG5cdH1cclxuXHRwdWJsaWMgaGlkZSgpIHtcclxuXHRcdHRoaXMuaGlkZGVuID0gdHJ1ZTtcclxuXHR9XHJcblx0cHVibGljIHNob3coKSB7XHJcblx0XHR0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG5cdH1cclxuXHRwdWJsaWMgcmVzZXRWaWV3KCkge1xyXG5cdFx0dGhpcy5wb3J0bGV0VmlldyA9IHRoaXMuZGVmYXVsdFBvcnRsZXRWaWV3XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnQodGhlQ29tcG9uZW50OlVJQ29tcG9uZW50KSB7XHJcblx0XHR0aGlzLnZpZXdDb250cm9sbGVyID0gdGhlQ29tcG9uZW50O1xyXG5cdH1cclxuXHRwdWJsaWMgcmVzaXplKCkge1xyXG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XHJcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudHMgTWV0aG9kc1xyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdGlmICh0aGlzLnZpZXdDb250cm9sbGVyKSB7XHJcblx0XHRcdHZhciB2aWV3QXJyYXkgICAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRcdHRoaXMucG9ydGxldFZpZXcgICAgICAgICA9IHRoaXMucG9ydGxldENvbXBvbmVudFZpZXc7XHJcblx0XHRcdHZhciBjb250cm9sbGVyVmlldyAgICAgICA9IHRoaXMudmlld0NvbnRyb2xsZXIuZ2V0VmlldygpO1xyXG5cdFx0XHR2aWV3QXJyYXlbMF0gICAgICAgICAgICAgPSBjb250cm9sbGVyVmlldztcclxuXHRcdFx0dGhpcy5wb3J0bGV0Vmlld1tcInJvd3NcIl0gPSB2aWV3QXJyYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXc7XHJcblx0XHR9XHJcblx0XHR0aGlzLnBvcnRsZXRWaWV3W1wiaWRcIl0gICAgICA9IHRoaXMuZ2V0Q29tcG9uZW50SUQoKTtcclxuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJncmF2aXR5XCJdID0gdGhpcy5ncmF2aXR5O1xyXG5cdFx0dGhpcy5wb3J0bGV0Vmlld1tcImRyYWdcIl0gICAgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIHRoaXMucG9ydGxldFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0aWYgKHRoaXMudmlld0NvbnRyb2xsZXIpIHtcclxuXHRcdFx0dGhpcy52aWV3Q29udHJvbGxlci5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMudGhlQXJyYXkpIHtcclxuXHRcdFx0dGhpcy50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vZW5kcmVnaW9uXHJcbn0gdGhpcy5Qb3J0bGV0ID0gUG9ydGxldDtcclxuXHJcbmVudW0gUG9ydGFsVHlwZSB7IE9uZVZpZXcsIEV4cGxvcmVyVmlldywgRGV0YWlsVmlldyB9dGhpcy5Qb3J0YWxUeXBlID0gUG9ydGFsVHlwZTtcclxuZW51bSBQb3J0YWxOYW1lcyB7RVhQTE9SRVIgPSAwLCBERVRBSUwgPSAxLCBNQUlOID0gMiwgSU5GTyA9IDN9dGhpcy5Qb3J0YWxOYW1lcyA9IFBvcnRhbE5hbWVzO1xyXG5cclxuY2xhc3MgUG9ydGFsIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cdHB1YmxpYyBwb3J0YWxSb290OlBvcnRhbFJvb3Q7XHJcblx0cHVibGljIHBvcnRhbENvbnRhaW5lcjpzdHJpbmcgPSBudWxsO1xyXG5cdHB1YmxpYyB2aWV3UG9ydGxldDpQb3J0bGV0ICAgID0gbnVsbDtcclxuXHRwdWJsaWMgcG9ydGFsVHlwZTpQb3J0YWxUeXBlO1xyXG5cdHB1YmxpYyBuZXdWaWV3UG9ydDpib29sZWFuICAgID0gZmFsc2U7XHJcblx0cHVibGljIHZpZXdUeXBlICAgICAgICAgICAgICAgPSBudWxsO1xyXG5cdHB1YmxpYyBzZWN0aW9uVGVtcGxhdGUgICAgICAgID0ge3R5cGU6IFwibGluZVwifTtcclxuXHJcblx0Y29uc3RydWN0b3IocG9ydGFsVHlwZT86UG9ydGFsVHlwZSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxfXCIpO1xyXG5cdFx0dGhpcy5wb3J0YWxSb290ID0gbmV3IFBvcnRhbFJvb3QoKTtcclxuXHRcdGlmICghcG9ydGFsVHlwZSkge1xyXG5cdFx0XHRzd2l0Y2ggKHBvcnRhbFR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIFBvcnRhbFR5cGUuT25lVmlldyA6XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplT25lVmlldygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5FeHBsb3JlclZpZXcgOlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5EZXRhaWxWaWV3IDpcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemVEZXRhaWxWaWV3KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBwb3J0YWxTdHJpbmcocG9ydGFsTmFtZXM6UG9ydGFsTmFtZXMpIHtcclxuXHRcdHN3aXRjaCAocG9ydGFsTmFtZXMpIHtcclxuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5FWFBMT1JFUiA6XHJcblx0XHRcdFx0cmV0dXJuIFwiZXhwbG9yZXJcIjtcclxuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5ERVRBSUwgOlxyXG5cdFx0XHRcdHJldHVybiBcImRldGFpbEFyZWFcIjtcclxuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5NQUlOIDpcclxuXHRcdFx0XHRyZXR1cm4gXCJtYWluXCI7XHJcblx0XHRcdGNhc2UgUG9ydGFsTmFtZXMuSU5GTyA6XHJcblx0XHRcdFx0cmV0dXJuIFwiaW5mb1wiO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHRyZXR1cm4gXCJOT05BTUVcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemVFeHBsb3JlclZpZXcoKSB7XHJcblx0XHR2YXIgcm9vdCAgICAgID0gdGhpcy5nZXRSb290KCk7XHJcblx0XHR2YXIgbmV3Q29sdW1uID0gdGhpcy5jcmVhdGVDb2x1bW5zKFwiY29sdW1uc1wiKTtcclxuXHRcdHZhciBuZXdSb3cgICAgPSB0aGlzLmNyZWF0ZVJvd3MoXCJyb3dzXCIpO1xyXG5cdFx0cm9vdC5hZGRTZWN0aW9uKG5ld0NvbHVtbik7XHJcblx0XHRuZXdDb2x1bW4uYWRkUG9ydGxldChQb3J0YWxOYW1lcy5FWFBMT1JFUik7XHJcblx0XHRuZXdDb2x1bW4uYWRkUmVzaXplcigpO1xyXG5cdFx0bmV3Um93LmFkZFBvcnRsZXQoUG9ydGFsTmFtZXMuREVUQUlMKTtcclxuXHRcdG5ld1Jvdy5hZGRSZXNpemVyKCk7XHJcblx0XHRuZXdSb3cuYWRkUG9ydGxldChQb3J0YWxOYW1lcy5JTkZPKTtcclxuXHRcdG5ld0NvbHVtbi5hZGRTZWN0aW9uKG5ld1Jvdyk7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplT25lVmlldygpIHtcclxuXHRcdHZhciByb290ICAgICAgPSB0aGlzLmdldFJvb3QoKTtcclxuXHRcdHZhciBuZXdDb2x1bW4gPSB0aGlzLmNyZWF0ZUNvbHVtbnMoXCJjb2x1bW5zXCIpO1xyXG5cdFx0cm9vdC5hZGRTZWN0aW9uKG5ld0NvbHVtbik7XHJcblx0XHRuZXdDb2x1bW4uYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5NQUlOKSk7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplRGV0YWlsVmlldygpIHtcclxuXHRcdHZhciByb290ICAgPSB0aGlzLmdldFJvb3QoKTtcclxuXHRcdHZhciBuZXdSb3cgPSB0aGlzLmNyZWF0ZVJvd3MoXCJyb3dzXCIpO1xyXG5cdFx0cm9vdC5hZGRTZWN0aW9uKG5ld1Jvdyk7XHJcblx0XHRuZXdSb3cuYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5ERVRBSUwpKTtcclxuXHRcdG5ld1Jvdy5hZGRSZXNpemVyKCk7XHJcblx0XHRuZXdSb3cuYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5JTkZPKSk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRSb290KCk6UG9ydGFsUm9vdCB7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3J0YWxSb290O1xyXG5cdH1cclxuXHRwdWJsaWMgY3JlYXRlQ29sdW1ucyhuYW1lPyk6UG9ydGFsQ29sdW1uIHtcclxuXHRcdHJldHVybiBuZXcgUG9ydGFsQ29sdW1uKG5hbWUpO1xyXG5cdH1cclxuXHRwdWJsaWMgY3JlYXRlUm93cyhuYW1lPzpzdHJpbmcpOlBvcnRhbFJvdyB7XHJcblx0XHRyZXR1cm4gbmV3IFBvcnRhbFJvdyhuYW1lKTtcclxuXHR9XHJcblx0cHVibGljIHNldENvbnRhaW5lcihjb250YWluZXJJRDpzdHJpbmcpIHtcclxuXHRcdHRoaXMucG9ydGFsQ29udGFpbmVyID0gY29udGFpbmVySUQ7XHJcblx0XHR0aGlzLnZpZXdQb3J0bGV0ICAgICA9IG51bGw7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRWaWV3UG9ydGxldCh0aGVQb3J0bGV0OlBvcnRsZXQpIHtcclxuXHRcdHRoaXMudmlld1BvcnRsZXQgICAgID0gdGhlUG9ydGxldDtcclxuXHRcdHRoaXMucG9ydGFsQ29udGFpbmVyID0gXCJcIjtcclxuXHR9XHJcblx0cHVibGljIGdldFBvcnRsZXQocG9ydGFsTmFtZTpzdHJpbmcpOlBvcnRsZXQge1xyXG5cdFx0cmV0dXJuIFBvcnRsZXQuY2FzdCh0aGlzLmZpbmQodGhpcy5wb3J0YWxSb290LCBwb3J0YWxOYW1lKSk7XHJcblx0fVxyXG5cdHB1YmxpYyBmaW5kKHBvcnRhbFNlY3Rpb246UG9ydGFsU2VjdGlvbiwgbmFtZSk6UG9ydGFsU2VjdGlvbiB7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHBvcnRhbFNlY3Rpb24udGhlQXJyYXkpIHtcclxuXHRcdFx0aWYgKHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGxldE5hbWUgPT0gbmFtZSlcclxuXHRcdFx0XHRyZXR1cm4gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXTtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuZmluZCg8UG9ydGFsU2VjdGlvbj4gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXSwgbmFtZSk7XHJcblx0XHRcdGlmIChyZXN1bHQpXHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciB0aGVWaWV3ICAgPSB0aGlzLnNlY3Rpb25UZW1wbGF0ZTtcclxuXHRcdHRoZVZpZXdbXCJpZFwiXSAgID0gdGhpcy5nZXRDb21wb25lbnRJRCgpO1xyXG5cdFx0dmlld0FycmF5WzBdICAgID0gdGhpcy5jcmVhdGVQb3J0YWxWaWV3KCk7XHJcblx0XHR0aGVWaWV3W1wicm93c1wiXSA9IHZpZXdBcnJheTtcclxuXHRcdGlmICh0aGlzLnZpZXdUeXBlKVxyXG5cdFx0XHR0aGVWaWV3W1widmlld1wiXSA9IHRoaXMudmlld1R5cGU7XHJcblx0XHR0aGlzLnNldENvbXBvbmVudFZpZXcodGhlVmlldyk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgY3JlYXRlUG9ydGFsVmlldygpOmFueSB7XHJcblx0XHR2YXIgdGhlUG9ydGFsVmlldzpQb3J0bGV0O1xyXG5cdFx0dmFyIHJlc3VsdEFycmF5ID0gdGhpcy50cmVlKHRoaXMucG9ydGFsUm9vdCk7XHJcblx0XHRyZXR1cm4gcmVzdWx0QXJyYXlbMF07XHJcblx0fVxyXG5cdHB1YmxpYyB0cmVlKHBvcnRhbFNlY3Rpb246UG9ydGFsU2VjdGlvbik6QXJyYXk8YW55PiB7XHJcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5KSB7XHJcblx0XHRcdGluZGV4ID0gUG9ydGFsU2VjdGlvbi5ST1dTO1xyXG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXgpXHJcblx0XHRcdFx0aWYgKHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4ID09IFBvcnRhbFNlY3Rpb24uQ09MVU1OUyB8fCBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleCA9PSBQb3J0YWxTZWN0aW9uLlJPV1MpXHJcblx0XHRcdFx0XHR2YXIgaW5kZXggPSBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleDtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0uZ2V0VmlldygpO1xyXG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS50aGVBcnJheS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dmFyIHJlc3VsdEFycmF5ID0gdGhpcy50cmVlKDxQb3J0YWxTZWN0aW9uPiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dKTtcclxuXHRcdFx0XHRyZXN1bHRbaW5kZXhdICAgPSByZXN1bHRBcnJheTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm5BcnJheS5wdXNoKHJlc3VsdClcclxuXHRcdFx0Ly8gIGNvbnNvbGUubG9nKFwiUmV0dXJuaW5nIFJlc3VsdFwiK0M0bG9nLnByaW50VGhpcyhyZXN1bHQpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5BcnJheTtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemVUcmVlKCkge1xyXG5cdFx0dmFyIHJldHVybkFycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wb3J0YWxSb290LnRoZUFycmF5KSB7XHJcblx0XHRcdHRoaXMucG9ydGFsUm9vdC50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0dXJuQXJyYXk7XHJcblx0fVxyXG5cdHB1YmxpYyByZWZyZXNoKCkge1xyXG5cdFx0dGhpcy5zaG93KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzaG93KHRoZVdpbmRvdz86YW55KTphbnkge1xyXG5cdFx0dmFyIHNob3dWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XHJcblx0XHR2YXIgeFZpZXc6YW55O1xyXG5cdFx0aWYgKHRoZVdpbmRvdykge1xyXG5cdFx0XHR2YXIgcm93cyAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRcdHJvd3NbMF0gICAgICAgICAgID0gc2hvd1ZpZXc7XHJcblx0XHRcdHRoZVdpbmRvd1tcInJvd3NcIl0gPSByb3dzO1xyXG5cdFx0XHRBcHBMb2cucHJpbnRUaGlzKHRoZVdpbmRvdyk7XHJcblx0XHRcdHhWaWV3ID0gd2ViaXgudWkodGhlV2luZG93KS5zaG93KCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wb3J0YWxDb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5jb21wb25lbnRWaWV3W1wiY29udGFpbmVyXCJdID0gdGhpcy5wb3J0YWxDb250YWluZXI7XHJcblx0XHRcdHtcclxuXHRcdFx0XHRBcHBMb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcclxuXHRcdFx0XHR4VmlldyA9IHdlYml4LnVpKHNob3dWaWV3LCB0aGlzLnBvcnRhbENvbnRhaW5lcik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEFwcExvZy5wcmludFRoaXMoc2hvd1ZpZXcpO1xyXG5cdFx0XHR4VmlldyA9IHdlYml4LnVpKHNob3dWaWV3LCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcclxuXHRcdC8vY29uc29sZS5sb2coXCJTaG93IFZpZXdcIik7XHJcblx0XHQvL0M0bG9nLnByaW50VGhpcyhzaG93Vmlldyk7XHJcblx0XHRyZXR1cm4geFZpZXc7XHJcblx0fVxyXG5cdHB1YmxpYyBwb3B1cCh0aGVXaW5kb3c6YW55KSB7XHJcblx0XHR2YXIgc2hvd1ZpZXcgPSB0aGlzLmdldFZpZXcoKTtcclxuXHRcdHZhciByb3dzICAgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHJvd3NbMF0gICAgICAgICAgID0gc2hvd1ZpZXc7XHJcblx0XHR0aGVXaW5kb3dbXCJib2R5XCJdID0gQzRPYmplY3QuQ2xvbmUoc2hvd1ZpZXcpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGVXaW5kb3cpKTtcclxuXHRcdHZhciBuZXdXaW5kb3cgPSB3ZWJpeC51aSh0aGVXaW5kb3cpO1xyXG5cdFx0cmV0dXJuIG5ld1dpbmRvdztcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHR9XHJcblx0cHVibGljIGluaXRpYWxpemUoKSB7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XHJcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcclxuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmluaXRpYWxpemVUcmVlKCk7XHJcblx0fVxyXG5cclxufSB0aGlzLlBvcnRhbCA9IFBvcnRhbDtcclxuXHJcbmNsYXNzIFVJUG9wdXBXaW5kb3cgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cdHB1YmxpYyBzdGF0aWMgQ2xvc2VCdXR0b24oKSB7XHJcblx0XHR2YXIgdGhlSUQgICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlDb21wb25lbnQ+ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcclxuXHRcdCQkKHRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKS5jbG9zZSgpO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIEZ1bGxTY3JlZW4oKSB7XHJcblx0XHR2YXIgdGhlSUQgICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcclxuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlQb3B1cFdpbmRvdz4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xyXG5cdFx0dGhlQ29tcG9uZW50LmZ1bGxzY3JlZW5Ub2dnbGUoKTtcclxuXHR9XHJcblxyXG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xyXG5cdHB1YmxpYyB0aXRsZTpzdHJpbmc7XHJcblx0cHVibGljIHJlc2l6ZTpib29sZWFuID0gZmFsc2U7XHJcblx0cHVibGljIG1vZGFsOmJvb2xlYW4gID0gdHJ1ZTtcclxuXHRwdWJsaWMgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50O1xyXG5cdHB1YmxpYyB0aGVQb3J0YWwgICAgICA9IG5ldyBQb3J0YWwoKTtcclxuXHRwdWJsaWMgY2xvc2VCdXR0b25JRCAgPSBcImNsb3NlQnV0dG9uX1wiICsgd2ViaXgudWlkKCk7XHJcblx0cHVibGljIGZ1bGxzY3JlZW5JRCAgID0gXCJmdWxsU2NyZWVuSURfXCIrd2ViaXgudWlkKCk7XHJcblx0cHVibGljIHdpZHRoICAgICAgICAgID0gNTAwO1xyXG5cdHB1YmxpYyBoZWlnaHQgICAgICAgICA9IDUwMDtcclxuXHQvL2VuZHJlZ2lvblxyXG5cdGNvbnN0cnVjdG9yKGxhYmVsOnN0cmluZyA9IFwiUG9wdXAgV2luZG93XCIsIHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCA9IG51bGwpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMgKCB7IHdpZHRoIDogdGhpcy53aWR0aCwgaGVpZ2h0IDogdGhpcy5oZWlnaHQgfSlcclxuXHRcdHRoaXMuc2V0SUQoXCJVSVBvcHVwV2luZG93X1wiKTtcclxuXHRcdHZhciBwb3J0YWxSb290ID0gdGhpcy50aGVQb3J0YWwuZ2V0Um9vdCgpO1xyXG5cdFx0dmFyIHJvd3MgPSB0aGlzLnRoZVBvcnRhbC5jcmVhdGVSb3dzKCk7XHJcblx0XHRyb3dzLmFkZFBvcnRsZXQoXCJtYWluXCIpO1xyXG5cdFx0cG9ydGFsUm9vdC5hZGRTZWN0aW9uKChyb3dzKSk7XHJcblx0XHR0aGlzLnNldENvbXBvbmVudCh0aGVDb21wb25lbnQpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRMYWJlbCA9IGxhYmVsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudCh0aGVDb21wb25lbnQ6VUlDb21wb25lbnQpIHtcclxuXHRcdHRoaXMudGhlQ29tcG9uZW50ID0gdGhlQ29tcG9uZW50O1xyXG5cdFx0dGhpcy50aGVQb3J0YWwuZ2V0UG9ydGxldChcIm1haW5cIikuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcImNvbXBvbmVudFwiLCB0aGVDb21wb25lbnQpO1xyXG5cdH1cclxuXHRwdWJsaWMgc2hvdyh0aGVDb21wb25lbnQ/OlVJQ29tcG9uZW50KSB7XHJcblx0XHRpZiAodGhlQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50aGVDb21wb25lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0QXBwTG9nLmVycm9yKFwiVHJ5aW5nIHRvIFNob3cgV2luZG93IFdpdGggTWlzc2luZyBWaWV3XCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR2YXIgcG9wdXAgPSB0aGlzLnRoZVBvcnRhbC5wb3B1cCh0aGlzLmdldFZpZXcoKSk7XHJcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcclxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuUG9wdXApO1xyXG5cdFx0cG9wdXAuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGZ1bGxzY3JlZW5Ub2dnbGUoKSB7XHJcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmNvbmZpZy5mdWxsc2NyZWVuID0gISQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuY29uZmlnLmZ1bGxzY3JlZW5cclxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5yZXNpemUoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGhpZGUoKSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCB0aGlzKTtcclxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuQ2xvc2VEaWFncmFtKTtcclxuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XHJcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgY2xvc2UoKSB7XHJcblx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCB0aGlzKTtcclxuXHRcdGlmICgkJCh0aGlzLnRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKSkge1xyXG5cdFx0XHQkJCh0aGlzLnRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKS5kZXN0cnVjdG9yKCk7XHJcblx0XHR9XHJcblx0XHRVSS5QbGF5U291bmQoU291bmRzLkNsb3NlRGlhZ3JhbSk7XHJcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xyXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmNsb3NlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcclxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHR2aWV3ICAgIDogXCJ3aW5kb3dcIixcclxuXHRcdFx0aWQgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXHJcblx0XHRcdGNzcyAgICAgOiBcImM0cG9wdXAgYW5pbWF0ZWQgem9vbUluXCIsXHJcblx0XHRcdHBvc2l0aW9uOiBcImNlbnRlclwiLFxyXG5cdFx0XHRtb2RhbCAgIDogdHJ1ZSxcclxuXHRcdFx0bW92ZSAgICA6IHRydWUsXHJcblx0XHRcdHNjcm9sbHh5OiB0cnVlLFxyXG5cdFx0XHRoaWRkZW4gIDogdHJ1ZSxcclxuXHRcdFx0cmVzaXplICA6IHRydWUsXHJcblx0XHRcdGhlYWQgICAgOiB7XHJcblx0XHRcdFx0dmlldzogXCJ0b29sYmFyXCIsIG1hcmdpbjogLTQsIHBvc2l0aW9uOiBcImNlbnRlclwiLCBjb2xzOiBbXHJcblx0XHRcdFx0XHQge3ZpZXc6IFwibGFiZWxcIiwgbGFiZWw6IHRoaXMuY29tcG9uZW50TGFiZWx9LFxyXG5cdFx0XHRcdFx0IHt2aWV3IDogXCJpY29uXCIsaWQgOiB0aGlzLmZ1bGxzY3JlZW5JRCxpY29uIDogXCJhcnJvd3MtYWx0XCIsY3NzICA6IFwiYWx0ZXJcIixjbGljazogVUlQb3B1cFdpbmRvdy5GdWxsU2NyZWVufSxcclxuXHRcdCAgICAgICAgICAgICB7dmlldyA6IFwiaWNvblwiLGlkIDogdGhpcy5jbG9zZUJ1dHRvbklELGljb24gOiBcInRpbWVzLWNpcmNsZVwiLGNzcyAgOiBcImFsdGVyXCIsY2xpY2s6IFVJUG9wdXBXaW5kb3cuQ2xvc2VCdXR0b259XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0Ly8gdGhpcy50aGVDb21wb25lbnQuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0JCQodGhpcy5jbG9zZUJ1dHRvbklEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XHJcblx0XHQkJCh0aGlzLmZ1bGxzY3JlZW5JRClbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xyXG5cdFx0JCQodGhpcy5jb21wb25lbnRJRClbXCJjb21wb25lbnRcIl0gICA9IHRoaXM7XHJcblx0fVxyXG5cdC8vZW5kcmVnaW9uXHJcbn0gdGhpcy5VSVBvcHVwV2luZG93ID0gVUlQb3B1cFdpbmRvdztcclxuXHJcbmNsYXNzIENvbmZpcm1BY3Rpb24ge1xyXG5cdGxhYmVsOnN0cmluZztcclxuXHRldmVudDpzdHJpbmc7XHJcbn0gdGhpcy5Db25maXJtQWN0aW9uID0gQ29uZmlybUFjdGlvbjtcclxuXHJcbmNsYXNzIFVJQ29uZmlybVdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblx0cHJvdGVjdGVkIHBvcHVwOlVJUG9wdXBXaW5kb3c7XHJcblx0cHVibGljIHRpdGxlOnN0cmluZztcclxuXHRwdWJsaWMgc3RhdGVtZW50OnN0cmluZztcclxuXHRwdWJsaWMgb3B0aW9uMTpDb25maXJtQWN0aW9uO1xyXG5cdHB1YmxpYyBvcHRpb24yOkNvbmZpcm1BY3Rpb247XHJcblx0cHVibGljIG9wdGlvbjM6Q29uZmlybUFjdGlvbjtcclxuXHJcblx0Y29uc3RydWN0b3IodGl0bGU6c3RyaW5nLCBzdGF0ZW1lbnQ6c3RyaW5nLCBvcHRpb24xOkNvbmZpcm1BY3Rpb24sIG9wdGlvbjI6Q29uZmlybUFjdGlvbiA9IG51bGwsIG9wdGlvbjM6Q29uZmlybUFjdGlvbiA9IG51bGwpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnRpdGxlICAgICA9IHRpdGxlO1xyXG5cdFx0dGhpcy5zdGF0ZW1lbnQgPSBzdGF0ZW1lbnQ7XHJcblx0XHR0aGlzLm9wdGlvbjEgICA9IG9wdGlvbjE7XHJcblx0XHR0aGlzLm9wdGlvbjIgICA9IG9wdGlvbjI7XHJcblx0XHR0aGlzLm9wdGlvbjMgICA9IG9wdGlvbjM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2xvc2UoKSB7XHJcblx0XHR0aGlzLnBvcHVwLmNsb3NlKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQ6YW55LCBvYmplY3Q6YW55LCBjYWxsZXI6VUlDb21wb25lbnQpIHtcclxuXHRcdHN3aXRjaCAoZXZlbnQpIHtcclxuXHRcdFx0Y2FzZSBcImNsaWNrXCIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYgKGNhbGxlciA9PT0gdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24xXCIpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2godGhpcy5vcHRpb24xLmV2ZW50LCB0aGlzLm9wdGlvbjEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY2FsbGVyID09PSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikpIHtcclxuXHRcdFx0XHRcdHRoaXMucHVibGlzaCh0aGlzLm9wdGlvbjIuZXZlbnQsIHRoaXMub3B0aW9uMik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjYWxsZXIgPT09IHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uM1wiKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoKHRoaXMub3B0aW9uMy5ldmVudCwgdGhpcy5vcHRpb24zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcImNsb3NlXCIgOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5wdWJsaXNoKFwiY2xvc2VcIiwgbnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xyXG5cdFx0dmFyIHRpdGxlID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnRpdGxlLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsIGxhYmVsV2lkdGg6IDEwMH0pO1xyXG5cdFx0dGhpcy5hZGRDb21wb25lbnQoXCJ0aXRsZVwiLCB0aXRsZSk7XHJcblx0XHR2YXIgdGV4dCA9IG5ldyBVSUxhYmVsKHtsYWJlbDogdGhpcy5zdGF0ZW1lbnQsIGFsaWdubWVudDogXCJjZW50ZXJcIiwgbGFiZWxXaWR0aDogMTAwfSk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcInRleHRcIiwgdGV4dCk7XHJcblx0XHR2YXIgb3B0aW9uMSA9IG5ldyBVSUJ1dHRvbih7bGFiZWw6IHRoaXMub3B0aW9uMS5sYWJlbH0pO1xyXG5cdFx0dGhpcy5hZGRDb21wb25lbnQoXCJvcHRpb24xXCIsIG9wdGlvbjEpO1xyXG5cdFx0aWYgKHRoaXMub3B0aW9uMSkge1xyXG5cdFx0XHR2YXIgb3B0aW9uMiA9IG5ldyBVSUJ1dHRvbih0aGlzLm9wdGlvbjIubGFiZWwpO1xyXG5cdFx0XHR0aGlzLmFkZENvbXBvbmVudChcIm9wdGlvbjJcIiwgb3B0aW9uMik7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb24zKSB7XHJcblx0XHRcdHZhciBvcHRpb24zID0gbmV3IFVJQnV0dG9uKHRoaXMub3B0aW9uMy5sYWJlbCk7XHJcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uM1wiLCBvcHRpb24zKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XHJcblx0XHRcdHZpZXc6IFwiZm9ybVwiLCBpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLCByb3dzOiB0aGlzLmNyZWF0ZUNvbXBvbmVudHNWaWV3KClcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblx0cHVibGljIHNob3coKSB7XHJcblx0XHR0aGlzLnBvcHVwID0gbmV3IFVJUG9wdXBXaW5kb3coXCJDb25maXJtYXRpb25cIiwgdGhpcyk7XHJcblx0XHR0aGlzLnBvcHVwLnN1YnNjcmliZShcImNsb3NlXCIsIHRoaXMpO1xyXG5cdFx0dGhpcy5wb3B1cC5zaG93KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24xXCIpLnN1YnNjcmliZShcImNsaWNrXCIsIHRoaXMpO1xyXG5cdFx0aWYgKHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKSkgdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24yXCIpLnN1YnNjcmliZShcImNsaWNrXCIsIHRoaXMpO1xyXG5cdFx0aWYgKHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uM1wiKSkgdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpLnN1YnNjcmliZShcImNsaWNrXCIsIHRoaXMpO1xyXG5cdH1cclxufSB0aGlzLlVJQ29uZmlybVdpbmRvdyA9IFVJQ29uZmlybVdpbmRvd1xyXG5cclxuY2xhc3MgVUlNdWx0aVZpZXcgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSU11bHRpVmlld19cIik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkVmlldyhsYWJlbDpzdHJpbmcsIGNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xyXG5cdFx0dGhpcy5hZGRDb21wb25lbnQobGFiZWwsIGNvbXBvbmVudCk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRSZWxhdGlvbnNoaXBPYmplY3QodGhlT2JqZWN0OmFueSkge1xyXG5cdFx0c3VwZXIuc2V0UmVsYXRpb25zaGlwT2JqZWN0KHRoZU9iamVjdCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0pIHtcclxuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5zZXRSZWxhdGlvbnNoaXBPYmplY3QodGhpcy5nZXRSZWxhdGlvbnNoaXBPYmplY3QoKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBjcmVhdGVDb21wb25lbnRzVmlldygpOmFueSB7XHJcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdHZhciBpICAgICAgICAgPSAwO1xyXG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XHJcblx0XHRcdGlmIChpdGVtICE9IFwidG9vbGJhclwiKVxyXG5cdFx0XHRcdHZpZXdBcnJheVtpKytdID0ge1xyXG5cdFx0XHRcdFx0aGVhZGVyOiBpdGVtLCBib2R5OiB0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLmdldFZpZXcoKVxyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB2aWV3QXJyYXk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcclxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSwgdmlldzogXCJ0YWJ2aWV3XCIsIGFuaW1hdGU6IHRydWUsIGNlbGxzOiB0aGlzLmNyZWF0ZUNvbXBvbmVudHNWaWV3KClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XHJcblx0fVxyXG5cclxufSB0aGlzLlVJTXVsdGlWaWV3ID0gVUlNdWx0aVZpZXc7XHJcblxyXG5jbGFzcyBVSU1lbnUgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cclxuXHRwdWJsaWMgbWVudUl0ZW1zIDogQXJyYXk8YW55PjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cdFx0dGhpcy5tZW51SXRlbXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdH1cclxuXHRwdWJsaWMgYWRkTWVudUl0ZW0obWVudSA6IGFueSkge1xyXG5cdFx0bWVudVtcImlkXCJdID0gd2ViaXgudWlkKCkrXCJfbWVudVwiO1xyXG5cdFx0dGhpcy5tZW51SXRlbXMucHVzaChtZW51KTtcclxuXHR9XHJcbn0gdGhpcy5VSU1lbnUgPSBVSU1lbnU7XHJcblxyXG5jbGFzcyBUYWJWaWV3Q2VsbCB7XHJcblx0cHVibGljIG5hbWUgICAgICAgOiBzdHJpbmc7XHJcblx0cHVibGljIHByb3BlcnRpZXMgOiBhbnk7XHJcblx0cHVibGljIGNvbXBvbmVudCAgOiBVSUNvbXBsZXhDb21wb25lbnQ7XHJcbn1cclxuXHJcbmNsYXNzIFVJVGFiVmlldyAgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cclxuXHRwdWJsaWMgcG9wdXAgICAgICAgIDogVUlQb3B1cFdpbmRvdztcclxuXHRwdWJsaWMgYW5pbWF0ZSAgICAgIDogYm9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBjZWxscyAgICAgICA6IEFycmF5PFRhYlZpZXdDZWxsPjtcclxuXHRwdWJsaWMgY2xvc2VBYmxlICAgIDogYm9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIGZpdEJpZ2dlc3QgICA6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzIDogYW55ID0gbnVsbCkge1xyXG5cdFx0c3VwZXIocHJvcGVydGllcyk7XHJcblx0XHR0aGlzLnNldElEKFwiVUlUYWJWaWV3X1wiKTtcclxuXHRcdHRoaXMuY2VsbHMgPSBuZXcgQXJyYXk8VGFiVmlld0NlbGw+KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBhZGRWaWV3KG5hbWUgOiBzdHJpbmcsIHByb3BlcnRpZXMgOiBhbnksIGNvbXBvbmVudCA6IFVJQ29tcGxleENvbXBvbmVudCkge1xyXG5cdFx0dmFyIGNlbGwgPSBuZXcgVGFiVmlld0NlbGwoKTtcclxuXHRcdGNlbGwucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcblx0XHRjZWxsLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuXHRcdGNlbGwubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNlbGxzW25hbWVdPWNlbGw7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChuYW1lLGNvbXBvbmVudCk7XHJcblx0fVxyXG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIGRhdGEsIGNhbGxlcikge1xyXG5cdFx0c3dpdGNoIChldmVudCkge1xyXG5cdFx0XHRjYXNlIFwiZXZlbnROYW1lXCI6XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdFVJLkluZm8oZXZlbnQpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgY3JlYXRlQ2VsbHMoKSA6IEFycmF5PGFueT4ge1xyXG5cdFx0dmFyIGNlbGxBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY2VsbHMpIHtcclxuXHRcdFx0dmFyIGNlbGwgPSB7IGJvZHkgOiB0aGlzLmNlbGxzW2l0ZW1dLmNvbXBvbmVudC5nZXRWaWV3KCkgIH1cclxuXHRcdFx0Zm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5jZWxsc1tpdGVtXS5wcm9wZXJ0aWVzKSB7XHJcblx0XHRcdFx0Y2VsbFtwcm9wZXJ0eV0gPSB0aGlzLmNlbGxzW2l0ZW1dLnByb3BlcnRpZXNbcHJvcGVydHldO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNlbGxBcnJheS5wdXNoKGNlbGwpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNlbGxBcnJheTtcclxuXHR9XHJcblx0cHVibGljIGdldFZpZXcoKSA6IGFueSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG5cdFx0XHRpZCAgICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHR2aWV3ICAgICAgOiBcInRhYnZpZXdcIixcclxuXHRcdFx0bXVsdGl2aWV3IDogeyBhbmltYXRlIDogdGhpcy5hbmltYXRlLCBmaXRCaWdnZXN0IDogdGhpcy5maXRCaWdnZXN0IH0sXHJcblx0XHRcdGNsb3NlICAgICA6IHRoaXMuY2xvc2VBYmxlLFxyXG5cdFx0XHR0YWJiYXIgICAgOiB7IHBvcHVwV2lkdGg6IDMwMCx0YWJNaW5XaWR0aDogMTIwIH0sXHJcblx0XHRcdGNlbGxzICAgICA6IHRoaXMuY3JlYXRlQ2VsbHMoKVxyXG5cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG5cdH1cclxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcclxuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcclxuXHR9XHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHt9XHJcblx0cHVibGljIHNob3coKSB7XHJcblx0XHR0aGlzLnBvcHVwID0gbmV3IFVJUG9wdXBXaW5kb3coXCJDb21wb25lbnQgTGFiZWwgXCIpO1xyXG5cdFx0dGhpcy5wb3B1cC5zaG93KHRoaXMpO1xyXG5cdH1cclxufSB0aGlzLlVJVGFiVmlldyA9IFVJVGFiVmlldztcclxuRmFjdG9yeS5BZGRTdHJpbmdUb0NsYXNzKFwiVUlUYWJWaWV3XCIsIFVJVGFiVmlldyk7XHJcblxyXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xyXG5cclxuXHRwdWJsaWMgcG9wdXAgICAgICAgIDogVUlQb3B1cFdpbmRvdztcclxuXHRwdWJsaWMgY29sdW1uTmFtZSAgIDogc3RyaW5nID0gbnVsbDtcclxuXHRwdWJsaWMgdGFibGUgICAgICAgIDogVUlEYXRhVGFibGUgPSBudWxsO1xyXG5cdHB1YmxpYyBkYXRhQXJyYXkgICAgOiBBcnJheTxhbnk+PW51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgOiBhbnkgPSBudWxsKSB7XHJcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcclxuXHRcdHRoaXMuc2V0SUQoXCJVSUxpc3RfXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldExpc3QoZGF0YSA6IEFycmF5PGFueT4pIHtcclxuXHJcblx0fVxyXG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIGRhdGEsIGNhbGxlcikge1xyXG5cdFx0c3dpdGNoIChldmVudCkge1xyXG5cdFx0XHRjYXNlIFwiaXRlbUNsaWNrXCI6IHtcclxuXHRcdFx0XHR0aGlzLml0ZW1DaGFuZ2UoZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBpdGVtQ2hhbmdlKGl0ZW0gOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xyXG5cdFx0dmFyIHN0YXR1cyA9IGl0ZW0ub2JqZWN0QXJyYXlbMF1bXCJzdGF0dXNcIl07XHJcblx0XHRpdGVtLm9iamVjdEFycmF5WzBdW1wic3RhdHVzXCJdID0gIXN0YXR1cztcclxuXHRcdCg8VUlEYXRhVGFibGU+dGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkucmVmcmVzaFJvdyhpdGVtLnJvd0lEKTtcclxuXHRcdHRoaXMucHVibGlzaChcIml0ZW1DaGFuZ2VcIiwgaXRlbSk7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXQobmFtZSA6IHN0cmluZywgZGF0YUFycmF5IDogQXJyYXk8YW55Pikge1xyXG5cdFx0dGhpcy5jb2x1bW5OYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuZGF0YUFycmF5ID0gZGF0YUFycmF5O1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0VmlldygpIDogYW55IHtcclxuXHRcdHRoaXMudGFibGUgPSBuZXcgVUlEYXRhVGFibGUoKTtcclxuXHRcdHRoaXMudGFibGUuYWRkQ29sdW1uKDAsIHsgaWQ6XCJzdGF0dXNcIiwgaGVhZGVyOlwiQWN0aXZlXCIsIHdpZHRoOjQwLCBjc3M6XCJjZW50ZXJcIiwgdHlwZSA6IFwidmFsdWVcIixcclxuXHRcdFx0dGVtcGxhdGU6IGZ1bmN0aW9uKG9iaix0eXBlLHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X3RhYmxlX2NoZWNrYm94IHdlYml4X2ljb24gZmEtZXllJz48L3NwYW4+XCI7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X3RhYmxlX2NoZWNrYm94IHdlYml4X2ljb24gZmEtZXllLXNsYXNoJz48L3NwYW4+XCI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy50YWJsZS5hZGRDb2x1bW4oMSwgeyBpZDpcInZhbHVlXCIsICBoZWFkZXI6dGhpcy5jb2x1bW5OYW1lLCBmaWxsc3BhY2U6MSB9KTtcclxuXHRcdHRoaXMudGFibGUuc2V0TGlzdCh0aGlzLmRhdGFBcnJheSk7XHJcblx0XHR0aGlzLmFkZENvbXBvbmVudChcInRhYmxlXCIsdGhpcy50YWJsZSk7XHJcblxyXG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcclxuXHRcdFx0aWQgOiB0aGlzLmNvbXBvbmVudElELFxyXG5cdFx0XHR2aWV3IDogXCJmb3JtXCIsXHJcblx0XHRcdHJvd3MgOiBbdGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKS5nZXRWaWV3KCldXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50VmlldztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XHJcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcclxuXHRcdGlmICh0aGlzLmdldENvbXBvbmVudChcInRhYmxlXCIpKSB7XHJcblx0XHRcdCg8VUlEYXRhVGFibGU+IHRoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikpLnN1YnNjcmliZShcIm9uSXRlbUNsaWNrXCIsdGhpcyxcIml0ZW1DbGlja1wiKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc2hvdygpIHtcclxuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyh0aGlzLmNvbHVtbk5hbWUrXCIgTGlzdCBcIik7XHJcblx0XHR0aGlzLnBvcHVwLm1vZGFsPWZhbHNlO1xyXG5cdFx0dGhpcy5wb3B1cC5zaG93KHRoaXMpO1xyXG5cdH1cclxufSB0aGlzLlVJTGlzdCA9IFVJTGlzdDtcclxuXHJcbiJdfQ==