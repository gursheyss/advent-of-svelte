<script lang="ts">
	type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

	interface Task {
		elf: string;
		task: TaskType;
		minutesTaken: number;
		date: string;
	}

	interface Elf {
		name: string;
		tasksCompleted: number;
	}

	let data = $state<Task[]>([]);

	let toysPerHour = $state(0);
	let averageTimePerToy = $state(0);
	let completionRate = $state<Elf[]>([]);

	$effect(() => {
		setInterval(async () => {
			const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
			data = await response.json();

			toysPerHour =
				(data.reduce((acc, curr) => {
					if (curr.task === 'CREATED_TOY') {
						return acc + 1;
					}
					return acc;
				}, 0) /
					data.length) *
				60;

			averageTimePerToy =
				data.reduce((acc, curr) => {
					if (curr.task === 'CREATED_TOY') {
						return acc + curr.minutesTaken;
					}
					return acc;
				}, 0) / data.length;

			completionRate = data.reduce((acc, curr) => {
				if (curr.task === 'CREATED_TOY') {
					const elf = acc.find((elf) => elf.name === curr.elf);
					if (elf) {
						elf.tasksCompleted++;
					} else {
						acc.push({
							name: curr.elf,
							tasksCompleted: 1
						});
					}
				}
				return acc;
			}, [] as Elf[]);
		}, 1000);
	});
</script>

<h1 class="text-4xl font-bold mb-4">Santa's Workshop</h1>
<p class="text-2xl mb-4">Toys per hour: {toysPerHour.toFixed(2)}</p>
<p class="text-2xl mb-4">Average time taken per toy: {averageTimePerToy.toFixed(2)}</p>
<p class="text-2xl mb-4">Completion rate:</p>
{#each completionRate as elf}
	<p class="text-2xl mb-4">
		{elf.name}: {elf.tasksCompleted}
	</p>
{/each}
