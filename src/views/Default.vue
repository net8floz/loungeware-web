<template>
  <div class="app full-height">
    <AppHeader />
    <router-view class="flex-grow" />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

@Component({
  components: { AppHeader, AppFooter },
})
export default class App extends Vue {}
</script>
