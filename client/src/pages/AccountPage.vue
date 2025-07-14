<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { ticketService } from '@/services/TicketService.js';
import TowerEventCard from '@/components/TowerEventCard.vue';
import { logger } from '@/utils/Logger.js';

const account = computed(() => AppState.account)
const ticketEvents = computed(() => AppState.ticketEvents)
onMounted(() =>
  getTicketsByAccount()
)


async function getTicketsByAccount() {
  try {
    await ticketService.getTicketsByAccount()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteTicket(ticketEventId) {
  const confirmed = await Pop.confirm('Are you sure you want to delete your ticket?')
  if (confirmed == false) return
  logger.log('deleting ticket for:', ticketEventId)
  await ticketService.deleteTicket(ticketEventId)
}
</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <h4 v-if="ticketEvents" class="mb-3">You have tickets for {{ ticketEvents.length }} events</h4>
      <h4 v-if="!ticketEvents" class="mb-3">You dont have any tickets!</h4>
      <div class="container">
        <div class="row">
          <div v-for="ticketEvent in ticketEvents" :key="ticketEvent.id" class="col-4 mb-3 text-start">
            <TowerEventCard :towerEvent="ticketEvent.towerEvent" />
            <button @click="deleteTicket(ticketEvent.id)" class="btn btn-danger">Delete Ticket</button>
          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
