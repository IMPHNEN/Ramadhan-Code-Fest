<template>
	<div class="relative bg-white overflow-hidden my-20 mx-auto max-w-7xl">
		<div class="flex flex-col">
		  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
		      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
		        <table class="min-w-full divide-y divide-gray-200">
		          <thead class="bg-gray-50">
		            <tr>
		              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
		                No
		              </th>
		              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
		                Surah
		              </th>
		              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-9/12">
		              	Tafsir
		              </th>
		            </tr>
		          </thead>
		          <tbody class="bg-white divide-y divide-gray-200">
		            <tr v-for="item in surah" :key="item.number">
		              <td class="px-6 py-4 w-1/12">
		                {{ item.number }}
		              </td>
		              <td class="px-6 py-4 w-2/12">
		                <div class="text-sm text-gray-900">
		                	<NuxtLink :to="`/surah/${item.number}`">{{ item.name.transliteration.id }} <b>{{ item.name.short }}</b></NuxtLink>
		                </div>
		                <div class="text-sm text-gray-500">{{ item.revelation.id }} | {{ item.numberOfVerses }} Ayat</div>
		              </td>
		              <td class="px-6 py-4 w-9/12">
		                <div class="text-sm text-gray-900">
		                	<p>{{ item.tafsir.id }}</p>
		                </div>
		              </td>
		            </tr>
		          </tbody>
		        </table>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  	name: 'Main',
  	data () {
	    return {
	      surah: []
	    }
	},
	mounted () {
	    axios
	      .get('https://api.quran.gading.dev/surah')
	      .then(response => (this.surah = response.data.data))
	}
}
</script>