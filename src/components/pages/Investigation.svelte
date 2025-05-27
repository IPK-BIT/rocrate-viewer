<script lang="ts">
    import Investigation from '@/components/rocrate/Investigation.svelte';
    import { rocrate } from '@/stores/rocrate'
</script>

<div style="padding: 1rem;">
    {#if $rocrate}
    <Investigation investigation={$rocrate['@graph'].find(n=>{return n['@id']==='./'})}/>
    {/if}
</div>

