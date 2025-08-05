import type { InstantRules } from '@instantdb/react';

const rules = {
  profiles: {
    allow: {
      view: 'true',
      create: 'isOwner',
      update: 'isOwner',
      delete: 'false',
    },
    bind: ['isOwner', 'auth.id in data.ref("$user.id")'],
  },
  posts: {
    allow: {
      view: 'true',
      create: 'isOwner',
      update: 'isOwner',
      delete: 'isOwner',
    },
    bind: ['isOwner', 'auth.id in data.ref("author.id")'],
  },
} satisfies InstantRules;

export default rules;
