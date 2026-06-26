export default function LoginLayout({ children }) {
  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-slate-50">
      {children}
    </div>
  );
}
