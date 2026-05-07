<script lang="ts">
  import { api } from "$lib/api";
  import { onMount } from "svelte";

  let books: any[] = [];

  onMount(async () => {
    const res = await api.get("/books");
    books = res.data || [];
  });
</script>

<header>
  <h1>📚 Booked Up</h1>
  <nav>
    <a href="/login">Login</a>
    <a href="/register">Sign up</a>
  </nav>
</header>

<main>
  <h2>Books</h2>

  {#if books.length === 0}
    <p>No books found</p>
  {:else}
    <ul>
      {#each books as book}
        <li>{book.title}</li>
      {/each}
    </ul>
  {/if}
</main>

<a href="/clubs">Create a club!</a>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ddd;
  }

  nav a {
    margin-left: 12px;
    text-decoration: none;
    color: blue;
  }

  main {
    font-family: Arial, sans-serif;
    padding: 20px;
  }

  h1 {
    margin: 0;
  }
</style>