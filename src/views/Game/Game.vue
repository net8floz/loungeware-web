<template>
  <div class="container full-width">
    <!-- Breadcrumbs -->
    <div class="row center-xs full-width addressbar">
      <div class="col-xs-12">
        <h2>
          <larold-img name="ghost larold" class="mr-1" />
          <router-link :to="{ name: 'browse' }"> All Games </router-link>
          /
          {{ displayName }}
        </h2>
      </div>
    </div>

    <!-- BANNER -->
    <div class="row center-xs full-width cover">
      <div class="col col-6">
        <!-- CART -->
        <Cart :size="2" :game-id="game.id" />
      </div>
      <div class="col col-6 title-panel">
        <!-- INFO --> 
        <div class="panel">
          <div class="title mt-1">{{ displayName }}</div>
          <router-link
            v-for="(author, i) in authors"
            :key="`${i}-author`"
            :to="{ name: 'browse-by-author', params: { author: author.id } }"
            class="btn"
          >
            {{ author.displayName }}
          </router-link>
          <!-- <div class="">Added On {{ dateAdded }}</div> -->
          <!-- <div class="">Duration {{ microgame.stats }} seconds</div> -->
        </div>

        <!-- <img class="cart img-pixel media-border" :src="cartLabelSrc" /> -->
      </div>
    </div>

    <div class="row center-xs full-width panel links">
      <a :href="galleryRelativeLink" class="btn"> Play In Gallery </a>
    </div>

    <!-- DESC PANEL -->
    <div class="panel mt-2">
      <!-- DESCRIPTION -->
      <div v-if="description" class="row center-xs full-width desc-wrap">
        <div class="inner col-xs-12">
          <div class="title">Description</div>
          <p v-for="(paragraph, i) in description" :key="`${i}-description`">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- HOW TO PLAY -->
      <div v-if="howToPlay" class="row center-xs full-width desc-wrap">
        <div class="col-xs-12 inner">
          <div class="title">How To Play</div>
          <p v-for="(paragraph, i) in howToPlay" :key="`${i}-how-to-play`">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>

    <div class="panel row center-xs full-width">
      <div class="basic-info col col-6">
        <div class="pad-10">
          <div class="credits-title title">INFO</div>
          <div class="info-node">Added On {{ dateAdded }}</div>
          <div class="info-node">Duration {{ gameDuration }} seconds</div>
        </div>
      </div>

      <div class="col col-6">
        <div class="pad-10">
          <div v-if="credits.length > 0">
            <div class="credits-title title">ADDITIONAL CREDITS</div>
            <ul class="credits">
              <li v-for="(item, i) in credits" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    

    <!-- No Game -->
    <div v-if="!game">
      <p>No game found</p>
    </div>

    <!-- LOADING -->
    <div v-else-if="$apollo.queries.microgameByGameId.loading">
      <p>Loading</p>
    </div>

    <div v-else-if="!!microgameByGameId">
      <!-- STATS PANEL -->
      <div class="panel tab-box">
        <div class="tab-buttons">
          <div
            @click="activeTabIndex = 0"
            :class="`btn ${activeTabIndex == 0 ? 'active' : ''}`"
          >
            All Stats
          </div>
          <div
            v-for="i in (1, 5)"
            :key="`tab-btn-${i}`"
            :class="`btn ${activeTabIndex == i ? 'active' : ''}`"
            @click="activeTabIndex = i"
          >
            Diff {{ i }}
          </div>
        </div>
        <div class="tabs">
          <div class="tab" v-show="activeTabIndex == 0">
            <div>Total Plays: {{ microgame.stats.totalPlays }}</div>
            <div>Win Percent: {{ Math.round(microgame.stats.winRatio * 100) }}%</div>
            <div>Wins: {{ microgame.stats.wins }}</div>
            <div>Losses: {{ microgame.stats.losses }}</div>
          </div>
          <div
            v-for="i in (1, 5)"
            :key="`tab-${i}`"
            class="tab"
            v-show="activeTabIndex == i"
          >
            <div>Wins: {{ microgame.stats.difficultySlices[i - 1].wins }}</div>
            <div>
              Losses: {{ microgame.stats.difficultySlices[i - 1].losses }}
            </div>
          </div>
        </div>
      </div>
    </div>
   



    <!-- <div class="text-center">
      <h2 class="title">"{{ prompt }}"</h2>
    </div> -->

    <!-- DESCRIPTION -->
    <!-- <div v-if="description" class="row center-xs full-width">
      <div class="col-xs-12">
        <div class="title">Description</div>
        <p v-for="(paragraph, i) in description" :key="`${i}-description`">
          {{ paragraph }}
        </p>
      </div>
    </div> -->

    <!-- HOW TO PLAY -->
    <!-- <div v-if="howToPlay" class="row center-xs full-width">
      <div class="col-xs-12">
        <div class="title">How To Play</div>
        <p v-for="(paragraph, i) in howToPlay" :key="`${i}-how-to-play`">
          {{ paragraph }}
        </p>
      </div>
    </div> -->

    <!-- <div class="border mt-2 mb-2" /> -->

    <!-- <div class="row center-xs full-width">
      <div class="col-xs-12">
        <h2>
          <larold-img name="bunny larold" class="mr-1" />
          Community
        </h2>
      </div>
    </div> -->

    <!-- No Community -->
  </div>
</template>

<script lang="ts">
import LaroldImg from '@/components/LaroldImg.vue';
import GameRatingForm from './components/GameRatingForm.vue';
import { Component, Vue } from 'vue-property-decorator';
import * as schema from '@/gql/schema';
import gql from 'graphql-tag';
import { getRouteMetadata, RoutePath, routeName } from '../../common';
import Cart from '@/components/Cart.vue';

@Component({
  components: {
    LaroldImg,
    GameRatingForm,
    Cart,
  },
  metaInfo() {
    const routeMetadata = getRouteMetadata(
      this.$route.matched[this.$route.matched.length - 1].path as RoutePath,
      this.$route.params,
      this.$route.query
    );
    return {
      title: routeMetadata.title,
    };
  },
  apollo: {
    microgameByGameId: {
      fetchPolicy: 'cache-and-network',
      skip() {
        return !this.game;
      },
      variables() {
        return {
          gameId: this.game.id,
        };
      },
      query: gql`
        query Game_microgame($gameId: String!) {
          microgameByGameId(gameId: $gameId) {
            id
            hasMyRating
            ratings {
              id
              comment
              difficulty
              editedAt
              createdAt
              isFavorited
              author {
                id
                displayName
              }
            }
            stats {
              id
              wins
              losses
              totalPlays
              lastPlayedTimestamp
              winRatio
              difficultySlices {
                difficulty
                totalPlays
                wins
                losses
                winRatio
              }
            }
          }
        }
      `,
    },
  },
})
export default class Game extends Vue {
  private microgameByGameId!: schema.Microgame;

  private get microgame() {
    return this.microgameByGameId;
  }

  private activeTabIndex = 0;

  private get game() {
    return this.$lwMeta.findGame(this.gameSlug as string);
  }

  private get browseByAuthorRoute() {
    return {
      name: routeName('browse-by-author'),
      params: {
        author: '',
      },
    };
  }

  private get gameSlug() {
    return this.$route.params.game;
  }

  private get prompt() {
    return this?.game?.prompt || '';
  }


  private get cartLabelSrc() {
    return this.game ? `/games/${this.game.id}.png` : '';
  }

  private get displayName() {
    return this.game?.displayName || '';
  }

  private get authorName() {
    return this.game?.authors || '';
  }

  private get dateAdded() {
    return this.game?.dataAdded || '';
  }

  private get gameDuration() {
    return this.game?.timeSeconds || 0;
  }

  private get hasMyRating() {
    return this.microgame?.hasMyRating || false;
  }

  private get hasRatings() {
    return this.microgame?.ratings?.length > 0 || false;
  }

  private get description() {
    return this?.game?.description || [];
  }

  private get howToPlay() {
    return this?.game?.howToPlay || [];
  }

  private get timesFavorited() {
    let val = 0;
    this.microgame?.ratings?.forEach((i) => {
      val += i.isFavorited ? 1 : 0;
    });
    return val;
  }

  private get difficultyRating() {
    let val = 0;
    this.microgame?.ratings?.forEach((i) => {
      val += i.difficulty;
    });
    val /= this.microgame?.ratings?.length || 1;
    return val;
  }

  private get ratingsCount() {
    return this.microgame?.ratings?.length || 0;
  }

  private get credits() {
    const credits = this.game?.credits || [];
    return credits;
  }

  private get galleryRelativeLink() {
    return `/play?gallery_id=${this.game?.id}`;
  }

  // private get myRating(){
  //   return this.microgame?.ratings.find(i => i.author?.)
  // }

  private get authors() {
    if (this.game) {
      return this.game.authorIds.map((id, i) => {
        return {
          id,
          displayName: this.game?.authors[i],
        };
      });
    }
    return [];
  }

  private onRatingSubmitSuccess() {
    this.$apollo.queries.microgameByGameId.refetch();
  }
}
</script>

<style lang="scss" scoped>
.cart {
  width: 608px;
  height: 288px;
}

.preview-img {
  width: 100%;
  height: auto;
}

.panel {
  border-bottom: 4px dotted #2b2438;
  padding: 0px 12px;
  margin:0px;
  &:last-of-type{
    border-bottom: none;
  }
}

.title{
  font-size: 1.2rem;
}

.title-panel {
  .panel {
    text-align: center;
    .title {
      font-size: 1.8rem;
    }
    border: none;
  }
}
$tab_color: #2b2438;
.tab-buttons {

  .btn.active {
    background-color: $tab_color;
  }

}

.tabs {
  .tab {
    //padding: 20px;
    border: 4px solid $tab_color;
    margin-bottom: 30px;
    div{
      padding:5px;
      padding-left: 8px;
      border-bottom: 2px dotted $tab_color;
      &:last-of-type{
        border-bottom: none;
      }
    }
  }
}
.col {
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover {
  border: 4px dotted #2b2438;
  box-sizing: border-box;
  border-left: none;
  border-right: none;
  padding: 20px 0px;
}
.addressbar {
  margin-bottom: 0px;
  padding: 0px;
  font-size: 0.7rem;

  div {
    padding: 0px;
  }
}
.tab-box {
  margin-top: 25px;
}
.credits {
  padding: 0;
  margin: 0;
  list-style: none;
  li{padding-left:0px;}
}
.credits-title{
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 0px;
  padding-right: 3px;
}

.row{
  .col{
    border-left: 4px dotted #2b2438;
    &:first-of-type{
      border-left: none;
    }
  }
}

.info-node{
  display:block;
  width:100%;
}

.desc-wrap{
 .inner{
   padding: 0px;
   margin-top: 10px;
   p{
     padding:0px;
     margin:0px;
   }
 }

  &:last-of-type{
    .inner{
      margin-bottom:14px;
    }
  }

}

.pad-10{
  padding:20px;
  padding-top: 15px;
  width:100%;
}

.basic-info{
  align-items: flex-start;
  .pad-10{
    padding-left:0px;
  }
}

.links{
  
  .btn{
    font-size: 1rem;
    flex:2;
    padding-left:0px;
  }
}

</style>
