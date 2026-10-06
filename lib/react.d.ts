import type { WfButton, WfCheckbox, WfContainer, WfFlex, WfGrid, WfHr, WfImage, WfInput, WfLink, WfLorem, WfP, WfTabs, WfTabHeader, WfTabContent, WfTitle, WfVideo } from './index';

// Add `/// <reference types="wireframes/react" />` (or list it in tsconfig "types") to type the wf-* elements in JSX
type Attrs<T> = import('react').DetailedHTMLProps<import('react').HTMLAttributes<T>, T> & Record<string, any>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wf-button': Attrs<WfButton>;
      'wf-checkbox': Attrs<WfCheckbox>;
      'wf-container': Attrs<WfContainer>;
      'wf-flex': Attrs<WfFlex>;
      'wf-grid': Attrs<WfGrid>;
      'wf-hr': Attrs<WfHr>;
      'wf-image': Attrs<WfImage>;
      'wf-input': Attrs<WfInput>;
      'wf-link': Attrs<WfLink>;
      'wf-lorem': Attrs<WfLorem>;
      'wf-p': Attrs<WfP>;
      'wf-tabs': Attrs<WfTabs>;
      'wf-tab-header': Attrs<WfTabHeader>;
      'wf-tab-content': Attrs<WfTabContent>;
      'wf-title': Attrs<WfTitle>;
      'wf-video': Attrs<WfVideo>;
    }
  }
}
