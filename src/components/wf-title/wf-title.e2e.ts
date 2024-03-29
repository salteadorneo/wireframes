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

  it('renders h2', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-title tag="h2">Heading 2</wf-title>');
    const element = await page.find('wf-title');
    expect(element.textContent).toEqual(`Heading 2`);
  });
});
