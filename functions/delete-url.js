<export async function onRequest({ request, env }) {
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

    // 从 D1 中删除（打印调试信息）
    const result = await env.DB.prepare(
      "DELETE FROM links WHERE name = ?"
    ).bind(name)
     .run();

    // 打印结果到日志（方便排查，部署后可在Cloudflare控制台查看）
    console.log(`删除 ${name} 的结果:`, result);

    // 修复判断逻辑：优先判断操作是否成功，再参考影响行数
    if (result.success) {
      // 即使 changes 为 0，只要操作成功，也可能是因为数据已被删除（重复删除）
      if (result.changes > 0) {
        return new Response(
          JSON.stringify({ success: true, message: "删除成功" }),
          { headers }
        );
      } else {
        // 操作成功但未影响行数（可能是重复删除）
        return new Response(
          JSON.stringify({ success: true, message: "删除成功（该链接已不存在）" }),
          { headers }
        );
      }
    } else {
      // 操作失败（如SQL错误）
      return new Response(
        JSON.stringify({ success: false, message: "删除失败" }),
        { status: 500, headers }
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
