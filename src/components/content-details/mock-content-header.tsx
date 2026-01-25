type MockContentHeaderProps = {
  contentType: 'videos' | 'articles'
}

export default function MockContentHeader({ contentType }: MockContentHeaderProps) {
  const label = contentType === 'videos' ? 'Video' : 'Article'

  return (
    <section className="w-full px-6 py-12">
      <div className="h-[50vh] w-full border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
        <p className="text-primary text-lg">{label} details goes here</p>
      </div>
    </section>
  )
}
