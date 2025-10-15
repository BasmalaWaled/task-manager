"use client";

import { z } from "zod";
import { userSchema } from "@/lib/schema";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { industryTypesList } from "../utils/industryTypesList";
import { roleList } from "../utils/roleList";
import { countryList } from "@/utils/countriesList";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  name: string;
  email: string;
  image?: string;
}

export type UserDataType = z.infer<typeof userSchema>;

export const OnboardingForm = ({ name, email, image }: Props) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      about: "",
      name: name || "",
      email: email || "",
      image: image || "",
      role: "",
      industryType: "",
      country: "",
    },
  });

  const onSubmit = async (formData: UserDataType) => {
    console.log("✅ بيانات النموذج المرسلة:", formData);

    try {
      setPending(true);

      if (!formData.role || !formData.industryType || !formData.country) {
        toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
        setPending(false);
        return;
      }

      const userData = {
        ...formData,
        name: formData.name || "",
        email: formData.email || "",
        about: formData.about || "",
        image: formData.image || "",
      };

      console.log("📤 جاري إرسال البيانات للخادم:", userData);

      const result = await createUser(userData);
      console.log("📥 النتيجة من السيرفر:", result);

      if (result?.success) {
        toast.success("تم تحديث الملف الشخصي بنجاح 🎉");
        setTimeout(() => {
          if (result.hasWorkspaces) {
            console.log("🔁 التوجيه إلى /workspaces");
            router.push("/create-workspace");
          } else {
            console.log("🔁 التوجيه إلى /create-workspace");
            router.push("/create-workspace");
          }
        }, 500);
      } else {
        console.error("❌ خطأ في استجابة السيرفر:", result);
        toast.error(result?.message || "حدث خطأ أثناء إنشاء المستخدم");
      }
    } catch (error) {
      console.error("⚠️ Error in onSubmit:", error);
      toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to DailyTM
          </CardTitle>
          <CardDescription className="text-center">
            Let’s set up your profile
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <div className="flex flex-row items-center">
                                <img
                                  src={country.flag}
                                  alt={country.name}
                                  className="w-4 h-3"
                                />
                                <p className="pl-2">{country.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Industry + Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="industryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryTypesList.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role at Organisation</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleList.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};


