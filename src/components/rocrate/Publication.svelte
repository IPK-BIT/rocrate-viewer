<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import Person from "@/components/rocrate/Person.svelte";

    export let publication;
    let showModal = false;

    function openAuthorDetails(idx: int) {
        focussedAuthor = publication['authorList'][idx];
        document.getElementById('person-modal').showModal()
    }

    let focussedAuthor = publication['authorList'][0];
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
            <td>{publication['status']['annotationValue']}</td>
        </tr>
        {/if}
    </tbody>
</table>

<Modal id="person-modal">
    <Person person={focussedAuthor} />
</Modal>