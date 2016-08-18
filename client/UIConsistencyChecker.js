/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../Video/both/ConsistencyChecker.ts"/>
class UIConsistencyChecker extends UIComplexComponent {
    constructor() {
        super();
        this.setID("ConsistencyChecker_");
        this.checker = new ConsistencyChecker();
    }
    getView() {
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
    }
    refreshCheck() {
        var results = this.checker.checkRelationships(false);
        (this.getComponent("datatable")).setList(results);
    }
    cleanup() {
        var results = this.checker.checkRelationships(true);
        (this.getComponent("datatable")).setList(results);
    }
    listen(event, object, publisher) {
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
    }
    defineEvents() {
        this.getComponent("jumpbar").subscribe("refreshButton", this);
        this.getComponent("jumpbar").subscribe("cleanupButton", this);
    }
    initialize() {
        super.initialize();
        super.defineEvents();
        var results = this.checker.checkRelationships(false);
        (this.getComponent("datatable")).setList(results);
    }
    show() {
        var theWindow = new UIPopupWindow("Consistency Checker Results", this);
        theWindow.show();
        return;
    }
}
this.UIConsistencyChecker = UIConsistencyChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUlDb25zaXN0ZW5jeUNoZWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVSUNvbnNpc3RlbmN5Q2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3RUFBd0U7QUFDeEUsOERBQThEO0FBRTFELG1DQUFtQyxrQkFBa0I7SUFJakQ7UUFDSSxPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVNLE9BQU87UUFFVixJQUFJLGFBQWEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWxDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ0ksRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUM3RCxFQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUU7YUFDaEY7U0FDaUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTSxZQUFZO1FBQ2YsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLE9BQU87UUFDVixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQVksRUFBRSxNQUFVLEVBQUUsU0FBcUI7UUFDekQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEtBQUssU0FBUztnQkFDZCxDQUFDO29CQUNHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztnQkFDRyxLQUFLLENBQUM7WUFDVixLQUFLLE9BQU87Z0JBQ1osQ0FBQztvQkFDRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0csS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sVUFBVTtRQUNiLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLElBQUk7UUFDUCxJQUFJLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDO0lBQ1gsQ0FBQztBQUNMLENBQUM7QUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL2JvdGgvQ29uc2lzdGVuY3lDaGVja2VyLnRzXCIvPlxuXG4gICAgY2xhc3MgVUlDb25zaXN0ZW5jeUNoZWNrZXIgZXh0ZW5kcyBVSUNvbXBsZXhDb21wb25lbnQge1xuXG4gICAgICAgIHB1YmxpYyBjaGVja2VyOkNvbnNpc3RlbmN5Q2hlY2tlcjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldElEKFwiQ29uc2lzdGVuY3lDaGVja2VyX1wiKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlciA9IG5ldyBDb25zaXN0ZW5jeUNoZWNrZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3KCk6YW55IHtcblxuICAgICAgICAgICAgdmFyIHJlZnJlc2hCdXR0b24gPSBuZXcgVUlCdXR0b24oe2xhYmVsOiBcIlJlZnJlc2hcIn0pO1xuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdWJzY3JpYmUoXCJjbGlja1wiLCB0aGlzLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudChcInJlZnJlc2hcIiwgcmVmcmVzaEJ1dHRvbik7XG5cbiAgICAgICAgICAgIHZhciBjbGVhbkJ1dHRvbiA9IG5ldyBVSUJ1dHRvbih7bGFiZWw6IFwiQ2xlYW5cIn0pO1xuICAgICAgICAgICAgY2xlYW5CdXR0b24uc3Vic2NyaWJlKFwiY2xpY2tcIiwgdGhpcywgXCJjbGVhblwiKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KFwiY2xlYW5cIiwgY2xlYW5CdXR0b24pO1xuXG4gICAgICAgICAgICB2YXIgZGF0YVRhYmxlID0gbmV3IFVJRGF0YVRhYmxlKCk7XG5cbiAgICAgICAgICAgIGRhdGFUYWJsZS5zaG93VG9vbEJhciA9IChmYWxzZSk7XG4gICAgICAgICAgICBkYXRhVGFibGUuc2V0RWRpdGFibGUoZmFsc2UpO1xuICAgICAgICAgICAgZGF0YVRhYmxlLmF1dG9Db2x1bW5Db25maWd1cmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoXCJkYXRhdGFibGVcIiwgZGF0YVRhYmxlKTtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5jcmVhdGVWaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuY29tcG9uZW50SUQsIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAge2NvbHM6IFtyZWZyZXNoQnV0dG9uLmdldFZpZXcoKSwgY2xlYW5CdXR0b24uZ2V0VmlldygpXX0sIGRhdGFUYWJsZS5nZXRWaWV3KClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRWaWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlZnJlc2hDaGVjaygpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0gdGhpcy5jaGVja2VyLmNoZWNrUmVsYXRpb25zaGlwcyhmYWxzZSk7XG4gICAgICAgICAgICAoPFVJRGF0YVRhYmxlPiAodGhpcy5nZXRDb21wb25lbnQoXCJkYXRhdGFibGVcIikpKS5zZXRMaXN0KHJlc3VsdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNsZWFudXAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuY2hlY2tlci5jaGVja1JlbGF0aW9uc2hpcHModHJ1ZSk7XG4gICAgICAgICAgICAoPFVJRGF0YVRhYmxlPiAodGhpcy5nZXRDb21wb25lbnQoXCJkYXRhdGFibGVcIikpKS5zZXRMaXN0KHJlc3VsdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGxpc3RlbihldmVudDpzdHJpbmcsIG9iamVjdDphbnksIHB1Ymxpc2hlcjpVSUNvbXBvbmVudCkge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyZWZyZXNoXCIgOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjbGVhblwiIDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGVmaW5lRXZlbnRzKCkge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoXCJqdW1wYmFyXCIpLnN1YnNjcmliZShcInJlZnJlc2hCdXR0b25cIiwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChcImp1bXBiYXJcIikuc3Vic2NyaWJlKFwiY2xlYW51cEJ1dHRvblwiLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgc3VwZXIuZGVmaW5lRXZlbnRzKCk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuY2hlY2tlci5jaGVja1JlbGF0aW9uc2hpcHMoZmFsc2UpO1xuICAgICAgICAgICAgKDxVSURhdGFUYWJsZT4gKHRoaXMuZ2V0Q29tcG9uZW50KFwiZGF0YXRhYmxlXCIpKSkuc2V0TGlzdChyZXN1bHRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICAgICAgdmFyIHRoZVdpbmRvdyA9IG5ldyBVSVBvcHVwV2luZG93KFwiQ29uc2lzdGVuY3kgQ2hlY2tlciBSZXN1bHRzXCIsIHRoaXMpO1xuICAgICAgICAgICAgdGhlV2luZG93LnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLlVJQ29uc2lzdGVuY3lDaGVja2VyID0gVUlDb25zaXN0ZW5jeUNoZWNrZXI7XG4iXX0=