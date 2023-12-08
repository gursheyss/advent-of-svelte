<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();

	const weightsList = data.json;

	type WeightItem = {
		name: string;
		weight: number;
	};

	let weightsArray: WeightItem[] = $state([]);

	let sum = $derived(weightsArray.reduce((prev, current) => prev + current.weight, 0));

	function removeWeight(index: number) {
		weightsArray = weightsArray.filter((_, i) => i !== index);
	}
</script>

<div class="flex flex-row">
	<div>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Name</Table.Head>
					<Table.Head>Weight</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each weightsList as item, index}
					<Table.Row>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.weight}</Table.Cell>
						<Table.Cell>
							<Button
								onclick={() =>
									weightsArray.push({
										name: item.name,
										weight: item.weight
									})}>Add</Button
							>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="space-y-4">
		<p class={`text-xl p-4 ${sum < 100 ? 'text-green-500' : 'text-red-500'}`}>
			Total Weight: {sum.toFixed(2)}
		</p>
		{#each weightsArray as item, index}
			<div class="flex flex-row space-x-2">
				<p>{item.name}</p>
				<p>{item.weight}</p>
				<Button on:click={() => removeWeight(index)}>Remove</Button>
			</div>
		{/each}
	</div>
</div>
