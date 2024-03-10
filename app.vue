<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>

<script setup>
useHeadSafe({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 漩葵的网站` : "网站名称";
  },
  link: [
    {
      rel: "short icon",
      href: "favicon.ico",
      type: "image/x-icon",
    },
  ],
});
</script>
<style></style>
