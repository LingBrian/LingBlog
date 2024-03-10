<template>
  <n-flex style="margin-top: 10px;" verticle>
    <div style="margin: 10px auto; width: 80%">
      <n-input
        style="margin: auto; width: 80%"
        v-model:value="title"
        type="text"
        placeholder="标题"
      />
      <n-button @click="submit" type="success">更新文章</n-button>
    </div>
    <div style="margin: auto;width: 80%;" >
                              标签
                              <n-dynamic-tags style="" v-model:value="tags" />
     </div>

    <div style="margin: auto; width: 80%; border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />

      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <article style="width:80%;margin: auto;" v-html="valueHtml"></article>
  </n-flex>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Editor, Toolbar },
  async setup() {
    definePageMeta({
      key: (route) => route.fullPath,
      middleware: ["auth"],
    });
    useHeadSafe({ title: "更新文章" });
    let article = await getArt()
   
    const a = ref(1);
    const tags = ref([]);
    article.value.Tag.map(tag=> { tags.value.push(tag.name)})
    const title = ref(article.value.title);
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref(article.value.content);

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //setTimeout(() => {
    //  valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
    //  }, 1500);
    //  });

    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      article,
      a,
      title,
      tags,
      editorRef,
      valueHtml,
      mode: "simple", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      submit() {
        a.value = valueHtml;
        lac(article.value.id,title.value, tags.value, valueHtml).then((a) => {
          alert(a);
          navigateTo('/article?id='+article.value.id)
        });
      },
    };
  },
});
async function lac(artid,title, tags, html) {
  const auth = useCookie("auth");
  const { data: res } = await useFetch("/api/article/update", {
    method: "post",
    body: {
      artid: artid,
      title: title,
      tags: tags,
      content: html,
      auth: auth,
    },
  });
  return res.value;
}
async function getArt() { 

    const route = useRoute()
          const { data: article } = await useFetch('/api/article/' + route.query.id)
    return  article
}
</script>
