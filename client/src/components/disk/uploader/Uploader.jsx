import React from 'react';
import UploadFile from "./UploadFile";
import './uploader.css'
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <IconButton
                    className="uploader__close"
                    onClick={() => dispatch(hideUploader())}>
                    <CloseIcon/>
                </IconButton>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;