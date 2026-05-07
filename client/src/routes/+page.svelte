<script lang="ts">
  import { api } from "$lib/api";
  import { auth } from "$lib/auth.svelte";
  import { toast } from "$lib/toast.svelte";
  import { onMount } from "svelte";

  type Book = {
    id: string;
    title: string;
  };

  let books: Book[] = [];
  let loading = true;
  let error = "";

  async function loadBooks() {
    loading = true;
    error = "";

    const res = await api.get<Book[]>("/books");

    if (!res.ok) {
      error = "Failed to load books";
      books = [];
    } else {
      books = res.data || [];
    }

    loading = false;
  }

  onMount(() => {
    loadBooks();
  });
</script>