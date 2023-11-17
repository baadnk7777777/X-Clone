<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title class="text-weight-bold">
          <!-- <span class="gt-sm">{{ $route.name }}</span> -->
          <span class="gt-sm">หน้าแรก</span>
          <q-icon
            class="header-icon q-pa-md lt-md"
            name="fas fa-dove"
            size="sm"
            color="primary"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" :width="283" bordered show-if-above>
      <q-list>
        <div class="flex q-pa-md">
          <q-img
            src="src/assets/twitter-logo.png"
            spinner-color="white"
            style="height: 30; max-width: 30px"
            fit="contain"
          />
        </div>
        <q-item to="/" v-ripple clickable exact>
          <q-item-section avatar>
            <q-icon name="home" size="sm" />
          </q-item-section>

          <q-item-section class="text-base text-weight-bold"
            >หน้าแรก</q-item-section
          >
        </q-item>

        <q-item to="/about" v-ripple clickable exact>
          <q-item-section avatar>
            <q-icon name="person" size="sm" />
          </q-item-section>

          <q-item-section class="text-base text-weight-bold"
            >ข้อมูลส่วนตัว</q-item-section
          >
        </q-item>

        <q-item @click="logout" v-if="userId" v-ripple clickable exact>
          <q-item-section avatar>
            <q-icon name="person" size="sm" />
          </q-item-section>

          <q-item-section class="text-base text-weight-bold">
            Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-input
        placeholder="Search Qwitter"
        class="q-ma-md"
        outlined
        rounded
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing happened!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing happened!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing happened!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouteName } from 'src/store/constants';
import { useRouter } from 'vue-router';

const left = ref(false);
const right = ref(false);
const router = useRouter();
const userId = ref('');
onMounted(() => {
  fetchUser();
});

const fetchUser = () => {
  userId.value = sessionStorage.getItem('userId')!;
};

const logout = () => {
  sessionStorage.clear();
  sessionStorage.removeItem('userId');
  console.log(sessionStorage.getItem('userId'));
  router.push('/');
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
