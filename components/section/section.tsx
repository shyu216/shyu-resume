"use client";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <section className="mt-2">
      <h3 className="text-md font-bold text-orange-400 dark:text-orange-400">
        {title}
      </h3>
      <div className="w-full border-t border-zinc-200 dark:border-zinc-600 mb-1"></div>
      {children}
    </section>
  );
}
