import React, {useState} from 'react';
import './file.css';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.png';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {IconButton} from "@mui/material";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const fileView = useSelector(state => state.files.view);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(event) {
        event.stopPropagation();
        downloadFile(file);
    }

    function deleteClickHandler(event) {
        event.stopPropagation();
        dispatch(deleteFile(file))
    }

    const element = document.querySelector('.file-plate');
    if (element) {
        element.addEventListener('mouseout', () => {
            element.style.transform = 'scale(1)'
        })
    }

    if (fileView === 'list') {
        return (
            <div className={`file ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                {file.type !== 'dir' &&
                    <div className="file__btn file__download">
                        <IconButton onClick={(e) => downloadClickHandler(e)}>
                            <CloudDownloadIcon className="file__btn-downloadIcon" />
                        </IconButton>
                    </div>}
                <div className="file__btn file__delete">
                    <IconButton onClick={(e) => deleteClickHandler(e)}>
                        <DeleteForeverIcon className="file__btn-deleteIcon"/>
                    </IconButton>
                </div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div className={`file-plate ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                        <div className="file-plate__btn file-plate__download">
                            <IconButton onClick={(e) => downloadClickHandler(e)}>
                                <CloudDownloadIcon className="file__btn-downloadIcon" />
                            </IconButton>
                        </div>}
                    <div className="file-plate__btn file-plate__delete">
                        <IconButton onClick={(e) => deleteClickHandler(e)}>
                            <DeleteForeverIcon className="file__btn-deleteIcon"/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
};

export default File;