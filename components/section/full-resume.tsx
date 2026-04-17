"use client";

import { Container } from "@/components/ui/container";
import React, { useContext } from "react";
import Motion from "@/components/ui/motion";
import HeaderSection from "@/components/section/header-section";
import SummarySection from "@/components/section/summary-section";
import SkillSection from "@/components/section/skill-section";
import WorkSection from "@/components/section/work-section";
import ProjectSection from "@/components/section/project-section";
import EducationSection from "@/components/section/education-section";
import { LanguageContext } from "@/components/lang/language-provider";
import { useJobType } from "@/components/job/job-type-provider";
import { getColor, getFont } from "@/content/config";
import { useTheme } from "next-themes";

type Props = {
  usage: "live" | "pdf";
};

type ResumeHeaderProps = {
  usage: "live" | "pdf";
};

// You can add more type definitions here by using OR (|) operator
type ComponentProps = ResumeHeaderProps;

type AnimatedComponent = {
  component: React.FC<ComponentProps>; // React functional component
  props?: ComponentProps; // optional props
  delay: number; // delay for animation
};

export const FullResume = React.forwardRef(({ usage }: Props, ref) => {
  const { language } = useContext(LanguageContext);
  const { jobType } = useJobType();
  const { resolvedTheme } = useTheme();
  const fontStack = getFont(jobType, language).fontStack.join(", ");
  const colorSet = getColor(jobType, language);
  const headerColor = usage === "pdf" ? colorSet.light : colorSet[resolvedTheme === "dark" ? "dark" : "light"];

  const animatedComponents: AnimatedComponent[] = [
    { component: WorkSection, props: { usage }, delay: 0.3 },
    { component: ProjectSection, props: { usage }, delay: 0.5 },
    { component: EducationSection, props: { usage }, delay: 0.7 },
    { component: SkillSection, props: { usage }, delay: 0.9 },
  ];

  const ResumeContent = () => (
    <Container
      className={`${usage === "pdf" ? "mt-0 pt-0" : "mt-9"} max-w-6xl mx-auto pdf-resume-root`}
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        fontFamily: fontStack,
        "--font-family": fontStack,
        "--header-color": headerColor,
      } as React.CSSProperties}
    >
      {usage === "pdf" ? (
        <HeaderSection usage={usage}>
          <SummarySection usage={usage} />
        </HeaderSection>
      ) : (
        <>
          <div className="hidden md:block">
            <Motion delay={0.1} className="w-full">
              <HeaderSection usage={usage}>
                <SummarySection usage={usage} />
              </HeaderSection>
            </Motion>
          </div>

          <div className="md:hidden">
            <Motion delay={0.1} className="w-fit max-w-full">
              <HeaderSection usage={usage} />
            </Motion>
            <Motion delay={0.2} className="w-full min-w-0">
              <SummarySection usage={usage} />
            </Motion>
          </div>
        </>
      )}

      {animatedComponents.map(
        ({ component: Component, props = { usage: "live" }, delay }, index) =>
          usage === "live" ? (
            <Motion key={language + jobType + fontStack + headerColor + index} delay={delay}>
              <Component {...props} />
            </Motion>
          ) : (
            // disable animation for pdf
            <Component key={index} {...props} />
          )
      )}
    </Container>
  );

  return <ResumeContent />;
});

FullResume.displayName = "FullResume";
