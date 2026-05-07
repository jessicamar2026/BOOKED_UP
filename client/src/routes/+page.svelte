<script lang="ts">
  import { auth } from '$lib/auth.svelte';
  import { toast } from '$lib/toast.svelte';
</script>

<h1>Welcome to Booked Up!</h1>

{#if auth.loading}
  <p aria-busy="true">Checking session…</p>
{:else if auth.user}
  <p>Signed in as <strong>{auth.user.displayName}</strong> ({auth.user.email}).</p>
{:else}
  <p>You are not signed in.</p>
  <a href="/register" role="button">Get Started</a>
  <a href="/login" role="button" class="secondary">Log In</a>
{/if}
