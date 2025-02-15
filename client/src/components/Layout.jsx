import { Outlet, Link } from 'react-router-dom';
import '../styles/Layout.css';

function Layout() {
	return (
		<div className='layout'>
			<nav className='navbar'>
				<div className='nav-links'>
					<Link to='/' className='nav-link'>
						Home
					</Link>
					<Link to='/rules' className='nav-link'>
						Rules
					</Link>
					<Link to='/leaderboard' className='nav-link'>
						Leaderboard
					</Link>
					<Link to='/login' className='nav-link'>
						Login
					</Link>
				</div>
			</nav>
			<main className='content'>
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
