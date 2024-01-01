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

export function sample(): string;
export function sample(n: number): string[];
export function sample(n: number = 1): string[] | string {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(phrases[Math.floor(Math.random() * phrases.length)]);
  }
  return res.length === 1 ? res[0] : res;
}
