import { NextApiRequest, NextApiResponse } from 'next'
import { buildShopifyAuthUrl } from '@utils/Shopify.utils'
import { nonce } from '@utils/Global.utils'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop } = req.query

  const state = nonce(16)
  const cookie = `state=${nonce(16)}; SameSite=None; Secure`

  const ShopifyAuthUrl = buildShopifyAuthUrl(shop as string, state)

  res.writeHead(302, {
    'Location': ShopifyAuthUrl,
    'Set-Cookie': cookie
  })

  res.end()
}