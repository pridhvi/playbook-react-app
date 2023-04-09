export type SearchResult = {
  id: number;
  alternative_name: string;
  character: Character;
  checksum: number;
  collection: number;
  company: number;
  description: string;
  game: Game;
  name: string;
  platform: number;
  published_at: number;
  test_dummy: number;
  theme: number;
};

export type Game = {
  id: number;
  age_ratings: number[];
  aggregated_rating: number;
  aggregated_rating_count: number;
  alternative_names: number[];
  artworks: number[];
  artworkUrls: string[];
  bundles: number[];
  // category	Category Enum;
  checksum: number;
  collection: number;
  cover: Picture;
  created_at: number;
  dlcs: number[];
  expanded_games: number[];
  expansions: number[];
  external_games: number[];
  first_release_date: number[];
  follows: number;
  forks: number[];
  franchise: number;
  franchises: number[];
  game_engines: number[];
  game_localizations: number[];
  game_modes: number[];
  genres: number[];
  hypes: number[];
  involved_companies: number[];
  keywords: number[];
  language_supports: number[];
  multiplayer_modes: number[];
  name: string;
  parent_game: number;
  platforms: Platform[];
  platformsNames: string;
  player_perspectives: number[];
  ports: number[];
  rating: number;
  rating_count: number;
  release_dates: number[];
  remakes: number[];
  remasters: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  standalone_expansions: number[];
  // status	Status Enum	The status of the games release
  storyline: string;
  summary: string;
  tags: number[];
  themes: number[];
  total_rating: number;
  total_rating_count: number;
  updated_at: number;
  url: string;
  version_parent: number;
  version_title: string;
  videos: number[];
  websites: number[];
};

export type Character = {
  id: number;
  akas: string[];
  checksum: number;
  country_name: string;
  created_at: number;
  description: string;
  games: Game[];
  gender: number;
  mug_shot: Picture;
  name: string;
  slug: string;
  species: number;
  updated_at: number;
  url: string;
};

// Cover, Mugshot
export type Picture = {
  url: string;
  height: number;
  width: number;
};

export type Platform = {
  id: number;
  abbreviation: string;
  alternative_name: string;
  // category	Category Enum	A physical or virtual category of the platform
  checksum: number;
  created_at: number;
  generation: number;
  name: string;
  platform_family: number;
  platform_logo: string;
  slug: string;
  summary: string;
  updated_at: number;
  url: string;
  versions: number[];
  websites: number[];
};

// export type PlatformLogo = {
//   url: string;
//   height: number;
//   width: number;
// };

export type User = {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  // dob: Date;
  // email: String,
  createdAt?: Date;
  // isAdmin: boolean;
  role?: string;
};

export type Comment = {
  _id?: string;
  comment: string;
  itemType: string;
  itemId: number;
  username: number;
  likesUsernames: string[];
  dislikesUsernames: string[];
  createdAt?: Date;
};
