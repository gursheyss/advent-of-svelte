<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let beats = $state<number[]>([]);

	let bpm = $derived(
		beats.length > 1
			? Math.round(60000 / ((beats[beats.length - 1] - beats[0]) / (beats.length - 1)))
			: 0
	);
</script>

<Button
	onclick={() => {
		beats = [...beats, Date.now()];
	}}>Add Beat</Button
>

<Button
	onclick={() => {
		beats = [];
	}}>Reset</Button
>

<p>BPM: {bpm}</p>
