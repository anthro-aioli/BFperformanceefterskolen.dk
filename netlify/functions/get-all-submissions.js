const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { type } = event.queryStringParameters || {};

    if (type === 'brevkasse') {
      const { data, error } = await supabase
        .from('brevkasse_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, submissions: data || [] })
      };
    }

    if (type === 'songs') {
      const { data, error } = await supabase
        .from('song_suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, submissions: data || [] })
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type parameter' }) };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
