import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";
import Input from "../../utils/input/Input";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Popup = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(currentDir, dirName));
        dispatch(setPopupDisplay('none'));
        setDirName('');
    }

    function popupDisplayHandler() {
        dispatch(setPopupDisplay('none'))
        setDirName('');
    }

    return (
        <div className="popup" onClick={popupDisplayHandler} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <IconButton className="popup__close" onClick={ popupDisplayHandler }>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="popup__input-create">
                    <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
                </div>
                <IconButton className="popup__create" onClick={() => createHandler()}>
                    <span style={{marginRight: '10px'}}>Создать</span><CreateNewFolderIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Popup;