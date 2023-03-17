<script lang="ts">
	import { fly } from 'svelte/transition';
	export let suit: string;
	export let rank: string | number;
	export let show: boolean = true;
</script>

<article
	id="card"
	class=" grid h-32 w-24 grid-rows-1 rounded-lg border-2 border-neutral-600 bg-white shadow-lg"
	transition:fly={{ y: 200, duration: 100 }}
>
	<div
		class="relative grid max-w-[6rem] grid-cols-2 font-pirate text-5xl"
		style="color: {show ? 'black' : 'white'}"
	>
		<div class="absolute top-0 left-0 flex flex-col items-center p-2">
			<p>{rank}</p>
			<p>{suit}</p>
		</div>
		<div class="absolute bottom-0 right-0 flex flex-col items-center p-2">
			<p>{suit}</p>
			<p>{rank}</p>
		</div>
	</div>
</article>

<style>
	#card {
		rotate: -20deg;
		z-index: 0;
		transform-origin: center 180%;
		transform: rotate(var(--rotate-amt));
		/* rotate: var(--rotate-amt); */
	}
</style>
