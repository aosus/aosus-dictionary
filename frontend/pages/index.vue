<template>
  <div class="home-page container text-lg">
    <h1>
      أهلا بكم في معجم أسس التقني 
    </h1>
    <div class="flex justify-center items-center">
      <img src="../static/logo.png" alt="aosus">
      <h1>معجم أسس التقني</h1>
    </div>
    <div>
      <span class="flex justify-center">
        <nuxt-link class="button" to="/dictionary">انتقل الى المعجم</nuxt-link>
      </span>
    </div>
    <p>
      معجم أسس التقني؛ هو مصدرك لترجمة المصطلحات الإنجليزية التقنية إلى اللغة العربية، بطريقة مفهومة وسهلة على المستخدم العربي.

      تم بناء المشروع على قاموس "Arabeyes"، وهو تحت ترخيص FreeBSD Documentation License

      <br>
      <br>
      معجم أسس يعمل بطريقة مختلفة، بحيث انه بدلا من أخذ الترجمات من القواميس الأخرى.

      نأخذ الترجمة من أنظمة تم ترجمتها من شركات ذات موارد عالية، بحيث أن ترجمتهم عادة تكون احترافية ومفهومة للمستخدم.
    </p>

    <h1>
      كيف أشارك؟
    </h1>
    <p>
      اِشتق المستودع <span>(Fork)</span> ، ثم عدّل على ملف <span>dictionary/techdict.csv</span> بإضافة الكلمة الإنجليزية، الترجمة العربية لها والمصدر.

      بعد ذلك قدّم طلب دمج (Pull Request)؛ وسنراجع تعديلاتك في أقرب فرصة ممكنة.
    </p>
  </div>
</template>

<script>
export default {}
</script>
<style>
h1 {
  @apply text-2xl md:text-3xl py-5 px-2 md:px-0;
}
p {
  @apply px-10 my-8;
}
.button {
  @apply bg-[#2e303e] text-white rounded m-5 px-3 py-1.5;
}

</style>