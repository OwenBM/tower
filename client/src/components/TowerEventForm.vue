<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const newTowerEventData = ref({
    name:'',
    type:'',
    description: '',
    capacity: '',
    location: '',
    startDate:'',
    coverImg: '',
})

const typetypes = ['concert', 'convention', 'sport', 'digital']

async function createNewTowerEventForm(){
    try {
        // logger.log('hehehe', newTowerEventData.value)
        const fancySchmancyNewEvent = await towerEventService.createNewTowerEventForm(newTowerEventData.value)
        // await towerEventService.createNewTowerEventForm(newTowerEventData.value)


    newTowerEventData.value =({
        name:'',
        type:'',
        description: '',
        capacity: '',
        location: '',
        startDate:'',
        coverImg: '',
    })

    
    Modal.getOrCreateInstance('#TowerEventModal').hide()
        router.push({ name: 'EventPage', params: { towerEventId: fancySchmancyNewEvent.id } })
    }catch (error){
      Pop.error(error);
      logger.error('Could not create event', error)
    }
}
</script>


<template>
    <form @submit.prevent="createNewTowerEventForm()">
        <div class="mb-3">
            <label for="towerEvent-name" class="form-label">Name of Event</label>
            <input v-model="newTowerEventData.name" type="text" class="form-control" id="towerEvent-name">
        </div>
        <div class="mb-3">
            <label for="towerEvent-type" class="form-label">Type of Event</label>
            <select v-model="newTowerEventData.type" type="select" class="form-select" placeholder="Select a type!"
                id="towerEvent-type">
                <option v-for="type in typetypes" :key="`TowerEvent-form-${type}`">
                    {{ type }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="towerEvent-description" class="form-label">Description</label>
            <input v-model="newTowerEventData.description" type="text" class="form-control" id="towerEvent-description">
        </div>
        <div class="mb-3">
            <label for="towerEvent-capacity" class="form-label">Capacity</label>
            <input v-model="newTowerEventData.capacity" type="number" class="form-control" id="towerEvent-capacity">
        </div>
        <div class="mb-3">
            <label for="towerEvent-location" class="form-label">Location</label>
            <input v-model="newTowerEventData.location" type="text" class="form-control" id="towerEvent-location">
        </div>
        <div class="mb-3">
            <label for="towerEvent-startDate" class="form-label">Date</label>
            <input v-model="newTowerEventData.startDate" type="date" class="form-control" id="towerEvent-startDate">
        </div>
        <div class="mb-3">
            <label for="towerEvent-coverImg" class="form-label">Cover Image</label>
            <input v-model="newTowerEventData.coverImg" type="url" class="form-control" id="towerEvent-coverImg">
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Create event</button>
        </div>
    </form>
</template>


<style lang="scss" scoped>

</style>