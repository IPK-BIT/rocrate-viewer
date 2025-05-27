<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import Publication from "@/components/rocrate/Publication.svelte";
    import Person from "@/components/rocrate/Person.svelte";

    import { rocrate } from "@/stores/rocrate";

    export let investigation;

    function openPublicationDetails(idx: int) {
        focussedPublication = $rocrate['@graph'].find(n=>{return n['@id']==idx});
        document.getElementById("publication-modal").showModal();
    }

    function openPersonDetails(idx: int) {
        focussedPerson = $rocrate['@graph'].find(n=>{return n['@id']==idx});
        document.getElementById("creator-modal").showModal();
    }

    let showModal = false, showPersonModal = false;
    let focussedPublication, focussedPerson;
</script>

<table>
    <tbody>
        <tr>
            <th>Title</th>
            <td>{investigation['name']}</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>{investigation['description']}</td>
        </tr>
        <!-- <tr>
            <th>Submission Date</th>
            <td>{investigation['submissionDate']}</td>
        </tr>
        <tr>
            <th>Public Release Date</th>
            <td>{investigation['publicReleaseDate']}</td>
        </tr> -->
        {#if 'citation' in investigation}
        <tr>
            <th>Publication</th>
            <td>
                {#await $rocrate['@graph'].find(n=>{return n['@id']==investigation['citation']['@id']})}
                    <p></p>
                {:then citation}
                    <button class="btn-ghost modal-link" on:click={()=>openPublicationDetails(citation['@id'])}>{citation['headline']}</button>
                {:catch error}
                    <p>Error loading citation: {error.message}</p>
                {/await}
            </td>
        </tr>
        {/if}
        {#if 'creator' in investigation}
        <tr>
            <th>Creators</th>
            <td>
                <ul>
                    {#each investigation['creator'] as creator, i}
                        <li class="list-none">
                            {#await $rocrate['@graph'].find(n=>{return n['@id']==creator['@id']})}
                                <p></p>
                            {:then creatorDetails}
                                <button class="btn-ghost modal-link" on:click={()=>openPersonDetails(creatorDetails['@id'])}>{creatorDetails['givenName']+' '+creatorDetails['familyName']}</button>
                            {:catch error}
                                <p>Error loading creator: {error.message}</p>
                            {/await}
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

<Modal bind:isOpen={showPersonModal} id="creator-modal">
    {#if focussedPerson}
    <Person person={focussedPerson} />
    {/if}
</Modal>