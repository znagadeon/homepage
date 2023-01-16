<template>
  <span ref="icon"></span>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { Icon } from './Icon';

export default {
  props: {
    name: String,
    size: Number,
  },

  mounted() {
    const root = createRoot(this.$refs.icon);
    root.render(Icon({
      name: this.name,
      size: this.size
    }));
  }
}
</script>
