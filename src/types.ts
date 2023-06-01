export interface BreadcrumbProps {
  /**
   * The Aria Label for the breadcrumbs.
   * You shouldn't need to change this.
   *
   * @default Breadcrumbs
   */
  ariaLabel?: string
  /**
   * The type of current location the breadcrumb item represents, if `isCurrent` is true.
   * @default 'page'
   */
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean | 'true' | 'false'
  /**
   * Use an icon be used for the home breadcrumb item.
   * @default true
   */
  homeIcon?: boolean
  showAtRoot?: boolean
  items?: (string | BreadcrumbItemProps)[]
  ui?: {
    separator?: string
    icon?: string
    list?: string
    nav?: string
    item?: {
      default?: string
      current?: string
      disabled?: string
    }
  }
}

export interface BreadcrumbItemProps {
  /** Whether the breadcrumb item represents the aria-current. */
  current?: boolean
  /** Whether the breadcrumb item is disabled. */
  disabled?: boolean
  to: string
  label?: string | false
  ariaLabel?: string
  separator?: string | false
  icon?: string
  ui?: {
    default?: string
    current?: string
    disabled?: string
  }
}
