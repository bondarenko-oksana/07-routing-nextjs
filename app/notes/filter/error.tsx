
'use client';
import type { ComponentPropsWithoutRef } from 'react';

interface ErrorProps {
  error: Error;
  reset?: () => void;
}

export default function NotesError({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: 24 }}>
      <p>Could not fetch the list of notes. {error?.message}</p>
      {reset && (
        <button onClick={reset} style={{ marginTop: 12 }}>
          Try again
        </button>
      )}
    </div>
  );
}

