<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Person from "@/components/rocrate/Person.svelte";
    import Process from "@/components/rocrate/Process.svelte";

    export let study;

    let person;
    function focusPerson(personId: string) {
        person = study.people.find(p => p['@id'] === personId);
        document.getElementById('person-modal').showModal()
    }

    let focussedAnnotation;
    function openAnnotationDetails(idx: int) {
        focussedAnnotation = study.studyDesignDescriptors[idx];
        document.getElementById('annotation-modal').showModal()
    }

    let selectedProcess;
</script>

<table>
    <tbody>
        {#if study.title}
            <tr>
                <th>Title</th>
                <td>{study.title}</td>
            </tr>
        {/if}
        {#if study.identifier}
            <tr>
                <th>Identifier</th>
                <td>{study.identifier}</td>
            </tr>
        {/if}
        {#if study.filename}
            <tr>
                <th>Filename</th>
                <td>{study.filename}</td>
            </tr>
        {/if}
        {#if study.people}
            <tr>
                <th>People</th>
                <td>
                    <ul>
                        {#each study.people as person}
                            <li class="list-none"><button class="btn-ghost modal-link" on:click={()=>focusPerson(person['@id'])}>{person['firstName']} {person['lastName']}</button></li>
                        {/each}
                    </ul>
                </td>
            </tr>
        {/if}
        {#if study.studyDesignDescriptors}
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
        {/if}
        {#if study.comments}
            <tr>
                <th>Comments</th>
                <td>
                    <table style="border: 0;">
                        <tbody>
                        {#each study.comments as comment}
                            <tr>
                                <th style="border: 0; border-bottom: 1px solid black;">{comment['name']}</th>
                                <td style="border: 0; border-bottom: 1px solid black;">{comment['value']}</td>
                            </tr>
                        {/each}
                    </tbody>
                    </table>
                </td>
            </tr>
        {/if}
        {#if study.assays}
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
        {/if}
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
    {#if study.processSequence}
    <h2>Process Sequence</h2>
        {#if study.processSequence.length == 1}
        <Process process={study.processSequence[0]} />
        {:else}
            <select bind:value={selectedProcess}>
                <option disabled selected>Select a process</option>
                {#each study.processSequence as process}
                <option>{process.name}</option>    
                {/each}
            </select>
            {#if selectedProcess}
            <Process process={study.processSequence.find(process => process.name === selectedProcess)} />
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