/// <reference path="../typescript-defs/all-definitions.d.ts"/>


class FabricCanvas extends UIComponent {

    public canvas : any;

    constructor() {
        super();
    }

    public setCanvas(element : string) {

        this.canvas = new fabric.Canvas(element);

    }

    public drawCircle() {

        this.canvas.item(0).hasBorders = false;
        this.canvas.setActiveObject(this.canvas.item(0));
    }

}
this.FabricCanvas = FabricCanvas;

