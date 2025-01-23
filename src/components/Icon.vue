<template>
  <span ref="ref"></span>
</template>

<script lang="jsx">
import {createRoot} from 'react-dom/client';
import { Icon } from './Icon.tsx';

export default {
  props: ['name', 'size'],

  mounted() {
    const root = createRoot(this.$refs.ref);
    root.render(<Icon name={this.name} size={this.size} />);
  },
}
</script>
