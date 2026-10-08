<script lang="ts" setup>

const dishes = useState('dishes')
const config = useState<any>('config')
const timeout = 12*60*60*1000 // 12 hours in ms
const route=useRoute()
const forceReload = ref(route.query.reload||false)

onMounted(async ()=>{
  const now = Date.now()
  const localDishesRaw = localStorage.getItem('dishes')
  const localConfigRaw = localStorage.getItem('config')
  const lastUpdateRaw = localStorage.getItem('lastUpdate')

  let shouldFetch = true
  if (!forceReload.value && localDishesRaw && lastUpdateRaw && localConfigRaw) {
    const lastUpdate = parseInt(lastUpdateRaw)
    if (now - lastUpdate < timeout) {
      try {
        dishes.value = JSON.parse(localDishesRaw)
        config.value = JSON.parse(localConfigRaw)
        shouldFetch = false
      } catch (e) {
        console.error("Cache parse error", e)
        shouldFetch = true
      }
    }
  }
  
  if (shouldFetch) {
    try {
      const [data, cfg] = await Promise.all([
        $fetch('/api/dishes'),
        $fetch('/api/config')
      ])
      dishes.value = data
      config.value = cfg
      localStorage.setItem('dishes', JSON.stringify(data))
      localStorage.setItem('config', JSON.stringify(cfg))
      localStorage.setItem('lastUpdate', now.toString())
    } catch (e) {
      console.error("Fetch error", e)
    }
  }

  console.log("[DISHES]",dishes.value)
})


</script> 

<template>
  <div v-if="dishes " class="p-8">
  <Logo class="w-20" />
  <ul  class="flex flex-col gap-6 mt-8">
    <li v-for="(categories,c) in dishes" :key="c" class="mt-4 border-b border-primary-600 pb-4">
      <CategoryTitle :title="c" />
      <ol class="flex gap-4 flex-wrap flex-col md:flex-row mt-2">
      <li v-for="(dish,d) in categories" :key="d" class="">
        <DishCard :dish/>
      </li>
      </ol>

    </li>
  </ul>
  <ul class="mt-8 font-heading">
    <li class="font-bold text-3xl">Info utili</li>
    <li v-for="(conf,c) in config" :key="c" class="flex items-baseline font-[300]  gap-2">
    <dt v-if="conf.key" class="text-xl">{{ conf.key }} :</dt>

    <dl :class="{'mt-8':!conf.key}" class="font-medium font-sans">{{ conf.value }}</dl>
</li>
  </ul>
  </div>
    <div v-else class="w-screen h-screen flex items-center justify-center"><Loader class="w-2/3" /></div>
</template>
