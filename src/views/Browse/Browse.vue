<template>
  <div class="container full-width">
    <div class="row center-xs">
      <div class="col-xs-12 col-md-6">
        <h2><larold-img name="ghost larold" class="mr-1" /> All Games</h2>
      </div>
      <div class="col-xs-12 col-md-6 mt-2 text-right">
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
       <div class="border gamelist-top-border" />
      <div class="row center-xs full-width">
        <div class="col-xs-12">
          <GameCollection :viewType="viewType" :games="games" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .gamelist-top-border{
    width:97%;
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
      this.$route.matched[0].path as RoutePath,
      this.$route.params
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
    return this.$lwMeta.games;
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
