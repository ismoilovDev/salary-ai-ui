import { useState, useCallback } from 'react';
import { CircleDollarSign } from 'lucide-react';
import { SalaryOffer } from '@/widgets/salary-offer';
import { Modal, ErrorBoundary } from '@/shared/ui';
import { useSalaryOffer } from '@/shared/hooks';
import { mockCandidate } from '@/shared/mocks';
import { cn } from '@/shared/lib/cn';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { salaryData, isLoading, error, refresh, reset } = useSalaryOffer();

  const handleOpenModal = useCallback(() => {
    reset();
    setIsModalOpen(true);
  }, [reset]);

  const handleRefresh = useCallback(() => {
    refresh(mockCandidate);
  }, [refresh]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCandidateChange = useCallback(() => {
    console.log('Candidate change clicked');
  }, []);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={cn(
          'group relative px-6 py-3 sm:px-8 sm:py-4',
          'bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg',
          'hover:shadow-xl transition-all duration-300',
          'border border-white/50 hover:scale-105 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 sm:w-12 sm:h-12 rounded-xl',
            'bg-linear-to-br from-primary-100 to-primary-50',
            'flex items-center justify-center shadow-sm',
            'group-hover:shadow-md transition-shadow'
          )}>
            <CircleDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
          </div>
          <div className="text-left">
            <div className="text-base sm:text-lg font-semibold text-gray-900">
              Calculate Salary Offer
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              AI-powered compensation analysis
            </div>
          </div>
        </div>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        ariaLabel="Salary offer modal"
      >
        <ErrorBoundary
          onError={(error) => console.error('SalaryOffer error:', error)}
          errorMessage="Failed to display salary offer. Please try again."
        >
          <SalaryOffer
            jobTitle="Senior Frontend Developer"
            candidate={mockCandidate}
            salaryData={salaryData}
            isLoading={isLoading}
            error={error}
            onClose={handleClose}
            onRefresh={handleRefresh}
            onCandidateChange={handleCandidateChange}
          />
        </ErrorBoundary>
      </Modal>
    </>
  );
}

export default App;
