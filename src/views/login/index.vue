<!-- 登录页面 -->
<template>
    <div>本页面为登录页面</div>
    <div class="login-register">
    <div v-if="!userStore.isAuthenticated">
      <!-- 登录表单 -->
      <div v-if="showLoginForm">
        <h2>登录</h2>
        <form @submit.prevent="login">
          <label for="email">邮箱:</label>
          <input v-model="loginForm.email" type="text" required />
          <label for="password">密码:</label>
          <input v-model="loginForm.password" type="password" required />
          <button type="submit">登录</button>
        </form>
        <p @click="toggleForm">没有账户？点击注册</p>
      </div>
      <!-- 注册表单 -->
      <div v-else>
        <h2>注册</h2>
        <form @submit.prevent="register">
          <label for="email">邮箱:</label>
          <input v-model="registerForm.email" type="text" required />
          <div class="verification-code">
            <label for="verificationCode">验证码:</label>
            <input v-model="registerForm.verificationCode" type="text" required />
            <button @click.prevent="sendVerificationCode" style="color: white;">发送验证码</button>
          </div>

          <label for="password">输入密码:</label>
          <input v-model="registerForm.password" type="password" required />

          <label for="confirmPassword">确认密码:</label>
          <input v-model="registerForm.confirmPassword" type="password" required />

          <button type="submit">注册</button>
        </form>
        <p @click="toggleForm">已有账户？点击登录</p>
      </div>
    </div>
    <div v-else>
      <p>欢迎，{{ userStore.userInfo.email }}！</p>
      <button @click="logout">退出登录</button>
    </div>
  </div>






</template>

<script setup>
import router from "@/router/index.js"
import { useUserStore } from '@/store/user';
import { onMounted,ref } from 'vue'

const showLoginForm = ref(true);
const userStore = useUserStore();

const loginForm = {
  email: '',
  password: '',
};

const registerForm = {
  email: '',
  password: '',
};

const login = () => {
  // 实现登录逻辑
  userStore.login(loginForm.email, loginForm.password);
  
};

const sendVerificationCode = () => {
  userStore.sendVerificationCode(registerForm.email);
};

const register = () => {
  // 实现注册逻辑
  userStore.register(registerForm.email, registerForm.password);
};

const logout = () => {
  // 实现退出登录逻辑
  userStore.logout();
};

const toggleForm = () => {
  showLoginForm.value = !showLoginForm.value;
};







onMounted(() => {
    userStore.clearUserInfo()
});


</script>

<style scoped>

</style>