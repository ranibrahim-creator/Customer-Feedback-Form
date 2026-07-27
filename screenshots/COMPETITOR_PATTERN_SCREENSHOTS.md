# Competitor pattern screenshots

One product mapping per pattern, with captured screenshots from public product/docs pages (July 2026).

Curated images live under [`by-pattern/`](./by-pattern/). Raw captures are in the parent [`screenshots/`](./) folder.

---

## 1. Case status pages (case ID + investigation stage)

### Zendesk — customer-facing ticket status via authenticated help center portals

Customers track requests in the help center **Customer Portal** (My activities / Requests), including case ID and end-user-friendly statuses (Open, Awaiting your reply, Solved).

| | |
|---|---|
| Source | [Submitting and tracking requests in the help center Customer Portal](https://support.zendesk.com/hc/en-us/articles/4408846805530-Submitting-and-tracking-requests-in-the-help-center-Customer-Portal) |
| Related | [Customer portal ticket statuses](https://support.zendesk.com/hc/en-us/articles/4408825864858-What-are-the-customer-portal-ticket-statuses) |

![Zendesk customer portal docs](./by-pattern/01-case-status-pages/zendesk-customer-portal.png)

![Zendesk portal ticket statuses](./by-pattern/01-case-status-pages/zendesk-portal-ticket-statuses.png)

### Salesforce Service Cloud — case tracking with status visible to the customer

Customers view and track cases through authenticated self-service (Experience Cloud / Help **My Cases**). Marketing site pages were blocked from this environment; the Help portal still exposes the customer case-entry surface.

| | |
|---|---|
| Source | [Salesforce Help](https://help.salesforce.com/s/) (nav: **My Cases**) |

![Salesforce Help with My Cases](./by-pattern/01-case-status-pages/salesforce-help-my-cases.png)

---

## 2. Root-cause transparency on shipping/delivery cases

### Narvar Connect & Care — shipment status inside the support ticket

Surfaces outbound/return shipment status in the agent workspace and can start cases from shipping incidents (e.g. “order didn’t arrive”).

| | |
|---|---|
| Product page | [Narvar Customer Care](https://corp.narvar.com/solutions/customer-care) |
| In-ticket UI | [Narvar Connect and Care — Zendesk Marketplace](https://www.zendesk.co.uk/marketplace/apps/support/204089/narvar-connect-and-care/) |

![Narvar Connect & Care product](./by-pattern/02-root-cause-shipping/narvar-connect-care-product.png)

![Narvar Connect & Care inside a Zendesk ticket](./by-pattern/02-root-cause-shipping/narvar-connect-care-in-zendesk-ticket.png)

---

## 3. Proactive status-change notifications (customer doesn’t have to ask)

### Wonderment (now Loop Tracking) — branded tracking + shipping event notifications

Proactive email/SMS on shipped, out for delivery, delayed/stalled, etc., aimed at cutting WISMO tickets.

| | |
|---|---|
| Product | [Loop Tracking](https://www.loopreturns.com/tracking/) (Wonderment acquired by Loop) |
| Events | [Shipping and delivery events](https://help.wonderment.com/en/articles/4432705) |

![Wonderment / Loop Tracking product](./by-pattern/03-proactive-notifications/wonderment-loop-tracking-product.png)

![Wonderment shipping event triggers](./by-pattern/03-proactive-notifications/wonderment-shipping-events.png)

### AfterShip (Tracking + Returns) — status events into Klaviyo

Tracking: real-time status events into Klaviyo across automatic notification triggers.  
Returns: RMA statuses linked to automatic status notifications to reduce returns/refund tickets.

| | |
|---|---|
| Tracking × Klaviyo | [AfterShip Tracking ↔ Klaviyo](https://www.aftership.com/integrations/klaviyo) |
| Returns × Klaviyo | [AfterShip Returns ↔ Klaviyo](https://www.aftership.com/integrations/klaviyo/returns) |
| Trigger docs | [Klaviyo flow metrics and triggers](https://tracking-helpcenter.aftership.com/en/article/klaviyo-advanced-set-up-klaviyo-flow-metrics-and-triggers-1wqvc4k/) |

![AfterShip Tracking → Klaviyo (Out for Delivery flow)](./by-pattern/03-proactive-notifications/aftership-tracking-klaviyo.png)

![AfterShip Returns → Klaviyo (approved return flow)](./by-pattern/03-proactive-notifications/aftership-returns-klaviyo.png)

![AfterShip Klaviyo trigger documentation](./by-pattern/03-proactive-notifications/aftership-klaviyo-triggers-docs.png)

---

## 4. Deflection before a ticket is opened (self-service + AI resolution)

### Gorgias AI Agent — order tracking and returns as automated flows

Acts as a super-agent that resolves order/returns inquiries without a human; Order Management automates track/return self-serve in chat.

| | |
|---|---|
| Product | [Gorgias AI Agent support skills](https://www.gorgias.com/ai-agent/support-skills) |
| Docs | [Order Management 101](https://docs.gorgias.com/en-US/order-management-101-81861) |

![Gorgias AI Agent](./by-pattern/04-deflection/gorgias-ai-agent.png)

![Gorgias Order Management docs](./by-pattern/04-deflection/gorgias-order-management.png)

### Lorikeet — AI built to eliminate “where is my refund” tickets

Resolves refund-status inquiries via real-time payment-processor lookups (e.g. Stripe).

| | |
|---|---|
| Article | [AI for refund status customer service](https://www.lorikeetcx.ai/articles/ai-for-refund-status-customer-service) |
| Home | [Lorikeet](https://www.lorikeetcx.ai/) |

![Lorikeet refund-status AI](./by-pattern/04-deflection/lorikeet-refund-status-ai.png)

![Lorikeet home](./by-pattern/04-deflection/lorikeet-home.png)

---

## 5. Structured intake (order ID pre-filled, issue type selected up front)

### Loop Returns — return portal captures order + reason before a ticket

Self-service portal collects order/items/reason codes up front and feeds a revisitable status page (`status_page_url`).

| | |
|---|---|
| Product | [Loop Returns](https://www.loopreturns.com/returns/) |

![Loop Returns portal intake UI](./by-pattern/05-structured-intake/loop-returns-portal.png)

### Gorgias — tickets tied to Shopify order data automatically

Shopify-native helpdesk so agents (and customer-facing flows) aren’t chasing basic order info.

| | |
|---|---|
| Product | [Gorgias × Shopify](https://www.gorgias.com/ecommerce/shopify) |
| Docs | [Order Management 101](https://docs.gorgias.com/en-US/order-management-101-81861) |

![Gorgias Shopify integration](./by-pattern/05-structured-intake/gorgias-shopify-integration.png)

![Gorgias Order Management (Shopify-only)](./by-pattern/05-structured-intake/gorgias-order-management-docs.png)

---

## Capture notes

- Screenshots are public marketing/docs pages, not authenticated product demos.
- **Salesforce.com** marketing URLs returned Access Denied (Akamai) from this environment; Help portal with **My Cases** was used instead.
- **Wonderment** has been rebranded as **Loop Tracking** after acquisition by Loop.
- Cookie banners were dismissed where possible; some pages still show residual chrome.
