# Data dictionary and coverage

> The 35-table DDL is a reviewed relational design. The running TB1 demo persists JSON collections in a local file or IndexedDB. It does not execute this relational DDL.

## identity

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `tenants` | `name`, `created_at` |  |
| `users` | `email`, `full_name`, `password_hash`, `role_id`, `status` | `roles` |
| `roles` | `name` |  |
| `permissions` | `name` |  |
| `role_permissions` | `role_id`, `permission_id` | `roles`, `permissions` |
| `sessions` | `user_id`, `token_hash`, `expires_at` | `users` |
| `employees` | `user_id`, `job_title`, `status` | `users` |

## inventory

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `products` | `sku`, `name`, `quantity`, `price_cents`, `cost_cents`, `minimum_stock`, `conservation`, `category_id`, `unit_id`, `location_id` | `categories`, `units`, `locations` |
| `categories` | `name` |  |
| `units` | `code`, `name` |  |
| `warehouses` | `name`, `address` |  |
| `locations` | `warehouse_id`, `code` | `warehouses` |
| `product_variants` | `product_id`, `sku`, `attributes_json` | `products` |
| `stock_lots` | `product_id`, `location_id`, `lot_number`, `expires_on`, `quantity` | `products`, `locations` |
| `stock_movements` | `product_id`, `lot_id`, `user_id`, `delta`, `movement_type`, `reason`, `unit_cost_cents`, `created_at` | `products`, `stock_lots`, `users` |

## procurement

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `suppliers` | `name`, `tax_id`, `contact` |  |
| `purchase_orders` | `supplier_id`, `number`, `status`, `created_at` | `suppliers` |
| `purchase_order_lines` | `purchase_order_id`, `product_id`, `quantity`, `received`, `cost_cents` | `purchase_orders`, `products` |
| `receipts` | `purchase_order_id`, `user_id`, `created_at` | `purchase_orders`, `users` |
| `receipt_lines` | `receipt_id`, `purchase_order_line_id`, `quantity` | `receipts`, `purchase_order_lines` |

## sales

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `customers` | `name`, `email`, `tax_id` |  |
| `sales` | `customer_id`, `user_id`, `number`, `status`, `total_cents`, `created_at`, `cancelled_at`, `cancellation_reason` | `customers`, `users` |
| `sale_lines` | `sale_id`, `product_id`, `product_name`, `quantity`, `price_cents`, `cost_cents` | `sales`, `products` |
| `payments` | `sale_id`, `amount_cents`, `method`, `created_at` | `sales` |
| `sales_receipts` | `sale_id`, `number`, `total_cents`, `fiscal`, `created_at` | `sales` |

## logistics

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `drivers` | `name`, `license` |  |
| `vehicles` | `name`, `plate`, `capacity_kg` |  |
| `dispatches` | `driver_id`, `vehicle_id`, `number`, `destination`, `status`, `created_at` | `drivers`, `vehicles` |
| `dispatch_lines` | `dispatch_id`, `sale_id`, `sale_line_id`, `product_id`, `quantity` | `dispatches`, `sales`, `sale_lines`, `products` |
| `dispatch_stops` | `dispatch_id`, `sequence`, `address` | `dispatches` |
| `delivery_attempts` | `dispatch_id`, `stop_id`, `recipient`, `status`, `created_at` | `dispatches`, `dispatch_stops` |
| `dispatch_incidents` | `dispatch_id`, `description`, `created_at`, `resolved_at` | `dispatches` |

## returns

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `returns` | `sale_id`, `reason`, `created_at` | `sales` |
| `return_lines` | `return_id`, `sale_line_id`, `product_id`, `quantity`, `amount_cents`, `disposition` | `returns`, `sale_lines`, `products` |

## notifications

| Table | Columns beyond id/tenant_id | References |
| --- | --- | --- |
| `notifications` | `user_id`, `product_id`, `notification_type`, `is_read`, `created_at` | `users`, `products` |
