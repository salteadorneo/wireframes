<script setup lang="ts">
import styles from '../styles.module.css'

interface Props {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
}

withDefaults(defineProps<Props>(), {
    textAlign: 'left'
})
</script>

<template>
    <p :class="styles.p" :style="{
        textAlign
    }">
        <slot></slot>
    </p>
</template>