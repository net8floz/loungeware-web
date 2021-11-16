export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddMicrogameRatingInput = {
  microgameId: Scalars['String'];
  comment: Scalars['String'];
  difficulty: Scalars['Float'];
  isFavorited: Scalars['Boolean'];
};

export type Contributor = Node & {
  __typename?: 'Contributor';
  id: Scalars['ID'];
  prefix: Scalars['String'];
  displayName: Scalars['String'];
};

export type DifficultySlice = {
  __typename?: 'DifficultySlice';
  difficulty: Scalars['Float'];
  totalPlays: Scalars['Float'];
  wins: Scalars['Float'];
  losses: Scalars['Float'];
  winRatio: Scalars['Float'];
  lossRatio: Scalars['Float'];
  winLossRatio: Scalars['Float'];
};

export type DiscordRole = {
  __typename?: 'DiscordRole';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  colorHex: Scalars['String'];
};

export type Guestbook = Node & {
  __typename?: 'Guestbook';
  id: Scalars['ID'];
  authorUserId: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['Float'];
  author: User;
};

export type GuestbookCreateInput = {
  text: Scalars['String'];
};

export type Larold = Node & {
  __typename?: 'Larold';
  id: Scalars['ID'];
  attribution: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  author?: Maybe<Contributor>;
};

export type LeaderBoardEntry = Node & {
  __typename?: 'LeaderBoardEntry';
  id: Scalars['ID'];
  name: Scalars['String'];
  score: Scalars['Float'];
  sprite: Scalars['String'];
  frame: Scalars['Float'];
  last_microgame_key: Scalars['String'];
  last_microgame_name: Scalars['String'];
  timestamp: Scalars['Float'];
};

export type Microgame = Node & {
  __typename?: 'Microgame';
  id: Scalars['ID'];
  gameId: Scalars['String'];
  contributors: Contributor;
  ratings: Array<MicrogameRating>;
  stats: MicrogameStats;
  hasMyRating: Scalars['Boolean'];
  communityRating: MicrogameCommunityRating;
};

export type MicrogameCommunityRating = {
  __typename?: 'MicrogameCommunityRating';
  difficulty: Scalars['Float'];
  favorited: Scalars['Float'];
  total: Scalars['Float'];
};

export type MicrogameRating = Node & {
  __typename?: 'MicrogameRating';
  id: Scalars['ID'];
  isFavorited: Scalars['Boolean'];
  difficulty: Scalars['Float'];
  comment: Scalars['String'];
  createdAt: Scalars['Float'];
  editedAt: Scalars['Float'];
  author: User;
};

export type MicrogameStats = Node & {
  __typename?: 'MicrogameStats';
  id: Scalars['ID'];
  wins: Scalars['Float'];
  losses: Scalars['Float'];
  totalPlays: Scalars['Float'];
  lastPlayedTimestamp: Scalars['Float'];
  winLossRatio: Scalars['Float'];
  winRatio: Scalars['Float'];
  lossRatio: Scalars['Float'];
  difficultySlices: Array<DifficultySlice>;
};

export type Mutation = {
  __typename?: 'Mutation';
  guestbookCreate: Guestbook;
  visitPage: PageVisit;
  addMicrogameRating: MicrogameRating;
};


export type MutationGuestbookCreateArgs = {
  input: GuestbookCreateInput;
};


export type MutationVisitPageArgs = {
  route: Scalars['String'];
};


export type MutationAddMicrogameRatingArgs = {
  input: AddMicrogameRatingInput;
};

export type NewsEntry = {
  __typename?: 'NewsEntry';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  type: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageVisit = Node & {
  __typename?: 'PageVisit';
  id: Scalars['ID'];
  route: Scalars['String'];
  visits: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  node: Node;
  user: User;
  me: User;
  guestbooks: Array<Guestbook>;
  guestbook: Guestbook;
  pageVisits: PageVisit;
  microgameByGameId: Microgame;
  microgamesByContributor: Microgame;
  contributorByAuthorPrefix: Contributor;
  LaroldsByAuthor: Array<Larold>;
  Larolds: Array<Larold>;
  leaderBoardEntry: LeaderBoardEntry;
  leaderBoardEntriesTop: Array<LeaderBoardEntry>;
  microgameStatsByGameId: MicrogameStats;
  microgameStats: MicrogameStats;
  clientVersion: Scalars['String'];
  news: Array<NewsEntry>;
};


export type QueryNodeArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryGuestbookArgs = {
  id: Scalars['String'];
};


export type QueryPageVisitsArgs = {
  route: Scalars['String'];
};


export type QueryMicrogameByGameIdArgs = {
  gameId: Scalars['String'];
};


export type QueryMicrogamesByContributorArgs = {
  authorPrefix: Scalars['String'];
};


export type QueryContributorByAuthorPrefixArgs = {
  prefix: Scalars['String'];
};


export type QueryLaroldsByAuthorArgs = {
  prefix: Scalars['String'];
};


export type QueryLeaderBoardEntryArgs = {
  id: Scalars['String'];
};


export type QueryMicrogameStatsByGameIdArgs = {
  gameId: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  profilePictureUrl: Scalars['String'];
  roles: Array<DiscordRole>;
};
