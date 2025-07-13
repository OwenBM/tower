<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';



const ticketProfiles = computed(() => AppState.ticketProfiles)
defineProps ({towerEvent: Object})
</script>


<template>
    <div class="card card-width mx-1">
        <RouterLink :to="{ name: 'EventPage', params: { towerEventId: towerEvent.id } }">
            <!-- got a bit too creative -->
            <!-- <div :style="{ backgroundImage: `url(${towerEvent.coverImg})` }" class="card-img-top other-event-img">
                test
            </div> -->
            <img :src="towerEvent.coverImg" class="card-img-top event-img" alt="...">
            <div class="card-body">
                <div v-if="towerEvent.isCanceled" class="cancel-overlay btn btn-danger mb-2">
                    event canceled!
                </div>
                <div v-if="towerEvent.capacity == ticketProfiles.length" class="btn btn-primary text-white">
                    sold out
                </div>
                <h5 class="card-title">{{ towerEvent.name }}</h5>
                <div class="card-text">
                    <div v-if="towerEvent.creator">Event by: {{ towerEvent.creator.name }} </div>
                    <div>{{ towerEvent.startDate }}</div>
                    <div>{{ towerEvent.location }}</div>
                    <div>{{ towerEvent.capacity }} attending</div>
                </div>
            </div>
        </RouterLink>
    </div>
</template>


<style lang="scss" scoped>
.event-image {
    object-fit: cover;
}

.other-event-image {
    height: 20vh !important;
}
.card-width{
width: 18rem
}
a{
    text-decoration: none;
    color: var(--bs-black)
}
</style>