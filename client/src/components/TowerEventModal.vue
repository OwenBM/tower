<script setup>
import TowerEventForm from './TowerEventForm.vue';


</script>


<template>

<div class="modal fade" id="TowerEventModal" tabindex="-1" aria-labelledby="TowerEventLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="TowerEventLabel">Create an event</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <TowerEventForm/>
      </div>
      
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>

</style>