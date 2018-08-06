<template>

  <form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" value='{"title": "Splitting Demo", "description": "_Built with [Splitting](https://splitting.js.org)_", "tags": ["splitting"], "html": "<div data-splitting>Hello World!</div>", "css": "/* Clear out these styles to start fresh or use this as a base! */\n\n@import url(https://fonts.googleapis.com/css?family=Kanit:600);\n\nhtml { height: 100%; display: flex; }\nbody { margin: auto; }\nhtml, body {\n  background: #00043C;\n  color: #FFF;\n  font: normal 600 10vw/1.5 Kanit, sans-serif;\n}\n\n.splitting .char {\n  animation: slide-in 1s cubic-bezier(.5, 0, .5, 1) both;\n  animation-delay: calc(60ms * var(--char-index));\n}\n\n@keyframes slide-in {\n  from {\n    transform: translateY(-1em) rotate(-.5turn) scale(0.5);\n    opacity: 0;\n  }\n}", "css_external": "https://unpkg.com/splitting@next/dist/splitting.css;https://unpkg.com/splitting@next/dist/splitting-cells.css", "js": "Splitting();", "js_external": "https://unpkg.com/splitting@next/dist/splitting.min.js" }'>
    <input type="submit" class="action-button" value="Open Template on CodePen →">
  </form>

</template>

<script>
  export default {
    name: '',
    data: () => ({

    }),
  }
</script>

<style>
</style>