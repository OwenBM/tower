<script setup>
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
async function getTowerEventById(){
    try {
      const response = await towerEventService.getTowerEventbyId(route.params.towerEventId)
    }
    catch (error){
      Pop.error(error);
    }
}

onMounted(()=>{
    getTowerEventById()
})
</script>


<template>
event page!
</template>


<style lang="scss" scoped>

</style>