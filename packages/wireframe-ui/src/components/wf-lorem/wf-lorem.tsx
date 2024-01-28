import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'wf-lorem',
})
export class WfLorem {
    @Prop() words?: number = 10;

    render() {
        return 'Lorem ipsum dolor sit amet consectetur'
    }
} 