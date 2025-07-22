export async function onRequest({ env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  try {
    const links = [];

    // 遍历 KV 空间中所有 key-value 对
    const list = await env.LINKS.list();

    for (const item of list.keys) {
      const url = await env.LINKS.get(item.name);
      links.push({
        name: item.name,
        url: url
      });
    }

    return new Response(JSON.stringify({ success: true, links }), {
      status: 200,
      headers
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "读取失败" }),
      { status: 500, headers }
    );
  }
}
