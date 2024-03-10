<template>
  {{ auth }}
</template>

<script setup lang="ts">

definePageMeta({
  key: (route) => route.fullPath,
});
useHeadSafe({ title: "联系交流" });
const auth = useCookie('auth')
</script>