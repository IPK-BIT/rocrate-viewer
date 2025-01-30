<script lang="ts">
    export let data;
</script>

<table>
    <thead>
        <tr>
            <th style="width: 20%"></th>
            <th>{data.name}</th>
        </tr>        
    </thead>
    <tbody>
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
            <td>{data.comments}</td>
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