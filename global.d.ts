declare global {
  interface Window {
    HTMLElement: any;
    safari?: {
      pushNotification: any;
    };
  }
}

export {};
