// 正确的默认导出方式，接收request和env参数
export default async (request, env) => {
    // 配置跨域响应头
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    // 处理预检请求
    if (request.method === "OPTIONS") {
        return new Response(null, { headers });
    }

    // 只允许POST请求
    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({ success: false, message: "仅支持POST请求" }),
            { status: 405, headers }
        );
    }

    try {
        // 解析请求体
        const { username, password } = await request.json();
        
        // 验证环境变量
        if (!env.USER || !env.PASSWORD) {
            return new Response(
                JSON.stringify({ success: false, message: "未配置管理员信息" }),
                { status: 500, headers }
            );
        }

        // 验证用户名密码
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
};
    
