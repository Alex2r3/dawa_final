const supabase = require('../config/supabase');

exports.getAchievements = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data: all, error } = await supabase
      .from('achievements')
      .select('*')
      .order('xp_bonus', { ascending: false });

    if (error) throw error;

    const { data: unlocked } = await supabase
      .from('user_achievements')
      .select('achievement_id, unlocked_at')
      .eq('user_id', userId);

    const unlockedSet = new Set((unlocked || []).map(u => u.achievement_id));
    const unlockedMap = {};
    (unlocked || []).forEach(u => { unlockedMap[u.achievement_id] = u.unlocked_at; });

    const achievements = all.map(a => ({
      ...a,
      unlocked:    unlockedSet.has(a.id),
      unlocked_at: unlockedMap[a.id] || null,
    }));

    res.json({ achievements });
  } catch (err) {
    next(err);
  }
};
