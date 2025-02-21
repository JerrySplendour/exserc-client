import CreateProviderProfile from '@/components/CreateProviderProfile'
import CreateSeekerProfile from '@/components/CreateSeekerProfile'
import React from 'react'

const CreateProfile = ({searchParams}: {searchParams: {option?: string}}) => {

  if(searchParams.option === 'seeker'){
    return (
        <CreateSeekerProfile />
    )
  }else if(searchParams.option === 'provider'){
    return (
        <CreateProviderProfile />
    )
  }
  
}

export default CreateProfile