FROM node:lts-alpine3.13
RUN mkdir -p /opt/app/dist
WORKDIR /opt/app
COPY ["package.json", "package-lock.json", "ecosystem.json", "./app.local.json", "."]
COPY ./dist ./dist
RUN adduser -S app
RUN chown -R app /opt/app
USER app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "pm2:local"]
