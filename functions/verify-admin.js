// 注意：Cloudflare Pages Functions的文件路径对应路由
// 此文件路径为functions/verify-admin.js，对应访问路径为/verify-admin
export default async (request, env, ctx) => {
    // 处理跨域（CORS）
    const headers = {
        'Access-Control-Allow-Origin': '*', // 允许所有域名访问，生产环境可指定具体域名
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    };

    // 处理预检请求（OPTIONS）
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    // 只允许POST方法
    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ success: false, message: '仅支持POST请求' }),
            { status: 405, headers }
        );
    }

    try {
        // 1. 解析请求体
        let requestBody;
        try {
            requestBody = await request.json();
            console.log('收到验证请求:', requestBody); // 日志：打印请求内容
        } catch (parseError) {
            console.error('解析请求体失败:', parseError);
            return new Response(
                JSON.stringify({ success: false, message: '请求格式错误，需为JSON' }),
                { status: 400, headers }
            );
        }

        // 2. 检查必要参数
        const { username, password } = requestBody;
        if (!username || !password) {
            return new Response(
                JSON.stringify({ success: false, message: '请输入用户名和密码' }),
                { status: 400, headers }
            );
        }

        // 3. 获取环境变量并验证
        console.log('环境变量是否存在:', { hasUser: !!env.USER, hasPass: !!env.PASSWORD }); // 关键日志：检查环境变量是否加载
        if (!env.USER || !env.PASSWORD) {
            return new Response(
                JSON.stringify({ success: false, message: '服务器未配置验证信息' }),
                { status: 500, headers }
            );
        }

        // 4. 验证用户名密码
        const isMatch = username === env.USER && password === env.PASSWORD;
        if (isMatch) {
            // 生成简单令牌（实际项目可使用JWT等更安全的方式）
            const token = btoa(Date.now() + ':' + Math.random().toString(36).substr(2));
            return new Response(
                JSON.stringify({ success: true, token }),
                { status: 200, headers }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: '用户名或密码不正确' }),
                { status: 401, headers }
            );
        }

    } catch (error) {
        // 捕获所有未处理的错误
        console.error('验证接口发生错误:', error); // 关键日志：打印错误详情
        return new Response(
            JSON.stringify({ success: false, message: '验证过程出错，请查看控制台日志' }),
            { status: 500, headers }
        );
    }
};
    