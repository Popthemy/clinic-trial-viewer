import React from "react";
import Image, { StaticImageData } from "next/image";
import ConditionIcon from "./ConditionIcon";

interface MedicalIconProps {
  condition: string;
  size: number;
  src: string | StaticImageData | null;
  alt?: string;
  className?: string;
}

const MedicalIcon = ({
  condition,
  src,
  alt = "medical icon",
  className = "object-cover",
  size,
}: MedicalIconProps) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        placeholder="blur"
        fill
      />
    );
  }

  return <ConditionIcon condition={condition} size={size * 4} />;
};

export default MedicalIcon;
