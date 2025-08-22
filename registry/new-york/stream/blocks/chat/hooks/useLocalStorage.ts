import { useEffect, useState } from "react"

// Overload signatures
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void]
export function useLocalStorage<T = undefined>(
  key: string
): [T | undefined, (value: T) => void]

// Implementation
export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        return JSON.parse(item)
      }
      return initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      const parsed = item !== null ? JSON.parse(item) : initialValue

      setStoredValue((prev) => {
        const isEqual = JSON.stringify(prev) === JSON.stringify(parsed)
        return isEqual ? prev : parsed
      })
    } catch {}
  }, [key, initialValue])

  const setValue = (value: T) => {
    setStoredValue(value)
    if (value === undefined) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  return [storedValue, setValue] as
    | [T, (value: T) => void]
    | [T | undefined, (value: T) => void]
}
