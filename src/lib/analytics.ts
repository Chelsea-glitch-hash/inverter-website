/**
 * GA4 event tracking helpers.
 *
 * Events planned per the analytics spec:
 *   page_view (GA4 default)
 *   view_product          -> product detail pages (via body data attributes)
 *   click_request_quote   -> quote CTA buttons  [data-track]
 *   form_start            -> first field focus  [data-track-form]
 *   form_submit           -> successful inquiry submission (CORE CONVERSION)
 *   download_datasheet    -> PDF download links [data-track]
 *   click_whatsapp        -> WhatsApp button    [data-track]
 *   click_email           -> mailto links       [data-track]
 *   newsletter_signup     -> newsletter success
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
