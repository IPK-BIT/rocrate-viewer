<script lang="ts">
    import { rocrate } from "@/stores/rocrate";

    export let data;
</script>

<table>
    <tbody>
    {#await $rocrate['@graph'].find(n=>{return n['@id'] === data['@id']})}
        <tr>
            <td colspan="2">Loading...</td>
        </tr>
    {:catch error}
        <tr>
            <td colspan="2">Error: {error.message}</td>
        </tr>        
    {:then datafile}         
        {#if datafile.name}
        <tr>
            <th>Name</th>
            <td>{datafile.name}</td>
        </tr>
        {/if}
        {#if datafile.type}
        <tr>
            <th>Type</th>
            <td>{datafile.type}</td>
        </tr>
        {/if}
        {#if datafile.encodingFormat}
        <tr>
            <th>Encoding Format</th>
            <td>{datafile.encodingFormat}</td>
        </tr>
        {/if}
        {#if datafile.usageInfo}
        <tr>
            <th>Usage Info</th>
            <td>{datafile.usageInfo}</td>
        </tr>
        {/if}
        {#if datafile.comments}
        <tr>
            <th>Comments</th>
            <td>
                <ul>
                    {#each datafile.comments as comment}
                    <li>{JSON.stringify(comment)}</li>
                    {/each}
                </ul>  
            </td>
        </tr>
        {/if}
    {/await}
    </tbody>
</table>

<style>
    table {
        background-color: white;
        width: 100%;
    }
</style>