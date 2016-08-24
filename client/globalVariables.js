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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsVmFyaWFibGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsVmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdFQUF3RTtBQUN4RSxDQUFDLENBQUE7QUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUVyRCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsU0FBUyxFQUFFLE9BQU87UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxHQUFHLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxNQUFNLE9BQU8sQ0FBQyxDQUFDLFdBQVc7UUFDOUIsQ0FBQztJQUNMLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1ZpZGVvL3R5cGVzY3JpcHQtZGVmcy9hbGwtZGVmaW5pdGlvbnMuZC50c1wiLz5cclxuOVxyXG5jb25zb2xlLmxvZyhcImdsb2JhbFZhcmlhYmxlcy50cyBpcyBsb2FkaW5nXCIpO1xyXG5cclxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiZ2xvYmFsVmFyaWFibGVzLnRzIHN0YXJ0dXAgaXMgcnVubmluZ1wiKTtcclxuICAgIFxyXG4gICAgdGhpcy5Bc3NlcnQgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKCFjb25kaXRpb24pIHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCI7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRXJyb3IgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBtZXNzYWdlOyAvLyBGYWxsYmFja1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4iXX0=