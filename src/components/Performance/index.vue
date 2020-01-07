<template>
  <div id="performance-prediction">
    <h1 class="title is-1 has-text-centered">Performance Prediction</h1>
    <div class="columns is-centered">
      <div class="column is-3">
        <label class="label">Rocket Diameter</label>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="number" v-model.number="diameter" v-bind:min="minDiameter" v-bind:max="maxDiameter" step=".1">
          </div>
          <div class="control">
            <a class="button is-static">
              cm
            </a>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <label class="label">Rocket Drag Coefficient</label>
        <div class="field">
          <div class="control">
            <input class="input" type="number" v-model.number="dragCoefficient" v-bind:min="minDragCoefficient" 
                v-bind:max="maxDragCoefficient" step=".01">
          </div>
        </div>
      </div>
      <div class="column is-3">
        <label class="label">Number of Stages</label>
        <div class="field">
          <div class="control">
            <div class="select full-width-fix">
              <select v-model="numberOfStages">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline is-centered">
      <div class="column is-half" v-for="(stage, stageIndex) in stages" v-bind:key="stageIndex">
        <div class="columns">
          <div class="column is-half">
            <label class="label">Number of Engines in Stage {{ stageIndex+1 }}</label>
            <div class="field">
              <div class="control">
                <div class="select full-width-fix">
                  <select v-model.number="stages[stageIndex].numberOfEngines">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <label class="label">Empty Mass at Stage {{ stageIndex+1 }}</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" type="number" v-model.number="stages[stageIndex].emptyMass">
              </div>
              <div class="control">
                <a class="button is-static">
                  g
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3" v-if="rocketDataComplete">
        <label class="label">Number of Flights</label>
        <div class="field">
          <div class="control">
            <div class="select full-width-fix">
              <select v-model.number="numberOfFlights">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered is-multiline" v-show="numberOfFlights != 0 && rocketDataComplete">
      <performance-flight v-for="(flight, flightIndex) in numberOfFlights" v-bind:key="flightIndex"
          v-bind:flightNumber="flightIndex+1"
          v-bind:rocketDiameter="diameter"
          v-bind:rocketDragCoefficient="dragCoefficient"
          v-bind:rocketStages="JSON.parse(JSON.stringify(stages))"
          class="column flight is-4">
      </performance-flight>
    </div>
  </div>
</template>

<script>
import PerformanceFlight from './PerformanceFlight'

export default {
  name: 'PerformancePrediction',
  data: function() {
    return {
      diameter: 3, // Set to 0
      dragCoefficient: .75, // Set to 0
      stages: [],
      numberOfFlights: 0,

      minDiameter: 2,
      maxDiameter: 5,
      minDragCoefficient: .1,
      maxDragCoefficient: 2.5,
      //minNumberOfEngines: 1,
      //maxNumberOfEngines: 3,
      //minStageEmptyMass: 5,
      //maxStageEmptyMass: 90,
    }
  },
  computed: {
    rocketDataComplete() {
      return this.diameter >= this.minDiameter && this.diameter <= this.maxDiameter &&
        this.dragCoefficient >= this.minDragCoefficient && this.dragCoefficient <= this.maxDragCoefficient &&
        this.numberOfStages != 0 &&
        this.stages.every(stage => stage.numberOfEngines > 0 && stage.emptyMass > 0 )
    },
    numberOfStages: {
      get() {
        return this.stages.length
      },
      set(numberOfStages) {
        let currentNumberOfStages = this.stages.length
        if(numberOfStages == currentNumberOfStages) 
          return
        if(numberOfStages > currentNumberOfStages) {
          for(let stageNumber = currentNumberOfStages+1; stageNumber <= numberOfStages; stageNumber++) {
            this.stages.push({ numberOfEngines: 0, emptyMass: 0 })
          }
        } else {
          this.stages.splice(numberOfStages)
        }
      }
    },
  },
  components: {
    PerformanceFlight
  }
}
</script>