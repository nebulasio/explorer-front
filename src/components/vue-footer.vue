<style lang="scss" scoped>
.vue-footer {
  flex-shrink: 0;
  width: 100%;
  color: #333333;
  background: #f5f6fa;

  @include media("<=desktop") {
    padding: 1rem;
  }

  @include media(">desktop") {
    padding-top: 4rem;
    padding-bottom: 2rem;
  }

  .logo {
    width: 150px;
    height: auto;
    margin-top: -2rem;

    @include media("<=desktop") {
      margin-top: 1rem;
      margin-bottom: 1rem !important;
    }
  }

  h5 {
    font-size: 18px;
    font-weight: bold;

    a {
      color: #333333;
    }
  }

  small {
    color: #666666;
    font-size: 12px;
  }

  li {
    margin: 1rem 0;

    a {
      color: #333333;
      font-size: 15px;
    }
  }

  .nav-links {
    @include media("<=desktop") {
      padding-top: 1rem;
    }
  }

  .explorer {
    position: relative;

    small.top {
      position: absolute;
      top: -1.5rem;

      @include media("<=desktop") {
        top: -0.1rem;
      }
    }
  }

  .download {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include media("<=desktop") {
      margin: 0 auto;
    }

    .title {
      margin-bottom: 1rem;

      @include media("<=desktop") {
        margin-bottom: 0;
      }
    }

    .links {
      @include media("<=desktop") {
        display: flex;
        align-items: center;
      }

      a {
        margin: 0.5rem 0;
        display: block;
        img {
          display: block;
          margin: 0 auto;

          &.appstore {
            width: 130px;
            height: auto;
          }

          &.google-play {
            width: 150px;
            height: auto;
          }
        }
      }
    }

    .copyright {
      margin-top: 1rem;

      @include media("<=desktop") {
        margin-top: 0;
      }
    }
  }
}
</style>
<template>
  <footer class="vue-footer border-top">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg">
          <img
            class="mb-2 logo"
            src="/static/img/nebulas-logo.png"
            alt="nebulas"
          />
        </div>
        <div class="col-6 col-lg explorer nav-links">
          <small class="top">{{ $t("menu.nebulasEcosystem") }}</small>

          <h5>
            <a
              href="https://explorer.nebulas.io/"
              rel="noopener noreferrer"
              target="__blank"
              >{{ $t("menu.explorer") }}</a
            >
          </h5>
          <small>{{ $t("menu.blockchain,dStaking") }}</small>
          <ul class="list-unstyled text-small">
            <li>
              <router-link :to="'/blocks'">
                {{ $t("menu.blocks") }}
              </router-link>
            </li>
            <li>
              <router-link :to="'/blocks'">
                {{ $t("menu.transactions") }}
              </router-link>
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                href="https://github.com/nebulasio/explorer/issues"
                target="__blank"
                >{{ $t("menu.submitIssuses") }}</a
              >
            </li>
          </ul>
        </div>
        <div class="col-6 col-lg nav-links">
          <h5>
            <a
              href="https://node.nebulas.io/"
              rel="noopener noreferrer"
              target="__blank"
              >{{ $t("menu.nodes") }}</a
            >
          </h5>
          <small>{{ $t("menu.PoDConsensus") }}</small>
          <ul class="list-unstyled text-small">
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://node.nebulas.io/list"
                >{{ $t("menu.nodes") }}</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://node.nebulas.io/govern"
                >{{ $t("menu.governance") }}</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://wiki.nebulas.io/en/latest/node-strategy/README.html"
                >{{ $t("menu.nodeHelp") }}</a
              >
            </li>
          </ul>
        </div>
        <div class="col-6 col-lg nav-links">
          <h5>
            <a
              href="https://go.nebulas.io/"
              rel="noopener noreferrer"
              target="__blank"
              >Go.nebulas</a
            >
          </h5>
          <small>{{ $t("menu.communityCollaboration") }}</small>
          <ul class="list-unstyled text-small">
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://go.nebulas.io/projects"
                >{{ $t("menu.projects") }}</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://go.nebulas.io/proposals"
                >{{ $t("menu.proposals") }}</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://www.notion.so/Go-nebulas-io-Help-Documentation-cbdeb02e0ff547b2b7cf59f2d249aafb"
                >{{ $t("menu.goNebulasHelp") }}</a
              >
            </li>
          </ul>
        </div>

        <div class="col-6 col-lg nav-links">
          <h5>
            <a
              rel="noopener noreferrer"
              target="__blank"
              href="https://nebulas.io"
              >nebulas.io</a
            >
          </h5>
          <ul class="list-unstyled text-small">
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://nebulas.io/wallets.html"
                >{{ $t("menu.wallets") }}</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://wiki.nebulas.io/en/latest/go-nebulas/blockchain/mainnet.html"
                >{{ $t("menu.documents") }}</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="__blank"
                href="https://community.nebulas.io/"
                >{{ $t("menu.forum") }}</a
              >
            </li>
          </ul>
        </div>

        <div class="col-6 col-lg download">
          <small class="title">{{ $t("menu.nasNanoProDownload") }}</small>

          <div class="links">
            <a
              rel="noopener noreferrer"
              href=" https://itunes.apple.com/us/app/nas-nano-pro/id1441776793&mt=8"
              target="__blank"
            >
              <img
                class="appstore"
                src="/static/img/download-on-the-appstore.png"
              />
            </a>
            <a
              rel="noopener noreferrer"
              href=" https://play.google.com/store/apps/details?id=io.nebulas.wallet.android&hl=en_US"
              target="__blank"
            >
              <img
                class="google-play"
                src="/static/img/get-it-on-google-play.png"
              />
            </a>
          </div>

          <small class="copyright">Copyright 2017 - 2021</small>
        </div>
      </div>
    </div>
  </footer>
</template>
