/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../Video/both/ConsistencyChecker.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIConsistencyChecker = (function (_super) {
    __extends(UIConsistencyChecker, _super);
    function UIConsistencyChecker() {
        _super.call(this);
        this.setID("ConsistencyChecker_");
        this.checker = new ConsistencyChecker();
    }
    UIConsistencyChecker.prototype.getView = function () {
        var refreshButton = new UIButton({ label: "Refresh" });
        refreshButton.subscribe("click", this, "refresh");
        this.addComponent("refresh", refreshButton);
        var cleanButton = new UIButton({ label: "Clean" });
        cleanButton.subscribe("click", this, "clean");
        this.addComponent("clean", cleanButton);
        var dataTable = new UIDataTable();
        dataTable.showToolBar = (false);
        dataTable.setEditable(false);
        dataTable.autoColumnConfigure = true;
        this.addComponent("datatable", dataTable);
        this.componentView = this.createView({
            id: this.componentID, rows: [
                { cols: [refreshButton.getView(), cleanButton.getView()] }, dataTable.getView()
            ]
        });
        return this.componentView;
    };
    UIConsistencyChecker.prototype.refreshCheck = function () {
        var results = this.checker.checkRelationships(false);
        (this.getComponent("datatable")).setList(results);
    };
    UIConsistencyChecker.prototype.cleanup = function () {
        var results = this.checker.checkRelationships(true);
        (this.getComponent("datatable")).setList(results);
    };
    UIConsistencyChecker.prototype.listen = function (event, object, publisher) {
        switch (event) {
            case "refresh":
                {
                    this.refreshCheck();
                }
                break;
            case "clean":
                {
                    this.cleanup();
                }
                break;
        }
    };
    UIConsistencyChecker.prototype.defineEvents = function () {
        this.getComponent("jumpbar").subscribe("refreshButton", this);
        this.getComponent("jumpbar").subscribe("cleanupButton", this);
    };
    UIConsistencyChecker.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        _super.prototype.defineEvents.call(this);
        var results = this.checker.checkRelationships(false);
        (this.getComponent("datatable")).setList(results);
    };
    UIConsistencyChecker.prototype.show = function () {
        var theWindow = new UIPopupWindow("Consistency Checker Results", this);
        theWindow.show();
        return;
    };
    return UIConsistencyChecker;
}(UIComplexComponent));
this.UIConsistencyChecker = UIConsistencyChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUlDb25zaXN0ZW5jeUNoZWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVSUNvbnNpc3RlbmN5Q2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3RUFBd0U7QUFDeEUsOERBQThEOzs7Ozs7QUFFMUQ7SUFBbUMsd0NBQWtCO0lBSWpEO1FBQ0ksaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRU0sc0NBQU8sR0FBZDtRQUVJLElBQUksYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDckQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRTVDLElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDakQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXhDLElBQUksU0FBUyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFbEMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsU0FBUyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBQzdELEVBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRTthQUNoRjtTQUNpQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVNLDJDQUFZLEdBQW5CO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLHNDQUFPLEdBQWQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0scUNBQU0sR0FBYixVQUFjLEtBQVksRUFBRSxNQUFVLEVBQUUsU0FBcUI7UUFDekQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEtBQUssU0FBUztnQkFDZCxDQUFDO29CQUNHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztnQkFDRyxLQUFLLENBQUM7WUFDVixLQUFLLE9BQU87Z0JBQ1osQ0FBQztvQkFDRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0csS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFTSwyQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLHlDQUFVLEdBQWpCO1FBQ0ksZ0JBQUssQ0FBQyxVQUFVLFdBQUUsQ0FBQztRQUNuQixnQkFBSyxDQUFDLFlBQVksV0FBRSxDQUFDO1FBQ3JCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxtQ0FBSSxHQUFYO1FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUE3RUQsQ0FBbUMsa0JBQWtCLEdBNkVwRDtBQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby9ib3RoL0NvbnNpc3RlbmN5Q2hlY2tlci50c1wiLz5cclxuXHJcbiAgICBjbGFzcyBVSUNvbnNpc3RlbmN5Q2hlY2tlciBleHRlbmRzIFVJQ29tcGxleENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGVja2VyOkNvbnNpc3RlbmN5Q2hlY2tlcjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SUQoXCJDb25zaXN0ZW5jeUNoZWNrZXJfXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZXIgPSBuZXcgQ29uc2lzdGVuY3lDaGVja2VyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmlldygpOmFueSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVmcmVzaEJ1dHRvbiA9IG5ldyBVSUJ1dHRvbih7bGFiZWw6IFwiUmVmcmVzaFwifSk7XHJcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcywgXCJyZWZyZXNoXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudChcInJlZnJlc2hcIiwgcmVmcmVzaEJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2xlYW5CdXR0b24gPSBuZXcgVUlCdXR0b24oe2xhYmVsOiBcIkNsZWFuXCJ9KTtcclxuICAgICAgICAgICAgY2xlYW5CdXR0b24uc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcywgXCJjbGVhblwiKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoXCJjbGVhblwiLCBjbGVhbkJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVRhYmxlID0gbmV3IFVJRGF0YVRhYmxlKCk7XHJcblxyXG4gICAgICAgICAgICBkYXRhVGFibGUuc2hvd1Rvb2xCYXIgPSAoZmFsc2UpO1xyXG4gICAgICAgICAgICBkYXRhVGFibGUuc2V0RWRpdGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBkYXRhVGFibGUuYXV0b0NvbHVtbkNvbmZpZ3VyZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KFwiZGF0YXRhYmxlXCIsIGRhdGFUYWJsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmNvbXBvbmVudElELCByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHM6IFtyZWZyZXNoQnV0dG9uLmdldFZpZXcoKSwgY2xlYW5CdXR0b24uZ2V0VmlldygpXX0sIGRhdGFUYWJsZS5nZXRWaWV3KClcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZnJlc2hDaGVjaygpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSB0aGlzLmNoZWNrZXIuY2hlY2tSZWxhdGlvbnNoaXBzKGZhbHNlKTtcclxuICAgICAgICAgICAgKDxVSURhdGFUYWJsZT4gKHRoaXMuZ2V0Q29tcG9uZW50KFwiZGF0YXRhYmxlXCIpKSkuc2V0TGlzdChyZXN1bHRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGVhbnVwKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuY2hlY2tlci5jaGVja1JlbGF0aW9uc2hpcHModHJ1ZSk7XHJcbiAgICAgICAgICAgICg8VUlEYXRhVGFibGU+ICh0aGlzLmdldENvbXBvbmVudChcImRhdGF0YWJsZVwiKSkpLnNldExpc3QocmVzdWx0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbGlzdGVuKGV2ZW50OnN0cmluZywgb2JqZWN0OmFueSwgcHVibGlzaGVyOlVJQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZWZyZXNoXCIgOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2xlYW5cIiA6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWZpbmVFdmVudHMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFwianVtcGJhclwiKS5zdWJzY3JpYmUoXCJyZWZyZXNoQnV0dG9uXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChcImp1bXBiYXJcIikuc3Vic2NyaWJlKFwiY2xlYW51cEJ1dHRvblwiLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG4gICAgICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLmRlZmluZUV2ZW50cygpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuY2hlY2tlci5jaGVja1JlbGF0aW9uc2hpcHMoZmFsc2UpO1xyXG4gICAgICAgICAgICAoPFVJRGF0YVRhYmxlPiAodGhpcy5nZXRDb21wb25lbnQoXCJkYXRhdGFibGVcIikpKS5zZXRMaXN0KHJlc3VsdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNob3coKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGVXaW5kb3cgPSBuZXcgVUlQb3B1cFdpbmRvdyhcIkNvbnNpc3RlbmN5IENoZWNrZXIgUmVzdWx0c1wiLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhlV2luZG93LnNob3coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuVUlDb25zaXN0ZW5jeUNoZWNrZXIgPSBVSUNvbnNpc3RlbmN5Q2hlY2tlcjtcclxuIl19