<template>
  <q-page class="relative-position">
    <div class="q-pa-md">
      <q-input v-model="userId" label="Enter your userId" />
    </div>
    <div class="flex justify-center">
      <q-btn color="primary" @click="login" label="Login" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouteName } from 'src/store/constants';
const router = useRouter();
const userId = ref('');

const login = () => {
  console.log(userId.value);
  sessionStorage.setItem('userId', userId.value);
  router.push('/home');
};
</script>
