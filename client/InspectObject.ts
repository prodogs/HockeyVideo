interface JSON {
    decycle(object : any)
    retrocycle($ : any)
}
    class InspectObject extends UIComplexComponent {

        public inspectionObject:any;

        constructor(theObject:any) {
            super();
            this.inspectionObject = theObject;
            this.show();
        }
        public getView():any {
            var textArea = new UINoteField();
            var objectString = JSON.stringify(JSON.decycle(this.inspectionObject), null, 4);
            textArea.setValue(objectString);
            this.addComponent("textArea", textArea);
            this.componentView = this.createView(
                {
                 view: "form", id: this.componentID,
                 elements: [this.getComponent("textArea").getView(), ]
                 });
            return this.componentView;
        }
        public initialize() {
            super.initialize();
            super.defineEvents();
        }
        public show() {
            var theWindow = new UIPopupWindow("Object Inspection", this);
            theWindow.show();
            return;
        }
    }    this.InspectObject = InspectObject;
