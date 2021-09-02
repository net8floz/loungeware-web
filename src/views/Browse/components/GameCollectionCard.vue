<template>
  <router-link class="content" :to="getRoute(game.id)">
    <div class="cart-content">
      <Cart :size="cartSize" :game-id="game.id" />
    </div>
    <div class="list-content full-wdith flex-grow" v-if="viewType == 'list'">
      <div class="title">
        <strong>{{ game.displayName }}</strong
        ><br />
        <small>
          by
          <span v-for="(id, i) in game.authorIds" :key="`${i}-contributor`">
            <router-link
              :to="{ name: 'browse-by-author', params: { author: id } }"
            >
              {{ $lwMeta.findAuthorDisplayName(id) }}
            </router-link>
            <span
              v-if="game.authorIds.length > 1 && i != game.authorIds.length - 1"
            >
              &
            </span>
          </span>
        </small>
      </div>
      <div class="flex-grow" />
      <div class="community" v-if="!!microgame">
        <div
          v-tooltip.bottom="
            `Rated by ${microgame.communityRating.favorited} people!`
          "
          v-if="microgame.communityRating.favorited > 0"
        >
          <mdicon name="comment-check" />
          {{ microgame.communityRating.total }}
        </div>
        <div
          v-tooltip.bottom="
            `Favorited ${microgame.communityRating.favorited} times!`
          "
          v-if="microgame.communityRating.favorited > 0"
        >
          <mdicon name="star" />
          {{ microgame.communityRating.favorited }}
        </div>
        <div
          v-tooltip.bottom="
            `A ${microgame.communityRating.difficulty} / 5 difficulty based on ${microgame.communityRating.total} ratings!`
          "
          v-if="microgame.communityRating.favorited > 0"
        >
          <mdicon name="hazard-lights" />
          {{ microgame.communityRating.difficulty }}
          / 5
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Cart from '@/components/Cart.vue';
import Contributor from '@/components/Contributor.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MicrogameMetadata, routeName } from '@/common';
import gql from 'graphql-tag';
import * as schema from '@/gql/schema';

export type ViewType = 'grid' | 'list' | 'carts';

@Component({
  components: {
    Cart,
    Contributor,
  },
  apollo: {
    microgameByGameId: {
      skip() {
        return !this.game;
      },
      variables() {
        return {
          gameId: this.game.id,
        };
      },
      query: gql`
        query GameCollectionCard_microgame($gameId: String!) {
          microgameByGameId(gameId: $gameId) {
            id
            communityRating {
              difficulty
              favorited
              total
            }
          }
        }
      `,
    },
  },
})
export default class GameCollectionCard extends Vue {
  @Prop(String) viewType!: ViewType;
  @Prop(Object) game!: MicrogameMetadata;

  private microgameByGameId!: schema.Microgame;

  private get microgame() {
    return this.microgameByGameId;
  }

  private get cartSize() {
    switch (this.viewType) {
      case 'list':
        return 0.5;
      case 'grid':
        return 1;
      case 'carts':
        return 1;
    }
    return 1;
  }

  private getRoute(gameId: string) {
    return {
      name: routeName('game-page'),
      params: {
        game: gameId,
      },
    };
  }
}
</script>

<style lang="scss" scoped>
.community {
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  > div {
    padding-top: 5px;
    line-height: 30px;
  }
  .mdi {
    position: relative;
    top: -3px;
    // margin-bottom: 12px !important;
    // background-color: red;
    // line-height: 0.1rem;
  }
}
</style>
