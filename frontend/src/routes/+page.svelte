<script>
	import BookingTable from './components/BookingTable.svelte';
	import BookingRangeSelector from './components/BookingRangeSelector.svelte';
	import Paginator from './components/Paginator.svelte';
</script>

<div>
	<div class="table-toolbar">
		<div>
			<span class="material-symbols-outlined"> more_vert </span>
			<BookingRangeSelector />
		</div>

		<div>
			<span class="material-symbols-outlined"> filter_list </span>
			<span class="material-symbols-outlined"> add </span>
		</div>
	</div>

	<BookingTable />
	<Paginator />
</div>

<style lang="scss">
	.table-toolbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		div {
			display: flex;
			flex-direction: row;
		}
	}
</style>
