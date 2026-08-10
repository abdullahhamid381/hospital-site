export function unsplash(id: string, width = 1200, quality = 80) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
