<script lang="ts">
    export let parameterValue;
</script>

<table>
    <tbody>
        {#if 'name' in parameterValue}
        <tr>
            <th>Parameter Name</th>
            <td>{parameterValue.name}</td>
        </tr>
        {/if}
        {#if 'propertyID' in parameterValue}
        <tr>
            <th>Paramter ID</th>
            <td>{parameterValue.propertyID}</td>
        </tr>
        {/if}
        {#if 'value' in parameterValue}
        <tr>
            <th>Value</th>
            <td>{parameterValue.value}</td>
        </tr>
        {/if}
        {#if 'unitText' in parameterValue}
        <tr>
            <th>Unit</th>
            <td>{parameterValue.unitText}</td>
        </tr>
        {/if}
        {#if 'unitCode' in parameterValue}
        <tr>
            <th>Unit Code</th>
            <td>{parameterValue.unitCode}</td>
        </tr>
        {/if}
    </tbody>
</table>