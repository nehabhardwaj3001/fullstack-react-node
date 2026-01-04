import { Router } from 'express';
const authRoutes = (db: any) => {
  const router = Router();
  router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    try {
      const result = await db.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, password],
      );
      return res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (err: any) {
      if (err.code === '23505') return res.status(409).json({ error: 'Email already exists' });
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  });
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await db.query('SELECT id, email, password FROM users WHERE email = $1', [
        email,
      ]);
      if (result.rows.length === 0 || result.rows[0].password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      return res.json({
        message: 'Login successful',
        user: { id: result.rows[0].id, email: result.rows[0].email },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  });
  return router;
};
export default authRoutes;
