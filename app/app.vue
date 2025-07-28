<script lang="ts" setup>

const dishes = useState('dishes')

callOnce('dishes',async ()=>{
 dishes.value= await $fetch('/api/dishes')

})
console.log("DISHES",dishes.value);

</script>bebas

<template>
  <div class="p-8">
  <Logo class="w-20" />
    <ul v-if="dishes" class="flex flex-col gap-6 mt-8">
      <li v-for="(categories,c) in dishes" :key="c" class="mt-4 border-b border-neutral-300 pb-4">
        <CategoryTitle :title="c" />
        <ol class="flex gap-4 flex-wrap flex-col md:flex-row mt-2">
        <li v-for="(dish,d) in categories" :key="d" class="">
          <DishCard :dish/>
        </li>
        </ol>

      </li>
    </ul>
    <div v-else class="text-4xl text-red-500">Loading</div>
  </div>
</template>
