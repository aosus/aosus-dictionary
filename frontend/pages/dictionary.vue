<template>
  <div class="my-2 flex flex-col container">
    <h1 class="text-3xl px-6 mx-2 my-4">الكلمات</h1>
    <input
      type="text"
      v-model="searchWord"
      dir="auto"
      placeholder="ابحث"
      class="card my-4 rounded-full block outline-solid-current"
    />
    <div v-for="group in wordGroup" :key="group.key">
      <h1 dir="ltr" class="text-4xl">
        <span v-text="group.key" class="underline" />
      </h1>
      <div class="bg-[#053B06] rounded mt-1">
        <div dir="ltr" class="card rounded mb-1 ">
          <span>المعنى</span> <span>الكلمة</span>
        </div>
        <div
          dir="ltr"
          v-for="child in group.children"
          :key="child.word"
          class="card !bg-[#0B5D1E] under-border"
        >
          <span class="" v-text="child.word" />
          <span class="" v-text="child.translate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import words from "../../dictionary/techdict.json";
export default {
  data() {
    return {
      words,
      searchWord: "",
    };
  },
  computed: {
    wordGroup() {
      let words = this.words.filter(
        (word) =>
          word.word.includes(this.searchWord) ||
          word.translate.includes(this.searchWord)
      );
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
      return data;
    },
  },
};
</script>

<style>
.card {
  @apply "flex px-6 py-2 bg-[#053B06] text-white justify-between";
}

.under-border {
  @apply "border-b-black border-solid border-b";
}
</style>