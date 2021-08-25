declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// declare module 'lwMeta' {

// }

// declare module 'vue/types/vue' {
//   import { LWMeta as _LWMeta } from '@/plguins/lwMeta';
//   import { LocalGameMetadata as _LocalGameMetadata } from '@/plugins/lwMeta'

//   type LocalGameMetadata = _LocalGameMetadata;

//   interface LWMeta extends _LWMeta {
//     // get games(): LocalGameMetadata[];
//     // getGame(authorId: string, gameId: string): LocalGameMetadata | null;
//   }
//   // type LocalGameMetadata = _LocalGameMetadata;

//   // interface LWMeta extends _LWMeta {
//   //   get games(): LocalGameMetadata[];
//   //   // getGame(authorId: string, gameId: string): LocalGameMetadata | null;
//   // }

//     // 3. Declare augmentation for Vue
//     interface Vue {
//       $lwMeta: LWMeta;
//     }
// }
