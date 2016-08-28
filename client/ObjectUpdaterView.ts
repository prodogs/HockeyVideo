

    declare var MyApp : any;

    class ObjectUpdaterView extends UIComplexComponent {

        public observationList:Array<any>;

        constructor() {
            super();
            this.setID("ObjectUpdaterView_");

            this.observationList = new Array<any>();
            var index            = 0;

            for (var classType in MyApp.ObjectRouter.observations) {

                for (var updateType in MyApp.ObjectRouter.observations[classType]) {

                    var newItem           = new Array<any>();
                    newItem["classType"]  = classType;
                    newItem["updateType"] = updateType;
                    newItem["counter"]    = MyApp.ObjectRouter.observations[classType][updateType].counter;
                    this.observationList.push(newItem);

                }
            }
        }

        public getView():any {

            var dataTableComponent = new UIDataTable();

            dataTableComponent.setEditable(true);
            dataTableComponent.addColumn(0, {
                id    : "classType",
                header: "Class",
                width : 150,
                sort  : "string",
                editor: "text"
            });
            dataTableComponent.addColumn(1, {
                id: "updateType", header: "Update Type", width: 200, sort: "string", editor: "text"
            });
            dataTableComponent.addColumn(2, {
                id    : "counter",
                header: "Count",
                width : 150,
                sort  : "string",
                editor: "text"
            });
            dataTableComponent.showToolBar          = (false);
            dataTableComponent.showAddDeleteColumns = false;

            console.log(JSON.stringify(this.observationList, null, 4));

            dataTableComponent.setList(this.observationList);

            this.addComponent("datatable", dataTableComponent);

            this.componentView = this.createView({
                                                     view: "form", id: this.componentID, elements: [
                    this.getComponent("datatable").getView(),
                ]

                                                 });
            return this.componentView;
        }

        public initialize() {
            super.initialize();
            super.defineEvents();
        }

    }
    this.ObjectUpdaterView = ObjectUpdaterView;
