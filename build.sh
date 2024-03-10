#!/bin/bash
yarn build
echo "yarn build successed"
cp ./dockerfile .output/
echo "dockerfile copyed"
cp .env_output .output/server/.env
echo ".env copyed"
cp output.json .output/server/package.json
cd .output/server 
rm -rf node_modules/.prisma
yarn add prisma
npx prisma init
cd ../../
cp prisma/schema.prisma .output/server/prisma
cd .output
docker build -t autobuild:latest .
echo "build image success"