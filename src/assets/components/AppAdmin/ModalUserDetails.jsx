const ModalUserDetail = ({ open, userData }) => {
  return (
    <div className="font-sans">
      <div
        className={
          (open
            ? "max-w-40 max-h-40 opacity-100"
            : "max-h-0 max-w-0 opacity-0") + " overflow-hidden duration-500"
        }
      >
        <p className="font-bold">Details</p>
        <p>Role : {userData.role}</p>
        <p>E-mail : {userData.email}</p>
      </div>
    </div>
  );
};

export default ModalUserDetail;
