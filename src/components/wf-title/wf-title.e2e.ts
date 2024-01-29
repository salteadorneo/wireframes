import { newE2EPage } from '@stencil/core/testing';

describe('wf-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-title></wf-title>');
    const element = await page.find('wf-title');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to content', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-title>Title</wf-title>');
    const element = await page.find('wf-title');
    expect(element.textContent).toEqual(`Title`);
  });
});
