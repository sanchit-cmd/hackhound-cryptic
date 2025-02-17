async function logoutUser() {
  try {
    const response = await fetch('/auth/logout');
    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Modified auth check function
async function checkAuth() {
  const currentPath = window.location.pathname;
  const publicPaths = ['/', '/login'];
  
  if (!publicPaths.includes(currentPath)) {
    try {
      const response = await fetch('/api/v1/users/isLoggedIn');
      const data = await response.json();
      
      // Only redirect if explicitly not logged in
      if (data.isLoggedIn === false) {
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  }
}

// Only run auth check for non-public pages
if (!['/login', '/'].includes(window.location.pathname)) {
  checkAuth();
}
