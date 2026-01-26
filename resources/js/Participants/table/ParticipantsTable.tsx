import { ReusableTable, Column } from '@/Components/ReusableComponents/Table/ReusableTable';
import { FetchItemData } from '@/Items/types';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  rows: FetchItemData[];
  selected: number[];
  onSelect: (id: number) => void;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: (item: FetchItemData) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
}

export default function ParticipantsTable(props: Props) {
  const columns: Column<FetchItemData>[] = [
    { id: 'item', label: 'Item Prize' },
    { id: 'remaining', label: 'Remaining', align: 'right' },
    { id: 'reedem', label: 'Redeemed', align: 'right' },
    {
      id: 'image',
      label: 'Image',
      align: 'center',
      render: row => (
        <Avatar
          src={row.image ? `/storage/${row.image}` : undefined}
        >
          {!row.image && <ImageIcon />}
        </Avatar>
      ),
    },
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
