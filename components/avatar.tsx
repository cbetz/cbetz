import Image from "next/image";
import type { Author } from "../lib/types";

export default function Avatar({ name, picture }: Author) {
  return (
    <div className="flex items-center">
      <Image
        src={picture.url}
        width={12}
        height={12}
        className="w-12 h-12 rounded-full mr-4"
        alt={name}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
