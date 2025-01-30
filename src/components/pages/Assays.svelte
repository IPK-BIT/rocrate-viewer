<script lang="ts">
    import Assay from '@/components/rocrate/Assay.svelte';
    import Study from '@/components/rocrate/Study.svelte';
    import { rocrate, rocrateLevel } from '@/stores/rocrate';

    let assays = [];
    for(const study of $rocrate['about'].studies) {
        if (study.assays) {
            assays = [...assays, ...study.assays];            
        }
    }

    let assay;
    function focusAssay(assayId: string) {
        assay = assays.find(p => p['@id'] === assayId);
    }
</script>

<div class="grid">
    <ul>
    {#each $rocrate['about'].studies as study}
    <li><button class="btn-ghost font-medium" style="cursor: default; color: #666">{study.title?study.title:study.identifier}</button></li>
    {#if study['assays']}
        <ul>
        {#each study['assays'] as assay}    
            <li>
                <button class="btn-ghost font-medium" on:click={()=>focusAssay(assay['@id'])}>{assay['title']?assay['title']:assay['identifier']}</button>
            </li>
        {/each}
        </ul>
    {/if}
    {/each}
    </ul>

    <section>

        <div class="main-content">
            {#if assay}
            <Assay {assay}/>
            {:else}
                {#if assays && assays.length > 0}
                    <p>Select an assay to view its details</p>
                {:else}
                    <p>No assays found</p>
                {/if}
            {/if}
        </div>
    </section>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: .5rem;
    }

    .main-content {
        padding-top: 1rem;
    }  
</style>