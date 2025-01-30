<script>
    export let organization;
</script>

<table>
    <tbody>
        {#if 'name' in organization}
        <tr>
            <th>Name</th>
            <td>{organization['name']}</td>
        </tr>
        {/if}
    </tbody>
</table>