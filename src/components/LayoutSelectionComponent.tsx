import { Box, TextField, MenuItem } from "@mui/material";

type SelectionProps = {
  handleSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const LayoutSelectionComponent = (props: SelectionProps) => {
  const { handleSelection } = props;
  return (
    <Box className="layout-selection">
      <TextField
        label="Select Template"
        onChange={handleSelection}
        select
        fullWidth
      >
        <MenuItem value="email">Email signature layout</MenuItem>
        <MenuItem value="page">Page layout</MenuItem>
      </TextField>
    </Box>
  );
};

export default LayoutSelectionComponent;
