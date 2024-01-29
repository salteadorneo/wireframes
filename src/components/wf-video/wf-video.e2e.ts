import { newE2EPage } from '@stencil/core/testing';

describe('wf-video', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-video></wf-video>');
    const element = await page.find('wf-video');
    expect(element).toHaveClass('hydrated');
  });
});
