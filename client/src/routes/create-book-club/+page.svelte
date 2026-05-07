<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { toast } from '$lib/toast.svelte';

  let clubName = $state('');
  let accessibility = $state('');
  let option = $state('');
  let joinCode = $state('');
  let maxMembers = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await api.post('api/clubs', {
      clubName,
      accessibility,
      joinCode,
      maxMembers,
    });

    submitting = false;

    if (!result.ok) {
      toast.show('Book club could not be created.', 'error');
      return;
    }

    toast.show('Book club created!', 'success');
    goto('/home-page');
  }
</script>

<h1>Register</h1>
<form onsubmit={handleSubmit}>
  <label>
    Book Club Name
    <input type="clubName" bind:value={clubName} required />
  </label>

  <select>
    Accessibility
    <select bind:value={option}>
      <option value="a">public</option>
      <option value="b">private</option>
      <option value="c">invite only</option>
    </select>
  </select>

  {#if option === 'c'}
    <label>
      Join Code
      <input type="text" bind:value={joinCode} required />
    </label>
  {/if}

  <label>
    Maximum Members
    <input type="maxMembers" bind:value={maxMembers} required />
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Creating book club...' : 'Create a Book Club'}
  </button>
</form>
