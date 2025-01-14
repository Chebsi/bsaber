export async function load() {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('/src/collections/posts/*.md')).map(async ([path, module]) => {
      const { metadata } = await module()
      const slug = path.split('/').reverse()[0].split('.')[0]
      const { image } = metadata
      return { slug, ...metadata, image: image?.replace('/static', '') }
    }),
  )
  return {
    posts,
  }
}
