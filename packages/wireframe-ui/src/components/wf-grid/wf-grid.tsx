import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'wf-grid',
    styleUrl: 'wf-grid.css',
    shadow: true,
})
export class WfGrid {
    @Prop() alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' = 'flex-start';
    @Prop() justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
    @Prop() justifyItems?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
    @Prop() gap?: string = "0";

    render() {
        return (
            <div
                style={{
                    alignItems: this.alignItems,
                    justifyContent: this.justifyContent,
                    justifyItems: this.justifyItems,
                    gap: this.gap
                }}
            >
                <slot />
            </div>
        )
    }
}