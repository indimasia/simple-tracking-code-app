import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Pen, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Script } from "@/lib/types";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function ScriptCard({
  item,
  handleOpenEditDialog,
  handleDeleteScript,
}: {
  item: Script;
  handleOpenEditDialog: (item: Script) => void;
  handleDeleteScript: (id: number) => void;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      handleDeleteScript(item.id);
      setDeleteDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row justify-between items-start pb-3 border-b">
          <h3 className="text-lg font-semibold text-slate-900 flex-1 pr-2 break-words">
            {item.name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem className="p-0">
                <Button
                  onClick={() => handleOpenEditDialog(item)}
                  variant="ghost"
                  className="w-full justify-start text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  onClick={() => setDeleteDialogOpen(true)}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-3 flex-1">
          <Badge
            className={`w-fit text-xs font-medium ${
              item.is_success
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }`}
          >
            {item.is_success ? "✓ Success" : "✗ Failed"}
          </Badge>
          <div className="bg-slate-900 rounded-md p-3 font-mono text-xs text-slate-50 overflow-hidden flex-1">
            <pre className="whitespace-pre-wrap break-words h-40 overflow-y-auto scrollbar-custom">
              {JSON.parse(item.script)}
            </pre>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        scriptName={item.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
