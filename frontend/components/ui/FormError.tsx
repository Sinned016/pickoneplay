import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function FormError({ children, className }: Props) {
  if (!children) return null;

  return <div className={cn("text-error text-sm", className)}>{children}</div>;
}
