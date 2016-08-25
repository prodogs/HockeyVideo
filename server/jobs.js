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
    SyncedCron.start();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9icy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpvYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBQy9ELHFEQUFxRDtBQUdyRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBRVgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUU3QixVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2QsR0FBRyxFQUFFLEtBQUs7UUFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFDdEIsY0FBYyxFQUFFLGFBQWE7UUFDN0IsR0FBRyxFQUFFLEtBQUs7UUFFVixhQUFhLEVBQUUsTUFBTTtLQUN4QixDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ1gsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxRQUFRLEVBQUUsVUFBVSxNQUFNO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELEdBQUcsRUFBRTtZQUNILG1EQUFtRDtZQUNuRCxnQ0FBZ0M7UUFFbEMsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUV2QixDQUFDLENBQUMsQ0FBQztBQUVIOzs7Ozs7Ozs7O0dBVUciLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwZXNjcmlwdC1kZWZzL2FsbC1kZWZpbml0aW9ucy5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2JvdGgvQ29uc2lzdGVuY3lDaGVja2VyLnRzXCIvPlxuXG5kZWNsYXJlIHZhciBTeW5jZWRDcm9uOmFueTtcbk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgSm9ic1wiKTtcblxuICAgIFN5bmNlZENyb24uY29uZmlnKHtcbiAgICAgICAgbG9nOiBmYWxzZSxcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmpvYkxvZ2dlcixcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICdjcm9uSGlzdG9yeScsXG4gICAgICAgIHV0YzogZmFsc2UsXG5cbiAgICAgICAgY29sbGVjdGlvblRUTDogMTcyODAwXG4gICAgfSk7XG5cbiAgICBTeW5jZWRDcm9uLmFkZCh7XG4gICAgICAgIG5hbWU6IFwiQ2hlY2sgQ29uc2lzdGVuY3kgb2YgRGF0YWJhc2VcIixcbiAgICAgICAgc2NoZWR1bGU6IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZXIudGV4dCgnZXZlcnkgNSBtaW51dGVzJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGpvYjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vICB2YXIgY2hlY2tDb25pc3RlbmN5ID0gbmV3IENvbnNpc3RlbmN5Q2hlY2tlcigpO1xuICAgICAgICAgIC8vICBjaGVja0NvbmlzdGVuY3kuc3RhcnRUaW1lKCk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgU3luY2VkQ3Jvbi5zdGFydCgpO1xuXG59KTtcblxuLypcbiBUVEwgaW4gc2Vjb25kcyBmb3IgaGlzdG9yeSByZWNvcmRzIGluIGNvbGxlY3Rpb24gdG8gZXhwaXJlXG4gTk9URTogVW5zZXQgdG8gcmVtb3ZlIGV4cGlyeSBidXQgZW5zdXJlIHlvdSByZW1vdmUgdGhlIGluZGV4IGZyb21cbiBtb25nbyBieSBoYW5kXG5cbiBBTFNPOiBTeW5jZWRDcm9uIGNhbid0IHVzZSB0aGUgYF9lbnN1cmVJbmRleGAgY29tbWFuZCB0byBtb2RpZnlcbiB0aGUgVFRMIGluZGV4LiBUaGUgYmVzdCB3YXkgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IHZhbHVlIG9mXG4gYGNvbGxlY3Rpb25UVExgIGlzIHRvIHJlbW92ZSB0aGUgaW5kZXggYnkgaGFuZCAoaW4gdGhlIG1vbmdvIHNoZWxsXG4gcnVuIGBkYi5jcm9uSGlzdG9yeS5kcm9wSW5kZXgoe3N0YXJ0ZWRBdDogMX0pYCkgYW5kIHJlLXJ1biB5b3VyXG4gcHJvamVjdC4gU3luY2VkQ3JvbiB3aWxsIHJlY3JlYXRlIHRoZSBpbmRleCB3aXRoIHRoZSB1cGRhdGVkIFRUTC5cbiAqLyJdfQ==