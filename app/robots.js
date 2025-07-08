import sitemap from "./sitemap"

export default function robots() {
  return {
    rules:[
        {
            userAgent: '*',
            allow: '/',
            disallow: '/api',
        }

        
      ],
      sitemap: 'https://radiantmetalsworkshop.com/sitemap.xml',
  } 
}