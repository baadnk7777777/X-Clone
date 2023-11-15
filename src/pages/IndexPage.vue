<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newQweetContent"
            class="new-qweet"
            placeholder="มีอะไรเกิดขึ้นบ้าง"
            maxlength="280"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://s.gravatar.com/avatar/ce7f3697e231df38b3ca6065848520da?s=80"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="handleCommentClick"
            class="q-mb-lg"
            color="primary"
            label="โพสต์"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>

      <q-separator class="divider" color="grey-2" size="10px" />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="qweet in qweets" :key="qweet.id" class="qweet q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://s.gravatar.com/avatar/ce7f3697e231df38b3ca6065848520da?s=80"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Name of post</strong>
                <span class="text-grey-7">
                  @accountName
                  <br class="lt-md" />&bull; {{ qweet.date }}
                </span>
                <span v-if="qweet.id == 1" class="text-blue-500"> Edit </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">{{
                qweet.content
              }}</q-item-label>
              <div class="row justify-end q-mt-sm">
                <q-btn
                  v-if="qweet.id == 1"
                  flat
                  rounded
                  color="gray"
                  icon="delete"
                  class="text-gray-500"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
// import { fetchUsers } from 'src/boot/firebaseAPIService';
import { ref, onMounted } from 'vue';
// const msg = 'Hello!';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'boot/firebase';
import {
  createUser,
  createUserRealtime,
  readUserData,
  setupRealtimeListener,
} from 'src/boot/firebaseAPIService';

onMounted(() => {
  // createUserRealtime();
  setupRealtimeListener();
  const data = readUserData();
  console.log(data);
  // const data = fetchUsers();
  // console.log(data);
});
const newQweetContent = '';
const qweets = [
  {
    id: 1,
    content: "Be your own hero, it's cheaper than a movie ticket.",
    date: 1611653238221,
    liked: false,
  },
  {
    id: 2,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat justo id viverra consequat. Integer feugiat lorem faucibus est ornare scelerisque. Donec tempus, nunc vitae semper sagittis, odio magna semper ipsum, et laoreet sapien mauris vitae arcu.',
    date: 1611653252444,
    liked: true,
  },
  {
    id: 1,
    content: "Be your own hero, it's cheaper than a movie ticket.",
    date: 1611653238221,
    liked: false,
  },
  {
    id: 1,
    content: "Be your own hero, it's cheaper than a movie ticket.",
    date: 1611653238221,
    liked: false,
  },
  {
    id: 1,
    content: "Be your own hero, it's cheaper than a movie ticket.",
    date: 1611653238221,
    liked: false,
  },
];

const handleCommentClick = () => {
  createUserRealtime('Tanakan');
  // Handle comment click logic
  // fetchUsers();
};

// const handleRetweetClick = () => {
//   // Handle retweet click logic
// };

// const handleLikeClick = (qweet: any) => {
//   // Handle like click logic
// };

// const handleDeleteClick = (qweet: any) => {
//   // Handle delete click logic
// };
</script>
