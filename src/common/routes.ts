import { findGame, games, getGameCart } from './games';
import { findGamesByAuthor, findAuthorDisplayName } from '.';

export type Dictionary<T> = { [key: string]: T };

export type RouteMetadata = {
  'meta.description': string;
  'meta.keywords': string;
  'meta.author': string;
  'meta.copyright': string;

  'meta.twitter:title': string;
  'meta.twitter:description': string;
  'meta.twitter:image': string;
  'meta.twitter:url': string;

  'meta.og:title': string;
  'meta.og:type': string;
  'meta.og:url': string;
  'meta.og:image': string;
  'meta.og:description': string;

  title: string;
};

type RouteMetadataGenerator = (
  path: string,
  params: Dictionary<string>,
  query: Dictionary<string | (string | null)[]>
) => RouteMetadata;

function makeTitle(
  title: string
): Pick<RouteMetadata, 'title' | 'meta.og:title' | 'meta.twitter:title'> {
  const formattedTitle = `${title} | Loungeware`;
  return {
    title: formattedTitle,
    'meta.twitter:title': formattedTitle,
    'meta.og:title': formattedTitle,
  };
}

function makeImage(
  image: string
): Pick<RouteMetadata, 'meta.og:image' | 'meta.twitter:image'> {
  return {
    'meta.og:image': image,
    'meta.twitter:image': image,
  };
}

function makeDescription(
  description: string
): Pick<
  RouteMetadata,
  'meta.description' | 'meta.og:description' | 'meta.twitter:description'
> {
  return {
    'meta.og:description': description,
    'meta.description': description,
    'meta.twitter:description': description,
  };
}

function getDefaultRouteMetadata(): RouteMetadata {
  const description =
    'Loungeware is a collection of microgames in the style of Warioware that is made by volunteers all over the world in GameMaker. Anyone can play for free or submit their own game.';
  const title = 'Loungeware';
  const image = '/static/images/meta.png';
  const url = 'https://loungeware.games';
  return {
    'meta.author': 'Loungeware',
    title: title,
    'meta.copyright': 'Copyright 2021, Loungeware',
    'meta.description': description,
    'meta.keywords': 'game,gamemaker,gamedev,indiedev,indiegame,loungeware,gm',
    'meta.og:image': image,
    'meta.og:url': url,
    'meta.og:description': description,
    'meta.og:title': title,
    'meta.og:type': 'website',
    'meta.twitter:image': image,
    'meta.twitter:url': url,
    'meta.twitter:description': description,
    'meta.twitter:title': title,
  };
}

export type RoutePath =
  | '*'
  | '/'
  | '/guestbook'
  | '/play'
  | '/browse'
  | '/browse/:author'
  | '/games/:game'
  | '/logout';

export type RouteName =
  | '404'
  | 'about'
  | 'guestbook'
  | 'play'
  | 'browse'
  | 'browse-by-author'
  | 'game-page'
  | 'logout';

export function routePath(routeName: RouteName): RoutePath {
  switch (routeName) {
    case 'about':
      return '/';
    case 'browse':
      return '/browse';
    case 'browse-by-author':
      return '/browse/:author';
    case 'game-page':
      return '/games/:game';
    case 'guestbook':
      return '/guestbook';
    case 'logout':
      return '/logout';
    case 'play':
      return '/play';
    case '404':
      return '*';
  }
}

export function routeName(name: RouteName): string {
  return name;
}

export const routeMetadatas: { [route: string]: RouteMetadataGenerator } = {
  [routePath('browse')]: () => {
    return {
      ...getDefaultRouteMetadata(),
      ...makeTitle(`Browse All Games`),
      ...makeDescription(
        `Checkout all ${games.length} microgames. Help Loungeware grow by rating games`
      ),
    };
  },
  [routePath('browse-by-author')]: (_, params) => {
    const authorGames = findGamesByAuthor(params?.author);
    if (authorGames.length > 0) {
      const displayName = findAuthorDisplayName(params?.author);
      return {
        ...getDefaultRouteMetadata(),
        ...makeTitle(`Browse ${authorGames.length} Games By ${displayName}`),
        ...makeDescription(
          `Checkout all ${authorGames.length} games by ${displayName} on Loungeware '\nPlay now in your browser!`
        ),
      };
    } else {
      return {
        ...getDefaultRouteMetadata(),
        ...makeTitle('Could not find that author! Woops'),
        ...makeDescription('404'),
      };
    }
  },
  [routePath('game-page')]: (_, params) => {
    const game = findGame(params?.game);
    if (game) {
      return {
        ...getDefaultRouteMetadata(),
        ...makeImage(getGameCart(game.id)),
        ...makeTitle(`Play ${game.displayName} by ${game.authors.join(' & ')}`),
        ...makeDescription(
          `${
            game.description?.length > 0
              ? game?.description.join('\n') + '\n Play in your browser!'
              : 'Play in your browser!'
          }`
        ),
      };
    } else {
      return {
        ...getDefaultRouteMetadata(),
        ...makeTitle('Could not find that game! Woops'),
        ...makeDescription('404'),
      };
    }
  },
  [routePath('guestbook')]: () => {
    return {
      ...getDefaultRouteMetadata(),
      ...makeTitle('Guestbook'),
    };
  },
  [routePath('logout')]: () => {
    return {
      ...getDefaultRouteMetadata(),
      ...makeTitle('Sign Out Of Your Account'),
    };
  },
  [routePath('play')]: (_, __, query) => {
    const game = findGame(
      query.gallery_id == undefined ? '' : (query.gallery_id as string)
    );
    if (game) {
      return {
        ...getDefaultRouteMetadata(),
        ...makeImage(getGameCart(game.id)),
        ...makeTitle(`Play ${game.displayName} by ${game.authors.join(' & ')}`),
        ...makeDescription(
          `${
            game.description?.length > 0
              ? game?.description.join('\n') + '\n Play in your browser!'
              : 'Play in your browser!'
          }`
        ),
      };
    } else {
      return {
        ...getDefaultRouteMetadata(),
        ...makeTitle('Play Loungeware'),
      };
    }
  },
  [routePath('404')]: () => {
    return {
      ...getDefaultRouteMetadata(),
      ...makeTitle('Page Not Found!'),
    };
  },
  [routePath('about')]: () => {
    return {
      ...getDefaultRouteMetadata(),
      ...makeTitle('Loungeware'),
    };
  },
};

export function getRouteMetadata(
  path: RoutePath,
  params: Dictionary<string>,
  query: Dictionary<string | (string | null)[]>
): RouteMetadata {
  if (routeMetadatas[path]) {
    return routeMetadatas[path](path, params, query);
  }
  throw new Error('Could not get metadata for path ' + path);
}
