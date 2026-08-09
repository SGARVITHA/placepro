import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/auth/v1/.well-known/jwks.json`,
  cache: true,
  cacheMaxAge: 600000, // 10 minutes — key fetched once and reused from cache thereafter
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

export function verifyAuth(req, res, next) {
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

  jwt.verify(token, getKey, { algorithms: ['ES256'] }, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({
        error: {
          status: 401,
          message: 'Invalid or expired token',
        },
      });
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };

    next();
  });
}
