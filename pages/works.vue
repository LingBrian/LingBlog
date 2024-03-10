<template>
  <n-flex :style="{ padding: '16px 0 0 0 ' }" justify="space-around">
    <Shower :shows="shows" />
  </n-flex>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
useHeadSafe({ title: "作品展示" });
const shows: show[] = [
  {
    title: "图片1",
    url: "",
    img: "https://th.bing.com/th/id/OIP.8aun7Fc41tX_wdgtvLbOEQHaDm?w=284&h=169&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    display: true,
  },
  {
    title: "图片1",
    url: "",
    img: "https://th.bing.com/th?id=OIP.QQp3KbysAqlTr8J18_2OPQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    display: true,
  },
  {
    title: "雾山火行",
    url: "",
    img: "https://th.bing.com/th/id/OIP.ijFmGNjTz211gcEaSii3cQHaDg?w=283&h=165&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    display: true,
  },
];
type show = {
  title: string;
  url: string;
  img: string;
  display: boolean;
};
</script>
