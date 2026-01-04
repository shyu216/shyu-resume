"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import React from "react";

import { Icons, type Icon } from "@/components/ui/icons";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Platform =
  | "linkedin"
  | "github"
  | "mail";
type PlatformInfo = {
  icon: Icon;
  platform: Platform;
  label: string;
};
const iconMapper: { [key: string]: PlatformInfo } = {
  "((?:linkedin.com)|(?:linkedin.cn))": { icon: Icons.Linkedin, platform: "linkedin", label: "LinkedIn", },
  "(?:github.com)": { icon: Icons.Github, platform: "github", label: "GitHub" },
  "(?:mailto:)": { icon: Icons.Mail, platform: "mail", label: "Email" },
};

function getIconForUrl(url: string): PlatformInfo | undefined {
  for (const regexStr in iconMapper) {
    const regex = new RegExp(
      `^(?:https?://)?(?:[^@/\\n]+@)?(?:www.)?` + regexStr
    );
    if (regex.test(url)) {
      return iconMapper[regexStr]!;
    }
  }

  return undefined;
}

function getIconForPlatform(
  platform: Platform | undefined
): PlatformInfo | undefined {
  if (!platform) {
    return undefined;
  }

  for (const info of Object.values(iconMapper)) {
    if (info.platform === platform) {
      return info;
    }
  }

  return undefined;
}

export function SocialLink({
  platform,
  href,
  className,
  ...props
}: { platform?: Platform; className?: string } & LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [open, setOpen] = React.useState(false);
  const info = getIconForPlatform(platform) ?? getIconForUrl(href.toString());

  if (!info) {
    console.warn(`No icon found for ${href.toString()}`);

    return <Link href={href} {...props} />;
  }

  return (
    <Tooltip.Provider disableHoverableContent>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <Link
            className="group -m-1 p-1"
            href={href}
            target="_blank"
            prefetch={false}
            aria-label={info.label}
            {...props}
          >
            <info.icon
              className={cn(
                "h-5 w-5 text-mygray-400 transition group-hover:text-mygray-700 dark:text-mygray-400 dark:group-hover:text-mygray-200",
                className
              )}
            />
          </Link>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {info.label}
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
