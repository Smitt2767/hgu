import { GetBlockProps } from '@/types/blocks'
import ArticleCard from '../article/card'

export default function FeaturedArticle(props: GetBlockProps<'featuredArticle'>) {
  if (!props.article || typeof props.article !== 'object') return null

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <ArticleCard {...props} />
      </div>
    </div>
  )
}
