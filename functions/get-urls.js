export async function onRequest({ env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  try {
    // 从 D1 读取所有链接（SQL 查询）
    const result = await env.DB.prepare(
      "SELECT name, url FROM links ORDER BY name"  // 按名称排序
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        links: result.results  // D1 返回的结果在 results 字段中
      }),
      { headers }
    );
  } catch (err) {
    console.error("读取失败:", err);
    return new Response(
      JSON.stringify({ success: false, message: "读取链接失败" }),
      { status: 500, headers }
    );
  }
}
