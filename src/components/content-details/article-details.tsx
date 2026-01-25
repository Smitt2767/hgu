import { Article } from '@/payload-types'

type ArticleDetailsProps = {
  article: Article
}

export default function ArticleDetails({ article }: ArticleDetailsProps) {
  return (
    <section className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto"></div>
    </section>
  )
}
