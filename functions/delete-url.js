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
      JSON.stringify({ success: false, message: "仅支持 DELETE 请求" }),
      { status: 405, headers }
    );
  }

  try {
    // 验证令牌
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "令牌缺失" }),
        { status: 403, headers }
      );
    }

    // 获取要删除的名称（从 URL 参数）
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    if (!name) {
      return new Response(
        JSON.stringify({ success: false, message: "请指定要删除的名称" }),
        { status: 400, headers }
      );
    }

    // 从 D1 中删除
    const result = await env.DB.prepare(
      "DELETE FROM links WHERE name = ?"
    ).bind(name)
     .run();

    if (result.success && result.changes > 0) {  // changes 表示影响的行数
      return new Response(
        JSON.stringify({ success: true, message: "删除成功" }),
        { headers }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "未找到该链接" }),
        { status: 404, headers }
      );
    }
  } catch (err) {
    console.error("删除失败:", err);
    return new Response(
      JSON.stringify({ success: false, message: "服务器错误" }),
      { status: 500, headers }
    );
  }
}
