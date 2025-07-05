import { i } from '@instantdb/react';

// Shared schema definition for InstantDB
export const schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    poses: i.entity({
      name: i.string().indexed(),
      description: i.string(),
      difficulty: i.string(),
      isStartingPose: i.boolean().optional(),
      imageUrl: i.string().optional(),
      baseImageUrl: i.string().optional(),
      flyerImageUrl: i.string().optional(),
      createdAt: i.number(),
    }),
    transitions: i.entity({
      name: i.string(),
      description: i.string().optional(),
      fromPoseId: i.string(),
      toPoseId: i.string(),
      createdAt: i.number(),
    }),
    flows: i.entity({
      name: i.string(),
      description: i.string().optional(),
      isPublic: i.boolean(),
      userId: i.string(),
      stepsData: i.string(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),
    profiles: i.entity({
      displayName: i.string().unique().indexed(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),
    comments: i.entity({
      content: i.string(),
      createdAt: i.number().indexed(),
      updatedAt: i.number().indexed(),
    }),
    favorites: i.entity({
      poseId: i.string(),
      profileId: i.string(),
    }),
  },
  links: {
    profileUser: {
      forward: { on: 'profiles', has: 'one', label: '$user' },
      reverse: { on: '$users', has: 'one', label: 'profile' },
    },
    commentsPose: {
      forward: { on: 'comments', has: 'one', label: 'pose' },
      reverse: { on: 'poses', has: 'many', label: 'comments' },
    },
    commentsAuthor: {
      forward: { on: 'comments', has: 'one', label: 'author' },
      reverse: { on: 'profiles', has: 'many', label: 'comments' },
    },
    favoritesPose: {
      forward: { on: 'favorites', has: 'one', label: 'pose' },
      reverse: { on: 'poses', has: 'many', label: 'favorites' },
    },
    favoritesProfile: {
      forward: { on: 'favorites', has: 'one', label: 'profile' },
      reverse: { on: 'profiles', has: 'many', label: 'favorites' },
    },
  },
});

// App configuration - Replace with your InstantDB App ID
export const APP_ID = process.env.VITE_INSTANTDB_APP_ID || '{{INSTANTDB_APP_ID}}';

// TypeScript types derived from schema
export type Schema = {
  $users: {
    id: string;
    email?: string; // Optional per InstantDB schema
  };
  poses: {
    id: string;
    name: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    isStartingPose?: boolean;
    imageUrl?: string;
    baseImageUrl?: string;
    flyerImageUrl?: string;
    createdAt: number;
  };
  transitions: {
    id: string;
    name: string;
    description?: string;
    fromPoseId: string;
    toPoseId: string;
    createdAt: number;
  };
  flows: {
    id: string;
    name: string;
    description?: string;
    isPublic: boolean;
    userId: string;
    stepsData: string;
    createdAt: number;
    updatedAt: number;
  };
  profiles: {
    id: string;
    displayName: string;
    createdAt: number;
    updatedAt: number;
  };
  comments: {
    id: string;
    content: string;
    createdAt: number;
    updatedAt: number;
  };
  favorites: {
    id: string;
    poseId: string;
    profileId: string;
  };
};

export type Pose = Schema['poses'];
export type Transition = Schema['transitions'];
export type Flow = Schema['flows'];
export type Profile = Schema['profiles'];
export type Comment = Schema['comments'];
export type Favorite = Schema['favorites'];
export type User = {
  id: string;
  email?: string; // Optional per InstantDB schema
};

// Local flow step interface for the builder
export interface FlowStep {
  pose: Pose;
  transition?: Transition;
}
