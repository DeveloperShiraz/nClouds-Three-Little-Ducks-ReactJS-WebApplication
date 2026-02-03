import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { askExpert } from '../functions/ask-expert/resource';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
    UserProfile: a
        .model({
            name: a.string().required(),
            role: a.enum(['DAD', 'MOM', 'GUARDIAN', 'OTHER']),
            babyName: a.string(),
            babyBirthday: a.date(),
            babyGender: a.enum(['BOY', 'GIRL', 'UNSPECIFIED']),
        })
        .authorization((allow) => [allow.owner()]),

    askExpert: a.query()
        .arguments({
            question: a.string().required(),
            sessionId: a.string()
        })
        .returns(a.json())
        .authorization(allow => [allow.authenticated()])
        .handler(a.handler.function(askExpert))
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'userPool',
    },
});
