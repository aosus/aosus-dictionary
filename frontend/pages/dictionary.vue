<template>
  <div class="my-2 flex flex-col container">
    <h1 class="text-3xl px-6 mx-2 my-4">الكلمات</h1>
    <input
      type="text"
      v-model="searchWord"
      dir="rtl"
      placeholder="ابحث"
      class="card my-4 rounded-full block"
    />
    <div class="list-container">
      <div v-if="loading" class="no-items">
        <h1>يجري البحث</h1>
      </div>
      <div v-else-if="!itemsToDisplay.length" class="no-items">
        <h1>لا يوجد عناصر</h1>
      </div>
      <LazyList
        v-else
        :data="itemsToDisplay"
        :itemsPerRender="1"
        defaultLoadingColor="#56815b"
      >
        <template v-slot="{ item }">
          <div class="bg-transparent rounded mt-1 relative">
            <h1 class="text-4xl">
              <span v-text="item.key" class="underline" />
            </h1>
            <div class="card rounded-t-xl sticky top-0">
              <span>الكلمة</span>
              <span>المعنى</span>
            </div>
            <div
              class="card !bg-[#56815b] under-border last:rounded-b-xl"
              v-for="word in item.children"
              :key="word.word"
            >
              <span class="" v-html="word.word" />
              <span class="" v-html="word.translate" />
            </div>
          </div>
        </template>
      </LazyList>
    </div>
  </div>
</template>

<script>
import LazyList from "lazy-load-list/vue";
import words from "../../dictionary/techdict.json";
export default {
  components: { LazyList },
  data() {
    return {
      words,
      itemsToDisplay: [],
      cacheItem: {},
      searchWord: "",
      loading: false,
    };
  },
  watch: {
    async searchWord(v) {
      this.loading = true;
      await this.searchFunction(v);
      this.loading = false;
    },
  },
  created() {
    this.formatData(this.words);
  },
  methods: {
    async formatData(words) {
      words = words.reduce((result, item) => {
        // get first letter of name of current element
        item.word = item.word.trim();
        let group = item.word[0];
        // if there is no property in accumulator with this letter create it
        if (!result[group]) result[group] = { key: group, children: [item] };
        // if there is push current element to children array for that letter
        else result[group].children.push(item);
        // return accumulator
        return result;
      }, {});

      //
      let result = Object.values(words);
      this.itemsToDisplay = result;
      return result;
    },
    async searchFunction(word) {
      word = word.trim().toLowerCase();
      if (this.cacheItem[word]) {
        this.itemsToDisplay = this.cacheItem[word];
        console.log("cache");
        return;
      } else if (!word) {
        this.formatData(words);
        return;
      }

      const search = this.words.filter((item) => {
        item.word = item.word.toLowerCase().trim();
        item.translate = item.translate.toLowerCase().trim();
        return item.word.startsWith(word) || item.translate.startsWith(word);
      });

      this.cacheItem[word] = await this.formatData(search);
    },
  },
};
</script>

<style>
.card {
  @apply "flex px-6 py-2 bg-[#519259] text-white justify-between";
}

.under-border {
  border-bottom: #2c272e solid 0.1px;
}

.under-border:last-child {
  border: none;
}

.list-container {
  width: 100%;
  height: 400px;
}

.no-items {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #747474;
}
.list-container {
  overflow: hidden;
  border-radius: 0.75rem;
}
.list-container ::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
.list-container ::-webkit-scrollbar-thumb {
  background: #ff0000;
}
</style>
