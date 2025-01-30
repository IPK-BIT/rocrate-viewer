<script lang="ts">  
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Organization from "@/components/rocrate/Organization.svelte";

    let showModal = false;

    function openRoleDescription(idx: int) {
        focussedRole = person['roles'][idx];
        document.getElementById("role-modal").showModal()
    }
    let focussedRole;
    export let person;

</script>

<table>
    <tbody>
        {#if 'firstName' in person}
        <tr>
            <th>First Name</th>
            <td>{person['firstName']}</td>
        </tr>
        {/if}
        {#if 'lastName' in person}
        <tr>
            <th>Last Name</th>
            <td>{person['lastName']}</td>
        </tr>
        {/if}
        {#if 'name' in person}
        <tr>
            <th>Name</th>
            <td>{person['name']}</td>
        </tr>
        {/if}
        {#if 'email' in person}
        <tr>
            <th>Email</th>
            <td>{person['email']}</td>
        </tr>
        {/if}
        {#if 'orcid' in person}
        <tr>
            <th>ORCID</th>
            <td>{person['orcid']}</td>
        </tr>
        {/if}
        {#if 'affiliation' in person}
        <tr>
            <th>Affiliation</th>
            <td>
                <ul>
                    <li class="list-none modal-link">
                        <button class="btn-ghost modal-link" on:click={()=>document.getElementById('affiliation-modal').showModal()}>{person['affiliation']['name']}</button>
                    </li>
                </ul>
            </td>
        </tr>
        {/if}
        {#if person['roles']}
        <tr>
            <th>Roles</th>
            <td>
                <ul>
                    {#each person['roles'] as role, i}
                        <li class="list-none">
                            <button class="btn-ghost modal-link" on:click={()=>openRoleDescription(i)}>{role['annotationValue']}</button>
                        </li>
                    {/each}
                </ul>
            </td>
        </tr>
        {/if}
    </tbody>
</table>

<Modal bind:isOpen={showModal} id="role-modal">
    {#if focussedRole}
        <OntologyAnnotation ontologyAnnotation={focussedRole}/>
    {/if}
</Modal>

<Modal bind:isOpen={showModal} id="affiliation-modal">
    {#if person['affiliation']}
    <Organization organization={person['affiliation']}/>
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