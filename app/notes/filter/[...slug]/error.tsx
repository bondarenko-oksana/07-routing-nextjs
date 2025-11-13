
'use client';

interface ErrorProps {
  error: Error;
  reset?: () => void;
}

export default function FilteredNotesError({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Щось пішло не так</h2>
      <p>{error.message}</p>
      {reset && <button onClick={() => reset()}>Спробувати ще раз</button>}
    </div>
  );
}



