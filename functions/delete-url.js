export async function onRequest({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };

  // 处理预检请求
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "DELETE") {
    return new Response(
      JSON.stringify({ success: false, message: "仅支持DELETE请求" }),
      { status: 405, headers }
    );
  }

  try {
    // 验证令牌
    const token = request.headers.get("Authorization");
    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({ success: false, message: "令牌缺失" }),
        { status: 403, headers }
      );
    }

    // 从URL参数中获取要删除的名称
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    if (!name) {
      return new Response(
        JSON.stringify({ success: false, message: "请指定要删除的名称" }),
        { status: 400, headers }
      );
    }

    // 从KV中删除该名称对应的链接
    await env.LINKS.delete(name);

    return new Response(
      JSON.stringify({ success: true, message: "删除成功" }),
      { status: 200, headers }
    );

  } catch (err) {
    console.error("删除出错:", err);
    return new Response(
      JSON.stringify({ success: false, message: "删除失败" }),
      { status: 500, headers }
    );
  }
}
    
