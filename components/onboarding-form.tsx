"use client";
import { z } from "zod";
import { userSchema } from "@/lib/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { industryTypesList } from "../utils/industryTypesList";
import { roleList } from "../utils/roleList";
import { Textarea } from "@/components/ui/textarea";


import {
  Form,
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
} from "@/components/ui/select"; // ✅ import select
import { countryList } from "@/utils/countriesList";


interface Props {
  name: string;
  email: string;
  image?: string;
}

type UserDataType = z.infer<typeof userSchema>;

export const OnboardingForm = ({ name, email, image }: Props) => {
  const [pending, setPending] = useState(false);

  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      about: "",
      name: name || "",
      email: email,
      image: image || "",
      role: "",
      industryType: "",
      country: "", // لازم يبقى موجود في schema
    },
  });

  const onSubmit = (data: UserDataType) => {
    console.log(data);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            {/* حقل اختيار الدولة */}
<FormField
  control={form.control}
  name="country"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Country</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* حقل اختيار الصناعة */}
  <FormField
    control={form.control}
    name="industryType"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Industry Type</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <FormField 
  control={form.control}
  name="name"
  render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" {...field} className="resize-none">

                      </Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              <Button type="submit" disabled={pending}>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

