<template>
  <div class="my-2 flex flex-col container">
    <h1 class="text-3xl px-6 mx-2 my-4">الكلمات</h1>
    <input
      type="text"
      v-model="searchWord"
      @input="softWord"
      dir="auto"
      placeholder="ابحث"
      class="card my-4 rounded-full block"
    />
    <virtual-list
      data-key="key"
      :keeps="30"
      :data-sources="wordGroup"
      :data-component="GroubWord"
    />
  </div>
</template>

<script>
import words from "../../dictionary/techdict.json";
import VirtualList from "vue-virtual-scroll-list";
import GroubWord from "../components/groubWord.vue";
export default {
  mounted() {
    this.softWord();
  },
  data() {
    return {
    GroubWord,
      words,
      searchWord: "",
      wordGroup: [],
      cache: {},
    };
  },
  methods: {
    softWord() {
      this.wordGroup = {};
      if (this.cache[this.searchWord] !== undefined) {
        this.wordGroup = this.cache[this.searchWord];
      }

      let words = this.words.filter((word) => {
        let searchWord = this.searchWord.toLowerCase();
        let isWord = word.word.toLowerCase().startsWith(searchWord);
        let isTranslate = word.translate
          .toLowerCase()
          .startsWith(this.searchWord);

        return isWord || isTranslate;
      });

      let data = words.reduce((result, item) => {
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

      this.cache[this.searchWord] = Object.values(data);
      this.wordGroup = Object.values(data);
    },
  },
  components: {
    'virtual-list': VirtualList,
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
</style>