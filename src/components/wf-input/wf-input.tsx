import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'wf-input',
    styleUrl: 'wf-input.css',
    shadow: true,
})
export class WfInput {
    @Prop() width?: string;
    @Prop() maxWidth?: string;
    @Prop() placeholder: string;
    @Prop() variant?: 'sm' | 'md' | 'lg' | 'xl';

    render() {
        return (
            <input
                class={this.variant}
                style={{
                    width: this.width,
                    maxWidth: this.maxWidth,
                }}
                placeholder={this.placeholder}
            >
            </input>
        );
    }
}
