<script lang="ts">
  import { goto } from '$app/navigation';
  import { post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';

  let email = $state('');
  let password = $state('');

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const result = await post('/api/home-page', { email, password });

    if (!result.ok) {
      addToast('Something went wrong', 'error');
      return;
    }

    addToast('Success!', 'success');
    goto('home-page');
  }
</script>

<form onsubmit={handleSubmit}>
  <input type="email" bind:value={email} required/>
  <button type="submit">Submit</button>
</form>

<p>Not a member? <a href="/register">Create an acoount</a></p>
