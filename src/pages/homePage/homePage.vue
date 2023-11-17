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
                <img src="src\assets\blank-profile.png" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="handleCreateContent"
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
          <q-item
            v-for="qweet in qweets"
            :key="qweet.userId"
            class="qweet q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="src\assets\blank-profile.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>{{ userId }}</strong>
                <span class="text-grey-7">
                  @{{ userId }} <br class="lt-md" />&bull;
                  {{ qweet.date.toDate().toDateString() }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">{{
                qweet.content
              }}</q-item-label>
              <div class="row justify-end q-mt-sm">
                <q-btn
                  @click="handleDeleteClick(qweet.documentId)"
                  v-if="qweet.userId == userId"
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
import { ref, onMounted } from 'vue';
import {
  createContent,
  deleteContent,
  readAllContent,
} from 'src/boot/firebaseAPIService';
import { Content } from 'src/data/models/contentModel';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'src/boot/firebase';

const qweets = ref<Content[]>([]);
const newQweetContent = ref('');
const userId = ref('');

const fetchContent = async () => {
  qweets.value = await readAllContent();
};

onMounted(() => {
  setupContentListener();
  fetchContent();
  fetchUser();
});

const fetchUser = () => {
  userId.value = localStorage.getItem('userId')!;
};

const setupContentListener = (): Content[] => {
  try {
    const contentArray: Content[] = [];
    const contentCollection = collection(db, 'contents');
    const contentSubscribe = onSnapshot(contentCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc;
        const contentData: Content = doc.data() as Content;
        contentData.documentId = doc.id;
        if (change.type === 'added') {
          handleCreateContentListener(contentData);
        } else if (change.type === 'removed') {
          fetchContent();
        }
      });
    });

    return contentArray;
  } catch (error) {
    return [];
  }
};

const handleCreateContentListener = async (newContent: Content) => {
  try {
    qweets.value.push(newContent);
    qweets.value = qweets.value.slice().sort((a, b) => {
      return b.date.toMillis() - a.date.toMillis();
    });
  } catch (error) {
    console.error('Error handling content listener:', error);
  }
};

const handleCreateContent = () => {
  if (newQweetContent.value == '' && userId.value != null) return;
  createContent(Number(userId.value), newQweetContent.value);
  console.log('userId: ' + userId.value);
  newQweetContent.value = '';
};

const handleDeleteClick = async (documentId: string) => {
  console.log('Deleting content: ' + documentId);
  await deleteContent(documentId);
};
</script>
