export async function POST() {
  const apiKey  = process.env.RETELL_API_KEY?.trim();
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID?.trim();

  if (!apiKey || !agentId) {
    return Response.json({ error: 'Missing Retell credentials' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agent_id: agentId }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Retell error:', err);
      return Response.json({ error: 'Failed to create call', detail: err }, { status: res.status });
    }

    const data = await res.json();
    // Only send access_token to client — API key never leaves the server
    return Response.json({ access_token: data.access_token });
  } catch (err) {
    console.error('create-call error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
