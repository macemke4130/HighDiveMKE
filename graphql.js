import { buildSchema } from 'graphql';
import { query } from "./dbconnect.js";
import * as jsonwebtoken from 'jsonwebtoken';
import config from './config/index.js';

const privateKey = config.keys.jwt;

export const schema = buildSchema(`
  type Query {
      mood: String
      allTaps: [Tap]
      tap(id: Int!): Tap
      user(username: String!, password: String!): User
      jwt(username: String!, id: Int!, admin: Boolean!): JWT
      auth(token: String!): AuthObject
  }

  type UserObject {
      id: Int
      username: String
      admin: Boolean
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
      price: Float
      size: Int
      abv: Float
      ibu: Int
      description: String
      created: String
  }
`);

export const root = {
    mood: () => {
        return "Bottoms Up."
    },
    allTaps: async () => {
        const r = await query("select * from ontap");
        return r;
    },
    tap: async (args) => {
        const r = await query("select * from ontap where id = ?", [args.id]);
        return r[0];
    },
    user: async (args) => {
        // Authentication --
        console.log(args)
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
        // Create and return JWT object--
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
    }
};

export default {
    schema,
    root
}