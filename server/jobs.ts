/// <reference path="../typescript-defs/all-definitions.d.ts"/>
/// <reference path="../both/ConsistencyChecker.ts"/>

declare var SyncedCron:any;
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
          //  checkConistency.start();

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