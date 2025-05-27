<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Person from "@/components/rocrate/Person.svelte";

    import { rocrate } from "@/stores/rocrate";

    export let publication;
    let showModal = false;

    function openAuthorDetails(idx: int) {
        focussedAuthor = $rocrate['@graph'].find(n => { return n['@id'] == idx });
        document.getElementById('person-modal').showModal()
    }

    let focussedAuthor;
</script>

<table>
    <tbody>
        <tr>
            <th>Title</th>
            <td>{publication['headline']}</td>
        </tr>
        <tr>
            <th>Authors</th>
            <td>
                <ul>
                    {#each publication['author'] as author, i}
                        <li class="list-none">
                    {#await $rocrate['@graph'].find(n=>{return n['@id']==author['@id']})}
                        <p></p>
                    {:then authorDetails}
                        <button class="btn-ghost modal-link" on:click={()=>openAuthorDetails(authorDetails['@id'])}>{authorDetails['givenName']}</button>
                    {:catch error} 
                        <p>Error loading author: {error.message}</p>
                    {/await}
                        </li>
                    {/each}
                </ul>
            </td>
        </tr>
        {#if publication.creativeWorkStatus}
        <tr>
            <th>Status</th>
            <td>
            {#await $rocrate['@graph'].find(n=>{return n['@id']==publication['creativeWorkStatus']['@id']})}
                <p></p>
            {:then status}
                <button class="btn-ghost modal-link" on:click={()=>document.getElementById('annotation-modal').showModal()}>{status['name']}</button>
            {:catch error}
                <p>Error loading status: {error.message}</p>
            {/await}
            </td>
            <!-- <td><button class="btn-ghost modal-link" on:click={()=>document.getElementById('annotation-modal').showModal()}>{publication['status']['annotationValue']}</button></td> -->
        </tr>
        {/if}
    </tbody>
</table>
<Modal id="annotation-modal">
    {#if publication.creativeWorkStatus}
        <OntologyAnnotation ontologyAnnotation={$rocrate['@graph'].find(n=>{return n['@id']===publication['creativeWorkStatus']['@id']})} />
    {/if}
</Modal>
<Modal id="person-modal">
    {#if focussedAuthor}
    <Person person={focussedAuthor} />
    {/if}
</Modal>