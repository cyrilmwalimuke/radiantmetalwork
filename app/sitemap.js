export default async function sitemap() {
        const baseUrl = "https://radiantmetalsworkshop.com";
      
        const routes = [
          { url: `${baseUrl}/`, lastModified: new Date() },
          { url: `${baseUrl}/shop`, lastModified: new Date() },
          { url: `${baseUrl}/check-out`, lastModified: new Date() },
       
        ];
      
        return routes;
      }
      