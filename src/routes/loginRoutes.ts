import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <input name="email" placeholder="email"/>
      <input name="password" type="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === 'h@h' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('you must provide email');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <h2>You are logged in</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h2>You are not  logged in</h2>
      <a href="/login">Login</a>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.loggedIn = false;
  }
  res.redirect('/');
});

export { router };
