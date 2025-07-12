"use client";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { requestRegistrationOtp, verifyRegistrationOtp } from "@/actions/auth";
import { Otp } from "@/lib/definitions";
import Countdown from "react-countdown";
import { useSearchParams } from "next/navigation";

const verifyRegistration = () => {
  // Custom hook to handle authentication logic
  // It uses the Otp schema for validation and the verifyRegistrationOtp action for OTP verification
  const searchParams = useSearchParams();
  // Extract end of path to get the role parameter
  const role = searchParams.get("role")
  
  const { form, loading, onSubmit } = useAuth({
    schema: Otp,
    action: verifyRegistrationOtp,
    path: `/signup/create-profile?role=${role}`,
  });

  // Custom hook to handle OTP request
  // It uses the requestRegistrationOtp action to resend the OTP
  const { onSubmit: resendOtp, loading: resendLoading } = useAuth({
    action: requestRegistrationOtp,
  })

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a complete state
    return ("");
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};


  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          className="flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full items-center gap-2">
            <div>
              <Link href="/">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <Image
                    src="/assets/images/favicon.png"
                    className="block w-full h-full object-cover"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </div>
              </Link>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl text-center text-black-1 mb-2">
                OTP Verification
            </h1>
            <h3 className="text-lg sm:text-xl text-center text-black-1 mb-6">
              Input 6 digit code sent to your email address
            </h3>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px] items-center justify-center">
            <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <InputOTP autoFocus maxLength={6} {...field}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

          </div>
          <div className="mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center">
            <p className="text-black-2 font-medium text-sm">
              Didn&rsquo;t recieved any email?{"  "}
                <Button type="button" disabled={resendLoading || loading} variant={"link"} onClick={resendOtp} className="text-primary-1 px-0 mr-4">
                  Resend
                </Button>
                {resendLoading && 
                  <Countdown className="text-primary-1" date={Date.now() + 30000} renderer={renderer} />
                }
            </p>
            <Button
              variant="default"
              className="w-full"
              type="submit"
              disabled={loading || resendLoading}
            >
              {loading ? "Loading..." : "Send"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default verifyRegistration;
