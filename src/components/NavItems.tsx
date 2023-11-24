'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useRef, useState } from 'react';
import NavItem from './NavItem';
import { useClickOutside } from '@/hooks/useClickOutside';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
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
