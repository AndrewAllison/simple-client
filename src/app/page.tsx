'use client';
import React from 'react'
import HomePage from '@/app/HomePage'
import { useSelector } from 'react-redux'
import { State } from '@/app/dashboard/page'
import { redirect } from 'next/navigation'

export default function Home() {
  const { isAuthenticated } = useSelector((state: State) => state.auth)
  
  if (isAuthenticated) {
    redirect('/dashboard')
  }
  
  return (
   <HomePage></HomePage>
  )
}
