<template>
  <span>
    <slot v-if="hasError" name="error">ERROR</slot>
    <slot v-else-if="isLoading" name="loading">{{ prefix }}</slot>
    <slot v-else name="success">{{ contributor.displayName }}</slot>
  </span>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as schema from '@/gql/schema';

@Component({
  apollo: {
    contributorByAuthorPrefix: {
      variables() {
        return {
          prefix: this.prefix,
        };
      },
      query: gql`
        query Contributor_contributorByAuthorPrefix($prefix: String!) {
          contributorByAuthorPrefix(prefix: $prefix) {
            id
            displayName
          }
        }
      `,
    },
  },
})
export default class LaroldImg extends Vue {
  @Prop(String) prefix!: string;
  private contributorByAuthorPrefix!: schema.Contributor;

  private get contributor() {
    return this.contributorByAuthorPrefix;
  }

  private get isLoading() {
    return (
      !this.contributorByAuthorPrefix &&
      this.$apollo.queries.contributorByAuthorPrefix.loading
    );
  }

  private hasError = false;
}
</script>
