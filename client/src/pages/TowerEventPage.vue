<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const towerEvent = computed(() => AppState.towerEvent)

async function getTowerEventById(){
    try {
      const towerEventId = route.params.towerEventId
      await towerEventService.getTowerEventbyId(towerEventId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function cancelTowerEvent() {
  try {
    logger.log('button works')
    const towerEventId = route.params.towerEventId
    logger.log('button still works')
    await towerEventService.cancelTowerEvent(towerEventId)
  }
  catch (error) {
    Pop.error(error);
  }

}

onMounted(() => {
  getTowerEventById()
})
</script>


<template>
  <section v-if="AppState.towerEvent">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10  my-5 ">
          <div :style="{ backgroundImage: `url(${towerEvent.coverImg})` }" class="cover-image rounded">
            <div v-if="AppState.towerEvent.isCanceled" class="cancel-overlay btn btn-danger">
              event canceled!
            </div>
          </div>
          <!-- <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="cover-image rounded"> -->
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-10">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <h1>{{ towerEvent.name }}</h1>
              <div class="btn btn-grey text-primary fw-bold ms-3">{{ towerEvent.type }}</div>
            </div>
            <div class="">
              <button @click="cancelTowerEvent()" class="btn btn-danger"> CANCEL EVENT </button>
            </div>
          </div>
          <div>{{ towerEvent.description }}</div>
          <div>
            <br>
            <div class="fs-3">Date and Time</div>
            <div>{{ towerEvent.startDate }}</div>
          </div>
          <div>
            <div class="fs-3">Location</div>
            <div>{{ towerEvent.location }}</div>
          </div>
        </div>
        <!-- </div>
      <div class="row justify-content-center"> -->
      </div>
    </div>
  </section>
  <section v-else>
    <h1>Loading <span class="mdi mdi-loading mdi-spin"></span></h1>
  </section>
</template>


<style lang="scss" scoped>
.cover-image {
  height: 40vh;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.cancel-overlay {
  // margin-top: -4.2rem;
  cursor: default;
  // position: absolute;
  // bottom: 0;
  // left: 0
}
</style>