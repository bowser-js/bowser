const config = {
  title: 'Bowser',
  tagline: 'Lightweight browser, platform, and engine detection',
  url: 'https://bowser-js.github.io',
  baseUrl: '/bowser/',
  organizationName: 'bowser-js',
  projectName: 'bowser',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/bowser-js/bowser/edit/master/website/',
        },
        blog: false,
      },
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/',
        blogDir: [],
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Bowser',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'main',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/bowser-js/bowser',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Project',
          items: [
            { label: 'GitHub', href: 'https://github.com/bowser-js/bowser' },
            { label: 'npm', href: 'https://www.npmjs.com/package/bowser' },
            { label: 'OpenCollective', href: 'https://opencollective.com/bowser' },
          ],
        },
      ],
      copyright: 'Copyright © Bowser contributors.',
    },
  },
};

module.exports = config;
