/// <reference path="../../Video/typescript-defs/all-definitions.d.ts"/>
9;
console.log("globalVariables.ts is loading");
Meteor.startup(function () {
    console.log("globalVariables.ts startup is running");
    this.Assert = function (condition, message) {
        if (!condition) {
            message = message || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsVmFyaWFibGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsVmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQUN4RSxDQUFDLENBQUE7QUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUVyRCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsU0FBUyxFQUFFLE9BQU87UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxHQUFHLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxNQUFNLE9BQU8sQ0FBQyxDQUFDLFdBQVc7UUFDOUIsQ0FBQztJQUNMLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cbjlcbmNvbnNvbGUubG9nKFwiZ2xvYmFsVmFyaWFibGVzLnRzIGlzIGxvYWRpbmdcIik7XG5cbk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiZ2xvYmFsVmFyaWFibGVzLnRzIHN0YXJ0dXAgaXMgcnVubmluZ1wiKTtcbiAgICBcbiAgICB0aGlzLkFzc2VydCA9IGZ1bmN0aW9uIChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBFcnJvciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG1lc3NhZ2U7IC8vIEZhbGxiYWNrXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuIl19