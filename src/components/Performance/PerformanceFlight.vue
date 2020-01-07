<template>
  <div>
    <div class="message is-dark">
      <div class="message-header is-block">
        <h3 class="title is-3 has-text-centered has-text-white">Flight {{ flightNumber }} </h3>
      </div>
      <div class="message-body">

        <div v-for="(stage, stageIndex) in stages" v-bind:key="stageIndex" class="message-body-section">
          <h4 class="title is-4 has-text-centered">Stage {{ stageIndex + 1 }}</h4>
          <div v-for="(engine, engineIndex) in stage.engines" v-bind:key="engineIndex">

            <label class="label">Engine {{ engineIndex + 1 }} Type</label>
            <div class="field">
              <div class="control">
                <div class="select full-width-fix">
                  <select v-model="stages[stageIndex].engines[engineIndex].type">
                    <option>1/2A3</option>
                    <option>1/2A6</option>
                    <option>A3</option>
                    <option>A8</option>
                    <option>A10</option>
                    <option>B4</option>
                    <option>B6</option>
                    <option>C6</option>
                    <option>D12</option>
                    <option>E15</option>
                  </select>
                </div>
              </div>
            </div>

            <label class="label">Engine {{ engineIndex + 1 }} Coast Time</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" type="number" v-model.number="stages[stageIndex].engines[engineIndex].coastTime">
              </div>
              <div class="control">
                <a class="button is-static">
                  s
                </a>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>

    <div class="results notification is-info has-text-centered">
      <span class="has-text-weight-bold is-size-5">
      </span>
    </div>
  </div>
  
</template>

<script>
//let engineTypeInfo = {
//  "1/2A3": { PROPM:1.75 , TBURN:.36, IMPULSE:1.25, DELAYM:.2 , CASEM:3.45  },
//  "1/2A6": { PROPO:1.56 , TBURN:.2 , IMPULSE:1.25, DELAYM:.72, CASEM:12    },
//  "A3"   : { PROPM:3.5  , TBURN:.86, IMPULSE:2.5 , DELAYM:.28, CASEM:3     },
//  "A8"   : { PROPM:3.12 , TBURN:.32, IMPULSE:2.5 , DELAYM:.69, CASEM:11    },
//  "A10"  : { PROPM:3.78 , TBURN:.26, IMPULSE:2.5 , DELAYM:.37, CASEM:3     },
//  "B4"   : { PROPM:8.33 , TBURN:1.2, IMPULSE:5   , DELAYM:.60, CASEM:10.27 },
//  "B6"   : { PROPM:6.24 , TBURN:.83, IMPULSE:5   , DELAYM:.40, CASEM:12.26 },
//  "C6"   : { PROPM:12.48, TBURN:1.7, IMPULSE:10  , DELAYM:.45, CASEM:11.07 },
//  "D12"  : { PROPM:24.93, TBURN:1.7, IMPULSE:20  , DELAYM:.45, CASEM:15.92 },
//  "E15"  : { PROPM:35.5 , TBURN:2.6, IMPULSE:32  , DELAYM:.35, CASEM:19.7  },
//};

export default {
  name: 'performanceFlight',
  props: {
    flightNumber: Number,
    rocketDiameter: Number,
    rocketDragCoefficient: Number,
    rocketStages: Array,
  },
  data() {
    return {
      engines: [],
      stages: []
    }
  },
  watch: {
    'rocketStages': {
      handler: function(newRocketStages, oldRocketStages = []) {
        // When number of stages change, change the number of stages on the stages object
        // When number of engines change, chagne the number of engines on that stage
        // Then we can edit the stages.engines directly on the this.stages object
        if(JSON.stringify(newRocketStages) == JSON.stringify(oldRocketStages))
          return
        let oldNumberOfStages = oldRocketStages.length
        let newNumberOfStages = newRocketStages.length
        if(oldNumberOfStages == newNumberOfStages) {
          newRocketStages.forEach((stage, stageIndex) => {
            if(oldRocketStages[stageIndex].emptyMass != stage.emptyMass)
              this.stages[stageIndex].emptyMass = stage.emptyMass

            let oldNumberOfEngines = oldRocketStages[stageIndex].numberOfEngines
            let newNumberOfEngines = stage.numberOfEngines
            if(oldNumberOfEngines < newNumberOfEngines) {
              for(let engineIndex = oldNumberOfEngines; engineIndex < newNumberOfEngines; engineIndex++) {
                this.stages[stageIndex].engines.push({ type: '', coastTime: 0 })
              }
            } else if(oldNumberOfEngines > newNumberOfEngines) {
              this.stages[stageIndex].engines.splice(newNumberOfEngines)
            }
          })
        } else if(newNumberOfStages > oldNumberOfStages) {
          for(let stageIndex = oldNumberOfStages; stageIndex < newNumberOfStages; stageIndex++) {
            this.stages.push({ 
              emptyMass: newRocketStages[stageIndex].emptyMass,
              engines: []
            })
            for(let engineIndex = 0; engineIndex < this.rocketStages[stageIndex].numberOfEngines; engineIndex++)
              this.stages[stageIndex].engines.push({ type: '', coastTime: 0 })
          }
        } else {
          this.stages.splice(newNumberOfStages)
        }
      },
      deep: true,
      immediate: true
    },
  },
  // Let's look into calculating each of the result properties in their own computed property
  //  flightOnePerformance: function() { 
  //    let results = {
  //      stages: [],
  //      coastTime: 0,
  //      coastDistance: 0,
  //      totalAltitude: 0
  //    };

  //    return results;
  //  }
}
</script>