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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW1wb3J0TG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQUN4RSxtRUFBbUU7QUFDbkUsOERBQThEO0FBQzlELGlEQUFpRDtBQUlqRDtJQUVJLE9BQWMsUUFBUSxDQUFDLElBQVcsRUFBRSxPQUFjLEVBQUUsU0FBYztRQUU5RCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQztZQUNELFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFBRSxVQUFVO2FBQ3pCLENBQUMsQ0FBQztRQUVQLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLEVBQUU7Z0JBQzlDLElBQUksRUFBRSxJQUFJO2dCQUNWLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixTQUFTLEVBQUUsU0FBUzthQUN2QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQztBQUVMLENBQUM7QUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvYWxsLWRlZmluaXRpb25zLmQudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlkZW8vdHlwZXNjcmlwdC1kZWZzL3R5cGVzY3JpcHQuZC50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvd2ViaXguZC50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby9ib3RoL0M0bG9nLnRzXCIvPlxuXG5kZWNsYXJlIHZhciBJbXBvcnRMb2c6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XG5cbmNsYXNzIEltcG9ydExvZ0NsYXNzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgTG9nRW50cnkobmFtZTpzdHJpbmcsIG1lc3NhZ2U6c3RyaW5nLCB0aGVPYmplY3Q6IGFueSkge1xuXG4gICAgICAgIHZhciBvYmplY3RKU09OID0gRUpTT04uc3RyaW5naWZ5KHRoZU9iamVjdCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEltcG9ydExvZy5pbnNlcnQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB0aGVPYmplY3RzOiBvYmplY3RKU09OXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBBcHBMb2cuZXJyb3IoXCJpbnNlcnRpbmcgaW50byBJbXBvcnRMb2cgQ2xhc3NcIiwgZSwge1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB0aGVPYmplY3Q6IHRoZU9iamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxudGhpcy5JbXBvcnRMb2dDbGFzcyA9IEltcG9ydExvZ0NsYXNzO1xuXG4iXX0=