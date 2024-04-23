import { Box } from "@mui/material";
import SampleLogo from "../../assets/sampleLogo.svg";
import SampleSocialMediaIcons from "../../assets/sampleSocialMediaIcons.svg";
import SampleNameSurname from "../../assets/sampleNameSurname.svg";
import SampleJobtitle from "../../assets/sampleJobTitle.svg";
import SampleEmailBody from "../../assets/sampleEmailBody.svg";

type AlignmentProps = {
  alignment: string;
};

const LayoutTemplate = (props: AlignmentProps) => {
  const { alignment } = props;
  return (
    <Box className="layout-sample-container">
      <Box className={`email-wrapper-${alignment}`}>
        <Box className="logo">
          {/* TODO: create custom elements */}
          <img src={SampleLogo} />
          <img src={SampleSocialMediaIcons} />
        </Box>

        <Box className="header">
          <img src={SampleNameSurname} />

          <img src={SampleJobtitle} />
          <Box className="email-body-template">
            <img src={SampleEmailBody} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutTemplate;
