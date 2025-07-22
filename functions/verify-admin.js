export async function onRequest({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
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
    const { username, password } = await request.json();

    if (username === env.USER && password === env.PASSWORD) {
      const token = btoa(`${Date.now()}:${Math.random()}`);
      return new Response(
        JSON.stringify({ success: true, token }),
        { status: 200, headers }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "用户名或密码错误" }),
        { status: 401, headers }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "请求格式错误或解析失败" }),
      { status: 400, headers }
    );
  }
}
