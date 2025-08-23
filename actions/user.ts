import { CreateeProviderProfileSchema, CreateSeekerProfileSchema } from "@/lib/definitions"
import { deleteSession, getSession } from "@/lib/session"


// This function creates or updates a seeker profile
// It validates the form data, checks for a valid session, sends a request to the API, and returns the response.
/** 
 * @param formData - The form data containing seeker profile details such as name, location, date of birth, phone number, and gender.
 * @returns 
 * This function returns an object containing either the profile data or errors from the profile creation process.
 * - If no session is found, it returns a message prompting the user to request an OTP first.
 * - If validation fails, it returns the validation errors and a message.
 * - If the API request fails, it returns the server error message or a default error.
 * - If successful, it returns the seeker profile data.
 */
export async function createSeekerProfile (formData: FormData) {
    try {
        const session = await getSession('VERIFICATION')
        if(!session){
          return {
            message: 'no session found, go back request OTP'
          }
        }

        const validatedFields = CreateSeekerProfileSchema.safeParse({
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          country: formData.get('country'),
          state: formData.get('state'),
          location: formData.get('location'),
          date_of_birth: formData.get('date_of_birth'),
          phone_number: formData.get('phone_number'),
          // avatar_file: formData.get('avatar_file'),
          gender: formData.get('gender')
        })

        if(!validatedFields.success){
          return {
            error: validatedFields.error.flatten().fieldErrors,
            message: validatedFields.error.message
          }
        }
        
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/update-seeker-profile/${session?.id}`, {
            method: 'PUT',
            body: JSON.stringify(validatedFields.data),
          })

        const result = await response.json()
          
        if (!response.ok){
          return{
            message: result?.message || 'Something went wrong!'
          }
        }

        await deleteSession('VERIFICATION');
        return {
            data: result?.data
        }
    } catch (error) {
        console.error('profile create error', error)
        return {
            message: 'something went wrong!'
        }
    }
}


// This function creates or updates a provider profile
// It validates the form data, checks for a valid session, sends a request to the API, and returns the response.
/** 
 * @param formData - The form data containing provider profile details such as personal info, business name, services, education, and location.
 * @returns 
 * This function returns an object containing either the profile data or errors from the profile creation process.
 * - If no session is found, it returns a message prompting the user to request an OTP first.
 * - If validation fails, it returns the validation errors and a message.
 * - If the API request fails, it returns the server error message or a default error.
 * - If successful, it returns the provider profile data.
 */
export async function createProviderProfile (formData: FormData) {

    try {
        const session = await getSession('VERIFICATION')
        if(!session){
          return {
            message: 'no session found'
          }
        }

        const validatedFields = CreateeProviderProfileSchema.safeParse({
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          business_name: formData.get('business_name'),
          core_service: formData.get('core_service'),
          skills: formData.get('skills'),
          gender: formData.get('gender'),
          education_level: formData.get('education_level'),
          country: formData.get('country'),
          state: formData.get('state'),
          location: formData.get('location'),
          rc_number: formData.get('rc_number'),
          bio: formData.get('bio'),
          date_of_birth: formData.get('date_of_birth'),
          phone_number: formData.get('phone_number'),
          // avatar_file: formData.get('avatar_file'),
        })

        if(!validatedFields.success){
          return {
            error: validatedFields.error.flatten().fieldErrors,
            message: validatedFields.error.message
          }
        }
        
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/update-provider-profile/${session?.id}`, {
            method: 'PUT',
            body: JSON.stringify(validatedFields.data),
          })
        const result = await response.json()
          
        if (!response.ok){
          return{
            message: result?.message || 'Something went wrong!'
          }
        }

        await deleteSession('VERIFICATION')
        return {
            data: result?.data
        }
    } catch (error) {
        console.error('profile create error', error)
        return {
            message: 'something went wrong!'
        }
    }
}