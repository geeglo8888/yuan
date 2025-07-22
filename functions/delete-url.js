export async function onRequest(context) {
  // 从context中解构参数（避免直接在函数参数中写对象解构，可能触发解析器误判）
  const { request, env } = context;
  
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
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "令牌缺失" }),
        { status: 403, headers }
      );
    }

    // 获取要删除的名称（从URL参数）
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    if (!name) {
      return new Response(
        JSON.stringify({ success: false, message: "请指定要删除的名称" }),
        { status: 400, headers }
      );
    }

    // 执行删除操作
    const result = await env.DB.prepare(
      "DELETE FROM links WHERE name = ?"
    ).bind(name)
     .run();

    // 日志输出（避免使用模板字符串中包含特殊符号）
    console.log("删除结果:", name, result);

    // 判断逻辑
    if (result.success) {
      if (result.changes > 0) {
        return new Response(
          JSON.stringify({ success: true, message: "删除成功" }),
          { headers }
        );
      } else {
        return new Response(
          JSON.stringify({ success: true, message: "删除成功（该链接已不存在）" }),
          { headers }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "删除失败" }),
        { status: 500, headers }
      );
    }
  } catch (err) {
    console.error("删除错误:", err);
    return new Response(
      JSON.stringify({ success: false, message: "服务器错误" }),
      { status: 500, headers }
    );
  }
}
