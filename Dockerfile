FROM node:12.19-slim

ENV USER=evobot

RUN apt-get update && \
	apt-get install -y python3 build-essential && \
	apt-get purge -y --auto-remove
	
RUN groupadd -r ${USER} && \
	useradd --create-home --home /home/evobot -r -g ${USER} ${USER}
	
USER ${USER}
WORKDIR /home/evobot

COPY package*.json ./
RUN npm install
VOLUME [ "/home/evobot" ]

COPY . .

ENTRYPOINT [ "node", "index.js" ]
