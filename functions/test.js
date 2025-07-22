// 必须使用默认导出，且接收request参数
export default async (request) => {
    // 返回JSON响应，指定正确的Content-Type
    return new Response(JSON.stringify({ status: "ok", message: "Functions工作正常" }), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // 允许跨域访问
        }
    });
};
    
