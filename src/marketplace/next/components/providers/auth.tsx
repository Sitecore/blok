import { auth0 } from "@/lib/auth0"
import { redirect } from "next/navigation"

export async function AuthProvider({ children }: { children: React.ReactNode }) {
    const session = await auth0.getSession()
    
    if (!session) {
        redirect('/auth/login')
    }
    console.log('session', session)
    
    return children
}