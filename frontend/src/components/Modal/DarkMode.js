// import React, { useContext } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import Article from "../blog/Article";
// function DarkMode() {
//     const { config, setConfig } = useContext(Article); // Sử dụng useContext để truy cập context

//     return (
//         <Row>
//             <Col sm={6} lg={3}>
//                 <h5 className="fs-0 mb-2">Checkbox </h5>
//                 <Form.Check
//                     type="checkbox"
//                     id="themeToggleCheckBox"
//                     label="Dark mode"
//                     onChange={e => setConfig({ ...config, isDark: e.target.checked })} // Sử dụng setConfig để cập nhật isDark trong config
//                     checked={config.isDark}
//                 />
//             </Col>
//         </Row>
//     );
// }

// export default DarkMode;
