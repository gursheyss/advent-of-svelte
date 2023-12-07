<script lang="ts">
	const modules = import.meta.glob('./**/+page.svelte');
	let routes = Object.keys(modules).map((path) => {
		const day = path.split('/')[1];
		return {
			path: `/${day}`,
			name: day
		};
	});
</script>

<h1>advent of svelte</h1>
<div class="flex flex-col">
	{#each routes as { path, name }}
		<a class="text-blue-600 underline" href={path}>{name}</a>
	{/each}
</div>
