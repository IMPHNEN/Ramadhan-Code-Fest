<template>
	<div class="relative bg-white overflow-hidden my-20 mx-auto max-w-7xl">
		<div class="flex flex-col">
		  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
		      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
		        <table class="min-w-full divide-y divide-gray-200">
		          <tbody class="bg-white divide-y divide-gray-200">
		          	<tr v-if="id > 1">
		          		<td class="px-6 py-4 w-1/12">1</td>
			            <td v-if="surah.preBismillah" class="px-6 py-4 w-6/12">
			                <div class="text-xl text-gray-900">
			                	<p class="text-right"><b>{{ surah.preBismillah.text.arab }}</b></p>
			                </div>
			                <div class="text-sm">{{ surah.preBismillah.text.transliteration.en }}</div>
			                <div class="mt-1 text-sm text-gray-500">{{ surah.preBismillah.translation.id }}</div>
			            </td>
			            <td v-if="surah.preBismillah" class="px-6 py-4 w-5/12">
			                <div class="ml-10 text-sm text-gray-900">
			                	<audio controls>
								  	<source :src="`${surah.preBismillah.audio.primary}`" type="audio/mpeg">
								</audio>
			                </div>
			            </td>
		          	</tr>
		            <tr v-for="item in surah.verses" :key="item.number">
		              <td class="px-6 py-4 w-1/12">
		                <span v-if="id > 1">{{ item.number.inSurah+1 }}</span>
		                <span v-else>{{ item.number.inSurah }}</span>
		              </td>
		              <td class="px-6 py-4 w-6/12">
		                <div class="text-xl text-gray-900">
		                	<p class="text-right"><b>{{ item.text.arab }}</b></p>
		                </div>
		                <div class="text-sm">{{ item.text.transliteration.en }}</div>
		                <div class="mt-1 text-sm text-gray-500">{{ item.translation.id }}</div>
		              </td>
		              <td class="px-6 py-4 w-5/12">
		                <div class="ml-10 text-sm text-gray-900">
		                	<audio controls>
							  	<source :src="`${item.audio.primary}`" type="audio/mpeg">
							</audio>
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
  	name: 'MainSurah',
  	data () {
	    return {
	      id: 0,
	      surah: {}
	    }
	},
	created () {
		this.id = this.$route.params.id
	    axios
	      .get('https://api.quran.gading.dev/surah/'+this.$route.params.id)
	      .then(response => (this.surah = response.data.data))
	}
}
</script>