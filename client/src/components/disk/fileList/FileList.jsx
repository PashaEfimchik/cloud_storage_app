import React from 'react';
import {useSelector} from "react-redux";
import File from "./file/File";
import './fileList.css';
const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />);
    /*const files = [{_id: 1, name: 'direc', type: 'dir', size: '5gb', date: '22.05.2023'},
        {_id: 2, name: 'direc2', type: 'jpg', size: '3gb', date: '21.05.2022'}].map(file => <File key={file._id} file={file} />);
    */
    return (
        <div className="fileList">
            <div className="fileList__header">
                <div className="fileList__name">Название</div>
                <div className="fileList__date">Дата</div>
                <div className="fileList__size">Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;