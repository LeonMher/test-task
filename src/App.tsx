import { useState } from "react";
import LayoutSelectionComponent from "./components/LayoutSelectionComponent";
import EmailSignatureLayout from "./components/layouts/email-signature-layout";
import PageLayout from "./components/layouts/page-layout";
import "./App.css";
import { Box } from "@mui/material";

function App() {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLayout(event.target.value);
  };

  let layoutComponent = null;

  if (selectedLayout === "email") {
    layoutComponent = <EmailSignatureLayout />;
  }
  if (selectedLayout === "page") {
    layoutComponent = <PageLayout />;
  }

  return (
    <Box className="wrapper">
      <LayoutSelectionComponent handleSelection={handleSelection} />

      {layoutComponent}
    </Box>
  );
}

export default App;
