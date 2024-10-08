import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { RouteName, routeName, routePath } from '../common/routes';
import auth from '@/plugins/auth';
import apollo from '../plugins/apollo';
import { gql } from 'apollo-boost';

Vue.use(VueRouter);

export type LinkName =
  | 'discord'
  | 'github'
  | 'github-web'
  | 'wiki'
  | 'wiki-larold'
  | 'gm-discord';

export function getLinkPath(name: LinkName): string {
  switch (name) {
    case 'discord':
      return 'https://discord.gg/cwWns2fdXF';
    case 'github':
      return 'https://github.com/spacebake/loungeware';
    case 'github-web':
      return 'https://github.com/net8floz/loungeware-web';
    case 'wiki':
      return 'https://github.com/spacebake/Loungeware/wiki';
    case 'wiki-larold':
      return 'https://github.com/spacebake/Loungeware/wiki/Draw-A-Larold';
    case 'gm-discord':
      return 'https://discord.gg/gamemaker';
    default:
      return '#';
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Default.vue'),
    children: [
      {
        path: routePath('about'),
        name: routeName('about'),
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About/About.vue'),
      },
      {
        path: routePath('guestbook'),
        name: routeName('guestbook'),
        component: () =>
          import(
            /* webpackChunkName: "guestbook" */ '../views/Guestbook/Guestbook.vue'
          ),
      },
      {
        path: routePath('play'),
        name: routeName('play'),
        component: () =>
          import(/* webpackChunkName: "game" */ '../views/Play/Play.vue'),
      },
      {
        path: routePath('browse'),
        name: routeName('browse'),
        component: () =>
          import(/* webpackChunkName: "browse" */ '../views/Browse/Browse.vue'),
      },
      {
        path: routePath('browse-by-author'),
        name: routeName('browse-by-author'),
        component: () =>
          import(
            /* webpackChunkName: "browse" */ '../views/Browse/ByAuthor.vue'
          ),
      },
      {
        path: routePath('game-page'),
        name: routeName('game-page'),
        component: () =>
          import(/* webpackChunkName: "game" */ '../views/Game/Game.vue'),
      },
    ],
  },
  {
    path: routePath('logout'),
    name: routeName('logout'),
    beforeEnter: async (to, from, next) => {
      try {
        await auth.logout();
        //window.location.reload();
      } catch (err) {
        //window.location.reload();
      }
    },
  },
  {
    path: '/oauth/login/web/callback',
    name: 'oauth-login-callback',
    beforeEnter: async (to, from, next) => {
      try {
        await auth.handleCallback(to.query.state as string);
        next({ name: 'about' as RouteName });
        //window.location.reload();
      } catch (err) {
        next({ name: 'about' as RouteName });
        //window.location.reload();
      }
    },
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "errors" */ '../views/Errors/Error404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (window.location.host === 'loungeware.games') {
    apollo.defaultClient.mutate({
      mutation: gql`
        mutation router_visitPage($route: String!) {
          visitPage(route: $route) {
            id
            visits
          }
        }
      `,
      variables: {
        route: to.fullPath,
      },
    });
  }
  next();

  const app = document.getElementsByClassName('scrollview');
  if (app) {
    app.item(0)?.scrollTo(0, 0);
  }
});

export default router;
