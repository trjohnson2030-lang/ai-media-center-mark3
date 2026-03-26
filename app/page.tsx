export default function Page() {
  return (
    <main style={{
      padding: 30,
      fontFamily: "sans-serif",
      backgroundColor: "#0f0f0f",
      color: "#ffffff",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>
        AI Media Center
      </h1>

      <p style={{ opacity: 0.7 }}>
        Dashboard is live. System initialized.
      </p>

      <div style={{
        marginTop: 20,
        padding: 20,
        border: "1px solid #333",
        borderRadius: 10
      }}>
        <h2>Modules</h2>
        <ul>
          <li>Media Pipeline</li>
          <li>Content Engine</li>
          <li>Analytics</li>
        </ul>
      </div>
    </main>
  );
}