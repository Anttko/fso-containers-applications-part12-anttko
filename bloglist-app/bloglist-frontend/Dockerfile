FROM node:16 AS build-stage
WORKDIR /usr/src/app
USER node
COPY --chown=node:node . /usr/src/app
RUN npm ci --only=production
ENV REACT_APP_BACKEND_URL=http://localhost:3003/
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
