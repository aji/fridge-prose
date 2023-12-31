import phrasesRaw from './phrases.txt?raw';

const phrases = phrasesRaw.split('\n').filter((x) => x);

export function search(query: string): string[] {
  const qs = query
    .trim()
    .toLowerCase()
    .split(' ')
    .map((x) => x.trim())
    .filter((x) => x);
  return phrases.filter((s) => qs.every((q) => s.toLowerCase().includes(q)));
}
