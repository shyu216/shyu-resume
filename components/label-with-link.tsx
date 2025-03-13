import { Icons, type Icon } from "@/components/icons";
import Image, { type ImageProps } from "next/image";
import React from "react";
import Link from "next/link";
import LabelWithGraphic from "./label-with-graphic";


type TitleProps = {
  image?: ImageProps["src"];
  icon?: Icon;
  title: string;
  link: string;
};


export default function Title({ icon, image, title, link }: TitleProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-x-1 group"
    >
      {icon && <LabelWithGraphic icon={icon} content={title} />}
      {image && <LabelWithGraphic image={image} content={title} />}
      <Icons.Link
        size={11}
        className="text-mygray-400 transition group-hover:text-mygray-700 dark:text-mygray-400 dark:group-hover:text-mygray-200 group-hover:animate-shake"
      />
    </Link>
  );
}