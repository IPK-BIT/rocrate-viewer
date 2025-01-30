<script lang="ts">
    export let sample;
</script>

<table>
    <tbody>
        {#if sample.name}
        <tr>
            <th>Name</th>
            <td>{sample.name}</td>
        </tr>
        {/if}
        {#if sample.characteristics}
        <tr>
            <th>Characteristics</th>
            <td>
                <ul>
                    {#each sample.characteristics as characteristic}
                    <li class="list-none">{characteristic.category}: {characteristic.value}</li>
                    {/each}
                </ul>
            </td>
        </tr>
        {/if}
    </tbody>
</table>