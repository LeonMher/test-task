import { Box, Button } from "@mui/material";
import Logo from "../assets/react.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import "../assets/styles/email-template.css";

type AlignmentProps = {
  alignment: string;
};
const SampleEmailTemplate = (props: AlignmentProps) => {
  const { alignment } = props;
  return (
    <Box className="container">
      <Box className={`email-wrapper-${alignment}`}>
        <Box className={`logo logo-${alignment}`}>
          <img src={Logo} />
          <Box>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
          </Box>
        </Box>

        <Box className={`header header-${alignment}`}>
          <Box className="name">Mher Tsatinyan</Box>

          <Box className={`job-title job-title-${alignment}`}>
            Software Engineer
          </Box>
        </Box>

        <Box className="email-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum cumque
          dignissimos ex distinctio esse obcaecati quaerat autem fugit similique
          atque debitis accusantium illum deleniti molestiae adipisci nostrum,
          veritatis pariatur totam!
        </Box>
        <Button variant="outlined">Export as HTML</Button>
      </Box>
    </Box>
  );
};

export default SampleEmailTemplate;
