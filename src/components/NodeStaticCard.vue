<template>
  <div class="dashboard-card  col-12 col-lg-6">
    <div class="item-bg">
      <div class="header">
        <div class="title">
          {{ $t("dashboardAvgAnnReturnInvest") }}
          <b-icon
            v-b-tooltip.hover
            :title="$t('dashboardAvgAnnReturnInvestTips')"
            icon="question-circle"
          ></b-icon>
          <span class="net-status">{{ mainnetText }}</span>
        </div>
        <div v-if="summary" class="details">
          {{ $t("dashboardNasPriceUpdateTimePrefix") }}:
          <span>{{ timeConversion(this.summary.updatedTime) }}</span>
        </div>
      </div>

      <div class="detail">
        <span>{{ avgRewardRate }} </span>
        <span class="suffix">%</span>
      </div>
      <!-- market realtime data -->
      <div class="market container">
        <div class="row">
          <div class="col-6 col-md-4">
            <label>{{ $t("dashboardTotalReward") }}</label>
            <div>
              {{ totalRewardValue }}
              <span class="suffix">NAS</span>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <label>{{ $t("dashboardNodes") }}</label>
            <div>{{ nodeCount }}</div>
          </div>
          <div class="col-6 col-md-4">
            <label>{{ $t("dashboardPollingCycle") }}</label>
            <div>{{ currentPeriod }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-md-4">
            <label>{{ $t("dashboardVotedForNodes") }}</label>
            <div>
              {{ totalVoteValue }}
              <span class="suffix">NAX</span>
            </div>
            <a target="__blank" href="https://node.nebulas.io/"
              >{{ $t("dashboardViewAllNodes") }} &gt;
            </a>
          </div>
          <div class="col-6 col-md-4">
            <label>{{ $t("dashboardVotingRate") }}</label>
            <div>
              {{ voteRate }}

              <span class="suffix">%</span>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <label>{{ $t("dashboardGovernanceCycle") }}</label>
            <div>{{ currentGovPeriod }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { isMainnet } from "@/utils/neb";
import { toLocaleString } from "@/utils/number";

export default {
  name: "NodeStaticCard",
  data() {
    return {
      summary: null
    };
  },
  mounted() {
    this.$api.home.getNodeSummary().then(res => (this.summary = res));
  },
  methods: {
    timeConversion(ms) {
      return this.$moment(ms).fromNow();
    }
  },
  computed: {
    avgRewardRate() {
      return this.summary && toLocaleString(this.summary.avgRewardRate7 * 100);
    },
    totalRewardValue() {
      return this.summary && toLocaleString(this.summary.totalRewardValue);
    },
    totalVoteValue() {
      return this.summary && toLocaleString(this.summary.totalVoteValue);
    },
    voteRate() {
      return this.summary && toLocaleString(this.summary.voteRate * 100);
    },
    nodeCount() {
      return this.summary && this.summary.nodeCount;
    },
    currentPeriod() {
      return this.summary && this.summary.currentPeriod;
    },
    currentGovPeriod() {
      return this.summary && this.summary.currentGovPeriod;
    },
    mainnetText() {
      return !isMainnet(this.$route) ? `Mainnet` : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px !important;
}
</style>
