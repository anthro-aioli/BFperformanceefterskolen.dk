const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { postId, approved } = JSON.parse(event.body);
    if (!postId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing postId' }) };
    }

    const { data, error } = await supabase
      .from('brainstorm_posts')
      .update({ approved_by_admin: approved })
      .eq('id', postId)
      .select();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: approved ? 'Post godkendt' : 'Post afvist' })
    };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
