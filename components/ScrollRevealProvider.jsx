"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const revealElements = () => {
      const elements = document.querySelectorAll(".reveal");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      elements.forEach((el) => {
        el.classList.remove("active"); // reset on route change
        observer.observe(el);
      });

      return observer;
    };

    let observer = revealElements();

    // Observe DOM changes (Next.js route transitions)
    const mutationObserver = new MutationObserver(() => {
      observer.disconnect();
      observer = revealElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]); // 🔥 KEY FIX

  return <>{children}</>;
}
