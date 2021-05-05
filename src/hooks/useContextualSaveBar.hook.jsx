import { useState, useEffect } from 'react'

export default function useContextualSaveBar(save, discard) {
  const [shouldSave, setShouldSave] = useState(false);
  const [shouldDiscard, setShouldDiscard] = useState(false);

  useEffect(() => {
    if (shouldSave) {
      save[0]();
      setShouldSave(false);
    }
  }, [shouldSave, ...save]);

  useEffect(() => {
    if (shouldDiscard) {
      discard[0]();
      setShouldDiscard(false);
    }
  }, [shouldDiscard, ...discard]);

  return [() => setShouldSave(true), () => setShouldDiscard(true)];
}