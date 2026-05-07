import { QueryFailedError } from "typeorm";

export function parseDatabaseError(error: unknown): string {
  if (error instanceof QueryFailedError) {
    const dbError = error as any;

    if (dbError.code === "23505") {
      return "Duplicate entry error (unique constraint violated)";
    }

    if (dbError.code === "23503") {
      return "Invalid reference (foreign key constraint failed)";
    }

    if (dbError.code === "23502") {
      return "Missing required field";
    }

    return dbError.message || "Database query failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown server error";
}