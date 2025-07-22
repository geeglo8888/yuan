export default async (request) => {
    return new Response(JSON.stringify({ 
        status: "ok", 
        message: "Functions工作正常" 
    }), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
};
