<script lang="ts">
    export let data;
</script>

<table>
    <tbody>
        {#if data.name}
        <tr>
            <th>Name</th>
            <td>{data.name}</td>
        </tr>
        {/if}
        {#if data.type}
        <tr>
            <th>Type</th>
            <td>{data.type}</td>
        </tr>
        {/if}
        {#if data.encodingFormat}
        <tr>
            <th>Encoding Format</th>
            <td>{data.encodingFormat}</td>
        </tr>
        {/if}
        {#if data.usageInfo}
        <tr>
            <th>Usage Info</th>
            <td>{data.usageInfo}</td>
        </tr>
        {/if}
        {#if data.comments}
        <tr>
            <th>Comments</th>
            <td>
                <ul>
                    {#each data.comments as comment}
                    <li>{JSON.stringify(comment)}</li>
                    {/each}
                </ul>  
            </td>
        </tr>
        {/if}
    </tbody>
</table>

<style>
    table {
        background-color: white;
        width: 100%;
    }
</style>