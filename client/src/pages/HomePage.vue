<script setup >
import TowerEventCard from '@/components/TowerEventCard.vue';
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import TowerEventModal from '@/components/TowerEventModal.vue';
import { logger } from '@/utils/Logger.js';


const towerEvents = computed(() => {
  if (selectedType.value == 'all') {
    return AppState.towerEvents
  }
  const filertedEvents = AppState.towerEvents.filter(towerEvent => towerEvent.type == selectedType.value)
  logger.log('computed appstate', filertedEvents)
  return filertedEvents
})

const selectedType = ref('all')
const filterTypes = [
  {
    type: 'all',
    symbolClassing: 'mdi mdi-all-inclusive text-green'
  },
  {
    type: 'concert',
    symbolClassing: 'mdi mdi-guitar-electric text-purple'
  },
  {
    type: 'convention',
    symbolClassing: 'mdi mdi-account-group text-blue'
  },
  {
    type: 'sport',
    symbolClassing: 'mdi mdi-soccer text-blue'
  },
  {
    type: 'digital',
    symbolClassing: 'mdi mdi-monitor text-orange'
  },
]

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




</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        <h3 class="col-12 fw-bold">How Tower Works</h3>
        <div class="row">
          <div class="col-md-6 d-flex justify-content-center mb-2 mb-md-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><span class="mdi mdi-magnify text-green fs-4"></span>Discover Events you're
                  interested in</h5>
                <div class="card-text-size">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, distinctio?
                  Sapiente consequuntur amet sit officiis.
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex justify-content-center mb-2 mb-md-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><span class="mdi mdi-plus text-green fs-4"></span>Start an event to invite your
                  friends</h5>
                <div class="card-text-size">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, distinctio?
                  Sapiente consequuntur amet sit officiis.
                </div>
                <button class="btn btn-white card-text-size text-green fw-bold" data-bs-toggle="modal"
                  data-bs-target="#TowerEventModal">
                  Create an event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row my-5">
        <div class="col-12">
          <h3 class="fw-bold">Explore top categories</h3>
        </div>
        <div class="row justify-content-center mt-4">
          <div v-for="filterType in filterTypes" :key="filterType.type" class="col-md-2">
            <div @click="selectedType = filterType.type" class="text-center lightest-blue-ever rounded p-2">
              <h3 :class="filterType.symbolClassing"></h3>

              <div>{{ filterType.type.toLocaleUpperCase() }}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row">
        <h3 class="fw-bold">Upcoming Events</h3>
      </div>
      <div class="row my-3">
        <div class="col-md-3 mb-2" v-for="towerEvent in towerEvents" :key="towerEvent.id">
          <div class="d-flex justify-content-around">
            <TowerEventCard :towerEvent="towerEvent" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <TowerEventModal />
</template>

<style scoped lang="scss">
.card-text-size {
  font-size: small;
}

.lightest-blue-ever {
  background-color: #f8f6ff;
  cursor: pointer;
}

</style>
