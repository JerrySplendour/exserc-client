"use client"

import CreateProviderProfile from '@/components/CreateProviderProfile'
import CreateSeekerProfile from '@/components/CreateSeekerProfile'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const CreateProfile = () => {

  // It uses the Otp schema for validation and the verifyOtp action for OTP verification
  const searchParams = useSearchParams();
  // Extract end of path to get the option parameter
  const role = searchParams.get("role")

  if (role === 'seeker') {
    return (
      <CreateSeekerProfile />
    )
  } else if (role === 'provider') {
    return (
      <CreateProviderProfile />
    )
  }

}

export default CreateProfile