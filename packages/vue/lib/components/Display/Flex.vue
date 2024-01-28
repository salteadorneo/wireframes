<script setup lang="ts">
import styles from '../../styles.module.css'

interface Props {
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
    justifyItems?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
    gap?: number
}

withDefaults(defineProps<Props>(), {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    gap: 0,
})
</script>

<template>
    <div :class="styles.flex" :style="{
        justifyContent,
        alignItems,
        gap
    }">
        <slot></slot>
    </div>
</template>