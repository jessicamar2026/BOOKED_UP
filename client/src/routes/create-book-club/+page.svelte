<script lang="ts">
  import { goto } from '$app/navigation';
  import { post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';

  let clubName = $state('');
  let accessibility = $state('');
  let joinCode = $state('');
  let maxMembers = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await post('api/clubs', {
      clubName,
      accessibility,
      joinCode,
      maxMembers,
    });

    submitting = false;

    if (!result.ok) {
      addToast('Book club could not be created.', 'error');
      return;
    }

    addToast('Book club created!', 'success');
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
    <option value="a">public</option>
    <option value="b">private</option>
    <option value="c">invite only</option>
  </select>

  {#if value === "c"}
    <label>
      Join Code
      <input type="joinCode" bind:value={joinCode} required />
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