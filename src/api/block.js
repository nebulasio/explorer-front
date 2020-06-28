import { get } from "@/utils/http";

const block = {
  getBlocks() {
    return get("explorer/block/list");
  },
  getBlockDetail(param) {
    return get("block/detail", {
      h: param // bloch hash or block height
    });
  }
};

export default block;
