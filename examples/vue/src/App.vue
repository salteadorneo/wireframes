<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div style="padding: 2rem">
    <wf-title tag="h2">Wireframes + Vue</wf-title>
    <wf-p>Clicked {{ count }} times</wf-p>
    <wf-flex gap="1rem" align-items="center">
      <wf-input placeholder="Email" width="220px"></wf-input>
      <wf-button variant="lg" @click="count++">Send</wf-button>
    </wf-flex>
    <wf-tabs>
      <wf-tab-header slot="header" name="a">Tab A</wf-tab-header>
      <wf-tab-header slot="header" name="b">Tab B</wf-tab-header>
      <wf-tab-content slot="content" name="a"><wf-lorem words="20"></wf-lorem></wf-tab-content>
      <wf-tab-content slot="content" name="b"><wf-video width="300px"></wf-video></wf-tab-content>
    </wf-tabs>
  </div>
</template>