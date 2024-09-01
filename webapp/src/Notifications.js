import { Toast, ToastContainer } from "react-bootstrap";

export function Notifications({ notifications, setNotifications }) {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
      {notifications.map((notification) => (
        <Toast
          bg="secondary"
          key={notification.id}
          onClose={() => {
            setNotifications(
              notifications.filter((n) => n.id !== notification.id)
            );
          }}
        >
          <Toast.Header closeButton={true} style={{ background: "#eeeeee" }}>
            <strong className="me-auto">
              {notification.title.toUpperCase()}
            </strong>
          </Toast.Header>
          <Toast.Body style={{ background: "#fafafa" }}>
            {notification.body}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
