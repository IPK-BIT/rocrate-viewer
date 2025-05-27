<script lang="ts">
    export let propertyValue;
</script>

<table>
    <tbody>
        {#if propertyValue.name}
        <tr>
            <th>Property Name</th>
            <td>{propertyValue.name}</td>
        </tr>
        {/if}
        {#if propertyValue.propertyID}
        <tr>
            <th>Property ID</th>
            <td>{propertyValue.propertyID}</td>
        </tr>
        {/if}
        {#if propertyValue.description}
        <tr>
            <th>Description</th>
            <td>{propertyValue.description}</td>
        </tr>
        {/if}
        {#if propertyValue.alternateName}
        <tr>
            <th>Alternate Name</th>
            <td>{propertyValue.alternateName}</td>
        </tr>     
        {/if}
        {#if propertyValue.value}
        <tr>
            <th>Value</th>
            <td>{propertyValue.value}</td>
        </tr>
        {/if}
        {#if propertyValue.valueReference}
        <tr>
            <th>Value Reference</th>
            <td>{propertyValue.valueReference}</td>
        </tr>
        {/if}
        {#if propertyValue.unit}
        <tr>
            <th>Unit</th>
            <td>{propertyValue.unit}</td>
        </tr>
        {/if}
        {#if propertyValue.unitCode}
        <tr>
            <th>Unit Code</th>
            <td>{propertyValue.unitCode}</td>
        </tr>
        {/if}
        {#if propertyValue.measurementMethod}
        <tr>
            <th>Measurement Method</th>
            <td>{propertyValue.measurementMethod}</td>
        </tr>
        {/if}
        {#if propertyValue.comments}
        <tr>
            <th>Comments</th>
            <td>
                <ul>
                    {#each propertyValue.comments as comment}
                    <li>{JSON.stringify(comment)}</li>
                    {/each}
                </ul>                
            </td>
        </tr>
        {/if}
    </tbody>
</table>