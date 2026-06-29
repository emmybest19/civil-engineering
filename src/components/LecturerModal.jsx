import Modal from "./Modal";

export default function LecturerModal({ lecturer, isOpen, onClose }) {
  if (!lecturer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lecturer.name} maxWidth="max-w-lg">
      <div className="space-y-2 text-sm">
        <p><strong>Position:</strong> {lecturer.position}</p>
        <p><strong>Biography:</strong> {lecturer.bio}</p>
        <p><strong>Qualifications:</strong> {lecturer.qualifications}</p>
        <p><strong>Specialization:</strong> {lecturer.specialization}</p>
        <p><strong>Contact:</strong> {lecturer.contact}</p>
      </div>
    </Modal>
  );
}
