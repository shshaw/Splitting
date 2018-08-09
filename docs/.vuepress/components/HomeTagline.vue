<template>
  <div class="home-tagline" v-html="text"></div>
</template>

<script>
  import Splitting from 'splitting';
  export default {
    name: 'home-tagline',
    computed: {
      text() {
        return Splitting.html({
          content: 'CSS Vars for split words & chars!<br /><small>(items, grids, images, too!)</small>'
          // }) + Splitting.html({
          //   content: '<br />(and more!)'
        });
      }
    },
    methods: {
      Splitting
    }
  };
</script>

<style lang="stylus">
  @import '../theme/styles/config.styl';
  .home-tagline {
    // position: fixed;
    // top: 50%;
    // left: 0;
    // right: 0;
    visibility: hidden;
  }

  .home-tagline .splitting {
    font-weight: 600;
    line-height: 1.25;
    font-family: 'Kanit', sans-serif;
    font-size: 1.5rem; //calc(100vw / var(--char-total)); //letter-spacing: calc(50vw / var(--char-total));
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



  /* ---------- */

  /* ---------- */

  /*
  // .home-tagline .char { // visibility: visible; // display: inline-block; // animation: falling 20s linear infinite both;
  // animation: bounce-char 1.75s linear infinite; // animation-delay: calc( -.15s * var(--char-index)); // }
  @keyframes bounce-char {
    20% {
      transform: translateY(0%) scale(1.1, .8);
    }
    70% {
      transform: translateY(-20%) scale(.8, 1.1);
    }
  }

  @keyframes falling {
    to {
      transform: translateY(100vh);
    }
  }
  */
</style>