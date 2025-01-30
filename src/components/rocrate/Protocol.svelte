<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import OntologyAnnotation from "@/components/rocrate/OntologyAnnotation.svelte";

    export let protocol;
</script>

<table>
    <tbody>
        {#if protocol.name}
        <tr>
            <th>Name</th>
            <td>{protocol.name}</td>
        </tr>
        {/if}
        {#if protocol.protocolType}
        <tr>
            <th>Protocol Type</th>
            <td><button class="btn-ghost modal-link" on:click={()=>document.getElementById('protocol-annotation-modal').showModal()}>{protocol.protocolType.annotationValue}</button></td>
        </tr>
        {/if}
        {#if protocol.description}
        <tr>
            <th>Description</th>
            <td>{protocol.description}</td>
        </tr>
        {/if}
        {#if protocol.version}
        <tr>
            <th>Version</th>
            <td>{protocol.version}</td>
        </tr>
        {/if}
        {#if protocol.components}
        <tr>
            <th>Components</th>
            <td>
                <ul>
                    {#each protocol.components as component}
                    <li>{component}</li>
                    {/each}
                </ul>
            </td>
        </tr>
        {/if}
        {#if protocol.reagents}
        <tr>
            <th>Reagents</th>
            <td>
                <ul>
                    {#each protocol.reagents as reagent}
                    <li>{reagent}</li>
                    {/each}
                </ul>
            </td>
        </tr>
        {/if}
        {#if protocol.computationalTools}
        <tr>
            <th>Computational Tools</th>
            <td>
                <ul>
                    {#each protocol.computationalTools as tool}
                    <li>{tool}</li>
                    {/each}
                </ul>
            </td>
        </tr>
        {/if}
        {#if protocol.uri}
        <tr>
            <th>URI</th>
            <td><a
                    href={protocol.uri}
                    target="_blank"
                    rel="noopener noreferrer">{protocol.uri}</a></td>
        </tr>
        {/if}
        {#if protocol.comments}
        <tr>
            <th>Comments</th>
            <td>{protocol.comments}</td>
        </tr>
        {/if}
    </tbody>
</table>
<Modal id="protocol-annotation-modal">
    {#if protocol.protocolType}
    <OntologyAnnotation ontologyAnnotation={protocol.protocolType} />
    {/if}
</Modal>