import Realm from 'realm';
import {EntrySchema} from '../schemas';

// place your RealmApp ID here
const app = new Realm.App({id: 'simplecalorie-rzyyu', timeout: 10000});

// can implement inBuilt JWT, Google, Facebook, Apple Authentication Flow.
const credentials = Realm.Credentials.anonymous(); // LoggingIn as Anonymous User.

getRealm = async () => {
    // loggedIn as anonymous user
    const loggedInUser = await app.logIn(credentials);

    // MongoDB RealmConfiguration
    const configuration = {
        schema: [EntrySchema], // add multiple schemas, comma seperated.
        sync: {
            user: app.currentUser, // loggedIn User
            partitionValue: 'entry_partition', // should be userId(Unique) so it can manage particular user related documents in DB by userId
        },
    };

    return Realm.open(configuration);
};

export default getRealm;
