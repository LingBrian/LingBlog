<template>
  <flex>
    <div style="margin: 10px auto; width: 80%">
      <n-input
        style="margin: auto; width: 80%"
        v-model:value="title"
        type="text"
        placeholder="标题"
      />
      <n-button @click="submit">提交文章</n-button>
    </div>
    <n-dynamic-tags style="margin: auto; width: 80%" v-model:value="tags" />
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
  </flex>
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
    useHeadSafe({ title: "创作页面" });
    const a = ref(1);
    const tags = ref(["请选择标签"]);
    const title = ref("");
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("<p>hello</p>");

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
        lac(title.value, tags.value, valueHtml).then((a) => {
          alert(a);
          navigateTo('/')
        });
      },
    };
  },
});
async function lac(title, tags, html) {
  const auth = useCookie("auth");
  const { data: res } = await useFetch("/api/article/create", {
    method: "post",
    body: {
      title: title,
      tags: tags,
      content: html,
      auth: auth,
    },
  });
  return res.value;
}
</script>
