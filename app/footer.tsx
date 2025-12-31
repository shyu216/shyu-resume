import Link from "next/link";

import { ContainerInner, ContainerOuter } from "@/components/container";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-myred-600 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-mygray-100 pb-16 pt-10 dark:border-mygray-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm text-mygray-400 dark:text-mygray-500">
                &copy; {new Date().getFullYear()} Dale. All rights reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
