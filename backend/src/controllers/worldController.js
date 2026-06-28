const supabase = require('../config/supabase');

// GET /api/worlds
exports.getWorlds = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('worlds')
      .select('*')
      .order('orden', { ascending: true });

    if (error) throw error;
    res.json({ worlds: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/worlds/:id
exports.getWorldById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: world, error } = await supabase
      .from('worlds')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !world) {
      return res.status(404).json({ error: 'World not found' });
    }

    // Also get levels count
    const { count } = await supabase
      .from('levels')
      .select('*', { count: 'exact', head: true })
      .eq('world_id', id);

    res.json({ world: { ...world, levels_count: count } });
  } catch (err) {
    next(err);
  }
};
