import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats a positive number correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats a negative number correctly', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });
  });

  describe('formatDate', () => {
    it('formats a date string correctly', () => {
      expect(formatDate('2024-05-20')).toBe('May 20, 2024');
    });

    it('formats a ISO date string correctly', () => {
      expect(formatDate('2024-05-20T10:00:00Z')).toBe('May 20, 2024');
    });
  });
});
