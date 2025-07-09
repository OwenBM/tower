<script setup >
import TowerEventCard from '@/components/TowerEventCard.vue';
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';


async function getAllTowerEvents() {
    try {
      await towerEventService.getAllTowerEvents()
    }
    catch (error){
      Pop.error(error);
    }
}

onMounted(()=> {
    getAllTowerEvents()

})

const towerEvent = computed(()=> AppState.towerEvent)
</script>

<template>
  <div class="container">
    <div class="row">
      <h1>Upcoming Events</h1>
    </div>
    <div class="row my-3">
       <div class="col-md-3 mb-2" v-for="towerEvent in towerEvent" :key="towerEvent.id">
        <div class="d-flex justify-content-around">
          <TowerEventCard :towerEvent="towerEvent" />
        </div>
       </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>
