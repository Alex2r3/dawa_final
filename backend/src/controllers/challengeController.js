const supabase = require('../config/supabase');

const XP_MAP    = { facil: 10, medio: 20, dificil: 40, experto: 80, leyenda: 150 };
const COINS_MAP = { facil:  5, medio: 10, dificil: 20, experto: 40, leyenda:  75 };

function calculateNivel(xp) {
  if (xp >= 10000) return 20;
  if (xp >= 6000)  return 18;
  if (xp >= 4000)  return 16;
  if (xp >= 2500)  return 14;
  if (xp >= 1800)  return 12;
  if (xp >= 1200)  return 10;
  if (xp >= 800)   return 8;
  if (xp >= 500)   return 6;
  if (xp >= 250)   return 4;
  if (xp >= 100)   return 2;
  return 1;
}

// GET /api/challenges/:levelId  — get all challenges for a level
exports.getChallengesByLevel = async (req, res, next) => {
  try {
    const { levelId } = req.params;

    const { data: challenges, error } = await supabase
      .from('challenges')
      .select('id, level_id, tipo, pregunta, codigo, respuesta_correcta, metadata_json, orden')
      .eq('level_id', levelId)
      .order('orden', { ascending: true });

    if (error) throw error;

    res.json({ challenges });
  } catch (err) {
    next(err);
  }
};

// POST /api/challenges/:id/answer
exports.answerChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answer, time_taken } = req.body;
    const userId = req.user.id;

    if (!answer) {
      return res.status(400).json({ error: 'Answer is required' });
    }

    // Get challenge with correct answer
    const { data: challenge, error: cErr } = await supabase
      .from('challenges')
      .select('*, levels(dificultad, xp_recompensa, monedas_recompensa, id)')
      .eq('id', id)
      .single();

    if (cErr || !challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const is_correct =
      answer.trim().toLowerCase() === challenge.respuesta_correcta.trim().toLowerCase();

    // Check if previously answered correctly
    const { data: prevCorrect } = await supabase
      .from('attempts')
      .select('id')
      .eq('user_id', userId)
      .eq('challenge_id', id)
      .eq('is_correct', true)
      .limit(1)
      .maybeSingle();
      
    const already_answered_correctly = !!prevCorrect;

    // Record attempt
    await supabase.from('attempts').insert({
      user_id: userId,
      challenge_id: id,
      answer: answer.substring(0, 500), // sanitize length
      is_correct,
      time_taken: time_taken || null,
    });

    let xp_earned   = 0;
    let coins_earned = 0;
    let level_completed = false;
    let new_nivel    = null;

    if (is_correct) {
      // ONLY award XP and coins if it's the first time they get this challenge right
      if (!already_answered_correctly) {
        const dif = challenge.levels?.dificultad || 'facil';
        xp_earned    = XP_MAP[dif]    || 10;
        coins_earned = COINS_MAP[dif] || 5;

        // Speed bonus: if answered in < 5 seconds, +5 XP
        if (time_taken && time_taken < 5) xp_earned += 5;

        // Update user XP and coins
        const { data: currentUser } = await supabase
          .from('users')
          .select('xp_total, nivel, monedas')
          .eq('id', userId)
          .single();

        if (currentUser) {
          const new_xp     = currentUser.xp_total + xp_earned;
          const new_coins  = currentUser.monedas   + coins_earned;
          new_nivel        = calculateNivel(new_xp);

          await supabase.from('users').update({
            xp_total: new_xp,
            monedas:  new_coins,
            nivel:    new_nivel,
          }).eq('id', userId);
        }
      }

      // Update user_progress for the level
      const levelId = challenge.level_id;

      // Count total challenges in this level
      const { count: totalChallenges } = await supabase
        .from('challenges')
        .select('*', { count: 'exact', head: true })
        .eq('level_id', levelId);

      // Count how many distinct challenges the user has answered correctly
      const { data: correctAttempts } = await supabase
        .from('attempts')
        .select('challenge_id')
        .eq('user_id', userId)
        .eq('is_correct', true);

      // Filter only challenge_ids that belong to this level
      const { data: levelChallengeIds } = await supabase
        .from('challenges')
        .select('id')
        .eq('level_id', levelId);

      const levelChallengeSet = new Set((levelChallengeIds || []).map(c => c.id));
      const correctInLevel = new Set(
        (correctAttempts || [])
          .map(a => a.challenge_id)
          .filter(cid => levelChallengeSet.has(cid))
      );

      const isLevelNowComplete = correctInLevel.size >= (totalChallenges || 1);

      const { data: prog } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('level_id', levelId)
        .maybeSingle();

      if (prog) {
        const newCount = prog.attempts_count + 1;
        const newScore = Math.max(prog.best_score || 0, xp_earned);
        const newTime  = (!prog.best_time || time_taken < prog.best_time) ? time_taken : prog.best_time;

        await supabase.from('user_progress').update({
          completed:      isLevelNowComplete ? true : prog.completed,
          best_score:     newScore,
          best_time:      newTime,
          attempts_count: newCount,
          completed_at:   isLevelNowComplete && !prog.completed ? new Date().toISOString() : prog.completed_at,
        }).eq('id', prog.id);
      } else {
        await supabase.from('user_progress').insert({
          user_id:        userId,
          level_id:       levelId,
          completed:      isLevelNowComplete,
          best_score:     xp_earned,
          best_time:      time_taken,
          attempts_count: 1,
          completed_at:   isLevelNowComplete ? new Date().toISOString() : null,
        });
      }

      level_completed = isLevelNowComplete;
    }

    // Evaluate Achievements
    const unlocked_achievements = await checkAchievements(userId, is_correct, time_taken, challenge.level_id);

    res.json({
      is_correct,
      correct_answer: challenge.respuesta_correcta,
      explicacion:    challenge.explicacion,
      xp_earned,
      coins_earned,
      level_completed,
      new_nivel,
      unlocked_achievements,
    });
  } catch (err) {
    next(err);
  }
};

// ── Achievement Checker Helper ────────────────────────────
async function checkAchievements(userId, is_correct, time_taken, current_level_id) {
  try {
    const newlyUnlocked = [];

    // Get all achievements
    const { data: allAchievements } = await supabase
      .from('achievements')
      .select('*');

    if (!allAchievements) return [];

    // Get user's unlocked achievements
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId);

    const unlockedIds = new Set((userAchievements || []).map(ua => ua.achievement_id));

    // Get current user stats
    const { data: user } = await supabase
      .from('users')
      .select('xp_total, nivel, monedas')
      .eq('id', userId)
      .single();

    const { data: progress } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', userId)
      .eq('completed', true);

    const { data: attempts } = await supabase
      .from('attempts')
      .select('is_correct, time_taken')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    const totalCompletedLevels = progress?.length || 0;
    const userNivel = user?.nivel || 1;
    const coins = user?.monedas || 0;

    // Calculate current streak
    let currentStreak = 0;
    for (const att of (attempts || [])) {
      if (att.is_correct) {
        currentStreak++;
      } else {
        break;
      }
    }

    for (const ach of allAchievements) {
      if (unlockedIds.has(ach.id)) continue;

      let shouldUnlock = false;

      switch (ach.condicion) {
        case 'first_level':
          if (totalCompletedLevels >= 1) shouldUnlock = true;
          break;
        case 'fast_answer':
          if (is_correct && time_taken && time_taken < 5) shouldUnlock = true;
          break;
        case 'streak_3':
          if (currentStreak >= 3) shouldUnlock = true;
          break;
        case 'streak_5':
          if (currentStreak >= 5) shouldUnlock = true;
          break;
        case 'streak_10':
          if (currentStreak >= 10) shouldUnlock = true;
          break;
        case 'perfect_level':
          if (totalCompletedLevels >= 1) shouldUnlock = true;
          break;
        case 'complete_10_levels':
          if (totalCompletedLevels >= 10) shouldUnlock = true;
          break;
        case 'complete_25_levels':
          if (totalCompletedLevels >= 25) shouldUnlock = true;
          break;
        case 'coins_1000':
          if (coins >= 1000) shouldUnlock = true;
          break;
        case 'level_5':
          if (userNivel >= 5) shouldUnlock = true;
          break;
        case 'level_10':
          if (userNivel >= 10) shouldUnlock = true;
          break;
        case 'level_15':
          if (userNivel >= 15) shouldUnlock = true;
          break;
        case 'level_20':
          if (userNivel >= 20) shouldUnlock = true;
          break;
        default:
          break;
      }

      if (shouldUnlock) {
        const { error: insErr } = await supabase
          .from('user_achievements')
          .insert({ user_id: userId, achievement_id: ach.id });

        if (!insErr) {
          const newXp = (user.xp_total || 0) + (ach.xp_bonus || 0);
          const newCoins = (user.monedas || 0) + (ach.monedas_bonus || 0);
          const calculatedNivel = calculateNivel(newXp);

          await supabase.from('users').update({
            xp_total: newXp,
            monedas:  newCoins,
            nivel:    calculatedNivel
          }).eq('id', userId);

          newlyUnlocked.push(ach);
        }
      }
    }

    return newlyUnlocked;
  } catch (err) {
    console.error('Error in checkAchievements:', err);
    return [];
  }
}
