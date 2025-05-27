<script lang="ts">
    import Header from "@/components/general/Header.svelte";
    import InitView from "@/components/general/InitView.svelte";
    import MainView from "@/components/general/MainView.svelte";
    import { state } from "@/stores/appstate";
    // import { rocrate } from "@/stores/rocrate";
</script>

<main>
  {#if $state === state.INIT}
  <InitView/>
  {:else}
  <Header/>
  <MainView/>
  {/if}
</main>
