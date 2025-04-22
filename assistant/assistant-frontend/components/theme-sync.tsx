"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeSync() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Check sessionStorage for theme
    const theme = sessionStorage.getItem('theme')
    if (theme) {
      setTheme(theme)
    }
  }, [setTheme])

  return null
} 