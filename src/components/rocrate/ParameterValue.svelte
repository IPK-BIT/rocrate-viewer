<script lang="ts">
    export let parameterValue;
    console.log(parameterValue);
</script>

<table>
    <tbody>
        {#if 'category' in parameterValue}
        <tr>
            <th>Category</th>
            <td>{parameterValue.category}</td>
        </tr>
        {/if}
        {#if 'categoryCode' in parameterValue}
        <tr>
            <th>Category Code</th>
            <td>{parameterValue.categoryCode}</td>
        </tr>
        {/if}
        {#if 'value' in parameterValue}
        <tr>
            <th>Value</th>
            <td>{parameterValue.value}</td>
        </tr>
        {/if}
        {#if 'unit' in parameterValue}
        <tr>
            <th>Unit</th>
            <td>{parameterValue.unit}</td>
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