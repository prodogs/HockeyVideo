/// <reference path="../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../both/ConsistencyChecker.ts"/>
Meteor.startup(function () {
    console.log("Starting Jobs");
    SyncedCron.config({
        log: false,
        logger: this.jobLogger,
        collectionName: 'cronHistory',
        utc: false,
        collectionTTL: 172800
    });
    SyncedCron.add({
        name: "Check Consistency of Database",
        schedule: function (parser) {
            return parser.text('every 5 minutes');
        },
        job: function () {
            //  var checkConistency = new ConsistencyChecker();
            //  checkConistency.startTime();
        }
    });
    SyncedCron.startTime();
});
/*
 TTL in seconds for history records in collection to expire
 NOTE: Unset to remove expiry but ensure you remove the index from
 mongo by hand

 ALSO: SyncedCron can't use the `_ensureIndex` command to modify
 the TTL index. The best way to modify the default value of
 `collectionTTL` is to remove the index by hand (in the mongo shell
 run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
 project. SyncedCron will recreate the index with the updated TTL.
 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9icy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpvYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBQy9ELHFEQUFxRDtBQUdyRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBRVgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUU3QixVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2QsR0FBRyxFQUFFLEtBQUs7UUFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFDdEIsY0FBYyxFQUFFLGFBQWE7UUFDN0IsR0FBRyxFQUFFLEtBQUs7UUFFVixhQUFhLEVBQUUsTUFBTTtLQUN4QixDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ1gsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxRQUFRLEVBQUUsVUFBVSxNQUFNO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELEdBQUcsRUFBRTtZQUNILG1EQUFtRDtZQUNuRCxnQ0FBZ0M7UUFFbEMsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUUzQixDQUFDLENBQUMsQ0FBQztBQUVIOzs7Ozs7Ozs7O0dBVUciLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2JvdGgvQ29uc2lzdGVuY3lDaGVja2VyLnRzXCIvPlxuXG5kZWNsYXJlIHZhciBTeW5jZWRDcm9uOmFueTtcbk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgSm9ic1wiKTtcblxuICAgIFN5bmNlZENyb24uY29uZmlnKHtcbiAgICAgICAgbG9nOiBmYWxzZSxcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmpvYkxvZ2dlcixcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICdjcm9uSGlzdG9yeScsXG4gICAgICAgIHV0YzogZmFsc2UsXG5cbiAgICAgICAgY29sbGVjdGlvblRUTDogMTcyODAwXG4gICAgfSk7XG5cbiAgICBTeW5jZWRDcm9uLmFkZCh7XG4gICAgICAgIG5hbWU6IFwiQ2hlY2sgQ29uc2lzdGVuY3kgb2YgRGF0YWJhc2VcIixcbiAgICAgICAgc2NoZWR1bGU6IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZXIudGV4dCgnZXZlcnkgNSBtaW51dGVzJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGpvYjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vICB2YXIgY2hlY2tDb25pc3RlbmN5ID0gbmV3IENvbnNpc3RlbmN5Q2hlY2tlcigpO1xuICAgICAgICAgIC8vICBjaGVja0NvbmlzdGVuY3kuc3RhcnRUaW1lKCk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgU3luY2VkQ3Jvbi5zdGFydFRpbWUoKTtcblxufSk7XG5cbi8qXG4gVFRMIGluIHNlY29uZHMgZm9yIGhpc3RvcnkgcmVjb3JkcyBpbiBjb2xsZWN0aW9uIHRvIGV4cGlyZVxuIE5PVEU6IFVuc2V0IHRvIHJlbW92ZSBleHBpcnkgYnV0IGVuc3VyZSB5b3UgcmVtb3ZlIHRoZSBpbmRleCBmcm9tXG4gbW9uZ28gYnkgaGFuZFxuXG4gQUxTTzogU3luY2VkQ3JvbiBjYW4ndCB1c2UgdGhlIGBfZW5zdXJlSW5kZXhgIGNvbW1hbmQgdG8gbW9kaWZ5XG4gdGhlIFRUTCBpbmRleC4gVGhlIGJlc3Qgd2F5IHRvIG1vZGlmeSB0aGUgZGVmYXVsdCB2YWx1ZSBvZlxuIGBjb2xsZWN0aW9uVFRMYCBpcyB0byByZW1vdmUgdGhlIGluZGV4IGJ5IGhhbmQgKGluIHRoZSBtb25nbyBzaGVsbFxuIHJ1biBgZGIuY3Jvbkhpc3RvcnkuZHJvcEluZGV4KHtzdGFydGVkQXQ6IDF9KWApIGFuZCByZS1ydW4geW91clxuIHByb2plY3QuIFN5bmNlZENyb24gd2lsbCByZWNyZWF0ZSB0aGUgaW5kZXggd2l0aCB0aGUgdXBkYXRlZCBUVEwuXG4gKi8iXX0=