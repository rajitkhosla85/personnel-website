<script lang="ts">
	import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';

	let { open = $bindable(true) } = $props();
	let formData = $state({
		first_name: '',
		last_name: '',
		email: '',
		comment: ''
	});
	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();
		debugger;

		// Log the data or send it to an API
		try {
			// Example: Send data to a server
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				console.log('Form submitted successfully');
				open = false; // Close the modal after submission
			} else {
				console.error('Failed to submit form');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}
</script>

<Modal bind:open title="Contact Form" autoclose>
	<!-- Modal body -->
	<div class="space-y-6 p-0">
		<form onsubmit={handleSubmit}>
			<div class="grid grid-cols-6 gap-6">
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>First Name</span>
					<Input
						name="first_name"
						class="outline-none"
						bind:value={formData.first_name}
						placeholder="e.g. John"
						required
					/>
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>Last Name</span>
					<Input
						name="last_name"
						class="border outline-none"
						bind:value={formData.last_name}
						placeholder="e.g. Doe"
						required
					/>
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>Email</span>
					<Input
						name="email"
						type="email"
						bind:value={formData.email}
						class="border outline-none"
						placeholder="e.g. johndoe@xyz.com"
					/>
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>Comment</span>
					<Textarea
						name="comment"
						bind:value={formData.comment}
						class="border outline-none"
						placeholder="e.g. John Doe"
					/>
				</Label>
			</div>
			<!-- Modal footer -->
		</form>
	</div>
	{#snippet footer()}
		<Button color="blue" type="submit" class="bg-amber-500" onclick={handleSubmit}>Send</Button>
	{/snippet}
</Modal>
