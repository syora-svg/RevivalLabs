export async function POST(request) {
  const { agentId } = await request.json();

  const response = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: agentId || process.env.RETELL_AGENT_ID,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return Response.json({ error }, { status: response.status });
  }

  const data = await response.json();
  // Only return the access token to the client — never expose the API key
  return Response.json({ access_token: data.access_token });
}
