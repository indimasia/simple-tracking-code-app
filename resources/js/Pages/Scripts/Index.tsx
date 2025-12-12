import { Button } from "@/components/ui/button";
import type { Script } from "@/lib/types";
import Layout from "@/components/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import Form from "@/Pages/Scripts/Form";
import { Head, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import ScriptCard from "./ScriptCard";

export default function Index({
  title,
  scripts,
}: {
  title: string;
  scripts: Array<Script>;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const {
    data,
    setData,
    post,
    errors,
    clearErrors,
    put,
    delete: destroy,
  } = useForm({
    id: null,
    name: "",
    script: "",
    is_success: null,
  });

  const onScriptCodeChange = (value: string) => {
    setData("script", value);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedId(null);
    setData("name", "");
    setData("script", "");
    setData("is_success", null);
    clearErrors();
    setResult("");
  };

  const handleOpenAddDialog = () => {
    setSelectedId(null);
    setResult("");
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (item: Script) => {
    setSelectedId(item.id);
    setData("name", item.name);
    setData("script", JSON.parse(item.script));
    setData("is_success", item.is_success);
    setResult("");
    setDialogOpen(true);
  };

  const handleRunScript = () => {
    let output = "";
    const originalLog = console.log;
    console.log = (...args) => {
      output += args.join(" ") + "\n";
      originalLog(...args);
    };

    try {
      const run = new Function(data.script);
      run();
      setResult(output || "Script executed with no output.");
      setData("is_success", true);
    } catch (err: any) {
      setResult("Error: " + err.message);
      setData("is_success", false);
    }

    console.log = originalLog;
  };

  const handleDeleteScript = (id: number) => {
    destroy(route("scripts.delete", id));
  };

  const handleSubmit = () => {
    if (selectedId !== null && selectedId !== undefined) {
      handleRunScript();
      put(route("scripts.update", selectedId), {
        onSuccess: () => {
          handleCloseDialog();
        },
      });
      return;
    }
    handleRunScript();
    post(route("scripts.store"), {
      onSuccess: () => {
        handleCloseDialog();
      },
    });
  };

  const renderEmptyScript = () => {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <p className="text-slate-500 text-lg">You haven't added any scripts yet</p>
          <p className="text-slate-400 text-sm mt-2">Start by clicking the "Add New Script" button above</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head title={title} />
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Scripts</h2>
            <Button onClick={handleOpenAddDialog} className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Script
            </Button>
          </div>

          {scripts.length === 0 ? (
            renderEmptyScript()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scripts.map((item) => (
                <ScriptCard 
                  key={item.id} 
                  item={item} 
                  handleOpenEditDialog={handleOpenEditDialog} 
                  handleDeleteScript={handleDeleteScript} />
               ))}
            </div>
          )}
        </div>

        <Form
          isOpen={dialogOpen}
          onClose={handleCloseDialog}
          name={data.name}
          setName={(value) => setData("name", value)}
          scriptCode={data.script}
          isSuccess={data.is_success}
          errors={errors}
          handleRunScript={handleRunScript}
          onScriptCodeChange={onScriptCodeChange}
          result={result}
          onSubmit={handleSubmit}
          selectedId={selectedId}
        />
      </Layout>
    </>
  );
}