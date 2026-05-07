<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { onMount } from 'svelte';
  // import { setUser } from '$lib/auth.svelte';
  import { toast } from '$lib/toast.svelte';

  onMount(async () => {
    await api.del('/api/sessions');
    // setUser(null);
    toast.show('Logged out', 'info');
    goto('/home-page');
  });
</script>

<p>Logging out...</p>
