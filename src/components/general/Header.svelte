<script lang="ts">
    import { rocrate, rocrateLevel } from "@/stores/rocrate";


</script>

<div class="header">
    <div class="header__container">
        <div class="header__logo">
            <img src="/rocrate-viewer/rocrate.png" alt="RO-Crate logo" />
        </div>
        <div class="header__title">
            {#if $rocrate['about']['title'].length>47 || $rocrate['about']['identifier'].length > 50}
            <h1 title={$rocrate['about']['title']?$rocrate['about']['title']:$rocrate['about']['identifier']}>{($rocrate['about']['title']?$rocrate['about']['title']:$rocrate['about']['identifier']).slice(0, 50)}...</h1>
            {:else}
            <h1>{$rocrate['about']['title']?$rocrate['about']['title']:$rocrate['about']['identifier']}</h1>
            {/if}
        </div>
    </div>
    <div class="header__menu">
        <ul>
            <li><button class="btn-ghost font-medium" on:click={()=>{$rocrateLevel = 'investigation'}}>Investigation</button></li>
            <li><button class="btn-ghost font-medium" on:click={()=>{$rocrateLevel = 'people'}}>People</button></li>
            <li><button class="btn-ghost font-medium" on:click={()=>{$rocrateLevel = 'studies'}}>Studies</button></li>
            <li><button class="btn-ghost font-medium" on:click={()=>{$rocrateLevel = 'assays'}}>Assays</button></li>
            <li><button class="btn-ghost font-medium" on:click={()=>{$rocrateLevel = 'ontologies'}}>Ontologies</button></li>
        </ul>
    </div>
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: var(--neutral);
        border-bottom: 1px solid hsl(var(--neutral-h), var(--neutral-s), calc(var(--neutral-l) - 20%));    
    }

    .header__logo img {
        height: 3rem;
    }

    .header__title h1 {
        font-size: 1.5rem;
        margin: 0;
    }

    .header__menu ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .header__menu ul li {
        display: inline;
        margin-right: 1rem;
    }

    .header__container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>