<script>
    import { rocrate } from "@/stores/rocrate";

    export let ontologyAnnotation;
</script>

<table>
    <tbody>
        {#if ontologyAnnotation.name}
        <tr>
            <th>Annotation Value</th>
            <td>{ontologyAnnotation['name']}</td>
        </tr>
        {/if}
        {#if ontologyAnnotation.termCode}
        <tr>
            <th>Term Accession</th>
            <td>{ontologyAnnotation['termCode']}</td>
        </tr>
        {/if}
    </tbody>
</table>