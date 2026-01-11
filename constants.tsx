import { 
  Globe, 
  Server, 
  Database, 
  Layers, 
  Network, 
  ShieldCheck, 
  ArrowDown,
  Search,
  Eye,
  HardDrive,
  MessageSquare,
  Cpu,
  Activity,
  Zap,
  RefreshCw
} from 'lucide-react';
import { ColumnData, BlockType } from './types.ts';

export const COLUMN_1_DATA: ColumnData = {
  id: 'col1',
  title: '1. Back-of-Envelope & Latency',
  colorTheme: 'blue',
  blocks: [
    {
      title: 'Traffic Pattern (Critical)',
      type: BlockType.KEY_VALUE,
      badge: 'Step 1',
      badgeColor: 'blue',
      content: [
        { label: 'Type', value: 'Read vs Write Heavy?' },
        { label: 'Shape', value: 'Steady vs Spiky (Flash Sale)' },
        { label: 'Impact', value: 'Decides Cache / Queue / DB' },
      ]
    },
    {
      title: 'Scalability Basics',
      type: BlockType.KEY_VALUE,
      content: [
        { label: 'Horizontal', value: 'Add Servers (Stateless)' },
        { label: 'Sharding', value: 'Split Data (Stateful)' },
        { label: 'Why?', value: 'Single machine limit' },
      ]
    },
    {
      title: 'Latency Reference',
      type: BlockType.KEY_VALUE,
      content: [
        { label: 'L1 Cache', value: '~1 ns' },
        { label: 'RAM Access', value: '~100 ns' },
        { label: 'LAN Network', value: '~10 µs' },
        { label: 'SSD Random Read', value: '~150 µs' },
        { label: 'Disk Seek', value: '~10 ms' },
        { label: 'Internet (Round Trip)', value: '~150 ms' },
      ]
    },
    {
      title: 'Availability SLAs',
      type: BlockType.KEY_VALUE,
      content: [
        { label: '99.9%', value: '8.76 hrs/yr downtime' },
        { label: '99.99%', value: '52.6 min/yr downtime' },
        { label: '99.999%', value: '5 min/yr downtime' },
      ]
    },
    {
      title: 'Capacity Rules',
      type: BlockType.KEY_VALUE,
      content: [
        { label: '1M req/day', value: '≈ 12 req/sec' },
        { label: 'Standard Image', value: '≈ 200 KB' },
        { label: 'Char / Int', value: '1 byte / 4 bytes' },
      ]
    },
    {
      title: 'Cost Analysis (Trade-offs)',
      type: BlockType.KEY_VALUE,
      content: [
        { label: 'CDN', value: '$$ vs Origin Load' },
        { label: 'Redis RAM', value: '$$$ (Use eviction)' },
        { label: 'X-Region', value: '$$$ Replication data' },
        { label: 'Compute', value: 'Spot vs On-Demand' },
      ]
    }
  ]
};

export const COLUMN_2_DATA: ColumnData = {
  id: 'col2',
  title: '2. High-Level Architecture Flow',
  colorTheme: 'green',
  flowSteps: [
    // EDGE ZONE
    {
      id: 'step1',
      title: 'Client',
      subtitle: 'Web / Mobile',
      tags: ['Offline Support'],
      details: ['Optimistic UI', 'Local Caching'],
      icon: Globe,
      zone: 'Edge',
      connector: 'solid'
    },
    {
      id: 'step2',
      title: 'CDN / DNS',
      subtitle: 'Edge Resolution',
      tags: ['Geo-Routing'],
      details: ['Static Assets', 'DDoS Shield'],
      icon: Network,
      zone: 'Edge',
      connector: 'solid'
    },
    {
      id: 'step3',
      title: 'API Gateway',
      tags: ['Rate Limit', 'Auth'],
      details: ['Load Shedding', 'SSL Termination'], 
      alert: 'Traffic Spike',
      icon: ShieldCheck,
      zone: 'Edge',
      connector: 'solid'
    },
    
    // COMPUTE ZONE
    {
      id: 'step4',
      title: 'Service Mesh',
      subtitle: 'Optional (Scale 50+)',
      tags: ['mTLS Security'],
      details: ['Circuit Breaker', 'Service Disc.'],
      icon: Server,
      zone: 'Compute',
      connector: 'solid'
    },
    
    // DATA ZONE
    {
      id: 'step5',
      title: 'Dist. Cache',
      subtitle: 'Redis (Ephemeral)',
      tags: ['Session Store'],
      details: ['Cache-Aside', 'Thundering Herd'],
      icon: Zap,
      zone: 'Data',
      connector: 'dashed' 
    },
    {
      id: 'step6',
      title: 'Database',
      subtitle: 'Primary + Replicas',
      tags: ['Outbox Pattern', 'ACID'],
      details: ['Sharding Key', 'Index Strategy'],
      alert: 'Replica Lag',
      icon: Database,
      zone: 'Data',
      connector: 'dashed'
    },
    
    // ASYNC ZONE
    {
      id: 'step7',
      title: 'Event Bus',
      subtitle: 'Kafka / RabbitMQ',
      tags: ['Decoupling', 'DLQ'],
      details: ['Backpressure', 'Event Replay'],
      icon: Layers,
      zone: 'Async',
      connector: 'dashed'
    },
    {
      id: 'step8',
      title: 'Async Workers',
      subtitle: 'Job Processors',
      tags: ['Video Processing'],
      details: ['Idempotency', 'Batching'],
      icon: Cpu,
      zone: 'Async',
      connector: 'solid'
    },

    // OBSERVABILITY ZONE
    {
      id: 'step9',
      title: 'Observability',
      subtitle: 'Logs & Metrics',
      tags: ['Dist. Tracing'],
      details: ['Prometheus', 'Anomaly Det.'],
      icon: Eye,
      zone: 'Observability',
      connector: 'dashed'
    }
  ]
};

export const COLUMN_3_DATA: ColumnData = {
  id: 'col3',
  title: '3. Data & Storage Patterns',
  colorTheme: 'orange',
  blocks: [
    {
      title: 'Cache Strategy Rules',
      type: BlockType.LIST,
      badge: 'Performance',
      badgeColor: 'green',
      content: [
        { label: 'When?', value: 'Repeated reads, slow change' },
        { label: 'Strategy', value: 'Cache-Aside + TTL' },
        { label: 'Fix Stale', value: 'Invalidation / TTL' },
        { label: 'Fix Storm', value: 'Jitter / Locking' },
      ]
    },
    {
      title: 'Database Choice',
      type: BlockType.LIST,
      content: [
        { label: 'SQL', value: 'Strong Consistency (Payments)' },
        { label: 'NoSQL', value: 'High Scale/Write (Feeds, Logs)' },
        { label: 'Partitioning', value: 'Avoid Time-only keys' },
      ]
    },
    {
      title: 'Data Modeling Strategy',
      type: BlockType.LIST,
      badge: 'Hotspots',
      badgeColor: 'red',
      content: [
        { label: 'Partition Key', value: 'User ID vs Time (Avoid Hotspots)' },
        { label: 'Indexes', value: 'Read speed vs Write penalty' },
        { label: 'Normalization', value: 'Write opt vs Read opt' },
      ]
    },
    {
      title: 'Consistency Scope',
      type: BlockType.KEY_VALUE,
      badge: 'Context',
      badgeColor: 'yellow',
      content: [
        { label: 'Strong', value: 'Payments, Inventory' },
        { label: 'Eventual', value: 'Feeds, Likes, Search' },
        { label: 'Session', value: 'Read-your-own-writes' },
      ]
    },
    {
      title: 'Replication',
      type: BlockType.LIST,
      content: [
        { label: 'Master-Slave', value: 'Write Master, Read Slave' },
        { label: 'Leaderless', value: 'Quorum (Cassandra/Dynamo)' },
      ]
    }
  ]
};

export const COLUMN_4_DATA: ColumnData = {
  id: 'col4',
  title: '4. Advanced Patterns & Flows',
  colorTheme: 'purple',
  blocks: [
    {
      title: 'Path Strategies (Read vs Write)',
      type: BlockType.LIST,
      badge: 'Critical',
      badgeColor: 'blue',
      content: [
        { label: 'Read Path', value: 'Client → Cache (Miss) → DB' },
        { label: 'Write Path', value: 'Client → DB → Invalidate → Event' },
        { label: 'Consistency', value: 'Cache-Aside + TTL' },
      ]
    },
    {
      title: 'Async Processing Rules',
      type: BlockType.KEY_VALUE,
      content: [
        { label: 'When?', value: 'Slow / Non-critical tasks' },
        { label: 'Examples', value: 'Notifs, Analytics, Email' },
        { label: 'Benefit', value: 'Latency & Reliability' },
      ]
    },
    {
      title: 'Layer Failure Patterns',
      type: BlockType.KEY_VALUE,
      badge: 'Mitigation',
      badgeColor: 'red',
      content: [
        { label: 'API Gateway', value: 'Spike → Rate Limit / Shed' },
        { label: 'Cache', value: 'Eviction Storm → TTL Jitter' },
        { label: 'Database', value: 'Replica Lag → Read Primary' },
        { label: 'Queue', value: 'Poison Msg → DLQ' },
      ]
    },
    {
      title: 'Final Design Checklist',
      type: BlockType.LIST,
      badge: 'Sanity',
      badgeColor: 'green',
      content: [
        { label: 'Paths', value: 'Clear Read & Write defined?' },
        { label: 'Failures', value: 'Bottlenecks handled?' },
        { label: 'Scaling', value: 'Sharding/Caching explained?' },
      ]
    },
    {
      title: 'Real-Time Chat',
      type: BlockType.LIST,
      content: [
        { label: 'Transport', value: 'WebSockets (Duplex)' },
        { label: 'Presence', value: 'Redis (Ephemeral)' },
        { label: 'History', value: 'Cassandra (Durable)' },
      ]
    },
    {
      title: 'Payment Gateway',
      type: BlockType.LIST,
      badge: 'ACID',
      badgeColor: 'green',
      content: [
        { label: 'Idempotency', value: 'Unique Key / Req' },
        { label: 'Atomicity', value: 'DB Transaction' },
      ]
    }
  ]
};