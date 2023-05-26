import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.css';
import Popup from "./Popup";
import {setPopupDisplay, setCurrentDir, setFileView} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import {Button, IconButton,} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NativeSelect from '@mui/material/NativeSelect';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const loader = useSelector(state => state.app.loader);
    const dirStack = useSelector(state => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');


    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'));
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        console.log(files)
        setDragEnter(false);
    }

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter ?
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="disk__btns">
                    <Button
                        onClick={() => backClickHandler()}
                        variant="contained"
                        className="disk__back"
                        id="disk__back"
                        startIcon={<ArrowBackIcon />}
                        >Назад</Button>
                    <Button
                        onClick={() => showPopupHandler()}
                        variant="contained"
                        className="disk__create"
                        id="disk__create"
                        endIcon={<CreateNewFolderIcon />}
                        >Создать папку</Button>
                    <div className="disk__upload">
                        <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                        <label htmlFor="disk__upload-input">
                            <Button
                                variant="contained"
                                component="span"
                                className="disk__upload-btn"
                                id="disk__upload-btn"
                                startIcon={<CloudUploadIcon />}
                            >
                                Загрузить файл</Button>
                        </label>
                    </div>
                    <div className="disk__sort-select">
                        <NativeSelect
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className='disk__select'
                            id="disk__select"
                            >
                            <option value="name">По имени</option>
                            <option value="type">По типу</option>
                            <option value="date">По дате</option>
                        </NativeSelect>
                    </div>
                    <IconButton className="disk__plate" aria-label="view" onClick={() => dispatch(setFileView('plate'))}>
                        <ViewModuleIcon />
                    </IconButton>
                    <IconButton className="disk__list" aria-label="view" onClick={() => dispatch(setFileView('list'))}>
                        <ViewListIcon />
                    </IconButton>
                </div>
                <FileList />
                <Popup/>
                <Uploader/>
            </div>
            :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
            </div>
    );
};

export default Disk;