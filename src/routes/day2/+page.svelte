<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	let cookieCount = $state(0);
</script>

<div class="p-4">
	<Button onclick={() => cookieCount++}>Add</Button>
	<Button onclick={() => cookieCount--}>Remove</Button>
	<Button onclick={() => (cookieCount = 0)}>Reset</Button>
	Cookie Count: {cookieCount}
</div>
