import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { ArrowRight } from "lucide-react";

export default function Index() {

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-slate-900">Welcome</h1>
          <p className="text-lg text-slate-600">
            Start tracking your scripts and monitor performance with ease
          </p>
        </div>

        <Link href={route("scripts.index")}>
          <Button
          onClick={() => {
            router.visit(route("login.form"));
          }}
            size="lg"
            className="mt-8 gap-2 px-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Tracking
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
