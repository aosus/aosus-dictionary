<template>
  <div>
    <h1 dir="ltr" class="text-4xl">
      <span v-text="source.key" class="underline" />
    </h1>
    <div class="bg-transparent rounded mt-1">
      <div dir="ltr" class="card rounded-t-xl">
        <span>المعنى</span> <span>الكلمة</span>
      </div>
      <div
        dir="ltr"
        v-for="child in source.children"
        :key="child.word"
        class="card !bg-[#56815b] under-border last:rounded-b-xl"
      >
        <span class="" v-html="child.word" />
        <span class="" v-html="child.translate" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>