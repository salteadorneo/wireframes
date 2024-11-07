import { newE2EPage } from '@stencil/core/testing';

describe('wf-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wf-container></wf-container>');

    const element = await page.find('wf-container');
    expect(element).toHaveClass('hydrated');
  });
});
