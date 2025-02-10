import { LoaderCircle } from "lucide-react";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="size-12 text-theme-primary animate-spin" />
    </div>
  );
}
