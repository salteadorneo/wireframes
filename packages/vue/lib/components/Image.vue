<script setup lang="ts">
import styles from '../styles.module.css'

interface Props {
  width?: number | string,
  height?: number | string,
  aspectRatio?: number,
}

withDefaults(defineProps<Props>(), {
  width: 'auto',
  height: 'auto',
  aspectRatio: 1,
})
</script>

<template>
  <div :class="styles.image" :style="{
    width,
    height,
    aspectRatio,
  }"></div>
</template>