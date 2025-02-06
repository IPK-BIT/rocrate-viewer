<script lang="ts">
    import OntologySourceReference from '@/components/rocrate/OntologySourceReference.svelte';
    import { rocrate, rocrateLevel } from '@/stores/rocrate';

    let ontologies = $rocrate['about']['ontologySourceReferences'];

    let ontology;
    function focusOntology(ontologyId: string) {
        ontology = ontologies.find(p => p['@id'] === ontologyId);
    }
</script>

<div class="grid">
    <ul>
    {#each ontologies as ontology}
        <li>
            <button class="btn-ghost font-medium" on:click={()=>focusOntology(ontology['@id'])}>{ontology['name']?ontology['name']:ontology['file']}</button>
        </li>
    {/each}
    </ul>

    <section>

        <div class="main-content">
            {#if ontology}
            <OntologySourceReference {ontology} />
            {:else}
                {#if ontologies && ontologies.length > 0}
                    <p>Select an ontology to view its details</p>
                {:else}
                    <p>No ontologies found</p>
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