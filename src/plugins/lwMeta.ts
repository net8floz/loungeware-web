import Vue from 'vue';
import _Vue from 'vue';
import * as common from '@/common';

export interface LWMetaInterface {
  games: common.MicrogameMetadata[];
  findGame(gameId: string): common.MicrogameMetadata | null;
  findGamesByAuthor(authorId: string): common.MicrogameMetadata[];
  findAuthorDisplayName(authorId: string): string;
}

export class LWMeta extends Vue implements LWMetaInterface {
  public games!: common.MicrogameMetadata[];

  constructor() {
    super({
      data: {},
      computed: {
        games(): common.MicrogameMetadata[] {
          return common.games;
        },
      },
    });
  }
  findGame = common.findGame;
  findGamesByAuthor = common.findGamesByAuthor;
  findAuthorDisplayName = common.findAuthorDisplayName;
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
