<script lang="ts" setup>

const dishes = useState('dishes')
const config = useState<any>('config')
const timeout = 12*60*60*1000 // 12 hours in ms
const now = Date.now()

onMounted(()=>{

  const localDishesRaw = localStorage.getItem('dishes')
  const localConfigRaw = localStorage.getItem('config')
  const lastUpdateRaw = localStorage.getItem('lastUpdate')


  let shouldFetch = true
  
  if (localDishesRaw && lastUpdateRaw && localConfigRaw) {
    const lastUpdate = parseInt(lastUpdateRaw)
    if (now - lastUpdate < timeout) {
      try {
        dishes.value = JSON.parse(localDishesRaw)
        config.value = JSON.parse(localConfigRaw)
        shouldFetch = false
      } catch (e) {
        // fallback to fetch if parse fails
        console.log(e)
        shouldFetch = true
      }
    }
  }
  
  if (shouldFetch) {

    console.log("%c[DEBUG] Api call","color:orangered; font-size:3rem")
    callOnce('dishes', async () => {
      const _data = await $fetch('/api/dishes')
      const _config = await $fetch('/api/config')
      dishes.value = _data
      config.value = _config
      localStorage.setItem('dishes', JSON.stringify(_data))
      localStorage.setItem('config', JSON.stringify(_config))
      localStorage.setItem('lastUpdate', now.toString())
    })
  }
  console.log("DISHES",dishes.value);
})


</script>bebas

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
    <li v-for="(conf,c) in config" :key="c" class="flex font-[300] text-xl gap-2">
    <dt v-if="conf.key">{{ conf.key }} :</dt>

    <dl :class="{'mt-8':!conf.key}" class="font-bold">{{ conf.value }}</dl>
</li>
  </ul>
  </div>
    <div v-else class="w-screen h-screen flex items-center justify-center"><Loader class="w-2/3" /></div>
</template>
