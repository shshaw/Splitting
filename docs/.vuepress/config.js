module.exports = {
    title: "Splitting",
    description: "CSS Vars for split words, chars, and images!",
    head: [
        // prettier-ignore
        ["link",  { rel: "icon", href: "/favicon.png" }]
    ],
    themeConfig: {
        nav: [{ text: "Guide", link: "/guide.md" }],
        // Assumes GitHub. Can also be a full GitLab url.
        repo: "shshaw/splitting",
        repoLabel: "Contribute!",

        // if your docs are in a different repo from your main project:
        docsRepo: "shshaw/splitting-docs",
        // if your docs are not at the root of the repo:
        docsDir: "docs",
        // if your docs are in a specific branch (defaults to 'master'):
        docsBranch: "source",
        // defaults to false, set to true to enable
        editLinks: true,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: "Help us improve this page!"
    }
};
