const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { content, shareableWithAdults } = JSON.parse(event.body);

    if (!content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing content' })
      };
    }

    const { data, error } = await supabase
      .from('brevkasse_submissions')
      .insert([
        {
          content: content,
          shareable_with_adults: shareableWithAdults === 'ja',
          is_anonymous: true
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save submission' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Tak for din tanke'
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
