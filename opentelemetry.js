// Librerias Open Telemetry para instrumentacion automatica
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

// Importar la librería para los recursos
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Configurar el nivel de depuración
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Configurar SDK, export (dynatrace) y agregar propiedades de service
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'demo-node-service2',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter: new OTLPTraceExporter({
    url: "https://vph98389.sprint.dynatracelabs.com/api/v2/otlp/v1/traces",
    headers: {
            Authorization: "Api-Token TOKEN"
    },
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Iniciar entrega de traces por instrumentacion SDK
sdk.start();
