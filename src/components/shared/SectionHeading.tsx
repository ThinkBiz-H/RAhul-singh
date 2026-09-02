import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  light = false,
}) => {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center mx-auto" : "text-left"}`}>
      <h2
        className={`font-display font-bold text-3xl md:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <span
        className={`block h-[3px] w-16 bg-primary rounded-full mt-3 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p className={`mt-4 max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-white/70" : "text-ink/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
