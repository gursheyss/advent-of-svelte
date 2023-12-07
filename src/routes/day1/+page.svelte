<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	const { data } = $props();

	const naughtyList = $state(data.naughtyList);
	const niceList = $state(data.niceList);

	let name = $state('');
	let tally = $state(0);

	const handleSubmit = () => {
		const list = tally > 0 ? niceList : naughtyList;
		const item = list.find((item) => item.name === name);
		if (item) {
			item.tally = tally;
		} else {
			list.push({ name, tally });
		}

		niceList.sort((a, b) => b.tally - a.tally);
		naughtyList.sort((a, b) => b.tally - a.tally);

		name = '';
		tally = 0;
	};
</script>

<div class="flex flex-row space-x-10 pt-5 pl-5">
	<div>
		<p>Nice List</p>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Name</Table.Head>
					<Table.Head>Tally</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each niceList as item}
					<Table.Row>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.tally}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<div>
		<p>Naughty List</p>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Name</Table.Head>
					<Table.Head>Tally</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each naughtyList as item}
					<Table.Row>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.tally}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<form class="flex w-full max-w-sm pt-4 items-start space-x-2" onsubmit={handleSubmit}>
		<Input bind:value={name} placeholder="Name" />
		<Input bind:value={tally} placeholder="Tally" />
		<Button type="submit">Add/Modify</Button>
	</form>
</div>
