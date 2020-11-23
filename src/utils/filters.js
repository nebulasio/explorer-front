import Vue from "vue";

// 字符串过长，显示省略号
Vue.filter("ellipsis", function(value) {
  const maxStrLen = 16;
  if (!value) return "";
  if (value.length > maxStrLen) {
    return value.slice(0, maxStrLen) + "...";
  }
  return value;
});

// format datetime to "YYYY-MM-DD"
Vue.filter("formatToDate", function(datetime_str) {
  if (datetime_str) {
    return moment(datetime_str).format("YYYY-MM-DD");
  } else {
    return "";
  }
});
