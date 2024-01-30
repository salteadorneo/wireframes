import { newSpecPage } from '@stencil/core/testing';
import { WfHr } from './wf-hr';

describe('wf-hr', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfHr],
      html: '<wf-hr></wf-hr>',
    });
    expect(root).toEqualHtml(`
      <wf-hr>
        <mock:shadow-root>
          <hr />
        </mock:shadow-root>
      </wf-hr>
    `);
  });
});
