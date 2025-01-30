<script lang="ts">
    export let id: string;
</script>

<dialog id={id} class="modal">
  <div class="">
      <form method="dialog" class="button-bar">
        <button class="btn btn-ghost">✕</button>
      </form>
    <div >
      <slot/>
    </div>    
  </div>
</dialog>

<style>
  .modal {
    height: fit-content;
  }
  .button-bar {
    display: flex;
    justify-content: flex-end;
  }
</style>