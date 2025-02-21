import { getSession, updateSession } from "@/lib/session"

export async function updateSeekerProfile (formData: FormData) {
    try {
        const session = await getSession()
        console.log('toke', session?.token)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/profile/service-seeker/', {
            method: 'PUT',
            body: formData,
            headers: {
              'Authorization': `Token ${session?.token}`
            },
            
          })
        const {profile_picture} = await response.json()
        updateSession(
            {
              profile_picture
            }
         )
        return {
            username: session?.username,
        }
    } catch (error) {
        console.log('profile create error', error)
        return {
            message: 'something went wrong!'
        }
    }
}

export async function updateProviderProfile (formData: FormData) {
    try {
        const session = await getSession()
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/profile/service-provider/', {
            method: 'PUT',
            body: formData,
            headers: {
              'Authorization': `Token ${session?.token}`
            },
            
          })
        const {profile_picture} = await response.json()
        updateSession(
            {
              profile_picture
            }
         )
        return {
            username: session?.username,
        }
    } catch (error) {
        console.log('profile create error', error)
        return {
            message: 'something went wrong!'
        }
    }
}