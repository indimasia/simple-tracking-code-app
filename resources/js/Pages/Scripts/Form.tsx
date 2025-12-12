import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Script } from "@/lib/types";
import { Play, Plus, Save } from "lucide-react";
import type React from "react";

export default function Form({
  isOpen,
  scriptCode,
  name,
  isSuccess,
  result,
  errors,
  onClose,
  setName,
  onScriptCodeChange,
  handleRunScript,
  onSubmit,
  selectedId,
}: {
  isOpen: boolean;
  scriptCode: string;
  name: string;
  isSuccess: boolean | null;
  result: string;
  errors: Record<string, string>;
  onClose: () => void;
  setName: (value: string) => void;
  onScriptCodeChange: (value: string) => void;
  handleRunScript: (directly: boolean) => void;
  onSubmit: () => void;
  selectedId?: number | null;
}) {
  const isEditMode = selectedId !== null && selectedId !== undefined;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              {isEditMode ? "Edit Script" : "Create New Script"}
            </DialogTitle>
          </DialogHeader>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="script-name" className="font-semibold text-slate-700">
              Script Name
            </Label>
            <Input
              id="script-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Track User Click"
              className={`${
                errors?.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors?.name && (
              <p className="text-xs font-medium text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Script Code Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="script-code" className="font-semibold text-slate-700">
              Script Code
            </Label>
            <Textarea
              id="script-code"
              placeholder={`// Example:\nfunction trackEvent() {\n  console.log('Event tracked');\n}\n\ntrackEvent();`}
              value={scriptCode}
              onChange={(e) => onScriptCodeChange(e.target.value)}
              rows={10}
              className={`font-mono text-sm resize-none ${
                errors?.script
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors?.script && (
              <p className="text-xs font-medium text-red-600">{errors.script}</p>
            )}
          </div>

          {/* Output Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="output" className="font-semibold text-slate-700">
              Output
            </Label>
            <div
              className={`rounded-lg border p-4 font-mono text-sm whitespace-pre-wrap break-words min-h-24 max-h-40 overflow-y-auto bg-slate-50 ${
                isSuccess === true
                  ? "border-green-300 bg-green-50"
                  : isSuccess === false
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200"
              }`}
            >
              {result || (
                <span className="text-slate-400">
                  Run your script to see the output here...
                </span>
              )}
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleRunScript(isSuccess !== null)}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Quick Run
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {isEditMode ? (
                <>
                  <Save className="w-4 h-4" />
                  Update Script
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Script
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}