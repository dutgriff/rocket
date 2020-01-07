<template>
  <div class="apogee-flight">
    <div class="message is-dark">
      <div class="message-header is-block">
        <h3 class="title is-3 has-text-centered has-text-white">Flight {{ flightNumber }} </h3>
      </div>
      <div class="message-body">
        <div v-for="(trackingStation, index) in trackingStations" v-bind:key="index"
            class="message-body-section">
          <h4 class="title is-4 has-text-centered">Tracking Station {{ index + 1 }}</h4>
          <div class="has-text-centered">
            <label class="checkbox" v-if="index != 0">
              <input type="checkbox" v-model="trackingStation.disabled">
              station not available
            </label>
          </div>
          <div  v-show="! trackingStation.disabled">
            <label class="label">Distance to Station</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" type="number" v-bind:min="minDistance" v-bind:max="maxDistance"
                    v-model.number="trackingStation.distance">
              </div>
              <div class="control">
                <a class="button is-static">
                  m
                </a>
              </div>
            </div>
            <label class="label">Angle at Station</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" type="number" v-bind:min="minAngle" v-bind:max="maxAngle" 
                    v-model.number="trackingStation.angle">
              </div>
              <div class="control">
                <a class="button is-static">
                  °
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="notification is-info has-text-centered">
      <span v-if="awaitingInput">
          Enter information above.
      </span>
      <span v-else class="has-text-weight-bold is-size-5">
        Apogee: {{ apogee }}m
      </span>
    </div>
  </div>
</template>

<script>
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

export default {
  name: 'ApogeeFlight',
  data: function() {
    return {
      trackingStations: [
        { distance: 0, angle: 0 },
        { distance: 0, angle: 0, disabled: false }
      ],
      minDistance: 1,
      maxDistance: 1000,
      minAngle: 10,
      maxAngle: 89
    }
  },
  props: ['flightNumber'],
  computed: {
    awaitingInput: function() {
      if(this.trackingStations[1].disabled)
        return !this.distanceIsAcceptable(this.trackingStations[0].distance) ||
            !this.angleIsAcceptable(this.trackingStations[0].angle)
      else
        return !this.distanceIsAcceptable(this.trackingStations[0].distance) || 
            !this.angleIsAcceptable(this.trackingStations[0].angle) ||
            !this.distanceIsAcceptable(this.trackingStations[1].distance) ||
            !this.angleIsAcceptable(this.trackingStations[1].angle)
    },
    apogee: function() {
      if(this.trackingStations[1].disabled)
        return Math.round(Math.tan(degreesToRadians(this.trackingStations[0].angle)) * this.trackingStations[0].distance)
      else
        return Math.round(( this.trackingStations[0].distance + this.trackingStations[1].distance ) * 
          Math.sin(degreesToRadians(this.trackingStations[0].angle)) * Math.sin(degreesToRadians(this.trackingStations[1].angle))
          / 
          Math.sin( Math.PI - degreesToRadians(this.trackingStations[0].angle) - degreesToRadians(this.trackingStations[1].angle)))
    }
  },
    methods: {
      angleIsAcceptable: function(angle) {
        return angle >= this.minAngle && angle <= this.maxAngle;
      },

      distanceIsAcceptable: function(distance) {
        return distance >= this.minDistance && distance <= this.maxDistance;
      }
    }
}
</script>
