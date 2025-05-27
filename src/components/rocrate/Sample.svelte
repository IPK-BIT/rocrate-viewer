<script lang="ts">
    import { rocrate } from "@/stores/rocrate"; 
    import PropertyValue from "@/components/rocrate/PropertyValue.svelte";
    import Modal from "@/components/general/Modal.svelte";
    
    let focussedCharacteristic;
    function focusCharacteristic(characteristic) {
        focussedCharacteristic = characteristic;
        document.getElementById("sample-characteristic-modal").showModal();
    }

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
        {#if sample.additionalProperty}
        <tr>
            <th>Characteristics</th>
            <td>
                <table style="border: 0;">
                    <tbody>
                    {#if Array.isArray(sample.additionalProperty)}
                    {#each sample.additionalProperty as characteristic}
                    <tr>
                        {#await $rocrate['@graph'].find(n => { return n['@id'] == characteristic['@id'] })}
                            <td>Loading...</td>
                        {:catch error}
                            <td>Error: {error.message}</td>
                        {:then characteristicDetails}
                            <td style="border: 0; border-bottom: 1px solid black;">{characteristicDetails.name}</td>
                            <td style="border: 0; border-bottom: 1px solid black;">
                                <button class="btn-ghost modal-link" onclick={()=>focusCharacteristic(characteristicDetails)}>{characteristicDetails.value}</button>
                            </td>
                        {/await}
                    </tr>
                    {/each}
                    {:else}
                    <tr>
                        {#await $rocrate['@graph'].find(n => { return n['@id'] == sample.additionalProperty['@id'] })}
                            <td>Loading...</td>
                        {:catch error}
                            <td>Error: {error.message}</td>
                        {:then characteristicDetails}
                            <td style="border: 0; border-bottom: 1px solid black;">{characteristicDetails.name}</td>
                        <td style="border: 0; border-bottom: 1px solid black;">
                            <button class="btn-ghost modal-link" onclick={()=>focusCharacteristic(characteristicDetails)}>{characteristicDetails.value}</button>
                        </td>
                        {/await}
                    </tr>
                    {/if}
                    </tbody>
                </table>
            </td>
        </tr>
        {/if}
    </tbody>
</table>
<Modal id="sample-characteristic-modal">
    {#if focussedCharacteristic}
    <PropertyValue propertyValue={focussedCharacteristic} />
    {/if}
</Modal>