<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <header class="bg-blue-600 text-white py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold">Weather App</h1>
      </div>
    </header>
    <main class="mt-8">
      <AddCityForm @submit-city="addCity" />
      <CityList :cities="cities" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddCityForm from "./components/AddCityForm.vue";
import CityList from "./components/CityList.vue";

export default defineComponent({
  name: "App",
  components: {
    AddCityForm,
    CityList,
  },
  data() {
    return {
      cities: [],
    };
  },
  mounted() {
    this.fetchCities();
  },
  methods: {
    async addCity(city) {
      try {
        const response = await fetch("/weather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city }),
        });

        if (!response.ok) {
          throw new Error("Error adding city");
        }

        const newCity = await response.json();
        this.cities.push(newCity);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchCities() {
      try {
        const response = await fetch("/weather");
        this.cities = await response.json();
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
  },
});
</script>
