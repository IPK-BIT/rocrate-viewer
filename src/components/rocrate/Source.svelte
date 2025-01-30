<script lang="ts">
    import Modal from "@/components/general/Modal.svelte";
    import PropertyValue from "@/components/rocrate/PropertyValue.svelte";

    let focussedCharacteristic;
    function focusCharacteristic(characteristic) {
        focussedCharacteristic = characteristic;
        document.getElementById("source-characteristic-modal").showModal();
    }

    export let source;
</script>

<table>
    <tbody>
        {#if source.name}
        <tr>
            <th>Name</th>
            <td>{source.name}</td>
        </tr>
        {/if}
        {#if source.characteristics}
        <tr>
            <th>Characteristics</th>
            <td>
                <ul>
                    {#each source.characteristics as characteristic}
                    <li class="list-none"><button class="btn-ghost modal-link" on:click={()=>focusCharacteristic(characteristic)}>{characteristic.category}: {characteristic.value}</button></li>
                    {/each}
                </ul>
            </td>
        </tr>
        {/if}
    </tbody>
</table>
<Modal id="source-characteristic-modal">
    {#if focussedCharacteristic}
    <PropertyValue propertyValue={focussedCharacteristic} />
    {/if}
</Modal>

<style>
    ul {
        padding: 0;
    }

    .list-none {
        list-style-type: none;
    }
</style>