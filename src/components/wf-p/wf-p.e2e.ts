import { newE2EPage } from '@stencil/core/testing';

describe('wf-p', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-p></wf-p>');
    const element = await page.find('wf-p');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to content', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-p>Paragraph</wf-p>');
    const element = await page.find('wf-p');
    expect(element.textContent).toEqual(`Paragraph`);
  });
});
