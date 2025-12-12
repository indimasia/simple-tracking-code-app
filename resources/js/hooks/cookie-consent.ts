import * as CookieConsent from "vanilla-cookieconsent";

export function useCookieConsent() {
  return CookieConsent.getCookie(); 
}

export function useCookieConsentReset() {
  return CookieConsent.reset(true);
}
