module.exports = {
  title: "Splitting.js",
  description: "CSS Vars for split words, chars, images, and more!",
  base: "/",
  ga: "UA-6412794-8",
  head: [
    ["meta", {
      name: "keywords",
      content: "splitting splitting.js text animation css variables custom properties"
    }],
    ["meta", {
      name: "twitter:card",
      value: "CSS Vars for split words, chars, images, and more!"
    }],
    ["meta", {
      property: "og:title",
      content: "Splitting.js"
    }],
    ["meta", {
      property: "og:type",
      content: "article"
    }],
    ["meta", {
      property: "og:url",
      content: "https://splitting.js.org"
    }],
    ["meta", {
      property: "og:image",
      content: "https://splitting.js.org/splitting.gif"
    }],
    ["meta", {
      property: "og:description",
      content: "CSS Vars for split words, chars, images and more!"
    }],

    ["link", {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Kanit:600,900i|Raleway:400,500,700"
    }],
    ["link", {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png"
    }],
    ["link", {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png"
    }],
    ["link", {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png"
    }],
    ["link", {
      rel: "manifest",
      href: "/site.webmanifest"
    }],
    ["link", {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5"
    }],
    ["meta", {
      name: "msapplication-TileColor",
      content: "#00043c"
    }],
    ["meta", {
      name: "theme-color",
      content: "#00043C"
    }]
  ],
  themeConfig: {
    nav: [{
      text: "Guide",
      link: "/guide.md"
    }, {
      text: "Plugins",
      link: "/guide.md#plugins"
    }, {
      text: "API",
      link: "/guide.md#api"
    }, {
      text: "Demos",
      link: "https://codepen.io/collection/XpROaV/"
    }],
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "shshaw/splitting/",
    repoLabel: "View on GitHub",

    // if your docs are in a different repo from your main project:
    //docsRepo: "shshaw/splitting",
    // if your docs are not at the root of the repo:
    //docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "docs",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!"
  }
};