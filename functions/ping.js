export default function ping() {
  return new Response('pong', {
    headers: { 'Content-Type': 'text/plain' }
  });
}
