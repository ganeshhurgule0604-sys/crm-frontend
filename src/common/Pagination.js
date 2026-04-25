export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    return (
        <div style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    style={{
                        fontWeight: currentPage === i + 1 ? "bold" : "normal"
                    }}
                >
                    {i + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}