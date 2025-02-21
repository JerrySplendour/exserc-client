import { SignupFormSchema } from '@/lib/definitions'
import { createSession } from '@/lib/session'
 
export async function signup(formData: FormData) {
  //1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password1: formData.get('password1'),
    password2: formData.get('password2'),
    role: formData.get('role')
  })
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'form fields not validated'
    }
  }
   // 2. Prepare data for insertion into database
   const validatedData = validatedFields.data
    // 3. Insert data into database
    try {
      
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/register/', {
        method: 'POST',
        body: JSON.stringify({ ...validatedData }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { 
        data: {user: {username, email, role}, token}}: 
      { data: { 
          user: {username: string, email: string, role: 'seeker'| 'provider'}, 
          token: string
        }
      } = await response.json()
  
     // 4. Create user session
     createSession(
        {
          username,
          email,
          role,
          token,
        }
     )
     // 5. Redirect user
     return {
        username
     }
    } catch (error) {
      return {
        message: 'something went wrong!'
      }
    }

}

export async function login(formData: FormData){

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.ok) {
      
      const {user: {username, email, role}, token, profile: {profile_picture}}:
      { user: {
          username: string, 
          email: string, 
          role: 'seeker'| 'provider'}, 
        token: string, 
        profile: {profile_picture: string}
      } = data
    
        createSession(
        {
            username,
            email,
            role,
            token,
            profile_picture
          }
        )
        // 5. Redirect user
        return {
            username
        }
    }else{
          throw new Error(data.detail)
    }
  } catch (error) {
    return {
      message: (error as Error).message
    }
  }
}