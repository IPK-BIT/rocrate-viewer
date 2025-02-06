<script lang="ts">
    export let ontology;
</script>

<table>
    <tbody>
        {#if ontology['name']}
        <tr>
            <th>Name</th>
            <td>{ontology['name']}</td>
        </tr>
        {/if}
        {#if ontology['version']}
        <tr>
            <th>Version</th>
            <td>{ontology['version']}</td>
        </tr>
        {/if}
        {#if ontology['file']}
        <tr>
            <th>File</th>
            <td>{ontology['file']}</td>
        </tr>
        {/if}
        {#if ontology['description']}
        <tr>
            <th>Description</th>
            <td>{ontology['description']}</td>
        </tr>
        {/if}
        {#if ontology['comments']}
        <tr>
            <th>Comments</th>
            <td>
                <table style="border: 0;">
                    <tbody>
                    {#each ontology.comments as comment}
                        <tr>
                            <th style="border: 0; border-bottom: 1px solid black;">{comment['name']}</th>
                            <td style="border: 0; border-bottom: 1px solid black;">{comment['value']}</td>
                        </tr>
                    {/each}
                </tbody>
                </table>  
            </td>
        </tr>
        {/if}
    </tbody>
</table>