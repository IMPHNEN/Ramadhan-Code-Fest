<script>
    import { baseConfig } from "$lib/strings/baseConfig";
    import "../app.css";
</script>
<svelte:head>
    <title>{baseConfig.pageTitle}</title>
</svelte:head>
<slot />