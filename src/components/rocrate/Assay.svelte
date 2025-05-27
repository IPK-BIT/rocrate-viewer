<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";  
    import Data from "@/components/rocrate/Data.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Person from "@/components/rocrate/Person.svelte";
    import Process from "@/components/rocrate/Process.svelte";
    import PropertyValue from "@/components/rocrate/PropertyValue.svelte";
    import ProtocollProcesses from "@/components/rocrate/ProtocollProcesses.svelte";
    import { rocrate } from "@/stores/rocrate";

    export let assay;


    let focussedAnnotation;
    function focusAnnotation(item) {
        focussedAnnotation = item;
        document.getElementById('annotation-modal').showModal();
    }

    let focussedPerformer;
    function focusPerformer(id: string) {
        focussedPerformer = assay.performers.find(performer => performer['@id'] === id);
        document.getElementById('performer-modal').showModal();
    }

    let activeTab = 0;

    let selectedProcess;

    let processGroups = [];

    function fillProcessGroups(s) {
        selectedProcess = undefined;
        let tmp = [];
        if (s.about) {
            // Check if assay.about is an array
            if (Array.isArray(s.about)) {
            s.about.forEach(process => {
                let p = $rocrate['@graph'].find(n=>{return n['@id']===process['@id']});
                if (!tmp.includes(p['executesLabProtocol']['@id'])) {
                    tmp = [...tmp, p['executesLabProtocol']['@id']]
                }
            });    
            } else {
            // If it's not an array, just add the single process
            tmp = [$rocrate['@graph'].find(n=>{return n['@id']===s.about['@id']})['executesLabProtocol']['@id']];
            }
            
        }
        return tmp;
    }

    $: processGroups = fillProcessGroups(assay);
</script>

<section>


<table style="width: 100%">
    <tbody>
        {#if assay.identifier}
        <tr>
            <th>Identifier</th>
            <td>{assay.identifier}</td>
        </tr>
        {/if}
        {#if assay.measurementType}
        <tr>
            <th>Measurement Type</th>
            <td><button class="btn-ghost modal-link" on:click={()=>document.getElementById('property-modal').showModal()}>{assay.measurementType.category}</button></td>
        </tr>
        {/if}
        {#if assay.technologyType}
        <tr>
            <th>Technology Type</th>
            <td><button class="btn-ghost modal-link" on:click={()=>focusAnnotation(assay.technologyType)}>{assay.technologyType.annotationValue}</button></td>
        </tr>
        {/if}
        {#if assay.technologyPlatform}
        <tr>
            <th>Technology Platform</th>
            <td><button class="btn-ghost modal-link" on:click={()=>focusAnnotation(assay.technologyPlatform)}>{assay.technologyPlatform.annotationValue}</button></td>
        </tr>
        {/if}
        {#if assay.creator}
        <tr>
            <th>Performers</th>
            <td>
                <div class="horizontal-list">
                    {#each assay.creator as performer}
                    <button class="label" on:click={()=>focusPerformer(performer['@id'])}>{$rocrate['@graph'].find(n=>{return n['@id'] === performer['@id']})['givenName']} {$rocrate['@graph'].find(n=>{return n['@id'] === performer['@id']})['familyName']}</button>
                    {/each}
                </div>                
            </td>
        </tr>
        {/if}
        {#if assay.comments}
        <tr>
            <th>Comments</th>
            <td>{JSON.stringify(assay.comments, null, 2)}</td>
        </tr>
        {/if}
        {#if assay['@id']}
        <tr>
            <th>Filename</th>
            <td>{assay['@id']}isa.assay.xlsx</td>
        </tr>
        {/if}
    </tbody>
</table>
<Modal id="property-modal">
    {#if assay.measurementType}
    <PropertyValue propertyValue={assay.measurementType} />
    {/if}
</Modal>
<Modal id="annotation-modal">
    {#if focussedAnnotation}
    <OntologyAnnotation ontologyAnnotation={focussedAnnotation} />
    {/if}
</Modal>
<Modal id="performer-modal">
    {#if focussedPerformer}
    <Person person={focussedPerformer} />
    {/if}
</Modal>

<div class="tabs">
    <button class="tab {activeTab==0?"active":""}" on:click={()=>{activeTab=0}}>Process Sequence</button>
    <button class="tab {activeTab==1?"active":""}" on:click={()=>{activeTab=1}}>Data Files</button>
</div>
<div class="tab-content">  
    {#if activeTab==0}
        {#if processGroups}
            {#if assay.about.length == 1}
            <Process process={assay.about[0]} />
            {:else}
                <select bind:value={selectedProcess}>
                    <option disabled selected>Select a protocol</option>
                    {#each processGroups as process}
                    <option value={$rocrate['@graph'].find(n=>{return n['@id']===process})}>{$rocrate['@graph'].find(n=>{return n['@id']===process})['name']}</option>    
                    {/each}
                </select>
                {#if selectedProcess}
                {#await $rocrate['@graph'].filter(n=>{return n['executesLabProtocol'] && n['executesLabProtocol']['@id']===selectedProcess['@id']})}
                    <p></p>
                {:then processDetails}
                    <ProtocollProcesses processes={processDetails} />
                {:catch error}
                    <p>Error loading process: {error.message}</p>
                {/await}
                {/if}
            {/if}
        {/if}
    {:else if activeTab==1}
        {#if assay.hasPart}
        <div class="file-list">
            {#each assay.hasPart as dataFile}
            <Data data={dataFile} />
            {/each}    
        </div>
        {/if}
    {/if}
</div>
</section>


<style>
    .horizontal-list {
        display: flex;
        flex-wrap: wrap;
        gap: .2rem;
    }
    .label {
        background-color: var(--neutral);
        padding: .2rem .5rem;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid var(--primary);
    }
    
    .label:hover {
        background-color: hsl(var(--neutral-h), var(--neutral-s), calc(var(--neutral-l) - 5%));
    }


    section {
        width: fit-content;
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    .file-list {
        gap: 1rem;
        display: grid;
    }

    .tabs {
        margin-top: 1rem;
        display: flex;
        border-bottom: 1px solid #ddd;
    }

    .tab {
        padding: 10px;
        cursor: pointer;
        background-color: #f0f0f0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border: 1px solid #ddd;
        border-bottom: 0;
    }

    .tab.active{
        background-color: var(--primary);
        color: var(--on-primary);
        font-weight: bold;
    }

    .tab-content {
        padding: 15px;
        border: 1px solid #ddd;
        background-color: var(--neutral);
    }
</style>