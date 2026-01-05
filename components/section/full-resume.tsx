"use client";

import { Container } from "@/components/ui/container";
import React, { useContext } from "react";
import ActionButton from "@/components/ui/action-button";
import Motion from "@/components/ui/motion";
import HeaderSection from "@/components/section/header-section";
import SkillSection from "@/components/section/skill-section";
import WorkSection from "@/components/section/work-section";
import ProjectSection from "@/components/section/project-section";
import EducationSection from "@/components/section/education-section";
import { LanguageContext } from "@/components/lang/language-provider";

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

  const animatedComponents: AnimatedComponent[] = [
    { component: HeaderSection, props: { usage }, delay: 0.1 },
    { component: WorkSection, props: { usage }, delay: 0.3 },
    { component: ProjectSection, props: { usage }, delay: 0.5 },
    { component: EducationSection, props: { usage }, delay: 0.7 },
    { component: SkillSection, props: { usage }, delay: 0.9 },
  ];
  return (
    <Container
      className="mt-9 max-w-6xl mx-auto"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {animatedComponents.map(
        ({ component: Component, props = { usage: "live" }, delay }, index) =>
          usage === "live" ? (
            <Motion key={language + index} delay={delay}>
              <Component {...props} />
            </Motion>
          ) : (
            // disable animation for pdf
            <Component key={index} {...props} />
          )
      )}
      {usage === "live" && (
        <div className="flex sm:hidden justify-center mt-10">
          <ActionButton
            text={language === "en"
                ? "Save PDF"
                : language === "zh"
                ? "保存PDF"
                : "儲存PDF"}
            className="bg-stone-800 block sm:hidden"
            usage="live"
          />
        </div>
      )}
    </Container>
  );
});

FullResume.displayName = "FullResume";
