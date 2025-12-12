import { Code2, Cog, DoorOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useForm, usePage } from "@inertiajs/react";
import { route, useRoute } from "ziggy-js";
import { useCookieConsent, useCookieConsentReset } from "@/hooks/cookie-consent";

export default function Header() {
  const page = usePage();

  const { post } = useForm();

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("logout"));
    useCookieConsentReset();
  };
  return (
    <div className="w-full bg-white border-b border-slate-200 px-20 py-5 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Script Tracker</h1>
        </div>

        <div className="flex items-center gap-2">
          {page.url === "/customer" ? (
            <Link href={route("scripts.index")}>
              <Button variant="outline" className="flex items-center gap-2">
                <Cog /> Settings
              </Button>
            </Link>
          ) : (
            <Link href={route("customer.index")}>
              <Button variant="outline" className="flex items-center gap-2">
                <Code2 /> Scripts
              </Button>
            </Link>
          )}
          <form onSubmit={handleLogout}>
            <Button variant="outline" className="flex items-center gap-2">
              <DoorOpen className="w-5 h-5" /> Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
