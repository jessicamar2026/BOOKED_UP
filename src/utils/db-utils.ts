export async function safeQuery(queryFn: () => Promise<any>) {
  try {
    return await queryFn();
  } catch (error) {
    console.error("DB Error:", error);
    throw error;
  }
}