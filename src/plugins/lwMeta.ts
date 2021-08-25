import Vue from 'vue';
import _Vue from 'vue';

import * as gamesList from '@/common/gamesList';

export type LocalGameMetadata = {
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
const rgbToHex = function (rgb: number) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

// https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb
const fullColorHex = function (r: number, g: number, b: number) {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return '#' + red + green + blue;
};

const makeColor = function (color: string | number[]): string {
  try {
    if (typeof color === 'string') {
      const c = color.substr(2, color.length - 2);
      return `#${c}`;
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

const makeAuthorNames = function (authors: string | Map<string, string>) {
  if (typeof authors === 'string') {
    return [authors];
  }
  return Object.values(authors);
};

export interface LWMetaInterface {
  games: LocalGameMetadata[];
  getGame(gameId: string): LocalGameMetadata | null;
  getGamesByAuthor(authorId: string): LocalGameMetadata[];
  findAuthorDisplayName(authorId: string): string;
}

export class LWMeta extends Vue implements LWMetaInterface {
  public games!: LocalGameMetadata[];

  constructor() {
    super({
      data: {},
      // methods: {
      //   getGame(authorId: string, gameId: string): LocalGameMetadata | null {
      //     return (
      //       this..find(
      //         (i) => i.authorIds.find((j) => j === authorId) && i.id === gameId
      //       ) || null
      //     );

      // }
      //   getGamesByAuthor(authorId: string): LocalGameMetadata[] {
      //     const _this: LWMeta = this as any;
      //     const output: LocalGameMetadata[] = [];
      //     _this.games.forEach((i) => {
      //       if (i.authorIds.find((j) => j === authorId)) {
      //         output.push(i);
      //       }
      //     });
      //     return output;
      //   },
      // },
      computed: {
        games(): LocalGameMetadata[] {
          return gamesList.games.map((data) => {
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
        },
      },
    });
  }

  public findAuthorDisplayName(authorId: string): string {
    const game = this.games.find((i) =>
      i.authorIds.find((j) => j === authorId)
    );
    if (game) {
      const index = game.authorIds.findIndex((j) => j === authorId);
      return game.authors[index];
    }
    return authorId;
  }

  public getGame(gameId: string): LocalGameMetadata | null {
    return this.games.find((i) => i.id === gameId) || null;
  }

  public getGamesByAuthor(authorId: string): LocalGameMetadata[] {
    const output: LocalGameMetadata[] = [];
    this.games.forEach((i) => {
      if (i.authorIds.find((j) => j === authorId)) {
        output.push(i);
      }
    });
    return output;
  }

  // get games(): LocalGameMetadata[] {
  //   throw new Error('Method not implemented.');
  // }
  // getGame(authorId: string, gameId: string): LocalGameMetadata | null {
  //   throw new Error('Method not implemented.');
  // }
}

const inst = new LWMeta();
export default inst;

export class LWMetaOptions {}

export function LWMetaPlugin<LWMetaOptions>(
  Vue: typeof _Vue,
  options?: LWMetaOptions
): void {
  Vue.prototype.$lwMeta = inst;
}

Vue.use(LWMetaPlugin);
