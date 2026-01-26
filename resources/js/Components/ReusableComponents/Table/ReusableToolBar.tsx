import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  title: string;
  numSelected: number;
  onAdd?: () => void;
  onDelete?: () => void;
}

export default function ReusableTableToolbar({
  title,
  numSelected,
  onAdd,
  onDelete,
}: Props) {
  return (
    <Toolbar
      sx={[
        { pl: 2, pr: 1 },
        numSelected > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6">
        {numSelected > 0 ? `${numSelected} selected` : title}
      </Typography>

      {numSelected > 0 ? (
        onDelete && (
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      ) : (
        onAdd && (
          <Tooltip title="Add">
            <IconButton onClick={onAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )
      )}
    </Toolbar>
  );
}
