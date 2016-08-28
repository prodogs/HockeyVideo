declare var TaskDependency:Mongo.Collection<any>;

console.log("ServerCall.ts is loading");

Meteor.startup(function () {
    console.log("ServerCall.ts startup is running");

    if (Meteor.isServer) {
        console.log("Inside ServerCalls.ts");
    }
});
