<script lang="ts">
    import Investigation from "@/components/pages/Investigation.svelte";
    import People from "@/components/pages/People.svelte";
    import Studies from "@/components/pages/Studies.svelte";
    import Assays from "@/components/pages/Assays.svelte";
    import ComponentWrapper from "@/components/general/ComponentWrapper.svelte";

    import { rocrateLevel } from '@/stores/rocrate';
    import Ontologies from "@/components/pages/Ontologies.svelte";

    const components: any = {
        'investigation': Investigation,
        'people': People,
        'studies': Studies,
        'assays': Assays,
        'ontologies': Ontologies
    }
</script>

<ComponentWrapper
    component={components[$rocrateLevel]}
/>