import { newE2EPage } from '@stencil/core/testing';

describe('wf-hr', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-hr></wf-hr>');
    const element = await page.find('wf-hr');
    expect(element).toHaveClass('hydrated');
  });
});
