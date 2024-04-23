import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SampleLayouts from "../SampleLayouts";
import SampleEmailTemplate from "../SampleEmailTemplate";

const EmailSignatureLayout = () => {
  const [alignment, setAlignment] = useState("left");
  const handleAlignmentClick = (alignment: string) => {
    setAlignment(alignment);
  };
  return (
    <>
      <Box className="template-layout">
        <Typography>Template Types</Typography>
        <SampleLayouts handleAlignmentClick={handleAlignmentClick} />
        <SampleEmailTemplate alignment={alignment} />
      </Box>
    </>
  );
};

export default EmailSignatureLayout;
