import React, { useMemo, useState } from "react";
import { FiSearch, FiTrash2, FiMail } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useData } from "../../context/DataContext";

const PAGE_SIZE = 10;

const Messages: React.FC = () => {
  const { data, markMessageRead, deleteMessage } = useData();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let msgs = [...data.messages].sort((a, b) => b.createdAt - a.createdAt);
    if (query.trim()) {
      const q = query.toLowerCase();
      msgs = msgs.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
      );
    }
    return msgs;
  }, [data.messages, query]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">Messages</h1>
      <p className="text-ink/50 text-sm mb-8">Messages submitted through the contact form</p>

      <div className="flex items-center bg-white border border-line rounded-md px-3 mb-6 max-w-sm">
        <FiSearch className="text-ink/40" size={15} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search messages..."
          className="bg-transparent px-2 py-2.5 text-sm outline-none w-full"
        />
      </div>

      <div className="space-y-3">
        {paginated.map((m) => (
          <div
            key={m.id}
            className={`bg-white rounded-lg shadow-card p-5 border-l-4 ${
              m.read ? "border-line" : "border-primary"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-navy">{m.name}</p>
                <p className="text-xs text-ink/50">
                  {m.email} • {m.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => markMessageRead(m.id, !m.read)}
                  className="text-ink/50 hover:text-primary p-1.5"
                  aria-label="Toggle read"
                  title={m.read ? "Mark unread" : "Mark read"}
                >
                  {m.read ? <HiOutlineMailOpen size={16} /> : <FiMail size={16} />}
                </button>
                <button
                  onClick={() => deleteMessage(m.id)}
                  className="text-red-500 hover:text-red-600 p-1.5"
                  aria-label="Delete message"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-ink/70 mt-3">{m.message}</p>
            <p className="text-xs text-ink/40 mt-2">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-ink/50 text-sm">No messages yet.</p>}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-md text-sm font-medium ${
                page === i + 1 ? "bg-primary text-white" : "bg-white text-ink/60 shadow-card"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
