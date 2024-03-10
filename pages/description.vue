<template>
  <n-flex vertical>
    <n-avatar
      round
      :size="128"
      :style="{ margin: '32px auto 0' }"
      src="/img/logo.png"
    />
    <h1 :style="{ margin: '4px auto 0' }">漩葵</h1>
    <n-gradient-text :style="{ margin: '8px auto' }" type="info">
      前端小白、Diy小白
    </n-gradient-text>
    <p :style="{ margin: '8px auto' }">行到水穷处，坐看云起时。 —— 终南别业</p>
  </n-flex>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
useHeadSafe({ title: "个人介绍" });
</script>
