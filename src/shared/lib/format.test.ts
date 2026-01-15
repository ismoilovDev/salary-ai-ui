import { describe, it, expect } from 'vitest';
import { formatCurrency, formatCompactCurrency } from './format';

describe('formatCurrency', () => {
  it('formats number with default currency (UZS)', () => {
    expect(formatCurrency(85000000)).toBe('85,000,000 UZS');
  });

  it('formats number with custom currency', () => {
    expect(formatCurrency(1000, 'USD')).toBe('1,000 USD');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('0 UZS');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(1234567890)).toBe('1,234,567,890 UZS');
  });

  it('removes decimal places', () => {
    expect(formatCurrency(1000.99)).toBe('1,001 UZS');
  });
});

describe('formatCompactCurrency', () => {
  it('formats millions with M suffix', () => {
    expect(formatCompactCurrency(1000000)).toBe('1M');
    expect(formatCompactCurrency(85000000)).toBe('85M');
    expect(formatCompactCurrency(1500000)).toBe('1.5M');
  });

  it('formats thousands with K suffix', () => {
    expect(formatCompactCurrency(1000)).toBe('1K');
    expect(formatCompactCurrency(85000)).toBe('85K');
    expect(formatCompactCurrency(1500)).toBe('1.5K');
  });

  it('returns number as string for values under 1000', () => {
    expect(formatCompactCurrency(500)).toBe('500');
    expect(formatCompactCurrency(0)).toBe('0');
    expect(formatCompactCurrency(999)).toBe('999');
  });
});
