export default async (request) => {
  return new Response('Hello Functions!', {
    headers: { 'Content-Type': 'text/plain' }
  });
}
