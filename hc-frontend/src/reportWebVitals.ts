import { onCLS, onFCP, onLCP } from 'web-vitals';

// This function will receive the performance metrics and log them (or send them to an analytics service)
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry); // Calls CLS (Cumulative Layout Shift)
    onFCP(onPerfEntry); // Calls FID (First Input Delay)
    onLCP(onPerfEntry); // Calls LCP (Largest Contentful Paint)
  }
};

export default reportWebVitals;
