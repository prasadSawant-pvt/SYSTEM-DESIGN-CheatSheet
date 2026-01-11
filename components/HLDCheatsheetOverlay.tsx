import React from 'react';
import { X, ArrowRight, AlertTriangle } from 'lucide-react';
import { ZoneType } from '../types.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  zone: ZoneType | null;
}

const HLDCheatsheetOverlay: React.FC<Props> = ({ isOpen, onClose, zone }) => {
  if (!isOpen || !zone) return null;

  const getZoneContent = () => {
    switch (zone) {
      case 'Edge':
        return {
          title: 'CLIENT ACCESS & EDGE LAYER — HLD CHEATSHEET',
          sections: [
            {
              title: 'CLIENTS',
              color: 'blue',
              subsections: [
                {
                  title: 'Client Types',
                  items: ['Web Browser (Chrome, Safari)', 'Mobile App (iOS / Android)', 'Third-Party Clients', 'Internal Services (BFF / SSR)']
                },
                {
                  title: 'Network Behavior',
                  items: ['HTTP/HTTPS', 'REST / GraphQL', 'WebSocket (Chat, Live updates)', 'gRPC (internal clients)']
                },
                {
                  title: 'Client-Side Responsibilities',
                  items: ['Auth Token storage (JWT / OAuth)', 'Request retries (idempotent only)', 'Caching (HTTP Cache / LocalStorage)', 'Compression (gzip / br)', 'Rate-limit handling (429)']
                }
              ],
              callout: 'Clients should never contain business logic. All trust boundaries start at API Gateway.'
            },
            {
              title: 'DNS (DOMAIN → IP)',
              color: 'yellow',
              subsections: [
                {
                  title: 'Resolution Flow',
                  items: ['Client → Local DNS → ISP DNS → Root → TLD → Authoritative DNS']
                },
                {
                  title: 'DNS Record Types',
                  items: ['A / AAAA → IP', 'CNAME → CDN endpoint', 'NS → Delegation', 'TXT → Verification']
                },
                {
                  title: 'Performance & Scaling',
                  items: ['DNS Cache TTL (30s – 5min)', 'Geo-DNS routing', 'Anycast IPs']
                },
                {
                  title: 'Failure & Trade-offs',
                  items: ['Low TTL → Faster failover, more DNS load', 'High TTL → Better cache, slower recovery']
                }
              ],
              callout: 'DNS lookup: ~20–120 ms (cold), ~0 ms (cached)'
            },
            {
              title: 'CDN (EDGE CACHE)',
              color: 'orange',
              subsections: [
                {
                  title: 'What CDN Serves',
                  items: ['Static assets (JS, CSS, Images, Videos)', 'Cached APIs (GET only)', 'Signed URLs (private content)']
                },
                {
                  title: 'Cache Mechanics',
                  items: ['Cache-Key = URL + Headers + Query', 'TTL / Max-Age', 'Cache Invalidation', 'Stale-While-Revalidate']
                },
                {
                  title: 'CDN Flow',
                  items: ['Client → Nearest Edge', 'Cache HIT → Response', 'Cache MISS → Origin (API Gateway / LB)']
                },
                {
                  title: 'Edge Optimizations',
                  items: ['TLS termination', 'HTTP/2 / HTTP/3', 'Brotli compression', 'Image resizing', 'Edge Functions']
                },
                {
                  title: 'Security at Edge',
                  items: ['DDoS protection', 'WAF rules', 'IP blocking', 'Bot detection']
                },
                {
                  title: 'Cost Trade-off',
                  items: ['CDN saves backend cost', 'Over-caching risks stale data', 'Invalidation is expensive']
                }
              ],
              callout: 'Edge response: ~10–30 ms, Origin fallback: +100–300 ms'
            },
            {
              title: 'API GATEWAY (EDGE CONTROL PLANE)',
              color: 'red',
              subsections: [
                {
                  title: 'Core Responsibilities',
                  items: ['Single entry point', 'Request routing', 'Protocol translation']
                },
                {
                  title: 'Security Controls',
                  items: ['Authentication (OAuth / JWT)', 'Authorization (Scopes / Roles)', 'API Keys', 'mTLS (internal)']
                },
                {
                  title: 'Traffic Management',
                  items: ['Rate limiting (token bucket)', 'Throttling', 'Circuit breaker', 'Timeouts']
                },
                {
                  title: 'Request Processing',
                  items: ['Header enrichment', 'Request validation', 'Schema enforcement', 'Versioning (v1/v2)']
                },
                {
                  title: 'Observability',
                  items: ['Access logs', 'Metrics (QPS, Latency, Errors)', 'Tracing IDs']
                }
              ],
              callout: 'API Gateway must be horizontally scalable. Never stateful.'
            }
          ],
          metrics: [
            'DNS TTL: 30s–300s',
            'CDN Cache Hit Target: >90%',
            'API Gateway Latency Budget: <10 ms',
            'TLS Termination: CDN or Gateway',
            'Edge Failure Strategy: Multi-CDN'
          ]
        };
      case 'Compute':
      case 'Data':
        return {
          title: 'MICROSERVICES COMPUTE & DATA LAYER — SERVICE MESH HLD CHEATSHEET',
          sections: [
            {
              title: 'INGRESS & TRAFFIC ENTRY',
              color: 'blue',
              subsections: [
                {
                  title: 'Responsibilities',
                  items: ['Traffic from API Gateway / Ingress', 'L7 routing', 'Canary / Blue-Green routing']
                },
                {
                  title: 'Components',
                  items: ['Kubernetes Ingress / Envoy Gateway', 'Load Balancer (L4/L7)']
                },
                {
                  title: 'Controls',
                  items: ['Request size limits', 'TLS termination (optional)', 'Path / host-based routing']
                }
              ],
              callout: 'Ingress overhead: ~1–3 ms'
            },
            {
              title: 'MICROSERVICES (STATELESS COMPUTE)',
              color: 'green',
              subsections: [
                {
                  title: 'Service A',
                  items: ['Stateless', 'Horizontally scalable', 'Containerized (Docker)', 'JVM / Node / Python', 'CPU & Memory limits', 'Auto-scaling (HPA)', 'Sync: REST / gRPC', 'Async: Kafka / Queue', 'Timeouts', 'Retries (bounded)', 'Idempotency']
                },
                {
                  title: 'Service B',
                  items: ['Stateless', 'Horizontally scalable', 'Containerized (Docker)', 'JVM / Node / Python', 'CPU & Memory limits', 'Auto-scaling (HPA)', 'Sync: REST / gRPC', 'Async: Kafka / Queue', 'Timeouts', 'Retries (bounded)', 'Idempotency']
                },
                {
                  title: 'Service C',
                  items: ['Stateless', 'Horizontally scalable', 'Containerized (Docker)', 'JVM / Node / Python', 'CPU & Memory limits', 'Auto-scaling (HPA)', 'Sync: REST / gRPC', 'Async: Kafka / Queue', 'Timeouts', 'Retries (bounded)', 'Idempotency']
                },
                {
                  title: 'Async Worker',
                  items: ['Stateless', 'Horizontally scalable', 'Containerized (Docker)', 'JVM / Node / Python', 'CPU & Memory limits', 'Auto-scaling (HPA)', 'Sync: REST / gRPC', 'Async: Kafka / Queue', 'Timeouts', 'Retries (bounded)', 'Idempotency']
                },
                {
                  title: 'Cron / Batch',
                  items: ['Stateless', 'Horizontally scalable', 'Containerized (Docker)', 'JVM / Node / Python', 'CPU & Memory limits', 'Auto-scaling (HPA)', 'Sync: REST / gRPC', 'Async: Kafka / Queue', 'Timeouts', 'Retries (bounded)', 'Idempotency']
                }
              ],
              callout: 'Services never talk directly by IP — only via service mesh sidecars.'
            },
            {
              title: 'SERVICE MESH (EAST–WEST TRAFFIC)',
              color: 'purple',
              subsections: [
                {
                  title: 'Sidecar Proxy',
                  items: ['Envoy / Linkerd', 'Per-pod proxy', 'mTLS encryption', 'Traffic interception']
                },
                {
                  title: 'Traffic Policies',
                  items: ['Retries', 'Timeouts', 'Circuit breakers', 'Load balancing (RR / EWMA)']
                },
                {
                  title: 'Mesh Control Plane',
                  items: ['Istiod / Linkerd Control', 'Policy distribution', 'Certificate rotation']
                },
                {
                  title: 'Observability',
                  items: ['Distributed tracing', 'Metrics (RED / USE)', 'Service dependency graph']
                }
              ],
              callout: 'Control plane failure does NOT stop traffic; data plane keeps working.'
            },
            {
              title: 'DISTRIBUTED CACHE',
              color: 'orange',
              subsections: [
                {
                  title: 'Read Cache',
                  items: ['Redis / Memcached', 'Hot data', 'TTL-based eviction']
                },
                {
                  title: 'Write / Session Cache',
                  items: ['User sessions', 'Auth tokens', 'Rate-limit counters']
                },
                {
                  title: 'Cache Patterns',
                  items: ['Cache-aside', 'Write-through', 'Write-back']
                }
              ],
              callout: 'Cache is eventually consistent. Source of truth = DB. Cache read: ~0.5–1 ms'
            },
            {
              title: 'DATA STORES (SOURCE OF TRUTH)',
              color: 'red',
              subsections: [
                {
                  title: 'Relational DB',
                  items: ['PostgreSQL / MySQL', 'Transactions', 'Strong consistency']
                },
                {
                  title: 'NoSQL DB',
                  items: ['DynamoDB / Cassandra / MongoDB', 'High throughput', 'Partition-based scaling']
                },
                {
                  title: 'Search / Analytics',
                  items: ['Elasticsearch', 'Read-optimized', 'Index-based queries']
                },
                {
                  title: 'Replication & Backup',
                  items: ['Read replicas', 'Multi-AZ', 'PITR backups']
                }
              ],
              callout: 'DB read: ~5–15 ms, Cross-region: +50–100 ms'
            }
          ],
          metrics: [
            'Service-to-service p99: <50 ms',
            'Retry attempts: max 2',
            'Cache hit ratio: >85%',
            'DB connection pool limit',
            'Sidecar CPU overhead: ~5–10%'
          ]
        };
      case 'Async':
      case 'Observability':
        return {
          title: 'ASYNC PROCESSING & OBSERVABILITY LAYER — EVENT-DRIVEN HLD CHEATSHEET',
          sections: [
            {
              title: 'EVENT PRODUCERS',
              color: 'blue',
              subsections: [
                {
                  title: 'Sync Services',
                  items: ['API / Microservices', 'Business events', 'Outbox pattern']
                },
                {
                  title: 'User / External Events',
                  items: ['UI actions', 'Webhooks', 'Third-party callbacks']
                },
                {
                  title: 'System Events',
                  items: ['DB CDC', 'Cron triggers', 'Infrastructure events']
                }
              ],
              callout: 'Events must be durable before acknowledgment (Outbox / WAL).'
            },
            {
              title: 'EVENT BUS (DURABLE TRANSPORT)',
              color: 'yellow',
              subsections: [
                {
                  title: 'Message Broker',
                  items: ['Kafka / Pulsar / RabbitMQ / SQS', 'Append-only log (Kafka)', 'FIFO / Standard queues']
                },
                {
                  title: 'Topics / Queues',
                  items: ['Partitioned topics', 'Ordering guarantees', 'Retention policies']
                },
                {
                  title: 'Producer Guarantees',
                  items: ['At-least-once', 'Idempotent producer', 'Batching & compression']
                },
                {
                  title: 'Consumer Groups',
                  items: ['Parallelism via partitions', 'Offset management', 'Backpressure handling']
                },
                {
                  title: 'Failure & Retry Channels',
                  items: ['Dead Letter Queue (DLQ)', 'Retry topics', 'Poison message handling']
                }
              ],
              callout: 'Broker publish: ~2–10 ms, Cross-region replication: +20–50 ms'
            },
            {
              title: 'ASYNC COMPUTE',
              color: 'green',
              subsections: [
                {
                  title: 'Stateless Workers',
                  items: ['Event consumers', 'Idempotent handlers', 'Horizontal scaling']
                },
                {
                  title: 'Stateful Stream Processors',
                  items: ['Kafka Streams / Flink / Spark', 'Windowed aggregations', 'Exactly-once semantics']
                },
                {
                  title: 'Task Executors',
                  items: ['Email / Notifications', 'Payment settlement', 'Media processing']
                },
                {
                  title: 'Scheduling & Backoff',
                  items: ['Exponential retry', 'Rate control', 'Circuit breakers']
                }
              ],
              callout: 'Workers must be restart-safe and re-playable.'
            },
            {
              title: 'ASYNC STATE & CHECKPOINTING',
              color: 'orange',
              subsections: [
                {
                  title: 'Offset & Checkpoint Store',
                  items: ['Kafka offsets', 'Flink checkpoints', 'Exactly-once recovery']
                },
                {
                  title: 'Idempotency Store',
                  items: ['Dedup keys', 'Event IDs', 'TTL-based cleanup']
                },
                {
                  title: 'Materialized Views',
                  items: ['Read models', 'Projections', 'Eventual consistency']
                }
              ],
              callout: 'Async systems trade immediacy for durability and scale.'
            },
            {
              title: 'OBSERVABILITY & OPERATIONS',
              color: 'purple',
              subsections: [
                {
                  title: 'Structured Logs',
                  items: ['Event ID', 'Correlation ID', 'Error context']
                },
                {
                  title: 'Metrics',
                  items: ['Lag per partition', 'Throughput (events/sec)', 'Retry & DLQ counts']
                },
                {
                  title: 'Distributed Tracing',
                  items: ['Trace propagation', 'Async spans', 'End-to-end visibility']
                },
                {
                  title: 'Alerts & SLOs',
                  items: ['Consumer lag alerts', 'DLQ growth', 'Processing latency SLOs']
                }
              ],
              callout: 'Golden Signals: Latency | Traffic | Errors | Saturation'
            }
          ],
          metrics: [
            'Consumer lag: near-zero steady state',
            'Max retries: 3–5',
            'DLQ rate: <0.1%',
            'Processing p99: SLA dependent',
            'Event retention: 7–30 days'
          ]
        };
      default:
        return null;
    }
  };

  const content = getZoneContent();
  if (!content) return null;

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-300 bg-blue-50/50';
      case 'yellow': return 'border-amber-300 bg-amber-50/50';
      case 'orange': return 'border-orange-300 bg-orange-50/50';
      case 'red': return 'border-red-300 bg-red-50/50';
      default: return 'border-slate-300 bg-slate-50/50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{content.title}</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Horizontal Flow - Ultra Wide Layout */}
          <div className="overflow-x-auto pb-4 min-w-[1400px]">
            <div className="flex items-center gap-3">
              {content.sections.map((section, idx) => (
                <React.Fragment key={section.title}>
                  <div className={`flex-shrink-0 border-2 rounded-lg p-4 ${getColorClasses(section.color)} ${
                    section.title === 'EVENT BUS (DURABLE TRANSPORT)' ? 'min-w-[600px]' : 
                    section.title === 'ASYNC COMPUTE' ? 'min-w-[500px]' : 
                    'min-w-[280px]'
                  }`}>
                    <h3 className="font-bold text-sm mb-3 text-center">{section.title}</h3>
                    <div className="space-y-3">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.title} className="bg-white rounded border p-2">
                          <h4 className="font-semibold text-xs mb-1 text-slate-700">{subsection.title}</h4>
                          <ul className="space-y-0.5">
                            {subsection.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-xs text-slate-600 flex items-start">
                                <span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {section.callout && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded flex items-start gap-2">
                        <AlertTriangle size={14} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-yellow-800">{section.callout}</span>
                      </div>
                    )}
                  </div>
                  {idx < content.sections.length - 1 && (
                    <ArrowRight className="flex-shrink-0 text-slate-400" size={20} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Flow Arrows Legend */}
          <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded">
            <h4 className="font-semibold text-xs mb-2 text-slate-700">Flow Legend</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 bg-slate-600"></div>
                <span className="text-slate-600">Publish Event</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 bg-slate-600"></div>
                <span className="text-slate-600">Append to Log</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-400"></div>
                <span className="text-slate-600">Consume Batch</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-400"></div>
                <span className="text-slate-600">Retry with Backoff</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 bg-red-500"></div>
                <span className="text-slate-600">Sent to DLQ</span>
              </div>
            </div>
          </div>

          {/* Metrics Sidebar */}
          <div className="border-t pt-4 mt-6">
            <h3 className="font-bold text-sm mb-3 text-slate-700">
              {zone === 'Edge' ? 'Client Layer Cheat Metrics' : 
               zone === 'Async' || zone === 'Observability' ? 'Async Layer Key Metrics' : 
               'Compute & Data Layer Metrics'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {content.metrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded p-2">
                  <p className="text-xs font-mono text-slate-700">{metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HLDCheatsheetOverlay;
