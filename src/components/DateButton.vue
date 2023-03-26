<template>
  <date-range-picker
      ref="picker"
      :opens="opens"
      :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
      :minDate="minDate" :maxDate="maxDate"
      :singleDatePicker="singleDatePicker"
      :timePicker="timePicker"
      :timePicker24Hour="timePicker24Hour"
      :showWeekNumbers="showWeekNumbers"
      :showDropdowns="showDropdowns"
      :autoApply="autoApply"
      v-model="dateRange"
      @update="updateValues"
      @toggle="checkOpen"
      :linkedCalendars="linkedCalendars"
      :dateFormat="dateFormat"
  >
    <template v-slot:input="picker" style="min-width: 350px;">
      {{ picker.startDate | date }} - {{ picker.endDate | date }}
    </template>
  </date-range-picker>

</template>


<script>



export default {
  name:'date-button',
  data() {
    return {
      range: {
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 23),
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A',
      },
    };
  },
};


</script>

<style scoped>

</style>