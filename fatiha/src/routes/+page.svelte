<script lang="ts">
    export let data;
</script>
<div class="container mx-auto">
    {#each data.quran as qurans }
        <div class="max-w-xl mx-2">
            <a href="/quran/{qurans.id}" class="w-full bg-base-100 shadow-xl my-2 transition-transform duration-500 transform hover:scale-105 cursor-pointer rounded-2xl flex justify-between items-center p-5">
                <div>
                    <h2 class="card-title">{qurans.transliteration}</h2>
                    <p>{qurans.type == 'meccan' ? 'Makkiyah' : 'Madaniyah'} | {qurans.total_verses} ayat</p>
                </div>
                <div>
                    <h2 class="text-2xl font-medium arabic">{qurans.name}</h2>
                </div>
            </a>
        </div>
    {/each}
</div>