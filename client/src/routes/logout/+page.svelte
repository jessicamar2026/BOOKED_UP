<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { del } from '$lib/api';
  import { setUser } from '$lib/auth.svelte';
  import { addToast } from '$lib/toast.svelte';

  onMount(async () => {
    await del('/api/sessions');
    setUser(null);
    addToast('Logged out', 'info');
    goto('/home-page');
  });
</script>

<p>Logging out...</p>