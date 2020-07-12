<style lang="scss" scoped>
.vue-blocks {
  background-color: white;

  .vue-bread {
    background-color: #f7f7f7;
    overflow: auto;
    padding: 10px 0;
  }

  .block {
    margin-right: 8px;
  }

  table tr td {
    .node {
      // padding-left: 30px;

      img.avatar {
        border-radius: 50% !important;
        width: 24px;
        height: 24px;
        margin-right: 6px;
      }
    }
  }

  @media (max-width: 767.98px) {
    .title {
      font-size: 20px;
    }
  }
}
</style>

<template>
  <!-- https://etherscan.io/blocks -->
  <div class="vue-blocks ">
    <div class="vue-bread">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-auto bread-title font-40 font-bold font-color-000000">
            {{ $t("blocksTitle") }}
          </div>
          <div
            class="col-auto bread-subtitle font-16 font-bold font-color-000000 align-baseline"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="arr" class="container mt20">
      <div class="align-items-center info-and-pagination mt20 row">
        <div class="col info font-color-000000 font-24 font-bold title">
          {{ numberAddComma(totalBlocks) }}
          <span>
            {{ $t("blocksFound") }}
          </span>
          <!-- <span v-if="totalTxs > 500" class="font-color-555555 font-16" style="vertical-align: text-bottom;">(<span class="blockslocalizable" id="blocksLatestFound"></span>)</span> -->
        </div>
      </div>
      <div class="explorer-table-container">
        <table class="mt20 explorer-table list-table">
          <tr class="list-header font-12 font-bold font-color-000000">
            <th style="width: 20px;"></th>
            <th style="width: 130px;">
              {{ $t("blocksTableHeight") }}
            </th>
            <th style="width: 130px;">
              {{ $t("blocksTableAge") }}
            </th>
            <th style="padding-left: 20px">
              {{ $t("blocksTableTxn") }}
            </th>
            <!-- <th style="padding-left: 30px">
              {{ $t("blocksTableMinted") }}
            </th> -->

            <th style="padding-left: 30px">
              {{ $t("blockNodeTitle") }}({{ $t("blocksTableMinted") }})
            </th>

            <th style="padding-left: 30px">
              {{ $t("dashboardPollingCycle") }}
            </th>

            <th class="text-right">
              {{ $t("blocksTableGasReward") }}
            </th>
            <th class="text-right">
              {{ $t("blocksTableGasLimit") }}
            </th>
            <th class="text-right">
              {{ $t("blocksTableAverageGasPrice") }}
            </th>
            <th style="width: 20px;"></th>
          </tr>
          <tr v-for="(o, i) in arr" :key="i">
            <td></td>
            <td>
              <router-link v-bind:to="fragApi + '/block/' + o.height">
                <span class="font-14">{{ o.height }}</span>
              </router-link>
            </td>
            <td>
              <div>
                <div class="font-color-000000 font-14">
                  {{ updatedPass(o.timestamp) }}
                </div>
                <div>
                  {{ blockTime(o.timestamp) }}
                </div>
              </div>
            </td>
            <td style="padding-left: 20px">
              <router-link v-bind:to="fragApi + '/txs?block=' + o.height">
                <span class="font-14">{{ numberAddComma(o.tx_count) }}</span>
              </router-link>
            </td>
            <!-- <td style="padding-left: 30px">
              <router-link v-bind:to="fragApi + '/address/' + o.miner">
                <vue-blockies
                  class="d-inline"
                  v-bind:address="o.miner"
                ></vue-blockies>
                <span class="font-14 monospace">{{ o.miner }}</span>
              </router-link>
            </td> -->

            <td style="padding-left: 30px">
              <a
                v-if="!isEmptyObj(o.node)"
                rel="noopener noreferrer"
                target="__blank"
                :href="nodeLink(o.node)"
              >
                <div class="node">
                  <img
                    :src="nodeAvatar(o.node)"
                    class="avatar"
                    alt="Circle image"
                  />
                  <span class="monospace">{{ o.node.info.name }}</span>
                </div>
              </a>

              <router-link v-else v-bind:to="fragApi + '/address/' + o.miner">
                <vue-blockies
                  class="d-inline"
                  v-bind:address="o.miner"
                ></vue-blockies>
                <span class="font-14 monospace">{{ o.miner }}</span>
              </router-link>
            </td>

            <td class="text-right">
              <a
                v-if="!isEmptyObj(o.node)"
                rel="noopener noreferrer"
                target="__blank"
                :href="periodLink()"
              >
                <span class="monospace">{{ o.node.period }}</span>
              </a>

              <span v-else>-</span>
            </td>

            <td class="text-right">
              <span class="font-14 font-color-555555">{{
                toWei(o.gas_info.gas_reward)
              }}</span>
            </td>
            <td class="text-right">
              <span class="font-14 font-color-000000">{{
                numberAddComma(o.gas_info.gas_limit)
              }}</span>
            </td>
            <td class="text-right">
              <span class="font-14 font-color-555555">{{
                toWei(o.gas_info.avg_gas_price)
              }}</span>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
      <vue-pagination
        v-bind:current="currentPage"
        right="1"
        v-bind:total="totalPage"
        v-on:first="onFirst"
        v-on:last="onLast"
        v-on:next="onNext"
        v-on:prev="onPrev"
        v-on:to="onTo"
      ></vue-pagination>
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
    "vue-pagination": require("@/components/vue-pagination").default,
    "vue-blockies": require("@/components/vue-blockies").default
  },
  data() {
    return {
      arr: null,
      currentPage: 0,
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      heightFrom: 0,
      heightTo: 0,
      totalBlocks: 0,
      totalPage: 0
    };
  },
  mounted() {
    this.nthPage();
  },
  methods: {
    async nthPage() {
      var p = this.$route.query.p || 1;

      if (p == this.currentPage)
        console.log("nthPage - 请求的第", p, "页正是当前页, 忽略此次调用");
      else {
        this.$root.showModalLoading = true;

        const res = await this.$api.block.getBlocks(p);
        this.arr = res.list;

        this.$root.showModalLoading = false;

        this.currentPage = res.current_page;
        this.totalPage = res.total_page;
        this.totalBlocks = res.count;

        if (this.arr.length) {
          this.heightFrom = this.arr[0].height;
          this.heightTo = this.arr[this.arr.length - 1].height;
        } else {
          this.heightFrom = 0;
          this.heightTo = 0;
        }
      }
    },
    numberAddComma(n) {
      return utility.numberAddComma(n);
    },
    onFirst() {
      this.$router.push({
        path: this.$route.path,
        query: { p: 1 }
      });
    },
    onLast() {
      this.$router.push({
        path: this.$route.path,
        query: { p: this.totalPage }
      });
    },
    onNext() {
      this.$router.push({
        path: this.$route.path,
        query: { p: this.currentPage + 1 }
      });
    },
    onPrev() {
      this.$router.push({
        path: this.$route.path,
        query: { p: this.currentPage - 1 }
      });
    },
    onTo(n) {
      this.$router.push({
        path: this.$route.path,
        query: { p: n }
      });
    },
    timeConversion(ms) {
      return utility.timeConversion(ms);
    },
    toWei(n) {
      return utility.toWei(n);
    },
    updatedPass(timestamp) {
      return this.arr && moment(timestamp * 1000).fromNow();
    },
    blockTime(timestamp) {
      return this.arr && moment(timestamp * 1000).format();
    },
    nodeAvatar(node) {
      return "https://node-image.nebulas.io/" + node.info.avatar;
    },
    nodeLink(node) {
      return "https://node.nebulas.io/detail/" + node.info.id;
    },
    periodLink() {
      return "https://node.nebulas.io/mint";
    },
    isEmptyObj(obj) {
      return _.isEmpty(obj);
    }
  },

  watch: {
    $route() {
      this.nthPage();
    }
  }
};
</script>
