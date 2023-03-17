<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type { Card } from '$lib/deck';
	import RenderCard from './Card.svelte';
	export let name: string = 'Jon Doe';
	export let cards: Card[] = [];
	// export let score: number = 0;
	let rotation_array = Array.from({ length: cards.length }, (_, index) => index * 15);
</script>

<div class="flex w-screen flex-row justify-center">
	<div class="relative h-32 w-96 border border-black">
		{#each cards as card, i}
			<div class="absolute inset-0 ">
				<RenderCard
					suit={card.getFace()}
					rank={card.getRank()}
					--rotate-amt={rotation_array[i] + 'deg'}
				/>
			</div>
		{/each}
	</div>
	{name}
</div>
