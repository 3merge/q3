module.exports = {
  addons: ['@storybook/addon-docs'],
  stories: [
    '../packages/q3-admin/**/containers/**/**.stories.jsx',
    '../packages/q3-admin/**/templates/**/**.stories.jsx',
    '../packages/q3-admin/**/components/groups/**.stories.jsx',
    '../packages/q3-admin/**/components/main/**.stories.jsx',
    '../packages/q3-admin/**/components/menu/**.stories.jsx',
    '../packages/q3-ui-cart/**.stories.jsx',
    '../packages/q3-ui-datatables/**.stories.jsx',
    '../packages/q3-ui/**/breadcrumbs/**.stories.jsx',
    '../packages/q3-ui/**/card/*.stories.jsx',
    '../packages/q3-ui/**/list/*.stories.jsx',
    '../packages/q3-ui/**/slider/**.stories.jsx',
    '../packages/q3-ui/**/splitButton/*.stories.jsx',
    '../packages/q3-ui-forms/**/builders/form.stories.jsx',
    '../packages/q3-ui-forms/**/fields/autocomplete.stories.jsx',
    '../packages/q3-ui-forms/**/fields/chips.stories.jsx',
    '../packages/q3-ui-forms/**/fields/checkset.stories.jsx',
    '../packages/q3-ui-forms/**/fields/text.stories.jsx',
    '../packages/q3-ui-forms/**/fields/transfer.stories.jsx',
    '../packages/q3-ui-forms/**/presets/northAmericaRegionalSelect/*.stories.jsx',
  ],
};