<template>
  <div id="apogee">
    <h1 class="title is-1 has-text-centered">Apogee Determination</h1>
    
    <div class="field">
      <label class="label has-text-centered">Number of Flights</label>
      <div class="control has-text-centered">
        <div class="select">
          <select v-model="numberOfFlights">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
    </div>

    <div class="columns is-6 is-variable">
      <apogee-flight v-for="flight in 3" v-bind:key="flight" v-bind:flight-number="flight" 
          v-show="flight <= numberOfFlights" class="column" 
          v-bind:class="{ 'is-half is-offset-one-quarter': numberOfFlights == 1 }"></apogee-flight>
    </div>
  </div>
</template>

<script>
import ApogeeFlight from './ApogeeFlight'

export default {
  name: 'ApogeeDetermination',
  data: function() {
    return {
      numberOfFlights: 3
    }
  },
  components: {
    ApogeeFlight 
  }
}
</script>