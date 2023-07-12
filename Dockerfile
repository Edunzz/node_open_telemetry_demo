FROM node:14
WORKDIR /app
COPY . .
RUN npm install
RUN npm install @opentelemetry/sdk-node @opentelemetry/api @opentelemetry/auto-instrumentations-node @opentelemetry/sdk-metrics @opentelemetry/exporter-trace-otlp-proto @opentelemetry/exporter-metrics-otlp-proto @opentelemetry/resources @opentelemetry/semantic-conventions
RUN npm install
CMD [ "node", "--require", "./opentelemetry.js", "app.js" ]
EXPOSE 4000
