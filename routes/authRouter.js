router.get('/auth/google', (req, res) => {
  const redirectUrl = req.query.redirect_url || process.env.DEFAULT_FRONTEND_URL;
  req.session.redirectUrl = redirectUrl; // Store for later use
  // Continue with Google OAuth...
});

router.get('/auth/google/callback', (req, res) => {
  // After successful authentication
  const redirectUrl = req.session.redirectUrl || process.env.DEFAULT_FRONTEND_URL;
  res.redirect(`${redirectUrl}/auth/callback?success=true`);
});
