export const isMobile = (): boolean =>
  navigator.userAgent
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    : window.matchMedia('(max-height: 428px)').matches ||
      window.matchMedia('(max-width: 428px)').matches;

export const isAndroid = (): boolean => /Android/i.test(navigator.userAgent);

export const isIOS = (): boolean => /iPhone/i.test(navigator.userAgent);
