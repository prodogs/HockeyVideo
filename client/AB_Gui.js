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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUJfR3VpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQUJfR3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXdFO0FBUXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRXJCO0lBQUE7SUFPQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEO0lBQUE7SUF3TkEsQ0FBQztJQXZOYyw4QkFBZSxHQUE3QixjQUFrQyxDQUFDO0lBQ3JCLDJCQUFZLEdBQTFCLFVBQTJCLFFBQVksRUFBRSxRQUFRO1FBQ2hELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ2EsZ0NBQWlCLEdBQS9CLFVBQWdDLE9BQU87UUFDdEMsSUFBSSxNQUFhLENBQUM7UUFDbEIsSUFBSSxhQUF5QixDQUFDO1FBQzlCLElBQUksV0FBdUIsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsTUFBTSxHQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxjQUFj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LENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7WUFDMUYsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDRixDQUFDO0lBQ00sNEJBQUksR0FBWDtRQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBQ00sNkJBQUssR0FBWjtRQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckQsQ0FBQztRQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDRixDQUFDO0lBQ0QsNEJBQTRCO0lBQ3JCLCtCQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsYUFBYSxH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Q0FBQztJQUNGLENBQUM7SUFDTSxxQkFBSSxHQUFYO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUF6RUQsQ0FBcUIsa0JBQWtCLEdBeUV0QztBQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cbmRlY2xhcmUgdmFyIHRvYXN0cjphbnk7XG5kZWNsYXJlIHZhciBDNGZvdXI6YW55O1xuZGVjbGFyZSB2YXIgZmluZENsYXNzVHlwZTphbnk7XG5kZWNsYXJlIHZhciBmaW5kSUQ6YW55O1xuZGVjbGFyZSB2YXIgRmluZElUOmFueTtcblxuZGVjbGFyZSB2YXIgYnV6ejphbnk7XG5jb25zb2xlLmxvZyhcIkxvYWRpbmcgZ3VpLnRzIC4uLlwiKTtcbmZpbmRDbGFzc1R5cGUgPSBudWxsO1xuXG5jbGFzcyBEcm9wTWVzc2FnZSB7XG5cdHB1YmxpYyBmcm9tT2JqZWN0czpBcnJheTxhbnk+O1xuXHRwdWJsaWMgZnJvbUNvbXBvbmVudDpVSUNvbXBvbmVudDtcblx0cHVibGljIHRvQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXHRwdWJsaWMgdG9PYmplY3Q6YW55O1xuXHRwdWJsaWMgY29udGV4dDphbnk7XG5cdHB1YmxpYyBldjphbnk7XG59XG5cbmNsYXNzIFVJRXZlbnRIYW5kbGVyIHtcblx0cHVibGljIHN0YXRpYyBPbkFmdGVyVGFiQ2xpY2soKSB7IH1cblx0cHVibGljIHN0YXRpYyBGaWVsZENoYW5nZWQobmV3VmFsdWU6YW55LCBvbGRWYWx1ZSkge1xuXHRcdHZhciB0aGVDb21wb25lbnRJRCA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCAgID0gPFVJVGV4dEZpZWxkPiAkJCh0aGVDb21wb25lbnRJRClbXCJjb21wb25lbnRcIl07XG5cdFx0dGhlQ29tcG9uZW50LmZpZWxkQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk6RHJvcE1lc3NhZ2Uge1xuXHRcdHZhciBmcm9tSUQ6c3RyaW5nO1xuXHRcdHZhciBmcm9tQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXHRcdHZhciB0b0NvbXBvbmVudDpVSUNvbXBvbmVudDtcblx0XHR2YXIgYXJyYXlPZk9iamVjdHMgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciB0b09iamVjdDtcblx0XHRmcm9tSUQgICA9IGNvbnRleHRbXCJmcm9tXCJdLmNvbmZpZy5pZDtcblx0XHR2YXIgdG9JRCA9IGNvbnRleHRbXCJ0b1wiXS5jb25maWcuaWQ7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0LnNvdXJjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0YXJyYXlPZk9iamVjdHMucHVzaChjb250ZXh0LmZyb20uZ2V0SXRlbShjb250ZXh0LnNvdXJjZVtpXSkpO1xuXHRcdH1cblx0XHRpZiAoJCQoZnJvbUlEKSkgZnJvbUNvbXBvbmVudCA9ICQkKGZyb21JRClbXCJjb21wb25lbnRcIl07XG5cdFx0aWYgKCQkKHRvSUQpKSB0b0NvbXBvbmVudCA9ICQkKHRvSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciBkcm9wTWVzc2FnZSA9IG5ldyBEcm9wTWVzc2FnZSgpO1xuXHRcdGRyb3BNZXNzYWdlLmZyb21Db21wb25lbnQgPSBmcm9tQ29tcG9uZW50O1xuXHRcdGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50ICAgPSB0b0NvbXBvbmVudDtcblx0XHRkcm9wTWVzc2FnZS5mcm9tT2JqZWN0cyAgID0gYXJyYXlPZk9iamVjdHM7XG5cdFx0aWYgKGNvbnRleHQudGFyZ2V0ID09IG51bGwpXG5cdFx0XHRkcm9wTWVzc2FnZS50b09iamVjdCA9IG51bGw7IGVsc2Uge1xuXHRcdFx0ZHJvcE1lc3NhZ2UudG9PYmplY3QgPSAkJCh0b0lEKS5nZXRJdGVtKGNvbnRleHQudGFyZ2V0LnJvdyk7XG5cdFx0fVxuXHRcdGRyb3BNZXNzYWdlLmNvbnRleHQgPSBjb250ZXh0O1xuXHRcdGRyb3BNZXNzYWdlLmV2ICAgICAgPSBudWxsO1xuXHRcdHJldHVybiBkcm9wTWVzc2FnZTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQmVmb3JlRHJhZ0luKGNvbnRleHQsIGV2ZW50KSB7XG5cdFx0dmFyIGRyb3BNZXNzYWdlID0gVUlFdmVudEhhbmRsZXIuQ3JlYXRlRHJvcE1lc3NhZ2UoY29udGV4dCk7XG5cdFx0aWYgKHR5cGVvZiBkcm9wTWVzc2FnZS50b0NvbXBvbmVudC5vbkJlZm9yZURyYWdJbiA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQmVmb3JlRHJhZ0luKGRyb3BNZXNzYWdlKTsgZWxzZSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgb25EcmFnT3V0KGNvbnRleHQsIGV2ZW50KSB7XG5cdFx0dmFyIGNvbnRleHQgPSB3ZWJpeC5EcmFnQ29udHJvbC5nZXRDb250ZXh0KCk7XG5cdFx0VUkuSW5mbyhcIk9uRHJhZ091dCBTdGF0aWNcIilcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dCA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dChkcm9wTWVzc2FnZSk7IGVsc2Uge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc3RhdGljIG9uQmVmb3JlRHJvcChjb250ZXh0LCBldikge1xuXG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkFmdGVyRHJvcDIoY29udGV4dCwgZXYpIHtcblxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25BZnRlckRyb3AoY29udGV4dCwgZXZlbnQpIHtcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uQWZ0ZXJEcm9wID09ICdmdW5jdGlvbicpXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25BZnRlckRyb3AoZHJvcE1lc3NhZ2UpOyBlbHNlIHtcblx0XHRcdEFwcExvZy5lcnJvcihcInBlZm9ybURyb3Agbm90IGltcGxlbWVudGVkIGZvciBvYmplY3RcIiwgbmV3IEVycm9yKCksIGRyb3BNZXNzYWdlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkJ1dHRvbkNsaWNrKGlkOnN0cmluZywgZXZlbnQpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50SUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdGlmICghJCQodGhlQ29tcG9uZW50SUQpKSByZXR1cm47XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUJ1dHRvbj4gJCQodGhlQ29tcG9uZW50SUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHRoZUNvbXBvbmVudC5vbkJ1dHRvbkNsaWNrKHRoZUNvbXBvbmVudCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkRyYWdPdXQoY29udGV4dCwgZXZlbnQpIHtcblx0XHR2YXIgY29udGV4dCA9IHdlYml4LkRyYWdDb250cm9sLmdldENvbnRleHQoKTtcblx0XHR2YXIgZHJvcE1lc3NhZ2UgPSBVSUV2ZW50SGFuZGxlci5DcmVhdGVEcm9wTWVzc2FnZShjb250ZXh0KTtcblx0XHRpZiAodHlwZW9mIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dCA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0cmV0dXJuIGRyb3BNZXNzYWdlLnRvQ29tcG9uZW50Lm9uRHJhZ091dChkcm9wTWVzc2FnZSk7IGVsc2Uge1xuXHRcdFx0QXBwTG9nLmVycm9yKFwicGVmb3JtRHJvcCBub3QgaW1wbGVtZW50ZWQgZm9yIG9iamVjdFwiLCBuZXcgRXJyb3IoKSwgZHJvcE1lc3NhZ2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQmVmb3JlRHJvcChjb250ZXh0LCBldmVudCkge1xuXHRcdHZhciBjb250ZXh0ID0gd2ViaXguRHJhZ0NvbnRyb2wuZ2V0Q29udGV4dCgpO1xuXHRcdHZhciBkcm9wTWVzc2FnZSA9IFVJRXZlbnRIYW5kbGVyLkNyZWF0ZURyb3BNZXNzYWdlKGNvbnRleHQpO1xuXHRcdGlmICh0eXBlb2YgZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcm9wID09ICdmdW5jdGlvbicpXG5cdFx0XHRyZXR1cm4gZHJvcE1lc3NhZ2UudG9Db21wb25lbnQub25CZWZvcmVEcm9wKGRyb3BNZXNzYWdlKTsgZWxzZSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJwZWZvcm1Ecm9wIG5vdCBpbXBsZW1lbnRlZCBmb3Igb2JqZWN0XCIsIG5ldyBFcnJvcigpLCBkcm9wTWVzc2FnZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25DbGljayhldjphbnksIGlkOnN0cmluZykge1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgT25JdGVtRGJsQ2xpY2soaWQsZXYsbm9kZSkge1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSAkJCh0aGlzW1wiY29uZmlnXCJdLmlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgc2VsZWN0ZWRPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0oaWQucm93KTtcblx0XHR2YXIgaXRlbU1lc3NhZ2UgPSBuZXcgSXRlbVNlbGVjdGVkRXZlbnQoKTtcblx0XHRpdGVtTWVzc2FnZS5vYmplY3RBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkucHVzaChzZWxlY3RlZE9iamVjdCk7XG5cdFx0dGhlQ29tcG9uZW50Lm9uSXRlbURibENsaWNrKGl0ZW1NZXNzYWdlKSA7XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkl0ZW1DbGljayhpZDphbnksIGV2OmFueSwgbm9kZTphbnkpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XG5cdFx0dmFyIHNlbGVjdGVkT2JqZWN0ID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKGlkLnJvdyk7XG5cdFx0dmFyIGl0ZW1NZXNzYWdlID0gbmV3IEl0ZW1TZWxlY3RlZEV2ZW50KCk7XG5cdFx0aXRlbU1lc3NhZ2Uub2JqZWN0QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGl0ZW1NZXNzYWdlLm9iamVjdEFycmF5LnB1c2goc2VsZWN0ZWRPYmplY3QpO1xuXHRcdGl0ZW1NZXNzYWdlLnJvd0lEID0gaWQucm93O1xuXHRcdHRoZUNvbXBvbmVudC5vbkl0ZW1DbGljayhpdGVtTWVzc2FnZSkgO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgb25TZWxlY3RDaGFuZ2UoKSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciByb3dpZCA9ICQkKHRoZUNvbXBvbmVudC5kYXRhVGFibGVJRCkuZ2V0U2VsZWN0ZWRJZCh0cnVlKTtcblx0XHR2YXIgc2VsZWN0ZWRPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xuXHRcdHRoZUNvbXBvbmVudC5vblNlbGVjdENoYW5nZShyb3dpZCwgc2VsZWN0ZWRPYmplY3QpXG5cdH1cblx0cHVibGljIHN0YXRpYyBvbkFmdGVyRWRpdFN0b3Aoc3RhdGUsIGVkaXRvciwgaWdub3JlVXBkYXRlKSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciB0aGVDb2x1bW4gICAgPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXHRcdHRoZUNvbHVtbi5jb2x1bW5OYW1lID0gZWRpdG9yLmNvbHVtbjtcblx0XHR0aGVDb2x1bW4ub2xkVmFsdWUgICA9IHN0YXRlLm9sZDtcblx0XHR0aGVDb2x1bW4ubmV3VmFsdWUgICA9IHN0YXRlLnZhbHVlO1xuXHRcdHRoZUNvbHVtbi5yb3dPYmplY3QgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRJdGVtKGVkaXRvci5yb3cpO1xuXHRcdHRoZUNvbHVtbi5lZGl0b3IgICAgID0gZWRpdG9yO1xuXHRcdHRoZUNvbXBvbmVudC5vblN0b3BFZGl0KHRoZUNvbHVtbik7XG5cdH1cblx0cHVibGljIHN0YXRpYyBvbkJlZm9yZUVkaXRTdGFydFRhYmxlKGlkIDogYW55KSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciByb3cgPSBpZC5yb3c7XG5cdFx0dmFyIGNvbHVtbiA9IGlkLmNvbHVtbjtcblx0XHR2YXIgcm93SXRlbSA9ICQkKHRoaXNbXCJjb25maWdcIl0uaWQpLmdldEl0ZW0ocm93KTtcblx0XHR2YXIgdGhlQ29sdW1uICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcblxuXHRcdHRoZUNvbHVtbi5jb2x1bW5OYW1lID0gY29sdW1uO1xuXHRcdHRoZUNvbHVtbi5vbGRWYWx1ZSA9IG51bGw7XG5cdFx0dGhlQ29sdW1uLm5ld1ZhbHVlID0gbnVsbDtcblx0XHR0aGVDb2x1bW4ucm93T2JqZWN0ID0gcm93SXRlbTtcblx0XHR0aGVDb21wb25lbnQub25CZWZvcmVFZGl0U3RhcnQodGhlQ29sdW1uKTtcblxuXHRcdGlmIChyb3dJdGVtW1wiYmVmb3JlRWRpdFN0YXJ0UmV0dXJuXCJdIT1udWxsKSByZXR1cm4gcm93SXRlbVtcImJlZm9yZUVkaXRTdGFydFJldHVyblwiXTtcblxuXHRcdHJldHVybiAhcm93SXRlbVtjb2x1bW4rXCJSZWFkT25seVwiXTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQ2hhbmdlKG5ld3YsIG9sZHYpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZClbXCJjb21wb25lbnRcIl07XG5cdFx0dGhlQ29tcG9uZW50Lm9uQ2hhbmdlKG5ld3YsIG9sZHYpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgTWVudUhhbmRsZXIoaWQsIGNvbnRleHQpIHtcblx0XHR2YXIgdGhlSUQgPSB0aGlzW1wiY29uZmlnXCJdLmlkO1xuXHRcdHZhciB0aGVDb21wb25lbnQgPSA8VUlDb250ZXh0TWVudT4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciBqdW1wSXRlbSA9IHRoZUNvbXBvbmVudC5nZXRNZW51SXRlbShpZCk7XG5cdFx0dmFyIHRoZU9iamVjdCA9IHRoZUNvbXBvbmVudC5vd25pbmdDb21wb25lbnQuZ2V0U2VsZWN0ZWRPYmplY3QoKTtcblx0XHRpZiAoIWp1bXBJdGVtLmNhbGxiYWNrKSByZXR1cm47XG5cdFx0anVtcEl0ZW0uY2FsbGJhY2soaWQsIHRoZUNvbXBvbmVudCwgdGhlT2JqZWN0KTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIE9uQWZ0ZXJTZWxlY3QoaWQ6YW55KSB7XG5cdFx0dmFyIHRoZUlEID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHRpZiAoISQkKHRoZUlEKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdHZhciB0aGVOb2RlID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZCkuZ2V0SXRlbShpZC5yb3cpO1xuXHRcdGlmICghdGhlTm9kZSkge1xuXHRcdFx0VUkuTWVzc2FnZShcIkVycm9yIEV4cGVjdGVkIFRPIEZpbmQgTm9kZSBnb3QgTnVsbCB3aXRoIElEIFwiICsgaWQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgSWRBcnJheSAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciBvYmplY3RBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIHJvd0FycmF5ICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgbmV3SXRlbVNlbGVjdGVkID0gbmV3IEl0ZW1TZWxlY3RlZEV2ZW50KCk7XG5cdFx0SWRBcnJheVswXSAgICAgICAgICA9IGlkLnJvdztcblx0XHRpZiAodGhlTm9kZS5vcmlnaW5hbE9iamVjdClcblx0XHRcdG9iamVjdEFycmF5WzBdID0gdGhlTm9kZS5vcmlnaW5hbE9iamVjdC5jbG9uZSgpOyBlbHNlXG5cdFx0XHRvYmplY3RBcnJheVswXSA9IG51bGw7XG5cdFx0cm93QXJyYXlbMF0gICAgICAgICAgICAgICAgICAgPSB0aGVOb2RlO1xuXHRcdG5ld0l0ZW1TZWxlY3RlZC5pZEFycmF5ICAgICAgID0gSWRBcnJheTtcblx0XHRuZXdJdGVtU2VsZWN0ZWQub2JqZWN0QXJyYXkgICA9IG9iamVjdEFycmF5O1xuXHRcdG5ld0l0ZW1TZWxlY3RlZC5pdGVtc1NlbGVjdGVkID0gb2JqZWN0QXJyYXkubGVuZ3RoO1xuXHRcdG5ld0l0ZW1TZWxlY3RlZC5yb3dBcnJheSAgICAgID0gcm93QXJyYXk7XG5cdFx0bmV3SXRlbVNlbGVjdGVkLnRoZUNvbXBvbmVudCAgPSB0aGVDb21wb25lbnQ7XG5cdFx0dGhlQ29tcG9uZW50Lm9uQWZ0ZXJTZWxlY3QobmV3SXRlbVNlbGVjdGVkKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEhhbmRsZUZpZWxkRW50cnkoc3RhdGUsIGVkaXRvciwgaWdub3JlVXBkYXRlKSB7XG5cdFx0dmFyIHRoZUV4cGxvcmVyID0gJCQodGhpc1tcImNvbmZpZ1wiXS5pZCkuZXhwbG9yZXI7XG5cdFx0dmFyIG5ld1RleHQgPSBzdGF0ZS52YWx1ZTtcblx0XHR2YXIgcm93SUQgICA9IGVkaXRvci5yb3c7XG5cdFx0dmFyIHRoZU5vZGUgPSAkJCh0aGVFeHBsb3Jlci5jb21wb25lbnRJRCkuZ2V0SXRlbShyb3dJRCk7XG5cdFx0dmFyIHRoZVByb3h5ID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoZU5vZGUuY2xhc3NUeXBlKTtcblx0XHR0aGVQcm94eS51cGRhdGVOYW1lKHRoZU5vZGUuX2lkLCBuZXdUZXh0KTtcblx0XHRVSS5NZXNzYWdlKFwiUmVjb3JkIFVwZGF0ZWRcIik7XG5cdH1cblx0cHVibGljIHN0YXRpYyBJc0ZpZWxkRWRpdGFibGUoaWQpOmJvb2xlYW4ge1xuXHRcdHZhciB0aGVJRCAgICAgICA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0dmFyIHRoZUV4cGxvcmVyID0gJCQodGhlSUQpW1wiZXhwbG9yZXJcIl07XG5cdFx0dmFyIHJvd0l0ZW0gICAgID0gJCQodGhlRXhwbG9yZXIuZ2V0Q29tcG9uZW50SUQoKSkuZ2V0SXRlbShpZCk7XG5cdFx0aWYgKHJvd0l0ZW0uY2xhc3NUeXBlLmluZGV4T2YoXCJSb290XCIpID09IC0xKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgVmFsaWRhdGVGaWVsZEVudHJ5KHJvdywgdmFsdWU6c3RyaW5nKSB7XG5cdFx0dmFyIHRoZUlEICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlRXhwbG9yZXIgPSAkJCh0aGVJRCkuZXhwbG9yZXI7XG5cdFx0dmFyIHJvd0l0ZW0gPSAkJCh0aGVFeHBsb3Jlci5nZXRDb21wb25lbnRJRCgpKS5nZXRJdGVtKHJvdy5pZCk7XG5cdFx0QXBwTG9nLmluZm8oXCJpbmZvXCIsIFwiQmVmb3JlIEVkaXQgRXZlbnRcIik7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cHVibGljIHN0YXRpYyBQcm9jZXNzT25EZXN0cnVjdCh0aGVDb21wb25lbnQ6VUlDb21wb25lbnQpIHtcblx0XHRVSS5EZWJ1ZyhcIm9uIERlc3RydWN0IENhbGxlZFwiKTtcblx0XHR0aGVDb21wb25lbnQub25EZXN0cnVjdCgpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgUHJvY2Vzc1RhYkNoYW5nZWQoKSB7XG5cdH1cblx0cHVibGljIHN0YXRpYyBPbkRyb3BFdmVudChTb3VyY2UsIHRhcmdldCwgZXZlbnQpIHtcblx0XHQvLyBVSS5JbmZvKFwiRHJvcCBFdmVudFwiKTtcblx0XHRjb25zb2xlLmxvZyhcIk9uIERyb3AgRXZlbnRcIik7XG5cdH1cblxufSB0aGlzLlVJRXZlbnRIYW5kbGVyID0gVUlFdmVudEhhbmRsZXI7XG5cbmVudW0gU291bmRzIHsgUG9wdXAsIFNoYXBlRHJvcCwgU2hhcGVEcmFnSW4sIFNoYXBlRHJhZ091dCwgQmxvcCwgT3BlbkRpYWdyYW0sIFNhdmVEaWFncmFtLCBDbG9zZURpYWdyYW0sIFNoYXBlT25TaGFwZURyb3AsIERyYXdMaW5rLCBFcnJvciB9dGhpcy5Tb3VuZHMgPSBTb3VuZHM7XG5cbmNsYXNzIFVJIGV4dGVuZHMgQzRPYmplY3Qge1xuXHRwdWJsaWMgc3RhdGljIFBsYXlTb3VuZChzb3VuZDpTb3VuZHMgPSBTb3VuZHMuQmxvcCkge1xuXHRcdHZhciBzO1xuXHRcdHN3aXRjaCAoc291bmQpIHtcblx0XHRcdGNhc2UgU291bmRzLlBvcHVwOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0NsaWNrT2ZmLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5DbG9zZURpYWdyYW06XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvRG9vciBDbG9zZS5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVEcm9wOlxuXHRcdFx0Y2FzZSBTb3VuZHMuT3BlbkRpYWdyYW06XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvQmxvcC5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuQmxvcDpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9CbG9wLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFNvdW5kcy5FcnJvcjpcblx0XHRcdFx0cyA9IG5ldyBidXp6LnNvdW5kKFwiL3NvdW5kcy9FcnJvcjEubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLlNoYXBlT25TaGFwZURyb3A6XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvTWV0YWxDbGljazEubXAzXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgU291bmRzLlNhdmVEaWFncmFtOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0Ryb3AgRm9yay5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuRHJhd0xpbms6XG5cdFx0XHRcdHMgPSBuZXcgYnV6ei5zb3VuZChcIi9zb3VuZHMvUG9wQ29yay5tcDNcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBTb3VuZHMuU2hhcGVEcmFnSW46XG5cdFx0XHRjYXNlIFNvdW5kcy5TaGFwZURyYWdPdXQgOlxuXHRcdFx0XHRzID0gbmV3IGJ1enouc291bmQoXCIvc291bmRzL0NsaWNrLm1wM1wiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHMucGxheSgpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgRGVidWcodGV4dDpzdHJpbmcpIHtcblx0XHRpZiAodHJ1ZSlcblx0XHRcdFVJLk1lc3NhZ2UodGV4dClcblx0fVxuXHRwdWJsaWMgc3RhdGljIE1lc3NhZ2UodGV4dDpzdHJpbmcpIHtcblx0XHRVSS5JbmZvKHRleHQpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgSW5mbyh0ZXh0OnN0cmluZykge1xuXHRcdHRvYXN0ci5vcHRpb25zID0ge1xuXHRcdFx0XCJjbG9zZUJ1dHRvblwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwiZGVidWdcIiAgICAgICAgICAgIDogZmFsc2UsXG5cdFx0XHRcIm5ld2VzdE9uVG9wXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJwcm9ncmVzc0JhclwiICAgICAgOiB0cnVlLFxuXHRcdFx0XCJwb3NpdGlvbkNsYXNzXCIgICAgOiBcInRvYXN0LXRvcC1yaWdodFwiLFxuXHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcblx0XHRcdFwib25jbGlja1wiICAgICAgICAgIDogbnVsbCxcblx0XHRcdFwic2hvd0R1cmF0aW9uXCIgICAgIDogXCIzMDBcIixcblx0XHRcdFwiaGlkZUR1cmF0aW9uXCIgICAgIDogXCIxMDAwXCIsXG5cdFx0XHRcInRpbWVPdXRcIiAgICAgICAgICA6IFwiNTAwMFwiLFxuXHRcdFx0XCJleHRlbmRlZFRpbWVPdXRcIiAgOiBcIjEwMDBcIixcblx0XHRcdFwic2hvd0Vhc2luZ1wiICAgICAgIDogXCJzd2luZ1wiLFxuXHRcdFx0XCJoaWRlRWFzaW5nXCIgICAgICAgOiBcImxpbmVhclwiLFxuXHRcdFx0XCJzaG93TWV0aG9kXCIgICAgICAgOiBcImZhZGVJblwiLFxuXHRcdFx0XCJoaWRlTWV0aG9kXCIgICAgICAgOiBcImZhZGVPdXRcIlxuXHRcdH1cblx0XHR0b2FzdHJbXCJpbmZvXCJdKHRleHQpXG5cdH1cblx0cHVibGljIHN0YXRpYyBXYXJuaW5nKHRleHQ6c3RyaW5nKSB7XG5cdFx0dG9hc3RyLm9wdGlvbnMgPSB7XG5cdFx0XHRcImNsb3NlQnV0dG9uXCIgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJkZWJ1Z1wiICAgICAgICAgICAgOiBmYWxzZSxcblx0XHRcdFwibmV3ZXN0T25Ub3BcIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcInByb2dyZXNzQmFyXCIgICAgICA6IHRydWUsXG5cdFx0XHRcInBvc2l0aW9uQ2xhc3NcIiAgICA6IFwidG9hc3QtdG9wLXJpZ2h0XCIsXG5cdFx0XHRcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxuXHRcdFx0XCJvbmNsaWNrXCIgICAgICAgICAgOiBudWxsLFxuXHRcdFx0XCJzaG93RHVyYXRpb25cIiAgICAgOiBcIjMwMFwiLFxuXHRcdFx0XCJoaWRlRHVyYXRpb25cIiAgICAgOiBcIjEwMDBcIixcblx0XHRcdFwidGltZU91dFwiICAgICAgICAgIDogXCI1MDAwXCIsXG5cdFx0XHRcImV4dGVuZGVkVGltZU91dFwiICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJzaG93RWFzaW5nXCIgICAgICAgOiBcInN3aW5nXCIsXG5cdFx0XHRcImhpZGVFYXNpbmdcIiAgICAgICA6IFwibGluZWFyXCIsXG5cdFx0XHRcInNob3dNZXRob2RcIiAgICAgICA6IFwiZmFkZUluXCIsXG5cdFx0XHRcImhpZGVNZXRob2RcIiAgICAgICA6IFwiZmFkZU91dFwiXG5cdFx0fVxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuRXJyb3IpO1xuXHRcdHRvYXN0cltcIndhcm5pbmdcIl0odGV4dClcblx0fVxuXHRwdWJsaWMgc3RhdGljIFN1Y2Nlc3ModGV4dDpzdHJpbmcpIHtcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcblx0XHR9XG5cdFx0dG9hc3RyW1wic3VjY2Vzc1wiXSh0ZXh0KVxuXHR9XG5cdHB1YmxpYyBzdGF0aWMgRXJyb3IodGV4dDpzdHJpbmcpIHtcblx0XHR0b2FzdHIub3B0aW9ucyA9IHtcblx0XHRcdFwiY2xvc2VCdXR0b25cIiAgICAgIDogZmFsc2UsXG5cdFx0XHRcImRlYnVnXCIgICAgICAgICAgICA6IGZhbHNlLFxuXHRcdFx0XCJuZXdlc3RPblRvcFwiICAgICAgOiBmYWxzZSxcblx0XHRcdFwicHJvZ3Jlc3NCYXJcIiAgICAgIDogdHJ1ZSxcblx0XHRcdFwicG9zaXRpb25DbGFzc1wiICAgIDogXCJ0b2FzdC10b3AtcmlnaHRcIixcblx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogZmFsc2UsXG5cdFx0XHRcIm9uY2xpY2tcIiAgICAgICAgICA6IG51bGwsXG5cdFx0XHRcInNob3dEdXJhdGlvblwiICAgICA6IFwiMzAwXCIsXG5cdFx0XHRcImhpZGVEdXJhdGlvblwiICAgICA6IFwiMTAwMFwiLFxuXHRcdFx0XCJ0aW1lT3V0XCIgICAgICAgICAgOiBcIjUwMDBcIixcblx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCIgIDogXCIxMDAwXCIsXG5cdFx0XHRcInNob3dFYXNpbmdcIiAgICAgICA6IFwic3dpbmdcIixcblx0XHRcdFwiaGlkZUVhc2luZ1wiICAgICAgIDogXCJsaW5lYXJcIixcblx0XHRcdFwic2hvd01ldGhvZFwiICAgICAgIDogXCJmYWRlSW5cIixcblx0XHRcdFwiaGlkZU1ldGhvZFwiICAgICAgIDogXCJmYWRlT3V0XCJcblx0XHR9XG5cdFx0VUkuUGxheVNvdW5kKFNvdW5kcy5FcnJvcik7XG5cdFx0dG9hc3RyW1wiZXJyb3JcIl0odGV4dClcblx0fVxuXHRwdWJsaWMgc3RhdGljIEV4cG9ydFRvRXhjZWwoY29tcG9uZW50SUQ6c3RyaW5nKSB7XG5cdFx0JCQoY29tcG9uZW50SUQpLmV4cG9ydFRvRXhjZWwoKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIEFsZXJ0KHN0cmluZykge3dlYml4LmFsZXJ0KHN0cmluZyk7fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHQgICAgc3VwZXIoKTtcbiAgICB9XG5cbn10aGlzLlVJID0gVUk7XG5cbmNsYXNzIFVJQ29tcG9uZW50IGV4dGVuZHMgVUkge1xuXG5cdHByb3RlY3RlZCBvdmVybGF5TWl4aW46Ym9vbGVhbiAgICAgICAgICA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50VmFsdWU6c3RyaW5nO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50SUQ6c3RyaW5nO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50TGFiZWw6c3RyaW5nO1xuXHRwcm90ZWN0ZWQgY29tcG9uZW50Vmlldzphbnk7XG5cdHByb3RlY3RlZCBjb21wb25lbnRDaGFuZ2VDYWxsYmFjazphbnk7XG5cdHByb3RlY3RlZCBvd25pbmdDb21wb25lbnQ6VUlDb21wb25lbnQ7XG5cdHByb3RlY3RlZCBvcmRlcjpudW1iZXIgICAgICAgICAgICAgICAgICA9IDA7XG5cdHByb3RlY3RlZCBldmVudHNEZWZpbmVkOmJvb2xlYW4gICAgICAgICA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgdHJhY2tpbmdPYmplY3RDaGFuZ2VzOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSAgICBfdWlDbGFzc1R5cGU6Q2xhc3NUeXBlO1xuXHRwcm90ZWN0ZWQgaWRQcmVmaXggICAgICAgICAgICAgICAgICAgICAgPSBcIlVJQ29tcG9uZW50X1wiO1xuXHRwcml2YXRlICAgICB0aGVPYmplY3Q6YW55O1xuXHRwdWJsaWMgICAgICB0aGVUZXN0ICAgICAgICAgICAgICAgICAgICAgPSBuZXcgQzRPYmplY3QoKTtcblx0cHJvdGVjdGVkIGNvbXBvbmVudERhdGE6YW55O1xuXHRwcml2YXRlIHJlbGF0aW9uc2hpcE9iamVjdDtcblx0cHJpdmF0ZSBfdXNlckRhdGE6YW55O1xuXHRwcm90ZWN0ZWQgcHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXG5cdGdldCB1c2VyRGF0YSgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuX3VzZXJEYXRhO1xuXHR9XG5cdHNldCB1c2VyRGF0YSh2YWx1ZTphbnkpIHtcblx0XHR0aGlzLl91c2VyRGF0YSA9IHZhbHVlO1xuXHR9XG5cdGdldCB1aUNsYXNzVHlwZSgpOkNsYXNzVHlwZSB7XG5cdFx0cmV0dXJuIHRoaXMuX3VpQ2xhc3NUeXBlO1xuXHR9XG5cdHNldCB1aUNsYXNzVHlwZSh2YWx1ZTpDbGFzc1R5cGUpIHtcblx0XHR0aGlzLl91aUNsYXNzVHlwZSA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIHNob3dPdmVybGF5KCkge1xuXHRcdGlmICghdGhpcy5vdmVybGF5TWl4aW4pXG5cdFx0XHR3ZWJpeC5leHRlbmQoJCQodGhpcy5jb21wb25lbnRJRCksIHdlYml4Lk92ZXJsYXlCb3gpO1xuXHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnNob3dPdmVybGF5KCk7XG5cdFx0dGhpcy5vdmVybGF5TWl4aW4gPSB0cnVlO1xuXHR9XG5cdHB1YmxpYyBoaWRlT3ZlcmxheSgpIHtcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5oaWRlT3ZlcmxheSgpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBUcmVlSWNvbihvYmo6YW55KSB7XG5cdFx0aWYgKG9iai4kbGV2ZWwgPiAxMDAxKVxuXHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtZm9sZGVyLW9wZW4nPjwvc3Bhbj5cIjtcblx0XHRpZiAob2JqLiRsZXZlbCA8IDEwMDApIHtcblx0XHRcdHJldHVybiBGYWN0b3J5LkdldENsYXNzSWNvbihvYmouX2NsYXNzVHlwZSk7XG5cdFx0fVxuXHRcdHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIGZhLWZpbG0nPjwvc3Bhbj5cIjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5jb21wb25lbnRJRCA9IHRoaXMuaWRQcmVmaXggKyB3ZWJpeC51aWQoKTtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMocHJvcGVydGllcyk7XG5cdH1cblxuXHRwdWJsaWMgYXR0YWNoRXZlbnQoaWQ6c3RyaW5nLCBldmVudCwgY2FsbGJhY2spIHtcblx0XHRpZiAoJCQoaWQpKSB7XG5cdFx0XHQkJChpZCkuYXR0YWNoRXZlbnQoZXZlbnQsIGNhbGxiYWNrKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3Q6YW55KSB7XG5cdFx0dGhpcy5yZWxhdGlvbnNoaXBPYmplY3QgPSB0aGVPYmplY3Q7XG5cdH1cblx0cHVibGljIGdldFJlbGF0aW9uc2hpcE9iamVjdCgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpb25zaGlwT2JqZWN0O1xuXHR9XG5cdHB1YmxpYyBibGFua1ZhbHVlKCkge31cblx0cHVibGljIGNyZWF0ZVZpZXcodmlld09wdGlvbnM6YW55KTphbnkge1xuXHRcdHRoaXMuc2V0UHJvcGVydHkoXCJkcmFnXCIsIHRydWUpO1xuXHRcdHRoaXMubWVyZ2VQcm9wZXJ0eVNldCh2aWV3T3B0aW9ucyk7XG5cdFx0cmV0dXJuIHZpZXdPcHRpb25zO1xuXHR9XG5cdHB1YmxpYyBzZXRJRChwcmVmaXg6c3RyaW5nKSB7XG5cdFx0dGhpcy5pZFByZWZpeCAgICA9IHByZWZpeDtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gdGhpcy5pZFByZWZpeCArIHdlYml4LnVpZCgpO1xuXHR9XG5cdHB1YmxpYyBzZXRDYWxsYmFjayhjYWxsYmFjazphbnkpIHtcblx0XHR0aGlzLmNvbXBvbmVudENoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdH1cblx0cHVibGljIGdldENhbGxiYWNrKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudENoYW5nZUNhbGxiYWNrO1xuXHR9XG5cdHB1YmxpYyBpc1ZhbGlkKCk6Ym9vbGVhbiB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHRyZXR1cm4gJCQodGhpcy5jb21wb25lbnRJRCkudmFsaWRhdGUoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBzZXREYXRhKHRoZURhdGE6YW55KSB7XG5cdFx0dGhpcy5jb21wb25lbnREYXRhID0gdGhlRGF0YTtcblx0fVxuXHRwdWJsaWMgZ2V0RGF0YSgpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50RGF0YTtcblx0fVxuXHRwdWJsaWMgc2V0TGFiZWwodGhlTGFiZWwpIHtcblx0XHR0aGlzLmNvbXBvbmVudExhYmVsID0gdGhlTGFiZWw7XG5cdH1cblx0cHVibGljIGdldExhYmVsKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudExhYmVsO1xuXHR9XG5cdHB1YmxpYyBzZXRWYWx1ZSh0aGVWYWx1ZTphbnkpIHtcblx0XHR0aGlzLmNvbXBvbmVudFZhbHVlID0gdGhlVmFsdWU7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHR3ZWJpeC51aSh0aGlzLmdldFZhbHVlLCAkJCh0aGlzLmNvbXBvbmVudElEKSk7XG5cdFx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldE93bmluZ0NvbXBvbmVudChjb21wb25lbnQ6VUlDb21wb25lbnQpIHtcblx0XHR0aGlzLm93bmluZ0NvbXBvbmVudCA9IGNvbXBvbmVudDtcblx0fVxuXHRwdWJsaWMgZ2V0T3duaW5nQ29tcG9uZW50KCk6VUlDb21wb25lbnQge1xuXHRcdHJldHVybiB0aGlzLm93bmluZ0NvbXBvbmVudDtcblx0fVxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50SUQoKTpzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudElEO1xuXHR9XG5cdHB1YmxpYyBzZXRDb21wb25lbnRJRChpZDpzdHJpbmcpIHtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gaWQ7XG5cdH1cblx0cHVibGljIGdldFZhbHVlKCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWYWx1ZTtcblx0fVxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50VmlldygpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50Vmlldyh0aGVWaWV3OmFueSkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoZVZpZXc7XG5cdH1cblx0cHVibGljIGdldFNlbGVjdGVkT2JqZWN0KCk6YW55IHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpIHtcblx0XHR3ZWJpeC5hbGVydChcIlNvcnJ5IERyb3BwaW5nIEhlcmUgTm90IEFsbG93ZWQgWWV0XCIpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVEcmFnSW4obWVzc2FnZTpEcm9wTWVzc2FnZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgb25BZnRlckRyb3AobWVzc2FnZTpEcm9wTWVzc2FnZSk6YW55IHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cHVibGljIG9uRHJhZ091dChtZXNzYWdlOkRyb3BNZXNzYWdlKTphbnkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRwdWJsaWMgdmFsaWRhdGVEcm9wKG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmFueSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBvblNlbGVjdENoYW5nZShpdGVtTWVzc2FnZTpJdGVtU2VsZWN0ZWRFdmVudCkge1xuXHRcdHRoaXMucHVibGlzaChcIm9uU2VsZWN0Q2hhbmdlXCIsIGl0ZW1NZXNzYWdlKTtcblx0XHRyZXR1cm47XG5cdH1cblx0cHVibGljIG9uSXRlbURibENsaWNrKGl0ZW1NZXNzYWdlIDogSXRlbVNlbGVjdGVkRXZlbnQpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJvbkl0ZW1EYmxDbGlja1wiLGl0ZW1NZXNzYWdlKTtcblx0fVxuXHRwdWJsaWMgb25JdGVtQ2xpY2soaXRlbU1lc3NhZ2UgOiBJdGVtU2VsZWN0ZWRFdmVudCkge1xuXHRcdHRoaXMucHVibGlzaChcIm9uSXRlbUNsaWNrXCIsaXRlbU1lc3NhZ2UpO1xuXHR9XG5cdHB1YmxpYyBnZXRPYmplY3QoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLnRoZU9iamVjdDtcblx0fVxuXHRwdWJsaWMgc2V0T2JqZWN0KHRoZU9iamVjdDphbnkpIHtcblx0XHR0aGlzLnRoZU9iamVjdCA9IHRoZU9iamVjdDtcblx0fVxuXHRwdWJsaWMgc2V0RHJhZ2dhYmxlKGZsYWc6Ym9vbGVhbiA9IHRydWUpIHtcblx0XHR2YXIgaHRtbFZpZXcgPSAkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3O1xuXHRcdHdlYml4LkRyYWdDb250cm9sLmFkZERyb3AoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSwgVUlFdmVudEhhbmRsZXIuT25Ecm9wRXZlbnQpO1xuXHR9XG5cdHB1YmxpYyBzZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSkge1xuXHRcdHN3aXRjaCAobmFtZSkge1xuXHRcdFx0Y2FzZSBcImxhYmVsXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldExhYmVsKHZhbHVlKTtcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInZhbHVlXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImRhdGFcIiA6XG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImNhbGxiYWNrXCIgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldENhbGxiYWNrKHZhbHVlKVxuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHR0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcblx0XHR9XG5cdH1cblx0cHVibGljIGFkZFByb3BlcnRpZXMocHJvcGVydHlTZXQ6YW55KSB7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBwcm9wZXJ0eVNldCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eShpdGVtLCBwcm9wZXJ0eVNldFtpdGVtXSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBnZXRQcm9wZXJ0eShuYW1lKTphbnkge1xuXHRcdHJldHVybiB0aGlzLnByb3BlcnRpZXNbbmFtZV07XG5cdH1cblx0cHVibGljIG1lcmdlUHJvcGVydHlTZXQodmlldzphbnkpIHtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG5cdFx0XHR2aWV3W2l0ZW1dID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xuXHRcdFx0aW5kZXgrKztcblx0XHR9XG5cdFx0cmV0dXJuIHZpZXc7XG5cdH1cblx0cHVibGljIGdldFByb3BlcnR5U2V0KCk6YW55IHtcblx0XHR2YXIgaW5kZXggICA9IDA7XG5cdFx0dmFyIHJlc3VsdHMgPSB7fTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMucHJvcGVydGllcykge1xuXHRcdFx0cmVzdWx0c1tpdGVtXSA9IHRoaXMucHJvcGVydGllc1tpdGVtXTtcblx0XHRcdGluZGV4Kys7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly9yZWdpb24gVUlDb21wb25lbnQgTWV0aG9kc1xuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIHJlZnJlc2goKSB7fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuZXZlbnRzRGVmaW5lZCA9IHRydWU7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRClbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZHJhZyAgICAgICAgID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkgJCQodGhpcy5jb21wb25lbnRJRCkuZGVzdHJ1Y3RvcigpO1xuXHR9XG5cdHB1YmxpYyBkZXN0cm95T2JqZWN0KCkge1xuXHR9XG5cdHB1YmxpYyBvbkRlc3RydWN0KCkge1xuXHRcdHRoaXMuZGVzdHJveU9iamVjdCgpO1xuXHR9XG5cdHB1YmxpYyBkZXN0cnVjdG9yKCkge1xuXHR9XG5cblx0Ly9lbmRyZWdpb25cbn0gdGhpcy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50O1xuXG5jbGFzcyBVSUNvbnRleHRNZW51IGV4dGVuZHMgVUlDb21wb25lbnQge1xuXHRwdWJsaWMganVtcEl0ZW1BcnJheTpBcnJheTxVSUp1bXBJdGVtPjtcblx0cHVibGljIG93bmluZ0NvbXBvbmVudDpVSUNvbXBvbmVudDtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuanVtcEl0ZW1BcnJheSA9IG5ldyBBcnJheTxVSUp1bXBJdGVtPigpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aUNvbnRleHRNZW51X1wiKTtcblx0fVxuXG5cdHB1YmxpYyBhZGRJdGVtKGxhYmVsLCBjYWxsYmFjaykge1xuXHRcdHZhciBuZXdJdGVtICAgICAgPSBuZXcgVUlKdW1wSXRlbSgpO1xuXHRcdG5ld0l0ZW0uaWQgICAgICAgPSBcIm1lbnVJdGVtX1wiICsgd2ViaXgudWlkKCk7XG5cdFx0bmV3SXRlbS5sYWJlbCAgICA9IGxhYmVsO1xuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xuXHR9XG5cdHB1YmxpYyBhZGRTZXBlcmF0b3IoKSB7XG5cdFx0dmFyIG5ld0l0ZW0gICAgICA9IG5ldyBVSUp1bXBJdGVtKCk7XG5cdFx0bmV3SXRlbS5pZCAgICAgICA9IFwianVtcEl0ZW1fXCIgKyB3ZWJpeC51aWQoKTtcblx0XHRuZXdJdGVtLmxhYmVsICAgID0gXCJcIjtcblx0XHRuZXdJdGVtLmNhbGxiYWNrID0gbnVsbDtcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXlbbmV3SXRlbS5pZF0gPSBuZXdJdGVtO1xuXHR9XG5cdHB1YmxpYyBnZXRNZW51SXRlbShsYWJlbDpzdHJpbmcpOlVJSnVtcEl0ZW0ge1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHRpZiAodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmxhYmVsID09IGxhYmVsKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dO1xuXHRcdH1cblx0fVxuXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciBtZW51QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHR2YXIgbWVudUl0ZW0gPSB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV07XG5cdFx0XHRpZiAobWVudUl0ZW0ubGFiZWwgPT0gXCJcIikge1xuXHRcdFx0XHRtZW51QXJyYXkucHVzaCh7JHRlbXBsYXRlOiBcIlNlcGFyYXRvclwifSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZW51QXJyYXkucHVzaChtZW51SXRlbS5sYWJlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHR2aWV3OiBcImNvbnRleHRtZW51XCIsIGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIGRhdGE6IG1lbnVBcnJheVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XG5cdFx0aWYgKCEkJCh0aGlzLmNvbXBvbmVudElEKSlcblx0XHRcdHdlYml4LnVpKHRoaXMuY29tcG9uZW50VmlldykuYXR0YWNoVG8oJCQodGhpcy5nZXRPd25pbmdDb21wb25lbnQoKS5nZXRDb21wb25lbnRJRCgpKSk7XG5cdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZ2V0Q29tcG9uZW50SUQoKSwgXCJjbGlja1wiLCBVSUV2ZW50SGFuZGxlci5NZW51SGFuZGxlcik7XG5cdH1cblxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlVJQ29udGV4dE1lbnUgPSBVSUNvbnRleHRNZW51O1xuXG5lbnVtIEZpZWxkRm9ybWF0IHsgR0VORVJBTCwgQ1VSUkVOQ1ksIE5VTUJFUiwgUEVSQ0VOVCB9dGhpcy5GaWVsZEZvcm1hdCA9IEZpZWxkRm9ybWF0O1xuXG5jbGFzcyBVSUZpZWxkIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdHByaXZhdGUgbGlzdFR5cGU6c3RyaW5nO1xuXHRwcml2YXRlIHJlbGF0aW9uc2hpcFBvaW50ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgdXBkYXRlRmllbGQ6c3RyaW5nO1xuXHRwdWJsaWMgbWF4TGVuZ3RoOm51bWJlcjtcblx0cHVibGljIGZpZWxkRm9ybWF0OkZpZWxkRm9ybWF0ICAgICAgPSBGaWVsZEZvcm1hdC5HRU5FUkFMO1xuXHRwdWJsaWMgZm9ybWF0Vmlldzphbnk7XG5cdHB1YmxpYyBmaWVsZFZhbHVlOmFueTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aWZpZWxkX1wiKTtcblx0XHR0aGlzLmFkZEV2ZW50UHVibGljYXRpb24oXCJmaWVsZENoYW5nZWRcIik7XG5cdH1cblxuXHRwdWJsaWMgZmllbGRDaGFuZ2VkKG5ld1ZhbHVlOmFueSwgb2xkVmFsdWUpIHtcblx0XHR2YXIgdGhlUGFyZW50ID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0aWYgKHRoaXMuZ2V0Q2FsbGJhY2soKSkge1xuXHRcdFx0dmFyIGNhbGxiYWNrID0gdGhpcy5nZXRDYWxsYmFjaygpO1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKHRoaXMsIHRoZVBhcmVudCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHR9XG5cdFx0dGhpcy52YWx1ZUNoYW5nZWQodGhlUGFyZW50LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdHRoaXMucHVibGlzaChcImZpZWxkQ2hhbmdlZFwiLCB7bmV3VmFsdWU6IG5ld1ZhbHVlLCBvbGRWYWx1ZTogb2xkVmFsdWV9KVxuXHR9XG5cdHB1YmxpYyBzZXRDbGFzc1R5cGUoY2xhc3NUeXBlOkNsYXNzVHlwZSkge1xuXHRcdHRoaXMubGlzdFR5cGUgPSA8c3RyaW5nPiBjbGFzc1R5cGU7XG5cdH1cblx0cHVibGljIGdldENsYXNzVHlwZSgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMubGlzdFR5cGU7XG5cdH1cblx0cHVibGljIHNldFVwZGF0ZUZpZWxkKHRoZUZpZWxkTmFtZTpzdHJpbmcpIHtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdGhlRmllbGROYW1lO1xuXHR9XG5cdHB1YmxpYyBnZXRVcGRhdGVGaWVsZCgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMudXBkYXRlRmllbGQ7XG5cdH1cblx0cHVibGljIHNldEZpZWxkRm9ybWF0KHRoZUZvcm1hdDpGaWVsZEZvcm1hdCkge1xuXHRcdHRoaXMuZmllbGRGb3JtYXQgPSB0aGVGb3JtYXQ7XG5cdFx0c3dpdGNoICh0aGVGb3JtYXQpIHtcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuQ1VSUkVOQ1kgOlxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLmZvcm1hdFZpZXcgPSB3ZWJpeC5OdW1iZXIubnVtVG9TdHIoe1xuXHRcdFx0XHRcdGdyb3VwRGVsaW1pdGVyOiBcIixcIiwgZ3JvdXBlU2l6ZTogMywgZGVjaW1hbERlbGltaXRlcjogXCIuXCIsIGRlY2ltYWxTaXplOiAwXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuUEVSQ0VOVCA6XG5cdFx0XHR7XG5cblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgRmllbGRGb3JtYXQuR0VORVJBTCA6XG5cdFx0XHR7XG5cdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBGaWVsZEZvcm1hdC5OVU1CRVIgOlxuXHRcdFx0e1xuXHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQgOlxuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0VmFsdWUodmFsdWU6YW55KSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5ibG9ja0V2ZW50KCk7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS51bmJsb2NrRXZlbnQoKTtcblx0XHR9XG5cdFx0dGhpcy5maWVsZFZhbHVlID0gdmFsdWU7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuY29tcG9uZW50SUQsIFwib25DaGFuZ2VcIiwgVUlFdmVudEhhbmRsZXIuRmllbGRDaGFuZ2VkKTtcblx0fVxuXHRwdWJsaWMgZ2V0VmFsdWUoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLmZpZWxkVmFsdWU7XG5cdH1cblx0cHVibGljIGJsYW5rVmFsdWUoKSB7XG5cdFx0aWYgKCQkKHRoaXMuY29tcG9uZW50SUQpKSB7XG5cdFx0XHQkJCh0aGlzLmNvbXBvbmVudElEKS5zZXRWYWx1ZShcIlwiKTtcblx0XHR9XG5cdFx0dGhpcy5maWVsZFZhbHVlID0gXCJcIjtcblx0fVxuXHRwdWJsaWMgdmFsdWVDaGFuZ2VkKHBhcmVudENvbXBvbmVudDpVSUNvbXBvbmVudCwgbmV3VmFsdWU6YW55LCBvbGRWYWx1ZTphbnkpIHtcblx0XHRpZiAoIXRoaXMuaXNWYWxpZCgpKVxuXHRcdFx0cmV0dXJuO1xuXHRcdGlmICghdGhpcy51cGRhdGVGaWVsZCkgcmV0dXJuO1xuXHRcdHZhciB0aGVPYmplY3QgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocGFyZW50Q29tcG9uZW50LmdldE9iamVjdCgpLmNsYXNzVHlwZSk7XG5cdFx0dGhlT2JqZWN0LnVwZGF0ZUF0dHJpYnV0ZShwYXJlbnRDb21wb25lbnQuZ2V0T2JqZWN0KCkuX2lkLCB0aGlzLnVwZGF0ZUZpZWxkLCBuZXdWYWx1ZSk7XG5cdFx0VUkuTWVzc2FnZShcIlJlY29yZCBVcGRhdGVkXCIpO1xuXHR9XG5cbn0gdGhpcy5VSUZpZWxkID0gVUlGaWVsZDtcblxuY2xhc3MgVUlDb3VudGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlDb3VudGVyRmllbGRfXCIpO1xuXHR9XG5cblx0cHVibGljIGZpZWxkQ2hhbmdlZChuZXd2LCBvbGR2KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwiZmllbGRDaGFuZ2VkXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImNvdW50ZXJcIlxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cbn10aGlzLlVJQ291bnRlckZpZWxkID0gVUlDb3VudGVyRmllbGQ7XG5cbmNsYXNzIFVJTGFiZWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHVibGljIGFsaWdubWVudDpzdHJpbmcgPSBcImNlbnRlclwiO1xuXHRwdWJsaWMgbGFiZWxXaWR0aDpudW1iZXI7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlMYWJlbF9cIik7XG5cdH1cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIGFsaWdubWVudCA9IFwiY2VudGVyXCIsIGxhYmVsV2lkdGggPSAxMDApIHtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMoe2xhYmVsOiBsYWJlbCwgYWxpZ25tZW50OiBhbGlnbm1lbnQsIGxhYmVsV2lkdGg6IGxhYmVsV2lkdGh9KTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCB2aWV3OiBcImxhYmVsXCJcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cbn0gdGhpcy5VSUxhYmVsID0gVUlMYWJlbDtcblxuY2xhc3MgVUlEYXRlRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aURhdGVGaWVsZF9cIik7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgICAgOiBcImRhdGVwaWNrZXJcIixcblx0XHRcdG5hbWUgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHR2YWx1ZSAgICAgOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0XHRsYWJlbCAgICAgOiB0aGlzLmNvbXBvbmVudExhYmVsLFxuXHRcdFx0bGFiZWxXaWR0aDogMTAwLFxuXHRcdFx0dGltZXBpY2tlcjogZmFsc2Vcblx0XHR9KTtcblx0XHRpZiAodGhpcy5mb3JtYXRWaWV3KSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudFZpZXdbXCJmb3JtYXRcIl0gPSB0aGlzLmZvcm1hdFZpZXc7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemUoKSB7XG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1xuXHRcdHN1cGVyLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIGRlZmluRXZlbnRzKCkge1xuXG5cdH1cblxufSB0aGlzLlVJRGF0ZUZpZWxkID0gVUlEYXRlRmllbGQ7XG5cbmNsYXNzIFVJU2xpZGVyRmllbGQgZXh0ZW5kcyBVSUZpZWxkIHtcblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlTbGlkZXJGaWVsZFwiKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCwgbWluVmFsdWU6bnVtYmVyID0gMCwgbWF4VmFsdWU6bnVtYmVyID0gMSwgc3RlcDpudW1iZXIgPSAuMSkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcIm1pblwiLCBtaW5WYWx1ZSk7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcIm1heFwiLCBtYXhWYWx1ZSk7XG5cdFx0dGhpcy5zZXRQcm9wZXJ0eShcInN0ZXBcIiwgc3RlcCk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdG5hbWUgOiB0aGlzLmdldExhYmVsKCksXG5cdFx0XHR2aWV3IDogXCJzbGlkZXJcIixcblx0XHRcdGxhYmVsOiB0aGlzLmdldExhYmVsKCksXG5cdFx0XHR2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLFxuXHRcdFx0dGl0bGU6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdFx0cmV0dXJuIHdlYml4LmkxOG4ubnVtYmVyRm9ybWF0KG9iai52YWx1ZSAqIDEwMCkgKyBcIiVcIjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxuXG59IHRoaXMuVUlTbGlkZXJGaWVsZCA9IFVJU2xpZGVyRmllbGQ7XG5cbmNsYXNzIFVJVGV4dEZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XG5cblx0cHVibGljIHRleHRBcmVhID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcInVpVGV4dEZpZWxkX1wiKTtcblx0XHR0aGlzLnRleHRBcmVhID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgc2V0VGV4dEFyZWEodGV4dEFyZWE6Ym9vbGVhbikge1xuXHRcdHRoaXMudGV4dEFyZWEgPSB0ZXh0QXJlYTtcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU6YW55LCBkYXRhOmFueSA9IG51bGwsIGNhbGxiYWNrOmFueSA9IG51bGwsIHVwZGF0ZUZpZWxkID0gbnVsbCwgdGV4dEFyZWEgPSBmYWxzZSkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHR0aGlzLnRleHRBcmVhICAgID0gdGV4dEFyZWE7XG5cdFx0dGhpcy51cGRhdGVGaWVsZCA9IHVwZGF0ZUZpZWxkO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRpZiAodGhpcy50ZXh0QXJlYSlcblx0XHRcdHZhciB2aWV3VHlwZSA9IFwidGV4dGFyZWFcIjsgZWxzZVxuXHRcdFx0dmlld1R5cGUgPSBcInRleHRcIjtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICA6IHZpZXdUeXBlLFxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDBcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxuXG59IHRoaXMuVUlUZXh0RmllbGQgPSBVSVRleHRGaWVsZDtcblxuY2xhc3MgVUlOb3RlRmllbGQgZXh0ZW5kcyBVSVRleHRGaWVsZCB7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllczphbnkgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJTm90ZUZpZWxkX1wiKTtcblx0XHR0aGlzLnRleHRBcmVhID0gdHJ1ZTtcblx0fVxuXG59dGhpcy5VSU5vdGVGaWVsZCA9IFVJTm90ZUZpZWxkO1xuXG5jbGFzcyBVSVNlbGVjdExpc3QgZXh0ZW5kcyBVSUZpZWxkIHtcblxuXHRwdWJsaWMgc2VsZWN0aW9uTGlzdDpBcnJheTxhbnk+O1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJ1aVNlbGVjdExpc3RfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldFZhbHVlKHZhbHVlIDogYW55KSB7XG5cdFx0c3VwZXIuc2V0VmFsdWUodmFsdWUpO1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuc2V0VmFsdWUodmFsdWUpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0U2VsZWN0TGlzdChsYWJlbCwgdmFsdWUsIHRoZUxpc3QsIGRhdGEsIGNhbGxiYWNrLCB1cGRhdGVGaWVsZCkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0TGlzdCh0aGVMaXN0KTtcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjaylcblx0XHR0aGlzLnNldFVwZGF0ZUZpZWxkKHVwZGF0ZUZpZWxkKTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgICAgOiBcInNlbGVjdFwiLFxuXHRcdFx0bmFtZSAgICAgIDogdGhpcy5jb21wb25lbnRMYWJlbCxcblx0XHRcdG9wdGlvbnMgICA6IHRoaXMuc2VsZWN0aW9uTGlzdCxcblx0XHRcdHZhbHVlICAgICA6IHRoaXMuZ2V0VmFsdWUoKSxcblx0XHRcdGxhYmVsICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoOiAxMDAsXG5cdFx0XHR2YWxpZGF0ZSAgOiB3ZWJpeC5ydWxlcy5pc05vdEVtcHR5XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdH1cblx0cHVibGljIHNldExpc3QodGhlTGlzdDpBcnJheTxhbnk+KSB7XG5cdFx0dGhpcy5zZWxlY3Rpb25MaXN0ID0gdGhlTGlzdDtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoZUxpc3QpIHtcblx0XHRcdGlmICh0aGVMaXN0W2l0ZW1dLm5hbWUgPT0gXCJcIilcblx0XHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnNlbGVjdGlvbkxpc3QucHVzaCh7aWQ6IFwiXCIsIG5hbWU6IFwiXCJ9KTtcblxuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkge1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkuZGVmaW5lKFwib3B0aW9uc1wiLCB0aGlzLnNlbGVjdGlvbkxpc3QpO1xuXHRcdFx0JCQodGhpcy5jb21wb25lbnRJRCkucmVmcmVzaCgpO1xuXHRcdH1cblx0fVxuXG59IHRoaXMuVUlTZWxlY3RMaXN0ID0gVUlTZWxlY3RMaXN0O1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlGaWVsZCB7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnkgPSAwLCBkYXRhOmFueSA9IG51bGwsIGNhbGxiYWNrOmFueSA9IG51bGwpIHtcblx0XHR0aGlzLnNldExhYmVsKGxhYmVsKTtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHR0aGlzLnNldERhdGEoZGF0YSk7XG5cdFx0dGhpcy5zZXRDYWxsYmFjayhjYWxsYmFjayk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLFxuXHRcdFx0dmlldzogXCJjaGVja2JveFwiLFxuXHRcdFx0bGFiZWw6IHRoaXMuZ2V0TGFiZWwoKSxcblx0XHRcdHZhbHVlOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgb25DaGFuZ2UobmV3diwgb2xkdikge1xuXHRcdHRoaXMucHVibGlzaChcIm9uQ2hhbmdlXCIsIHtuZXdWYWx1ZTogbmV3diwgb2xkVmFsdWU6IG9sZHZ9KTtcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cbn0gdGhpcy5VSUNoZWNrYm94ID0gVUlDaGVja2JveDtcblxuY2xhc3MgVUlKdW1wSXRlbSB7XG5cblx0cHVibGljIGlkOnN0cmluZztcblx0cHVibGljIGxhYmVsOnN0cmluZztcblx0cHVibGljIGNhbGxiYWNrOmFueTtcblx0cHVibGljIGV2ZW50OmFueTtcblx0cHVibGljIHR5cGU6c3RyaW5nO1xuXG59XG5jbGFzcyBVSUp1bXBCYXIgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHVibGljIGp1bXBJdGVtQXJyYXk6QXJyYXk8VUlKdW1wSXRlbT47XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlKdW1wQmFyX1wiKTtcblx0XHR0aGlzLmp1bXBJdGVtQXJyYXkgPSBuZXcgQXJyYXk8VUlKdW1wSXRlbT4oKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgSnVtcENhbGxiYWNrKGlkOnN0cmluZywgZXZlbnQ6YW55KSB7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9ICQkKGlkKVtcImNvbXBvbmVudFwiXTtcblx0XHR2YXIgY2FsbGJhY2sgPSBudWxsO1xuXHRcdHRoZUNvbXBvbmVudC5wdWJsaXNoKHRoZUNvbXBvbmVudC5qdW1wSXRlbUFycmF5W2lkXS5ldmVudClcblx0XHQvLyAgICB0aGVDb21wb25lbnQuanVtcEl0ZW1BcnJheVtpZF0uY2FsbGJhY2sodGhlQ29tcG9uZW50LCB0aGVDb21wb25lbnQuanVtcEl0ZW1BcnJheVtpZF0ubGFiZWwpO1xuXHR9XG5cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuanVtcEl0ZW1BcnJheSkge1xuXHRcdFx0dmFyIG5ld0l0ZW1WaWV3ID0ge1xuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIixcblx0XHRcdFx0aWQgICA6IHRoaXMuanVtcEl0ZW1BcnJheVtpdGVtXS5pZCxcblx0XHRcdFx0dHlwZSA6IFwiaHRtbGJ1dHRvblwiLFxuXHRcdFx0XHRjc3MgIDogXCJidF8xXCIsXG5cdFx0XHRcdGxhYmVsOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWwsXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWxcblx0XHRcdH1cblx0XHRcdGJhclZpZXcucHVzaChuZXdJdGVtVmlldyk7XG5cdFx0fVxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkOiB0aGlzLmNvbXBvbmVudElELCBjb2xzOiBiYXJWaWV3XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ld1ZpZXc7XG5cdH1cblx0cHVibGljIGFkZEl0ZW0obGFiZWw6c3RyaW5nLCBldmVudDpzdHJpbmcsIHR5cGUgPSBcImRhbmdlclwiLCBjYWxsYmFjayA9IG51bGwpIHtcblx0XHR2YXIgbmV3SXRlbSAgICAgID0gbmV3IFVJSnVtcEl0ZW0oKTtcblx0XHRuZXdJdGVtLmlkICAgICAgID0gXCJqdW1wQnV0dG9uX1wiICsgd2ViaXgudWlkKCk7XG5cdFx0bmV3SXRlbS5sYWJlbCAgICA9IGxhYmVsO1xuXHRcdG5ld0l0ZW0uY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRuZXdJdGVtLmV2ZW50ICAgID0gZXZlbnQ7XG5cdFx0bmV3SXRlbS50eXBlICAgICA9IHR5cGU7XG5cdFx0dGhpcy5qdW1wSXRlbUFycmF5W25ld0l0ZW0uaWRdID0gbmV3SXRlbTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHRpZiAoJCQodGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkKSlcblx0XHRcdFx0aWYgKCEkJCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQpLmhhc0V2ZW50KFwib25JdGVtQ2xpY2tcIikpXG5cdFx0XHRcdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0uaWQsIFwib25JdGVtQ2xpY2tcIiwgVUlKdW1wQmFyLkp1bXBDYWxsYmFjayk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHRpZiAoJCQoaXRlbSkpIHtcblx0XHRcdFx0JCQoaXRlbSlbXCJjb21wb25lbnRcIl0gPSB0aGlzO1xuXHRcdFx0XHQkJChpdGVtKVtcImRhdGFcIl0gICAgICA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG59IHRoaXMuVUlKdW1wQmFyID0gVUlKdW1wQmFyO1xuXG5jbGFzcyBVSVRvb2xiYXIgZXh0ZW5kcyBVSUp1bXBCYXIge1xuXG5cdHB1YmxpYyBsYWJlbDpzdHJpbmc7XG5cdHB1YmxpYyBpY29uOnN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHR9XG5cblx0cHVibGljIHNldFRvb2xCYXIobGFiZWwsIGljb24pIHtcblx0XHR0aGlzLmxhYmVsID0gbGFiZWw7XG5cdFx0dGhpcy5pY29uICA9IGljb247XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciBiYXJWaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgdGhlQmFyICA9IHt2aWV3OiBcImxhYmVsXCIsIGxhYmVsOiB0aGlzLmljb24gKyBcIiBcIiArIHRoaXMubGFiZWx9O1xuXHRcdGJhclZpZXcucHVzaCh0aGVCYXIpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5qdW1wSXRlbUFycmF5KSB7XG5cdFx0XHR2YXIgbmV3SXRlbVZpZXcgPSB7XG5cdFx0XHRcdHZpZXcgOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRpZCAgIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLmlkLFxuXHRcdFx0XHR0eXBlIDogdGhpcy5qdW1wSXRlbUFycmF5W2l0ZW1dLnR5cGUsXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmp1bXBJdGVtQXJyYXlbaXRlbV0ubGFiZWxcblx0XHRcdH1cblx0XHRcdGJhclZpZXcucHVzaChuZXdJdGVtVmlldyk7XG5cdFx0fVxuXHRcdHZhciBuZXdWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdGlkICAgICAgOiB0aGlzLmNvbXBvbmVudElELFxuXHRcdFx0dmlldyAgICA6IFwidG9vbGJhclwiLFxuXHRcdFx0Y3NzICAgICA6IFwiaGlnaGxpZ2h0ZWRfaGVhZGVyIGhlYWRlcjNcIixcblx0XHRcdHBhZGRpbmdYOiA1LFxuXHRcdFx0cGFkZGluZ1k6IDUsXG5cdFx0XHRoZWlnaHQgIDogNDAsXG5cdFx0XHRjb2xzICAgIDogYmFyVmlld1xuXHRcdH0pO1xuXHRcdHJldHVybiBuZXdWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0fVxuXG59IHRoaXMuVUlUb29sYmFyID0gVUlUb29sYmFyO1xuXG5jbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJQ29tcG9uZW50IHtcblxuXHRwdWJsaWMgY29sb3I6c3RyaW5nO1xuXHRwdWJsaWMgZXZlbnQ6c3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSBudWxsKSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJQnV0dG9uX1wiKTtcblx0fVxuXG5cdHB1YmxpYyBvbkJ1dHRvbkNsaWNrKHRoZUNvbXBvbmVudDphbnkpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJjbGlja1wiLCB0aGlzKTtcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZywgdmFsdWU/OmFueSwgZGF0YT86YW55LCBjYWxsYmFjaz86YW55KSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdHRoaXMuY29sb3IgPSBcImJhY2tncm91bmQtY29sb3IgOiAjRkY5RTlFXCI7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCAgICAgICA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3ICAgICA6IFwiYnV0dG9uXCIsXG5cdFx0XHRuYW1lICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHR2YWx1ZSAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRjc3NGb3JtYXQ6IHRoaXMuY29sb3IsXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgc2V0TGFiZWwodGhlTGFiZWw6c3RyaW5nKSB7XG5cdFx0c3VwZXIuc2V0TGFiZWwodGhlTGFiZWwpO1xuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnZhbHVlID0gdGhlTGFiZWw7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnJlZnJlc2goKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNldENvbG9yKHZhbHVlOnN0cmluZykge1xuXHRcdGlmICgkJCh0aGlzLmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLnN0eWxlLmJhY2tncm91bmQgID0gdmFsdWU7XG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLiR2aWV3LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLnN0eWxlLmJvcmRlckNvbG9yID0gdmFsdWU7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbXBvbmVudElELCBcIm9uSXRlbUNsaWNrXCIsIFVJRXZlbnRIYW5kbGVyLk9uQnV0dG9uQ2xpY2spO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cbn0gdGhpcy5VSUJ1dHRvbiA9IFVJQnV0dG9uO1xuXG5jbGFzcyBVSURyb3Bab25lIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlVJRHJvcFpvbmVfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldENvbXBvbmVudChsYWJlbDpzdHJpbmcsIHZhbHVlOmFueSwgZGF0YTphbnksIGNhbGxiYWNrOmFueSwgdXBkYXRlRmllbGQgPSBudWxsKSB7XG5cdFx0dGhpcy5zZXRMYWJlbChsYWJlbCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMuc2V0Q2FsbGJhY2soY2FsbGJhY2spO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcblx0fVxuXHRwdWJsaWMgc2V0SW5UaGVab25lKGluWm9uZTpib29sZWFuKSB7XG5cdFx0aWYgKGluWm9uZSlcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuZGVmaW5lKFwiY3NzXCIsIFwiaW5UaGVEcm9wWm9uZVwiKTsgZWxzZVxuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5kZWZpbmUoXCJjc3NcIiwgXCJvdXRPZlRoZURyb3Bab25lXCIpO1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB7XG5cdFx0XHRpZCAgICAgICA6IHRoaXMuZ2V0Q29tcG9uZW50SUQoKSxcblx0XHRcdHZpZXcgICAgIDogXCJsaXN0XCIsXG5cdFx0XHRtaW5XaWR0aCA6IDEwMCxcblx0XHRcdG1pbkhlaWdodDogMTAwLFxuXHRcdFx0dGVtcGxhdGUgOiBcIiN0aXRsZSNcIixcblx0XHRcdGRhdGEgICAgIDogW3t0aXRsZTogXCJEcm9wIFpvbmVcIn1dLFxuXHRcdFx0ZHJhZyAgICAgOiBcInRhcmdldFwiXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIG9uQmVmb3JlRHJvcChtZXNzYWdlOkRyb3BNZXNzYWdlKTpib29sZWFuIHtcblx0XHR0aGlzLnNldEluVGhlWm9uZShmYWxzZSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHB1YmxpYyBvbkJlZm9yZURyYWdJbihtZXNzYWdlOkRyb3BNZXNzYWdlKTpib29sZWFuIHtcblx0XHR0aGlzLnNldEluVGhlWm9uZSh0cnVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgb25EcmFnT3V0KG1lc3NhZ2U6RHJvcE1lc3NhZ2UpOmJvb2xlYW4ge1xuXHRcdHRoaXMuc2V0SW5UaGVab25lKGZhbHNlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5jb21wb25lbnRJRCwgXCJvbkJlZm9yZURyb3BcIiwgVUlFdmVudEhhbmRsZXIuT25CZWZvcmVEcm9wKTtcblx0fVxuXG59IHRoaXMuVUlEcm9wWm9uZSA9IFVJRHJvcFpvbmU7XG5cbmludGVyZmFjZSBvbkVkaXRDYWxsYmFjayB7XG5cdChvYmplY3Q6YW55KSA6IGFueTtcbn1cblxuY2xhc3MgVUlDb2xvckZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6YW55KSB7XG5cdFx0c3VwZXIocHJvcGVydGllcyk7XG5cdFx0dGhpcy5zZXRJRChcIlVJQ29sb3JGaWVsZF9cIik7XG5cdFx0dGhpcy5hZGRQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuXHR9XG5cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZDogdGhpcy5jb21wb25lbnRJRCwgdmlldzogXCJjb2xvcnBpY2tlclwiXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG59dGhpcy5VSUNvbG9yRmllbGQgPSBVSUNvbG9yRmllbGQ7XG5cbmNsYXNzIFVJRGF0YVRhYmxlRmllbGQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xuXHRwdWJsaWMgY29sdW1uTnVtYmVyOm51bWJlcjtcblx0cHVibGljIGNvbHVtbk5hbWU6c3RyaW5nO1xuXHRwdWJsaWMgb2xkVmFsdWU6YW55O1xuXHRwdWJsaWMgbmV3VmFsdWU6YW55O1xuXHRwdWJsaWMgZWRpdG9yOmFueTtcblx0cHVibGljIHJvd09iamVjdDphbnk7XG5cdHB1YmxpYyBpc1JlZmVyZW5jZTpib29sZWFuICAgICAgID0gZmFsc2U7XG5cdHB1YmxpYyByZWZlcmVuY2VDbGFzc1R5cGU6c3RyaW5nID0gXCJcIjtcblx0cHVibGljIHJlZmVyZW5jZUZpZWxkOmFueTtcblx0cHVibGljIHJlZmVyZW5jZU9iamVjdDphbnk7XG5cdHB1YmxpYyBkaXNwbGF5RmllbGROYW1lO1xuXHRwdWJsaWMgdmlldzphbnk7XG5cdHB1YmxpYyBvcHRpb25MaXN0OkFycmF5PGFueT47XG5cdHB1YmxpYyBtYXBwZWQ6Ym9vbGVhbiAgICAgICAgICAgID0gZmFsc2U7XG5cdHB1YmxpYyB0ZW1wbGF0ZTphbnk7XG5cdHB1YmxpYyByZWZlcmVuY2VDbGFzc0ZpZWxkOmFueVxuXHQvL2VuZHJlZ2lvblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSURhdGFUYWJsZUZpZWxkX1wiKTtcblx0XHR0aGlzLmNvbXBvbmVudElEID0gXCJkYXRhVGFibGVGaWVsZF9cIiArIHdlYml4LnVpZCgpO1xuXHR9XG59IHRoaXMuVUlEYXRhVGFibGVGaWVsZCA9IFVJRGF0YVRhYmxlRmllbGQ7XG5cbmNsYXNzIFVJRGF0YVRhYmxlIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXHRnZXQgdGVtcGxhdGUoKTphbnkge1xuXHRcdHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcblx0fVxuXG5cdHNldCB0ZW1wbGF0ZSh2YWx1ZTphbnkpIHtcblx0XHR0aGlzLl90ZW1wbGF0ZSA9IHZhbHVlO1xuXHR9XG5cdGdldCBzaG93VG9vbEJhcigpOmJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9zaG93VG9vbEJhcjtcblx0fVxuXHRzZXQgc2hvd1Rvb2xCYXIodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX3Nob3dUb29sQmFyID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIE1hcHBlZENvbHVtbkxvb2t1cChvYmopIHtcblx0fVxuXHRwdWJsaWMgdmlld1R5cGUgPSBcImRhdGF0YWJsZVwiO1xuXG5cdHByb3RlY3RlZCB0aGVMaXN0ICAgICAgICAgICAgICAgOiBBcnJheTxhbnk+ICA9IG51bGw7XG5cdHByb3RlY3RlZCBjb2x1bW5zICAgICAgICAgICAgICAgOiBBcnJheTxVSURhdGFUYWJsZUZpZWxkPjtcblx0cHJvdGVjdGVkIHJvd1NlbGVjdENhbGxiYWNrICAgICA6IGFueTtcblx0cHJvdGVjdGVkIGVkaXRhYmxlICAgICAgICAgICAgICA6IGJvb2xlYW4gICAgPSBmYWxzZTtcblx0cHJvdGVjdGVkIGVkaXRhY3Rpb24gICAgICAgICAgICA6IHN0cmluZyAgID0gXCJkYmxjbGlja1wiO1xuXHRwcm90ZWN0ZWQgdG9vbEJhciAgICAgICAgICAgICAgIDogVUlUb29sYmFyO1xuXHRwcm90ZWN0ZWQgZGF0YVRhYmxlSUQgICAgICAgICAgIDogc3RyaW5nO1xuXHRwcml2YXRlIF9zaG93VG9vbEJhciAgICAgICAgICAgIDogYm9vbGVhbiAgPSBmYWxzZTtcblx0cHJpdmF0ZSBfbXVsdGlTZWxlY3QgICAgICAgICAgICA6IGJvb2xlYW4gID0gZmFsc2U7XG5cdHByaXZhdGUgX2F1dG9Db2x1bW5Db25maWd1cmUgID0gZmFsc2U7XG5cdHByaXZhdGUgX3Nob3dBZGREZWxldGVDb2x1bW5zID0gdHJ1ZTtcblx0cHJpdmF0ZSBfd2lkdGggICAgICAgICAgICAgICAgPSAwO1xuXHRwcml2YXRlIF9oZWlnaHQgICAgICAgICAgICAgICA9IDA7XG5cdHByaXZhdGUgX3RlbXBsYXRlIDogYW55ID0gbnVsbDtcblxuXHRnZXQgbXVsdGlTZWxlY3QoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fbXVsdGlTZWxlY3Q7XG5cdH1cblx0c2V0IG11bHRpU2VsZWN0KHZhbHVlOmJvb2xlYW4pIHtcblx0XHR0aGlzLl9tdWx0aVNlbGVjdCA9IHZhbHVlO1xuXHR9XG5cdGdldCBhdXRvQ29sdW1uQ29uZmlndXJlKCk6Ym9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9Db2x1bW5Db25maWd1cmU7XG5cdH1cblx0c2V0IGF1dG9Db2x1bW5Db25maWd1cmUodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX2F1dG9Db2x1bW5Db25maWd1cmUgPSB2YWx1ZTtcblx0fVxuXHRnZXQgc2hvd0FkZERlbGV0ZUNvbHVtbnMoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fc2hvd0FkZERlbGV0ZUNvbHVtbnM7XG5cdH1cblx0c2V0IHNob3dBZGREZWxldGVDb2x1bW5zKHZhbHVlOmJvb2xlYW4pIHtcblx0XHR0aGlzLl9zaG93QWRkRGVsZXRlQ29sdW1ucyA9IHZhbHVlO1xuXHR9XG5cdGdldCBoZWlnaHQoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblx0c2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpIHtcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcblx0fVxuXHRnZXQgd2lkdGgoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXHRzZXQgd2lkdGgodmFsdWU6bnVtYmVyKSB7XG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcblx0fVxuXG5cblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSURhdGFUYWJsZV9cIik7XG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcImRhdGFUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xuXHRcdHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSBmYWxzZTtcblx0fVxuXG5cblx0cHVibGljIGhpZGVDb2x1bW4oIGNvbHVtbklEIDogYW55KSB7XG5cblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpICQkKHRoaXMuZGF0YVRhYmxlSUQpLmhpZGVDb2x1bW4oY29sdW1uSUQpO1xuXHR9XG5cdHB1YmxpYyBzaG93Q29sdW1uKCBjb2x1bW5JRCA6IGFueSkge1xuXG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5zaG93Q29sdW1uKGNvbHVtbklEKTtcblx0fVxuXG5cblxuXHRwdWJsaWMgbmV3SXRlbSgpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcblx0XHR2YXIgb2JqZWN0UHJveHkgID0gRmFjdG9yeS5DcmVhdGVQcm94eUluc3RhbmNlKHRoZUNvbXBvbmVudC51aUNsYXNzVHlwZSk7XG5cdFx0dmFyIG5hbWUgICAgICAgICA9IFwiQSBOZXcgXCIgKyBvYmplY3RQcm94eS5jbGFzc0xhYmVsKCk7XG5cdFx0dmFyIG5ld0lEICAgICAgICA9IG9iamVjdFByb3h5LmFkZE5ldyhuYW1lKTtcblx0XHR2YXIgbmV3T2JqZWN0ICAgID0gb2JqZWN0UHJveHkuZ2V0T25lKG5ld0lEKTtcblx0XHR2YXIgbmV3Um93SUQgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5hZGQobmV3T2JqZWN0KTtcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNob3dJdGVtKG5ld1Jvd0lEKTtcblx0XHQkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLnNlbGVjdChuZXdSb3dJRCwgZmFsc2UpO1xuXHR9XG5cdHB1YmxpYyBkZWxldGVJdGVtKHRoZVRvb2xiYXI6VUlUb29sYmFyLCBsYWJlbDpzdHJpbmcpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcblx0XHR2YXIgcm93aWQgICAgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKCk7XG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xuXHRcdHZhciB0aGVPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xuXHRcdHRoZUNvbXBvbmVudC5oYW5kbGVEZWxldGUodGhlT2JqZWN0KTtcblx0fVxuXHRwdWJsaWMgb3B0aW9ucygpIHtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gdGhpcztcblx0XHR2YXIgcm93aWQgICAgICAgID0gJCQodGhlQ29tcG9uZW50LmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZElkKCk7XG5cdFx0aWYgKCFyb3dpZCkgcmV0dXJuO1xuXHRcdHZhciB0aGVPYmplY3QgPSAkJCh0aGVDb21wb25lbnQuZGF0YVRhYmxlSUQpLmdldEl0ZW0ocm93aWQpO1xuXHRcdHRoZUNvbXBvbmVudC5oYW5kbGVEZWxldGUodGhlT2JqZWN0KTtcblx0fVxuXG5cdHB1YmxpYyBnZXRTZWxlY3RlZE9iamVjdCgpIDogYW55IHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTZWxlY3RlZCgpWzBdO1xuXHR9XG5cdHB1YmxpYyBnZXRTZWxlY3RlZCgpOkFycmF5PGFueT4ge1xuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkge1xuXHRcdFx0dmFyIGlkQXJyYXkgPSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5nZXRTZWxlY3RlZEl0ZW0odHJ1ZSk7XG5cdFx0XHRyZXR1cm4gaWRBcnJheTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIG9uU2VsZWN0Q2hhbmdlKGl0ZW1NZXNzYWdlOkl0ZW1TZWxlY3RlZEV2ZW50KSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwib25TZWxlY3RDaGFuZ2VcIiwgaXRlbU1lc3NhZ2UpO1xuXHR9XG5cdHB1YmxpYyBhZGRDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgdGhlQ29sdW1uOmFueSkge1xuXHRcdHZhciBuZXdDb2x1bW4gPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgID0gdGhlQ29sdW1uO1xuXHRcdG5ld0NvbHVtbi5jb2x1bW5OdW1iZXIgICAgID0gY29sdW1uTnVtYmVyO1xuXHRcdHRoaXMuY29sdW1uc1tjb2x1bW5OdW1iZXJdID0gbmV3Q29sdW1uO1xuXHR9XG5cdHB1YmxpYyBhZGRNYXBwZWRDb2x1bW4oY29sdW1uTnVtYmVyOm51bWJlciwgcmVmZXJlbmNlQ2xhc3NGaWVsZDpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgZGlzcGxheUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcblx0XHR2YXIgbmV3Q29sdW1uICAgICAgICAgICAgICAgICA9IG5ldyBVSURhdGFUYWJsZUZpZWxkKCk7XG5cdFx0bmV3Q29sdW1uLm1hcHBlZCAgICAgICAgICAgICAgPSB0cnVlO1xuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VDbGFzc0ZpZWxkID0gcmVmZXJlbmNlQ2xhc3NGaWVsZFxuXHRcdG5ld0NvbHVtbi5yZWZlcmVuY2VGaWVsZCAgICAgID0gcmVmZXJlbmNlRmllbGROYW1lO1xuXHRcdG5ld0NvbHVtbi5kaXNwbGF5RmllbGROYW1lICAgID0gZGlzcGxheUZpZWxkTmFtZTtcblx0XHRuZXdDb2x1bW4udmlldyAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xuXHRcdHZhciBmdW5jdGlvbk1hbWUgICAgICAgICAgICA9IFwibWFwRnVuY3Rpb25cIiArIHdlYml4LnVpZCgpO1xuXHRcdHZhciBtYXBwZWRGdW5jdGlvbiAgICAgICAgICA9IG5ldyBGdW5jdGlvbignb2JqJywgJ3snICsgJ3ZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZShvYmpbXCInICsgcmVmZXJlbmNlQ2xhc3NGaWVsZCArICdcIl1cIik7JyArICd2YXIgdGhpc09iamVjdCA9IG9iamVjdFByb3h5LmdldE9uZShvYmpbXCInICsgcmVmZXJlbmNlRmllbGROYW1lICsgJ1wiXSk7JyArICdpZiAoIXRoaXNPYmplY3QpIHJldHVybiBcIk5vdCBGb3VuZFwiOycgKyAncmV0dXJuIHRoaXNPYmplY3RbXCInICsgZGlzcGxheUZpZWxkTmFtZSArICdcIl07JyArICd9Jyk7XG5cdFx0bmV3Q29sdW1uLnRlbXBsYXRlICAgICAgICAgID0gbWFwcGVkRnVuY3Rpb247XG5cdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgID0gdGhlQ29sdW1uVmlldztcblx0XHRuZXdDb2x1bW4udmlld1tcIl90ZW1wbGF0ZVwiXSA9IG5ld0NvbHVtbi50ZW1wbGF0ZTtcblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSAgPSBuZXdDb2x1bW47XG5cdH1cbiAgICBwdWJsaWMgYWRkUmVmZXJlbmNlQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIHJlZmVyZW5jZUNsYXNzVHlwZTpzdHJpbmcsIHJlZmVyZW5jZUZpZWxkTmFtZSwgdGhlQ29sdW1uVmlldzphbnkpIHtcblx0XHR2YXIgbmV3Q29sdW1uICAgICAgICAgICAgICAgID0gbmV3IFVJRGF0YVRhYmxlRmllbGQoKTtcblx0XHRuZXdDb2x1bW4ucmVmZXJlbmNlQ2xhc3NUeXBlID0gcmVmZXJlbmNlQ2xhc3NUeXBlO1xuXHRcdG5ld0NvbHVtbi52aWV3ICAgICAgICAgICAgICAgPSB0aGVDb2x1bW5WaWV3O1xuXHRcdHZhciBvYmplY3RQcm94eSAgICAgICAgPSBGYWN0b3J5LkNyZWF0ZVByb3h5SW5zdGFuY2UocmVmZXJlbmNlQ2xhc3NUeXBlKTtcblx0XHR2YXIgb3B0aW9uTGlzdCAgICAgICAgID0gb2JqZWN0UHJveHkuZ2V0TGlzdChmYWxzZSk7XG5cdFx0bmV3Q29sdW1uLm9wdGlvbkxpc3QgICA9IG9wdGlvbkxpc3Q7XG5cdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciA9IGNvbHVtbk51bWJlcjtcblx0XHR2YXIgb3B0aW9uQXJyYXkgICAgICAgID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIG9wdGlvbkxpc3QpIHtcblx0XHRcdHZhciBvcHRpb24gICAgICAgICAgICAgICAgID0gbmV3IEM0T2JqZWN0KCk7XG5cdFx0XHRvcHRpb25bXCJpZFwiXSAgICAgICAgICAgICAgID0gb3B0aW9uTGlzdFtpdGVtXVtcImlkXCJdO1xuXHRcdFx0b3B0aW9uW3JlZmVyZW5jZUZpZWxkTmFtZV0gPSBvcHRpb25MaXN0W2l0ZW1dW3JlZmVyZW5jZUZpZWxkTmFtZV07XG5cdFx0XHRvcHRpb25BcnJheS5wdXNoKG9wdGlvbik7XG5cdFx0fVxuXHRcdG5ld0NvbHVtbi52aWV3W1wib3B0aW9uc1wiXSA9IG9wdGlvbkxpc3Q7XG5cdFx0Ly9uZXdDb2x1bW4udmlld1tcIm9uXCJdID0geyBvbkNoYW5nZSA6IGZ1bmN0aW9uKCkgeyBVSS5NZXNzYWdlKFwiU2VsZWN0IENoYW5nZWRcIik7fX1cblx0XHR0aGlzLmNvbHVtbnNbY29sdW1uTnVtYmVyXSA9IG5ld0NvbHVtbjtcblx0fVxuXHRwdWJsaWMgYWRkT3B0aW9uQ29sdW1uKGNvbHVtbk51bWJlcjpudW1iZXIsIG9wdGlvbkxpc3QsIHRoZUNvbHVtbikge1xuXHR9XG5cdHB1YmxpYyBzZXRMaXN0KHRoZUxpc3QpIHtcblx0XHR0aGlzLnRoZUxpc3QgPSB0aGVMaXN0O1xuXHRcdGlmICgkJCh0aGlzLmRhdGFUYWJsZUlEKSkge1xuXHRcdFx0JCQodGhpcy5kYXRhVGFibGVJRCkuY2xlYXJBbGwoKTtcblx0XHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnBhcnNlKHRoaXMudGhlTGlzdCk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzZXRWYWx1ZSh0aGVMaXN0OmFueSkge1xuXHRcdHRoaXMuc2V0TGlzdCh0aGVMaXN0KTtcblx0fVxuXHRwdWJsaWMgc2V0RWRpdGFibGUodGhlRmxhZzpib29sZWFuKSB7XG5cdFx0dGhpcy5lZGl0YWJsZSA9IHRoZUZsYWc7XG5cdH1cblx0cHVibGljIG9uU3RvcEVkaXQodGhlRmllbGQ6VUlEYXRhVGFibGVGaWVsZCkge1xuXHRcdGlmICh0aGlzLnB1Ymxpc2goXCJvblN0b3BFZGl0XCIsIHRoZUZpZWxkKSlcblx0XHRcdHJldHVybjtcblx0XHRpZiAodGhlRmllbGQubmV3VmFsdWUgPT0gdGhlRmllbGQub2xkVmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcblx0XHRcdG9iamVjdFByb3h5LnVwZGF0ZUF0dHJpYnV0ZSh0aGVGaWVsZC5yb3dPYmplY3QuX2lkLCB0aGVGaWVsZC5jb2x1bW5OYW1lLCB0aGVGaWVsZC5uZXdWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHJlZnJlc2hSb3cocm93SUQgOiBhbnkpIHtcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpXG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5yZWZyZXNoKHJvd0lEKTtcblx0fVxuXHRwdWJsaWMgb25CZWZvcmVFZGl0U3RhcnQodGhlRmllbGQgOiBVSURhdGFUYWJsZUZpZWxkKSB7XG5cdFx0aWYgKHRoaXMucHVibGlzaChcIm9uQmVmb3JlRWRpdFN0YXJ0XCIsIHRoZUZpZWxkKSlcblx0XHRcdHJldHVybjtcblx0fVxuXHRwdWJsaWMgaGFuZGxlRGVsZXRlKHRoZU9iamVjdDphbnkpIHtcblx0XHRVSS5NZXNzYWdlKFwiSGFuZGxlIERlbGV0ZVwiICsgdGhlT2JqZWN0Ll9pZClcblx0fVxuXHRwdWJsaWMgY3JlYXRlTmF2aWdhdGlvbkJhcigpIHtcblx0XHR0aGlzLnRvb2xCYXIgPSBuZXcgVUlUb29sYmFyKCk7XG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJOZXdcIiwgXCJuZXdJdGVtXCIpXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJEZWxldGVcIiwgXCJkZWxldGVJdGVtXCIpXG5cdFx0dGhpcy50b29sQmFyLmFkZEl0ZW0oXCJPcHRpb25zXCIsIFwib3B0aW9uc1wiKVxuXHRcdHRoaXMudG9vbEJhci5hZGRJdGVtKFwiRXhwb3J0XCIsIFwiZXhwb3J0XCIpO1xuXHRcdHRoaXMudG9vbEJhci5zZXREYXRhKHRoaXMpO1xuXHRcdGlmICh0aGlzLnVpQ2xhc3NUeXBlKSB7XG5cdFx0XHR0aGlzLnRvb2xCYXIuc2V0VG9vbEJhcihGYWN0b3J5LkdldENsYXNzTGFiZWwodGhpcy51aUNsYXNzVHlwZSksIEZhY3RvcnkuR2V0Q2xhc3NJY29uKHRoaXMudWlDbGFzc1R5cGUpKVxuXHRcdH1cblx0fVxuXHRwdWJsaWMgbGlzdGVuKGV2ZW50LCBvYmplY3QsIHB1Ymxpc2hlcikge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJuZXdJdGVtXCIgOlxuXHRcdFx0Y2FzZSBcImRlbGV0ZUl0ZW1cIiA6XG5cdFx0XHRjYXNlIFwib3B0aW9uc1wiIDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiZXhwb3J0XCI6XG5cdFx0XHRcdHRoaXMuZXhwb3J0VG9FeGNlbCgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgZXhwb3J0VG9FeGNlbCgpIHtcblx0XHRVSS5FeHBvcnRUb0V4Y2VsKHRoaXMuZGF0YVRhYmxlSUQpO1xuXHR9XG5cdHB1YmxpYyBnZXRMaXN0KCk6QXJyYXk8YW55PiB7XG5cdFx0aWYgKHRoaXMudGhlTGlzdClcblx0XHRcdHJldHVybiB0aGlzLnRoZUxpc3Q7XG5cdFx0aWYgKHRoaXMudWlDbGFzc1R5cGUpIHtcblx0XHRcdHZhciBvYmplY3RQcm94eSA9IEZhY3RvcnkuQ3JlYXRlUHJveHlJbnN0YW5jZSh0aGlzLnVpQ2xhc3NUeXBlKTtcblx0XHRcdHZhciByZXR1cm5MaXN0ICA9IG9iamVjdFByb3h5LmdldExpc3QodHJ1ZSk7XG5cdFx0XHRyZXR1cm4gcmV0dXJuTGlzdDtcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBBcnJheTxhbnk+KCk7XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbHVtblZpZXcoKTphbnkge1xuXHRcdHZhciBjb2x1bW5WaWV3ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgaSAgICAgICAgICA9IDA7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbHVtbnMpIHtcblx0XHRcdGNvbHVtblZpZXdbdGhpcy5jb2x1bW5zW2l0ZW1dLmNvbHVtbk51bWJlcl0gPSB0aGlzLmNvbHVtbnNbaXRlbV0udmlldztcblx0XHRcdGkrKztcblx0XHR9XG5cdFx0aWYgKHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMpIHtcblx0XHRcdGNvbHVtblZpZXdbaSsrXSA9IHtcblx0XHRcdFx0aWQ6IFwiXCIsIHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0dmlldyAgICAgIDogXCJidXR0b25cIixcblx0XHRcdFx0XHR0eXBlICAgICAgOiBcImh0bWxidXR0b25cIixcblx0XHRcdFx0XHRsYWJlbCAgICAgOiAnPHNwYW4gY2xhc3M9XCJ3ZWJpeF9pY29uIGZhLWFuZ2xlLWxlZnRcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+YmFjazwvc3Bhbj4nLFxuXHRcdFx0XHRcdGlucHV0V2lkdGg6IDgwXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbHVtblZpZXdbaSsrXSA9IHtpZDogXCJkcmFnXCIsIGhlYWRlcjogXCJcIiwgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nd2ViaXhfZHJhZ19oYW5kbGUnPjwvZGl2PlwiLCB3aWR0aDogMzV9XG5cdFx0fVxuXHRcdHJldHVybiBjb2x1bW5WaWV3O1xuXHR9XG5cdHB1YmxpYyBzZXRDb2x1bW5zKGNvbHVtbnMgOiBBcnJheTxhbnk+KSB7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHRmb3IgKHZhciBpdGVtIGluIGNvbHVtbnMpIHtcblx0XHRcdHZhciBuZXdDb2x1bW4gPSBuZXcgVUlEYXRhVGFibGVGaWVsZCgpO1xuXHRcdFx0bmV3Q29sdW1uLnZpZXcgICAgICAgICAgICAgPSBjb2x1bW5zW2l0ZW1dO1xuXHRcdFx0bmV3Q29sdW1uLmNvbHVtbk51bWJlciAgICAgPSBpbmRleCsrO1xuXHRcdFx0dGhpcy5jb2x1bW5zW2luZGV4XSA9IG5ld0NvbHVtbjtcblx0XHR9XG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSB7XG5cdFx0XHR0aGlzLnJlcGxhY2VDb2x1bW5zKGNvbHVtbnMpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgcmVwbGFjZUNvbHVtbnMoY29sdW1ucyA6IEFycmF5PGFueT4pIHtcblx0XHR0aGlzLmNvbHVtbnMgPSBuZXcgQXJyYXk8VUlEYXRhVGFibGVGaWVsZD4oKTtcblx0XHR2YXIgaW5kZXg9MDtcblx0XHRmb3IgKHZhciBpdGVtIGluIGNvbHVtbnMpIHtcblx0XHRcdHRoaXMuYWRkQ29sdW1uKGluZGV4KyssY29sdW1uc1tpdGVtXSk7XG5cdFx0fVxuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLmNvbmZpZy5jb2x1bW5zID0gdGhpcy5jcmVhdGVDb2x1bW5WaWV3KCk7O1xuXHRcdCQkKHRoaXMuZGF0YVRhYmxlSUQpLnJlZnJlc2hDb2x1bW5zKCk7XG5cdH1cblx0cHVibGljIHNvcnQocHJvcGVydHkgOiBzdHJpbmcsIHNvcnREaXJlY3Rpb246c3RyaW5nLCB0eXBlOnN0cmluZz1cInN0cmluZ1wiKSB7XG5cdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKVxuXHRcdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5zb3J0KHByb3BlcnR5LHNvcnREaXJlY3Rpb24sdHlwZSk7XG5cblx0fVxuXG5cdHB1YmxpYyBmaWx0ZXIoIGZ1bmMgOiBhbnkpIHtcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5maWx0ZXIoZnVuYyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dGhpcy5jcmVhdGVOYXZpZ2F0aW9uQmFyKCk7XG5cdFx0dmFyIHJvd3MgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciBpICAgID0gMDtcblx0XHRpZiAodGhpcy5fc2hvd1Rvb2xCYXIpIHtcblx0XHRcdHZhciBuYXZCYXJWaWV3ID0gdGhpcy50b29sQmFyLmdldFZpZXcoKTtcblx0XHRcdHJvd3NbMF0gICAgICAgID0gbmF2QmFyVmlldztcblx0XHRcdGkrK1xuXHRcdH1cblx0XHR2YXIgdmlldyA9ICB7XG5cdFx0XHRpZCAgICAgICAgICA6IHRoaXMuZGF0YVRhYmxlSUQsXG5cdFx0XHR2aWV3ICAgICAgICA6IHRoaXMudmlld1R5cGUsXG5cdFx0XHRzZWxlY3QgICAgICA6IFwicm93XCIsXG5cdFx0XHRuYXZpZ2F0aW9uICA6IHRydWUsXG5cdFx0XHRyZXNpemVDb2x1bW46IHRydWUsXG5cdFx0XHRzY3JvbGx4eSAgICA6IHRydWUsXG5cdFx0XHRkcmFnQ29sdW1uICA6IHRydWUsXG5cdFx0XHRlZGl0YWJsZSAgICA6IHRoaXMuZWRpdGFibGUsXG5cdFx0XHRlZGl0YWN0aW9uICA6IHRoaXMuZWRpdGFjdGlvbixcblx0XHR9O1xuXG5cdFx0aWYgKHRoaXMuaGVpZ2h0ID4gMCkge1xuXHRcdFx0dmlld1tcImhlaWdodFwiXSA9IHRoaXMuaGVpZ2h0O1xuXHRcdH1cblx0XHRpZiAodGhpcy53aWR0aCA+IDApIHtcblx0XHRcdHZpZXdbXCJ3aWR0aFwiXSA9IHRoaXMud2lkdGg7XG5cblx0XHR9XG5cdFx0aWYgKHRoaXMuYXV0b0NvbHVtbkNvbmZpZ3VyZSkge1xuXHRcdFx0dmlld1tcImF1dG9Db25maWdcIl0gPSB0cnVlO1xuXHRcdH0gZWxzZVxuXHRcdFx0dmlld1tcImNvbHVtbnNcIl0gPSB0aGlzLmNyZWF0ZUNvbHVtblZpZXcoKTtcblx0XHRpZiAodGhpcy5tdWx0aVNlbGVjdClcblx0XHRcdHZpZXdbXCJtdWx0aXNlbGVjdFwiXSA9IHRydWU7XG5cdFx0aWYgKHRoaXMudGVtcGxhdGUpIHtcblx0XHRcdHZpZXdbXCJfdGVtcGxhdGVcIl0gPSB0aGlzLnRlbXBsYXRlO1xuXHRcdH1cblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQ6IHRoaXMuY29tcG9uZW50SUQsIHR5cGU6IFwic3BhY2VcIiwgcm93czogWyB2aWV3IF1cblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25TZWxlY3RDaGFuZ2VcIiwgVUlFdmVudEhhbmRsZXIub25TZWxlY3RDaGFuZ2UpO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkFmdGVyRWRpdFN0b3BcIiwgVUlFdmVudEhhbmRsZXIub25BZnRlckVkaXRTdG9wKTtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtRGJsQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtRGJsQ2xpY2spO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQodGhpcy5kYXRhVGFibGVJRCwgXCJvbkJlZm9yZUVkaXRTdGFydFwiLCBVSUV2ZW50SGFuZGxlci5vbkJlZm9yZUVkaXRTdGFydFRhYmxlKTtcblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuZGF0YVRhYmxlSUQsIFwib25JdGVtQ2xpY2tcIiwgVUlFdmVudEhhbmRsZXIuT25JdGVtQ2xpY2spO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR2YXIgcmVzdWx0TGlzdCA9IHRoaXMuZ2V0TGlzdCgpO1xuXHRcdGlmIChyZXN1bHRMaXN0KVxuXHRcdFx0aWYgKCQkKHRoaXMuZGF0YVRhYmxlSUQpKSAkJCh0aGlzLmRhdGFUYWJsZUlEKS5wYXJzZShyZXN1bHRMaXN0KTtcblx0XHRpZiAoJCQodGhpcy5kYXRhVGFibGVJRCkpXG5cdFx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdFx0aWYgKHRoaXMuX3Nob3dUb29sQmFyKVx0dGhpcy50b29sQmFyLmluaXRpYWxpemUoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cblx0cHVibGljIGdldFRhYmxlTGlzdCgpIDogQXJyYXk8YW55PiB7XG5cdFx0dmFyIGRhdGF0YWJsZSA9ICQkKHRoaXMuZGF0YVRhYmxlSUQpXG5cdFx0dmFyIGRhdGFMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHQkJCh0aGlzLmRhdGFUYWJsZUlEKS5lYWNoUm93KFxuXHRcdFx0ZnVuY3Rpb24gKHJvdyl7XG5cdFx0XHRcdHZhciBpdGVtID0gZGF0YXRhYmxlLmdldEl0ZW0ocm93KTtcblx0XHRcdFx0ZGF0YUxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHQpXG5cdFx0cmV0dXJuIGRhdGFMaXN0O1xuXHR9XG5cbn0gdGhpcy5VSURhdGFUYWJsZSA9IFVJRGF0YVRhYmxlO1xuXG5jbGFzcyBVSVRyZWVUYWJsZSBleHRlbmRzIFVJRGF0YVRhYmxlIHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSVRyZWVUYWJsZV9cIik7XG5cdFx0dGhpcy5jb2x1bW5zICAgICAgICAgICAgICA9IG5ldyBBcnJheTxVSURhdGFUYWJsZUZpZWxkPigpO1xuXHRcdHRoaXMuZGF0YVRhYmxlSUQgICAgICAgICAgPSBcInRyZWVUYWJsZV9cIiArIHdlYml4LnVpZCgpO1xuXHRcdHRoaXMuc2hvd0FkZERlbGV0ZUNvbHVtbnMgPSBmYWxzZTtcblx0XHR0aGlzLnZpZXdUeXBlID0gXCJ0cmVldGFibGVcIjtcblx0fVxuXG59IHRoaXMuVUlUcmVlVGFibGUgPSBVSVRyZWVUYWJsZTtcblxuY2xhc3MgVUlDYWxlbmRhckZpZWxkIGV4dGVuZHMgVUlGaWVsZCB7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLnNldElEKFwiVUlDYWxlbmRhckZpZWxkX1wiKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQobGFiZWw6c3RyaW5nLCB2YWx1ZTphbnksIGRhdGE6YW55LCBjYWxsYmFjazphbnksIHVwZGF0ZUZpZWxkID0gbnVsbCkge1xuXHRcdHRoaXMuc2V0TGFiZWwobGFiZWwpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHR0aGlzLnVwZGF0ZUZpZWxkID0gdXBkYXRlRmllbGQ7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcblx0XHRcdGlkICAgICAgICAgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICAgICAgICAgIDogXCJkYXRlcGlja2VyXCIsXG5cdFx0XHRuYW1lICAgICAgICAgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsIC8vZGF0ZTogIG5ldyBEYXRlKDIwMTIsIDYsIDgpLFxuXHRcdFx0dmFsdWUgICAgICAgICAgICAgOiB0aGlzLmdldFZhbHVlKCksXG5cdFx0XHRsYWJlbCAgICAgICAgICAgICA6IHRoaXMuY29tcG9uZW50TGFiZWwsXG5cdFx0XHRsYWJlbFdpZHRoICAgICAgICA6IDEwMCxcblx0XHRcdGV2ZW50cyAgICAgICAgICAgIDogd2ViaXguRGF0ZS5pc0hvbGlkYXksXG5cdFx0XHRjYWxlbmRhckRhdGVGb3JtYXQ6IFwiJVktJW0tJWRcIlxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0fVxuXG59IHRoaXMuVUlDYWxlbmRhckZpZWxkID0gVUlDYWxlbmRhckZpZWxkO1xuXG5jbGFzcyBVSUNvbXBsZXhDb21wb25lbnQgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIGNvbXBvbmVudEFycmF5OkFycmF5PFVJQ29tcG9uZW50PjtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUNvbXBsZXhDb21wb25lbnRfXCIpO1xuXHRcdHRoaXMuY29tcG9uZW50QXJyYXkgPSBuZXcgQXJyYXk8VUlDb21wb25lbnQ+KCk7XG5cdH1cblxuXHRwdWJsaWMgYWRkQ29tcG9uZW50KGxhYmVsOnN0cmluZywgY29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0dGhpcy5jb21wb25lbnRBcnJheVtsYWJlbF0gPSBjb21wb25lbnQ7XG5cdFx0aWYgKGNvbXBvbmVudCkgY29tcG9uZW50LnNldFByb3BlcnR5KFwibmFtZVwiLCBsYWJlbCk7XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbXBvbmVudHNWaWV3KCk6YW55IHtcblx0XHR2YXIgdmlld0FycmF5ID0gbmV3IEFycmF5PGFueT4oKTtcblx0XHR2YXIgaSAgICAgICAgID0gMDtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcblx0XHRcdGlmIChpdGVtICE9IFwidG9vbGJhclwiKVxuXHRcdFx0XHR2aWV3QXJyYXlbaSsrXSA9IHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZ2V0VmlldygpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmlld0FycmF5O1xuXHR9XG5cdHB1YmxpYyBudW1PZkNvbXBvbmVudHMoKTpudW1iZXIge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudEFycmF5KS5sZW5ndGhcblx0fVxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50KGxhYmVsOnN0cmluZyk6VUlDb21wb25lbnQge1xuXHRcdHZhciBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEFycmF5W2xhYmVsXTtcblx0XHRyZXR1cm4gY29tcG9uZW50XG5cdH1cblx0cHVibGljIGdldEZpZWxkQ29tcG9uZW50KGxhYmVsOnN0cmluZyk6VUlGaWVsZCB7XG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50QXJyYXlbbGFiZWxdO1xuXHRcdHJldHVybiBjb21wb25lbnRcblx0fVxuXG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHR9XG5cdFxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uc2V0RGF0YSh0aGlzKTtcblx0XHR9XG5cdH1cblx0cHVibGljIGRlc3Ryb3lWaWV3KCkge1xuXHRcdGlmICgkJCh0aGlzLmNvbXBvbmVudElEKSkgJCQodGhpcy5jb21wb25lbnRJRCkuZGVzdHJ1Y3RvcigpO1xuXHR9XG5cdHB1YmxpYyBkZXN0cnVjdG9yKCkge1xuXHRcdHN1cGVyLmRlc3RydWN0b3IoKTtcblx0XHRmb3IgKHZhciBpdGVtIGluIHRoaXMuY29tcG9uZW50QXJyYXkpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50QXJyYXlbaXRlbV0uZGVzdHJ1Y3RvcigpO1xuXHRcdH1cblx0fVxuXG59IHRoaXMuVUlDb21wbGV4Q29tcG9uZW50ID0gVUlDb21wbGV4Q29tcG9uZW50O1xuXG5jbGFzcyBQb3J0YWxTZWN0aW9uIGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdC8vcmVnaW9uIEluc3RhbmNlIFZhcmlhYmxlc1xuXHRwdWJsaWMgcG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBudWxsO1xuXHRwdWJsaWMgY2xhc3NUeXBlOkNsYXNzVHlwZTtcblx0cHVibGljIHRoZUFycmF5OkFycmF5PGFueT47XG5cdHB1YmxpYyBncmF2aXR5Om51bWJlciAgICAgICAgICAgICA9IDE7XG5cdHB1YmxpYyBwb3J0bGV0TmFtZSAgICAgICAgICAgICAgICA9IFwiXCI7XG5cdHB1YmxpYyBzZWN0aW9uSGVhZGVyOlBvcnRhbEhlYWRlciA9IG51bGw7XG5cdHByaXZhdGUgdGVtcGxhdGUgICAgICAgICAgICAgICAgICA9IHt0eXBlOiBcImxpbmVcIn07XG5cdHByaXZhdGUgX3Njcm9sbEJhclggICAgICAgICAgICAgICA9IGZhbHNlO1xuXHRwcml2YXRlIF9zY3JvbGxCYXJZICAgICAgICAgICAgICAgPSBmYWxzZTtcblx0Ly9lbmRyZWdpb25cblx0Ly9yZWdpb24gQ2xhc3MgVmFyaWFibGVzXG5cdHB1YmxpYyBzdGF0aWMgQ09MVU1OUyA9IFwiY29sc1wiO1xuXHRwdWJsaWMgc3RhdGljIFJPV1MgICAgPSBcInJvd3NcIjtcblx0cHVibGljIHN0YXRpYyBSRVNJWkVSID0gXCJyZXNpemVyXCI7XG5cdHB1YmxpYyBzdGF0aWMgUk9PVCAgICA9IFwicm9vdDtcIlxuXHRwdWJsaWMgc3RhdGljIEhFQURFUiAgPSBcImhlYWRlclwiO1xuXHRwdWJsaWMgc3RhdGljIFBPUlRMRVQgPSBcInBvcnRsZXRcIjtcblx0Ly9lbmRyZWdpb25cblx0Ly9yZWdpb24gQ2xhc3MgTWV0aG9kc1xuXHRwdWJsaWMgc3RhdGljIENyZWF0ZUNvbHVtbnMoKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxDb2x1bW4oKTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgQ3JlYXRlUm93cygpIHtcblx0XHRyZXR1cm4gbmV3IFBvcnRhbFJvdygpO1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBDcmVhdGVSb290KCkge1xuXHRcdHJldHVybiBuZXcgUG9ydGFsUm9vdCgpO1xuXHR9XG5cblx0Ly9lbmRyZWdpb25cblx0Z2V0IHNjcm9sbEJhclgoKTpib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsQmFyWDtcblx0fVxuXHRzZXQgc2Nyb2xsQmFyWCh2YWx1ZTpib29sZWFuKSB7XG5cdFx0dGhpcy5fc2Nyb2xsQmFyWCA9IHZhbHVlO1xuXHR9XG5cdGdldCBzY3JvbGxCYXJZKCk6Ym9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbEJhclk7XG5cdH1cblx0c2V0IHNjcm9sbEJhclkodmFsdWU6Ym9vbGVhbikge1xuXHRcdHRoaXMuX3Njcm9sbEJhclkgPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKG5hbWUgPSBcIm5vU2VjdGlvbk5hbWVcIikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRJRChcIlBvcnRhbFNlY3Rpb25fXCIpO1xuXHRcdHRoaXMudGhlQXJyYXkgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHRoaXMucG9ydGxldE5hbWUgPSBuYW1lO1xuXHR9XG5cblx0cHVibGljIGFkZFBvcnRsZXQobmFtZSwgZ3Jhdml0eSA9IDEpOlBvcnRsZXQge1xuXHRcdHZhciBwb3J0bGV0ID0gbmV3IFBvcnRsZXQobmFtZSwgZ3Jhdml0eSk7XG5cdFx0dGhpcy50aGVBcnJheS5wdXNoKHBvcnRsZXQpO1xuXHRcdHJldHVybiBwb3J0bGV0O1xuXHR9XG5cdHB1YmxpYyBhZGRTZWN0aW9uKHRoZVNlY3Rpb246UG9ydGFsU2VjdGlvbiwgZ3Jhdml0eSA9IDEpIHtcblx0XHR0aGlzLnRoZUFycmF5LnB1c2godGhlU2VjdGlvbik7XG5cdFx0dGhpcy5ncmF2aXR5ID0gZ3Jhdml0eVxuXHR9XG5cdHB1YmxpYyBhZGRSZXNpemVyKCk6UG9ydGFsU2VjdGlvbiB7XG5cdFx0dmFyIHJlc2l6ZXIgPSBuZXcgUG9ydGFsUmVzaXplcigpO1xuXHRcdHRoaXMudGhlQXJyYXkucHVzaChyZXNpemVyKTtcblx0XHRyZXR1cm4gcmVzaXplcjtcblx0fVxuXHRwdWJsaWMgYWRkSGVhZGVyKHRpdGxlOnN0cmluZyk6UG9ydGFsSGVhZGVyIHtcblx0XHR2YXIgaGVhZGVyID0gbmV3IFBvcnRhbEhlYWRlcih0aXRsZSk7XG5cdFx0dGhpcy50aGVBcnJheS51bnNoaWZ0KGhlYWRlcik7XG5cdFx0dGhpcy5zZWN0aW9uSGVhZGVyID0gaGVhZGVyO1xuXHRcdHJldHVybiBoZWFkZXI7XG5cdH1cblx0cHVibGljIHJlbW92ZUhlYWRlcigpIHtcblx0XHRpZiAoIXRoaXMuc2VjdGlvbkhlYWRlcikgcmV0dXJuO1xuXHRcdHRoaXMudGhlQXJyYXkuc2hpZnQoKTtcblx0fVxuXG5cdC8vcmVnaW9uIFVJQ29tcG9uZW50IE1ldGhvZHNcblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMudGVtcGxhdGVbXCJncmF2aXR5XCJdID0gdGhpcy5ncmF2aXR5O1xuXHRcdHRoaXMudGVtcGxhdGVbXCJpZFwiXSAgICAgID0gdGhpcy5jb21wb25lbnRJRDtcblx0XHR0aGlzLnRlbXBsYXRlW1wiZHJhZ1wiXSAgICA9IHRydWU7XG5cdFx0aWYgKHRoaXMuc2Nyb2xsQmFyWCAmJiB0aGlzLnNjcm9sbEJhclkpIHtcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx4eVwiXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnNjcm9sbEJhclgpXG5cdFx0XHR0aGlzLnRlbXBsYXRlW1wic2Nyb2xseFwiXSA9IHRydWU7IGVsc2UgaWYgKHRoaXMuc2Nyb2xsQmFyWSlcblx0XHRcdHRoaXMudGVtcGxhdGVbXCJzY3JvbGx5XCJdID0gdHJ1ZTtcblx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZTtcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy50aGVBcnJheSkge1xuXHRcdFx0dGhpcy50aGVBcnJheVtpdGVtXS5pbml0aWFsaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9lbmRyZWdpb25cbn0gdGhpcy5Qb3J0YWxTZWN0aW9uID0gUG9ydGFsU2VjdGlvbjtcblxuY2xhc3MgUG9ydGFsQ29sdW1uIGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xuXHRcdHN1cGVyKG5hbWUpO1xuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ID0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TO1xuXHRcdHRoaXMuY2xhc3NUeXBlICAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5DT0xVTU5TO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxDb2x1bW5fXCIpO1xuXHR9XG59IHRoaXMuUG9ydGFsQ29sdW1uID0gUG9ydGFsQ29sdW1uXG5cbmNsYXNzIFBvcnRhbFJvb3QgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XG5cdFx0c3VwZXIobmFtZSk7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPT1Q7XG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgPSBcInJvb3RcIjtcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsUm9vdF9cIik7XG5cdH1cbn0gdGhpcy5Qb3J0YWxSb290ID0gUG9ydGFsUm9vdFxuXG5jbGFzcyBQb3J0YWxSb3cgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0Y29uc3RydWN0b3IobmFtZT86c3RyaW5nKSB7XG5cdFx0c3VwZXIobmFtZSk7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XG5cdFx0dGhpcy5jbGFzc1R5cGUgICAgICAgICAgPSBcInJvd1wiO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSb3dfXCIpO1xuXHR9XG59dGhpcy5Qb3J0YWxSb3cgPSBQb3J0YWxSb3c7XG5cbmNsYXNzIFBvcnRhbEhlYWRlciBleHRlbmRzIFBvcnRhbFNlY3Rpb24ge1xuXHRwdWJsaWMgaGVhZGVyVGVtcGxhdGUgICAgPSB7dmlldzogXCJ0ZW1wbGF0ZVwiLCB0ZW1wbGF0ZTogXCJIZWFkZXJcIiwgdHlwZTogXCJoZWFkZXJcIn07XG5cdHB1YmxpYyBoZWFkZXJWaWV3OmFueTtcblx0cHVibGljIGhlYWRlclRleHQ6c3RyaW5nID0gbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxIZWFkZXJfXCIpO1xuXHRcdHRoaXMucG9ydGFsU2VjdGlvbkluZGV4ICAgICAgICAgPSBQb3J0YWxTZWN0aW9uLkhFQURFUjtcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICAgICAgID0gUG9ydGFsU2VjdGlvbi5IRUFERVI7XG5cdFx0dGhpcy5oZWFkZXJUZW1wbGF0ZVtcImlkXCJdICAgICAgID0gXCJoZWFkZXJfXCIgKyB3ZWJpeC51aWQoKTtcblx0XHR0aGlzLmhlYWRlclRlbXBsYXRlW1widGVtcGxhdGVcIl0gPSB0aXRsZTtcblx0XHR0aGlzLmhlYWRlclRleHQgICAgICAgICAgICAgICAgID0gdGl0bGU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0cmV0dXJuIHRoaXMuaGVhZGVyVGVtcGxhdGU7XG5cdH1cbn10aGlzLlBvcnRhbEhlYWRlciA9IFBvcnRhbEhlYWRlcjtcbmNsYXNzIFBvcnRhbFJlc2l6ZXIgZXh0ZW5kcyBQb3J0YWxTZWN0aW9uIHtcblx0cHVibGljICByZXNpemVyVGVtcGxhdGUgPSB7dmlldzogXCJyZXNpemVyXCJ9O1xuXG5cdGNvbnN0cnVjdG9yKG5hbWU/OnN0cmluZykge1xuXHRcdHN1cGVyKG5hbWUpO1xuXHRcdHRoaXMuc2V0SUQoXCJQb3J0YWxSZXNpemVyX1wiKTtcblx0XHR0aGlzLnBvcnRhbFNlY3Rpb25JbmRleCAgICA9IFBvcnRhbFNlY3Rpb24uUkVTSVpFUjtcblx0XHR0aGlzLmNsYXNzVHlwZSAgICAgICAgICAgICA9IFBvcnRhbFNlY3Rpb24uUkVTSVpFUjtcblx0XHR0aGlzLnJlc2l6ZXJUZW1wbGF0ZVtcImlkXCJdID0gXCJ1aVJlc2l6ZXJfXCIgKyB3ZWJpeC51aWQoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHRyZXR1cm4gdGhpcy5yZXNpemVyVGVtcGxhdGU7XG5cdH1cbn10aGlzLlBvcnRhbFJlc2l6ZXIgPSBQb3J0YWxSZXNpemVyO1xuXG5jbGFzcyBQb3J0bGV0IGV4dGVuZHMgUG9ydGFsU2VjdGlvbiB7XG5cblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXG5cdHB1YmxpYyBwb3J0bGV0Vmlldzphbnk7XG5cdHB1YmxpYyBwb3J0bGV0Q29tcG9uZW50Vmlldzphbnk7XG5cdHB1YmxpYyBkZWZhdWx0UG9ydGxldFZpZXc6YW55O1xuXHRwdWJsaWMgbm9uQ29tcG9uZW50VmlldzphbnkgPSBudWxsO1xuXHRwdWJsaWMgaW50ZXJuYWxWaWV3OmFueVxuXHRwdWJsaWMgZ3Jhdml0eTpudW1iZXI7XG5cdHB1YmxpYyB2aWV3Q29udHJvbGxlcjpVSUNvbXBvbmVudDtcblx0cHVibGljIGhpZGRlbjpib29sZWFuICAgICAgID0gZmFsc2U7XG5cdC8vZW5kcmVnaW9uXG5cdHB1YmxpYyBzdGF0aWMgY2FzdChhU2VjdGlvbjphbnkpOlBvcnRsZXQge1xuXHRcdHJldHVybiA8UG9ydGxldD4gYVNlY3Rpb247XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihwb3J0bGV0TmFtZTpzdHJpbmcsIGdyYXZpdHkgPSAxKSB7XG5cdFx0c3VwZXIocG9ydGxldE5hbWUpO1xuXHRcdHRoaXMuZ3Jhdml0eSAgICAgICAgICAgICAgPSBncmF2aXR5O1xuXHRcdHRoaXMucG9ydGxldFZpZXcgICAgICAgICAgPSB7aWQ6IHRoaXMuY29tcG9uZW50SUQsIG1pbldpZHRoOiAxMDAsIHRlbXBsYXRlOiBcIkNvbnRlbnRcIiwgdmlldzogXCJ0ZW1wbGF0ZVwifVxuXHRcdHRoaXMucG9ydGxldENvbXBvbmVudFZpZXcgPSB7dHlwZTogXCJsaW5lXCJ9XG5cdFx0dGhpcy5kZWZhdWx0UG9ydGxldFZpZXcgICA9IHRoaXMucG9ydGxldFZpZXc7XG5cdFx0dGhpcy5wb3J0YWxTZWN0aW9uSW5kZXggICA9IFBvcnRhbFNlY3Rpb24uUE9SVExFVDtcblx0XHR0aGlzLnNldElEKFwiUG9ydGxldF9cIik7XG5cdH1cblxuXHRwdWJsaWMgcmVwbGFjZVZpZXcoKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWaWV3KCksIG51bGwsIDYpKTtcblx0XHR3ZWJpeC51aSh0aGlzLmdldFZpZXcoKSwgJCQodGhpcy5jb21wb25lbnRJRCkpO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXHRcdC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0VmlldygpLCBudWxsLCA2KSk7XG5cdH1cblx0cHVibGljIGhpZGUoKSB7XG5cdFx0dGhpcy5oaWRkZW4gPSB0cnVlO1xuXHR9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cdH1cblx0cHVibGljIHJlc2V0VmlldygpIHtcblx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXdcblx0fVxuXHRwdWJsaWMgc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xuXHRcdHRoaXMudmlld0NvbnRyb2xsZXIgPSB0aGVDb21wb25lbnQ7XG5cdH1cblx0cHVibGljIHJlc2l6ZSgpIHtcblx0XHRpZiAoJCQodGhpcy5jb21wb25lbnRJRCkpIHtcblx0XHRcdCQkKHRoaXMuY29tcG9uZW50SUQpLnJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudHMgTWV0aG9kc1xuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0aWYgKHRoaXMudmlld0NvbnRyb2xsZXIpIHtcblx0XHRcdHZhciB2aWV3QXJyYXkgICAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3ICAgICAgICAgPSB0aGlzLnBvcnRsZXRDb21wb25lbnRWaWV3O1xuXHRcdFx0dmFyIGNvbnRyb2xsZXJWaWV3ICAgICAgID0gdGhpcy52aWV3Q29udHJvbGxlci5nZXRWaWV3KCk7XG5cdFx0XHR2aWV3QXJyYXlbMF0gICAgICAgICAgICAgPSBjb250cm9sbGVyVmlldztcblx0XHRcdHRoaXMucG9ydGxldFZpZXdbXCJyb3dzXCJdID0gdmlld0FycmF5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnBvcnRsZXRWaWV3ID0gdGhpcy5kZWZhdWx0UG9ydGxldFZpZXc7XG5cdFx0fVxuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJpZFwiXSAgICAgID0gdGhpcy5nZXRDb21wb25lbnRJRCgpO1xuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJncmF2aXR5XCJdID0gdGhpcy5ncmF2aXR5O1xuXHRcdHRoaXMucG9ydGxldFZpZXdbXCJkcmFnXCJdICAgID0gdHJ1ZTtcblx0XHRyZXR1cm4gdGhpcy5wb3J0bGV0Vmlldztcblx0fVxuXHRwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHRcdGlmICh0aGlzLnZpZXdDb250cm9sbGVyKSB7XG5cdFx0XHR0aGlzLnZpZXdDb250cm9sbGVyLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLnRoZUFycmF5KSB7XG5cdFx0XHR0aGlzLnRoZUFycmF5W2l0ZW1dLmluaXRpYWxpemUoKTtcblx0XHR9XG5cdH1cblx0Ly9lbmRyZWdpb25cbn0gdGhpcy5Qb3J0bGV0ID0gUG9ydGxldDtcblxuZW51bSBQb3J0YWxUeXBlIHsgT25lVmlldywgRXhwbG9yZXJWaWV3LCBEZXRhaWxWaWV3IH10aGlzLlBvcnRhbFR5cGUgPSBQb3J0YWxUeXBlO1xuZW51bSBQb3J0YWxOYW1lcyB7RVhQTE9SRVIgPSAwLCBERVRBSUwgPSAxLCBNQUlOID0gMiwgSU5GTyA9IDN9dGhpcy5Qb3J0YWxOYW1lcyA9IFBvcnRhbE5hbWVzO1xuXG5jbGFzcyBQb3J0YWwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG5cdHB1YmxpYyBwb3J0YWxSb290OlBvcnRhbFJvb3Q7XG5cdHB1YmxpYyBwb3J0YWxDb250YWluZXI6c3RyaW5nID0gbnVsbDtcblx0cHVibGljIHZpZXdQb3J0bGV0OlBvcnRsZXQgICAgPSBudWxsO1xuXHRwdWJsaWMgcG9ydGFsVHlwZTpQb3J0YWxUeXBlO1xuXHRwdWJsaWMgbmV3Vmlld1BvcnQ6Ym9vbGVhbiAgICA9IGZhbHNlO1xuXHRwdWJsaWMgdmlld1R5cGUgICAgICAgICAgICAgICA9IG51bGw7XG5cdHB1YmxpYyBzZWN0aW9uVGVtcGxhdGUgICAgICAgID0ge3R5cGU6IFwibGluZVwifTtcblxuXHRjb25zdHJ1Y3Rvcihwb3J0YWxUeXBlPzpQb3J0YWxUeXBlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldElEKFwiUG9ydGFsX1wiKTtcblx0XHR0aGlzLnBvcnRhbFJvb3QgPSBuZXcgUG9ydGFsUm9vdCgpO1xuXHRcdGlmICghcG9ydGFsVHlwZSkge1xuXHRcdFx0c3dpdGNoIChwb3J0YWxUeXBlKSB7XG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5PbmVWaWV3IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZU9uZVZpZXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFBvcnRhbFR5cGUuRXhwbG9yZXJWaWV3IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgUG9ydGFsVHlwZS5EZXRhaWxWaWV3IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZURldGFpbFZpZXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBwb3J0YWxTdHJpbmcocG9ydGFsTmFtZXM6UG9ydGFsTmFtZXMpIHtcblx0XHRzd2l0Y2ggKHBvcnRhbE5hbWVzKSB7XG5cdFx0XHRjYXNlIFBvcnRhbE5hbWVzLkVYUExPUkVSIDpcblx0XHRcdFx0cmV0dXJuIFwiZXhwbG9yZXJcIjtcblx0XHRcdGNhc2UgUG9ydGFsTmFtZXMuREVUQUlMIDpcblx0XHRcdFx0cmV0dXJuIFwiZGV0YWlsQXJlYVwiO1xuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5NQUlOIDpcblx0XHRcdFx0cmV0dXJuIFwibWFpblwiO1xuXHRcdFx0Y2FzZSBQb3J0YWxOYW1lcy5JTkZPIDpcblx0XHRcdFx0cmV0dXJuIFwiaW5mb1wiO1xuXHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdHJldHVybiBcIk5PTkFNRVwiO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZUV4cGxvcmVyVmlldygpIHtcblx0XHR2YXIgcm9vdCAgICAgID0gdGhpcy5nZXRSb290KCk7XG5cdFx0dmFyIG5ld0NvbHVtbiA9IHRoaXMuY3JlYXRlQ29sdW1ucyhcImNvbHVtbnNcIik7XG5cdFx0dmFyIG5ld1JvdyAgICA9IHRoaXMuY3JlYXRlUm93cyhcInJvd3NcIik7XG5cdFx0cm9vdC5hZGRTZWN0aW9uKG5ld0NvbHVtbik7XG5cdFx0bmV3Q29sdW1uLmFkZFBvcnRsZXQoUG9ydGFsTmFtZXMuRVhQTE9SRVIpO1xuXHRcdG5ld0NvbHVtbi5hZGRSZXNpemVyKCk7XG5cdFx0bmV3Um93LmFkZFBvcnRsZXQoUG9ydGFsTmFtZXMuREVUQUlMKTtcblx0XHRuZXdSb3cuYWRkUmVzaXplcigpO1xuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KFBvcnRhbE5hbWVzLklORk8pO1xuXHRcdG5ld0NvbHVtbi5hZGRTZWN0aW9uKG5ld1Jvdyk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemVPbmVWaWV3KCkge1xuXHRcdHZhciByb290ICAgICAgPSB0aGlzLmdldFJvb3QoKTtcblx0XHR2YXIgbmV3Q29sdW1uID0gdGhpcy5jcmVhdGVDb2x1bW5zKFwiY29sdW1uc1wiKTtcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Q29sdW1uKTtcblx0XHRuZXdDb2x1bW4uYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5NQUlOKSk7XG5cdH1cblx0cHVibGljIGluaXRpYWxpemVEZXRhaWxWaWV3KCkge1xuXHRcdHZhciByb290ICAgPSB0aGlzLmdldFJvb3QoKTtcblx0XHR2YXIgbmV3Um93ID0gdGhpcy5jcmVhdGVSb3dzKFwicm93c1wiKTtcblx0XHRyb290LmFkZFNlY3Rpb24obmV3Um93KTtcblx0XHRuZXdSb3cuYWRkUG9ydGxldCh0aGlzLnBvcnRhbFN0cmluZyhQb3J0YWxOYW1lcy5ERVRBSUwpKTtcblx0XHRuZXdSb3cuYWRkUmVzaXplcigpO1xuXHRcdG5ld1Jvdy5hZGRQb3J0bGV0KHRoaXMucG9ydGFsU3RyaW5nKFBvcnRhbE5hbWVzLklORk8pKTtcblx0fVxuXHRwdWJsaWMgZ2V0Um9vdCgpOlBvcnRhbFJvb3Qge1xuXHRcdHJldHVybiB0aGlzLnBvcnRhbFJvb3Q7XG5cdH1cblx0cHVibGljIGNyZWF0ZUNvbHVtbnMobmFtZT8pOlBvcnRhbENvbHVtbiB7XG5cdFx0cmV0dXJuIG5ldyBQb3J0YWxDb2x1bW4obmFtZSk7XG5cdH1cblx0cHVibGljIGNyZWF0ZVJvd3MobmFtZT86c3RyaW5nKTpQb3J0YWxSb3cge1xuXHRcdHJldHVybiBuZXcgUG9ydGFsUm93KG5hbWUpO1xuXHR9XG5cdHB1YmxpYyBzZXRDb250YWluZXIoY29udGFpbmVySUQ6c3RyaW5nKSB7XG5cdFx0dGhpcy5wb3J0YWxDb250YWluZXIgPSBjb250YWluZXJJRDtcblx0XHR0aGlzLnZpZXdQb3J0bGV0ICAgICA9IG51bGw7XG5cdH1cblx0cHVibGljIHNldFZpZXdQb3J0bGV0KHRoZVBvcnRsZXQ6UG9ydGxldCkge1xuXHRcdHRoaXMudmlld1BvcnRsZXQgICAgID0gdGhlUG9ydGxldDtcblx0XHR0aGlzLnBvcnRhbENvbnRhaW5lciA9IFwiXCI7XG5cdH1cblx0cHVibGljIGdldFBvcnRsZXQocG9ydGFsTmFtZTpzdHJpbmcpOlBvcnRsZXQge1xuXHRcdHJldHVybiBQb3J0bGV0LmNhc3QodGhpcy5maW5kKHRoaXMucG9ydGFsUm9vdCwgcG9ydGFsTmFtZSkpO1xuXHR9XG5cdHB1YmxpYyBmaW5kKHBvcnRhbFNlY3Rpb246UG9ydGFsU2VjdGlvbiwgbmFtZSk6UG9ydGFsU2VjdGlvbiB7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiBwb3J0YWxTZWN0aW9uLnRoZUFycmF5KSB7XG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0bGV0TmFtZSA9PSBuYW1lKVxuXHRcdFx0XHRyZXR1cm4gcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXTtcblx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmZpbmQoPFBvcnRhbFNlY3Rpb24+IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0sIG5hbWUpO1xuXHRcdFx0aWYgKHJlc3VsdClcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHZhciB2aWV3QXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHZhciB0aGVWaWV3ICAgPSB0aGlzLnNlY3Rpb25UZW1wbGF0ZTtcblx0XHR0aGVWaWV3W1wiaWRcIl0gICA9IHRoaXMuZ2V0Q29tcG9uZW50SUQoKTtcblx0XHR2aWV3QXJyYXlbMF0gICAgPSB0aGlzLmNyZWF0ZVBvcnRhbFZpZXcoKTtcblx0XHR0aGVWaWV3W1wicm93c1wiXSA9IHZpZXdBcnJheTtcblx0XHRpZiAodGhpcy52aWV3VHlwZSlcblx0XHRcdHRoZVZpZXdbXCJ2aWV3XCJdID0gdGhpcy52aWV3VHlwZTtcblx0XHR0aGlzLnNldENvbXBvbmVudFZpZXcodGhlVmlldyk7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXHRwdWJsaWMgY3JlYXRlUG9ydGFsVmlldygpOmFueSB7XG5cdFx0dmFyIHRoZVBvcnRhbFZpZXc6UG9ydGxldDtcblx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUodGhpcy5wb3J0YWxSb290KTtcblx0XHRyZXR1cm4gcmVzdWx0QXJyYXlbMF07XG5cdH1cblx0cHVibGljIHRyZWUocG9ydGFsU2VjdGlvbjpQb3J0YWxTZWN0aW9uKTpBcnJheTxhbnk+IHtcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gcG9ydGFsU2VjdGlvbi50aGVBcnJheSkge1xuXHRcdFx0aW5kZXggPSBQb3J0YWxTZWN0aW9uLlJPV1M7XG5cdFx0XHRpZiAocG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXgpXG5cdFx0XHRcdGlmIChwb3J0YWxTZWN0aW9uLnRoZUFycmF5W2l0ZW1dLnBvcnRhbFNlY3Rpb25JbmRleCA9PSBQb3J0YWxTZWN0aW9uLkNPTFVNTlMgfHwgcG9ydGFsU2VjdGlvbi50aGVBcnJheVtpdGVtXS5wb3J0YWxTZWN0aW9uSW5kZXggPT0gUG9ydGFsU2VjdGlvbi5ST1dTKVxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0ucG9ydGFsU2VjdGlvbkluZGV4O1xuXHRcdFx0dmFyIHJlc3VsdCA9IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0uZ2V0VmlldygpO1xuXHRcdFx0aWYgKHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0udGhlQXJyYXkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0QXJyYXkgPSB0aGlzLnRyZWUoPFBvcnRhbFNlY3Rpb24+IHBvcnRhbFNlY3Rpb24udGhlQXJyYXlbaXRlbV0pO1xuXHRcdFx0XHRyZXN1bHRbaW5kZXhdICAgPSByZXN1bHRBcnJheTtcblx0XHRcdH1cblx0XHRcdHJldHVybkFycmF5LnB1c2gocmVzdWx0KVxuXHRcdFx0Ly8gIGNvbnNvbGUubG9nKFwiUmV0dXJuaW5nIFJlc3VsdFwiK0M0bG9nLnByaW50VGhpcyhyZXN1bHQpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldHVybkFycmF5O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplVHJlZSgpIHtcblx0XHR2YXIgcmV0dXJuQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5wb3J0YWxSb290LnRoZUFycmF5KSB7XG5cdFx0XHR0aGlzLnBvcnRhbFJvb3QudGhlQXJyYXlbaXRlbV0uaW5pdGlhbGl6ZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0dXJuQXJyYXk7XG5cdH1cblx0cHVibGljIHJlZnJlc2goKSB7XG5cdFx0dGhpcy5zaG93KCk7XG5cdH1cblx0cHVibGljIHNob3codGhlV2luZG93PzphbnkpOmFueSB7XG5cdFx0dmFyIHNob3dWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XG5cdFx0dmFyIHhWaWV3OmFueTtcblx0XHRpZiAodGhlV2luZG93KSB7XG5cdFx0XHR2YXIgcm93cyAgICAgICAgICA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0XHRyb3dzWzBdICAgICAgICAgICA9IHNob3dWaWV3O1xuXHRcdFx0dGhlV2luZG93W1wicm93c1wiXSA9IHJvd3M7XG5cdFx0XHRBcHBMb2cucHJpbnRUaGlzKHRoZVdpbmRvdyk7XG5cdFx0XHR4VmlldyA9IHdlYml4LnVpKHRoZVdpbmRvdykuc2hvdygpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wb3J0YWxDb250YWluZXIpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50Vmlld1tcImNvbnRhaW5lclwiXSA9IHRoaXMucG9ydGFsQ29udGFpbmVyO1xuXHRcdFx0e1xuXHRcdFx0XHRBcHBMb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcblx0XHRcdFx0eFZpZXcgPSB3ZWJpeC51aShzaG93VmlldywgdGhpcy5wb3J0YWxDb250YWluZXIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRBcHBMb2cucHJpbnRUaGlzKHNob3dWaWV3KTtcblx0XHRcdHhWaWV3ID0gd2ViaXgudWkoc2hvd1ZpZXcsICQkKHRoaXMuY29tcG9uZW50SUQpKTtcblx0XHR9XG5cdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIlNob3cgVmlld1wiKTtcblx0XHQvL0M0bG9nLnByaW50VGhpcyhzaG93Vmlldyk7XG5cdFx0cmV0dXJuIHhWaWV3O1xuXHR9XG5cdHB1YmxpYyBwb3B1cCh0aGVXaW5kb3c6YW55KSB7XG5cdFx0dmFyIHNob3dWaWV3ID0gdGhpcy5nZXRWaWV3KCk7XG5cdFx0dmFyIHJvd3MgICAgICAgICAgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdHJvd3NbMF0gICAgICAgICAgID0gc2hvd1ZpZXc7XG5cdFx0dGhlV2luZG93W1wiYm9keVwiXSA9IEM0T2JqZWN0LkNsb25lKHNob3dWaWV3KTtcblx0XHQvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoZVdpbmRvdykpO1xuXHRcdHZhciBuZXdXaW5kb3cgPSB3ZWJpeC51aSh0aGVXaW5kb3cpO1xuXHRcdHJldHVybiBuZXdXaW5kb3c7XG5cdH1cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0fVxuXHRwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcblx0XHRzdXBlci5pbml0aWFsaXplKCk7XG5cdFx0c3VwZXIuZGVmaW5lRXZlbnRzKCk7XG5cdFx0dGhpcy5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmluaXRpYWxpemVUcmVlKCk7XG5cdH1cblxufSB0aGlzLlBvcnRhbCA9IFBvcnRhbDtcblxuY2xhc3MgVUlQb3B1cFdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cdHB1YmxpYyBzdGF0aWMgQ2xvc2VCdXR0b24oKSB7XG5cdFx0dmFyIHRoZUlEICAgICAgICA9IHRoaXNbXCJjb25maWdcIl0uaWQ7XG5cdFx0dmFyIHRoZUNvbXBvbmVudCA9IDxVSUNvbXBvbmVudD4gJCQodGhlSUQpW1wiY29tcG9uZW50XCJdO1xuXHRcdCQkKHRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKS5jbG9zZSgpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgRnVsbFNjcmVlbigpIHtcblx0XHR2YXIgdGhlSUQgICAgICAgID0gdGhpc1tcImNvbmZpZ1wiXS5pZDtcblx0XHR2YXIgdGhlQ29tcG9uZW50ID0gPFVJUG9wdXBXaW5kb3c+ICQkKHRoZUlEKVtcImNvbXBvbmVudFwiXTtcblx0XHR0aGVDb21wb25lbnQuZnVsbHNjcmVlblRvZ2dsZSgpO1xuXHR9XG5cblx0Ly9yZWdpb24gSW5zdGFuY2UgVmFyaWFibGVzXG5cdHB1YmxpYyB0aXRsZTpzdHJpbmc7XG5cdHB1YmxpYyByZXNpemU6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgbW9kYWw6Ym9vbGVhbiAgPSB0cnVlO1xuXHRwdWJsaWMgdGhlQ29tcG9uZW50OlVJQ29tcG9uZW50O1xuXHRwdWJsaWMgdGhlUG9ydGFsICAgICAgPSBuZXcgUG9ydGFsKCk7XG5cdHB1YmxpYyBjbG9zZUJ1dHRvbklEICA9IFwiY2xvc2VCdXR0b25fXCIgKyB3ZWJpeC51aWQoKTtcblx0cHVibGljIGZ1bGxzY3JlZW5JRCAgID0gXCJmdWxsU2NyZWVuSURfXCIrd2ViaXgudWlkKCk7XG5cdHB1YmxpYyB3aWR0aCAgICAgICAgICA9IDUwMDtcblx0cHVibGljIGhlaWdodCAgICAgICAgID0gNTAwO1xuXHQvL2VuZHJlZ2lvblxuXHRjb25zdHJ1Y3RvcihsYWJlbDpzdHJpbmcgPSBcIlBvcHVwIFdpbmRvd1wiLCB0aGVDb21wb25lbnQ6VUlDb21wb25lbnQgPSBudWxsKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmFkZFByb3BlcnRpZXMgKCB7IHdpZHRoIDogdGhpcy53aWR0aCwgaGVpZ2h0IDogdGhpcy5oZWlnaHQgfSlcblx0XHR0aGlzLnNldElEKFwiVUlQb3B1cFdpbmRvd19cIik7XG5cdFx0dmFyIHBvcnRhbFJvb3QgPSB0aGlzLnRoZVBvcnRhbC5nZXRSb290KCk7XG5cdFx0dmFyIHJvd3MgPSB0aGlzLnRoZVBvcnRhbC5jcmVhdGVSb3dzKCk7XG5cdFx0cm93cy5hZGRQb3J0bGV0KFwibWFpblwiKTtcblx0XHRwb3J0YWxSb290LmFkZFNlY3Rpb24oKHJvd3MpKTtcblx0XHR0aGlzLnNldENvbXBvbmVudCh0aGVDb21wb25lbnQpO1xuXHRcdHRoaXMuY29tcG9uZW50TGFiZWwgPSBsYWJlbDtcblx0fVxuXG5cdHB1YmxpYyBzZXRDb21wb25lbnQodGhlQ29tcG9uZW50OlVJQ29tcG9uZW50KSB7XG5cdFx0dGhpcy50aGVDb21wb25lbnQgPSB0aGVDb21wb25lbnQ7XG5cdFx0dGhpcy50aGVQb3J0YWwuZ2V0UG9ydGxldChcIm1haW5cIikuc2V0Q29tcG9uZW50KHRoZUNvbXBvbmVudCk7XG5cdFx0dGhpcy5hZGRDb21wb25lbnQoXCJjb21wb25lbnRcIiwgdGhlQ29tcG9uZW50KTtcblx0fVxuXHRwdWJsaWMgc2hvdyh0aGVDb21wb25lbnQ/OlVJQ29tcG9uZW50KSB7XG5cdFx0aWYgKHRoZUNvbXBvbmVudCkge1xuXHRcdFx0dGhpcy5zZXRDb21wb25lbnQodGhlQ29tcG9uZW50KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMudGhlQ29tcG9uZW50ID09PSBudWxsKSB7XG5cdFx0XHRBcHBMb2cuZXJyb3IoXCJUcnlpbmcgdG8gU2hvdyBXaW5kb3cgV2l0aCBNaXNzaW5nIFZpZXdcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBwb3B1cCA9IHRoaXMudGhlUG9ydGFsLnBvcHVwKHRoaXMuZ2V0VmlldygpKTtcblx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHRVSS5QbGF5U291bmQoU291bmRzLlBvcHVwKTtcblx0XHRwb3B1cC5zaG93KCk7XG5cdH1cblxuXHRwdWJsaWMgZnVsbHNjcmVlblRvZ2dsZSgpIHtcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5jb25maWcuZnVsbHNjcmVlbiA9ICEkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLmNvbmZpZy5mdWxsc2NyZWVuXG5cdFx0XHQkJCh0aGlzLmdldENvbXBvbmVudElEKCkpLnJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgaGlkZSgpIHtcblx0XHR0aGlzLnB1Ymxpc2goXCJjbG9zZVwiLCB0aGlzKTtcblx0XHRVSS5QbGF5U291bmQoU291bmRzLkNsb3NlRGlhZ3JhbSk7XG5cdFx0aWYgKCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkpIHtcblx0XHRcdCQkKHRoaXMuZ2V0Q29tcG9uZW50SUQoKSkuaGlkZSgpO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgY2xvc2UoKSB7XG5cdFx0dGhpcy5wdWJsaXNoKFwiY2xvc2VcIiwgdGhpcyk7XG5cdFx0aWYgKCQkKHRoaXMudGhlQ29tcG9uZW50LmdldENvbXBvbmVudElEKCkpKSB7XG5cdFx0XHQkJCh0aGlzLnRoZUNvbXBvbmVudC5nZXRDb21wb25lbnRJRCgpKS5kZXN0cnVjdG9yKCk7XG5cdFx0fVxuXHRcdFVJLlBsYXlTb3VuZChTb3VuZHMuQ2xvc2VEaWFncmFtKTtcblx0XHRpZiAoJCQodGhpcy5nZXRDb21wb25lbnRJRCgpKSkge1xuXHRcdFx0JCQodGhpcy5nZXRDb21wb25lbnRJRCgpKS5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXHQvL3JlZ2lvbiBVSUNvbXBvbmVudCBNZXRob2RzXG5cdHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0dmlldyAgICA6IFwid2luZG93XCIsXG5cdFx0XHRpZCAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdGNzcyAgICAgOiBcImM0cG9wdXAgYW5pbWF0ZWQgem9vbUluXCIsXG5cdFx0XHRwb3NpdGlvbjogXCJjZW50ZXJcIixcblx0XHRcdG1vZGFsICAgOiB0cnVlLFxuXHRcdFx0bW92ZSAgICA6IHRydWUsXG5cdFx0XHRzY3JvbGx4eTogdHJ1ZSxcblx0XHRcdGhpZGRlbiAgOiB0cnVlLFxuXHRcdFx0cmVzaXplICA6IHRydWUsXG5cdFx0XHRoZWFkICAgIDoge1xuXHRcdFx0XHR2aWV3OiBcInRvb2xiYXJcIiwgbWFyZ2luOiAtNCwgcG9zaXRpb246IFwiY2VudGVyXCIsIGNvbHM6IFtcblx0XHRcdFx0XHQge3ZpZXc6IFwibGFiZWxcIiwgbGFiZWw6IHRoaXMuY29tcG9uZW50TGFiZWx9LFxuXHRcdFx0XHRcdCB7dmlldyA6IFwiaWNvblwiLGlkIDogdGhpcy5mdWxsc2NyZWVuSUQsaWNvbiA6IFwiYXJyb3dzLWFsdFwiLGNzcyAgOiBcImFsdGVyXCIsY2xpY2s6IFVJUG9wdXBXaW5kb3cuRnVsbFNjcmVlbn0sXG5cdFx0ICAgICAgICAgICAgIHt2aWV3IDogXCJpY29uXCIsaWQgOiB0aGlzLmNsb3NlQnV0dG9uSUQsaWNvbiA6IFwidGltZXMtY2lyY2xlXCIsY3NzICA6IFwiYWx0ZXJcIixjbGljazogVUlQb3B1cFdpbmRvdy5DbG9zZUJ1dHRvbn1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHQvLyB0aGlzLnRoZUNvbXBvbmVudC5pbml0aWFsaXplKCk7XG5cdFx0JCQodGhpcy5jbG9zZUJ1dHRvbklEKVtcImNvbXBvbmVudFwiXSA9IHRoaXM7XG5cdFx0JCQodGhpcy5mdWxsc2NyZWVuSUQpW1wiY29tcG9uZW50XCJdID0gdGhpcztcblx0XHQkJCh0aGlzLmNvbXBvbmVudElEKVtcImNvbXBvbmVudFwiXSAgID0gdGhpcztcblx0fVxuXHQvL2VuZHJlZ2lvblxufSB0aGlzLlVJUG9wdXBXaW5kb3cgPSBVSVBvcHVwV2luZG93O1xuXG5jbGFzcyBDb25maXJtQWN0aW9uIHtcblx0bGFiZWw6c3RyaW5nO1xuXHRldmVudDpzdHJpbmc7XG59IHRoaXMuQ29uZmlybUFjdGlvbiA9IENvbmZpcm1BY3Rpb247XG5cbmNsYXNzIFVJQ29uZmlybVdpbmRvdyBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cdHByb3RlY3RlZCBwb3B1cDpVSVBvcHVwV2luZG93O1xuXHRwdWJsaWMgdGl0bGU6c3RyaW5nO1xuXHRwdWJsaWMgc3RhdGVtZW50OnN0cmluZztcblx0cHVibGljIG9wdGlvbjE6Q29uZmlybUFjdGlvbjtcblx0cHVibGljIG9wdGlvbjI6Q29uZmlybUFjdGlvbjtcblx0cHVibGljIG9wdGlvbjM6Q29uZmlybUFjdGlvbjtcblxuXHRjb25zdHJ1Y3Rvcih0aXRsZTpzdHJpbmcsIHN0YXRlbWVudDpzdHJpbmcsIG9wdGlvbjE6Q29uZmlybUFjdGlvbiwgb3B0aW9uMjpDb25maXJtQWN0aW9uID0gbnVsbCwgb3B0aW9uMzpDb25maXJtQWN0aW9uID0gbnVsbCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy50aXRsZSAgICAgPSB0aXRsZTtcblx0XHR0aGlzLnN0YXRlbWVudCA9IHN0YXRlbWVudDtcblx0XHR0aGlzLm9wdGlvbjEgICA9IG9wdGlvbjE7XG5cdFx0dGhpcy5vcHRpb24yICAgPSBvcHRpb24yO1xuXHRcdHRoaXMub3B0aW9uMyAgID0gb3B0aW9uMztcblx0fVxuXG5cdHB1YmxpYyBjbG9zZSgpIHtcblx0XHR0aGlzLnBvcHVwLmNsb3NlKCk7XG5cdH1cblx0cHVibGljIGxpc3RlbihldmVudDphbnksIG9iamVjdDphbnksIGNhbGxlcjpVSUNvbXBvbmVudCkge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJjbGlja1wiIDpcblx0XHRcdHtcblx0XHRcdFx0aWYgKGNhbGxlciA9PT0gdGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24xXCIpKSB7XG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoKHRoaXMub3B0aW9uMS5ldmVudCwgdGhpcy5vcHRpb24xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2FsbGVyID09PSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikpIHtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2godGhpcy5vcHRpb24yLmV2ZW50LCB0aGlzLm9wdGlvbjIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjYWxsZXIgPT09IHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uM1wiKSkge1xuXHRcdFx0XHRcdHRoaXMucHVibGlzaCh0aGlzLm9wdGlvbjMuZXZlbnQsIHRoaXMub3B0aW9uMyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiY2xvc2VcIiA6XG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMucHVibGlzaChcImNsb3NlXCIsIG51bGwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpOmFueSB7XG5cdFx0dmFyIHRpdGxlID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnRpdGxlLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsIGxhYmVsV2lkdGg6IDEwMH0pO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGl0bGVcIiwgdGl0bGUpO1xuXHRcdHZhciB0ZXh0ID0gbmV3IFVJTGFiZWwoe2xhYmVsOiB0aGlzLnN0YXRlbWVudCwgYWxpZ25tZW50OiBcImNlbnRlclwiLCBsYWJlbFdpZHRoOiAxMDB9KTtcblx0XHR0aGlzLmFkZENvbXBvbmVudChcInRleHRcIiwgdGV4dCk7XG5cdFx0dmFyIG9wdGlvbjEgPSBuZXcgVUlCdXR0b24oe2xhYmVsOiB0aGlzLm9wdGlvbjEubGFiZWx9KTtcblx0XHR0aGlzLmFkZENvbXBvbmVudChcIm9wdGlvbjFcIiwgb3B0aW9uMSk7XG5cdFx0aWYgKHRoaXMub3B0aW9uMSkge1xuXHRcdFx0dmFyIG9wdGlvbjIgPSBuZXcgVUlCdXR0b24odGhpcy5vcHRpb24yLmxhYmVsKTtcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uMlwiLCBvcHRpb24yKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMub3B0aW9uMykge1xuXHRcdFx0dmFyIG9wdGlvbjMgPSBuZXcgVUlCdXR0b24odGhpcy5vcHRpb24zLmxhYmVsKTtcblx0XHRcdHRoaXMuYWRkQ29tcG9uZW50KFwib3B0aW9uM1wiLCBvcHRpb24zKTtcblx0XHR9XG5cdFx0dGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcblx0XHRcdHZpZXc6IFwiZm9ybVwiLCBpZDogdGhpcy5nZXRDb21wb25lbnRJRCgpLCByb3dzOiB0aGlzLmNyZWF0ZUNvbXBvbmVudHNWaWV3KClcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbmZpcm1hdGlvblwiLCB0aGlzKTtcblx0XHR0aGlzLnBvcHVwLnN1YnNjcmliZShcImNsb3NlXCIsIHRoaXMpO1xuXHRcdHRoaXMucG9wdXAuc2hvdygpO1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XG5cdFx0dGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24xXCIpLnN1YnNjcmliZShcImNsaWNrXCIsIHRoaXMpO1xuXHRcdGlmICh0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjJcIikpIHRoaXMuZ2V0Q29tcG9uZW50KFwib3B0aW9uMlwiKS5zdWJzY3JpYmUoXCJjbGlja1wiLCB0aGlzKTtcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJvcHRpb24zXCIpKSB0aGlzLmdldENvbXBvbmVudChcIm9wdGlvbjNcIikuc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcyk7XG5cdH1cbn0gdGhpcy5VSUNvbmZpcm1XaW5kb3cgPSBVSUNvbmZpcm1XaW5kb3dcblxuY2xhc3MgVUlNdWx0aVZpZXcgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSU11bHRpVmlld19cIik7XG5cdH1cblxuXHRwdWJsaWMgYWRkVmlldyhsYWJlbDpzdHJpbmcsIGNvbXBvbmVudDpVSUNvbXBvbmVudCkge1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KGxhYmVsLCBjb21wb25lbnQpO1xuXHR9XG5cdHB1YmxpYyBzZXRSZWxhdGlvbnNoaXBPYmplY3QodGhlT2JqZWN0OmFueSkge1xuXHRcdHN1cGVyLnNldFJlbGF0aW9uc2hpcE9iamVjdCh0aGVPYmplY3QpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jb21wb25lbnRBcnJheVtpdGVtXSkge1xuXHRcdFx0dGhpcy5jb21wb25lbnRBcnJheVtpdGVtXS5zZXRSZWxhdGlvbnNoaXBPYmplY3QodGhpcy5nZXRSZWxhdGlvbnNoaXBPYmplY3QoKSk7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBjcmVhdGVDb21wb25lbnRzVmlldygpOmFueSB7XG5cdFx0dmFyIHZpZXdBcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0dmFyIGkgICAgICAgICA9IDA7XG5cdFx0Zm9yICh2YXIgaXRlbSBpbiB0aGlzLmNvbXBvbmVudEFycmF5KSB7XG5cdFx0XHRpZiAoaXRlbSAhPSBcInRvb2xiYXJcIilcblx0XHRcdFx0dmlld0FycmF5W2krK10gPSB7XG5cdFx0XHRcdFx0aGVhZGVyOiBpdGVtLCBib2R5OiB0aGlzLmNvbXBvbmVudEFycmF5W2l0ZW1dLmdldFZpZXcoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB2aWV3QXJyYXk7XG5cdH1cblx0cHVibGljIGdldFZpZXcoKTphbnkge1xuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHtcblx0XHRcdGlkOiB0aGlzLmdldENvbXBvbmVudElEKCksIHZpZXc6IFwidGFidmlld1wiLCBhbmltYXRlOiB0cnVlLCBjZWxsczogdGhpcy5jcmVhdGVDb21wb25lbnRzVmlldygpXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudFZpZXc7XG5cdH1cblxufSB0aGlzLlVJTXVsdGlWaWV3ID0gVUlNdWx0aVZpZXc7XG5cbmNsYXNzIFVJTWVudSBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XG5cblx0cHVibGljIG1lbnVJdGVtcyA6IEFycmF5PGFueT47XG5cblx0Y29uc3RydWN0b3IocHJvcGVydGllcyA9IG51bGwpIHtcblx0XHRzdXBlcihwcm9wZXJ0aWVzKTtcblx0XHR0aGlzLm1lbnVJdGVtcyA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdH1cblx0cHVibGljIGFkZE1lbnVJdGVtKG1lbnUgOiBhbnkpIHtcblx0XHRtZW51W1wiaWRcIl0gPSB3ZWJpeC51aWQoKStcIl9tZW51XCI7XG5cdFx0dGhpcy5tZW51SXRlbXMucHVzaChtZW51KTtcblx0fVxufSB0aGlzLlVJTWVudSA9IFVJTWVudTtcblxuY2xhc3MgVGFiVmlld0NlbGwge1xuXHRwdWJsaWMgbmFtZSAgICAgICA6IHN0cmluZztcblx0cHVibGljIHByb3BlcnRpZXMgOiBhbnk7XG5cdHB1YmxpYyBjb21wb25lbnQgIDogVUlDb21wbGV4Q29tcG9uZW50O1xufVxuXG5jbGFzcyBVSVRhYlZpZXcgIGV4dGVuZHMgVUlDb21wbGV4Q29tcG9uZW50IHtcblxuXHRwdWJsaWMgcG9wdXAgICAgICAgIDogVUlQb3B1cFdpbmRvdztcblx0cHVibGljIGFuaW1hdGUgICAgICA6IGJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIGNlbGxzICAgICAgIDogQXJyYXk8VGFiVmlld0NlbGw+O1xuXHRwdWJsaWMgY2xvc2VBYmxlICAgIDogYm9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBmaXRCaWdnZXN0ICAgOiBib29sZWFuID0gdHJ1ZTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzIDogYW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSVRhYlZpZXdfXCIpO1xuXHRcdHRoaXMuY2VsbHMgPSBuZXcgQXJyYXk8VGFiVmlld0NlbGw+KCk7XG5cdH1cblx0cHVibGljIGFkZFZpZXcobmFtZSA6IHN0cmluZywgcHJvcGVydGllcyA6IGFueSwgY29tcG9uZW50IDogVUlDb21wbGV4Q29tcG9uZW50KSB7XG5cdFx0dmFyIGNlbGwgPSBuZXcgVGFiVmlld0NlbGwoKTtcblx0XHRjZWxsLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXHRcdGNlbGwuY29tcG9uZW50ID0gY29tcG9uZW50O1xuXHRcdGNlbGwubmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5jZWxsc1tuYW1lXT1jZWxsO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KG5hbWUsY29tcG9uZW50KTtcblx0fVxuXHRwdWJsaWMgbGlzdGVuKGV2ZW50LCBkYXRhLCBjYWxsZXIpIHtcblx0XHRzd2l0Y2ggKGV2ZW50KSB7XG5cdFx0XHRjYXNlIFwiZXZlbnROYW1lXCI6XG5cdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgY3JlYXRlQ2VsbHMoKSA6IEFycmF5PGFueT4ge1xuXHRcdHZhciBjZWxsQXJyYXkgPSBuZXcgQXJyYXk8YW55PigpO1xuXHRcdGZvciAodmFyIGl0ZW0gaW4gdGhpcy5jZWxscykge1xuXHRcdFx0dmFyIGNlbGwgPSB7IGJvZHkgOiB0aGlzLmNlbGxzW2l0ZW1dLmNvbXBvbmVudC5nZXRWaWV3KCkgIH1cblx0XHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuY2VsbHNbaXRlbV0ucHJvcGVydGllcykge1xuXHRcdFx0XHRjZWxsW3Byb3BlcnR5XSA9IHRoaXMuY2VsbHNbaXRlbV0ucHJvcGVydGllc1twcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0XHRjZWxsQXJyYXkucHVzaChjZWxsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNlbGxBcnJheTtcblx0fVxuXHRwdWJsaWMgZ2V0VmlldygpIDogYW55IHtcblx0XHR0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xuXHRcdFx0aWQgICAgICAgIDogdGhpcy5jb21wb25lbnRJRCxcblx0XHRcdHZpZXcgICAgICA6IFwidGFidmlld1wiLFxuXHRcdFx0bXVsdGl2aWV3IDogeyBhbmltYXRlIDogdGhpcy5hbmltYXRlLCBmaXRCaWdnZXN0IDogdGhpcy5maXRCaWdnZXN0IH0sXG5cdFx0XHRjbG9zZSAgICAgOiB0aGlzLmNsb3NlQWJsZSxcblx0XHRcdHRhYmJhciAgICA6IHsgcG9wdXBXaWR0aDogMzAwLHRhYk1pbldpZHRoOiAxMjAgfSxcblx0XHRcdGNlbGxzICAgICA6IHRoaXMuY3JlYXRlQ2VsbHMoKVxuXG5cdFx0fSlcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuXHR9XG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cdHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7fVxuXHRwdWJsaWMgc2hvdygpIHtcblx0XHR0aGlzLnBvcHVwID0gbmV3IFVJUG9wdXBXaW5kb3coXCJDb21wb25lbnQgTGFiZWwgXCIpO1xuXHRcdHRoaXMucG9wdXAuc2hvdyh0aGlzKTtcblx0fVxufSB0aGlzLlVJVGFiVmlldyA9IFVJVGFiVmlldztcbkZhY3RvcnkuQWRkU3RyaW5nVG9DbGFzcyhcIlVJVGFiVmlld1wiLCBVSVRhYlZpZXcpO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xuXG5cdHB1YmxpYyBwb3B1cCAgICAgICAgOiBVSVBvcHVwV2luZG93O1xuXHRwdWJsaWMgY29sdW1uTmFtZSAgIDogc3RyaW5nID0gbnVsbDtcblx0cHVibGljIHRhYmxlICAgICAgICA6IFVJRGF0YVRhYmxlID0gbnVsbDtcblx0cHVibGljIGRhdGFBcnJheSAgICA6IEFycmF5PGFueT49bnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzIDogYW55ID0gbnVsbCkge1xuXHRcdHN1cGVyKHByb3BlcnRpZXMpO1xuXHRcdHRoaXMuc2V0SUQoXCJVSUxpc3RfXCIpO1xuXHR9XG5cblx0cHVibGljIHNldExpc3QoZGF0YSA6IEFycmF5PGFueT4pIHtcblxuXHR9XG5cdHB1YmxpYyBsaXN0ZW4oZXZlbnQsIGRhdGEsIGNhbGxlcikge1xuXHRcdHN3aXRjaCAoZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJpdGVtQ2xpY2tcIjoge1xuXHRcdFx0XHR0aGlzLml0ZW1DaGFuZ2UoZGF0YSk7XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0VUkuSW5mbyhldmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgaXRlbUNoYW5nZShpdGVtIDogSXRlbVNlbGVjdGVkRXZlbnQpIHtcblx0XHR2YXIgc3RhdHVzID0gaXRlbS5vYmplY3RBcnJheVswXVtcInN0YXR1c1wiXTtcblx0XHRpdGVtLm9iamVjdEFycmF5WzBdW1wic3RhdHVzXCJdID0gIXN0YXR1cztcblx0XHQoPFVJRGF0YVRhYmxlPnRoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikpLnJlZnJlc2hSb3coaXRlbS5yb3dJRCk7XG5cdFx0dGhpcy5wdWJsaXNoKFwiaXRlbUNoYW5nZVwiLCBpdGVtKTtcblx0fVxuXHRwdWJsaWMgc2V0KG5hbWUgOiBzdHJpbmcsIGRhdGFBcnJheSA6IEFycmF5PGFueT4pIHtcblx0XHR0aGlzLmNvbHVtbk5hbWUgPSBuYW1lO1xuXHRcdHRoaXMuZGF0YUFycmF5ID0gZGF0YUFycmF5O1xuXHR9XG5cdHB1YmxpYyBnZXRWaWV3KCkgOiBhbnkge1xuXHRcdHRoaXMudGFibGUgPSBuZXcgVUlEYXRhVGFibGUoKTtcblx0XHR0aGlzLnRhYmxlLmFkZENvbHVtbigwLCB7IGlkOlwic3RhdHVzXCIsIGhlYWRlcjpcIkFjdGl2ZVwiLCB3aWR0aDo0MCwgY3NzOlwiY2VudGVyXCIsIHR5cGUgOiBcInZhbHVlXCIsXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24ob2JqLHR5cGUsdmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlKVxuXHRcdFx0XHRcdHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF90YWJsZV9jaGVja2JveCB3ZWJpeF9pY29uIGZhLWV5ZSc+PC9zcGFuPlwiO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X3RhYmxlX2NoZWNrYm94IHdlYml4X2ljb24gZmEtZXllLXNsYXNoJz48L3NwYW4+XCI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy50YWJsZS5hZGRDb2x1bW4oMSwgeyBpZDpcInZhbHVlXCIsICBoZWFkZXI6dGhpcy5jb2x1bW5OYW1lLCBmaWxsc3BhY2U6MSB9KTtcblx0XHR0aGlzLnRhYmxlLnNldExpc3QodGhpcy5kYXRhQXJyYXkpO1xuXHRcdHRoaXMuYWRkQ29tcG9uZW50KFwidGFibGVcIix0aGlzLnRhYmxlKTtcblxuXHRcdHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuY3JlYXRlVmlldyh7XG5cdFx0XHRpZCA6IHRoaXMuY29tcG9uZW50SUQsXG5cdFx0XHR2aWV3IDogXCJmb3JtXCIsXG5cdFx0XHRyb3dzIDogW3RoaXMuZ2V0Q29tcG9uZW50KFwidGFibGVcIikuZ2V0VmlldygpXVxuXHRcdH0pXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Vmlldztcblx0fVxuXG5cdHB1YmxpYyBpbml0aWFsaXplKCkge1xuXHRcdHN1cGVyLmluaXRpYWxpemUoKTtcblx0XHRzdXBlci5kZWZpbmVFdmVudHMoKTtcblx0XHR0aGlzLmRlZmluZUV2ZW50cygpO1xuXHR9XG5cblx0cHVibGljIGRlZmluZUV2ZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkge1xuXHRcdFx0KDxVSURhdGFUYWJsZT4gdGhpcy5nZXRDb21wb25lbnQoXCJ0YWJsZVwiKSkuc3Vic2NyaWJlKFwib25JdGVtQ2xpY2tcIix0aGlzLFwiaXRlbUNsaWNrXCIpXG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzaG93KCkge1xuXHRcdHRoaXMucG9wdXAgPSBuZXcgVUlQb3B1cFdpbmRvdyh0aGlzLmNvbHVtbk5hbWUrXCIgTGlzdCBcIik7XG5cdFx0dGhpcy5wb3B1cC5tb2RhbD1mYWxzZTtcblx0XHR0aGlzLnBvcHVwLnNob3codGhpcyk7XG5cdH1cbn0gdGhpcy5VSUxpc3QgPSBVSUxpc3Q7XG5cbiJdfQ==