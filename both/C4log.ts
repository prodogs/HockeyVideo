declare var C4logDB:Mongo.Collection<any>
declare var StackFrame:any;
declare var StackTraceGPS:any;
declare var StackTrace:any;

console.log("Loading AppLog.ts ...");
interface JSON {
    decycle(object : any)
    retrocycle($ : any)
}
class AppLog {

    public static infoReport:boolean = true;
    public static noDB:boolean = true;
    public static errorOnlyDB:boolean = true;
    public static printObjects:boolean = false;
    public static initialize:boolean = AppLog.start();
    public static gps = false;
    public static start():boolean {
        return true;
    }
    public static  stackTrace():Array<any> {
        var err:Error = new Error();
        return null;
    }
    public static printThis(theObject) {
        console.log(JSON.stringify(theObject, null, 7));
    }
    public static defaultExceptionHandler(msg:string, url:string, line:number, col:number, error?:Error) : void {

        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;

        var message = "Error: " + msg + "<br> url:" + url + "<br> nline:" + line + "<br>" + extra;

        webix.modalbox({
            title: "Uncaught Exception Eerror",
            buttons: ["ok", "Not OK"],
            text: message,
            width: "800px",
        });

        AppLog.error(msg, error, {
            msg: msg,
            url: url,
            line: line,
            col: col,
            error: col
        })

        var suppressErrorAlert = true;
    }
    public static record(message, error, object) {
        AppLog.log("record", message, error, object, true);
    }
    public static error(message, error?, object?) {
        if (typeof window != "undefined") {
            UI.Error(message);
        }
        AppLog.log("error", message, error, object);
        debugger;
    }
    public static info(message, error?, object?) {

        if (AppLog.infoReport) AppLog.log("info", message, error, object);
    }
    public static GPSReturn(result) {
        console.error("GPSReturn");
        console.error(result);
    }
    public static GPSReturnError(result) {
        console.error("GPSReturn Error");
        console.error("Error");
        console.error(result);
    }
    public static CreateGoodStack(stack) {


        console.error("StackTrace");
        console.error(stack);

        var stackFrame = new StackFrame(stack[0].functionName, [], stack[0].fileName, stack[0].lineNumber, stack[0].columnNumber)
        /*
         AppLog.gps.getMappedLocation(stackFrame).then(
         AppLog.GPSReturn,
         AppLog.GPSReturnError);


         AppLog.gps.getMappedLocation(stack[0]).then(
         AppLog.GPSReturn,
         AppLog.GPSReturnError);
         */
    }
    public static log(type:string, message:string, error?:Error, object?:any, database:boolean = false) {

        // var caller = arguments.callee.caller.toString();

        // if (!AppLog.gps) {
        //    AppLog.gps = new StackTraceGPS();
        // }
        if (error) {
            var theStack = error["stack"];

            // StackTrace.fromError(error).then(


            // function(stack) {AppLog.CreateGoodStack(stack);});


            // var theStack = StackTrace.printStackTrace();
            //var theStack = AppLog.StackToString(theStack);

        }
        else
            theStack = "";

        if (type == "info" && !AppLog.info)
            return;

        var description = type + " " + message + " " + error;

        /*
         if (window) {
         var theNavigator = navigator
         }
         else theNavigator = null;
         */
        var theNavigator = null;

        if (!AppLog.noDB)
            AppLog.Add(type, message, error, object, theStack, theNavigator);
        else if ((AppLog.errorOnlyDB && type == "error") || database)
            AppLog.Add(type, message, error, object, theStack, theNavigator);

        //console.error("Navigator : "+ AppLog.prettyPrint(theNavigator));
        //console.error("Caller : " + caller)
        console.error(description);
        if (type == "error") {
            console.error(error);
            console.error(AppLog.prettyPrint(theStack));
        }
        if (object)
            if (AppLog.printObjects)
                console.error(AppLog.prettyPrint(object));

    }
    public static StackToString(theStack:Array<any>):string {

        var theString = "";

        for (var item in theStack) {
            theString += theStack[item] + "\n";
        }
        return theString;
    }
    public static PrintObject(object:any):string {

        return JSON.stringify(object, null, 4);


    }
    public static cast(theObject:any):EJSON {

        return <EJSON> theObject;
    }
    public static MakeJSON(object:any):any {

        return JSON.stringify(JSON.decycle(object), null, 4);

    }
    public static Add(type, message, error?, object?, caller?, browser?) {

        var theDescription = type + " " + message + " " + error;

        var objectArray = new Array<Object>();

        try {
            if (error) {
                objectArray[0] = error;
                var errorJson = AppLog.MakeJSON(objectArray);

            }
            else {
                objectArray[0] = "No Error";
                var errorJson = AppLog.MakeJSON(objectArray);
            }
        } catch (e) {
            //ignore and continue;
        }
        try {
            if (object) {
                objectArray[0] = object;
                var objectJson = AppLog.MakeJSON(objectArray);

            }
            else {
                objectArray[0] = "No Object";
                var objectJson = AppLog.MakeJSON(objectArray);

            }
        } catch (e) {
        }

        try {
            if (browser) {
                objectArray[0] = browser;
                var browserJson = AppLog.MakeJSON((objectArray));
            } else {
                objectArray[0] = "No Object";
                browserJson = AppLog.MakeJSON((objectArray));
            }
        } catch (e) {
        }

        try {
            C4logDB.insert({
                type: type,
                message: message,
                description: theDescription,
                errorObject: errorJson,
                object: objectJson,
                caller: caller,
                browser: browserJson
            });
        } catch (e) {
            console.log("Error Logging C4 Error in DB");
            return;
        }

    }
    public static prettyPrint(obj:any, indent = 0) {

        if (!obj)
            return "null";

        var toString = Object.prototype.toString,
            newLine = "<br>", space = "&nbsp;", tab = 8,
            buffer = "",
        //Second argument is indent
        //For better performance, Cache indentStr for a given indent.
            indentStr = (function (n) {
                var str = "";
                while (n--) {
                    str += space;
                }
                return str;
            })(indent);

        if (!obj || ( typeof obj != "object" && typeof obj != "function" )) {
            //any non-object ( Boolean, String, Number), null, undefined, NaN
            buffer += obj;
        } else if (toString.call(obj) == "[object Date]") {
            buffer += "[Date] " + obj;
        } else if (toString.call(obj) == "[object RegExp") {
            buffer += "[RegExp] " + obj;
        } else if (toString.call(obj) == "[object Function]") {
            buffer += "[Function] " + obj;
        } else if (toString.call(obj) == "[object Array]") {
            var idx = 0, len = obj.length;
            buffer += "[" + newLine;
            while (idx < len) {
                buffer += [
                    indentStr, idx, ": ",
                    AppLog.prettyPrint(obj[idx], indent + tab)
                ].join("");
                buffer += "<br>";
                idx++;
            }
            buffer += indentStr + "]";
        } else { //Handle Object
            var prop;
            buffer += "{" + newLine;
            for (prop in obj) {
                buffer += [
                    indentStr, prop, ": ",
                    AppLog.prettyPrint(obj[prop], indent + tab)
                ].join("");
                buffer += newLine;
            }
            buffer += indentStr + "}";
        }

        return buffer;
    }
} this.AppLog = AppLog;

this.jobLogger = function (opts) {
    AppLog.info("Job Logger Message : " + opts.message + " Level : " + opts.level, new Error(), {
        level: opts.level,
        message: opts.message,
        tags: opts.tag
    });
}

class VideoApp {
    public static assert(condition, message, error?:Error, object?:any) {
        if (!condition) {
            AppLog.error("Assertion " + message, error, object);
            debugger;
            message = message || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
    public static EJSONcast(theObject):EJSON {

        return <EJSON> theObject;
    }
}this.VideoApp = VideoApp;


