<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Person from "@/components/rocrate/Person.svelte";
    import Process from "@/components/rocrate/Process.svelte";
    import ProtocollProcesses from "@/components/rocrate/ProtocollProcesses.svelte";
    import { rocrate } from "@/stores/rocrate";
    import { onMount } from "svelte";

    export let study;

    let person;
    function focusPerson(personId: string) {
        person = $rocrate['@graph'].find(n => { return n['@id'] == personId });
        document.getElementById('person-modal').showModal()
    }

    let focussedAnnotation;
    function openAnnotationDetails(idx: int) {
        focussedAnnotation = study.studyDesignDescriptors[idx];
        document.getElementById('annotation-modal').showModal()
    }

    let selectedProcess;

    let processGroups = [];

    function fillProcessGroups(s) {
        selectedProcess = undefined;
        let tmp = [];
        if (s.about) {
            // Check if study.about is an array
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

    $: processGroups = fillProcessGroups(study);

</script>

<table>
    <tbody>
        {#if study.name}
            <tr>
                <th>Title</th>
                <td>{study.name}</td>
            </tr>
        {/if}
        {#if study.identifier}
            <tr>
                <th>Identifier</th>
                <td>{study.identifier}</td>
            </tr>
        {/if}
        {#if study['@id']}
            <tr>
                <th>Filename</th>
                <td>{study['@id']+'isa.study.xlsx'}</td>
            </tr>
        {/if}
        {#if study.creator}
            <tr>
                <th>People</th>
                <td>
                    <ul>
                        {#each study['creator'] as creator, i}
                            <li class="list-none">
                                {#await $rocrate['@graph'].find(n=>{return n['@id']==creator['@id']})}
                                    <p></p>
                                {:then creatorDetails}
                                    <button class="btn-ghost modal-link" on:click={()=>focusPerson(creatorDetails['@id'])}>{creatorDetails['givenName']+' '+creatorDetails['familyName']}</button>
                                {:catch error}
                                    <p>Error loading creator: {error.message}</p>
                                {/await}
                            </li>
                        {/each}
                    </ul>
                </td>
            </tr>
        {/if}
        <!-- {#if study.studyDesignDescriptors}
            <tr>
                <th>Study Design Descriptors</th>
                <td>
                    <ul>
                    {#each study.studyDesignDescriptors as descriptor, i}
                        <li class="list-none">
                            <button class="btn-ghost modal-link" on:click={()=>openAnnotationDetails(i)}>{descriptor['annotationValue']}</button>
                        </li>
                    {/each}
                    </ul>
                </td>
            </tr>
        {/if} -->
        {#if study.comment}
            <tr>
                <th>Comments</th>
                <td>
                    <table style="border: 0;">
                        <tbody>
                        {#each study.comment as comment}
                            <tr>
                                {#await $rocrate['@graph'].find(n=>{return n['@id']==comment['@id']})}
                                    <td></td>
                                {:then commentDetails}
                                    <td style="border: 0; border-bottom: 1px solid black;">{commentDetails['name']}</td>
                                    <td style="border: 0; border-bottom: 1px solid black;">{commentDetails['text']}</td>                                    
                                {:catch error}
                                    <td>Error loading comment: {error.message}</td>
                                {/await}
                            </tr>
                        {/each}
                    </tbody>
                    </table>
                </td>
            </tr>
        {/if}
        <!-- {#if study.assays}
            <tr>
                <th>Assays</th>
                <td>
                    <ul>
                        {#each study.assays as assay}
                            <li class="list-none">{assay['title']?assay['title']:assay['identifier']}</li>
                        {/each}
                    </ul>
                </td>
            </tr>
        {/if} -->
    </tbody>
</table>
<Modal id="annotation-modal">
    {#if focussedAnnotation}
        <OntologyAnnotation ontologyAnnotation={focussedAnnotation}/>
    {/if}
</Modal>
<Modal id="person-modal">
    {#if person}
        <Person person={person} />
    {/if}
</Modal>

<section style="margin-bottom: 1rem;">
    {#if study.about}
    <h2>Process Sequence</h2>
        {#if study.about.length == 1}
        <Process process={study.about[0]} />
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
</section>

<style>
    ul {
        padding: 0;
        margin: 0;
    }

    .list-none {
        list-style-type: none;
    } 
</style>