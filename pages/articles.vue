<template>
  <n-flex :style="{ padding: '16px 0 0 0 ' }" justify="space-around">
    <n-list
      :style="{ width: '100%' }"
      style="margin-left: 5px"
      hoverable
      clickable
      show-divider
      bordered
    >
      <n-list-item
        v-for="article in articles"
        :style="{ padding: '10px 0 0 16px',margin:'auto',width:'90%', height: '128px' }"
        bordered
      >
        <n-thing
          :title="article.title"
          content-style="margin-left:4px;margin-top: 10px;"
        >
          <template #description>
            <n-space size="small" style="margin-left: 5px; margin-top: 4px">
              <n-tag size="small" type="success"
                >作者：{{ article.auther }} 日期：{{ article.date }}</n-tag
              >
              <n-tag
                v-for="tag in article.tags"
                :bordered="false"
                type="info"
                size="small"
              >
                {{ tag }}
              </n-tag>
            </n-space>
          </template>
          <n-ellipsis :line-clamp="2" v-html="article.overview ">
          </n-ellipsis>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-flex>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
useHeadSafe({
  title: "文章列表"
});
const auth = useCookie("auth");

const { data: articles } = await useFetch('/api/article/list')

</script>
