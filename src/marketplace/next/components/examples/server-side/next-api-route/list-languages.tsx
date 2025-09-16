'use client'

import { useState } from "react"
import { useAppContext } from "@/components/providers/marketplace"
import type { Xmapp } from "@sitecore-marketplace-sdk/xmc"

export const ListLanguagesFromApiRoute = () => {
    const appContext = useAppContext()
    const [languages, setLanguages] = useState<Xmapp.Language[]>([])
    
    const fetchLanguages = async () => {
        try {
        const response = await fetch(`/api/sites/languages?contextid=${appContext?.resourceAccess?.[0]?.context?.preview}`)
        const data = await response.json()
        console.log('languages from api', data)
        setLanguages(data)
        } catch (error) {
            console.error('error from api', error)
        }
    }

    return (
        <div>
            <h1>List Languages from the API route</h1>
            <button onClick={fetchLanguages}>Fetch Languages</button>
            <div>Languages: {languages.length}</div>
            <div>{languages.map((language) => language.name)}</div>
        </div>
    )
}