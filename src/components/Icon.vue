<template>
  <span ref="icon"></span>
</template>

<script lang="jsx">
import {createRoot} from 'react-dom/client';
import { Icon } from './Icon';

export default {
	props: ['name', 'size'],

  mounted() {
    const icon = createRoot(this.$refs.icon);
    icon.render(<Icon name={this.name} size={this.size} />);
  },
}
</script>
