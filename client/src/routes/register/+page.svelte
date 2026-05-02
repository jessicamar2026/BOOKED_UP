<script lang="ts">
  import { goto } from '$app/navigation';
  import { post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';

  let firstName = $state('');
  let lastName = $state('');
  let displayName = $state('');
  let email = $state('');
  let password = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await post('api/register', {
    firstName,
    lastName,
    displayName,
    email,
    password});

    submitting = false;

    if (!result.ok) {
      addToast('Registration failed.', 'error');
    }

    addToast('Account created! Please log in.', 'success');
    goto('/login');
  }
</script>

<h1>Register</h1>
<form onsubmit={handleSubmit}>
  <label>
    First Name
    <input type="firstName" bind:value={firstName} required />
  </label>

  <label>
    Last Name
    <input type="lastName" bind:value={lastName} required />
  </label>

  <label>
    Display Name
    <input type="displayName" bind:value={displayName} required />
  </label>

  <label>
    Email
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Creating account...' : 'Register'}
  </button>
</form>

<p>Already have an account? <a href="/login">Log in</a></p>