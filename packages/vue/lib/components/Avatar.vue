<script setup lang="ts">
import styles from '../styles.module.css'

interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 64,
})
</script>

<template>
  <div :class="styles.avatar" :style="{
    width: size + 'px',
    height: size + 'px',
  }"></div>
</template>