<style>
.text{
          padding-top: 10px;
          margin: auto;
}
</style>
<template>
          <n-flex vertical>
                    <h1 :style="{fontSize:'30px'}" class="text">{{ article.title }}</h1>
                    <n-space  size="small" class="text">
                              <n-tag size="medium" type="success">
                                        作者：{{ article.auther.username }} 创建日期：{{ (new Date(article.date )).toLocaleString()}} 更新日期：{{ (new Date(article.update )).toLocaleString()}}
                              </n-tag>
                             
                    </n-space>
                    <n-space size="medium" class="text">
                               <n-tag
                               v-for="tag in article.Tag"
                               :bordered="false"
                               type="info"
                               size="medium"
                               >
                              {{ tag.name }}
                              </n-tag>
                    </n-space>
                    <p :style="{ margin: '10px 5%', fontSize:'20px'}" v-html="article.content"/>
          </n-flex>
</template>

<script setup lang="ts">

const route = useRoute()

const { data: article } = await useFetch('/api/article/'+route.query.id)
definePageMeta({
  key: (route) => route.fullPath,
});
useHeadSafe({ title: article.value.title });
const auth = useCookie('auth')
</script>