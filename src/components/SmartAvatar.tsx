"use client";

interface SmartAvatarProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SmartAvatar({ src, alt, className = "", style }: SmartAvatarProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}
