export async function onRequest({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };

  // 处理预检请求
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
    // 验证令牌（与之前逻辑一致）
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "令牌缺失" }),
        { status: 403, headers }
      );
    }

    // 解析请求体
    const { name, url } = await request.json();
    if (!name || !url) {
      return new Response(
        JSON.stringify({ success: false, message: "名称和网址不能为空" }),
        { status: 400, headers }
      );
    }

    // 插入 D1 数据库（使用参数化查询防 SQL 注入）
    const result = await env.DB.prepare(
      "INSERT INTO links (name, url) VALUES (?, ?)"  // ? 是参数占位符
    ).bind(name, url)  // 绑定参数
     .run();  // 执行插入

    if (result.success) {
      return new Response(
        JSON.stringify({ success: true, message: "添加成功" }),
        { headers }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "添加失败（可能名称已存在）" }),
        { status: 400, headers }
      );
    }
  } catch (err) {
    console.error("添加失败:", err);
    return new Response(
      JSON.stringify({ success: false, message: "服务器错误" }),
      { status: 500, headers }
    );
  }
}
