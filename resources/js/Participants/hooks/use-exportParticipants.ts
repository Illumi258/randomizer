import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { exportParticipants } from '@/Participants/api/exportParticipants';
import { useToast } from '@/utils/use-toast';

export default function useExportParticipants() {
  const { showToast } = useToast();

  const exportParticipantsMutation = useDynamicMutation({
    mutationFn: exportParticipants,
    mutationKey: ['ExportParticipants'],
    invalidateQueries: false, // No need to invalidate for export
    onSuccess: () => {
      showToast({
        message: 'Participants exported successfully!',
        type: 'success'
      });
    },
    onError: (error: any) => {
      showToast({
        message: error?.response?.data?.message || 'Failed to export participants',
        type: 'error'
      });
    },
  });

  return {
    exportParticipantsMutation: exportParticipantsMutation.mutate,
    isPendingExport: exportParticipantsMutation.isPending,
  };
}