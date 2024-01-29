import { newSpecPage } from '@stencil/core/testing';
import { WfVideo } from './wf-video';

describe('wf-video', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfVideo],
      html: '<wf-video></wf-video>',
    });
    expect(root).toEqualHtml(`
      <wf-video>
        <mock:shadow-root>
          <div style="aspect-ratio: 16 / 9;">
            <svg fill="none" stroke="currentColor" stroke-width=".1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round"></path>      
              <path d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </mock:shadow-root>
      </wf-video>
    `);
  });
});
