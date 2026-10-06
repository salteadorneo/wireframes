type Size = 'sm' | 'md' | 'lg' | 'xl';
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Small label for statuses, tags and counters.
 * @slot - Badge text
 */
export declare class WfBadge extends HTMLElement {
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Size */
  variant?: Size;
}
/**
 * Button.
 * @slot - Button text
 */
export declare class WfButton extends HTMLElement {
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Size */
  variant?: Size;
}
/**
 * Checkbox with a label.
 * @slot - Label text
 */
export declare class WfCheckbox extends HTMLElement {}
/**
 * Box that wraps its content.
 * @slot - Content
 */
export declare class WfContainer extends HTMLElement {
  /** Width */
  width?: string;
  /** Inner padding */
  padding?: string;
}
/**
 * Flexbox layout.
 * @slot - Flex items
 */
export declare class WfFlex extends HTMLElement {
  /** Cross-axis alignment */
  alignItems?: Align;
  /** Main-axis distribution */
  justifyContent?: Justify;
  /** Space between items */
  gap?: string;
  /** Outer margin */
  margin?: string;
  /** Height */
  height?: string;
  /** Main axis direction, e.g. `row` or `column` */
  flexDirection?: string;
  /** Whether items wrap onto several lines */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}
/**
 * Grid layout.
 * @slot - Grid items
 */
export declare class WfGrid extends HTMLElement {
  /** Block-axis alignment of the items */
  alignItems?: Align;
  /** Distribution of the grid in the container */
  justifyContent?: Justify;
  /** Inline-axis alignment of the items */
  justifyItems?: Justify;
  /** Space between items */
  gap?: string;
}
/** Horizontal line. */
export declare class WfHr extends HTMLElement {
  /** Width */
  width?: string;
}
/** Image placeholder. */
export declare class WfImage extends HTMLElement {
  /** Width */
  width?: string;
  /** Height */
  height?: string;
  /** Aspect ratio, e.g. `16/9` */
  aspectRatio?: string;
  /** Text shown inside the placeholder */
  text?: string;
  /** Border radius, e.g. `50%` for a circle */
  borderRadius?: string;
}
/** Text input. */
export declare class WfInput extends HTMLElement {
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Size */
  variant?: Size;
}
/**
 * Link.
 * @slot - Link text
 */
export declare class WfLink extends HTMLElement {
  /** URL the link points to */
  href?: string;
  /** Where to open the link, e.g. `_blank` */
  target?: string;
}
/** Placeholder text. */
export declare class WfLorem extends HTMLElement {
  /**
   * Number of words
   * @default 2
   */
  words?: number | string;
}
/**
 * Paragraph.
 * @slot - Text
 */
export declare class WfP extends HTMLElement {
  /** Font size */
  fontSize?: string;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}
/**
 * Progress bar. Without `value` it shows an indeterminate animation.
 */
export declare class WfProgress extends HTMLElement {
  /** Current value */
  value?: number | string;
  /**
   * Maximum value
   * @default 100
   */
  max?: number | string;
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /** Size */
  variant?: Size;
}
/**
 * Radio button. It is exclusive with the other radios of its `wf-radio-group` or with the same `name`.
 * @slot - Label text
 */
export declare class WfRadio extends HTMLElement {
  /** Radios sharing a name are exclusive */
  name?: string;
  /** Value of the radio */
  value?: string;
  /** Whether the radio is selected */
  checked?: boolean | string;
}
/**
 * Groups radios and lays them out.
 * @slot - `wf-radio` elements
 */
export declare class WfRadioGroup extends HTMLElement {
  /**
   * Layout direction
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /**
   * Space between radios
   * @default '.5rem'
   */
  gap?: string;
}
/** Dropdown select. */
export declare class WfSelect extends HTMLElement {
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /**
   * Comma separated options
   * @default 'Option 1,Option 2,Option 3'
   */
  options?: string;
  /** Text shown while nothing is selected */
  placeholder?: string;
  /** Selected option */
  value?: string;
  /** Size */
  variant?: Size;
}
/** Range slider. */
export declare class WfSlider extends HTMLElement {
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /**
   * Minimum value
   * @default 0
   */
  min?: number | string;
  /**
   * Maximum value
   * @default 100
   */
  max?: number | string;
  /**
   * Step interval
   * @default 1
   */
  step?: number | string;
  /** Current value */
  value?: number | string;
}
/** Table with empty cells. */
export declare class WfTable extends HTMLElement {
  /**
   * Number of rows, header included (1-100)
   * @default 3
   */
  rows?: number | string;
  /**
   * Number of columns (1-100)
   * @default 3
   */
  cols?: number | string;
  /** Render the first row as a header */
  header?: boolean | string;
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /**
   * Height of the cells
   * @default '2.5rem'
   */
  cellHeight?: string;
}
/**
 * Tabs. Use `wf-tab-header` elements in the `header` slot and `wf-tab-content` elements in the `content` slot.
 * @slot header - `wf-tab-header` elements
 * @slot content - `wf-tab-content` elements
 */
export declare class WfTabs extends HTMLElement {
  /** Not used at the moment */
  names?: string;
}
/**
 * Tab header (`wf-tab-header`).
 * @slot - Tab title
 */
export declare class WfTabHeader extends HTMLElement {
  /** Name linking the header with its `wf-tab-content` */
  name?: string;
}
/**
 * Tab content (`wf-tab-content`).
 * @slot - Tab content
 */
export declare class WfTabContent extends HTMLElement {
  /** Name linking the content with its `wf-tab-header` */
  name?: string;
}
/** Multi-line text input. */
export declare class WfTextarea extends HTMLElement {
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /** Placeholder text */
  placeholder?: string;
  /**
   * Visible rows
   * @default 4
   */
  rows?: number | string;
  /** Size */
  variant?: Size;
}
/**
 * Heading.
 * @slot - Heading text
 */
export declare class WfTitle extends HTMLElement {
  /**
   * Heading tag
   * @default 'h1'
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Font weight */
  fontWeight?: string;
  /** Text alignment */
  textAlign?: string;
  /** Size */
  variant?: Size;
}
/** Video placeholder. */
export declare class WfVideo extends HTMLElement {
  /** Width */
  width?: string;
  /** Maximum width */
  maxWidth?: string;
  /** Height */
  height?: string;
  /**
   * Aspect ratio
   * @default '16 / 9'
   */
  aspectRatio?: string;
  /** Outer margin */
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
export declare function defineWfBadge(tag?: string): void;
export declare function defineWfProgress(tag?: string): void;
export declare function defineWfRadio(tag?: string): void;
export declare function defineWfRadioGroup(tag?: string): void;
export declare function defineWfSelect(tag?: string): void;
export declare function defineWfSlider(tag?: string): void;
export declare function defineWfTable(tag?: string): void;
export declare function defineWfTextarea(tag?: string): void;
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
    'wf-badge': WfBadge;
    'wf-progress': WfProgress;
    'wf-radio': WfRadio;
    'wf-radio-group': WfRadioGroup;
    'wf-select': WfSelect;
    'wf-slider': WfSlider;
    'wf-table': WfTable;
    'wf-textarea': WfTextarea;
  }
}
