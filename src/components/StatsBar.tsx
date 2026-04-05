import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "عميل راضٍ" },
  { value: 15, suffix: "+", label: "سنة خبرة" },
  { value: 98, suffix: "%", label: "نسبة رضا المرضى" },
  { value: 3, suffix: "", label: "أطباء متخصصين" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = Math.max(1, Math.floor(target / (duration / 16)));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-extrabold text-primary font-tajawal">
        {suffix === "+" ? "+" : ""}{count}{suffix === "%" ? "%" : suffix === "+" ? "" : ""}
      </p>
      <p className="text-sm text-muted-foreground font-tajawal mt-1">{stats.find(s => s.value === target)?.label}</p>
    </div>
  );
};

const StatsBar = () => (
  <section className="py-12 bg-secondary" dir="rtl">
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((s) => (
        <Counter key={s.label} target={s.value} suffix={s.suffix} />
      ))}
    </div>
  </section>
);

export default StatsBar;
