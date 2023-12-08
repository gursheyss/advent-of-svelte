<script lang="ts">
	let heartRate = $state(0);
	let heartRateHistory = $state<number[]>([]);

	$effect(() => {
		setInterval(async () => {
			const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
			const data = await response.json();
			heartRate = data.heartRate;
			heartRateHistory.push(heartRate);
			if (heartRateHistory.length > 60) {
				heartRateHistory.shift();
			}
		}, 1000);
	});
</script>

<h1 class="text-4xl font-bold mb-4">Santa's Heart Rate Monitor</h1>
<p class="text-2xl mb-4">Current heart rate: {heartRate}</p>
<svg class="w-full h-64 bg-gray-100 p-4 rounded" viewBox="0 0 60 {Math.max(...heartRateHistory)}">
	<polyline
		fill="none"
		stroke="#10b981"
		stroke-width="2"
		points={heartRateHistory.map((rate, i) => `${i},${rate}`).join(' ')}
	/>
</svg>
