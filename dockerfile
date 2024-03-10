FROM node
WORKDIR /
COPY . /www/
CMD cd /www/server && npx prisma db push && npx prisma generate &&node index.mjs 
EXPOSE 3000