/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../Video/typescript-defs/typescript.d.ts"/>
/// <reference path="../../Video/typescript-defs/webix.d.ts"/>
/// <reference path="../../Video/both/C4log.ts"/>
class ImportLogClass {
    static LogEntry(name, message, theObject) {
        var objectJSON = EJSON.stringify(theObject);
        try {
            ImportLog.insert({
                name: name,
                message: message,
                theObjects: objectJSON
            });
        }
        catch (e) {
            AppLog.error("inserting into ImportLog Class", e, {
                name: name,
                message: message,
                theObject: theObject
            });
        }
    }
}
this.ImportLogClass = ImportLogClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW1wb3J0TG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQUN4RSxtRUFBbUU7QUFDbkUsOERBQThEO0FBQzlELGlEQUFpRDtBQUlqRDtJQUVJLE9BQWMsUUFBUSxDQUFDLElBQVcsRUFBRSxPQUFjLEVBQUUsU0FBYztRQUU5RCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQztZQUNELFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFBRSxVQUFVO2FBQ3pCLENBQUMsQ0FBQztRQUVQLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLEVBQUU7Z0JBQzlDLElBQUksRUFBRSxJQUFJO2dCQUNWLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixTQUFTLEVBQUUsU0FBUzthQUN2QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQztBQUVMLENBQUM7QUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvdHlwZXNjcmlwdC5kLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL3dlYml4LmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby9ib3RoL0M0bG9nLnRzXCIvPlxyXG5cclxuZGVjbGFyZSB2YXIgSW1wb3J0TG9nOk1vbmdvLkNvbGxlY3Rpb248YW55PlxyXG5cclxuY2xhc3MgSW1wb3J0TG9nQ2xhc3Mge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9nRW50cnkobmFtZTpzdHJpbmcsIG1lc3NhZ2U6c3RyaW5nLCB0aGVPYmplY3Q6IGFueSkge1xyXG5cclxuICAgICAgICB2YXIgb2JqZWN0SlNPTiA9IEVKU09OLnN0cmluZ2lmeSh0aGVPYmplY3QpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBJbXBvcnRMb2cuaW5zZXJ0KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgdGhlT2JqZWN0czogb2JqZWN0SlNPTlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBBcHBMb2cuZXJyb3IoXCJpbnNlcnRpbmcgaW50byBJbXBvcnRMb2cgQ2xhc3NcIiwgZSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICB0aGVPYmplY3Q6IHRoZU9iamVjdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG50aGlzLkltcG9ydExvZ0NsYXNzID0gSW1wb3J0TG9nQ2xhc3M7XHJcblxyXG4iXX0=