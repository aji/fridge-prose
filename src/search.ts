import phrasesRaw from './phrases.txt?raw';

const phrases = phrasesRaw.split('\n').filter((x) => x);

export function search(query: string): string[] {
  const q = query.toLowerCase();
  return phrases.filter((s) => s.toLowerCase().includes(q));
}
