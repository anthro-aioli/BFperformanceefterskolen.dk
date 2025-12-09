const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { type } = event.queryStringParameters || {};

    if (type === 'quiz-trends') {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            totalResponses: 0,
            averagePercentage: 0,
            topScores: []
          })
        };
      }

      const totalResponses = data.length;
      const avgScore = data.reduce((sum, r) => sum + r.percentage, 0) / totalResponses;
      const topScores = data.sort((a, b) => b.percentage - a.percentage).slice(0, 10);

      return {
        statusCode: 200,
        body: JSON.stringify({
          totalResponses,
          averagePercentage: avgScore.toFixed(1),
          topScores
        })
      };
    }

    if (type === 'brainstorm-pending') {
      const { data, error } = await supabase
        .from('brainstorm_posts')
        .select('*')
        .eq('approved_by_admin', false)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({
          pendingPosts: data || [],
          count: data?.length || 0
        })
      };
    }

    if (type === 'brainstorm-approved') {
      const { data, error } = await supabase
        .from('brainstorm_posts')
        .select('*')
        .eq('approved_by_admin', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({
          approvedPosts: data || []
        })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid type parameter' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
