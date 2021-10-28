import Vue from 'vue';
import _Vue from 'vue';

import { FirebaseApp, initializeApp } from 'firebase/app';
import * as fbAuth from 'firebase/auth';

import app from '@/plugins/app';

type FBState = {
  fb?: FirebaseApp;
  auth?: fbAuth.Auth;
};

const fbState: FBState = {};

export type AuthEvents = 'change' | 'login' | 'logout';

export class AuthService extends Vue {
  private isLoggedIn = false;
  private isInitialized = false;

  constructor() {
    super({
      data: {
        isLoggedIn: false,
        isInitialized: false,
      },
      computed: {
        oAuthLoginUrl() {
          return `${app.oAuthLoginUrl}?destination=${app.oAuthLoginCallbackUrl}`;
        },
      },
    });

    try {
      const fbCreds = app.fbConfig;
      if (fbCreds) {
        fbState.fb = initializeApp(JSON.parse(fbCreds));
        if (fbState.fb) {
          fbState.auth = fbAuth.getAuth(fbState.fb);
        }
      }
    } catch (err) {
      console.error(err);
    }

    this.isInitialized = false;
    if (fbState.auth) {
      fbState.auth.onAuthStateChanged(() => {
        this.isLoggedIn = fbState?.auth?.currentUser !== null;
        this.isInitialized = true;
      });
    }
  }

  public async getToken(): Promise<string> {
    return fbState?.auth?.currentUser?.getIdToken() || '';
  }

  public async logout(): Promise<void> {
    if (fbState?.auth) {
      await fbState.auth.signOut();
    }
  }

  public async handleCallback(state: string): Promise<boolean> {
    if (fbState?.auth) {
      try {
        const { token } = JSON.parse(atob(state)) as { token: string };
        await fbAuth.signInWithCustomToken(fbState.auth, token);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  }
}

const auth = new AuthService();
export default auth;

export function AuthPlugin<AuthPluginOptions>(
  Vue: typeof _Vue,
  options?: AuthPluginOptions
): void {
  Vue.prototype.$auth = auth;
}

export class AuthPluginOptions {}

Vue.use(AuthPlugin);
