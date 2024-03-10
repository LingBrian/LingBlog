<template>
  <n-flex vertical>
    <h1 :style="{ margin: '50px  auto' }">登录账户</h1>
    <n-form
      ref="formRef"
      :disabled="form"
      :style="{ width: '400px', margin: 'auto' }"
      :label-width="80"
      label-placement="top"
      :model="formValue"
      :rules="rules"
      size="large"
    >
      <n-form-item label="用户名" path="user.name">
        <n-input v-model:value="formValue.user.name" placeholder="账户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="formValue.password"
          placeholder="密码"
        />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">
          登录
        </n-button>
      </n-form-item>
    </n-form>
  </n-flex>
</template>
<script lang="ts">
import { type FormInst, type FormItemInst } from "naive-ui";
definePageMeta({
  key: (route) => route.fullPath,
});

useHeadSafe({ title: "登录页面" });

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null);
    const form = ref(false);
    const formValue = ref({
      user: {
        name: "",
        email: "",
      },
      password: "",
    });
    return {
      formRef,
      form,
      formValue,
      rules: {
        user: {
          name: {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        },
        password: {
          required: true,
          message: "请输入8-16位，至少包含字母、数字、特殊字符的密码",
          trigger: ["input"],
          pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{8,16}$/,
          range: { min: 8, max: 16 },
        },
      },
      handleValidateClick(e: MouseEvent) {
        form.value = true;
        e.preventDefault();
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            const { data: result } = await useFetch("/api/user/login", {
              method: "post",
              body: {
                name: formValue.value.user.name,
                password: formValue.value.password,
              },
            });
            if (result.value?.status == 0) {
              alert("登录成功");
              const auth = useCookie("auth", { maxAge: 60 * 30 });
              auth.value = result.value.cookie;
              navigateTo("/user");
            } else if (result.value?.status == 2) {
              alert("用户名不存在");
              form.value = false;
            } else {
              alert(result.value + "密码错误");
              form.value = false;
            }
          } else {
            form.value = false;
            console.log(errors);
            alert("Invalid");
          }
        });
      },
    };
  },
});
</script>
