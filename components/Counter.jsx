"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ end, duration = 3.5, className = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let start = 0;
    const endNum = typeof end === "string" ? parseInt(end.replace(/,/g, "")) : end;
    if (start === endNum) return;
    let incrementTime = Math.max(10, (duration * 1000) / endNum);
    let current = start;
    const step = Math.ceil(endNum / (duration * 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= endNum) {
        current = endNum;
        clearInterval(timer);
      }
      setCount(current);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span className={className}>{count.toLocaleString()}</span>;
}
