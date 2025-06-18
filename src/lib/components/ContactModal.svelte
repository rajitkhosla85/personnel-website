<script lang="ts">
	import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';

	let { open = $bindable(true) } = $props();

	let formData = $state({
		first_name: '',
		last_name: '',
		email: '',
		comment: ''
	});
	let errors = $state({
		first_name: '',
		last_name: '',
		email: '',
		comment: ''
	});

	// Validate form fields
	function validateForm() {
		let isValid = true;

		// Clear previous errors
		errors.first_name = '';
		errors.last_name = '';
		errors.email = '';
		errors.comment = '';

		// First name validation
		if (!formData.first_name.trim()) {
			errors.first_name = 'First name is required';
			isValid = false;
		}

		// Last name validation
		if (!formData.last_name.trim()) {
			errors.last_name = 'Last name is required';
			isValid = false;
		}

		// Email validation
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Email is invalid';
			isValid = false;
		}

		return isValid;
	}

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Validate form
		if (!validateForm()) {
			console.log('Form has errors');
			return; // Stop submission if validation fails
		}

		// Proceed to submit the form if valid
		try {
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

<div class="mx-auto w-full max-w-sm sm:max-w-xl">
	<Modal bind:open title="Contact Form" class="w-screen">
		<div class="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
			<form onsubmit={handleSubmit}>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-6">
					<Label class="space-y-1 sm:col-span-3">
						<span>First Name</span>
						<Input
							name="first_name"
							class="w-full outline-none"
							bind:value={formData.first_name}
							placeholder="e.g. John"
							required
						/>
						{#if errors.first_name}
							<p class="text-xs text-red-500">{errors.first_name}</p>
						{/if}
					</Label>

					<Label class="space-y-1 sm:col-span-3">
						<span>Last Name</span>
						<Input
							name="last_name"
							class="w-full outline-none"
							bind:value={formData.last_name}
							placeholder="e.g. Doe"
							required
						/>
						{#if errors.last_name}
							<p class="text-xs text-red-500">{errors.last_name}</p>
						{/if}
					</Label>

					<Label class="space-y-1 sm:col-span-3">
						<span>Email</span>
						<Input
							name="email"
							type="email"
							class="w-full outline-none"
							bind:value={formData.email}
							placeholder="e.g. johndoe@xyz.com"
						/>
						{#if errors.email}
							<p class="text-xs text-red-500">{errors.email}</p>
						{/if}
					</Label>

					<Label class="space-y-1 sm:col-span-3">
						<span>Comment</span>
						<Textarea
							name="comment"
							class="w-full outline-none"
							bind:value={formData.comment}
							placeholder="Your message here..."
						/>
						{#if errors.comment}
							<p class="text-xs text-red-500">{errors.comment}</p>
						{/if}
					</Label>
				</div>
			</form>
		</div>

		{#snippet footer()}
			<Button color="amber" type="submit" class="bg-amber-500" onclick={handleSubmit}>Send</Button>
		{/snippet}
	</Modal>
</div>
