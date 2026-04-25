import Pagination from "./Pagination";
export default function CommonTable({ columns, data, navigate, module, currentPage,
    totalPages,
    onPageChange }) {
    return (
        <>
            <table className="user-table">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i}>{col.header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr
                                key={row.id || index}
                                onClick={() => navigate?.(`/${module}/${row.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                {columns.map((col, i) => (
                                    <td key={i}>
                                        {col.render
                                            ? col.render(row, index) // ✅ custom render
                                            : row[col.accessor] ?? "-"} {/* ✅ dynamic */}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center" }}>
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </>
    );
}