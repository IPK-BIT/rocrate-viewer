<script lang="ts">
    import Pagination from "@/components/general/Pagination.svelte";
    import Modal from "@/components/general/Modal.svelte";
    import ParameterValue from "@/components/rocrate/ParameterValue.svelte";
    import Protocol from "@/components/rocrate/Protocol.svelte";
    import Source from "@/components/rocrate/Source.svelte";
    import Sample from "@/components/rocrate/Sample.svelte";
    import Data from "@/components/rocrate/Data.svelte";

    export let process;

    let focussedParameter;
    function focusParameter(parameter) {
        focussedParameter = parameter;
        document.getElementById("parameter-modal").showModal();
    }

    let focussedSource;
    function focusSource(source) {
        focussedSource = source;
        document.getElementById("source-modal").showModal();
    }

    let focussedSample;
    function focusSample(sample) {
        focussedSample = sample;
        document.getElementById("sample-modal").showModal();
    }

    let focussedData;
    function focusData(data) {
        focussedData = data;
        document.getElementById("data-modal").showModal();
    }

    let page = 0;
    let paginationSize = 10;
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
                    {#if i >= page * paginationSize && i < (page + 1) * paginationSize}
                        <tr>
                            <td>
                                <button class="btn-ghost modal-link" on:click={()=>focusSource(input)}>
                                    {input.name}
                                </button>
                            </td>
                            <!-- <td>{JSON.stringify(input, null, 2)}</td> -->
                            {#if process.executesProtocol}
                                <td>
                                    <button class="btn-ghost modal-link" on:click={() => document.getElementById("protocol-modal",).showModal()}>
                                        {process.executesProtocol.name}
                                    </button>
                                </td>
                            {:else}
                                <td></td>
                            {/if}
                            {#if process.parameterValues}
                                {#each process.parameterValues as parameter}
                                    <td>
                                        <button class="btn-ghost modal-link" on:click={() => focusParameter(parameter)}>
                                            {parameter.unit? parameter.value + " " + parameter.unit : parameter.value}
                                        </button>
                                    </td>
                                {/each}
                            {/if}
                            <td>
                                <button class="btn-ghost modal-link" on:click={()=>{
                                    if (process.outputs[i]['@type'].includes('Data')) {
                                        focusData(process.outputs[i])
                                    } else if (process.outputs[i]['@type'].includes('Sample')) {
                                        focusSample(process.outputs[i])
                                    }
                                }}
                                >
                                    {process.outputs[i].name}
                                </button>
                            </td>
                            <!-- <td>{JSON.stringify(process.outputs[i], null, 2)}</td> -->
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
        {#if process.inputs.length > 5}
            <Pagination totalCount={process.inputs.length} bind:page bind:paginationSize/>
        {/if}
    </div>
{/if}
<Modal id="source-modal">
    {#if focussedSource}
        <Source source={focussedSource} />
    {/if}
</Modal>
<Modal id="sample-modal">
    {#if focussedSample}
        <Sample sample={focussedSample} />
    {/if}
</Modal>
<Modal id="data-modal">
    {#if focussedData}
        <Data data={focussedData} />
    {/if}
</Modal>
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

    th,
    td {
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
