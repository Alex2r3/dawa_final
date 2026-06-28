const supabase = require('../config/supabase');

exports.getRanking = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, avatar, xp_total, nivel, monedas')
      .order('xp_total', { ascending: false })
      .limit(50);

    if (error) throw error;

    const ranking = data.map((user, index) => ({
      ...user,
      position: index + 1,
    }));

    // Find current user's position
    const myPos = ranking.findIndex(u => u.id === req.user.id);

    res.json({
      ranking,
      my_position: myPos >= 0 ? myPos + 1 : null,
    });
  } catch (err) {
    next(err);
  }
};
