import { buildSchema } from 'graphql';
import { query } from "./dbconnect.js";
import * as jsonwebtoken from 'jsonwebtoken';
import config from './config/index.js';
import dayjs from 'dayjs';

const privateKey = config.keys.jwt;

export const schema = buildSchema(`
  type Query {
      mood: String
      allTaps(admin: Boolean): [Tap]
      allEvents(admin: Boolean): [Event]
      tap(id: Int!): Tap
      user(username: String!, password: String!): User
      jwt(username: String!, id: Int!, admin: Boolean!): JWT
      auth(token: String!): AuthObject
  }

  type Mutation {
      newTap(active: Boolean!, tapname: String!, brewer: String!, price: String!, size: Int, abv: Float, ibu: Int): mysqlResponse
      editTap(id: Int!, active: Boolean!, tapname: String, brewer: String, price: String, size: Int, abv: Float, ibu: Int): mysqlResponse
  }

  type mysqlResponse {
    fieldCount: Int
    afffieldCount: Int
    affectedRows: Int
    insertId: Int
    serverStatus: Int
    warningCount: Int
    message: String
    protocol41: Boolean
    changedRows: Int
}

  type AuthObject {
      valid: Boolean
      id: Int
      username: String
      admin: Boolean
  }

  type JWT {
      token: String
  }

  type User {
      id: Int
      username: String
      password: String
      admin: Boolean
  }

  type Tap {
      id: Int
      active: Boolean
      tapname: String
      brewer: String
      price: String
      size: Int
      abv: Float
      ibu: Int
      created: String
  }

  type Event {
      id: Int
      title: String
      description: String
      eventdate: String
      starttime: String
      endtime: String
      price: String
      eventlink: String
      ticketlink: String
      createdat: String

  }
`);

export const root = {
    mood: () => {
        return "Bottoms Up."
    },
    allTaps: async (args) => {
        let r;
        if (args.admin) {
            r = await query("select * from ontap order by active desc, tapname asc");
        } else {
            r = await query("select * from ontap where active = 1");
        }
        return r;
    },
    allEvents: async (args) => {
        let r;
        if (args.admin) {
            // Admin View with past events --
            r = await query("select * from events");
        } else {
            // Public View --
            r = await query("select * from events where eventdate >= now() order by eventdate");
        }
        for (let i = 0; i < r.length; i++) {
            const dateFormat = dayjs(r[i].eventdate).format("MMM DD, YYYY");
            r[i].eventdate = dateFormat;
        }
        return r;
    },
    tap: async (args) => {
        const r = await query("select * from ontap where id = ?", [args.id]);
        return r[0];
    },
    user: async (args) => {
        // Authentication --
        const r = await query("select * from users where username = ?", [args.username]);
        const inputPassword = args.password;

        // Needs encryption --
        const dbPassword = r[0].password;

        if (inputPassword === dbPassword) {
            // Success --
            return r[0];
        } else {
            // Denied --
            return null;
        }
    },
    jwt: async (args) => {
        // Create and returns JWT object--
        const userObject = {
            id: args.id,
            username: args.username,
            admin: args.admin
        };
        const token = await jsonwebtoken.default.sign({ data: userObject }, privateKey, { expiresIn: '1d' });
        const jwtObject = {
            token
        };
        return jwtObject;
    },
    auth: async (args) => {
        // Creates and returns an authObject for the front end --
        let authObject = {};
        const token = args.token;
        const auth = await jsonwebtoken.default.verify(token, privateKey, function (err, decoded) {
            if (err) {
                authObject = {
                    valid: false,
                    id: null,
                    username: null,
                    admin: false
                };
            } else {
                authObject = {
                    valid: true,
                    id: decoded.data.id,
                    username: decoded.data.username,
                    admin: decoded.data.admin
                };
            }
        });
        return authObject;
    },
    // Mutations
    editTap: async (args) => {
        const r = await query("update ontap set ? where id = ?", [args, args.id]);
        return r;
    },
    newTap: async (args) => {
        const r = await query("insert into ontap set ?", [args]);
        return r;
    }
};

export default {
    schema,
    root
}