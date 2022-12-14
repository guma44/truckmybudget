import axios from "axios";
import { Fragment } from "react";
import { useDownloadFile } from "../../utils/hooks/useDownloadFile";
import { useCookies } from 'react-cookie';

import DownloadIcon from '@mui/icons-material/Download';
import { toast } from "react-toastify";
import { Button, IconButton } from "@mui/material";

export const DownloadFile = (props) => {
  const { path, filename } = props;
  const [cookies] = useCookies(['logged_in']);
  const preDownloading = () => console.log("predownload");
  const postDownloading = () => console.log("postdownload");

  const onErrorDownloadFile = (error) => {
    console.log(error);
    toast.error("Error downloading")
  };
  const getFileName = () => {
    return filename;
  }
  const downloadFile = () => {
    return axios.get(
      `http://localhost:8000/${path}`,
      {
        responseType: "blob",
        withCredentials: true
      }
    );
  };

  const { ref, url, download, name } = useDownloadFile({
    apiDefinition: downloadFile,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName
  });

  return (
    <Fragment>
        <a href={url} download={name} className="hidden" ref={ref} />
        <IconButton onClick={download}><DownloadIcon/></IconButton>
    </Fragment>
  );
};