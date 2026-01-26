import { useState } from 'react';
import ParticipantsTable from './table/ParticipantsTable';
import { FetchItemData } from '@/Items/types';
import useDynamicQuery from '@/hooks/useDynamicQuery';
import { showItems } from '@/Items/api/getItems';
import Box from '@mui/material/Box';

export default function EnhancedParticipantsTable() {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch items (you can replace this with a participants-specific API later)
  const {
    data: items_data,
    isPending: isPending_items,
    isError: isError_items,
  } = useDynamicQuery(['FetchParticipants'], showItems);

  const rows = items_data || [];

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
    console.log('Add participant');
    // TODO: Open add dialog
  };

  const handleDelete = () => {
    console.log('Delete participants:', selected);
    // TODO: Implement delete logic
    setSelected([]);
  };

  const handleEdit = (item: FetchItemData) => {
    console.log('Edit participant:', item);
    // TODO: Open edit dialog
  };

  if (isPending_items) {
    return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
  }

  if (isError_items) {
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
    </Box>
  );
}
