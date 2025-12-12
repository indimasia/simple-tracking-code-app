import CookieWrapper from "@/Pages/Customer/CookieWrapper";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCookieConsent, useCookieConsentReset } from "@/hooks/cookie-consent";
import type { Script } from "@/lib/types";
import { Head } from "@inertiajs/react";
import { Code2, CheckCircle2, AlertCircle, Lock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export default function Index({
  title,
  user_id,
  scripts,
}: {
  title: string;
  user_id: number;
  scripts: Array<Script>;
}) {
  const cookie = useCookieConsent();
  const isConsentAccepted = cookie.services?.analytics;

  const executeScript = (scriptJson: string) => {
    if (!isConsentAccepted) {
      return {
        output: "[Script hidden - Please accept cookies to view]",
        success: false,
      };
    }

    let output = "";
    const originalLog = console.log;

    console.log = (...args) => {
      output += args.join(" ") + "\n";
      originalLog(...args);
    };

    try {
      const run = new Function(scriptJson);
      run();
      console.log = originalLog;

      return {
        output: output || "Script executed with no output.",
        success: true,
      };
    } catch (err: any) {
      console.log = originalLog;
      return {
        output: "Error: " + err.message,
        success: false,
      };
    }
  };

  const scriptResults = useMemo(() => {
    return scripts.map((script) => ({
      id: script.id,
      result: executeScript(JSON.parse(script.script)),
    }));
  }, [isConsentAccepted, scripts]);

  const handleReset = () => {
    useCookieConsentReset();
  };

  return (
    <CookieWrapper>
      <Head title={title} />
      <Layout>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Tracking Scripts
              </h1>
              <p className="text-slate-600">
                {scripts.length > 0
                  ? `${scripts.length} tracking script${
                      scripts.length !== 1 ? "s" : ""
                    } active on this page`
                  : "No tracking scripts configured"}
              </p>
            </div>

            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Consent
            </Button>
          </div>

          {/* Consent Status */}
          <div className="mt-4 flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isConsentAccepted ? "#10b981" : "#ef4444",
              }}
            />
            <p className="text-sm font-medium text-slate-700">
              Cookie consent:{" "}
              <span
                style={{
                  color: isConsentAccepted ? "#10b981" : "#ef4444",
                }}
              >
                {isConsentAccepted ? "Accepted ✓" : "Not Accepted ✗"}
              </span>
            </p>
          </div>
        </div>

        {/* Scripts Grid */}
        {scripts.length > 0 ? (
          <div className="space-y-6">
            {scripts.map((item) => {
              const scriptResult = scriptResults.find(
                (sr) => sr.id === item.id
              )?.result;

              return (
                <Card
                  key={item.id}
                  className={`flex flex-col h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden ${
                    !isConsentAccepted ? "opacity-75" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: "hsl(232, 99%, 59%)" }}
                        >
                          <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg break-words">
                            {item.name}
                          </CardTitle>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Badge
                        className={`text-xs font-medium flex items-center gap-1 w-fit ${
                          scriptResult?.success
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {scriptResult?.success ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {scriptResult?.success ? "Success" : "Failed"}
                      </Badge>

                      {/* Consent Badge */}
                      {!isConsentAccepted && (
                        <Badge className="text-xs font-medium flex items-center gap-1 w-fit bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          <Lock className="w-3 h-3" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  {/* Card Content */}
                  <CardContent className="flex flex-col flex-1">
                    {/* Script Output */}
                    <div
                      className={`rounded-lg p-4 overflow-hidden flex-1 ${
                        isConsentAccepted
                          ? "bg-slate-900"
                          : "bg-slate-200 backdrop-blur-sm"
                      }`}
                    >
                      <pre
                        className={`font-mono text-xs whitespace-pre-wrap break-words max-h-64 overflow-y-auto ${
                          isConsentAccepted
                            ? "text-slate-50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
                            : "text-slate-500"
                        }`}
                      >
                        {scriptResult?.output}
                      </pre>
                    </div>

                    {/* Script ID Info */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold">Script ID:</span> #
                        {item.id}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        <span className="font-semibold">User ID:</span> #{user_id}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex items-center justify-center py-16">
            <Card className="w-full max-w-md text-center p-8">
              <div className="flex justify-center mb-4">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "hsl(232, 99%, 59%)" }}
                >
                  <Code2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No Tracking Scripts
              </h3>
              <p className="text-slate-600 text-sm">
                There are no tracking scripts configured for this page yet.
              </p>
            </Card>
          </div>
        )}
      </Layout>
    </CookieWrapper>
  );
}