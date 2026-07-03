import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties | Abzy Properties',
  description:
    'Browse verified houses, apartments and lands for sale.',
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}