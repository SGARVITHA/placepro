import { supabase } from '../services/supabaseService.js';

export async function verifyAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          status: 401,
          message: 'Missing or invalid Authorization header',
        },
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: {
          status: 401,
          message: 'Missing or invalid Authorization header',
        },
      });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: {
          status: 401,
          message: 'Invalid or expired token',
        },
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Invalid or expired token',
      },
    });
  }
}
