declare var ImportLog:Mongo.Collection<any>

class ImportLogClass {

    public static LogEntry(name:string, message:string, theObject: any) {

        var objectJSON = EJSON.stringify(theObject);

        try {
            ImportLog.insert({
                name: name,
                message: message,
                theObjects: objectJSON
            });

        } catch (e) {
            AppLog.error("inserting into ImportLog Class", e, {
                name: name,
                message: message,
                theObject: theObject
            });
        }

    }

}
this.ImportLogClass = ImportLogClass;

