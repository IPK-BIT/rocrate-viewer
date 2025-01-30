<script lang="ts">
    import Person from '@/components/rocrate/Person.svelte';
    import { rocrate, rocrateLevel } from '@/stores/rocrate';

    let people = $rocrate['about']['people'];

    let person;
    function focusPerson(personId: string) {
        person = people.find(p => p['@id'] === personId);
    }
</script>

<div class="grid">
    <ul>
    {#each people as person}
        <li>
            <button class="btn-ghost font-medium" on:click={()=>focusPerson(person['@id'])}>{person['firstName']} {person['lastName']}</button>
        </li>
    {/each}
    </ul>

    <section>

        <div class="main-content">
        {#if person}
                <Person bind:person/>
        {:else}
            {#if people && people.length > 0}
                <p>Select a person to view their details</p>
            {:else}
                <p>No people found</p>
            {/if}
        {/if}
        </div>
    </section>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: .5rem;
    }

    .main-content {
        padding-top: 1rem;
    }  
</style>