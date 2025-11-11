
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']; 

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/all"
          className={`${css.menuLink} ${pathname === '/notes/filter/all' ? css.active : ''}`}
        >
          All notes
        </Link>
      </li>

      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={`${css.menuLink} ${
              pathname === `/notes/filter/${tag}` ? css.active : ''
            }`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}