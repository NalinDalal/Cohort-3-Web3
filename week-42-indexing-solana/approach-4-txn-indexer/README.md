# Solana Transaction Indexer

Real-time Solana blockchain indexer that streams live transaction data and stores it in PostgreSQL for analytics and monitoring.

---

## How to Run (Docker)

1. **Clone the repository and enter the directory:**

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

2. **Copy and edit your environment file:**

```bash
cp .env.example .env
# Edit .env to set:
# DATABASE_URL="postgresql://indexer:password123@postgres:5432/solana_indexer"
# GRPC_ENDPOINT="mainnet-beta.grpc.solana.com:443"  # Yellowstone public mainnet
# Or use your own custom endpoint:
# GRPC_ENDPOINT="your-custom-grpc-endpoint:443"
```

3. **Start the indexer and database:**

```bash
npm run docker:up
# or
docker-compose up -d
```

4. **View indexer logs:**

```bash
npm run docker:logs
# or
docker-compose logs -f indexer
```

5. **Stop all Docker services:**

```bash
npm run docker:down
# or
docker-compose down
```

**Prisma commands (migrations/db push) in Docker:**

```bash
docker-compose exec indexer /bin/sh
# Inside the container:
npx prisma db push --schema=src/database/schema.prisma
npx prisma migrate dev --schema=src/database/schema.prisma
```

---

## How to Run Locally (No Docker)

1. **Run PostgreSQL in Docker (database only):**

```bash
docker run -d \
  --name solana-indexer-postgres \
  -e POSTGRES_USER=indexer \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=solana_indexer \
  -p 5432:5432 \
  postgres:15
```

2. **Copy and edit your environment file:**

```bash
cp .env.example .env
# Edit .env to set:
# DATABASE_URL="postgresql://indexer:password123@localhost:5432/solana_indexer"
# GRPC_ENDPOINT="mainnet-beta.grpc.solana.com:443"  # Yellowstone public mainnet
# Or use your own custom endpoint:
# GRPC_ENDPOINT="your-custom-grpc-endpoint:443"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Push Prisma schema:**

```bash
npx prisma db push --schema=src/database/schema.prisma
```

5. **Test connections:**

```bash
npm run test:connection
npm run test:db
```

6. **Start the app:**

```bash
npm run dev
```

---

## Features

- Real-time Solana blockchain data streaming
- Smart filtering (large transfers, DeFi, memos, failed transactions)
- PostgreSQL storage for analytics
- Dockerized for easy setup

## Prerequisites

- Docker & Docker Compose installed

## Setup & Run (Docker)

1. **Clone the repository and enter the directory:**

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

2. **Copy and edit your environment file:**

```bash
cp .env.example .env
# Edit .env to set:
# DATABASE_URL="postgresql://indexer:password123@postgres:5432/solana_indexer"
# GRPC_ENDPOINT="https://mainnet-beta.grpc.solana.com"
```

3. **Start the indexer and database with Docker Compose:**

```bash
npm run docker:up
# or
docker-compose up -d
```

4. **View indexer logs/output (from inside Docker):**

```bash
npm run docker:logs
# or
docker-compose logs -f indexer
```

5. **Stop all Docker services:**

```bash
npm run docker:down
# or
docker-compose down
```

**Note:**

> You do NOT need to run `npm run dev` when using Docker. The indexer service starts automatically inside the container.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (use `postgres` as host for Docker)
- `GRPC_ENDPOINT`: Solana gRPC endpoint (public endpoint recommended)
- Other variables can be set as needed for logging, reconnect attempts, etc.

## Troubleshooting

- If you see database connection errors, ensure Docker Compose is running and the database service is healthy.
- For gRPC errors, check your internet connection and endpoint validity.

**If you need to run Prisma commands (like migrations or db push) with Docker:**
To run Prisma commands inside Docker, use these exact commands:

```bash
# Open a shell inside the running indexer container
docker-compose exec indexer /bin/sh

# Then, inside the container, run:
npx prisma db push --schema=src/database/schema.prisma
npx prisma migrate dev --schema=src/database/schema.prisma
```

**Note:**

> Do NOT run Prisma commands on your host when using Docker. The database hostname `postgres` only works inside the Docker network.

---

```
const subscription = createDeFiSubscription();

// Capture memo-based payments
const subscription = createMemoSubscription();

const subscription = createFailedTxSubscription();

```

## Live Output Examples

**Slot Updates (Network Health)**

```

[SLOT] 2025-08-24T07:51:26.161Z - Slot: 362152525 (Parent: 362152524)

```

**Whale Transfers**

```

[TRANSFER] 2025-08-24T07:51:26.161Z
From: 7xKXtg2C...QoQ9HD8i
To: 9WzDXwBb...i4qRvKn3
Amount: 150.5 SOL

```

**Payment Memos**

```

[MEMO] 2025-08-24T07:51:26.161Z - Payment ID: TXN_12345

```

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Streaming**: Yellowstone gRPC (Solana's data pipeline)
- **Database**: PostgreSQL + Prisma ORM
- **Development**: Hot reload, Docker support

## Use Cases

- **DeFi Analytics**: Track protocol volumes, arbitrage opportunities
- **Whale Watching**: Monitor large SOL movements in real-time
- **Payment Processing**: Memo-based payment confirmations
- **Compliance**: Suspicious activity detection and reporting
- **Research**: Network health monitoring and usage patterns

## Environment Setup

```bash
GRPC_ENDPOINT="your-yellowstone-endpoint"
DATABASE_URL="postgresql://user:pass@localhost:5432/solana_indexer"

LOG_LEVEL="info"
MAX_RECONNECT_ATTEMPTS=5
```

## Docker Deployment

```bash
docker-compose up -d

docker-compose logs -f indexer
```

## Database Schema

5 optimized tables for blockchain analytics:

- **Transaction**: Core transaction data, fees, status
- **LargeTransfer**: SOL transfers above threshold
- **Memo**: Payment references and notes
- **Account**: Account state updates
- **FailedTransaction**: Error analysis and debugging

## Production Ready

- Automatic reconnection handling
- Error logging and monitoring
- Configurable data retention
- Connection pooling support
- Docker health checks
