import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'wf-avatar',
    styleUrl: 'wf-avatar.css',
    shadow: true,
})
export class WfAvatar {
    @Prop() size?: string = "64px";

    render() {
        return (
            <div
                style={{
                    width: this.size,
                    height: this.size,
                }}
            />
        )
    }
}