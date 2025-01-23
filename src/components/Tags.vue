<template>
<div ref="ref"></div>
</template>

<script lang="jsx">
import {createRoot} from 'react-dom/client';
import { TagList } from './TagList';

export default {
  props: {
    tags: {
      type: Array,
    },
  },

  mounted() {
    const root = createRoot(this.$refs.ref);
    root.render(<TagList tags={this.tags} />);
  },
};
</script>
