const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const {
  OTLPMetricExporter
} = require("@opentelemetry/exporter-metrics-otlp-proto");
const {
  PeriodicExportingMetricReader
} = require('@opentelemetry/sdk-metrics');

// Configurar el nivel de depuración
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/metrics',
      headers: {},
      concurrencyLimit: 1,
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
