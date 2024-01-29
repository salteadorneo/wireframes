import { newE2EPage } from '@stencil/core/testing';

describe('wf-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-grid></wf-grid>');
    const element = await page.find('wf-grid');
    expect(element).toHaveClass('hydrated');
  });
});
