<script lang="ts">
    import Study from '@/components/rocrate/Study.svelte';
    import { rocrate, rocrateLevel } from '@/stores/rocrate';

    let studies = $rocrate['@graph'].filter(n=>{return n['additionalType'] == 'Study'});

    let study;
    function focusStudy(studyId: string) {
        study = studies.find(p => p['@id'] === studyId);
    }
</script>

<div class="grid">
    <ul>
    {#each studies as study}
        <li>
            <button class="btn-ghost font-medium" on:click={()=>focusStudy(study['@id'])}>{study['name']?study['name']:study['identifier']}</button>
        </li>
    {/each}
    </ul>

    <section>

        <div class="main-content">
            {#if study}
            <Study {study} />
            {:else}
                {#if studies && studies.length > 0}
                    <p>Select a study to view its details</p>
                {:else}
                    <p>No studies found</p>
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