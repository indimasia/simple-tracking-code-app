import { Code2, DoorOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Header() {
  return (
    <div className="w-full bg-white border-b border-slate-200 px-20 py-5 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">
          Script Tracker
        </h1>
      </div>
      <Link href={route("index")}>
      <Button variant="outline" className="flex items-center gap-2"><DoorOpen className="w-5 h-5" /> Back to Home </Button>
      </Link>
      </div>
        
    </div>
  );
}