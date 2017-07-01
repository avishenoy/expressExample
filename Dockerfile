From node:boron

# create App directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy files
COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app
EXPOSE 5000

CMD ["node", "server.js"]
