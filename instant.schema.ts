import { i, type InstaQLEntity } from '@instantdb/react';

// Basic template schema definition for InstantDB
const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    profiles: i.entity({
      handle: i.string().unique().indexed(),
      createdAt: i.number(),
    }),
    posts: i.entity({
      title: i.string(),
      content: i.string(),
      published: i.boolean(),
      createdAt: i.number(),
    }),
  },
  links: {
    profileUser: {
      forward: { on: 'profiles', has: 'one', label: '$user' },
      reverse: { on: '$users', has: 'one', label: 'profile' },
    },
    postAuthor: {
      forward: { on: 'posts', has: 'one', label: 'author' },
      reverse: { on: 'profiles', has: 'many', label: 'posts' },
    },
  },
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

// Export TypeScript types inferred from schema
export type User = InstaQLEntity<AppSchema, '$users'>;
export type Profile = InstaQLEntity<AppSchema, 'profiles'>;
export type Post = InstaQLEntity<AppSchema, 'posts'>;

export type { AppSchema };
export default schema;
