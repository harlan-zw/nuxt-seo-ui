type Arrayable<T> = T | T[]

export interface BreadcrumbProps {
  /**
   * The items to show in the breadcrumb.
   */
  items: (string | BreadcrumbItemProps)[]
  /**
   * The Aria Label for the breadcrumbs.
   * You shouldn't need to change this.
   *
   * @default 'Breadcrumbs'
   */
  ariaLabel?: string
  /**
   * Should the current breadcrumb item be shown.
   *
   * @default false
   */
  hideCurrent?: boolean
  /**
   * The separator icon to use. Alternatively, a truthy value will use the default separator
   * and a falsy value will hide the separator.
   *
   * @default false
   */
  separator?: boolean
  /**
   * Should the breadcrumb be shown on multiple lines.
   *
   * @default false
   */
  multiline?: boolean
  /**
   * Should the root breadcrumb be shown.
   */
  showRoot?: boolean
  ui?: {
    separator?: Arrayable<string>
    icon?: Arrayable<string>
    ol?: Arrayable<string>
    nav?: Arrayable<string>
    li?: Arrayable<string>
    liLast?: Arrayable<string>
    liMultiLine?: Arrayable<string>
    item?: BreadcrumbItemProps['ui']
  }
}

export interface BreadcrumbItemProps {
  /** Whether the breadcrumb item represents the aria-current. */
  current?: boolean
  /**
   * The type of current location the breadcrumb item represents, if `isCurrent` is true.
   * @default 'page'
   */
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean | 'true' | 'false'
  /** Whether the breadcrumb item is disabled. */
  disabled?: boolean
  to: string
  label?: string | false
  ariaLabel?: string
  separator?: boolean | string
  icon?: string
  class?: (string | string[] | undefined)[] | string
  ui?: {
    separator?: Arrayable<string>
    icon?: Arrayable<string>
    iconWithLabel?: Arrayable<string>
    default?: Arrayable<string>
    current?: Arrayable<string>
    disabled?: Arrayable<string>
    last?: Arrayable<string>
  }
  /**
   * @internal
   */
  _props?: {
    first: boolean
    last: boolean
  }
}
