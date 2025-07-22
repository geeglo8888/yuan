export async function onRequest({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "仅支持POST请求" }),
      { status: 405, headers }
    );
  }

  try {
    const { username, password } = await request.json();

    if (!env.USER || !env.PASSWORD) {
      return new Response(
        JSON.stringify({ success: false, message: "未配置管理员信息" }),
        { status: 500, headers }
      );
    }

    if (username === env.USER && password === env.PASSWORD) {
      return new Response(
        JSON.stringify({
          success: true,
          token: btoa(Date.now() + ":" + Math.random())
        }),
        { status: 200, headers }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "用户名或密码错误" }),
        { status: 401, headers }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "验证失败" }),
      { status: 500, headers }
    );
  }
}
