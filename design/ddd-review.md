# DDD review across the complete scope

Baseline: TB1 correction, 2026-10-30. This review distinguishes implemented domain rules from the AV2 tactical model. The mock dispatcher is a synchronous application service; it is not a complete production DDD implementation.

| Category / context | Aggregate boundary / owner | Value objects / references | Current evidence and next design action |
| --- | --- | --- | --- |
| Core / Inventory | InventoryItem currently protects global stock and conservation. For AV2 separate catalog Product from stock/lot/location transaction boundaries where contention requires it. | Implemented Sku, Quantity, Money; proposed typed ProductId, LocationId and LotNumber. | Tested movement conservation, SKU, blocked article and no oversale. Per-lot/location balances and variant-to-lot mapping are not complete. A global product balance must not become an independent second source of truth. |
| Core / Logistics | DispatchManifest owns lifecycle; lines, stop, attempt and incidents belong to the manifest. Driver and Vehicle are independently referenced resources. | Implemented Address; proposed DispatchId, VehiclePlate, DriverLicense and Weight. | Tested sale linkage, no duplicate assignment, resource conflict on departure, terminal state and recipient. Capacity, license/plate uniqueness in the application, multiple stops and failed attempts need completion. SQL uniqueness alone is not proof of a finished master flow. |
| Support / Procurement | PurchaseOrder owns ordered/received line quantities; Receipt records the receiving fact; Supplier is a separate master. | Money and Quantity validated now; proposed PurchaseOrderNumber and SupplierId. | Application service validates receiving atomically. Dedicated aggregate classes, approval, supplier catalogs and inventory valuation policy remain AV2 work. |
| Support / Commercial | Sale owns immutable historical line snapshots; payment and receipt relate to the sale. SaleSummary is an immutable calculation object, not a Sale aggregate root. | Implemented Money/Quantity; proposed SaleNumber, CustomerId and ReceiptNumber. | Complete draft acceptance and single cancellation are tested. Add a true Sale aggregate/repository, idempotency and explicit payment/receipt cancellation policy in the server. Current payment records are demo only. |
| Support / Returns | Return references a sale line; quantity is bounded by cumulative prior returns. | Quantity and Money; proposed ReturnReason and typed SaleLineId. | RESTOCK/LOSS implemented. Returns are blocked during unfinished dispatch; a POS sale with any return is excluded from dispatch in TB1. Shipping the remaining quantity, reshipment and actual refunds require a new policy/flow. |
| Support / Reporting | Read model, not a transactional aggregate or another sales ledger. | Money projections and dates. | Derives net sales, recorded standard-cost contribution and inventory value. No weighted-average valuation, tax, net profit or business-effectiveness claim. |
| Support / Notifications | Notification owns read state and type; references the relevant product. | Proposed NotificationType and recipient reference. | Low-stock movement policy and inbox implemented synchronously. Expiration, channels, delivery retries and retention remain pending. No broker/event sourcing is implemented. |
| Generic / Identity and access | Tenant, User and Session define access context. Employee is an association/provisioning record; global Role/Permission is a reference policy. | Proposed TenantId, EmailAddress, PasswordHash and session-token hash. | Demo role/tenant checks and eight-hour expiry tested. SHA-256/client storage are not production authentication. Implement secure server hashing, activation/recovery, revocation and audit for AV2. |

## Application rules versus relational constraints

The reviewed DDL enforces tenant-aware references, basic quantities, state values and uniqueness. It does not implement every aggregate rule. Parent-line membership, cumulative return limits, legal transitions, resource occupancy and complete transaction acceptance require application/domain enforcement and concurrent server tests. SQLite validation is a DDL smoke/constraint test, not proof of PostgreSQL isolation or JPA mapping.

The API's primitive JSON values and the database's scalar columns are boundary representations. Semantic validation belongs in domain value objects and aggregate behavior. Repository ports for AV2 should return aggregates/read projections rather than exposing mutable persistence rows to controllers. The current mock draft is intentionally an intermediate prototype.

## AV2 priorities before expanding breadth

1. Establish server repository ports, transaction boundaries, idempotency and tenant/role enforcement. Keep Inventory and Logistics first in design/review order.
2. Decide the source of stock by product/variant/location/lot. Migrate opening balances and reconcile movement ledger versus balance in the same transaction. Extend the 35-table baseline when the invariant requires it; do not protect a table-count target.
3. Define physical-resource uniqueness/capacity and partial/failed delivery policy. Define whether a return after partial fulfillment permits remaining shipment or reshipment.
4. Define recorded-cost versus weighted valuation, cancellation and refund policy before claiming financial completeness.
5. Add secure IAM and observed-user validation. Maintain explicit ownership of each context; a shared identifier contract is a Published Language, not evidence of jointly owned Shared Kernel code.

The [context map and C4 views](architecture.md) show relationships. The [dictionary](database/dictionary.md) covers all 35 proposed tables. This review deliberately identifies design debt rather than presenting an SQL count or a mock's passing tests as a finished logistics system.

## Event Storming y evidencia de investigación

El Big Picture del capítulo II distingue comandos, hechos, políticas y modelos de lectura; no reutiliza el Context Map como si fuera el mismo artefacto. Se ordena por core y luego soporte. Es una propuesta de análisis para ratificar con el equipo, no evidencia de un taller ya realizado ni de publicación de eventos. El tablero original incluía SUNAT, correo y telemetría: esos puntos no son capacidades implementadas en TB1. Las fuentes originales y las diferencias entre fichas de entrevistas se preservan en `research/`; la revisión técnica no confirma identidades o consentimiento.
