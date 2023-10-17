import styles from './CreateBlog.module.scss'
import classNames from 'classnames/bind'
import React, { useState, Component, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import images from '~/assets/images'

const cx = classNames.bind(styles)
function CreateCategory({ setShowCreateCategoryModal }) {
    const onDrop = useCallback((acceptedFiles) => {
        // Xử lý tệp đã được chọn ở đây, ví dụ: tải lên máy chủ hoặc hiển thị trước tệp.

        // Ví dụ hiển thị tên tệp đã chọn:
        acceptedFiles.forEach((file) => {
            console.log('File selected:', file.name);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*', // Chấp nhận tệp ảnh
    });
    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalCreateCategory')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>Create Category</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCreateCategoryModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                    <div className={cx('body-cate')}>
                        <Form>
                            <Form.Group className="mb-4 display-3" controlId="formGroupName">
                                {/* <Form.Label>Name</Form.Label> */}
                                <Form.Control className={cx('form-text')} type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formGroupGender">
                                {/* <Form.Label>Type</Form.Label> */}
                                <Form.Select className={cx('form-text')}>
                                    <option className={cx('form-text')} value=''>Select type category</option>
                                    <option className={cx('form-text')} value="male">Article</option>
                                    <option className={cx('form-text')} value="female">Recipe</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={cx("mb-4", "form-text")} controlId="description">
                                {/* <Form.Label>Description</Form.Label> */}
                                <Form.Control className={cx('form-text')} as="textarea" rows={4} placeholder="Description" />
                            </Form.Group>
                            <div className={cx('upload-file')}>
                                <div className={cx('dropzone')} id="dropzone" data-dropzone="data-dropzone" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className={cx('dz-message')} data-dz-message="data-dz-message">
                                        <div className={cx('dz-message-text')}>
                                            <i className="bi bi-upload"></i> &nbsp;
                                            Choose file
                                        </div>
                                    </div>
                                    <div className="dz-preview dz-preview-multiple m-0 d-flex flex-column"></div>
                                </div>
                            </div>


                            <Button className={cx('btn-submit')} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default CreateCategory;