<template>
  <div class="container mx-auto px-4">
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
    >
      <li
        v-for="city in cities"
        :key="city._id"
        class="bg-white p-4 rounded-md"
      >
        <h2 class="text-xl font-semibold">{{ city.name }}</h2>
        <p>{{ city.temperature }}°C</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CityList",
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
});
</script>
