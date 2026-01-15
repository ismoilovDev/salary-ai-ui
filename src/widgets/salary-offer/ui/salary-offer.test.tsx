import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { SalaryOffer } from './salary-offer';
import type { Candidate, SalaryData } from '@/shared/types';

const mockCandidate: Candidate = {
  id: '1',
  name: 'John Doe',
  position: 'Senior Developer',
  aiFit: 92,
};

const mockSalaryData: SalaryData = {
  recommendedSalary: 85000000,
  currency: 'UZS',
  isWithinBudget: true,
  marketMin: 60000000,
  marketMax: 120000000,
  marketAvg: 80000000,
  similarRolesCount: 150,
  keyFactors: [
    '5+ years of experience',
    'Strong technical skills',
    'Leadership experience',
  ],
};

describe('SalaryOffer', () => {
  const defaultProps = {
    jobTitle: 'Senior Frontend Developer',
    candidate: mockCandidate,
    onClose: vi.fn(),
    onRefresh: vi.fn(),
    onCandidateChange: vi.fn(),
  };

  it('renders header with job title', () => {
    render(<SalaryOffer {...defaultProps} />);

    expect(screen.getByText('Salary Offer')).toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Developer/)).toBeInTheDocument();
  });

  it('renders candidate selector with candidate info', () => {
    render(<SalaryOffer {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText(/92%/)).toBeInTheDocument();
  });

  it('renders empty state when no salary data', () => {
    render(<SalaryOffer {...defaultProps} salaryData={null} />);

    expect(screen.getByText('No salary data yet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true', () => {
    render(<SalaryOffer {...defaultProps} isLoading={true} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('renders salary data when provided', () => {
    render(<SalaryOffer {...defaultProps} salaryData={mockSalaryData} />);

    expect(screen.getByText('85,000,000 UZS')).toBeInTheDocument();
    expect(screen.getByText('Within Budget')).toBeInTheDocument();

    expect(screen.getByText('Market Comparison')).toBeInTheDocument();

    expect(screen.getByText('Key factors')).toBeInTheDocument();
    expect(screen.getByText('5+ years of experience')).toBeInTheDocument();
  });

  it('renders error state when error is provided', () => {
    const error = new Error('Failed to fetch');
    render(<SalaryOffer {...defaultProps} error={error} />);

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const { user } = render(<SalaryOffer {...defaultProps} onClose={handleClose} />);

    await user.click(screen.getByLabelText(/close/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onRefresh when refresh button is clicked in empty state', async () => {
    const handleRefresh = vi.fn();
    const { user } = render(
      <SalaryOffer {...defaultProps} salaryData={null} onRefresh={handleRefresh} />
    );

    await user.click(screen.getByRole('button', { name: /refresh/i }));
    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });

  it('calls onCandidateChange when candidate selector is clicked', async () => {
    const handleCandidateChange = vi.fn();
    const { user } = render(
      <SalaryOffer {...defaultProps} onCandidateChange={handleCandidateChange} />
    );

    await user.click(screen.getByLabelText(/selected candidate/i));
    expect(handleCandidateChange).toHaveBeenCalledTimes(1);
  });
});
