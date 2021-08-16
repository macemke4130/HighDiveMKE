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
      jwt(payload: String!): JWT
      auth(token: String!): Boolean
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
        const username = args.payload;
        const token = await jsonwebtoken.default.sign({ data: username }, privateKey, { expiresIn: '1d' });
        const jwtObject = {
            token
        };
        return jwtObject;
    },
    auth: async (args) => {
        const token = args.token;
        const auth = await jsonwebtoken.default.verify(token, privateKey, function(err, decoded) {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        return auth;
    }
};

export default {
    schema,
    root
}