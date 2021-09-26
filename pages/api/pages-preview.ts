import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAPI } from '@lib/api'

export default async function pagePreview(
  req: NextApiRequest,
  res: NextApiResponse<{
    message: string
  }>
) {
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_SECRET || !req.query.id)
    res.status(401).json({ message: 'Invalid token' })

  // Fetch the headless CMS to check if the provided `id` exists
  const page: TPage = (
    await fetchAPI(`/pages?id=${req.query.id}&_publicationState=preview`)
  )[0]

  // If the id doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: 'Invalid id' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/pages/${page.slug}`)
  res.end()
}
