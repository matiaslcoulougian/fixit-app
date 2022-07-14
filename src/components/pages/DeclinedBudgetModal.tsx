// import React, {useState} from "react";
// import {useMutation} from "@apollo/client";
// import {Modal} from "@mui/material";
//
// export const DeclinedBudgetModal = (props) => {
//     const [comment, setComment] = useState();
//
//     const handleDeclineMessageSent = (text) => {
//         //send comment to backend ..    .
//         props.setOpenModal(false)
//     }
//     return(<Modal
//         open={props.openModal}
//         onClose={() => props.setOpenModal(false)}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//     >
//         <div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header border-0 pb-0">
//                     <h5 className="modal-title" id="modal-title">Declined Budget</h5>
//                     <button type="button" className="btn-close" onClick={() => props.setOpenModal(false)} data-bs-dismiss="modal" aria-label="Close"/>
//
//                 </div>
//
//                 <div className="modal-body border-0 py-0">
//                     <div className={"modal-form"}>
//                         <hr/>
//                         <div className="container">
//                             <div className="mt-3">
//                                 <label className="form-label" htmlFor="job-title">Leave a comment for the reason of your decline</label>
//                                 <textarea className="form-control" id="job-title" rows="3" onChange={(e) => setComment(e.target.value)}></textarea>
//                             </div>
//                         </div>
//                         <div/>
//                     </div>
//                     <div className="modal-footer border-0 pt-0">
//                         <button type="button" className="btn btn-primary" id="respond-button" onClick={handleDeclineMessageSent}>Send</button>
//                     </div>
//
//
//                 </div>
//             </div>
//         </div>
//     </Modal>)
//
// }