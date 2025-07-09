<script setup>

defineProps ({towerEvent: Object})
</script>


<template>
    <div class="card card-width mx-1">
        <RouterLink :to="{name: 'EventPage', params: {towerEventId: towerEvent.id}}">
                <img :src="towerEvent.coverImg" class="card-img-top event-img" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ towerEvent.name }}</h5>
                    <div class="card-text">
                        <div>Event by: {{ towerEvent.creator.name }} </div>
                        <div>{{ towerEvent.startDate }}</div>
                        <div>{{ towerEvent.location }}</div>
                        <div>{{ towerEvent.capacity }} attending</div>
                    </div>
            </div>
        </RouterLink>
    </div>
</template>


<style lang="scss" scoped>

// .event-image{
//     object-fit: cover;
// }
.card-width{
width: 18rem
}
a{
    text-decoration: none;
    color: var(--bs-black)
}
</style>