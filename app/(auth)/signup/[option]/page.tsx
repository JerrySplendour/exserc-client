"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { SignupFormSchema } from '@/lib/definitions'
import { signup } from '@/actions/auth'
import { useAuth } from '@/hooks/useAuth'
import { motion } from "framer-motion"
import { User, Check, Plus } from "lucide-react"


const SignUpOption_old = ({params}: {params: {option: 'seeker' | 'provider'}}) => {
  const [checked, setChecked] = useState<boolean>(false)

  // Custom hook to handle authentication logic
  // It uses the SignupFormSchema for validation and the signup action for registration
  const {
    form,
    loading,
    onSubmit,
  } = useAuth({
    role: params.option,
    schema: SignupFormSchema,
    action: signup,
    checked,
    path: `/signup/verify?role=${params.option}`,
  })

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Form {...form}>
        <form className='flex items-center flex-col gap-y-9 w-full max-w-[1024px] px-4' 
        onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col w-full items-center'>
            <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Register</h1>
            <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1 capitalize'>To {params.option} service</h3>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
          </div>
          <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
            <div className='flex items-center gap-2'>
              <Checkbox id='terms' onCheckedChange={(val: boolean) => setChecked(val)} />
              <label htmlFor='terms'  className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#"  className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#"  className="text-[#3FBFA9]">Privacy Policy</Link></label>
            </div>
            <Button variant="default" className='w-full disabled:bg-primary-2' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/signin"  className="text-primary-1">Login</Link></p>
          </div>
        </form>
      </Form>
    </div>
  )
}

function SignUpOption({params}: {params: {option: 'seeker' | 'provider'}}) {
  const [formData, setFormData] = useState({
    fullName: "Moses Johnson",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="text-gray-400" size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
              {/* <span className="text-white text-xs font-bold">1</span> */}
              <Plus className="text-white text-xs font-bold" size={11}/>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Register</h1>
          <p className="text-teal-600">To {params.option === "seeker" ? "find" : "provide"} a service</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-start space-x-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                formData.agreeToTerms ? "bg-teal-600 border-teal-600" : "border-gray-300"
              }`}
            >
              {formData.agreeToTerms && <Check className="text-white" size={12} />}
            </button>
            <p className="text-sm text-gray-600">
              By Signing up, you agree to our{" "}
              <Link href="/terms" className="text-teal-600 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Register
          </motion.button>

          <p className="text-center text-gray-600">
            Have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUpOption