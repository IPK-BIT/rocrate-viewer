<script lang="ts">
    export let totalCount;
    export let page = 0;
    export let paginationSize = 10;
</script>

<div class="pagination">
    <button on:click={() => page = 0} disabled={page == 0}>First</button>
    <button on:click={() => page--} disabled={page == 0}>Previous</button>
    <select bind:value={paginationSize}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
    </select>
    <button on:click={() => page++} disabled={page >= Math.ceil(totalCount/paginationSize)-1}>Next</button>
    <button on:click={() => page = Math.ceil(totalCount/paginationSize)-1} disabled={page >= Math.ceil(totalCount/paginationSize)-1}>Last</button>
    <span>Page {page+1} of {Math.ceil(totalCount/paginationSize)}</span>
</div>

<style>
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
        margin-top: 2rem;
    }

.pagination button,
.pagination select {
    padding: .5rem 1rem;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    font-size: medium;
    transition: background-color 0.3s ease;
}

.pagination button:hover,
.pagination select:hover {
    background-color: hsl(var(--neutral-h), var(--neutral-s), calc(var(--neutral-l) - 10%));
}

.pagination button[disabled] {
    border: 1px solid #ccc;
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination button[disabled]:hover {
    background-color: var(--neutral);
}

.pagination select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.pagination span {
    font-size: medium;
    color: #333;
}
</style>

