<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Person from "@/components/rocrate/Person.svelte";

    export let publication;
    let showModal = false;

    function openAuthorDetails(idx: int) {
        focussedAuthor = publication['authorList'][idx];
        document.getElementById('person-modal').showModal()
    }

    let focussedAuthor = publication['authorList'][0];

    console.log(publication);
</script>

<table>
    <tbody>
        <tr>
            <th>Title</th>
            <td>{publication['title']}</td>
        </tr>
        <tr>
            <th>Authors</th>
            <td>
                <ul>
                    {#each publication['authorList'] as author, i}
                        <li class="list-none">
                            <button class="btn-ghost modal-link" on:click={()=>openAuthorDetails(i)}>{author['name']}</button>
                        </li>
                    {/each}
                </ul>
            </td>
        </tr>
        {#if publication.status}
        <tr>
            <th>Status</th>
            <td><button class="btn-ghost modal-link" on:click={()=>document.getElementById('annotation-modal').showModal()}>{publication['status']['annotationValue']}</button></td>
        </tr>
        {/if}
    </tbody>
</table>
<Modal id="annotation-modal">
    {#if publication.status}
        <OntologyAnnotation ontologyAnnotation={publication['status']} />
    {/if}
</Modal>
<Modal id="person-modal">
    <Person person={focussedAuthor} />
</Modal>