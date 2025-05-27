<script lang="ts">  
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";
    import Organization from "@/components/rocrate/Organization.svelte";
    import { rocrate } from "@/stores/rocrate";

    let showModal = false;

    function openRoleDescription(idx: int) {
        focussedRole = $rocrate['@graph'].find(n => { return n['@id'] == idx });
        document.getElementById("role-modal").showModal()
    }
    let focussedRole;
    export let person;

</script>

<table>
    <tbody>
        {#if 'givenName' in person}
        <tr>
            <th>First Name</th>
            <td>{person['givenName']}</td>
        </tr>
        {/if}
        {#if 'familyName' in person}
        <tr>
            <th>Last Name</th>
            <td>{person['familyName']}</td>
        </tr>
        {/if}
        {#if 'email' in person}
        <tr>
            <th>Email</th>
            <td>{person['email']}</td>
        </tr>
        {/if}
        {#if person['@id'].includes('orcid.org')}
        <tr>
            <th>ORCID</th>
            <td>{person['@id']}</td>
        </tr>
        {/if}
        {#if 'affiliation' in person}
        <tr>
            <th>Affiliation</th>
            <td>
                <ul>
                    <li class="list-none modal-link">
                        {#await $rocrate['@graph'].find(n=>{return n['@id']==person['affiliation']['@id']})}
                            <p></p>
                        {:then affiliation}
                            <button class="btn-ghost modal-link" on:click={()=>document.getElementById('affiliation-modal').showModal()}>{affiliation['name']}</button>
                        {:catch error}
                            <p>Error loading affiliation: {error.message}</p>
                        {/await}
                    </li>
                </ul>
            </td>
        </tr>
        {/if}
        {#if person['jobTitle']}
        <tr>
            <th>Roles</th>
            <td>
                {#await $rocrate['@graph'].find(n=>{return n['@id']==person['jobTitle']['@id']})}
                    <p></p>
                {:then role}
                    <button class="btn-ghost modal-link" on:click={()=>openRoleDescription(role['@id'])}>{role['name']}</button>
                {:catch error}
                    <p>Error loading role: {error.message}</p>
                {/await}
            </td>
        </tr>        
        {/if}
        {#if person['address']}
            <tr>
                <th>Address</th>
                <td>{person['address']}</td>
            </tr>
        {/if}
        {#if person['telephone']}
            <tr>
                <th>Telephone</th>
                <td>{person['telephone']}</td>
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
    {#await $rocrate['@graph'].find(n=>{return n['@id']==person['affiliation']['@id']})}
        <p></p>
    {:then affiliation}
        <Organization organization={affiliation}/>
    {:catch error}
        <p>Error loading affiliation: {error.message}</p>
    {/await}
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