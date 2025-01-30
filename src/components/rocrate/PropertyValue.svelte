<script lang="ts">
    export let propertyValue;
</script>

<table>
    <tbody>
        {#if propertyValue.category}
        <tr>
            <th>Category</th>
            <td>{propertyValue.category}</td>
        </tr>
        {/if}
        {#if propertyValue.categoryCode}
        <tr>
            <th>Category Code</th>
            <td>{propertyValue.categoryCode}</td>
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
        {#if propertyValue.valueCode}
        <tr>
            <th>Value Code</th>
            <td>{propertyValue.valueCode}</td>
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