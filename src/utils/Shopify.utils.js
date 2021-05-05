import { alfredDomain, appId } from '@utils/Env.utils'

export function buildShopifyAuthUrl(shop, state) {
  const forwardUrl = `${alfredDomain}/core/v1/shopify/${appId}/auth`
  const shopifyApiKey = process.env.SHOPIFY_API_KEY
  const scopes = process.env.SCOPES

  return `https://${shop}/admin/oauth/authorize?client_id=${shopifyApiKey}&scope=${scopes}&state=${state}&redirect_uri=${forwardUrl}`
}