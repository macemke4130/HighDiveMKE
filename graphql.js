import { buildSchema } from 'graphql';
import { query } from "./dbconnect.js";

export const schema = buildSchema(`
  type Query {
      mood: String
      allTaps: [Tap]
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
        console.log(r);
        return r;
    }

};

export default {
    schema,
    root
}