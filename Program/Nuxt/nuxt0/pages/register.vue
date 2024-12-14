<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

useHead({
  title: "登录",
});

// 定义页面布局
definePageMeta({
  layout: "blank",
});

const formRef = ref<FormInst>();
const model = ref({
  username: "",
  password: "",
  confirmPass: "",
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  confirmPass: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== model.value.password) {
          callback(new Error("两次输入的密码不一致"));
          return false;
        } else {
          callback();
          return true;
        }
      },
      trigger: ["blur", "input"],
    },
  ],
};

const store = useUser();
const register = () => {
  // 校验
  formRef.value!.validate(async (errors) => {
    if (!errors) {
      const { ok, data } = await httpPost("/api/register", {
        username: model.value.username,
        password: model.value.password,
      });
      if (ok) {
        console.log('register>login>data', data);
        console.log('store', store.userInfo)
        debugger;
        // 保存user状态

        store.userInfo = data;
        // 跳转首页
        navigateTo("/");
      }
    }
  });
};
</script>

<template>
  <h2 class="flex justify-between">
    <nuxt-link to="/register">
      <NButton quaternary type="primary" size="tiny"> 还未注册？ </NButton>
    </nuxt-link>
  </h2>

  <NAlert title="演示账号和密码为：test" type="info" class="mb-6" />

  <NForm ref="formRef" :model="model" :rules="rules" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput v-model:value="model.username" clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput v-model:value="model.password" clearable placeholder="密码" type="password" />
    </NFormItem>
    <NFormItem :show-label="false" path="confirmPass">
      <NInput v-model:value="model.confirmPass" clearable placeholder="确认密码" type="password" />
    </NFormItem>
    <div>
      <NButton class="w-full" type="primary" @click="register"> 登录 </NButton>
    </div>
  </NForm>
</template>

/** nuxtui实现 */
<!-- <script setup lang="ts">
useHead({
  title: '注册',
})

definePageMeta({
  layout: 'blank',
})

const formRef = ref()
const state = ref({
  username: '',
  password: '',
  confirmPass: ''
})
const toast = useToast()
let validate = (state: any): FormError => {
  const errors = [];
  if (!state.username) {
    errors.push({
      path: "username",
      message: "用户名不能为空",
    });
  }

  if (!state.password) {
    errors.push({
      path: "password",
      message: "密码不能为空",
    });
  }

  if (!state.confirmPass) {
    errors.push({
      path: "confirmPass",
      message: "确认密码不能为空",
    });
  }

  if (state.password !== state.confirmPass) {
    errors.push({
      path: "confirmPass",
      message: "两次密码不一致",
    });
  }
  return errors;
};


const onSubmit = (event) => {
  console.log('onsubmit', event)
  const errors = validate(state.value);
  if (errors.length) {
    formRef.value.setErrors(errors);
    return;
  }
  console.log('submit', state.value)
  const { username, password } = state.value;
  let ok, data;
  try {
    let res = httpPost('/api/register', {
      username,
      password
    })

    ok = res.ok
    data = res.data

    if (ok) {
      // 
    }
  } catch(err) {
    console.log('register/error: ', err)
    toast({
      title: '注册失败',
      description: err
    })
  }
}

</script>

<template>
  <h2>加入羊群</h2>
  <UForm :state="state" @submit="onSubmit" ref="formRef" class="w-[340px]">
    <UFormGroup :show-label="false" name="username">
      <UInput v-model="state.username" clearable placeholder="用户名" color="gray" class="py-1" icon="i-heroicons-user-16-solid"/>
    </UFormGroup>
    <UFormGroup :show-label="false" name="password">
      <UInput v-model="state.password" clearable placeholder="密码" type="password" class="py-1" icon="i-solar-lock-password-bold" color="gray"/>
    </UFormGroup>
    <UFormGroup :show-label="false" name="confirmPass">
      <UInput v-model="state.confirmPass" clearable placeholder="确认密码" type="password" class="py-1" icon="i-solar-lock-password-bold" color="gray"/>
    </UFormGroup>

      <UButton class="w-full justify-center mt-2" type="primary" >
        登录
      </UButton>
    <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
      注册即同意
      <UButton quaternary type="primary" :padded="false" size="2xs">
        《服务协议》
      </UButton>
      和
      <UButton quaternary type="primary" :padded="false" size="2xs">
        《隐私政策》
      </UButton>
    </div>
  </UForm>
</template> -->
