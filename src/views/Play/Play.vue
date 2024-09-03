<template>
  <div style="position: relative">
    <div :class="`player text-center ${isFocused ? 'focused' : 'not-focused'}`">
      <iframe
        class="media-border game-canvas"
        :src="`/static/game-3-0/index.html?gallery_id=${$route.query.gallery_id}`"
        style="margin-top: 80px"
      />
      <div class="container content-container">
        <div class="actions text-center">
          <div
            @click="isShowingControls = !isShowingControls"
            :class="`btn ${isShowingControls ? 'active' : ''}`"
          >
            Controls <mdicon class="icon" name="controller-classic" />
          </div>
          <div
            @click="isFocused = !isFocused"
            :class="`btn ${isFocused ? 'active' : ''}`"
          >
            Lights
            <span v-show="isFocused">On</span>
            <span v-show="!isFocused">Off</span>
            <mdicon class="icon" name="eye" />
          </div>
          <!-- <div
            @click="isSmall = !isSmall"
            :class="`btn ${isSmall ? 'active' : ''}`"
          >
            <span v-show="isSmall">Small</span>
            <span v-show="!isSmall">Large</span>
            <mdicon class="icon" name="resize" />
          </div> -->
        </div>
      </div>
      <div class="container">
        <div class="panel" v-show="isShowingControls">
          <div v-for="(scheme, i) in controlSchemes" :key="i" class="mt-1 mb-2">
            <div class="title mb-1">{{ scheme.title }}</div>
            <div class="row">
              <div class="col">Direction Keys</div>
              <div class="col">{{ scheme.directionKeys }}</div>
            </div>
            <div class="row">
              <div class="col">Action Keys</div>
              <div class="col">{{ scheme.actionKeys }}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 200px" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getRouteMetadata, RoutePath } from '../../common/routes';

@Component({
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
export default class Play extends Vue {
  private readonly controlSchemes = [
    {
      title: 'XBOX Controller',
      directionKeys: 'Left Thumbstick',
      actionKeys: 'A / B',
    },
    {
      title: 'Keyboard Scheme 1',
      directionKeys: 'WSAD',
      actionKeys: 'K / L',
    },
    {
      title: 'Keyboard Scheme 2',
      directionKeys: 'Arrow Up, Arrow Down, Arrow Left, Arrow Right',
      actionKeys: 'Z / X',
    },
  ];

  private isShowingControls = false;
  private isFocused = false;
  private isSmall = true;

  // private get playerSize() {
  //   if (this) {
  //     return 540;
  //   } else {
  //     return 540 * 2;
  //   }
  // }
}
</script>

<style scoped lang="scss">
.container {
  transition: all 0.5s;
}
.player {
  transition: all 0.5s;

  iframe {
    overflow: hidden;
    border-radius: 0px;
    margin-bottom: 20px;
    transition: all 0.5s;
  }
}

.panel {
  background-color: #1f1b25;
  border: 2px dotted #b381e445;
  padding: 24px;

  .title {
    font-size: 1.2em;
  }

  .row:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .row:nth-child(3n) {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .col {
    padding: 8px;
  }
}

.actions {
  .btn {
    font-size: 1em;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }

  .icon {
    margin-left: 4px;
  }
}

.content-container {
  width: 540px;
  max-width: 540px;
}

.game-canvas {
  width: 540px;
  height: 540px;
}

.focused {
  width: 100% !important;
  height: 100% !important;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  display: block;
  top: 0;
  left: 0;
  z-index: 1000;

  .panel {
    opacity: 0.9;
  }

  @media screen and (min-width: 1200px) and (min-height: 1200px) {
    .game-canvas {
      width: 1080px;
      height: 1080px;
    }
  }
}
</style>
