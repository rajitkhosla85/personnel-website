<script lang="ts">
	let { text, IconComponent } = $props();
</script>

<div class="flex flex-col items-center text-center text-xs sm:text-sm">
	<IconComponent class="text-3xl sm:text-4xl" />
	<span class="mt-1">{text}</span>
</div>

<style></style>
