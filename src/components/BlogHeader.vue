<template>
<div ref="header"></div>
</template>

<script lang="jsx">
import {createRoot} from 'react-dom/client';
import { Header } from './Header';

export default {
  mounted() {
    const header = createRoot(this.$refs.header);
    header.render(<Header />);
  },
};
</script>
