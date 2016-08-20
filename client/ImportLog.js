/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
/// <reference path="../../Video/typescript-defs/typescript.d.ts"/>
/// <reference path="../../Video/typescript-defs/webix.d.ts"/>
/// <reference path="../../Video/both/C4log.ts"/>
var ImportLogClass = (function () {
    function ImportLogClass() {
    }
    ImportLogClass.LogEntry = function (name, message, theObject) {
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
    };
    return ImportLogClass;
}());
this.ImportLogClass = ImportLogClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW1wb3J0TG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQUN4RSxtRUFBbUU7QUFDbkUsOERBQThEO0FBQzlELGlEQUFpRDtBQUlqRDtJQUFBO0lBdUJBLENBQUM7SUFyQmlCLHVCQUFRLEdBQXRCLFVBQXVCLElBQVcsRUFBRSxPQUFjLEVBQUUsU0FBYztRQUU5RCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQztZQUNELFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFBRSxVQUFVO2FBQ3pCLENBQUMsQ0FBQztRQUVQLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLEVBQUU7Z0JBQzlDLElBQUksRUFBRSxJQUFJO2dCQUNWLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixTQUFTLEVBQUUsU0FBUzthQUN2QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy90eXBlc2NyaXB0LmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaWRlby90eXBlc2NyaXB0LWRlZnMvd2ViaXguZC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL2JvdGgvQzRsb2cudHNcIi8+XHJcblxyXG5kZWNsYXJlIHZhciBJbXBvcnRMb2c6TW9uZ28uQ29sbGVjdGlvbjxhbnk+XHJcblxyXG5jbGFzcyBJbXBvcnRMb2dDbGFzcyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2dFbnRyeShuYW1lOnN0cmluZywgbWVzc2FnZTpzdHJpbmcsIHRoZU9iamVjdDogYW55KSB7XHJcblxyXG4gICAgICAgIHZhciBvYmplY3RKU09OID0gRUpTT04uc3RyaW5naWZ5KHRoZU9iamVjdCk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIEltcG9ydExvZy5pbnNlcnQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICB0aGVPYmplY3RzOiBvYmplY3RKU09OXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEFwcExvZy5lcnJvcihcImluc2VydGluZyBpbnRvIEltcG9ydExvZyBDbGFzc1wiLCBlLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIHRoZU9iamVjdDogdGhlT2JqZWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbnRoaXMuSW1wb3J0TG9nQ2xhc3MgPSBJbXBvcnRMb2dDbGFzcztcclxuXHJcbiJdfQ==