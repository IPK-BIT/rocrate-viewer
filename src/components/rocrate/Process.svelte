<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import ParameterValue from "@/components/rocrate/ParameterValue.svelte";
    import Protocol from "@/components/rocrate/Protocol.svelte";

    export let process;

    let focussedParameter;
    function focusParameter(parameter) {
        focussedParameter = parameter;
        document.getElementById('parameter-modal').showModal();
    }
</script>

{#if process}
<div class="container">
<table>
    <thead>
        <tr>
            <th>Inputs</th>
            <th>Protocol</th>
            {#if process.parameterValues}
            {#each process.parameterValues as parameter}
            <th>{parameter.category}</th>
            {/each}
            {/if}
            <th>Outputs</th>
        </tr>
    </thead>
    <tbody>
        {#each process.inputs as input, i}
        <tr>
            <td>{input.name}</td>
            {#if process.executesProtocol}
            <td><button class="btn-ghost modal-link" on:click={()=>document.getElementById('protocol-modal').showModal()}>{process.executesProtocol.name}</button></td>
            {:else}
            <td></td>
            {/if}
            {#if process.parameterValues}
            {#each process.parameterValues as parameter}
            <td><button class="btn-ghost modal-link" on:click={()=>focusParameter(parameter)}>{parameter.unit?parameter.value+' '+parameter.unit:parameter.value}</button></td>
            {/each}
            {/if}
            <td>{process.outputs[i].name}</td>
        </tr>
        {/each}
    </tbody>
</table>
</div>
{/if}


<Modal id="parameter-modal">
    {#if focussedParameter}
    <ParameterValue parameterValue={focussedParameter} />
    {/if}
</Modal>
<Modal id="protocol-modal">
    {#if process && process.executesProtocol}
    <Protocol protocol={process.executesProtocol} />
    {/if}
</Modal>

<style>
    table {
        border-collapse: collapse;
        margin-right: 2rem;
        overflow-x: clip;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tbody tr:hover {
        background-color: #f1f1f1;
    }
    .container {
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
    }
</style>