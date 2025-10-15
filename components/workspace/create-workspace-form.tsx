"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { workspaceSchema } from "@/lib/schema";
import { createNewWorkspace, CreateWorkspaceDataType } from "@/app/actions/workspace";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const CreateWorkspaceForm = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<CreateWorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: { name: "", description: "" },
  });

const onSubmit = async (formData: CreateWorkspaceDataType) => {
  setPending(true);
  try {
    // ⬇️ استدعاء السيرفر أكشن
    const response = await createNewWorkspace(formData);

    // ⬅️ هنا نحط الـ console.log
    console.log("Workspace creation response:", response);

    // ✅ لو نجح، روّح على صفحة الـ workspace الجديد
    if (response.success) {
      router.push(`/workspaces/${response.workspaceId}`);
      toast.success("تم إنشاء مساحة العمل بنجاح");
    } else {
      // لو فشل
      throw new Error(response.message || "فشل في إنشاء مساحة العمل");
    }

  } catch (error) {
    console.error("Error in onSubmit:", error);
    toast.error(error instanceof Error ? error.message : "حدث خطأ. يرجى المحاولة مرة أخرى.");
  } finally {
    setPending(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create New Workspace</CardTitle>
          <CardDescription className="text-center">Set up your workspace for yourself and team</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" disabled={pending} onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={pending} className="min-w-[150px]">
                  {pending ? "Creating..." : "Create Workspace"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};



