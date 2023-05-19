'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';

const pagesArr: { page: string; path: string }[] = [
  { page: 'Home', path: '/' },
  { page: 'About', path: '/about' },
  { page: 'Portfolio', path: '/portfolio' },
  { page: 'Contact', path: '/contact' },
];

export const ThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = () => {
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        <p>Light</p>
        <div></div>
        <div></div>
        <p>Dark</p>
      </button>
    </div>
  );
};

export const Header = () => {
  return (
    <header>
      <p>
        kevin<span>.</span>
      </p>
      <nav>
        {pagesArr.map(({ page, path }) => (
          <Link key={page} href={path}>
            {page}
          </Link>
        ))}
      </nav>
      <ThemeChanger />
    </header>
  );
};
