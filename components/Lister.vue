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
          content-style="margin-left:4px;margin-top: 10px;"
        >
          <template #header>
             <NuxtLink style="color: black;text-decoration: none;" target="_blank" :to="'/article?id='+article.id">
              {{ article.title }}
             </NuxtLink>
          </template>
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
              <n-button @click="update(article.id)" size="tiny" type="success">更新</n-button>
              <n-button @click="del(article.id)" size="tiny" type="error">删除</n-button>
            </n-space>
          </template>
           <NuxtLink style="color: black;" target="_blank" :to="'/article?id='+article.id">
          <n-ellipsis tooltip="false" :line-clamp="2" v-html="article.overview ">
          </n-ellipsis>
          </NuxtLink>
          
        </n-thing>
      </n-list-item>
    </n-list>
  </n-flex>
</template>

<script setup lang="ts">
const auth = useCookie("auth");
const { data: user} = await useFetch('/api/user/user', {
              method: "post",
              body: {
                auth:auth,
              },
});
const { data: articles } = await useFetch('/api/article/list', {
  method: 'post',
  body:{
    userid:user.value.user.id
  }
})
function update(artid: number) {
  navigateTo("/article/update?id="+artid)
 }
async function del(key: number) {
  const { data: res } = await useFetch('/api/article/delete', {
  method: 'post',
  body:{
    artid:key
  }
  })

 alert(res.value.message)
 location.reload()
}
</script>
