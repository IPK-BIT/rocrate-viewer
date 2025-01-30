<script lang="ts">
    import Header from "@/components/general/Header.svelte";
    import InitView from "@/components/general/InitView.svelte";
    import MainView from "@/components/general/MainView.svelte";
    import { hans } from "@/stores/appstate";
    // import { rocrate } from "@/stores/rocrate";
</script>

<main>
  {#if $hans === hans.INIT}
  <InitView/>
  {:else}
  <Header/>
  <MainView/>
  {/if}
</main>
