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
    const { studentName, answers, score, totalQuestions, sessionId } = JSON.parse(event.body);

    if (!studentName || !answers || totalQuestions === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const percentage = (score / totalQuestions) * 100;

    const { data, error } = await supabase
      .from('quiz_responses')
      .insert([
        {
          student_name: studentName,
          answers: answers,
          score: score,
          total_questions: totalQuestions,
          percentage: percentage,
          session_id: sessionId
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save quiz response' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        score: score,
        percentage: percentage.toFixed(1),
        message: `Du fik ${score} ud af ${totalQuestions} rigtige (${percentage.toFixed(1)}%)`
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
