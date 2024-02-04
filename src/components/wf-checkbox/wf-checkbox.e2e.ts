import { newE2EPage } from '@stencil/core/testing';

describe('wf-checkbox', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<wf-checkbox></wf-checkbox>');
        const element = await page.find('wf-checkbox');
        expect(element).toHaveClass('hydrated');
    });

    it('renders changes to content', async () => {
        const page = await newE2EPage();

        await page.setContent('<wf-checkbox>Test</wf-checkbox>');
        const element = await page.find('wf-checkbox');
        expect(element.textContent).toEqual(`Test`);
    });
});
