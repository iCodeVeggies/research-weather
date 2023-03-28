<template>
  <div class="container mx-auto px-4">
    <form @submit.prevent="submitForm" class="flex items-center">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city name"
        class="rounded-l-md p-4 bg-gray-100 w-full"
      />
      <button type="submit" class="rounded-r-md p-4 bg-blue-600 text-white">
        Add City
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddCityForm",
  setup(_, { emit }) {
    const city = ref("");

    const submitForm = () => {
      emit("submit-city", city.value);
      city.value = "";
    };

    return {
      city,
      submitForm,
    };
  },
});
</script>
