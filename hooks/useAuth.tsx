"use client";

import { useState } from "react";
import { useToast } from "./use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";

interface fetchParams {
  role?: "seeker" | "provider";
  schema?: z.ZodSchema;
  action: (formData: FormData) => Promise<any>;
  checked?: boolean;
  path?: string; 
}

export const useAuth = ({
  role,
  schema,
  action,
  checked = true,
  path, 
}: fetchParams) => {
  const { toast } = useToast();
  // get router path
  const pathname = usePathname()

  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof schema | any>>({
    resolver: zodResolver(schema!),
    defaultValues: {
      role: role,
    },
  });

  const successMessage = ({message}: {message?: string}) => {
    if ((pathname.endsWith("seeker") || pathname.endsWith('provider')) && pathname.includes('signup')) {
      return `Registration successful!`;
    } else if (pathname.endsWith("login")) {
      return `Welcome back ${message}!`;
    } else{
      return message;
    }
  }

  const onSubmit = async (values: z.infer<typeof schema | any>) => {
    // Do not submit if the terms checkbox is not checked
    if (!checked) {
       toast({
        title: "Error",
        variant: "destructive",
        description: "Please accept the terms and conditions to proceed.",
        duration: 3000
      });
      return;
    }
    try {
      setLoading(true);
        // create form data from values
      const formData = new FormData();
      if(values){
        Object?.entries(values)?.forEach(([key, value]) => {
          formData?.set(key, value as string);
        });
      }
      const res = await action(formData);
      if (res?.message) {
        // Handle error response from the server
        toast({
          title: "Error",
          variant: "destructive",
          description: res.message,
          duration: 3000
        });
      } else {
        // Handle successful response
        toast({
          title: "Success ✅",
          description: successMessage({message: res?.data}),
          duration: 3000
        })
        // route to the specified path if provided
        setTimeout(() => {
          if (path){
             router.push(path)
          }
        }, 5000)
      }
    } catch (error) {
        // Handle unexpected errors
      toast({
        title: "Unexpected Error",
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  // return state and handlers
  return {
    form,
    onSubmit,
    loading,
  };
};
