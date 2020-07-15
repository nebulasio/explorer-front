<template>
  <div>
    <a
      class="nav-link"
      href="#"
      id="language-selector"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="iconfont icon-language"></i>
      {{ $t("Languages") }}
      <i class="iconfont icon-down"></i>
      <!-- <img src=/static/img/icon_arrow_down.png width=12 alt=""> -->
    </a>
    <div class="dropdown-menu" aria-labelledby="language-selector">
      <div>
        <a
          v-for="locale in supportedLocales"
          :key="locale"
          href="#"
          class="dropdown-item"
          @click.prevent="switchLocale(locale)"
        >
          {{ $t(`lang.${locale}`) }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Trans } from "@/plugins/Translation";

export default {
  name: "LocaleSwitcher",
  computed: {
    supportedLocales() {
      return Trans.supportedLocales;
    }
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        console.log(locale);
        this.$moment.locale(locale);
        Trans.changeLocale(locale);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  text-decoration: underline;
  cursor: pointer;
  a {
    color: #333333;
  }
}

.icon-language {
  font-size: 14px;
}

.icon-down {
  font-size: 12px;
}
</style>
