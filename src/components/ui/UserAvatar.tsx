import Image from "next/image";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  size?: number;
  className?: string;
}

export function UserAvatar({ name, image, size = 28, className = "" }: UserAvatarProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name ?? "User"}
        width={size}
        height={size}
        className={`rounded-full object-cover shrink-0 ${className}`}
      />
    );
  }

  const initials = name ? getInitials(name) : "?";
  const fontSize = Math.round(size * 0.35);

  return (
    <div
      style={{ width: size, height: size, fontSize }}
      className={`rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-semibold shrink-0 ${className}`}
    >
      {initials}
    </div>
  );
}
