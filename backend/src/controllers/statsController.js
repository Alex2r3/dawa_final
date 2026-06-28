const supabase = require('../config/supabase');

exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Total attempts
    const { data: attempts } = await supabase
      .from('attempts')
      .select('is_correct, time_taken, created_at')
      .eq('user_id', userId);

    const total     = attempts?.length || 0;
    const correct   = attempts?.filter(a => a.is_correct).length || 0;
    const accuracy  = total > 0 ? Math.round((correct / total) * 100) : 0;
    const times     = attempts?.filter(a => a.time_taken).map(a => a.time_taken) || [];
    const avg_time  = times.length > 0 ? Math.round(times.reduce((s, t) => s + t, 0) / times.length) : 0;

    // Streak calculation (consecutive correct)
    let max_streak = 0, current_streak = 0;
    (attempts || []).forEach(a => {
      if (a.is_correct) { current_streak++; max_streak = Math.max(max_streak, current_streak); }
      else { current_streak = 0; }
    });

    // Completed levels
    const { count: levels_completed } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('completed', true);

    // Completed worlds (worlds where all 5 levels completed)
    const { data: worlds } = await supabase
      .from('worlds')
      .select('id');

    let worlds_completed = 0;
    for (const world of (worlds || [])) {
      const { count: total_levels } = await supabase
        .from('levels')
        .select('*', { count: 'exact', head: true })
        .eq('world_id', world.id);

      const levelIds = await supabase
        .from('levels')
        .select('id')
        .eq('world_id', world.id);

      const ids = (levelIds.data || []).map(l => l.id);
      if (ids.length === 0) continue;

      const { count: done } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('completed', true)
        .in('level_id', ids);

      if (done >= total_levels) worlds_completed++;
    }

    // User XP
    const { data: user } = await supabase
      .from('users')
      .select('xp_total, nivel, monedas')
      .eq('id', userId)
      .single();

    // Attempts per day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentAttempts } = await supabase
      .from('attempts')
      .select('created_at, is_correct')
      .eq('user_id', userId)
      .gte('created_at', sevenDaysAgo.toISOString());

    const dailyMap = {};
    (recentAttempts || []).forEach(a => {
      const day = a.created_at.substring(0, 10);
      if (!dailyMap[day]) dailyMap[day] = { day, total: 0, correct: 0 };
      dailyMap[day].total++;
      if (a.is_correct) dailyMap[day].correct++;
    });
    const daily_activity = Object.values(dailyMap).sort((a, b) => a.day.localeCompare(b.day));

    res.json({
      total_attempts:   total,
      correct_answers:  correct,
      accuracy,
      avg_time,
      max_streak,
      levels_completed: levels_completed || 0,
      worlds_completed,
      xp_total:         user?.xp_total  || 0,
      nivel:            user?.nivel     || 1,
      monedas:          user?.monedas   || 0,
      daily_activity,
    });
  } catch (err) {
    next(err);
  }
};
