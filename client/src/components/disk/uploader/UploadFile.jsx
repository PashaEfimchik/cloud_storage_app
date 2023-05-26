import React from 'react';
import './uploader.css';
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const UploadFile = ({file}) => {
    const dispatch = useDispatch()

    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <IconButton
                    className="upload-file__remove"
                    onClick={() => dispatch(removeUploadFile(file.id))}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}/>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;