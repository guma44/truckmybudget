import { AxiosResponse } from "axios";
import { useRef, useState } from "react";


export const useDownloadFile = ({
    apiDefinition,
    preDownloading,
    postDownloading,
    onError,
    getFileName,
}) => {
    const ref = useRef(null);
    const [url, setFileUrl] = useState();
    const [name, setFileName] = useState();

    const download = async () => {
        try {
            preDownloading();
            const { data } = await apiDefinition();
            const url = URL.createObjectURL(new Blob([data]));
            setFileUrl(url);
            setFileName(getFileName());
            ref.current ? ref.current.click() : undefined;
            postDownloading();
            URL.revokeObjectURL(url);
        } catch (error) {
            onError(error);
        }
    };

    return { download, ref, url, name };
};