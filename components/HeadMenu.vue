<template>
  <n-flex size="large" justify="space-between">
    <n-grid :x-gap="4" :cols="24" item-responsive responsive="screen">
      <n-gi span="24 m:11 l:11">
        <n-menu mode="horizontal" :options="menuOptions" responsive />
      </n-gi>
      <n-gi span="4 m:0 l:0"> </n-gi>
      <n-gi :style="{ padding: 'auto' }" span="14 m:6 l:6">
        <n-auto-complete
          :style="{ padding: '4px' }"
          type="text"
          placeholder="搜索文章、资料"
        >
        </n-auto-complete>
      </n-gi>
      <n-gi :style="{ padding: '4px' }" span="2 m:2 l:2">
        <n-button
          :style="{ margin: 'auto' }"
          strong
          secondary
          circle
          type="info"
        >
          <template #icon>
            <n-icon><Search /></n-icon>
          </template>
        </n-button>
      </n-gi>
      <n-gi
        span="0 m:4 l:4"
        :style="{ margin: 'auto', display: auth == '' ? 'unset' : 'none' }"
      >
        <Llink
          style="text-decoration: none; color: white"
          to="/user/login"
          target="_self"
        >
          <n-button type="primary"> 登录 </n-button>
        </Llink>
        /
        <Llink
          style="text-decoration: none; color: white"
          to="/user/register"
          target="_self"
        >
          <n-button type="info"> 注册 </n-button>
        </Llink>
      </n-gi>
      <n-gi
        span="0 m:3 l:3"
        :style="{ margin: '4px auto', display: auth == '' ? 'none' : 'unset' }"
      >
        <n-dropdown trigger="hover" :options="options" @select="avatar">
          <n-avatar round :size="36" src="/img/logo.png" />
        </n-dropdown>
      </n-gi>
      <n-gi span="4 m:1 l:1">
        <n-icon size="32">
          <n-button :style="{ margin: '4px' }" @click="activate()"
            ><Menu
          /></n-button>
        </n-icon>
      </n-gi>
    </n-grid>
    <n-drawer v-model:show="active" :width="384" :placement="placement">
      <n-drawer-content title="网站应用" closable>
          <n-collapse  arrow-placement="right" :default-expanded-names="['3']" accordion>

            <n-collapse-item name="1">
              <template #header> <n-icon></n-icon>文章归档 </template>
              <div>可以</div>
            </n-collapse-item>
            <n-collapse-item name="2">
              <template #header> <n-icon></n-icon>资源归档 </template>
              <div>很好</div>
            </n-collapse-item>
            <n-collapse-item name="3">
              <template #header> <n-icon></n-icon>最近评论 </template>
              <div>真棒</div>
            </n-collapse-item>
         </n-collapse>
    </n-drawer-content>
    </n-drawer>
  </n-flex>
</template>

<script setup lang="ts">
import type { DrawerPlacement } from "naive-ui";
import { defineComponent, ref, onMounted, h } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { Search, Menu } from "@vicons/ionicons5";
import Llink from "./LNuxtLink";
import type descriptionVue from "~/pages/description.vue";
const auth = useCookie("auth");
auth.value = auth.value || "";
const options = [
  {
    label: "编辑资料",
    key: "editData",
    disabled: true,
  },
  {
    label: "个人资料",
    key: "personData",
  },
  {
    label: "文章作品",
    key: "articleWork",
  },
  {
    label: "注销登录",
    key: "logout",
  },
];
function avatar(key: string) {
  if (key === "logout") {
    auth.value = "";
    navigateTo("/");
  } else if (key == 'personData') { 
    navigateTo("/user")
  } else {
    alert(key);
  }
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        Llink,
        {
          to: "/",
          target: "_self",
        },
        h("img", {
          src: "/img/logo.png",
          width: "40px",
          height: "40px",
        })
      ),
    key: "description",
  },
  {
    label: () =>
      h(
        Llink,
        {
          to: "/description",
          target: "_self",
          rel: "noopenner noreferrer",
          replace: true,
        },
        "个人介绍"
      ),
    key: "description",
  },
  {
    label: () =>
      h(
        Llink,
        {
          to: "/works",
          target: "_self",
          rel: "noopenner noreferrer",
          replace: true,
        },
        "作品展示"
      ),
    key: "works",
  },
  {
    label: () =>
      h(
        Llink,
        {
          to: "/articles",
          target: "_self",
          rel: "noopenner noreferrer",
          replace: true,
        },
        "文章归档"
      ),
    key: "articles",
  },
  {
    label: () =>
      h(
        Llink,
        {
          to: "/shares",
          target: "_self",
          rel: "noopenner noreferrer",
          replace: true,
        },
        "资源分享"
      ),
    key: "shares",
  },
  {
    label: () =>
      h(
        Llink,
        {
          to: "/connect",
          target: "_self",
          rel: "noopenner noreferrer",
          replace: true,
        },
        "联系交流"
      ),
    key: "connect",
  },
];
const active = ref(false);
const placement = ref<DrawerPlacement>("right");
const activate = () => {
  active.value = true;
};
</script>
