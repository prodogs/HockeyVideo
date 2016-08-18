/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../Video/both/ConsistencyChecker.ts"/>

    class UIConsistencyChecker extends UIComplexComponent {

        public checker:ConsistencyChecker;

        constructor() {
            super();
            this.setID("ConsistencyChecker_");
            this.checker = new ConsistencyChecker();
        }

        public getView():any {

            var refreshButton = new UIButton({label: "Refresh"});
            refreshButton.subscribe("click", this, "refresh");
            this.addComponent("refresh", refreshButton);

            var cleanButton = new UIButton({label: "Clean"});
            cleanButton.subscribe("click", this, "clean");
            this.addComponent("clean", cleanButton);

            var dataTable = new UIDataTable();

            dataTable.showToolBar = (false);
            dataTable.setEditable(false);
            dataTable.autoColumnConfigure = true;
            this.addComponent("datatable", dataTable);

            this.componentView = this.createView({
                                                     id: this.componentID, rows: [
                    {cols: [refreshButton.getView(), cleanButton.getView()]}, dataTable.getView()
                ]
                                                 });
            return this.componentView;
        }

        public refreshCheck() {
            var results = this.checker.checkRelationships(false);
            (<UIDataTable> (this.getComponent("datatable"))).setList(results);
        }

        public cleanup() {
            var results = this.checker.checkRelationships(true);
            (<UIDataTable> (this.getComponent("datatable"))).setList(results);
        }

        public listen(event:string, object:any, publisher:UIComponent) {
            switch (event) {
                case "refresh" :
                {
                    this.refreshCheck();
                }
                    break;
                case "clean" :
                {
                    this.cleanup();
                }
                    break;
            }
        }

        public defineEvents() {
            this.getComponent("jumpbar").subscribe("refreshButton", this);
            this.getComponent("jumpbar").subscribe("cleanupButton", this);
        }

        public initialize() {
            super.initialize();
            super.defineEvents();
            var results = this.checker.checkRelationships(false);
            (<UIDataTable> (this.getComponent("datatable"))).setList(results);
        }

        public show() {
            var theWindow = new UIPopupWindow("Consistency Checker Results", this);
            theWindow.show();
            return;
        }
    }
    this.UIConsistencyChecker = UIConsistencyChecker;
