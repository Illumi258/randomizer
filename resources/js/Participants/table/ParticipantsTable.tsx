import { ReusableTable, Column } from '@/Components/ReusableComponents/Table/ReusableTable';
import { FetchParticipantsData } from '@/Participants/types';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  rows: FetchParticipantsData[];
  selected: number[];
  onSelect: (id: number) => void;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: (participant: FetchParticipantsData) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
}

export default function ParticipantsTable(props: Props) {
  const columns: Column<FetchParticipantsData>[] = [
    { id: 'fullname', label: 'Full Name' },
    { id: 'position', label: 'Position' },
    { id: 'redeemed_item', label: 'Redeemed Item' },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      render: row => (
        <IconButton
          size="small"
          onClick={e => {
            e.stopPropagation();
            props.onEdit(row);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <ReusableTable
      title="Participants"
      rows={props.rows}
      columns={columns}
      getRowId={row => row.id}
      selected={props.selected}
      onSelect={props.onSelect}
      onAdd={props.onAdd}
      onDelete={props.onDelete}
      page={props.page}
      rowsPerPage={props.rowsPerPage}
      onPageChange={props.onPageChange}
      onRowsPerPageChange={props.onRowsPerPageChange}
    />
  );
}
