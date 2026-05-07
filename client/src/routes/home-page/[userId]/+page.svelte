<script lang="ts">
  import { getUser } from '$lib/auth.svelte';

  const user = $derived(getUser());
</script>

{#if user}
  <h1>Welcome back, {user.displayName}</h1>
  <p>What would you like to do?</p>
  <a href="/clubs" role="button">View Clubs</a>
{:else}
  <h1>Booked Up</h1>
  <a href="/register" role="button">Get started</a>
  <a href="/login" role="button" class="secondary">Log in</a>
{/if}
