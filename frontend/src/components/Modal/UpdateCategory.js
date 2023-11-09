import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { apiUrl, ACCESS_TOKEN } from '~/constants/constants';
import classNames from 'classnames/bind';
import styles from './CreateBlog.module.scss';
import { useDropzone } from 'react-dropzone';
const cx = classNames.bind(styles);

function UpdateCategory({ setShowUpdateCategoryModal, categoryData, updateCategoryList }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageChosen, setImageChosen] = useState(false);

    const { name, image, description, _id } = categoryData;
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedId, setUpdatedId] = useState(_id);

    console.log("updat comment:", categoryData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('_id', updatedId);
            formData.append('name', updatedName);
            formData.append('image', selectedFile || image);
            formData.append('description', updatedDescription);

            const response = await axios.patch(`${apiUrl}/category/update`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Call the update function after a successful update
            updateCategoryList(response.data.updatedCategory);
            setShowUpdateCategoryModal(false);
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setImageChosen(true);
    };


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div className={cx('modalUpdateCategory')}>
            <div>
                <div className={cx('updateCategoryHeader')}>
                    <h1 className={cx('updateCategory')}>Update Category</h1>
                    <div className={cx('exit_cmt_modal')} onClick={() => setShowUpdateCategoryModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div className={cx('body-cate')} style={{ height: '341px', overflow: "auto" }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4 display-3" controlId="formGroupName">
                            <Form.Control
                                className={cx('form-text')}
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className={cx("mb-4", "form-text")} controlId="description">
                            <Form.Control
                                className={cx('form-text')}
                                as="textarea"
                                name="description"
                                rows={7}
                                placeholder="Description"
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupImage">
                            <div className={cx('image-select-container')}>
                                {selectedFile ? ( // Check if selectedFile is defined
                                    <img
                                        src={selectedFile && URL.createObjectURL(selectedFile)}
                                        alt="Selected file"
                                        className={cx('image-select')}
                                    />
                                ) : (
                                    <img
                                        src={image}
                                        alt="Category"
                                        className={cx('image-select')}
                                    />
                                )}
                            </div>

                            <div className={cx('upload-file')}>
                                {/* Dropzone to upload new image */}
                                <div className={cx('dropzone')} id="dropzone" data-dropzone="data-dropzone" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="dz-preview dz-preview-multiple m-0 d-flex flex-column">
                                        {/* Render nothing here as we're displaying the selected image above */}
                                    </div>
                                    <div
                                        className={cx('dz-message')}
                                        data-dz-message="data-dz-message"
                                    >
                                        <div className={cx('dz-message-text')}>
                                            <i className="bi bi-upload"></i> &nbsp;
                                            {imageChosen ? 'Update image' : 'Choose image'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form.Group>

                    </Form>
                </div>
                <Button className={cx('btn-submit')} variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default UpdateCategory;
