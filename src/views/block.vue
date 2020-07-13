<style lang="scss" scoped>
.vue-block {
  width: 100%;
  background-color: white;

  .vue-bread {
    background-color: #f7f7f7;
    overflow: auto;
    padding: 10px 0;
  }

  table tr td {
    border: 0;
    vertical-align: middle;

    .node {
      img.avatar {
        border-radius: 50% !important;
        width: 32px;
        height: 32px;
        margin-right: 6px;
      }
    }

    .dynasty a {
      margin-bottom: 10px;
    }

    .pagination {
      margin: 0;
      vertical-align: top;
    }
  }

  tr > td:first-child {
    padding-left: 24px;
  }

  tr > td:first-child::after {
    content: ":";
  }

  .card {
    border: 0;
  }
}
</style>
<template>
  <!-- https://etherscan.io/block/4951841 -->
  <div class="vue-block ">
    <div class="vue-bread">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-auto bread-title font-40 font-bold font-color-000000">
            {{ $t("blockTitle") }}
          </div>
          <div
            class="col-auto bread-subtitle font-16 font-bold font-color-000000 align-baseline"
          >
            {{ $route.params.id }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="block" class="container">
      <div class="font-24 font-bold font-color-000000 table-title">
        <span>
          {{ $t("blockOverview") }}
        </span>
      </div>

      <div class="explorer-table-container d-none d-md-block">
        <table class="explorer-table font-16">
          <tr>
            <td class="font-color-555555">
              {{ $t("blockHeight") }}
            </td>
            <td class="font-color-000000">
              <nav aria-label="" class="navgation-tab" localize="aria-label">
                <ul class="pagination">
                  <li>
                    <router-link
                      v-if="block.height > 1"
                      v-bind:to="fragApi + '/block/' + (+$route.params.id - 1)"
                      aria-label=""
                      localize="aria-label"
                    >
                      <span aria-hidden="true">
                        {{ $t("blockButtonPrev") }}
                      </span>
                    </router-link>
                  </li>
                  <li>&nbsp; {{ block.height }} &nbsp;</li>
                  <!-- <li>
                    <router-link
                      v-if="$root.timestamp - block.timestamp > 16000"
                      v-bind:to="fragApi + '/block/' + (+$route.params.id + 1)"
                      aria-label=""
                      localize="aria-label"
                      id="blockRouterNext"
                      class="blocklocalizable"
                    >
                      <span
                        aria-hidden="true"
                        class="blocklocalizable"
                        id="blockButtonNext"
                      ></span>
                    </router-link>
                  </li> -->
                </ul>
              </nav>
            </td>
          </tr>
          <tr>
            <td class="font-color-555555">
              {{ $t("blockTimeStamp") }}
            </td>
            <td class="font-color-000000">
              {{ updatedPass }}
              ({{ blockTime }} | {{ block.timestamp }})
            </td>
          </tr>
          <tr>
            <td class="font-color-555555">
              {{ $t("blockTransactionsTitle") }}
            </td>
            <td class="font-color-000000">
              <router-link v-bind:to="fragApi + '/txs?block=' + block.height">
                <span>{{ block.tx_count }}</span>
              </router-link>
              tx {{ $t("blockTxInBlock") }}
            </td>
          </tr>
          <tr>
            <td class="font-color-555555">
              {{ $t("blockHashTitle") }}
            </td>
            <td class="font-color-000000 monospace">{{ block.block_hash }}</td>
          </tr>
          <tr>
            <td class="font-color-555555">
              {{ $t("blockParentHashTitle") }}
            </td>
            <td>
              <router-link v-bind:to="fragApi + '/block/' + block.parent_hash">
                <span class="monospace">{{ block.parent_hash }}</span>
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="font-color-555555">
              {{ $t("blockMintedTitle") }}
            </td>
            <td>
              <router-link v-bind:to="fragApi + '/address/' + block.miner">
                <span class="monospace">{{ block.miner }}</span>
              </router-link>
            </td>
          </tr>

          <tr v-if="!isEmptyObj(block.node)">
            <td class="font-color-555555">
              {{ $t("blockNodeTitle") }}
            </td>
            <td>
              <a rel="noopener noreferrer" target="__blank" :href="nodeLink">
                <div class="node">
                  <img :src="nodeAvatar" class="avatar" alt="Circle image" />
                  <span class="monospace">{{ block.node.info.name }}</span>
                </div>
              </a>
            </td>
          </tr>

          <tr v-if="!isEmptyObj(block.node)">
            <td class="font-color-555555">
              {{ $t("dashboardPollingCycle") }}
            </td>
            <td>
              <a rel="noopener noreferrer" target="__blank" :href="periodLink">
                <span class="monospace">{{ block.node.period }}</span>
              </a>
            </td>
          </tr>

          <tr>
            <td class="font-color-555555">
              {{ $t("blockCoinbaseTitle") }}
            </td>
            <td>
              <router-link v-bind:to="fragApi + '/address/' + block.coinbase">
                <span class="monospace">{{ block.coinbase }}</span>
              </router-link>
            </td>
          </tr>
          <tr>
            <td
              class="font-color-555555"
              style="vertical-align: top; padding-top: 12px;"
            >
              {{ $t("blockDinastyTitle") }}
            </td>
            <td style="vertical-align: top; padding-top: 12px;">
              <a
                class="d-flex align-items-center"
                href="#"
                v-on:click="showOrHideDynasty()"
                style="text-decoration: none;"
                data-toggle="collapse"
                data-target="#collapse-mobile"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <span>
                  {{ $t("blockShowDinasty") }}
                </span>
                <img
                  style="margin-left: 12px; margin-top: 3px; vertical-align: middle;"
                  class="icon16"
                  v-bind:src="
                    isShowDynasty
                      ? '../../static/img/ic_payload_arrow_up.png'
                      : '../../static/img/ic_payload_arrow_down.png'
                  "
                />
              </a>
              <div class="collapse" id="collapse-mobile">
                <div class="card card-body dynasty">
                  <router-link
                    v-for="dynasty in block.dynasty"
                    v-bind:key="dynasty"
                    v-bind:to="fragApi + '/address/' + dynasty"
                  >
                    <span class="font-16 font-bold  monospace">
                      {{ dynasty }}</span
                    >
                  </router-link>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="font-color-555555">
              {{ $t("blockGasReward") }}
            </td>
            <td class="font-color-000000">
              {{ toWei(block.gas_info.gas_reward) }}
            </td>
          </tr>
        </table>
      </div>

      <div class="mobile-detail d-md-none">
        <div>
          {{ $t("blockHeightTitle") }}
          <div class="detail">
            <nav
              localize="aria-label"
              aria-label="Page navigation"
              class="navgation-tab"
            >
              <ul class="pagination">
                <li>
                  <router-link
                    v-if="block.height > 1"
                    v-bind:to="fragApi + '/block/' + (+$route.params.id - 1)"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">
                      {{ $t("blockPreviousLink") }}
                    </span>
                  </router-link>
                </li>
                <li>&nbsp; {{ block.height }} &nbsp;</li>
                <!-- <li>
                  <router-link
                    v-if="$root.timestamp - block.timestamp > 16000"
                    v-bind:to="fragApi + '/block/' + (+$route.params.id + 1)"
                    aria-label="Next"
                  >
                    <span
                      aria-hidden="true"
                      class="blocklocalizable"
                      id="blockNextLink"
                    ></span>
                  </router-link>
                </li> -->
              </ul>
            </nav>
          </div>
        </div>
        <div>
          {{ $t("blockTimeStampTitle") }}
          <div class="detail">
            <span> {{ $t("blockTimeStampPrefix") }} </span
            >{{
              timeConversion(Date.now() - block.localTimestamp + block.timeDiff)
            }}
            {{ $t("blockTimeStampSuffix") }} ({{
              new Date(block.timestamp)
                .toString()
                .replace("GMT", "UTC")
                .replace(/\(.+\)/gi, "")
            }}
            | {{ block.timestamp }})
          </div>
        </div>
        <div>
          {{ $t("blockTransactionsTitle") }}
          <div class="detail">
            <router-link v-bind:to="fragApi + '/txs?block=' + block.height">
              <span>{{ block.tx_count }}</span>
            </router-link>
            {{ $t("blockTxInThisBlock") }}
          </div>
        </div>
        <div>
          Hash:
          <div class="detail monospace">{{ block.block_hash }}</div>
        </div>
        <div>
          {{ $t("blockParentHashTitle") }}
          <div class="detail">
            <router-link v-bind:to="fragApi + '/block/' + block.parent_hash">
              <span class="monospace">{{ block.parent_hash }}</span>
            </router-link>
          </div>
        </div>
        <div>
          {{ $t("blockMintedTitle") }}
          <div class="detail">
            <router-link v-bind:to="fragApi + '/address/' + block.miner">
              <span class="monospace">{{ block.miner }}</span>
            </router-link>
            <!-- <span v-if="block.miner.alias"> | {{ block.miner.alias }}</span> -->
          </div>
        </div>
        <div>
          {{ $t("blockCoinbaseTitle") }}
          <div class="detail">
            <router-link v-bind:to="fragApi + '/address/' + block.coinbase">
              <span class="monospace">{{ block.coinbase }}</span>
            </router-link>
          </div>
        </div>
        <div>
          {{ $t("blockDinastyTitle") }}
          <div class="detail">
            <a
              class="d-flex align-items-center"
              href="#"
              v-on:click="showOrHideDynasty()"
              style="text-decoration: none;"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <span>
                <span>
                  {{ $t("blockShowDinastyButton") }}
                </span>
              </span>
              <img
                style="margin-left: 12px; margin-top: 3px; vertical-align: middle;"
                class="icon16"
                v-bind:src="
                  isShowDynasty
                    ? '../../static/img/ic_payload_arrow_up.png'
                    : '../../static/img/ic_payload_arrow_down.png'
                "
              />
            </a>
            <div class="collapse" id="collapseExample">
              <div class="card card-body dynasty">
                <router-link
                  v-for="dynasty in block.dynasty"
                  v-bind:key="dynasty"
                  v-bind:to="fragApi + '/address/' + dynasty"
                >
                  <span class="font-16 font-bold "> {{ dynasty }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div>
          {{ $t("blockGasRewardTitle") }}
          <div class="detail">{{ toWei(block.gas_info.gas_reward) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var api = require("@/assets/api"),
  utility = require("@/assets/utility");

import moment from "moment";
import _ from "lodash";

module.exports = {
  components: {
    "vue-bread": require("@/components/vue-bread").default,
    "vue-tab-buttons": require("@/components/vue-tab-buttons").default
  },
  data() {
    return {
      block: null,
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      tab: 0,
      tabButtons: ["Overview"],
      isShowDynasty: false,
      timestamp: Date.now()
    };
  },
  mounted() {
    const blockHeight = this.$route.params.id;
    this.loadData(blockHeight);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.id);
    next();
  },
  computed: {
    urlChange() {
      this.$root.showModalLoading = true;
      api.getBlock(
        this.$route.params.id,
        o => {
          this.$root.showModalLoading = false;
          if (!o.localTimestamp) {
            o.localTimestamp = Date.now();
          }
          this.block = o;
        },
        xhr => {
          this.$root.showModalLoading = false;
          this.$router.replace(
            (this.$route.params.api ? "/" + this.$route.params.api : "") +
              "/404"
          );
        }
      );
    },
    updatedPass() {
      return this.block && moment(this.block.timestamp * 1000).fromNow();
    },
    blockTime() {
      return this.block && moment(this.block.timestamp * 1000).format();
    },
    nodeAvatar() {
      return "https://node-image.nebulas.io/" + this.block.node.info.avatar;
    },
    nodeLink() {
      return "https://node.nebulas.io/detail/" + this.block.node.info.id;
    },
    periodLink() {
      return "https://node.nebulas.io/mint";
    }
  },
  methods: {
    async loadData(blockHeight) {
      this.$root.showModalLoading = true;

      // get block detail
      this.block = await this.$api.block.getBlockDetail(blockHeight);

      this.block.localTimestamp = Date.now();

      this.$root.showModalLoading = false;
    },
    showOrHideDynasty() {
      this.isShowDynasty = !this.isShowDynasty;
    },
    timeConversion(ms) {
      return utility.timeConversion(ms);
    },
    timeConversionSec(ms) {
      return utility.timeConversionSec(ms);
    },
    toWei(n) {
      return utility.toWei(n);
    },
    isEmptyObj(obj) {
      return _.isEmpty(obj);
    }
  }
};
</script>
