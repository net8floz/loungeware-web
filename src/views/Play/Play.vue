<template>
  <div class="text-center">
    <iframe
      class="media-border game-canvas"
      :src="`/static/game/index.html?gallery_id=${$route.query.gallery_id}`"
      style="width: 540px; height: 540px; margin-top: 80px"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getRouteMetadata, RoutePath } from '../../common/routes';

@Component({
  metaInfo() {
    const routeMetadata = getRouteMetadata(
      this.$route.matched[0].path as RoutePath,
      this.$route.params,
      this.$route.query
    );
    return {
      title: routeMetadata.title,
    };
  },
})
export default class Play extends Vue {}
</script>

<style scoped lange="scss">
iframe {
  overflow: hidden;
  border-radius:0px;
  margin-bottom: 80px;
}
.footer-container {
  display: none;
}
</style>
