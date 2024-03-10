<template>
 <n-flex vertical>
        <n-avatar
            round
            :size="128"
            :style="{ margin: '32px auto 0' }"
            src="/img/logo.png"
          />
      
      <h1 :style="{ margin: '4px auto 0' }">{{ user.user.username }}</h1>
      
      <n-gradient-text :style="{ margin: '8px auto' }" type="info">
            E-mail:{{ user.user.email }} <br>
            UID: <b>{{ user.user.id }}</b>
      </n-gradient-text>

      <n-tabs  type="line" default-value="Lister" animated justify-content="space-evenly">
      <n-tab-pane name="Creater" tab="创建文章">
        
        <Creater/>
  
      </n-tab-pane>
      <n-tab-pane name="Lister" tab="文章列表">
        
        <Lister/>

      </n-tab-pane>
    </n-tabs>

    </n-flex>
</template>

<script setup lang="ts">

definePageMeta({
  key: (route) => route.fullPath,
  middleware: ["auth"],
});
useHeadSafe({ title: "联系交流" });
const auth = useCookie('auth')
const { data: user} = await useFetch('/api/user/user', {
              method: "post",
              body: {
                auth:auth,
              },
});
</script>