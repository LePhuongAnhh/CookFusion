import styles from './CreateBlog.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { apiUrl, ACCESS_TOKEN } from '~/constants/constants';

const cx = classNames.bind(styles);

function CreateCategory({ setShowCreateCategoryModal }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageChosen, setImageChosen] = useState(false);
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setImageChosen(true);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const [categoryData, setCategoryData] = useState({
        name: '',
        image: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', categoryData.name);
            formData.append('image', selectedFile);
            formData.append('description', categoryData.description);

            const response = await axios.post(`${apiUrl}/category/addnew`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Category created:', response.data);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalCreateCategory')}>
                <div onSubmit={handleSubmit}>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>Create new a Category</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCreateCategoryModal(false)}>
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
                                    onChange={handleChange}
                                    value={categoryData.name}
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
                                    onChange={handleChange}
                                    value={categoryData.description}
                                    required
                                />
                            </Form.Group>
                            <div className={cx('upload-file')}>
                                <div className={cx('dropzone')} id="dropzone" data-dropzone="data-dropzone" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="dz-preview dz-preview-multiple m-0 d-flex flex-column">
                                        {selectedFile && (
                                            <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Selected file"
                                                className={cx('image-select')}
                                            />
                                        )}
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
                        </Form>
                    </div>
                    <Button className={cx('btn-submit')} variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </div >
        </div >
    );
}

export default CreateCategory;
