<template>
  <div class="home">
    <div class="hero">
      <h1>
        <a :href="ensureExt('./guide.md')">
          <SplittingLogo></SplittingLogo>
        </a>

      </h1>
      <Content class="home-content" custom/>
      <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </div>
    <div class="features" v-if="data.features && data.features.length">
      <div class="feature" v-for="feature in data.features">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>
    <div class="footer" v-if="data.footer">
      {{ data.footer }}
    </div>
  </div>
</template>

<script>
  import NavLink from "./NavLink.vue";
  import {
    ensureExt
  } from "./util.js";
  export default {
    components: {
      NavLink,
    },
    methods: {
      ensureExt
    },
    computed: {
      data() {
        return this.$page.frontmatter;
      },
      actionLink() {
        return {
          link: this.data.actionLink,
          text: this.data.actionText
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import './styles/config.styl';

  .hero-wrapper {
    max-width: 832px;
  }

  .home {
    padding: $navbarHeight 2rem 0;
    max-width: 960px;
    margin: 0px auto;
    text-align: center;

    .action-button:only-child {
      margin: 1rem auto;
       }

    .hero {
      padding: 2rem 0 1rem 0;

      img {
        max-height: 280px;
        display: block;
        margin: 3rem auto 1.5rem;
      }

      h1 {
        font-size: 3rem;
        font-size: 8vw;
      }

      h1,
      .description,
      .action {
        margin: 1.8rem auto;
      }

      .description {
        max-width: 35rem;
        font-size: 1.6rem;
        line-height: 1.3;
        color: lighten($textColor, 40%);
      } // margin-bottom: 3rem;
    }

    .version-note,
    .home-content.home-content {
      max-width: 34em;
      margin: 2rem auto;
    }

    // .version-note {
    //   background: $blue;
    //   padding: 1rem;
    //   border-radius: .25em;
    //   code {
    //     display: inline-block;
    //     background: darken($blue, 20%);
    //     padding: .1em .4em;
    //     border-radius: .25em;
    //   }
    //   h3 {
    //     font-size: 1.2rem;
    //     display: block;
    //   }
    // }

    .features {
      border-top: 1px solid $borderColor;
      padding: 1.4rem 0;
      margin-top: 2rem;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: stretch;
      justify-content: space-between;
    }

    .feature {
      flex-grow: 1;
      flex-basis: 30%;
      max-width: 30%;

      h2 {
        font-size: 1.4rem;
        font-weight: 500;
        border-bottom: none;
        padding-bottom: 0;
        color: lighten($textColor, 10%);
      }

      p {
        color: lighten($textColor, 25%);
      }
    }

    .footer {
      padding: 2.5rem;
      border-top: 1px solid $borderColor;
      text-align: center;
      color: lighten($textColor, 25%);
    }
  }

  @media (max-width: $MQMobile) {
    .home {
      .features {
        flex-direction: column;
      }

      .feature {
        max-width: 100%;
        padding: 0 2.5rem;
      }
    }
  }

  @media (max-width: $MQMobileNarrow) {
    .home {
      padding-left: 1.5rem;
      padding-right: 1.5rem;

      .hero {
        img {
          max-height: 210px;
          margin: 2rem auto 1.2rem;
        }

        h1 {
          font-size: 2rem;
        }

        h1,
        .description,
        .action {
          margin: 1.2rem auto;
        }

        .description {
          font-size: 1.2rem;
        }

        .action-button {
          font-size: 1rem;
          padding: 0.6rem 1.2rem;
        }
      }

      .feature {
        h2 {
          font-size: 1.25rem;
        }
      }
    }
  }
</style>