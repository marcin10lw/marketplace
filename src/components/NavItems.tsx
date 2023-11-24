'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useClickOutside } from '@/hooks/useClickOutside';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const navRef = useRef<HTMLDivElement>(null);
  useClickOutside(navRef, () => setActiveIndex(null));

  const isAnyOpen = activeIndex !== null;

  return (
    <div className='flex h-full gap-4' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = index === activeIndex;

        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
