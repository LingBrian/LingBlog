<template>
  <!--Top News-->
  <n-flex :style="{ padding: '10px 0 0 0' }" justify="space-around">
    <n-carousel
      :style="{
        padding: '10px 0 0 0',
        width: '512px',
        height: '256px',
        display: 'block',
      }"
      show-arrow
      autoplay
    >
      <ul v-for="img in imgs">
        <a :href="img.src" :style="{padding: 'auto'}">
          <img
            :style="{ padding:'auto',margin: 'auto', height: '288px' }"
            :src="img.src"
          />
        </a>
      </ul>
    </n-carousel>
    <n-list
      :style="{ width: '512px' }"
      hoverable
      clickable
      show-divider
      bordered
    >
      <n-list-item
        v-for="top in articles"
        :style="{ padding: '10px 0 0 16px', height: '128px' }"
        bordered
      >
        <n-thing :title="top.title" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag
                v-for="tag in top.tags"
                :bordered="false"
                type="info"
                size="small"
              >
                {{ tag }}
              </n-tag>
            </n-space>
          </template>
          <n-ellipsis  :line-clamp="2" v-html="top.overview">
           
          </n-ellipsis>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-flex>

  <!--Show Aero-->
  <n-flex :style="{ padding: '16px 0 0 16px ' }" justify="space-around">
    <Shower :shows="shows" />
    <!--Article Show-->
    <n-list
      :style="{ width: '100%' }"
      style="margin-left: 5px"
      hoverable
      clickable
      show-divider
      bordered
    >
      <n-list-item
        v-for="article in articleList"
        :style="{ padding: '10px 0 0 16px',margin:'auto',width:'90%', height: '128px' }"
        bordered
      >
      <NuxtLink  style="text-decoration: none;" target="_blank" :to="'/article?id='+article.id">
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
          <n-ellipsis  tooltip="false" :line-clamp="2" v-html="article.overview ">
          </n-ellipsis>
        </n-thing>
        </NuxtLink>
      </n-list-item>
    </n-list>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";

useHeadSafe({ title: "LingBlog" });

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        "a",
        {
          href: "/",
          target: "_blank",
        },
        h("img", {
          src: "https://avatars.githubusercontent.com/u/43987995?s=400&u=b13b63e177f4506298cee80ddb4e84108966c410&v=4",
          width: "40px",
          height: "40px",
        })
      ),
    key: "description",
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/description",
          target: "_blank",
          rel: "noopenner noreferrer",
        },
        "个人介绍"
      ),
    key: "description",
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/works",
          target: "_blank",
          rel: "noopenner noreferrer",
        },
        "作品展示"
      ),
    key: "works",
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/articles",
          target: "_blank",
          rel: "noopenner noreferrer",
        },
        "文章归档"
      ),
    key: "articles",
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/shares",
          target: "_blank",
          rel: "noopenner noreferrer",
        },
        "资源分享"
      ),
    key: "shares",
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/connect",
          target: "_blank",
          rel: "noopenner noreferrer",
        },
        "联系交流"
      ),
    key: "connect",
  },
];
{
  const value = ref("");
  const css = ref({
    "margin-left": "20px",
  });

  const ev = (px: number) => {
    css.value = {
      "margin-left": `${px}px`,
    };
  };
}
onMounted(() => {
  console.log("Mounted");
});
const imgs: img[] = [
  {
    src: "https://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20200813/9/wemedia/2f1c9d32b1499b25540fc91cf274137653c9655e_size408_w4000_h2334.jpg",
    url: "",
  },
  {
    src: "https://pic4.zhimg.com/v2-98afe1b24134462ba6e4de96bffd7dc3_r.jpg",
    url: "",
  },
  {
    src: "https://pic3.zhimg.com/v2-666fe07a0a32e18146fc328a861bb75a_r.jpg",
    url: "",
  },
  {
    src: "https://pic4.zhimg.com/v2-e24855e2d87577bd7cff4eefcbc58973_r.jpg",
    url: "",
  },
];
const shows: show[] = [
  {
    title: "鬼刃",
    url: "",
    img: "https://pic4.zhimg.com/v2-e24855e2d87577bd7cff4eefcbc58973_r.jpg",
    display: true,
  },
  {
    title: "风帽 幽灵公主",
    url: "",
    img: "https://img-baofun.zhhainiao.com/fs/6313016c18c46164af43dc0e5be1c112.jpg",
    display: true,
  },
  {
    title: "遥望",
    url: "",
    img: "https://pic4.zhimg.com/v2-fd5f7161b2fe950488bf5e02ef751625.jpg",
    display: true,
  },
];
const { data: arti } = await useFetch('/api/article/list')
const articles = arti.value.slice(0, 2)
const articleList =arti.value.slice(0,10)
type img = {
  src: string;
  url: string;
};
type show = {
  title: string;
  url: string;
  img: string;
  display: boolean;
};
type top = {
  title: string;
  overview: string;
  tags: Array<string>;
};
type article = {
  title: string;
  overview: string;
  auther: string;
  date: string;
  tags: Array<string>;
};
</script>
