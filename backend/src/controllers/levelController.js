const supabase = require('../config/supabase');

// GET /api/levels/:worldId  (levels of a world)
exports.getLevelsByWorld = async (req, res, next) => {
  try {
    const { worldId } = req.params;
    const userId = req.user.id;

    const { data: levels, error } = await supabase
      .from('levels')
      .select('*')
      .eq('world_id', worldId)
      .order('orden', { ascending: true });

    if (error) throw error;

    // Get user progress for these levels
    const levelIds = levels.map(l => l.id);
    const { data: progress } = await supabase
      .from('user_progress')
      .select('level_id, completed, best_score, best_time, attempts_count')
      .eq('user_id', userId)
      .in('level_id', levelIds);

    const progressMap = {};
    (progress || []).forEach(p => { progressMap[p.level_id] = p; });

    const levelsWithProgress = levels.map(l => ({
      ...l,
      progress: progressMap[l.id] || { completed: false, best_score: 0, attempts_count: 0 },
    }));

    res.json({ levels: levelsWithProgress });
  } catch (err) {
    next(err);
  }
};

// GET /api/levels/:id/detail
exports.getLevelById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: level, error } = await supabase
      .from('levels')
      .select('*, worlds(nombre, icono, color)')
      .eq('id', id)
      .single();

    if (error || !level) {
      return res.status(404).json({ error: 'Level not found' });
    }

    const { count } = await supabase
      .from('challenges')
      .select('*', { count: 'exact', head: true })
      .eq('level_id', id);

    res.json({ level: { ...level, challenges_count: count } });
  } catch (err) {
    next(err);
  }
};
