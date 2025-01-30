<script lang="ts">
    import { hans } from "@/stores/appstate";
    import { rocrate } from "@/stores/rocrate";


	async function loadROCrateFromJSON() {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json,application/json';
		input.onchange = () => {
			let fileLoaded = (e: Event) => {
				if (e.target) {
					let lines = (e.target as FileReader).result as string;
					let json = JSON.parse(lines);
					$rocrate = json;
					$hans = hans.GUI;
				}
			};

			let fr = new FileReader();
			fr.onload = fileLoaded;
			if (input.files && input.files[0]) {
				fr.readAsText(input.files[0]);
			}
		};
		input.click();
	}

</script>

<section class="centered">
	<div class="card card-side bg-base-100 shadow-xl">
		<figure>
			<img
			src="/rocrate-viewer/rocrate.png"
			style="width: 10rem; margin: 0 auto;"
			alt="RO-Crate" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">RO Crate Viewer</h2>
			<p>Upload an ARC RO-Crate to view its content.</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary w-full" on:click|preventDefault={() => loadROCrateFromJSON()}>Upload ARC RO-Crate</button>
			</div>
		</div>
	</div>
</section>


<style>
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.w-full {
		width: 100%;
	}
</style>