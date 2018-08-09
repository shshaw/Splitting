<template>
  <div class="home-tagline">
    <span v-html="text"></span>
  </div>
</template>

<script>
  export default {
    name: 'home-tagline',

    data() {
      return {
        text: 'CSS Vars for split words & chars!<br /><small>(items, grids, images, too!)</small>',
      }
    },

    mounted() {
      import ('splitting').then(module => {
        const Splitting = module.default;
        this.text = Splitting.html({
          content: this.text,
          by: 'chars'
        })
      });
    }
  };
</script>

<style lang="stylus">
  @import '../theme/styles/config.styl';
  .home-tagline {
    visibility: hidden;
  }

  .home-tagline .splitting {
    font-weight: 600;
    line-height: 1.25;
    font-family: 'Kanit', sans-serif;
    font-size: 1.5rem;
  }

  /* ---------- */

  .home-tagline {
    .char {
      color: lighten($blue, 50%); //$lightBlue;
      visibility: visible;
      &:after {
        visibility: visible;
        content: attr(data-char);
        color: #FFF;
        z-index: 2;
        animation-name: pop-char-out;
        animation-timing-function: cubic-bezier(.5, 0, .5, 1);
        animation-iteration-count: infinite;
        animation-duration: 2s; //animation-duration: calc( 0.08s * calc( var(--char-total)));
        animation-delay: calc( 0.08s * var(--char-index));
      }
    }
  }

  @keyframes pop-char-out {
    0%,
    40%,
    100% {
      transform: translate(0em, 0em);
    }
    20% {
      transform: translate( 0.05em, -0.1em);
    }
  }
</style>