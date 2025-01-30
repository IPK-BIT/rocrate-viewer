<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import Publication from "@/components/rocrate/Publication.svelte";

    export let investigation;

    function openPublicationDetails(idx: int) {
        focussedPublication = investigation['publications'][idx];
        document.getElementById("publication-modal").showModal();
    }

    let showModal = false;
    let focussedPublication;
</script>

<table>
    <tbody>
        <tr>
            <th>Title</th>
            <td>{investigation['title']}</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>{investigation['description']}</td>
        </tr>
        <tr>
            <th>Submission Date</th>
            <td>{investigation['submissionDate']}</td>
        </tr>
        <tr>
            <th>Public Release Date</th>
            <td>{investigation['publicReleaseDate']}</td>
        </tr>
        {#if 'publications' in investigation}
        <tr>
            <th>Publications</th>
            <td>
                <ul>
                {#each investigation['publications'] as publication, i}
                <li class="list-none">
                    <button class="btn-ghost modal-link" on:click={()=>openPublicationDetails(i)}>{publication['title']}</button>
                </li>
                {/each}                    
                </ul>
            </td>
        </tr>
        {/if}
    </tbody>
</table>

<Modal bind:isOpen={showModal} id="publication-modal">
    {#if focussedPublication}
    <Publication publication={focussedPublication} />
    {/if}
</Modal>

<style>
    ul {
        padding: 0;
        margin: 0;
    }

    .list-none {
        list-style-type: none;
    } 
</style>