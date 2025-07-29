<script setup lang="ts">
const props = defineProps<{dish:any}>()
const formattedPrice = computed(()=>{
  const _f = new Intl.NumberFormat('it-IT',{
    style: "currency",
    currency:"EUR",
    maximumFractionDigits:2
  })

  return _f.format(props.dish.price)
})
</script>
<template>
  <div class="w-full md:w-64 h-full p-4 bg-primary shadow-lg border border-primary-600 rounded-md">
  <div class="flex justify-between items-baseline">
    <h2 class="font-bold flex-grow text-balance font-heading text-lg">{{ dish.name }}</h2>
    <p class="flex-none">{{ formattedPrice }}</p>
  </div>
    <div class="text-sm text-neutral-500">{{ dish.description }}</div>
  </div>
</template>


<style>

</style>