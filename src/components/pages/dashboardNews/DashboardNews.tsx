import React, { useState, useEffect } from 'react'
import { getAllNews } from '../../../app/API/news'
import { INews } from '../../../interfaces/INews'
import { NewsCard } from '../../elements/news/NewsCard'
import { Layout } from '../../elements/layout/Layout'

export const DashboardNews = () => {

  const [news, setNews] = useState<INews[] | any[]>([])

  // Set all news to state
  const fetchNews = async () => {
    const res = await getAllNews()
    setNews(res)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <Layout addingType='news-add'>
      {news?.map((ns: INews) => (
        <NewsCard key={ns.id} news={ns} />
      ))}
    </Layout>
  )
}
