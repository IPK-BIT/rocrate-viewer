<script>
    export let ontologyAnnotation;
</script>

<table>
    <tbody>
        {#if ontologyAnnotation.annotationValue}
        <tr>
            <th>Annotation Value</th>
            <td>{ontologyAnnotation['annotationValue']}</td>
        </tr>
        {/if}
        {#if ontologyAnnotation.termSource}
        <tr>
            <th>Term Source</th>
            <td>{ontologyAnnotation['termSource']}</td>
        </tr>
        {/if}
        {#if ontologyAnnotation.termAccession}
        <tr>
            <th>Term Accession</th>
            <td>{ontologyAnnotation['termAccession']}</td>
        </tr>
        {/if}
    </tbody>
</table>