<template>
  <div class="container full-width">
    <div class="row center-xs">
      <div class="col-xs-6 col-md-6 text-left">
        <h2><larold-img name="ghost larold" class="mr-1" /> All Games</h2>
      </div>
      <div class="col-xs-6 col-md-6 mt-2 text-right">
        <div
          class="mt-1"
          @click="setViewType('list')"
          :class="getBtnClass('list')"
        >
          List
        </div>
        <div @click="setViewType('carts')" :class="getBtnClass('carts')">
          Carts
        </div>
      </div>
      <!--<div class="border gamelist-top-border" />-->
      <div class="row center-xs full-width">
        <div class="col-xs-12">
          <GameCollection :viewType="viewType" :games="games" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-left,
.text-right {
  margin-bottom: -40px;
}
</style>
<script lang="ts">
import LaroldImg from '@/components/LaroldImg.vue';
import GameCollection, { ViewType } from './components/GameColletion.vue';
import { Component, Vue } from 'vue-property-decorator';
import { getRouteMetadata, RoutePath } from '../../common';

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
  private viewType: ViewType =
    (localStorage.getItem('browse.viewType') as ViewType) || 'list';

  private get games() {
    return this.$lwMeta.games.sort((a, b) => {
      return a.displayName[0] > b.displayName[0] ? 1 : -1;
    });
  }

  private getBtnClass(type: ViewType) {
    if (type === this.viewType) {
      return 'btn solid red';
    }
    return 'btn';
  }

  private setViewType(type: ViewType) {
    this.viewType = type;
    localStorage.setItem('browse.viewType', this.viewType);
  }
}
</script>
