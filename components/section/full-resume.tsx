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
import { getColor } from "@/content/config";
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
  const colorSet = getColor();
  const headerColor = usage === "pdf" ? colorSet.light : colorSet[resolvedTheme === "dark" ? "dark" : "light"];

  const animatedComponents: AnimatedComponent[] = [
    { component: WorkSection, props: { usage }, delay: 0.3 },
    { component: ProjectSection, props: { usage }, delay: 0.5 },
    { component: EducationSection, props: { usage }, delay: 0.7 },
    { component: SkillSection, props: { usage }, delay: 0.9 },
  ];

  const resumeSections = (
    <>
      <HeaderSection usage={usage} />
      <SummarySection usage={usage} />

      {animatedComponents.map(
        ({ component: Component, props = { usage: "live" }, delay }, index) =>
          usage === "live" ? (
            <Motion key={language + jobType + headerColor + index} delay={delay}>
              <Component {...props} />
            </Motion>
          ) : (
            // disable animation for pdf
            <Component key={index} {...props} />
          )
      )}
    </>
  );

  const ResumeContent = () => {
    if (usage === "pdf") {
      return (
        <div
          className="pdf-resume-root"
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            "--header-color": headerColor,
          } as React.CSSProperties}
        >
          {resumeSections}
        </div>
      );
    }

    return (
      <Container
        className="mt-9 max-w-6xl mx-auto pdf-resume-root"
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          "--header-color": headerColor,
        } as React.CSSProperties}
      >
        {resumeSections}
      </Container>
    );
  };

  return <ResumeContent />;
});

FullResume.displayName = "FullResume";
