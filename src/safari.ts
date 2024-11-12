// Safari 3.0+ "[object HTMLElementConstructor]"
export const isSafari = () =>
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof window["safari"] !== "undefined" &&
        window["safari"].pushNotification),
  );
