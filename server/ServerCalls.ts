/// <reference path="../both/TimeMachine.ts"/>

declare var TaskDependency:Mongo.Collection<any>;

console.log("ServerCall.ts is loading");

Meteor.startup(function () {
    console.log("ServerCall.ts startup is running");

    if (Meteor.isServer) {

        Meteor.methods({

            getListForTarget: function (theObject:any) {

                var factoryObject = <Maps> Factory.CreateProxyInstance(theObject.classType);

                //       factoryObject.getRelatedObject(theObject);
            },

                           cleanDB: function () {
                               var timeM = new TimeMachineClass();

                               timeM.cleanDBServer();
                           },

                           createAssessmentDetails: function (scenario:any, domain:any) {
                               AppLog.info("inside meteor methods calling createAssessmentDetail");
                               // var theTree = AssessementClass.createAssessmentDetailsServer(scenario,domain)
                               // return theTree;

                           },

                           removeObject: function (theObject) {

                               var factoryObject = Factory.CreateProxyInstance(theObject.classType);

                               factoryObject.removeServer(theObject);
                           },

                           removeMapReference: function (theObject) {

                               var factoryObject = <Maps> Factory.CreateProxyInstance(ClassType.MAP);

                               factoryObject.removeReferenceServer(theObject.id1, theObject.id2);

                           },

                           capabilitySafeRemoval: function (treeNode) {
                               var factoryObject = Factory.CreateProxyInstanceTree("capability");

                               factoryObject.removeServer(treeNode);

                           },

                           capabilityRemoveSet: function (theList, domain) {

                               var factoryObject = Factory.CreateProxyInstanceTree("capability");

                               factoryObject.removeSet(theList);

                           },

                           dimensionSafeRemoval: function (treeNode) {
                               var factoryObject = Factory.CreateProxyInstanceTree("dimension");

                               factoryObject.removeServer(treeNode);
                           },

                           removeMap: function (id) {
                               var mapObject = <Maps> Factory.CreateProxyInstance(ClassType.MAP);

                               mapObject.removeReferenceServer(id, null);
                               ;
                           },

                           updateTechAssessment: function (theID, techValue) {

                               try {
                                   /*  Assessment.update(
									   theID, {$set: {technology: techValue}},
									   function () {
									C4log.info( "UpdateTech Asessment");
									}); */
                               } catch (e) {
                                   AppLog.error("Error Updating Assessment", e);
                               }

                           },

                           createTransitions: function (domain:any) {

                               //TransitionClass.createTransitionsServer(domain);

                           },



                       });

        var Fiber = Npm.require('fibers');
        process.on('uncaughtException', function (err) {
            AppLog.error(err.message, err);
            Fiber(function () {
                //      Logs.insert({ ... }) // Logs is a collection
            }).run();
            process.exit(1)
        });

    }
});
