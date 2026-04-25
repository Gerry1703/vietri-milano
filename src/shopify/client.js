// TODO: connect to Shopify Storefront API
// Requires VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_TOKEN in .env

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
const token  = import.meta.env.VITE_SHOPIFY_TOKEN

export async function shopifyFetch({ query, variables = {} }) {
  if (!domain || !token) {
    console.warn('Shopify env vars not set — using mock data')
    return null
  }

  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
  return res.json()
}
