import { Box } from "@mui/material";
import LayoutTemplate from "./layout-template/LayoutTemplate";
// import LeftAlignLayout from "../assets/LeftAlignLayout.svg";
// import CenterAlignLayout from "../assets/CenterAlignLayout.svg";
// import RightAlignLayout from "../assets/RightAlignLayout.svg";

type AlignmentProps = {
  handleAlignmentClick: (alignment: string) => void;
};
const SampleLayouts = (props: AlignmentProps) => {
  const { handleAlignmentClick } = props;

  return (
    <>
      <Box className="layout-selection-container">
        <Box
          className="layout-component"
          onClick={() => handleAlignmentClick("left")}
        >
          <LayoutTemplate alignment="left" />
        </Box>
        <Box
          className="layout-component"
          onClick={() => handleAlignmentClick("center")}
        >
          <LayoutTemplate alignment="center" />
        </Box>
        <Box
          className="layout-component"
          onClick={() => handleAlignmentClick("right")}
        >
          <LayoutTemplate alignment="right" />
        </Box>
      </Box>
    </>
  );
};
export default SampleLayouts;
