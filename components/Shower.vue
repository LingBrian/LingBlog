<template>
  <ul v-for="show in shows">
    <a :href="show.url">
      <n-card :title="show.title">
        <template #cover>
          <img :style="{ height: '200px' }" :src="show.img" />
        </template>
      </n-card>
    </a>
  </ul>
</template>
<script lang="ts">
export default {
  props: ["shows"],
  setup(props, context) {
    console.log(props);
    console.log(context);
  },
};
</script>
