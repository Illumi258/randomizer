import { useDynamicMutation } from '@/hooks/useDynamicMutation';
import { importParticipants } from '@/Participants/api/importParticipants';
import { useToast } from '@/utils/use-toast';

export default function useImportParticipants() {
  const { showToast } = useToast();
  
    const fetchParticipants = [
        'FetchParticipants',
        'FetchParticipantsInFrontEnd'
    ];

  const importParticipantsMutation = useDynamicMutation({
    mutationFn: importParticipants,
    mutationKey: fetchParticipants, // This will auto-invalidate the participants list
    onSuccess: (data: any) => {
      if (data.success) {
        showToast({
          message: data.message,
          type: 'success' 
        });
        if (data.errors && data.errors.length > 0) {
          data.errors.forEach((error: string) => 
            showToast({
              message: error,
              type: 'info'
            })
          );
        }
      } else {
        showToast({
          message: data.message,
          type: 'error'
        });
      }
    },
    onError: (error: any) => {
      showToast({
        message: error?.response?.data?.message || 'Failed to import participants',
        type: 'error'
      });
    },
  });

  return {
    importParticipantsMutation: importParticipantsMutation.mutate,
    isPendingImport: importParticipantsMutation.isPending,
  };
}