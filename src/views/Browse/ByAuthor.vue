<template>
  <div class="container full-width">
    <div class="row center-xs">
      <div class="col-xs-12">
        <h2>
          <larold-img name="ghost larold" class="mr-1" />
          <router-link :to="{ name: 'browse' }">All Games</router-link>
          /
          <strong> {{ authorName }} </strong>
        </h2>
        <GameCollection viewType="list" :games="games" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LaroldImg from '@/components/LaroldImg.vue';
import GameCollection from './components/GameColletion.vue';
import { Component, Vue } from 'vue-property-decorator';
import { getRouteMetadata, RoutePath } from '../../common/routes';

@Component({
  components: {
    LaroldImg,
    GameCollection,
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
})
export default class Browse extends Vue {
  private get games() {
    return this.$lwMeta.findGamesByAuthor(this.$route.params.author);
  }

  private get authorName() {
    return this.$lwMeta.findAuthorDisplayName(this.$route.params.author); //this.games.length > 0 ? this.games[0].authors : 'no author';
  }
}
</script>
