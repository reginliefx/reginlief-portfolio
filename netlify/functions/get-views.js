exports.handler = async function(event, context) {
  try {
    // 1. ดึง Token จาก Environment Variables ของ Netlify (ปลอดภัย 100%)
    const apiKey = process.env.COUNTER_API_KEY; 

    // 2. เรียก API ของ CounterAPI โดยซ่อน Token ไว้
    const response = await fetch('https://api.counterapi.dev/v2/reginliefs-team-5211/reginlief-views/up', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();

    // 3. ส่งข้อมูลกลับไปให้หน้าเว็บเรา
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching views" })
    };
  }
};