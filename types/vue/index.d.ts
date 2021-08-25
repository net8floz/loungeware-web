import { LWMetaInterface } from '../../src/plugins/lwMeta';
import { App } from '@/plugins/app';
import { Auth } from '@/plugins/auth';

import { LWMeta as _LWMeta } from '../../src/plguins/lwMeta';
import { LocalGameMetadata as _LocalGameMetadata } from '@/plugins/lwMeta'

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $app: App;
    $auth: Auth;
    $lwMeta: LWMetaInterface;
  }
}
