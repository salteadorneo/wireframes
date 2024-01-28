<script setup lang="ts">
import styles from '../styles.module.css'

interface Props {
  backgroundColor?: string,
  color?: string,
  borderColor?: string,
}

withDefaults(defineProps<Props>(), {
  backgroundColor: 'white',
  color: 'black',
  borderColor: 'black',
})
</script>

<template>
  <button :class="styles.button" :style="{
    backgroundColor,
    color,
    borderColor
  }">
    <slot>Button</slot>
  </button>
</template>