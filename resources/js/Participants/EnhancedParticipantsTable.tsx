import { useState } from 'react';
import ParticipantsTable from './table/ParticipantsTable';
import AddParticipantsDialog from './dialog/AddParticipantsDialog';
import { FetchParticipantsData } from '@/Participants/types';
import useDynamicQuery from '@/hooks/useDynamicQuery';
import { showItems } from '@/Items/api/getItems';
import Box from '@mui/material/Box';

export default function EnhancedParticipantsTable() {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);

  // TODO: Replace with participants-specific API later
  const {
    data: participants_data,
    isPending: isPending_participants,
    isError: isError_participants,
  } = useDynamicQuery(['FetchParticipants'], showItems);

  // For now, transform items data to participants format (temporary)
  const rows: FetchParticipantsData[] = (participants_data || []).map((item: any) => ({
    id: item.id,
    fullname: item.item, // temporary mapping
    position: 'Position', // temporary
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

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
    console.log('Delete participants:', selected);
    // TODO: Implement delete logic
    setSelected([]);
  };

  const handleEdit = (participant: FetchParticipantsData) => {
    console.log('Edit participant:', participant);
    // TODO: Open edit dialog
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
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
      
      <AddParticipantsDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />
    </Box>
  );
}
