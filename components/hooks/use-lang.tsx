'use client'
import { useParams } from 'next/navigation'

export const useLang = () => {
  const params = useParams<{ [key: string]: string }>()
  return params.lang
}
