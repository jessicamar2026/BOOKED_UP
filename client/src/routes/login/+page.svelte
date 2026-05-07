<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { toast } from '$lib/toast.svelte';

  let email = $state('');
  let password = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;
    const result = await api.post('/home-page', { email, password });

    if (result.status === 403) {
      toast.show('Invalid email or password', 'error');
      return;
    }

    if (!result.ok) {
      toast.show('Something went wrong', 'error');
      return;
    }

    // await fetchUser();
    submitting = false;
    toast.show('Success!', 'success');
    goto('/home-page');
  }
</script>

<h1>Log in</h1>
<form onsubmit={handleSubmit}>
  <label>
    Email
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Logging in...' : 'Log In'}
  </button>
</form>

<p>Not a member? <a href="/register">Create an acoount</a></p>
