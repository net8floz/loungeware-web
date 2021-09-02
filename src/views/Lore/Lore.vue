<template>
  <div class="container full-width">
    <div class="row center-xs">
      <div class="col-xs-12">
        <h2><larold-img name="awesome larold" /> Larolds</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LaroldImg from '@/components/LaroldImg.vue';
import gql from 'graphql-tag';
import { Component, Vue } from 'vue-property-decorator';
import * as schema from '@/gql/schema';

@Component({
  components: {
    LaroldImg,
  },
  metaInfo: {
    title: 'Lore',
  },
  apollo: {
    guestbooks: {
      query: gql`
        query Guestbook_guestbooks {
          guestbooks {
            id
            text
            createdAt
            author {
              id
              displayName
            }
          }
        }
      `,
    },
  },
})
export default class Lore extends Vue {
  //   private guestbooks?: schema.Guestbook[];
  //   private text = '';
  //   private isSubmitting = false;
  //   private get isAuthInitialized() {
  //     return this.$auth.isInitialized;
  //   }
  //   private get isLoggedIn() {
  //     return this.$auth.isLoggedIn;
  //   }
  //   private async submit() {
  //     if (this.isSubmitting) {
  //       return;
  //     }
  //     this.isSubmitting = true;
  //     try {
  //       if (!this.text) {
  //         throw new Error('Cannot submit empty message');
  //       }
  //       const input: schema.GuestbookCreateInput = {
  //         text: this.text,
  //       };
  //       const result = await this.$apollo.mutate<schema.Mutation>({
  //         variables: { input },
  //         mutation: gql`
  //           mutation Guestbook_submit($input: GuestbookCreateInput!) {
  //             guestbookCreate(input: $input) {
  //               id
  //             }
  //           }
  //         `,
  //       });
  //       if (result.errors && result.errors.length > 0) {
  //         throw result.errors[0];
  //       }
  //       await this.$apollo.queries.guestbooks.refetch();
  //     } catch (err) {
  //       alert(`${err?.message || err}`);
  //       await this.$apollo.queries.guestbooks.refetch();
  //     }
  //     this.isSubmitting = false;
  //   }
}
</script>

<style lang="scss" scoped></style>
