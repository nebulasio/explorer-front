import { get } from "@/utils/http";

const block = {
  getBlocks(page) {
    return get("explorer/block/list", {
      page
    });
  },
  getBlockDetail(param) {
    return get("block/detail", {
      h: param // bloch hash or block height
    });
  }
};

export default block;
