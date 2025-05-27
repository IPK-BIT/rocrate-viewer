<script>
    import { rocrate } from "@/stores/rocrate";
    import Pagination from "@/components/general/Pagination.svelte";
    import Modal from "@/components/general/Modal.svelte";
    import ParameterValue from "@/components/rocrate/ParameterValue.svelte";
    import Protocol from "@/components/rocrate/Protocol.svelte";
    import Source from "@/components/rocrate/Source.svelte";
    import Sample from "@/components/rocrate/Sample.svelte";
    import Data from "@/components/rocrate/Data.svelte";

    export let processes;    
    
    let focussedParameter;
    function focusParameter(parameter) {
        focussedParameter = $rocrate['@graph'].find(n=>{return n['@id']===parameter['@id']});
        document.getElementById("parameter-modal").showModal();
    }

    let focussedSource;
    function focusSource(source) {
        focussedSource = $rocrate['@graph'].find(n=>{return n['@id']===source['@id']});;
        document.getElementById("source-modal").showModal();
    }

    let focussedSample;
    function focusSample(sample) {
        focussedSample = $rocrate['@graph'].find(n=>{return n['@id']===sample['@id']});;
        document.getElementById("sample-modal").showModal();
    }

    let focussedData;
    function focusData(data) {
        focussedData = $rocrate['@graph'].find(n=>{return n['@id']===data['@id']});;
        document.getElementById("data-modal").showModal();
    }

    let focussedProtocol;
    function focusProtocol(protocol) {
        focussedProtocol = $rocrate['@graph'].find(n=>{return n['@id']===protocol['@id']});;
        document.getElementById("protocol-modal").showModal();
    }

    let page = 0;
    let paginationSize = 10;
</script>

{#if processes.length > 0}
<table style="overflow-x: auto; width: 100%">
    <thead>
        <tr>
            <th>Object</th>
            <th>Protocol</th>
            {#each processes[0]['parameterValue'] as parameterValue}
                <th>
                    {#await $rocrate['@graph'].find(n => { return n['@id'] == parameterValue['@id'] })}
                        <p>Loading...</p>
                    {:catch error}
                        <p>Error: {error.message}</p>
                    {:then paramDetails} 
                        <p>Parameter[{paramDetails.name}]</p>
                    {/await}
                </th>
            {/each}
            <th>Result</th>
        </tr>
    </thead>
    <tbody>
        {#each processes as process, i}
            {#if i >= page * paginationSize && i < (page + 1) * paginationSize}
            <tr>
                <td>
                    {#await $rocrate['@graph'].find(n => { return n['@id'] == process['object']['@id'] })}
                        <p>Loading...</p>
                    {:catch error}
                        <p>Error: {error.message}</p>
                    {:then objectDetails} 
                        <button class="btn-ghost modal-link" onclick={()=>focusSource(objectDetails)}>{objectDetails['name']}</button>
                    {/await}
                </td>
                <td>
                    {#await $rocrate['@graph'].find(n => { return n['@id'] == process['executesLabProtocol']['@id'] })}
                        <p>Loading...</p>
                    {:catch error}
                        <p>Error: {error.message}</p>
                    {:then protocolDetails} 
                        <button class="btn-ghost modal-link" onclick={() => focusProtocol(protocolDetails)}>{protocolDetails['name']}</button>
                    {/await}
                </td>
                    {#if process['parameterValue']}
                        {#each process['parameterValue'] as param}
                            <td>
                                {#await $rocrate['@graph'].find(n => { return n['@id'] == param['@id'] })}
                                    <p>Loading...</p>
                                {:catch error}
                                    <p>Error: {error.message}</p>
                                {:then paramDetails}
                                {#if paramDetails['value']} 
                                    <button class="btn-ghost modal-link" onclick={()=>focusParameter(paramDetails)}>{paramDetails.value} {paramDetails.unitText}</button>
                                {/if}
                                {/await}
                            </td>
                        {/each}
                    {/if}
                <td>
                    {#await $rocrate['@graph'].find(n => { return n['@id'] == process['result']['@id'] })}
                        <p>Loading...</p>
                    {:catch error}
                        <p>Error: {error.message}</p>
                    {:then resultDetails}
                        <button class="btn-ghost modal-link" onclick={()=>focusSample(resultDetails)}>{resultDetails['name']}</button>
                    {/await}
                </td>
            </tr>
            {/if}
        {/each}
    </tbody>
</table>
{#if processes.length > 5}
    <Pagination totalCount={processes.length} bind:page bind:paginationSize/>
{/if}
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
    {#if focussedProtocol}
        <Protocol protocol={focussedProtocol} />
    {/if}
</Modal>
