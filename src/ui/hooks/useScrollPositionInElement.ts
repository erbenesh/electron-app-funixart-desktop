import { useState, useEffect } from "react";

export function useScrollPositionInElement(el: string) {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const height =
      document.querySelector(el).scrollHeight -
      document.querySelector(el).clientHeight;

    const windowScroll = document.querySelector(el).scrollTop;

    const scrolled = (windowScroll / height) * 100;

    setScrollPosition(scrolled);
  }

  useEffect(() => {

    document.querySelector(el)?.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
        document.querySelector(el)?.removeEventListener("scroll", handleScroll);
    };
  });

  return Math.floor(scrollPosition);
}