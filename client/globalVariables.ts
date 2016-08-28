9
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
    }
});

