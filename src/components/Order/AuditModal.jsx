import React from 'react';
import { Modal, Badge } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { axiosClients } from '../../Apis/api';

function AuditModal({ isOpen, onClose, orderId }) {
    const { data: submissions, isLoading } = useQuery({
        queryKey: ['design-submissions', orderId],
        queryFn: async () => {
            const response = await axiosClients.get(`/getDesignSubmissionsByOrderId/${orderId}`);
            return response?.data?.data || [];
        },
        enabled: isOpen && !!orderId,
        staleTime: 30 * 1000,
    });  

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Audit Submissions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-muted small px-3">Loading...</div>
                ) : (
                    <div className="d-flex flex-column px-3">
                        {(!submissions || submissions.length === 0) && (
                            <div className="text-muted small">No submissions yet.</div>
                        )}
                        {submissions?.map((submission) => (
                            <div key={submission.design_submission_id} className="border-bottom py-3 mb-2">
                                {submission.design_image_url && (
                                    <div className="text-center mb-3">
                                        <img
                                            src={submission.design_image_url}
                                            alt={`Design v${submission.version_number}`}
                                            className="img-fluid rounded border shadow-sm"
                                            style={{ maxHeight: '250px', objectFit: 'contain' }}
                                        />
                                    </div>
                                )}
                                <div className="mb-2"><span className="fw-bold text-secondary">ID:</span> {submission.design_submission_id}</div>
                                <div className="mb-2"><span className="fw-bold text-secondary">Version:</span> {submission.version_number}</div>
                                <div className="mb-2">
                                    <span className="fw-bold text-secondary me-2">Status:</span>
                                    <Badge bg={
                                        submission.status === 'approved' ? 'success' :
                                        submission.status === 'rejected' ? 'danger' :
                                        'warning'
                                    } text={submission.status === 'approved' || submission.status === 'rejected' ? 'light' : 'dark'}>
                                        {submission.status ?? 'Pending'}
                                    </Badge>
                                </div>
                                <div className="mb-2"><span className="fw-bold text-secondary">Description:</span> {submission.description || '-'}</div>
                                <div className="mb-2"><span className="fw-bold text-secondary">Feedback:</span> {submission.feedback_text || '-'}</div>
                                <div className="mb-2"><span className="fw-bold text-secondary">Submitted:</span> {new Date(submission.created_at).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default AuditModal;
