"use client";

import { Icons } from "@/components/ui/icons";
import { CopyText, HoverLink } from "@/components/ui/tooltip";
import { cn } from "@/content/config";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import {
  siteConfig,
  pickLanguage,
  copy,
  getNameRenderConfig,
  getHeaderContactInfo,
  getUrlDisplayText,
} from "@/content/config";

type Props = {
  usage: "live" | "pdf";
  children?: React.ReactNode;
};

export default function HeaderSection({ usage, children }: Props) {
  const { language } = useContext(LanguageContext);
  const { name, contact } = siteConfig.personal;
  const uiCopy = copy[language];
  const contactItemClass = "group text-xs inline-flex gap-1 items-center transition whitespace-nowrap";
  const nameData = pickLanguage(language, name);
  const nameRender = getNameRenderConfig(language, nameData);
  const contactData = getHeaderContactInfo(language, contact);

  const linkTextClass = "text-[11px] leading-none opacity-90";
  const hasChild = Boolean(children);

  const headerMain = (
    <div className="resume-hero-content m-0 flex max-w-full flex-col items-start p-0">
      <h2 className="max-w-full mb-1 text-2xl font-bold">
        <span>
          {nameRender.segments.map((segment, index) => (
            <span key={`${segment.text}-${index}`} className={segment.highlighted ? "text-[var(--header-color)]" : "text-[var(--color-text-primary)]"}>
              {index > 0 ? nameRender.separator : ""}
              {segment.text}
            </span>
          ))}
        </span>
      </h2>

      <div
        className={cn(
          "m-0 flex max-w-full flex-wrap items-center gap-x-4 gap-y-1 p-0",
          usage === "pdf"
            ? "flex-col items-start gap-x-0"
            : "md:flex-col md:items-start md:gap-x-0"
        )}
      >
        <HoverLink
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
          aria-label={uiCopy.header.linkedin}
        >
          <Icons.Linkedin size={16} className="group-hover:animate-shake" />
          <span className={linkTextClass}>{getUrlDisplayText(contact.linkedin, "path")}</span>
        </HoverLink>

        <HoverLink
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
          aria-label={uiCopy.header.github}
        >
          <Icons.Github size={16} className="group-hover:animate-shake" />
          <span className={linkTextClass}>{getUrlDisplayText(contact.github, "path")}</span>
        </HoverLink>

        <HoverLink
          href={contact.website}
          target="_blank"
          rel="noreferrer"
          className={cn(contactItemClass, "text-[var(--color-text-primary)]")}
          aria-label={uiCopy.header.website}
        >
          <Icons.Globe size={16} className="group-hover:animate-shake" />
          <span className={linkTextClass}>{getUrlDisplayText(contact.website, "host-path")}</span>
        </HoverLink>

        <CopyText
          value={contactData.email}
          icon={<Icons.Mail size={16} className="group-hover:animate-shake" />}
          copiedIcon={<Icons.Check size={16} className="text-[var(--header-color)]" />}
          className={cn(contactItemClass, "cursor-pointer text-[var(--color-text-primary)]")}
        >
          <span>{contactData.email}</span>
        </CopyText>

        <CopyText
          value={contactData.phone}
          icon={<Icons.PhoneCall size={16} className="group-hover:animate-shake" />}
          copiedIcon={<Icons.Check size={16} className="text-[var(--header-color)]" />}
          className={cn(contactItemClass, "cursor-pointer text-[var(--color-text-primary)]")}
        >
          <span>{contactData.phone}</span>
        </CopyText>

        {contactData.wechat && (
          <CopyText
            value={contactData.wechat}
            icon={<Icons.Wechat size={16} className="group-hover:animate-shake" />}
            copiedIcon={<Icons.Check size={16} className="text-[var(--header-color)]" />}
            className={cn(contactItemClass, "cursor-pointer text-[var(--color-text-primary)]")}
            ariaLabel={uiCopy.header.wechat}
          >
            <span>{contactData.wechat}</span>
          </CopyText>
        )}
      </div>
    </div>
  );

  return (
    <section className="resume-section m-0 mt-2 max-w-full p-0 resume-section--hero"> 
      {hasChild ? (
        <div className="m-0 flex items-center gap-x-8 p-0">
          <div className={cn("resume-hero-content m-0 p-0 shrink-0 max-w-full", usage === "pdf" ? "w-fit" : "w-full md:w-fit")}>
            {headerMain}
          </div>
          <div className="m-0 min-w-0 flex-1 self-center p-0">{children}</div>
        </div>
      ) : (
        headerMain
      )}
    </section>
  );
}
