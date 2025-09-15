'use client'

import { useState } from "react"
import { useAppContext } from "@/components/providers/marketplace-w-xmc"
import type { Xmapp } from "@sitecore-marketplace-sdk/xmc"
import { fetchLanguagesAction } from "./action"

export const ListLanguagesFromServerAction = () => {
    const appContext = useAppContext()
    const [languages, setLanguages] = useState<Xmapp.Language[]>([])

    const fetchLanguages = async () => {
        const languages = await fetchLanguagesAction(appContext?.resourceAccess?.[0]?.context?.preview || "")
        setLanguages(languages)
    }

    return (
        <div>
            <h1>List Languages from the server action</h1>
            <button onClick={fetchLanguages}>Fetch Languages</button>
            <div>Languages: {languages.length}</div>
            <div>{languages.map((language) => language.name)}</div>
        </div>
    )
}