import { newSpecPage } from '@stencil/core/testing';
import { WfImage } from './wf-image';

describe('wf-image', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfImage],
      html: '<wf-image></wf-image>',
    });
    expect(root).toEqualHtml(`
      <wf-image>
        <mock:shadow-root>
          <div class="empty"></div>
        </mock:shadow-root>
      </wf-image>
    `);
  });
});
