import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from "@/components/ToastContext";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '📚 Mi Biblioteca - Gestión de Libros',
  description: 'Aplicación web moderna para gestión de biblioteca personal con CRUD de libros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  )
}
