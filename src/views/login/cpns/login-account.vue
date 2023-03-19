<template>
  <div>
    <el-form
      :rules="rules"
      :model="account"
      status-icon
      label-width="60px"
      class="demo-ruleForm"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input type="" autocomplete="off" v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input show-password autocomplete="off" v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import type { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    //获取vuex里的store
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // console.log('真正执行登录逻辑')
          //1.判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            console.log(account.name)

            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          //2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped></style>
