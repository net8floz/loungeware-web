import * as gamesList from './gamesList';

export type MicrogameMetadata = {
  id: string;
  slug: string;
  authorIds: string[];
  authors: string[];
  displayName: string;
  prompt: string | string[];
  timeSeconds: number;
  colorPrimary: string;
  colorSecondary: string;
  credits: string[];
  dataAdded: string;
  description: string[];
  howToPlay: string[];
};

// https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb
const rgbToHex = function (rgb: number): string {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

// https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb
const fullColorHex = function (r: number, g: number, b: number): string {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return '#' + red + green + blue;
};

const makeColor = function (color: string | number[]): string {
  try {
    if (typeof color === 'string') {
      if (/^[0x]/i.test(color)) {
        return color.replace('0x', '#');
      } else if (/^[#]/i.test(color)) {
        return color;
      } else if (/^[$]/i.test(color)) {
        return color.replace('$', '#');
      } else {
        return `#${color}`;
      }

      // throw 'wtf color is that??';
      // const bbggrr = c.split('');

      // const rr = bbggrr[4] + bbggrr[5];
      // const gg = bbggrr[2] + bbggrr[3];
      // const bb = bbggrr[0] + bbggrr[1];

      // return `#${rr}${gg}${bb}`;
    }
    if (Array.isArray(color)) {
      return fullColorHex(color[0], color[1], color[2]);
    }
  } catch (err) {
    console.error(err);
  }
  return '#ff0ff0';
};

const makeDate = function (date: any): string {
  const dateAdded = date || '';

  if (typeof dateAdded === 'string') {
    return dateAdded;
  }
  if (typeof dateAdded === 'object') {
    try {
      return `${dateAdded.month}, ${dateAdded.day} ${dateAdded.year}`;
    } catch (err) {
      return '';
    }
  }
  return dateAdded;
};

const makeAuthorNames = function (
  authors: string | Map<string, string>
): string[] {
  if (typeof authors === 'string') {
    return [authors];
  }
  return Object.values(authors);
};

console.log('Exported games');
export const games: MicrogameMetadata[] = gamesList.games.map((data) => {
  return {
    id: data.name,
    slug: data.name,
    authorIds: data.authorIds,
    authors: makeAuthorNames(data.config.authors as any),
    displayName: data.config.game_name,
    colorPrimary: makeColor(data.config.cartridge_col_primary),
    colorSecondary: makeColor(data.config.cartridge_col_secondary),
    credits: data.config.credits,
    dataAdded: makeDate(data.config.date_added),
    prompt: data.config.prompt,
    timeSeconds: data.config.time_seconds,
    description: data.config.description || [],
    howToPlay: data.config.how_to_play || [],
  };
});

export function findAuthorDisplayName(authorId: string): string {
  const game = games.find((i) => i.authorIds.find((j) => j === authorId));
  if (game) {
    const index = game.authorIds.findIndex((j) => j === authorId);
    if (index >= 0) {
      return game.authors[index];
    }
  }
  return authorId;
}

export function findGame(gameId: string): MicrogameMetadata | null {
  return games.find((i) => i.id === gameId) || null;
}

export function findGamesByAuthor(authorId: string): MicrogameMetadata[] {
  const output: MicrogameMetadata[] = [];
  games.forEach((i) => {
    if (i.authorIds.find((j) => j === authorId)) {
      output.push(i);
    }
  });
  return output;
}

export function getGameCart(gameId: string): string {
  return `/static/games/${gameId}.png`;
}
