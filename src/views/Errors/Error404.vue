<template>
  <div class="text-center">
    <div class="title">404</div>
    <p>This page was not found</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getRouteMetadata, RoutePath } from '../../common/routes';

@Component({
  metaInfo() {
    const routeMetadata = getRouteMetadata('*', this.$route.params);
    return {
      title: routeMetadata.title,
    };
  },
})
export default class Home extends Vue {}
</script>

<style scoped></style>
