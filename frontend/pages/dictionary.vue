<template>
  <div class="my-2 flex flex-col container">
    <h1 class="text-3xl px-6 mx-2 my-4">الكلمات</h1>
    <input
      type="text"
      v-model="searchWord"
      dir="auto"
      placeholder="ابحث"
      class="card my-4 rounded-full block"
    />
    <div class="list-container">

      <h1 v-if="itemsToDisplay[0]" dir="ltr" class="text-4xl">
        <span v-text="itemsToDisplay[0].word[0].toUpperCase()" class="underline" />
      </h1>

      <div v-if="!itemsToDisplay.length" class="no-items">
        <h1>لا يوجد عناصر</h1>
      </div>
      
      <LazyList v-else :data="itemsToDisplay" :itemsPerRender="30" :key="itemsToDisplay.length" defaultLoadingColor="#56815b">
        <template v-slot="{item}">
          <div class=" bg-transparent rounded mt-1">
            <!-- <div dir="ltr" class="card rounded-t-xl">
              <span>المعنى</span> <span>الكلمة</span>
            </div> -->
            <div
              dir="ltr"
              class="card !bg-[#56815b] under-border last:rounded-b-xl"
            >
              <span class="" v-html="item.word" />
              <span class="" v-html="item.translate" />
            </div>
          </div>
        </template>
      </LazyList>
    </div>
  </div>
</template>

<script>
import LazyList from 'lazy-load-list/vue'
import words from "../../dictionary/techdict.json";
export default {
  components:{LazyList},
  data() {
    return {
      words,
      wordGroup: [],
      itemsToDisplay: [],
      searchWord: ""
    };
  },
  watch:{
    searchWord(v){
      this.searchFunction(v)
    }
  },
  created(){
    this.formatData()
    this.itemsToDisplay = [...this.wordGroup]
  },
  // computed: {
  //   wordGroup() {
  //     let words = this.words.filter(
  //       (word) =>
  //         word.word.includes(this.searchWord) ||
  //         word.translate.includes(this.searchWord)
  //     );
  //     let data = words.reduce((result, item) => {
  //       // get first letter of name of current element
  //       item.word = item.word.trim();
  //       let group = item.word[0];
  //       // if there is no property in accumulator with this letter create it
  //       if (!result[group]) result[group] = { key: group, children: [item] };
  //       // if there is push current element to children array for that letter
  //       else result[group].children.push(item);
  //       // return accumulator
  //       return result;
  //     }, {});
  //     return data;
  //   },
  // },
  methods:{
    formatData(){
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
      this.wordGroup = words
    },
    searchFunction(word){
      if(!word){
        this.itemsToDisplay = [...this.wordGroup]
        return
      }
      const afterSearch = this.wordGroup.filter(item => item.word.toLowerCase().includes(word.toLowerCase()) || item.translate.toLowerCase().includes(word.toLowerCase()))
      this.itemsToDisplay = afterSearch
    },
  }
};
</script>

<style>
.card {
  @apply "flex px-6 py-2 bg-[#519259] text-white justify-between";
}

.under-border {
  border-bottom: #2C272E solid 0.1px;
}

.under-border:last-child {
  border: none;
}

.list-container{
  width: 100%;
  height: 400px;
}

.no-items{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #747474;
}
</style>