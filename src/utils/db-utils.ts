export async function safeQuery(queryFn: () => Promise<any>) {
  try {
    return await queryFn();
  } catch (error) {
    console.error('DB Error:', error);
    throw error;
  }
}

export function parseDatabaseError(error: unknown): { error: string } {
  if (error instanceof Error) {
    return {
      error: error.message,
    };
  }

  return {
    error: 'Unknown database error',
  };
}
