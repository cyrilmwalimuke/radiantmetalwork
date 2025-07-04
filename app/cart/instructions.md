ssh into my project like 
ssh root@31.97.178.56

<!-- packages update -->

apt update && apt upgrade -y
apt install curl wget nginx -y
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install nodejs -y
apt update && apt install git -y
npm install -g pm2


cd /var/www
git clone https://github.com/yourusername/your-nextjs-app.git radiantmetalsworkshop
cd radiantmetalsworkshop








nano .env.production paste secrets here
CTRL + O to save

Enter to confirm filename

CTRL + X to exit
npm install
npm run build
NODE_ENV=production pm2 start npm --name "radiant-metals-workshop" -- start
pm2 save
pm2 startup

<!-- - configure nginx -->
nano /etc/nginx/sites-available/radiantmetalsworkshop.com

server {
  listen 80;
  server_name radiantmetalsworkshop.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

<!-- link -->

ln -s /etc/nginx/sites-available/radiantmetalsworkshop.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

<!-- ssl -->
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com


upload 
/var/www/your-app/.env.production
npm run build

