export const metadata = {
  title: 'Mohan Perugu — Data Engineer | AWS · Redshift · Python',
  description: 'Data Engineer building scalable pipelines and analytics platforms on AWS. Specializing in ETL, Redshift, Python, and Power BI.',
  openGraph: {
    title: 'Mohan Perugu — Data Engineer',
    description: 'Building scalable data pipelines and analytics platforms on AWS.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
