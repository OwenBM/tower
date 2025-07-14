<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ticketService } from '@/services/TicketService.js'
import { towerCommentService } from '@/services/TowerCommentService.js';


const route = useRoute()
const towerEvent = computed(() => AppState.towerEvent)
const ticketProfiles = computed(() => AppState.ticketProfiles)
const towerComments = computed(() => AppState.towerComments)
const hasTicket = computed(() => {
  return ticketProfiles.value.some(ticket => ticket.accountId === AppState.account?.id)
})

const editableCommentData = ref({
  body: '',
  eventId: route.params.towerEventId
})

async function getTowerEventById() {
  try {
    const towerEventId = route.params.towerEventId
    await towerEventService.getTowerEventbyId(towerEventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getTicketsbyEventId() {
  try {
    const towerEventId = route.params.towerEventId
    await ticketService.getTicketsbyEventId(towerEventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getCommentsByEventId() {
  try {
    const towerEventId = route.params.towerEventId
    await towerCommentService.getCommentsByEventId(towerEventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function cancelTowerEvent() {
  try {
    // logger.log('button works')
    const towerEventId = route.params.towerEventId
    // logger.log('button still works')
    await towerEventService.cancelTowerEvent(towerEventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function buyTicket() {
  try {
    const towerEventId = { eventId: route.params.towerEventId }
    await ticketService.buyTicket(towerEventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function createTowerComment() {
  try {
    await towerCommentService.createTowerComment(editableCommentData.value)
    editableCommentData.value.body = ''
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteTowerComment(towerCommentId) {
  const confirmed = await Pop.confirm('Are you sure you want to delete this comment?')
  if (!confirmed) return
  try {
    // logger.log('deleting comment!', towerCommentId)
    await towerCommentService.deleteTowerComment(towerCommentId)
  }
  catch (error) {
    Pop.error(error);
  }
}


onMounted(() => {
  getTowerEventById()
  getTicketsbyEventId()
  getCommentsByEventId()
})

</script>


<template>
  <section v-if="AppState.towerEvent">
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-10  my-5 ">
          <div :style="{ backgroundImage: `url(${towerEvent.coverImg})` }" class="cover-image rounded">
            <div v-if="AppState.towerEvent.isCanceled" class="cancel-overlay btn btn-danger ms-2 mt-2">
              event canceled!
            </div>
            <div v-if="towerEvent.capacity == ticketProfiles.length">
              <div class="btn btn-primary text-white ms-2 mt-2">Sold Out!</div>
            </div>
          </div>
          <!-- <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="cover-image rounded"> -->
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <h1>{{ towerEvent.name }}</h1>
              <div class="btn btn-grey text-primary fw-bold ms-3">{{ towerEvent.type }}</div>
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
        <div class="col-md-4">
          <div v-if="hasTicket">
            ticket bought!
          </div>
          <div v-if="AppState.account">
            <button @click="buyTicket()" class="btn btn-outline-primary me-3"
              :disabled="towerEvent.capacity <= ticketProfiles.length || AppState.towerEvent.isCanceled">
              Buy Ticket!
            </button>
            <button @click="cancelTowerEvent()" class="btn btn-outline-danger"> Cancel event </button>
          </div>
          <br>
          <div v-if="AppState.ticketProfiles">
            <h4>Attendees: {{ ticketProfiles.length }}/{{ towerEvent.capacity }}</h4>
            <div v-for="ticketProfile in ticketProfiles" :key="ticketProfile.id" class="small-card-thing">
              <div class="d-flex align-items-center p-2 lightest-blue-ever">
                <img class="attendee-picture" :src="ticketProfile.profile.picture" :alt="ticketProfile.profile.name">
                <div class="ms-3">{{ ticketProfile.profile.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="mt-5 mb-3">See what folks are saying...</h4>
      <div class="row">

        <form @submit.prevent="createTowerComment()">
          <div>
            <input type="text" width="48" height="48" class="me-2" v-model="editableCommentData.body"
              placeholder="Your comment...">
            <button type="submit" class="btn btn-success">Submit</button>
          </div>
        </form>

        <div v-for="towerComment in towerComments" :key="towerComment.id" class="col-8">
          <div class="row pt-2 shadow-bottom">
            <div class="d-flex">
              <img :src="towerComment.creator.picture" class="attendee-picture">
              <div class="ms-2 me-5">
                <div class="fw-bold mb-1">{{ towerComment.creator.name }}</div>
                <div>{{ towerComment.body }}</div>
              </div>
              <!-- <div v-if="towerComment.accountId == AppState.account?.id"> -->
              <button @click="deleteTowerComment(towerComment.id)" class="btn btn-danger"> Delete</button>
              <!-- </div> -->
            </div>
          </div>
        </div>
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

.attendee-picture {
  height: 45px;
  aspect-ratio: 1;
  border-radius: 50%;
}

.small-card-thing {
  width: 30vw;
}

// .comment-size {
//   height: 20vh;
//   width: 40vw
// }
</style>