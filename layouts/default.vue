<template>
  <div>
    <n-layout-header bordered>
      <HeadMenu />
    </n-layout-header>
    <n-layout>
      
      <n-layout-content style="min-height: 636px;">
        <slot />
      </n-layout-content>
    </n-layout>
    <n-layout-footer bordered>
      <!--Footer-->
      <Footer />
    </n-layout-footer>
  </div>
</template>
<script setup lang="ts">

const screen = ref(window.innerWidth)

window.onresize = () => {
  screen.value = window.innerWidth
}
</script>