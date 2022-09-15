#!/bin/bash

cd /app
echo "REACT_APP_API_ENDPOINT=${API_ENTRYPOINT}" > .env.production
npm run build --prod
npx serve build

