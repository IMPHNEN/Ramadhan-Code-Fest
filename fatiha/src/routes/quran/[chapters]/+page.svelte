<script lang="ts">
    import NavigationBar from "$lib/components/NavigationBar.svelte";

    export let data;
</script>
<NavigationBar/>
<div class="container mx-auto">
    <div class="max-w-2xl mx-auto p-4">
        <!-- Chapter Contents -->
        <div class="space-y-4">
            {#each data.chapterContents as verse,index}
                <div class="rounded-lg p-4">
                    <!-- Arabic Text -->
                    <div class="text-2xl mb-2 text-right rtl arabic pre-line">{ verse.arabic }</div>
                    <!-- Transliteration -->
                    <div class="text-gray-600 mb-2 mt-5 rtl text-right">{index + 1}. { verse.transliteration }</div>
                </div>
            {/each}
        </div>
    </div>
</div>
