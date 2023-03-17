<script lang="ts">
	import RenderCard from '../Components/Card.svelte';
	import { fly } from 'svelte/transition';
	import { Deck } from '$lib/deck';
	import { Player, Dealer } from '$lib/player';
	let deck = new Deck();
	const TWENTY_ONE = 21;
	let player = new Player('Kade', deck);
	let dealer = new Dealer('Dealer', deck);
	$: player_score = player.calcScore();
	$: dealer_score = dealer.calcScore();
	let bet_amt = 0;

	let result: { status: boolean; message: string } = {
		status: false,
		message: ''
	};
	function reset_game() {
		let bet_result = 0;
		deck = new Deck();
		player.reset();
		dealer.reset();
		bet_amt = 0;
		stand = false;
		if (player.bag <= 0) {
			player.bag = 100;
		}
		result = {
			status: false,
			message: ''
		};
		player = player;
		dealer = dealer;
	}
	function validate_score(player_score: number, dealer_score: number): void {
		if (player_score > TWENTY_ONE) {
			result = {
				status: true,
				message: 'Player Bust'
			};
		}
		if (player_score === TWENTY_ONE && dealer_score === TWENTY_ONE) {
			result = {
				status: true,
				message: 'Tied'
			};
		}
	}
	function dealer_turn() {
		while (dealer_score < 17) {
			dealer.addCardToHand(deck.pop());
			dealer_score = dealer.calcScore();
		}
		if (dealer_score > TWENTY_ONE) {
			console.log(`player score :${player_score} Dealer score ${dealer_score}`);
			player.bag += bet_amt * 5;
			result = {
				status: true,
				message: 'Dealer Busts, Player Wins!'
			};
		} else if (dealer_score < player_score) {
			if (player_score === 21) {
				player.bag += 1.5 * bet_amt * 5;
			} else {
				player.bag += 1.5 * bet_amt * 5;
			}
			result = {
				status: true,
				message: 'Player Wins'
			};
		} else if (player_score < dealer_score) {
			result = {
				status: true,
				message: 'Dealer Wins'
			};
		} else if (player_score === dealer_score) {
			player.bag += bet_amt * 5;
			result = {
				status: true,
				message: 'Tied'
			};
		}
	}
	let stand: boolean = false;
	$: hover_color = player_score >= 18 ? 'red' : 'green';
	console.log(hover_color);

	let rotation_array = [0, 15, 30, 45, 60, 75, 90];
</script>

{#if result.status == true}
	<div
		class="absolute inset-0 z-10 flex h-screen w-screen flex-col items-center justify-around bg-white/90 backdrop-blur-xl"
		in:fly={{ y: 200, duration: 200 }}
		out:fly={{ y: -200, duration: 200 }}
	>
		{#if result.message.includes('Player') && result.message.includes('Wins')}
			<p class="flex font-pirate text-9xl text-green-500">{result.message}</p>
		{:else if result.message.includes('Tied')}
			<p class="flex font-pirate text-9xl text-yellow-500">{result.message}</p>
		{:else}
			<p class="flex font-pirate text-9xl text-red-500">{result.message}</p>
		{/if}
		<div class="flex flex-col gap-4 font-sans text-2xl">
			<div class="flex flex-row gap-4">
				<p>Player Hand:</p>
				{#each player.hand as card}
					<p class="inline-flex font-pirate">{card.getRank()} {card.getFace()}</p>
				{/each}
			</div>
			<p class="inline-block text-center">Hand Total: {player_score}</p>
			<div class="flex flex-row gap-4">
				<p>Dealer Hand</p>
				{#each dealer.hand as card}
					<p class="inline-flex font-pirate">{card.getRank()} {card.getFace()}</p>
				{/each}
			</div>
			<p class="inline-block text-center">
				Hand Total: {dealer_score}
			</p>
		</div>
		<!-- <div>Bet: {bet_amt * 5} Won: {bet_result}</div> -->
		<button
			class="flex rounded-xl border-2 border-green-700 bg-green-600 p-8 font-pirate text-4xl hover:border-green-400"
			on:click={(event) => reset_game()}>Play again?</button
		>
	</div>
{/if}
<body class="relative flex h-screen w-screen flex-col items-center gap-12 overflow-hidden ">
	<section class="flex flex-grow-0 flex-col py-24" id="dealer">
		<div class="flex w-screen flex-row justify-center ">
			<div class="relative flex h-32 w-36 flex-row justify-between ">
				{#each dealer.hand as card, i}
					{#if i == 0 && player.hand.length < 3 && !stand}
						<div class="absolute inset-0">
							<RenderCard
								suit={card.getFace()}
								rank={card.getRank()}
								show={false}
								--rotate-amt={rotation_array[i] + 'deg'}
							/>
						</div>
					{:else}
						<div class="absolute inset-0 ">
							<RenderCard
								suit={card.getFace()}
								rank={card.getRank()}
								--rotate-amt={rotation_array[i] + 'deg'}
							/>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div class="m-auto flex flex-col items-center" />
	</section>
	<section class="relative flex flex-grow flex-col">
		<div class="flex h-fit w-screen flex-1 flex-row justify-center ">
			<div class="relative flex h-32 w-36 flex-row justify-between">
				{#each player.hand as card, i}
					<div class="absolute inset-0 ">
						<RenderCard
							suit={card.getFace()}
							rank={card.getRank()}
							--rotate-amt={rotation_array[i] + 'deg'}
						/>
					</div>
				{/each}
			</div>
		</div>
		<div class=" m-auto flex flex-col items-center">
			<div class="flex flex-row gap-4 pb-4 font-pirate text-5xl">
				<button
					class=" hover:border-500-[{hover_color}] rounded border-2  px-4 py-1 font-pirate transition-colors hover:shadow-lg"
					style="border-color: {player_score >= 18 ? 'rgb(234 179 8)' : 'rgb(34 197 94)'}"
					on:click={(event) => {
						player.addCardToHand(deck.pop());
						player.calcScore();
						validate_score(player.calcScore(), dealer.calcScore());
						player = player;
					}}>Hit</button
				>
				<button
					class="flex justify-center rounded-lg border-2 px-4 py-1 transition-colors duration-100 ease-in hover:border-neutral-500 hover:shadow-lg"
					on:click={(event) => {
						dealer_score = dealer.calcScore();
						dealer_turn();
						stand = true;
						dealer = dealer;
					}}>Stand</button
				>
				<button
					class="flex justify-center rounded-lg border-2 px-4 py-1 transition-colors duration-100 ease-in hover:border-neutral-500 hover:shadow-lg hover:hover:shadow-none disabled:border-neutral-500 disabled:bg-neutral-400"
					disabled={player.bag <= 0 ? true : false}
					on:click={(event) => {
						player.bag -= 5;
						bet_amt += 1;
						console.log(bet_amt);
					}}>Bet 5</button
				>
			</div>
			<div class="flex flex-row gap-12">
				<span class="flex pl-2 "> Doubloons: {player.bag.toFixed(0)}</span>
				<span class="flex pl-2 "> Bet placed: {bet_amt * 5}</span>
				<span class="flex pl-2 "> Hand Total: {player_score}</span>
			</div>
		</div>
	</section>
</body>
