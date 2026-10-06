type Size = 'sm' | 'md' | 'lg' | 'xl';
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

export declare class WfButton extends HTMLElement {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  variant?: Size;
}
export declare class WfCheckbox extends HTMLElement {}
export declare class WfContainer extends HTMLElement {
  width?: string;
  padding?: string;
}
export declare class WfFlex extends HTMLElement {
  alignItems?: Align;
  justifyContent?: Justify;
  gap?: string;
  margin?: string;
  height?: string;
  flexDirection?: string;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}
export declare class WfGrid extends HTMLElement {
  alignItems?: Align;
  justifyContent?: Justify;
  justifyItems?: Justify;
  gap?: string;
}
export declare class WfHr extends HTMLElement {
  width?: string;
}
export declare class WfImage extends HTMLElement {
  width?: string;
  height?: string;
  aspectRatio?: string;
  text?: string;
  borderRadius?: string;
}
export declare class WfInput extends HTMLElement {
  width?: string;
  maxWidth?: string;
  placeholder?: string;
  variant?: Size;
}
export declare class WfLink extends HTMLElement {
  href?: string;
  target?: string;
}
export declare class WfLorem extends HTMLElement {
  words?: number | string;
}
export declare class WfP extends HTMLElement {
  fontSize?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}
export declare class WfTabs extends HTMLElement {
  names?: string;
}
export declare class WfTabHeader extends HTMLElement {
  name?: string;
}
export declare class WfTabContent extends HTMLElement {
  name?: string;
}
export declare class WfTitle extends HTMLElement {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontWeight?: string;
  textAlign?: string;
  variant?: Size;
}
export declare class WfVideo extends HTMLElement {
  width?: string;
  maxWidth?: string;
  height?: string;
  aspectRatio?: string;
  margin?: string;
}

export declare function defineWfButton(tag?: string): void;
export declare function defineWfCheckbox(tag?: string): void;
export declare function defineWfContainer(tag?: string): void;
export declare function defineWfFlex(tag?: string): void;
export declare function defineWfGrid(tag?: string): void;
export declare function defineWfHr(tag?: string): void;
export declare function defineWfImage(tag?: string): void;
export declare function defineWfInput(tag?: string): void;
export declare function defineWfLink(tag?: string): void;
export declare function defineWfLorem(tag?: string): void;
export declare function defineWfP(tag?: string): void;
export declare function defineWfTabs(): void;
export declare function defineWfTitle(tag?: string): void;
export declare function defineWfVideo(tag?: string): void;
export declare function defineCustomElements(): void;

declare global {
  interface HTMLElementTagNameMap {
    'wf-button': WfButton;
    'wf-checkbox': WfCheckbox;
    'wf-container': WfContainer;
    'wf-flex': WfFlex;
    'wf-grid': WfGrid;
    'wf-hr': WfHr;
    'wf-image': WfImage;
    'wf-input': WfInput;
    'wf-link': WfLink;
    'wf-lorem': WfLorem;
    'wf-p': WfP;
    'wf-tabs': WfTabs;
    'wf-tab-header': WfTabHeader;
    'wf-tab-content': WfTabContent;
    'wf-title': WfTitle;
    'wf-video': WfVideo;
  }
}
