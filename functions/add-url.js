export async function onRequest({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "仅支持 POST 请求" }),
      { status: 405, headers }
    );
  }

  try {
    const token = request.headers.get("Authorization");
    const { name, url } = await request.json();

    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ success: false, message: "令牌缺失" }), {
        status: 403,
        headers
      });
    }

    // 储存格式为：key=name, value=url
    await env.LINKS.put(name, url);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "写入失败" }),
      { status: 500, headers }
    );
  }
}
