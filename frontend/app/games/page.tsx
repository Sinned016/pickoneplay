import EmptyState from "@/components/ui/EmptyState";
import { LayoutGrid } from "lucide-react";

export default function Games() {
  return (
    <EmptyState
      icon={LayoutGrid}
      title="All games"
      description="Browse every PickOnePlay game — coming soon."
    />
  );
}
