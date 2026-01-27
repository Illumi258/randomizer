import { useState } from 'react';
import ParticipantsTable from './table/ParticipantsTable';
import AddParticipantsDialog from './dialog/AddParticipantsDialog';
import UpdateParticipantDialog from './dialog/UpdateParticipantDialog';
import DeleteConfirmDialog from './dialog/DeleteConfirmDialog';
import ImportParticipantsDialog from './dialog/ImportParticipantsDialog';
import { FetchParticipantsData } from '@/Participants/types';
import useDynamicQuery from '@/hooks/useDynamicQuery';
import { showParticipants } from '@/Participants/api/getParticipants';
import useDeleteParticipant from '@/Participants/hooks/use-deleteParticipant';
import useExportParticipants from '@/Participants/hooks/use-exportParticipants';
import Box from '@mui/material/Box';

export default function EnhancedParticipantsTable() {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<FetchParticipantsData | null>(null);

  const { deleteParticipantMutation, isPendingDelete } = useDeleteParticipant();
  const { exportParticipantsMutation } = useExportParticipants();

  // Fetch participants data
  const {
    data: participants_data,
    isPending: isPending_participants,
    isError: isError_participants,
  } = useDynamicQuery(['FetchParticipants'], showParticipants);

  const rows: FetchParticipantsData[] = participants_data || [];

  const handleSelect = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
  };

  const handleAdd = () => {
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (selected.length > 0) {
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    selected.forEach(id => {
      deleteParticipantMutation(id);
    });
    setSelected([]);
    setDeleteDialogOpen(false);
  };

  const handleEdit = (participant: FetchParticipantsData) => {
    setSelectedParticipant(participant);
    setUpdateDialogOpen(true);
  };

  const handleExport = () => {
    exportParticipantsMutation(undefined);
  };

  const handleImport = () => {
    setImportDialogOpen(true);
  };

  if (isPending_participants) {
    return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
  }

  if (isError_participants) {
    return <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>Error loading participants</Box>;
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1400, 
      margin: '0 auto', 
      padding: { xs: 2, sm: 3, md: 4 },
      mt: 3
    }}>
      <ParticipantsTable
        rows={rows}
        selected={selected}
        onSelect={handleSelect}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onExport={handleExport}
        onImport={handleImport}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
      
      <AddParticipantsDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />

      <UpdateParticipantDialog 
        open={updateDialogOpen}
        onClose={() => {
          setUpdateDialogOpen(false);
          setSelectedParticipant(null);
        }}
        participantData={selectedParticipant}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        participantCount={selected.length}
        isLoading={isPendingDelete}
      />

      <ImportParticipantsDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      />
    </Box>
  );
}
