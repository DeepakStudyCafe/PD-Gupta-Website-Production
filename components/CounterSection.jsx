"use client";
import { useEffect, useRef, useState } from "react";
import Counter from "@/components/Counter";
import { Users, Building2, CalendarCheck, CreditCard } from "lucide-react";

export default function CounterSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-2 gap-x-10 gap-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-primary-600" />
        <div>
          <p className="text-xl font-bold text-gray-900">
            {visible ? <Counter end="2245341" duration={2} /> : "0"}
          </p>
          <p className="text-sm text-gray-500">Clients Served</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Building2 className="w-8 h-8 text-primary-600" />
        <div>
          <p className="text-xl font-bold text-gray-900">
            {visible ? <Counter end="46328" duration={2} /> : "0"}
          </p>
          <p className="text-sm text-gray-500">Businesses Registered</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CalendarCheck className="w-8 h-8 text-primary-600" />
        <div>
          <p className="text-xl font-bold text-gray-900">
            {visible ? <Counter end="828867" duration={2} /> : "0"}
          </p>
          <p className="text-sm text-gray-500">Returns Filed</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CreditCard className="w-8 h-8 text-primary-600" />
        <div>
          <p className="text-xl font-bold text-gray-900">
            {visible ? <Counter end="1926436" duration={2} /> : "0"}
          </p>
          <p className="text-sm text-gray-500">Tax Payments Processed</p>
        </div>
      </div>
    </div>
  );
}
