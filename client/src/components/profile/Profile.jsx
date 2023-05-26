import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";
import './profile.css'
import {API_URL} from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";
import {IconButton} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="profile__container">
            <div className="profile__header">Изменить аватар</div>
            <div className="profile__email">Email: {currentUser.email}</div>
            <img className="profile__avatar" src={avatar} alt="" />

            <div className="profile__content-wrapper">
                <div className="profile__content-avatar-delete">
                    <IconButton
                        className="profile__avatar-delete"
                        onClick={() => dispatch(deleteAvatar())}
                    >
                        <NoPhotographyIcon className="profile__btn-deleteIcon"/>
                    </IconButton>
                </div>
                <input
                    accept="image/*"
                    onChange={e => changeHandler(e)}
                    type="file"
                    id="contained-button-file-profile"
                />
                <label htmlFor="contained-button-file-profile">
                    <div className="profile__content-avatar-add">
                        <IconButton aria-label="upload picture" component="span">
                            <AddAPhotoIcon />
                        </IconButton>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Profile;