import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
      mood: String
  }
`);

export const root = {
    mood: () => {
        return "Bottoms Up."
    }
};

export default {
    schema,
    root
}