'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LightDarkLoader } from './contentLoader';

const pagesArr: { page: string; path: string }[] = [
  { page: 'Home', path: '/' },
  { page: 'About', path: '/about' },
  { page: 'Portfolio', path: '/portfolio' },
  { page: 'Contact', path: '/contact' },
];

export const Navigation = () => {
  const currentRoute = usePathname();

  return (
    <nav className="text-gray uppercase">
      {pagesArr.map(({ page, path }) => (
        <Link
          key={page}
          href={path}
          className={`mx-5 tracking-widest text-xs ${
            currentRoute === path && 'dark:text-white text-black'
          }`}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
};

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="self-start">
        <LightDarkLoader />
      </div>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  let themeClass = currentTheme;

  const handleClick = () => {
    if (currentTheme === 'dark') {
      setTheme('light');
      themeClass = 'light';
    } else {
      setTheme('dark');
      themeClass = 'dark';
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center cursor-pointer relative focus:outline-none text-gray"
      >
        <p className="mr-5 tracking-widest text-xs uppercase">
          Light
        </p>
        <div
          className={`border-solid border-2 border-gray rounded-[50%] w-3 h-3 relative transition ease-in-out duration-300 z-50 ${
            themeClass === 'dark'
              ? 'translate-x-full bg-gray'
              : 'translate-x-[-90%] bg-white'
          }`}
        ></div>
        <div
          className={`absolute bg-gray w-4 h-0.5 rounded-xl -right-0.5 z-40 ${
            themeClass === 'dark'
              ? 'translate-x-[-425%]'
              : 'translate-x-[-340%]'
          }`}
        ></div>
        <p className="ml-5 tracking-widest text-xs uppercase">Dark</p>
      </button>
    </div>
  );
};

export const Header = () => {
  return (
    <header className="fixed pt-16 px-16 flex justify-between w-full items-center z-50">
      <p className="text-3xl">
        kevin<span className="text-gray">.</span>
      </p>
      <Navigation />
      <ThemeChanger />
    </header>
  );
};
