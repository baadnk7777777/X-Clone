<template>
  <q-layout view="lHr lpR fFf">
    <!-- Create Header Using q-header  -->

    <q-header bordered class="bg-white text-black"></q-header>

    <!-- Create sidebar Using q-drawer -->

    <q-drawer v-model="left" side="left" :width="283" bordered show-if-above>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Set up variable for keep status of the sidebar
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
