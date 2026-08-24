"use client";

import { Icons } from "@/components/ui/icons";
import { CopyText, HoverLink } from "@/components/ui/tooltip";
import { cn } from "@/content/config";
import { useContext } from "react";
import { LanguageContext } from "@/components/lang/language-provider";
import {
  siteConfig,
  pickLanguage,
  getNameRenderConfig,
  getHeaderContactInfo,
  getUrlDisplayText,
} from "@/content/config";
import { copy } from "@/content/copy";

type Props = {
  usage: "live" | "pdf";
};

export default function HeaderSection({ usage }: Props) {
  const { language } = useContext(LanguageContext);
  const { name, contact } = siteConfig.personal;
  const uiCopy = copy[language];
  const fontsizeClass = usage === "live" ? "text-xs" : "text-[10px]";
  const contactItemClass = `group ${fontsizeClass} inline-flex gap-1 items-center transition whitespace-nowrap`;
  const nameData = pickLanguage(language, name);
  const nameRender = getNameRenderConfig(language, nameData);
  const contactData = getHeaderContactInfo(language, contact);

  const linkTextClass = "leading-none opacity-90";
  const iconSize = usage === "live" ? 14 : 11;

  return (
    <section className="resume-section resume-section--hero">
      <div className="resume-hero-content flex max-w-full flex-col items-start p-0">
        <h2 className="max-w-full mb-1 text-2xl font-bold w-full text-center">
          <span>
            {nameRender.segments.map((segment, index) => (
              <span key={`${segment.text}-${index}`} className={segment.highlighted ? "text-accent" : "text-primary"}>
                {index > 0 ? nameRender.separator : ""}
                {segment.text}
              </span>
            ))}
          </span>
        </h2>

        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 p-0 mb-2 w-full">
          <HoverLink
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className={cn(contactItemClass, "text-primary")}
            aria-label={uiCopy.header.linkedin}
          >
            <Icons.Linkedin size={iconSize} className="group-hover:animate-shake" />
            <span className={linkTextClass}>{getUrlDisplayText(contact.linkedin, "path")}</span>
          </HoverLink>

          <HoverLink
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className={cn(contactItemClass, "text-primary")}
            aria-label={uiCopy.header.github}
          >
            <Icons.Github size={iconSize} className="group-hover:animate-shake" />
            <span className={linkTextClass}>{getUrlDisplayText(contact.github, "path")}</span>
          </HoverLink>

          <HoverLink
            href={contact.website}
            target="_blank"
            rel="noreferrer"
            className={cn(contactItemClass, "text-primary")}
            aria-label={uiCopy.header.website}
          >
            <Icons.Globe size={iconSize} className="group-hover:animate-shake" />
            <span className={linkTextClass}>{getUrlDisplayText(contact.website, "host-path")}</span>
          </HoverLink>

          <CopyText
            value={contactData.email}
            icon={<Icons.Mail size={iconSize} className="group-hover:animate-shake" />}
            copiedIcon={<Icons.Check size={14} className="text-accent" />}
            className={cn(contactItemClass, "cursor-pointer text-primary")}
          >
            <span>{contactData.email}</span>
          </CopyText>

          <CopyText
            value={contactData.phone}
            icon={<Icons.PhoneCall size={iconSize} className="group-hover:animate-shake" />}
            copiedIcon={<Icons.Check size={14} className="text-accent" />}
            className={cn(contactItemClass, "cursor-pointer text-primary")}
          >
            <span>{contactData.phone}</span>
          </CopyText>

          {contactData.wechat && (
            <CopyText
              value={contactData.wechat}
              icon={<Icons.Wechat size={iconSize} className="group-hover:animate-shake" />}
              copiedIcon={<Icons.Check size={14} className="text-accent" />}
              className={cn(contactItemClass, "cursor-pointer text-primary")}
              ariaLabel={uiCopy.header.wechat}
            >
              <span>{contactData.wechat}</span>
            </CopyText>
          )}
        </div>
      </div>
    </section>
  );
}
