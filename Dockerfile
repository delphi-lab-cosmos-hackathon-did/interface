FROM node:12.19.0-alpine

ARG ENV_NAME="staging"

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./

# Install production dependencies.
RUN yarn

# Copy local code to the container image.
COPY . .
RUN cp "./envs/.env.$ENV_NAME" .env
RUN yarn build

# Run the web service on container startup.
CMD [ "yarn", "start" ]
