const breadcrumb = {
  nav: 'mb-7',
  list: 'flex flex-wrap gap-2',
  itemContainer: 'flex items-center',
}

const breadcrumbItem = {
  icon: 'text-gray-600',
  iconWithLabel: 'mr-1',
  default: 'flex items-center text-gray-600 dark:text-gray-400 hover:underline',
  current: 'flex items-center text-gray-500 dark:text-gray-400 hover:none',
  disabled: 'text-gray-400 dark:text-gray-600',
  separator: 'ml-2 text-gray-400 dark:text-gray-600',
}

export default {
  seoUi: {
    breadcrumb,
    breadcrumbItem,
  },
}
