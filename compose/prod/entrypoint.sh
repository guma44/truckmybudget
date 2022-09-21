#!/bin/bash

cd /opt/frontend

echo "REACT_APP_API_ENDPOINT=${API_ENTRYPOINT}" > .env.production
npm run build --prod
rm -rf /var/www/html && mv build /var/www/html

supervisord -c /etc/supervisord.conf