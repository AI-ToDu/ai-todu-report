# Esquema físico AV2: PostgreSQL

Fuente: migraciones V1–V4 del backend; 19 tablas de aplicación/infraestructura. Flyway mantiene además su propio historial. Los nombres y restricciones se extraen del DDL; el modelo objetivo de 35 tablas se conserva por separado.

## workspaces

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `name` | `name VARCHAR(120) NOT NULL` |

## workspace_locks

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY REFERENCES workspaces(id)` |

## users

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `email` | `email VARCHAR(254) NOT NULL UNIQUE` |
| `password_hash` | `password_hash VARCHAR(255)` |
| `role` | `role VARCHAR(30) NOT NULL` |
| `active` | `active BOOLEAN NOT NULL` |
| `CHECK` | `CHECK (role IN ('ADMIN','WAREHOUSE','SALES','LOGISTICS'))` |

## sessions

| Columna o restricción | Definición SQL |
| --- | --- |
| `token_hash` | `token_hash VARCHAR(64) PRIMARY KEY` |
| `user_id` | `user_id UUID NOT NULL REFERENCES users(id)` |
| `expires_at` | `expires_at TIMESTAMP WITH TIME ZONE NOT NULL` |

## inventory_items

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `sku` | `sku VARCHAR(32) NOT NULL` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `quantity` | `quantity INTEGER NOT NULL CHECK(quantity>=0)` |
| `price` | `price BIGINT NOT NULL CHECK(price>=0)` |
| `cost` | `cost BIGINT NOT NULL CHECK(cost>=0)` |
| `minimum` | `minimum INTEGER NOT NULL CHECK(minimum>=0)` |
| `conservation` | `conservation VARCHAR(30) NOT NULL CHECK(conservation IN ('GOOD','DAMAGED','QUARANTINED'))` |
| `version` | `version BIGINT` |
| `UNIQUE(tenant_id,sku)` | `UNIQUE(tenant_id,sku)` |
| `UNIQUE(tenant_id,id)` | `UNIQUE(tenant_id,id)` |

## stock_movements

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL` |
| `product_id` | `product_id UUID NOT NULL` |
| `actor_id` | `actor_id UUID NOT NULL REFERENCES users(id)` |
| `delta` | `delta INTEGER NOT NULL CHECK(delta<>0)` |
| `type` | `type VARCHAR(40) NOT NULL` |
| `reason` | `reason VARCHAR(500) NOT NULL` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `FOREIGN` | `FOREIGN KEY(tenant_id,product_id) REFERENCES inventory_items(tenant_id,id)` |

## sales

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `number` | `number VARCHAR(60) NOT NULL` |
| `status` | `status VARCHAR(30) NOT NULL CHECK(status IN ('CONFIRMED','CANCELLED'))` |
| `fulfillment_status` | `fulfillment_status VARCHAR(30) NOT NULL` |
| `dispatch_id` | `dispatch_id UUID` |
| `request_key` | `request_key VARCHAR(100)` |
| `fingerprint` | `fingerprint VARCHAR(10000)` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `version` | `version BIGINT` |
| `UNIQUE(tenant_id,request_key)` | `UNIQUE(tenant_id,request_key)` |
| `UNIQUE(tenant_id,id)` | `UNIQUE(tenant_id,id)` |

## sale_lines

| Columna o restricción | Definición SQL |
| --- | --- |
| `sale_id` | `sale_id UUID NOT NULL REFERENCES sales(id)` |
| `line_order` | `line_order INTEGER NOT NULL` |
| `id` | `id UUID NOT NULL UNIQUE` |
| `product_id` | `product_id UUID NOT NULL REFERENCES inventory_items(id)` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `sku` | `sku VARCHAR(32) NOT NULL` |
| `quantity` | `quantity INTEGER NOT NULL CHECK(quantity>0)` |
| `returned` | `returned INTEGER NOT NULL CHECK(returned>=0 AND returned<=quantity)` |
| `price_cents` | `price_cents BIGINT NOT NULL CHECK(price_cents>=0)` |
| `cost_cents` | `cost_cents BIGINT NOT NULL CHECK(cost_cents>=0)` |
| `PRIMARY` | `PRIMARY KEY(sale_id,line_order)` |

## drivers

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `license` | `license VARCHAR(40) NOT NULL` |
| `UNIQUE(tenant_id,license)` | `UNIQUE(tenant_id,license)` |
| `UNIQUE(tenant_id,id)` | `UNIQUE(tenant_id,id)` |

## vehicles

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `plate` | `plate VARCHAR(20) NOT NULL` |
| `UNIQUE(tenant_id,plate)` | `UNIQUE(tenant_id,plate)` |
| `UNIQUE(tenant_id,id)` | `UNIQUE(tenant_id,id)` |

## dispatches

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL` |
| `driver_id` | `driver_id UUID NOT NULL` |
| `vehicle_id` | `vehicle_id UUID NOT NULL` |
| `destination` | `destination VARCHAR(240) NOT NULL` |
| `status` | `status VARCHAR(30) NOT NULL CHECK(status IN ('PENDING','IN_TRANSIT','DELIVERED'))` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `recipient` | `recipient VARCHAR(160)` |
| `delivered_at` | `delivered_at TIMESTAMP WITH TIME ZONE` |
| `version` | `version BIGINT` |
| `FOREIGN` | `FOREIGN KEY(tenant_id,driver_id) REFERENCES drivers(tenant_id,id)` |
| `FOREIGN` | `FOREIGN KEY(tenant_id,vehicle_id) REFERENCES vehicles(tenant_id,id)` |
| `UNIQUE(tenant_id,id)` | `UNIQUE(tenant_id,id)` |

## dispatch_lines

| Columna o restricción | Definición SQL |
| --- | --- |
| `dispatch_id` | `dispatch_id UUID NOT NULL REFERENCES dispatches(id)` |
| `line_order` | `line_order INTEGER NOT NULL` |
| `id` | `id UUID NOT NULL` |
| `sale_id` | `sale_id UUID NOT NULL REFERENCES sales(id)` |
| `sale_line_id` | `sale_line_id UUID NOT NULL REFERENCES sale_lines(id)` |
| `product_id` | `product_id UUID NOT NULL REFERENCES inventory_items(id)` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `quantity` | `quantity INTEGER NOT NULL CHECK(quantity>0)` |
| `PRIMARY` | `PRIMARY KEY(dispatch_id,line_order)` |
| `UNIQUE(sale_line_id)` | `UNIQUE(sale_line_id)` |

## delivery_incidents

| Columna o restricción | Definición SQL |
| --- | --- |
| `dispatch_id` | `dispatch_id UUID NOT NULL REFERENCES dispatches(id)` |
| `incident_order` | `incident_order INTEGER NOT NULL` |
| `id` | `id UUID NOT NULL` |
| `description` | `description VARCHAR(500) NOT NULL` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `PRIMARY` | `PRIMARY KEY(dispatch_id,incident_order)` |

## integration_outbox

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `type` | `type VARCHAR(100) NOT NULL` |
| `schema_version` | `schema_version INTEGER NOT NULL` |
| `occurred_at` | `occurred_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `payload` | `payload TEXT NOT NULL` |
| `status` | `status VARCHAR(20) NOT NULL CHECK(status IN ('PENDING','PUBLISHED'))` |
| `attempts` | `attempts INTEGER NOT NULL` |
| `next_attempt_at` | `next_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `published_at` | `published_at TIMESTAMP WITH TIME ZONE` |
| `last_error` | `last_error VARCHAR(255)` |

## notifications

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `type` | `type VARCHAR(60) NOT NULL` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `is_read` | `is_read BOOLEAN NOT NULL` |

## suppliers

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL REFERENCES workspaces(id)` |
| `name` | `name VARCHAR(160) NOT NULL` |
| `contact` | `contact VARCHAR(240) NOT NULL` |
| `UNIQUE(tenant_id,id)` | `UNIQUE(tenant_id,id)` |

## purchase_orders

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL` |
| `supplier_id` | `supplier_id UUID NOT NULL` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `version` | `version BIGINT` |
| `FOREIGN` | `FOREIGN KEY(tenant_id,supplier_id) REFERENCES suppliers(tenant_id,id)` |

## purchase_lines

| Columna o restricción | Definición SQL |
| --- | --- |
| `purchase_id` | `purchase_id UUID NOT NULL REFERENCES purchase_orders(id)` |
| `line_order` | `line_order INTEGER NOT NULL` |
| `id` | `id UUID NOT NULL UNIQUE` |
| `product_id` | `product_id UUID NOT NULL REFERENCES inventory_items(id)` |
| `quantity` | `quantity INTEGER NOT NULL CHECK(quantity>0)` |
| `received` | `received INTEGER NOT NULL CHECK(received>=0 AND received<=quantity)` |
| `PRIMARY` | `PRIMARY KEY(purchase_id,line_order)` |

## customer_returns

| Columna o restricción | Definición SQL |
| --- | --- |
| `id` | `id UUID PRIMARY KEY` |
| `tenant_id` | `tenant_id UUID NOT NULL` |
| `sale_id` | `sale_id UUID NOT NULL` |
| `sale_line_id` | `sale_line_id UUID NOT NULL REFERENCES sale_lines(id)` |
| `product_id` | `product_id UUID NOT NULL REFERENCES inventory_items(id)` |
| `quantity` | `quantity INTEGER NOT NULL CHECK(quantity>0)` |
| `disposition` | `disposition VARCHAR(20) NOT NULL CHECK(disposition IN ('RESTOCK','LOSS'))` |
| `reason` | `reason VARCHAR(500) NOT NULL` |
| `created_at` | `created_at TIMESTAMP WITH TIME ZONE NOT NULL` |
| `loss_cents` | `loss_cents BIGINT NOT NULL CHECK(loss_cents>=0)` |
| `FOREIGN` | `FOREIGN KEY(tenant_id,sale_id) REFERENCES sales(tenant_id,id)` |

