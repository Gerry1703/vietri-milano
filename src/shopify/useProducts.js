import { useState, useEffect } from 'react'
import { shopifyFetch } from './client'
import { GET_PRODUCTS, GET_PRODUCT } from './queries'
import { products as mockProducts } from '@/data/products'

function normalizeProduct(node) {
  return {
    id:          node.id,
    handle:      node.handle,
    name:        node.title,
    description: node.description,
    price:       '€ ' + parseFloat(node.priceRange.minVariantPrice.amount).toLocaleString('it-IT'),
    image:       node.images.edges[0]?.node.url ?? '',
    category:    node.productType,
    material:    node.tags.find(t => t.startsWith('material:'))?.replace('material:', '') ?? '',
    tag:         node.tags.find(t => ['NEW', 'ESCLUSIVO'].includes(t)) ?? null,
  }
}

export function useProducts() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    shopifyFetch({ query: GET_PRODUCTS, variables: { first: 20 } })
      .then(res => {
        if (!res) { setData(mockProducts); return }
        setData(res.data.products.edges.map(e => normalizeProduct(e.node)))
      })
      .catch(() => setData(mockProducts))
      .finally(() => setLoading(false))
  }, [])

  return { products: data, loading }
}

export function useProduct(handle) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    shopifyFetch({ query: GET_PRODUCT, variables: { handle } })
      .then(res => {
        if (!res) { setProduct(mockProducts.find(p => p.handle === handle) ?? null); return }
        setProduct(normalizeProduct(res.data.productByHandle))
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [handle])

  return { product, loading }
}
