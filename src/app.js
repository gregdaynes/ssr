import Vue from "vue";

export default function createApp(context) {
  return new Vue({
    data: {
      url: context.url,
    },
    template: `<div>The visited URL is: {{ url }}</div>`,
  });
}
