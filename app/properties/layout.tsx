import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties | Abzy Properties',
  description:
    'Browse verified houses, apartments and lands for sale.',

   verification: {
    google: 'jlJp_AACqHBmCCX9DdSHcFL-q7rMttgwgAdbiZMgDro',
  },
}


export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}