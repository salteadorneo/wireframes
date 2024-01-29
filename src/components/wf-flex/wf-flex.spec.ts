import { newSpecPage } from '@stencil/core/testing';
import { WfFlex } from './wf-flex';

describe('wf-flex', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfFlex],
      html: '<wf-flex></wf-flex>',
    });
    expect(root).toEqualHtml(`
      <wf-flex>
        <mock:shadow-root>
          <div>
            <slot></slot>
          </div>
        </mock:shadow-root>
      </wf-flex>
    `);
  });
});
