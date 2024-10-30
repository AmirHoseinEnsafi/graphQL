FROM node:18-alpine 

WORKDIR /usr/src/app

COPY . . 

RUN npm i 

RUN npm run build 

EXPOSE 4000

CMD ["npm" , "start"]